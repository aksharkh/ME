"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { BadgeIndianRupee, Send, FileText, Fingerprint, Handshake, PhoneCall } from "lucide-react";
import { SectionHeading } from "../ui/Section";
import { useI18n } from "@/i18n/client";

const icons = [PhoneCall, Fingerprint, FileText, Send, Handshake, BadgeIndianRupee];

/** Assembly line: a file travels from station to station as you scroll. */
export function JourneyLine() {
  const { t } = useI18n();
  const sec = t.sections.process;
  const steps = t.process.map((p, i) => ({ ...p, icon: icons[i] }));
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.45"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const clamp = (p: number) => Math.min(1, Math.max(0, p));
  // Stations sit at the centre of each of the 6 grid columns: 1/12, 3/12 … 11/12
  const left = useTransform(progress, (p) => `${(1 / 12 + (clamp(p) * 10) / 12) * 100}%`);
  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, "change", (p) => setActive(Math.round(clamp(p) * (steps.length - 1))));

  return (
    <section id="process" data-sec="process" className="blueprint relative overflow-hidden bg-s-bg py-20 text-s-text">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label={sec.label} title={sec.title} alt={sec.alt} sub={sec.sub} />

        <div ref={ref} className="relative mt-16">
          {/* Desktop conveyor */}
          <div className="relative hidden lg:block">
            <div className="belt animate-belt h-4 rounded-full" />
            <div className="absolute inset-x-0 top-4 flex justify-between px-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="h-3 w-3 rounded-full border-2 border-s-line bg-s-soft" />
              ))}
            </div>
            <motion.div style={{ left }} className="absolute -top-12 -translate-x-1/2">
              <div className="relative rounded-lg bg-[#d9a066] px-3 py-2 text-xs font-extrabold text-[#3b2a12] shadow-xl">
                <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[#b07a42]" />
                <span className="relative whitespace-nowrap">{sec.file}</span>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-5 lg:mt-10 lg:grid-cols-6 lg:gap-4">
            {steps.map((s, i) => {
              const done = i <= active;
              const Icon = s.icon;
              return (
                <div key={s.title} className="relative flex gap-4 lg:block">
                  <div className="hidden lg:absolute lg:-top-10 lg:left-1/2 lg:block lg:h-10 lg:w-1 lg:-translate-x-1/2 lg:bg-s-line" />
                  <motion.div
                    animate={{ scale: i === active ? 1.08 : 1 }}
                    className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-xl border-2 transition-colors duration-300 lg:mx-auto ${
                      done ? "border-s-btn bg-s-btn text-s-btn-fg" : "border-s-line bg-s-card text-s-fg"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-s-strong text-xs font-extrabold text-s-on-strong">{i + 1}</span>
                  </motion.div>
                  <motion.div animate={{ opacity: done ? 1 : 0.55 }} className="lg:mt-5 lg:text-center">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-s-accent">{s.time}</div>
                    <h3 className="font-display mt-1 text-xl font-bold leading-snug text-s-fg">{s.title}</h3>
                    {s.alt && (
                      <div lang="kn" className="text-sm font-medium text-s-muted">
                        {s.alt}
                      </div>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-s-text">{s.desc}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
