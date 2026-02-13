const STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

export function getStoredTheme(): Theme | null {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" ? v : null;
}

export function setStoredTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme);
}

const THEME_CHANGE_EVENT = "themechange";

export function applyTheme(theme: Theme): void {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
}

export function onThemeChange(cb: (theme: Theme) => void): () => void {
  const handler = (e: CustomEvent<Theme>) => cb(e.detail);
  window.addEventListener(THEME_CHANGE_EVENT, handler as EventListener);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, handler as EventListener);
}

export function initTheme(): Theme {
  const stored = getStoredTheme();
  const theme: Theme = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(theme);
  return theme;
}
