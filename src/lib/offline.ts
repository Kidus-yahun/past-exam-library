import { createRoot, createSignal } from "solid-js";

/** Cache the service worker stores opened papers in (see vite.config.ts). */
export const PAPERS_CACHE = "papers";

export const online = createRoot(() => {
  const [isOnline, setOnline] = createSignal(navigator.onLine);
  window.addEventListener("online", () => setOnline(true));
  window.addEventListener("offline", () => setOnline(false));
  return isOnline;
});

/** Whether a paper's PDF is already on this device, so it opens without data. */
export async function isPaperCached(url: string): Promise<boolean> {
  if (!("caches" in window)) return false;
  try {
    const cache = await caches.open(PAPERS_CACHE);
    return (await cache.match(url)) !== undefined;
  } catch {
    return false;
  }
}
