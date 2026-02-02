import { ArrowRight } from "lucide-react";
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/35 to-black/25" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950/35 via-slate-950/10 to-transparent" />
      </div>

      {/* subtle grid / “systems” vibe */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>

            <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Don’t guess.
              <br />
              <span className="text-pink-400">Know</span> the planning reality{" "}
              <span className="text-white/85">before money moves.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Civitas gives you a <span className="text-white">Buildability Score</span>{" "}
              with clear signals on zoning fit, approvals readiness, tenure/document risks,
              access, setbacks, and flood/drainage exposure—plus the next steps in the right order.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/can-i-build-here"
                className="inline-flex items-center justify-center gap-2 rounded-none bg-pink-500 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-400"
              >
                Run a Buildability Check
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/methodology"
                className="inline-flex items-center justify-center gap-2 rounded-none border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                How Civitas Works
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust chips */}
            <div className="mt-10 flex flex-wrap gap-2">
              {[
                "Planning-aware guidance",
                "Score + signals",
                "Print-ready report",
                "Built for Lagos (scales later)",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur"
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