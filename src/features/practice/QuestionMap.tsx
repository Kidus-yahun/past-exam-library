import { For } from "solid-js";
import { css } from "styled-system/css";
import { type SessionState, statusOf } from "./session";

const styles = {
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
    gap: "6px",
  }),
  cell: css({
    position: "relative",
    h: "40px",
    rounded: "sm",
    fontFamily: "mono",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    color: "ink.subtle",
    bg: "surface",
    boxShadow: "inset 0 0 0 1px {colors.line}",
    transition: "background-color 120ms ease-out",
    _hover: { bg: "hover" },
    "&[data-status=answered]": { bg: "sunk", color: "ink", boxShadow: "none" },
    "&[data-status=correct]": { bg: "brand.soft", color: "brand.strong", boxShadow: "none" },
    "&[data-status=wrong]": {
      bg: "wrong.soft",
      color: "wrong",
      boxShadow: "none",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
    "&[aria-current=step]": { boxShadow: "inset 0 0 0 2px {colors.ink}" },
  }),
  flag: css({
    position: "absolute",
    top: "3px",
    right: "3px",
    w: "6px",
    h: "6px",
    rounded: "full",
    bg: "streak",
  }),
  legend: css({
    display: "flex",
    flexWrap: "wrap",
    gap: "4px 12px",
    mt: "10px",
    fontSize: "12.5px",
    color: "ink.subtle",
  }),
};

const STATUS_WORD = {
  correct: "right",
  wrong: "wrong",
  answered: "answered",
  unanswered: "not answered",
} as const;

export function QuestionMap(props: { state: SessionState; onGo: (index: number) => void }) {
  const flagged = (id: string) => props.state.flagged.includes(id);

  return (
    <div>
      <div class={styles.grid}>
        <For each={props.state.questions}>
          {(q, i) => {
            const status = () => statusOf(props.state, q);
            return (
              <button
                type="button"
                class={styles.cell}
                data-status={status()}
                aria-current={props.state.index === i() ? "step" : undefined}
                aria-label={`Question ${i() + 1}, ${STATUS_WORD[status()]}${flagged(q.id) ? ", flagged" : ""}`}
                onClick={() => props.onGo(i())}
              >
                {i() + 1}
                {flagged(q.id) && <span class={styles.flag} aria-hidden="true" />}
              </button>
            );
          }}
        </For>
      </div>
      <p class={styles.legend} aria-hidden="true">
        <span>Dot = flagged</span>
        {props.state.mode === "exam" && !props.state.finished ? (
          <span>Grey = answered</span>
        ) : (
          <span>Underlined = wrong</span>
        )}
      </p>
    </div>
  );
}
