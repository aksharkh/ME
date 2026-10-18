import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SchemeGrid } from "@/components/home/SchemeGrid";
import { SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/home/CtaBand";
import { alternates, getDictionary, getLang } from "@/i18n/server";
import { localePath } from "@/i18n/config";
import { getSchemes } from "@/lib/schemes";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.schemesTitle, description: t.meta.schemesDesc, alternates: await alternates("/schemes") };
}

export default async function SchemesPage() {
  const t = await getDictionary();
  const lang = await getLang();
  const p = t.schemePage;

  return (
    <>
      <PageHero label={t.nav.schemes} title={p.allTitle} alt={p.allAlt} sub={p.allSub} crumbs={[{ href: "/schemes", label: t.nav.schemes }]} />

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SchemeGrid />
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading label={p.compareLabel} title={p.compareTitle} sub={p.compareSub} />
          <div className="mt-10 overflow-x-auto rounded-xl border-2 border-brand-900/10 bg-white">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-brand-900 text-xs uppercase tracking-wider text-white/70">
                <tr>
                  <th className="px-5 py-4">{p.colScheme}</th>
                  <th className="px-5 py-4">{p.colBenefit}</th>
                  <th className="px-5 py-4">{p.colBestFor}</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody>
                {getSchemes(t).map((s) => (
                  <tr key={s.slug} className="border-t border-line align-top transition-colors hover:bg-brand-50/50">
                    <td className="px-5 py-4">
                      <div className="font-bold text-ink">{s.name}</div>
                      <div className="text-xs text-steel">{s.fullName}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-display text-xl font-bold text-brand-600">{s.headline.value}</span> <span className="text-ink-3">{s.headline.label}</span>
                    </td>
                    <td className="max-w-sm px-5 py-4 text-ink-3">{s.idealFor}</td>
                    <td className="px-5 py-4">
                      <Link href={localePath(lang, `/schemes/${s.slug}`)} className="whitespace-nowrap font-bold text-brand-700 hover:underline">
                        {p.details}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
