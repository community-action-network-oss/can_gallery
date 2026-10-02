import type { Metadata } from "next";
import Link from "next/link";
import { localePath } from "@/lib/paths";
import { docUrl } from "@/config/site";
import { PageHead, Section, Planned } from "@/components/ui";
import { TaskCard, type Task } from "@/components/TaskCard";
import catalog from "@/content/catalog.json";
import "./tasks.css";

export const metadata: Metadata = {
  title: "One hour tasks",
  description: "Small, bounded pieces of work listed from the project plans, each with its owner, review and expected outcome.",
};

const AREAS: Record<string, string> = {
  "can-server": "Server",
  "can-app": "App",
  "can-gallery": "This site",
  "can-policy": "Community policies",
  "can-root": "Project wiring",
  "can-spec": "Specification",
};

export default function Page() {
  const tasks = catalog as Task[];
  const areas = Object.keys(AREAS).filter((a) => tasks.some((t) => t.area === a));
  return (
    <>
      <PageHead
        title="One hour tasks"
        lede="Small steps count. One hour will not solve a complex problem, but one owned, checked piece moves the whole project. Pick one that fits what you know."
      />
      <Section id="how" title="How to use this list" wide>
        <p className="prose">This list is generated from the project plans and is never edited by hand. Each card says what the piece is, about how long it takes, what to read first, who owns it, how it is reviewed and what done looks like. <Planned /></p>
        <p className="prose small">A unit may already be taken or finished by the time you read this, so check its status on GitHub before you claim it. Read how the work is organised on the <Link href={localePath("/contribute/")}>contribute page</Link>, and the <a href={docUrl("docs/spec/22-ai-contribution-policy.md")}>AI contribution policy</a>.</p>
        <ul className="task-areas">
          {areas.map((a) => <li key={a}><a href={`#${a}`}>{AREAS[a]}</a></li>)}
        </ul>
      </Section>
      {areas.map((a) => (
        <Section key={a} id={a} title={AREAS[a]} wide>
          <div className="task-grid">{tasks.filter((t) => t.area === a).map((t) => <TaskCard key={t.id} t={t} />)}</div>
        </Section>
      ))}
    </>
  );
}
