import type { JSX } from "solid-js";

type IconProps = { size?: number; class?: string; strokeWidth?: number };

/**
 * Builds an icon component. `paths` is a function so every use renders fresh
 * SVG nodes; a shared JSX node would be moved between uses instead of copied.
 */
function icon(paths: () => JSX.Element, defaults: { strokeWidth?: number } = {}) {
  return (props: IconProps) => (
    <svg
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={props.strokeWidth ?? defaults.strokeWidth ?? 1.9}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class={props.class}
    >
      {paths()}
    </svg>
  );
}

export const HomeIcon = icon(() => (
  <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
));
export const LibraryIcon = icon(() => (
  <path d="M4 19.5V4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5zm0 0A1.5 1.5 0 0 0 5.5 21H20" />
));
export const PracticeIcon = icon(() => (
  <>
    <path d="M4 20h4L19 9l-4-4L4 16z" />
    <path d="m13.5 6.5 4 4" />
  </>
));
export const ProgressIcon = icon(() => <path d="M5 20V11M12 20V4M19 20v-6" />);
export const FileIcon = icon(
  () => (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
    </>
  ),
  { strokeWidth: 1.8 },
);
export const DownloadIcon = icon(() => (
  <>
    <path d="M12 4v11" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 20h14" />
  </>
));
export const ChevronRightIcon = icon(() => <path d="m9 6 6 6-6 6" />, { strokeWidth: 2 });
export const ChevronLeftIcon = icon(() => <path d="m15 6-6 6 6 6" />, { strokeWidth: 2 });
export const MinusIcon = icon(() => <path d="M5 12h14" />, { strokeWidth: 2 });
export const PlusIcon = icon(() => <path d="M12 5v14M5 12h14" />, { strokeWidth: 2 });
export const SunIcon = icon(() => (
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>
));
export const MoonIcon = icon(() => <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />);
export const MonitorIcon = icon(() => (
  <>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </>
));

export function FlameIcon(props: IconProps) {
  return (
    <svg
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 24 24"
      stroke-width="1.6"
      stroke-linejoin="round"
      aria-hidden="true"
      class={props.class}
      style={{ fill: "var(--colors-streak)", stroke: "var(--colors-streak-ink)" }}
    >
      <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 1.5 1 2.5 2 3 0-3.5-.5-5.5.5-8z" />
    </svg>
  );
}
