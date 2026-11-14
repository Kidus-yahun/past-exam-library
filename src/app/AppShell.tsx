import { A } from "@solidjs/router";
import { For, type ParentProps, Suspense } from "solid-js";
import { css } from "styled-system/css";
import { HomeIcon, LibraryIcon, PracticeIcon, ProgressIcon } from "~/ui/icons";
import { NavLink } from "~/ui/NavLink";
import { ThemeSwitch } from "~/ui/ThemeSwitch";

const NAV = [
  { href: "/", label: "Home", Icon: HomeIcon, end: true },
  { href: "/library", label: "Library", Icon: LibraryIcon, end: false },
  { href: "/practice", label: "Practice", Icon: PracticeIcon, end: false },
  { href: "/progress", label: "Progress", Icon: ProgressIcon, end: false },
] as const;

const styles = {
  shell: css({ display: "flex", minH: "100dvh" }),
  sidebar: css({
    hideBelow: "lg",
    position: "sticky",
    top: 0,
    h: "100dvh",
    w: "264px",
    flexShrink: 0,
    boxSizing: "border-box",
    p: "24px 16px",
    bg: "surface",
    borderRight: "1px solid {colors.line}",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  }),
  brand: css({ display: "flex", alignItems: "center", gap: "10px", px: "8px" }),
  brandMark: css({
    w: "32px",
    h: "32px",
    rounded: "9px",
    bg: "brand",
    color: "brand.fg",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  brandName: css({ fontSize: "16px", fontWeight: "650", letterSpacing: "-0.01em" }),
  sideLink: css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minH: "44px",
    px: "12px",
    rounded: "10px",
    fontSize: "14.5px",
    fontWeight: "500",
    color: "ink.muted",
    _hover: { bg: "sunk" },
    "&[aria-current=page]": { bg: "brand.soft", color: "brand.strong", fontWeight: "600" },
  }),
  sideFooter: css({ mt: "auto", display: "flex", flexDirection: "column", gap: "8px" }),
  eyebrow: css({ textStyle: "eyebrow", color: "ink.subtle", px: "4px" }),
  main: css({ flex: 1, minW: 0, pb: { base: "calc(88px + env(safe-area-inset-bottom))", lg: 0 } }),
  tabbar: css({
    hideFrom: "lg",
    position: "fixed",
    insetX: 0,
    bottom: 0,
    zIndex: "nav",
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    px: "8px",
    pb: "env(safe-area-inset-bottom)",
    bg: "surface",
    borderTop: "1px solid {colors.line}",
  }),
  tab: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    minH: "64px",
    fontSize: "11.5px",
    fontWeight: "500",
    color: "ink.subtle",
    "&[aria-current=page]": { color: "brand" },
  }),
};

export function AppShell(props: ParentProps) {
  return (
    <div class={styles.shell}>
      <aside class={styles.sidebar}>
        <A href="/" class={styles.brand}>
          <span class={styles.brandMark}>
            <LibraryIcon size={18} strokeWidth={2} />
          </span>
          <span class={styles.brandName}>Past Exam Library</span>
        </A>
        <nav
          aria-label="Main"
          class={css({ display: "flex", flexDirection: "column", gap: "2px" })}
        >
          <For each={NAV}>
            {(item) => (
              <NavLink href={item.href} end={item.end} class={styles.sideLink}>
                <item.Icon />
                {item.label}
              </NavLink>
            )}
          </For>
        </nav>
        <div class={styles.sideFooter}>
          <p class={styles.eyebrow}>Appearance</p>
          <ThemeSwitch />
        </div>
      </aside>

      <main class={styles.main}>
        <Suspense>{props.children}</Suspense>
      </main>

      <nav aria-label="Main" class={styles.tabbar}>
        <For each={NAV}>
          {(item) => (
            <NavLink href={item.href} end={item.end} class={styles.tab}>
              <item.Icon size={24} />
              {item.label}
            </NavLink>
          )}
        </For>
      </nav>
    </div>
  );
}
