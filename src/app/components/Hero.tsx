import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
   <section className="relative overflow-hidden">
  <div className="absolute inset-0 -z-10">
    <Image
      src="/hero/bg4.jpg"
      alt=""
      fill
      priority
      className="object-cover object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-900/25 to-transparent" />
  </div>


      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-md border border-slate-200 bg-white">
                <Image
                  src="/logo-nav.png"
                  alt="Civitas logo"
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-tight text-white">Civitas</p>
                <p className="text-xs text-white/70">Urban & Property Intelligence</p>
              </div>
            </div>

            <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
  Before you buy land or start building,
  <br />
  understand the <span className="text-pink-400">urban reality</span>.
</h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Calm, structured guidance that helps you avoid costly mistakes—access,
              drainage, setbacks, disputes, and documentation issues—before money is
              committed.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
              href="/can-i-build-here"
              className="inline-flex items-center justify-center gap-2 rounded-none bg-pink-500 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-400"
        >
              Run Module 1
              <ArrowRight className="h-4 w-4" />
            </Link>

              <Link
                href="/methodology"
                className="inline-flex items-center justify-center rounded-none border border-slate-100 px-6 py-3 text-sm font-bold text-slate-100 hover:bg-pink-900"
              >
                How Civitas Works
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust chips */}
            <div className="mt-10 flex flex-wrap gap-2">
              {[
                "Planning-aware guidance",
                "Print-ready report",
                "Built for Lagos (scales later)",
                "No jargon, clear steps",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur"

                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
