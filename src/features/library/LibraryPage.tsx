import { useQuery } from "@tanstack/solid-query";
import { createMemo, createSignal, For, Match, Show, Switch } from "solid-js";
import { css } from "styled-system/css";
import { input } from "~/ui/forms";
import { Page, panel, quietButton } from "~/ui/Page";
import { ListSkeleton } from "~/ui/Skeleton";
import { fetchAllPapers, fetchPapers } from "./api";
import { GradeSubjectPicker, useGradeSubject } from "./GradeSubjectPicker";
import { PaperRow } from "./PaperRow";
import { groupPapers } from "./papers";
import { searchPapers } from "./search";

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

  const [query, setQuery] = createSignal("");
  const searching = () => query().trim().length > 0;
  const allPapers = useQuery(() => ({
    queryKey: ["papers", "all"],
    queryFn: fetchAllPapers,
    enabled: searching(),
  }));
  const results = createMemo(() => searchPapers(allPapers.data ?? [], query()));

  return (
    <Page
      title="Library"
      lede="Past papers by grade and subject."
      actions={
        <label class={css({ w: { base: "100%", md: "300px" } })}>
          <span class={css({ srOnly: true })}>Search all papers</span>
          <input
            type="search"
            class={`${input} ${css({ w: "100%" })}`}
            placeholder="Search, e.g. g12 physics final"
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
        </label>
      }
    >
      <Show when={!searching()}>
        <GradeSubjectPicker state={picker} />
      </Show>

      <Switch>
        <Match when={searching()}>
          <Show
            when={results().length > 0}
            fallback={
              <Show when={allPapers.isSuccess}>
                <div class={`${panel} ${styles.notice}`}>
                  <p>No papers match “{query().trim()}”.</p>
                </div>
              </Show>
            }
          >
            <section aria-label="Search results">
              <h2 class={styles.groupLabel}>
                {results().length} {results().length === 1 ? "paper" : "papers"}
              </h2>
              <ul class={`${panel} ${styles.list}`}>
                <For each={results()}>
                  {(paper) => (
                    <PaperRow paper={paper} context={`Grade ${paper.grade} ${paper.subjectName}`} />
                  )}
                </For>
              </ul>
            </section>
          </Show>
        </Match>
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
