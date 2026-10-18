"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { calculators } from "../calculators/registry";
import { SectionHeading } from "../ui/Section";
import { useI18n } from "@/i18n/client";

export function CalculatorShowcase() {
  const { t, href } = useI18n();
  const s = t.sections.calculators;
  const [active, setActive] = useState(calculators[0].id);
  const current = calculators.find((c) => c.id === active)!;

  return (
    <section id="calculators" className="relative border-t border-line py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label={s.label} title={s.title} alt={s.alt} sub={s.sub} />
          <Link href={href("/calculators")} className="inline-flex items-center gap-2 font-bold text-brand-700 transition-all hover:gap-3">
            {s.link} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist">
          {calculators.map((c) => {
            const on = c.id === active;
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(c.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-bold transition-colors ${
                  on ? "border-brand-900 bg-brand-900 text-white" : "border-line bg-white text-ink-3 hover:border-brand-900/40"
                }`}
              >
                <Icon className={`h-4 w-4 ${on ? "text-brand-300" : ""}`} />
                {t.calc.meta[c.id].short}
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <current.Component />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
