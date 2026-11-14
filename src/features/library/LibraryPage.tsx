import { useQuery } from "@tanstack/solid-query";
import { createMemo, For, Match, Switch } from "solid-js";
import { css } from "styled-system/css";
import { Page, panel, quietButton } from "~/ui/Page";
import { ListSkeleton } from "~/ui/Skeleton";
import { fetchPapers } from "./api";
import { GradeSubjectPicker, useGradeSubject } from "./GradeSubjectPicker";
import { PaperRow } from "./PaperRow";
import { groupPapers } from "./papers";

const styles = {
  groupLabel: css({ textStyle: "eyebrow", color: "ink.subtle", mb: "8px" }),
  list: css({ listStyle: "none", overflow: "hidden" }),
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
  const picker = useGradeSubject();

  const papers = useQuery(() => ({
    queryKey: ["papers", picker.grade(), picker.subject()?.id],
    queryFn: () => fetchPapers(picker.grade(), picker.subject()?.id ?? ""),
    enabled: picker.subject() !== undefined,
  }));

  const groups = createMemo(() => groupPapers(papers.data ?? []));

  return (
    <Page title="Library" lede="Past papers by grade and subject.">
      <GradeSubjectPicker state={picker} />

      <Switch>
        <Match when={picker.subjects.isError || papers.isError}>
          <div class={`${panel} ${styles.notice}`} role="alert">
            <p>Couldn't load papers. Check your connection and try again.</p>
            <button
              type="button"
              class={quietButton}
              onClick={() =>
                picker.subjects.isError ? picker.subjects.refetch() : papers.refetch()
              }
            >
              Try again
            </button>
          </div>
        </Match>
        <Match when={picker.subjects.isPending || papers.isPending}>
          <ListSkeleton label="Loading papers" />
        </Match>
        <Match when={groups().length === 0}>
          <div class={`${panel} ${styles.notice}`}>
            <p>
              No {picker.subject()?.name} papers for Grade {picker.grade()} yet.
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
