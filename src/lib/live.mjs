// Live fetching from GitHub (browser). Never returns stale text: on any failure the caller
// gets { ok: false } and shows the unreachable message. Pure of React so tests can mock fetch.
import { POLICY_REPO, MAIN_REPO, rawUrl, treeUrl } from "../config/docs-origin.mjs";
import { isPublicPath } from "./whitelist.mjs";

const TIMEOUT_MS = 10000;

async function get(url, fetchImpl, timeoutMs) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    return await fetchImpl(url, { signal: ctl.signal, credentials: "omit", referrerPolicy: "no-referrer" });
  } finally {
    clearTimeout(t);
  }
}

/** @returns {Promise<{ok:true,text:string}|{ok:false,kind:"rejected"|"notfound"|"unreachable"}>} */
export async function fetchDoc(path, fetchImpl = fetch, timeoutMs = TIMEOUT_MS) {
  if (!isPublicPath(path)) return { ok: false, kind: "rejected" };
  try {
    const r = await get(rawUrl(path), fetchImpl, timeoutMs);
    if (r.status === 404) return { ok: false, kind: "notfound" };
    if (!r.ok) return { ok: false, kind: "unreachable" };
    return { ok: true, text: await r.text() };
  } catch {
    return { ok: false, kind: "unreachable" };
  }
}

async function oneTree(repo, prefix, fetchImpl, timeoutMs) {
  try {
    const r = await get(treeUrl(repo), fetchImpl, timeoutMs);
    // A repo that is empty or has no main yet answers 404 or 409: that is "nothing yet", not an error.
    if (repo === POLICY_REPO && (r.status === 404 || r.status === 409)) return { ok: true, paths: [] };
    if (!r.ok) return { ok: false, paths: [] };
    const j = await r.json();
    const paths = (j.tree ?? []).filter((e) => e.type === "blob").map((e) => prefix + e.path).filter(isPublicPath);
    return { ok: true, paths };
  } catch {
    return { ok: false, paths: [] };
  }
}

/** Whitelisted file paths currently on GitHub main in both repositories. ok=false if the main listing failed. */
export async function listTrees(fetchImpl = fetch, timeoutMs = TIMEOUT_MS) {
  const [main, policy] = await Promise.all([
    oneTree(MAIN_REPO, "", fetchImpl, timeoutMs),
    oneTree(POLICY_REPO, "can_policy/", fetchImpl, timeoutMs),
  ]);
  return { ok: main.ok && policy.ok, paths: [...main.paths, ...policy.paths] };
}
