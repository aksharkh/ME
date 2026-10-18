/**
 * Colour themes for the site. The client can switch between them with the palette button (see ThemePicker);
 * once a favourite is chosen, set DEFAULT_THEME and turn off `site.showThemePicker`.
 *
 * How it works: every section is tagged with a role (`data-sec="hero"`, `"footer"`…) and every component uses
 * role tokens (`text-s-fg`, `bg-s-card`, `text-s-accent`…). A theme maps each role to a *surface* — a set of
 * concrete colours for a light or dark band — and `themeCss()` turns that into CSS custom properties.
 * Rule for every theme: two neighbouring bands never share the same surface.
 */

export interface Illustration {
  body: string;
  roof: string;
  glass: string;
  chimney: string;
  cap: string;
  hopper: string;
  gear1: string;
  gear2: string;
  smoke: string;
  ground: string;
  groundLine: string;
  window: string;
  orb: string;
  orbDetail: string;
  stars: string;
  label: string;
  signBg: string;
  signFg: string;
  belt: string;
  roller: string;
}

export interface Surface {
  bg: string;
  fg: string;
  text: string;
  muted: string;
  line: string;
  card: string;
  cardLine: string;
  soft: string;
  accent: string;
  accent2: string;
  num: string;
  btn: string;
  btnFg: string;
  btnEdge: string;
  strong: string;
  onStrong: string;
  field: string;
  fieldLine: string;
  grid: string;
  logo: string;
  il: Illustration;
}

export const roles = [
  "topbar",
  "header",
  "hero",
  "facts",
  "schemes",
  "process",
  "calcs",
  "industries",
  "why",
  "docs",
  "examples",
  "faq",
  "cta",
  "ctaPage",
  "footer",
  "pagehero",
  "page",
  "pageAlt",
  "paper",
  "panel",
] as const;
export type Role = (typeof roles)[number];

export interface Theme {
  id: string;
  /** Four colours shown in the picker: header · hero · accent · light section */
  swatch: [string, string, string, string];
  radius?: { lg: string; xl: string; xxl: string };
  trim: string;
  /** Accent bars on the scheme cards */
  bars: [string, string, string, string];
  surfaces: Record<string, Surface>;
  roles: Record<Role, string>;
}

const G = {
  950: "#012c18",
  900: "#014425", // the visiting-card green
  800: "#03522d",
  700: "#0b6138",
  600: "#157a46",
  500: "#23955a",
  400: "#4fb37c",
  mint: "#8fd9ae",
  200: "#c2e3cd",
};

const night: Illustration = {
  body: "#0c5a35",
  roof: "#126b41",
  glass: G.mint,
  chimney: "#17774a",
  cap: "#0a4a2b",
  hopper: "#2a8a5a",
  gear1: G.mint,
  gear2: "#cfeedd",
  smoke: "#cfeedd",
  ground: "#013a20",
  groundLine: "#0c5a35",
  window: "#f2c14e",
  orb: "#e3f3e9",
  orbDetail: "#b7dcc6",
  stars: "1",
  label: "rgba(255,255,255,0.65)",
  signBg: "#ffffff",
  signFg: G[900],
  belt: "#0c5a35",
  roller: G.mint,
};

const day: Illustration = {
  body: G[900],
  roof: G[700],
  glass: "#cfebdb",
  chimney: G[600],
  cap: G[950],
  hopper: G[500],
  gear1: G[600],
  gear2: G[400],
  smoke: "#c5d8cc",
  ground: "#d4e9dc",
  groundLine: "#b5d6c2",
  window: "#f2c14e",
  orb: "#f3dc8a",
  orbDetail: "#e9cd6c",
  stars: "0",
  label: "#2f5a45",
  signBg: "#ffffff",
  signFg: G[900],
  belt: G[900],
  roller: G.mint,
};

function dark(bg: string, o: Partial<Surface> = {}): Surface {
  return {
    bg,
    fg: "#ffffff",
    text: "rgba(255,255,255,0.78)",
    muted: "rgba(255,255,255,0.56)",
    line: "rgba(255,255,255,0.13)",
    card: "rgba(255,255,255,0.05)",
    cardLine: "rgba(255,255,255,0.12)",
    soft: "rgba(255,255,255,0.09)",
    accent: G.mint,
    accent2: G[400],
    num: G.mint,
    btn: G.mint,
    btnFg: G[950],
    btnEdge: "#3f9e6a",
    strong: "#ffffff",
    onStrong: G[900],
    field: "rgba(255,255,255,0.08)",
    fieldLine: "rgba(255,255,255,0.22)",
    grid: "rgba(255,255,255,0.045)",
    logo: "#ffffff",
    il: night,
    ...o,
  };
}

