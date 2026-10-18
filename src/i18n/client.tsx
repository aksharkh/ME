"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { localePath, type Locale } from "./config";
import type { Dictionary } from "./en";
import { formatINR, formatShort } from "@/lib/format";

interface I18n {
  lang: Locale;
  t: Dictionary;
  /** Prefix an internal path with the current locale */
  href: (path: string) => string;
  /** Stable formatters (stable identity matters for AnimatedNumber) */
  short: (n: number) => string;
  inr: (n: number) => string;
}

const Ctx = createContext<I18n | null>(null);

export function I18nProvider({ lang, dict, children }: { lang: Locale; dict: Dictionary; children: ReactNode }) {
  const value = useMemo<I18n>(
    () => ({
      lang,
      t: dict,
      href: (p) => localePath(lang, p),
      short: (n) => formatShort(n, dict.units),
      inr: formatINR,
    }),
    [lang, dict],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside <I18nProvider>");
  return v;
}
