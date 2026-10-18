import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "../forms/EnquiryForm";
import { BarsMark } from "../layout/Logo";
import { Reveal } from "../ui/Reveal";
import { Eyebrow, btn } from "../ui/Section";
import { getDictionary } from "@/i18n/server";
import { fill } from "@/i18n/config";
import { mapsLink, site, whatsappLink } from "@/lib/site";

export async function CtaBand() {
  const t = await getDictionary();
  const s = t.sections.cta;
  const c = t.company;

  const rows: { icon: LucideIcon; label: string; value: string; href: string; external?: boolean }[] = [
    { icon: Phone, label: c.phoneLabel, value: site.phoneDisplay, href: site.phoneHref },
    { icon: Mail, label: c.emailLabel, value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: c.officeLabel, value: c.address, href: mapsLink, external: true },
  ];

  return (
    <section id="enquire" className="relative scroll-mt-24 overflow-hidden bg-brand-900 py-20 text-white">
      <BarsMark className="pointer-events-none absolute -bottom-10 -left-6 h-[340px] w-auto text-white opacity-[0.04]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <Eyebrow dark>{s.label}</Eyebrow>
          <h2 className="font-display mt-3 text-4xl font-bold leading-[1.1] sm:text-5xl">{s.title}</h2>
          {s.alt && (
            <p lang="kn" className="mt-2 text-xl font-medium text-white/60">
              {s.alt}
            </p>
          )}
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">{s.sub}</p>

          <p className="mt-8 text-sm font-bold uppercase tracking-wider text-brand-300">{fill(s.founderLine, { name: c.founder })}</p>
          <ul className="mt-4 space-y-3">
            {rows.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-brand-300/60"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-300 text-brand-950">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-white/50">{label}</span>
                    <span className="block font-semibold leading-snug text-white group-hover:text-brand-300">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a href={whatsappLink(t.cta.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={`${btn.whatsapp} mt-6`}>
            <MessageCircle className="h-5 w-5" /> {t.cta.whatsapp}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl bg-white p-6 text-ink sm:p-8">
            <EnquiryForm compact />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
