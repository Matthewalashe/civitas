"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheckmark24Regular,
  People24Regular,
  Gavel24Regular,
  Briefcase24Regular,
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
  name: string; // First Last
  discipline: Discipline;
  firm?: string;
  years: number;
  city: "Lagos";
  signatureProject: string;
  verified?: boolean;
  img?: string;
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
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dx: number) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden rounded-none border border-slate-200 bg-white p-5 shadow-sm">
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

      {/* Rail + controls */}
      <div className="relative mt-5">
        {/* Left button */}
        <button
          type="button"
          onClick={() => scrollBy(-360)}
          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm hover:bg-slate-50"
          aria-label="Scroll left"
        >
          ←
        </button>

        {/* Right button */}
        <button
          type="button"
          onClick={() => scrollBy(360)}
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm hover:bg-slate-50"
          aria-label="Scroll right"
        >
          →
        </button>

        {/* Fades behind buttons */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent" />

        {/* Scroll rail */}
        <div
          ref={railRef}
          className={cn(
            "relative z-20 flex gap-4 overflow-x-auto scroll-smooth",
            "pb-4 pt-1",
            "px-14", // keeps cards inside frame (space for buttons)
            "snap-x snap-mandatory"
          )}
        >
          {pros.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpen(p)}
              className={cn(
                "group min-w-[320px] max-w-[320px] snap-start border border-slate-200 bg-white p-4 text-left transition",
                "hover:bg-pink-50 hover:shadow-md"
              )}
            >
              {/* Accent line */}
              <div className="h-1 w-full bg-pink-200" />

              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Portrait */}
                 <div className="relative h-12 w-12 overflow-hidden bg-slate-100 ring-1 ring-slate-200 transition-all duration-300 group-hover:ring-pink-300 group-hover:shadow-sm">
  {p.img ? (
    <Image
      src={p.img}
      alt={p.name}
      fill
      sizes="48px"
      className="
        object-cover grayscale
        transition-all duration-300
        group-hover:grayscale-0
        group-hover:scale-110
      "
    />
  ) : null}

  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-tr from-pink-400/10 via-transparent to-white/10" />
