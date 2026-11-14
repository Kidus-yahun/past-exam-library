/**
 * Archie, the study coach: POST /api/tutor
 *
 * Signed-in students only (Supabase access token in the Authorization header),
 * limited to HOURLY_LIMIT questions an hour each. The Gemini key never leaves
 * the server. Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY,
 * GEMINI_MODEL (optional).
 */
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "../src/lib/database.types";

const HOURLY_LIMIT = 30;
const DEFAULT_MODEL = "gemini-2.5-flash";

const Body = z.object({
  message: z.string().trim().min(1).max(1000),
  grade: z.number().int().min(9).max(12),
  subject: z.string().trim().min(1).max(40),
  unitTitle: z.string().trim().max(160).optional(),
  history: z
    .array(z.object({ role: z.enum(["student", "archie"]), text: z.string().max(4000) }))
    .max(10)
    .default([]),
});

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

function instructions(grade: number, subject: string, unitTitle?: string) {
  return [
    `You are Archie, a patient study coach for an Ethiopian Grade ${grade} student revising ${subject}${
      unitTitle ? `, unit "${unitTitle}"` : ""
    } under the Ethiopian national curriculum.`,
    "Teach, don't just answer: for an exam-style question, give a hint or the key formula first and let the student try; give the full working only if they ask again.",
    "Be concise. Use short numbered steps. Write formulas in plain text (e.g. v = u + at, x = (-b ± √(b² - 4ac)) / 2a).",
    "If you are not sure of a fact, say so instead of guessing. Stay on school study topics.",
  ].join("\n");
}

export async function POST(request: Request): Promise<Response> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return json(500, { error: "server_misconfigured" });

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return json(401, { error: "sign_in_required" });

  const admin = createClient<Database>(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
  const { data: auth, error: authError } = await admin.auth.getUser(token);
  if (authError || !auth.user) return json(401, { error: "sign_in_required" });
  const userId = auth.user.id;

  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json(400, { error: "invalid_request" });
  const { message, grade, subject, unitTitle, history } = parsed.data;

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error: countError } = await admin
    .from("tutor_requests")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", since);
  if (countError) return json(500, { error: "server_error" });
  if ((count ?? 0) >= HOURLY_LIMIT) return json(429, { error: "rate_limited" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return json(503, { error: "not_configured" });

  await admin.from("tutor_requests").insert({ user_id: userId });

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  let upstream: Response;
  try {
    upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: instructions(grade, subject, unitTitle) }] },
          contents: [
            ...history.map((turn) => ({
              role: turn.role === "student" ? "user" : "model",
              parts: [{ text: turn.text }],
            })),
            { role: "user", parts: [{ text: message }] },
          ],
          generationConfig: { maxOutputTokens: 800, temperature: 0.4 },
        }),
        signal: AbortSignal.timeout(20_000),
      },
    );
  } catch {
    return json(504, { error: "tutor_timeout" });
  }
  if (!upstream.ok) return json(502, { error: "tutor_unavailable" });

  const data = (await upstream.json().catch(() => null)) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  } | null;
  const reply = data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();
  if (!reply) return json(502, { error: "tutor_unavailable" });

  return json(200, { reply });
}
