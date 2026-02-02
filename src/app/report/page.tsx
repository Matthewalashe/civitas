"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Intent = "buy_land" | "start_building" | "already_building" | "risk_check";

type Payload = {
  intent: Intent;
  name: string;
  email: string;

  // New fields (from updated intake)
  address?: string;
  coords?: { lat: number; lng: number };

  // Existing fields
  area: string;
  landmark: string;
  lcda: string;
  message?: string;

  ts: number;
};

const STORAGE_KEY = "civitas_m1_v1";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function intentLabel(i: Intent) {
  switch (i) {
    case "buy_land":
      return "Buying land";
    case "start_building":
      return "Starting construction";
    case "already_building":
      return "Already building";
    case "risk_check":
      return "Risk check only";
  }
}

type RiskLevel = "low" | "medium" | "high";
type SignalStatus = "good" | "watch" | "risk" | "unknown";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function riskLabel(level: RiskLevel) {
  if (level === "low") return "Low";
  if (level === "medium") return "Medium";
  return "High";
}

function normalizeKey(s: string) {
  return (s || "").trim().toLowerCase();
}

/**
 * Public-domain / advisory KB (LCDA-level).
 * Keep this “broad” until you plug official datasets / parcel-level verification.
 */
const PUBLIC_DOMAIN_KB: Record<
  string,
  {
    zoningNotes: string[];
    planningSignals: string[];
    approvalsPath: string[];
    commonRisks: string[];
    confidenceNote: string;
  }
> = {
  ikorodu: {
    zoningNotes: [
      "Land use can vary sharply by corridor: residential clusters, mixed-use strips near major roads, and institutional pockets.",
      "If the intended use is multi-unit or commercial, confirm planning designation and right-of-way constraints early.",
    ],
    planningSignals: [
      "Look for road expansion history and drainage channels; they often create non-obvious setbacks and restrictions.",
      "Confirm access hierarchy (primary/secondary road) and easements before committing to design.",
    ],
    approvalsPath: [
      "Verify survey authenticity and trace title chain before expensive approvals.",
      "Confirm planning permit requirements for the proposed use and building scale before mobilization.",
    ],
    commonRisks: [
      "Drainage/flood exposure in low-lying pockets",
      "Right-of-way encroachments near major corridors",
      "Boundary disputes and documentation gaps",
    ],
    confidenceNote:
      "This is an advisory LCDA-level brief. Exact zoning and constraints depend on the parcel’s official planning designation and survey.",
  },
};

function inferTopicsFromMessage(message?: string) {
  const text = (message || "").toLowerCase();
  const topics = new Set<string>();
  const add = (t: string) => topics.add(t);
  if (!text) return topics;

  if (/(zoning|zone|residential|commercial|mixed|industrial|land use)/.test(text)) add("zoning");
  if (/(setback|right of way|row|easement|encroach)/.test(text)) add("row_setback");
  if (/(drainage|flood|flooding|water|canal|swamp)/.test(text)) add("drainage");
  if (/(permit|approval|planning permit|ministry|authority)/.test(text)) add("approvals");
  if (/(survey|c of o|coo|excision|gazette|title|deed|registry)/.test(text)) add("title_docs");
  if (/(budget|cost|money|price|agent|seller)/.test(text)) add("cost_risk");
  if (/(urgent|asap|quick|today|tomorrow)/.test(text)) add("urgency");
  if (/(school|hospital|church|mosque|shop|market|warehouse|factory|fuel)/.test(text)) add("use_case");

  return topics;
}

function buildScore(payload: Payload) {
  let score = 80;

  const hasAddress = (payload.address || "").trim().length >= 5;
  const hasLandmark = payload.landmark.trim().length >= 2;
  const hasMessage = (payload.message || "").trim().length >= 15;

  // Missing context reduces confidence
  if (!hasAddress) score -= 5;
  if (!hasLandmark) score -= 5;
  if (!hasMessage) score -= 5;

  // Intent adjustments
  if (payload.intent === "buy_land") score -= 4;
  if (payload.intent === "already_building") score -= 8;

  // Keyword-based risk
  const topics = inferTopicsFromMessage(payload.message);
  if (topics.has("title_docs")) score -= 4;
  if (topics.has("drainage")) score -= 4;
  if (topics.has("row_setback")) score -= 4;

  score = clamp(score, 20, 92);

  let risk: RiskLevel = "medium";
  if (score >= 78) risk = "low";
  if (score < 55) risk = "high";

  return { score, risk, topics };
}

function scoreBand(score: number) {
  if (score >= 78) return "Proceed with verification";
  if (score >= 55) return "Proceed cautiously";
  return "High risk — verify before spending";
}

