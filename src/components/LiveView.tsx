"use client";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { isPublicPath, sectionOf, titleOf } from "@/lib/whitelist.mjs";
import { LiveDoc } from "./LiveDoc";

/** /docs/view/?path=<repo path>: renders a whitelisted document that was added after the build. */
export function LiveView() {
  const search = useSyncExternalStore(() => () => {}, () => window.location.search, () => null);
  if (search === null) return <div className="wrap doc"><h1 className="doc-title">Document</h1></div>;
  const path = new URLSearchParams(search).get("path");
  if (!path || !isPublicPath(path)) {
    return (
      <div className="wrap doc">
        <h1 className="doc-title">Not a public document</h1>
        <p className="prose">This page only shows CAN&apos;s public documents. Go back to <Link href="/docs/">Read everything</Link> to choose one.</p>
      </div>
    );
  }
  return <LiveDoc key={path} path={path} fallbackTitle={titleOf(path)} section={sectionOf(path)} />;
}