function light(bg: string, o: Partial<Surface> = {}): Surface {
  return {
    bg,
    fg: "#14201a",
    text: "#4d5a53",
    muted: "#6a716b",
    line: "#dbe6de",
    card: "#ffffff",
    cardLine: "rgba(1,68,37,0.12)",
    soft: "#edf4ef",
    accent: G[700],
    accent2: G[400],
    num: G[900],
    btn: G[900],
    btnFg: "#ffffff",
    btnEdge: "#001a0c",
    strong: G[900],
    onStrong: "#ffffff",
    field: "#ffffff",
    fieldLine: "#d3e0d7",
    grid: "rgba(1,68,37,0.055)",
    logo: G[900],
    il: day,
    ...o,
  };
}

/* ───────────────────────────── 1. Classic Green — the first, all-green version ───────────────────────────── */
const classic: Theme = {
  id: "classic",
  swatch: [G[900], G[900], G.mint, "#f3f8f4"],
  trim: `repeating-linear-gradient(-45deg, ${G.mint} 0 10px, ${G[700]} 10px 20px)`,
  bars: [G[700], G[400], G[900], "#568e57"],
  surfaces: {
    brand: dark(G[900], { btnEdge: G[500] }),
    deep: dark(G[950], { btnEdge: G[500] }),
    paper: light("#ffffff", { btn: G[700], btnEdge: G[950], accent2: G.mint }),
    tint: light("#f3f8f4", { btn: G[700], btnEdge: G[950], accent2: G.mint }),
  },
  roles: {
    topbar: "deep",
    header: "brand",
    hero: "brand",
    facts: "paper",
    schemes: "tint",
    process: "brand",
    calcs: "paper",
    industries: "tint",
    why: "paper",
    docs: "tint",
    examples: "paper",
    faq: "tint",
    cta: "brand",
    ctaPage: "brand",
    footer: "deep",
    pagehero: "brand",
    page: "paper",
    pageAlt: "tint",
    paper: "paper",
    panel: "brand",
  },
};

/* ───────────────────────────── 2. Brass & Ivory — card green + brass gold + ivory + charcoal ───────────────────────────── */
const brassNight: Illustration = {
  ...night,
  glass: "#f1e9d6",
  gear1: "#f1e9d6",
  gear2: "#ddb150",
  smoke: "#f1e9d6",
  orb: "#f1e9d6",
  orbDetail: "#ddd2b8",
  roller: "#f1e9d6",
};
const brassDark = (bg: string) =>
  dark(bg, {
    fg: "#fcfaf5",
    text: "rgba(255,255,255,0.75)",
    muted: "rgba(255,255,255,0.55)",
    line: "rgba(255,255,255,0.12)",
    card: "rgba(255,255,255,0.04)",
    cardLine: "rgba(255,255,255,0.10)",
    accent: "#ddb150",
    accent2: "#3baa6e",
    num: "#ddb150",
    btn: "#ddb150",
    btnFg: G[950],
    btnEdge: "#a67c22",
    il: brassNight,
  });
const brassLight = (bg: string, soft: string) =>
  light(bg, {
    line: "#e7e0d1",
    cardLine: "rgba(1,68,37,0.10)",
    soft,
    accent: "#84611a",
    accent2: "#c99a34",
    btnEdge: "#0b110e",
    strong: "#121a16",
    onStrong: "#fcfaf5",
    fieldLine: "#e7e0d1",
    grid: "rgba(101,74,21,0.06)",
  });
const brass: Theme = {
  id: "brass",
  swatch: ["#ffffff", G[900], "#ddb150", "#f7f2e7"],
  trim: "linear-gradient(90deg, #a67c22, #e5c67c 50%, #a67c22)",
  bars: [G[700], "#c99a34", "#121a16", "#568e57"],
  surfaces: {
    brand: brassDark(G[900]),
    charcoal: brassDark("#121a16"),
    charcoalDeep: brassDark("#0b110e"),
    paper: brassLight("#ffffff", "#f7f2e7"),
    ivory: brassLight("#f7f2e7", "#efe6d3"),
  },
  roles: {
    topbar: "charcoalDeep",
    header: "paper",
    hero: "brand",
    facts: "paper",
    schemes: "ivory",
    process: "charcoal",
    calcs: "paper",
    industries: "ivory",
    why: "paper",
    docs: "ivory",
    examples: "paper",
    faq: "ivory",
    cta: "brand",
    ctaPage: "brand",
    footer: "charcoalDeep",
    pagehero: "brand",
    page: "paper",
    pageAlt: "ivory",
    paper: "paper",
    panel: "brand",
  },
};

