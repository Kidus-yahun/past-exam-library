import { z } from "zod";
import type { ExamType } from "~/features/library/papers";
import { supabase } from "~/lib/supabase";

const Overview = z.object({
  students: z.number(),
  new_students_week: z.number(),
  papers: z.number(),
  questions: z.number(),
  questions_flagged: z.number(),
  attempts_week: z.number(),
  answers_week: z.number(),
  active_students_week: z.number(),
});
export type Overview = z.infer<typeof Overview>;

export async function fetchOverview(): Promise<Overview> {
  const { data, error } = await supabase.rpc("admin_overview");
  if (error) throw error;
  return Overview.parse(data);
}

const Student = z.object({
  id: z.uuid(),
  display_name: z.string(),
  email: z.string().nullable(),
  grade: z.number().nullable(),
  joined_at: z.string(),
  answered: z.number(),
  correct: z.number(),
  last_active: z.string().nullable(),
});
export type Student = z.infer<typeof Student>;

export async function fetchStudents(search: string): Promise<Student[]> {
  const { data, error } = await supabase.rpc("admin_students", { search });
  if (error) throw error;
  return z.array(Student).parse(data);
}

// --- Papers -----------------------------------------------------------------

export type NewPaper = {
  grade: number;
  subject: string;
  semester: 1 | 2 | null;
  examType: ExamType;
  year: number;
  file: File;
};

export async function uploadPaper(input: NewPaper) {
  const storagePath = `g${input.grade}/${input.subject}/${input.semester ? `s${input.semester}-` : ""}${input.examType}-${input.year}.pdf`;
  const upload = await supabase.storage
    .from("papers")
    .upload(storagePath, input.file, { contentType: "application/pdf", upsert: false });
  if (upload.error) {
    throw new Error(
      /exists/i.test(upload.error.message)
        ? "That paper is already in the library. Delete it first to replace it."
        : upload.error.message,
    );
  }
  const { error } = await supabase.from("papers").insert({
    grade: input.grade,
    subject: input.subject,
    semester: input.semester,
    exam_type: input.examType,
    year: input.year,
    storage_path: storagePath,
    size_bytes: input.file.size,
  });
  if (error) {
    // Don't leave an orphaned file behind if the row couldn't be created.
    await supabase.storage.from("papers").remove([storagePath]);
    throw error;
  }
}

export async function deletePaper(id: string, storagePath: string) {
  const { error } = await supabase.from("papers").delete().eq("id", id);
  if (error) throw error;
  await supabase.storage.from("papers").remove([storagePath]);
}

// --- Questions --------------------------------------------------------------

const AdminQuestion = z.object({
  id: z.uuid(),
  body: z.string(),
  options: z.array(z.string()),
  correct_index: z.number().int(),
  explanation: z.string().nullable(),
  needs_review: z.boolean(),
  paper_id: z.uuid().nullable(),
});
export type AdminQuestion = z.infer<typeof AdminQuestion>;

export async function fetchAdminQuestions(grade: number, subject: string, flaggedOnly: boolean) {
  let query = supabase
    .from("questions")
    .select("id, body, options, correct_index, explanation, needs_review, paper_id")
    .eq("grade", grade)
    .eq("subject", subject)
    .order("needs_review", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(200);
  if (flaggedOnly) query = query.eq("needs_review", true);
  const { data, error } = await query;
  if (error) throw error;
  return z.array(AdminQuestion).parse(data);
}

export async function approveQuestion(id: string) {
  const { error } = await supabase.from("questions").update({ needs_review: false }).eq("id", id);
  if (error) throw error;
}

export async function deleteQuestion(id: string) {
  const { error } = await supabase.from("questions").delete().eq("id", id);
  if (error) throw error;
}

export async function addQuestion(input: {
  grade: number;
  subject: string;
  body: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}) {
  const { error } = await supabase.from("questions").insert({
    grade: input.grade,
    subject: input.subject,
    body: input.body.trim(),
    options: input.options.map((o) => o.trim()),
    correct_index: input.correctIndex,
    explanation: input.explanation.trim() || null,
  });
  if (error) throw error;
}
