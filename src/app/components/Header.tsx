"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/92 backdrop-blur border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link href="/" className="group inline-flex items-center gap-2">
          <span
            className={cx(
              "text-base font-semibold tracking-tight transition-colors",
              scrolled ? "text-slate-900" : "text-white"
            )}
          >
            Civitas
          </span>
          <span
            className={cx(
              "text-xs font-semibold px-2 py-1 transition-colors",
              scrolled
                ? "bg-pink-50 text-pink-700 border border-pink-200"
                : "bg-white/10 text-white border border-white/20 backdrop-blur"
            )}
          >
            advisory
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {[
            { label: "Methodology", href: "/methodology" },
            { label: "Pricing", href: "/pricing" },
            { label: "Learn", href: "/overview?topic=planning" },
          ].map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={cx(
                "text-sm font-medium transition-colors",
                scrolled ? "text-slate-700 hover:text-pink-600" : "text-white/85 hover:text-white"
              )}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/can-i-build-here"
            className={cx(
              "hidden sm:inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition",
              scrolled
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur"
            )}
          >
            Run free check
          </Link>

          <Link
            href="/waitlist"
            className={cx(
              "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition",
              scrolled
                ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                : "border border-white/30 bg-white text-slate-900 hover:bg-white/90"
            )}
          >
            Join waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}