</div>

                  <div className="min-w-0">
                    {/* Name: First + Last */}
                    <div className="text-sm font-semibold text-slate-900">{p.name}</div>

                    <div className="mt-0.5 text-xs text-slate-600">
                      {p.discipline}
                      {p.firm ? ` · ${p.firm}` : ""} · {p.city}
                    </div>
                  </div>
                </div>

                {/* Verified badge */}
                {p.verified ? (
                  <span className="inline-flex items-center gap-1 border border-pink-200 bg-pink-50 px-2 py-1 text-[11px] text-pink-700">
                    <ShieldCheckmark24Regular className="text-pink-600" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">
                    Listed
                  </span>
                )}
              </div>

              <div className="mt-4 border border-slate-200 bg-slate-50 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                  Signature project
                </div>
                <div className="mt-1 text-sm text-slate-800">{p.signatureProject}</div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                <span>{p.years}+ yrs</span>
                <span className="text-slate-500">Lagos</span>
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
        subtitle: "Experts shaping feasibility, form, and approvals.",
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
        subtitle: "Confidence for legality, valuation, and cost governance.",
        icon: <Gavel24Regular />,
        disciplines: ["Estate Lawyer", "Estate Valuer", "Quantity Surveyor"],
      },
      {
        key: "execution",
        title: "Execution Intelligence",
        subtitle: "Delivery and operational performance across build and lifecycle.",
        icon: <Briefcase24Regular />,
        disciplines: ["Builder", "Facilities Manager", "GIS Analyst"],
      },
    ],
    []
  );

  const pros: Pro[] = useMemo(
    () => [
      {
        id: "p1",
        name: "Adeola Oladipo",
        discipline: "Architect",
        firm: "Studio AO",
        years: 12,
        city: "Lagos",
        signatureProject: "Mixed-use residential delivery in Lekki",
        verified: true,
        img: "/network/1.jpg",
      },
      {
        id: "p2",
        name: "Ibrahim Balogun",
        discipline: "Town Planner",
        firm: "Metroform",
        years: 10,
        city: "Lagos",
        signatureProject: "Neighborhood layout and compliance optimization",
        verified: true,
        img: "/network/2.jpg",
      },
      {
        id: "p3",
        name: "Kelechi Eze",
        discipline: "Civil / Structural Engineer",
        firm: "Eze Structures",
        years: 14,
        city: "Lagos",
        signatureProject: "High-rise structural review and reinforcement strategy",
        verified: true,
        img: "/network/3.jpg",
      },
      {
        id: "p4",
        name: "Seyi Akinyemi",
        discipline: "Surveyor",
        firm: "Prime Surveys",
        years: 9,
        city: "Lagos",
        signatureProject: "Boundary and beacon validation to prevent disputes",
        verified: false,
        img: "/network/4.jpg",
      },
      {
        id: "p5",
        name: "Tunde Okoro",
        discipline: "Developer",
        firm: "Okoro Developments",
        years: 16,
        city: "Lagos",
        signatureProject: "Phased estate delivery with approvals sequencing",
        verified: true,
        img: "/network/5.jpg",
      },
      {
        id: "p6",
        name: "Ruth Adenuga",
        discipline: "Estate Lawyer",
        firm: "Adenuga & Co.",
        years: 11,
        city: "Lagos",
        signatureProject: "Title due diligence and perfection pathway advisory",
        verified: true,
        img: "/network/6.jpg",
      },
      {
        id: "p7",
        name: "Mustapha Yusuf",
        discipline: "Estate Valuer",
        firm: "ValuEdge",
        years: 8,
        city: "Lagos",
        signatureProject: "Valuation with comps-based pricing confidence",
        verified: true,
        img: "/network/7.jpg",
      },
      {
        id: "p8",
        name: "Nneka Onwudiwe",
        discipline: "Quantity Surveyor",
        firm: "QS Works",
        years: 13,
        city: "Lagos",
        signatureProject: "BOQ and cost risk controls across construction phases",
        verified: true,
        img: "/network/28.jpg",
      },
      {
        id: "p9",
        name: "Femi Adeola",
        discipline: "Builder",
        firm: "Adeola Build",
        years: 15,
        city: "Lagos",
        signatureProject: "Site delivery and quality control under schedule pressure",
        verified: false,
        img: "/network/19.jpg",
      },
      {
        id: "p10",
        name: "Precious Iroko",
        discipline: "Facilities Manager",
        firm: "Iroko FM",
        years: 9,
        city: "Lagos",
        signatureProject: "Asset lifecycle operations and maintenance governance",
        verified: true,
        img: "/network/30.jpg",
      },
      {
        id: "p11",
        name: "Daniel Bello",
        discipline: "GIS Analyst",
        firm: "GeoBello",
        years: 7,
        city: "Lagos",
        signatureProject: "Spatial overlays for risk and planning signals",
        verified: true,
        img: "/network/21.jpg",
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
    <section className="w-full border-t border-slate-200 bg-pink-100">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Centered header + centered CTA */}
        <div className="text-center">
          <p className="text-sm font-medium text-slate-500">Civitas · The Network</p>

          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            The <span className="text-pink-500">Civitas</span> Network
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            A curated network of built-environment professionals trusted to deliver compliant, investable work in Lagos.
            This is not a marketplace—membership is quality-controlled.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Join the waitlist <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        {/* Bands */}
        <div className="mt-12 grid gap-6">
          <TierBand tier={tiers[0]} pros={tierPros("decision")} onOpen={setSelected} />
          <TierBand tier={tiers[1]} pros={tierPros("authority")} onOpen={setSelected} />
          <TierBand tier={tiers[2]} pros={tierPros("execution")} onOpen={setSelected} />
        </div>

        {/* Modal */}
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
                    <div className="relative h-14 w-14 overflow-hidden bg-white ring-1 ring-slate-200">
                      {selected.img ? (
                        <Image
                          src={selected.img}
                          alt={selected.name}
                          fill
                          className="object-cover grayscale"
                          sizes="56px"
                        />
                      ) : null}
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-slate-900">{selected.name}</div>
                      <div className="mt-0.5 text-sm text-slate-600">
                        {selected.discipline}
                        {selected.firm ? ` · ${selected.firm}` : ""}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                        <span className="border border-slate-200 bg-white px-3 py-1">Lagos</span>
                        <span className="border border-slate-200 bg-white px-3 py-1">{selected.years}+ yrs</span>
                        {selected.verified ? (
                          <span className="inline-flex items-center gap-1 border border-pink-200 bg-pink-50 px-3 py-1 text-pink-700">
                            <ShieldCheckmark24Regular className="text-pink-600" />
                            Verified
                          </span>
                        ) : (
                          <span className="border border-slate-200 bg-white px-3 py-1">Listed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border border-slate-200 bg-white p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                      Signature project
                    </div>
                    <div className="mt-1 text-sm text-slate-800">{selected.signatureProject}</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold text-slate-900">Engage</div>
                  <p className="mt-2 text-sm text-slate-600">
                    Share your location and intent. We’ll route your request to the right expertise.
                  </p>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href="/waitlist"
                      className="inline-flex flex-1 items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
                    >
                      Join the waitlist <span className="ml-2">→</span>
                    </Link>
                    <Link
                      href="/methodology"
                      className="inline-flex flex-1 items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
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