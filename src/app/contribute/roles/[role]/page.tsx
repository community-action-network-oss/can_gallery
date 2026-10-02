import type { Metadata } from "next";
import Link from "next/link";
import { localePath } from "@/lib/paths";
import { docUrl } from "@/config/site";
import { PageHead, Section, Planned } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import { ROLES } from "@/content/roles/data";
import { FOUNDING_RULES, NEEDED_NOW_SENTENCE, NO_AUTHORITY, URGENT_SENTENCE } from "@/content/roles/types";
import catalog from "@/content/catalog.json";
import "../roles.css";

type Params = { role: string };
const find = (slug: string) => ROLES.find((r) => r.slug === slug)!;

export const dynamicParams = false;
export const generateStaticParams = (): Params[] => ROLES.map((r) => ({ role: r.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const r = find((await params).role);
  return { title: r.name, description: r.summary };
}

const List = ({ items }: { items: string[] }) => <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>;
const Row = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
  <div id={id}><dt>{label}</dt><dd>{children}</dd></div>
);

export default async function Page({ params }: { params: Promise<Params> }) {
  const r = find((await params).role);
  const all = catalog as { id: string; title: string; area: string }[];
  const tasks = all.filter((t) => r.tasks.areas?.includes(t.area) || r.tasks.ids?.includes(t.id));
  const areas = (r.tasks.areas ?? []).filter((a) => all.some((t) => t.area === a));
  return (
    <>
      <PageHead title={r.name} lede={r.summary} />
      <Section id="role" title="About this role" wide>
        {r.urgency === "needed-now" && <p className="prose"><strong>{NEEDED_NOW_SENTENCE}</strong> <Planned /></p>}
        {r.urgency === "most-urgent-now" && <p className="prose"><strong>{URGENT_SENTENCE}</strong> <Planned /></p>}
        <p className="prose role-fixed">{NO_AUTHORITY}</p>
        <dl className="legend">
          <Row id="do-now" label="What you can do now"><List items={r.doNow} /></Row>
        </dl>
        <Unfold id="before" summary="Before you start: what to know, how much time, privacy, and what is not allowed">
          <dl className="legend">
            <Row id="prerequisites" label="What to know first"><List items={r.prerequisites} /></Row>
            <Row id="time" label="How much time"><List items={r.time} /></Row>
            <Row id="privacy" label="Privacy and conflicts"><List items={[...r.privacyAndConflict, ...FOUNDING_RULES.slice(0, 2)]} /></Row>
            <Row id="prohibited" label="Not allowed"><List items={r.prohibited} /></Row>
          </dl>
        </Unfold>
        <dl className="legend">
          <Row id="tasks" label="Available tasks">
            {tasks.length ? (
              <>
                {areas.length > 0 && <p>Browse by area: {areas.map((a, i) => <span key={a}>{i ? ", " : ""}<Link href={localePath(`/contribute/tasks/#${a}`)}>{a}</Link></span>)}.</p>}
                {r.tasks.ids && <ul>{tasks.filter((t) => r.tasks.ids!.includes(t.id)).map((t) => <li key={t.id}><Link href={localePath(`/contribute/tasks/#${t.id}`)}>{t.title}</Link></li>)}</ul>}
              </>
            ) : (
              <p>{r.tasks.note ?? "No bounded task is open for this role right now."} Read the <Link href={localePath("/open-questions/")}>open questions</Link> instead, where evidence and ideas are welcome.</p>
            )}
          </Row>
        </dl>
        <Unfold id="after" summary="After you contribute: review, escalation and how your work affects decisions">
          <dl className="legend">
            <Row id="review" label="Review and escalation"><List items={r.review} /></Row>
            <Row id="decisions" label="How it affects decisions"><List items={r.decisions} /></Row>
          </dl>
        </Unfold>
        <p className="prose small">Read more: {r.links.map((l, i) => (
          <span key={l.label}>{i ? ", " : ""}{l.internal ? <Link href={localePath(l.internal)}>{l.label}</Link> : <a href={docUrl(l.doc!)}>{l.label}</a>}</span>
        ))}. Back to <Link href={localePath("/contribute/roles/")}>all roles</Link>.</p>
      </Section>
    </>
  );
}
