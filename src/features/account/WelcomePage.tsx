import { RadioGroup } from "@ark-ui/solid/radio-group";
import { useNavigate } from "@solidjs/router";
import { useQueryClient } from "@tanstack/solid-query";
import { createEffect, createSignal, For, Match, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import { type Profile, updateProfile, userId } from "~/lib/auth";
import { choice, errorText } from "~/ui/forms";
import { button, quietButton } from "~/ui/Page";
import { RequireAuth } from "./RequireAuth";
import { useProfile } from "./useProfile";

type Grade = 9 | 10 | 11 | 12;
type Stream = "natural" | "social";
type Goal = Profile["daily_goal_minutes"];

const GOALS: { value: Goal; label: string; hint: string }[] = [
  { value: 15, label: "15 minutes", hint: "A light daily habit" },
  { value: 25, label: "25 minutes", hint: "One focus sprint" },
  { value: 50, label: "50 minutes", hint: "Exam season" },
];

const styles = {
  screen: css({
    minH: "100dvh",
    display: "flex",
    justifyContent: "center",
    px: "20px",
    py: "40px",
  }),
  card: css({ w: "100%", maxW: "440px", display: "flex", flexDirection: "column", gap: "24px" }),
  steps: css({ display: "flex", gap: "6px" }),
  step: css({ flex: 1, h: "4px", rounded: "2px", bg: "line", "&[data-done]": { bg: "brand" } }),
  title: css({ fontSize: "24px", fontWeight: "650", letterSpacing: "-0.02em" }),
  lede: css({ mt: "6px", fontSize: "14.5px", color: "ink.muted" }),
  options: css({ display: "flex", flexDirection: "column", gap: "10px" }),
  hint: css({ ml: "auto", fontSize: "13px", fontWeight: "500", color: "ink.subtle" }),
  actions: css({ display: "flex", gap: "10px", "& > *:last-child": { flex: 1 } }),
  skip: css({ alignSelf: "center", fontSize: "14px", color: "ink.muted", cursor: "pointer" }),
};

function Choices<T extends string | number>(props: {
  label: string;
  value: T | null;
  options: { value: T; label: string; hint?: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <RadioGroup.Root
      class={styles.options}
      aria-label={props.label}
      value={props.value === null ? null : String(props.value)}
      onValueChange={(d) => {
        const picked = props.options.find((o) => String(o.value) === d.value);
        if (picked) props.onChange(picked.value);
      }}
    >
      <For each={props.options}>
        {(option) => (
          <RadioGroup.Item value={String(option.value)} class={choice}>
            <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
            <Show when={option.hint}>
              <span class={styles.hint}>{option.hint}</span>
            </Show>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        )}
      </For>
    </RadioGroup.Root>
  );
}

function Onboarding() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const profile = useProfile();

  const [step, setStep] = createSignal(0);
  const [grade, setGrade] = createSignal<Grade | null>(null);
  const [stream, setStream] = createSignal<Stream | null>(null);
  const [goal, setGoal] = createSignal<Goal>(25);
  const [saving, setSaving] = createSignal(false);
  const [error, setError] = createSignal("");

  // Streams only exist from Grade 11.
  const needsStream = () => grade() === 11 || grade() === 12;
  const stepCount = () => (needsStream() ? 3 : 2);
  const isGoalStep = () => step() === stepCount() - 1;

  // Someone who already finished onboarding has nothing to do here.
  createEffect(() => {
    if (profile.data?.onboarded_at) navigate("/", { replace: true });
  });

  async function finish(skip = false) {
    const id = userId();
    if (!id) return;
    setSaving(true);
    setError("");
    try {
      await updateProfile(id, {
        ...(skip ? {} : { grade: grade(), stream: needsStream() ? stream() : null }),
        daily_goal_minutes: goal(),
        onboarded_at: new Date().toISOString(),
      });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate(grade() && !skip ? `/library?grade=${grade()}` : "/", { replace: true });
    } catch {
      setError("Couldn't save. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  const canContinue = () =>
    step() === 0 ? grade() !== null : step() === 1 && needsStream() ? stream() !== null : true;

  return (
    <main class={styles.screen}>
      <div class={styles.card}>
        <div class={styles.steps} role="img" aria-label={`Step ${step() + 1} of ${stepCount()}`}>
          <For each={Array.from({ length: stepCount() })}>
            {(_, i) => <span class={styles.step} data-done={i() <= step() ? "" : undefined} />}
          </For>
        </div>

        <Switch>
          <Match when={step() === 0}>
            <div>
              <h1 class={styles.title}>
                Selam{profile.data?.display_name ? `, ${profile.data.display_name}` : ""}
              </h1>
              <p class={styles.lede}>Which grade are you in? We'll open the library there.</p>
            </div>
            <Choices
              label="Grade"
              value={grade()}
              options={[9, 10, 11, 12].map((g) => ({ value: g as Grade, label: `Grade ${g}` }))}
              onChange={setGrade}
            />
          </Match>
          <Match when={step() === 1 && needsStream()}>
            <div>
              <h1 class={styles.title}>Your stream</h1>
              <p class={styles.lede}>So practice and national-exam papers match your subjects.</p>
            </div>
            <Choices
              label="Stream"
              value={stream()}
              options={[
                { value: "natural" as Stream, label: "Natural science" },
                { value: "social" as Stream, label: "Social science" },
              ]}
              onChange={setStream}
            />
          </Match>
          <Match when={isGoalStep()}>
            <div>
              <h1 class={styles.title}>Daily goal</h1>
              <p class={styles.lede}>
                How long do you want to study each day? You can change it later.
              </p>
            </div>
            <Choices label="Daily goal" value={goal()} options={GOALS} onChange={setGoal} />
          </Match>
        </Switch>

        <Show when={error()}>
          <p class={errorText} role="alert">
            {error()}
          </p>
        </Show>

        <div class={styles.actions}>
          <Show when={step() > 0}>
            <button type="button" class={quietButton} onClick={() => setStep((s) => s - 1)}>
              Back
            </button>
          </Show>
          <button
            type="button"
            class={button}
            disabled={!canContinue() || saving()}
            onClick={() => (isGoalStep() ? finish() : setStep((s) => s + 1))}
          >
            {isGoalStep() ? (saving() ? "Saving…" : "Start studying") : "Continue"}
          </button>
        </div>

        <button type="button" class={styles.skip} onClick={() => finish(true)} disabled={saving()}>
          Skip for now
        </button>
      </div>
    </main>
  );
}

export default function WelcomePage() {
  return (
    <RequireAuth>
      <Onboarding />
    </RequireAuth>
  );
}
