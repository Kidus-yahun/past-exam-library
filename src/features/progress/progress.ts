import { z } from "zod";

export const Progress = z.object({
  xp: z.number().int(),
  answered: z.number().int(),
  correct: z.number().int(),
  today_answered: z.number().int(),
  today_focus_minutes: z.number().int().default(0),
  /** Today in Ethiopian time, YYYY-MM-DD. */
  today: z.string(),
  /** Days with at least one answer, newest first, YYYY-MM-DD. */
  days: z.array(z.string()),
  subjects: z.array(
    z.object({
      subject: z.string(),
      name: z.string(),
      answered: z.number().int(),
      correct: z.number().int(),
    }),
  ),
});
export type Progress = z.infer<typeof Progress>;

const DAY_MS = 24 * 60 * 60 * 1000;
const toTime = (day: string) => Date.parse(`${day}T00:00:00Z`);
const toDay = (time: number) => new Date(time).toISOString().slice(0, 10);

export type Streak = { current: number; longest: number; activeToday: boolean };

/**
 * A streak is a run of consecutive study days. It stays alive through today
 * even before the student has studied, so it only breaks after a missed day.
 */
export function streakFrom(days: readonly string[], today: string): Streak {
  const set = new Set(days);
  const activeToday = set.has(today);

  let current = 0;
  let cursor = activeToday ? toTime(today) : toTime(today) - DAY_MS;
  while (set.has(toDay(cursor))) {
    current += 1;
    cursor -= DAY_MS;
  }

  let longest = 0;
  let run = 0;
  let previous: number | null = null;
  for (const day of [...set].sort()) {
    const time = toTime(day);
    run = previous !== null && time - previous === DAY_MS ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = time;
  }

  return { current, longest: Math.max(longest, current), activeToday };
}

export type WeekDay = {
  day: string;
  label: string;
  done: boolean;
  isToday: boolean;
  future: boolean;
};

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Monday-to-Sunday strip for the week containing `today`. */
export function weekStrip(days: readonly string[], today: string): WeekDay[] {
  const set = new Set(days);
  const todayTime = toTime(today);
  const mondayOffset = (new Date(todayTime).getUTCDay() + 6) % 7;
  const monday = todayTime - mondayOffset * DAY_MS;
  return WEEKDAY_LABELS.map((label, i) => {
    const time = monday + i * DAY_MS;
    const day = toDay(time);
    return {
      day,
      label: time === todayTime ? "Today" : label,
      done: set.has(day),
      isToday: time === todayTime,
      future: time > todayTime,
    };
  });
}

export type Strength = "weak" | "building" | "good" | "strong";

/** Too few answers says nothing about a subject, so it isn't rated yet. */
export const MIN_ANSWERS_FOR_STRENGTH = 5;

export function strengthOf(correct: number, answered: number): Strength | null {
  if (answered < MIN_ANSWERS_FOR_STRENGTH) return null;
  const accuracy = correct / answered;
  if (accuracy < 0.5) return "weak";
  if (accuracy < 0.7) return "building";
  if (accuracy < 0.85) return "good";
  return "strong";
}

export const STRENGTH_LEVEL: Record<Strength, number> = {
  weak: 1,
  building: 2,
  good: 3,
  strong: 4,
};
export const STRENGTH_LABEL: Record<Strength, string> = {
  weak: "Weak",
  building: "Building",
  good: "Good",
  strong: "Strong",
};

/** Subjects most worth reviewing: rated ones, weakest first. */
export function weakestSubjects(progress: Progress, limit = 3) {
  return progress.subjects
    .map((s) => ({ ...s, strength: strengthOf(s.correct, s.answered) }))
    .filter(
      (s): s is typeof s & { strength: Strength } => s.strength !== null && s.strength !== "strong",
    )
    .sort((a, b) => a.correct / a.answered - b.correct / b.answered)
    .slice(0, limit);
}

/** Exam mode allows 90 s a question, so that is the pace used for "minutes studied". */
export const minutesFromAnswers = (answers: number) => Math.round(answers * 1.5);
