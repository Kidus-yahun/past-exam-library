import { defineConfig } from "@pandacss/dev";

/**
 * Design tokens from the approved mockups, with a dark theme built in.
 *
 * Every color the app uses is a semantic token with a light (`base`) and a
 * dark (`_dark`) value, so components never reference raw hex values.
 * The active theme comes from `data-theme` on <html>, set before first paint
 * by the inline script in index.html (system preference unless the student
 * picked one).
 */
export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  jsxFramework: "solid",
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  conditions: {
    extend: {
      dark: "[data-theme=dark] &",
      light: "[data-theme=light] &",
    },
  },
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: { value: "'Geist Variable', 'Noto Sans Ethiopic', system-ui, sans-serif" },
          mono: { value: "'Geist Mono Variable', ui-monospace, monospace" },
          ethiopic: { value: "'Noto Sans Ethiopic', 'Geist Variable', sans-serif" },
        },
        radii: {
          sm: { value: "8px" },
          md: { value: "12px" },
          lg: { value: "16px" },
          sheet: { value: "22px" },
        },
        zIndex: {
          sticky: { value: 10 },
          nav: { value: 20 },
          overlay: { value: 40 },
          sheet: { value: 50 },
          toast: { value: 60 },
        },
      },
      semanticTokens: {
        colors: {
          bg: { value: { base: "#F6F8F7", _dark: "#0D1311" } },
          surface: { value: { base: "#FFFFFF", _dark: "#151D19" } },
          sunk: { value: { base: "#EDF2EF", _dark: "#1C2621" } },
          line: { value: { base: "#DDE5E0", _dark: "#2A3631" } },
          ink: {
            DEFAULT: { value: { base: "#101914", _dark: "#E7EEEA" } },
            muted: { value: { base: "#3F4B45", _dark: "#B6C3BC" } },
            subtle: { value: { base: "#5E6B64", _dark: "#8F9D96" } },
          },
          brand: {
            DEFAULT: { value: { base: "#0B6B4D", _dark: "#3CC08F" } },
            /** Text and icons placed on a `brand` fill. */
            fg: { value: { base: "#FFFFFF", _dark: "#03150E" } },
            soft: { value: { base: "#DCEFE6", _dark: "#123628" } },
            strong: { value: { base: "#084E38", _dark: "#86E3BE" } },
          },
          streak: {
            DEFAULT: { value: { base: "#F4B400", _dark: "#F4B400" } },
            soft: { value: { base: "#FFF1C7", _dark: "#352A0A" } },
            ink: { value: { base: "#7A5200", _dark: "#FFD466" } },
          },
          wrong: {
            DEFAULT: { value: { base: "#B93C0B", _dark: "#FF8C5E" } },
            soft: { value: { base: "#FCE6DB", _dark: "#3B1C10" } },
          },
          focus: { value: { base: "#0B6B4D", _dark: "#86E3BE" } },
        },
        shadows: {
          raised: {
            value: {
              base: "0 1px 2px rgba(16,25,20,.08), 0 0 0 1px {colors.line}",
              _dark: "0 1px 2px rgba(0,0,0,.4), 0 0 0 1px {colors.line}",
            },
          },
          sheet: {
            value: {
              base: "0 -8px 24px rgba(16,25,20,.06)",
              _dark: "0 -8px 24px rgba(0,0,0,.45)",
            },
          },
        },
      },
      textStyles: {
        eyebrow: {
          value: {
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          },
        },
      },
    },
  },
  globalCss: {
    html: { colorScheme: "light", _dark: { colorScheme: "dark" } },
    "html, body": {
      bg: "bg",
      color: "ink",
      fontFamily: "sans",
      WebkitFontSmoothing: "antialiased",
    },
    a: { color: "inherit", textDecoration: "none" },
    ":focus-visible": { outline: "2px solid {colors.focus}", outlineOffset: "2px" },
    ".mono": { fontFamily: "mono", fontVariantNumeric: "tabular-nums" },
    "@media (prefers-reduced-motion: reduce)": {
      "*, *::before, *::after": {
        transitionDuration: "0.01ms !important",
        animationDuration: "0.01ms !important",
      },
    },
  },
});
