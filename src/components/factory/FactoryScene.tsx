"use client";

import { motion } from "motion/react";
import { IndianRupee } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { gearPath } from "./gear";

const BIG_GEAR = gearPath(0, 0, 50, 41, 12);
const SMALL_GEAR = gearPath(0, 0, 29, 22, 8);
const ROLLER = gearPath(0, 0, 7, 5, 6);

/** Fill from the theme's illustration palette (--il-*): a night scene on dark bands, a day scene on light ones. */
const il = (k: string) => ({ fill: `var(--il-${k})` });
const hub = { fill: "var(--sf-bg)" };

// Money and cardboard keep their natural colours in every theme
const COIN = { fill: "#e2b33c", stroke: "#b98a1e" };
const BOX = "#d9a066";
const TAPE = "#b07a42";

/**
 * The hero illustration: loan money drops into the hopper, gears turn, windows glow,
 * finished boxes roll out on the conveyor. All loops are CSS so they stay smooth on cheap phones.
 */
export function FactoryScene() {
  const { t } = useI18n();
  const f = t.factory;
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <svg viewBox="0 0 560 440" className="block w-full" role="img" aria-label={f.aria}>
        {/* moon by night, sun by day */}
        <circle cx="478" cy="70" r="44" style={il("orb")} opacity="0.14" />
        <circle cx="478" cy="70" r="26" style={il("orb")} />
        <g style={{ opacity: "var(--il-stars)" }}>
          <circle cx="468" cy="64" r="5" style={il("orb-detail")} />
          <circle cx="486" cy="80" r="3.5" style={il("orb-detail")} />
          {[
            [70, 60],
            [120, 30],
            [300, 26],
            [420, 130],
            [530, 150],
            [40, 150],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.8" fill="#ffffff" className="animate-blink" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </g>

        {/* coins dropping into the hopper */}
        <g transform="translate(205 30)">
          {[0, 0.8, 1.6].map((d, i) => (
            <g key={i} className="coin-drop" style={{ animationDelay: `${d}s` }}>
              <circle cx={i === 1 ? -6 : i === 2 ? 6 : 0} cy="20" r="11" style={COIN} strokeWidth="2" />
              <text x={i === 1 ? -6 : i === 2 ? 6 : 0} y="25" textAnchor="middle" fontSize="13" fontWeight="800" fill="#5b4200">
                ₹
              </text>
            </g>
          ))}
        </g>
        <text x="244" y="62" fontSize="12" fontWeight="700" style={il("label")}>
          {f.input}
        </text>

        {/* chimney + smoke */}
        <rect x="356" y="78" width="30" height="100" style={il("chimney")} />
        <rect x="356" y="92" width="30" height="8" style={il("gear2")} />
        <rect x="352" y="72" width="38" height="10" rx="2" style={il("cap")} />
        {[0, 1.5, 3].map((d) => (
          <circle key={d} className="smoke" style={{ animationDelay: `${d}s`, ...il("smoke") }} cx="371" cy="62" r="12" />
        ))}

        {/* factory body + sawtooth roof */}
        <path d="M140 205 V150 L235 205 V150 L330 205 V150 L425 205 Z" style={il("roof")} />
        <path
          d="M140 150 L140 205 L148 205 L148 156 Z M235 150 L235 205 L243 205 L243 156 Z M330 150 L330 205 L338 205 L338 156 Z"
          style={il("glass")}
          opacity="0.5"
        />
        <rect x="140" y="205" width="285" height="175" style={il("body")} />

        {/* hopper on roof */}
        <path d="M180 108 H230 L214 138 H196 Z" style={il("hopper")} />
        <rect x="198" y="138" width="14" height="40" style={il("chimney")} />

        {/* sign */}
        <rect x="178" y="220" width="210" height="34" rx="6" style={il("sign-bg")} />
        <text x="283" y="243" textAnchor="middle" fontSize="15" fontWeight="800" letterSpacing="1" style={il("sign-fg")}>
          {f.sign}
        </text>

        {/* glowing windows */}
        {[0, 1, 2, 3, 4].map((c) =>
          [0, 1].map((r) => (
            <rect
              key={`${c}-${r}`}
              x={160 + c * 50}
              y={270 + r * 36}
              width="32"
              height="22"
              rx="3"
              className="animate-blink"
              style={{ animationDelay: `${(c * 0.37 + r * 0.6) % 1.6}s`, ...il("window") }}
            />
          )),
        )}

        {/* roller shutter */}
        <rect x="260" y="338" width="48" height="42" style={il("chimney")} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1="260" x2="308" y1={344 + i * 6} y2={344 + i * 6} style={{ stroke: "var(--il-body)" }} strokeWidth="2" />
        ))}

        {/* gears */}
        <g transform="translate(92 300)">
          <g className="gear animate-spin-slow">
            <path d={BIG_GEAR} style={il("gear1")} />
            <circle r="16" style={hub} />
            <circle r="7" style={il("gear2")} />
          </g>
        </g>
        <g transform="translate(150 232)">
          <g className="gear animate-spin-rev">
            <path d={SMALL_GEAR} style={il("gear2")} />
            <circle r="9" style={hub} />
          </g>
        </g>

        {/* conveyor out of the factory */}
        <rect x="425" y="352" width="125" height="10" rx="5" style={il("belt")} />
        {[438, 470, 502, 534].map((x) => (
          <g key={x} transform={`translate(${x} 357)`}>
            <g className="gear animate-spin-slow" style={{ animationDuration: "1.2s" }}>
              <path d={ROLLER} style={il("roller")} />
            </g>
          </g>
        ))}
        <rect x="440" y="362" width="5" height="18" style={il("chimney")} />
        <rect x="530" y="362" width="5" height="18" style={il("chimney")} />
        <g clipPath="url(#belt-clip)">
          {[0, 1.6, 3.2].map((d) => (
            <g key={d} className="box-travel" style={{ animationDelay: `${d}s` }}>
              <rect x="400" y="326" width="30" height="26" rx="3" fill={BOX} />
              <rect x="400" y="335" width="30" height="5" fill={TAPE} />
              <rect x="405" y="328" width="12" height="5" rx="1" fill="#ffffff" opacity="0.85" />
            </g>
          ))}
        </g>
        <defs>
          <clipPath id="belt-clip">
            <rect x="425" y="300" width="135" height="60" />
          </clipPath>
        </defs>

        {/* ground */}
        <rect x="0" y="380" width="560" height="60" style={il("ground")} />
        <rect x="0" y="380" width="560" height="3" style={il("ground-line")} />
        {[30, 120, 210, 300, 390, 480].map((x) => (
          <rect key={x} x={x} y="408" width="46" height="5" rx="2.5" style={il("ground-line")} />
        ))}
      </svg>

      {/* Sanction stamp */}
      <motion.div
        initial={{ scale: 2.4, opacity: 0, rotate: -24 }}
        animate={{ scale: 1, opacity: 1, rotate: -10 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 14 }}
        className="absolute -right-1 top-4 rounded-xl border-[3px] border-s-accent bg-s-bg/80 px-4 py-2 text-center font-display text-s-accent backdrop-blur sm:-right-4"
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.2em]">{f.stampTop}</div>
        <div className="text-xl font-bold leading-tight">{f.stampMain}</div>
      </motion.div>

      {/* Subsidy card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute -bottom-5 left-2 sm:-left-6"
      >
        <div className="sf-paper animate-float flex items-center gap-3 rounded-xl border border-s-card-line bg-s-bg px-4 py-3 text-s-fg shadow-[0_20px_40px_-16px_rgba(0,0,0,0.55)]">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-s-soft text-s-accent">
            <IndianRupee className="h-5 w-5" />
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-s-muted">{f.credited}</div>
            <div className="font-display tabular text-xl font-bold text-s-num">+ ₹8,75,000</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
