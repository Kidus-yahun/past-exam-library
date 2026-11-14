import { A } from "@solidjs/router";
import { useQuery, useQueryClient } from "@tanstack/solid-query";
import { createSignal, For, Show } from "solid-js";
import { css } from "styled-system/css";
import { useProfile } from "~/features/account/useProfile";
import { userId } from "~/lib/auth";
import { errorText } from "~/ui/forms";
import { button, quietButton } from "~/ui/Page";
import { addTip, deleteTip, fetchMyLikes, fetchTips, setLiked, TIP_TAGS, type TipTag } from "./api";

const styles = {
  composer: css({ display: "flex", flexDirection: "column", gap: "10px" }),
  tags: css({ display: "flex", flexWrap: "wrap", gap: "6px", border: 0, p: 0, m: 0, minW: 0 }),
  tag: css({
    minH: "32px",
    px: "10px",
    rounded: "full",
    fontSize: "12.5px",
    fontWeight: "600",
    color: "ink.muted",
    boxShadow: "inset 0 0 0 1px {colors.line}",
    cursor: "pointer",
    "&[aria-pressed=true]": { bg: "ink", color: "bg", boxShadow: "none" },
  }),
  area: css({
    w: "100%",
    minH: "90px",
    p: "10px 12px",
    rounded: "md",
    bg: "surface",
    color: "ink",
    fontSize: "14.5px",
    lineHeight: "1.5",
    boxShadow: "inset 0 0 0 1px {colors.line}",
    _focusVisible: { outline: "none", boxShadow: "inset 0 0 0 2px {colors.focus}" },
  }),
  list: css({
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    mt: "16px",
  }),
  tip: css({
    p: "12px 14px",
    rounded: "md",
    bg: "surface",
    boxShadow: "inset 0 0 0 1px {colors.line}",
  }),
  tipHead: css({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12.5px",
    color: "ink.subtle",
    mb: "6px",
  }),
  tipTag: css({ fontWeight: "600", color: "brand.strong" }),
  body: css({
    fontSize: "14.5px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  }),
  actions: css({ display: "flex", gap: "12px", mt: "8px" }),
  link: css({
    fontSize: "12.5px",
    fontWeight: "600",
    color: "ink.muted",
    cursor: "pointer",
    _hover: { color: "ink" },
    "&[aria-pressed=true]": { color: "wrong" },
  }),
};

export function TipsPanel(props: { unitId: string }) {
  const queryClient = useQueryClient();
  const profile = useProfile();
  const [tag, setTag] = createSignal<TipTag>("shortcut");
  const [text, setText] = createSignal("");
  const [busy, setBusy] = createSignal(false);
  const [error, setError] = createSignal("");

  const tips = useQuery(() => ({
    queryKey: ["tips", props.unitId],
    queryFn: () => fetchTips(props.unitId),
  }));
  const likes = useQuery(() => ({
    queryKey: ["tip-likes", props.unitId, userId(), tips.data?.map((t) => t.id).join(",")],
    queryFn: () => fetchMyLikes(tips.data?.map((t) => t.id) ?? []),
    enabled: userId() !== null && tips.data !== undefined,
  }));

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["tips", props.unitId] }),
      queryClient.invalidateQueries({ queryKey: ["tip-likes", props.unitId] }),
    ]);

  async function post(event: SubmitEvent) {
    event.preventDefault();
    if (text().trim().length < 3) return;
    setBusy(true);
    setError("");
    try {
      await addTip(props.unitId, tag(), text());
      setText("");
      await refresh();
    } catch {
      setError("Couldn't post. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleLike(id: string) {
    const liked = likes.data?.has(id) ?? false;
    await setLiked(id, !liked).catch(() => {});
    await refresh();
  }

  async function remove(id: string) {
    await deleteTip(id).catch(() => {});
    await refresh();
  }

  return (
    <div>
      <Show
        when={userId()}
        fallback={
          <p class={css({ fontSize: "14px", color: "ink.muted" })}>
            <A href="/signin" class={css({ color: "brand", fontWeight: "600" })}>
              Sign in
            </A>{" "}
            to share a tip with other students.
          </p>
        }
      >
        <form class={styles.composer} onSubmit={post}>
          <fieldset class={styles.tags}>
            <legend class={css({ srOnly: true })}>Kind of tip</legend>
            <For each={Object.entries(TIP_TAGS) as [TipTag, string][]}>
              {([value, label]) => (
                <button
                  type="button"
                  class={styles.tag}
                  aria-pressed={tag() === value}
                  onClick={() => setTag(value)}
                >
                  {label}
                </button>
              )}
            </For>
          </fieldset>
          <label>
            <span class={css({ srOnly: true })}>Your tip</span>
            <textarea
              class={styles.area}
              maxLength={1000}
              placeholder="A shortcut or memory trick that helped you"
              value={text()}
              onInput={(e) => setText(e.currentTarget.value)}
            />
          </label>
          <Show when={error()}>
            <p class={errorText} role="alert">
              {error()}
            </p>
          </Show>
          <button type="submit" class={button} disabled={busy() || text().trim().length < 3}>
            {busy() ? "Posting…" : "Share tip"}
          </button>
        </form>
      </Show>

      <Show
        when={(tips.data?.length ?? 0) > 0}
        fallback={
          <Show when={tips.isSuccess}>
            <p class={css({ mt: "16px", fontSize: "14px", color: "ink.subtle" })}>
              No tips for this unit yet.
            </p>
          </Show>
        }
      >
        <ul class={styles.list}>
          <For each={tips.data}>
            {(tip) => (
              <li class={styles.tip}>
                <p class={styles.tipHead}>
                  <span class={styles.tipTag}>{TIP_TAGS[tip.tag]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{tip.author_name}</span>
                </p>
                <p class={styles.body}>{tip.body}</p>
                <div class={styles.actions}>
                  <Show
                    when={userId()}
                    fallback={<span class={styles.link}>{tip.likes} found this helpful</span>}
                  >
                    <button
                      type="button"
                      class={styles.link}
                      aria-pressed={likes.data?.has(tip.id) ?? false}
                      onClick={() => toggleLike(tip.id)}
                    >
                      Helpful · <span class="mono">{tip.likes}</span>
                    </button>
                  </Show>
                  <Show when={tip.author_id === userId() || profile.data?.role === "admin"}>
                    <button type="button" class={`${styles.link}`} onClick={() => remove(tip.id)}>
                      Delete
                    </button>
                  </Show>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>
      <Show when={tips.isError}>
        <p class={`${errorText} ${css({ mt: "12px" })}`} role="alert">
          Couldn't load tips.
        </p>
        <button type="button" class={quietButton} onClick={() => tips.refetch()}>
          Try again
        </button>
      </Show>
    </div>
  );
}
