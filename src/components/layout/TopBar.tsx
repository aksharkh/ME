import { Mail, MapPin, Phone } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { mapsLink, site } from "@/lib/site";

/** Thin contact strip above the header — the same details as the visiting card. */
export async function TopBar() {
  const t = await getDictionary();
  return (
    <div className="bg-brand-950 text-[13px] text-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <p className="hidden font-medium text-white/60 md:block">{t.company.division}</p>
        <div className="flex w-full items-center justify-between gap-5 md:w-auto md:justify-end">
          <a href={site.phoneHref} className="flex items-center gap-1.5 font-semibold text-white hover:text-brand-300">
            <Phone className="h-3.5 w-3.5 text-brand-300" />
            {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 hover:text-white sm:flex">
            <Mail className="h-3.5 w-3.5 text-brand-300" />
            {site.email}
          </a>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 hover:text-white lg:flex">
            <MapPin className="h-3.5 w-3.5 text-brand-300" />
            {t.company.addressShort}
          </a>
        </div>
      </div>
    </div>
  );
}
