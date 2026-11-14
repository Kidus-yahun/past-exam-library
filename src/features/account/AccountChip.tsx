import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { css } from "styled-system/css";
import { authReady, session } from "~/lib/auth";
import { quietButton } from "~/ui/Page";
import { useProfile } from "./useProfile";

const styles = {
  chip: css({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    p: "8px",
    rounded: "md",
    transition: "background-color 120ms ease-out",
    _hover: { bg: "hover" },
  }),
  avatar: css({
    flex: "none",
    w: "32px",
    h: "32px",
    rounded: "full",
    bg: "brand.soft",
    color: "brand.strong",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "650",
  }),
  name: css({ fontSize: "14px", fontWeight: "600", lineClamp: 1 }),
  meta: css({ fontSize: "12.5px", color: "ink.subtle" }),
};

/** Sidebar footer: who is signed in (links to their progress), or a sign-in button. */
export function AccountChip() {
  const profile = useProfile();
  const name = () => profile.data?.display_name || session()?.user.email || "Student";

  return (
    <Show when={authReady()}>
      <Show
        when={session()}
        fallback={
          <A href="/signin" class={quietButton}>
            Sign in
          </A>
        }
      >
        <A href="/progress" class={styles.chip}>
          <span class={styles.avatar} aria-hidden="true">
            {name().slice(0, 1).toUpperCase()}
          </span>
          <span class={css({ minW: 0 })}>
            <span class={styles.name}>{name()}</span>
            <Show when={profile.data?.grade}>
              <span class={styles.meta}>Grade {profile.data?.grade}</span>
            </Show>
          </span>
        </A>
      </Show>
    </Show>
  );
}
