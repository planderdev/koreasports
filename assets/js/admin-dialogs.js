import * as r from "./services/repository.js";
import { esc, badge } from "./renderers.js";
import { editorUrl } from "./admin-content.js";
export function showDrawer(key, record, trigger) {
  const drawer = document.createElement("dialog");
  drawer.className = "admin-drawer";
  const names = {
    id: "ID",
    title: "제목",
    name: "이름",
    status: "상태",
    category: "분류",
    region: "지역",
    createdAt: "등록일",
    updatedAt: "수정일",
    venue: "장소",
    startsAt: "시작일",
    endsAt: "종료일",
    organizationNameSnapshot: "소속",
    reviewNote: "검토 사유",
    reason: "처리 사유",
    capacity: "정원",
    cohort: "기수",
    role: "역할",
    summary: "소개",
  };
  drawer.innerHTML = `<header><h2>${esc(record.title || record.name || "상세 정보")}</h2><button type="button" aria-label="상세 닫기"><i class="ri-close-line" aria-hidden="true"></i></button></header><dl>${Object.entries(
    names,
  )
    .filter(([k]) => record[k] != null)
    .map(
      ([k, label]) =>
        `<dt>${label}</dt><dd>${k === "status" ? badge({ published: "게시", draft: "초안" }[record[k]] || record[k]) : esc(record[k])}</dd>`,
    )
    .join("")}</dl>${
    record.memberId || key === "members"
      ? `<section><h3>관련 신청</h3><ul>${
          r
            .state()
            .applications.filter(
              (x) => x.memberId === (record.memberId || record.id),
            )
            .map((x) => `<li>${esc(x.title)} · ${esc(x.status)}</li>`)
            .join("") || "<li>신청 내역 없음</li>"
        }</ul></section>`
      : ""
  }${record.history?.length ? `<section><h3>처리 이력</h3><ul>${record.history.map((x) => `<li>${esc(x.at)} · ${esc(x.from)} → ${esc(x.to)} ${esc(x.reason)}</li>`).join("")}</ul></section>` : ""}<footer>${key !== "progress" && key !== "notificationTemplates" ? '<button type="button" class="button secondary" data-drawer-action>상태 변경</button>' : ""}<a class="button" href="${esc(editorUrl(key, record.id))}">수정 페이지</a></footer>`;
  document.body.append(drawer);
  drawer.querySelector("button").onclick = () => drawer.close();
  drawer.addEventListener(
    "close",
    () => {
      drawer.remove();
      trigger.focus();
    },
    { once: true },
  );
  drawer
    .querySelector("[data-drawer-action]")
    ?.addEventListener("click", (event) =>
      bulkDialog(key, [record], event.currentTarget, () => location.reload()),
    );
  drawer.showModal();
}
export function bulkDialog(key, records, trigger, onSuccess) {
  const dialog = document.createElement("dialog");
  dialog.className = "admin-confirm";
  const statusMap = {
    members: ["활동", "휴면"],
    organizations: ["승인대기", "승인", "반려"],
    clubs: ["true", "false"],
  };
  const statuses =
    key === "requests"
      ? r
          .allowedAdminStatuses(records[0])
          .filter((status) =>
            records.every((record) =>
              r.allowedAdminStatuses(record).includes(status),
            ),
          )
      : statusMap[key] || ["published", "draft"];
  const deleted = records.every((record) => record.deletedAt);
  const label = (value) =>
    ({ published: "게시", draft: "초안", true: "모집중", false: "모집마감" })[
      value
    ] || value;
  dialog.innerHTML = `<h2>${records.length}건 일괄 처리</h2><p>선택한 항목의 변경 내용을 확인해주세요.</p><details><summary>대상 목록 ${records.length}건</summary><ul>${records.map((record) => `<li>${esc(record.title || record.name || record.id)}</li>`).join("")}</ul></details><form><label>작업<select name="action">${!deleted ? statuses.map((status) => `<option value="${esc(status)}">${esc(label(status))}</option>`).join("") : ""}${key !== "requests" ? `<option value="${deleted ? "restore" : "trash"}">${deleted ? "휴지통에서 복구" : "휴지통으로 이동"}</option>` : ""}</select></label><label>처리 사유<textarea name="reason" rows="3" placeholder="반려·미선발·불합격 시 필수"></textarea></label><div role="alert" data-errors></div><div role="status" data-result></div><button type="button" data-cancel>취소</button><button type="submit">변경 적용</button></form>`;
  document.body.append(dialog);
  dialog.querySelector("[data-cancel]").onclick = () => dialog.close();
  dialog.addEventListener(
    "close",
    () => {
      dialog.remove();
      trigger.focus();
    },
    { once: true },
  );
  dialog.querySelector("form").onsubmit = (e) => {
    e.preventDefault();
    const form = e.target,
      action = form.elements.action.value,
      reason = form.elements.reason.value;
    if (["반려", "미선발", "불합격"].includes(action) && !reason.trim()) {
      dialog.querySelector("[data-errors]").textContent =
        "처리 사유를 입력해주세요.";
      form.elements.reason.focus();
      return;
    }
    form.querySelector("[type=submit]").disabled = true;
    const results = r.processAdminBatch(
      key,
      records.map((x) => x.id),
      action,
      reason,
    );
    dialog.querySelector("[data-result]").textContent =
      `성공 ${results.success.length}건 · 실패 ${results.failed.length}건`;
    dialog.querySelector("[data-errors]").textContent = results.failed
      .map((x) => `${x.id}: ${x.message}`)
      .join("\n");
    if (!results.failed.length) {
      dialog.querySelector("[data-cancel]").textContent = "목록 갱신";
      dialog.querySelector("[data-cancel]").onclick = () => {
        dialog.close();
        onSuccess();
      };
    } else {
      form.querySelector("[type=submit]").disabled = false;
      form.querySelector("[type=submit]").textContent = "실패 항목 다시 시도";
      records = records.filter((x) =>
        results.failed.some((f) => f.id === x.id),
      );
    }
  };
  dialog.showModal();
}
