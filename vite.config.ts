import type { IncomingMessage } from "node:http";
import { fileURLToPath, URL } from "node:url";
import { loadEnv, type Plugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

const SERVER_ENV = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "GEMINI_API_KEY", "GEMINI_MODEL"];

async function readBody(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks);
}

/**
 * Runs the Vercel functions in api/ during `vite dev`, so /api/* works locally
 * without the Vercel CLI. Each file exports handlers named after HTTP methods
 * that take a Request and return a Response, exactly as on Vercel.
 */
function apiFunctions(): Plugin {
  return {
    name: "api-functions-dev",
    apply: "serve",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");
      for (const key of SERVER_ENV) if (env[key] && !process.env[key]) process.env[key] = env[key];

      server.middlewares.use(async (req, res, next) => {
        const match = /^\/api\/([a-z0-9-]+)(?:\?.*)?$/.exec(req.url ?? "");
        if (!match) return next();
        try {
          const mod = (await server.ssrLoadModule(`/api/${match[1]}.ts`)) as Record<
            string,
            ((request: Request) => Promise<Response>) | undefined
          >;
          const handler = mod[req.method ?? "GET"];
          if (!handler) {
            res.statusCode = 405;
            res.end();
            return;
          }
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === "string") headers.set(key, value);
            else if (Array.isArray(value)) headers.set(key, value.join(", "));
          }
          const body =
            req.method === "GET" || req.method === "HEAD"
              ? undefined
              : new Uint8Array(await readBody(req));
          const response = await handler(
            new Request(`http://localhost${req.url}`, { method: req.method, headers, body }),
          );
          res.statusCode = response.status;
          for (const [key, value] of response.headers) res.setHeader(key, value);
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

/**
 * Offline support. Only shared catalog data is cached (subjects, papers,
 * notes, questions); a student's own data never is, because phones are often
 * shared and a cached response would show one student's data to the next.
 */
// Route matchers are copied into sw.js as source text, so they can only use
// what they define themselves (no variables from this file).

const pwa = VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["icons/*.png"],
  manifest: {
    name: "Past Exam Library",
    short_name: "Past Exams",
    description: "Past exam papers and practice questions for Ethiopian Grade 9–12 students.",
    lang: "en",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F8F7",
    theme_color: "#0B6B4D",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
  workbox: {
    // Install only the app shell up front (data is expensive); heavy screens and
    // extra font subsets are cached the first time they're used (rule below).
    globPatterns: ["**/*.{js,mjs,css,html,woff2,png,svg}"],
    globIgnores: [
      "**/pdf.worker*",
      "**/ReaderPage-*",
      "**/StudyPage-*",
      "**/*-cyrillic*",
      "**/*-greek*",
      "**/*-vietnamese*",
      "**/*-latin-ext-*",
      "**/noto-sans-ethiopic-*",
    ],
    maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
    navigateFallback: "/index.html",
    navigateFallbackDenylist: [/^\/api\//],
    runtimeCaching: [
      {
        // Hashed build files never change, so a cached copy is always right.
        urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith("/assets/"),
        handler: "CacheFirst",
        options: { cacheName: "assets", expiration: { maxEntries: 120 } },
      },
      {
        // Papers a student opened stay readable offline (downloads excluded).
        urlPattern: ({ url }) =>
          url.pathname.startsWith("/storage/v1/object/public/papers/") &&
          !url.searchParams.has("download"),
        handler: "CacheFirst",
        options: {
          cacheName: "papers",
          // Answer pdf.js byte-range reads from a cached whole file.
          rangeRequests: true,
          expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 120 },
          cacheableResponse: { statuses: [200] },
        },
      },
      {
        urlPattern: ({ url, request }) =>
          request.method === "GET" &&
          /^\/rest\/v1\/(grade_subjects|subjects|papers|paper_summaries|units|formulas|questions)\b/.test(
            url.pathname,
          ),
        handler: "NetworkFirst",
        options: {
          cacheName: "catalog",
          networkTimeoutSeconds: 5,
          expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 30 },
          cacheableResponse: { statuses: [200] },
        },
      },
    ],
  },
});

export default defineConfig({
  plugins: [solid(), apiFunctions(), pwa],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
      "styled-system": fileURLToPath(new URL("./styled-system", import.meta.url)),
    },
  },
  server: { port: 5173 },
  // Local-only: lets `vite preview` serve Supabase from its own origin, for
  // testing the service worker where the browser blocks it from 127.0.0.1.
  preview: {
    proxy: {
      "/rest": "http://127.0.0.1:54321",
      "/storage": "http://127.0.0.1:54321",
      "/auth": "http://127.0.0.1:54321",
    },
  },
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
