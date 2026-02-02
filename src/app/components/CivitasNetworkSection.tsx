"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ShieldCheckmark24Regular,
  People24Regular,
  Gavel24Regular,
  Briefcase24Regular,
  ArrowRight24Regular,
  Building24Regular,
  Map24Regular,
  Ruler24Regular,
  HomeMore24Regular,
  Money24Regular,
  Wrench24Regular,
  ScaleFill24Regular,
} from "@fluentui/react-icons";

type TierKey = "decision" | "authority" | "execution";

type Discipline =
  | "Architect"
  | "Town Planner"
  | "Civil / Structural Engineer"
  | "Surveyor"
  | "Developer"
  | "Estate Lawyer"
  | "Estate Valuer"
  | "Facilities Manager"
  | "Builder"
  | "Quantity Surveyor"
  | "GIS Analyst";

type Pro = {
  id: string;
  name: string;
  discipline: Discipline;
  firm?: string;
  years: number;
  city: "Lagos";
  signatureProject: string;
  verified?: boolean;
  founding?: boolean;
};

type Tier = {
  key: TierKey;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  disciplines: Discipline[];
};

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function disciplineIcon(d: Discipline) {
  switch (d) {
    case "Architect":
      return <Building24Regular />;
    case "Town Planner":
      return <Map24Regular />;
    case "Civil / Structural Engineer":
      return <Ruler24Regular />;
    case "Surveyor":
      return <Ruler24Regular />;
    case "Developer":
      return <HomeMore24Regular />;
    case "Estate Lawyer":
      return <Gavel24Regular />;
    case "Estate Valuer":
      return <Money24Regular />;
    case "Facilities Manager":
      return <Briefcase24Regular />;
    case "Builder":
      return <Wrench24Regular />;
    case "Quantity Surveyor":
      return <ScaleFill24Regular />;
    case "GIS Analyst":
      return <Map24Regular />;
    default:
      return <People24Regular />;
  }
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <button
            onClick={onClose}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-800 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function TierBand({
  tier,
  pros,
  onOpen,
}: {
  tier: Tier;
  pros: Pro[];
  onOpen: (p: Pro) => void;
}) {
  return (
    <div className="border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
            <span className="text-slate-900">{tier.icon}</span>
            Curated band
          </div>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">{tier.title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">{tier.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          {tier.disciplines.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
            >
              <span className="text-slate-900">{disciplineIcon(d)}</span>
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Dossier rail (not a marketplace grid) */}
      <div className="relative mt-5">
        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {pros.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpen(p)}
              className="group min-w-[320px] max-w-[320px] border border-slate-200 bg-white p-4 text-left transition hover:bg-slate-50/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* portrait placeholder */}
                  <div className="h-12 w-12 bg-slate-100 ring-1 ring-slate-200" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                    <div className="mt-0.5 text-xs text-slate-600">
                      {p.discipline}
                      {p.firm ? ` · ${p.firm}` : ""} · {p.city}
                    </div>
                  </div>
                </div>

                <span
                  className={cn(
                    "inline-flex items-center gap-1 border px-2 py-1 text-[11px]",
                    p.verified
                      ? "border-slate-200 bg-slate-50 text-slate-800"
                      : "border-slate-200 bg-white text-slate-700"
                  )}
                >
                  {p.verified ? (
                    <>
                      <ShieldCheckmark24Regular /> Verified
                    </>
                  ) : (
                    <>Listed</>
                  )}
                </span>
              </div>

              <div className="mt-4 border border-slate-200 bg-slate-50 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                  Signature project
                </div>
                <div className="mt-1 text-sm text-slate-800">{p.signatureProject}</div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                <span>{p.years}+ yrs</span>
                {p.founding ? (
                  <span className="border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                    Founding Network
                  </span>
                ) : (
                  <span className="text-slate-500">Civitas Network</span>
                )}
              </div>

              <div
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900
                           transition-all duration-200
                           group-hover:bg-pink-100 group-hover:text-pink-700
                           group-hover:px-3 group-hover:py-2"
              >
                <span>Open dossier</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* fade edges for premium feel */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
}

export default function CivitasNetwork() {
  const tiers: Tier[] = useMemo(
    () => [
      {
        key: "decision",
        title: "Urban Decision Makers",
        subtitle: "Upstream experts shaping feasibility, form, and approvals in Lagos (V1).",
        icon: <People24Regular />,
        disciplines: [
          "Architect",
          "Town Planner",
          "Developer",
          "Civil / Structural Engineer",
          "Surveyor",
        ],
      },
      {
        key: "authority",
        title: "Financial & Regulatory Authorities",
        subtitle: "Confidence for legality, valuation, and cost governance before capital is committed.",
        icon: <Gavel24Regular />,
        disciplines: ["Estate Lawyer", "Estate Valuer", "Quantity Surveyor"],
      },
      {
        key: "execution",
        title: "Execution Intelligence",
        subtitle: "Delivery and operational performance across build + lifecycle.",
        icon: <Briefcase24Regular />,
        disciplines: ["Builder", "Facilities Manager", "GIS Analyst"],
      },
    ],
    []
  );

  // Demo dataset. Replace with real profiles later (or wire from JSON).
  const pros: Pro[] = useMemo(
    () => [
      {
        id: "p1",
        name: "A. Oladipo",
        discipline: "Architect",
        firm: "Studio AO",
        years: 12,
        city: "Lagos",
        signatureProject: "Mixed-use residential delivery in Lekki",
        verified: true,
        founding: true,
      },
      {
        id: "p2",
        name: "I. Balogun",
        discipline: "Town Planner",
        firm: "Metroform",
        years: 10,
        city: "Lagos",
        signatureProject: "Neighborhood layout + compliance optimization",
        verified: true,
        founding: true,
      },
      {
        id: "p3",
        name: "K. Eze",
        discipline: "Civil / Structural Engineer",
        firm: "Eze Structures",
        years: 14,
        city: "Lagos",
        signatureProject: "High-rise structural review + reinforcement strategy",
        verified: true,
      },
      {
        id: "p4",
        name: "S. Akinyemi",
        discipline: "Surveyor",
        firm: "Prime Surveys",
        years: 9,
        city: "Lagos",
        signatureProject: "Boundary + beacon validation and dispute prevention",
        verified: false,
      },
      {
        id: "p5",
        name: "T. Okoro",
        discipline: "Developer",
        firm: "Okoro Developments",
        years: 16,
        city: "Lagos",
        signatureProject: "Phased estate delivery with approvals sequencing",
        verified: true,
      },
      {
        id: "p6",
        name: "R. Adenuga",
        discipline: "Estate Lawyer",
        firm: "Adenuga & Co.",
        years: 11,
        city: "Lagos",
        signatureProject: "Title due diligence + perfection pathway advisory",
        verified: true,
      },
      {
        id: "p7",
        name: "M. Yusuf",
        discipline: "Estate Valuer",
        firm: "ValuEdge",
        years: 8,
        city: "Lagos",
        signatureProject: "Market valuation + comps-based pricing confidence",
        verified: true,
      },
      {
        id: "p8",
        name: "N. Onwudiwe",
        discipline: "Quantity Surveyor",
        firm: "QS Works",
        years: 13,
        city: "Lagos",
        signatureProject: "BOQ + cost risk controls across construction phases",
        verified: true,
      },
      {
        id: "p9",
        name: "F. Adeola",
        discipline: "Builder",
        firm: "Adeola Build",
        years: 15,
        city: "Lagos",
        signatureProject: "Site delivery + quality control under schedule pressure",
        verified: false,
      },
      {
        id: "p10",
        name: "P. Iroko",
        discipline: "Facilities Manager",
        firm: "Iroko FM",
        years: 9,
        city: "Lagos",
        signatureProject: "Asset lifecycle operations + maintenance governance",
        verified: true,
      },
      {
        id: "p11",
        name: "D. Bello",
        discipline: "GIS Analyst",
        firm: "GeoBello",
        years: 7,
        city: "Lagos",
        signatureProject: "Spatial overlays for risk + planning signals",
        verified: true,
      },
    ],
    []
  );

  const [selected, setSelected] = useState<Pro | null>(null);

  const tierPros = (tierKey: TierKey) => {
    const t = tiers.find((x) => x.key === tierKey)!;
    return pros.filter((p) => t.disciplines.includes(p.discipline));
  };

  return (
    <section className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Header aligned to your page rhythm */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Civitas · The Network
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              The <span className="text-pink-500">Civitas</span> Network
            </h2>

            <p className="mt-4 max-w-2xl text-slate-600">
              A curated network of built-environment professionals trusted to deliver compliant, investable work in Lagos.
              This is not a marketplace—membership is quality-controlled.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/network"
              className="inline-flex items-center justify-center border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Browse network
            </Link>

            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Apply to join <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        {/* Bands */}
        <div className="mt-12 grid gap-6">
          <TierBand tier={tiers[0]} pros={tierPros("decision")} onOpen={setSelected} />
          <TierBand tier={tiers[1]} pros={tierPros("authority")} onOpen={setSelected} />
          <TierBand tier={tiers[2]} pros={tierPros("execution")} onOpen={setSelected} />
        </div>

        {/* Bottom note (institutional) */}
        <div className="mt-10 border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
          <div className="font-semibold text-slate-900">Versioning note</div>
          <p className="mt-2 text-slate-600">
            Messaging, booking, and payments are deferred to later releases. Civitas prioritizes decision quality and trust signals in V1.
          </p>
        </div>

        {/* Dossier modal */}
        <Modal
          open={!!selected}
          onClose={() => setSelected(null)}
          title={selected ? `${selected.name} — Dossier` : "Dossier"}
        >
          {selected && (
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-14 w-14 bg-white ring-1 ring-slate-200" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{selected.name}</div>
                      <div className="mt-0.5 text-sm text-slate-600">
                        {selected.discipline}
                        {selected.firm ? ` · ${selected.firm}` : ""}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                        <span className="border border-slate-200 bg-white px-3 py-1">
                          Lagos
                        </span>
                        <span className="border border-slate-200 bg-white px-3 py-1">
                          {selected.years}+ yrs
                        </span>
                        <span className="border border-slate-200 bg-white px-3 py-1">
                          {selected.verified ? "Civitas Verified" : "Listed"}
                        </span>
                        {selected.founding && (
                          <span className="border border-slate-200 bg-white px-3 py-1">
                            Founding Network
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border border-slate-200 bg-white p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                      Signature project
                    </div>
                    <div className="mt-1 text-sm text-slate-800">
                      {selected.signatureProject}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold text-slate-900">
                    How Civitas recommends engaging (V1)
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Share location + intent first. Generate a Buildability Score and attach it to your request for sharper decisions.
                  </p>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href="/can-i-build-here"
                      className="inline-flex flex-1 items-center justify-center bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
                    >
                      Start Buildability Check <span className="ml-2">→</span>
                    </Link>
                    <Link
                      href="/methodology"
                      className="inline-flex flex-1 items-center justify-center border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                    >
                      View Methodology
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}