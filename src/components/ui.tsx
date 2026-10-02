import type { ReactNode } from "react";
import { REPO_URL, docUrl } from "@/config/site";
import type { Tone } from "@/content/stages";
import { Badge } from "./ui/badge";
import { ButtonLink as GButtonLink } from "./ui/button/index.web";

export function RepoLink({ className }: { className?: string }) {
  return (
    <a className={className} href={REPO_URL}>
      Repository
    </a>
  );
}

/** A path inside the repository, linked to GitHub. */
export function DocRef({ path, children }: { path: string; children?: ReactNode }) {
  return (
    <a href={docUrl(path)}>
      <code>{children ?? path}</code>
    </a>
  );
}

export function Planned({ children = "Planned" }: { children?: ReactNode }) {
  return <Badge tone="planned" className="ml-1.5">{children}</Badge>;
}

export function Chip({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`chip chip-${tone}`}>{children}</span>;
}

export function Fictional({ children = "Fictional example" }: { children?: ReactNode }) {
  return <Badge tone="fictional">{children}</Badge>;
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "quiet" }) {
  return (
    <GButtonLink href={href} variant={variant === "quiet" ? "quiet" : "solid"}>
      {children}
    </GButtonLink>
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
