import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";
import { schemeSlugs } from "@/lib/schemes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/schemes", "/calculators", "/eligibility", "/about", "/contact", ...schemeSlugs.map((s) => `/schemes/${s}`)];
  return paths.flatMap((p) =>
    locales.map((lang) => ({
      url: `${site.url}${localePath(lang, p) === "/" ? "" : localePath(lang, p)}`,
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : p.startsWith("/schemes/") ? 0.7 : 0.8,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localePath(l, p)}`])) },
    })),
  );
}
