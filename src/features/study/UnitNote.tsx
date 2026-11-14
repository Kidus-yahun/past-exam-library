import { For, Show } from "solid-js";
import { css } from "styled-system/css";
import { LightMarkdown } from "~/ui/LightMarkdown";
import { MathText } from "~/ui/Math";
import { panel } from "~/ui/Page";
import type { Unit } from "./api";

const styles = {
  root: css({ display: "flex", flexDirection: "column", gap: "24px" }),
  meta: css({
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    fontSize: "13px",
    color: "ink.subtle",
  }),
  title: css({
    fontSize: { base: "22px", md: "26px" },
    fontWeight: "650",
    letterSpacing: "-0.02em",
    textWrap: "balance",
  }),
  eyebrow: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "10px" }),
  formulas: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "10px",
  }),
  formula: css({ p: "14px 16px", display: "flex", flexDirection: "column", gap: "8px" }),
  formulaName: css({ fontSize: "13px", fontWeight: "600", color: "ink.muted" }),
  formulaMath: css({ fontSize: "18px", color: "ink", overflowX: "auto" }),
  formulaNotes: css({ fontSize: "12.5px", color: "ink.subtle" }),
  example: css({
    p: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "15px",
    lineHeight: "1.55",
  }),
  steps: css({
    pl: "20px",
    listStyle: "decimal",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    color: "ink.muted",
  }),
  answer: css({
    alignSelf: "flex-start",
    px: "12px",
    py: "6px",
    rounded: "full",
    bg: "brand.soft",
    color: "brand.strong",
    fontWeight: "650",
    fontSize: "14px",
  }),
  pitfall: css({ p: "16px", rounded: "lg", bg: "wrong.soft", "& p, & li": { color: "ink" } }),
};

export function UnitNote(props: { unit: Unit }) {
  return (
    <article class={styles.root}>
      <header>
        <p class={styles.meta}>
          <span>Unit {props.unit.position}</span>
          <Show when={props.unit.exam_weight}>
            <span aria-hidden="true">·</span>
            <span>{props.unit.exam_weight}</span>
          </Show>
          <Show when={props.unit.read_minutes}>
            <span aria-hidden="true">·</span>
            <span>{props.unit.read_minutes} min read</span>
          </Show>
        </p>
        <h2 class={`${styles.title} ${css({ mt: "4px" })}`}>{props.unit.title}</h2>
      </header>

      <LightMarkdown source={props.unit.overview} />

      <Show when={props.unit.formulas.length > 0}>
        <section aria-labelledby="key-formulas">
          <h3 id="key-formulas" class={styles.eyebrow}>
            Key formulas
          </h3>
          <div class={styles.formulas}>
            <For each={props.unit.formulas}>
              {(f) => (
                <div class={`${panel} ${styles.formula}`}>
                  <p class={styles.formulaName}>{f.name}</p>
                  <MathText tex={f.latex} display class={styles.formulaMath} />
                  <Show when={f.notes}>
                    <p class={styles.formulaNotes}>{f.notes}</p>
                  </Show>
                </div>
              )}
            </For>
          </div>
        </section>
      </Show>

      <Show when={props.unit.worked_example}>
        {(ex) => (
          <section aria-labelledby="worked-example">
            <h3 id="worked-example" class={styles.eyebrow}>
              Worked example
            </h3>
            <div class={`${panel} ${styles.example}`}>
              <p class={css({ fontWeight: "600" })}>{ex().question}</p>
              <ol class={styles.steps}>
                <For each={ex().steps}>{(step) => <li>{step}</li>}</For>
              </ol>
              <p class={styles.answer}>Answer: {ex().answer}</p>
            </div>
          </section>
        )}
      </Show>

      <Show when={props.unit.pitfall}>
        {(pitfall) => (
          <section aria-labelledby="pitfall">
            <h3 id="pitfall" class={styles.eyebrow}>
              Common mistake
            </h3>
            <div class={styles.pitfall}>
              <LightMarkdown source={pitfall()} />
            </div>
          </section>
        )}
      </Show>
    </article>
  );
}
