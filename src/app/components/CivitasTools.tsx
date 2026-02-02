"use client";

import Link from "next/link";
import {
  BrainCircuit24Regular,
  Calculator24Regular,
  DocumentSearch24Regular,
  ShieldCheckmark24Regular,
  Ruler24Regular,
  Map24Regular,
  WeatherRain24Regular,
  PeopleTeam24Regular,
} from "@fluentui/react-icons";

type Tool = {
  title: string;
  desc: string;
  Icon: React.ComponentType<any>;
  category: string;
  status: "Coming" | "Live";
};

const tools: Tool[] = [
  {
    title: "AI Planning Assistant",
    desc: "Ask plain-language questions about planning rules, risks, and next steps.",
    Icon: BrainCircuit24Regular,
    category: "Intelligence",
    status: "Coming",
  },
  {
    title: "Approval Readiness Score",
    desc: "Quick signal on how ready a site is for statutory approvals.",
    Icon: ShieldCheckmark24Regular,
    category: "Signals",
    status: "Coming",
  },
  {
    title: "Document Signal Checker",
    desc: "Early warnings on survey, title, and documentation inconsistencies.",
    Icon: DocumentSearch24Regular,
    category: "Signals",
    status: "Coming",
  },
  {
    title: "Land Use Charge Calculator",
    desc: "Estimate statutory land-related charges before commitment.",
    Icon: Calculator24Regular,
    category: "Calculators",
    status: "Coming",
  },
  {
    title: "Coordinate & Area Tools",
    desc: "Measure plots, setbacks, and site dimensions with clarity.",
    Icon: Ruler24Regular,
    category: "Maps",
    status: "Coming",
  },
  {
    title: "Map & Boundary Tools",
    desc: "Visualise zoning, boundaries, and neighbourhood context.",
    Icon: Map24Regular,
    category: "Maps",
    status: "Coming",
  },
  {
    title: "Drainage & Flood Signals",
    desc: "Spot flood-prone and drainage-sensitive locations early.",
    Icon: WeatherRain24Regular,
    category: "Signals",
    status: "Coming",
  },
  {
    title: "Find a Professional",
    desc: "Connect with verified planners, surveyors, and consultants.",
    Icon: PeopleTeam24Regular,
    category: "Network",
    status: "Coming",
  },
];

export default function CivitasTools() {
  return (
    <section className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            Supporting <span className="text-pink-500">tools</span>
          </h2>
          <p className="mt-4 text-slate-600">
            Focused utilities that power Civitas signals — designed for clarity,
            not overwhelm.
          </p>
        </div>

        {/* Tools grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(({ title, desc, Icon, category, status }) => (
            <div
              key={title}
              className="group relative overflow-hidden border border-slate-200 bg-slate-50 p-6 transition hover:bg-white hover:shadow-md"
            >
              {/* faint base band */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-pink-500/40 via-fuchsia-500/20 to-transparent opacity-70 transition-opacity group-hover:opacity-0" />

              {/* hover frame */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-pink-600/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-pink-600/70 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-pink-600/70 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-pink-600/70 to-transparent" />
              </div>

              <div className="relative z-10 flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center border border-pink-200 bg-pink-50">
                  <Icon className="h-8 w-8 text-pink-600" />
                </div>

                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {category}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {desc}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                    {status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-12 border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Tools roll out progressively
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Join the waitlist to access tools as they become available.
              </p>
            </div>

            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}