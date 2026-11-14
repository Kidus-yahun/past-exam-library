import { For, Match, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import type { Question } from "./session";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

const styles = {
  body: css({
    fontSize: { base: "19px", md: "20px" },
    lineHeight: "1.45",
    fontWeight: "600",
    letterSpacing: "-0.01em",
    whiteSpace: "pre-wrap",
    textWrap: "pretty",
  }),
  options: css({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    mt: "18px",
    border: 0,
    p: 0,
    m: 0,
    minW: 0,
  }),
  option: css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    w: "100%",
    minH: "56px",
    p: "10px 14px 10px 10px",
    rounded: "14px",
    bg: "surface",
    boxShadow: "inset 0 0 0 1.5px {colors.line}",
    textAlign: "left",
    fontSize: "15.5px",
    fontWeight: "500",
    color: "ink",
    cursor: "pointer",
    transition: "box-shadow 120ms ease-out, background-color 120ms ease-out",
    _hover: { bg: "hover" },
    _disabled: { cursor: "default", _hover: { bg: "surface" } },
    "&[data-state=chosen]": { boxShadow: "inset 0 0 0 2px {colors.ink}" },
    "&[data-state=right]": { bg: "brand.soft", boxShadow: "inset 0 0 0 2px {colors.brand}" },
    "&[data-state=wrong]": { bg: "wrong.soft", boxShadow: "inset 0 0 0 2px {colors.wrong}" },
    "&[data-state=dim]": { color: "ink.subtle" },
  }),
  key: css({
    flex: "none",
    w: "32px",
    h: "32px",
    rounded: "9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bg: "sunk",
    fontFamily: "mono",
    fontSize: "14px",
    fontWeight: "600",
    color: "ink.muted",
    "[data-state=chosen] &": { bg: "ink", color: "bg" },
    "[data-state=right] &": { bg: "brand", color: "brand.fg" },
    "[data-state=wrong] &": { bg: "wrong", color: "surface" },
  }),
  text: css({ flex: 1, minW: 0, whiteSpace: "pre-wrap" }),
  tag: css({ flex: "none", fontSize: "12px", fontWeight: "600" }),
};

type OptionState = "idle" | "chosen" | "right" | "wrong" | "dim";

type QuestionCardProps = {
  question: Question;
  number: number;
  chosen: number | undefined;
  /** Show which option is right (practice feedback, or a finished exam). */
  reveal: boolean;
  disabled: boolean;
  onChoose: (option: number) => void;
};

export function QuestionCard(props: QuestionCardProps) {
  const stateOf = (i: number): OptionState => {
    if (!props.reveal) return props.chosen === i ? "chosen" : "idle";
    if (i === props.question.correct_index) return "right";
    if (i === props.chosen) return "wrong";
    return "dim";
  };

  return (
    <div>
      <h2 class={styles.body}>
        <span class={css({ srOnly: true })}>Question {props.number}: </span>
        {props.question.body}
      </h2>
      {/* Toggle buttons, not radios: arrow keys must never lock in a practice answer. */}
      <fieldset class={styles.options}>
        <legend class={css({ srOnly: true })}>Answer options</legend>
        <For each={props.question.options}>
          {(option, i) => (
            <button
              type="button"
              aria-pressed={props.chosen === i()}
              class={styles.option}
              data-state={stateOf(i())}
              disabled={props.disabled}
              onClick={() => props.onChoose(i())}
            >
              <span class={styles.key} aria-hidden="true">
                {LETTERS[i()]}
              </span>
              <span class={styles.text}>{option}</span>
              <Switch>
                <Match when={stateOf(i()) === "right"}>
                  <span class={`${styles.tag} ${css({ color: "brand.strong" })}`}>Correct</span>
                </Match>
                <Match when={stateOf(i()) === "wrong"}>
                  <span class={`${styles.tag} ${css({ color: "wrong" })}`}>Your answer</span>
                </Match>
              </Switch>
            </button>
          )}
        </For>
      </fieldset>
    </div>
  );
}

export function Explanation(props: {
  question: Question;
  chosen: number | undefined;
  /** Hide the "Correct." / "Not quite…" line where the answer is already shown. */
  showVerdict?: boolean;
}) {
  const right = () => props.chosen === props.question.correct_index;
  return (
    <div class={css({ display: "flex", flexDirection: "column", gap: "6px" })}>
      <Show when={props.showVerdict ?? true}>
        <p
          class={css({ fontSize: "16px", fontWeight: "650" })}
          style={{ color: right() ? "var(--colors-brand-strong)" : "var(--colors-wrong)" }}
        >
          {right()
            ? "Correct."
            : `Not quite. The answer is ${LETTERS[props.question.correct_index]}.`}
        </p>
      </Show>
      <Show
        when={props.question.explanation}
        fallback={
          <p class={css({ fontSize: "14.5px", color: "ink.subtle" })}>
            No explanation for this question yet.
          </p>
        }
      >
        <p
          class={css({
            fontSize: "14.5px",
            lineHeight: "1.55",
            color: "ink.muted",
            whiteSpace: "pre-wrap",
          })}
        >
          {props.question.explanation}
        </p>
      </Show>
    </div>
  );
}

export { LETTERS };
