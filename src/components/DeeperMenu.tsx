import type { ReactNode } from "react";

/** 'Go deeper' group in the header: native details. Links are plain anchors (full page load), so it is closed again on every navigation with no script. */
export function DeeperMenu({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="deeper">
      <summary>{label}</summary>
      {children}
    </details>
  );
}
