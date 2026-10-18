import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { BarsMark } from "../layout/Logo";
import { Eyebrow } from "./Section";
import { getDictionary, getLang } from "@/i18n/server";
import { localePath } from "@/i18n/config";

export async function PageHero({
  label,
  title,
  alt,
  sub,
  crumbs = [],
  children,
}: {
  label: string;
  title: ReactNode;
  alt?: string;
  sub?: ReactNode;
  crumbs?: { href: string; label: string }[];
  children?: ReactNode;
}) {
  const t = await getDictionary();
  const lang = await getLang();
  return (
    <section data-sec="pagehero" className="blueprint relative overflow-hidden bg-s-bg text-s-text">
      <BarsMark
        animated
        className="pointer-events-none absolute -bottom-6 right-4 hidden h-[300px] w-auto text-s-fg opacity-[0.07] md:block lg:right-16"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:pb-16">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm font-semibold text-s-muted">
          <Link href={localePath(lang, "/")} className="hover:text-s-fg">
            {t.nav.home}
          </Link>
          {crumbs.map((c) => (
            <span key={c.href} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              <Link href={localePath(lang, c.href)} className="hover:text-s-fg">
                {c.label}
              </Link>
            </span>
          ))}
        </nav>
        <div className="mt-8 max-w-3xl">
          <Eyebrow dark>{label}</Eyebrow>
          <h1 className="font-display mt-3 text-4xl font-bold leading-[1.08] text-s-fg sm:text-5xl">{title}</h1>
          {alt && (
            <p lang="kn" className="mt-2 text-xl font-medium text-s-muted">
              {alt}
            </p>
          )}
          {sub && <p className="mt-5 text-lg leading-relaxed text-s-text">{sub}</p>}
        </div>
        {children}
      </div>
      <div className="hazard h-1 w-full" />
    </section>
  );
}
