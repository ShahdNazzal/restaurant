"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      const tryPlay = () => {
        v.play().catch(() => {});
      };
      tryPlay();
      setTimeout(tryPlay, 200);
      const kick = () => {
        tryPlay();
        window.removeEventListener("click", kick);
        window.removeEventListener("touchstart", kick);
        window.removeEventListener("scroll", kick);
      };
      window.addEventListener("click", kick);
      window.addEventListener("touchstart", kick);
      window.addEventListener("scroll", kick);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.6 },
        0.1
      )
        .fromTo(
          kickerRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          0.5
        )
        .fromTo(
          wordmarkRef.current,
          { y: 60, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.6 },
          0.7
        )
        .fromTo(
          taglineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          1.0
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          1.3
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          1.6
        );

      gsap.to(videoRef.current, {
        yPercent: 10,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(wordmarkRef.current, {
        yPercent: -40,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={root}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
      style={{ color: "var(--cream)" }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/videos/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,26,43,0.55) 0%, rgba(14,26,43,0.20) 35%, rgba(14,26,43,0.45) 70%, rgba(14,26,43,0.90) 100%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none vignette" />

      {/* Center stack */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div
          ref={kickerRef}
          className="text-[10px] md:text-[11px] tracking-luxe uppercase text-champagne mb-6 md:mb-8"
        >
          ✦ &nbsp;{t("brand.kicker")}&nbsp; ✦
        </div>

        <div ref={wordmarkRef} className="overflow-hidden">
          <h1 className="font-serif font-light text-cream leading-[0.85] tracking-[0.02em] text-[clamp(4rem,16vw,15rem)]">
            <span className="block italic text-champagne">{t("brand.name")}</span>
            <span className="block -mt-2 md:-mt-4 text-cream">{t("brand.sub")}</span>
          </h1>
        </div>

        <div className="mt-7 md:mt-10 flex items-center gap-4">
          <span className="h-px w-10 md:w-14 bg-champagne/60" />
          <p
            ref={taglineRef}
            className="font-serif italic text-cream/90 text-lg md:text-2xl lg:text-3xl"
          >
            {t("brand.tagline")}
          </p>
          <span className="h-px w-10 md:w-14 bg-champagne/60" />
        </div>

        <div
          ref={ctaRef}
          className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          <button
            onClick={() => go("menu")}
            className="rounded-full border border-cream/25 bg-ink/30 backdrop-blur-sm px-6 md:px-7 py-3 text-[10px] tracking-luxe uppercase text-cream hover:bg-cream/10 transition-colors duration-500"
          >
            {t("hero.cta.menu")}
          </button>
          <button
            onClick={() => go("reserve")}
            className="rounded-full bg-champagne px-6 md:px-7 py-3 text-[10px] tracking-luxe uppercase text-ink font-medium hover:bg-cream transition-colors duration-500"
          >
            {t("hero.cta.reserve")}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        ref={scrollRef}
        onClick={() => go("story")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/60 hover:text-cream transition-colors"
        aria-label="Scroll"
      >
        <span className="text-[9px] tracking-luxe uppercase">{t("hero.scroll")}</span>
        <span className="relative flex h-10 w-[1px] overflow-hidden bg-cream/20">
          <span className="absolute top-0 inset-x-0 h-4 bg-champagne animate-[scrollline_2s_ease-in-out_infinite]" />
        </span>
      </button>

      <style jsx>{`
        @keyframes scrollline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
      `}</style>
    </section>
  );
}
