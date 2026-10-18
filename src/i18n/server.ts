import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, localePath, type Locale } from "./config";
import type { Dictionary } from "./en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en").then((m) => m.default),
  kn: () => import("./kn").then((m) => m.default),
};

// Page paths always arrive as /en/… or /kn/… via proxy.ts; anything else (e.g. a stray /something.png) is a 404.
export async function getLang(): Promise<Locale> {
  const l = await lang();
  if (!l || !isLocale(l)) notFound();
  return l;
}

export async function getDictionary() {
  return dictionaries[await getLang()]();
}

/** Metadata alternates so search engines link the English and Kannada versions of a page. */
export async function alternates(path: string) {
  const l = await getLang();
  return {
    canonical: localePath(l, path),
    languages: { en: localePath("en", path), kn: localePath("kn", path), "x-default": path },
  };
}
