"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";

/**
 * Floating music control.
 * Synthesizes a slow ambient pad with the Web Audio API — no external
 * file, no copyright concerns. The pad is a stack of detuned sine
 * oscillators drifting through a chord progression, low-pass filtered
 * and gently amplitude-modulated.
 *
 * Audio is only created after the user clicks play (browser policy).
 */
export default function MusicControl() {
  const { t } = useLang();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [expanded, setExpanded] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);
  const voicesRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<number | null>(null);

  // Chord progression (frequencies in Hz) — soft minor cadence in D
  const chords = [
    [146.83, 220.0, 293.66, 369.99], // Dm
    [174.61, 220.0, 261.63, 349.23], // Fmaj
    [196.0, 246.94, 293.66, 392.0], // Gmaj
    [164.81, 220.0, 277.18, 369.99], // Em
  ];
  const chordIndex = useRef(0);

  const buildPad = (ctx: AudioContext) => {
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterRef.current = master;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1100;
    filter.Q.value = 0.7;
    filter.connect(master);
    filterRef.current = filter;

    // Slow LFO on filter cutoff for movement
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 300;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start();
    lfoRef.current = lfo;
    lfoGainRef.current = lfoGain;
  };

  const setChord = (freqs: number[], ctx: AudioContext) => {
    // Fade out old voices then dispose
    const old = voicesRef.current;
    old.forEach((osc) => {
      try {
        const g = osc.context.createGain();
        // already connected to filter; just ramp down via the osc's own gain if present
        osc.stop(ctx.currentTime + 1.6);
      } catch {}
    });
    voicesRef.current = [];

    const filter = filterRef.current!;
    const now = ctx.currentTime;

    freqs.forEach((f, i) => {
      // 2 detuned oscillators per note for warmth
      [-6, 6].forEach((detune) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.value = f;
        osc.detune.value = detune;

        const oscGain = ctx.createGain();
        oscGain.gain.value = 0;
        osc.connect(oscGain).connect(filter);

        // Gentle attack per voice
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(0.12 / freqs.length, now + 2.5);

        osc.start(now);
        // Stop old oscillators 1.6s after the new ones start
        // (above) — done via osc.stop on the old set
        voicesRef.current.push(osc);

        // Fade out old via a quick gain ramp on stop
        // (already scheduled by osc.stop)
      });
    });
  };

  const start = async () => {
    if (ctxRef.current) {
      await ctxRef.current.resume();
      if (masterRef.current) {
        masterRef.current.gain.cancelScheduledValues(
          ctxRef.current.currentTime
        );
        masterRef.current.gain.linearRampToValueAtTime(
          muted ? 0 : volume,
          ctxRef.current.currentTime + 1.2
        );
      }
      setPlaying(true);
      return;
    }
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;
    buildPad(ctx);
    setChord(chords[0], ctx);
    chordIndex.current = 0;

    // Progress chords every ~14s
    intervalRef.current = window.setInterval(() => {
      chordIndex.current = (chordIndex.current + 1) % chords.length;
      if (ctxRef.current) setChord(chords[chordIndex.current], ctxRef.current);
    }, 14000);

    // Fade in master
    if (masterRef.current) {
      masterRef.current.gain.setValueAtTime(0, ctx.currentTime);
      masterRef.current.gain.linearRampToValueAtTime(
        muted ? 0 : volume,
        ctx.currentTime + 2.0
      );
    }
    setPlaying(true);
  };

  const pause = () => {
    if (!ctxRef.current || !masterRef.current) return;
    const now = ctxRef.current.currentTime;
    masterRef.current.gain.cancelScheduledValues(now);
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now);
    masterRef.current.gain.linearRampToValueAtTime(0, now + 0.8);
    ctxRef.current.suspend();
    setPlaying(false);
  };

  useEffect(() => {
    if (!ctxRef.current || !masterRef.current) return;
    const now = ctxRef.current.currentTime;
    masterRef.current.gain.cancelScheduledValues(now);
    masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now);
    masterRef.current.gain.linearRampToValueAtTime(
      muted ? 0 : volume,
      now + 0.4
    );
  }, [volume, muted]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      voicesRef.current.forEach((o) => {
        try {
          o.stop();
        } catch {}
      });
      try {
        ctxRef.current?.close();
      } catch {}
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="fixed top-20 md:top-24 left-4 md:left-6 z-40"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex items-center gap-2 rounded-full border border-cream/10 bg-ink/70 backdrop-blur-xl px-2 py-1.5 shadow-lg shadow-black/30">
        {/* Play / Pause */}
        <button
          onClick={() => (playing ? pause() : start())}
          className="relative flex h-7 w-7 items-center justify-center rounded-full bg-champagne text-ink hover:scale-105 transition-transform"
          aria-label={playing ? "Pause ambient music" : "Play ambient music"}
        >
          {playing ? (
            <Pause className="h-3 w-3" fill="currentColor" />
          ) : (
            <Play className="h-3 w-3 translate-x-[1px]" fill="currentColor" />
          )}
        </button>

        {/* Now playing label */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden sm:flex items-center overflow-hidden whitespace-nowrap"
            >
              <div className="px-2 pe-1">
                <div className="text-[8px] tracking-luxe uppercase text-cream/45">
                  {playing ? t("music.nowPlaying") : t("music.label")}
                </div>
                <div className="text-[10px] tracking-wide-2 text-cream/85 font-serif italic">
                  {t("music.name")}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volume slider */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 70 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden md:flex items-center overflow-hidden pe-1"
            >
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (muted) setMuted(false);
                }}
                aria-label="Volume"
                className="aurelia-slider w-[70px] h-[3px] appearance-none rounded-full bg-cream/20 cursor-pointer"
                style={
                  {
                    "--pct": `${(muted ? 0 : volume) * 100}%`,
                  } as React.CSSProperties
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mute toggle */}
        <button
          onClick={() => setMuted((m) => !m)}
          className="text-cream/60 hover:text-cream transition-colors p-0.5"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <VolumeX className="h-3.5 w-3.5" />
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
