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
      data-sec="header"
      className={`sticky top-0 z-50 border-b border-s-line bg-s-bg/95 text-s-fg backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_30px_-18px_rgba(18,26,22,0.45)]" : ""
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={href("/")} className="shrink-0" aria-label="MSME Marg — home">
          <Logo tone="dark" className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = !item.href.includes("#") && base.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={href(item.href)}
                className={`relative whitespace-nowrap rounded-lg px-3 py-2 text-[15px] font-semibold transition-colors ${
                  active ? "text-s-num" : "text-s-text hover:text-s-fg"
                }`}
              >
                {t.nav[item.key]}
                {active && <span className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-s-accent2" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden items-center gap-2 whitespace-nowrap px-2 text-sm font-bold text-s-num 2xl:flex">
            <Phone className="h-4 w-4 text-s-accent" />
            {site.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={switchLanguage}
            lang={lang === "en" ? "kn" : "en"}
            aria-label={t.nav.switchLabel}
            title={t.nav.switchLabel}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border-2 border-s-line px-3 py-2 text-sm font-bold text-s-fg transition-colors hover:border-s-accent"
          >
            <Languages className="h-4 w-4 text-s-accent" />
            {t.nav.switchTo}
          </button>
          <Link
            href={href("/eligibility")}
            className="hidden whitespace-nowrap rounded-xl bg-s-btn px-4 py-2.5 text-sm font-bold text-s-btn-fg shadow-[0_4px_0_0_var(--sf-btn-edge)] transition-all hover:translate-y-[2px] hover:shadow-[0_2px_0_0_var(--sf-btn-edge)] md:inline-flex"
          >
            {t.cta.eligibility}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl border-2 border-s-line text-s-fg xl:hidden"
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
            className="overflow-hidden border-t border-s-line bg-s-bg xl:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={href(item.href)}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-lg font-semibold text-s-fg hover:bg-s-soft"
                >
                  {t.nav[item.key]}
                </Link>
              ))}
              <Link
                href={href("/eligibility")}
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-s-btn px-4 py-3.5 text-center text-lg font-bold text-s-btn-fg"
              >
                {t.cta.eligibility}
              </Link>
              <a href={site.phoneHref} className="mt-2 flex items-center justify-center gap-2 rounded-xl border-2 border-s-line px-4 py-3 font-bold text-s-fg">
                <Phone className="h-4 w-4 text-s-accent" /> {site.phoneDisplay}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
