import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { env } from "./env";

export const supabase = createClient<Database>(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Views<T extends keyof Database["public"]["Views"]> =
  Database["public"]["Views"][T]["Row"];
export type ExamType = Database["public"]["Enums"]["exam_type"];
