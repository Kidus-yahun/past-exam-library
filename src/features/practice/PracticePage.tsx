import { A } from "@solidjs/router";
import { css } from "styled-system/css";
import { Page, quietButton } from "~/ui/Page";

export default function PracticePage() {
  return (
    <Page title="Practice" lede="Practice starts from a paper that has questions ready.">
      <A href="/library" class={`${quietButton} ${css({ alignSelf: "flex-start" })}`}>
        Choose a paper
      </A>
    </Page>
  );
}
