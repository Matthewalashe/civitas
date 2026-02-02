"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Tab = {
  id: "pro" | "cit" | "org" | "gov";
  label: string;
  sectorLabel: string;
  title: string;
  body: string;
  metrics: { k: string; v: string }[];
  href: string;
  img: string;
};

function CaseStudyCard({ t }: { t: Tab }) {
  return (
    <article className="group relative overflow-hidden border border-slate-200 bg-white transition hover:shadow-md">
      {/* bottom faint band */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-pink-600/45 via-fuchsia-500/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-0" />

      {/* hover frame */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-pink-600/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-pink-600/80 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-pink-600/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-pink-600/80 to-transparent" />
      </div>

      <div className="relative grid md:grid-cols-12">
        {/* image */}
        <div className="relative h-64 w-full bg-slate-100 md:col-span-5 md:h-auto">
          <Image
            src={t.img}
            alt={`${t.sectorLabel} case study`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

          <div className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
            {t.sectorLabel}
          </div>
        </div>

        {/* story */}
        <div className="p-6 md:col-span-7 md:p-10">
          <div className="text-xs font-semibold tracking-wide text-slate-500">
            {t.sectorLabel.toUpperCase()}
          </div>

          <h3 className="mt-2 text-3xl font-semibold leading-tight text-slate-900">
            {t.title}
          </h3>

          <p className="mt-4 text-slate-600">{t.body}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {t.metrics.map((m) => (
              <div
                key={m.k}
                className="border border-slate-200 bg-slate-50 p-3"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {m.k}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {m.v}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-500">
              Outcome:{" "}
              <span className="font-semibold text-slate-700">
                more confidence, less surprise
              </span>
            </div>

            <Link
              href={t.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:text-pink-600"
            >
              Read story{" "}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WhoUsesCivitasSection() {
  const tabs = useMemo<Tab[]>(
    () => [
      {
        id: "pro",
        label: "Built environment professionals",
        sectorLabel: "Professionals",
        title: "A project team avoids an approvals dead-end before excavation",
        body:
          "A builder was ready to mobilize, but Civitas flagged approvals readiness as Unknown and raised a planning-fit concern. The team verified zoning/masterplan constraints early and re-sequenced documentation — avoiding redesign, stoppage, and penalties.",
        metrics: [
          { k: "Used", v: "Buildability Check" },
          { k: "Focus", v: "Planning + permits" },
          { k: "Result", v: "Less rework" },
        ],
        href: "/can-i-build-here",
        img: "/case-studies/case1.jpg",
      },
      {
        id: "cit",
        label: "Citizens & buyers",
        sectorLabel: "Citizens & buyers",
        title: "A first-time buyer learns what to verify before paying",
        body:
          "A buyer felt pressured to pay quickly. Civitas made the remaining Unknowns obvious — dispute screening and approvals readiness. With a clear checklist, the buyer requested the right documents and avoided paying into a risky situation.",
        metrics: [
          { k: "Used", v: "Score + signals" },
          { k: "Focus", v: "Tenure + disputes" },
          { k: "Result", v: "Safer purchase" },
        ],
        href: "/can-i-build-here",
        img: "/case-studies/case4.jpg",
      },
      {
        id: "org",
        label: "Agencies & firms",
        sectorLabel: "Agencies & firms",
        title: "A firm standardizes risk checks across multiple sites",
        body:
          "A real estate advisory team needed a consistent way to triage sites before engaging lawyers, surveyors, and field verifiers. Civitas provided a repeatable structure — score, signals, and next steps — so teams could prioritize where deeper verification was necessary.",
        metrics: [
          { k: "Used", v: "Reports" },
          { k: "Focus", v: "Portfolio triage" },
          { k: "Result", v: "Faster screening" },
        ],
        href: "/pricing",
        img: "/case-studies/case2.jpg",
      },
      {
        id: "gov",
        label: "Government (users, not partners)",
        sectorLabel: "Government",
        title: "A unit structures citizen requests before field validation",
        body:
          "Teams often receive incomplete information. Civitas helps structure intake — what to ask, what to verify, and which cases should move to field validation. Note: Civitas is advisory and does not issue approvals.",
        metrics: [
          { k: "Used", v: "Checklists" },
          { k: "Focus", v: "Request triage" },
          { k: "Result", v: "Less back-and-forth" },
        ],
        href: "/methodology",
        img: "/case-studies/case6.jpg",
      },
    ],
    []
  );

  const [active, setActive] = useState<Tab["id"]>("pro");
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="relative w-full border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            Who uses <span className="text-pink-500">Civitas</span>?
          </h2>
          <p className="mt-4 text-slate-600">
            Stories from people and teams using Civitas to reduce land/property
            risk and move forward with clarity.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Civitas is advisory only — it does not represent government and does
            not issue approvals.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          {/* z-10 ensures tabs sit above any decorative absolute layers */}
          <div className="relative z-10 border-b border-slate-200">
            <div className="flex flex-wrap justify-center gap-8">
              {tabs.map((t) => {
                const isActive = t.id === active;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(t.id)}
                    aria-pressed={isActive}
                    className={[
                      "cursor-pointer select-none py-4 text-sm font-medium transition",
                      "border-b-2",
                      isActive
                        ? "text-slate-900 border-pink-600"
                        : "text-slate-500 border-transparent hover:text-pink-600 hover:border-pink-600",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 focus-visible:ring-offset-4",
                    ].join(" ")}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel */}
          <div className="relative z-0 mt-10">
            <CaseStudyCard t={activeTab} />
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Tip: Replace images in{" "}
            <span className="font-semibold">/public/case-studies/</span> anytime
            — keep filenames.
          </p>
        </div>
      </div>
    </section>
  );
}