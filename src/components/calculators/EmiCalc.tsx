"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { BigResult, CalcShell, RangeField, ResultRow } from "./fields";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/config";
import { LAKH, emi } from "@/lib/calc";

export function EmiCalc({ defaultAmount = 20 * LAKH }: { defaultAmount?: number }) {
  const { t, short, inr } = useI18n();
  const c = t.calc.emi;
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(10.5);
  const [years, setYears] = useState(7);
  const r = emi(amount, rate, years * 12);
  const peak = Math.max(...r.years.map((y) => y.principal + y.interest));
  const interestShare = r.interest / r.total;

  return (
    <CalcShell
      inputs={
        <>
          <RangeField label={c.amount} value={amount} min={LAKH} max={200 * LAKH} step={LAKH} onChange={setAmount} display={short} />
          <RangeField
            label={c.rate}
            value={rate}
            min={5}
            max={18}
            step={0.25}
            onChange={setRate}
            display={(v) => `${v.toFixed(2)}%`}
            hint={c.rateHint}
          />
          <RangeField label={c.period} value={years} min={1} max={10} step={1} onChange={setYears} display={(v) => `${v} ${v > 1 ? t.units.yrs : t.units.yr}`} />

          <div>
            <div className="text-sm font-bold text-ink-3">{c.yearly}</div>
            <div className="mt-3 flex h-36 items-end gap-1.5">
              {r.years.map((y) => {
                const h = ((y.principal + y.interest) / peak) * 100;
                const ih = (y.interest / (y.principal + y.interest)) * 100;
                return (
                  <div key={y.year} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                    <motion.div
                      className="flex w-full flex-col overflow-hidden rounded-t-md"
                      animate={{ height: `${h}%` }}
                      transition={{ type: "spring", stiffness: 140, damping: 20 }}
                      title={`${c.yearShort}${y.year}: ${c.principal} ${inr(y.principal)}, ${c.interest} ${inr(y.interest)}`}
                    >
                      <motion.div className="bg-brand-300" animate={{ height: `${ih}%` }} />
                      <div className="flex-1 bg-brand-900" />
                    </motion.div>
                    <span className="text-[10px] font-bold text-steel">
                      {c.yearShort}
                      {y.year}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex gap-4 text-xs font-semibold text-steel">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-brand-900" /> {c.principal}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-brand-300" /> {c.interest}
              </span>
            </div>
          </div>
        </>
      }
      result={
        <div className="flex h-full flex-col">
          <BigResult label={c.monthly} value={r.monthly} format={inr} tone="white" />
          <p className="mt-1 text-sm text-white/60">{fill(c.forMonths, { n: years * 12 })}</p>

          <div className="my-8 flex items-center gap-6">
            <Donut share={interestShare} />
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <span className="h-3 w-3 rounded-sm bg-white" /> {c.principal} {Math.round((1 - interestShare) * 100)}%
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="h-3 w-3 rounded-sm bg-brand-300" /> {c.interest} {Math.round(interestShare * 100)}%
              </div>
            </div>
          </div>

          <ResultRow label={c.amount} value={amount} format={inr} />
          <ResultRow label={c.totalInterest} value={r.interest} format={inr} />
          <ResultRow label={c.total} value={r.total} format={inr} strong />
          <p className="mt-4 text-xs text-white/50">
            {c.note}
          </p>
        </div>
      }
    />
  );
}

function Donut({ share }: { share: number }) {
  const R = 44;
  const C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 110 110" className="h-28 w-28 shrink-0 -rotate-90">
      <circle cx="55" cy="55" r={R} fill="none" stroke="#fff" strokeWidth="14" />
      <motion.circle
        cx="55"
        cy="55"
        r={R}
        fill="none"
        stroke="#8fd9ae"
        strokeWidth="14"
        strokeDasharray={C}
        animate={{ strokeDashoffset: C * (1 - share) }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
    </svg>
  );
}
