"use client";

import { motion } from "motion/react";
import { IndianRupee } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { gearPath } from "./gear";

const BIG_GEAR = gearPath(0, 0, 50, 41, 12);
const SMALL_GEAR = gearPath(0, 0, 29, 22, 8);
const ROLLER = gearPath(0, 0, 7, 5, 6);

// Night-shift palette, tuned to sit on the brand green (#014425)
const C = {
  building: "#0c5a35",
  roof: "#126b41",
  roofGlass: "#8fd9ae",
  chimney: "#17774a",
  chimneyCap: "#0a4a2b",
  hopper: "#2a8a5a",
  shutter: "#17774a",
  window: "#f2c14e",
  mint: "#8fd9ae",
  pale: "#cfeedd",
  ground: "#013a20",
  groundLine: "#0c5a35",
  coin: "#e2b33c",
  coinEdge: "#b98a1e",
  coinText: "#5b4200",
  box: "#d9a066",
  boxTape: "#b07a42",
};

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
        {/* moon + a few stars */}
        <circle cx="478" cy="70" r="44" fill="#ffffff" opacity="0.05" />
        <circle cx="478" cy="70" r="26" fill={C.pale} />
        <circle cx="468" cy="64" r="5" fill="#b7dcc6" />
        <circle cx="486" cy="80" r="3.5" fill="#b7dcc6" />
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

        {/* coins dropping into the hopper */}
        <g transform="translate(205 30)">
          {[0, 0.8, 1.6].map((d, i) => (
            <g key={i} className="coin-drop" style={{ animationDelay: `${d}s` }}>
              <circle cx={i === 1 ? -6 : i === 2 ? 6 : 0} cy="20" r="11" fill={C.coin} stroke={C.coinEdge} strokeWidth="2" />
              <text x={i === 1 ? -6 : i === 2 ? 6 : 0} y="25" textAnchor="middle" fontSize="13" fontWeight="800" fill={C.coinText}>
                ₹
              </text>
            </g>
          ))}
        </g>
        <text x="244" y="62" fontSize="12" fontWeight="700" fill="#ffffff" opacity="0.65">
          {f.input}
        </text>

        {/* chimney + smoke */}
        <rect x="356" y="78" width="30" height="100" fill={C.chimney} />
        <rect x="356" y="92" width="30" height="8" fill={C.mint} />
        <rect x="352" y="72" width="38" height="10" rx="2" fill={C.chimneyCap} />
        {[0, 1.5, 3].map((d) => (
          <circle key={d} className="smoke" style={{ animationDelay: `${d}s` }} cx="371" cy="62" r="12" fill={C.pale} />
        ))}

        {/* factory body + sawtooth roof */}
        <path d="M140 205 V150 L235 205 V150 L330 205 V150 L425 205 Z" fill={C.roof} />
        <path
          d="M140 150 L140 205 L148 205 L148 156 Z M235 150 L235 205 L243 205 L243 156 Z M330 150 L330 205 L338 205 L338 156 Z"
          fill={C.roofGlass}
          opacity="0.45"
        />
        <rect x="140" y="205" width="285" height="175" fill={C.building} />

        {/* hopper on roof */}
        <path d="M180 108 H230 L214 138 H196 Z" fill={C.hopper} />
        <rect x="198" y="138" width="14" height="40" fill={C.chimney} />

        {/* sign */}
        <rect x="178" y="220" width="210" height="34" rx="6" fill="#ffffff" />
        <text x="283" y="243" textAnchor="middle" fontSize="15" fontWeight="800" fill="#014425" letterSpacing="1">
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
              fill={C.window}
              className="animate-blink"
              style={{ animationDelay: `${(c * 0.37 + r * 0.6) % 1.6}s` }}
            />
          )),
        )}

        {/* roller shutter */}
        <rect x="260" y="338" width="48" height="42" fill={C.shutter} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1="260" x2="308" y1={344 + i * 6} y2={344 + i * 6} stroke={C.building} strokeWidth="2" />
        ))}

        {/* gears */}
        <g transform="translate(92 300)">
          <g className="gear animate-spin-slow">
            <path d={BIG_GEAR} fill={C.mint} />
            <circle r="16" fill="#014425" />
            <circle r="7" fill={C.mint} />
          </g>
        </g>
        <g transform="translate(150 232)">
          <g className="gear animate-spin-rev">
            <path d={SMALL_GEAR} fill={C.pale} />
            <circle r="9" fill="#014425" />
          </g>
        </g>

        {/* conveyor out of the factory */}
        <rect x="425" y="352" width="125" height="10" rx="5" fill={C.building} />
        {[438, 470, 502, 534].map((x) => (
          <g key={x} transform={`translate(${x} 357)`}>
            <g className="gear animate-spin-slow" style={{ animationDuration: "1.2s" }}>
              <path d={ROLLER} fill={C.mint} />
            </g>
          </g>
        ))}
        <rect x="440" y="362" width="5" height="18" fill={C.chimney} />
        <rect x="530" y="362" width="5" height="18" fill={C.chimney} />
        <g clipPath="url(#belt-clip)">
          {[0, 1.6, 3.2].map((d) => (
            <g key={d} className="box-travel" style={{ animationDelay: `${d}s` }}>
              <rect x="400" y="326" width="30" height="26" rx="3" fill={C.box} />
              <rect x="400" y="335" width="30" height="5" fill={C.boxTape} />
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
        <rect x="0" y="380" width="560" height="60" fill={C.ground} />
        <rect x="0" y="380" width="560" height="3" fill={C.groundLine} />
        {[30, 120, 210, 300, 390, 480].map((x) => (
          <rect key={x} x={x} y="408" width="46" height="5" rx="2.5" fill={C.groundLine} />
        ))}
      </svg>

      {/* Sanction stamp */}
      <motion.div
        initial={{ scale: 2.4, opacity: 0, rotate: -24 }}
        animate={{ scale: 1, opacity: 1, rotate: -10 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 14 }}
        className="absolute -right-1 top-4 rounded-xl border-[3px] border-brand-300 bg-brand-950/80 px-4 py-2 text-center font-display text-brand-300 backdrop-blur sm:-right-4"
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
        <div className="animate-float flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ink shadow-[0_20px_40px_-16px_rgba(0,0,0,0.55)]">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-brand-700">
            <IndianRupee className="h-5 w-5" />
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-steel">{f.credited}</div>
            <div className="font-display tabular text-xl font-bold text-brand-900">+ ₹8,75,000</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
