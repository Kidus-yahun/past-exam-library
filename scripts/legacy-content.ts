/**
 * Reads the unit notes and formula sheets that the original app kept as
 * object literals inside legacy/script.js. Only those literals are evaluated,
 * in an empty sandbox with a time limit; nothing else in the file runs.
 */
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { z } from "zod";

function readLiteral(source: string, name: string): unknown {
  const declaration = source.indexOf(`const ${name} = `);
  if (declaration === -1) throw new Error(`${name} not found in legacy/script.js`);
  const open = source.indexOf("{", declaration);
  let depth = 0;
  let quote: string | null = null;
  let escaped = false;
  for (let i = open; i < source.length; i++) {
    const c = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) {
      return vm.runInNewContext(`(${source.slice(open, i + 1)})`, Object.create(null), {
        timeout: 1000,
      });
    }
  }
  throw new Error(`${name} is not a complete object literal`);
}

const LegacyUnit = z.object({
  title: z.string(),
  examWeight: z.string().optional(),
  readTime: z.string().optional(),
  overview: z.string(),
  keyFormulas: z
    .array(z.object({ name: z.string(), formula: z.string(), notes: z.string().optional() }))
    .default([]),
  workedExample: z
    .object({ question: z.string(), steps: z.array(z.string()), answer: z.string() })
    .optional(),
  pitfalls: z.string().optional(),
});

const LegacyFormula = z.object({
  title: z.string(),
  topic: z.string(),
  grades: z.array(z.string()).default([]),
  displayMath: z.string(),
  variables: z.string().optional(),
  tip: z.string().optional(),
});

/** The legacy notes used only <br>, <strong> and <code>; turn them into light markdown. */
export function htmlToLightMarkdown(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?strong>/gi, "**")
    .replace(/<\/?code>/gi, "`")
    .replace(/<[^>]+>/g, "")
    .split("\n")
    .map((line) => line.trim().replace(/^•\s*/, "- "))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const SUBJECT_IDS: Record<string, string> = {
  Mathematics: "mathematics",
  Physics: "physics",
  Chemistry: "chemistry",
  Biology: "biology",
  English: "english",
  math: "mathematics",
  physics: "physics",
  chem: "chemistry",
  bio: "biology",
};

export function readLegacyContent(scriptPath: string) {
  const source = readFileSync(scriptPath, "utf8");
  const notes = z
    .record(z.string(), z.array(LegacyUnit))
    .parse(readLiteral(source, "EXAM_UNIT_NOTES"));
  const sheets = z
    .record(z.string(), z.array(LegacyFormula))
    .parse(readLiteral(source, "FORMULA_DATA"));

  const units = Object.entries(notes).flatMap(([key, list]) => {
    const [gradeLabel = "", subjectName = ""] = key.split("_");
    const grade = Number(gradeLabel.replace(/\D/g, ""));
    const subject = SUBJECT_IDS[subjectName];
    if (!subject || grade < 9 || grade > 12) throw new Error(`Unknown notes key "${key}"`);
    return list.map((unit, index) => {
      const match = /^Unit\s+(\d+)\s*:\s*(.+)$/i.exec(unit.title.trim());
      return {
        grade,
        subject,
        position: match ? Number(match[1]) : index + 1,
        title: (match?.[2] ?? unit.title).trim(),
        exam_weight: unit.examWeight?.trim() || null,
        read_minutes: Number(unit.readTime?.match(/\d+/)?.[0]) || null,
        overview: htmlToLightMarkdown(unit.overview),
        formulas: unit.keyFormulas.map((f) => ({
          name: f.name,
          latex: f.formula,
          notes: f.notes ?? null,
        })),
        worked_example: unit.workedExample ?? null,
        pitfall: unit.pitfalls ? htmlToLightMarkdown(unit.pitfalls) : null,
      };
    });
  });

  const formulas = Object.entries(sheets).flatMap(([key, list]) => {
    const subject = SUBJECT_IDS[key];
    if (!subject) throw new Error(`Unknown formula sheet "${key}"`);
    return list.map((f, position) => ({
      subject,
      topic: f.topic,
      title: f.title,
      display: f.displayMath,
      variables: f.variables ?? null,
      tip: f.tip ?? null,
      grades: f.grades.map((g) => Number(g.replace(/\D/g, ""))).filter((g) => g >= 9 && g <= 12),
      position,
    }));
  });

  return { units, formulas };
}
