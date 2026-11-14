import { describe, expect, it } from "vitest";
import { parseBlocks, parseInline } from "./lightMarkdown";

describe("parseInline", () => {
  it("splits bold, code and text", () => {
    expect(parseInline("A **bold** move with `v = d/t` here")).toEqual([
      { kind: "text", text: "A " },
      { kind: "bold", text: "bold" },
      { kind: "text", text: " move with " },
      { kind: "code", text: "v = d/t" },
      { kind: "text", text: " here" },
    ]);
  });

  it("keeps HTML as plain text", () => {
    expect(parseInline("<img src=x onerror=alert(1)>")).toEqual([
      { kind: "text", text: "<img src=x onerror=alert(1)>" },
    ]);
  });
});

describe("parseBlocks", () => {
  it("separates paragraphs and bullet lists", () => {
    const blocks = parseBlocks("Intro line one\nline two.\n\n- **First:** a\n- Second\nAfter list");
    expect(blocks).toEqual([
      { kind: "paragraph", content: [{ kind: "text", text: "Intro line one line two." }] },
      {
        kind: "list",
        items: [
          [
            { kind: "bold", text: "First:" },
            { kind: "text", text: " a" },
          ],
          [{ kind: "text", text: "Second" }],
        ],
      },
      { kind: "paragraph", content: [{ kind: "text", text: "After list" }] },
    ]);
  });
});
