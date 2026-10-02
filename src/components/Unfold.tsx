"use client";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * The one disclosure primitive (D-80): gradual unfolding on native details/summary.
 * The summary sentence is always visible, the body is in the exported HTML, and it works without JS.
 * The only script opens the details when the URL hash targets it or something inside it.
 */
export function Unfold({ id, summary, children }: { id?: string; summary: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const open = () => {
      const el = ref.current;
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!el || !hash) return;
      const target = document.getElementById(hash);
      if (target && el.contains(target)) {
        el.open = true;
        target.scrollIntoView();
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return (
    <details className="unfold" id={id} ref={ref}>
      <summary>
        <span className="unfold-sentence">{summary}</span>
        <span className="unfold-label unfold-more">Show more</span>
        <span className="unfold-label unfold-less">Show less</span>
      </summary>
      <div className="unfold-body">{children}</div>
    </details>
  );
}
