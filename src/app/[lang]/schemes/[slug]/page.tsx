import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, BadgeIndianRupee, FileText, ListOrdered, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SchemeCard } from "@/components/home/SchemeGrid";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { calculators } from "@/components/calculators/registry";
import { alternates, getDictionary } from "@/i18n/server";
import { fill } from "@/i18n/config";
import { getScheme, getSchemes, schemeSlugs } from "@/lib/schemes";

// Every scheme page is prerendered; reading the slug before render is fine here.
export const instant = false;

export function generateStaticParams() {
  return schemeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/schemes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = await getDictionary();
  const s = getScheme(t, slug);
  if (!s) return {};
  return {
    title: fill(t.meta.schemeTitle, { name: s.name, headline: `${s.headline.value} ${s.headline.label}` }),
    description: `${s.fullName}: ${s.tagline}`,
    alternates: await alternates(`/schemes/${s.slug}`),
  };
}

export default async function SchemePage({ params }: PageProps<"/[lang]/schemes/[slug]">) {
  const { slug } = await params;
  const t = await getDictionary();
  const s = getScheme(t, slug);
  if (!s) notFound();

  const p = t.schemePage;
  const calc = calculators.find((c) => c.id === s.calculator);
  const others = getSchemes(t)
    .filter((o) => o.slug !== s.slug && o.tags.some((tag) => s.tags.includes(tag)))
    .slice(0, 3);

  return (
    <>
      <PageHero
        label={s.by}
        title={
          <>
            {s.name}
            <span className="mt-1 block text-2xl font-semibold text-white/60 sm:text-3xl">{s.fullName}</span>
          </>
        }
        sub={s.tagline}
        crumbs={[
          { href: "/schemes", label: t.nav.schemes },
          { href: `/schemes/${s.slug}`, label: s.name },
        ]}
      >
        <div className="mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg bg-brand-300 p-5 text-brand-950">
            <div className="font-display text-3xl font-bold">{s.headline.value}</div>
            <div className="mt-1 text-sm font-semibold text-brand-950/80">{s.headline.label}</div>
          </div>
          {s.stats.map((st) => (
            <div key={st.label} className="rounded-lg border border-white/15 bg-white/5 p-5">
              <div className="font-display text-2xl font-bold">{st.value}</div>
              <div className="mt-1 text-sm text-white/65">{st.label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-12">
            <Reveal className="border-l-4 border-brand-600 bg-brand-50 p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-700">{p.idealFor}</div>
              <p className="mt-2 text-lg font-semibold leading-relaxed text-ink">{s.idealFor}</p>
            </Reveal>

            <Block title={p.benefits} icon={<BadgeIndianRupee className="h-5 w-5" />}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {s.benefits.map((b) => (
                  <li key={b} className="flex gap-3 rounded-lg border-2 border-brand-900/10 bg-white p-4 text-ink-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    {b}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title={p.eligibility} icon={<Users className="h-5 w-5" />}>
              <ul className="space-y-2.5">
                {s.eligibility.map((e) => (
                  <li key={e} className="flex gap-3 text-ink-2">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-brand-700" />
                    {e}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title={p.process} icon={<ListOrdered className="h-5 w-5" />}>
              <ol>
                {s.process.map((step, i) => (
                  <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < s.process.length - 1 && <span className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-0.5 bg-line" />}
                    <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-900 font-display font-bold text-white">{i + 1}</span>
                    <span className="pt-2 font-semibold text-ink">{step}</span>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title={p.documents} icon={<FileText className="h-5 w-5" />}>
              <div className="flex flex-wrap gap-2">
                {s.documents.map((d) => (
                  <span key={d} className="rounded-lg border-2 border-brand-900/10 bg-white px-4 py-2 text-sm font-semibold text-ink-2">
                    {d}
                  </span>
                ))}
              </div>
            </Block>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border-2 border-brand-900/10 bg-white p-6">
              <div className="font-display text-2xl font-bold text-ink">{fill(p.applyTitle, { name: s.name })}</div>
              <p className="mt-1 text-sm text-ink-3">{p.applySub}</p>
              <div className="mt-5">
                <EnquiryForm defaultScheme={s.slug} compact />
              </div>
            </div>
            <a
              href={s.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-between rounded-lg border-2 border-brand-900/10 bg-white px-5 py-4 text-sm font-semibold text-ink-3 hover:border-brand-900"
            >
              {fill(p.official, { host: new URL(s.officialUrl).hostname })}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </aside>
        </div>
      </section>

      {calc && (
        <section className="border-t border-line bg-paper-2 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading label={p.calcLabel} title={t.calc.meta[calc.id].title} sub={t.calc.meta[calc.id].desc} />
            <div className="mt-10">
              <calc.Component />
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading label={p.alsoLabel} title={p.alsoTitle} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <SchemeCard key={o.slug} s={o} />
              ))}
            </div>
          </div>
        </section>
      )}

      <p className="mx-auto max-w-7xl px-4 pb-16 text-xs text-steel sm:px-6">{p.note}</p>
    </>
  );
}

function Block({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Reveal>
      <h2 className="font-display flex items-center gap-3 text-2xl font-bold text-ink">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">{icon}</span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}
