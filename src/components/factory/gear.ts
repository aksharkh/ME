/** SVG path for a gear with square-ish teeth, centred on (cx, cy). */
export function gearPath(cx: number, cy: number, outer: number, inner: number, teeth: number) {
  const step = (Math.PI * 2) / teeth;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const corners = [
      [inner, a],
      [outer, a + step * 0.12],
      [outer, a + step * 0.48],
      [inner, a + step * 0.6],
    ] as const;
    for (const [r, ang] of corners) {
      pts.push(`${(cx + r * Math.cos(ang)).toFixed(2)},${(cy + r * Math.sin(ang)).toFixed(2)}`);
    }
  }
  return `M${pts.join("L")}Z`;
}
