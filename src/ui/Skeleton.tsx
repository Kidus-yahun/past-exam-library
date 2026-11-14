import { For } from "solid-js";
import { css } from "styled-system/css";
import { panel } from "./Page";

const styles = {
  row: css({
    h: "68px",
    px: "14px",
    borderBottom: "1px solid {colors.line}",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    _last: { borderBottom: 0 },
  }),
  tile: css({ flex: "none", w: "36px", h: "40px", rounded: "sm", bg: "sunk" }),
  bar: css({ h: "12px", rounded: "6px", bg: "sunk" }),
};

/** Placeholder rows shaped like the list that is loading, instead of a spinner. */
export function ListSkeleton(props: { label: string; rows?: number }) {
  return (
    <div class={panel} role="status" aria-busy="true" aria-label={props.label}>
      <For each={Array.from({ length: props.rows ?? 3 })}>
        {() => (
          <div class={styles.row}>
            <span class={styles.tile} />
            <span class={css({ flex: 1, display: "flex", flexDirection: "column", gap: "8px" })}>
              <span class={`${styles.bar} ${css({ w: "40%" })}`} />
              <span class={`${styles.bar} ${css({ w: "60%" })}`} />
            </span>
          </div>
        )}
      </For>
    </div>
  );
}
