# AURELIA — Rooftop Restaurant

A premium bilingual (Arabic / English) restaurant website built with Next.js 16, TypeScript, Tailwind CSS 4, GSAP, Lenis, and Framer Motion.



<img width="1890" height="892" alt="صورة" src="https://github.com/user-attachments/assets/9ea79564-9a57-4264-bf94-a9f5919bb1f2" />



## Quick Start

```bash
# 1. Install dependencies
npm install        # or: bun install / yarn / pnpm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

> This project uses **Node 18+** and the **bun** package manager (recommended).
> If you don't have bun, `npm install` works the same way.

## Features

- **Bilingual (Arabic / English)** with full RTL support — toggle with the EN/ع button in the navbar
- **Cinematic video background** in the hero (rooftop cocktail pour)
- **Text-only menu** with dotted leader lines (classic fine-dining style)
- **Bilingual menu data** — every dish name, description, and category is translated
- **Smooth scroll** via Lenis
- **Scroll-triggered animations** via GSAP ScrollTrigger
- **Reservation form** with success state
- **Atmospheric ambient music** (synthesized via Web Audio API — no external file)
- **Fully responsive** (mobile + desktop)

## Project Structure

```
.
├── public/
│   └── videos/
│       ├── hero.mp4              # Hero background video
│       └── hero-poster.jpg       # Poster fallback
├── src/
│   ├── app/
│   │   ├── globals.css           # Tailwind + brand palette + utilities
│   │   ├── layout.tsx            # Fonts (Cormorant + Inter + Amiri for Arabic)
│   │   └── page.tsx              # Home page composition
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx          # Video background hero
│   │   │   ├── Story.tsx         # Brand story with image reveal
│   │   │   ├── Menu.tsx          # Text-only menu with category tabs
│   │   │   └── Reservation.tsx   # Booking form
│   │   └── site/
│   │       ├── Navbar.tsx        # Nav with language toggle
│   │       ├── Footer.tsx        # Footer
│   │       ├── MusicControl.tsx  # Ambient music widget (top-left)
│   │       ├── Preloader.tsx     # Cinematic intro
│   │       └── SmoothScrollProvider.tsx  # Lenis + GSAP integration
│   ├── lib/
│   │   ├── i18n.tsx              # Language context + translations dictionary
│   │   ├── menu-data.ts          # Menu items (bilingual)
│   │   └── images.ts             # Image library (z.ai OSS CDN)
│   └── hooks/
│       └── use-closing-countdown.ts  # Live countdown timer hook
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript 5**
- **Tailwind CSS 4** (with custom brand palette)
- **GSAP + ScrollTrigger** (parallax, reveals)
- **Lenis** (smooth scroll)
- **Framer Motion** (UI transitions)
- **Web Audio API** (ambient music synthesis)

## Brand Palette

```
--ink:        #0E1A2B  /* deep navy — primary background */
--ink-soft:   #162338  /* card background */
--mist:       #8B9AB0  /* secondary text */
--champagne:  #C9A961  /* gold accent */
--cream:      #F2EBD9  /* primary text */
```

## Customizing

- **Edit menu items**: `src/lib/menu-data.ts` — each item has `{ en, ar }` for name and description
- **Edit translations**: `src/lib/i18n.tsx` — the `DICT` object
- **Change hero video**: replace `public/videos/hero.mp4`
- **Change colors**: `src/app/globals.css` — the `:root` variables

## Notes

- The video background autoplays muted (browser policy). It starts on first user interaction.
- The ambient music is synthesized (4-chord pad via Web Audio API) — only starts when the user clicks play.
- All photography is from the z.ai OSS image CDN (royalty-free).

---

© Aurelia Rooftop. All rights reserved.
"# restaurant" 