function signalColor(s: SignalStatus) {
  if (s === "good") return "bg-emerald-500";
  if (s === "watch") return "bg-amber-500";
  if (s === "risk") return "bg-rose-500";
  return "bg-slate-400";
}

function signalLabel(s: SignalStatus) {
  if (s === "good") return "Good";
  if (s === "watch") return "Watch";
  if (s === "risk") return "Risk";
  return "Unknown";
}

function buildSignals(payload: Payload, topics: Set<string>) {
  const hasAddress = (payload.address || "").trim().length >= 5;
  const hasLandmark = payload.landmark.trim().length >= 2;
  const hasCoords = !!payload.coords;

  const signals: Array<{
    title: string;
    status: SignalStatus;
    why: string;
    action: string;
  }> = [];

  // Location clarity
  const locationStatus: SignalStatus =
    hasCoords || (hasAddress && hasLandmark) ? "good" : hasAddress || hasLandmark ? "watch" : "unknown";

  signals.push({
    title: "Location clarity",
    status: locationStatus,
    why:
      locationStatus === "good"
        ? "Enough anchors to reduce “wrong place” risk."
        : locationStatus === "watch"
        ? "Some anchors exist, but location may still be ambiguous."
        : "Location is not anchored strongly enough to make confident checks.",
    action:
      locationStatus === "good"
        ? "Proceed to verification checks using the same exact location details."
        : "Add street/address + nearest major junction; optionally capture coordinates.",
  });

  // Title & documents
  const docsStatus: SignalStatus = topics.has("title_docs")
    ? "risk"
    : payload.intent === "buy_land"
    ? "watch"
    : "watch";

  signals.push({
    title: "Title & documents",
    status: docsStatus,
    why:
      docsStatus === "risk"
        ? "Your message suggests document/title uncertainty — a common failure point."
        : "Document verification is mandatory before major spend.",
    action:
      "Request: survey plan + root of title. Verify survey authenticity and seller authority before payment or approvals.",
  });

  // ROW / setbacks
  const rowStatus: SignalStatus = topics.has("row_setback")
    ? "risk"
    : payload.intent === "already_building"
    ? "watch"
    : "watch";

  signals.push({
    title: "Right-of-way & setbacks",
    status: rowStatus,
    why:
      rowStatus === "risk"
        ? "Setback/ROW issues can trigger demolition risk or approval failure."
        : "ROW/setbacks are frequent hidden constraints, especially near major corridors.",
    action:
      "Check road expansion history, drainage/powerline easements, and confirm required setbacks before design freeze.",
  });

  // Drainage
  const drainageStatus: SignalStatus = topics.has("drainage") ? "risk" : "watch";
  signals.push({
    title: "Drainage / flood exposure",
    status: drainageStatus,
    why:
      drainageStatus === "risk"
        ? "Drainage/flood indicators mentioned — can raise foundation + infrastructure costs."
        : "Many areas have micro-flood pockets; treat as a required early check.",
    action:
      "Ask for local flood history, inspect during/after rain, check drainage corridors/canals, and get a basic site assessment.",
  });

  // Approvals readiness
  const approvalsStatus: SignalStatus =
    payload.intent === "start_building" || payload.intent === "already_building"
      ? topics.has("approvals")
        ? "risk"
        : "watch"
      : "unknown";

  signals.push({
    title: "Approvals readiness",
    status: approvalsStatus,
    why:
      approvalsStatus === "unknown"
        ? "Approvals only become relevant once title + constraints are clearer."
        : approvalsStatus === "risk"
        ? "You referenced approvals — but timing/order may still be wrong."
        : "Approvals are likely needed; readiness depends on use-case + designation.",
    action:
      "Confirm planning designation for intended use, then map required permits and sequence them after document verification.",
  });

  // Use-case fit
  const useCaseStatus: SignalStatus = topics.has("use_case")
    ? "watch"
    : (payload.message || "").trim().length >= 15
    ? "watch"
    : "unknown";

  signals.push({
    title: "Use-case fit",
    status: useCaseStatus,
    why:
      useCaseStatus === "unknown"
        ? "No clear use-case stated; constraints depend heavily on what you want to build."
        : "Use-case affects zoning compatibility, parking needs, setbacks, and approvals.",
    action:
      "State the intended use (flats, shops, warehouse, etc.) + approximate scale (floors/units) to sharpen the brief.",
  });

  return signals;
}

