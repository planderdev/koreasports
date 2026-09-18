import * as r from "./services/repository.js";
import { esc, badge, date } from "./renderers.js";
import { editLink, rowActions } from "./admin-content.js";
export function renderContentTable(key, rows, table) {
  const status = (x) =>
    badge(
      x.deletedAt
        ? "삭제됨"
        : key === "clubs"
          ? x.recruiting
            ? "모집중"
            : "모집마감"
          : x.status === "published"
            ? "게시"
            : x.status === "draft"
              ? "초안"
              : x.status || "등록",
    );
  const specs = {
    members: {
      heads: ["회원명", "소속 직장", "회원번호", "활동 상태"],
      cells: (x) => [
        editLink(key, x),
        esc(x.organizationNameSnapshot || "미등록"),
        esc(x.number || "—"),
        status(x),
      ],
    },
    organizations: {
      heads: ["기업명", "활동 지역", "승인 상태"],
      cells: (x) => [editLink(key, x), esc(x.region || "—"), status(x)],
    },
    clubs: {
      heads: ["동호회명", "종목 / 지역", "정기 모임", "회원 수", "모집 상태"],
      cells: (x) => [
        editLink(key, x),
        esc(`${x.sport} · ${x.region}`),
        esc(x.meeting || "—"),
        `${x.memberCount || 0}명`,
        status(x),
      ],
    },
    events: {
      heads: ["대회명", "개최일 / 장소", "접수 기간", "정원", "게시 상태"],
      cells: (x) => [
        editLink(key, x),
        `${date(x.startsAt)}<br><small>${esc(x.venue || "")}</small>`,
        `${date(x.registrationStartsAt)}<br>~ ${date(x.registrationEndsAt)}`,
        `${x.participantCount || 0} / ${x.capacity || 0}명`,
        status(x),
      ],
    },
    courses: {
      heads: [
        "교육 과정명",
        "교육 유형",
        "교육 시간 / 방식",
        "학습 단계",
        "게시 상태",
      ],
      cells: (x) => [
        editLink(key, x),
        esc(x.category || "—"),
        `${esc(x.duration || "—")}<br><small>${esc(x.format || "")}</small>`,
        `${x.lessonIds?.length || 0}개`,
        status(x),
      ],
    },
    qualificationPrograms: {
      heads: ["자격검증명", "검증 분야", "연계 교육", "게시 상태"],
      cells: (x) => [
        editLink(key, x),
        esc(x.category || "—"),
        esc(
          r.collection("courses").find((c) => c.id === x.courseId)?.title ||
            "미연결",
        ),
        status(x),
      ],
    },
    posts: {
      heads: ["게시물 제목", "게시판", "등록일", "공지 설정", "게시 상태"],
      cells: (x) => [
        editLink(key, x),
        esc(x.category || "—"),
        date(x.createdAt),
        x.pinned ? "상단 고정" : "일반",
        status(x),
      ],
    },
    heroSlides: {
      heads: ["배너 제목", "노출 순서", "버튼 / 연결", "게시 상태"],
      cells: (x) => [
        `<div class="admin-banner-title"><img src="${esc(x.image)}" alt="">${editLink(key, x)}</div>`,
        esc(x.order ?? 0),
        `${esc(x.cta || "—")}<br><small>${esc(x.url || "")}</small>`,
        status(x),
      ],
    },
    sponsors: {
      heads: ["후원사명", "후원 구분", "소개", "게시 상태"],
      cells: (x) => [
        editLink(key, x),
        esc(x.category || "—"),
        esc(x.description || "—"),
        status(x),
      ],
    },
    donationReports: {
      heads: ["집행내역 제목", "공개 기간", "집행 금액", "게시 상태"],
      cells: (x) => [
        editLink(key, x),
        esc(x.period || "—"),
        x.amount == null
          ? "미제공"
          : Number(x.amount).toLocaleString("ko-KR") + "원",
        status(x),
      ],
    },
    volunteerPrograms: {
      heads: ["모집명", "기수", "연결 대회", "모집 역할", "상태"],
      cells: (x) => [
        editLink(key, x),
        esc(x.cohort),
        esc(
          r.collection("events").find((e) => e.id === x.eventId)?.title ||
            "미연결",
        ),
        esc(x.roles?.join(" · ") || "—"),
        status(x),
      ],
    },
    notificationTemplates: {
      heads: ["템플릿명", "메시지 내용"],
      cells: (x) => [editLink(key, x), esc(x.body)],
    },
  };
  const spec = specs[key];
  return table(
    [...spec.heads, "작업"],
    rows.map(
      (x) =>
        `<tr data-record-key="${key}" data-record-id="${esc(x.id)}"${x.deletedAt ? ' data-deleted="true"' : ""}>${spec
          .cells(x)
          .map((v) => `<td>${v}</td>`)
          .join(
            "",
          )}<td>${rowActions(key, x.id, x.title || x.name, { deleted: !!x.deletedAt })}</td></tr>`,
    ),
  );
}
