import { A, useLocation } from "@solidjs/router";
import type { ParentProps } from "solid-js";

type NavLinkProps = ParentProps<{ href: string; end?: boolean; class?: string }>;

/**
 * Router link that marks the current page with `aria-current="page"`, which
 * screen readers announce and the nav styles key off. `end` matches the path
 * exactly; otherwise nested paths (e.g. /library/…) count as current too.
 */
export function NavLink(props: NavLinkProps) {
  const location = useLocation();
  const isCurrent = () =>
    props.end
      ? location.pathname === props.href
      : location.pathname === props.href || location.pathname.startsWith(`${props.href}/`);

  return (
    <A href={props.href} class={props.class} aria-current={isCurrent() ? "page" : undefined}>
      {props.children}
    </A>
  );
}
