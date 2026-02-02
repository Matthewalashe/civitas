import Link from "next/link";

type SignalValue = "Strong" | "Medium" | "Weak" | "Unknown";

type Signal = {
  label: string;
  value: SignalValue;
  note: string;
  sourceHint?: string;
};

function grade(score: number) {
  if (score >= 80) return { g: "A", label: "Low friction" };
  if (score >= 65) return { g: "B", label: "Manageable" };
  if (score >= 50) return { g: "C", label: "Proceed carefully" };
  return { g: "D", label: "High risk" };
}

function pill(value: SignalValue) {
  switch (value) {
    case "Strong":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
    case "Medium":
      return "border-amber-400/30 bg-amber-400/10 text-amber-200";
    case "Weak":
      return "border-rose-400/30 bg-rose-400/10 text-rose-200";
    default:
      return "border-slate-300/20 bg-white/5 text-slate-200";
  }
}

function dot(value: SignalValue) {
  switch (value) {
    case "Strong":
      return "bg-emerald-300";
    case "Medium":
      return "bg-amber-300";
    case "Weak":
      return "bg-rose-300";
    default:
      return "bg-slate-300/70";
  }
}

function barTone(value: SignalValue) {
  switch (value) {
    case "Strong":
      return "from-emerald-400/45 via-emerald-400/15 to-transparent";
    case "Medium":
      return "from-amber-400/45 via-amber-400/15 to-transparent";
    case "Weak":
      return "from-rose-400/45 via-rose-400/15 to-transparent";
    default:
      return "from-slate-200/25 via-slate-200/10 to-transparent";
  }
}

/** Crisp SVG score ring (premium, no conic-gradient blur, no client-only CSS) */
function ScoreRing({ score }: { score: number }) {
  const s = Math.max(0, Math.min(100, score));
  const r = 44;
  const c = 2 * Math.PI * r;
  const progress = (s / 100) * c;

  return (
    <div className="relative grid h-28 w-28 place-items-center">
      <svg className="h-28 w-28" viewBox="0 0 120 120" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="rgba(236,72,153,0.18)"
          strokeWidth="10"
          strokeDasharray={`${progress} ${c - progress}`}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="rgba(236,72,153,0.95)"
          strokeWidth="10"
          strokeDasharray={`${progress} ${c - progress}`}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>

      <div className="absolute grid h-[92px] w-[92px] place-items-center rounded-full border border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="text-3xl font-semibold text-white">{score}</div>
        <div className="-mt-1 text-[11px] text-white/55">/ 100</div>
      </div>
    </div>
  );
}

