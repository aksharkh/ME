"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CircleHelp,
  Cog,
  Factory,
  Hammer,
  Home,
  HousePlus,
  RotateCcw,
  Route,
  Shield,
  Sprout,
  Store,
  Trees,
  User,
  UserRound,
  Users,
  Wheat,
  Wrench,
  XCircle,
} from "lucide-react";
import { RangeField } from "../calculators/fields";
import { EnquiryForm } from "../forms/EnquiryForm";
import { gearPath } from "../factory/gear";
import { AnimatedNumber } from "../ui/Counter";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import { CRORE, LAKH, pmegp, pmfme } from "@/lib/calc";
import { getScheme } from "@/lib/schemes";

type Stage = "new" | "existing";
type Sector = "food" | "manufacturing" | "service" | "trading" | "artisan";
type Who = "general" | "woman" | "scst" | "other";
type Place = "rural" | "urban";
type Collateral = "yes" | "no";

interface Answers {
  stage?: Stage;
  sector?: Sector;
  who?: Who;
  place?: Place;
  amount: number;
  collateral?: Collateral;
}

type ReasonKey = keyof Dictionary["eligibility"]["reasons"];
interface Match {
  slug: string;
  fit: "strong" | "possible";
  benefit?: number;
  reason: ReasonKey;
  vars?: Record<string, string | number>;
}

const GEAR = gearPath(0, 0, 22, 17, 10);
const UDYOGINI_MAX = 3 * LAKH;

function match(a: Required<Answers>, short: (n: number) => string): Match[] {
  const out: Match[] = [];
  const special = a.who !== "general";
  const pmegpSector = a.sector === "service" ? "service" : "manufacturing";
  const pmegpCap = pmegpSector === "service" ? 20 * LAKH : 50 * LAKH;

  if (a.sector === "food") {
    const r = pmfme(a.amount);
    out.push({ slug: "pmfme", fit: "strong", benefit: r.subsidy, reason: "pmfme", vars: { amount: short(r.subsidy) } });
  }

  if (a.sector !== "trading" && a.sector !== "artisan") {
    const r = pmegp({ sector: pmegpSector, cost: a.amount, category: special ? "special" : "general", area: a.place });
    if (a.stage === "new" && a.amount <= pmegpCap) {
      out.push({ slug: "pmegp", fit: "strong", benefit: r.subsidy, reason: "pmegpStrong", vars: { amount: short(r.subsidy), pct: Math.round(r.subsidyPct * 100) } });
    } else if (a.stage === "new") {
      out.push({ slug: "pmegp", fit: "possible", benefit: r.subsidy, reason: "pmegpOver", vars: { amount: short(r.subsidy), cap: short(pmegpCap) } });
    } else {
      out.push({ slug: "pmegp", fit: "possible", reason: "pmegpExisting" });
    }
  }

  if (a.sector === "artisan") out.push({ slug: "pm-vishwakarma", fit: "strong", reason: "vishwakarma" });

  if (a.who === "woman") {
    const sub = Math.min(a.amount, UDYOGINI_MAX) * 0.3;
    out.push({ slug: "udyogini", fit: a.amount <= UDYOGINI_MAX ? "strong" : "possible", benefit: sub, reason: "udyogini", vars: { amount: short(sub), pct: 30 } });
  }

  if (a.stage === "new" && (a.who === "woman" || a.who === "scst") && a.amount >= 10 * LAKH && a.amount <= CRORE) {
    out.push({ slug: "stand-up-india", fit: "strong", reason: "standup", vars: { amount: short(a.amount) } });
  }

  if (a.amount <= 10 * LAKH) out.push({ slug: "mudra", fit: "strong", reason: "mudra" });
  else if (a.amount <= 20 * LAKH) out.push({ slug: "mudra", fit: "possible", reason: "mudraPlus" });

  if (a.amount > 5 * LAKH && a.amount <= 10 * CRORE) {
    out.push({ slug: "cgtmse", fit: a.collateral === "no" ? "strong" : "possible", reason: a.collateral === "no" ? "cgtmseNo" : "cgtmseYes" });
  }

  if (a.sector === "food" || a.sector === "manufacturing") out.push({ slug: "karnataka-incentives", fit: "possible", reason: "state" });

  out.push({ slug: "udyam-registration", fit: "strong", reason: "udyam" });

  return out.sort((x, y) => (y.benefit ?? 0) - (x.benefit ?? 0) || Number(y.fit === "strong") - Number(x.fit === "strong"));
}

const optionIcons: Record<string, LucideIcon> = {
  new: Sprout,
  existing: Factory,
  food: Wheat,
  manufacturing: Cog,
  service: Wrench,
  trading: Store,
  artisan: Hammer,
  woman: UserRound,
  scst: Users,
  other: Shield,
  general: User,
  rural: Trees,
  urban: Building2,
  no: XCircle,
  yes: HousePlus,
};

const choiceKeys = ["stage", "sector", "who", "place"] as const;
const TOTAL = choiceKeys.length + 2; // + amount + collateral

