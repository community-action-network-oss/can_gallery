import { localePath } from "@/lib/paths";
import type { Metadata } from "next";
import Link from "next/link";
import { IndexStatus, LiveExtras } from "@/components/LiveExtras";
import { PageHead } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import { SECTIONS } from "@/content/docs-sections";
import { PRIVACY_NOTE, PRIVACY_URL, THIRD_PARTY } from "@/config/docs-origin.mjs";
import { manifest, type DocEntry } from "@/lib/manifest";

export const metadata: Metadata = {
  title: "Read everything",
  description: "Every public CAN document in one place, read live from GitHub: manifesto, rules, decisions, open questions, specification, design and architecture.",
};

const GROUPS: Record<string, string> = { ai: "AI moderation", flows: "Flows", components: "Components", ux: "UX and screens", overview: "Overview" };
const group = (e: DocEntry) => (e.section === "design" ? (e.path.split("/").length > 3 ? e.path.split("/")[2] : "overview") : "");

function List({ items }: { items: DocEntry[] }) {
  return (
    <ul className="doc-list">
      {items.map((e) => (
        <li key={e.slug}><Link href={localePath(`/docs/${e.slug}/`)} aria-label={`${e.title} (${e.path})`}>{e.title}</Link></li>
      ))}
    </ul>
  );
}

export default function Page() {
  const all = manifest();
  return (
    <>
      <PageHead
        title="Read everything"
        lede="Everything that matters about CAN is public. Read it here, written by the people building it, without going to GitHub. Each page is fetched live, so you see the current text."
      />
      <div className="wrap">
        <p className="prose">
          You do not have to read any of this to help. It is here so that
          nothing is hidden. If you only have a few minutes, open the
          manifesto and the open questions first. The other groups are there
          when you want the detail.
        </p>
        {THIRD_PARTY && (
          <p className="status-note prose">
            <strong>Privacy note</strong>
            {PRIVACY_NOTE} <a href={PRIVACY_URL}>GitHub privacy statement</a>.
          </p>
        )}
        <noscript>
          <p className="doc-note prose">Documents load live from GitHub, which needs JavaScript. The lists below still work as links, and each page links to the file on GitHub.</p>
        </noscript>
        <IndexStatus />
        <nav aria-label="Sections" className="doc-jump">
          <ul>
            {SECTIONS.map((s) => (<li key={s.id}><a href={`#${s.id}-list`} aria-label={`${s.title}, jump to this section`}>{s.title}</a></li>))}
          </ul>
        </nav>
      </div>
      {SECTIONS.map((s) => {
        const items = all.filter((e) => e.section === s.id);
        const keys = [...new Set(items.map(group))];
        return (
          <section key={s.id} id={s.id} className="section" aria-labelledby={`${s.id}-h`}>
            <div className="wrap">
              <h2 id={`${s.id}-h`}>{s.title}</h2>
              <p className="prose muted">{s.blurb}</p>
              <Unfold id={`${s.id}-list`} summary={`${items.length} ${items.length === 1 ? "document" : "documents"} in this group`}>
                <div className="doc-sectionlist">
                  {s.id === "design"
                    ? keys.map((k) => (
                        <div key={k}>
                          <h3>{GROUPS[k] ?? k}</h3>
                          <List items={items.filter((e) => group(e) === k)} />
                        </div>
                      ))
                    : <List items={items} />}
                  <LiveExtras section={s.id} />
                </div>
              </Unfold>
            </div>
          </section>
        );
      })}
    </>
  );
}
