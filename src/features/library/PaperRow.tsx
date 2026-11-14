import { Show } from "solid-js";
import { css } from "styled-system/css";
import { DownloadIcon, FileIcon } from "~/ui/icons";
import { paperUrl } from "./api";
import { formatBytes, LARGE_FILE_BYTES, type PaperSummary, paperTitle } from "./papers";

const styles = {
  row: css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minH: "68px",
    py: "10px",
    borderBottom: "1px solid {colors.line}",
    _last: { borderBottom: 0 },
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
  title: css({ fontSize: "15px", fontWeight: "600" }),
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
  open: css({
    flex: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minW: "44px",
    minH: "44px",
    px: { base: 0, md: "14px" },
    rounded: "md",
    fontSize: "14px",
    fontWeight: "600",
    color: "ink",
    boxShadow: "inset 0 0 0 1px {colors.line}",
    _hover: { bg: "sunk" },
  }),
  openLabel: css({ hideBelow: "md" }),
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
        <p class={styles.title}>{title()}</p>
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
        class={styles.open}
        href={paperUrl(props.paper.storage_path)}
        target="_blank"
        rel="noopener"
        aria-label={`Open ${title()} PDF, ${size()}`}
      >
        <DownloadIcon />
        <span class={styles.openLabel} aria-hidden="true">
          Open PDF
        </span>
      </a>
    </li>
  );
}
