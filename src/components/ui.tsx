import Link from "next/link";
import type { ReactNode } from "react";
import { REPO_LINK_TEXT, REPO_LIVE, REPO_URL, docUrl } from "@/config/site";
import type { Tone } from "@/content/stages";

export function RepoLink({ className }: { className?: string }) {
  return (
    <a className={className} href={REPO_URL}>
      {REPO_LIVE ? "Repository" : REPO_LINK_TEXT}
    </a>
  );
}

/** A path inside the repository: a link once the remote exists, plain code until then. */
export function DocRef({ path, children }: { path: string; children?: ReactNode }) {
  const href = docUrl(path);
  const inner = <code>{children ?? path}</code>;
  return href ? <a href={href}>{inner}</a> : inner;
}

export function Planned({ children = "Planned" }: { children?: ReactNode }) {
  return <span className="tag tag-planned">{children}</span>;
}

export function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`chip chip-${tone}`}>{children}</span>;
}

export function Fictional({ children = "Fictional example" }: { children?: ReactNode }) {
  return <span className="tag tag-fictional">{children}</span>;
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "quiet" }) {
  return (
    <Link className={`btn btn-${variant}`} href={href}>
      {children}
    </Link>
  );
}

export function PageHead({ title, lede }: { title: string; lede: ReactNode }) {
  return (
    <header className="page-head wrap">
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
    </header>
  );
}

export function Section({ id, title, children, wide }: { id?: string; title: string; children: ReactNode; wide?: boolean }) {
  const hid = id ? `${id}-h` : undefined;
  return (
    <section className="section" id={id} aria-labelledby={hid}>
      <div className="wrap">
        <h2 id={hid}>{title}</h2>
        <div className={wide ? "stack" : "stack prose"}>{children}</div>
      </div>
    </section>
  );
}
