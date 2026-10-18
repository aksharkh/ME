// MSME Marg logo, redrawn as vectors from the founder's visiting card:
// three rising bars (S-curved tops, rounded bottom-right corners) beside the "MSME / Marg" wordmark.
// Coordinates are in card units: bar width 15.2, gap 3.6, tallest bar = cap height of "MSME", base = baseline of "Marg".

const BASE = 75.8;
const W = 15.2;
const STEP = 18.8;

function barPath(i: number) {
  const x = i * STEP;
  const yR = 40.4 - 19.8 * i; // top-right
  const yL = yR + 10.6; // top-left sits lower: the top edge rises to the right
  return `M${x} ${BASE}V${yL}C${x + 7} ${yL} ${x + 8.2} ${yR} ${x + 14} ${yR}H${x + W}V${BASE - 9.6}A11.2 9.6 0 0 1 ${x + 4} ${BASE}Z`;
}

export const BAR_PATHS = [0, 1, 2].map(barPath);

/** Just the three bars — used for the favicon, watermarks and small marks. viewBox 0 0 53 76 */
export function BarsMark({ className = "h-8 w-auto", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 53 76" className={className} fill="currentColor" aria-hidden>
      {BAR_PATHS.map((d, i) => (
        <path key={i} d={d} className={animated ? "bar-grow" : undefined} style={animated ? { animationDelay: `${0.15 + i * 0.14}s` } : undefined} />
      ))}
    </svg>
  );
}

/**
 * Full lockup. Its colour follows the section it sits on: white on green / dark bands (like the front of the card),
 * card green #014425 on light bands (like the back of the card) — set per theme as --sf-logo.
 * The wordmark uses Arimo Bold (Arial metrics); textLength pins each line to the card's exact width.
 */
export function Logo({ className = "h-10 w-auto", animated = false }: { tone?: "light" | "dark"; className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 197 84" className={className} role="img" aria-label="MSME Marg">
      <g style={{ fill: "var(--sf-logo)" }}>
        {BAR_PATHS.map((d, i) => (
          <path key={i} d={d} className={animated ? "bar-grow" : undefined} style={animated ? { animationDelay: `${0.15 + i * 0.14}s` } : undefined} />
        ))}
        <text
          x="58.8"
          y="36.4"
          fontSize="50.5"
          fontWeight="700"
          textLength="139.6"
          lengthAdjust="spacing"
          style={{ fontFamily: "var(--font-logo)" }}
        >
          MSME
        </text>
        <text
          x="58.8"
          y="75.6"
          fontSize="50.5"
          fontWeight="700"
          textLength="105"
          lengthAdjust="spacing"
          style={{ fontFamily: "var(--font-logo)" }}
        >
          Marg
        </text>
      </g>
    </svg>
  );
}
