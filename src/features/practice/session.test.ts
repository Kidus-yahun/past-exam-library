import { describe, expect, it } from "vitest";
import {
  answer,
  answeredCount,
  canAnswer,
  createSession,
  finish,
  formatClock,
  goTo,
  type Question,
  score,
  shuffle,
  statusOf,
  toggleFlag,
  xpFor,
} from "./session";

const q = (n: number, correct = 1): Question => ({
  id: `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`,
  body: `Question ${n}`,
  options: ["A", "B", "C", "D"],
  correct_index: correct,
  explanation: null,
});
const questions = [q(1), q(2), q(3)];
const [q1, q2, q3] = questions as [Question, Question, Question];

describe("practice mode", () => {
  it("locks an answer once given so feedback can't be gamed", () => {
    let s = createSession("practice", questions);
    s = answer(s, q1.id, 3);
    expect(canAnswer(s, q1.id)).toBe(false);
    s = answer(s, q1.id, 1);
    expect(s.answers[q1.id]).toBe(3);
    expect(statusOf(s, q1)).toBe("wrong");
  });
});

describe("exam mode", () => {
  it("lets answers change and hides correctness until finished", () => {
    let s = createSession("exam", questions);
    s = answer(s, q1.id, 0);
    s = answer(s, q1.id, 1);
    expect(s.answers[q1.id]).toBe(1);
    expect(statusOf(s, q1)).toBe("answered");
    s = finish(s);
    expect(statusOf(s, q1)).toBe("correct");
    expect(canAnswer(s, q2.id)).toBe(false);
  });
});

describe("navigation and flags", () => {
  it("clamps to the question range", () => {
    const s = createSession("exam", questions);
    expect(goTo(s, -4).index).toBe(0);
    expect(goTo(s, 99).index).toBe(2);
  });

  it("resumes at the first unanswered question", () => {
    const s = createSession("practice", questions, { [q1.id]: 1, [q2.id]: 0 });
    expect(s.index).toBe(2);
  });

  it("toggles flags", () => {
    let s = createSession("exam", questions);
    s = toggleFlag(s, q2.id);
    expect(s.flagged).toEqual([q2.id]);
    s = toggleFlag(s, q2.id);
    expect(s.flagged).toEqual([]);
  });
});

describe("scoring", () => {
  it("counts unanswered questions as wrong and rewards attempts with XP", () => {
    let s = createSession("exam", questions);
    s = answer(s, q1.id, 1); // correct
    s = answer(s, q2.id, 0); // wrong
    s = finish(s);
    const result = score(s);
    expect(result).toMatchObject({ correct: 1, total: 3, percent: 33 });
    expect(result.wrong.map((w) => w.id)).toEqual([q2.id, q3.id]);
    expect(answeredCount(s)).toBe(2);
    expect(xpFor(s)).toBe(14);
  });
});

describe("helpers", () => {
  it("formats a countdown clock", () => {
    expect(formatClock(0)).toBe("0:00");
    expect(formatClock(65)).toBe("1:05");
    expect(formatClock(2700)).toBe("45:00");
    expect(formatClock(-3)).toBe("0:00");
  });

  it("shuffles without losing items", () => {
    const sequence = [0.1, 0.9, 0.5, 0.3];
    let i = 0;
    const out = shuffle([1, 2, 3, 4, 5], () => sequence[i++ % sequence.length] ?? 0);
    expect([...out].sort()).toEqual([1, 2, 3, 4, 5]);
  });
});
