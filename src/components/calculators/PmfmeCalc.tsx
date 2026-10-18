"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BigResult, CalcShell, MoneyBar, RangeField, ResultRow } from "./fields";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/config";
import { LAKH, PMFME_CAP, pmfme } from "@/lib/calc";

export function PmfmeCalc() {
  const { t, href, short, inr } = useI18n();
  const c = t.calc.pmfme;
  const common = t.calc.common;
  const [cost, setCost] = useState(15 * LAKH);
  const [productIdx, setProductIdx] = useState(0);
  const r = pmfme(cost);

  return (
    <CalcShell
      inputs={
        <>
          <div>
            <div className="text-sm font-bold text-ink-3">{c.make}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {c.products.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProductIdx(i)}
                  aria-pressed={i === productIdx}
                  className={`rounded-lg border-2 px-3.5 py-1.5 text-sm font-bold transition-colors ${
                    i === productIdx ? "border-brand-500 bg-brand-50 text-ink" : "border-line bg-white text-ink-3 hover:border-steel-2"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <RangeField label={c.cost} value={cost} min={2 * LAKH} max={60 * LAKH} step={LAKH / 2} onChange={setCost} display={short} hint={c.costHint} />
          <div className="rounded-xl bg-sage-100 p-4 text-sm leading-relaxed text-ink-2">
            <strong>{c.howLabel}</strong> {fill(c.how, { cap: short(PMFME_CAP) })}
          </div>
        </>
      }
      result={
        <div className="flex h-full flex-col">
          <BigResult label={fill(c.result, { product: c.products[productIdx] })} value={r.subsidy} format={short} />
          <p className="mt-1 text-sm text-white/60">{r.capped ? fill(c.capped, { cap: short(PMFME_CAP) }) : c.pctNote}</p>
          <div className="mt-6">
            <MoneyBar
              parts={[
                { label: common.yourMoney, value: r.own, color: "#e2b33c" },
                { label: common.subsidy, value: r.subsidy, color: "#8fd9ae" },
                { label: common.loanYouRepay, value: r.effectiveLoan, color: "#ffffff" },
              ]}
            />
          </div>
          <div className="mt-6">
            <ResultRow label={common.projectCost} value={r.cost} format={inr} />
            <ResultRow label={c.contribution} value={r.own} format={inr} />
            <ResultRow label={common.bankLoan} value={r.bankLoan} format={inr} />
            <ResultRow label={c.afterSubsidy} value={r.effectiveLoan} format={inr} strong />
          </div>
          <Link
            href={href("/contact?scheme=pmfme")}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-300 px-5 py-3.5 font-bold text-brand-950 transition-transform hover:-translate-y-0.5"
          >
            {c.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      }
    />
  );
}
