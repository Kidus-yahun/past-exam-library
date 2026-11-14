import { A, useParams } from "@solidjs/router";
import { useQuery } from "@tanstack/solid-query";
import { createEffect, createSignal, Match, onCleanup, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import { ChevronLeftIcon, DownloadIcon, MinusIcon, PlusIcon, PracticeIcon } from "~/ui/icons";
import { button, quietButton } from "~/ui/Page";
import { fetchPaper, type PaperDetail, paperDownloadUrl, paperUrl } from "../library/api";
import { formatBytes, paperTitle } from "../library/papers";
import { PdfViewer } from "./PdfViewer";

const ZOOM_STEPS = [0.75, 1, 1.25, 1.5, 2] as const;

const styles = {
  screen: css({ minH: "100dvh", bg: "sunk", display: "flex", flexDirection: "column" }),
  bar: css({
    position: "sticky",
    top: 0,
    zIndex: "sticky",
    display: "flex",
    alignItems: "center",
    gap: { base: "4px", md: "12px" },
    minH: "60px",
    px: { base: "8px", md: "16px" },
    bg: "surface",
    borderBottom: "1px solid {colors.line}",
  }),
  iconButton: css({
    flex: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    minW: "44px",
    minH: "44px",
    px: "10px",
    rounded: "md",
    color: "ink.muted",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    _hover: { bg: "sunk", color: "ink" },
    _disabled: { opacity: 0.4, cursor: "default", _hover: { bg: "transparent" } },
  }),
  titles: css({ flex: 1, minW: 0 }),
  title: css({
    fontSize: { base: "15px", md: "16px" },
    fontWeight: "650",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  subtitle: css({
    fontSize: "12.5px",
    color: "ink.subtle",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  pageCount: css({
    flex: "none",
    fontSize: "13px",
    color: "ink.muted",
    px: "6px",
  }),
  zoom: css({ hideBelow: "md", display: "flex", alignItems: "center" }),
  zoomValue: css({ minW: "48px", textAlign: "center", fontSize: "13px", color: "ink.muted" }),
  desktopPractice: css({ hideBelow: "md" }),
  mobilePractice: css({
    hideFrom: "md",
    position: "sticky",
    bottom: 0,
    p: "12px 16px calc(12px + env(safe-area-inset-bottom))",
    bg: "surface",
    borderTop: "1px solid {colors.line}",
  }),
  notice: css({
    m: "48px auto",
    px: "20px",
    maxW: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    alignItems: "center",
    textAlign: "center",
    fontSize: "14.5px",
    color: "ink.muted",
  }),
};

function subtitle(paper: PaperDetail) {
  return paper.semester === null
    ? `Grade ${paper.grade} · National exam prep`
    : `Grade ${paper.grade} · Semester ${paper.semester} · ${paper.year}`;
}

export default function ReaderPage() {
  const params = useParams<{ id: string }>();
  const paper = useQuery(() => ({
    queryKey: ["paper", params.id],
    queryFn: () => fetchPaper(params.id),
  }));

  const [zoomIndex, setZoomIndex] = createSignal(ZOOM_STEPS.indexOf(1));
  const zoom = () => ZOOM_STEPS[zoomIndex()] ?? 1;
  const [page, setPage] = createSignal(1);
  const [pageCount, setPageCount] = createSignal(0);

  const libraryHref = () =>
    paper.data ? `/library?grade=${paper.data.grade}&subject=${paper.data.subject}` : "/library";

  createEffect(() => {
    const p = paper.data;
    if (!p) return;
    const previous = document.title;
    document.title = `${p.subjectName} ${paperTitle(p)} · Past Exam Library`;
    onCleanup(() => {
      document.title = previous;
    });
  });

  return (
    <div class={styles.screen}>
      <header class={styles.bar}>
        <A href={libraryHref()} class={styles.iconButton} aria-label="Back to library">
          <ChevronLeftIcon />
          <span class={css({ hideBelow: "md" })}>Library</span>
        </A>

        <div class={styles.titles}>
          <Show when={paper.data} fallback={<p class={styles.title}>Paper</p>}>
            {(p) => (
              <>
                <h1 class={styles.title}>
                  {p().subjectName} · {paperTitle(p())}
                </h1>
                <p class={styles.subtitle}>{subtitle(p())}</p>
              </>
            )}
          </Show>
        </div>

        <Show when={pageCount() > 0}>
          <p class={`mono ${styles.pageCount}`} aria-live="polite">
            <span class={css({ srOnly: true })}>Page </span>
            {page()} / {pageCount()}
          </p>
        </Show>

        <div class={styles.zoom}>
          <button
            type="button"
            class={styles.iconButton}
            aria-label="Zoom out"
            disabled={zoomIndex() === 0}
            onClick={() => setZoomIndex((i) => Math.max(0, i - 1))}
          >
            <MinusIcon size={18} />
          </button>
          <span class={`mono ${styles.zoomValue}`}>{Math.round(zoom() * 100)}%</span>
          <button
            type="button"
            class={styles.iconButton}
            aria-label="Zoom in"
            disabled={zoomIndex() === ZOOM_STEPS.length - 1}
            onClick={() => setZoomIndex((i) => Math.min(ZOOM_STEPS.length - 1, i + 1))}
          >
            <PlusIcon size={18} />
          </button>
        </div>

        <Show when={paper.data}>
          {(p) => (
            <>
              <a
                href={paperDownloadUrl(p().storage_path)}
                class={styles.iconButton}
                aria-label={`Save PDF to device, ${formatBytes(p().size_bytes)}`}
              >
                <DownloadIcon />
              </a>
              <Show when={p().question_count > 0}>
                <A href={`/practice?paper=${p().id}`} class={`${button} ${styles.desktopPractice}`}>
                  <PracticeIcon size={18} />
                  Practice {p().question_count} questions
                </A>
              </Show>
            </>
          )}
        </Show>
      </header>

      <main class={css({ flex: 1 })}>
        <Switch>
          <Match when={paper.isError}>
            <div class={styles.notice} role="alert">
              <p>Couldn't load this paper. Check your connection and try again.</p>
              <button type="button" class={quietButton} onClick={() => paper.refetch()}>
                Try again
              </button>
            </div>
          </Match>
          <Match when={paper.data === null}>
            <div class={styles.notice}>
              <p>This paper isn't in the library.</p>
              <A href="/library" class={quietButton}>
                Back to library
              </A>
            </div>
          </Match>
          <Match when={paper.data}>
            {(p) => (
              <PdfViewer
                url={paperUrl(p().storage_path)}
                zoom={zoom()}
                onReady={setPageCount}
                onPageChange={setPage}
              />
            )}
          </Match>
        </Switch>
      </main>

      <Show when={(paper.data?.question_count ?? 0) > 0}>
        <div class={styles.mobilePractice}>
          <A href={`/practice?paper=${params.id}`} class={`${button} ${css({ w: "100%" })}`}>
            <PracticeIcon size={18} />
            Practice {paper.data?.question_count} questions
          </A>
        </div>
      </Show>
    </div>
  );
}
