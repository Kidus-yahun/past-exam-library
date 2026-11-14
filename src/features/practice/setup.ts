import { fetchPaper, fetchSubjects, type Grade } from "~/features/library/api";
import { paperLabel } from "~/features/library/papers";
import { fetchAttempt, fetchMixedQuestions, fetchPaperQuestions, fetchQuestionsByIds } from "./api";
import type { Mode, Question } from "./session";

/** Everything a session screen needs before the first question shows. */
export type SessionSetup = {
  title: string;
  subtitle: string;
  grade: number;
  subject: string;
  paperId: string | null;
  mode: Mode;
  questions: Question[];
  answers: Record<string, number>;
  attemptId: string | null;
  startedAt: string | null;
  finishedAt: string | null;
  finished: boolean;
};

export type SessionParams = {
  attempt?: string;
  paper?: string;
  grade?: string;
  subject?: string;
  mode?: string;
};

export class NotFound extends Error {}

const parseMode = (raw: string | undefined): Mode => (raw === "exam" ? "exam" : "practice");

export async function loadSession(params: SessionParams): Promise<SessionSetup> {
  if (params.attempt) {
    const attempt = await fetchAttempt(params.attempt);
    if (!attempt) throw new NotFound("attempt");
    return {
      title: attempt.subjects.name,
      subtitle: attempt.papers ? paperLabel(attempt.papers) : "Mixed practice",
      grade: attempt.grade,
      subject: attempt.subject,
      paperId: attempt.paper_id,
      mode: attempt.mode,
      questions: await fetchQuestionsByIds(attempt.question_ids),
      answers: Object.fromEntries(attempt.answers.map((a) => [a.question_id, a.chosen_index])),
      attemptId: attempt.id,
      startedAt: attempt.started_at,
      finishedAt: attempt.finished_at,
      finished: attempt.finished_at !== null,
    };
  }

  if (params.paper) {
    const [paper, questions] = await Promise.all([
      fetchPaper(params.paper),
      fetchPaperQuestions(params.paper),
    ]);
    if (!paper || questions.length === 0) throw new NotFound("paper");
    return {
      title: paper.subjectName,
      subtitle: paperLabel(paper),
      grade: paper.grade,
      subject: paper.subject,
      paperId: paper.id,
      mode: parseMode(params.mode),
      questions,
      answers: {},
      attemptId: null,
      startedAt: null,
      finishedAt: null,
      finished: false,
    };
  }

  const grade = Number(params.grade);
  if (params.subject && grade >= 9 && grade <= 12) {
    const [subjects, questions] = await Promise.all([
      fetchSubjects(grade as Grade),
      fetchMixedQuestions(grade, params.subject),
    ]);
    const subject = subjects.find((s) => s.id === params.subject);
    if (!subject || questions.length === 0) throw new NotFound("subject");
    return {
      title: subject.name,
      subtitle: `Mixed practice · Grade ${grade}`,
      grade,
      subject: subject.id,
      paperId: null,
      mode: parseMode(params.mode),
      questions,
      answers: {},
      attemptId: null,
      startedAt: null,
      finishedAt: null,
      finished: false,
    };
  }

  throw new NotFound("session");
}
