import type { Metadata } from "next";
import { REPO_URL } from "@/config/site";
import { PageHead, Section, Planned, DocRef } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import log from "@/content/changelog.json";
import "./whats-new.css";

export const metadata: Metadata = {
  title: "What is new",
  description: "A plain weekly list of the work done so far on CAN, taken from the project history. Development activity, not product releases.",
};

const SHOWN = 10;
type Entry = { sha: string; date: string; text: string };

function Rows({ items }: { items: Entry[] }) {
  return (
    <ul className="wn-rows">
      {items.map((e) => (
        <li key={e.sha}>
          <span className="k">{e.date}</span>
          <span>
            {e.text}. <a className="sha" href={`${REPO_URL}/commit/${e.sha}`}>Commit {e.sha}</a>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <PageHead
        title="What is new"
        lede="A weekly list of the work done so far, so you can see things moving. It is a record of development activity, not a list of product releases."
      />
      <Section id="note" title="What this list is">
        <p>Each line is one piece of work on the project, written in the project history. Nothing here is a finished product, and CAN is not in use for real problems. Routine housekeeping lines are left out. No names are shown.</p>
        <Unfold id="note-detail" summary="Where this list comes from">
          <p>It is built from the public project history as it stands on the main branch ({log.count} entries, up to commit {log.head}). Work still being prepared is not shown until it is merged. Wording is tidied for reading. The full history is on <a href={REPO_URL}>GitHub</a>.</p>
        </Unfold>
      </Section>

      <Section id="weeks" title="Week by week" wide>
        {log.weeks.map((w) => (
          <div key={w.week} id={w.week}>
            <h3>Week of {w.start}</h3>
            <Rows items={w.entries.slice(0, SHOWN)} />
            {w.entries.length > SHOWN && (
              <Unfold id={`more-${w.week}`} summary={`${w.entries.length - SHOWN} more from this week`}>
                <Rows items={w.entries.slice(SHOWN)} />
              </Unfold>
            )}
          </div>
        ))}
      </Section>

      <Section id="monthly" title="A monthly status report">
        <p>The plan is a short public status report once a month, written in plain words. <Planned /></p>
        <Unfold id="monthly-detail" summary="Where this is described">
          <p>See the rhythm of work in <DocRef path="docs/spec/21-open-source-governance.md" />. Release policy is a separate piece of work.</p>
        </Unfold>
      </Section>
    </>
  );
}
