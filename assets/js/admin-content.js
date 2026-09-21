import * as r from "./services/repository.js";
import { esc, icon, badge } from "./renderers.js";
import {
  previewMessage,
  simulateSend,
} from "./services/notification-service.js";

const f = (name, label, type = "text", options = {}) => ({
  name,
  label,
  type,
  ...options,
});
const title = f("title", "제목 / 명칭", "text", { required: true });
const summary = f("summary", "소개 / 요약", "textarea");
const status = f("status", "게시 상태", "select", {
  options: [
    ["published", "게시"],
    ["draft", "초안"],
  ],
});
const sport = f("sport", "종목", "select", { source: "sports" }),
  region = f("region", "지역", "select", { source: "regions" });
const media = [
  f("image", "대표 이미지", "select", { source: "images" }),
  f("alt", "이미지 설명"),
];
const group = (title, description, fields) => ({ title, description, fields });
export const contentSchemas = {
  members: {
    title: "회원 정보",
    section: "members",
    groups: [
      group(
        "회원 프로필",
        "회원번호와 가입일은 유지하고 운영 정보를 수정합니다.",
        [
          f("name", "회원명", "text", { required: true }),
          f("organizationId", "소속 직장", "select", {
            source: "organizations",
          }),
          f("interests", "참여 종목", "checks", { source: "memberSports" }),
        ],
      ),
      group("활동 관리", "회원의 활동 상태를 관리합니다.", [
        f("status", "활동 상태", "select", { options: ["활동", "휴면"] }),
      ]),
    ],
  },
  organizations: {
    title: "기업회원",
    section: "organizations",
    groups: [
      group("기업 기본정보", "명칭과 활동 지역을 관리합니다.", [title, region]),
      group("승인 검토", "검토 결과와 사유를 기록합니다.", [
        f("status", "승인 상태", "select", {
          options: ["승인대기", "승인", "반려"],
        }),
        f("reviewNote", "검토 사유", "textarea"),
      ]),
    ],
  },
  clubs: {
    title: "동호회",
    section: "clubs",
    groups: [
      group("동호회 소개", "종목과 활동 지역을 확인합니다.", [
        title,
        sport,
        region,
        summary,
        ...media,
      ]),
      group("모임 및 모집", "모집 여부와 정기 모임을 관리합니다.", [
        f("meeting", "정기 모임"),
        f("memberCount", "회원 수", "number", { min: 0 }),
        f("recruiting", "모집 상태", "select", {
          options: [
            ["true", "모집중"],
            ["false", "모집마감"],
          ],
        }),
        f("featured", "우수동호회 표시", "checkbox"),
      ]),
    ],
  },
  events: {
    title: "대회",
    section: "events",
    groups: [
      group("대회 소개", "대회 성격과 참가 대상을 안내합니다.", [
        title,
        sport,
        region,
        summary,
        ...media,
        f("eligibility", "참가 대상"),
      ]),
      group("개최 일정 및 장소", "종료일은 시작일보다 늦어야 합니다.", [
        f("startsAt", "개최 시작", "datetime-local", { required: true }),
        f("endsAt", "개최 종료", "datetime-local", { required: true }),
        f("venue", "개최 장소", "text", { required: true }),
      ]),
      group(
        "접수 및 정원",
        "접수 시작 < 접수 마감 ≤ 개최 시작 순서로 입력합니다.",
        [
          f("registrationStartsAt", "접수 시작", "datetime-local", {
            required: true,
          }),
          f("registrationEndsAt", "접수 마감", "datetime-local", {
            required: true,
          }),
          f("capacity", "모집 정원", "number", { min: 1, required: true }),
          f("applicationType", "참가 형태", "checks", {
            options: [
              ["individual", "개인"],
              ["team", "단체"],
            ],
          }),
        ],
      ),
      group("운영 상태", "목록에 표시할 운영 상태를 설정합니다.", [status]),
    ],
  },
  courses: {
    title: "교육 과정",
    section: "education",
    groups: [
      group("과정 안내", "교육 유형과 수강 안내를 작성합니다.", [
        title,
        f("category", "교육 유형", "select", {
          options: ["안전교육", "레슨", "보수교육"],
        }),
        summary,
        f("duration", "교육 시간"),
        f("format", "교육 방식"),
        ...media,
      ]),
      group("학습 구성", "과정에 포함할 학습 단계를 선택합니다.", [
        f("associationId", "담당 종목협회", "select", {
          source: "associations",
        }),
        f("lessonIds", "학습 단계", "checks", { source: "lessons" }),
        status,
      ]),
    ],
  },
  qualificationPrograms: {
    title: "자격검증 과정",
    section: "qualifications",
    groups: [
      group("검증 안내", "자격 종류와 검증 내용을 관리합니다.", [
        title,
        f("category", "자격 분야"),
        summary,
      ]),
      group("선행 교육", "연결할 교육 과정을 선택합니다.", [
        f("courseId", "연계 교육", "select", { source: "courses" }),
        status,
      ]),
    ],
  },
  posts: {
    title: "게시물",
    section: "content",
    groups: [
      group("게시 설정", "게시판과 공지 노출 여부를 설정합니다.", [
        f("category", "게시판", "select", { source: "boards" }),
        title,
        f("pinned", "상단 고정", "checkbox"),
        status,
      ]),
      group("본문 작성", "본문, 이미지와 표를 작성합니다.", [
        summary,
        f("body", "본문", "richtext", { required: true, rows: 12 }),
        ...media,
      ]),
    ],
  },
  heroSlides: {
    title: "메인 배너",
    section: "content",
    type: "banners",
    groups: [
      group("배너 문구", "짧고 명확한 제목과 설명을 작성합니다.", [
        f("eyebrow", "상단 영문 문구"),
        f("title", "배너 제목", "textarea", { required: true, rows: 2 }),
        summary,
      ]),
      group(
        "비주얼 및 연결",
        "현재 제공된 이미지와 사이트 내부 경로를 사용합니다.",
        [
          ...media,
          f("cta", "버튼 문구", "text", { required: true }),
          f("url", "연결 경로", "text", { required: true }),
          f("order", "노출 순서", "number", { min: 0 }),
          status,
        ],
      ),
    ],
  },
  sponsors: {
    title: "후원사",
    section: "sponsors",
    groups: [
      group("후원사 정보", "후원사 명칭과 소개를 관리합니다.", [
        title,
        f("category", "후원 구분"),
        f("description", "후원사 소개", "textarea"),
      ]),
      group("연결 및 표시", "링크는 사이트 내부 경로로 입력합니다.", [
        f("url", "소개 페이지 경로"),
        status,
      ]),
    ],
  },
  donationReports: {
    title: "후원금 집행내역",
    section: "sponsors",
    type: "reports",
    groups: [
      group(
        "공개 기간과 금액",
        "금액이 미제공이면 비워두세요. 0원과 구분됩니다.",
        [
          title,
          f("period", "공개 기간", "text", { required: true }),
          f("amount", "집행 금액 (원)", "number", { min: 0 }),
        ],
      ),
      group("집행 내용", "검토한 내역과 설명을 입력합니다.", [
        f("description", "집행 상세", "textarea", { rows: 10 }),
        status,
      ]),
    ],
  },
  volunteerPrograms: {
    title: "자원봉사 모집",
    section: "volunteers",
    type: "programs",
    groups: [
      group("모집 안내", "대회와 모집 기수를 연결합니다.", [
        title,
        f("eventId", "연결 대회", "select", { source: "events" }),
        f("cohort", "모집 기수", "text", { required: true }),
        region,
        summary,
      ]),
      group("업무 및 사전교육", "역할을 한 줄에 하나씩 입력합니다.", [
        f("roles", "모집 역할", "textarea", { required: true }),
        f("courseId", "필수 교육", "select", { source: "courses" }),
        status,
      ]),
    ],
  },
  notificationTemplates: {
    title: "알림 템플릿",
    section: "notifications",
    groups: [
      group(
        "메시지 작성",
        "{name}, {event}, {venue}, {time}, {items}, {reason} 변수를 사용할 수 있습니다.",
        [
          title,
          f("body", "메시지 내용", "textarea", { required: true, rows: 10 }),
        ],
      ),
    ],
  },
};
const titleLabels = {
  organizations: "기업명",
  clubs: "동호회명",
  events: "대회명",
  courses: "교육 과정명",
  qualificationPrograms: "자격검증명",
  posts: "게시물 제목",
  sponsors: "후원사명",
  donationReports: "집행내역 제목",
  notificationTemplates: "템플릿명",
  volunteerPrograms: "모집 제목",
};
for (const [key, schema] of Object.entries(contentSchemas))
  for (const section of schema.groups)
    section.fields = section.fields.map((field) =>
      field === title
        ? { ...field, label: titleLabels[key] || field.label }
        : field,
    );
