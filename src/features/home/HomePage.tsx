import { A } from "@solidjs/router";
import { css } from "styled-system/css";
import { ChevronRightIcon } from "~/ui/icons";
import { button, Page, panel } from "~/ui/Page";

export default function HomePage() {
  return (
    <Page title="Selam" lede="Past papers and practice for Grades 9–12.">
      <section
        class={`${panel} ${css({ p: "18px", display: "flex", flexDirection: "column", gap: "12px", maxW: "520px" })}`}
      >
        <p class={css({ fontSize: "17px", fontWeight: "600" })}>Start with a paper</p>
        <p class={css({ fontSize: "14px", color: "ink.muted" })}>
          Pick your grade and subject, then open a paper or practice its questions. Your progress
          shows up here once sign-in is ready.
        </p>
        <A href="/library" class={button}>
          Open the library
          <ChevronRightIcon size={18} />
        </A>
      </section>
    </Page>
  );
}
