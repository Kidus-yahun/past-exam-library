import { z } from "zod";

export const Question = z.object({
  id: z.uuid(),
  body: z.string(),
  options: z.array(z.string()).min(2),
  correct_index: z.number().int().nonnegative(),
  explanation: z.string().nullable(),
});
export type Question = z.infer<typeof Question>;

export type Mode = "practice" | "exam";

export type SessionState = {
  mode: Mode;
  questions: Question[];
  index: number;
  /** Chosen option per question id. */
  answers: Record<string, number>;
  flagged: string[];
  finished: boolean;
};

/** Exam mode allows this long per question (the old app's pace for school exams). */
export const EXAM_SECONDS_PER_QUESTION = 90;

export function createSession(
  mode: Mode,
  questions: Question[],
  answers: Record<string, number> = {},
): SessionState {
  const firstUnanswered = questions.findIndex((q) => answers[q.id] === undefined);
  return {
    mode,
    questions,
    index: firstUnanswered === -1 ? 0 : firstUnanswered,
    answers,
    flagged: [],
    finished: false,
  };
}

export const current = (s: SessionState): Question | undefined => s.questions[s.index];

/** In practice mode an answer is final once given (feedback is shown); in exam mode it can change until submitted. */
export function canAnswer(s: SessionState, questionId: string): boolean {
  if (s.finished) return false;
  return s.mode === "exam" || s.answers[questionId] === undefined;
}

export function answer(s: SessionState, questionId: string, option: number): SessionState {
  if (!canAnswer(s, questionId)) return s;
  return { ...s, answers: { ...s.answers, [questionId]: option } };
}

export function goTo(s: SessionState, index: number): SessionState {
  const clamped = Math.max(0, Math.min(s.questions.length - 1, index));
  return clamped === s.index ? s : { ...s, index: clamped };
}

export function toggleFlag(s: SessionState, questionId: string): SessionState {
  return {
    ...s,
    flagged: s.flagged.includes(questionId)
      ? s.flagged.filter((id) => id !== questionId)
      : [...s.flagged, questionId],
  };
}

export const finish = (s: SessionState): SessionState => ({ ...s, finished: true });

export const isLast = (s: SessionState) => s.index === s.questions.length - 1;
export const answeredCount = (s: SessionState) =>
  s.questions.filter((q) => s.answers[q.id] !== undefined).length;

export type QuestionStatus = "correct" | "wrong" | "answered" | "unanswered";

/** What the question map shows: right/wrong only where the student is allowed to know. */
export function statusOf(s: SessionState, q: Question): QuestionStatus {
  const chosen = s.answers[q.id];
  if (chosen === undefined) return "unanswered";
  if (s.mode === "exam" && !s.finished) return "answered";
  return chosen === q.correct_index ? "correct" : "wrong";
}

export type Score = { correct: number; total: number; percent: number; wrong: Question[] };

export function score(s: SessionState): Score {
  const wrong = s.questions.filter((q) => s.answers[q.id] !== q.correct_index);
  const correct = s.questions.length - wrong.length;
  const total = s.questions.length;
  return { correct, total, percent: total === 0 ? 0 : Math.round((correct / total) * 100), wrong };
}

/** XP: 10 per correct answer, 2 per attempted one, so trying is rewarded too. */
export function xpFor(s: SessionState): number {
  const { correct } = score(s);
  return correct * 10 + answeredCount(s) * 2;
}

export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/** Fisher–Yates with an injectable random source so tests are deterministic. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j] as T, out[i] as T];
  }
  return out;
}
