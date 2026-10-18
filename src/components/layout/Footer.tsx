import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { getDictionary, getLang } from "@/i18n/server";
import { localePath } from "@/i18n/config";
import { getSchemes } from "@/lib/schemes";
import { mapsLink, site } from "@/lib/site";

export async function Footer() {
  const t = await getDictionary();
  const lang = await getLang();
  const href = (p: string) => localePath(lang, p);
  const tools = t.footer.toolLinks;

  return (
    <footer className="relative overflow-hidden bg-brand-950 pb-24 text-white md:pb-0">
      <div className="hazard h-1.5 w-full" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.35fr]">
        <div>
          <Logo tone="light" className="h-14 w-auto" />
          <p className="mt-5 text-base font-semibold text-brand-300">{t.brand.tag}</p>
          <p className="mt-1 text-sm text-white/55">{t.company.division}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{t.meta.homeDesc}</p>
          {t.footer.line && (
            <p lang="kn" className="mt-4 text-sm font-semibold text-white/80">
              {t.footer.line}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/45">{t.footer.schemes}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {getSchemes(t)
              .slice(0, 8)
              .map((s) => (
                <li key={s.slug}>
                  <Link href={href(`/schemes/${s.slug}`)} className="text-white/80 hover:text-brand-300">
                    {s.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/45">{t.footer.tools}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {(
              [
                ["/eligibility", tools.eligibility],
                ["/calculators#pmegp", tools.pmegp],
                ["/calculators#pmfme", tools.pmfme],
                ["/calculators#emi", tools.emi],
                ["/calculators#classify", tools.classify],
                ["/calculators#mudra", tools.mudra],
                ["/about", tools.about],
              ] as const
            ).map(([path, label]) => (
              <li key={path}>
                <Link href={href(path)} className="text-white/80 hover:text-brand-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/45">{t.footer.talk}</h3>
          <p className="mt-4 font-bold text-white">{t.company.founder}</p>
          <p className="text-sm text-white/55">{t.company.founderRole}</p>
          <ul className="mt-4 space-y-3.5 text-sm text-white/80">
            <li>
              <a href={site.phoneHref} className="flex gap-3 hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
              <span>
                {t.company.address}
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-1.5 flex items-center gap-1 font-semibold text-brand-300 hover:text-white">
                  {t.company.directions} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs leading-relaxed text-white/50 sm:px-6">
          <p>
            <strong className="text-white/70">{t.footer.disclaimerLabel}</strong> {t.footer.disclaimer}
          </p>
          <p className="mt-3">
            © <CopyrightYear /> {site.name} · {site.legalName} · {site.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
