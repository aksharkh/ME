"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { FactoryScene } from "../factory/FactoryScene";
import { BarsMark } from "../layout/Logo";
import { AnimatedNumber } from "../ui/Counter";
import { btn } from "../ui/Section";
import { useI18n } from "@/i18n/client";
import { LAKH } from "@/lib/calc";
import { mapsLink, site, whatsappLink } from "@/lib/site";

export function Hero() {
  const { t, lang, href, short } = useI18n();
  const h = t.hero;
  const [cost, setCost] = useState(25 * LAKH);
  const subsidy = Math.min(cost, 50 * LAKH) * 0.35;
  const fill = ((cost - 5 * LAKH) / (50 * LAKH - 5 * LAKH)) * 100;

  return (
    <section className="blueprint-dark relative overflow-hidden bg-brand-900 text-white">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pb-20 lg:pt-14">
        <div>
          <p className="rise flex items-center gap-2.5 text-sm font-semibold text-brand-300">
            <BarsMark className="h-5 w-auto" />
            {h.tagline}
          </p>

          <h1
            className={`rise font-display mt-5 font-bold leading-[1.06] ${
              lang === "kn" ? "text-[2rem] sm:text-[2.6rem] lg:text-[3rem]" : "text-[2.5rem] sm:text-5xl lg:text-[3.7rem]"
            }`}
            style={{ animationDelay: "0.05s" }}
          >
            {h.titleLead} <span className="text-brand-300">{h.titleHighlight}</span>
          </h1>
          {h.alt && (
            <p lang="kn" className="rise mt-3 text-xl font-semibold text-white/60" style={{ animationDelay: "0.15s" }}>
              {h.alt}
            </p>
          )}
          <p className="rise mt-5 max-w-xl text-lg leading-relaxed text-white/75" style={{ animationDelay: "0.25s" }}>
            {h.sub}
          </p>

          <div className="rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.35s" }}>
            <Link href={href("/eligibility")} className={btn.mint}>
              {t.cta.eligibilityLong} <ArrowRight className="h-5 w-5" />
            </Link>
            <a href={whatsappLink(t.cta.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}>
              <MessageCircle className="h-5 w-5" /> {t.cta.whatsapp}
            </a>
          </div>

          <div className="rise mt-10 max-w-xl rounded-2xl bg-white p-5 text-ink shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)]" style={{ animationDelay: "0.45s" }}>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <label htmlFor="hero-cost" className="text-sm font-bold text-ink-3">
                {h.costLabel} <span className="tabular text-ink">{short(cost)}</span>
              </label>
              <div className="text-right">
                <div className="text-[11px] font-bold uppercase tracking-wider text-steel">{h.subsidyUpTo}</div>
                <div className="font-display text-3xl font-bold leading-tight text-brand-600">
                  <AnimatedNumber value={subsidy} format={short} />
                </div>
              </div>
            </div>
            <input
              id="hero-cost"
              type="range"
              className="range mt-3"
              min={5 * LAKH}
              max={50 * LAKH}
              step={LAKH}
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              style={{ ["--fill" as string]: `${fill}%` }}
            />
            <p className="mt-2 text-xs text-steel">
              {h.note}{" "}
              <Link href={href("/calculators#pmegp")} className="font-bold text-brand-700 underline-offset-2 hover:underline">
                {h.calcLink}
              </Link>
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/75 hover:text-white">
              <MapPin className="h-4 w-4 text-brand-300" /> {h.office}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-1.5 font-bold text-white hover:text-brand-300">
              <Phone className="h-4 w-4 text-brand-300" /> {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="rise" style={{ animationDelay: "0.2s" }}>
          <FactoryScene />
        </div>
      </div>
      <div className="hazard h-1.5 w-full" />
    </section>
  );
}
