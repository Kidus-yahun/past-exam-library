import { z } from "zod";
import { supabase } from "~/lib/supabase";
import { type Mode, Question, shuffle } from "./session";

/** A mixed practice set draws this many questions from a subject. */
export const MIXED_SET_SIZE = 20;

const QuestionRow = Question.extend({ legacy_id: z.string().nullable() });
const QUESTION_COLUMNS = "id, legacy_id, body, options, correct_index, explanation";

// Imported questions keep their original paper order through legacy ids (q_2 < q_10).
const byPaperOrder = (a: z.infer<typeof QuestionRow>, b: z.infer<typeof QuestionRow>) =>
  (a.legacy_id ?? "").localeCompare(b.legacy_id ?? "", undefined, { numeric: true });

const toQuestion = ({ legacy_id: _legacy, ...q }: z.infer<typeof QuestionRow>): Question => q;

export async function fetchPaperQuestions(paperId: string): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select(QUESTION_COLUMNS)
    .eq("paper_id", paperId)
    .eq("needs_review", false);
  if (error) throw error;
  return z.array(QuestionRow).parse(data).sort(byPaperOrder).map(toQuestion);
}

export async function fetchMixedQuestions(grade: number, subject: string): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select(QUESTION_COLUMNS)
    .eq("grade", grade)
    .eq("subject", subject)
    .eq("needs_review", false);
  if (error) throw error;
  return shuffle(z.array(QuestionRow).parse(data)).slice(0, MIXED_SET_SIZE).map(toQuestion);
}

export async function fetchQuestionsByIds(ids: string[]): Promise<Question[]> {
  const { data, error } = await supabase.from("questions").select(QUESTION_COLUMNS).in("id", ids);
  if (error) throw error;
  const byId = new Map(
    z
      .array(QuestionRow)
      .parse(data)
      .map((q) => [q.id, toQuestion(q)]),
  );
  return ids.flatMap((id) => byId.get(id) ?? []);
}

const Attempt = z.object({
  id: z.uuid(),
  paper_id: z.uuid().nullable(),
  mode: z.enum(["practice", "exam"]),
  grade: z.number().int(),
  subject: z.string(),
  question_ids: z.array(z.uuid()),
  started_at: z.string(),
  finished_at: z.string().nullable(),
  answers: z.array(z.object({ question_id: z.uuid(), chosen_index: z.number().int() })),
  subjects: z.object({ name: z.string() }),
  papers: z
    .object({
      exam_type: z.enum(["mid1", "mid2", "final", "pretest", "model"]),
      semester: z.number().int().nullable(),
      year: z.number().int(),
    })
    .nullable(),
});
export type Attempt = z.infer<typeof Attempt>;

export async function fetchAttempt(id: string): Promise<Attempt | null> {
  const { data, error } = await supabase
    .from("attempts")
    .select(
      "id, paper_id, mode, grade, subject, question_ids, started_at, finished_at, answers(question_id, chosen_index), subjects(name), papers(exam_type, semester, year)",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? Attempt.parse(data) : null;
}

export async function startAttempt(input: {
  mode: Mode;
  grade: number;
  subject: string;
  paperId: string | null;
  questionIds: string[];
}): Promise<{ id: string; startedAt: string }> {
  const { data, error } = await supabase
    .from("attempts")
    .insert({
      mode: input.mode,
      grade: input.grade,
      subject: input.subject,
      paper_id: input.paperId,
      question_ids: input.questionIds,
    })
    .select("id, started_at")
    .single();
  if (error) throw error;
  return { id: data.id, startedAt: data.started_at };
}

/** Upserts answers; the database marks them right or wrong itself. */
export async function saveAnswers(attemptId: string, answers: Record<string, number>) {
  const rows = Object.entries(answers).map(([question_id, chosen_index]) => ({
    attempt_id: attemptId,
    question_id,
    chosen_index,
    answered_at: new Date().toISOString(),
  }));
  if (rows.length === 0) return;
  const { error } = await supabase
    .from("answers")
    .upsert(rows, { onConflict: "attempt_id,question_id" });
  if (error) throw error;
}

export async function fetchSubjectQuestionCount(grade: number, subject: string): Promise<number> {
  const { count, error } = await supabase
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("grade", grade)
    .eq("subject", subject)
    .eq("needs_review", false);
  if (error) throw error;
  return count ?? 0;
}

const UnfinishedAttempt = z.object({
  id: z.uuid(),
  mode: z.enum(["practice", "exam"]),
  grade: z.number().int(),
  question_ids: z.array(z.uuid()),
  started_at: z.string(),
  subjects: z.object({ name: z.string() }),
  papers: z
    .object({
      exam_type: z.enum(["mid1", "mid2", "final", "pretest", "model"]),
      semester: z.number().int().nullable(),
      year: z.number().int(),
    })
    .nullable(),
  answers: z.array(z.object({ count: z.number().int() })),
});
export type UnfinishedAttempt = z.infer<typeof UnfinishedAttempt>;

/** The signed-in student's attempts they left part-way, newest first. */
export async function fetchUnfinishedAttempts(limit = 3): Promise<UnfinishedAttempt[]> {
  const { data, error } = await supabase
    .from("attempts")
    .select(
      "id, mode, grade, question_ids, started_at, subjects(name), papers(exam_type, semester, year), answers(count)",
    )
    .is("finished_at", null)
    .order("started_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return z.array(UnfinishedAttempt).parse(data);
}

export async function finishAttempt(attemptId: string) {
  const { error } = await supabase
    .from("attempts")
    .update({ finished_at: new Date().toISOString() })
    .eq("id", attemptId);
  if (error) throw error;
}