export default function ReportPage() {
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Payload;
      setData(parsed);
    } catch {
      setData(null);
    }
  }, []);

  const analysis = useMemo(() => {
    if (!data) return null;

    const key = normalizeKey(data.lcda);
    const kb = PUBLIC_DOMAIN_KB[key];

    const { score, risk, topics } = buildScore(data);

    const highlights: string[] = [];
    if (data.intent === "buy_land") {
      highlights.push("Verify title chain and survey authenticity before payment.");
      highlights.push("Confirm planning designation and right-of-way constraints early.");
    }
    if (data.intent === "start_building") {
      highlights.push("Validate approvals readiness before mobilization.");
      highlights.push("Confirm setbacks, access, and drainage assumptions before design freeze.");
    }
    if (data.intent === "already_building") {
      highlights.push("Stop-loss check: confirm compliance risks before further spend.");
      highlights.push("Resolve any right-of-way/setback conflicts immediately.");
    }
    if (data.intent === "risk_check") {
      highlights.push("Risk-first scan across approvals, constraints, and documentation.");
      highlights.push("Identify unknowns to verify with evidence.");
    }

    const tailoredFocus: string[] = [];
    if (topics.has("title_docs")) tailoredFocus.push("Title & documents");
    if (topics.has("approvals")) tailoredFocus.push("Approvals pathway");
    if (topics.has("drainage")) tailoredFocus.push("Drainage / flood exposure");
    if (topics.has("row_setback")) tailoredFocus.push("Setbacks / right-of-way");
    if (topics.has("use_case")) tailoredFocus.push("Use-case fit");
    if (topics.has("cost_risk")) tailoredFocus.push("Cost & negotiation risk");
    if (topics.has("urgency")) tailoredFocus.push("Fast-track sequencing");

    const brief =
      kb || {
        zoningNotes: [
          "Zoning and planning designations vary by corridor and neighbourhood. Confirm the parcel’s official designation before you commit.",
        ],
        planningSignals: [
          "Check access hierarchy, setbacks, and drainage assumptions early. These often cause expensive surprises.",
        ],
        approvalsPath: [
          "Verify documents and title chain first, then map the approvals path for your intended use.",
        ],
        commonRisks: ["Documentation gaps", "Right-of-way/setback conflicts", "Drainage exposure"],
        confidenceNote:
          "This is an advisory brief. We need authoritative datasets and parcel-level verification to be precise.",
      };

    const clarifyingQuestions: string[] = [];
    if (!(data.address || "").trim()) {
      clarifyingQuestions.push("What is the street/estate/layout name (or closest known address) for this site?");
    }
    if (!data.landmark || data.landmark.trim().length < 2) {
      clarifyingQuestions.push("What is the nearest major junction/landmark to anchor the exact location?");
    }
    if (!(data.message || "").trim()) {
      clarifyingQuestions.push("What do you plan to build or use the land for (e.g., flats, shop, warehouse)?");
      clarifyingQuestions.push("Do you have documents already (survey, deed, excision/gazette, C of O)?");
    }

    const checklist: string[] = [
      "Anchor the exact location: address + area + landmark + closest major junction (or coordinates).",
      "Request and verify: survey plan, deed/title documents, seller identity/authority to sell.",
      "Screen for ROW/setback issues: road expansion history, canal/drainage corridors, powerline easements.",
      "Confirm planning designation for intended use; check if special permits apply.",
      "Only then: negotiate price, pay, and proceed to design/approvals in sequence.",
    ];

    if (data.intent === "already_building") {
      checklist.unshift("Stop-loss step: pause new spend until ROW/setbacks/drainage constraints are cleared.");
    }

    const signals = buildSignals(data, topics);

    return {
      score,
      risk,
      highlights,
      tailoredFocus,
      brief,
      clarifyingQuestions,
      checklist,
      signals,
    };
  }, [data]);

  if (!data || !analysis) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h1 className="text-2xl font-semibold">No report data found</h1>
            <p className="mt-2 text-sm text-slate-600">
              Go back to the Buildability Check and generate a report.
            </p>
            <div className="mt-6">
              <Link
                href="/can-i-build-here"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Go to Buildability Check <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const scoreWidth = clamp(analysis.score, 0, 100);
  const widthClass = `w-[${scoreWidth}%]`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO (fixed spacing) */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div
          className="pointer-events-none absolute -top-44 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-pink-600/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-56 right-6 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(236,72,153,.22),transparent_55%),radial-gradient(circle_at_75%_75%,rgba(217,70,239,.16),transparent_55%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400" aria-hidden="true" />
                Buildability Report
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-semibold text-white/85">
                  Intent: {intentLabel(data.intent)}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-semibold text-white/85">
                  LCDA: {data.lcda || "—"}
                </span>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h1 className="text-3xl font-semibold tracking-tight">
                  {data.area}
                  {data.landmark ? <span className="text-white/60"> · {data.landmark}</span> : null}
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
                  This is a verification-focused, advisory report — designed to help you reduce risk and move in the right order.
                </p>

                {/* Advisory (restored) */}
                <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-xs leading-relaxed text-white/75">
                  <span className="font-semibold text-white">Advisory:</span> Civitas does not replace official government processes or professional due diligence.
                  Use this report to structure verification, request evidence, and confirm decisions with qualified professionals and relevant authorities.
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/60">
                    Score
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-white">{analysis.score}/100</div>
                    <div className="text-xs font-semibold text-white/80">
                      Risk: <span className="text-white">{riskLabel(analysis.risk)}</span>
                    </div>
                  </div>

                  <div
                    className="mt-3 h-2 w-full rounded-full bg-white/15"
                    role="progressbar"
                    aria-label="Buildability score"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={analysis.score}
                  >
                    <div
                      className={cx(
                        "h-2 rounded-full",
                        analysis.risk === "low" && "bg-emerald-400",
                        analysis.risk === "medium" && "bg-pink-400",
                        analysis.risk === "high" && "bg-rose-400",
                        widthClass
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-3 text-xs leading-relaxed text-white/70">
                    {scoreBand(analysis.score)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main */}
          <div className="lg:col-span-8">
            {/* Signals (restored) */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Buildability Signals
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  Good / Watch / Risk / Unknown — with next action
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="grid gap-4" role="list">
                  {analysis.signals.map((s) => (
                    <div
                      key={s.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                      role="listitem"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{s.title}</div>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.why}</p>
                        </div>

                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800">
                          <span className={cx("h-2 w-2 rounded-full", signalColor(s.status))} aria-hidden="true" />
                          {signalLabel(s.status)}
                        </span>
                      </div>

                      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                        <span className="font-semibold text-slate-900">Next action:</span> {s.action}
                      </div>
                    </div>
                  ))}
                </div>

                {analysis.tailoredFocus.length > 0 ? (
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Focus inferred from your context
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {analysis.tailoredFocus.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Guidance summary */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Guidance summary
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  What matters most right now
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="grid gap-3" role="list">
                  {analysis.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                      role="listitem"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-pink-500" aria-hidden="true" />
                      <div className="text-sm leading-relaxed text-slate-700">{h}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Public domain brief */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Public Domain Brief
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  Planning cues and typical constraints (advisory)
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="grid gap-6">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Zonal / land-use cues</div>
                    <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-700" role="list">
                      {analysis.brief.zoningNotes.map((x) => (
                        <li key={x} className="flex gap-2" role="listitem">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-900">Planning signals to check early</div>
                    <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-700" role="list">
                      {analysis.brief.planningSignals.map((x) => (
                        <li key={x} className="flex gap-2" role="listitem">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Typical approvals path</div>
                      <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-700" role="list">
                        {analysis.brief.approvalsPath.map((x) => (
                          <li key={x} className="flex gap-2" role="listitem">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-slate-900">Common risk patterns</div>
                      <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-700" role="list">
                        {analysis.brief.commonRisks.map((x) => (
                          <li key={x} className="flex gap-2" role="listitem">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-pink-500" aria-hidden="true" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Advisory note (restored, again) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
                    <span className="font-semibold text-slate-900">Advisory:</span> {analysis.brief.confidenceNote}
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Verification checklist
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  What to do next, in order
                </div>
              </div>

              <div className="px-6 py-6">
                <ol className="grid gap-3 text-sm leading-relaxed text-slate-700">
                  {analysis.checklist.map((step, idx) => (
                    <li key={step} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Case file
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  Submitted details
                </div>
              </div>

              <div className="px-6 py-6 text-sm text-slate-700">
                <div className="grid gap-4">
                  <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Address
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {data.address?.trim() ? data.address : "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Area
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {data.area || "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Nearest Landmark
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {data.landmark || "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        LCDA / LGA
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {data.lcda || "—"}
                      </div>
                    </div>

                    {data.coords ? (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Coordinates
                        </div>
                        <div className="mt-1 font-semibold text-slate-900">
                          {data.coords.lat}, {data.coords.lng}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {data.message ? (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Your question / context
                      </div>
                      <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">
                        {data.message}
                      </div>
                    </div>
                  ) : null}

                  {analysis.clarifyingQuestions.length > 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Clarifications that improve accuracy
                      </div>
                      <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-700" role="list">
                        {analysis.clarifyingQuestions.map((q) => (
                          <li key={q} className="flex gap-2" role="listitem">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" />
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/can-i-build-here"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      Edit inputs <span aria-hidden="true">→</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Print / Save PDF
                    </button>
                  </div>

                  {/* Advisory (final reminder) */}
                  <div className="text-xs leading-relaxed text-slate-500">
                    Civitas is advisory and verification-focused. It does not replace official government processes or professional due diligence.
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}