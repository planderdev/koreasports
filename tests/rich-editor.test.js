import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});
for (const name of [
  "window",
  "document",
  "HTMLElement",
  "Element",
  "Node",
  "DOMParser",
  "MutationObserver",
  "getComputedStyle",
])
  globalThis[name] = dom.window[name];
Object.defineProperty(globalThis, "navigator", {
  value: dom.window.navigator,
  configurable: true,
});
globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 0);
globalThis.cancelAnimationFrame = clearTimeout;
const { createRichEditor, renderBodyJson, initialContent } =
  await import("../assets/js/editor/rich-editor.js");
const { renderRichBody } = await import("../assets/js/editor/public-body.js");
const { sanitizeBody, plainToDocument } =
  await import("../assets/js/editor/body-adapter.js");
test("plain body never interprets text as HTML", () => {
  const json = plainToDocument(["<script>bad()</script>\n둘째 줄"]);
  const html = renderBodyJson(json);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /<br/);
  assert.doesNotMatch(html, /<script>/);
});
test("sanitizer rejects scripts event attributes and javascript protocols", () => {
  const html = sanitizeBody(
    '<p onclick="bad()">정상</p><script>bad()</script><a href="javascript:bad()">링크</a><img src="/a.png" onerror="bad()">',
  );
  assert.doesNotMatch(html, /onclick|onerror|javascript:|<script/);
  assert.match(html, /정상/);
  assert.match(html, /src="\/a.png"/);
});
test("original HTML is preserved as an opaque node and title-only editor is not dirty", async () => {
  const html =
    '<div class="source-text">첫 줄\n둘째 줄<table><tr><td colspan="2">원본</td></tr></table><img src="/a.png"></div>';
  const host = document.createElement("div");
  document.body.append(host);
  const instance = await createRichEditor(host, {
    bodyHtml: html,
    body: ["첫 줄"],
  });
  assert.equal(instance.dirty, false);
  const output = instance.serialize();
  assert.match(output.bodyHtml, /colspan="2"/);
  assert.match(output.bodyHtml, /첫 줄\n둘째 줄/);
  assert.equal(
    initialContent({ bodyHtml: html }).content[0].type,
    "originalBlock",
  );
  instance.destroy();
  host.remove();
});
test("real Tiptap JSON survives table marks image attributes and public rendering", async () => {
  const host = document.createElement("div");
  document.body.append(host);
  const json = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        attrs: { textAlign: "center" },
        content: [
          {
            type: "text",
            text: "한글 본문",
            marks: [
              { type: "bold" },
              { type: "link", attrs: { href: "https://example.com" } },
            ],
          },
        ],
      },
      {
        type: "image",
        attrs: {
          src: "/a.png",
          mediaId: "stable-id",
          alt: "이미지 설명",
          width: "50%",
          textAlign: "right",
        },
      },
    ],
  };
  const first = await createRichEditor(host, {
    bodyJson: json,
    bodySchemaVersion: 1,
  });
  first.editor.commands.insertTable({ rows: 2, cols: 2, withHeaderRow: true });
  const saved = first.serialize(true);
  assert.ok(saved.bodyJson.content.some((n) => n.type === "table"));
  first.destroy();
  const second = await createRichEditor(host, saved);
  assert.equal(second.dirty, false);
  const html = renderRichBody(second.serialize().bodyJson);
  assert.match(html, /한글 본문/);
  assert.match(html, /stable-id/);
  assert.match(html, /<table/);
  assert.match(html, /<strong/);
  second.destroy();
  host.remove();
});
