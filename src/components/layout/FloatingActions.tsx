import Link from "next/link";
import { Calculator, MessageCircle, Phone } from "lucide-react";
import { getDictionary, getLang } from "@/i18n/server";
import { localePath } from "@/i18n/config";
import { site, whatsappLink } from "@/lib/site";

/** WhatsApp bubble on desktop, a 3-button action bar on phones — most visitors will call or WhatsApp, not fill forms. */
export async function FloatingActions() {
  const t = await getDictionary();
  const lang = await getLang();
  const wa = whatsappLink(t.cta.whatsappMessage);

  return (
    <>
      <a href={wa} target="_blank" rel="noopener noreferrer" aria-label={t.cta.whatsappAsk} className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 md:flex">
        <span className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-ink opacity-0 shadow-lg transition-opacity group-hover:opacity-100">{t.cta.whatsappAsk}</span>
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.8)]">
          <MessageCircle className="h-7 w-7" />
        </span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white md:hidden">
        <a href={site.phoneHref} className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold text-ink">
          <Phone className="h-5 w-5 text-brand-600" /> {t.cta.call}
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-bold text-ink">
          <MessageCircle className="h-5 w-5 text-[#25D366]" /> {t.cta.whatsappShort}
        </a>
        <Link href={localePath(lang, "/eligibility")} className="flex flex-col items-center gap-0.5 bg-brand-700 py-2.5 text-xs font-bold text-white">
          <Calculator className="h-5 w-5" /> {t.cta.check}
        </Link>
      </div>
    </>
  );
}