/* ───────────────────────────── 3. Forest & Mint — green navbar, light mint hero, card-green footer ───────────────────────────── */
const forestLight = (bg: string, o: Partial<Surface> = {}) =>
  light(bg, {
    fg: G[950],
    text: "#33503f",
    muted: "#5f7a6b",
    line: "#d2e6d9",
    cardLine: "#d2e6d9",
    soft: "#e3f2e8",
    accent: G[600],
    accent2: G[400],
    fieldLine: "#cfe3d6",
    grid: "rgba(1,68,37,0.07)",
    ...o,
  });
const forest: Theme = {
  id: "forest",
  swatch: [G[900], "#e6f3ea", G[600], "#ffffff"],
  trim: `linear-gradient(90deg, ${G[400]}, ${G.mint} 50%, ${G[400]})`,
  bars: [G[900], G[600], G[400], G.mint],
  surfaces: {
    brand: dark(G[900], { btnEdge: G[400] }),
    deep: dark(G[950], { btnEdge: G[400] }),
    mint: forestLight("#e6f3ea", { soft: "#d3eadb" }),
    paper: forestLight("#ffffff"),
    tint: forestLight("#f4faf6"),
  },
  roles: {
    topbar: "tint",
    header: "brand",
    hero: "mint",
    facts: "paper",
    schemes: "mint",
    process: "deep",
    calcs: "paper",
    industries: "mint",
    why: "paper",
    docs: "mint",
    examples: "paper",
    faq: "mint",
    cta: "paper",
    ctaPage: "mint",
    footer: "brand",
    pagehero: "mint",
    page: "paper",
    pageAlt: "mint",
    paper: "paper",
    panel: "brand",
  },
};

/* ───────────────────────────── 4. Sage & Stone — soft sage from the card's underline, warm stone, rounder corners ───────────────────────────── */
const sageNight: Illustration = {
  body: "#2f5530",
  roof: "#345c35",
  glass: "#e3eddf",
  chimney: "#4a7c4b",
  cap: "#284a29",
  hopper: "#6b9a6c",
  gear1: "#f4f1ea",
  gear2: "#a9c8a6",
  smoke: "#e3eddf",
  ground: "#335a34",
  groundLine: "#4a7c4b",
  window: "#f2d27a",
  orb: "#f4f1ea",
  orbDetail: "#dcd6c8",
  stars: "1",
  label: "rgba(255,255,255,0.72)",
  signBg: "#ffffff",
  signFg: "#3d6a3e",
  belt: "#2f5530",
  roller: "#e3eddf",
};
const sageDay: Illustration = { ...day, body: "#3d6a3e", roof: "#4a7c4b", chimney: "#568e57", cap: "#284a29", hopper: "#6b9a6c", gear1: "#568e57", gear2: "#a9c8a6", ground: "#e7e2d6", groundLine: "#d6cfbf", signFg: "#3d6a3e", belt: "#3d6a3e", roller: "#a9c8a6" };
const sageLight = (bg: string, card: string, soft: string) =>
  light(bg, {
    fg: "#1f3520",
    text: "#4b5a48",
    muted: "#737c6e",
    line: "#e1dccf",
    card,
    cardLine: "#e1dccf",
    soft,
    accent: "#4a7c4b",
    accent2: "#a9c8a6",
    btn: "#3d6a3e",
    btnEdge: "#24412a",
    strong: "#3d6a3e",
    fieldLine: "#dcd6c8",
    grid: "rgba(61,106,62,0.07)",
    il: sageDay,
  });
