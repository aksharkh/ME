"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/client";

export function Faq() {
  const items = useI18n().t.faqs;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-xl border-2 border-brand-900/10 bg-white">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-ink sm:text-lg"
            >
              {f.q}
              <motion.span
                animate={{ rotate: on ? 45 : 0, backgroundColor: on ? "#0b6138" : "#edf4ef", color: on ? "#fff" : "#0d2018" }}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
              >
                <Plus className="h-5 w-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-6 pb-6 leading-relaxed text-ink-3">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
