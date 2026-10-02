"use client";
import { localePath } from "@/lib/paths";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { docUrl } from "@/config/site";
import { sectionTitle } from "@/content/docs-sections";
import { PRIVACY_NOTE, PRIVACY_URL, THIRD_PARTY } from "@/config/docs-origin.mjs";
import { fetchDoc } from "@/lib/live.mjs";
import type { Toc } from "@/lib/render";

type State =
  | { s: "idle" }
  | { s: "loading" }
  | { s: "error"; kind: "notfound" | "unreachable" | "rejected" }
  | { s: "ok"; html: string; toc: Toc; title: string | null; at: string };

/** One document, always fetched live from GitHub main. Never shows a bundled or stale copy. */
export function LiveDoc({ path, fallbackTitle, section }: { path: string; fallbackTitle: string; section: string }) {
  const [state, setState] = useState<State>({ s: "idle" });
  const [attempt, setAttempt] = useState(0);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      setState({ s: "loading" });
      const r = await fetchDoc(path);
      if (!live) return;
      if (!r.ok) return setState({ s: "error", kind: r.kind });
      try {
        const { renderDoc } = await import("@/lib/render"); // lazy chunk, not in base JS
        const out = await renderDoc(r.text, path);
        if (live) setState({ s: "ok", ...out, at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
      } catch {
        if (live) setState({ s: "error", kind: "unreachable" });
      }
    })();
    return () => { live = false; };
  }, [path, attempt]);

  useEffect(() => {
    if (state.s === "ok" && body.current) import("@/lib/mermaid").then((m) => body.current && m.drawDiagrams(body.current));
  }, [state]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  const title = state.s === "ok" && state.title ? state.title : fallbackTitle;
  const toc = state.s === "ok" ? state.toc : [];
  const source = docUrl(path);

  return (
    <article className="wrap doc">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link href={localePath("/docs/")}>Read everything</Link>
        <span aria-hidden="true"> / </span>
        <Link href={localePath(`/docs/#${section}`)}>{sectionTitle(section)}</Link>
      </nav>
      <h1 className="doc-title">{title}</h1>
      <p className="doc-meta">
        <a href={source}>View source on GitHub</a>
        <span className="doc-status" role="status" aria-live="polite">
          {state.s === "loading" && "Loading the latest copy from GitHub"}
          {state.s === "ok" && `Live from GitHub, checked ${state.at}`}
        </span>
      </p>
      <noscript>
        <p className="doc-note">
          Documents load live from GitHub, which needs JavaScript. You can read this one directly on{" "}
          <a href={source}>GitHub</a>.
        </p>
      </noscript>
      <div className={toc.length > 3 ? "doc-grid has-toc" : "doc-grid"}>
        <div className="doc-main">
          {state.s === "loading" && (
            <div className="doc-loading" aria-hidden="true"><i /><i /><i /><i /></div>
          )}
          {state.s === "error" && (
            <div className="doc-error" role="alert">
              <p>
                <strong>
                  {state.kind === "notfound"
                    ? "This document is not on GitHub main right now, so it cannot be shown."
                    : "GitHub is unreachable right now, so this document cannot be shown live."}
                </strong>
              </p>
              <p className="muted">Nothing old is shown instead, so what you read is always the current text.</p>
              <p className="doc-actions">
                <button type="button" className="btn btn-primary" onClick={retry}>Retry</button>
                <a className="btn btn-quiet" href={source}>Open on GitHub</a>
              </p>
            </div>
          )}
          {state.s === "ok" && <div ref={body} className="doc-body" dangerouslySetInnerHTML={{ __html: state.html }} />}
        </div>
        {toc.length > 3 && (
          <aside className="doc-toc">
            <nav aria-label="On this page">
              <p className="doc-toc-title">On this page</p>
              <ol>
                {toc.map((t) => (
                  <li key={t.id} className={t.depth === 3 ? "sub" : undefined}><a href={`#${t.id}`}>{t.text}</a></li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
      </div>
      {THIRD_PARTY && (
        <p className="doc-privacy small muted">
          {PRIVACY_NOTE} <a href={PRIVACY_URL}>GitHub privacy statement</a>.
        </p>
      )}
    </article>
  );
}
