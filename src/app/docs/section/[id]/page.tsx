import { localePath } from "@/lib/paths";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/A";
import { IndexStatus, LiveExtras } from "@/components/LiveExtras";
import { PageHead } from "@/components/ui";
import { SECTIONS } from "@/content/docs-sections";
import { PRIVACY_NOTE, PRIVACY_URL, THIRD_PARTY } from "@/config/docs-origin.mjs";
import { manifest, type DocEntry } from "@/lib/manifest";

export const dynamicParams = false;
export const generateStaticParams = () => SECTIONS.map((s) => ({ id: s.id }));

const GROUPS: Record<string, string> = { ai: "AI moderation", flows: "Flows", components: "Components", ux: "UX and screens", overview: "Overview" };
const group = (e: DocEntry) => (e.section === "design" ? (e.path.split("/").length > 3 ? e.path.split("/")[2] : "overview") : "");

type P = { params: Promise<{ id: string }> };
const find = async (params: P["params"]) => { const { id } = await params; return SECTIONS.find((s) => s.id === id); };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const s = await find(params);
  return pageMetadata(`/docs/section/${s?.id}/`, s?.title ?? "Documents", s?.blurb ?? "Public CAN documents.", "/docs/");
}

function List({ items }: { items: DocEntry[] }) {
  return (
    <ul className="doc-list">
      {items.map((e) => (
        <li key={e.slug}><Link href={localePath(`/docs/${e.slug}/`)} aria-label={`${e.title} (${e.path})`}>{e.title}</Link></li>
      ))}
    </ul>
  );
}

export default async function Page({ params }: P) {
  const s = await find(params);
  if (!s) notFound();
  const items = manifest().filter((e) => e.section === s.id);
  const keys = [...new Set(items.map(group))];
  return (
    <>
      <PageHead title={s.title} lede={s.blurb} />
      <div className="wrap">
        <p className="prose"><Link href={localePath("/docs/")}>Back to all document groups</Link></p>
        {THIRD_PARTY && (
          <p className="status-note prose">
            <strong>Privacy note</strong>
            {PRIVACY_NOTE} <a href={PRIVACY_URL}>GitHub privacy statement</a>.
          </p>
        )}
        <noscript>
          <p className="doc-note prose">Documents load live from GitHub, which needs JavaScript. The list below still works as links, and each page links to the file on GitHub.</p>
        </noscript>
        <IndexStatus />
        <p className="small muted">{items.length} {items.length === 1 ? "document" : "documents"} in this group.</p>
        <div className="doc-sectionlist">
          {s.id === "design"
            ? keys.map((k) => (
                <div key={k}>
                  <h2>{GROUPS[k] ?? k}</h2>
                  <List items={items.filter((e) => group(e) === k)} />
                </div>
              ))
            : <List items={items} />}
          <LiveExtras section={s.id} />
        </div>
      </div>
    </>
  );
}
