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
    <footer data-sec="footer" className="relative overflow-hidden bg-s-bg pb-24 text-s-text md:pb-0">
      <div className="hazard h-1 w-full" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.35fr]">
        <div>
          <Logo tone="light" className="h-14 w-auto" />
          <p className="mt-5 text-base font-semibold text-s-accent">{t.brand.tag}</p>
          <p className="mt-1 text-sm text-s-muted">{t.company.division}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-s-muted">{t.meta.homeDesc}</p>
          {t.footer.line && (
            <p lang="kn" className="mt-4 text-sm font-semibold text-s-text">
              {t.footer.line}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-s-accent">{t.footer.schemes}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {getSchemes(t)
              .slice(0, 8)
              .map((s) => (
                <li key={s.slug}>
                  <Link href={href(`/schemes/${s.slug}`)} className="text-s-text hover:text-s-accent">
                    {s.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-s-accent">{t.footer.tools}</h3>
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
                <Link href={href(path)} className="text-s-text hover:text-s-accent">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-s-accent">{t.footer.talk}</h3>
          <p className="mt-4 font-bold text-s-fg">{t.company.founder}</p>
          <p className="text-sm text-s-muted">{t.company.founderRole}</p>
          <ul className="mt-4 space-y-3.5 text-sm text-s-text">
            <li>
              <a href={site.phoneHref} className="flex gap-3 hover:text-s-fg">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-s-accent" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-s-fg">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-s-accent" />
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-s-accent" />
              <span>
                {t.company.address}
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-1.5 flex items-center gap-1 font-semibold text-s-accent hover:text-s-fg">
                  {t.company.directions} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-s-line">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs leading-relaxed text-s-muted sm:px-6">
          <p>
            <strong className="text-s-text">{t.footer.disclaimerLabel}</strong> {t.footer.disclaimer}
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
