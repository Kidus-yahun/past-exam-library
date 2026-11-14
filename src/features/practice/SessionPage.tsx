import { A, useSearchParams } from "@solidjs/router";
import { useQuery } from "@tanstack/solid-query";
import { createSignal, Match, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import { button, quietButton } from "~/ui/Page";
import { Session } from "./Session";
import { loadSession, NotFound, type SessionParams, type SessionSetup } from "./setup";

const styles = {
  notice: css({
    minH: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    px: "20px",
    textAlign: "center",
    fontSize: "15px",
    color: "ink.muted",
  }),
  skeleton: css({
    maxW: "720px",
    mx: "auto",
    px: "20px",
    py: "88px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  }),
  bar: css({ h: "56px", rounded: "14px", bg: "sunk" }),
};

export default function SessionPage() {
  const [params] = useSearchParams<SessionParams>();

  const setup = useQuery(() => ({
    queryKey: ["session", params.attempt, params.paper, params.grade, params.subject, params.mode],
    queryFn: () => loadSession({ ...params }),
    // A session is a snapshot: don't refetch (and reshuffle) it underneath the student.
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 0,
    retry: (count, error) => !(error instanceof NotFound) && count < 2,
  }));

  // "Practice the ones you missed" swaps in a new, smaller session in place.
  const [override, setOverride] = createSignal<SessionSetup | null>(null);
  const [run, setRun] = createSignal(0);
  const active = () => override() ?? setup.data;

  const backHref = () => {
    const s = active();
    return s ? `/practice?grade=${s.grade}&subject=${s.subject}` : "/practice";
  };

  function restartWith(questionIds: string[]) {
    const base = active();
    if (!base) return;
    const ids = new Set(questionIds);
    setOverride({
      ...base,
      subtitle: `${base.subtitle} · missed questions`,
      mode: "practice",
      paperId: base.paperId,
      questions: base.questions.filter((q) => ids.has(q.id)),
      answers: {},
      attemptId: null,
      startedAt: null,
      finishedAt: null,
      finished: false,
    });
    setRun((n) => n + 1);
    window.scrollTo({ top: 0 });
  }

  return (
    <Switch>
      <Match when={setup.error instanceof NotFound}>
        <div class={styles.notice}>
          <p>That practice set isn't available.</p>
          <A href="/practice" class={quietButton}>
            Choose another
          </A>
        </div>
      </Match>
      <Match when={setup.isError}>
        <div class={styles.notice} role="alert">
          <p>Couldn't load the questions. Check your connection and try again.</p>
          <button type="button" class={button} onClick={() => setup.refetch()}>
            Try again
          </button>
        </div>
      </Match>
      <Match when={active()}>
        {(s) => (
          <Show when={run() + 1} keyed>
            <Session setup={s()} backHref={backHref()} onRestart={restartWith} />
          </Show>
        )}
      </Match>
      <Match when={setup.isPending}>
        <div class={styles.skeleton} role="status" aria-busy="true" aria-label="Loading questions">
          <div class={`${styles.bar} ${css({ h: "64px", w: "80%" })}`} />
          <div class={styles.bar} />
          <div class={styles.bar} />
          <div class={styles.bar} />
          <div class={styles.bar} />
        </div>
      </Match>
    </Switch>
  );
}
