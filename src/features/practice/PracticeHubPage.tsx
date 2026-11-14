import { A } from "@solidjs/router";
import { useQuery } from "@tanstack/solid-query";
import { createMemo, For, Match, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import { fetchPapers } from "~/features/library/api";
import { GradeSubjectPicker, useGradeSubject } from "~/features/library/GradeSubjectPicker";
import { paperLabel } from "~/features/library/papers";
import { userId } from "~/lib/auth";
import { ChevronRightIcon } from "~/ui/icons";
import { button, Page, panel, quietButton } from "~/ui/Page";
import { ListSkeleton } from "~/ui/Skeleton";
import {
  fetchSubjectQuestionCount,
  fetchUnfinishedAttempts,
  MIXED_SET_SIZE,
  type UnfinishedAttempt,
} from "./api";
import { EXAM_SECONDS_PER_QUESTION } from "./session";

const styles = {
  eyebrow: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "8px" }),
  list: css({ listStyle: "none", overflow: "hidden" }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    px: "16px",
    py: "14px",
    borderBottom: "1px solid {colors.line}",
    _last: { borderBottom: 0 },
  }),
  rowBody: css({ flex: "1 1 220px", minW: 0 }),
  rowTitle: css({ fontSize: "15px", fontWeight: "600" }),
  rowMeta: css({ mt: "3px", fontSize: "12.5px", color: "ink.subtle" }),
  rowActions: css({ display: "flex", gap: "8px" }),
  smallButton: css({ minH: "40px", px: "14px", fontSize: "14px" }),
  mixed: css({
    p: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  }),
  resume: css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    px: "16px",
    py: "14px",
    borderBottom: "1px solid {colors.line}",
    transition: "background-color 120ms ease-out",
    _hover: { bg: "hover" },
    _last: { borderBottom: 0 },
  }),
  bar: css({ h: "6px", rounded: "3px", bg: "sunk", overflow: "hidden", mt: "8px", maxW: "220px" }),
  notice: css({ p: "20px", fontSize: "14.5px", color: "ink.muted" }),
};

export function attemptLabel(a: UnfinishedAttempt) {
  return `${a.subjects.name} · ${a.papers ? paperLabel(a.papers) : "Mixed practice"}`;
}

const examMinutes = (questions: number) => Math.round((questions * EXAM_SECONDS_PER_QUESTION) / 60);

function ResumeList() {
  const attempts = useQuery(() => ({
    queryKey: ["attempts", "unfinished", userId()],
    queryFn: () => fetchUnfinishedAttempts(),
    enabled: userId() !== null,
  }));

  return (
    <Show when={(attempts.data?.length ?? 0) > 0}>
      <section aria-labelledby="resume">
        <h2 id="resume" class={styles.eyebrow}>
          Pick up where you left off
        </h2>
        <ul class={`${panel} ${styles.list}`}>
          <For each={attempts.data}>
            {(a) => {
              const done = a.answers[0]?.count ?? 0;
              const total = a.question_ids.length;
              return (
                <li>
                  <A href={`/practice/session?attempt=${a.id}`} class={styles.resume}>
                    <div class={css({ flex: 1, minW: 0 })}>
                      <p class={styles.rowTitle}>{attemptLabel(a)}</p>
                      <p class={styles.rowMeta}>
                        {a.mode === "exam" ? "Exam mode" : "Practice"} ·{" "}
                        <span class="mono">
                          {done}/{total}
                        </span>{" "}
                        answered
                      </p>
                      <div
                        class={styles.bar}
                        role="img"
                        aria-label={`${done} of ${total} answered`}
                      >
                        <span
                          class={css({ display: "block", h: "100%", bg: "brand" })}
                          style={{ width: `${(done / total) * 100}%` }}
                        />
                      </div>
                    </div>
                    <ChevronRightIcon size={18} class={css({ color: "ink.subtle" })} />
                  </A>
                </li>
              );
            }}
          </For>
        </ul>
      </section>
    </Show>
  );
}

