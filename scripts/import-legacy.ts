/**
 * Imports the legacy JSON database (legacy/data/db.json) and the PDFs under
 * exams/ into Supabase: papers go to the `papers` storage bucket and table,
 * questions to `questions`. Safe to re-run: rows upsert on their legacy id.
 *
 * Needs a service-role key, so run it only against a database you control.
 * Locally it reads the key from `supabase status`:   bun run db:import
 * Against a hosted project, set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "../src/lib/database.types";

const ROOT = join(import.meta.dir, "..");

function localSupabase(): { url?: string; key?: string } {
  const result = Bun.spawnSync(["bunx", "supabase", "status", "-o", "json"], { cwd: ROOT });
  if (result.exitCode !== 0) return {};
  const status = z
    .object({ API_URL: z.string(), SERVICE_ROLE_KEY: z.string() })
    .safeParse(JSON.parse(result.stdout.toString()));
  return status.success ? { url: status.data.API_URL, key: status.data.SERVICE_ROLE_KEY } : {};
}

const fromEnv = { url: process.env.SUPABASE_URL, key: process.env.SUPABASE_SERVICE_ROLE_KEY };
const { url, key: serviceKey } = fromEnv.url && fromEnv.key ? fromEnv : localSupabase();
if (!url || !serviceKey) {
  console.error(
    "Start local Supabase (bun run db:start) or set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
  );
  process.exit(1);
}
console.log(`Importing into ${url}`);
const db = createClient<Database>(url, serviceKey, { auth: { persistSession: false } });

const LegacyExam = z.object({
  id: z.string(),
  grade: z.string(),
  semester: z.string(),
  examType: z.string(),
  subject: z.string(),
  year: z.string(),
  fileUrl: z.string(),
});
const LegacyQuestion = z.object({
  id: z.string(),
  examId: z.string(),
  grade: z.string(),
  subject: z.string(),
  examType: z.string(),
  question: z.string().min(1),
  options: z.array(z.string()).min(2).max(6),
  correctAnswer: z.number().int().nonnegative(),
  explanation: z.string().optional(),
});
const LegacyDb = z.object({ exams: z.array(LegacyExam), questions: z.array(LegacyQuestion) });

const SUBJECTS: Record<string, string> = {
  Amharic: "amharic",
  English: "english",
  Mathematics: "mathematics",
  Physics: "physics",
  Chemistry: "chemistry",
  Biology: "biology",
  History: "history",
  Geography: "geography",
  Economics: "economics",
  IT: "it",
  Citizenship: "citizenship",
  HP: "hpe",
  Agriculture: "agriculture",
  Aptitude: "aptitude",
  WEB: "web",
};

type ExamType = Database["public"]["Enums"]["exam_type"];
const EXAM_TYPES: Record<string, ExamType> = {
  Mid1: "mid1",
  Mid2: "mid2",
  Final: "final",
  "Final Exam": "final",
  Model: "model",
  Pretest: "pretest",
};

function gradeNumber(raw: string): number {
  const n = Number(raw.replace(/\D/g, ""));
  if (n < 9 || n > 12) throw new Error(`Unknown grade "${raw}"`);
  return n;
}

function required<T>(map: Record<string, T>, key: string, what: string): T {
  const value = map[key];
  if (value === undefined) throw new Error(`Unknown ${what} "${key}"`);
  return value;
}

async function inBatches<T>(rows: T[], size: number, fn: (batch: T[]) => Promise<void>) {
  for (let i = 0; i < rows.length; i += size) await fn(rows.slice(i, i + size));
}

const legacy = LegacyDb.parse(JSON.parse(readFileSync(join(ROOT, "legacy/data/db.json"), "utf8")));

// --- Papers ---------------------------------------------------------------
const paperIdByLegacyId = new Map<string, string>();
const usedPaths = new Set<string>();
const skipped: string[] = [];

for (const exam of legacy.exams) {
  const localFile = join(ROOT, decodeURIComponent(exam.fileUrl).replace(/^\/+/, ""));
  if (!existsSync(localFile)) {
    skipped.push(exam.fileUrl);
    continue;
  }
  const grade = gradeNumber(exam.grade);
  const subject = required(SUBJECTS, exam.subject, "subject");
  const examType = required(EXAM_TYPES, exam.examType, "exam type");
  const semester =
    examType === "model" || examType === "pretest" ? null : exam.semester.endsWith("2") ? 2 : 1;
  const year = Number(exam.year);

  let storagePath = `g${grade}/${subject}/${semester ? `s${semester}-` : ""}${examType}-${year}.pdf`;
  if (usedPaths.has(storagePath)) storagePath = storagePath.replace(/\.pdf$/, `-${exam.id}.pdf`);
  usedPaths.add(storagePath);

  const upload = await db.storage
    .from("papers")
    .upload(storagePath, readFileSync(localFile), { contentType: "application/pdf", upsert: true });
  if (upload.error) throw new Error(`Upload ${storagePath}: ${upload.error.message}`);

  const { data, error } = await db
    .from("papers")
    .upsert(
      {
        legacy_id: exam.id,
        grade,
        subject,
        semester,
        exam_type: examType,
        year,
        storage_path: storagePath,
        size_bytes: statSync(localFile).size,
      },
      { onConflict: "legacy_id" },
    )
    .select("id")
    .single();
  if (error) throw new Error(`Paper ${exam.id}: ${error.message}`);
  paperIdByLegacyId.set(exam.id, data.id);
}

// --- Questions --------------------------------------------------------------
const questionRows = legacy.questions
  .filter((q) => q.correctAnswer < q.options.length)
  .map((q) => ({
    legacy_id: q.id,
    paper_id: paperIdByLegacyId.get(q.examId) ?? null,
    grade: gradeNumber(q.grade),
    subject: required(SUBJECTS, q.subject, "subject"),
    body: q.question.trim(),
    options: q.options.map((o) => o.trim()),
    correct_index: q.correctAnswer,
    explanation: q.explanation?.trim() || null,
    // The batch labelled "Final Exam" contains questions filed under the wrong
    // subject (e.g. singing technique under Grade 12 Physics). Hold them back
    // from practice until someone reviews them.
    needs_review: q.examType === "Final Exam",
  }));

await inBatches(questionRows, 500, async (batch) => {
  const { error } = await db.from("questions").upsert(batch, { onConflict: "legacy_id" });
  if (error) throw new Error(`Questions: ${error.message}`);
});

const invalid = legacy.questions.length - questionRows.length;
const flagged = questionRows.filter((q) => q.needs_review).length;
console.log(
  `Papers imported: ${paperIdByLegacyId.size} (skipped ${skipped.length} with no local PDF)`,
);
console.log(
  `Questions imported: ${questionRows.length} (${flagged} flagged for review, ${invalid} invalid)`,
);
