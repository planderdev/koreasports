import {
  Editor,
  Node,
  mergeAttributes,
  generateHTML,
  getSchema,
} from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle, Color, FontSize } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { sanitizeBody, plainToDocument } from "./body-adapter.js";
import {
  uploadAdminMedia,
  readAdminMedia,
  hydrateAdminMedia,
} from "../services/admin-storage.js";
const Original = Node.create({
  name: "originalBlock",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return { html: { default: "" } };
  },
  parseHTML() {
    return [
      {
        tag: "div[data-original-block]",
        getAttrs: (element) => ({ html: element.innerHTML }),
      },
    ];
  },
  renderHTML({ node }) {
    const element = document.createElement("div");
    element.dataset.originalBlock = "true";
    element.innerHTML = sanitizeBody(node.attrs.html);
    return element;
  },
});
const MediaImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      mediaId: {
        default: null,
        parseHTML: (element) => element.dataset.mediaId,
        renderHTML: (attributes) =>
          attributes.mediaId ? { "data-media-id": attributes.mediaId } : {},
      },
      width: { default: null },
      textAlign: {
        default: "left",
        renderHTML: (attrs) => ({
          style: `display:block;margin-left:${attrs.textAlign === "left" ? "0" : "auto"};margin-right:${attrs.textAlign === "right" ? "0" : "auto"}`,
        }),
      },
    };
  },
});
export const extensions = () => [
  StarterKit.configure({
    link: { openOnClick: false, protocols: ["https", "http", "mailto", "tel"] },
  }),
  TextStyle,
  Color,
  FontSize,
  Highlight.configure({ multicolor: true }),
  TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
  MediaImage,
  TableKit.configure({ table: { resizable: true } }),
  Original,
];
export function renderBodyJson(json) {
  return sanitizeBody(generateHTML(json, extensions()));
}
export function initialContent(record) {
  if (record.bodySchemaVersion === 1 && record.bodyJson?.type === "doc")
    return record.bodyJson;
  if (record.bodyHtml)
    return {
      type: "doc",
      content: [
        {
          type: "originalBlock",
          attrs: { html: sanitizeBody(record.bodyHtml) },
        },
        { type: "paragraph" },
      ],
    };
  return plainToDocument(record.body);
}
const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export async function createRichEditor(
  host,
  record,
  { onChange = () => {}, media = [] } = {},
) {
  let editor,
    destroyed = false,
    uploads = 0,
    hydrating = true;
  const urls = [];
  host.innerHTML = `<div class="rich-toolbar" role="toolbar" aria-label="본문 서식"><label><span class="sr-only">문단 형식</span><select data-block><option value="paragraph">본문</option><option value="1">제목 1</option><option value="2">제목 2</option><option value="3">제목 3</option></select></label><label><span class="sr-only">글자 크기</span><select data-size><option value="">기본 크기</option>${[12, 13, 14, 16, 18, 20, 24, 28, 32].map((size) => `<option value="${size}px">${size}px</option>`).join("")}</select></label><div data-text-tools></div><label title="글자색">글자색<input type="color" data-color value="#202632"></label><label title="강조색">강조<input type="color" data-highlight value="#fff3a3"></label><div data-insert-tools></div></div><div class="rich-table-tools" role="toolbar" aria-label="표 편집" hidden></div><div class="rich-image-tools" hidden><label>대체텍스트<input data-image-alt></label><label>너비 (%)<input type="number" min="10" max="100" data-image-width value="100"></label><button type="button" data-image-replace>교체</button><button type="button" data-image-delete>삭제</button></div><div class="rich-surface"></div><div class="rich-status" role="status"></div><div class="rich-errors" role="alert"></div><input type="file" data-image-file accept="image/png,image/jpeg,image/webp,image/gif" hidden>`;
  const status = host.querySelector(".rich-status"),
    error = host.querySelector(".rich-errors"),
    surface = host.querySelector(".rich-surface");
  const commands = [
    ["굵게", "bold", "bold"],
    ["기울임", "italic", "italic"],
    ["밑줄", "underline", "underline"],
    ["취소선", "strikethrough", "strike"],
    ["왼쪽 정렬", "align-left", "left"],
    ["가운데 정렬", "align-center", "center"],
    ["오른쪽 정렬", "align-right", "right"],
    ["글머리 목록", "list-unordered", "bulletList"],
    ["번호 목록", "list-ordered", "orderedList"],
    ["인용", "double-quotes-l", "blockquote"],
    ["구분선", "separator", "horizontalRule"],
    ["실행 취소", "arrow-go-back-line", "undo"],
    ["다시 실행", "arrow-go-forward-line", "redo"],
    ["서식 지우기", "format-clear", "clear"],
  ];
  function button(label, icon, action) {
    return `<button type="button" data-command="${action}" aria-label="${label}" title="${label}"><i class="ri-${icon}" aria-hidden="true"></i></button>`;
  }
  host.querySelector("[data-text-tools]").innerHTML = commands
    .map((c) => button(...c))
    .join("");
  host.querySelector("[data-insert-tools]").innerHTML = [
    ["링크", "link", "link"],
    ["링크 제거", "link-unlink", "unlink"],
    ["이미지", "image-add-line", "image"],
    ["기존 미디어", "gallery-line", "media"],
    ["표 삽입", "table-line", "table"],
    ["전체화면", "fullscreen-line", "fullscreen"],
    ["미리보기", "eye-line", "preview"],
  ]
    .map((c) => button(...c))
    .join("");
  const tableCommands = [
    ["위에 행", "addRowBefore"],
    ["아래에 행", "addRowAfter"],
    ["행 삭제", "deleteRow"],
    ["왼쪽 열", "addColumnBefore"],
    ["오른쪽 열", "addColumnAfter"],
    ["열 삭제", "deleteColumn"],
    ["셀 병합", "mergeCells"],
    ["셀 분할", "splitCell"],
    ["헤더행", "toggleHeaderRow"],
    ["표 삭제", "deleteTable"],
  ];
  host.querySelector(".rich-table-tools").innerHTML = tableCommands
    .map(
      ([label, action]) =>
        `<button type="button" data-command="${action}">${label}</button>`,
    )
    .join("");
  function update() {
    if (destroyed || !editor) return;
    status.textContent = `${editor.getText().length.toLocaleString()}자 · ${uploads ? "이미지 저장 중" : "편집 가능"}`;
    host.querySelector(".rich-table-tools").hidden = !editor.isActive("table");
    host.querySelector(".rich-image-tools").hidden = !editor.isActive("image");
    host.querySelectorAll("[data-command]").forEach((button) => {
      const name = button.dataset.command;
      button.setAttribute(
        "aria-pressed",
        String(
          ["left", "center", "right"].includes(name)
            ? editor.isActive({ textAlign: name })
            : editor.isActive(name),
        ),
      );
      if (name === "undo" || name === "redo")
        button.disabled = !editor.can()[name]();
      if (tableCommands.some((c) => c[1] === name))
        button.disabled = !editor.can()[name]();
    });
    const image = editor.getAttributes("image");
    if (document.activeElement !== host.querySelector("[data-image-alt]"))
      host.querySelector("[data-image-alt]").value = image.alt || "";
    host.querySelector("[data-size]").value =
      editor.getAttributes("textStyle").fontSize || "";
    host.querySelector("[data-image-width]").value =
      parseFloat(image.width) || 100;
    const heading = editor.getAttributes("heading");
    host.querySelector("[data-block]").value = editor.isActive("heading")
      ? String(heading.level)
      : "paragraph";
  }
  async function upload(file, replace = false) {
    if (!file) return;
    uploads++;
    error.textContent = "";
    update();
    try {
      const item = await uploadAdminMedia(file);
      if (destroyed) return;
      const url = URL.createObjectURL(item.blob);
      urls.push(url);
      const attrs = { src: url, mediaId: item.id, alt: file.name };
      if (replace)
        editor.chain().focus().updateAttributes("image", attrs).run();
      else editor.chain().focus().setImage(attrs).run();
    } catch (e) {
      error.textContent = e.message;
      const retry = document.createElement("button");
      retry.type = "button";
      retry.textContent = "다시 시도";
      retry.onclick = () => upload(file, replace);
      error.append(retry);
    } finally {
      uploads--;
      update();
    }
  }
  getSchema(extensions()).nodeFromJSON(initialContent(record)).check();
  editor = new Editor({
    element: surface,
    extensions: extensions(),
    content: initialContent(record),
    editorProps: {
      attributes: {
        "aria-label": "리치 본문 편집",
        role: "textbox",
        "aria-multiline": "true",
      },
      transformPastedHTML: sanitizeBody,
      handlePaste(view, event) {
        const file = [...(event.clipboardData?.files || [])].find((file) =>
          file.type.startsWith("image/"),
        );
        if (file) {
          upload(file);
          return true;
        }
        return false;
      },
      handleDrop(view, event) {
        const files = [...(event.dataTransfer?.files || [])];
        if (files.length) {
          files.forEach((file) => upload(file));
          return true;
        }
        return false;
      },
    },
    onUpdate() {
      update();
      if (!hydrating) onChange();
    },
    onSelectionUpdate: update,
  });
  async function hydrateImages() {
    for (const node of surface.querySelectorAll("img[data-media-id]")) {
      try {
        const item = await readAdminMedia(node.dataset.mediaId);
        if (item) {
          const url = URL.createObjectURL(item.blob);
          urls.push(url);
          editor.state.doc.descendants((n, pos) => {
            if (n.type.name === "image" && n.attrs.mediaId === item.id)
              editor.view.dispatch(
                editor.state.tr.setNodeMarkup(pos, undefined, {
                  ...n.attrs,
                  src: url,
                }),
              );
          });
        }
      } catch {
        error.textContent = "저장한 이미지를 불러오지 못했습니다.";
      }
    }
  }
  await hydrateImages();
  function popup(title, content, callback) {
    const selection = editor.state.selection;
    const dialog = document.createElement("dialog");
    dialog.className = "rich-dialog";
    dialog.innerHTML = `<form method="dialog"><h2>${title}</h2>${content}<div><button value="cancel">닫기</button><button value="apply">적용</button></div></form>`;
    document.body.append(dialog);
    dialog.addEventListener(
      "close",
      () => {
        if (dialog.returnValue === "apply") {
          editor.commands.setTextSelection({
            from: selection.from,
            to: selection.to,
          });
          callback(new FormData(dialog.querySelector("form")));
        }
        dialog.remove();
        editor.commands.focus();
      },
      { once: true },
    );
    dialog.showModal();
  }
  host.querySelectorAll("[data-command]").forEach((control) => {
    control.addEventListener("mousedown", (event) => event.preventDefault());
    control.onclick = () => {
      const name = control.dataset.command;
      const chain = editor.chain().focus();
      const toggle = {
        bold: "toggleBold",
        italic: "toggleItalic",
        underline: "toggleUnderline",
        strike: "toggleStrike",
        bulletList: "toggleBulletList",
        orderedList: "toggleOrderedList",
        blockquote: "toggleBlockquote",
        horizontalRule: "setHorizontalRule",
        undo: "undo",
        redo: "redo",
        unlink: "unsetLink",
      };
      if (toggle[name]) chain[toggle[name]]().run();
      else if (["left", "center", "right"].includes(name))
        chain.setTextAlign(name).run();
      else if (name === "clear") chain.unsetAllMarks().clearNodes().run();
      else if (name === "table")
        chain.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
      else if (tableCommands.some((c) => c[1] === name)) chain[name]().run();
      else if (name === "link")
        popup(
          "링크 설정",
          `<label>주소<input name="url" type="text" value="${escape(editor.getAttributes("link").href || "")}" placeholder="https://"></label>`,
          (form) => {
            const href = String(form.get("url"));
            if (!/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(href)) {
              error.textContent = "올바른 링크 주소를 입력해주세요.";
              return;
            }
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href })
              .run();
          },
        );
      else if (name === "image") {
        host.querySelector("[data-image-file]").dataset.replace = "";
        host.querySelector("[data-image-file]").click();
      } else if (name === "media")
        popup(
          "기존 미디어 선택",
          `<label>이미지<select name="src">${media.map((item) => `<option value="${escape(item.image)}">${escape(item.title || item.alt || item.image)}</option>`).join("")}</select></label>`,
          (form) =>
            editor
              .chain()
              .focus()
              .setImage({ src: form.get("src"), alt: "" })
              .run(),
        );
      else if (name === "fullscreen") {
        host.classList.toggle("rich-fullscreen");
        control.setAttribute(
          "aria-pressed",
          String(host.classList.contains("rich-fullscreen")),
        );
      } else if (name === "preview") {
        popup(
          "본문 미리보기",
          `<div class="source-original rich-preview">${renderBodyJson(serialized())}</div>`,
          () => {},
        );
        hydrateAdminMedia(document.querySelector(".rich-preview"));
      }
    };
  });
  host.querySelector("[data-block]").onchange = (event) => {
    const value = event.target.value;
    value === "paragraph"
      ? editor.chain().focus().setParagraph().run()
      : editor
          .chain()
          .focus()
          .setHeading({ level: Number(value) })
          .run();
  };
  host.querySelector("[data-size]").onchange = (event) =>
    event.target.value
      ? editor.chain().focus().setFontSize(event.target.value).run()
      : editor.chain().focus().unsetFontSize().run();
  host.querySelector("[data-color]").oninput = (event) =>
    editor.chain().focus().setColor(event.target.value).run();
  host.querySelector("[data-highlight]").oninput = (event) =>
    editor.chain().focus().setHighlight({ color: event.target.value }).run();
  host.querySelector("[data-image-file]").onchange = (event) => {
    upload(event.target.files[0], event.target.dataset.replace === "yes");
    event.target.value = "";
  };
  host.querySelector("[data-image-replace]").onclick = () => {
    host.querySelector("[data-image-file]").dataset.replace = "yes";
    host.querySelector("[data-image-file]").click();
  };
  host.querySelector("[data-image-delete]").onclick = () =>
    editor.chain().focus().deleteSelection().run();
  host.querySelector("[data-image-alt]").onchange = (event) =>
    editor
      .chain()
      .focus()
      .updateAttributes("image", { alt: event.target.value })
      .run();
  host.querySelector("[data-image-width]").onchange = (event) =>
    editor
      .chain()
      .focus()
      .updateAttributes("image", {
        width: Math.min(100, Math.max(10, Number(event.target.value))) + "%",
      })
      .run();
  host.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && host.classList.contains("rich-fullscreen")) {
      event.stopPropagation();
      host.classList.remove("rich-fullscreen");
    }
  });
  function serialized() {
    const json = editor.getJSON();
    function visit(node) {
      if (node.type === "image" && node.attrs?.mediaId)
        node.attrs.src = "/assets/images/fallback.svg";
      node.content?.forEach(visit);
    }
    visit(json);
    return json;
  }
  hydrating = false;
  const baseline = JSON.stringify(serialized());
  update();
  return {
    editor,
    get dirty() {
      return JSON.stringify(serialized()) !== baseline;
    },
    serialize(validate = false) {
      if (uploads) throw Error("이미지 저장이 끝난 후 다시 저장해주세요.");
      const bodyJson = serialized();
      const textElement = document.createElement("div");
      textElement.innerHTML = renderBodyJson(bodyJson);
      const bodyText = textElement.textContent || "";
      if (
        validate &&
        !bodyText.trim() &&
        !textElement.querySelector("img,table,hr")
      )
        throw Error("본문을 입력해주세요.");
      return {
        bodyJson,
        bodyHtml: renderBodyJson(bodyJson),
        body: bodyText.split("\n\n"),
        bodyText,
        bodySchemaVersion: 1,
      };
    },
    setContent(json) {
      editor.commands.setContent(json);
      hydrateImages();
    },
    destroy() {
      destroyed = true;
      editor.destroy();
      urls.forEach(URL.revokeObjectURL);
    },
  };
}
