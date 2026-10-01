// node --test scripts/whitelist.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { isPublicPath, slugOf } from "../src/lib/whitelist.mjs";
import { fetchDoc, listTrees } from "../src/lib/live.mjs";
import { rawUrl } from "../src/config/docs-origin.mjs";

test("whitelist accepts public docs", () => {
  for (const p of ["manifesto.md", "DECISIONS.md", "docs/spec/00-index.md", "docs/spec/constitution/ch01-purpose-scope.md",
    "docs/design/ai/README.md", "docs/adr/0001-submodule-layout.md", "docs/open-questions/OQ-domain.md",
    "can_policy/README.md", "can_policy/schemas/policy.schema.json"]) assert.ok(isPublicPath(p), p);
});

test("whitelist rejects plans, .claude, traversal, absolute, urls, non-md, tools", () => {
  for (const p of ["plans/01.md", "docs/plans/x.md", ".claude/settings.json", ".claude/skills/a.md", "docs/../plans/x.md",
    "../manifesto.md", "docs/spec/../../.env", "/etc/passwd", "/manifesto.md", "https://evil.test/a.md",
    "//evil.test/a.md", "docs/spec/split-map.tsv", "docs/spec/constitution/map.tsv", "docs/spec/tools/check-spec.mjs",
    "docs/design/check.py", ".env", "docs/spec/.env.md", "README.md", "CONTRIBUTING.md", "can_server/src/a.md",
    "docs/spec/a.md?x=1", "docs/spec/%2e%2e/a.md", "docs/spec\\a.md", "docs/spec/a.md#h", "", null, 5,
    "can_policy/.github/workflows/a.yml", "can_policy/package.json", "docs/spec/tools/README.md"]) {
    assert.equal(isPublicPath(p), false, String(p));
  }
});

test("slugs", () => {
  assert.equal(slugOf("DECISIONS.md"), "decisions");
  assert.equal(slugOf("docs/design/README.md"), "design");
  assert.equal(slugOf("docs/open-questions/OQ-domain.md"), "open-questions/OQ-domain");
});

test("fetchDoc never touches the network for rejected paths", async () => {
  let called = 0;
  const f = async () => { called++; throw new Error("no"); };
  for (const p of ["plans/x.md", "https://evil.test/a.md", "../x.md"]) assert.deepEqual(await fetchDoc(p, f), { ok: false, kind: "rejected" });
  assert.equal(called, 0);
});

test("fetch failure yields unreachable and never document text", async () => {
  const bad = [
    async () => { throw new TypeError("network"); },
    async () => new Response("SECRET STALE BODY", { status: 500 }),
    async () => new Response("rate limited body", { status: 429 }),
    (_u, { signal }) => new Promise((_r, rej) => signal.addEventListener("abort", () => rej(new Error("abort")))),
  ];
  for (const f of bad) {
    const r = await fetchDoc("manifesto.md", f, 30);
    assert.equal(r.ok, false);
    assert.equal(r.kind, "unreachable");
    assert.ok(!("text" in r));
  }
  assert.equal((await fetchDoc("manifesto.md", async () => new Response("x", { status: 404 }))).kind, "notfound");
});

test("fetchDoc success only reads the pinned origin", async () => {
  let url = "";
  const r = await fetchDoc("docs/spec/00-index.md", async (u) => { url = u; return new Response("# hi"); });
  assert.equal(r.ok, true);
  assert.equal(url, rawUrl("docs/spec/00-index.md"));
  assert.match(url, /^https:\/\/raw\.githubusercontent\.com\/community-action-network-oss\/community_action_network_oss\/main\//);
});

test("tree listing filters to the whitelist and treats an empty policy repo as ok", async () => {
  const f = async (u) => {
    if (u.includes("/can_policy/")) return new Response("{}", { status: 409 });
    return Response.json({ tree: [
      { path: "manifesto.md", type: "blob" }, { path: "plans/a.md", type: "blob" }, { path: ".claude/x.md", type: "blob" },
      { path: "docs/spec/new.md", type: "blob" }, { path: "docs/spec", type: "tree" }, { path: "can_app/a.md", type: "blob" },
    ] });
  };
  const r = await listTrees(f);
  assert.equal(r.ok, true);
  assert.deepEqual(r.paths.sort(), ["docs/spec/new.md", "manifesto.md"]);
  assert.equal((await listTrees(async () => new Response("", { status: 403 }))).ok, false);
});
