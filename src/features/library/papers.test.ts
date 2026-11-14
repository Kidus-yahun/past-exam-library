import { describe, expect, it } from "vitest";
import { formatBytes, groupPapers, type PaperSummary, paperTitle } from "./papers";

let n = 0;
function paper(overrides: Partial<PaperSummary>): PaperSummary {
  n += 1;
  return {
    id: `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`,
    grade: 12,
    subject: "physics",
    semester: 1,
    exam_type: "mid1",
    year: 2024,
    storage_path: `g12/physics/${n}.pdf`,
    size_bytes: 1000,
    question_count: 0,
    ...overrides,
  };
}

describe("formatBytes", () => {
  it.each([
    [512, "512 B"],
    [33_015, "32 KB"],
    [873_723, "853 KB"],
    [1_182_634, "1.1 MB"],
    [11_805_366, "11.3 MB"],
  ])("formats %i as %s", (bytes, expected) => {
    expect(formatBytes(bytes)).toBe(expected);
  });
});

describe("groupPapers", () => {
  it("orders newest year first, semester 1 before 2, exams in sitting order, national last", () => {
    const papers = [
      paper({ semester: null, exam_type: "model" }),
      paper({ semester: 2, exam_type: "mid1" }),
      paper({ semester: 1, exam_type: "final" }),
      paper({ semester: 1, exam_type: "mid1" }),
      paper({ semester: 1, exam_type: "mid1", year: 2023 }),
      paper({ semester: null, exam_type: "pretest" }),
    ];

    const groups = groupPapers(papers);

    expect(groups.map((g) => g.label)).toEqual([
      "Semester 1 · 2024",
      "Semester 2 · 2024",
      "Semester 1 · 2023",
      "National exam prep",
    ]);
    expect(groups[0]?.papers.map((p) => p.exam_type)).toEqual(["mid1", "final"]);
    expect(groups[3]?.papers.map((p) => p.exam_type)).toEqual(["pretest", "model"]);
  });

  it("returns no groups for no papers", () => {
    expect(groupPapers([])).toEqual([]);
  });
});

describe("paperTitle", () => {
  it("adds the year only to national papers, whose group label has none", () => {
    expect(paperTitle(paper({ exam_type: "mid2" }))).toBe("Mid 2");
    expect(paperTitle(paper({ semester: null, exam_type: "model" }))).toBe("Model exam 2024");
  });
});
