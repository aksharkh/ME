"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Languages, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/client";
import { localePath, rememberLang, stripLocale } from "@/i18n/config";
import { navItems, site } from "@/lib/site";

export function Header() {
  const { t, lang, href } = useI18n();
  const base = stripLocale(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLanguage = () => {
    const next = lang === "en" ? "kn" : "en";
    rememberLang(next);
    window.location.assign(localePath(next, base) + window.location.search + window.location.hash);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-brand-900 text-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_30px_-12px_rgba(1,44,24,0.6)]" : ""
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={href("/")} className="shrink-0" aria-label="MSME Marg — home">
          <Logo tone="light" className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = !item.href.includes("#") && base.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={href(item.href)}
                className={`relative whitespace-nowrap rounded-lg px-3 py-2 text-[15px] font-semibold transition-colors ${
                  active ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {t.nav[item.key]}
                {active && <span className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-brand-300" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden items-center gap-2 whitespace-nowrap px-2 text-sm font-bold text-white 2xl:flex">
            <Phone className="h-4 w-4 text-brand-300" />
            {site.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={switchLanguage}
            lang={lang === "en" ? "kn" : "en"}
            aria-label={t.nav.switchLabel}
            title={t.nav.switchLabel}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border-2 border-white/20 px-3 py-2 text-sm font-bold text-white transition-colors hover:border-white/60"
          >
            <Languages className="h-4 w-4 text-brand-300" />
            {t.nav.switchTo}
          </button>
          <Link
            href={href("/eligibility")}
            className="hidden whitespace-nowrap rounded-xl bg-brand-300 px-4 py-2.5 text-sm font-bold text-brand-950 shadow-[0_4px_0_0_var(--color-brand-500)] transition-all hover:translate-y-[2px] hover:shadow-[0_2px_0_0_var(--color-brand-500)] md:inline-flex"
          >
            {t.cta.eligibility}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl border-2 border-white/20 text-white xl:hidden"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-brand-900 xl:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={href(item.href)}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg font-semibold text-white/90 hover:bg-white/10"
                >
                  {t.nav[item.key]}
                </Link>
              ))}
              <Link
                href={href("/eligibility")}
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-brand-300 px-4 py-3.5 text-center text-lg font-bold text-brand-950"
              >
                {t.cta.eligibility}
              </Link>
              <a href={site.phoneHref} className="mt-2 flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-4 py-3 font-bold text-white">
                <Phone className="h-4 w-4 text-brand-300" /> {site.phoneDisplay}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
