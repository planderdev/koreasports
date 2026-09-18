import test from "node:test";
import assert from "node:assert/strict";
import {
  queryRecords,
  RecordSelection,
  kstDay,
} from "../assets/js/admin-query.js";
import * as repository from "../assets/js/services/repository.js";
test("filter sort pagination operates on data and uses KST day boundaries", () => {
  const data = Array.from({ length: 55 }, (_, i) => ({
    id: String(i),
    title: "제목 " + i,
    capacity: i,
    status: i % 2 ? "draft" : "published",
    createdAt: "2026-09-17T15:01:00Z",
    region: i < 30 ? "서울" : "부산",
  }));
  const results = queryRecords(data, {
    status: "published",
    sort: "capacity",
    direction: "desc",
    size: 20,
    page: 2,
  });
  assert.equal(results.total, 28);
  assert.equal(results.visible.length, 8);
  assert.equal(results.visible[0].capacity, 14);
  assert.equal(kstDay(data[0].createdAt), "2026-09-18");
  assert.equal(
    queryRecords(data, { from: "2026-09-18", to: "2026-09-18", region: "서울" })
      .total,
    30,
  );
  assert.equal(queryRecords(data, { to: "2026-09-17" }).total, 0);
});
test("selection separates current page and all results and survives page changes", () => {
  const data = Array.from({ length: 55 }, (_, i) => ({ id: String(i) })),
    s = new RecordSelection();
  s.select(queryRecords(data).visible);
  assert.equal(s.ids.size, 20);
  assert.equal(s.state(queryRecords(data).visible).checked, true);
  assert.equal(s.state(queryRecords(data, { page: 2 }).visible).checked, false);
  s.toggle("0", false);
  assert.equal(s.state(queryRecords(data).visible).indeterminate, true);
  s.select(data);
  assert.equal(s.ids.size, 55);
  s.clear();
  assert.equal(s.ids.size, 0);
});
test("batch returns real partial failures without losing successful changes", () => {
  repository.resetDemo();
  repository.setRole("admin");
  const row = repository.collection("posts")[0];
  const result = repository.processAdminBatch(
    "posts",
    [row.id, "missing"],
    "draft",
  );
  assert.deepEqual(result.success, [row.id]);
  assert.equal(result.failed.length, 1);
  assert.equal(repository.collection("posts")[0].status, "draft");
});
test("new post cannot inherit original body or metadata from first source record", () => {
  repository.resetDemo();
  repository.setRole("admin");
  const row = repository.saveRecord("posts", "", {
    title: "독립 게시물",
    body: ["본문"],
  });
  assert.equal(row.bodyHtml, undefined);
  assert.equal(row.originalBody, undefined);
  assert.equal(row.sourceUrl, undefined);
  assert.ok(row.createdAt);
});
test("storage failure is reported and leaves stored data unchanged", () => {
  repository.resetDemo();
  repository.setRole("admin");
  const row = repository.collection("posts")[0],
    before = structuredClone(row);
  globalThis.sessionStorage = {
    getItem: () => null,
    setItem: () => {
      throw Error("quota");
    },
  };
  assert.throws(
    () => repository.saveRecord("posts", row.id, { title: "실패" }),
    /저장 공간/,
  );
  delete globalThis.sessionStorage;
  assert.deepEqual(repository.collection("posts")[0], before);
});
