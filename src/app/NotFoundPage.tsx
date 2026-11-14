import { A } from "@solidjs/router";
import { Page, quietButton } from "~/ui/Page";

export default function NotFoundPage() {
  return (
    <Page title="Page not found" lede="That link doesn't lead anywhere in the library.">
      <A href="/" class={quietButton}>
        Go home
      </A>
    </Page>
  );
}
