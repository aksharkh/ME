import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, Contact, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ContactFormFromQuery } from "@/components/forms/ContactFormFromQuery";
import { alternates, getDictionary } from "@/i18n/server";
import { mapsEmbed, mapsLink, site, whatsappLink } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.contactTitle, description: t.meta.contactDesc, alternates: await alternates("/contact") };
}

export default async function ContactPage() {
  const t = await getDictionary();
  const c = t.contact;
  const co = t.company;
  const channels = [
    { icon: Phone, label: c.call, value: site.phoneDisplay, href: site.phoneHref, tone: "bg-s-soft text-s-accent" },
    { icon: MessageCircle, label: c.whatsapp, value: c.whatsappValue, href: whatsappLink(t.cta.whatsappMessage), tone: "bg-[#25D366]/15 text-[#1a9e51]" },
    { icon: Mail, label: c.email, value: site.email, href: `mailto:${site.email}`, tone: "bg-s-soft text-s-accent" },
  ];

  return (
    <>
      <PageHero label={c.label} title={c.title} alt={c.alt} sub={c.sub} crumbs={[{ href: "/contact", label: t.nav.contact }]} />

      <section data-sec="page" className="bg-s-bg py-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-s-card-line bg-s-card p-6">
              <p className="text-sm font-semibold text-s-muted">{co.founderRole}</p>
              <p className="font-display text-2xl font-bold text-s-fg">{co.founder}</p>
              <p className="text-sm text-s-muted">{co.division}</p>
            </div>

            {channels.map(({ icon: Icon, label, value, href, tone }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-5 rounded-xl border-2 border-s-card-line bg-s-card p-5 transition-colors hover:border-s-accent"
              >
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${tone}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold uppercase tracking-wider text-s-muted">{label}</span>
                  <span className="block break-words text-lg font-bold text-s-fg">{value}</span>
                </span>
              </a>
            ))}

            <div className="sf-panel overflow-hidden rounded-xl bg-s-bg text-s-text">
              <div className="flex gap-3 p-6">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-s-accent" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-s-muted">{co.officeLabel}</p>
                  <p className="mt-1 leading-relaxed">{co.address}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-s-btn px-4 py-2 text-sm font-bold text-s-btn-fg"
                    >
                      {co.directions} <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/msme-marg.vcf"
                      download
                      className="inline-flex items-center gap-1.5 rounded-lg border-2 border-s-line px-4 py-2 text-sm font-bold text-s-fg hover:border-s-accent"
                    >
                      <Contact className="h-4 w-4" /> {co.saveContact}
                    </a>
                  </div>
                </div>
              </div>
              <iframe
                title={co.mapTitle}
                src={mapsEmbed}
                className="block h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="h-fit rounded-xl border-2 border-s-card-line bg-s-card p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-bold text-s-fg">{c.formTitle}</h2>
            <p className="mt-1 text-s-text">{c.formSub}</p>
            <div className="mt-6">
              <Suspense fallback={<EnquiryForm />}>
                <ContactFormFromQuery />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
