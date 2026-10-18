"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Palette, X } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { DEFAULT_THEME, themes } from "@/lib/themes";
import { applyTheme, currentTheme, restoreTheme } from "@/lib/theme-client";

type Names = keyof ReturnType<typeof useI18n>["t"]["theme"]["names"];

/** Floating palette button (above WhatsApp) that lets the client try every colour theme on the live site. */
export function ThemePicker() {
  const { t } = useI18n();
  const tt = t.theme;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(DEFAULT_THEME);

  useEffect(restoreTheme, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    setActive(currentTheme());
    setOpen((v) => !v);
  };
  const pick = (id: string) => {
    applyTheme(id);
    setActive(id);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={tt.title}
        aria-expanded={open}
        title={tt.button}
        className="sf-paper fixed bottom-20 right-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-s-card-line bg-s-bg text-s-num shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 md:bottom-24 md:right-6 md:h-14 md:w-14"
      >
        {open ? <X className="h-6 w-6" /> : <Palette className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={tt.title}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="sf-paper fixed inset-x-3 bottom-36 z-[60] max-h-[calc(100dvh-11rem)] overflow-y-auto rounded-2xl border border-s-card-line bg-s-bg p-4 text-s-text shadow-[0_30px_80px_-24px_rgba(0,0,0,0.55)] md:inset-x-auto md:bottom-44 md:right-6 md:max-h-[calc(100dvh-13rem)] md:w-[400px]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-bold text-s-fg">{tt.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-s-muted">{tt.sub}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label={tt.close} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-s-soft text-s-fg">
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="mt-4 space-y-2">
              {themes.map((th) => {
                const on = th.id === active;
                return (
                  <li key={th.id}>
                    <button
                      type="button"
                      onClick={() => pick(th.id)}
                      aria-pressed={on}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-colors ${
                        on ? "border-s-accent bg-s-soft" : "border-s-line hover:border-s-accent"
                      }`}
                    >
                      <span className="flex shrink-0 -space-x-2" aria-hidden>
                        {th.swatch.map((c, i) => (
                          <span key={i} className="h-8 w-8 rounded-full border-2 border-s-bg ring-1 ring-s-fg/15" style={{ background: c }} />
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-s-fg">{tt.names[th.id as Names]}</span>
                        <span className="block text-xs leading-snug text-s-muted">{tt.notes[th.id as Names]}</span>
                      </span>
                      {on && (
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-s-btn text-s-btn-fg" title={tt.current}>
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          <span className="sr-only">{tt.current}</span>
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
