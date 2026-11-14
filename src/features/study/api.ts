import { z } from "zod";
import { supabase } from "~/lib/supabase";

const Unit = z.object({
  id: z.uuid(),
  position: z.number().int(),
  title: z.string(),
  exam_weight: z.string().nullable(),
  read_minutes: z.number().int().nullable(),
  overview: z.string(),
  formulas: z.array(
    z.object({ name: z.string(), latex: z.string(), notes: z.string().nullable() }),
  ),
  worked_example: z
    .object({ question: z.string(), steps: z.array(z.string()), answer: z.string() })
    .nullable(),
  pitfall: z.string().nullable(),
});
export type Unit = z.infer<typeof Unit>;

export async function fetchUnits(grade: number, subject: string): Promise<Unit[]> {
  const { data, error } = await supabase
    .from("units")
    .select(
      "id, position, title, exam_weight, read_minutes, overview, formulas, worked_example, pitfall",
    )
    .eq("grade", grade)
    .eq("subject", subject)
    .order("position");
  if (error) throw error;
  return z.array(Unit).parse(data);
}

const Formula = z.object({
  id: z.uuid(),
  topic: z.string(),
  title: z.string(),
  display: z.string(),
  variables: z.string().nullable(),
  tip: z.string().nullable(),
  grades: z.array(z.number().int()),
});
export type Formula = z.infer<typeof Formula>;

/** Formula sheet entries for a subject, limited to ones taught up to this grade. */
export async function fetchFormulas(subject: string, grade: number): Promise<Formula[]> {
  const { data, error } = await supabase
    .from("formulas")
    .select("id, topic, title, display, variables, tip, grades")
    .eq("subject", subject)
    .order("position");
  if (error) throw error;
  return z
    .array(Formula)
    .parse(data)
    .filter((f) => f.grades.length === 0 || f.grades.some((g) => g <= grade));
}

// --- Personal notes ---------------------------------------------------------

export async function fetchMyNote(unitId: string): Promise<string> {
  const { data, error } = await supabase
    .from("study_notes")
    .select("body")
    .eq("unit_id", unitId)
    .maybeSingle();
  if (error) throw error;
  return data?.body ?? "";
}

export async function saveMyNote(unitId: string, body: string) {
  const { error } = await supabase
    .from("study_notes")
    .upsert(
      { unit_id: unitId, body, updated_at: new Date().toISOString() },
      { onConflict: "user_id,unit_id" },
    );
  if (error) throw error;
}

// --- Community tips -----------------------------------------------------------

export const TIP_TAGS = {
  shortcut: "Exam shortcut",
  mnemonic: "Memory trick",
  summary: "Key summary",
  trap: "Trap to avoid",
} as const;
export type TipTag = keyof typeof TIP_TAGS;

const Tip = z.object({
  id: z.uuid(),
  author_id: z.uuid(),
  author_name: z.string(),
  tag: z.enum(["shortcut", "mnemonic", "summary", "trap"]),
  body: z.string(),
  created_at: z.string(),
  likes: z.number().int(),
});
export type Tip = z.infer<typeof Tip>;

export async function fetchTips(unitId: string): Promise<Tip[]> {
  const { data, error } = await supabase
    .from("topic_note_feed")
    .select("id, author_id, author_name, tag, body, created_at, likes")
    .eq("unit_id", unitId)
    .order("likes", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  return z.array(Tip).parse(data);
}

export async function fetchMyLikes(noteIds: string[]): Promise<Set<string>> {
  if (noteIds.length === 0) return new Set();
  const { data, error } = await supabase
    .from("topic_note_likes")
    .select("note_id")
    .in("note_id", noteIds);
  if (error) throw error;
  return new Set(data.map((row) => row.note_id));
}

export async function addTip(unitId: string, tag: TipTag, body: string) {
  const { error } = await supabase
    .from("topic_notes")
    .insert({ unit_id: unitId, tag, body: body.trim() });
  if (error) throw error;
}

export async function deleteTip(id: string) {
  const { error } = await supabase.from("topic_notes").delete().eq("id", id);
  if (error) throw error;
}

export async function setLiked(noteId: string, liked: boolean) {
  const { error } = liked
    ? await supabase.from("topic_note_likes").insert({ note_id: noteId })
    : await supabase.from("topic_note_likes").delete().eq("note_id", noteId);
  if (error) throw error;
}

// --- Focus sessions -----------------------------------------------------------

export async function recordFocusSession(minutes: number) {
  const { error } = await supabase.from("focus_sessions").insert({ minutes });
  if (error) throw error;
}
