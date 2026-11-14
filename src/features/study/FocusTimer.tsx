import { css } from "styled-system/css";
import { formatClock } from "~/features/practice/session";
import { focusTimer } from "./focusTimer";

const styles = {
  root: css({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    p: "4px",
    pl: "6px",
    rounded: "full",
    bg: "brand.soft",
    color: "brand.strong",
    "&[data-mode=break]": { bg: "streak.soft", color: "streak.ink" },
  }),
  mode: css({
    minH: "32px",
    px: "10px",
    rounded: "full",
    fontSize: "12.5px",
    fontWeight: "600",
    cursor: "pointer",
    color: "inherit",
    opacity: 0.75,
    "&[aria-pressed=true]": { bg: "surface", opacity: 1 },
  }),
  clock: css({
    fontFamily: "mono",
    fontSize: "17px",
    fontWeight: "600",
    minW: "56px",
    textAlign: "center",
  }),
  action: css({
    minH: "36px",
    px: "14px",
    rounded: "full",
    bg: "surface",
    color: "inherit",
    fontSize: "13.5px",
    fontWeight: "650",
    cursor: "pointer",
  }),
  reset: css({
    minW: "36px",
    minH: "36px",
    rounded: "full",
    cursor: "pointer",
    color: "inherit",
    fontSize: "13px",
    fontWeight: "600",
  }),
};

export function FocusTimer() {
  const t = focusTimer;
  return (
    <section class={styles.root} data-mode={t.mode()} aria-label="Focus timer">
      <button
        type="button"
        class={styles.mode}
        aria-pressed={t.mode() === "focus"}
        onClick={() => t.switchTo("focus")}
      >
        25 min
      </button>
      <button
        type="button"
        class={styles.mode}
        aria-pressed={t.mode() === "break"}
        onClick={() => t.switchTo("break")}
      >
        Break
      </button>
      <span class={styles.clock} role="timer" aria-label={`${formatClock(t.remaining())} left`}>
        {formatClock(t.remaining())}
      </span>
      <button
        type="button"
        class={styles.action}
        onClick={() => (t.running() ? t.pause() : t.start())}
      >
        {t.running() ? "Pause" : "Start"}
      </button>
      <button type="button" class={styles.reset} onClick={() => t.reset()} aria-label="Reset timer">
        ↺
      </button>
    </section>
  );
}
