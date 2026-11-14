import { fileURLToPath, URL } from "node:url";
import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
      "styled-system": fileURLToPath(new URL("./styled-system", import.meta.url)),
    },
  },
  server: { port: 5173 },
  test: { environment: "node", include: ["src/**/*.test.ts"] },
});
