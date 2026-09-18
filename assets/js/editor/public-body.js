import { sanitizeBody } from "./body-adapter.js";
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const tags = {
  paragraph: "p",
  heading: "h2",
  bulletList: "ul",
  orderedList: "ol",
  listItem: "li",
  blockquote: "blockquote",
  table: "table",
  tableRow: "tr",
  tableCell: "td",
  tableHeader: "th",
  codeBlock: "pre",
};
export function renderRichBody(json) {
  if (json?.type !== "doc") throw Error("Invalid body document");
  const walk = (node) => {
    if (node.type === "text") {
      let text = esc(node.text);
      for (const mark of node.marks || []) {
        const tag = {
          bold: "strong",
          italic: "em",
          underline: "u",
          strike: "s",
          code: "code",
        }[mark.type];
        if (tag) text = `<${tag}>${text}</${tag}>`;
        if (mark.type === "link")
          text = `<a href="${esc(mark.attrs?.href)}">${text}</a>`;
        if (mark.type === "textStyle")
          text = `<span style="color:${esc(mark.attrs?.color || "inherit")};font-size:${esc(mark.attrs?.fontSize || "inherit")}">${text}</span>`;
        if (mark.type === "highlight")
          text = `<mark style="background-color:${esc(mark.attrs?.color || "#fff3a3")}">${text}</mark>`;
      }
      return text;
    }
    if (node.type === "originalBlock")
      return sanitizeBody(node.attrs?.html || "");
    if (node.type === "hardBreak") return "<br>";
    if (node.type === "horizontalRule") return "<hr>";
    if (node.type === "image") {
      const a = node.attrs || {};
      return `<img src="${esc(a.mediaId ? "/assets/images/fallback.svg" : a.src)}" ${a.mediaId ? `data-media-id="${esc(a.mediaId)}"` : ""} alt="${esc(a.alt)}" ${a.width ? `width="${esc(a.width)}"` : ""} style="display:block;margin-left:${a.textAlign === "left" ? "0" : "auto"};margin-right:${a.textAlign === "right" ? "0" : "auto"}">`;
    }
    const content = (node.content || []).map(walk).join("");
    if (node.type === "doc") return content;
    const tag =
      node.type === "heading"
        ? "h" + Math.min(6, Math.max(1, node.attrs?.level || 2))
        : tags[node.type];
    if (!tag) throw Error("Unsupported body node: " + node.type);
    const a = node.attrs || {},
      columnWidth = Array.isArray(a.colwidth)
        ? a.colwidth.map(Number).filter((n) => n > 0)
        : [],
      span = ["td", "th"].includes(tag)
        ? ` colspan="${Number(a.colspan) || 1}" rowspan="${Number(a.rowspan) || 1}"${columnWidth.length ? ` data-colwidth="${columnWidth.join(",")}" width="${columnWidth.reduce((sum, n) => sum + n, 0)}"` : ""}`
        : "";
    return `<${tag}${span}${a.textAlign ? ` style="text-align:${esc(a.textAlign)}"` : ""}>${content}</${tag}>`;
  };
  return sanitizeBody(walk(json));
}

export function readRichBody(record) {
  if (record.bodySchemaVersion !== 1) return null;
  try {
    return renderRichBody(record.bodyJson);
  } catch {
    return record.bodyHtml ? sanitizeBody(record.bodyHtml) : null;
  }
}
