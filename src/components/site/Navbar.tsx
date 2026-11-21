"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "story", label: t("nav.story") },
    { id: "menu", label: t("nav.menu") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-ink/90 backdrop-blur-xl py-3 border-b border-cream/5"
            : "bg-gradient-to-b from-ink/70 to-transparent py-5"
        }`}
        style={{ color: "var(--cream)" }}
      >
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8 flex items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-baseline gap-1.5 flex-shrink-0"
            aria-label="Aurelia home"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-[0.04em] text-cream">
              {t("brand.name")}
            </span>
            <span className="font-serif italic text-base md:text-lg text-champagne -ml-0.5">
              {t("brand.sub")}
            </span>
          </button>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group relative text-[11px] tracking-wide-2 uppercase text-cream/70 hover:text-cream transition-colors"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right — lang toggle + reserve */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center gap-1 rounded-full border border-champagne/40 px-1 py-0.5">
              <button
                onClick={() => setLang("en")}
                className={`rounded-full px-2.5 py-0.5 text-[10px] tracking-wide-2 uppercase transition-colors ${
                  lang === "en"
                    ? "bg-champagne text-ink"
                    : "text-champagne/70 hover:text-champagne"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className={`rounded-full px-2.5 py-0.5 text-[12px] transition-colors ${
                  lang === "ar"
                    ? "bg-champagne text-ink"
                    : "text-champagne/70 hover:text-champagne"
                }`}
              >
                ع
              </button>
            </div>

            <button
              onClick={() => go("reserve")}
              className="hidden md:inline-flex items-center rounded-full bg-champagne px-5 py-1.5 text-[10px] tracking-wide-2 uppercase text-ink font-medium hover:bg-cream transition-colors"
            >
              {t("nav.reserve")}
            </button>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-cream p-1"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-ink md:hidden"
            style={{ color: "var(--cream)" }}
          >
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 py-5">
              <span className="text-[10px] tracking-luxe uppercase text-cream/60">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-1"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex h-full flex-col justify-center items-center gap-7 px-6">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  onClick={() => go(l.id)}
                  className="font-serif text-4xl text-cream hover:text-champagne transition-colors"
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onClick={() => go("reserve")}
                className="mt-4 rounded-full bg-champagne px-8 py-3 text-[11px] tracking-luxe uppercase text-ink font-medium"
              >
                {t("nav.reserveFull")}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
