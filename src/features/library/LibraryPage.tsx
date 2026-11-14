import { SegmentGroup } from "@ark-ui/solid/segment-group";
import { useSearchParams } from "@solidjs/router";
import { useQuery } from "@tanstack/solid-query";
import { createEffect, createMemo, For, Match, on, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import { Page, panel, quietButton } from "~/ui/Page";
import { fetchPapers, fetchSubjects, GRADES, type Grade, type Subject } from "./api";
import { PaperRow } from "./PaperRow";
import { groupPapers } from "./papers";

const DEFAULT_GRADE: Grade = 12;

function parseGrade(raw: string | undefined): Grade {
  const n = Number(raw);
  return (GRADES as readonly number[]).includes(n) ? (n as Grade) : DEFAULT_GRADE;
}

function subjectLabel(subject: Subject) {
  return subject.id === "amharic" && subject.name_am ? subject.name_am : subject.name;
}

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
    "&[data-state=checked]": { bg: "ink", borderColor: "ink", color: "bg" },
    "&[data-focus-visible]": { outline: "2px solid {colors.focus}", outlineOffset: "2px" },
  }),
  groupLabel: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "8px" }),
  list: css({ listStyle: "none", px: "14px" }),
  skeleton: css({
    h: "68px",
    borderBottom: "1px solid {colors.line}",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    _last: { borderBottom: 0 },
  }),
  skeletonBar: css({ h: "12px", rounded: "6px", bg: "sunk" }),
  notice: css({
    p: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "flex-start",
    fontSize: "14.5px",
    color: "ink.muted",
  }),
};

export default function LibraryPage() {
  const [params, setParams] = useSearchParams<{ grade?: string; subject?: string }>();
  const grade = () => parseGrade(params.grade);

  const subjects = useQuery(() => ({
    queryKey: ["subjects", grade()],
    queryFn: () => fetchSubjects(grade()),
  }));

  const subject = createMemo(() => {
    const list = subjects.data;
    if (!list) return undefined;
    return list.find((s) => s.id === params.subject) ?? list[0];
  });

  const papers = useQuery(() => ({
    queryKey: ["papers", grade(), subject()?.id],
    queryFn: () => fetchPapers(grade(), subject()?.id ?? ""),
    enabled: subject() !== undefined,
  }));

  const groups = createMemo(() => groupPapers(papers.data ?? []));

  // On phones the subject chips scroll sideways; keep the chosen one in view
  // (e.g. when the page opens on a subject far down the list).
  let subjectsEl: HTMLDivElement | undefined;
  createEffect(
    on(subject, (current) => {
      if (!current) return;
      requestAnimationFrame(() => {
        subjectsEl
          ?.querySelector("[data-state=checked]")
          ?.scrollIntoView({ block: "nearest", inline: "nearest" });
      });
    }),
  );

  return (
    <Page title="Library" lede="Past papers by grade and subject.">
      <SegmentGroup.Root
        class={styles.grades}
        value={String(grade())}
        onValueChange={(d) => d.value && setParams({ grade: d.value, subject: undefined })}
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

      <Show when={subjects.data}>
        {(list) => (
          <SegmentGroup.Root
            ref={subjectsEl}
            class={styles.subjects}
            value={subject()?.id ?? null}
            onValueChange={(d) => d.value && setParams({ subject: d.value })}
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

      <Switch>
        <Match when={subjects.isError || papers.isError}>
          <div class={`${panel} ${styles.notice}`} role="alert">
            <p>Couldn't load papers. Check your connection and try again.</p>
            <button
              type="button"
              class={quietButton}
              onClick={() => (subjects.isError ? subjects.refetch() : papers.refetch())}
            >
              Try again
            </button>
          </div>
        </Match>
        <Match when={subjects.isPending || papers.isPending}>
          <div class={panel} role="status" aria-busy="true" aria-label="Loading papers">
            <ul class={styles.list}>
              <For each={[0, 1, 2]}>
                {() => (
                  <li class={styles.skeleton}>
                    <span class={css({ w: "36px", h: "40px", rounded: "sm", bg: "sunk" })} />
                    <span
                      class={css({ flex: 1, display: "flex", flexDirection: "column", gap: "8px" })}
                    >
                      <span class={`${styles.skeletonBar} ${css({ w: "40%" })}`} />
                      <span class={`${styles.skeletonBar} ${css({ w: "60%" })}`} />
                    </span>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Match>
        <Match when={groups().length === 0}>
          <div class={`${panel} ${styles.notice}`}>
            <p>
              No {subject()?.name} papers for Grade {grade()} yet.
            </p>
          </div>
        </Match>
        <Match when={groups().length > 0}>
          <For each={groups()}>
            {(group) => (
              <section aria-labelledby={`group-${group.key}`}>
                <h2 id={`group-${group.key}`} class={styles.groupLabel}>
                  {group.label}
                </h2>
                <ul class={`${panel} ${styles.list}`}>
                  <For each={group.papers}>{(paper) => <PaperRow paper={paper} />}</For>
                </ul>
              </section>
            )}
          </For>
        </Match>
      </Switch>
    </Page>
  );
}
