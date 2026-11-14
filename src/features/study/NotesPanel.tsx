import { A } from "@solidjs/router";
import { createEffect, createSignal, on, onCleanup, Show } from "solid-js";
import { css } from "styled-system/css";
import { userId } from "~/lib/auth";
import { button } from "~/ui/Page";
import { fetchMyNote, saveMyNote } from "./api";

const SAVE_DELAY_MS = 800;

const styles = {
  area: css({
    w: "100%",
    minH: "220px",
    p: "12px 14px",
    rounded: "md",
    bg: "surface",
    color: "ink",
    fontSize: "15px",
    lineHeight: "1.55",
    resize: "vertical",
    boxShadow: "inset 0 0 0 1px {colors.line}",
    _focusVisible: { outline: "none", boxShadow: "inset 0 0 0 2px {colors.focus}" },
  }),
  status: css({ fontSize: "12.5px", color: "ink.subtle", minH: "18px" }),
};

/** A private scratchpad per unit, saved automatically shortly after typing stops. */
export function NotesPanel(props: { unitId: string; unitTitle: string }) {
  const [body, setBody] = createSignal("");
  const [status, setStatus] = createSignal<"idle" | "loading" | "saving" | "saved" | "error">(
    "idle",
  );
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pending: { unitId: string; text: string } | null = null;

  const flush = () => {
    clearTimeout(timer);
    if (!pending) return;
    const { unitId, text } = pending;
    pending = null;
    setStatus("saving");
    saveMyNote(unitId, text)
      .then(() => setStatus("saved"))
      .catch(() => setStatus("error"));
  };

  createEffect(
    on(
      () => [props.unitId, userId()] as const,
      ([unitId, uid]) => {
        flush();
        setBody("");
        if (!uid) return;
        setStatus("loading");
        fetchMyNote(unitId)
          .then((text) => {
            setBody(text);
            setStatus("idle");
          })
          .catch(() => setStatus("error"));
      },
    ),
  );
  onCleanup(flush);

  function onInput(text: string) {
    setBody(text);
    pending = { unitId: props.unitId, text };
    clearTimeout(timer);
    timer = setTimeout(flush, SAVE_DELAY_MS);
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
          <p>Sign in to keep private notes for each unit, on any device.</p>
          <A href="/signin" class={button}>
            Sign in
          </A>
        </div>
      }
    >
      <label class={css({ display: "flex", flexDirection: "column", gap: "8px" })}>
        <span class={css({ srOnly: true })}>My notes for {props.unitTitle}</span>
        <textarea
          class={styles.area}
          value={body()}
          disabled={status() === "loading"}
          placeholder="Shortcuts, things to remember, questions for your teacher…"
          onInput={(e) => onInput(e.currentTarget.value)}
          onBlur={flush}
        />
      </label>
      <p class={styles.status} role="status">
        {status() === "saving"
          ? "Saving…"
          : status() === "saved"
            ? "Saved"
            : status() === "error"
              ? "Couldn't save. Check your connection."
              : ""}
      </p>
    </Show>
  );
}
