import { Tabs } from "@ark-ui/solid/tabs";
import { A, useNavigate, useSearchParams } from "@solidjs/router";
import { createEffect, createSignal, Show } from "solid-js";
import { css } from "styled-system/css";
import { authReady, fetchProfile, session, signIn, signInWithGoogle, signUp } from "~/lib/auth";
import { env } from "~/lib/env";
import { errorText, field, input, label } from "~/ui/forms";
import { LibraryIcon } from "~/ui/icons";
import { button, quietButton } from "~/ui/Page";

/** Only same-site paths, so a crafted link can't send people elsewhere after sign-in. */
export function safeNext(next: string | undefined): string {
  return next?.startsWith("/") && !next.startsWith("//") ? next : "/";
}

function friendlyError(message: string): string {
  if (/invalid login credentials/i.test(message)) return "That email and password don't match.";
  if (/already registered/i.test(message))
    return "That email already has an account. Sign in instead.";
  if (/password should be at least/i.test(message))
    return "Use at least 6 characters for your password.";
  if (/rate limit/i.test(message)) return "Too many tries. Wait a minute and try again.";
  if (/fetch|network/i.test(message)) return "Can't reach the server. Check your connection.";
  return message;
}

const styles = {
  screen: css({
    minH: "100dvh",
    display: "flex",
    alignItems: { base: "flex-start", sm: "center" },
    justifyContent: "center",
    px: "20px",
    py: "40px",
  }),
  card: css({ w: "100%", maxW: "400px", display: "flex", flexDirection: "column", gap: "24px" }),
  mark: css({
    w: "44px",
    h: "44px",
    rounded: "12px",
    bg: "brand",
    color: "brand.fg",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  title: css({ fontSize: "26px", fontWeight: "650", letterSpacing: "-0.02em" }),
  lede: css({ mt: "6px", fontSize: "14.5px", color: "ink.muted" }),
  tabs: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "4px",
    p: "4px",
    bg: "sunk",
    rounded: "md",
  }),
  tab: css({
    minH: "40px",
    rounded: "9px",
    fontSize: "14px",
    fontWeight: "600",
    color: "ink.muted",
    cursor: "pointer",
    "&[data-selected]": { bg: "surface", color: "ink", boxShadow: "raised" },
    "&[data-focus-visible]": { outline: "2px solid {colors.focus}", outlineOffset: "2px" },
  }),
  form: css({ display: "flex", flexDirection: "column", gap: "16px" }),
  or: css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "13px",
    color: "ink.subtle",
    _before: { content: '""', flex: 1, h: "1px", bg: "line" },
    _after: { content: '""', flex: 1, h: "1px", bg: "line" },
  }),
  guest: css({
    alignSelf: "center",
    fontSize: "14px",
    color: "ink.muted",
    _hover: { color: "ink" },
  }),
  notice: css({ fontSize: "14px", color: "ink.muted", p: "14px", rounded: "md", bg: "brand.soft" }),
};

export default function SignInPage() {
  const [params] = useSearchParams<{ next?: string; mode?: string }>();
  const navigate = useNavigate();
  const [mode, setMode] = createSignal<"signin" | "create">(
    params.mode === "create" ? "create" : "signin",
  );
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [notice, setNotice] = createSignal("");
  const [busy, setBusy] = createSignal(false);

  // Once signed in (now or from an earlier visit), leave this screen:
  // onboarding first if it isn't done, otherwise where the student was headed.
  createEffect(() => {
    const id = session()?.user.id;
    if (!authReady() || !id || busy()) return;
    void fetchProfile(id)
      .catch(() => null)
      .then((profile) => {
        navigate(profile?.onboarded_at ? safeNext(params.next) : "/welcome", { replace: true });
      });
  });

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    try {
      if (mode() === "signin") {
        await signIn(email().trim(), password());
      } else {
        const { signedIn } = await signUp(email().trim(), password(), name().trim());
        if (!signedIn) {
          setNotice(`Check ${email().trim()} for a link to confirm your account.`);
        }
      }
    } catch (e) {
      setError(friendlyError(e instanceof Error ? e.message : String(e)));
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setError("");
    try {
      await signInWithGoogle();
    } catch (e) {
      setError(friendlyError(e instanceof Error ? e.message : String(e)));
    }
  }

  return (
    <main class={styles.screen}>
      <div class={styles.card}>
        <div>
          <span class={styles.mark}>
            <LibraryIcon size={22} strokeWidth={2} />
          </span>
          <h1 class={`${styles.title} ${css({ mt: "20px" })}`}>
            {mode() === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p class={styles.lede}>Save your practice, keep your streak and pick up on any device.</p>
        </div>

        <Tabs.Root value={mode()} onValueChange={(d) => setMode(d.value as "signin" | "create")}>
          <Tabs.List class={styles.tabs}>
            <Tabs.Trigger value="signin" class={styles.tab}>
              Sign in
            </Tabs.Trigger>
            <Tabs.Trigger value="create" class={styles.tab}>
              Create account
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        <form class={styles.form} onSubmit={submit} noValidate={false}>
          <Show when={mode() === "create"}>
            <div class={field}>
              <label class={label} for="name">
                Your name
              </label>
              <input
                id="name"
                class={input}
                autocomplete="name"
                required
                maxLength={60}
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
              />
            </div>
          </Show>
          <div class={field}>
            <label class={label} for="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              class={input}
              autocomplete="email"
              inputMode="email"
              required
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div class={field}>
            <label class={label} for="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              class={input}
              autocomplete={mode() === "signin" ? "current-password" : "new-password"}
              minLength={6}
              required
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              aria-invalid={error() !== "" ? "true" : undefined}
              aria-describedby={error() ? "auth-error" : undefined}
            />
          </div>
          <Show when={error()}>
            <p id="auth-error" class={errorText} role="alert">
              {error()}
            </p>
          </Show>
          <Show when={notice()}>
            <p class={styles.notice} role="status">
              {notice()}
            </p>
          </Show>
          <button type="submit" class={button} disabled={busy()}>
            {busy() ? "Please wait…" : mode() === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <Show when={env.VITE_AUTH_GOOGLE === "true"}>
          <p class={styles.or}>or</p>
          <button type="button" class={quietButton} onClick={google}>
            Continue with Google
          </button>
        </Show>

        <A href="/library" class={styles.guest}>
          Keep browsing without an account
        </A>
      </div>
    </main>
  );
}
