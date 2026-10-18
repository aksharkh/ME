const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹12,34,567 */
export function formatINR(n: number) {
  return `₹${inr.format(Math.round(n))}`;
}

/** ₹8.75 lakh · ₹1.2 crore · ₹45,000 — how Indian business owners talk about money */
export function formatShort(n: number, units: { lakh: string; crore: string } = { lakh: "lakh", crore: "crore" }) {
  const abs = Math.abs(n);
  if (abs >= 1e7) return `₹${trim(n / 1e7)} ${units.crore}`;
  if (abs >= 1e5) return `₹${trim(n / 1e5)} ${units.lakh}`;
  return formatINR(n);
}

function trim(n: number) {
  return n.toFixed(2).replace(/\.?0+$/, "");
}
