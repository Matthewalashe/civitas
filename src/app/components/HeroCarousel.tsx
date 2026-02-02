"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  src: string;
  kicker: string;
  title: string;
  subtitle: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HeroCarousel() {
  const slides: Slide[] = useMemo(
    () => [
      {
        src: "/hero/1.jpg",
        kicker: "CIVITAS · URBAN INTELLIGENCE TOOL",
        title: "Understand regulations and the truth before you buy land.",
        subtitle:
          "Planning-aware guidance that helps you avoid costly mistakes early.",
      },
      {
        src: "/hero/2.jpg",
        kicker: "RISK FIRST",
        title: "Most problems start before construction.",
        subtitle:
          "Access, drainage, setbacks, right-of-way, disputes—spot the signals.",
      },
      {
        src: "/hero/3.jpg",
        kicker: "CLARITY",
        title: "Get intelligent reports from the public domain.",
        subtitle:
          "No jargon. Clear next steps you can act on with confidence, and understand the truth before construction or buying property, anywhere.",
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
  const [paused, setPaused] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const DURATION = 6000;

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  // Auto-rotate (pauses on hover + when tab hidden)
  useEffect(() => {
    const clear = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    const start = () => {
      clear();
      intervalRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, DURATION);
    };

    const onVisibility = () => {
      if (document.hidden) clear();
      else if (!paused) start();
    };

    document.addEventListener("visibilitychange", onVisibility);
    if (!paused && slides.length > 1) start();

    return () => {
      clear();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused, slides.length]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  return (
    <section
      className={cx(
        "group relative overflow-hidden rounded-none border border-white/10",
        "bg-black/20 shadow-sm"
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Civitas hero highlights"
    >
      <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[560px]">
        {slides.map((s, i) => {
          const active = i === index;

          return (
              <div
              key={s.src}
              className={cx(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                active ? "opacity-100" : "opacity-0"
              )}
              aria-hidden={!active}
            >
              <Image
                src={s.src}
                alt={s.title}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />

              {/* Readability overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

              {/* Brand tint / signature feel */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-black/0 to-black/0" />

              {/* Subtle frame lines like your other sections */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-pink-500/35 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-pink-500/35 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
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

                  {/* Accent line */}
                  <div className="mt-4 h-1 w-16 rounded-none bg-pink-500" />
                </div>

                {/* Controls */}
                <div className="mt-5 flex items-center justify-between">
                  {/* Dots */}
                  <div
                    className="flex gap-2"
                    role="navigation"
                    aria-label="Slide navigation"
                  >
                    {slides.map((_, dotIndex) => {
                      const isActive = dotIndex === index;

                      return (
                        <button
                          key={dotIndex}
                          type="button"
                          aria-label={`Go to slide ${dotIndex + 1}`}
                          aria-current={isActive ? "true" : undefined}
                          onClick={() => setIndex(dotIndex)}
                          className={cx(
                            "h-2.5 w-2.5 rounded-none transition",
                            isActive
                              ? "bg-white"
                              : "bg-white/35 hover:bg-white/55",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500",
                            "focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
                          )}
                        />
                      );
                    })}
                  </div>

                  {/* Prev / Next */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="rounded-none border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
                      aria-label="Previous slide"
                    >
                      Prev
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      className="rounded-none border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
                      aria-label="Next slide"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress / systems strip */}
      <div className="h-1 w-full bg-white/10">
        <div
          key={index}
          className={cx(
            "h-1 bg-pink-500/90",
            paused ? "w-1/3" : "animate-[civitasProgress_6s_linear_1] w-full"
          )}
        />
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 w-full bg-pink-500" />

      <style jsx>{`
        @keyframes civitasProgress {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      `}</style>
    </section>
  );
}