import { z } from "zod";
import { supabase } from "~/lib/supabase";
import { PaperSummary } from "./papers";

export const GRADES = [9, 10, 11, 12] as const;
export type Grade = (typeof GRADES)[number];

const Subject = z.object({ id: z.string(), name: z.string(), name_am: z.string().nullable() });
export type Subject = z.infer<typeof Subject>;

export async function fetchSubjects(grade: Grade): Promise<Subject[]> {
  const { data, error } = await supabase
    .from("grade_subjects")
    .select("position, subject:subjects(id, name, name_am)")
    .eq("grade", grade)
    .order("position");
  if (error) throw error;
  return data.map((row) => Subject.parse(row.subject));
}

export async function fetchPapers(grade: Grade, subject: string): Promise<PaperSummary[]> {
  const { data, error } = await supabase
    .from("paper_summaries")
    .select(
      "id, grade, subject, semester, exam_type, year, storage_path, size_bytes, question_count",
    )
    .eq("grade", grade)
    .eq("subject", subject);
  if (error) throw error;
  return z.array(PaperSummary).parse(data);
}

const PaperDetail = PaperSummary.extend({
  subjects: z.object({ name: z.string() }),
});
export type PaperDetail = PaperSummary & { subjectName: string };

export async function fetchPaper(id: string): Promise<PaperDetail | null> {
  const { data, error } = await supabase
    .from("paper_summaries")
    .select(
      "id, grade, subject, semester, exam_type, year, storage_path, size_bytes, question_count, subjects(name)",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const { subjects, ...paper } = PaperDetail.parse(data);
  return { ...paper, subjectName: subjects.name };
}

/** URL the in-app reader loads the PDF from. */
export function paperUrl(storagePath: string): string {
  return supabase.storage.from("papers").getPublicUrl(storagePath).data.publicUrl;
}

/** URL that saves the PDF to the device instead of displaying it. */
export function paperDownloadUrl(storagePath: string): string {
  const fileName = storagePath.replaceAll("/", "-");
  return supabase.storage.from("papers").getPublicUrl(storagePath, { download: fileName }).data
    .publicUrl;
}
