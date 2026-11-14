import { A } from "@solidjs/router";
import { For, Show } from "solid-js";
import { css } from "styled-system/css";
import { FlameIcon } from "~/ui/icons";
import { STRENGTH_LABEL, STRENGTH_LEVEL, type Strength, type WeekDay } from "./progress";

const STRENGTH_COLOR: Record<Strength, { fill: string; text: string }> = {
  weak: { fill: "var(--colors-wrong)", text: "var(--colors-wrong)" },
  building: { fill: "var(--colors-streak)", text: "var(--colors-streak-ink)" },
  good: { fill: "var(--colors-brand)", text: "var(--colors-brand-strong)" },
  strong: { fill: "var(--colors-brand)", text: "var(--colors-brand-strong)" },
};

/** Four-segment strength meter with its word, so it never relies on color alone. */
export function StrengthMeter(props: { strength: Strength | null }) {
  return (
    <span
      class={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "5px",
        minW: "64px",
      })}
    >
      <span class={css({ display: "flex", gap: "3px" })} aria-hidden="true">
        <For each={[1, 2, 3, 4]}>
          {(level) => (
            <i
              class={css({ w: "12px", h: "6px", rounded: "2px", bg: "line" })}
              style={
                props.strength && level <= STRENGTH_LEVEL[props.strength]
                  ? { background: STRENGTH_COLOR[props.strength].fill }
                  : undefined
              }
            />
          )}
        </For>
      </span>
      <span
        class={css({
          fontSize: "11.5px",
          fontWeight: "600",
          color: "ink.subtle",
          fontStyle: "normal",
        })}
        style={props.strength ? { color: STRENGTH_COLOR[props.strength].text } : undefined}
      >
        {props.strength ? STRENGTH_LABEL[props.strength] : "Not rated yet"}
      </span>
    </span>
  );
}

export function StreakChip(props: { count: number }) {
  return (
    <A
      href="/progress"
      aria-label={`${props.count}-day study streak`}
      class={css({
        flex: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        h: "40px",
        pl: "10px",
        pr: "14px",
        rounded: "full",
        bg: "streak.soft",
        color: "streak.ink",
        fontWeight: "600",
      })}
    >
      <FlameIcon size={20} />
      <span class="mono" style={{ "font-size": "16px" }}>
        {props.count}
      </span>
    </A>
  );
}

export function WeekStrip(props: { days: WeekDay[] }) {
  return (
    <ol
      aria-label="This week"
      class={css({
        display: "grid",
        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
        listStyle: "none",
      })}
    >
      <For each={props.days}>
        {(d) => (
          <li
            class={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: "500",
              color: "ink.subtle",
              "&[data-today]": { color: "ink", fontWeight: "650" },
            })}
            data-today={d.isToday ? "" : undefined}
          >
            <span
              class={css({
                w: "32px",
                h: "32px",
                rounded: "full",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bg: "sunk",
                color: "brand.fg",
                "&[data-done]": { bg: "brand" },
                "&[data-future]": {
                  bg: "transparent",
                  boxShadow: "inset 0 0 0 1.5px {colors.line}",
                },
                "&[data-today]": { boxShadow: "0 0 0 2px {colors.bg}, 0 0 0 4px {colors.brand}" },
              })}
              data-done={d.done ? "" : undefined}
              data-future={d.future ? "" : undefined}
              data-today={d.isToday ? "" : undefined}
              role="img"
              aria-label={`${d.label}: ${d.done ? "studied" : d.future ? "upcoming" : "no study"}`}
            >
              <Show when={d.done}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </Show>
            </span>
            {d.label}
          </li>
        )}
      </For>
    </ol>
  );
}