const sage: Theme = {
  id: "sage",
  swatch: ["#fbfaf6", "#3d6a3e", "#a9c8a6", "#f4f1ea"],
  radius: { lg: "0.75rem", xl: "1.125rem", xxl: "1.5rem" },
  trim: "linear-gradient(90deg, #568e57, #a9c8a6 50%, #568e57)",
  bars: ["#3d6a3e", "#568e57", G[900], "#a9c8a6"],
  surfaces: {
    sageDark: dark("#3d6a3e", {
      text: "rgba(255,255,255,0.84)",
      muted: "rgba(255,255,255,0.64)",
      line: "rgba(255,255,255,0.18)",
      card: "rgba(255,255,255,0.08)",
      cardLine: "rgba(255,255,255,0.18)",
      soft: "rgba(255,255,255,0.12)",
      accent: "#e3eddf",
      accent2: "#a9c8a6",
      num: "#ffffff",
      btn: "#f4f1ea",
      btnFg: "#2b4a2c",
      btnEdge: "#a9c8a6",
      onStrong: "#3d6a3e",
      grid: "rgba(255,255,255,0.06)",
      il: sageNight,
    }),
    brand: dark(G[900], { accent: "#a9c8a6", accent2: "#568e57", num: "#dcebd7", btn: "#dcebd7", btnEdge: "#8fb18b" }),
    stone: sageLight("#f4f1ea", "#fbfaf6", "#ebe6da"),
    paper: sageLight("#fbfaf6", "#ffffff", "#f1eee6"),
  },
  roles: {
    topbar: "brand",
    header: "paper",
    hero: "sageDark",
    facts: "paper",
    schemes: "stone",
    process: "brand",
    calcs: "paper",
    industries: "stone",
    why: "paper",
    docs: "stone",
    examples: "paper",
    faq: "stone",
    cta: "paper",
    ctaPage: "sageDark",
    footer: "brand",
    pagehero: "sageDark",
    page: "paper",
    pageAlt: "stone",
    paper: "paper",
    panel: "sageDark",
  },
};

/* ───────────────────────────── 5. Emerald Light — airy and crisp: mostly white, emerald accents, flat buttons ───────────────────────────── */
const emeraldLight = (bg: string, soft: string) =>
  light(bg, {
    fg: "#0f2a1c",
    text: "#3e5247",
    muted: "#6b7d73",
    line: "#e1eee6",
    cardLine: "#d8e9df",
    soft,
    accent: "#087a44",
    accent2: "#0fa15c",
    btn: "#087a44",
    btnEdge: "transparent",
    fieldLine: "#d5e7dc",
    grid: "rgba(8,122,68,0.06)",
  });
const emerald: Theme = {
  id: "emerald",
  swatch: ["#ffffff", "#eef8f2", "#0fa15c", G[900]],
  radius: { lg: "0.25rem", xl: "0.375rem", xxl: "0.5rem" },
  trim: "#0fa15c",
  bars: ["#087a44", "#0fa15c", G[900], "#5ec48c"],
  surfaces: {
    paper: emeraldLight("#ffffff", "#edf8f2"),
    tint: emeraldLight("#eef8f2", "#dcf1e5"),
    brand: dark(G[900], { accent: "#5ee29a", num: "#5ee29a", btn: "#5ee29a", btnEdge: "transparent", accent2: "#2fbf74" }),
  },
  roles: {
    topbar: "brand",
    header: "paper",
    hero: "tint",
    facts: "brand",
    schemes: "paper",
    process: "tint",
    calcs: "paper",
    industries: "brand",
    why: "paper",
    docs: "tint",
    examples: "paper",
    faq: "tint",
    cta: "paper",
    ctaPage: "tint",
    footer: "brand",
    pagehero: "tint",
    page: "paper",
    pageAlt: "tint",
    paper: "paper",
    panel: "brand",
  },
};

/* ───────────────────────────── 6. Midnight Forest — dark mode, card-green navbar and footer ───────────────────────────── */
const midNight: Illustration = {
  body: "#123a26",
  roof: "#17462e",
  glass: G.mint,
  chimney: "#1b5536",
  cap: "#0c2a1b",
  hopper: "#2a7a50",
  gear1: G.mint,
  gear2: G[200],
  smoke: "#9fbfae",
  ground: "#0a1d13",
  groundLine: "#17462e",
  window: "#f2c14e",
  orb: "#e6f2ea",
  orbDetail: "#b8d3c3",
  stars: "1",
  label: "rgba(241,248,244,0.6)",
  signBg: "#f1f8f4",
  signFg: "#07130d",
  belt: "#123a26",
  roller: G.mint,
};
const midDark = (bg: string, card: string, soft: string, line: string) =>
  dark(bg, {
    fg: "#f1f8f4",
    text: "#c9dccf",
    muted: "#8fa99a",
    line,
    card,
    cardLine: line,
    soft,
    // Active chips, table headers and step badges in green rather than a white flash on the dark page
    strong: G[700],
    onStrong: "#ffffff",
    field: "#0b1b13",
    fieldLine: "#2a4a38",
    grid: "rgba(143,217,174,0.045)",
    il: midNight,
  });
