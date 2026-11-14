import { createMemo, For, Match, Switch } from "solid-js";
import { css } from "styled-system/css";
import { type Inline, parseBlocks } from "~/lib/lightMarkdown";
import { MathText } from "./Math";

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    fontSize: "15.5px",
    lineHeight: "1.65",
    color: "ink.muted",
  }),
  list: css({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    pl: "20px",
    listStyle: "disc",
    "& li::marker": { color: "ink.subtle" },
  }),
  bold: css({ color: "ink", fontWeight: "600" }),
  math: css({ color: "ink", whiteSpace: "nowrap" }),
};

// Unit notes put formulas in `code` spans; render them as maths.
function Spans(props: { content: Inline[] }) {
  return (
    <For each={props.content}>
      {(span) => (
        <Switch fallback={span.text}>
          <Match when={span.kind === "bold"}>
            <strong class={styles.bold}>{span.text}</strong>
          </Match>
          <Match when={span.kind === "code"}>
            <MathText tex={span.text} class={styles.math} />
          </Match>
        </Switch>
      )}
    </For>
  );
}

export function LightMarkdown(props: { source: string; class?: string }) {
  const blocks = createMemo(() => parseBlocks(props.source));
  return (
    <div class={`${styles.root} ${props.class ?? ""}`}>
      <For each={blocks()}>
        {(block) =>
          block.kind === "paragraph" ? (
            <p>
              <Spans content={block.content} />
            </p>
          ) : (
            <ul class={styles.list}>
              <For each={block.items}>
                {(item) => (
                  <li>
                    <Spans content={item} />
                  </li>
                )}
              </For>
            </ul>
          )
        }
      </For>
    </div>
  );
}
