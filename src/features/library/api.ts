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

// --- Search and bookmarks ---------------------------------------------------

const SearchRow = PaperSummary.extend({ subjects: z.object({ name: z.string() }) });
const SUMMARY_COLUMNS =
  "id, grade, subject, semester, exam_type, year, storage_path, size_bytes, question_count, subjects(name)";

const withSubjectName = (rows: unknown) =>
  z
    .array(SearchRow)
    .parse(rows)
    .map(({ subjects, ...p }) => ({ ...p, subjectName: subjects.name }));

/** Every paper with its subject name; the library is small enough to search on the device. */
export async function fetchAllPapers() {
  const { data, error } = await supabase.from("paper_summaries").select(SUMMARY_COLUMNS);
  if (error) throw error;
  return withSubjectName(data);
}

export async function fetchBookmarkIds(): Promise<Set<string>> {
  const { data, error } = await supabase.from("bookmarks").select("paper_id");
  if (error) throw error;
  return new Set(data.map((row) => row.paper_id));
}

export async function fetchBookmarkedPapers() {
  const ids = [...(await fetchBookmarkIds())];
  if (ids.length === 0) return [];
  const { data, error } = await supabase
    .from("paper_summaries")
    .select(SUMMARY_COLUMNS)
    .in("id", ids);
  if (error) throw error;
  return withSubjectName(data);
}

export async function setBookmarked(paperId: string, on: boolean) {
  const { error } = on
    ? await supabase.from("bookmarks").insert({ paper_id: paperId })
    : await supabase.from("bookmarks").delete().eq("paper_id", paperId);
  if (error) throw error;
}
