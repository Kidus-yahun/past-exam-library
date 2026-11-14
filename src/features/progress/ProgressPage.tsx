import { css } from "styled-system/css";
import { Page } from "~/ui/Page";
import { ThemeSwitch } from "~/ui/ThemeSwitch";

export default function ProgressPage() {
  return (
    <Page title="Progress" lede="Streaks and unit strength appear here once sign-in is ready.">
      <section
        aria-labelledby="appearance"
        class={css({ display: "flex", flexDirection: "column", gap: "10px", maxW: "420px" })}
      >
        <h2 id="appearance" class={css({ textStyle: "eyebrow", color: "ink.subtle" })}>
          Appearance
        </h2>
        <ThemeSwitch />
      </section>
    </Page>
  );
}
