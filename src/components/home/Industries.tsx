import { industries, rangeLabel } from "@/lib/content";
import { getDictionary } from "@/i18n/server";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/Section";

export async function Industries() {
  const t = await getDictionary();
  const s = t.sections.industries;
  return (
    <section id="industries" data-sec="industries" className="blueprint relative scroll-mt-24 border-y border-s-line bg-s-bg py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label={s.label} title={s.title} alt={s.alt} sub={s.sub} />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const alt = t.industriesAlt[ind.id];
            return (
              <Reveal key={ind.id} delay={(i % 6) * 0.04} className="h-full">
                <div className="group relative flex h-full flex-col rounded-xl border-2 border-s-card-line bg-s-card p-4 transition-colors hover:border-s-accent">
                  {ind.food && <span className="absolute right-2 top-2 rounded bg-s-soft px-1.5 py-0.5 text-[10px] font-bold uppercase text-s-accent">{s.food}</span>}
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-s-soft text-s-num transition-colors group-hover:bg-s-strong group-hover:text-s-on-strong">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-3 text-[15px] font-bold leading-tight text-s-fg">{t.industries[ind.id]}</div>
                  {alt && (
                    <div lang="kn" className="text-xs font-medium text-s-muted">
                      {alt}
                    </div>
                  )}
                  <div className="mt-auto pt-3">
                    <div className="tabular text-sm font-bold text-s-num">{rangeLabel(ind.range, t.units)}</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {ind.schemes.map((sc) => (
                        <span key={sc} className="rounded bg-s-soft px-1.5 py-0.5 text-[10px] font-bold text-s-text">
                          {sc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
