import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { FactsStrip } from "@/components/home/FactsStrip";
import { SchemeGrid } from "@/components/home/SchemeGrid";
import { JourneyLine } from "@/components/home/JourneyLine";
import { CalculatorShowcase } from "@/components/home/CalculatorShowcase";
import { Industries } from "@/components/home/Industries";
import { WhyUs } from "@/components/home/WhyUs";
import { DocChecklist } from "@/components/home/DocChecklist";
import { Examples } from "@/components/home/Examples";
import { Faq } from "@/components/home/Faq";
import { CtaBand } from "@/components/home/CtaBand";
import { SectionHeading } from "@/components/ui/Section";
import { getDictionary, getLang } from "@/i18n/server";
import { localePath } from "@/i18n/config";

export default async function Home() {
  const t = await getDictionary();
  const lang = await getLang();
  const s = t.sections;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <Hero />
      <FactsStrip />

      <section className="bg-paper-2 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading label={s.schemes.label} title={s.schemes.title} alt={s.schemes.alt} sub={s.schemes.sub} />
            <Link href={localePath(lang, "/schemes")} className="inline-flex items-center gap-2 font-bold text-brand-700 transition-all hover:gap-3">
              {s.schemes.link} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            <SchemeGrid limit={6} />
          </div>
        </div>
      </section>

      <JourneyLine />
      <CalculatorShowcase />
      <Industries />
      <WhyUs />
      <DocChecklist />
      <Examples />

      <section className="border-t border-line bg-paper-2 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading label={s.faq.label} title={s.faq.title} alt={s.faq.alt} sub={s.faq.sub} />
          <Faq />
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
