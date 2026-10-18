"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { getSchemes, schemeTagIds, type Scheme, type SchemeTag } from "@/lib/schemes";

const accentClass: Record<Scheme["accent"], { bar: string; text: string }> = {
  saffron: { bar: "bg-brand-600", text: "text-brand-700" },
  leaf: { bar: "bg-brand-400", text: "text-brand-600" },
  ink: { bar: "bg-brand-900", text: "text-brand-900" },
  gold: { bar: "bg-sage-500", text: "text-sage-700" },
};

export function SchemeCard({ s }: { s: Scheme }) {
  const { href } = useI18n();
  const a = accentClass[s.accent];
  return (
    <Link
      href={href(`/schemes/${s.slug}`)}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-brand-900/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-900"
    >
      <div className={`absolute inset-y-0 left-0 w-1.5 ${a.bar}`} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-2xl font-bold leading-tight text-ink">{s.name}</div>
          <div className="mt-0.5 text-xs font-semibold text-steel">{s.by}</div>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-steel transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>

      <div className="mt-5">
        <div className={`font-display text-5xl font-bold leading-none ${a.text}`}>{s.headline.value}</div>
        <div className="mt-1.5 text-sm font-bold text-ink-3">{s.headline.label}</div>
      </div>

      <p className="mb-6 mt-4 text-sm leading-relaxed text-ink-3">{s.tagline}</p>

      <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-dashed border-line pt-4">
        {s.stats.map((st) => (
          <div key={st.label}>
            <dt className="tabular text-sm font-bold text-ink">{st.value}</dt>
            <dd className="text-[11px] leading-tight text-steel">{st.label}</dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}

export function SchemeGrid({ limit }: { limit?: number }) {
  const { t } = useI18n();
  const [tag, setTag] = useState<SchemeTag | "all">("all");
  const list = getSchemes(t)
    .filter((s) => tag === "all" || s.tags.includes(tag))
    .slice(0, limit);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group">
        {(["all", ...schemeTagIds] as const).map((id) => {
          const on = tag === id;
          return (
            <button
              key={id}
              onClick={() => setTag(id)}
              aria-pressed={on}
              className={`rounded-lg border-2 px-3.5 py-2 text-sm font-bold transition-colors ${
                on ? "border-brand-900 bg-brand-900 text-white" : "border-line bg-white text-ink-3 hover:border-brand-900/40"
              }`}
            >
              {t.tags[id]}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((s) => (
            <motion.div key={s.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <SchemeCard s={s} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
