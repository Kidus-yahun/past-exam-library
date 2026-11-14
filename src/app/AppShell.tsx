import { A } from "@solidjs/router";
import { For, type ParentProps, Show, Suspense } from "solid-js";
import { css } from "styled-system/css";
import { AccountChip } from "~/features/account/AccountChip";
import { useProfile } from "~/features/account/useProfile";
import { HomeIcon, LibraryIcon, PracticeIcon, ProgressIcon, StudyIcon, TelegramIcon } from "~/ui/icons";
import { NavLink } from "~/ui/NavLink";
import { TelegramBanner } from "~/ui/TelegramBanner";
import { ThemeSwitch } from "~/ui/ThemeSwitch";

const NAV = [
  { href: "/", label: "Home", Icon: HomeIcon, end: true },
  { href: "/library", label: "Library", Icon: LibraryIcon, end: false },
  { href: "/study", label: "Study", Icon: StudyIcon, end: false },
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
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
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
  const profile = useProfile();
  return (
    <div class={styles.shell}>
      <aside class={styles.sidebar}>
        <A href="/" class={styles.brand}>
          <span class={styles.brandMark}>
            <LibraryIcon size={18} strokeWidth={2} />
          </span>
          <div class={css({ display: "flex", flexDirection: "column" })}>
            <span class={styles.brandName}>Catholic Exam Library</span>
            <span class={css({ fontSize: "11px", color: "ink.subtle", fontWeight: "500" })}>
              Blessed G/Michael Secondary
            </span>
          </div>
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
          <Show when={profile.data?.role === "admin"}>
            <NavLink href="/admin" class={styles.sideLink}>
              <ProgressIcon />
              Admin
            </NavLink>
          </Show>
        </nav>
        <div class={styles.sideFooter}>
          <a
            href="https://t.me/BGMCS1236"
            target="_blank"
            rel="noopener noreferrer"
            class={css({
              display: "flex",
              alignItems: "center",
              gap: "8px",
              px: "10px",
              py: "8px",
              rounded: "md",
              fontSize: "12.5px",
              fontWeight: "600",
              color: "brand",
              bg: "brand.soft",
              textDecoration: "none",
              _hover: { bg: "brand.soft" },
            })}
          >
            <TelegramIcon size={14} />
            Telegram Community
          </a>
          <p class={styles.eyebrow}>Appearance</p>
          <ThemeSwitch />
          <div class={css({ mt: "8px", pt: "10px", borderTop: "1px solid {colors.line}" })}>
            <AccountChip />
          </div>
        </div>
      </aside>

      <main class={styles.main}>
        <TelegramBanner />
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
