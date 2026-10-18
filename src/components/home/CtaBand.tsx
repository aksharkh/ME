import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "../forms/EnquiryForm";
import { BarsMark } from "../layout/Logo";
import { Reveal } from "../ui/Reveal";
import { Eyebrow, btn } from "../ui/Section";
import { getDictionary } from "@/i18n/server";
import { fill } from "@/i18n/config";
import { mapsLink, site, whatsappLink } from "@/lib/site";

/** `onPage` on inner pages, where the band follows a plain page section instead of the FAQ. */
export async function CtaBand({ onPage = false }: { onPage?: boolean }) {
  const t = await getDictionary();
  const s = t.sections.cta;
  const c = t.company;

  const rows: { icon: LucideIcon; label: string; value: string; href: string; external?: boolean }[] = [
    { icon: Phone, label: c.phoneLabel, value: site.phoneDisplay, href: site.phoneHref },
    { icon: Mail, label: c.emailLabel, value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: c.officeLabel, value: c.address, href: mapsLink, external: true },
  ];

  return (
    <section id="enquire" data-sec={onPage ? "ctaPage" : "cta"} className="relative scroll-mt-24 overflow-hidden bg-s-bg py-20 text-s-text">
      <BarsMark className="pointer-events-none absolute -bottom-10 -left-6 h-[340px] w-auto text-s-fg opacity-[0.05]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <Eyebrow dark>{s.label}</Eyebrow>
          <h2 className="font-display mt-3 text-4xl font-bold leading-[1.1] text-s-fg sm:text-5xl">{s.title}</h2>
          {s.alt && (
            <p lang="kn" className="mt-2 text-xl font-medium text-s-muted">
              {s.alt}
            </p>
          )}
          <p className="mt-5 max-w-md text-lg leading-relaxed text-s-text">{s.sub}</p>

          <p className="mt-8 text-sm font-bold uppercase tracking-wider text-s-accent">{fill(s.founderLine, { name: c.founder })}</p>
          <ul className="mt-4 space-y-3">
            {rows.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-4 rounded-xl border border-s-line bg-s-card p-4 transition-colors hover:border-s-accent"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-s-btn text-s-btn-fg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-s-muted">{label}</span>
                    <span className="block font-semibold leading-snug text-s-fg group-hover:text-s-accent">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a href={whatsappLink(t.cta.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={`${btn.outlineLight} mt-6`}>
            <MessageCircle className="h-5 w-5 text-[#25D366]" /> {t.cta.whatsapp}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="sf-paper rounded-2xl border border-s-card-line bg-s-bg p-6 text-s-text shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] sm:p-8">
            <EnquiryForm compact />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
