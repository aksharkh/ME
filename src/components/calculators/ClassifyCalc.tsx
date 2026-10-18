"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Factory } from "lucide-react";
import { CalcShell, RangeField } from "./fields";
import { CRORE, LAKH, MSME_LIMITS, classify, type MsmeClass } from "@/lib/calc";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/config";

// Log-scale sliders so ₹5 lakh and ₹500 crore are both easy to pick.
const toValue = (pos: number, min: number, max: number) => Math.round(min * (max / min) ** (pos / 100) / 1000) * 1000;
const toPos = (v: number, min: number, max: number) => (Math.log(v / min) / Math.log(max / min)) * 100;

const INV = [LAKH, 200 * CRORE] as const;
const TURN = [LAKH, 800 * CRORE] as const;

const sizes: Record<MsmeClass, number> = { Micro: 28, Small: 40, Medium: 54, Large: 68 };

export function ClassifyCalc() {
  const { t, short } = useI18n();
  const c = t.calc.classify;
  const [invPos, setInvPos] = useState(toPos(50 * LAKH, ...INV));
  const [turnPos, setTurnPos] = useState(toPos(2 * CRORE, ...TURN));
  const investment = toValue(invPos, ...INV);
  const turnover = toValue(turnPos, ...TURN);
  const cls = classify(investment, turnover);

  return (
    <CalcShell
      inputs={
        <>
          <RangeField
            label={c.investment}
            value={invPos}
            min={0}
            max={100}
            step={0.5}
            onChange={setInvPos}
            display={(p) => short(toValue(p, ...INV))}
            hint={c.investmentHint}
          />
          <RangeField
            label={c.turnover}
            value={turnPos}
            min={0}
            max={100}
            step={0.5}
            onChange={setTurnPos}
            display={(p) => short(toValue(p, ...TURN))}
            hint={c.turnoverHint}
          />
          <div className="overflow-hidden rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-mist text-xs uppercase tracking-wider text-steel">
                <tr>
                  <th className="px-4 py-2.5">{c.colCategory}</th>
                  <th className="px-4 py-2.5">{c.colInvestment}</th>
                  <th className="px-4 py-2.5">{c.colTurnover}</th>
                </tr>
              </thead>
              <tbody>
                {MSME_LIMITS.map((l) => (
                  <tr key={l.cls} className={`border-t border-line ${l.cls === cls ? "bg-brand-50 font-bold" : ""}`}>
                    <td className="px-4 py-2.5">{c.classes[l.cls]}</td>
                    <td className="tabular px-4 py-2.5">{short(l.investment)}</td>
                    <td className="tabular px-4 py-2.5">{short(l.turnover)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-line px-4 py-2 text-[11px] text-steel">{c.revised}</p>
          </div>
        </>
      }
      result={
        <div className="flex h-full flex-col">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{c.youAre}</div>
          <motion.div
            key={cls}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`font-display mt-1 text-4xl font-bold leading-tight sm:text-5xl ${cls === "Large" ? "text-white" : "text-[#8fd9ae]"}`}
          >
            {cls === "Large" ? c.classes.Large : fill(c.enterprise, { cls: c.classes[cls] })}
          </motion.div>

          <div className="mt-8 flex items-end justify-between gap-2 border-b-4 border-white/20 pb-1">
            {(Object.keys(sizes) as MsmeClass[]).map((k) => {
              const active = k === cls;
              return (
                <div key={k} className="flex flex-1 flex-col items-center gap-2">
                  <motion.div animate={{ y: active ? -8 : 0, opacity: active ? 1 : 0.35 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
                    <Factory style={{ width: sizes[k], height: sizes[k] }} className={active ? "text-brand-300" : "text-white"} />
                  </motion.div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${active ? "text-brand-300" : "text-white/40"}`}>{c.classes[k]}</span>
                </div>
              );
            })}
          </div>

          <ul className="mt-8 space-y-3">
            {c.perks[cls].map((p) => (
              <motion.li key={cls + p} initial={{ x: 12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex gap-3 text-sm text-white/85">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                {p}
              </motion.li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
