"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

const fmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Counts up from 0 to `value` once visible. Renders the final value on the server so it never shows 0 to crawlers. */
export function Counter({ value, prefix = "", suffix = "", duration = 2 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = `${prefix}${fmt.format(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {fmt.format(value)}
      {suffix}
    </span>
  );
}

/** Same idea for calculator outputs: tweens between old and new values as sliders move. */
export function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controls = animate(prev.current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => (el.textContent = format(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, format]);

  return (
    <span ref={ref} className="tabular">
      {format(value)}
    </span>
  );
}
