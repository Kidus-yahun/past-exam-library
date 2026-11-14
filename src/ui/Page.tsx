import type { JSX, ParentProps } from "solid-js";
import { Show } from "solid-js";
import { css } from "styled-system/css";

const container = css({
  maxW: "1120px",
  mx: "auto",
  px: { base: "20px", lg: "40px" },
  pt: { base: "28px", lg: "32px" },
  pb: "48px",
  display: "flex",
  flexDirection: "column",
  gap: { base: "20px", lg: "24px" },
});
const header = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  flexWrap: "wrap",
});
const title = css({
  fontSize: { base: "26px", lg: "30px" },
  fontWeight: "650",
  letterSpacing: "-0.02em",
});
const lede = css({ mt: "4px", fontSize: "14.5px", color: "ink.muted" });

type PageProps = ParentProps<{ title: string; lede?: string; actions?: JSX.Element }>;

export function Page(props: PageProps) {
  return (
    <div class={container}>
      <header class={header}>
        <div>
          <h1 class={title}>{props.title}</h1>
          <Show when={props.lede}>
            <p class={lede}>{props.lede}</p>
          </Show>
        </div>
        {props.actions}
      </header>
      {props.children}
    </div>
  );
}

export const panel = css({
  bg: "surface",
  border: "1px solid {colors.line}",
  rounded: "lg",
});

export const button = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minH: "44px",
  px: "16px",
  rounded: "md",
  fontSize: "14.5px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  cursor: "pointer",
  bg: "brand",
  color: "brand.fg",
  transition: "opacity 120ms ease-out",
  _hover: { opacity: 0.92 },
  _disabled: { opacity: 0.5, cursor: "default", _hover: { opacity: 0.5 } },
});

export const quietButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minH: "44px",
  px: "14px",
  rounded: "md",
  fontSize: "14px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  cursor: "pointer",
  bg: "transparent",
  color: "ink",
  boxShadow: "inset 0 0 0 1px {colors.line}",
  transition: "background-color 120ms ease-out",
  _hover: { bg: "hover" },
  _disabled: { opacity: 0.5, cursor: "default" },
});
