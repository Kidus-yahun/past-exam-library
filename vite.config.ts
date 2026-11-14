import type { IncomingMessage } from "node:http";
import { fileURLToPath, URL } from "node:url";
import { loadEnv, type Plugin } from "vite";
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

export default defineConfig({
  plugins: [solid(), apiFunctions()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
      "styled-system": fileURLToPath(new URL("./styled-system", import.meta.url)),
    },
  },
  server: { port: 5173 },
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
