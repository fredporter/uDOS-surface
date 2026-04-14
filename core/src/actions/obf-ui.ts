import fs from "fs-extra";
import path from "node:path";

type ObfCard = {
  kind: "card";
  title?: string;
  body: string[];
  footer: string[];
};

type ObfColumns = {
  kind: "columns";
  columns: string[][];
};

type ObfBlock = ObfCard | ObfColumns;

const OBF_FENCE_RE = /```obf\s*\n([\s\S]*?)```/gm;

async function readSource(file: string): Promise<string> {
  const abs = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
  if (!(await fs.pathExists(abs))) throw new Error(`Not found: ${abs}`);
  return fs.readFile(abs, "utf8");
}

function parseHeaderValue(line: string, key: string): string | undefined {
  const m = new RegExp(`${key}\\s*=\\s*"([^"]+)"`, "i").exec(line);
  return m?.[1]?.trim();
}

function parseCard(lines: string[], start: number): { block: ObfCard; next: number } {
  const head = lines[start] ?? "";
  const title = parseHeaderValue(head, "title");
  const body: string[] = [];
  const footer: string[] = [];
  let section: "body" | "footer" = "body";
  let i = start + 1;
  for (; i < lines.length; i++) {
    const raw = lines[i] ?? "";
    const line = raw.trim();
    if (/^(CARD|COLUMNS)\b/i.test(line)) break;
    if (!line) continue;
    if (/^BODY\b/i.test(line)) {
      section = "body";
      continue;
    }
    if (/^FOOTER\b/i.test(line)) {
      section = "footer";
      continue;
    }
    const text = raw.replace(/^\s{2,}/, "").trimEnd();
    if (section === "body") body.push(text);
    else footer.push(text);
  }
  return { block: { kind: "card", title, body, footer }, next: i };
}

function parseColumns(lines: string[], start: number): { block: ObfColumns; next: number } {
  const columns: string[][] = [];
  let current = -1;
  let i = start + 1;
  for (; i < lines.length; i++) {
    const raw = lines[i] ?? "";
    const line = raw.trim();
    if (/^(CARD|COLUMNS)\b/i.test(line)) break;
    if (!line) continue;
    if (/^COL(?:UMN)?\s+\d+\b/i.test(line) || /^COLUMN\b/i.test(line)) {
      columns.push([]);
      current = columns.length - 1;
      continue;
    }
    if (current < 0) {
      columns.push([]);
      current = 0;
    }
    columns[current]!.push(raw.replace(/^\s{2,}/, "").trimEnd());
  }
  return { block: { kind: "columns", columns }, next: i };
}

function parseObfBody(body: string): ObfBlock[] {
  const lines = body.split(/\r?\n/);
  const out: ObfBlock[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = (lines[i] ?? "").trim();
    if (!line) {
      i++;
      continue;
    }
    if (/^CARD\b/i.test(line)) {
      const parsed = parseCard(lines, i);
      out.push(parsed.block);
      i = parsed.next;
      continue;
    }
    if (/^COLUMNS\b/i.test(line)) {
      const parsed = parseColumns(lines, i);
      out.push(parsed.block);
      i = parsed.next;
      continue;
    }
    i++;
  }
  return out;
}

function extractObfBodies(source: string): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = OBF_FENCE_RE.exec(source)) !== null) out.push(m[1] ?? "");
  return out.length > 0 ? out : [source];
}

function linePad(input: string, width: number): string {
  if (input.length >= width) return input.slice(0, width);
  return input + " ".repeat(width - input.length);
}

function renderCard(card: ObfCard): string {
  const content = [...card.body, ...(card.footer.length ? ["", ...card.footer] : [])];
  const widest = Math.max(card.title?.length ?? 0, ...content.map((l) => l.length), 12);
  const width = Math.min(90, widest + 2);
  const top = `+${"-".repeat(width + 2)}+`;
  const title = card.title ? `| ${linePad(card.title, width)} |` : "";
  const sep = card.title ? `| ${"-".repeat(width)} |` : "";
  const lines = content.map((l) => `| ${linePad(l, width)} |`);
  return [top, title, sep, ...lines, top].filter(Boolean).join("\n");
}

function renderColumns(cols: ObfColumns): string {
  if (cols.columns.length === 0) return "(empty columns)";
  const normalized = cols.columns.map((col) => (col.length ? col : [""]));
  const colWidths = normalized.map((col) => Math.min(36, Math.max(...col.map((l) => l.length), 8)));
  const maxRows = Math.max(...normalized.map((col) => col.length));
  const border = "+" + colWidths.map((w) => "-".repeat(w + 2)).join("+") + "+";
  const body: string[] = [];
  for (let r = 0; r < maxRows; r++) {
    const row = normalized.map((col, i) => ` ${linePad(col[r] ?? "", colWidths[i] ?? 8)} `).join("|");
    body.push(`|${row}|`);
  }
  return [border, ...body, border].join("\n");
}

function renderBlock(block: ObfBlock): string {
  if (block.kind === "card") return renderCard(block);
  return renderColumns(block);
}

export async function cmdObfRender(file: string): Promise<void> {
  const source = await readSource(file);
  const bodies = extractObfBodies(source);
  const blocks = bodies.flatMap(parseObfBody);
  if (blocks.length === 0) {
    throw new Error("No OBF UI blocks found (expected CARD or COLUMNS)");
  }
  blocks.forEach((b, i) => {
    if (i > 0) console.log("");
    console.log(renderBlock(b));
  });
}
