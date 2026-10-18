"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CalcShell, RangeField, ResultRow } from "./fields";
import { LAKH, MUDRA_TIERS, emi, mudraTier } from "@/lib/calc";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/config";

export function MudraCalc() {
  const { t, href, short, inr } = useI18n();
  const c = t.calc.mudra;
  const [amount, setAmount] = useState(3 * LAKH);
  const tier = mudraTier(amount);
  const monthly = emi(amount, 11, 60).monthly;

  return (
    <CalcShell
      inputs={
        <>
          <RangeField label={c.need} value={amount} min={20_000} max={20 * LAKH} step={10_000} onChange={setAmount} display={short} />
          <div className="space-y-2.5">
            {MUDRA_TIERS.map((tier_, i) => {
              const active = tier_.name === tier?.name;
              const prevMax = i === 0 ? 0 : MUDRA_TIERS[i - 1].max;
              return (
                <motion.div
                  key={tier_.name}
                  animate={{ scale: active ? 1.02 : 1 }}
                  className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-colors ${active ? "border-s-accent bg-s-soft" : "border-s-line bg-s-card"}`}
                >
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-lg font-extrabold ${active ? "bg-s-btn text-s-btn-fg" : "bg-s-soft text-s-muted"}`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-bold text-s-fg">
                      {c.tiers[tier_.name].name}{" "}
                      <span className="tabular text-sm font-semibold text-s-muted">
                        {prevMax ? `${short(prevMax)} – ` : `${c.upTo} `}
                        {short(tier_.max)}
                      </span>
                    </div>
                    <div className="text-xs text-s-text">{c.tiers[tier_.name].note}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      }
      result={
        <div className="flex h-full flex-col">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-s-muted">{c.applyFor}</div>
          <motion.div key={tier?.name} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display mt-1 text-4xl font-bold leading-tight text-s-accent sm:text-5xl">
            {tier && fill(c.title, { tier: c.tiers[tier.name].name })}
          </motion.div>
          <p className="mt-2 text-sm text-s-muted">{c.noCollateral}</p>

          <div className="mt-8">
            <ResultRow label={c.amount} value={amount} format={inr} />
            <ResultRow label={c.emi} value={monthly} format={inr} strong />
            <ResultRow label={c.collateral} value={0} format={zero} />
          </div>
          {tier?.name === "Tarun Plus" && (
            <p className="mt-4 rounded-xl bg-s-soft p-3 text-xs text-s-text">
              {c.plusNote}
            </p>
          )}
          <Link
            href={href("/contact?scheme=mudra")}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-s-btn px-5 py-3.5 font-bold text-s-btn-fg transition-transform hover:-translate-y-0.5"
          >
            {c.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      }
    />
  );
}

const zero = () => "₹0";
