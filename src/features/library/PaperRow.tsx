import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { css } from "styled-system/css";
import { ChevronRightIcon, DownloadIcon, FileIcon } from "~/ui/icons";
import { paperDownloadUrl } from "./api";
import { formatBytes, LARGE_FILE_BYTES, type PaperSummary, paperTitle } from "./papers";

const styles = {
  row: css({
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minH: "68px",
    py: "10px",
    borderBottom: "1px solid {colors.line}",
    _last: { borderBottom: 0 },
    // The whole row opens the paper; hover/focus show on the row.
    "&:has(a[data-open]:hover)": { bg: "sunk" },
    "&:has(a[data-open]:focus-visible)": {
      outline: "2px solid {colors.focus}",
      outlineOffset: "-2px",
    },
  }),
  icon: css({
    flex: "none",
    w: "36px",
    h: "40px",
    rounded: "sm",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bg: "sunk",
    color: "ink.muted",
  }),
  iconNational: css({ bg: "brand.soft", color: "brand.strong" }),
  body: css({ flex: 1, minW: 0 }),
  // Stretched link: its ::after covers the row, so tapping anywhere opens it.
  title: css({
    fontSize: "15px",
    fontWeight: "600",
    _focusVisible: { outline: "none" },
    _after: { content: '""', position: "absolute", inset: 0 },
  }),
  meta: css({
    mt: "3px",
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    alignItems: "center",
    fontSize: "12.5px",
    color: "ink.subtle",
  }),
  large: css({ color: "streak.ink", fontWeight: "600" }),
  save: css({
    position: "relative",
    zIndex: 1,
    flex: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minW: "44px",
    minH: "44px",
    rounded: "md",
    color: "ink.muted",
    boxShadow: "inset 0 0 0 1px {colors.line}",
    bg: "surface",
    _hover: { color: "ink" },
  }),
  chevron: css({ flex: "none", color: "ink.subtle", hideBelow: "md" }),
};

export function PaperRow(props: { paper: PaperSummary }) {
  const title = () => paperTitle(props.paper);
  const size = () => formatBytes(props.paper.size_bytes);
  const isLarge = () => props.paper.size_bytes > LARGE_FILE_BYTES;

  return (
    <li class={styles.row}>
      <span class={`${styles.icon} ${props.paper.semester === null ? styles.iconNational : ""}`}>
        <FileIcon size={18} />
      </span>
      <div class={styles.body}>
        <A href={`/papers/${props.paper.id}`} class={styles.title} data-open>
          {title()}
        </A>
        <p class={styles.meta}>
          <span class="mono">{size()}</span>
          <span aria-hidden="true">·</span>
          <span>
            {props.paper.question_count > 0
              ? `${props.paper.question_count} practice questions`
              : "PDF only"}
          </span>
          <Show when={isLarge()}>
            <span aria-hidden="true">·</span>
            <span class={styles.large}>Large file · use Wi-Fi</span>
          </Show>
        </p>
      </div>
      <a
        class={styles.save}
        href={paperDownloadUrl(props.paper.storage_path)}
        aria-label={`Save ${title()} PDF to device, ${size()}`}
      >
        <DownloadIcon />
      </a>
      <ChevronRightIcon size={18} class={styles.chevron} />
    </li>
  );
}
