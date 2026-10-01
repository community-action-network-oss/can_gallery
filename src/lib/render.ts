// Markdown to sanitised HTML. Runs in the browser only (lazy chunk), on text fetched live from GitHub.
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema, type Options as Schema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { docUrl } from "@/config/site";
import { isMarkdown, isPublicPath, slugOf } from "./whitelist.mjs";
import built from "../../scripts/docs-manifest.json";

export type Toc = { id: string; text: string; depth: number }[];

const builtPaths = new Set<string>(built);
const builtDirs = new Map<string, string>(
  built.filter((p) => p.endsWith("/README.md")).map((p) => [p.slice(0, -"/README.md".length), p]),
);

const sanitizeSchema: Schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), ["className", /^language-[\w-]+$/]],
    th: [...(defaultSchema.attributes?.th ?? []), "align"],
    td: [...(defaultSchema.attributes?.td ?? []), "align"],
  },
};

type Node = { type: string; tagName?: string; properties?: Record<string, unknown>; children?: Node[]; value?: string };
const walk = (n: Node, f: (n: Node, parent: Node | null) => void, parent: Node | null = null) => {
  f(n, parent);
  [...(n.children ?? [])].forEach((c) => walk(c, f, n));
};
const text = (n: Node): string => (n.type === "text" ? (n.value ?? "") : (n.children ?? []).map(text).join(""));

function resolve(from: string, target: string): string | null {
  const parts = target.startsWith("/") ? [] : from.split("/").slice(0, -1);
  for (const seg of target.split("/")) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") { if (!parts.length) return null; parts.pop(); } else parts.push(seg);
  }
  return parts.join("/");
}

/** Relative link between public docs becomes a gallery route; everything else goes to GitHub. */
export function rewriteLink(href: string, from: string): string {
  if (href.startsWith("#")) return href;
  if (/^https?:\/\/(www\.)?github\.com\//i.test(href)) return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) return "#"; // no other external links, ever
  const [target, hash] = href.split("#");
  const h = hash ? `#${hash}` : "";
  const r = resolve(from, target);
  if (r === null) return docUrl("") + h;
  const asDir = builtDirs.get(r.replace(/\/$/, ""));
  const file = builtPaths.has(r) ? r : asDir;
  if (file) return `/docs/${slugOf(file)}/${h}`;
  if (isPublicPath(r) && r.endsWith(".md")) return `/docs/view/?path=${encodeURIComponent(r)}${h}`;
  const isDir = target.endsWith("/") || !/\.[a-z0-9]+$/i.test(r);
  return docUrl(isDir ? r + "/" : r) + h;
}

export async function renderDoc(src: string, path: string): Promise<{ html: string; toc: Toc; title: string | null }> {
  let body = isMarkdown(path) ? src : "```" + (path.endsWith(".json") ? "json" : "yaml") + "\n" + src.trimEnd() + "\n```\n";
  let title: string | null = null;
  const m = body.match(/^#\s+(.+)\n+/);
  if (m && isMarkdown(path)) { title = m[1].replace(/[*`]/g, "").trim(); body = body.slice(m[0].length); }
  const toc: Toc = [];
  const post = () => (tree: Node) => {
    walk(tree, (n, parent) => {
      if (n.type !== "element") return;
      if (n.tagName === "a" && typeof n.properties?.href === "string") n.properties.href = rewriteLink(n.properties.href, path);
      if (n.tagName === "h1") n.tagName = "h2"; // the page owns the single h1
      if ((n.tagName === "h2" || n.tagName === "h3") && n.properties?.id) {
        toc.push({ id: String(n.properties.id), text: text(n), depth: n.tagName === "h2" ? 2 : 3 });
      }
      if (n.tagName === "table" && parent?.children) {
        const i = parent.children.indexOf(n);
        parent.children[i] = { type: "element", tagName: "div", properties: { className: ["table-wrap"], tabIndex: 0, role: "region", "aria-label": "Table, scrolls sideways" }, children: [n] };
      }
      if (n.tagName === "pre") {
        const code = n.children?.find((c) => c.tagName === "code");
        const cls = (code?.properties?.className as string[] | undefined) ?? [];
        n.properties = { ...n.properties, ...(cls.includes("language-mermaid") ? { className: ["mermaid"] } : { tabIndex: 0 }) };
      }
    });
  };
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(post)
    .use(rehypeStringify)
    .process(body);
  return { html: String(file), toc, title };
}
