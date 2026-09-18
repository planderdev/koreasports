import * as r from "./services/repository.js";
import { esc, icon } from "./renderers.js";
export const adminGroups = [
  ["운영 현황", [["index", "대시보드", "dashboard-line"]]],
  [
    "회원·단체",
    [
      ["members", "개인회원", "user-line"],
      ["organizations", "기업 승인", "building-line"],
      ["clubs", "동호회", "team-line"],
    ],
  ],
  [
    "대회·참가",
    [
      ["events", "대회", "trophy-line"],
      ["applications", "참가 신청", "file-list-3-line"],
    ],
  ],
  [
    "교육·자격",
    [
      ["education", "교육", "book-open-line"],
      ["qualifications", "자격검증", "medal-line"],
      ["safety", "안전교육 이수", "shield-check-line"],
    ],
  ],
  [
    "자원봉사",
    [
      ["volunteers?type=programs", "모집 프로그램", "hand-heart-line"],
      ["volunteers", "지원자 선발", "user-follow-line"],
    ],
  ],
  [
    "콘텐츠",
    [
      ["content", "게시물", "article-line"],
      ["content?type=banners", "메인 배너", "image-line"],
    ],
  ],
  [
    "후원",
    [
      ["sponsors", "후원사", "heart-line"],
      ["sponsors?type=reports", "집행내역", "funds-line"],
    ],
  ],
  ["알림", [["notifications", "알림 관리", "message-2-line"]]],
];
const route = (id) =>
  "/admin/" + id.replace("?", ".php?") + (id.includes("?") ? "" : ".php");
export const adminMenus = adminGroups.flatMap(([group, items]) =>
  items.map(([id, title, icon]) => ({
    id,
    title,
    icon,
    group,
    url: route(id),
  })),
);
export function adminSidebar(active) {
  const collapsed = r.adminPreference("collapsed", false);
  const favorites = r.adminPreference("favorites", []),
    recent = r.adminPreference("recent", []);
  const link = (item) =>
    `<div class="admin-menu-item"><a href="${item.url}" ${item.id === active ? 'aria-current="page"' : ""} title="${item.title}">${icon(item.icon)}<span>${item.title}</span></a><button data-favorite="${item.id}" aria-label="${item.title} 즐겨찾기" aria-pressed="${favorites.includes(item.id)}">${icon(favorites.includes(item.id) ? "star-fill" : "star-line")}</button></div>`;
  return `<aside class="admin-sidebar ${collapsed ? "is-collapsed" : ""}"><button class="admin-collapse" aria-label="사이드바 접기" aria-expanded="${!collapsed}">${icon("side-bar-line")}<span>업무 메뉴</span></button><div class="admin-favorites"><h2>즐겨찾기</h2>${
    adminMenus
      .filter((item) => favorites.includes(item.id))
      .map(link)
      .join("") || "<small>별표로 메뉴를 추가하세요.</small>"
  }</div>${adminGroups.map(([group, items]) => `<details open><summary>${group}</summary><nav>${items.map(([id]) => link(adminMenus.find((item) => item.id === id))).join("")}</nav></details>`).join("")}<div class="admin-recent"><h2>최근 방문</h2>${recent
    .slice(0, 4)
    .map((id) => adminMenus.find((item) => item.id === id))
    .filter(Boolean)
    .map(link)
    .join("")}</div></aside>`;
}
export function bindAdminShell() {
  const side = document.querySelector(".admin-sidebar");
  if (!side) return;
  const shell = document.querySelector(".admin-shell");
  shell.classList.toggle(
    "sidebar-collapsed",
    r.adminPreference("collapsed", false),
  );
  side.querySelector(".admin-collapse").onclick = (event) => {
    const value = !shell.classList.contains("sidebar-collapsed");
    shell.classList.toggle("sidebar-collapsed", value);
    side.classList.toggle("is-collapsed", value);
    side
      .querySelector(".admin-collapse")
      .setAttribute("aria-expanded", String(!value));
    r.saveAdminPreference("collapsed", value);
  };
  side.querySelectorAll("[data-favorite]").forEach(
    (button) =>
      (button.onclick = () => {
        const id = button.dataset.favorite,
          items = r.adminPreference("favorites", []),
          value = items.includes(id)
            ? items.filter((x) => x !== id)
            : [...items, id];
        r.saveAdminPreference("favorites", value);
        side.querySelectorAll("[data-favorite]").forEach((control) => {
          const selected = value.includes(control.dataset.favorite);
          control.setAttribute("aria-pressed", String(selected));
          control.innerHTML = icon(selected ? "star-fill" : "star-line");
        });
        const favoriteList = side.querySelector(".admin-favorites");
        favoriteList.innerHTML =
          "<h2>즐겨찾기</h2>" +
          adminMenus
            .filter((item) => value.includes(item.id))
            .map(
              (item) =>
                `<div class="admin-menu-item"><a href="${item.url}">${icon(item.icon)}<span>${item.title}</span></a></div>`,
            )
            .join("");
      }),
  );
  const active =
    adminMenus.find(
      (item) => item.url === location.pathname + location.search,
    ) || adminMenus.find((item) => item.url === location.pathname);
  if (active)
    r.saveAdminPreference(
      "recent",
      [
        active.id,
        ...r.adminPreference("recent", []).filter((id) => id !== active.id),
      ].slice(0, 6),
    );
  const search = document.querySelector("#admin-menu-search"),
    results = document.querySelector("#admin-menu-results");
  search?.addEventListener("input", () => {
    const query = search.value.trim();
    results.hidden = !query;
    results.innerHTML =
      adminMenus
        .filter((item) => (item.group + item.title).includes(query))
        .map(
          (item) =>
            `<a href="${item.url}">${esc(item.group)} / ${esc(item.title)}</a>`,
        )
        .join("") || "<p>일치하는 메뉴가 없습니다.</p>";
  });
  search?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      results.hidden = true;
      search.value = "";
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      results.querySelector("a")?.focus();
    }
  });
}

// Escape closes transient menu panels while native dialogs retain their own focus handling.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document
      .querySelectorAll(".admin-account[open],.admin-column-options[open]")
      .forEach((panel) => {
        panel.open = false;
        panel.querySelector("summary").focus();
      });
  }
});
document.addEventListener("click", (event) => {
  document
    .querySelectorAll(".admin-account[open],.admin-column-options[open]")
    .forEach((panel) => {
      if (!panel.contains(event.target)) panel.open = false;
    });
});