export default function PracticeHubPage() {
  const picker = useGradeSubject();

  const papers = useQuery(() => ({
    queryKey: ["papers", picker.grade(), picker.subject()?.id],
    queryFn: () => fetchPapers(picker.grade(), picker.subject()?.id ?? ""),
    enabled: picker.subject() !== undefined,
  }));
  const practiceable = createMemo(() =>
    (papers.data ?? [])
      .filter((p) => p.question_count > 0)
      .sort((a, b) => b.year - a.year || (a.semester ?? 9) - (b.semester ?? 9)),
  );

  const questionCount = useQuery(() => ({
    queryKey: ["question-count", picker.grade(), picker.subject()?.id],
    queryFn: () => fetchSubjectQuestionCount(picker.grade(), picker.subject()?.id ?? ""),
    enabled: picker.subject() !== undefined,
  }));

  const sessionHref = (mode: "practice" | "exam", paperId?: string) =>
    paperId
      ? `/practice/session?paper=${paperId}&mode=${mode}`
      : `/practice/session?grade=${picker.grade()}&subject=${picker.subject()?.id}&mode=${mode}`;

  const mixedSize = () => Math.min(MIXED_SET_SIZE, questionCount.data ?? 0);

  return (
    <Page
      title="Practice"
      lede="Real exam questions. Practice shows each answer as you go; exam mode is timed and marked at the end."
    >
      <ResumeList />
      <GradeSubjectPicker state={picker} />

      <Switch>
        <Match when={papers.isError || questionCount.isError}>
          <div class={`${panel} ${styles.notice}`} role="alert">
            Couldn't load questions. Check your connection and try again.
          </div>
        </Match>
        <Match when={papers.isPending || questionCount.isPending}>
          <ListSkeleton label="Loading practice sets" />
        </Match>
        <Match when={(questionCount.data ?? 0) === 0}>
          <div class={`${panel} ${styles.notice}`}>
            No practice questions for {picker.subject()?.name} in Grade {picker.grade()} yet. The
            papers are still in the{" "}
            <A
              href={`/library?grade=${picker.grade()}&subject=${picker.subject()?.id}`}
              class={css({ color: "brand", fontWeight: "600" })}
            >
              library
            </A>
            .
          </div>
        </Match>
        <Match when={true}>
          <section aria-labelledby="mixed" class={`${panel} ${styles.mixed}`}>
            <div>
              <h2 id="mixed" class={styles.rowTitle}>
                Mixed {picker.subject()?.name}
              </h2>
              <p class={styles.rowMeta}>
                {mixedSize()} questions picked at random from{" "}
                <span class="mono">{questionCount.data}</span> across all Grade {picker.grade()}{" "}
                papers
              </p>
            </div>
            <div class={styles.rowActions}>
              <A href={sessionHref("practice")} class={`${button} ${styles.smallButton}`}>
                Practice
              </A>
              <A href={sessionHref("exam")} class={`${quietButton} ${styles.smallButton}`}>
                Exam · {examMinutes(mixedSize())} min
              </A>
            </div>
          </section>

          <Show when={practiceable().length > 0}>
            <section aria-labelledby="by-paper">
              <h2 id="by-paper" class={styles.eyebrow}>
                By paper
              </h2>
              <ul class={`${panel} ${styles.list}`}>
                <For each={practiceable()}>
                  {(paper) => (
                    <li class={styles.row}>
                      <div class={styles.rowBody}>
                        <p class={styles.rowTitle}>{paperLabel(paper)}</p>
                        <p class={styles.rowMeta}>
                          <span class="mono">{paper.question_count}</span> questions
                        </p>
                      </div>
                      <div class={styles.rowActions}>
                        <A
                          href={sessionHref("practice", paper.id)}
                          class={`${button} ${styles.smallButton}`}
                        >
                          Practice
                        </A>
                        <A
                          href={sessionHref("exam", paper.id)}
                          class={`${quietButton} ${styles.smallButton}`}
                        >
                          Exam · {examMinutes(paper.question_count)} min
                        </A>
                      </div>
                    </li>
                  )}
                </For>
              </ul>
            </section>
          </Show>
        </Match>
      </Switch>
    </Page>
  );
}
