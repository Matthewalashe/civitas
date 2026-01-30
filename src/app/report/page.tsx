"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Intent = "buy_land" | "start_building" | "already_building" | "risk_check";

type Payload = {
  name: string;
  email: string;
  area: string;
  lcda: string;
  intent: Intent;
  message?: string;
  ts: number;
};

const KEY = "civitas_m1_v1";

function intentLabel(i: Intent) {
  switch (i) {
    case "buy_land":
      return "Buying land";
    case "start_building":
      return "Starting construction";
    case "already_building":
      return "Already building";
    case "risk_check":
      return "Risk check";
  }
}

export default function ReportPage() {
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    try {
      setData(JSON.parse(raw));
    } catch {
      setData(null);
    }
  }, []);

  const report = useMemo(() => {
    if (!data) return null;

    // Lightweight “smart” guidance (we’ll upgrade this with real templates later)
    const summary = [
      `Location: ${data.area} (${data.lcda})`,
      `Intent: ${intentLabel(data.intent)}`,
      `Contact: ${data.name} · ${data.email}`,
    ];

    const commonChecks = [
      "Confirm survey authenticity and that coordinates match ground reality.",
      "Verify access road: is it physically open, and is width reasonable?",
      "Ask for chain of title: survey, deed, governor’s consent (if applicable).",
      "Check flood/drainage paths (especially near canals/lowland).",
      "Confirm setbacks / right-of-way constraints near major corridors.",
    ];

    const riskSignals = [
      "Seller avoids showing original documents or insists on “quick payment”.",
      "Access road exists only on paper, not on ground.",
      "Neighbours mention disputes, demolition history, or repeated stop-work.",
      "Boundary beacons are missing / inconsistent or survey is “hand-drawn”.",
      "Site looks like a water path during rainfall or has persistent damp soil.",
    ];

    const nextSteps = [
      "Do a document review before paying major sums.",
      "Visit the site with someone who can interpret survey boundaries.",
      "Get clarity on layout status and any known constraints in the area.",
      "If building: validate setbacks, drainage plan, and access before foundation.",
    ];

    return { summary, commonChecks, riskSignals, nextSteps };
  }, [data]);

  if (!data || !report) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">No report found</h1>
        <p className="mt-3 text-sm text-slate-600">
          Please complete Module 1 first.
        </p>
        <Link
          href="/can-i-build-here"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          Go to Module 1
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Civitas Report</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Guidance Summary
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            This is a practical guidance snapshot (MVP). You can print/save it.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          Print / Save PDF
        </button>
      </div>

      <section className="rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-900">Summary</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {report.summary.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-900">Common Checks</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
          {report.commonChecks.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-900">Risk Signals</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
          {report.riskSignals.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-900">Recommended Next Steps</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
          {report.nextSteps.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-slate-50 p-6">
        <h2 className="text-base font-semibold text-slate-900">Disclaimer</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Civitas provides informational guidance and common patterns, not official approvals or legal rulings.
          Always verify documents and constraints with appropriate professionals and relevant authorities.
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/can-i-build-here"
          className="inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          Run again
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
