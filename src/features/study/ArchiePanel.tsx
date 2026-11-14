import { A } from "@solidjs/router";
import { createEffect, createSignal, For, on, Show } from "solid-js";
import { css } from "styled-system/css";
import { session, userId } from "~/lib/auth";
import { button } from "~/ui/Page";

type Turn = { role: "student" | "archie"; text: string };

const SUGGESTIONS = [
  "Explain this unit simply",
  "Quiz me with 3 exam-style questions",
  "What do students usually get wrong here?",
];

const ERRORS: Record<string, string> = {
  sign_in_required: "Sign in again to ask Archie.",
  rate_limited: "You've asked a lot this hour. Take a break and try again later.",
  not_configured: "Archie isn't switched on yet.",
  tutor_timeout: "Archie took too long to answer. Try again.",
};

const styles = {
  log: css({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxH: "420px",
    overflowY: "auto",
    mb: "12px",
  }),
  bubble: css({
    maxW: "92%",
    p: "10px 12px",
    rounded: "14px",
    fontSize: "14.5px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
    "&[data-role=student]": {
      alignSelf: "flex-end",
      bg: "brand",
      color: "brand.fg",
      roundedBottomRight: "4px",
    },
    "&[data-role=archie]": {
      alignSelf: "flex-start",
      bg: "surface",
      boxShadow: "inset 0 0 0 1px {colors.line}",
      roundedBottomLeft: "4px",
    },
  }),
  chips: css({ display: "flex", flexWrap: "wrap", gap: "6px", mb: "12px" }),
  chip: css({
    minH: "34px",
    px: "12px",
    rounded: "full",
    fontSize: "13px",
    fontWeight: "500",
    color: "ink.muted",
    boxShadow: "inset 0 0 0 1px {colors.line}",
    cursor: "pointer",
    _hover: { bg: "hover", color: "ink" },
  }),
  form: css({ display: "flex", gap: "8px" }),
  input: css({
    flex: 1,
    minW: 0,
    minH: "44px",
    px: "12px",
    rounded: "md",
    bg: "surface",
    color: "ink",
    fontSize: "16px",
    boxShadow: "inset 0 0 0 1px {colors.line}",
    _focusVisible: { outline: "none", boxShadow: "inset 0 0 0 2px {colors.focus}" },
  }),
};

export function ArchiePanel(props: { grade: number; subject: string; unitTitle: string }) {
  const [turns, setTurns] = createSignal<Turn[]>([]);
  const [draft, setDraft] = createSignal("");
  const [busy, setBusy] = createSignal(false);
  const [error, setError] = createSignal("");
  let log: HTMLDivElement | undefined;

  // A new unit starts a new conversation.
  createEffect(
    on(
      () => props.unitTitle,
      () => setTurns([]),
      { defer: true },
    ),
  );
  createEffect(on(turns, () => log?.scrollTo({ top: log.scrollHeight, behavior: "smooth" })));

  async function ask(text: string) {
    const message = text.trim();
    if (!message || busy()) return;
    setError("");
    setDraft("");
    const history = turns().slice(-10);
    setTurns([...turns(), { role: "student", text: message }]);
    setBusy(true);
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${session()?.access_token ?? ""}`,
        },
        body: JSON.stringify({
          message,
          grade: props.grade,
          subject: props.subject,
          unitTitle: props.unitTitle,
          history,
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!response.ok || !body.reply) {
        setError(ERRORS[body.error ?? ""] ?? "Archie couldn't answer right now. Try again.");
        return;
      }
      setTurns((t) => [...t, { role: "archie", text: body.reply ?? "" }]);
    } catch {
      setError("Can't reach Archie. Check your connection.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Show
      when={userId()}
      fallback={
        <div
          class={css({
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            fontSize: "14.5px",
            color: "ink.muted",
          })}
        >
          <p>Sign in to ask Archie, your study coach, about this unit.</p>
          <A href="/signin" class={button}>
            Sign in
          </A>
        </div>
      }
    >
      <div ref={log} class={styles.log} aria-live="polite">
        <Show when={turns().length === 0}>
          <p class={css({ fontSize: "14px", color: "ink.subtle" })}>
            Archie gives hints before answers, so you learn the method. Ask about {props.unitTitle}.
          </p>
        </Show>
        <For each={turns()}>
          {(turn) => (
            <p class={styles.bubble} data-role={turn.role}>
              <span class={css({ srOnly: true })}>
                {turn.role === "student" ? "You: " : "Archie: "}
              </span>
              {turn.text}
            </p>
          )}
        </For>
        <Show when={busy()}>
          <p class={styles.bubble} data-role="archie">
            Thinking…
          </p>
        </Show>
      </div>
      <Show when={error()}>
        <p class={css({ fontSize: "13.5px", color: "wrong", mb: "10px" })} role="alert">
          {error()}
        </p>
      </Show>
      <Show when={turns().length === 0}>
        <div class={styles.chips}>
          <For each={SUGGESTIONS}>
            {(s) => (
              <button type="button" class={styles.chip} onClick={() => ask(s)}>
                {s}
              </button>
            )}
          </For>
        </div>
      </Show>
      <form
        class={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          void ask(draft());
        }}
      >
        <label class={css({ flex: 1, display: "flex" })}>
          <span class={css({ srOnly: true })}>Ask Archie</span>
          <input
            class={styles.input}
            maxLength={1000}
            placeholder="Ask a question…"
            value={draft()}
            onInput={(e) => setDraft(e.currentTarget.value)}
          />
        </label>
        <button type="submit" class={button} disabled={busy() || !draft().trim()}>
          Ask
        </button>
      </form>
    </Show>
  );
}
