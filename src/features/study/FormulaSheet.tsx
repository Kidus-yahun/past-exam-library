import { createMemo, createSignal, For, Show } from "solid-js";
import { css } from "styled-system/css";
import { input } from "~/ui/forms";
import { panel } from "~/ui/Page";
import type { Formula } from "./api";

const styles = {
  root: css({ display: "flex", flexDirection: "column", gap: "20px" }),
  topic: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "10px" }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "10px",
  }),
  card: css({ p: "14px 16px", display: "flex", flexDirection: "column", gap: "8px" }),
  title: css({ fontSize: "14.5px", fontWeight: "650" }),
  math: css({
    fontFamily: "mono",
    fontSize: "15px",
    lineHeight: "1.5",
    color: "ink",
    bg: "sunk",
    rounded: "sm",
    p: "10px 12px",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  }),
  vars: css({ fontSize: "13px", color: "ink.muted", lineHeight: "1.5" }),
  tip: css({ fontSize: "13px", color: "brand.strong", lineHeight: "1.5" }),
  copy: css({
    alignSelf: "flex-start",
    fontSize: "12.5px",
    fontWeight: "600",
    color: "ink.muted",
    cursor: "pointer",
    _hover: { color: "ink" },
  }),
};

export function FormulaSheet(props: { formulas: Formula[] }) {
  const [query, setQuery] = createSignal("");
  const [copied, setCopied] = createSignal<string | null>(null);

  const groups = createMemo(() => {
    const q = query().trim().toLowerCase();
    const matches = props.formulas.filter(
      (f) =>
        !q ||
        f.title.toLowerCase().includes(q) ||
        f.topic.toLowerCase().includes(q) ||
        f.display.toLowerCase().includes(q),
    );
    const byTopic = new Map<string, Formula[]>();
    for (const f of matches) byTopic.set(f.topic, [...(byTopic.get(f.topic) ?? []), f]);
    return [...byTopic.entries()];
  });

  async function copy(f: Formula) {
    try {
      await navigator.clipboard.writeText(`${f.title}: ${f.display}`);
      setCopied(f.id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // Clipboard not available; nothing to do.
    }
  }

  return (
    <div class={styles.root}>
      <label class={css({ display: "flex", flexDirection: "column", gap: "6px", maxW: "420px" })}>
        <span class={css({ srOnly: true })}>Search formulas</span>
        <input
          type="search"
          class={input}
          placeholder="Search formulas, e.g. projectile"
          value={query()}
          onInput={(e) => setQuery(e.currentTarget.value)}
        />
      </label>
      <Show
        when={groups().length > 0}
        fallback={<p class={css({ color: "ink.muted" })}>No formulas match “{query()}”.</p>}
      >
        <For each={groups()}>
          {([topic, list]) => (
            <section>
              <h3 class={styles.topic}>{topic}</h3>
              <div class={styles.grid}>
                <For each={list}>
                  {(f) => (
                    <div class={`${panel} ${styles.card}`}>
                      <p class={styles.title}>{f.title}</p>
                      <p class={styles.math}>{f.display}</p>
                      <Show when={f.variables}>
                        <p class={styles.vars}>{f.variables}</p>
                      </Show>
                      <Show when={f.tip}>
                        <p class={styles.tip}>{f.tip}</p>
                      </Show>
                      <button type="button" class={styles.copy} onClick={() => copy(f)}>
                        {copied() === f.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  )}
                </For>
              </div>
            </section>
          )}
        </For>
      </Show>
    </div>
  );
}
