import { describe, expect, it } from "vitest";
import {
  minutesFromAnswers,
  type Progress,
  streakFrom,
  strengthOf,
  weakestSubjects,
  weekStrip,
} from "./progress";

describe("streakFrom", () => {
  it("counts consecutive days ending today", () => {
    expect(
      streakFrom(["2026-11-14", "2026-11-13", "2026-11-12", "2026-11-09"], "2026-11-14"),
    ).toEqual({
      current: 3,
      longest: 3,
      activeToday: true,
    });
  });

  it("keeps yesterday's streak alive before today's study", () => {
    expect(streakFrom(["2026-11-13", "2026-11-12"], "2026-11-14")).toMatchObject({
      current: 2,
      activeToday: false,
    });
  });

  it("breaks after a missed day but remembers the longest run", () => {
    const days = ["2026-11-12", "2026-11-05", "2026-11-04", "2026-11-03", "2026-11-02"];
    expect(streakFrom(days, "2026-11-14")).toEqual({ current: 0, longest: 4, activeToday: false });
  });

  it("is zero with no study days", () => {
    expect(streakFrom([], "2026-11-14")).toEqual({ current: 0, longest: 0, activeToday: false });
  });
});

describe("weekStrip", () => {
  it("runs Monday to Sunday around today (a Saturday)", () => {
    const strip = weekStrip(["2026-11-09", "2026-11-14"], "2026-11-14");
    expect(strip.map((d) => d.day)).toEqual([
      "2026-11-09",
      "2026-11-10",
      "2026-11-11",
      "2026-11-12",
      "2026-11-13",
      "2026-11-14",
      "2026-11-15",
    ]);
    expect(strip.map((d) => d.done)).toEqual([true, false, false, false, false, true, false]);
    expect(strip[5]).toMatchObject({ label: "Today", isToday: true });
    expect(strip[6]?.future).toBe(true);
  });
});

describe("strength", () => {
  it("rates only after enough answers", () => {
    expect(strengthOf(2, 4)).toBeNull();
    expect(strengthOf(2, 5)).toBe("weak");
    expect(strengthOf(3, 5)).toBe("building");
    expect(strengthOf(4, 5)).toBe("good");
    expect(strengthOf(9, 10)).toBe("strong");
  });

  it("lists the weakest rated subjects first and skips strong ones", () => {
    const progress: Progress = {
      xp: 0,
      answered: 0,
      correct: 0,
      today_answered: 0,
      today_focus_minutes: 0,
      today: "2026-11-14",
      days: [],
      subjects: [
        { subject: "physics", name: "Physics", answered: 10, correct: 6 },
        { subject: "biology", name: "Biology", answered: 10, correct: 3 },
        { subject: "maths", name: "Mathematics", answered: 10, correct: 10 },
        { subject: "english", name: "English", answered: 2, correct: 0 },
      ],
    };
    expect(weakestSubjects(progress).map((s) => s.subject)).toEqual(["biology", "physics"]);
  });
});

it("estimates minutes at exam pace", () => {
  expect(minutesFromAnswers(20)).toBe(30);
});
