import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, HeartHandshake, Languages, Mail, MessageCircle, Phone, Scale } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading, btn } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Logo } from "@/components/layout/Logo";
import { FactsStrip } from "@/components/home/FactsStrip";
import { JourneyLine } from "@/components/home/JourneyLine";
import { CtaBand } from "@/components/home/CtaBand";
import { alternates, getDictionary, getLang } from "@/i18n/server";
import { localePath } from "@/i18n/config";
import { site, whatsappLink } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.aboutTitle, description: t.meta.aboutDesc, alternates: await alternates("/about") };
}

const icons = [Eye, Languages, Scale, HeartHandshake];

export default async function AboutPage() {
  const t = await getDictionary();
  const lang = await getLang();
  const a = t.about;
  const c = t.company;

  return (
    <>
      <PageHero label={a.label} title={a.title} alt={a.alt} sub={a.sub} crumbs={[{ href: "/about", label: t.nav.about }]} />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <SectionHeading
            label={a.storyLabel}
            title={a.storyTitle}
            sub={
              <>
                {a.story1}
                <br />
                <br />
                {a.story2}
              </>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {a.values.map(({ title, desc }, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="h-full rounded-xl border-2 border-brand-900/10 bg-white p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display mt-4 text-xl font-bold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-3">{desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder — the same details as the visiting card */}
      <section className="border-y border-line bg-paper-2 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-brand-900 p-8 text-white sm:p-10">
              <div className="blueprint-dark absolute inset-0" aria-hidden />
              <div className="relative">
                <p className="text-sm font-semibold text-brand-300">{c.division}</p>
                <p className="font-display mt-6 text-4xl font-bold">{c.founder}</p>
                <p className="mt-1 text-lg text-white/70">{c.founderRole}</p>
                <div className="mt-2 h-1 w-14 rounded-full bg-sage-500" />
                <div className="mt-10 flex items-end justify-between gap-6">
                  <Logo tone="light" className="h-14 w-auto" />
                  <p className="text-right text-sm font-semibold text-white/80">{t.brand.tag}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading label={a.founderLabel} title={a.founderTitle} sub={a.founderText} />
            <p className="mt-4 text-ink-3">{a.divisionText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.phoneHref} className={btn.primary}>
                <Phone className="h-5 w-5" /> {site.phoneDisplay}
              </a>
              <a href={whatsappLink(t.cta.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}>
                <MessageCircle className="h-5 w-5" /> {t.cta.whatsappShort}
              </a>
              <a href={`mailto:${site.email}`} className={btn.ghost}>
                <Mail className="h-5 w-5" /> {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <FactsStrip />
      <JourneyLine />

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">{a.ctaTitle}</h2>
          <Link href={localePath(lang, "/eligibility")} className={`${btn.primary} mt-8`}>
            {a.cta} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