export function EligibilityWizard() {
  const { t, href, short } = useI18n();
  const e = t.eligibility;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [a, setA] = useState<Answers>({ amount: 15 * LAKH });

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  const done = step >= TOTAL;
  const results = useMemo(() => (done ? match(a as Required<Answers>, short) : []), [done, a, short]);
  const best = results.filter((r) => r.fit === "strong").reduce((m, r) => Math.max(m, r.benefit ?? 0), 0);
  const progress = Math.min(step, TOTAL) / TOTAL;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center gap-4">
        <svg viewBox="-25 -25 50 50" className="h-11 w-11 shrink-0" aria-hidden>
          <motion.g initial={false} animate={{ rotate: progress * 360 }} transition={{ type: "spring", stiffness: 60 }}>
            <path d={GEAR} fill="#157a46" />
            <circle r="7" fill="#ffffff" />
          </motion.g>
        </svg>
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-steel">
            <span>{done ? e.results : fill(e.progress, { n: step + 1, total: TOTAL })}</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-mist">
            <motion.div className="belt animate-belt h-full rounded-full" style={{ backgroundColor: "#157a46" }} initial={false} animate={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div key={step} initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.25 }}>
            {step < choiceKeys.length && (
              <ChoiceStep
                q={e.q[choiceKeys[step]]}
                value={a[choiceKeys[step]]}
                onPick={(v) => {
                  setA({ ...a, [choiceKeys[step]]: v });
                  go(step + 1);
                }}
              />
            )}

            {step === choiceKeys.length && (
              <StepCard title={e.q.amount.title} alt={e.q.amount.alt}>
                <RangeField label={e.q.amount.label} value={a.amount} min={LAKH} max={2 * CRORE} step={LAKH} onChange={(v) => setA({ ...a, amount: v })} display={short} />
                <div className="mt-6 flex flex-wrap gap-2">
                  {[2, 5, 10, 25, 50, 100].map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setA({ ...a, amount: l * LAKH })}
                      className={`rounded-lg border-2 px-4 py-2 text-sm font-bold ${a.amount === l * LAKH ? "border-brand-600 bg-brand-50" : "border-line bg-white"}`}
                    >
                      {short(l * LAKH)}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => go(step + 1)} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 font-bold text-white shadow-[0_5px_0_0_var(--color-brand-950)]">
                  {e.next} <ArrowRight className="h-5 w-5" />
                </button>
              </StepCard>
            )}

            {step === choiceKeys.length + 1 && (
              <ChoiceStep
                q={e.q.collateral}
                value={a.collateral}
                onPick={(v) => {
                  setA({ ...a, collateral: v as Collateral });
                  go(step + 1);
                }}
              />
            )}

            {done && (
              <div>
                <div className="blueprint-dark rounded-xl bg-brand-900 p-8 text-white sm:p-10">
                  <div className="inline-flex items-center gap-2 rounded bg-brand-600 px-2.5 py-1 text-sm font-bold">
                    <Route className="h-4 w-4" /> {e.goodNews}
                  </div>
                  <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">{fill(e.qualify, { n: results.length })}</h2>
                  {best > 0 && (
                    <div className="mt-6">
                      <div className="text-sm font-bold uppercase tracking-widest text-white/60">{e.estimate}</div>
                      <div className="font-display text-5xl font-bold text-[#8fd9ae] sm:text-6xl">
                        <AnimatedNumber value={best} format={short} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid gap-3">
                  {results.map((r) => {
                    const s = getScheme(t, r.slug)!;
                    const [headline, reason] = e.reasons[r.reason];
                    return (
                      <Link
                        key={r.slug}
                        href={href(`/schemes/${s.slug}`)}
                        className="group flex flex-wrap items-center gap-4 rounded-xl border-2 border-brand-900/10 bg-white p-5 transition-colors hover:border-brand-600"
                      >
                        <span className={`rounded px-2.5 py-1 text-xs font-bold uppercase ${r.fit === "strong" ? "bg-brand-50 text-brand-600" : "bg-sage-100 text-sage-700"}`}>
                          {r.fit === "strong" ? e.strong : e.possible}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-display text-lg font-bold text-ink">{s.name}</div>
                          <div className="text-sm text-ink-3">{fill(reason, r.vars ?? {})}</div>
                        </div>
                        <div className="font-display text-xl font-bold text-brand-700">{fill(headline, r.vars ?? {})}</div>
                        <ArrowRight className="h-5 w-5 text-steel transition-transform group-hover:translate-x-1" />
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-10 rounded-xl border-2 border-brand-900/10 bg-white p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold text-ink">{e.expertTitle}</h3>
                  <p className="mt-1 text-ink-3">{e.expertSub}</p>
                  <div className="mt-6">
                    <EnquiryForm compact defaultScheme={results[0]?.slug} />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setA({ amount: 15 * LAKH });
                    go(0);
                  }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-steel hover:text-ink"
                >
                  <RotateCcw className="h-4 w-4" /> {e.restart}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step > 0 && !done && (
        <button type="button" onClick={() => go(step - 1)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-steel hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> {e.back}
        </button>
      )}
      {!done && (
        <p className="mt-6 flex items-center gap-2 text-xs text-steel">
          <CircleHelp className="h-4 w-4" /> {e.noPhone}
        </p>
      )}
    </div>
  );
}

function StepCard({ title, alt, children }: { title: string; alt?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {alt && (
        <p lang="kn" className="mt-1 text-lg font-medium text-steel">
          {alt}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function ChoiceStep({
  q,
  value,
  onPick,
}: {
  q: { title: string; alt: string; options: Record<string, string[]> };
  value?: string;
  onPick: (v: string) => void;
}) {
  return (
    <StepCard title={q.title} alt={q.alt}>
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(q.options).map(([key, [label, sub]]) => {
          const on = value === key;
          const Icon = optionIcons[key] ?? Home;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onPick(key)}
              className={`flex items-center gap-4 rounded-xl border-2 bg-white p-5 text-left transition-all hover:-translate-y-0.5 ${
                on ? "border-brand-600 bg-brand-50" : "border-brand-900/10 hover:border-brand-600"
              }`}
            >
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${on ? "bg-brand-700 text-white" : "bg-mist text-ink"}`}>
                <Icon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-lg font-bold leading-snug text-ink">{label}</span>
                {sub && <span className="block text-sm text-ink-3">{sub}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </StepCard>
  );
}
