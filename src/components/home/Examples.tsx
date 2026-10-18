import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/Section";
import { getDictionary, getLang } from "@/i18n/server";
import { localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import { LAKH, emi, pmegp, pmfme } from "@/lib/calc";
import { exampleProjects } from "@/lib/content";
import { formatINR, formatShort } from "@/lib/format";

type Labels = Dictionary["examples"]["labels"];
type Id = (typeof exampleProjects)[number]["id"];

/** Every figure is computed from the same rules the calculators use, so the examples never drift from them. */
function figures(id: Id, l: Labels, short: (n: number) => string) {
  switch (id) {
    case "mill": {
      const r = pmegp({ sector: "manufacturing", cost: 25 * LAKH, category: "special", area: "rural" });
      return {
        headline: { label: l.subsidy, value: short(r.subsidy) },
        rows: [
          [l.project, short(r.cost)],
          [l.own, short(r.own)],
          [l.repay, short(r.effectiveLoan)],
        ],
      };
    }
    case "masala": {
      const r = pmfme(18 * LAKH);
      return {
        headline: { label: l.subsidy, value: short(r.subsidy) },
        rows: [
          [l.project, short(r.cost)],
          [l.own, short(r.own)],
          [l.repay, short(r.effectiveLoan)],
        ],
      };
    }
    case "tailoring": {
      const loan = 3 * LAKH;
      const subsidy = loan * 0.3;
      return {
        headline: { label: l.subsidy, value: short(subsidy) },
        rows: [
          [l.loan, short(loan)],
          [l.repay, short(loan - subsidy)],
        ],
      };
    }
    case "packaging": {
      const loan = 48 * LAKH;
      return {
        headline: { label: l.emi, value: formatINR(emi(loan, 10.5, 84).monthly) },
        rows: [
          [l.loan, short(loan)],
          [l.collateral, l.none],
        ],
      };
    }
  }
}

export async function Examples() {
  const t = await getDictionary();
  const lang = await getLang();
  const s = t.sections.examples;
  const short = (n: number) => formatShort(n, t.units);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label={s.label} title={s.title} alt={s.alt} sub={s.sub} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {exampleProjects.map((p, i) => {
            const item = t.examples.items[p.id];
            const f = figures(p.id, t.examples.labels, short);
            return (
              <Reveal key={p.id} delay={i * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-xl border-2 border-brand-900/10 bg-white p-6">
                  <span className="self-start rounded bg-brand-900 px-2 py-1 text-xs font-bold text-white">{p.scheme}</span>
                  <h3 className="font-display mt-4 text-lg font-bold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-steel">{item.desc}</p>

                  <div className="mt-5 rounded-lg bg-brand-50 p-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-700">{f.headline.label}</div>
                    <div className="font-display tabular mt-0.5 text-3xl font-bold text-brand-700">{f.headline.value}</div>
                  </div>

                  <dl className="mt-4 flex-1 text-sm">
                    {f.rows.map(([label, value]) => (
                      <div key={label} className="flex items-baseline justify-between gap-3 border-b border-dashed border-line py-2 last:border-0">
                        <dt className="text-ink-3">{label}</dt>
                        <dd className="tabular font-bold text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <Link
                    href={localePath(lang, p.href)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-all hover:gap-2.5"
                  >
                    {s.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-steel">{s.note}</p>
      </div>
    </section>
  );
}
