import "temml/dist/Temml-Local.css";
import { createEffect } from "solid-js";
import temml from "temml";

/**
 * LaTeX rendered as native MathML (no web fonts to download). Temml writes
 * into the element itself; if a formula can't be parsed, the source shows.
 */
export function MathText(props: { tex: string; display?: boolean; class?: string }) {
  let el!: HTMLSpanElement;
  createEffect(() => {
    try {
      temml.render(props.tex, el, { displayMode: props.display ?? false, throwOnError: true });
    } catch {
      el.textContent = props.tex;
    }
  });
  return <span ref={el} class={props.class} />;
}
