// Locale helpers safe to use on both server and client.

export const locales = ["en", "kn"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LANG_COOKIE = "lang";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** English lives at the root (/schemes), Kannada under /kn (/kn/schemes). */
export function localePath(lang: Locale, path: string) {
  if (lang === defaultLocale) return path;
  if (path === "/" || path === "") return "/kn";
  if (path.startsWith("/#") || path.startsWith("/?")) return `/kn${path.slice(1)}`;
  return `/kn${path}`;
}

/** /kn/schemes → /schemes, /en/schemes → /schemes */
export function stripLocale(pathname: string) {
  return pathname.replace(/^\/(en|kn)(?=\/|$)/, "") || "/";
}

/** Remember the visitor's language so proxy.ts can send them back to it next time (browser only). */
export function rememberLang(lang: Locale) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

/** fill("Hello {name}", { name: "Ravi" }) → "Hello Ravi" */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}
