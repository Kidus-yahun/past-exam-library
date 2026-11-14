import { EXAM_TYPE_LABEL, type PaperSummary } from "./papers";

export type SearchablePaper = PaperSummary & { subjectName: string };

/** Words a student might type for each paper, e.g. "g12", "grade 12", "physics", "mid 1", "final", "2024". */
function haystack(p: SearchablePaper): string {
  const type = EXAM_TYPE_LABEL[p.exam_type].toLowerCase();
  return [
    `g${p.grade}`,
    `grade ${p.grade}`,
    `grade${p.grade}`,
    p.subjectName.toLowerCase(),
    p.subject,
    type,
    type.replace(/\s+/g, ""),
    p.exam_type,
    p.semester ? `semester ${p.semester} s${p.semester} sem${p.semester}` : "national",
    String(p.year),
  ].join(" ");
}

/** Every word of the query must appear; "mid 1" also matches as one token. */
export function searchPapers(papers: readonly SearchablePaper[], query: string): SearchablePaper[] {
  const normalized = query
    .toLowerCase()
    .replace(/\bmid\s+(\d)/g, "mid$1")
    .trim();
  if (!normalized) return [];
  const words = normalized.split(/\s+/);
  return papers
    .filter((p) => {
      const text = haystack(p);
      return words.every((w) => text.includes(w));
    })
    .sort(
      (a, b) => b.grade - a.grade || a.subjectName.localeCompare(b.subjectName) || b.year - a.year,
    );
}
