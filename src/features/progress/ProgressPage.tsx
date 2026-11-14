import { A, useNavigate } from "@solidjs/router";
import { useQueryClient } from "@tanstack/solid-query";
import { createMemo, For, Match, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import { useProfile } from "~/features/account/useProfile";
import { authReady, session, signOut } from "~/lib/auth";
import { CountdownWidget } from "~/ui/CountdownWidget";
import { ChevronRightIcon, FlameIcon, PracticeIcon, StudyIcon, ZapIcon } from "~/ui/icons";
import { button, Page, panel, quietButton } from "~/ui/Page";
import { ListSkeleton } from "~/ui/Skeleton";
import { ThemeSwitch } from "~/ui/ThemeSwitch";
import { useProgress } from "./api";
import { streakFrom, strengthOf, weekStrip } from "./progress";
import { StrengthMeter, WeekStrip } from "./widgets";

const CURRICULUM_SUBJECTS = [
  { name: "Mathematics", am: "ሒሳብ", desc: "Calculus, Vectors, Probability & Geometry" },
  { name: "Physics", am: "ፊዚክስ", desc: "Mechanics, Electricity, Waves & Modern Physics" },
  { name: "Chemistry", am: "ኬሚስትሪ", desc: "Chemical Bonding, Equilibrium & Organic Chem" },
  { name: "Biology", am: "ባዮሎጂ", desc: "Cell Biology, Genetics, Human Physiology & Ecology" },
  { name: "English", am: "እንግሊዝኛ", desc: "Reading Comprehension, Grammar & Vocabulary" },
  { name: "Civics", am: "ስነ-ዜጋ", desc: "Constitutional Principles, Ethics & Rule of Law" },
  { name: "History", am: "ታሪክ", desc: "Ethiopian History, World Civilizations & Modern Era" },
  { name: "Geography", am: "ጂኦግራፊ", desc: "Physical Geography, Climate, Map Reading & Ethiopia" },
  { name: "Information Technology", am: "አይቲ", desc: "Computer Architecture, Programming & Databases" },
  { name: "Agriculture", am: "ግብርና", desc: "Crop Production, Animal Husbandry & Soil Science" },
];

const styles = {
  eyebrow: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "10px" }),
  card: css({ p: "18px", display: "flex", flexDirection: "column", gap: "16px" }),
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
    justifyContent: "space-between",
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
  muted: css({ fontSize: "14.5px", color: "ink.muted", lineHeight: "1.5" }),
  subjectGrid: css({
    display: "grid",
    gridTemplateColumns: { base: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
    gap: "12px",
  }),
  subjectCard: css({
    p: "14px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "12px",
    border: "1px solid {colors.line}",
    rounded: "md",
    bg: "surface",
    transition: "border-color 140ms ease-out, background-color 140ms ease-out",
    _hover: { bg: "hover", borderColor: "brand" },
  }),
};

