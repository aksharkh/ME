import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { btn } from "@/components/ui/Section";
import { gearPath } from "@/components/factory/gear";
import { getDictionary, getLang } from "@/i18n/server";
import { localePath } from "@/i18n/config";

const GEAR = gearPath(0, 0, 60, 48, 12);

export default async function NotFound() {
  const t = await getDictionary();
  const lang = await getLang();
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <svg viewBox="-70 -70 140 140" className="h-32 w-32" aria-hidden>
        <g className="gear animate-spin-slow">
          <path d={GEAR} style={{ fill: "var(--sf-accent2)" }} />
          <circle r="22" style={{ fill: "var(--sf-bg)" }} />
        </g>
      </svg>
      <div className="hazard mt-8 h-2 w-40" />
      <h1 className="font-display mt-8 text-4xl font-bold text-s-fg sm:text-5xl">{t.notFound.title}</h1>
      <p className="mt-3 text-lg text-s-text">{t.notFound.sub}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href={localePath(lang, "/")} className={btn.primary}>
          {t.notFound.home} <ArrowRight className="h-5 w-5" />
        </Link>
        <Link href={localePath(lang, "/schemes")} className={btn.ghost}>
          {t.notFound.schemes}
        </Link>
      </div>
    </section>
  );
}
