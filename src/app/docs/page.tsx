import { localePath } from "@/lib/paths";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/A";
import { IndexStatus } from "@/components/LiveExtras";
import { PageHead } from "@/components/ui";
import { SECTIONS } from "@/content/docs-sections";
import { PRIVACY_NOTE, PRIVACY_URL, THIRD_PARTY } from "@/config/docs-origin.mjs";
import { manifest } from "@/lib/manifest";

export const metadata: Metadata = pageMetadata("/docs/", "Read everything", "Every public CAN document in one place, read live from GitHub: manifesto, rules, decisions, open questions, specification, design and architecture.");

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
          <p className="doc-note prose">Documents load live from GitHub, which needs JavaScript. The groups below still work as links, and each page links to the file on GitHub.</p>
        </noscript>
        <IndexStatus />
      </div>
      <section className="section" aria-labelledby="groups-h">
        <div className="wrap">
          <h2 id="groups-h">Document groups</h2>
          <ul className="doc-list">
            {SECTIONS.map((x) => {
              const n = all.filter((e) => e.section === x.id).length;
              return (
                <li key={x.id}>
                  <Link href={localePath(`/docs/section/${x.id}/`)} aria-label={`${x.title}, ${n} ${n === 1 ? "document" : "documents"}`}>{x.title}</Link>
                  <span className="muted"> ({n}) {x.blurb}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
