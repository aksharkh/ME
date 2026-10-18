import { ArrowRight, CircleX } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/Section";

export async function WhyUs() {
  const t = await getDictionary();
  const s = t.sections.why;
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading label={s.label} title={s.title} alt={s.alt} sub={s.sub} />
          <ol className="mt-10 grid gap-x-6 gap-y-6 sm:grid-cols-2">
            {t.services.map((svc, i) => (
              <li key={svc.title} className="border-t-2 border-brand-900 pt-3">
                <div className="tabular text-xs font-bold text-brand-700">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1 font-bold text-ink">{svc.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-ink-3">{svc.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="self-start lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-xl border-2 border-brand-900">
            <div className="grid grid-cols-3 bg-brand-900 text-sm font-bold text-white">
              <div className="p-3 sm:p-4" />
              <div className="p-3 text-white/60 sm:p-4">{s.alone}</div>
              <div className="bg-brand-700 p-3 sm:p-4">{s.withUs}</div>
            </div>
            {t.compare.map(([k, bad, good]) => (
              <div key={k} className="grid grid-cols-3 border-t border-line bg-white text-sm">
                <div className="p-3 font-bold text-ink sm:p-4">{k}</div>
                <div className="flex gap-2 p-3 text-ink-3 sm:p-4">
                  <CircleX className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  {bad}
                </div>
                <div className="flex gap-2 bg-brand-50/60 p-3 font-semibold text-ink sm:p-4">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {good}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
