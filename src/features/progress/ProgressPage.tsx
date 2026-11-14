import { A, useNavigate } from "@solidjs/router";
import { useQueryClient } from "@tanstack/solid-query";
import { createMemo, For, Match, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import { useProfile } from "~/features/account/useProfile";
import { authReady, session, signOut } from "~/lib/auth";
import { FlameIcon } from "~/ui/icons";
import { button, Page, panel, quietButton } from "~/ui/Page";
import { ListSkeleton } from "~/ui/Skeleton";
import { ThemeSwitch } from "~/ui/ThemeSwitch";
import { useProgress } from "./api";
import { streakFrom, strengthOf, weekStrip } from "./progress";
import { StrengthMeter, WeekStrip } from "./widgets";

const styles = {
  eyebrow: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "10px" }),
  card: css({ p: "16px", display: "flex", flexDirection: "column", gap: "16px" }),
  stats: css({ display: "flex", flexWrap: "wrap", rowGap: "12px" }),
  stat: css({
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    px: "16px",
    borderLeft: "1px solid {colors.line}",
    _first: { borderLeft: 0, pl: 0 },
  }),
  statValue: css({ fontFamily: "mono", fontSize: "22px", fontWeight: "600" }),
  statLabel: css({ fontSize: "12.5px", color: "ink.subtle" }),
  list: css({ listStyle: "none", overflow: "hidden" }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minH: "60px",
    px: "16px",
    borderBottom: "1px solid {colors.line}",
    _last: { borderBottom: 0 },
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: { base: "1fr", lg: "minmax(0, 1.4fr) minmax(0, 1fr)" },
    gap: "24px",
    alignItems: "start",
  }),
  column: css({ display: "flex", flexDirection: "column", gap: "24px" }),
  muted: css({ fontSize: "14.5px", color: "ink.muted" }),
};

function SignedOut() {
  return (
    <section class={`${panel} ${styles.card}`}>
      <p class={styles.muted}>
        Sign in to keep a streak, earn XP and see which subjects need more practice.
      </p>
      <div class={css({ display: "flex", gap: "10px", flexWrap: "wrap" })}>
        <A href="/signin?mode=create&next=/progress" class={button}>
          Create a free account
        </A>
        <A href="/signin?next=/progress" class={quietButton}>
          Sign in
        </A>
      </div>
    </section>
  );
}

function Account() {
  const profile = useProfile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function leave() {
    await signOut();
    queryClient.clear();
    navigate("/", { replace: true });
  }

  return (
    <section aria-labelledby="account">
      <h2 id="account" class={styles.eyebrow}>
        Account
      </h2>
      <div class={`${panel} ${styles.card}`}>
        <div>
          <p class={css({ fontSize: "15px", fontWeight: "600" })}>
            {profile.data?.display_name || "Student"}
          </p>
          <p class={css({ fontSize: "13px", color: "ink.subtle" })}>{session()?.user.email}</p>
        </div>
        <p class={css({ fontSize: "14px", color: "ink.muted" })}>
          <Show when={profile.data?.grade} fallback="Grade not set">
            Grade {profile.data?.grade}
            {profile.data?.stream
              ? ` · ${profile.data.stream === "natural" ? "Natural" : "Social"} science`
              : ""}
          </Show>{" "}
          · daily goal {profile.data?.daily_goal_minutes ?? 25} min
        </p>
        <button type="button" class={quietButton} onClick={leave}>
          Sign out
        </button>
      </div>
    </section>
  );
}

