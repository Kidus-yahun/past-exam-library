import { createEffect, createSignal, onCleanup } from "solid-js";
import { css } from "styled-system/css";
import { panel } from "~/ui/Page";
import { TimerIcon } from "~/ui/icons";

interface CountdownTarget {
  id: string;
  name: string;
  desc: string;
  date: number;
}

const TARGETS: CountdownTarget[] = [
  {
    id: "grade12_national",
    name: "Grade 12 National University Entrance Exam",
    desc: "Ethiopian University Entrance Examination (EUEE)",
    date: new Date("2027-07-07T08:30:00+03:00").getTime(),
  },
  {
    id: "sem1_finals",
    name: "Semester 1 Final Examinations",
    desc: "Blessed G/Michael Catholic Secondary School",
    date: new Date("2027-01-25T08:30:00+03:00").getTime(),
  },
  {
    id: "grade10_regional",
    name: "Grade 10 Regional Examination",
    desc: "Addis Ababa City Regional Examination",
    date: new Date("2027-06-01T08:30:00+03:00").getTime(),
  },
  {
    id: "sem2_finals",
    name: "Semester 2 Final Examinations",
    desc: "Academic Year 2026/2027 Promotion Finals",
    date: new Date("2027-06-15T08:30:00+03:00").getTime(),
  },
];

function calculateRemaining(targetTimestamp: number) {
  const total = Math.max(0, targetTimestamp - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

const styles = {
  wrap: css({
    p: { base: "16px", md: "20px" },
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }),
  header: css({
    display: "flex",
    alignItems: { base: "flex-start", sm: "center" },
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  }),
  badge: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "brand",
    bg: "brand.soft",
    px: "9px",
    py: "4px",
    rounded: "md",
  }),
  select: css({
    fontSize: "13.5px",
    bg: "sunk",
    color: "ink",
    border: "1px solid {colors.line}",
    rounded: "md",
    px: "10px",
    py: "6px",
    outline: "none",
    cursor: "pointer",
    _focus: { borderColor: "brand" },
  }),
  desc: css({
    fontSize: "13px",
    color: "ink.muted",
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "10px",
  }),
  box: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: { base: "10px 4px", sm: "14px 8px" },
    bg: "sunk",
    border: "1px solid {colors.line}",
    rounded: "md",
  }),
  number: css({
    fontFamily: "mono",
    fontSize: { base: "22px", sm: "28px" },
    fontWeight: "700",
    color: "ink",
    lineHeight: 1,
  }),
  label: css({
    mt: "6px",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "ink.subtle",
    fontWeight: "500",
  }),
};

export function CountdownWidget() {
  const [selectedId, setSelectedId] = createSignal<string>("grade12_national");
  const [now, setNow] = createSignal<number>(Date.now());

  const timer = setInterval(() => setNow(Date.now()), 1000);
  onCleanup(() => clearInterval(timer));

  const currentTarget = () =>
    TARGETS.find((t) => t.id === selectedId()) || TARGETS[0];

  const remaining = () => calculateRemaining(currentTarget().date);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section class={`${panel} ${styles.wrap}`} aria-labelledby="countdown-heading">
      <div class={styles.header}>
        <div class={styles.badge}>
          <TimerIcon size={14} />
          <span id="countdown-heading">Exam Countdown</span>
        </div>
        <select
          class={styles.select}
          value={selectedId()}
          onChange={(e) => setSelectedId(e.currentTarget.value)}
          aria-label="Select Target Exam for Countdown"
        >
          {TARGETS.map((target) => (
            <option value={target.id}>{target.name}</option>
          ))}
        </select>
      </div>

      <p class={styles.desc}>{currentTarget().desc}</p>

      <div class={styles.grid}>
        <div class={styles.box}>
          <span class={styles.number}>{pad(remaining().days)}</span>
          <span class={styles.label}>Days</span>
        </div>
        <div class={styles.box}>
          <span class={styles.number}>{pad(remaining().hours)}</span>
          <span class={styles.label}>Hours</span>
        </div>
        <div class={styles.box}>
          <span class={styles.number}>{pad(remaining().minutes)}</span>
          <span class={styles.label}>Minutes</span>
        </div>
        <div class={styles.box}>
          <span class={styles.number}>{pad(remaining().seconds)}</span>
          <span class={styles.label}>Seconds</span>
        </div>
      </div>
    </section>
  );
}
