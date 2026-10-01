"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { listTrees } from "@/lib/live.mjs";
import { sectionOf, titleOf } from "@/lib/whitelist.mjs";
import built from "../../scripts/docs-manifest.json";

type Trees = { ok: boolean; paths: string[]; at: string };
let shared: Promise<Trees> | null = null;
const trees = () =>
  (shared ??= listTrees().then((r) => ({ ...r, at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })));
const useTrees = () => {
  const [t, setT] = useState<Trees | null>(null);
  useEffect(() => { trees().then(setT); }, []);
  return t;
};
const builtSet = new Set<string>(built);

/** Tells the reader whether the list was checked against GitHub just now. */
export function IndexStatus() {
  const t = useTrees();
  return (
    <p className="small muted" role="status" aria-live="polite">
      {!t && "Checking GitHub for documents added since this site was built."}
      {t?.ok && `Checked GitHub at ${t.at}: this list includes every public document there now.`}
      {t && !t.ok && "Could not reach GitHub to look for newer documents, so this list is the one from the last build."}
    </p>
  );
}

/** New files in one section, found live. Community policies have a friendly empty state. */
export function LiveExtras({ section }: { section: string }) {
  const t = useTrees();
  const fresh = (t?.paths ?? []).filter((p) => sectionOf(p) === section && !builtSet.has(p));
  const isPolicy = section === "policy";
  if (!fresh.length) {
    return isPolicy ? <p className="muted">Community policies are being drafted. This section fills in live as they are published.</p> : null;
  }
  return (
    <ul className="doc-list doc-list-new" aria-label="Added since this site was built">
      {fresh.map((p) => (
        <li key={p}>
          <Link href={`/docs/view/?path=${encodeURIComponent(p)}`}>{titleOf(p)}</Link>
          <span className="tag tag-new">New</span>
        </li>
      ))}
    </ul>
  );
}