export function editorUrl(key, id = "", mode = "", ids = []) {
  const q = new URLSearchParams({ key });
  if (id) q.set("id", id);
  if (mode) q.set("mode", mode);
  if (ids.length) q.set("selection", r.adminSelection(ids));
  if (
    typeof location !== "undefined" &&
    location.pathname !== "/admin/edit.php"
  )
    q.set("return", location.pathname + location.search);
  return "/admin/edit.php?" + q;
}
export function listUrl(key) {
  const s = contentSchemas[key];
  return s
    ? `/admin/${s.section}.php${s.type ? "?type=" + s.type : ""}`
    : key === "progress"
      ? "/admin/safety.php"
      : key.startsWith("notification")
        ? "/admin/notifications.php"
        : "/admin/applications.php";
}
function returnUrl(q) {
  const u = q.get("return");
  return u &&
    /^\/admin\/[a-z-]+\.php(?:\?[^#]*)?$/.test(u) &&
    !u.startsWith("/admin/edit.php")
    ? u
    : listUrl(q.get("key") || "");
}
export function rowActions(
  key,
  id,
  label,
  { readOnly = false, deleted = false } = {},
) {
  const uid = "action-" + key + "-" + id;
  return `<button class="icon-button admin-row-more" type="button" popovertarget="${esc(uid)}" aria-label="${esc(label)} 작업 메뉴">${icon("more-2-fill")}</button><div class="admin-action-menu" id="${esc(uid)}" popover><a href="${esc(editorUrl(key, id))}">${readOnly ? "상세 보기" : "수정 페이지"}</a>${readOnly || key === "notificationTemplates" ? "" : deleted ? `<a href="${esc(editorUrl(key, id, "restore"))}">복구</a>` : `<a href="${esc(editorUrl(key, id, "status"))}">상태 변경</a>${contentSchemas[key] && key !== "notificationTemplates" ? `<a class="admin-danger" href="${esc(editorUrl(key, id, "delete"))}">휴지통으로 이동</a>` : ""}`}</div>`;
}
export function editLink(key, row) {
  return `<a class="admin-record-title" href="${esc(editorUrl(key, row.id))}" ${key === "requests" ? `data-status="${row.id}"` : `data-edit="${row.id}" data-key="${key}"`}>${esc(row.title || row.name || row.id)}</a>`;
}
function options(field) {
  if (field.options)
    return field.options.map((x) => (Array.isArray(x) ? x : [x, x]));
  if (field.source === "images")
    return [
      ...new Map(
        [
          ...r.content("mediaAssets"),
          ...r.content("sourceMedia"),
          ...r.content("posts"),
        ]
          .filter((x) => x.image)
          .map((x) => [x.image, [x.image, x.alt || x.title]]),
      ).values(),
    ];
  // 회원의 참여 종목: 기존 4종 + 선수등록 폼 목록 + 회원이 직접 입력해 둔 종목까지 보여줍니다.
  if (field.source === "memberSports")
    return [
      ...new Set([
        ...r.content("sports"),
        ...r.content("participationSports"),
        ...r.collection("members").flatMap((m) => m.interests || []),
      ]),
    ].map((x) => [x, x]);
  const values = [
    "sports",
    "regions",
    "boards",
    "associations",
    "lessons",
  ].includes(field.source)
    ? r.content(field.source)
    : r.collection(field.source);
  return values.map((x) =>
    typeof x === "string" ? [x, x] : [x.id, x.title || x.name],
  );
}
function renderField(field, x) {
  let value = x[field.name] ?? (field.name === "status" ? "published" : "");
  if (field.type === "datetime-local") value = String(value).slice(0, 16);
  if (Array.isArray(value) && field.type === "textarea")
    value = value.join(field.name === "roles" ? "\n" : "\n\n");
  const id = "edit-" + field.name;
  const required = field.required ? " required" : "";
  const label = `${esc(field.label)}${field.required ? ' <span class="admin-required">*</span>' : ""}`;
  if (field.type === "richtext")
    return `<div class="field full"><label id="rich-body-label">${label}</label><input type="hidden" name="body" value="${esc(Array.isArray(value) ? value.join("\n\n") : value)}"><div id="rich-body" aria-labelledby="rich-body-label"></div></div>`;
  if (field.type === "checkbox")
    return `<label class="check-label"><input name="${field.name}" type="checkbox" ${value ? "checked" : ""}>${label}</label>`;
  if (field.type === "checks")
    return `<fieldset class="admin-field-options"><legend>${label}</legend>${options(
      field,
    )
      .map(
        ([v, t]) =>
          `<label class="check-label"><input type="checkbox" name="${field.name}" value="${esc(v)}" ${Array.isArray(value) && value.includes(v) ? "checked" : ""}>${esc(t)}</label>`,
      )
      .join("")}</fieldset>`;
  const input =
    field.type === "select"
      ? `<select id="${id}" name="${field.name}"${required}>${options(field)
          .map(
            ([v, t]) =>
              `<option value="${esc(v)}" ${String(value) === String(v) ? "selected" : ""}>${esc(t)}</option>`,
          )
          .join("")}</select>`
      : field.type === "textarea"
        ? `<textarea id="${id}" name="${field.name}" rows="${field.rows || 4}" maxlength="${field.name === "body" ? 100000 : 10000}"${required}>${esc(value)}</textarea>`
        : `<input id="${id}" name="${field.name}" type="${field.type}" value="${esc(value)}"${required}${field.min !== undefined ? ` min="${field.min}"` : ""}${field.type === "number" ? ' step="1"' : ' maxlength="300"'}>`;
  return `<div class="field ${field.type === "textarea" ? "full" : ""}"><label for="${id}">${label}</label>${input}</div>`;
}
export function parseContentForm(key, form) {
  const schema = contentSchemas[key];
  if (!schema) throw Error("지원하지 않는 콘텐츠입니다.");
  const patch = {};
  for (const f of schema.groups.flatMap((g) => g.fields)) {
    const value = form.get(f.name);
    patch[f.name] =
      f.type === "checks"
        ? form.getAll(f.name)
        : f.type === "checkbox"
          ? form.has(f.name)
          : f.type === "number"
            ? value === ""
              ? null
              : Number(value)
            : String(value ?? "").trim();
    if (f.required && !patch[f.name])
      throw Error(f.label + "을(를) 입력해주세요.");
    if (
      f.type === "number" &&
      patch[f.name] !== null &&
      (!Number.isFinite(patch[f.name]) || patch[f.name] < (f.min ?? 0))
    )
      throw Error(f.label + "을(를) 확인해주세요.");
    if (
      f.type === "select" &&
      !options(f).some(([v]) => String(v) === patch[f.name])
    )
      throw Error(f.label + " 값이 올바르지 않습니다.");
    if (
      f.type === "checks" &&
      patch[f.name].some((v) => !options(f).some(([o]) => String(o) === v))
    )
      throw Error("선택 항목을 확인해주세요.");
    if (f.type === "datetime-local") {
      if (!Number.isFinite(Date.parse(patch[f.name])))
        throw Error("일정을 확인해주세요.");
      patch[f.name] += ":00+09:00";
    }
  }
  if (key === "events") {
    if (!(
      new Date(patch.registrationStartsAt) <
        new Date(patch.registrationEndsAt) &&
      new Date(patch.registrationEndsAt) <= new Date(patch.startsAt) &&
      new Date(patch.startsAt) < new Date(patch.endsAt)
    ))
      throw Error(
        "접수 시작 < 접수 마감 ≤ 개최 시작 < 개최 종료 순서로 입력해주세요.",
      );
    if (!patch.applicationType.length) throw Error("참가 형태를 선택해주세요.");
  }
  if (patch.url && !/^\/(?!\/)/.test(patch.url))
    throw Error("연결 경로는 /로 시작하는 사이트 내부 경로여야 합니다.");
  if (key === "organizations" && patch.status === "반려" && !patch.reviewNote)
    throw Error("반려 사유를 입력해주세요.");
  if (key === "members")
    patch.organizationNameSnapshot =
      r.collection("organizations").find((o) => o.id === patch.organizationId)
        ?.title || "";
  if (patch.sport)
    patch.associationId = r
      .content("associations")
      .find((a) => a.sport === patch.sport)?.id;
  if (key === "clubs") patch.recruiting = patch.recruiting === "true";
  if (key === "volunteerPrograms")
    patch.roles = patch.roles
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
  if (key === "posts") patch.body = patch.body.split(/\n\s*\n/).filter(Boolean);
  patch.updatedAt = new Date().toISOString();
  return patch;
}
const stateSelect = (choices, current = "") =>
  `<div class="field"><label for="edit-status">변경할 상태</label><select id="edit-status" name="status" required><option value="">상태 선택</option>${choices.map((s) => `<option value="${s}" ${s === current ? "selected" : ""}>${{ published: "게시", draft: "초안", true: "모집중", false: "모집마감" }[s] || s}</option>`).join("")}</select></div>`;
function recordChoices(key) {
  return key === "members"
    ? ["활동", "휴면"]
    : key === "organizations"
      ? ["승인대기", "승인", "반려"]
      : key === "clubs"
        ? ["true", "false"]
        : ["published", "draft"];
}
function sourceRows(key) {
  return key === "requests"
    ? [...r.state().applications, ...r.state().registrations]
    : key === "notificationHistory"
      ? r.state().notifications
      : key === "progress"
        ? r.collection("members")
        : contentSchemas[key]
          ? r.collection(key, { includeDeleted: true })
          : [];
}
export function renderAdminEditor() {
  const q = new URLSearchParams(location.search),
    key = q.get("key") || "",
    id = q.get("id"),
    mode = q.get("mode"),
    ids = q.get("selection")
      ? r.readAdminSelection(q.get("selection"))
      : q.get("ids")?.split(",").filter(Boolean) || [],
    schema = contentSchemas[key],
    x = sourceRows(key).find((x) => x.id === id),
    back = returnUrl(q);
  const special = [
    "requests",
    "progress",
    "notificationHistory",
    "notificationSend",
  ].includes(key);
  if (
    (!schema && !special) ||
    (id && !x) ||
    (!schema && !id && key !== "notificationSend" && !ids.length)
  )
    return '<div class="empty"><h2>편집 항목을 찾을 수 없습니다</h2><a href="/admin/index.php">관리자 홈</a></div>';
  let titleText =
      (schema?.title ||
        {
          requests: "신청 검토",
          progress: "안전교육 이수 정정",
          notificationHistory: "발송 이력",
          notificationSend: "발송 시뮬레이션 확인",
        }[key]) + (schema ? (id ? " 수정" : " 등록") : ""),
    body = "",
    submit = "변경사항 저장",
    readOnly = key === "notificationHistory";
  if (mode === "delete" || mode === "restore") {
    titleText = mode === "delete" ? "휴지통으로 이동" : "콘텐츠 복구";
    submit = titleText;
    body = `<section class="editor-section"><h2>${esc(x?.title || x?.name)}</h2><p>${mode === "delete" ? "항목을 목록에서 숨깁니다. 휴지통에서 복구할 수 있습니다." : "항목을 다시 목록에 표시합니다."}</p></section>`;
  } else if (ids.length || mode === "status" || key === "requests") {
    const selected = ids.length
      ? sourceRows(key).filter((x) => ids.includes(x.id))
      : x
        ? [x]
        : [];
    const choices =
      key === "requests"
        ? selected.length
          ? r
              .allowedAdminStatuses(selected[0])
              .filter((s) =>
                selected.every((a) => r.allowedAdminStatuses(a).includes(s)),
              )
          : []
        : recordChoices(key);
    titleText = ids.length
      ? `${ids.length}개 항목 일괄 변경`
      : key === "requests"
        ? "신청 검토 및 처리"
        : "상태 변경";
    body = `<section class="editor-section"><h2>처리 대상</h2><ul class="editor-targets">${selected.map((a) => `<li><strong>${esc(a.title || a.name)}</strong>${badge(a.status || "등록")}${a.cohort ? `<span>${esc(a.cohort)} · ${esc(a.role || "")}</span>` : ""}</li>`).join("")}</ul></section><section class="editor-section"><h2>처리 결과</h2>${stateSelect(choices, key === "clubs" ? String(x?.recruiting) : x?.status)}${renderField(f("reason", "처리 사유 · 반려/미선발/불합격 시 필수", "textarea"), { reason: x?.reason || "" })}</section>`;
  } else if (key === "progress") {
    const p = r
      .state()
      .progress.find((p) => p.memberId === id && p.courseId === "course-5");
    body = `<section class="editor-section"><h2>${esc(x.name)} · 사전 안전교육</h2><p>실제 학습 단계 ${p?.steps.length || 0}/3 · 관리자 정정 내역은 학습 기록과 별도로 남습니다.</p>${stateSelect(["미시작", "진행중", "완료"], p?.status || "미시작")}${renderField(f("reason", "정정 근거", "textarea", { required: true }), { reason: p?.adminNote })}</section>`;
  } else if (key === "notificationHistory") {
    body = `<section class="editor-section"><h2>발송 기록</h2>${badge(x.status)}<dl class="editor-meta"><dt>기록 시각</dt><dd>${esc(x.createdAt)}</dd><dt>템플릿</dt><dd>${esc(x.templateId)}</dd><dt>대상 수</dt><dd>${x.recipientIds?.length || 1}명</dd></dl><p class="editor-message">${esc(x.body || "메시지 본문 없음")}</p><p>발송 이력은 수정하지 않습니다. 템플릿 관리에서 이후 메시지를 변경하세요.</p></section>`;
  } else if (key === "notificationSend") {
    let draft;
    try {
      draft = r.readNotificationDraft();
    } catch {}
    if (!draft)
      return '<div class="empty">발송 대상부터 선택해주세요. <a href="/admin/notifications.php">알림 관리</a></div>';
    submit = "발송 대기 등록";
    body = `<section class="editor-section"><h2>${draft.recipients.length}명에게 보낼 메시지</h2><p class="editor-message">${esc(previewMessage(draft.fields.template, draft.fields))}</p></section>`;
  } else
    body = schema.groups
      .map(
        (g, i) =>
          `<section class="editor-section" id="editor-group-${i}"><div class="editor-section-heading"><span>${String(i + 1).padStart(2, "0")}</span><div><h2>${g.title}</h2><p>${g.description}</p></div></div><div class="form-grid">${g.fields.map((field) => renderField(field, x || {})).join("")}</div></section>`,
      )
      .join("");
  return `<div class="editor-breadcrumb"><a href="${esc(back)}">${icon("arrow-left-line")}목록으로</a><span>${esc(titleText)}</span></div><div class="editor-title"><h1>${esc(titleText)}</h1><p>${x ? esc(x.title || x.name || x.id) : "새로운 콘텐츠를 작성합니다."}</p></div><form id="admin-editor-form" class="admin-editor-layout"><div>${body}${key === "posts" && !mode ? '<section class="editor-section"><h2>다운로드 첨부파일</h2><label class="field">문서 파일<input type="file" data-attachments multiple accept=".pdf,.hwp,.hwpx,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"></label><p>파일당 최대 20MB</p><ul data-attachment-list></ul><div data-attachment-error role="alert"></div></section>' : ""}<div id="editor-error" class="error-text" role="alert" tabindex="-1"></div><div id="editor-success" role="status"></div><div class="editor-savebar"><a class="button secondary" href="${esc(back)}">목록으로</a>${readOnly ? "" : `${schema && !mode ? '<button class="button secondary" type="button" data-save-draft>임시저장</button>' : ""}<button class="button" type="submit">${submit}</button>`}</div></div><aside class="editor-aside"><div class="editor-section"><h3>${key === "heroSlides" ? "배너 미리보기" : key === "notificationTemplates" ? "메시지 미리보기" : "편집 안내"}</h3>${schema && !mode ? `<nav aria-label="편집 항목">${schema.groups.map((g, i) => `<a href="#editor-group-${i}">${g.title}</a>`).join("")}</nav>` : ""}<div class="editor-preview">${schema?.groups.some((g) => g.fields.some((f) => f.name === "image")) ? `<img data-editor-image src="${esc(x?.image || r.content("mediaAssets")[0].image)}" alt="선택 이미지 미리보기">` : ""}<strong data-editor-preview-title>${esc(x?.title || x?.name || "")}</strong><p data-editor-preview-body>${esc(key === "notificationTemplates" ? x?.body || "" : x?.summary || "")}</p></div><p>변경 내용은 저장 후 반영됩니다.</p></div></aside></form>`;
}
export async function bindAdminEditor() {
  const form = document.getElementById("admin-editor-form");
  if (!form) return;
  const q = new URLSearchParams(location.search),
    key = q.get("key"),
    id = q.get("id"),
    mode = q.get("mode"),
    ids = q.get("selection")
      ? r.readAdminSelection(q.get("selection"))
      : q.get("ids")?.split(",").filter(Boolean) || [];
  let dirty = false,
    rich = null,
    saving = false;
  const draftKey = `${key}:${id || "new"}`,
    original = sourceRows(key).find((row) => row.id === id) || {};
  const before = (e) => {
    if (dirty) {
      e.preventDefault();
      e.returnValue = "";
    }
  };
  window.addEventListener("beforeunload", before);
  const err = document.getElementById("editor-error");
  form.noValidate = true;
  function validateFields() {
    form
      .querySelectorAll(".admin-field-error")
      .forEach((node) => node.remove());
    let first = null;
    for (const control of form.querySelectorAll(
      "input:not([type=hidden]),select,textarea",
    )) {
      control.removeAttribute("aria-invalid");
      if (!control.checkValidity()) {
        first ||= control;
        control.setAttribute("aria-invalid", "true");
        const error = document.createElement("small");
        error.className = "admin-field-error";
        error.id = "error-" + (control.id || control.name);
        error.textContent = control.validationMessage;
        control.setAttribute("aria-describedby", error.id);
        control.closest(".field")?.append(error);
      }
    }
    if (first) {
      first.focus();
      return false;
    }
    return true;
  }
  for (const control of form.querySelectorAll(
    "input[maxlength],textarea[maxlength]",
  )) {
    const count = document.createElement("small");
    count.className = "admin-character-count";
    control.closest(".field")?.append(count);
    const update = () =>
      (count.textContent = control.value.length + " / " + control.maxLength);
    control.addEventListener("input", update);
    update();
  }
  let attachments = structuredClone(original.attachments || []),
    uploadingAttachments = false;
  const list = form.querySelector("[data-attachment-list]");
  const paintAttachments = () => {
    if (!list) return;
    list.innerHTML = attachments
      .map(
        (file, i) =>
          `<li><span>${esc(file.name)} · ${Math.ceil(file.size / 1024)}KB</span><button type="button" data-remove-attachment="${i}">삭제</button></li>`,
      )
      .join("");
    list.querySelectorAll("button").forEach(
      (button) =>
        (button.onclick = () => {
          attachments.splice(Number(button.dataset.removeAttachment), 1);
          paintAttachments();
          changed();
        }),
    );
  };
  paintAttachments();
  form
    .querySelector("[data-attachments]")
    ?.addEventListener("change", async (event) => {
      const error = form.querySelector("[data-attachment-error]");
      error.textContent = "저장 중";
      uploadingAttachments = true;
      try {
        for (const file of event.target.files) {
          const item = await r.uploadAdminAttachment(file);
          attachments.push({ id: item.id, name: item.name, size: file.size });
        }
        paintAttachments();
        changed();
        error.textContent = "파일 저장 완료";
      } catch (e) {
        error.textContent = e.message;
      } finally {
        uploadingAttachments = false;
        event.target.value = "";
      }
    });
  let draftTimer;
  const makeDraft = () => ({
    fields: [...new FormData(form)],
    rich: rich?.serialize().bodyJson,
    attachments,
  });
  const persistDraft = () => {
    try {
      r.saveDraft(draftKey, makeDraft());
      document.getElementById("editor-success").textContent =
        "임시저장 " + new Date().toLocaleTimeString("ko-KR");
    } catch (error) {
      err.textContent = "임시저장 실패: " + error.message;
    }
  };
  const changed = () => {
    dirty = true;
    clearTimeout(draftTimer);
    draftTimer = setTimeout(persistDraft, 800);
  };
  form.addEventListener("input", changed);
  form
    .querySelector("[data-save-draft]")
    ?.addEventListener("click", persistDraft);
  if (form.querySelector("#rich-body")) {
    try {
      const module = await import("./generated/rich-editor.js");
      rich = await module.createRichEditor(
        form.querySelector("#rich-body"),
        original,
        { onChange: changed, media: r.content("mediaAssets") },
      );
    } catch (error) {
      err.textContent = "편집기를 불러오지 못했습니다. " + error.message;
      form.querySelector("[type=submit]").disabled = true;
      return;
    }
  }
  const draft = r.readDraft(draftKey);
  if (draft?.version === 1) {
    const notice = document.createElement("div");
    notice.className = "admin-draft-notice";
    notice.innerHTML = `<span>${esc(draft.updatedAt)} 임시저장 내용이 있습니다.</span><button type="button" data-recover>복구</button><button type="button" data-discard>폐기</button>`;
    form.prepend(notice);
    notice.querySelector("[data-recover]").onclick = () => {
      form
        .querySelectorAll("input[type=checkbox]")
        .forEach((control) => (control.checked = false));
      for (const [name, value] of draft.value.fields) {
        const controls = [...form.querySelectorAll("[name]")].filter(
          (control) => control.name === name,
        );
        controls.forEach((control) => {
          if (control.type === "checkbox")
            control.checked = draft.value.fields.some(
              ([k, v]) => k === name && v === control.value,
            );
          else if (control.type !== "file") control.value = value;
        });
      }
      if (draft.value.attachments) {
        attachments = draft.value.attachments;
        paintAttachments();
      }
      if (draft.value.rich) rich?.setContent(draft.value.rich);
      dirty = true;
      notice.remove();
    };
    notice.querySelector("[data-discard]").onclick = () => {
      r.removeDraft(draftKey);
      notice.remove();
    };
  }
  const keydown = (event) => {
    if (
      !event.isComposing &&
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "s"
    ) {
      event.preventDefault();
      form.requestSubmit();
    }
  };
  document.addEventListener("keydown", keydown);
  const leave = (event) => {
    const link = event.target.closest("a[href]");
    if (
      !dirty ||
      !link ||
      link.target === "_blank" ||
      link.getAttribute("href").startsWith("#")
    )
      return;
    event.preventDefault();
    const dialog = document.createElement("dialog");
    dialog.className = "admin-confirm";
    dialog.innerHTML =
      "<h2>저장하지 않은 변경사항</h2><p>현재 입력을 임시저장하고 이동하거나 편집을 계속할 수 있습니다.</p><button data-stay>계속 편집</button><button data-leave>임시저장 후 이동</button>";
    document.body.append(dialog);
    dialog.querySelector("[data-stay]").onclick = () => dialog.close();
    dialog.querySelector("[data-leave]").onclick = () => {
      try {
        r.saveDraft(draftKey, makeDraft());
        dirty = false;
        location.href = link.href;
      } catch (error) {
        err.textContent = error.message;
        dialog.close();
      }
    };
    dialog.addEventListener(
      "close",
      () => {
        dialog.remove();
        link.focus();
      },
      { once: true },
    );
    dialog.showModal();
  };
  document.addEventListener("click", leave);
  window.addEventListener(
    "pagehide",
    () => {
      clearTimeout(draftTimer);
      rich?.destroy();
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("click", leave);
      window.removeEventListener("beforeunload", before);
    },
    { once: true },
  );
  form.addEventListener("input", () => {
    dirty = true;
    const title = form.elements.title || form.elements.name,
      body =
        key === "notificationTemplates"
          ? form.elements.body
          : form.elements.summary;
    if (title)
      form.querySelector("[data-editor-preview-title]").textContent =
        title.value;
    if (body)
      form.querySelector("[data-editor-preview-body]").textContent = body.value;
    const image = form.querySelector("[data-editor-image]");
    if (image && form.elements.image) image.src = form.elements.image.value;
  });
  form.onsubmit = (e) => {
    e.preventDefault();
    if (saving) return;
    if (!validateFields()) return;
    saving = true;
    const submitButton = form.querySelector("[type=submit]");
    submitButton.disabled = true;
    const err = document.getElementById("editor-error");
    err.textContent = "";
    try {
      if (uploadingAttachments)
        throw Error("첨부파일 저장이 끝난 후 다시 저장해주세요.");
      const f = new FormData(form);
      let saved;
      if (mode === "delete" || mode === "restore") {
        r.adminTrashRecord(key, id, mode === "restore");
        dirty = false;
        location.href =
          listUrl(key) +
          (listUrl(key).includes("?") ? "&" : "?") +
          "archived=" +
          (mode === "delete" ? "1" : "");
        return;
      }
      if (key === "notificationSend") {
        const draft = r.readNotificationDraft();
        simulateSend(draft.fields.template, draft.recipients, draft.fields);
        r.clearNotificationDraft();
        dirty = false;
        location.href = "/admin/notifications.php";
        return;
      }
      if (key === "progress")
        r.adminSaveProgress(id, f.get("status"), f.get("reason"));
      else if (key === "requests")
        r.adminBulkStatus(
          ids.length ? ids : [id],
          f.get("status"),
          f.get("reason") || "",
        );
      else if (mode === "status" || ids.length) {
        if (
          key === "organizations" &&
          f.get("status") === "반려" &&
          !f.get("reason")?.trim()
        )
          throw Error("반려 사유를 입력해주세요.");
        r.adminBulkRecords(
          key,
          ids.length ? ids : [id],
          key === "clubs" ? "recruiting" : "status",
          key === "clubs" ? f.get("status") === "true" : f.get("status"),
          f.get("reason") || "",
        );
      } else {
        if (rich)
          f.set(
            "body",
            rich.editor.getText().trim() ||
              original.bodyText ||
              (Array.isArray(original.body)
                ? original.body.join("\n\n")
                : original.body) ||
              "본문",
          );
        const patch = parseContentForm(key, f);
        if (key === "posts") patch.attachments = attachments;
        if (rich) {
          if (id && (!dirty || !rich.dirty)) {
            delete patch.body;
          } else Object.assign(patch, rich.serialize(true));
        }
        saved = r.saveRecord(key, id, patch);
      }
      dirty = false;
      clearTimeout(draftTimer);
      r.removeDraft(draftKey);
      if (saved && !id) {
        location.href = editorUrl(key, saved.id);
        return;
      }
      document.getElementById("editor-success").innerHTML =
        `<div class="notice">변경사항을 저장했습니다. ${esc(new Date().toLocaleTimeString("ko-KR"))} <a href="${esc(returnUrl(q))}">목록 확인</a></div>`;
      document
        .getElementById("editor-success")
        .scrollIntoView({ block: "nearest" });
    } catch (error) {
      err.textContent = error.message;
      err.focus();
    } finally {
      saving = false;
      submitButton.disabled = false;
    }
  };
}
