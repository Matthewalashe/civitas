
import {
  Map24Regular,
  BrainCircuit24Regular,
  Calculator24Regular,
  DocumentSearch24Regular,
  ShieldCheckmark24Regular,
  Ruler24Regular,
  WeatherRain24Regular,
  PeopleTeam24Regular,
  ArrowRight24Regular
} from "@fluentui/react-icons";
import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";

export default function Home() {
  const pillars = [
    
    {
      key: "planning",
      title: "Planning mismatches",
      body: "When your intended use conflicts with zoning or planning regulations.",
      img: "/pillars/planning.webp",
    },
    {
      key: "risks",
      title: "Hidden site risks",
      body: "Drainage, disputes, access, regulations, allocations, setbacks, and right-of-way issues people overlook.",
      img: "/pillars/risk.webp",
    },
    {
      key: "approvals",
      title: "Approval gaps",
      body: "Missing permits and documentation that delay or block projects.",
      img: "/pillars/approvals.png",
    },
    {
      key: "sequence",
      title: "Sequencing errors",
      body: "Doing the right thing — but in the wrong order — and paying for it.",
      img: "/pillars/sequence.webp",
    },
  ];

  const civitasDoes = [
    {
      title: "Clarifies uncertainty",
      body: "Explains what documents, layouts, and approvals usually mean in practice — not just on paper.",
    },
    {
      title: "Highlights real risks",
      body: "Surfaces common red flags people miss until it’s too late: access, drainage, setbacks, disputes.",
    },
    {
      title: "Guides next steps",
      body: "Shows what to verify, who to consult, and when to pause before committing money or building.",
    },
  ];

  return (
    <main className="text-slate-900">
      <Hero />

      {/* VALUE PILLARS — ESRI STYLE */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-semibold text-slate-900">
            What <span className="text-pink-500">Civitas</span> helps you avoid
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Civitas translates urban planning reality into clear, practical signals — before you commit money or start construction.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item) => (
              <Link
                key={item.key}
                href={`/overview?topic=${item.key}`}
                className="group flex flex-col border border-slate-200 p-4 transition hover:bg-slate-50/40 hover:shadow-md"
              >
                {/* Image */}
                <div
                  className="relative h-32 w-full overflow-hidden bg-slate-100
                             ring-1 ring-slate-200
                             transition-all duration-300
                             group-hover:ring-4 group-hover:ring-pink-400/80"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </div>

                {/* CTA pinned to bottom */}
                <div className="mt-auto pt-6">
                  <div
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-900
                               transition-all duration-200
                               group-hover:bg-pink-100 group-hover:text-pink-700
                               group-hover:px-3 group-hover:py-1"
                  >
                    <span>Learn more</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
{/* MODULES / CAPABILITIES — Flip cards with image header (front) */}
<section className="w-full border-t border-slate-200 bg-slate-50">
  <div className="mx-auto max-w-6xl px-6 py-24">
    <h2 className="text-center text-3xl font-semibold text-slate-900">
      What you can do with <span className="text-pink-500">Civitas</span>
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
      Core modules that turn urban complexity into clear decisions.
    </p>

    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {[
        {
          title: "Can I Build Here?",
          body:
            "Buildability guidance for a location — planning fit, risks, checks, and next steps.",
          href: "/can-i-build-here",
          tag: "Live",
          img: "/modules/build3.jfif",
        },
        {
          title: "Land & Tenure Signals",
          body:
            "Early signals on tenure patterns, land status, and documentation risk hotspots.",
          href: "/overview?topic=tenure",
          tag: "Coming",
          img: "/modules/tenure.jpg",
        },
        {
          title: "Approvals/Documentation",
          body:
            "What to confirm before payment — survey, title signals, and approval readiness checks.",
          href: "/overview?topic=approvals",
          tag: "Coming",
          img: "/modules/approval2.jpg",
        },
      ].map((m) => (
        <Link key={m.title} href={m.href} className="group block" aria-label={m.title}>
          <div className="[perspective:1200px]">
            <div
              className="relative h-72 w-full border border-slate-200 bg-white
                         transition-transform duration-500
                         [transform-style:preserve-3d]
                         group-hover:[transform:rotateY(180deg)]
                         group-hover:shadow-md"
            >
              {/* FRONT */}
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <div className="flex h-full flex-col">
                  {/* Full-bleed image header */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={m.img}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* subtle overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                    {/* Tag pill */}
                    <div className="absolute left-4 top-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 ${
                          m.tag === "Live"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-white/80 text-slate-700"
                        }`}
                      >
                        {m.tag}
                      </span>
                    </div>
                  </div>

                  {/* Bottom title area (big + conspicuous) */}
                  <div className="flex flex-1 flex-col justify-end p-5">
  <h3 className="text-2xl font-semibold leading-tight text-slate-900">
    {m.title}
  </h3>

  <div className="mt-3">
    <div className="inline-flex items-center gap-2 text-sm font-medium
                    text-slate-900 transition-all duration-200
                    group-hover:bg-pink-100 group-hover:text-pink-700
                    group-hover:px-3 group-hover:py-2">
      <span>Learn more</span>
      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </div>
  </div>
</div>
                </div>
              </div>

              {/* BACK (no image, dark card, keep as-is) */}
              <div
                className="absolute inset-0 bg-slate-900 text-white
                           [transform:rotateY(180deg)]
                           [backface-visibility:hidden]"
              >
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`text-xs font-semibold px-2 py-1 ${
                        m.tag === "Live"
                          ? "bg-pink-500/20 text-pink-300"
                          : "bg-white/10 text-slate-200"
                      }`}
                    >
                      {m.tag}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">{m.title}</h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-200">
                    {m.body}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="inline-flex items-center gap-2 text-sm font-medium
                                    bg-pink-500/15 text-pink-200 px-3 py-2">
                      <span>Learn more</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>  

      {/* WHAT CIVITAS DOES */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm font-medium text-slate-500">
          Civitas · Urban & Property Intelligence
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Before you buy land or start building,
          <br />
          understand the urban reality.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Civitas provides calm, location-aware guidance on land use, development risks,
          and what typically goes wrong — so you can decide with confidence.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/can-i-build-here"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            Can I Build Here?
          </Link>

          <Link
            href="/methodology"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            How Civitas Works
          </Link>
        </div>
      </section>

      {/* WHAT CIVITAS DOES — 3 cards */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-20 sm:grid-cols-3">
          {civitasDoes.map((item) => (
            <div key={item.title} className="rounded-xl bg-white p-6">
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      

      {/* WHY THIS EXISTS */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Why Civitas exists
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          Many land and building problems don’t come from bad intentions — they come from unclear processes,
          incomplete information, and assumptions that “everything will be sorted later”.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          Civitas exists to reduce costly mistakes by translating urban planning reality into clear,
          practical guidance before irreversible decisions are made.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            How it works
          </h2>

          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              "You describe the location and your intent.",
              "Civitas analyzes common patterns and risks for that context.",
              "You receive a clear guidance report you can act on.",
            ].map((step, idx) => (
              <li
                key={idx}
                className="rounded-xl bg-white p-6 text-sm leading-relaxed text-slate-700"
              >
                <span className="mb-2 inline-block text-xs font-semibold text-slate-500">
                  Step {idx + 1}
                </span>
                <div>{step}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DISCLAIMER BAND */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-10 text-xs leading-relaxed text-slate-500">
          Civitas provides informational guidance based on commonly observed patterns and professional practice.
          It does not issue approvals or replace official government processes.
        </div>
      </section>
    </main>
  );
}