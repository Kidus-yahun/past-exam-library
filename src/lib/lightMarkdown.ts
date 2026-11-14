/**
 * Parser for the "light markdown" used in unit notes: paragraphs separated by
 * blank lines, "- " bullet lists, **bold** and `code` (maths) spans. It builds
 * a tree that the UI renders as elements, so stored text can never inject HTML.
 */
export type Inline = { kind: "text" | "bold" | "code"; text: string };
export type Block = { kind: "paragraph"; content: Inline[] } | { kind: "list"; items: Inline[][] };

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  const pattern = /\*\*(.+?)\*\*|`([^`]+)`/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) out.push({ kind: "text", text: text.slice(last, index) });
    if (match[1] !== undefined) out.push({ kind: "bold", text: match[1] });
    else out.push({ kind: "code", text: match[2] ?? "" });
    last = index + match[0].length;
  }
  if (last < text.length) out.push({ kind: "text", text: text.slice(last) });
  return out;
}

export function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of source.split(/\n\s*\n/)) {
    const lines = chunk
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    let paragraph: string[] = [];
    let list: Inline[][] = [];
    const flushParagraph = () => {
      if (paragraph.length)
        blocks.push({ kind: "paragraph", content: parseInline(paragraph.join(" ")) });
      paragraph = [];
    };
    const flushList = () => {
      if (list.length) blocks.push({ kind: "list", items: list });
      list = [];
    };
    for (const line of lines) {
      if (line.startsWith("- ")) {
        flushParagraph();
        list.push(parseInline(line.slice(2)));
      } else {
        flushList();
        paragraph.push(line);
      }
    }
    flushParagraph();
    flushList();
  }
  return blocks;
}
