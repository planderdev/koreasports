import { dashboard } from "../admin-dashboard.js";
import { adminSidebar, bindAdminShell } from "../admin-shell.js";
import {
  renderAdminEditor,
  bindAdminEditor,
  editorUrl,
  editLink,
  rowActions,
  contentSchemas,
} from "../admin-content.js";
import { renderContentTable } from "../admin-lists.js";
import { enhanceAdminTables } from "../admin-tables.js";
import * as r from "../services/repository.js";
import { previewMessage } from "../services/notification-service.js";
import {
  esc,
  icon,
  badge,
  button,
  empty,
  date,
  select,
  field,
} from "../renderers.js";
import { params } from "./catalog.js";
const sections = [
  ["index", "대시보드", "dashboard-line"],
  ["members", "개인회원·소속 직장", "user-line"],
  ["organizations", "기업회원 승인", "building-line"],
  ["clubs", "동호회 관리", "team-line"],
  ["events", "대회 관리", "trophy-line"],
  ["applications", "참가 신청 관리", "file-list-3-line"],
  ["education", "교육 관리", "book-open-line"],
  ["qualifications", "자격검증 관리", "medal-line"],
  ["volunteers", "자원봉사 관리", "hand-heart-line"],
  ["safety", "안전교육 이수 현황", "shield-check-line"],
  ["content", "게시판·메인 배너", "layout-line"],
  ["sponsors", "후원 관리", "heart-line"],
  ["notifications", "알림 관리", "message-2-line"],
];
const keyMap = {
  members: "members",
  organizations: "organizations",
  clubs: "clubs",
  events: "events",
  education: "courses",
  qualifications: "qualificationPrograms",
  content: "posts",
  sponsors: "sponsors",
};
const table = (heads, rows) =>
  `<div class="data-table-wrap"><table class="data-table"><thead><tr>${heads.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.join("") || `<tr><td colspan="${heads.length}"><div class="empty">조회된 데이터가 없습니다.</div></td></tr>`}</tbody></table></div>`;
