"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, PartyPopper } from "lucide-react";
import { getSchemes } from "@/lib/schemes";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/config";
import { SectionHeading } from "../ui/Section";

const picks = ["pmegp", "mudra", "pmfme", "cgtmse", "udyogini"];

export function DocChecklist() {
  const { t, href } = useI18n();
  const sec = t.sections.docs;
  const options = getSchemes(t).filter((s) => picks.includes(s.slug));
  const [slug, setSlug] = useState(options[0].slug);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const scheme = options.find((s) => s.slug === slug)!;
  const done = scheme.documents.filter((d) => checked[`${slug}:${d}`]).length;
  const total = scheme.documents.length;
  const ready = done === total;

  return (
    <section className="border-t border-line bg-paper-2 py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:sticky lg:top-28">
          <SectionHeading label={sec.label} title={sec.title} alt={sec.alt} sub={sec.sub} />
          <div className="mt-8 flex flex-wrap gap-2">
            {options.map((s) => (
              <button
                key={s.slug}
                onClick={() => setSlug(s.slug)}
                aria-pressed={s.slug === slug}
                className={`rounded-lg border-2 px-4 py-2.5 text-sm font-bold transition-colors ${
                  s.slug === slug ? "border-brand-500 bg-brand-600 text-white" : "border-line bg-white text-ink-3 hover:border-brand-500/50"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border-2 border-brand-900/10 bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="font-display text-xl font-bold text-ink">{fill(sec.heading, { name: scheme.name })}</div>
            <div className="tabular text-sm font-bold text-steel">{fill(sec.ready, { done, total })}</div>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-mist">
            <motion.div className="h-full rounded-full bg-brand-600" animate={{ width: `${(done / total) * 100}%` }} transition={{ type: "spring", stiffness: 140, damping: 20 }} />
          </div>

          <ul className="mt-6 space-y-2.5">
            {scheme.documents.map((d) => {
              const key = `${slug}:${d}`;
              const on = !!checked[key];
              return (
                <li key={key}>
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 px-4 py-3.5 transition-colors ${
                      on ? "border-brand-500 bg-brand-50" : "border-line hover:border-steel-2"
                    }`}
                  >
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => setChecked((c) => ({ ...c, [key]: !on }))} />
                    <motion.span
                      animate={{ backgroundColor: on ? "#157a46" : "#ffffff", borderColor: on ? "#157a46" : "#b9cbbf" }}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2"
                    >
                      <AnimatePresence>
                        {on && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check className="h-4 w-4 text-white" strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.span>
                    <span className={`font-semibold ${on ? "text-ink" : "text-ink-3"}`}>{d}</span>
                  </label>
                </li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait">
            {ready ? (
              <motion.div key="ready" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3 rounded-lg bg-brand-600 p-4 font-bold text-white">
                <PartyPopper className="h-6 w-6 shrink-0" /> {sec.allReady}
              </motion.div>
            ) : (
              <motion.div key="missing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-sm text-ink-3">
                {fill(sec.missing, { count: total - done })}
              </motion.div>
            )}
          </AnimatePresence>
          <Link href={href(`/contact?scheme=${slug}`)} className="mt-5 inline-flex items-center gap-2 font-bold text-brand-700 hover:gap-3 transition-all">
            {fill(sec.help, { name: scheme.name })} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
