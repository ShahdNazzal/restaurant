"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMAGES } from "@/lib/images";
import { useLang } from "@/lib/i18n";

export default function Story() {
  const { t, lang } = useLang();
  const root = useRef<HTMLDivElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  const imgInner = useRef<HTMLDivElement>(null);
  const maskTop = useRef<HTMLDivElement>(null);
  const maskBottom = useRef<HTMLDivElement>(null);
  const kicker = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const body = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imgWrap.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
      });
      tl.to(maskTop.current, { yPercent: -100, duration: 1, ease: "none" }, 0)
        .to(maskBottom.current, { yPercent: 100, duration: 1, ease: "none" }, 0)
        .fromTo(
          imgInner.current,
          { scale: 1.35 },
          { scale: 1.0, duration: 1, ease: "none" },
          0
        );

      gsap.to(imgInner.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: imgWrap.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(kicker.current, {
        opacity: 0,
        y: 40,
        duration: 1.1,
        scrollTrigger: { trigger: kicker.current, start: "top 85%" },
      });

      const words = headline.current?.querySelectorAll(".word") ?? [];
      gsap.from(words, {
        opacity: 0,
        y: 60,
        rotateX: -40,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: headline.current, start: "top 80%" },
      });

      gsap.from(body.current, {
        opacity: 0,
        y: 30,
        duration: 1.1,
        scrollTrigger: { trigger: body.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const titleWords1 = t("story.title.1").split(" ");
  const titleWords2 = t("story.title.2").split(" ");
  const titleWords3 = t("story.title.3").split(" ");
  const titleWords4 = t("story.title.4").split(" ");

  return (
    <section
      id="story"
      ref={root}
      className="relative bg-ink py-28 md:py-36"
      style={{ color: "var(--cream)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Image reveal */}
        <div
          ref={imgWrap}
          className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden"
        >
          <div
            ref={imgInner}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${IMAGES.story.plating})` }}
          />
          <div ref={maskTop} className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
          <div ref={maskBottom} className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />
        </div>

        {/* Text */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <div
              ref={kicker}
              className="text-[10px] tracking-luxe uppercase text-champagne flex items-center gap-3"
            >
              <span className="h-px w-8 bg-champagne/50" />
              {t("story.kicker")}
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2
              ref={headline}
              className="font-serif font-light text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
              style={{ perspective: 800 }}
            >
              {[titleWords1, titleWords2, titleWords3, titleWords4].map(
                (group, gi) => (
                  <span key={gi} className="inline-block">
                    {group.map((w, i) => (
                      <span
                        key={i}
                        className="word inline-block me-[0.25em]"
                      >
                        {w}
                      </span>
                    ))}
                    {gi === 1 || gi === 3 ? (
                      <span className="word inline-block text-gold-gradient italic">
                        {" "}
                      </span>
                    ) : null}
                    <br />
                  </span>
                )
              )}
            </h2>
            <p
              ref={body}
              className="mt-10 max-w-2xl text-base md:text-lg leading-relaxed text-cream/70"
            >
              {t("story.body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
