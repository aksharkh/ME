"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BigResult, CalcShell, MoneyBar, RangeField, ResultRow, Segmented } from "./fields";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/config";
import { LAKH, PMEGP_CEILING, pmegp, type Area, type Category, type Sector } from "@/lib/calc";

export function PmegpCalc() {
  const { t, href, short, inr } = useI18n();
  const c = t.calc.pmegp;
  const common = t.calc.common;
  const [sector, setSector] = useState<Sector>("manufacturing");
  const [category, setCategory] = useState<Category>("special");
  const [area, setArea] = useState<Area>("rural");
  const [cost, setCost] = useState(25 * LAKH);

  const max = PMEGP_CEILING[sector];
  const value = Math.min(cost, max);
  const r = pmegp({ sector, cost: value, category, area });

  return (
    <CalcShell
      inputs={
        <>
          <Segmented
            label={c.type}
            value={sector}
            onChange={setSector}
            options={[
              { value: "manufacturing", label: c.manufacturing, sub: c.manufacturingSub },
              { value: "service", label: c.service, sub: c.serviceSub },
            ]}
          />
          <Segmented
            label={c.category}
            value={category}
            onChange={setCategory}
            options={[
              { value: "general", label: c.general },
              { value: "special", label: c.special, sub: c.specialSub },
            ]}
          />
          <Segmented
            label={c.location}
            value={area}
            onChange={setArea}
            options={[
              { value: "urban", label: c.urban },
              { value: "rural", label: c.rural },
            ]}
          />
          <RangeField label={c.cost} value={value} min={2 * LAKH} max={max} step={LAKH / 2} onChange={setCost} display={short} hint={c.costHint} />
          <p className="text-xs leading-relaxed text-steel">{c.specialNote}</p>
        </>
      }
      result={
        <div className="flex h-full flex-col">
          <BigResult label={c.result} value={r.subsidy} format={short} />
          <p className="mt-1 text-sm text-white/60">{fill(c.resultNote, { pct: Math.round(r.subsidyPct * 100) })}</p>

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
            <ResultRow label={fill(c.contribution, { pct: Math.round(r.ownPct * 100) })} value={r.own} format={inr} />
            <ResultRow label={c.sanctioned} value={r.bankLoan} format={inr} />
            <ResultRow label={c.adjusted} value={r.subsidy} format={minus} />
            <ResultRow label={c.repay} value={r.effectiveLoan} format={inr} strong />
          </div>

          <Link
            href={href("/contact?scheme=pmegp")}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-300 px-5 py-3.5 font-bold text-brand-950 transition-transform hover:-translate-y-0.5"
          >
            {c.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      }
    />
  );
}

const minusFmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
function minus(n: number) {
  return `− ₹${minusFmt.format(Math.round(n))}`;
}
