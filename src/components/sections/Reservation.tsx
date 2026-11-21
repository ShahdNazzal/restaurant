"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function Reservation() {
  const { t, lang } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "19:00",
    guests: "2",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(formRef.current?.querySelectorAll(".reveal") ?? [], {
        opacity: 0,
        y: 40,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="reserve"
      ref={root}
      className="relative bg-ink py-28 md:py-36"
      style={{ color: "var(--cream)" }}
    >
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — invitation */}
          <div className="lg:col-span-5">
            <div className="reveal text-[10px] tracking-luxe uppercase text-champagne flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-champagne/50" />
              {t("reserve.kicker")}
            </div>
            <h2 className="reveal font-serif font-light text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              {t("reserve.title.1")}
              <br />
              <span className="text-gold-gradient italic">
                {t("reserve.title.2")}
              </span>
              <br />
              {t("reserve.title.3")}
            </h2>
            <p className="reveal mt-8 max-w-md text-base leading-relaxed text-cream/60">
              {t("reserve.body")}
            </p>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="reveal bg-ink-soft/50 border border-cream/8 p-8 md:p-12">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label={t("reserve.form.name")} required>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder={lang === "ar" ? "اسمك" : "Your name"}
                        className="aurelia-input"
                      />
                    </Field>
                    <Field label={t("reserve.form.phone")} required>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="+1 (212) ..."
                        className="aurelia-input"
                      />
                    </Field>
                    <Field label={t("reserve.form.date")} required>
                      <input
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        className="aurelia-input"
                      />
                    </Field>
                    <Field label={t("reserve.form.time")}>
                      <select
                        value={form.time}
                        onChange={(e) =>
                          setForm({ ...form, time: e.target.value })
                        }
                        className="aurelia-input"
                      >
                        {["17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00"].map((tm) => (
                          <option key={tm} value={tm} className="bg-ink">
                            {tm}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label={t("reserve.form.guests")}>
                      <select
                        value={form.guests}
                        onChange={(e) =>
                          setForm({ ...form, guests: e.target.value })
                        }
                        className="aurelia-input"
                      >
                        {["1","2","3","4","5","6","7","8+"].map((g) => (
                          <option key={g} value={g} className="bg-ink">
                            {g} {g === "1" ? (lang === "ar" ? "ضيف" : "guest") : (lang === "ar" ? "ضيوف" : "guests")}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label={t("reserve.form.seating")}>
                      <select defaultValue="dining" className="aurelia-input">
                        <option value="dining" className="bg-ink">
                          {t("reserve.seating.dining")}
                        </option>
                        <option value="rail" className="bg-ink">
                          {t("reserve.seating.rail")}
                        </option>
                        <option value="counter" className="bg-ink">
                          {t("reserve.seating.counter")}
                        </option>
                      </select>
                    </Field>
                  </div>
                  <Field label={t("reserve.form.notes")}>
                    <textarea
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      placeholder={
                        lang === "ar"
                          ? "حساسية، احتفالات، تفضيلات..."
                          : "Allergies, celebrations, seating preferences…"
                      }
                      rows={3}
                      className="aurelia-input resize-none"
                    />
                  </Field>
                  <button
                    type="submit"
                    className="group relative overflow-hidden rounded-full bg-champagne px-8 py-3.5 text-[11px] tracking-luxe uppercase text-ink font-medium hover:bg-cream transition-colors duration-500"
                  >
                    {t("reserve.form.submit")}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center py-12 md:py-20"
                >
                  <div className="text-champagne text-4xl mb-6">✦</div>
                  <h3 className="font-serif font-light text-3xl md:text-4xl leading-tight mb-4">
                    {t("reserve.form.success.title")}
                  </h3>
                  <p className="max-w-md text-cream/65 leading-relaxed">
                    {t("reserve.form.success.body")}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-10 text-[11px] tracking-luxe uppercase text-champagne border-b border-champagne/40 pb-1 hover:border-champagne transition-colors"
                  >
                    {t("reserve.form.again")}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] tracking-luxe uppercase text-cream/55 mb-2">
        {label}
        {required && <span className="text-champagne ms-1">*</span>}
      </span>
      {children}
    </label>
  );
}
