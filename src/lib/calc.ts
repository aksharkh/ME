// Pure calculation helpers shared by every calculator on the site.
// Figures follow published scheme guidelines; they are estimates, final amounts are decided by the bank / nodal agency.

export const LAKH = 1e5;
export const CRORE = 1e7;

export type Sector = "manufacturing" | "service";
export type Category = "general" | "special";
export type Area = "urban" | "rural";

export const PMEGP_CEILING: Record<Sector, number> = {
  manufacturing: 50 * LAKH,
  service: 20 * LAKH,
};

const PMEGP_RATE: Record<Category, Record<Area, number>> = {
  general: { urban: 0.15, rural: 0.25 },
  special: { urban: 0.25, rural: 0.35 },
};

export function pmegp(input: { sector: Sector; cost: number; category: Category; area: Area }) {
  const ceiling = PMEGP_CEILING[input.sector];
  const cost = Math.min(input.cost, ceiling);
  const ownPct = input.category === "special" ? 0.05 : 0.1;
  const subsidyPct = PMEGP_RATE[input.category][input.area];
  const own = cost * ownPct;
  const bankLoan = cost - own;
  const subsidy = cost * subsidyPct;
  return {
    cost,
    ceiling,
    ownPct,
    own,
    subsidyPct,
    subsidy,
    bankLoan,
    // Margin money is kept as a 3-year deposit and adjusted against the loan, so this is what you effectively repay.
    effectiveLoan: bankLoan - subsidy,
  };
}

export const PMFME_CAP = 10 * LAKH;

export function pmfme(cost: number) {
  const subsidy = Math.min(cost * 0.35, PMFME_CAP);
  const own = cost * 0.1;
  const bankLoan = cost - own;
  return { cost, subsidy, own, bankLoan, effectiveLoan: bankLoan - subsidy, capped: cost * 0.35 > PMFME_CAP };
}

export function emi(principal: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 12 / 100;
  const monthly = r === 0 ? principal / months : (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1);
  const total = monthly * months;

  // Yearly principal / interest split for the bar chart
  const years: { year: number; principal: number; interest: number; balance: number }[] = [];
  let balance = principal;
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const princ = monthly - interest;
    balance = Math.max(0, balance - princ);
    const y = Math.ceil(m / 12);
    if (!years[y - 1]) years[y - 1] = { year: y, principal: 0, interest: 0, balance: 0 };
    years[y - 1].principal += princ;
    years[y - 1].interest += interest;
    years[y - 1].balance = balance;
  }
  return { monthly, total, interest: total - principal, years };
}

export type MsmeClass = "Micro" | "Small" | "Medium" | "Large";

// Revised limits effective 1 April 2025 (investment in plant & machinery / equipment, and turnover)
export const MSME_LIMITS: { cls: Exclude<MsmeClass, "Large">; investment: number; turnover: number }[] = [
  { cls: "Micro", investment: 2.5 * CRORE, turnover: 10 * CRORE },
  { cls: "Small", investment: 25 * CRORE, turnover: 100 * CRORE },
  { cls: "Medium", investment: 125 * CRORE, turnover: 500 * CRORE },
];

/** An enterprise moves to the higher class if it crosses either limit. */
export function classify(investment: number, turnover: number): MsmeClass {
  for (const l of MSME_LIMITS) {
    if (investment <= l.investment && turnover <= l.turnover) return l.cls;
  }
  return "Large";
}

export const MUDRA_TIERS = [
  { name: "Shishu", max: 50_000, note: "Starting a small business — cart, tiffin service, tailoring unit" },
  { name: "Kishore", max: 5 * LAKH, note: "Growing an existing shop or small unit" },
  { name: "Tarun", max: 10 * LAKH, note: "Machinery, expansion, a bigger setup" },
  { name: "Tarun Plus", max: 20 * LAKH, note: "Only for borrowers who fully repaid an earlier Tarun loan" },
] as const;

export function mudraTier(amount: number) {
  return MUDRA_TIERS.find((t) => amount <= t.max) ?? null;
}
