import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import { css } from "styled-system/css";
import { FlameIcon } from "~/ui/icons";
import { button, panel, quietButton } from "~/ui/Page";
import { Explanation, LETTERS } from "./QuestionCard";
import { formatClock, type SessionState, score, xpFor } from "./session";

const styles = {
  wrap: css({ display: "flex", flexDirection: "column", gap: "24px" }),
  score: css({ display: "flex", alignItems: "baseline", gap: "4px", fontFamily: "mono" }),
  big: css({ fontSize: "72px", lineHeight: 1, fontWeight: "600", letterSpacing: "-0.03em" }),
  of: css({ fontSize: "28px", fontWeight: "500", color: "ink.subtle" }),
  chips: css({ display: "flex", gap: "8px", flexWrap: "wrap" }),
  chip: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    h: "32px",
    px: "12px",
    rounded: "full",
    fontSize: "13px",
    fontWeight: "600",
  }),
  eyebrow: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "8px" }),
  mistakes: css({ listStyle: "none", overflow: "hidden" }),
  mistake: css({
    borderBottom: "1px solid {colors.line}",
    _last: { borderBottom: 0 },
    "& summary": {
      display: "flex",
      gap: "12px",
      alignItems: "baseline",
      p: "14px 16px",
      cursor: "pointer",
      listStyle: "none",
      fontSize: "15px",
      fontWeight: "500",
      transition: "background-color 120ms ease-out",
      _hover: { bg: "hover" },
    },
    "& summary::-webkit-details-marker": { display: "none" },
  }),
  answers: css({
    p: "0 16px 16px 48px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "14px",
  }),
  actions: css({ display: "flex", flexWrap: "wrap", gap: "10px" }),
  saveNote: css({
    p: "16px",
    fontSize: "14.5px",
    color: "ink.muted",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "flex-start",
  }),
};

type ResultsProps = {
  state: SessionState;
  seconds: number;
  signedIn: boolean;
  backHref: string;
  onRetryMistakes: () => void;
};

export function Results(props: ResultsProps) {
  const result = () => score(props.state);

  return (
    <div class={styles.wrap}>
      <section aria-labelledby="score">
        <h1 id="score" class={styles.score}>
          <span class={styles.big}>{result().correct}</span>
          <span class={styles.of}>/{result().total}</span>
        </h1>
        <p class={css({ mt: "8px", fontSize: "16px", color: "ink.muted" })}>
          <strong class="mono" style={{ color: "var(--colors-ink)" }}>
            {result().percent}%
          </strong>{" "}
          {result().percent >= 75
            ? "· strong work"
            : result().percent >= 50
              ? "· a pass, keep going"
              : "· review the ones you missed"}
        </p>
        <div class={`${styles.chips} ${css({ mt: "12px" })}`}>
          <span class={`${styles.chip} ${css({ bg: "streak.soft", color: "streak.ink" })}`}>
            <FlameIcon size={16} />
            <span class="mono">+{xpFor(props.state)} XP</span>
          </span>
          <span class={`${styles.chip} ${css({ bg: "sunk", color: "ink.muted" })}`}>
            <span class="mono">{formatClock(props.seconds)}</span>
          </span>
        </div>
      </section>

      <Show when={!props.signedIn}>
        <div class={`${panel} ${styles.saveNote}`}>
          <p>Sign in to save this score, keep your streak and see which subjects need work.</p>
          <A href={`/signin?mode=create&next=${encodeURIComponent(props.backHref)}`} class={button}>
            Create a free account
          </A>
        </div>
      </Show>

      <div class={styles.actions}>
        <Show when={result().wrong.length > 0}>
          <button type="button" class={button} onClick={() => props.onRetryMistakes()}>
            Practice the {result().wrong.length} you missed
          </button>
        </Show>
        <A href={props.backHref} class={quietButton}>
          Back to practice
        </A>
      </div>

      <Show when={result().wrong.length > 0}>
        <section aria-labelledby="missed">
          <h2 id="missed" class={styles.eyebrow}>
            Review what you missed
          </h2>
          <ul class={`${panel} ${styles.mistakes}`}>
            <For each={result().wrong}>
              {(q) => {
                const chosen = props.state.answers[q.id];
                const number = props.state.questions.indexOf(q) + 1;
                return (
                  <li class={styles.mistake}>
                    <details>
                      <summary>
                        <span class={`mono ${css({ color: "ink.subtle", minW: "24px" })}`}>
                          {number}
                        </span>
                        <span class={css({ whiteSpace: "pre-wrap" })}>{q.body}</span>
                      </summary>
                      <div class={styles.answers}>
                        <p>
                          <span class={css({ color: "ink.subtle" })}>Your answer: </span>
                          {chosen === undefined
                            ? "not answered"
                            : `${LETTERS[chosen]}. ${q.options[chosen] ?? ""}`}
                        </p>
                        <p>
                          <span class={css({ color: "ink.subtle" })}>Correct: </span>
                          <strong>
                            {LETTERS[q.correct_index]}. {q.options[q.correct_index]}
                          </strong>
                        </p>
                        <Explanation question={q} chosen={chosen} showVerdict={false} />
                      </div>
                    </details>
                  </li>
                );
              }}
            </For>
          </ul>
        </section>
      </Show>
    </div>
  );
}
