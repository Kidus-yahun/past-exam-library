import { A } from "@solidjs/router";
import { useQuery } from "@tanstack/solid-query";
import { createMemo, For, Match, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import { useProfile } from "~/features/account/useProfile";
import { fetchBookmarkedPapers } from "~/features/library/api";
import { PaperRow } from "~/features/library/PaperRow";
import { fetchUnfinishedAttempts } from "~/features/practice/api";
import { attemptLabel } from "~/features/practice/PracticeHubPage";
import { useProgress } from "~/features/progress/api";
import { minutesFromAnswers, streakFrom, weakestSubjects } from "~/features/progress/progress";
import { StreakChip, StrengthMeter } from "~/features/progress/widgets";
import { authReady, session, userId } from "~/lib/auth";
import { ChevronRightIcon, LibraryIcon, PracticeIcon } from "~/ui/icons";
import { button, panel, quietButton } from "~/ui/Page";

const styles = {
  page: css({
    maxW: "720px",
    mx: { base: 0, lg: "auto" },
    px: { base: "20px", lg: "40px" },
    pt: "28px",
    pb: "48px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  }),
  header: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  }),
  hello: css({ fontSize: "26px", fontWeight: "650", letterSpacing: "-0.02em" }),
  sub: css({ fontSize: "13px", color: "ink.subtle" }),
  eyebrow: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "10px" }),
  card: css({ p: "18px", display: "flex", flexDirection: "column", gap: "14px" }),
  cardTitle: css({ fontSize: "19px", fontWeight: "600", letterSpacing: "-0.01em" }),
  track: css({ h: "6px", rounded: "3px", bg: "sunk", overflow: "hidden" }),
  list: css({ listStyle: "none", overflow: "hidden" }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minH: "64px",
    px: "16px",
    borderBottom: "1px solid {colors.line}",
    transition: "background-color 120ms ease-out",
    _hover: { bg: "hover" },
    _last: { borderBottom: 0 },
  }),
  muted: css({ fontSize: "14.5px", color: "ink.muted" }),
  hero: css({
    fontSize: { base: "30px", md: "38px" },
    fontWeight: "650",
    letterSpacing: "-0.025em",
    lineHeight: 1.15,
    textWrap: "balance",
  }),
  actions: css({ display: "flex", gap: "10px", flexWrap: "wrap" }),
};

function Welcome() {
  return (
    <div class={styles.page}>
      <section
        class={css({
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          pt: { base: "8px", md: "24px" },
        })}
      >
        <h1 class={styles.hero}>Past papers and real exam questions for Grades 9–12.</h1>
        <p class={styles.muted}>
          Read papers from Ethiopian schools, practise their questions with explanations, and keep a
          daily streak going until exam day.
        </p>
        <div class={styles.actions}>
          <A href="/library" class={button}>
            <LibraryIcon size={18} />
            Browse the library
          </A>
          <A href="/practice" class={quietButton}>
            <PracticeIcon size={18} />
            Practise questions
          </A>
        </div>
      </section>
      <section class={`${panel} ${styles.card}`}>
        <p class={styles.muted}>
          Create a free account to save your practice, keep a streak and see which subjects need
          work.
        </p>
        <div class={styles.actions}>
          <A href="/signin?mode=create" class={button}>
            Create account
          </A>
          <A href="/signin" class={quietButton}>
            Sign in
          </A>
        </div>
      </section>
    </div>
  );
}