function statusTable(rows) {
  return table(
    ["신청자 / 단체", "신청 내용", "접수일", "상태", "처리"],
    rows.map(
      (a) =>
        `<tr data-record-key="requests" data-record-id="${esc(a.id)}"><td>${esc(r.collection("members").find((m) => m.id === a.memberId)?.name || a.title)}${a.cohort ? `<br><small>${esc(a.cohort)} · ${esc(a.role)}</small>` : ""}</td><td>${editLink("requests", a)}${a.reason ? `<br><small>사유: ${esc(a.reason)}</small>` : ""}</td><td>${date(a.createdAt)}</td><td>${badge(a.status)}</td><td>${rowActions("requests", a.id, a.title)}</td></tr>`,
    ),
  );
}
export function admin() {
  const section = document.body.dataset.admin || "index",
    editorKey = params().key,
    activeSection =
      section === "edit"
        ? contentSchemas[editorKey]?.section ||
          {
            progress: "safety",
            requests: "applications",
            notificationHistory: "notifications",
            notificationSend: "notifications",
          }[editorKey] ||
          "index"
        : section,
    name = sections.find((x) => x[0] === activeSection)?.[1] || "관리자";
  const q = params();
  let body;
  if (r.getRole() !== "admin")
    body = `${empty("관리자 역할로 전환해주세요", "아래 버튼으로 관리자 화면으로 이동하세요.")}<div class="form-actions"><button class="button" id="enter-admin">관리자 시작</button></div>`;
  else if (section === "edit") body = renderAdminEditor();
  else if (section === "index") {
    body =
      dashboard() +
      `<h2 class="admin-section-title">최근 접수 현황</h2>${statusTable([...r.state().registrations, ...r.state().applications].slice(-6).reverse())}`;
  } else if (section === "volunteers" && q.type === "programs") {
    body = `<nav class="tabs underline"><a href="/admin/volunteers.php">지원자 선발</a><a class="active" href="?type=programs">모집 프로그램</a></nav><div class="result-bar"><span>대회별 모집 기수와 필수교육 관리</span><a class="button small" href="${editorUrl("volunteerPrograms")}">모집 등록</a></div>${renderContentTable(
      "volunteerPrograms",
      r
        .collection("volunteerPrograms", { includeDeleted: true })
        .filter((x) => (q.archived ? x.deletedAt : !x.deletedAt)),
      table,
    )}<a class="admin-trash-link" href="?type=programs${q.archived ? "" : "&archived=1"}">${q.archived ? "현재 목록 보기" : "휴지통 보기"}</a>`;
  } else if (["applications", "volunteers"].includes(section)) {
    let rows = r
      .state()
      .applications.filter(
        (a) => a.kind === (section === "volunteers" ? "volunteer" : "event"),
      );
    body = `${section === "volunteers" ? '<nav class="tabs underline"><a class="active" href="/admin/volunteers.php">지원자 선발</a><a href="?type=programs">모집 프로그램</a></nav>' : ""}${statusTable(rows)}`;
  } else if (section === "safety") {
    const s = r.state();
    let members = r.collection("members");
    if (q.incomplete)
      members = members.filter(
        (m) =>
          !s.progress.some(
            (p) =>
              p.memberId === m.id &&
              p.courseId === "course-5" &&
              p.status === "완료",
          ),
      );
    body = `<form class="filters" data-filter><label class="check-label"><input name="incomplete" value="1" type="checkbox" ${q.incomplete ? "checked" : ""}>미이수자만 보기</label><button class="button">조회</button></form>${table(
      ["회원", "필수 과정", "이수 현황", "안내"],
      members.map((m) => {
        const p = s.progress.find(
          (p) => p.memberId === m.id && p.courseId === "course-5",
        );
        return `<tr><td><a class="admin-record-title" href="${editorUrl("progress", m.id)}">${esc(m.name)}</a></td><td>자원봉사자 사전 안전교육</td><td>${badge(p?.status || "미시작")} · ${p?.steps.length || 0}/3${p?.adminNote ? "<br><small>관리자 정정 기록 있음</small>" : ""}</td><td>${rowActions("progress", m.id, m.name, { readOnly: true })}</td></tr>`;
      }),
    )}`;
  } else if (section === "notifications") body = notifications();
  else {
    let key = keyMap[section];
    if (section === "content" && q.type === "banners") key = "heroSlides";
    if (section === "sponsors" && q.type === "reports") key = "donationReports";
    let rows = r
      .collection(key, { includeDeleted: true })
      .filter((x) => (q.archived ? x.deletedAt : !x.deletedAt));
    body = `${["content", "sponsors"].includes(section) ? `<nav class="tabs underline"><a class="${!q.type ? "active" : ""}" href="/admin/${section}.php">${section === "content" ? "게시판" : "후원사"}</a><a class="${q.type ? "active" : ""}" href="?type=${section === "content" ? "banners" : "reports"}">${section === "content" ? "메인 배너" : "후원금집행내역"}</a></nav>` : ""}<div class="result-bar"><span>총 <strong>${rows.length}</strong>건</span>${section !== "members" ? `<a class="button small" href="${editorUrl(key)}">${icon("add-line")}신규 등록</a>` : ""}</div>${renderContentTable(key, rows, table)}<a class="admin-trash-link" href="?${q.type ? "type=" + encodeURIComponent(q.type) + "&" : ""}${q.archived ? "" : "archived=1"}">${q.archived ? "현재 목록 보기" : "휴지통 보기"}</a>`;
    if (["organizations", "clubs"].includes(section)) {
      const registrations = r
        .state()
        .registrations.filter(
          (x) => x.type === (section === "clubs" ? "club" : "organization"),
        );
      body += `<h2 style="font-size:var(--type-heading-1-size);line-height:var(--type-heading-1-line);letter-spacing:var(--type-heading-1-tracking);margin:var(--space-32) 0 var(--space-20)">신규 등록 승인 요청</h2>${statusTable(registrations)}`;
      if (section === "clubs")
        body += `<h2 style="font-size:var(--type-heading-1-size);line-height:var(--type-heading-1-line);letter-spacing:var(--type-heading-1-tracking);margin:var(--space-32) 0 var(--space-20)">동호회 가입 요청</h2>${statusTable(r.state().applications.filter((a) => a.kind === "club"))}`;
    }
    if (section === "qualifications")
      body += `<h2 style="font-size:var(--type-heading-1-size);line-height:var(--type-heading-1-line);letter-spacing:var(--type-heading-1-tracking);margin:var(--space-32) 0 var(--space-20)">검증 신청 및 합격 처리</h2>${statusTable(r.state().applications.filter((a) => a.kind === "qualification"))}`;
    if (section === "education")
      body += `<h2 style="font-size:var(--type-heading-1-size);line-height:var(--type-heading-1-line);letter-spacing:var(--type-heading-1-tracking);margin:var(--space-32) 0 var(--space-20)">수강 신청</h2>${statusTable(r.state().applications.filter((a) => a.kind === "course"))}`;
  }
  return `<div class="admin-shell">${adminSidebar(activeSection + (q.type ? "?type=" + q.type : ""))}<div class="admin-main">${section === "edit" && r.getRole() === "admin" ? "" : `<div class="admin-title"><div><h1>${name}</h1><p>목록을 검색하고 필요한 항목을 선택해 한 번에 처리하세요.</p></div>${button("사이트로 이동", "/index.php", "secondary small", "arrow-right-up-line")}</div>`}${body}</div></div>`;
}
function notifications() {
  const q = params(),
    s = r.state();
  let recipients = s.applications.filter(
    (a) => a.kind === "volunteer" && a.status !== "취소",
  );
  if (q.eventId) recipients = recipients.filter((a) => a.eventId === q.eventId);
  if (q.cohort) recipients = recipients.filter((a) => a.cohort === q.cohort);
  if (q.status) recipients = recipients.filter((a) => a.status === q.status);
  return `<form class="filters" data-filter>${select(
    "eventId",
    "대회",
    r.listEvents().map((e) => ({ value: e.id, title: e.title })),
    q.eventId,
  )}${select(
    "cohort",
    "기수",
    r.collection("volunteerPrograms").map((v) => v.cohort),
    q.cohort,
  )}${select("status", "선발 상태", ["접수", "선발", "미선발"], q.status)}<button class="button">대상 조회</button></form><div class="notification-layout"><div><h2 style="font-size:var(--type-heading-1-size);line-height:var(--type-heading-1-line);letter-spacing:var(--type-heading-1-tracking);margin-bottom:var(--space-20)">발송 대상 <span id="recipient-count">0</span>명</h2>${table(
    ["선택", "이름", "기수 / 역할", "상태"],
    recipients.map(
      (a) =>
        `<tr><td><input type="checkbox" name="recipient" value="${a.id}" aria-label="${esc(a.title)} 선택"></td><td><a class="admin-record-title" href="${editorUrl("requests", a.id)}">${esc(r.collection("members").find((m) => m.id === a.memberId)?.name)}</a></td><td>${esc(a.cohort)} / ${esc(a.role)}</td><td>${badge(a.status)}</td></tr>`,
    ),
  )}<form id="message-form" class="panel"><h3>메시지 구성</h3>${select(
    "template",
    "템플릿",
    r
      .collection("notificationTemplates")
      .filter((t) => t.id !== "welcome")
      .map((t) => ({ value: t.id, title: t.title })),
    q.template || "selected",
    null,
  )}<div id="message-variables" class="form-grid"></div><div class="error-text" id="message-error" role="alert"></div><button class="button full-width" type="submit">발송 전 확인 ${icon("arrow-right-line")}</button></form></div><div><h2 style="font-size:var(--type-heading-1-size);line-height:var(--type-heading-1-line);letter-spacing:var(--type-heading-1-tracking);margin-bottom:var(--space-20)">메시지 미리보기</h2><div class="phone-preview"><p id="message-preview"></p></div></div></div><div class="panel"><div class="row spread"><h3>알림 템플릿 관리</h3><a class="button small secondary" id="edit-template-link" href="${editorUrl("notificationTemplates", q.template || "selected")}">선택 템플릿 수정</a></div>${renderContentTable("notificationTemplates", r.collection("notificationTemplates"), table)}<h3 style="margin-top:var(--space-28)">알림 처리 이력</h3>${table(
    ["시각", "템플릿", "대상 수", "결과"],
    s.notifications.map(
      (n) =>
        `<tr><td>${date(n.createdAt)}</td><td><a class="admin-record-title" href="${editorUrl("notificationHistory", n.id)}">${esc(n.templateId)}</a></td><td>${n.recipientIds?.length || 1}</td><td>${badge(n.status)}</td></tr>`,
    ),
  )}</div>`;
}
export function bindAdmin() {
  if (document.body.dataset.page !== "admin") return;
  bindAdminShell();
  enhanceAdminTables();
  bindAdminEditor();
  document.getElementById("enter-admin")?.addEventListener("click", () => {
    r.setRole("admin");
    location.reload();
  });
  document.querySelectorAll(".admin-action-menu").forEach((menu) =>
    menu.addEventListener("beforetoggle", (e) => {
      if (e.newState !== "open") return;
      const trigger = document.querySelector(`[popovertarget="${menu.id}"]`),
        rect = trigger.getBoundingClientRect();
      menu.style.left =
        Math.max(8, Math.min(rect.right - 180, innerWidth - 188)) + "px";
      menu.style.top =
        Math.max(8, Math.min(rect.bottom + 4, innerHeight - 180)) + "px";
    }),
  );
  const form = document.getElementById("message-form");
  if (form) {
    let selectedRecipients = [];
    document.addEventListener("admin-selection-change", (event) => {
      if (event.detail.recipients) {
        selectedRecipients = event.detail.ids;
        document.getElementById("recipient-count").textContent =
          selectedRecipients.length;
      }
    });
    const renderVariables = () => {
      const template = r
          .collection("notificationTemplates")
          .find((x) => x.id === form.elements.template.value),
        names = [
          ...new Set(
            [...(template?.body || "").matchAll(/\{(\w+)\}/g)].map((x) => x[1]),
          ),
        ],
        labels = {
          name: "이름",
          reason: "사유",
          event: "대회명",
          venue: "장소",
          time: "집결 시간",
          items: "준비물",
        };
      document.getElementById("message-variables").innerHTML = names
        .map(
          (name) =>
            `<label class="field">${labels[name] || name}<input name="${esc(name)}" required></label>`,
        )
        .join("");
    };
    form.elements.template.addEventListener("change", renderVariables);
    renderVariables();
    const preview = () => {
      const fields = Object.fromEntries(new FormData(form));
      document.getElementById("message-preview").textContent = previewMessage(
        fields.template,
        fields,
      );
      document.getElementById("recipient-count").textContent =
        selectedRecipients.length;
      document.getElementById("edit-template-link").href = editorUrl(
        "notificationTemplates",
        fields.template,
      );
    };
    form.addEventListener("input", preview);
    document
      .querySelectorAll("[name=recipient]")
      .forEach((x) => x.addEventListener("change", preview));
    preview();
    form.onsubmit = (e) => {
      e.preventDefault();
      const recipients = selectedRecipients;
      if (!recipients.length) {
        document.getElementById("message-error").textContent =
          "대상을 1명 이상 선택해주세요.";
        return;
      }
      r.saveNotificationDraft({
        recipients,
        fields: Object.fromEntries(new FormData(form)),
      });
      location.href = editorUrl("notificationSend");
    };
  }
}
