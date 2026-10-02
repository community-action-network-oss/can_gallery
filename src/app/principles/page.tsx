import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { DocRef, Fictional, PageHead, Planned, Section } from "@/components/ui";
import { Pictogram, Plate } from "@/components/Pictogram";
import Link from "@/components/A";
import { localePath } from "@/lib/paths";
import { Unfold } from "@/components/Unfold";
import "./principles.css";

export const metadata: Metadata = pageMetadata("/principles/", "Principles", "The CAN constitution in brief: chapters, the order rules win in, and what the project will never do.");

const CHAPTERS: [string, string, string][] = [
  ["I", "Purpose and scope", "Public problems, never individual cases."],
  ["II", "Privacy, participation, publication", "What is shared, with whom, and what stays private."],
  ["III", "Public discourse and evidence", "Solution-only discussion and how evidence is weighed."],
  ["IV", "Resolution and lifecycle", "How a problem moves, pauses, gets stuck, or ends."],
  ["V", "AI, review, appeals", "Rules the community wrote, applied by AI with explained decisions, and the right to appeal."],
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
      <section className="section" id="in-short" aria-labelledby="in-short-h">
        <div className="wrap">
          <h2 id="in-short-h">In short</h2>
          <div className="stack">
            <Plate
              title="Public problems only"
              legend="Each crossing is a shared problem. Each figure is one person."
              caption={<><Fictional /> CAN looks at what many people face together, and keeps the person out of it.</>}
            >
              <div className="scope">
                <Pictogram name="clinic" ink="ochre" size={56} title="A shared public problem" />
                <Pictogram name="bus" ink="ochre" size={56} title="A shared public problem" />
                <Pictogram name="school" ink="ochre" size={56} title="A shared public problem" />
              </div>
            </Plate>
            <ul className="rows">
              <li><strong>It takes shared problems, not personal cases.</strong></li>
              <li><strong>People decide and can be asked to explain. AI never decides alone.</strong></li>
              <li><strong>Nothing is called live before it is.</strong> <Planned /></li>
            </ul>
            <p className="small muted">The constitution is a working draft. Open any section below for the full detail.</p>
          </div>
        </div>
      </section>
      <Section id="never" title="What we will never do" wide>
        <p className="prose">Eight promises about what CAN will not become. The first three matter most to people who come with a personal worry.</p>
        <Unfold id="never-detail" summary="All eight, with the reason for each">
        <ul className="rows">
          <li><strong>Treat an individual as a case.</strong> <span className="d">No personal advice, therapy, legal service or case management.</span></li>
          <li><strong>Publish a personal crisis as a public problem.</strong> <span className="d">If someone may be in danger, the platform stops and shows safety routes instead.</span></li>
          <li><strong>Let AI decide alone.</strong> <span className="d">The AI executes rules the community wrote and never makes policy. Every decision is explained, appeals are independent, and people handle only emergencies and legal process. <Link href={localePath("/community-policy/")} aria-label="How it works, community policy">How it works</Link></span></li>
          <li><strong>Sell influence.</strong> <span className="d">Money buys no ranking, recommendation, moderation authority or governance weight. The platform is never a lead-generation marketplace.</span></li>
          <li><strong>Name or pursue private individuals.</strong> <span className="d">The work is about shared conditions, not about people.</span></li>
          <li><strong>Handle money.</strong> <span className="d">CAN is non-monetary by design.</span></li>
          <li><strong>Show your email.</strong> <span className="d">Public names are generated. Contact details stay private.</span></li>
          <li><strong>Claim to be live before it is.</strong> <span className="d">Anything not built is labelled planned.</span></li>
        </ul>
        </Unfold>
      </Section>
      <Section id="precedence" title="When rules conflict, this order wins">
        <p>Rights come first and ranking comes last.</p>
        <Unfold id="precedence-detail" summary="The full order, and what happens in a tie">
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
        </Unfold>
      </Section>
      <Section id="chapters" title="The eleven chapters" wide>
        <p className="prose">The constitution has eleven chapters, from purpose and privacy to governance. Some are already written and some are planned.</p>
        <Unfold id="chapters-detail" summary="The chapter table, and how to read the tags">
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
        </Unfold>
      </Section>
    </>
  );
}
