"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n";
import { Phone, MapPin } from "lucide-react";

const NAV = [
  { id: "story", key: "nav.story" },
  { id: "menu", key: "nav.menu" },
  { id: "reserve", key: "nav.reserve" },
];

export default function Footer() {
  const { t } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(root.current?.querySelectorAll(".reveal") ?? [], {
        opacity: 0,
        y: 40,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });

      gsap.fromTo(
        wordmarkRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: "top 95%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      ref={root}
      className="relative bg-ink pt-20 md:pt-24 pb-8 border-t border-cream/5"
      style={{ color: "var(--cream)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Top */}
        <div className="reveal text-center pb-12 border-b border-cream/8">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="font-serif text-3xl md:text-4xl tracking-[0.04em] text-cream">
              {t("brand.name")}
            </span>
            <span className="font-serif italic text-xl md:text-2xl text-champagne -ml-0.5">
              {t("brand.sub")}
            </span>
          </div>
          <div className="mt-4 text-[11px] tracking-wide-2 uppercase text-mist">
            {t("footer.hours")}
          </div>
        </div>

        {/* Nav */}
        <div className="reveal py-10 flex flex-wrap items-center justify-center gap-6 md:gap-10 border-b border-cream/8">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="group relative text-[11px] tracking-luxe uppercase text-cream/70 hover:text-champagne transition-colors"
            >
              {t(n.key)}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Huge wordmark */}
        <div className="py-14 md:py-20">
          <div
            ref={wordmarkRef}
            className="font-serif font-light text-[clamp(4.5rem,16vw,15rem)] leading-[0.85] tracking-[0.02em] text-cream/85 text-center"
          >
            <span className="italic text-champagne">{t("brand.name")}</span>
          </div>
          <div className="mt-4 text-center text-[10px] tracking-luxe uppercase text-champagne">
            ✦ &nbsp;{t("brand.tagline")}&nbsp; ✦
          </div>
        </div>

        {/* Contact */}
        <div className="reveal flex flex-wrap justify-center items-center gap-6 md:gap-8 py-8 border-y border-cream/8 text-[11px] tracking-wide-2 uppercase text-mist">
          <a
            href="tel:+12125550184"
            className="flex items-center gap-2 hover:text-champagne transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-champagne" />
            +1 (212) 555-0184
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-champagne" />
            {t("footer.address")}
          </span>
        </div>

        {/* Bottom */}
        <div className="pt-6 text-center text-[10px] tracking-wide-2 uppercase text-mist">
          © {new Date().getFullYear()} {t("brand.name")} {t("brand.sub")}.{" "}
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
