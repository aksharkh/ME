import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Small section label: a short rule + uppercase text. */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-brand-300" : "text-brand-700"}`}>
      <span className="h-px w-8 bg-current" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  label,
  title,
  alt,
  sub,
  dark = false,
  center = false,
}: {
  label: string;
  title: ReactNode;
  alt?: string;
  sub?: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center [&>p:first-child]:justify-center" : ""}`}>
      <Eyebrow dark={dark}>{label}</Eyebrow>
      <h2 className={`font-display mt-3 text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[2.6rem] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {alt && (
        <p lang="kn" className={`mt-1.5 text-lg font-medium ${dark ? "text-white/55" : "text-steel"}`}>
          {alt}
        </p>
      )}
      {sub && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-white/75" : "text-ink-3"}`}>{sub}</p>}
    </Reveal>
  );
}

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-base font-bold text-white shadow-[0_6px_0_0_var(--color-brand-950)] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_var(--color-brand-950)] active:translate-y-[6px] active:shadow-none",
  dark: "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-900 px-6 py-3.5 text-base font-bold text-white shadow-[0_6px_0_0_#000] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#000] active:translate-y-[6px] active:shadow-none",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-900/15 bg-white px-6 py-3 text-base font-bold text-ink transition-colors hover:border-brand-900",
  /** Primary button on dark-green backgrounds */
  mint: "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-300 px-6 py-3.5 text-base font-bold text-brand-950 shadow-[0_6px_0_0_var(--color-brand-500)] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_var(--color-brand-500)] active:translate-y-[6px] active:shadow-none",
  whatsapp:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-bold text-white shadow-[0_6px_0_0_#128C4A] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#128C4A] active:translate-y-[6px] active:shadow-none",
};
