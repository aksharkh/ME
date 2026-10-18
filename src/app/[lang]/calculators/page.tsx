import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Eyebrow, btn } from "@/components/ui/Section";
import { calculators } from "@/components/calculators/registry";
import { alternates, getDictionary, getLang } from "@/i18n/server";
import { fill, localePath } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.calculatorsTitle, description: t.meta.calculatorsDesc, alternates: await alternates("/calculators") };
}

export default async function CalculatorsPage() {
  const t = await getDictionary();
  const lang = await getLang();
  const p = t.calcPage;

  return (
    <>
      <PageHero label={p.label} title={p.title} alt={p.alt} sub={p.sub} crumbs={[{ href: "/calculators", label: t.nav.calculators }]}>
        <div className="mt-10 flex flex-wrap gap-3">
          {calculators.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold transition-colors hover:border-brand-600 hover:bg-brand-700"
              >
                <Icon className="h-4 w-4" /> {t.calc.meta[c.id].short}
              </a>
            );
          })}
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6">
        {calculators.map((c, i) => {
          const Icon = c.icon;
          const m = t.calc.meta[c.id];
          return (
            <section key={c.id} id={c.id} className="scroll-mt-28">
              <div className="mb-8 flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-brand-900 text-brand-300">
                  <Icon className="h-7 w-7" />
                </span>
                <div>
                  <Eyebrow>{fill(p.counter, { i: i + 1, n: calculators.length })}</Eyebrow>
                  <h2 className="font-display mt-2 text-3xl font-bold text-ink sm:text-4xl">{m.title}</h2>
                  <p className="mt-1 text-ink-3">{m.desc}</p>
                </div>
              </div>
              <c.Component />
            </section>
          );
        })}

        <div className="rounded-xl bg-brand-700 p-8 text-white sm:p-12">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{p.boxTitle}</h2>
          <p className="mt-2 max-w-xl text-lg text-white/90">{p.boxSub}</p>
          <Link href={localePath(lang, "/eligibility")} className={`${btn.dark} mt-6`}>
            {p.boxCta} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <p className="text-xs text-steel">{p.note}</p>
      </div>
    </>
  );
}
