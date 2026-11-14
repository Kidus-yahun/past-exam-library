import { Show } from "solid-js";
import { css } from "styled-system/css";
import { online } from "~/lib/offline";

const banner = css({
  position: "fixed",
  top: 0,
  insetX: 0,
  zIndex: "toast",
  display: "flex",
  justifyContent: "center",
  px: "16px",
  py: "6px",
  bg: "streak.soft",
  color: "streak.ink",
  fontSize: "13px",
  fontWeight: "600",
  textAlign: "center",
  borderBottom: "1px solid {colors.line}",
});

export function OfflineBanner() {
  return (
    <Show when={!online()}>
      <p class={banner} role="status">
        You're offline. Papers and questions you've opened before still work.
      </p>
    </Show>
  );
}
