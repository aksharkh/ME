"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/client";

export function Faq() {
  const items = useI18n().t.faqs;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-s-line overflow-hidden rounded-xl border-2 border-s-card-line bg-s-card">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-s-fg sm:text-lg"
            >
              {f.q}
              <motion.span
                animate={{ rotate: on ? 45 : 0 }}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${on ? "bg-s-btn text-s-btn-fg" : "bg-s-soft text-s-fg"}`}
              >
                <Plus className="h-5 w-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-6 pb-6 leading-relaxed text-s-text">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
