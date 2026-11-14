import { z } from "zod";

const Env = z.object({
  VITE_SUPABASE_URL: z.url(),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(20),
  /** Show "Continue with Google" only where the Google provider is configured. */
  VITE_AUTH_GOOGLE: z.enum(["true", "false"]).default("false"),
});

const parsed = Env.safeParse(import.meta.env);
if (!parsed.success) {
  throw new Error(
    `Missing or invalid environment: ${parsed.error.issues.map((i) => i.path.join(".")).join(", ")}. ` +
      "Copy .env.example to .env.local and fill it in.",
  );
}

export const env = parsed.data;
