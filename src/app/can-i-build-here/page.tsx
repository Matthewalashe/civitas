"use client";

import { useMemo, useState } from "react";
import NavBar from "../components/NavBar";

type Intent = "buy_land" | "start_building" | "already_building" | "risk_check";

type Payload = {
  intent: Intent;
  name: string;
  email: string;
  area: string;
  landmark: string;
  lcda: string;
  address: string;
  coords?: { lat: number; lng: number };
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

function isValidEmail(v: string) {
  // Simple + safe for MVP (don’t over-restrict)
  const x = v.trim();
  return x.includes("@") && x.includes(".");
}

function safeEncode(s: string) {
  return encodeURIComponent((s || "").trim());
}

export default function CanIBuildHere() {
  // Order: intent first (as requested)
  const [intent, setIntent] = useState<Intent>("buy_land");

  // Location
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [lcda, setLcda] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Identity
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Context
  const [message, setMessage] = useState("");

  const okEmail = useMemo(() => isValidEmail(email), [email]);

  const completeness = useMemo(() => {
    // We count “coords” as optional, not required
    const total = 7;
    let score = 0;
    if (intent) score++;
    if (address.trim().length >= 5) score++;
    if (area.trim().length >= 3) score++;
    if (lcda.trim().length >= 2) score++;
    if (landmark.trim().length >= 2) score++;
    if (name.trim().length >= 2) score++;
    if (okEmail) score++;
    return Math.round((score / total) * 100);
  }, [intent, address, area, lcda, landmark, name, okEmail]);

  const canGenerate = useMemo(() => {
    return (
      address.trim().length >= 5 &&
      area.trim().length >= 3 &&
      lcda.trim().length >= 2 &&
      name.trim().length >= 2 &&
      okEmail
    );
  }, [address, area, lcda, name, okEmail]);

  const locationSummary = useMemo(() => {
    const parts = [
      address.trim(),
      area.trim(),
      landmark.trim() ? `Near ${landmark.trim()}` : "",
      lcda.trim(),
    ].filter(Boolean);
    return parts.join(" · ");
  }, [address, area, landmark, lcda]);

  function handleGenerate() {
    const payload: Payload = {
      intent,
      name: name.trim(),
      email: email.trim(),
      address: address.trim(),
      area: area.trim(),
      landmark: landmark.trim(),
      lcda: lcda.trim(),
      coords: coords || undefined,
      message: message.trim() || undefined,
      ts: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.location.href = "/report";
  }

  function openMap() {
    // MVP: open Google Maps with best-known query; no API keys
    const q = [address, area, landmark, lcda].filter(Boolean).join(", ");
    const url = `https://www.google.com/maps/search/?api=1&query=${safeEncode(q || "Lagos, Nigeria")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function useMyLocation() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: Number(pos.coords.latitude.toFixed(6)),
          lng: Number(pos.coords.longitude.toFixed(6)),
        });
      },
      () => {
        // Silent failure for MVP; user can still proceed.
        // If you want: show a toast later.
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <NavBar />

      {/* HERO (Civitas signature) */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-pink-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-44 right-10 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(236,72,153,.22),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(217,70,239,.18),transparent_50%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
              Buildability Check
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h1 className="text-3xl font-semibold tracking-tight">
                  Can I build here?
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                  Enter intent + location. Civitas returns a <span className="text-white">Buildability Score</span>,{" "}
                  <span className="text-white">Signals</span>, and a verification brief — structured like an analyst report.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    Risk signals
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    Checklists
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    Public domain brief
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    Consultant matching
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/60">
                    Completeness
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-white/15">
                    <progress
                      className="h-2 w-full appearance-none rounded-full bg-transparent"
                      value={completeness}
                      max={100}
                    />
                  </div>
                  <div className="mt-2 text-right text-xs font-semibold text-white/80">
                    {completeness}%
                  </div>

                  <div className="mt-4 rounded-xl border border-white/15 bg-white/10 p-3 text-xs leading-relaxed text-white/70">
                    Tip: Adding a landmark and a short context message improves signal quality.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* FORM */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Intake
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      Intent + location context
                    </div>
                  </div>

                  <div className="hidden sm:block text-right">
                    <div className="text-xs font-semibold text-slate-500">Preview</div>
                    <div className="mt-1 max-w-[260px] text-xs leading-relaxed text-slate-600">
                      {locationSummary || "Add address, area, landmark, and LCDA…"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="grid gap-6">
                  {/* Intent */}
                  <div>
                    <label htmlFor="intent" className="text-sm font-semibold text-slate-800">
                      Intent
                    </label>
                    <p id="intent_help" className="mt-1 text-xs leading-relaxed text-slate-500">
                      We tailor your score and signals based on your stage.
                    </p>
                    <select
                      id="intent"
                      aria-describedby="intent_help"
                      value={intent}
                      onChange={(e) => setIntent(e.target.value as Intent)}
                      className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                    >
                      <option value="buy_land">Buying land</option>
                      <option value="start_building">Starting construction</option>
                      <option value="already_building">Already building</option>
                      <option value="risk_check">Risk check only</option>
                    </select>
                    <div className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                      Selected: {intentLabel(intent)}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="text-sm font-semibold text-slate-800">
                      Address / Street name
                    </label>
                    <p id="address_help" className="mt-1 text-xs leading-relaxed text-slate-500">
                      Use what you know — street name, house number, estate name, or layout.
                    </p>
                    <input
                      id="address"
                      aria-describedby="address_help"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                      placeholder="e.g., Odogunyan Road / Estate name / Street name"
                    />

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={openMap}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:border-pink-300 hover:bg-pink-50"
                      >
                        Open map to confirm location
                      </button>

                      <button
                        type="button"
                        onClick={useMyLocation}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:border-pink-300 hover:bg-pink-50"
                      >
                        Use my location (optional)
                      </button>

                      {coords ? (
                        <span className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                          Location captured: {coords.lat}, {coords.lng}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Area + Landmark */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="area" className="text-sm font-semibold text-slate-800">
                        Area
                      </label>
                      <input
                        id="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                        placeholder="e.g., Agric, Ikorodu"
                      />
                    </div>

                    <div>
                      <label htmlFor="landmark" className="text-sm font-semibold text-slate-800">
                        Nearest landmark
                      </label>
                      <input
                        id="landmark"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                        placeholder="e.g., Agric Bus Stop"
                      />
                    </div>
                  </div>

                  {/* LCDA */}
                  <div>
                    <label htmlFor="lcda" className="text-sm font-semibold text-slate-800">
                      LCDA / LGA
                    </label>
                    <input
                      id="lcda"
                      value={lcda}
                      onChange={(e) => setLcda(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                      placeholder="e.g., Ikorodu"
                    />
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      Not sure? Type what you know. The report will ask clarifying questions.
                    </p>
                  </div>

                  <div className="h-px bg-slate-200" />

                  {/* Identity */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="text-sm font-semibold text-slate-800">
                        Full name
                      </label>
                      <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                        placeholder="e.g., Matthew Alashe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="text-sm font-semibold text-slate-800">
                        Email
                      </label>
                      <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        inputMode="email"
                        className={cx(
                          "mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-4",
                          okEmail ? "border-slate-300 focus:border-pink-500 focus:ring-pink-500/10" : "border-rose-300 focus:border-rose-500 focus:ring-rose-500/10"
                        )}
                        aria-invalid={!okEmail && email.trim().length > 0}
                        placeholder="e.g., name@email.com"
                      />
                      <div role="status" className="mt-2 text-xs text-slate-500">
                        {!okEmail && email.trim().length > 0
                          ? "Please enter a valid email address."
                          : "We use this to send a copy of your report (later)."}
                      </div>
                    </div>
                  </div>

                  {/* Context */}
                  <div>
                    <label htmlFor="message" className="text-sm font-semibold text-slate-800">
                      Question / Context (optional)
                    </label>
                    <p id="message_help" className="mt-1 text-xs leading-relaxed text-slate-500">
                      Add specifics (plot size, proposed use, document status, budget constraints, urgency). Civitas uses this to prioritize checks and tailor signals.
                    </p>
                    <textarea
                      id="message"
                      aria-describedby="message_help"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-3 min-h-[120px] w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                      placeholder="Example: I want to buy 2 plots for a 6-flat building. Seller says it is ‘residential’ and has survey + excision. What should I verify first?"
                    />
                  </div>

                  {/* CTA */}
                  <button
                    disabled={!canGenerate}
                    onClick={handleGenerate}
                    className={cx(
                      "w-full rounded-xl px-6 py-3 text-sm font-semibold text-white",
                      "bg-slate-900 hover:bg-pink-600",
                      "disabled:cursor-not-allowed disabled:bg-slate-300"
                    )}
                  >
                    Generate Report
                  </button>

                  <div className="text-xs leading-relaxed text-slate-500">
                    Saved locally for MVP. Next: submissions sync to admin dashboard + evidence links.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OUTPUT PREVIEW */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Output
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  What you’ll receive
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-pink-500" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Buildability Score</div>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          A single score (0–100) summarizing planning fit, approvals readiness, and constraint risk.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Buildability Signals</div>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          Clear “Good / Watch / Risk / Unknown” signals with why-it-matters and next action.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Verification checklist</div>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          A sequenced list of what to verify first, what proof to request, and when to spend.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Why the extra location fields?
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      Address + area + landmark helps Civitas anchor your location more accurately and reduces “unknown” signals.
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6 text-xs leading-relaxed text-slate-500">
                  Civitas provides advisory guidance. Always verify with qualified professionals and relevant authorities.
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
              <div className="text-xs font-semibold uppercase tracking-wide text-white/60">
                Civitas intelligence model
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Your context helps Civitas infer what matters most, ask smarter follow-ups, and prioritize verification steps — even for use-cases we didn’t originally plan for.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}