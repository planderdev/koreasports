import DOMPurify from "dompurify";
export function sanitizeBody(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "div",
      "span",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "hr",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "td",
      "th",
      "colgroup",
      "col",
      "figure",
      "figcaption",
      "mark",
      "sub",
      "sup",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "width",
      "height",
      "style",
      "class",
      "colspan",
      "rowspan",
      "colwidth",
      "data-colwidth",
      "start",
      "loading",
      "decoding",
      "target",
      "rel",
    ],
    ADD_ATTR: ["data-media-id", "data-original-block"],
    FORBID_TAGS: [
      "iframe",
      "form",
      "input",
      "button",
      "style",
      "script",
      "object",
      "embed",
    ],
    FORBID_ATTR: ["srcset"],
    ALLOW_DATA_ATTR: true,
  });
}
export function plainToDocument(body) {
  const paragraphs = Array.isArray(body) ? body : [body || ""];
  return {
    type: "doc",
    content: paragraphs.map((value) => ({
      type: "paragraph",
      content: String(value)
        .split("\n")
        .flatMap((line, i) => [
          ...(i ? [{ type: "hardBreak" }] : []),
          ...(line ? [{ type: "text", text: line }] : []),
        ]),
    })),
  };
}
export const bodySignature = (record) =>
  JSON.stringify({
    body: record.body,
    bodyHtml: record.bodyHtml,
    bodyJson: record.bodyJson,
    bodySchemaVersion: record.bodySchemaVersion,
  });
