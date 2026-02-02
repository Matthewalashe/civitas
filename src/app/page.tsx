import Image from "next/image";
import Link from "next/link";

import Header from "./components/Header";
import Hero from "./components/Hero";
import BuildabilityScoreSection from "./components/BuilderbilityScoreSection";
import CivitasTools from "./components/CivitasTools";
import CivitasNetwork from "./components/CivitasNetwork";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import WhoUsesCivitasSection from "./components/sections/WhoUsesCivitasSection";

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-lg font-semibold text-slate-900">
              Civitas
              <span className="ml-2 text-sm font-semibold text-pink-600">
                advisory
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              Civitas helps people reduce land and property risk through clear
              signals, checklists, and next actions — before money moves.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Product
              </div>
              <ul className="mt-3 grid gap-2 text-sm">
                <li>
                  <Link className="text-slate-700 hover:text-pink-600" href="/can-i-build-here">
                    Can I Build Here?
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-700 hover:text-pink-600" href="/pricing">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-700 hover:text-pink-600" href="/methodology">
                    Methodology
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Learn
              </div>
              <ul className="mt-3 grid gap-2 text-sm">
                <li>
                  <Link className="text-slate-700 hover:text-pink-600" href="/overview?topic=planning">
                    Planning mismatches
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-700 hover:text-pink-600" href="/overview?topic=risks">
                    Hidden site risks
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-700 hover:text-pink-600" href="/overview?topic=approvals">
                    Approvals & documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </div>
              <ul className="mt-3 grid gap-2 text-sm">
                <li className="text-slate-700">Lagos, Nigeria</li>
                <li>
                  <Link className="text-slate-700 hover:text-pink-600" href="/waitlist">
                    Join waitlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Civitas. All rights reserved.</div>
          <div className="flex gap-4">
            <Link className="hover:text-pink-600" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-pink-600" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- HOME ---------------- */

export default function Home() {
  const pillars = [
    {
      key: "planning",
      title: "Planning mismatches",
      body: "When your intended use conflicts with zoning, masterplans, or planning regulations.",
      img: "/pillars/planning.webp",
    },
    {
      key: "risks",
      title: "Hidden site risks",
      body: "Drainage, access, setbacks, right-of-way, disputes — issues people discover too late.",
      img: "/pillars/risk.webp",
    },
    {
      key: "approvals",
      title: "Approval gaps",
      body: "Missing permits, wrong documentation, and blind spots that delay or block projects.",
      img: "/pillars/approvals.png",
    },
    {
      key: "sequence",
      title: "Sequencing errors",
      body: "Doing the right thing in the wrong order — and paying for it.",
      img: "/pillars/sequence.webp",
    },
  ];

  return (
    <main className="text-slate-900">
      <Header />

      <Hero />

      {/* VALUE PILLARS */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-semibold text-slate-900">
            What <span className="text-pink-500">Civitas</span> helps you avoid
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Before you buy land or build, Civitas highlights the planning and site
            realities that cause expensive surprises.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item) => (
              <Link
                key={item.key}
                href={`/overview?topic=${item.key}`}
                className="group flex flex-col border border-slate-200 p-4 transition hover:bg-slate-50/40 hover:shadow-md"
              >
                <div className="relative h-32 w-full overflow-hidden bg-slate-100 ring-1 ring-slate-200 transition group-hover:ring-4 group-hover:ring-pink-400/80">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 group-hover:text-pink-700">
                    <span>Learn more</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BuildabilityScoreSection />

      {/* MODULES / CAPABILITIES */}
      <CivitasTools />

      <CivitasNetwork />

      <HowItWorksSection />

      <WhoUsesCivitasSection />

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-10 text-xs leading-relaxed text-slate-500">
          Civitas provides advisory guidance to help you verify information.
          It does not issue approvals or replace official government processes.
        </div>
      </section>

      <Footer />
    </main>
  );
}