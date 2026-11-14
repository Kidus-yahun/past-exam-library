import { useNavigate } from "@solidjs/router";
import { useQueryClient } from "@tanstack/solid-query";
import { createMemo, createSignal, Match, onCleanup, onMount, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import { userId } from "~/lib/auth";
import { ConfirmDialog } from "~/ui/ConfirmDialog";
import { ChevronLeftIcon, ChevronRightIcon } from "~/ui/icons";
import { button, quietButton } from "~/ui/Page";
import { finishAttempt, saveAnswers, startAttempt } from "./api";
import { Explanation, QuestionCard } from "./QuestionCard";
import { QuestionMap } from "./QuestionMap";
import { Results } from "./Results";
import {
  answer,
  answeredCount,
  canAnswer,
  createSession,
  current,
  EXAM_SECONDS_PER_QUESTION,
  finish,
  formatClock,
  goTo,
  isLast,
  type SessionState,
  toggleFlag,
} from "./session";
import type { SessionSetup } from "./setup";

const styles = {
  screen: css({ minH: "100dvh", display: "flex", flexDirection: "column" }),
  bar: css({
    position: "sticky",
    top: 0,
    zIndex: "sticky",
    bg: "surface",
    borderBottom: "1px solid {colors.line}",
  }),
  barRow: css({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minH: "56px",
    px: { base: "8px", md: "16px" },
  }),
  iconButton: css({
    flex: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    minW: "44px",
    minH: "44px",
    px: "10px",
    rounded: "md",
    color: "ink.muted",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 120ms ease-out",
    _hover: { bg: "hover", color: "ink" },
    _disabled: { opacity: 0.35, cursor: "default", _hover: { bg: "transparent" } },
    "&[aria-pressed=true]": { color: "streak.ink", bg: "streak.soft" },
  }),
  titles: css({ flex: 1, minW: 0 }),
  title: css({ fontSize: "15px", fontWeight: "650", lineClamp: 1 }),
  subtitle: css({ fontSize: "12.5px", color: "ink.subtle", lineClamp: 1 }),
  progressTrack: css({ h: "3px", bg: "sunk" }),
  timer: css({
    flex: "none",
    fontFamily: "mono",
    fontSize: "15px",
    fontWeight: "600",
    px: "10px",
    py: "4px",
    rounded: "full",
    bg: "sunk",
    "&[data-low]": { bg: "wrong.soft", color: "wrong" },
  }),
  body: css({
    flex: 1,
    w: "100%",
    maxW: "1120px",
    mx: "auto",
    display: "flex",
    gap: "32px",
    px: { base: "20px", md: "32px" },
    py: { base: "20px", md: "32px" },
    boxSizing: "border-box",
  }),
  main: css({ flex: 1, minW: 0, maxW: "720px", mx: { base: 0, lg: 0 } }),
  side: css({
    hideBelow: "lg",
    w: "300px",
    flexShrink: 0,
    alignSelf: "flex-start",
    position: "sticky",
    top: "88px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }),
  count: css({ fontSize: "13px", color: "ink.subtle", mb: "12px" }),
  feedback: css({
    mt: "20px",
    p: "16px",
    rounded: "lg",
    bg: "surface",
    boxShadow: "inset 0 0 0 1px {colors.line}",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  }),
  footer: css({
    position: "sticky",
    bottom: 0,
    bg: "surface",
    borderTop: "1px solid {colors.line}",
    p: "10px 16px calc(10px + env(safe-area-inset-bottom))",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  }),
  mapSheet: css({
    hideFrom: "lg",
    mt: "24px",
    pt: "20px",
    borderTop: "1px solid {colors.line}",
  }),
  sectionLabel: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "10px" }),
};

type SessionProps = {
  setup: SessionSetup;
  backHref: string;
  /** Start a fresh session with these questions (e.g. the ones just missed). */
  onRestart: (questionIds: string[]) => void;
};

export function Session(props: SessionProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setup = props.setup;

  const [state, setState] = createSignal<SessionState>(
    setup.finished
      ? finish(createSession(setup.mode, setup.questions, setup.answers))
      : createSession(setup.mode, setup.questions, setup.answers),
  );
  const [saveFailed, setSaveFailed] = createSignal(false);
  const [confirm, setConfirm] = createSignal<"exit" | "submit" | null>(null);

  // --- Saving (signed-in students only) --------------------------------------
  let attemptId = setup.attemptId;
  let creating: Promise<string> | null = null;
  const startedAt = setup.startedAt ? Date.parse(setup.startedAt) : Date.now();

  function ensureAttempt(): Promise<string> | null {
    if (!userId()) return null;
    if (attemptId) return Promise.resolve(attemptId);
    creating ??= startAttempt({
      mode: setup.mode,
      grade: setup.grade,
      subject: setup.subject,
      paperId: setup.paperId,
      questionIds: setup.questions.map((q) => q.id),
    }).then((created) => {
      attemptId = created.id;
      return created.id;
    });
    return creating;
  }

  function persist(answers: Record<string, number>) {
    ensureAttempt()
      ?.then((id) => saveAnswers(id, answers))
      .then(() => setSaveFailed(false))
      .catch(() => setSaveFailed(true));
  }

  // --- Clock ------------------------------------------------------------------
  const [now, setNow] = createSignal(Date.now());
  const examSeconds = setup.questions.length * EXAM_SECONDS_PER_QUESTION;
  const elapsed = () => Math.round((now() - startedAt) / 1000);
  const remaining = () => examSeconds - elapsed();
  const [finishedAt, setFinishedAt] = createSignal<number | null>(
    setup.finishedAt ? Date.parse(setup.finishedAt) : null,
  );

  onMount(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
      if (state().mode === "exam" && !state().finished && remaining() <= 0) complete();
    }, 1000);
    onCleanup(() => clearInterval(timer));
  });

  // --- Actions ----------------------------------------------------------------
  const question = createMemo(() => current(state()));

  function choose(option: number) {
    const q = question();
    if (!q || !canAnswer(state(), q.id)) return;
    setState((s) => answer(s, q.id, option));
    persist({ [q.id]: option });
  }

  function complete() {
    if (state().finished) return;
    setState(finish);
    setFinishedAt(Date.now());
    setConfirm(null);
    const id = ensureAttempt();
    id?.then(async (attempt) => {
      await saveAnswers(attempt, state().answers);
      await finishAttempt(attempt);
      await queryClient.invalidateQueries({ queryKey: ["attempts"] });
      await queryClient.invalidateQueries({ queryKey: ["progress"] });
    }).catch(() => setSaveFailed(true));
    window.scrollTo({ top: 0 });
  }

  function next() {
    if (isLast(state())) {
      if (state().mode === "practice") complete();
      else setConfirm("submit");
    } else {
      setState((s) => goTo(s, s.index + 1));
      window.scrollTo({ top: 0 });
    }
  }

  const prev = () => setState((s) => goTo(s, s.index - 1));

  function requestExit() {
    if (state().finished || answeredCount(state()) === 0) navigate(props.backHref);
    else setConfirm("exit");
  }

  // Keyboard: A–F or 1–6 choose, → / Enter next, ← back, F flags (exam).
  onMount(() => {
    const onKey = (e: KeyboardEvent) => {
      if (state().finished || confirm() || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      const key = e.key.toLowerCase();
      const letter = "abcdef".indexOf(key);
      const digit = "123456".indexOf(key);
      const option = letter >= 0 ? letter : digit;
      const q = question();
      if (option >= 0 && q && option < q.options.length) {
        e.preventDefault();
        choose(option);
      } else if (key === "arrowright" || (key === "enter" && !target?.closest("button, a"))) {
        if (state().mode === "exam" || (q && state().answers[q.id] !== undefined)) next();
      } else if (key === "arrowleft" && state().mode === "exam") {
        prev();
      } else if (key === "f" && state().mode === "exam" && q) {
        setState((s) => toggleFlag(s, q.id));
      }
    };
    window.addEventListener("keydown", onKey);
    onCleanup(() => window.removeEventListener("keydown", onKey));
  });

  const answeredCurrent = () => {
    const q = question();
    return q ? state().answers[q.id] !== undefined : false;
  };
  const unanswered = () => state().questions.length - answeredCount(state());
  const isFlagged = () => {
    const q = question();
    return q ? state().flagged.includes(q.id) : false;
  };

  return (
    <div class={styles.screen}>
      <header class={styles.bar}>
        <div class={styles.barRow}>
          <button
            type="button"
            class={styles.iconButton}
            aria-label="Leave practice"
            onClick={requestExit}
          >
            <ChevronLeftIcon />
          </button>
          <div class={styles.titles}>
            <p class={styles.title}>{setup.title}</p>
            <p class={styles.subtitle}>
              {setup.subtitle} · {state().mode === "exam" ? "Exam mode" : "Practice"}
            </p>
          </div>
          <Show when={state().mode === "exam" && !state().finished}>
            <span
              class={styles.timer}
              data-low={remaining() <= 60 ? "" : undefined}
              role="timer"
              aria-label={`${formatClock(remaining())} left`}
            >
              {formatClock(remaining())}
            </span>
          </Show>
        </div>
        <div
          class={styles.progressTrack}
          role="img"
          aria-label={`${answeredCount(state())} of ${state().questions.length} answered`}
        >
          <span
            class={css({
              display: "block",
              h: "100%",
              bg: "brand",
              transition: "width 200ms ease-out",
            })}
            style={{ width: `${(answeredCount(state()) / state().questions.length) * 100}%` }}
          />
        </div>
      </header>

      <div class={styles.body}>
        <main class={styles.main}>
          <Show when={saveFailed()}>
            <p class={css({ mb: "12px", fontSize: "13.5px", color: "wrong" })} role="status">
              Not saved. Check your connection; your answers are kept on this screen.
            </p>
          </Show>

          <Switch>
            <Match when={state().finished}>
              <Results
                state={state()}
                seconds={Math.round(((finishedAt() ?? now()) - startedAt) / 1000)}
                signedIn={userId() !== null}
                backHref={props.backHref}
                onRetryMistakes={() =>
                  props.onRestart(
                    state()
                      .questions.filter((q) => state().answers[q.id] !== q.correct_index)
                      .map((q) => q.id),
                  )
                }
              />
            </Match>
            <Match when={question()}>
              {(q) => (
                <>
                  <p class={styles.count}>
                    Question <span class="mono">{state().index + 1}</span> of{" "}
                    <span class="mono">{state().questions.length}</span>
                  </p>
                  <QuestionCard
                    question={q()}
                    number={state().index + 1}
                    chosen={state().answers[q().id]}
                    reveal={state().mode === "practice" && answeredCurrent()}
                    disabled={!canAnswer(state(), q().id)}
                    onChoose={choose}
                  />
                  <Show when={state().mode === "practice" && answeredCurrent()}>
                    <section class={styles.feedback} aria-live="polite">
                      <Explanation question={q()} chosen={state().answers[q().id]} />
                      <button type="button" class={button} onClick={next}>
                        {isLast(state()) ? "See results" : "Next question"}
                      </button>
                    </section>
                  </Show>
                  <Show when={state().mode === "exam"}>
                    <div class={styles.mapSheet}>
                      <p class={styles.sectionLabel}>All questions</p>
                      <QuestionMap state={state()} onGo={(i) => setState((s) => goTo(s, i))} />
                      <button
                        type="button"
                        class={`${quietButton} ${css({ mt: "16px", w: "100%" })}`}
                        onClick={() => setConfirm("submit")}
                      >
                        Submit exam
                      </button>
                    </div>
                  </Show>
                </>
              )}
            </Match>
          </Switch>
        </main>

        <Show when={!state().finished}>
          <aside class={styles.side} aria-label="Question map">
            <p class={styles.sectionLabel}>
              {answeredCount(state())} of {state().questions.length} answered
            </p>
            <QuestionMap state={state()} onGo={(i) => setState((s) => goTo(s, i))} />
            <Show when={state().mode === "exam"}>
              <button type="button" class={button} onClick={() => setConfirm("submit")}>
                Submit exam
              </button>
            </Show>
          </aside>
        </Show>
      </div>

      <Show when={state().mode === "exam" && !state().finished}>
        <footer class={styles.footer}>
          <button
            type="button"
            class={styles.iconButton}
            aria-label="Previous question"
            disabled={state().index === 0}
            onClick={prev}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            class={styles.iconButton}
            aria-pressed={isFlagged()}
            onClick={() => {
              const q = question();
              if (q) setState((s) => toggleFlag(s, q.id));
            }}
          >
            {isFlagged() ? "Flagged" : "Flag"}
          </button>
          <span class={css({ flex: 1 })} />
          <Show
            when={!isLast(state())}
            fallback={
              <button type="button" class={button} onClick={() => setConfirm("submit")}>
                Submit exam
              </button>
            }
          >
            <button type="button" class={quietButton} onClick={next}>
              Next
              <ChevronRightIcon size={18} />
            </button>
          </Show>
        </footer>
      </Show>

      <ConfirmDialog
        open={confirm() === "exit"}
        title="Leave this session?"
        description={
          userId()
            ? "Your answers are saved. You can pick up where you left off from Practice."
            : "You're not signed in, so your answers will be lost."
        }
        confirmLabel="Leave"
        cancelLabel="Keep going"
        onConfirm={() => navigate(props.backHref)}
        onCancel={() => setConfirm(null)}
      />
      <ConfirmDialog
        open={confirm() === "submit"}
        title="Submit your exam?"
        description={
          unanswered() > 0
            ? `${unanswered()} question${unanswered() === 1 ? " is" : "s are"} unanswered and will be marked wrong.`
            : "You've answered every question. You can't change answers after submitting."
        }
        confirmLabel="Submit"
        cancelLabel="Keep working"
        onConfirm={complete}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
