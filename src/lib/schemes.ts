// Scheme metadata. All visible text lives in the dictionaries (src/i18n) under `schemes[slug]`.
// Numbers there reflect published guidelines as of 2025–26 — re-check the official portal before quoting a client.

import type { Dictionary } from "@/i18n/en";

export type SchemeTag = "new" | "expansion" | "food" | "special" | "no-collateral" | "artisan" | "certification" | "karnataka";
export const schemeTagIds: SchemeTag[] = ["new", "expansion", "food", "special", "no-collateral", "karnataka", "artisan", "certification"];

export type CalculatorId = "pmegp" | "pmfme" | "emi" | "mudra" | "classify";
export type SchemeSlug = keyof Dictionary["schemes"];

interface SchemeMeta {
  slug: SchemeSlug;
  tags: SchemeTag[];
  calculator?: CalculatorId;
  officialUrl: string;
  accent: "saffron" | "leaf" | "ink" | "gold";
}

export type Scheme = SchemeMeta & Dictionary["schemes"][SchemeSlug];

const meta: SchemeMeta[] = [
  { slug: "pmegp", tags: ["new", "special", "food", "expansion"], calculator: "pmegp", officialUrl: "https://www.kviconline.gov.in/pmegpeportal/", accent: "saffron" },
  { slug: "mudra", tags: ["new", "expansion", "no-collateral", "food"], calculator: "mudra", officialUrl: "https://www.mudra.org.in/", accent: "leaf" },
  { slug: "cgtmse", tags: ["no-collateral", "expansion", "new", "food"], calculator: "emi", officialUrl: "https://www.cgtmse.in/", accent: "ink" },
  { slug: "pmfme", tags: ["food", "new", "expansion", "special"], calculator: "pmfme", officialUrl: "https://pmfme.mofpi.gov.in/", accent: "gold" },
  { slug: "udyogini", tags: ["special", "new", "karnataka"], calculator: "emi", officialUrl: "https://kswdc.karnataka.gov.in/", accent: "saffron" },
  { slug: "karnataka-incentives", tags: ["new", "expansion", "food", "special", "karnataka"], calculator: "emi", officialUrl: "https://kum.karnataka.gov.in/", accent: "leaf" },
  { slug: "stand-up-india", tags: ["special", "new"], calculator: "emi", officialUrl: "https://www.standupmitra.in/", accent: "ink" },
  { slug: "pm-vishwakarma", tags: ["artisan", "no-collateral", "new"], calculator: "emi", officialUrl: "https://pmvishwakarma.gov.in/", accent: "gold" },
  { slug: "udyam-registration", tags: ["certification", "new"], calculator: "classify", officialUrl: "https://udyamregistration.gov.in/", accent: "ink" },
  { slug: "zed-certification", tags: ["certification", "expansion"], officialUrl: "https://zed.msme.gov.in/", accent: "gold" },
];

export const schemeSlugs = meta.map((m) => m.slug);

export function getSchemes(t: Dictionary): Scheme[] {
  return meta.map((m) => ({ ...m, ...t.schemes[m.slug] }));
}

export function getScheme(t: Dictionary, slug: string): Scheme | undefined {
  return getSchemes(t).find((s) => s.slug === slug);
}
