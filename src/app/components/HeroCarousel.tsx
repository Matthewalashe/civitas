"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Slide = {
  src: string;
  kicker: string;
  title: string;
  subtitle: string;
};

export default function HeroCarousel() {
  const slides: Slide[] = useMemo(
    () => [
      {
        src: "/hero/1.jpg",
        kicker: "CIVITAS · URBAN INTELLIGENCE TOOL",
        title: "Understand regulations and the truth before you buy land.",
        subtitle: "Planning-aware guidance that helps you avoid costly mistakes early.",
      },
      {
        src: "/hero/2.jpg",
        kicker: "RISK FIRST",
        title: "Most problems start before construction.",
        subtitle: "Access, drainage, setbacks, right-of-way, disputes—spot the signals.",
      },
      {
        src: "/hero/3.jpg",
        kicker: "CLARITY",
        title: "Get intelligent reports from the public domain.",
        subtitle: "No jargon. Clear next steps you can act on with confidence, and understand the truth before construction or buying property, anywhere..",
      },
      {
        src: "/hero/4.jpg",
        kicker: "SCALE",
        title: "Built for Lagos, scales to any city.",
        subtitle: "A framework that grows with your needs and locations.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="relative overflow-hidden rounded-none border border-white/10 bg-black/20 shadow-sm">
      <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[560px]">
        {/* Slides (fade) */}
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={s.title}
              fill
              className="object-cover"
              priority={i === 0}
            />

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

            {/* Subtle brand tint */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(14, 13, 15, 0.18), rgba(0, 0, 0, 0) 45%)",
              }}
            />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div className="max-w-md">
                  <p className="text-xs font-semibold tracking-wide text-white/75">
                    {s.kicker}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {s.subtitle}
                  </p>

                  {/* Brand accent line */}
                  <div
                    className="mt-4 h-1 w-16 rounded-none"
                    style={{ backgroundColor: "var(--civitas-pink)" }}
                  />
                </div>

                {/* Logo badge (hero variant) */}
                <div className="hidden sm:block">
                  <div
                    className="rounded-none border border-white/10 px-4 py-3"
                    style={{ backgroundColor: "rgba(11,11,14,0.55)" }}
                  >
                    <div className="relative h-10 w-28">
                      <Image
                        src="/logo-hero.png"
                        alt="Civitas"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 w-2.5 rounded-none transition ${
                        i === index ? "bg-white" : "bg-white/35 hover:bg-white/55"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={goPrev}
                    className="rounded-none bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
                  >
                    Prev
                  </button>
                  <button
                    onClick={goNext}
                    className="rounded-none bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom accent bar (very ESRI-like) */}
      <div className="h-1 w-full" style={{ backgroundColor: "var(--civitas-pink)" }} />
    </div>
  );
}
