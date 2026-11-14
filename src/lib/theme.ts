import { createSignal } from "solid-js";

/**
 * Light/dark theme. "system" follows the device setting and keeps following it
 * when it changes. The inline script in index.html applies the same rules
 * before first paint; keep STORAGE_KEY in sync with it.
 */
export type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "pel-theme";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Storage can be unavailable (private mode); fall back to the system theme.
  }
  return "system";
}

function applyTheme(preference: ThemePreference) {
  const dark = preference === "dark" || (preference === "system" && darkQuery.matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

const [themePreference, setPreference] = createSignal<ThemePreference>(readStoredPreference());

darkQuery.addEventListener("change", () => {
  if (themePreference() === "system") applyTheme("system");
});

export { themePreference };

export function setThemePreference(preference: ThemePreference) {
  setPreference(preference);
  try {
    if (preference === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // Not persisted; the choice still applies for this visit.
  }
  applyTheme(preference);
}
