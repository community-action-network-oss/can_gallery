import type { Metadata } from "next";
import Link from "next/link";
import { Chip, DocRef, PageHead, Planned, Section } from "@/components/ui";
import { JOURNEY, SIDE_STATES } from "@/content/stages";

export const metadata: Metadata = {
  title: "How it works",
  description: "The lifecycle of a public problem in CAN, the roles involved, how moderation works today, and the privacy stance.",
};

const ALL = [...JOURNEY, ...SIDE_STATES];

export default function Page() {
  return (
    <>
      <PageHead
        title="How a public problem moves through CAN"
        lede="A plain-words tour of the lifecycle, who does what, how moderation works today and what we protect. Everything described is the design for the first build, not a running service."
      />

      <Section id="lifecycle" title="The lifecycle, in the words visitors will see" wide>
        <p className="prose">
          Every problem carries one public label at a time. Each label comes
          with a plain explanation and a next action. The first build uses
          one fictional place and fictional problems only.
        </p>
        <div className="table-wrap">
          <table>
            <caption className="small muted">Public labels and what they mean</caption>
            <thead><tr><th scope="col">Label</th><th scope="col">What it says</th></tr></thead>
            <tbody>
              {ALL.map((s) => (
                <tr key={s.label}><th scope="row"><Chip tone={s.tone}>{s.label}</Chip></th><td>{s.says}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="prose small muted">
          Stuck and paused are ordinary parts of real civic work. They are
          styled calmly, never in red, and never read as blame. Closed and
          solved decisions are shown as interim, and will be re-reviewed,
          while the volunteer pool is small. Source: <DocRef path="docs/spec/01-slice-1-brief.md" />.
        </p>
      </Section>

      <Section id="roles" title="Who does what">
        <ul className="rows">
          <li><strong>The person who raised it, the steward</strong><span className="d">Provisionally guides the problem: proposes decisions and moves it through the stages. Owns nothing; the problem belongs to the public record.</span></li>
          <li><strong>Moderators, volunteers</strong><span className="d">Confirm what gets published, solved, closed or redirected. Every decision carries the rules applied and a hint for what to change.</span></li>
          <li><strong>Contributors</strong><span className="d">Add evidence, questions, risks, proposals and progress updates. Nobody is excluded in the first build.</span></li>
          <li><strong>Core participants, visitors, experts, observers <Planned /></strong><span className="d">People with a material connection to the problem lead the thread; visitors and verified experts contribute without steering it; observers follow along.</span></li>
        </ul>
      </Section>

      <Section id="moderation" title="Moderation: rules first, people always">
        <p>
          Today: rules-based checks and human review of everything published.
          AI assistance is planned; people make and answer for every decision.
        </p>
        <ul>
          <li>Deterministic checks catch contact details, secrets and obviously unsafe links before anyone reviews.</li>
          <li>A volunteer reviews every problem before it is public.</li>
          <li>Every decision names the rule applied, points at the part it is about, and says what would make it acceptable.</li>
          <li>Anyone can appeal a moderation decision. When two or more moderators exist, the reviewer differs from the original decider; until then, that is disclosed on the page.</li>
          <li>Discussion is solution-only, with targeted waits between contributions, so it stays thoughtful instead of reactive.</li>
          <li>AI assistance <Planned /> will be advisory and switched on only after evaluation. It cannot satisfy a required human approval.</li>
        </ul>
      </Section>

      <Section id="privacy" title="Privacy stance">
        <ul>
          <li>You get a generated public name. Your email is encrypted and never shown.</li>
          <li>Problems must not identify anyone. A personal experience is welcome only as evidence of a wider condition.</li>
          <li>Rejected and withdrawn drafts are deleted on a date shown to you.</li>
          <li>This promo site collects nothing: no forms, no cookies, no analytics.</li>
        </ul>
        <p className="small muted">
          Exact numbers (deletion windows, waiting times, ages) are defaults,
          and several are <Link href="/open-questions/">open questions</Link>.
        </p>
      </Section>
    </>
  );
}
