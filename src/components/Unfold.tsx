import type { ReactNode } from "react";

/**
 * The one disclosure primitive (D-80): gradual unfolding on native details/summary.
 * The summary sentence is always visible, the body is in the exported HTML, and it works without JS.
 * A server component: the hash-opens-it script is one inline snippet in the root layout (UNFOLD_HASH_SCRIPT),
 * so no client chunk ships for it (06-u09).
 */
export const UNFOLD_HASH_SCRIPT = `(function(){function o(){var h=decodeURIComponent(location.hash.slice(1)),t=h&&document.getElementById(h),d=t&&t.closest("details.unfold");if(d){d.open=true;t.scrollIntoView()}}o();addEventListener("hashchange",o)})()`;

export function Unfold({ id, summary, children }: { id?: string; summary: ReactNode; children: ReactNode }) {
  return (
    <details className="unfold" id={id}>
      <summary>
        <span className="unfold-sentence">{summary}</span>
        <span className="unfold-label unfold-more">Show more</span>
        <span className="unfold-label unfold-less">Show less</span>
      </summary>
      <div className="unfold-body">{children}</div>
    </details>
  );
}