const midnight: Theme = {
  id: "midnight",
  swatch: [G[900], "#0c1d14", G.mint, "#07130d"],
  trim: `linear-gradient(90deg, ${G[900]}, ${G.mint} 50%, ${G[900]})`,
  bars: [G.mint, G[400], G[500], G[200]],
  surfaces: {
    m1: midDark("#07130d", "#0f2219", "#13291d", "#1c3326"),
    m2: midDark("#0c1d14", "#12281c", "#163023", "#203a2b"),
    card: midDark("#102419", "#142c20", "#183326", "#23402f"),
    brand: dark(G[900], { onStrong: G[900] }),
  },
  roles: {
    topbar: "m1",
    header: "brand",
    hero: "m2",
    facts: "brand",
    schemes: "m1",
    process: "m2",
    calcs: "m1",
    industries: "m2",
    why: "m1",
    docs: "m2",
    examples: "m1",
    faq: "m2",
    cta: "m1",
    ctaPage: "m2",
    footer: "brand",
    pagehero: "m2",
    page: "m1",
    pageAlt: "m2",
    paper: "card",
    panel: "brand",
  },
};

export const themes: Theme[] = [brass, classic, forest, sage, emerald, midnight];
export const DEFAULT_THEME = "brass";
export const THEME_KEY = "msme-theme";
export type ThemeId = (typeof themes)[number]["id"];

const surfaceVars = (s: Surface) =>
  [
    ["bg", s.bg],
    ["fg", s.fg],
    ["text", s.text],
    ["muted", s.muted],
    ["line", s.line],
    ["card", s.card],
    ["card-line", s.cardLine],
    ["soft", s.soft],
    ["accent", s.accent],
    ["accent2", s.accent2],
    ["num", s.num],
    ["btn", s.btn],
    ["btn-fg", s.btnFg],
    ["btn-edge", s.btnEdge],
    ["strong", s.strong],
    ["on-strong", s.onStrong],
    ["field", s.field],
    ["field-line", s.fieldLine],
    ["grid", s.grid],
    ["logo", s.logo],
  ]
    .map(([k, v]) => `--sf-${k}:${v};`)
    .join("") +
  Object.entries(s.il)
    .map(([k, v]) => `--il-${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}:${v};`)
    .join("");

const roleSelector = (role: Role) => (role === "paper" ? ".sf-paper" : role === "panel" ? ".sf-panel" : `[data-sec="${role}"]`);

/**
 * CSS for the given themes (all by default): theme-level variables plus one rule per surface listing the roles
 * that use it. Once the picker is off only the default theme is needed.
 */
export function themeCss(only?: readonly string[]) {
  return themes
    .filter((t) => !only || only.includes(t.id))
    .map((t) => {
      const root = `:root[data-theme="${t.id}"]`;
      const page = t.surfaces[t.roles.page];
      const head =
        `${root}{${surfaceVars(page)}--t-trim:${t.trim};` +
        t.bars.map((b, i) => `--t-c${i + 1}:${b};`).join("") +
        (t.radius ? `--radius-lg:${t.radius.lg};--radius-xl:${t.radius.xl};--radius-2xl:${t.radius.xxl};` : "") +
        "}";
      const bySurface = new Map<string, Role[]>();
      for (const role of roles) {
        const key = t.roles[role];
        bySurface.set(key, [...(bySurface.get(key) ?? []), role]);
      }
      const rules = [...bySurface.entries()].map(
        ([key, rs]) => `${rs.map((r) => `${root} ${roleSelector(r)}`).join(",")}{${surfaceVars(t.surfaces[key])}}`,
      );
      return [head, ...rules].join("\n");
    })
    .join("\n");
}

/** Inline script that applies the saved (or ?theme=) choice before the page paints. */
export function themeBootScript() {
  const ids = JSON.stringify(themes.map((t) => t.id));
  return `(function(){try{var ids=${ids},k="${THEME_KEY}",q=new URLSearchParams(location.search).get("theme");if(q&&ids.indexOf(q)>-1){localStorage.setItem(k,q)}var t=localStorage.getItem(k);if(t&&ids.indexOf(t)>-1){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;
}
