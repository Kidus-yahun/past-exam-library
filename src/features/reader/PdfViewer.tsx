import {
  createEffect,
  createResource,
  createSignal,
  For,
  Match,
  onCleanup,
  onMount,
  Switch,
} from "solid-js";
import { css } from "styled-system/css";
import { type PDFPageProxy, pdfjs, type RenderTask } from "./pdf";

/** Widest a page is drawn at 100% zoom; wider reads badly on large screens. */
const MAX_PAGE_WIDTH = 880;
const GUTTER = 12;

type LoadedPage = { number: number; proxy: PDFPageProxy; width: number; height: number };

async function loadDocument(url: string) {
  const task = pdfjs.getDocument({ url });
  const doc = await task.promise;
  const pages = await Promise.all(
    Array.from({ length: doc.numPages }, async (_, i): Promise<LoadedPage> => {
      const proxy = await doc.getPage(i + 1);
      const { width, height } = proxy.getViewport({ scale: 1 });
      return { number: i + 1, proxy, width, height };
    }),
  );
  return { task, pages };
}

const styles = {
  scroller: css({ w: "100%", overflowX: "auto" }),
  column: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    w: "max-content",
    minW: "100%",
    py: "16px",
    px: `${GUTTER}px`,
    boxSizing: "border-box",
  }),
  // Paper stays white in dark mode, like a printed sheet on a desk.
  page: css({
    bg: "white",
    rounded: "4px",
    boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 8px 24px rgba(0,0,0,.08)",
    overflow: "hidden",
    flexShrink: 0,
  }),
  canvas: css({ display: "block", w: "100%", h: "100%" }),
  placeholder: css({ bg: "surface", rounded: "4px", border: "1px solid {colors.line}" }),
  message: css({
    m: "32px auto",
    maxW: "420px",
    textAlign: "center",
    fontSize: "14.5px",
    color: "ink.muted",
  }),
};

type PdfViewerProps = {
  url: string;
  /** 1 = fit to width. */
  zoom: number;
  onReady?: (pageCount: number) => void;
  onPageChange?: (page: number) => void;
};

export function PdfViewer(props: PdfViewerProps) {
  const [loaded] = createResource(() => props.url, loadDocument);
  const [width, setWidth] = createSignal(0);
  let scroller!: HTMLDivElement;

  createEffect(() => {
    const current = loaded();
    if (!current) return;
    props.onReady?.(current.pages.length);
    // Frees the worker's copy of the document when the paper changes or closes.
    onCleanup(() => void current.task.destroy());
  });

  onMount(() => {
    // Measure now; the observer only reports during rendering, which a
    // background tab may not do yet.
    setWidth(scroller.clientWidth);
    const resize = new ResizeObserver(([entry]) => {
      if (entry) setWidth(entry.contentRect.width);
    });
    resize.observe(scroller);
    onCleanup(() => resize.disconnect());
  });

  // The page with the largest visible share is the current page.
  const ratios = new Map<number, number>();
  const pageTracker = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(Number((entry.target as HTMLElement).dataset.page), entry.intersectionRatio);
      }
      let best = 1;
      let bestRatio = -1;
      for (const [page, ratio] of ratios) {
        if (ratio > bestRatio || (ratio === bestRatio && page < best)) {
          best = page;
          bestRatio = ratio;
        }
      }
      props.onPageChange?.(best);
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );
  onCleanup(() => pageTracker.disconnect());

  const pageWidth = () => Math.floor(Math.min(width() - GUTTER * 2, MAX_PAGE_WIDTH) * props.zoom);

  return (
    <div ref={scroller} class={styles.scroller}>
      <Switch>
        <Match when={loaded.error}>
          <p class={styles.message} role="alert">
            This paper couldn't be opened. Check your connection, or save the PDF and open it on
            your device.
          </p>
        </Match>
        <Match when={loaded.loading || width() === 0}>
          <div class={styles.column} role="status" aria-label="Loading paper">
            <div
              class={styles.placeholder}
              style={{ width: `${Math.max(pageWidth(), 280)}px`, height: "70vh" }}
            />
          </div>
        </Match>
        <Match when={loaded()}>
          {(current) => (
            <div class={styles.column}>
              <For each={current().pages}>
                {(page) => <PdfPage page={page} cssWidth={pageWidth()} tracker={pageTracker} />}
              </For>
            </div>
          )}
        </Match>
      </Switch>
    </div>
  );
}

function PdfPage(props: { page: LoadedPage; cssWidth: number; tracker: IntersectionObserver }) {
  let wrapper!: HTMLDivElement;
  let canvas!: HTMLCanvasElement;
  const [nearView, setNearView] = createSignal(false);

  onMount(() => {
    props.tracker.observe(wrapper);
    // Draw pages a screen ahead of the reader, never the whole paper at once.
    const near = new IntersectionObserver(
      ([entry]) => setNearView(entry?.isIntersecting ?? false),
      {
        rootMargin: "100% 0px",
      },
    );
    near.observe(wrapper);
    onCleanup(() => {
      near.disconnect();
      props.tracker.unobserve(wrapper);
    });
  });

  let task: RenderTask | undefined;
  let drawnAt = 0;
  createEffect(() => {
    const scale = props.cssWidth / props.page.width;
    if (!nearView() || scale <= 0 || scale === drawnAt) return;
    task?.cancel();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const viewport = props.page.proxy.getViewport({ scale: scale * pixelRatio });
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    task = props.page.proxy.render({ canvas, viewport });
    task.promise.then(
      () => {
        drawnAt = scale;
      },
      () => {
        // Cancelled by a newer render (zoom or resize); nothing to do.
      },
    );
  });
  onCleanup(() => task?.cancel());

  return (
    <div
      ref={wrapper}
      data-page={props.page.number}
      class={styles.page}
      style={{
        width: `${props.cssWidth}px`,
        height: `${Math.round((props.cssWidth * props.page.height) / props.page.width)}px`,
      }}
    >
      <canvas
        ref={canvas}
        class={styles.canvas}
        role="img"
        aria-label={`Page ${props.page.number}`}
      />
    </div>
  );
}
