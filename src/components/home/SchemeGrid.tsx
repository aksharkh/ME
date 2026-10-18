"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { getSchemes, schemeTagIds, type Scheme, type SchemeTag } from "@/lib/schemes";

const accentClass: Record<Scheme["accent"], { bar: string; text: string }> = {
  saffron: { bar: "bg-[var(--t-c1)]", text: "text-s-num" },
  leaf: { bar: "bg-[var(--t-c2)]", text: "text-s-num" },
  ink: { bar: "bg-[var(--t-c3)]", text: "text-s-num" },
  gold: { bar: "bg-[var(--t-c4)]", text: "text-s-num" },
};

export function SchemeCard({ s }: { s: Scheme }) {
  const { href } = useI18n();
  const a = accentClass[s.accent];
  return (
    <Link
      href={href(`/schemes/${s.slug}`)}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-s-card-line bg-s-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-s-accent"
    >
      <div className={`absolute inset-y-0 left-0 w-1.5 ${a.bar}`} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-2xl font-bold leading-tight text-s-fg">{s.name}</div>
          <div className="mt-0.5 text-xs font-semibold text-s-muted">{s.by}</div>
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-s-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-s-fg" />
      </div>

      <div className="mt-5">
        <div className={`font-display text-5xl font-bold leading-none ${a.text}`}>{s.headline.value}</div>
        <div className="mt-1.5 text-sm font-bold text-s-text">{s.headline.label}</div>
      </div>

      <p className="mb-6 mt-4 text-sm leading-relaxed text-s-text">{s.tagline}</p>

      <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-dashed border-s-line pt-4">
        {s.stats.map((st) => (
          <div key={st.label}>
            <dt className="tabular text-sm font-bold text-s-fg">{st.value}</dt>
            <dd className="text-[11px] leading-tight text-s-muted">{st.label}</dd>
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
                on ? "border-s-strong bg-s-strong text-s-on-strong" : "border-s-line bg-s-card text-s-text hover:border-s-accent"
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
