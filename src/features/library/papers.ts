import { z } from "zod";

export const EXAM_TYPES = ["mid1", "mid2", "final", "pretest", "model"] as const;
export type ExamType = (typeof EXAM_TYPES)[number];

export const EXAM_TYPE_LABEL: Record<ExamType, string> = {
  mid1: "Mid 1",
  mid2: "Mid 2",
  final: "Final",
  pretest: "Pre-test",
  model: "Model exam",
};

/** Papers above this size get a "use Wi-Fi" hint; mobile data is expensive. */
export const LARGE_FILE_BYTES = 5 * 1024 * 1024;

export const PaperSummary = z.object({
  id: z.uuid(),
  grade: z.number().int(),
  subject: z.string(),
  semester: z.union([z.literal(1), z.literal(2)]).nullable(),
  exam_type: z.enum(EXAM_TYPES),
  year: z.number().int(),
  storage_path: z.string(),
  size_bytes: z.number().int().nonnegative(),
  question_count: z.number().int().nonnegative(),
});
export type PaperSummary = z.infer<typeof PaperSummary>;

export type PaperGroup = { key: string; label: string; papers: PaperSummary[] };

const isNational = (p: PaperSummary) => p.semester === null;
const byExamType = (a: PaperSummary, b: PaperSummary) =>
  EXAM_TYPES.indexOf(a.exam_type) - EXAM_TYPES.indexOf(b.exam_type);

/**
 * Groups papers the way students look for them: newest school year first,
 * Semester 1 before 2, exams in sitting order; national-exam prep last.
 */
export function groupPapers(papers: readonly PaperSummary[]): PaperGroup[] {
  const groups = new Map<string, PaperGroup & { year: number; semester: number }>();

  for (const paper of papers) {
    if (isNational(paper)) continue;
    const semester = paper.semester ?? 0;
    const key = `${paper.year}-s${semester}`;
    let group = groups.get(key);
    if (!group) {
      group = {
        key,
        label: `Semester ${semester} · ${paper.year}`,
        papers: [],
        year: paper.year,
        semester,
      };
      groups.set(key, group);
    }
    group.papers.push(paper);
  }

  const schoolGroups = [...groups.values()]
    .sort((a, b) => b.year - a.year || a.semester - b.semester)
    .map(({ key, label, papers }) => ({ key, label, papers: papers.sort(byExamType) }));

  const national = papers.filter(isNational).sort((a, b) => byExamType(a, b) || b.year - a.year);
  return national.length > 0
    ? [...schoolGroups, { key: "national", label: "National exam prep", papers: national }]
    : schoolGroups;
}

export function paperTitle(paper: PaperSummary): string {
  const label = EXAM_TYPE_LABEL[paper.exam_type];
  return isNational(paper) ? `${label} ${paper.year}` : label;
}

/** "Mid 1 · Semester 1 · 2024", or "Model exam 2024" for national prep papers. */
export function paperLabel(p: { exam_type: ExamType; semester: number | null; year: number }) {
  const type = EXAM_TYPE_LABEL[p.exam_type];
  return p.semester === null ? `${type} ${p.year}` : `${type} · Semester ${p.semester} · ${p.year}`;
}

/** Human file size, 1024-based to match what phones show in their file managers. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}
