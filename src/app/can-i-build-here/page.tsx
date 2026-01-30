"use client";

import { useMemo, useState } from "react";
import NavBar from "../components/NavBar";

type Intent = "buy_land" | "start_building" | "already_building" | "risk_check";

export default function CanIBuildHere() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [lcda, setLcda] = useState("");
  const [intent, setIntent] = useState<Intent>("buy_land");
  const [message, setMessage] = useState("");

  const canGenerate = useMemo(() => {
    const okEmail = email.includes("@") && email.includes(".");
    return (
      name.trim().length >= 2 &&
      okEmail &&
      area.trim().length >= 3 &&
      lcda.trim().length >= 2
    );
  }, [name, email, area, lcda]);

  function handleGenerate() {
  const payload = { name, email, area, lcda, intent, message, ts: Date.now() };
  localStorage.setItem("civitas_m1_v1", JSON.stringify(payload));
  window.location.href = "/report";
}

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-slate-500">Module 1</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        Can I Build Here?
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Enter the location and your intent. Civitas will help you avoid common mistakes.
      </p>

      <div className="mt-10 space-y-6 rounded-xl border border-slate-200 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
              placeholder="e.g., Matthew Alashe"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
              placeholder="e.g., name@email.com"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Area / Landmark</label>
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            placeholder="e.g., Agric Bus Stop, Ikorodu"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">LCDA / LGA</label>
          <input
            value={lcda}
            onChange={(e) => setLcda(e.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            placeholder="e.g., Ikorodu"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Intent</label>
          <select
            value={intent}
            onChange={(e) => setIntent(e.target.value as Intent)}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          >
            <option value="buy_land">Buying land</option>
            <option value="start_building">Starting construction</option>
            <option value="already_building">Already building</option>
            <option value="risk_check">Risk check only</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Any question (optional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 min-h-[110px] w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            placeholder="Ask anything you need clarity on…"
          />
        </div>

        <button
          disabled={!canGenerate}
          onClick={handleGenerate}
          className="w-full rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Save & Continue (MVP)
        </button>

        <p className="text-xs text-slate-500">
          Next, we’ll connect this to a free Google Sheet so you can see submissions as admin.
        </p>
      </div>
    </main>
  );
}
