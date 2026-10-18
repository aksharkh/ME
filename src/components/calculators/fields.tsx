"use client";

import { useId, type ReactNode } from "react";
import { motion } from "motion/react";
import { AnimatedNumber } from "../ui/Counter";

export function RangeField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: (v: number) => string;
  hint?: ReactNode;
}) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-bold text-ink-3">
          {label}
        </label>
        <span className="tabular rounded-lg bg-mist px-3 py-1 text-base font-extrabold text-ink">{display(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        className="range mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      <div className="mt-1.5 flex justify-between text-[11px] font-semibold text-steel-2">
        <span>{display(min)}</span>
        <span>{display(max)}</span>
      </div>
      {hint && <p className="mt-1 text-xs text-steel">{hint}</p>}
    </div>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string; sub?: string }[];
  onChange: (v: T) => void;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="text-sm font-bold text-ink-3">{label}</legend>
      <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((o) => {
          const active = o.value === value;
          return (
            <label
              key={o.value}
              className={`relative cursor-pointer rounded-xl border-2 px-3 py-2.5 text-center transition-colors ${
                active ? "border-brand-600 text-ink" : "border-line bg-white text-ink-3 hover:border-steel-2"
              }`}
            >
              <input type="radio" name={name} value={o.value} checked={active} onChange={() => onChange(o.value)} className="sr-only" />
              {active && <motion.span layoutId={`seg-${name}`} className="absolute inset-0 -z-0 rounded-[10px] bg-brand-50" />}
              <span className="relative block text-sm font-bold">{o.label}</span>
              {o.sub && <span className="relative block text-[11px] font-medium text-steel">{o.sub}</span>}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Big headline number in the result panel. */
export function BigResult({ label, value, format, tone = "mint" }: { label: string; value: number; format: (n: number) => string; tone?: "mint" | "white" }) {
  const color = tone === "mint" ? "text-brand-300" : "text-white";
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{label}</div>
      <div className={`font-display mt-1 text-4xl font-bold leading-tight sm:text-5xl ${color}`}>
        <AnimatedNumber value={value} format={format} />
      </div>
    </div>
  );
}

export function ResultRow({ label, value, format, strong }: { label: ReactNode; value: number; format: (n: number) => string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 border-b border-white/10 py-2.5 last:border-0 ${strong ? "text-white" : "text-white/75"}`}>
      <span className="text-sm">{label}</span>
      <span className={`tabular ${strong ? "text-lg font-extrabold" : "font-bold"}`}>
        <AnimatedNumber value={value} format={format} />
      </span>
    </div>
  );
}

/** Stacked bar that visually splits the project cost — the "where does the money come from" picture. */
export function MoneyBar({ parts }: { parts: { label: string; value: number; color: string }[] }) {
  const total = parts.reduce((a, p) => a + p.value, 0) || 1;
  return (
    <div>
      <div className="flex h-5 w-full overflow-hidden rounded-full bg-white/10">
        {parts.map((p) => (
          <motion.div
            key={p.label}
            className="h-full"
            style={{ background: p.color }}
            animate={{ width: `${(p.value / total) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {parts.map((p) => (
          <span key={p.label} className="flex items-center gap-1.5 text-xs font-semibold text-white/75">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} />
            {p.label} · {Math.round((p.value / total) * 100)}%
          </span>
        ))}
      </div>
    </div>
  );
}

export function CalcShell({ inputs, result }: { inputs: ReactNode; result: ReactNode }) {
  return (
    <div className="grid overflow-hidden rounded-2xl border-2 border-brand-900/10 bg-white lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-7 p-6 sm:p-8">{inputs}</div>
      <div className="blueprint-dark relative bg-brand-900 p-6 text-white sm:p-8">{result}</div>
    </div>
  );
}
