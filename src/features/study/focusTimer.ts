import { createRoot, createSignal } from "solid-js";
import { formatClock } from "~/features/practice/session";
import { userId } from "~/lib/auth";
import { recordFocusSession } from "./api";

export type TimerMode = "focus" | "break";
export const DURATION: Record<TimerMode, number> = { focus: 25 * 60, break: 5 * 60 };

/**
 * One app-wide focus timer, so it keeps running while the student moves
 * between screens. Time is measured against a deadline, not by counting ticks,
 * so it stays right even when the browser throttles a background tab.
 */
const timer = createRoot(() => {
  const [mode, setMode] = createSignal<TimerMode>("focus");
  const [remaining, setRemaining] = createSignal(DURATION.focus);
  const [running, setRunning] = createSignal(false);
  const [completedToday, setCompletedToday] = createSignal(0);
  let endsAt = 0;
  let interval: ReturnType<typeof setInterval> | undefined;
  const originalTitle = document.title;

  function updateTitle() {
    document.title = running()
      ? `(${formatClock(remaining())}) ${mode() === "focus" ? "Focus" : "Break"} · Past Exam Library`
      : originalTitle;
  }

  function stopTicking() {
    clearInterval(interval);
    interval = undefined;
  }

  function complete() {
    stopTicking();
    setRunning(false);
    chime();
    if (mode() === "focus") {
      setCompletedToday((n) => n + 1);
      if (userId()) void recordFocusSession(DURATION.focus / 60).catch(() => {});
      setMode("break");
      setRemaining(DURATION.break);
    } else {
      setMode("focus");
      setRemaining(DURATION.focus);
    }
    updateTitle();
  }

  function tick() {
    const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
    setRemaining(left);
    updateTitle();
    if (left === 0) complete();
  }

  return {
    mode,
    remaining,
    running,
    completedToday,
    start() {
      if (running()) return;
      endsAt = Date.now() + remaining() * 1000;
      setRunning(true);
      interval = setInterval(tick, 250);
      tick();
    },
    pause() {
      if (!running()) return;
      tick();
      stopTicking();
      setRunning(false);
      updateTitle();
    },
    reset() {
      stopTicking();
      setRunning(false);
      setRemaining(DURATION[mode()]);
      updateTitle();
    },
    switchTo(next: TimerMode) {
      stopTicking();
      setRunning(false);
      setMode(next);
      setRemaining(DURATION[next]);
      updateTitle();
    },
  };
});

export const focusTimer = timer;

/** A soft two-note chime; silently skipped where audio isn't allowed. */
function chime() {
  try {
    const audio = new AudioContext();
    const notes = [660, 880];
    notes.forEach((frequency, i) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.frequency.value = frequency;
      osc.type = "sine";
      const start = audio.currentTime + i * 0.22;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
      osc.connect(gain).connect(audio.destination);
      osc.start(start);
      osc.stop(start + 0.55);
    });
    setTimeout(() => void audio.close(), 1500);
  } catch {
    // No audio available; the timer still switches modes.
  }
}
