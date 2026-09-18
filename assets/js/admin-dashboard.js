import * as r from "./services/repository.js";
import { esc, icon } from "./renderers.js";
import { editorUrl } from "./admin-content.js";
export function dashboard() {
  const s = r.state(),
    now = Date.now();
  const pending =
    s.registrations.filter((x) => x.status === "승인대기").length +
    r.collection("organizations").filter((x) => x.status === "승인대기").length;
  const received = s.applications.filter(
    (x) => x.status === "접수" && x.kind === "event",
  ).length;
  const closing = r.collection("events").filter((x) => {
    const t = Date.parse(x.registrationEndsAt);
    return t >= now && t <= now + 7 * 86400000;
  });
  const volunteer = s.applications.filter(
    (x) => x.kind === "volunteer" && x.status === "접수",
  ).length;
  const changes = Object.entries(s.edits)
    .flatMap(([key, value]) =>
      key.startsWith("new:")
        ? value.map((record) => ({ key: key.slice(4), ...record }))
        : value.updatedAt
          ? [
              {
                key: key.split(":")[0],
                ...r
                  .collection(key.split(":")[0], { includeDeleted: true })
                  .find((x) => x.id === key.split(":")[1]),
              },
            ]
          : [],
    )
    .sort((a, b) =>
      String(b.updatedAt || b.createdAt).localeCompare(
        String(a.updatedAt || a.createdAt),
      ),
    )
    .slice(0, 8);
  return `<section class="admin-work-summary" aria-label="처리할 업무">${[
    [
      "기업 승인 대기",
      pending,
      "organizations.php?listStatus=승인대기",
      "building-line",
    ],
    [
      "미처리 참가 신청",
      received,
      "applications.php?listStatus=접수",
      "file-list-3-line",
    ],
    [
      "7일 내 접수 마감",
      closing.length,
      "events.php?dateField=registrationEndsAt&from=" +
        new Date(now).toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" }) +
        "&to=" +
        new Date(now + 7 * 86400000).toLocaleDateString("sv-SE", {
          timeZone: "Asia/Seoul",
        }),
      "calendar-check-line",
    ],
    [
      "자원봉사 선발 대기",
      volunteer,
      "volunteers.php?listStatus=접수",
      "hand-heart-line",
    ],
  ]
    .map(
      ([label, count, url, i]) =>
        `<a href="/admin/${esc(url)}">${icon(i)}<span>${label}</span><strong>${count}</strong></a>`,
    )
    .join(
      "",
    )}</section><section class="admin-dashboard-section"><h2>최근 수정 항목</h2>${changes.length ? `<ul>${changes.map((x) => `<li><a href="${esc(editorUrl(x.key, x.id))}">${esc(x.title || x.name || x.id)}</a><time>${esc(new Date(x.updatedAt || x.createdAt).toLocaleString("ko-KR"))}</time></li>`).join("")}</ul>` : '<p class="muted">아직 수정한 항목이 없습니다.</p>'}</section>`;
}