function Dashboard() {
  const profile = useProfile();
  const progress = useProgress();
  const unfinished = useQuery(() => ({
    queryKey: ["attempts", "unfinished", userId()],
    queryFn: () => fetchUnfinishedAttempts(),
    enabled: userId() !== null,
  }));

  const streak = createMemo(() =>
    progress.data ? streakFrom(progress.data.days, progress.data.today) : null,
  );
  const resume = () => unfinished.data?.[0];
  const goal = () => profile.data?.daily_goal_minutes ?? 25;
  // Practice time (at exam pace) plus finished 25-minute focus sprints.
  const minutesToday = () =>
    minutesFromAnswers(progress.data?.today_answered ?? 0) +
    (progress.data?.today_focus_minutes ?? 0);
  const review = createMemo(() => (progress.data ? weakestSubjects(progress.data) : []));
  const grade = () => profile.data?.grade ?? 12;
  const bookmarked = useQuery(() => ({
    queryKey: ["bookmarked-papers", userId()],
    queryFn: fetchBookmarkedPapers,
    enabled: userId() !== null,
  }));

  return (
    <div class={styles.page}>
      <header class={styles.header}>
        <div>
          <Show when={profile.data?.grade}>
            <p class={styles.sub}>
              Grade {profile.data?.grade}
              {profile.data?.stream
                ? ` · ${profile.data.stream === "natural" ? "Natural" : "Social"} science`
                : ""}
            </p>
          </Show>
          <h1 class={styles.hello}>
            Selam{profile.data?.display_name ? `, ${profile.data.display_name}` : ""}
          </h1>
        </div>
        <Show when={streak()}>{(s) => <StreakChip count={s().current} />}</Show>
      </header>

      <section aria-labelledby="continue">
        <h2 id="continue" class={styles.eyebrow}>
          {resume() ? "Continue" : "Start"}
        </h2>
        <Switch>
          <Match when={resume()}>
            {(a) => {
              const done = () => a().answers[0]?.count ?? 0;
              const total = () => a().question_ids.length;
              return (
                <div class={`${panel} ${styles.card}`}>
                  <div
                    class={css({
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      fontSize: "13px",
                      color: "ink.subtle",
                    })}
                  >
                    <span>{a().mode === "exam" ? "Exam mode" : "Practice"}</span>
                    <span class="mono">
                      {done()}/{total()}
                    </span>
                  </div>
                  <p class={styles.cardTitle}>{attemptLabel(a())}</p>
                  <div
                    class={styles.track}
                    role="img"
                    aria-label={`${done()} of ${total()} answered`}
                  >
                    <span
                      class={css({ display: "block", h: "100%", bg: "brand" })}
                      style={{ width: `${(done() / total()) * 100}%` }}
                    />
                  </div>
                  <A href={`/practice/session?attempt=${a().id}`} class={button}>
                    Continue
                    <ChevronRightIcon size={18} />
                  </A>
                </div>
              );
            }}
          </Match>
          <Match when={true}>
            <div class={`${panel} ${styles.card}`}>
              <p class={styles.cardTitle}>
                {review()[0] ? `Practise ${review()[0]?.name}` : "Practise 20 questions"}
              </p>
              <p class={styles.muted}>
                {review()[0]
                  ? "Your weakest subject so far. A short mixed set helps most."
                  : "A mixed set from real Grade papers, with explanations as you go."}
              </p>
              <A
                href={
                  review()[0]
                    ? `/practice/session?grade=${grade()}&subject=${review()[0]?.subject}&mode=practice`
                    : `/practice?grade=${grade()}`
                }
                class={button}
              >
                Start practice
              </A>
            </div>
          </Match>
        </Switch>
      </section>

      <section aria-labelledby="today">
        <h2 id="today" class={styles.eyebrow}>
          Today's goal
        </h2>
        <div class={css({ display: "flex", flexDirection: "column", gap: "8px" })}>
          <div
            class={styles.track}
            role="img"
            aria-label={`About ${minutesToday()} of ${goal()} minutes today`}
          >
            <span
              class={css({
                display: "block",
                h: "100%",
                bg: "brand",
                transition: "width 300ms ease-out",
              })}
              style={{ width: `${Math.min(100, (minutesToday() / goal()) * 100)}%` }}
            />
          </div>
          <p class={css({ fontSize: "14px", color: "ink.muted" })}>
            <Show
              when={minutesToday() >= goal()}
              fallback={
                <>
                  About <strong class="mono">{minutesToday()}</strong> of{" "}
                  <span class="mono">{goal()}</span> minutes today
                </>
              }
            >
              Goal reached: about <strong class="mono">{minutesToday()}</strong> minutes today
            </Show>
          </p>
        </div>
      </section>

      <Show when={review().length > 0}>
        <section aria-labelledby="review">
          <div
            class={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            })}
          >
            <h2 id="review" class={styles.eyebrow}>
              Review these subjects
            </h2>
            <A
              href="/progress"
              class={css({ fontSize: "13px", fontWeight: "600", color: "brand" })}
            >
              All subjects
            </A>
          </div>
          <ul class={`${panel} ${styles.list}`}>
            <For each={review()}>
              {(s) => (
                <li>
                  <A
                    href={`/practice/session?grade=${grade()}&subject=${s.subject}&mode=practice`}
                    class={styles.row}
                  >
                    <div class={css({ flex: 1, minW: 0 })}>
                      <p class={css({ fontSize: "15px", fontWeight: "600" })}>{s.name}</p>
                      <p class={css({ fontSize: "12.5px", color: "ink.subtle" })}>
                        <span class="mono">
                          {s.correct}/{s.answered}
                        </span>{" "}
                        correct
                      </p>
                    </div>
                    <StrengthMeter strength={s.strength} />
                  </A>
                </li>
              )}
            </For>
          </ul>
        </section>
      </Show>
      <Show when={(bookmarked.data?.length ?? 0) > 0}>
        <section aria-labelledby="bookmarked">
          <h2 id="bookmarked" class={styles.eyebrow}>
            Bookmarked papers
          </h2>
          <ul class={`${panel} ${css({ listStyle: "none", overflow: "hidden" })}`}>
            <For each={bookmarked.data}>
              {(paper) => (
                <PaperRow paper={paper} context={`Grade ${paper.grade} ${paper.subjectName}`} />
              )}
            </For>
          </ul>
        </section>
      </Show>
    </div>
  );
}

export default function HomePage() {
  return (
    <Show when={authReady()}>
      <Show when={session()} fallback={<Welcome />}>
        <Dashboard />
      </Show>
    </Show>
  );
}
