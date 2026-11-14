import * as pdfjs from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Parsing and rendering run in a worker so long papers never block scrolling.
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export type { PDFDocumentProxy, PDFPageProxy, RenderTask } from "pdfjs-dist";
export { pdfjs };
