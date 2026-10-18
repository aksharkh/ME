import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { EligibilityWizard } from "@/components/eligibility/EligibilityWizard";
import { alternates, getDictionary } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.eligibilityTitle, description: t.meta.eligibilityDesc, alternates: await alternates("/eligibility") };
}

export default async function EligibilityPage() {
  const t = await getDictionary();
  const e = t.eligibility;
  return (
    <>
      <PageHero label={e.label} title={e.title} alt={e.alt} sub={e.sub} crumbs={[{ href: "/eligibility", label: t.nav.eligibility }]} />
      <section data-sec="page" className="bg-s-bg px-4 py-14 sm:px-6">
        <EligibilityWizard />
      </section>
    </>
  );
}