function GuestDashboard() {
  return (
    <div class={styles.column}>
      {/* Live Exam Countdown */}
      <CountdownWidget />

      {/* Guest Scholar Stats & Motivation */}
      <section class={`${panel} ${styles.card}`} aria-labelledby="guest-status-heading">
        <div class={css({ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" })}>
          <div>
            <span class={styles.eyebrow}>Student Desk</span>
            <h2 id="guest-status-heading" class={css({ fontSize: "20px", fontWeight: "700", letterSpacing: "-0.01em" })}>
              Guest Scholar
            </h2>
          </div>
          <span class={css({ fontSize: "12px", color: "brand", bg: "brand.soft", px: "10px", py: "4px", rounded: "md", fontWeight: "600" })}>
            Grade 9–12 Prep
          </span>
        </div>

        <div class={styles.stats}>
          <div class={styles.stat}>
            <div class={css({ display: "flex", alignItems: "center", gap: "6px" })}>
              <FlameIcon size={18} />
              <span class={styles.statValue}>0 Days</span>
            </div>
            <span class={styles.statLabel}>Current Streak</span>
          </div>

          <div class={styles.stat}>
            <div class={css({ display: "flex", alignItems: "center", gap: "6px" })}>
              <ZapIcon size={16} />
              <span class={styles.statValue}>Level 1</span>
            </div>
            <span class={styles.statLabel}>Scholar Rank</span>
          </div>

          <div class={styles.stat}>
            <span class={styles.statValue}>25m</span>
            <span class={styles.statLabel}>Daily Goal</span>
          </div>
        </div>

        <p class={styles.muted}>
          Start a 25-minute Pomodoro study sprint or practice authentic exam drills. When you create an account, all your progress is backed up securely to your profile.
        </p>

        <div class={css({ display: "flex", gap: "10px", flexWrap: "wrap" })}>
          <A href="/study" class={button}>
            <StudyIcon size={18} />
            Start Focus Sprint
          </A>
          <A href="/practice" class={quietButton}>
            <PracticeIcon size={18} />
            Start Practice Drill
          </A>
        </div>
      </section>

      {/* Curriculum Subject Explorer */}
      <section aria-labelledby="subjects-heading">
        <div class={css({ mb: "12px", display: "flex", justifyContent: "space-between", alignItems: "baseline" })}>
          <h2 id="subjects-heading" class={styles.eyebrow}>
            Curriculum Subject Matrix
          </h2>
          <span class={css({ fontSize: "12.5px", color: "ink.subtle" })}>Ethiopian Secondary Syllabus</span>
        </div>

        <div class={styles.subjectGrid}>
          <For each={CURRICULUM_SUBJECTS}>
            {(s) => (
              <div class={styles.subjectCard}>
                <div>
                  <div class={css({ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: "4px" })}>
                    <h3 class={css({ fontSize: "15px", fontWeight: "600", color: "ink" })}>{s.name}</h3>
                    <span class={css({ fontSize: "13px", color: "brand", fontFamily: "ethiopic", fontWeight: "500" })}>
                      {s.am}
                    </span>
                  </div>
                  <p class={css({ fontSize: "12.5px", color: "ink.subtle", lineHeight: "1.4" })}>{s.desc}</p>
                </div>
                <A
                  href="/practice"
                  class={css({
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12.5px",
                    fontWeight: "600",
                    color: "brand",
                    textDecoration: "none",
                    _hover: { color: "brand.strong" },
                  })}
                >
                  Practise Questions
                  <ChevronRightIcon size={14} />
                </A>
              </div>
            )}
          </For>
        </div>
      </section>

      {/* Cloud Account Sync Card */}
      <section class={`${panel} ${styles.card}`}>
        <h3 class={css({ fontSize: "17px", fontWeight: "650", letterSpacing: "-0.01em" })}>
          Sync Across Devices
        </h3>
        <p class={styles.muted}>
          Create a free account to track your accuracy per unit, save your daily study streaks, and see detailed explanations for every missed question.
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

      {/* Mobile-only Appearance Switch */}
      <section aria-labelledby="appearance" class={css({ hideFrom: "lg" })}>
        <h2 id="appearance" class={styles.eyebrow}>
          Appearance
        </h2>
        <ThemeSwitch />
      </section>
    </div>
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
        <Show when={profile.data?.role === "admin"}>
          <A href="/admin" class={quietButton}>
            Admin console
          </A>
        </Show>
        <button type="button" onClick={leave} class={quietButton}>
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
  const week = createMemo(() =>
    progress.data ? weekStrip(progress.data.days, progress.data.today) : [],
  );

  const totalAnswered = createMemo(() =>
    progress.data ? progress.data.subjects.reduce((sum, s) => sum + s.answered, 0) : 0,
  );
  const totalCorrect = createMemo(() =>
    progress.data ? progress.data.subjects.reduce((sum, s) => sum + s.correct, 0) : 0,
  );
  const accuracy = createMemo(() => {
    const answered = totalAnswered();
    if (answered === 0) return null;
    return Math.round((totalCorrect() / answered) * 100);
  });

  return (
    <div class={styles.grid}>
      <div class={styles.column}>
        <CountdownWidget />

        <Switch>
          <Match when={progress.data}>
            {(p) => (
              <>
                <section class={`${panel} ${styles.card}`} aria-labelledby="streak">
                  <div class={css({ display: "flex", justifyContent: "space-between", alignItems: "center" })}>
                    <h2 id="streak" class={styles.eyebrow}>
                      Daily goal
                    </h2>
                    <Show when={streak()}>
                      {(s) => (
                        <span class={css({ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", color: "streak.ink" })}>
                          <FlameIcon size={18} />
                          {s().current} {s().current === 1 ? "day" : "days"}
                        </span>
                      )}
                    </Show>
                  </div>
                  <WeekStrip days={week()} />
                </section>

                <div class={styles.stats}>
                  <div class={styles.stat}>
                    <span class={styles.statValue}>{p().today_answered}</span>
                    <span class={styles.statLabel}>today</span>
                  </div>
                  <div class={styles.stat}>
                    <span class={styles.statValue}>{totalAnswered()}</span>
                    <span class={styles.statLabel}>total answered</span>
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
        <section aria-labelledby="appearance" class={css({ hideFrom: "lg" })}>
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
    <Page title="Progress" lede="Your curriculum strengths, exam countdown and daily study streaks.">
      <Show when={authReady()}>
        <Show when={session()} fallback={<GuestDashboard />}>
          <SignedIn />
        </Show>
      </Show>
    </Page>
  );
}
