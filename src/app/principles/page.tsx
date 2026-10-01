import type { Metadata } from "next";
import { DocRef, PageHead, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Principles",
  description: "The CAN constitution in brief: chapters, the order rules win in, and what the project will never do.",
};

const CHAPTERS: [string, string, string][] = [
  ["I", "Purpose and scope", "Public problems, never individual cases."],
  ["II", "Privacy, participation, publication", "What is shared, with whom, and what stays private."],
  ["III", "Public discourse and evidence", "Solution-only discussion and how evidence is weighed."],
  ["IV", "Resolution and lifecycle", "How a problem moves, pauses, gets stuck, or ends."],
  ["V", "AI, review, appeals", "Human review, explained decisions, and the right to appeal."],
  ["VI", "Restrictions, sanctions, restoration", "Proportionate limits, and a way back."],
  ["VII", "Expertise and reputation", "Planned: how knowledge counts without becoming rank."],
  ["VIII", "Governance", "Amendments, stewards and a founder role with an end date."],
  ["IX", "Decentralization and nodes", "Planned: independent nodes under the same rules."],
  ["X", "Systemic problems and accountability", "Planned: root causes and responsible institutions."],
  ["XI", "Election accountability", "Planned, off by default, behind strict preconditions."],
];

export default function Page() {
  return (
    <>
      <PageHead
        title="Principles"
        lede="A short reading of the constitution. It is a working draft, tagged by how settled each article is, and open to challenge through its amendment process."
      />
      <Section id="never" title="What we will never do" wide>
        <ul className="rows">
          <li><strong>Treat an individual as a case.</strong> <span className="d">No personal advice, therapy, legal service or case management.</span></li>
          <li><strong>Publish a personal crisis as a public problem.</strong> <span className="d">If someone may be in danger, the platform stops and shows safety routes instead.</span></li>
          <li><strong>Let AI decide alone.</strong> <span className="d">People make and answer for every decision. AI review cannot replace a required human approval.</span></li>
          <li><strong>Sell influence.</strong> <span className="d">Money buys no ranking, recommendation, moderation authority or governance weight. The platform is never a lead-generation marketplace.</span></li>
          <li><strong>Name or pursue private individuals.</strong> <span className="d">The work is about shared conditions, not about people.</span></li>
          <li><strong>Handle money.</strong> <span className="d">CAN is non-monetary by design.</span></li>
          <li><strong>Show your email.</strong> <span className="d">Public names are generated. Contact details stay private.</span></li>
          <li><strong>Claim to be live before it is.</strong> <span className="d">Anything not built is labelled planned.</span></li>
        </ul>
      </Section>
      <Section id="precedence" title="When rules conflict, this order wins">
        <ol>
          <li>Rights</li>
          <li>Crisis and safety</li>
          <li>Privacy</li>
          <li>The legal gate</li>
          <li>Procedure</li>
          <li>Ranking</li>
        </ol>
        <p>
          A lower item never overrides a higher one. If a conflict cannot be
          settled mechanically, it goes to a human and the record cites both
          rules.
        </p>
      </Section>
      <Section id="chapters" title="The eleven chapters" wide>
        <div className="table-wrap">
          <table>
            <thead><tr><th scope="col">Chapter</th><th scope="col">Title</th><th scope="col">In short</th></tr></thead>
            <tbody>
              {CHAPTERS.map(([n, t, s]) => (
                <tr key={n}><td>{n}</td><td>{t}</td><td>{s}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="prose small muted">
          Each article is tagged Decided, Position or Drafted so you can see
          what the founder fixed and what is working text. Read the chapters
          in <DocRef path="docs/spec/constitution/" /> and the testable rules
          in <DocRef path="docs/spec/constitution/rules.md" />.
        </p>
      </Section>
    </>
  );
}
