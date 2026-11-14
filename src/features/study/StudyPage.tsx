import { SegmentGroup } from "@ark-ui/solid/segment-group";
import { Tabs } from "@ark-ui/solid/tabs";
import { A, useSearchParams } from "@solidjs/router";
import { useQuery } from "@tanstack/solid-query";
import { createMemo, For, Match, Switch } from "solid-js";
import { css } from "styled-system/css";
import { GradeSubjectPicker, useGradeSubject } from "~/features/library/GradeSubjectPicker";
import { Page, panel, quietButton } from "~/ui/Page";
import { ListSkeleton } from "~/ui/Skeleton";
import { ArchiePanel } from "./ArchiePanel";
import { fetchFormulas, fetchUnits } from "./api";
import { FocusTimer } from "./FocusTimer";
import { FormulaSheet } from "./FormulaSheet";
import { NotesPanel } from "./NotesPanel";
import { TipsPanel } from "./TipsPanel";
import { UnitNote } from "./UnitNote";

const styles = {
  view: css({
    display: "inline-grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "4px",
    p: "4px",
    bg: "sunk",
    rounded: "md",
    w: { base: "100%", sm: "320px" },
  }),
  viewItem: css({
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
  layout: css({
    display: "grid",
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      lg: "220px minmax(0, 1fr)",
      xl: "220px minmax(0, 1fr) 340px",
    },
    gap: { base: "20px", lg: "28px" },
    alignItems: "start",
  }),
  units: css({
    display: "flex",
    flexDirection: { base: "row", lg: "column" },
    gap: { base: "8px", lg: "2px" },
    overflowX: { base: "auto", lg: "visible" },
    mx: { base: "-20px", lg: 0 },
    px: { base: "20px", lg: 0 },
    scrollbarWidth: "none",
    position: { lg: "sticky" },
    top: { lg: "24px" },
  }),
  unitLink: css({
    flex: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minH: "44px",
    px: { base: "14px", lg: "10px" },
    rounded: { base: "full", lg: "10px" },
    fontSize: "14px",
    fontWeight: "500",
    color: "ink.muted",
    boxShadow: { base: "inset 0 0 0 1px {colors.line}", lg: "none" },
    transition: "background-color 120ms ease-out",
    _hover: { bg: "hover" },
    "&[aria-current=page]": {
      bg: { base: "ink", lg: "brand.soft" },
      color: { base: "bg", lg: "brand.strong" },
      fontWeight: "600",
      boxShadow: "none",
    },
  }),
  unitNumber: css({ fontFamily: "mono", fontSize: "12.5px", opacity: 0.8 }),
  unitName: css({ hideBelow: "lg", lineClamp: 2 }),
  tools: css({
    p: "16px",
    position: { xl: "sticky" },
    top: { xl: "24px" },
    gridColumn: { lg: "2", xl: "3" },
  }),
  tabList: css({
    display: "flex",
    gap: "4px",
    mb: "14px",
    borderBottom: "1px solid {colors.line}",
  }),
  tab: css({
    minH: "40px",
    px: "10px",
    fontSize: "14px",
    fontWeight: "500",
    color: "ink.subtle",
    cursor: "pointer",
    boxShadow: "inset 0 -2px 0 transparent",
    "&[data-selected]": {
      color: "ink",
      fontWeight: "600",
      boxShadow: "inset 0 -2px 0 {colors.ink}",
    },
    "&[data-focus-visible]": { outline: "2px solid {colors.focus}", outlineOffset: "-2px" },
  }),
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

export default function StudyPage() {
  const picker = useGradeSubject();
  const [params, setParams] = useSearchParams<{ unit?: string; view?: string }>();
  const view = () => (params.view === "formulas" ? "formulas" : "units");

  const units = useQuery(() => ({
    queryKey: ["units", picker.grade(), picker.subject()?.id],
    queryFn: () => fetchUnits(picker.grade(), picker.subject()?.id ?? ""),
    enabled: picker.subject() !== undefined,
  }));
  const formulas = useQuery(() => ({
    queryKey: ["formulas", picker.subject()?.id, picker.grade()],
    queryFn: () => fetchFormulas(picker.subject()?.id ?? "", picker.grade()),
    enabled: picker.subject() !== undefined && view() === "formulas",
  }));

  const unit = createMemo(() => {
    const list = units.data ?? [];
    return list.find((u) => String(u.position) === params.unit) ?? list[0];
  });

  const unitHref = (position: number) =>
    `/study?grade=${picker.grade()}&subject=${picker.subject()?.id}&unit=${position}`;

  return (
    <Page
      title="Study"
      lede="Unit notes, formula sheets and a focus timer, side by side."
      actions={<FocusTimer />}
    >
      <GradeSubjectPicker state={picker} />

      <SegmentGroup.Root
        class={styles.view}
        value={view()}
        onValueChange={(d) =>
          d.value && setParams({ view: d.value === "units" ? undefined : d.value })
        }
        aria-label="Study view"
      >
        <For
          each={[
            { value: "units", label: "Unit notes" },
            { value: "formulas", label: "Formula sheet" },
          ]}
        >
          {(item) => (
            <SegmentGroup.Item value={item.value} class={styles.viewItem}>
              <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          )}
        </For>
      </SegmentGroup.Root>

      <Switch>
        <Match when={view() === "formulas"}>
          <Switch>
            <Match when={formulas.isPending}>
              <ListSkeleton label="Loading formulas" />
            </Match>
            <Match when={(formulas.data?.length ?? 0) === 0}>
              <div class={`${panel} ${styles.notice}`}>
                <p>
                  No formula sheet for {picker.subject()?.name} yet. Formula sheets cover
                  Mathematics, Physics, Chemistry and Biology.
                </p>
              </div>
            </Match>
            <Match when={formulas.data}>{(list) => <FormulaSheet formulas={list()} />}</Match>
          </Switch>
        </Match>

        <Match when={units.isError}>
          <div class={`${panel} ${styles.notice}`} role="alert">
            <p>Couldn't load the unit notes. Check your connection.</p>
            <button type="button" class={quietButton} onClick={() => units.refetch()}>
              Try again
            </button>
          </div>
        </Match>
        <Match when={units.isPending}>
          <ListSkeleton label="Loading unit notes" />
        </Match>
        <Match when={(units.data?.length ?? 0) === 0}>
          <div class={`${panel} ${styles.notice}`}>
            <p>
              No unit notes for {picker.subject()?.name} in Grade {picker.grade()} yet. Notes cover
              Mathematics, Physics, Chemistry and Biology (and Grade 12 English).
            </p>
            <A
              href={`/practice?grade=${picker.grade()}&subject=${picker.subject()?.id}`}
              class={quietButton}
            >
              Practise {picker.subject()?.name} instead
            </A>
          </div>
        </Match>
        <Match when={unit()}>
          {(current) => (
            <div class={styles.layout}>
              <nav aria-label="Units" class={styles.units}>
                <For each={units.data}>
                  {(u) => (
                    <A
                      href={unitHref(u.position)}
                      class={styles.unitLink}
                      aria-current={u.id === current().id ? "page" : undefined}
                    >
                      <span class={styles.unitNumber}>U{u.position}</span>
                      <span class={styles.unitName}>{u.title}</span>
                    </A>
                  )}
                </For>
              </nav>

              <UnitNote unit={current()} />

              <aside class={`${panel} ${styles.tools}`} aria-label="Study tools">
                <Tabs.Root defaultValue="notes" lazyMount>
                  <Tabs.List class={styles.tabList}>
                    <Tabs.Trigger value="notes" class={styles.tab}>
                      My notes
                    </Tabs.Trigger>
                    <Tabs.Trigger value="tips" class={styles.tab}>
                      Tips
                    </Tabs.Trigger>
                    <Tabs.Trigger value="archie" class={styles.tab}>
                      Archie
                    </Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="notes">
                    <NotesPanel unitId={current().id} unitTitle={current().title} />
                  </Tabs.Content>
                  <Tabs.Content value="tips">
                    <TipsPanel unitId={current().id} />
                  </Tabs.Content>
                  <Tabs.Content value="archie">
                    <ArchiePanel
                      grade={picker.grade()}
                      subject={picker.subject()?.name ?? ""}
                      unitTitle={current().title}
                    />
                  </Tabs.Content>
                </Tabs.Root>
              </aside>
            </div>
          )}
        </Match>
      </Switch>
    </Page>
  );
}
