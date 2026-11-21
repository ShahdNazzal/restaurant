"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

export const DICT: Dict = {
  // Brand
  "brand.name": { en: "Aurelia", ar: "أوريليا" },
  "brand.sub": { en: "rooftop", ar: "" },
  "brand.tagline": {
    en: "Above the city. Beyond expectation.",
    ar: "فوق المدينة. فوق التوقّعات.",
  },
  "brand.kicker": {
    en: "A Rooftop Restaurant & Sky Lounge",
    ar: "مطعم سطح وصالة سماوية",
  },

  // Nav
  "nav.story": { en: "Story", ar: "القصة" },
  "nav.signatures": { en: "Signatures", ar: "المميّزات" },
  "nav.menu": { en: "Menu", ar: "المنيو" },
  "nav.reserve": { en: "Reserve", ar: "احجز" },
  "nav.reserveFull": { en: "Reserve a Table", ar: "احجز طاولة" },

  // Hero
  "hero.cta.menu": { en: "Menu", ar: "المنيو" },
  "hero.cta.reserve": { en: "Reserve a Table", ar: "احجز طاولة" },
  "hero.cta.signatures": { en: "Signatures", ar: "المميّزات" },
  "hero.scroll": { en: "Scroll", ar: "اسحب" },

  // Story
  "story.kicker": { en: "Our Story", ar: "قصتنا" },
  "story.title.1": { en: "A rooftop", ar: "سطح" },
  "story.title.2": { en: "opened to the sky.", ar: "مفتوح للسماء." },
  "story.title.3": { en: "A kitchen built around", ar: "مطبخ مبني حول" },
  "story.title.4": { en: "light, smoke, and salt.", ar: "الضوء، الدخان، والملح." },
  "story.body": {
    en: "Perched forty-seven floors above the city, Aurelia is a kitchen that breathes with the sky. The pass is open to the air; the olive wood fire is the only heat that touches the fish. As the sun goes down, the dining room turns gold, then amber, then indigo.",
    ar: "يرتفع أوريليا سبعة وأربعين طابقاً فوق المدينة، مطبخ يتنفّس مع السماء. الممر مفتوح للهواء، ونار خشب الزيتون هي الحرارة الوحيدة التي تلمس السمك. مع غروب الشمس، تتحوّل الصالة إلى ذهبية، ثم كهرمانية، ثم نيلية.",
  },

  // Signatures
  "signatures.kicker": { en: "Signatures", ar: "المميّزات" },
  "signatures.subtitle": { en: "Four dishes · Composed for the hour", ar: "أطباق أربعة · مركّبة للساعة" },
  "signatures.price": { en: "Price", ar: "السعر" },
  "signatures.pairs": { en: "Pairs With", ar: "يقترن مع" },

  // Menu
  "menu.kicker": { en: "Culinary Experience", ar: "تجربة طعام" },
  "menu.title.1": { en: "Our", ar: "منيو" },
  "menu.title.2": { en: "Menu", ar: "" },
  "menu.subtitle": {
    en: "The kitchen changes with the light. Below, the full menu — each chapter presented as it should be: name, description, price.",
    ar: "يتغيّر المطبخ مع الضوء. في الأسفل، المنيو الكامل — كل فصل مقدّم كما يجب: الاسم، الوصف، السعر.",
  },

  // Categories
  "cat.aperitifs": { en: "Apéritifs", ar: "أبريتيف" },
  "cat.raw": { en: "Raw & Cured", ar: "نيء ومعالج" },
  "cat.small": { en: "Small Plates", ar: "أطباق صغيرة" },
  "cat.mains": { en: "Mains", ar: "أطباق رئيسية" },
  "cat.sweets": { en: "Sweets", ar: "حلويات" },

  // Reservation
  "reserve.kicker": { en: "Reserve", ar: "احجز" },
  "reserve.title.1": { en: "Reserve", ar: "احجز" },
  "reserve.title.2": { en: "your hour", ar: "ساعتك" },
  "reserve.title.3": { en: "above the city.", ar: "فوق المدينة." },
  "reserve.body": {
    en: "The dining room opens at 5:00 PM, with the last seating at 10:30 PM. Reservations are recommended for the rail at sunset.",
    ar: "تُفتح الصالة عند 5:00 مساءً، وآخر جلوس عند 10:30 مساءً. يُنصح بالحجز المسبق.",
  },
  "reserve.form.name": { en: "Full Name", ar: "الاسم الكامل" },
  "reserve.form.phone": { en: "Phone", ar: "الهاتف" },
  "reserve.form.date": { en: "Date", ar: "التاريخ" },
  "reserve.form.time": { en: "Time", ar: "الوقت" },
  "reserve.form.guests": { en: "Guests", ar: "الضيوف" },
  "reserve.form.seating": { en: "Seating", ar: "الجلوس" },
  "reserve.form.notes": { en: "Notes", ar: "ملاحظات" },
  "reserve.form.submit": { en: "Request Reservation", ar: "اطلب حجز" },
  "reserve.form.success.title": { en: "Your hour is requested.", ar: "تمّ طلب ساعتك." },
  "reserve.form.success.body": {
    en: "A concierge will confirm within 4 hours.",
    ar: "سيؤكّد الكونسيرج خلال 4 ساعات.",
  },
  "reserve.form.again": { en: "Make Another Request", ar: "اطلب حجز آخر" },
  "reserve.seating.dining": { en: "Dining Room", ar: "الصالة" },
  "reserve.seating.rail": { en: "The Rail · Sunset", ar: "الحاجز · الغروب" },
  "reserve.seating.counter": { en: "Chef's Counter", ar: "مقابل الشيف" },

  // Footer
  "footer.hours": { en: "Opening hours: 5:00 PM – 1:00 AM", ar: "ساعات العمل: 5:00 مساءً – 1:00 صباحاً" },
  "footer.discover": { en: "Discover", ar: "اكتشف" },
  "footer.connect": { en: "Connect", ar: "تواصل" },
  "footer.visit": { en: "Visit", ar: "زرنا" },
  "footer.address": { en: "1 Skyline Plaza · Floor 47 · New York", ar: "١ سكايلاين بلازا · الطابق ٤٧ · نيويورك" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },

  // Music
  "music.label": { en: "Atmosphere", ar: "الأجواء" },
  "music.nowPlaying": { en: "Now Playing", ar: "يعمل الآن" },
  "music.name": { en: "Aurelia · Sky Pad", ar: "أوريليا · سماء" },
};

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (key: string) => DICT[key]?.[lang] ?? key;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
