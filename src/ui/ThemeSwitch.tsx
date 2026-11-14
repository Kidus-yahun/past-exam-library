import { SegmentGroup } from "@ark-ui/solid/segment-group";
import { For } from "solid-js";
import { css } from "styled-system/css";
import { setThemePreference, type ThemePreference, themePreference } from "~/lib/theme";
import { MonitorIcon, MoonIcon, SunIcon } from "./icons";

const OPTIONS = [
  { value: "system", label: "System", Icon: MonitorIcon },
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
] as const;

const root = css({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "4px",
  p: "4px",
  bg: "sunk",
  rounded: "md",
});

const item = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  minH: "40px",
  px: "10px",
  rounded: "9px",
  fontSize: "13.5px",
  fontWeight: "600",
  color: "ink.muted",
  cursor: "pointer",
  "&[data-state=checked]": { bg: "surface", color: "ink", boxShadow: "raised" },
  "&[data-focus-visible]": { outline: "2px solid {colors.focus}", outlineOffset: "2px" },
});

export function ThemeSwitch() {
  return (
    <SegmentGroup.Root
      class={root}
      value={themePreference()}
      onValueChange={(details) => {
        if (details.value) setThemePreference(details.value as ThemePreference);
      }}
      aria-label="Theme"
    >
      <For each={OPTIONS}>
        {(option) => (
          <SegmentGroup.Item value={option.value} class={item}>
            <option.Icon size={16} />
            <SegmentGroup.ItemText>{option.label}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        )}
      </For>
    </SegmentGroup.Root>
  );
}
