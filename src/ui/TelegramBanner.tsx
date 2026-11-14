import { createSignal, onMount, Show } from "solid-js";
import { css } from "styled-system/css";
import { TelegramIcon } from "~/ui/icons";

const STORAGE_KEY = "pel_tg_banner_dismissed";

const styles = {
  banner: css({
    bg: "brand.soft",
    borderBottom: "1px solid {colors.line}",
    color: "brand.strong",
    px: "16px",
    py: "9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    fontSize: "13px",
  }),
  content: css({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    mx: "auto",
    maxW: "1120px",
    w: "100%",
  }),
  badge: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    fontWeight: "700",
    fontSize: "11px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    bg: "brand",
    color: "brand.fg",
    px: "7px",
    py: "2px",
    rounded: "sm",
  }),
  text: css({
    color: "ink",
    fontWeight: "500",
  }),
  link: css({
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    color: "brand",
    fontWeight: "600",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    _hover: { color: "brand.strong" },
  }),
  close: css({
    ml: "auto",
    p: "4px 8px",
    color: "ink.subtle",
    fontSize: "15px",
    lineHeight: 1,
    cursor: "pointer",
    bg: "transparent",
    border: 0,
    rounded: "sm",
    _hover: { color: "ink", bg: "sunk" },
  }),
};

export function TelegramBanner() {
  const [visible, setVisible] = createSignal(false);

  onMount(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "true") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  });

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
  }

  return (
    <Show when={visible()}>
      <aside class={styles.banner} role="banner" aria-label="Telegram Community Announcement">
        <div class={styles.content}>
          <span class={styles.badge}>
            <TelegramIcon size={12} />
            Telegram
          </span>
          <span class={styles.text}>
            Join our official Telegram community for model exams, answer keys &amp; revision updates!
          </span>
          <a
            href="https://t.me/BGMCS1236"
            target="_blank"
            rel="noopener noreferrer"
            class={styles.link}
            aria-label="Join our Telegram Channel @BGMCS1236"
          >
            Join @BGMCS1236 →
          </a>
          <button
            type="button"
            class={styles.close}
            onClick={dismiss}
            aria-label="Close Telegram banner"
          >
            ✕
          </button>
        </div>
      </aside>
    </Show>
  );
}
