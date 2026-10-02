"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/** 'Go deeper' group in the header: native details, closed again after navigation. */
export function DeeperMenu({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const path = usePathname();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [path]);
  return (
    <details className="deeper" ref={ref}>
      <summary>{label}</summary>
      {children}
    </details>
  );
}
