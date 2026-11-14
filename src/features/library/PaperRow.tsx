import { A } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { css } from "styled-system/css";
import { isPaperCached } from "~/lib/offline";
import { BookmarkIcon, ChevronRightIcon, DownloadIcon, FileIcon } from "~/ui/icons";
import { paperDownloadUrl, paperUrl } from "./api";
import { formatBytes, LARGE_FILE_BYTES, type PaperSummary, paperTitle } from "./papers";
import { useBookmarks } from "./useBookmarks";

const styles = {
  row: css({
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minH: "68px",
    py: "10px",
    px: "14px",
    borderBottom: "1px solid {colors.line}",
    transition: "background-color 120ms ease-out",
    _last: { borderBottom: 0 },
    // The whole row opens the paper, so hover and focus show on the whole row,
    // edge to edge (the list clips it to its rounded corners).
    "&:has(a[data-open]:hover)": { bg: "hover" },
    "&:has(a[data-open]:hover) [data-chevron]": { color: "ink", transform: "translateX(2px)" },
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
  offline: css({ color: "brand", fontWeight: "600" }),
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
    transition: "background-color 120ms ease-out, color 120ms ease-out",
    _hover: { color: "ink", bg: "hover" },
    "&[aria-pressed=true]": { color: "brand" },
  }),
  chevron: css({
    flex: "none",
    color: "ink.subtle",
    hideBelow: "md",
    transition: "transform 160ms ease-out, color 120ms ease-out",
  }),
};

export function PaperRow(props: { paper: PaperSummary; context?: string }) {
  const bookmarks = useBookmarks();
  const title = () => paperTitle(props.paper);
  const size = () => formatBytes(props.paper.size_bytes);
  const isLarge = () => props.paper.size_bytes > LARGE_FILE_BYTES;
  const [cached] = createResource(() => paperUrl(props.paper.storage_path), isPaperCached);

  return (
    <li class={styles.row}>
      <span class={`${styles.icon} ${props.paper.semester === null ? styles.iconNational : ""}`}>
        <FileIcon size={18} />
      </span>
      <div class={styles.body}>
        <A href={`/papers/${props.paper.id}`} class={styles.title} data-open>
          {props.context ? `${props.context} · ${title()}` : title()}
        </A>
        <p class={styles.meta}>
          <span class={css({ fontVariantNumeric: "tabular-nums" })}>{size()}</span>
          <span aria-hidden="true">·</span>
          <span>
            {props.paper.question_count > 0
              ? `${props.paper.question_count} practice questions`
              : "PDF only"}
          </span>
          <Show
            when={cached()}
            fallback={
              <Show when={isLarge()}>
                <span aria-hidden="true">·</span>
                <span class={styles.large}>Large file · use Wi-Fi</span>
              </Show>
            }
          >
            <span aria-hidden="true">·</span>
            <span class={styles.offline}>On this device</span>
          </Show>
        </p>
      </div>
      <Show when={bookmarks.enabled()}>
        <button
          type="button"
          class={styles.save}
          aria-pressed={bookmarks.has(props.paper.id)}
          aria-label={`Bookmark ${title()}`}
          onClick={() => bookmarks.toggle(props.paper.id)}
        >
          <BookmarkIcon filled={bookmarks.has(props.paper.id)} />
        </button>
      </Show>
      <a
        class={styles.save}
        href={paperDownloadUrl(props.paper.storage_path)}
        aria-label={`Save ${title()} PDF to device, ${size()}`}
      >
        <DownloadIcon />
      </a>
      <span data-chevron class={styles.chevron}>
        <ChevronRightIcon size={18} />
      </span>
    </li>
  );
}
