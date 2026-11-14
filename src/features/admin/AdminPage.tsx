import { Tabs } from "@ark-ui/solid/tabs";
import { useSearchParams } from "@solidjs/router";
import { Match, Switch } from "solid-js";
import { css } from "styled-system/css";
import { RequireAuth } from "~/features/account/RequireAuth";
import { useProfile } from "~/features/account/useProfile";
import { Page, panel } from "~/ui/Page";
import { ListSkeleton } from "~/ui/Skeleton";
import { OverviewTab, PapersTab, QuestionsTab, StudentsTab } from "./AdminParts";

const TABS = [
  { value: "overview", label: "Overview" },
  { value: "papers", label: "Papers" },
  { value: "questions", label: "Questions" },
  { value: "students", label: "Students" },
] as const;

const styles = {
  list: css({
    display: "flex",
    gap: "4px",
    borderBottom: "1px solid {colors.line}",
    overflowX: "auto",
  }),
  tab: css({
    minH: "44px",
    px: "12px",
    fontSize: "14.5px",
    fontWeight: "500",
    color: "ink.subtle",
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "inset 0 -2px 0 transparent",
    "&[data-selected]": {
      color: "ink",
      fontWeight: "600",
      boxShadow: "inset 0 -2px 0 {colors.ink}",
    },
    "&[data-focus-visible]": { outline: "2px solid {colors.focus}", outlineOffset: "-2px" },
  }),
  content: css({ pt: "20px", display: "flex", flexDirection: "column", gap: "20px" }),
};

function Console() {
  const [params, setParams] = useSearchParams<{ tab?: string }>();
  const tab = () =>
    TABS.some((t) => t.value === params.tab) ? (params.tab as string) : "overview";

  return (
    <Tabs.Root
      value={tab()}
      onValueChange={(d) => setParams({ tab: d.value })}
      lazyMount
      unmountOnExit
    >
      <Tabs.List class={styles.list}>
        {TABS.map((t) => (
          <Tabs.Trigger value={t.value} class={styles.tab}>
            {t.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value="overview" class={styles.content}>
        <OverviewTab />
      </Tabs.Content>
      <Tabs.Content value="papers" class={styles.content}>
        <PapersTab />
      </Tabs.Content>
      <Tabs.Content value="questions" class={styles.content}>
        <QuestionsTab />
      </Tabs.Content>
      <Tabs.Content value="students" class={styles.content}>
        <StudentsTab />
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default function AdminPage() {
  const profile = useProfile();
  return (
    <RequireAuth>
      <Page title="Admin" lede="Papers, questions and students.">
        <Switch>
          <Match when={profile.isPending}>
            <ListSkeleton label="Checking access" />
          </Match>
          <Match when={profile.data?.role !== "admin"}>
            <p class={`${panel} ${css({ p: "20px", color: "ink.muted" })}`}>
              This area is for library admins.
            </p>
          </Match>
          <Match when={profile.data?.role === "admin"}>
            <Console />
          </Match>
        </Switch>
      </Page>
    </RequireAuth>
  );
}
