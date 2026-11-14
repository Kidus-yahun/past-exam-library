import { describe, expect, it } from "vitest";
import { type SearchablePaper, searchPapers } from "./search";

let n = 0;
const paper = (p: Partial<SearchablePaper>): SearchablePaper => {
  n += 1;
  return {
    id: `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`,
    grade: 12,
    subject: "physics",
    subjectName: "Physics",
    semester: 1,
    exam_type: "mid1",
    year: 2024,
    storage_path: `x/${n}.pdf`,
    size_bytes: 1,
    question_count: 0,
    ...p,
  };
};

const papers = [
  paper({ grade: 12, subject: "physics", subjectName: "Physics", exam_type: "final" }),
  paper({ grade: 12, subject: "physics", subjectName: "Physics", exam_type: "mid1" }),
  paper({ grade: 10, subject: "biology", subjectName: "Biology", exam_type: "mid2" }),
  paper({
    grade: 12,
    subject: "biology",
    subjectName: "Biology",
    semester: null,
    exam_type: "model",
  }),
];

describe("searchPapers", () => {
  it("needs every word to match", () => {
    expect(searchPapers(papers, "g12 physics final").map((p) => p.exam_type)).toEqual(["final"]);
  });

  it("understands 'mid 2' and grade words", () => {
    expect(searchPapers(papers, "biology mid 2").map((p) => p.grade)).toEqual([10]);
    expect(searchPapers(papers, "grade 10")).toHaveLength(1);
  });

  it("finds national prep papers", () => {
    expect(searchPapers(papers, "model").map((p) => p.subject)).toEqual(["biology"]);
  });

  it("returns nothing for an empty query", () => {
    expect(searchPapers(papers, "   ")).toEqual([]);
  });
});
