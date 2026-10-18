import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

// Colours here are section role tokens (text-s-*, bg-s-*): they adapt to whichever surface the
// surrounding section has in the active theme (see src/lib/themes.ts), light or dark.

/** Small section label: a short rule + uppercase text. */
export function Eyebrow({ children }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-s-accent">
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
      <Eyebrow>{label}</Eyebrow>
      <h2 className="font-display mt-3 text-3xl font-bold leading-[1.12] text-s-fg sm:text-4xl lg:text-[2.6rem]">{title}</h2>
      {alt && (
        <p lang="kn" className="mt-1.5 text-lg font-medium text-s-muted">
          {alt}
        </p>
      )}
      {sub && <p className="mt-4 text-base leading-relaxed text-s-text sm:text-lg">{sub}</p>}
    </Reveal>
  );
}

const solid =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-s-btn px-6 py-3.5 text-base font-bold text-s-btn-fg shadow-[0_6px_0_0_var(--sf-btn-edge)] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_var(--sf-btn-edge)] active:translate-y-[6px] active:shadow-none";
const outline =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-s-fg/20 px-6 py-3 text-base font-bold text-s-fg transition-colors hover:border-s-accent hover:bg-s-soft";

export const btn = {
  /** Main action — uses the surface's button colour (card green on light bands, mint / brass on dark bands) */
  primary: solid,
  mint: solid,
  /** Strong neutral action */
  dark: "inline-flex items-center justify-center gap-2 rounded-xl bg-s-strong px-6 py-3.5 text-base font-bold text-s-on-strong transition-all hover:translate-y-[2px] active:translate-y-[4px]",
  /** Secondary action — outline that adapts to light or dark bands */
  ghost: outline,
  outlineLight: outline,
  whatsapp:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-bold text-[#ffffff] shadow-[0_6px_0_0_#128C4A] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#128C4A] active:translate-y-[6px] active:shadow-none",
};
