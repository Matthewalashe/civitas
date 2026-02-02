import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Enter location + intent",
    body: "Choose an area (or drop a pin) and tell us what you want to do — buy land, start building, already building, or just risk-check.",
  },
  {
    n: "02",
    title: "Civitas surfaces signals + unknowns",
    body: "We translate complex planning and property checks into plain-language signals, highlighting what’s verified vs what’s still unknown.",
  },
  {
    n: "03",
    title: "Get next actions (and a report if needed)",
    body: "You receive a step-by-step checklist to verify documents, reduce surprises, and decide your next move. Upgrade only when you need a printable report.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            How <span className="text-pink-500">Civitas</span> works
          </h2>
          <p className="mt-4 text-slate-600">
            A simple flow: understand the risk, see the unknowns, and move forward
            with the right next steps.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative overflow-hidden border border-slate-200 bg-white p-6"
            >
              <div className="text-xs font-semibold tracking-wide text-slate-500">
                STEP {s.n}
              </div>
              <div className="mt-2 text-xl font-semibold text-slate-900">
                {s.title}
              </div>
              <p className="mt-3 text-sm text-slate-600">{s.body}</p>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-pink-600/40 via-fuchsia-500/15 to-transparent opacity-80" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/can-i-build-here"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Run free buildability check
          </Link>
          <Link
            href="/methodology"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            View methodology
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Civitas is advisory only — it helps you verify. It does not issue approvals.
        </p>
      </div>
    </section>
  );
}