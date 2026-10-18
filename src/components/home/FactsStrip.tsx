import { Counter } from "../ui/Counter";
import { getDictionary } from "@/i18n/server";
import { facts } from "@/lib/site";

/** Four headline numbers — the published limits of the main schemes. */
export async function FactsStrip() {
  const t = await getDictionary();
  return (
    <section data-sec="facts" className="relative border-b border-s-line bg-s-bg">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
        {facts.map((f, i) => (
          <div
            key={i}
            className={`px-3 py-9 text-center sm:px-8 ${i % 2 === 0 ? "border-r border-s-line" : ""} ${i < 2 ? "border-b border-s-line lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
          >
            <div className="font-display whitespace-nowrap text-3xl font-bold text-s-num sm:text-4xl xl:text-5xl">
              <Counter value={f.value} prefix={f.prefix} suffix={f.unit ? ` ${t.units[f.unit]}` : (f.suffix ?? "")} duration={1.4} />
            </div>
            <div className="mx-auto mt-3 h-0.5 w-8 rounded-full bg-s-accent2" />
            <div className="mx-auto mt-3 max-w-[16rem] text-sm font-semibold leading-snug text-s-muted">{t.facts[i]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