function SignedIn() {
  const progress = useProgress();
  const streak = createMemo(() =>
    progress.data ? streakFrom(progress.data.days, progress.data.today) : null,
  );
  const accuracy = () =>
    progress.data && progress.data.answered > 0
      ? Math.round((progress.data.correct / progress.data.answered) * 100)
      : null;

  return (
    <div class={styles.grid}>
      <div class={styles.column}>
        <Switch>
          <Match when={progress.isError}>
            <p class={`${panel} ${styles.card} ${styles.muted}`} role="alert">
              Couldn't load your progress. Check your connection.
            </p>
          </Match>
          <Match when={progress.data}>
            {(p) => (
              <>
                <section aria-labelledby="streak" class={`${panel} ${styles.card}`}>
                  <div
                    class={css({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    })}
                  >
                    <h2
                      id="streak"
                      class={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "17px",
                        fontWeight: "650",
                      })}
                    >
                      <FlameIcon size={22} />
                      <span>
                        <span class="mono">{streak()?.current ?? 0}</span>-day streak
                      </span>
                    </h2>
                    <span class={css({ fontSize: "13px", color: "ink.subtle" })}>
                      Longest <span class="mono">{streak()?.longest ?? 0}</span>
                    </span>
                  </div>
                  <WeekStrip days={weekStrip(p().days, p().today)} />
                  <Show when={streak() && !streak()?.activeToday}>
                    <p class={css({ fontSize: "13.5px", color: "streak.ink" })}>
                      Answer one question today to keep your streak going.
                    </p>
                  </Show>
                </section>

                <div class={styles.stats}>
                  <div class={styles.stat}>
                    <span class={styles.statValue}>{p().xp.toLocaleString()}</span>
                    <span class={styles.statLabel}>XP earned</span>
                  </div>
                  <div class={styles.stat}>
                    <span class={styles.statValue}>{p().answered.toLocaleString()}</span>
                    <span class={styles.statLabel}>questions answered</span>
                  </div>
                  <div class={styles.stat}>
                    <span class={styles.statValue}>
                      {accuracy() === null ? "–" : `${accuracy()}%`}
                    </span>
                    <span class={styles.statLabel}>correct</span>
                  </div>
                </div>

                <section aria-labelledby="strength">
                  <h2 id="strength" class={styles.eyebrow}>
                    Subject strength
                  </h2>
                  <Show
                    when={p().subjects.length > 0}
                    fallback={
                      <div class={`${panel} ${styles.card}`}>
                        <p class={styles.muted}>
                          Practice a few questions and your subjects will show up here.
                        </p>
                        <A href="/practice" class={button}>
                          Start practising
                        </A>
                      </div>
                    }
                  >
                    <ul class={`${panel} ${styles.list}`}>
                      <For each={p().subjects}>
                        {(s) => (
                          <li class={styles.row}>
                            <div class={css({ flex: 1, minW: 0 })}>
                              <p class={css({ fontSize: "15px", fontWeight: "600" })}>{s.name}</p>
                              <p class={css({ fontSize: "12.5px", color: "ink.subtle" })}>
                                <span class="mono">
                                  {s.correct}/{s.answered}
                                </span>{" "}
                                correct
                              </p>
                            </div>
                            <StrengthMeter strength={strengthOf(s.correct, s.answered)} />
                          </li>
                        )}
                      </For>
                    </ul>
                  </Show>
                </section>
              </>
            )}
          </Match>
          <Match when={progress.isPending}>
            <ListSkeleton label="Loading progress" />
          </Match>
        </Switch>
      </div>

      <div class={styles.column}>
        <Account />
        <section aria-labelledby="appearance">
          <h2 id="appearance" class={styles.eyebrow}>
            Appearance
          </h2>
          <ThemeSwitch />
        </section>
      </div>
    </div>
  );
}

export default function ProgressPage() {
  return (
    <Page title="Progress">
      <Show when={authReady()}>
        <Show
          when={session()}
          fallback={
            <>
              <SignedOut />
              <section aria-labelledby="appearance" class={css({ maxW: "420px" })}>
                <h2 id="appearance" class={styles.eyebrow}>
                  Appearance
                </h2>
                <ThemeSwitch />
              </section>
            </>
          }
        >
          <SignedIn />
        </Show>
      </Show>
    </Page>
  );
}