export default function BuildabilityScoreSection() {
  const score = 74;
  const g = grade(score);

  // This set is intentionally diaspora-first:
  // - zoning/masterplan traps
  // - government scheme/acquisition traps
  // - tenure chain risk
  // - dispute screening
  // - approvals pathway (avoid dead-ends)
  // - property condition (derelict surprises)
  const signals: Signal[] = [
    {
      label: "Masterplan / zoning fit",
      value: "Medium",
      note: "Intended use must match planning controls (e.g., industrial vs residential).",
      sourceHint: "planning / zoning",
    },
    {
      label: "Government scheme / acquisition signals",
      value: "Unknown",
      note: "Check if the land sits in schemes, committed acquisitions, setbacks, or restricted corridors.",
      sourceHint: "govt status checks",
    },
    {
      label: "Land / tenure signals",
      value: "Medium",
      note: "Validate title chain, land status, and documentation pattern before payment.",
      sourceHint: "title / survey / history",
    },
    {
      label: "Dispute / conflict signals",
      value: "Unknown",
      note: "Screen for family claims, court cases, community disputes, or multiple allocations.",
      sourceHint: "dispute screening",
    },
    {
      label: "Drainage / flood signals",
      value: "Weak",
      note: "Context suggests runoff/flood exposure nearby; verify drainage pathways and flood history.",
      sourceHint: "environment / terrain",
    },
    {
      label: "Access & right-of-way",
      value: "Strong",
      note: "Road access looks feasible; confirm ROW/easements and setbacks.",
      sourceHint: "access / ROW",
    },
    {
      label: "Approvals readiness",
      value: "Unknown",
      note: "Depends on survey, title, and the right approvals pathway for the proposed use.",
      sourceHint: "permits / approvals",
    },
    {
      label: "Existing building condition",
      value: "Unknown",
      note: "For property: structural condition, services, hidden defects—requires inspection evidence.",
      sourceHint: "condition / inspection",
    },
  ];

  return (
    <section className="relative w-full border-t border-slate-200 bg-slate-950">
      {/* Ambient / systems background */}
      <div className="pointer-events-none absolute inset-0">
        {/* glow */}
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-pink-500/15 blur-3xl" />
        <div className="absolute -right-28 top-10 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />

        {/* grid */}
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>

        {/* scanline (Tailwind-only, safe) */}
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent animate-pulse" />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium text-white/60">
            Civitas · Buildability Score
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Know what can go wrong <span className="text-pink-400">before</span>{" "}
            you buy or build
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-white/70">
            Diaspora-friendly decision support: zoning fit, government scheme risk,
            tenure & dispute signals, approvals readiness, access/ROW, flood exposure,
            and property condition — summarized into a score, signals, and next steps.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/can-i-build-here"
              className="inline-flex items-center justify-center rounded-none bg-pink-500 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-400"
            >
              Run a Buildability Check <span className="ml-2">→</span>
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center justify-center rounded-none border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              View methodology
            </Link>
          </div>
        </div>

        {/* Main console */}
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* LEFT PANEL */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-[0.25]" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-5">
                  <ScoreRing score={score} />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wide text-white/60">
                      Composite score
                    </div>
                    <div className="mt-1 text-xl font-semibold text-white">
                      {g.label}
                    </div>
                    <p className="mt-1 text-sm text-white/65">
                      Designed for remote decisions — reduce blind trust and costly surprises.
                    </p>
                  </div>
                </div>

                <div className="shrink-0 border border-white/10 bg-white/5 px-3 py-2 text-center">
                  <div className="text-xs font-semibold text-white/60">Grade</div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    {g.g}
                  </div>
                </div>
              </div>

              {/* Interpretation */}
              <div className="relative mt-6 border border-white/10 bg-slate-950/45 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-white/60">
                  Interpretation
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white/75">
                  {g.label}. Proceed only after clearing flagged items: zoning/masterplan fit,
                  tenure/dispute screening, and approvals pathway — where most diaspora losses happen.
                </div>
              </div>

              {/* Meta */}
              <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { k: "Coverage", v: "Lagos (initial)" },
                  { k: "Audience", v: "Diaspora + local buyers" },
                  { k: "Output", v: "Guidance report + checklist" },
                  { k: "Value", v: "Avoid fraud & rework" },
                ].map((i) => (
                  <div
                    key={i.k}
                    className="border border-white/10 bg-white/5 p-3"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
                      {i.k}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      {i.v}
                    </div>
                  </div>
                ))}
              </div>

              {/* Profile strip */}
              <div className="relative mt-6 border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-white/70">
                    Risk profile (snapshot)
                  </div>
                  <div className="text-[11px] text-white/55">signals</div>
                </div>

                <div className="mt-3 grid grid-cols-8 gap-2">
                  {signals.slice(0, 8).map((s) => (
                    <div
                      key={s.label}
                      className="h-2 overflow-hidden rounded-full bg-white/10"
                      title={`${s.label}: ${s.value}`}
                    >
                      <div
                        className={`h-full w-full bg-gradient-to-r ${barTone(
                          s.value
                        )}`}
                      />
                    </div>
                  ))}
                </div>

                <p className="mt-3 text-xs text-white/55">
                  Tip: “Unknown” means “verify before payment” — not “safe”.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-7">
            <div className="border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-white/60">
                    Key signals
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    What Civitas is seeing
                  </div>
                </div>
                <div className="text-xs text-white/55">example output</div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {signals.map((s) => (
                  <div
                    key={s.label}
                    className="group relative overflow-hidden border border-white/10 bg-slate-950/40 p-4 transition hover:bg-slate-950/60"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-pink-500/10 blur-2xl" />
                    </div>

                    <div className="relative flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${dot(s.value)}`}
                          />
                          <div className="truncate text-sm font-semibold text-white">
                            {s.label}
                          </div>
                        </div>
                        {s.sourceHint ? (
                          <div className="mt-1 text-[11px] text-white/50">
                            Source: {s.sourceHint}
                          </div>
                        ) : null}
                      </div>

                      <span
                        className={`shrink-0 border px-2 py-1 text-[11px] ${pill(
                          s.value
                        )}`}
                      >
                        {s.value}
                      </span>
                    </div>

                    <p className="relative mt-2 text-sm leading-relaxed text-white/70">
                      {s.note}
                    </p>

                    <div className="relative mt-4 flex items-center justify-between">
                      <div className="h-px flex-1 bg-white/10" />
                      <div className="ml-3 inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition group-hover:text-pink-200">
                        <span>Open details</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next actions */}
              <div className="mt-6 border border-white/10 bg-slate-950/40 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-white/60">
                  Recommended next actions
                </div>
                <ul className="mt-3 grid gap-2 text-sm text-white/75 sm:grid-cols-2">
                  <li>Confirm use (residential/industrial/etc.) vs zoning/masterplan</li>
                  <li>Run tenure + dispute screening before payment</li>
                  <li>Validate survey consistency + boundary/ROW</li>
                  <li>Confirm approvals pathway and required permits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">
                Make an investment decision with evidence — not hope.
              </div>
              <p className="mt-1 max-w-3xl text-sm text-white/70">
                Civitas helps diaspora investors avoid fraud, disputes, zoning traps,
                and approvals dead-ends.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/can-i-build-here"
                className="inline-flex items-center justify-center rounded-none bg-pink-500 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-400"
              >
                Run a Buildability Check <span className="ml-2">→</span>
              </Link>
              <Link
                href="/waitlist"
                className="inline-flex items-center justify-center rounded-none border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Join the waitlist
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/45">
          Civitas provides informational guidance to reduce risk. It does not issue approvals or replace official processes.
        </p>
      </div>
    </section>
  );
}