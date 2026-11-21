"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const wordmark = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      wordmark.current,
      { opacity: 0, y: 30, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }
    )
      .to(pctRef.current, {
        textContent: 100,
        duration: 2,
        ease: "power2.inOut",
        snap: { textContent: 1 },
        onUpdate: function () {
          if (pctRef.current) {
            pctRef.current.textContent = `${Math.round(parseFloat(pctRef.current.textContent || "0"))}`;
          }
        },
      }, 0.3)
      .to(progressRef.current, { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0.3)
      .to(wordmark.current, {
        y: -20,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.8,
        ease: "power2.in",
      }, "+=0.3")
      .to(root.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => setDone(true),
      }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center"
      style={{ color: "var(--cream)" }}
    >
      <div className="absolute top-6 inset-x-0 flex justify-between px-6 text-[10px] tracking-luxe uppercase text-cream/40">
        <div>Aurelia · Sky Lounge</div>
        <div>Est. 2021</div>
      </div>

      <div
        ref={wordmark}
        className="font-serif font-light text-5xl md:text-7xl tracking-[0.25em] text-cream"
      >
        AURELIA
      </div>
      <div className="mt-3 text-[10px] tracking-luxe uppercase text-champagne">
        ✦ &nbsp;Where light meets the sky&nbsp; ✦
      </div>

      <div className="absolute bottom-10 inset-x-0 px-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-baseline justify-between mb-3 text-[10px] tracking-luxe uppercase text-cream/45">
            <span>Loading the rooftop</span>
            <span>
              <span ref={pctRef}>0</span>%
            </span>
          </div>
          <div className="h-px bg-cream/15 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-champagne origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
