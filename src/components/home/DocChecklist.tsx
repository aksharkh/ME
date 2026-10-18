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
    <section data-sec="docs" className="border-t border-s-line bg-s-bg py-20">
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
                  s.slug === slug ? "border-s-btn bg-s-btn text-s-btn-fg" : "border-s-line bg-s-card text-s-text hover:border-s-accent"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border-2 border-s-card-line bg-s-card p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="font-display text-xl font-bold text-s-fg">{fill(sec.heading, { name: scheme.name })}</div>
            <div className="tabular text-sm font-bold text-s-muted">{fill(sec.ready, { done, total })}</div>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-s-soft">
            <motion.div className="h-full rounded-full bg-s-btn" animate={{ width: `${(done / total) * 100}%` }} transition={{ type: "spring", stiffness: 140, damping: 20 }} />
          </div>

          <ul className="mt-6 space-y-2.5">
            {scheme.documents.map((d) => {
              const key = `${slug}:${d}`;
              const on = !!checked[key];
              return (
                <li key={key}>
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 px-4 py-3.5 transition-colors ${
                      on ? "border-s-accent bg-s-soft" : "border-s-line hover:border-s-accent"
                    }`}
                  >
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => setChecked((c) => ({ ...c, [key]: !on }))} />
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 transition-colors ${on ? "border-s-btn bg-s-btn" : "border-s-field-line bg-s-field"}`}
                    >
                      <AnimatePresence>
                        {on && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check className="h-4 w-4 text-s-btn-fg" strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className={`font-semibold ${on ? "text-s-fg" : "text-s-text"}`}>{d}</span>
                  </label>
                </li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait">
            {ready ? (
              <motion.div key="ready" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3 rounded-lg bg-s-btn p-4 font-bold text-s-btn-fg">
                <PartyPopper className="h-6 w-6 shrink-0" /> {sec.allReady}
              </motion.div>
            ) : (
              <motion.div key="missing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-sm text-s-text">
                {fill(sec.missing, { count: total - done })}
              </motion.div>
            )}
          </AnimatePresence>
          <Link href={href(`/contact?scheme=${slug}`)} className="mt-5 inline-flex items-center gap-2 font-bold text-s-accent hover:gap-3 transition-all">
            {fill(sec.help, { name: scheme.name })} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
