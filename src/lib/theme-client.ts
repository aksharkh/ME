// Browser-only helpers for the colour theme (kept outside components so effects stay pure).
import { DEFAULT_THEME, THEME_KEY, themes } from "./themes";

export function currentTheme() {
  return document.documentElement.dataset.theme ?? DEFAULT_THEME;
}

export function applyTheme(id: string) {
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem(THEME_KEY, id);
  } catch {
    // private mode / storage blocked — the theme still applies for this visit
  }
}

/**
 * Same as the inline boot script (?theme= link first, then the saved choice), for pages React rendered in the
 * browser — the boot script only runs on server HTML.
 */
export function restoreTheme() {
  const known = (id: string | null): id is string => !!id && themes.some((t) => t.id === id);
  const linked = new URLSearchParams(location.search).get("theme");
  if (known(linked)) return applyTheme(linked);
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (known(saved) && saved !== currentTheme()) document.documentElement.dataset.theme = saved;
  } catch {
    // storage blocked — keep the default
  }
}
