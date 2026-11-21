"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MENU } from "@/lib/menu-data";
import { useLang } from "@/lib/i18n";

export default function Menu() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(MENU[0].id);
  const root = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const activeCategory = MENU.find((c) => c.id === active)!;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current?.querySelectorAll(".reveal") ?? [], {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Animate items on category change
  useEffect(() => {
    if (!itemsRef.current) return;
    const rows = itemsRef.current.querySelectorAll<HTMLElement>(".menu-row");
    gsap.killTweensOf(rows);
    gsap.fromTo(
      rows,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, [active, lang]);

  return (
    <section
      id="menu"
      ref={root}
      className="relative bg-ink py-28 md:py-36"
      style={{ color: "var(--cream)" }}
    >
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12 md:mb-16"
        >
          <div className="reveal text-[10px] tracking-luxe uppercase text-champagne mb-5">
            {t("menu.kicker")}
          </div>
          <h2 className="reveal font-serif font-light text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            {t("menu.title.1")}{" "}
            <span className="font-serif italic text-gold-gradient">
              {t("menu.title.2")}
            </span>
          </h2>
          <p className="reveal mt-7 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-cream/55">
            {activeCategory.description[lang]}
          </p>
        </div>

        {/* Category tabs */}
        <div className="reveal flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16 border-b border-cream/8 pb-5">
          {MENU.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`group relative pb-1 px-1 text-[11px] md:text-[12px] tracking-wide-2 uppercase transition-colors ${
                active === cat.id
                  ? "text-champagne"
                  : "text-cream/45 hover:text-cream/70"
              }`}
            >
              {t(cat.labelKey)}
              <span
                className={`absolute -bottom-[21px] left-0 h-[2px] bg-champagne transition-all duration-500 ${
                  active === cat.id ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Items — text-only with dotted leaders */}
        <div ref={itemsRef} className="space-y-1">
          {activeCategory.items.map((item) => (
            <div
              key={item.id}
              className="menu-row group py-5 md:py-6 border-b border-cream/8 hover:border-champagne/30 transition-colors"
            >
              <div className="flex items-baseline gap-4">
                {/* Name */}
                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-cream group-hover:text-champagne transition-colors flex-shrink-0">
                  {item.name[lang]}
                </h3>
                {/* Dotted leader */}
                <span className="flex-1 border-b border-dotted border-cream/20 -translate-y-1.5" />
                {/* Price */}
                <div className="font-serif text-lg md:text-xl lg:text-2xl text-champagne flex-shrink-0">
                  {item.price}
                  <span className="text-[10px] tracking-luxe uppercase text-champagne/60 ms-1.5">
                    JOD
                  </span>
                </div>
              </div>
              {/* Description */}
              <p className="mt-2 text-[13px] md:text-sm leading-relaxed text-cream/45 max-w-2xl">
                {item.description[lang]}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-14 pt-8 border-t border-cream/8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-wide-2 uppercase text-cream/40">
          <span>A 5-course tasting menu · 165 / guest</span>
          <button
            onClick={() =>
              document
                .getElementById("reserve")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-champagne border-b border-champagne/30 pb-0.5 hover:border-champagne transition-colors"
          >
            {t("nav.reserveFull")} →
          </button>
        </div>
      </div>
    </section>
  );
}
