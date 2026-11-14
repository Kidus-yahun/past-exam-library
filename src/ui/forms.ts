import { css } from "styled-system/css";

export const field = css({ display: "flex", flexDirection: "column", gap: "6px" });

export const label = css({ fontSize: "13.5px", fontWeight: "600", color: "ink.muted" });

export const input = css({
  minH: "48px",
  px: "14px",
  rounded: "md",
  bg: "surface",
  color: "ink",
  fontSize: "16px", // 16px stops iOS from zooming into the field
  boxShadow: "inset 0 0 0 1px {colors.line}",
  transition: "box-shadow 120ms ease-out",
  _placeholder: { color: "ink.subtle" },
  _focusVisible: { outline: "none", boxShadow: "inset 0 0 0 2px {colors.focus}" },
  "&[aria-invalid=true]": { boxShadow: "inset 0 0 0 2px {colors.wrong}" },
});

export const errorText = css({ fontSize: "13.5px", color: "wrong", fontWeight: "500" });

/** Big tappable choice (onboarding grade, goal, etc.); pair with Ark RadioGroup items. */
export const choice = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  minH: "56px",
  px: "16px",
  rounded: "md",
  bg: "surface",
  boxShadow: "inset 0 0 0 1px {colors.line}",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "600",
  transition: "box-shadow 120ms ease-out, background-color 120ms ease-out",
  _hover: { bg: "hover" },
  "&[data-state=checked]": {
    bg: "brand.soft",
    color: "brand.strong",
    boxShadow: "inset 0 0 0 2px {colors.brand}",
  },
  "&[data-focus-visible]": { outline: "2px solid {colors.focus}", outlineOffset: "2px" },
});
