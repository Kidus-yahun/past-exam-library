import { SegmentGroup } from "@ark-ui/solid/segment-group";
import { useSearchParams } from "@solidjs/router";
import { useQuery } from "@tanstack/solid-query";
import { createEffect, createMemo, For, on, Show } from "solid-js";
import { css } from "styled-system/css";
import { useProfile } from "~/features/account/useProfile";
import { fetchSubjects, GRADES, type Grade, type Subject } from "./api";

const DEFAULT_GRADE: Grade = 12;

function parseGrade(raw: string | undefined, fallback: number | null | undefined): Grade {
  const asGrade = (n: number) => ((GRADES as readonly number[]).includes(n) ? (n as Grade) : null);
  return asGrade(Number(raw)) ?? asGrade(Number(fallback)) ?? DEFAULT_GRADE;
}

export function subjectLabel(subject: Subject) {
  return subject.id === "amharic" && subject.name_am ? subject.name_am : subject.name;
}

/**
 * Grade and subject kept in the URL (?grade=12&subject=physics) so screens can
 * be linked and survive a refresh. Without ?grade a signed-in student starts at
 * their own grade.
 */
export function useGradeSubject() {
  const [params, setParams] = useSearchParams<{ grade?: string; subject?: string }>();
  const profile = useProfile();
  const grade = () => parseGrade(params.grade, profile.data?.grade);

  const subjects = useQuery(() => ({
    queryKey: ["subjects", grade()],
    queryFn: () => fetchSubjects(grade()),
  }));

  const subject = createMemo(() => {
    const list = subjects.data;
    if (!list) return undefined;
    return list.find((s) => s.id === params.subject) ?? list[0];
  });

  return {
    grade,
    subjects,
    subject,
    setGrade: (g: string) => setParams({ grade: g, subject: undefined }),
    setSubject: (s: string) => setParams({ grade: String(grade()), subject: s }),
  };
}

export type GradeSubject = ReturnType<typeof useGradeSubject>;

const styles = {
  grades: css({
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "4px",
    p: "4px",
    bg: "sunk",
    rounded: "md",
    w: { base: "100%", md: "360px" },
  }),
  grade: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minH: "40px",
    rounded: "9px",
    fontSize: "14px",
    fontWeight: "600",
    color: "ink.muted",
    cursor: "pointer",
    "&[data-state=checked]": { bg: "surface", color: "ink", boxShadow: "raised" },
    "&[data-focus-visible]": { outline: "2px solid {colors.focus}", outlineOffset: "2px" },
  }),
  subjects: css({
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    scrollbarWidth: "none",
    mx: { base: "-20px", lg: 0 },
    px: { base: "20px", lg: 0 },
    flexWrap: { base: "nowrap", lg: "wrap" },
  }),
  subject: css({
    flex: "none",
    display: "flex",
    alignItems: "center",
    minH: "40px",
    px: "14px",
    rounded: "full",
    border: "1px solid {colors.line}",
    bg: "surface",
    fontSize: "14px",
    fontWeight: "500",
    color: "ink.muted",
    cursor: "pointer",
    transition: "background-color 120ms ease-out",
    _hover: { bg: "hover" },
    "&[data-state=checked]": { bg: "ink", borderColor: "ink", color: "bg" },
    "&[data-focus-visible]": { outline: "2px solid {colors.focus}", outlineOffset: "2px" },
  }),
};

export function GradeSubjectPicker(props: { state: GradeSubject }) {
  // On phones the subject chips scroll sideways; keep the chosen one in view.
  let subjectsEl: HTMLDivElement | undefined;
  createEffect(
    on(props.state.subject, (current) => {
      if (!current) return;
      requestAnimationFrame(() => {
        subjectsEl
          ?.querySelector("[data-state=checked]")
          ?.scrollIntoView({ block: "nearest", inline: "nearest" });
      });
    }),
  );

  return (
    <>
      <SegmentGroup.Root
        class={styles.grades}
        value={String(props.state.grade())}
        onValueChange={(d) => d.value && props.state.setGrade(d.value)}
        aria-label="Grade"
      >
        <For each={GRADES}>
          {(g, i) => (
            <SegmentGroup.Item value={String(g)} class={styles.grade}>
              <SegmentGroup.ItemText>{i() === 0 ? `Grade ${g}` : g}</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          )}
        </For>
      </SegmentGroup.Root>

      <Show when={props.state.subjects.data}>
        {(list) => (
          <SegmentGroup.Root
            ref={subjectsEl}
            class={styles.subjects}
            value={props.state.subject()?.id ?? null}
            onValueChange={(d) => d.value && props.state.setSubject(d.value)}
            aria-label="Subject"
          >
            <For each={list()}>
              {(s) => (
                <SegmentGroup.Item value={s.id} class={styles.subject}>
                  <SegmentGroup.ItemText lang={s.id === "amharic" ? "am" : undefined}>
                    {subjectLabel(s)}
                  </SegmentGroup.ItemText>
                  <SegmentGroup.ItemControl />
                  <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
              )}
            </For>
          </SegmentGroup.Root>
        )}
      </Show>
    </>
  );
}
