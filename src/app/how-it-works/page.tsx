import { localePath } from "@/lib/paths";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/A";
import { Chip, DocRef, Fictional, PageHead, Planned, Section } from "@/components/ui";
import { RoleList, StagePanel } from "@/components/Path";
import { Pictogram, Plate } from "@/components/Pictogram";
import { Unfold } from "@/components/Unfold";
import "./how-it-works.css";
import { PATH, SIDE_STATES, type Roles } from "@/content/stages";

export const metadata: Metadata = pageMetadata("/how-it-works/", "How it works", "The lifecycle of a public problem in CAN, the roles involved, how moderation works today, and the privacy stance.");

const ALL = [...PATH, ...SIDE_STATES];

export default function Page() {
  return (
    <>
      <PageHead
        title="How a public problem moves through CAN"
        lede="A plain-words tour of the lifecycle, who does what, how moderation works today and what we protect. Everything described is the design for the first build, not a running service."
      />

      <section className="section" id="in-short" aria-labelledby="in-short-h">
        <div className="wrap">
          <h2 id="in-short-h">In short <Planned /></h2>
          <div className="stack">
            <Plate
              title="One problem, many hands"
              legend="Each figure is one person. The symbol is the problem."
              caption={<><Fictional /> Nobody here is real. One person raises it, a few volunteers check it, then others help fix it.</>}
            >
              <div className="hands">
                <Pictogram name="clerk" ink="cobalt" size={64} title="The person who raised it" />
                <span className="hands-rule" aria-hidden="true" />
                <Pictogram name="crossing" ink="ochre" size={64} title="A public problem" />
                <span className="hands-rule" aria-hidden="true" />
                <ul className="hands-helpers" aria-label="People who help">
                  <li><Pictogram name="nurse" ink="cobalt" size={44} title="A volunteer" /></li>
                  <li><Pictogram name="cook" ink="cobalt" size={44} title="A volunteer" /></li>
                  <li><Pictogram name="electrician" ink="cobalt" size={44} title="A volunteer" /></li>
                </ul>
              </div>
            </Plate>
            <ol className="plain-steps">
              <li><h3>It stays private first</h3><p>The person who raised it and a few volunteers shape it together. Nothing is public yet.</p></li>
              <li><h3>Then it is shared and worked on in stages</h3><p>Each stage ends only when there is evidence anyone can check.</p></li>
              <li><h3>Rules the community wrote</h3><p>An AI applies them, explains each decision, and every decision can be appealed.</p></li>
              <li><h3>Your details stay yours</h3><p>You get a made up public name, and this site collects nothing about you.</p></li>
            </ol>
            <p className="small muted">Open any section below for the full detail. None of this is running yet.</p>
          </div>
        </div>
      </section>

      <Section id="lifecycle" title="The lifecycle, in the words visitors will see" wide>
        <p className="prose">Six steps take a problem from a private draft to a saved path for others. Open the detail to see every label, who does what, and the other states.</p>
        <Unfold id="lifecycle-detail" summary="Every step and state, and what each one says">
        <p className="prose">
          Every problem follows the same six steps, labelled Planned. The
          first two happen before anything is public. In the Stages step,
          stages can run one after another, side by side, or both, and a
          stage finishes only when its evidence meets its finish line. The
          last step keeps the whole journey as a path others can start from. Along
          the way a problem can also be paused, stuck, redirected or closed.
          The first build uses made up evidence and no real participants or personal data.
        </p>
        <div className="table-wrap">
          <table>
            <caption className="small muted">The six steps, then the other states, and what they mean</caption>
            <thead><tr><th scope="col">Label</th><th scope="col">What it says</th></tr></thead>
            <tbody>
              {ALL.map((s) => (
                <tr key={s.label}><th scope="row"><Chip tone={s.tone}>{s.label}</Chip></th><td>{s.says}{"roles" in s && <RoleList roles={s.roles as Roles} />}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="sub-h">Inside the Stages step</h3>
        <StagePanel id="hiw-stages-h" />
        <p className="prose small muted">
          Stuck and paused are ordinary parts of real civic work. They are
          styled calmly, never in red, and never read as blame. Source: <DocRef path="docs/spec/01a-lifecycle.md" />.
        </p>
        </Unfold>
      </Section>

      <Section id="roles" title="Who does what">
        <p>Whoever raises a problem guides it, volunteers check it, and everyone else adds what they know.</p>
        <Unfold id="roles-detail" summary="The four kinds of people, and what each does">
        <ul className="rows">
          <li><strong>The person who raised it, the steward</strong><span className="d">Provisionally guides the problem: proposes decisions and moves it through the stages. Owns nothing; the problem belongs to the public record.</span></li>
          <li><strong>Volunteer reviewers</strong><span className="d">Review problems before they are published, and suggest improvements to facts, stages and finish lines. Every decision carries the rules applied and a hint for what to change.</span></li>
          <li><strong>Contributors</strong><span className="d">Add evidence, questions, risks, proposals and progress updates. Nobody is excluded in the first build.</span></li>
          <li><strong>Core participants, visitors, experts, observers <Planned /></strong><span className="d">People with a material connection to the problem lead the thread; visitors and verified experts contribute without steering it; observers follow along.</span></li>
        </ul>
        </Unfold>
      </Section>

      <Section id="moderation" title="Moderation: community rules, applied by AI">
        <p>
          Planned: volunteers review every problem in private. Then an AI checks
          it against the rules the community wrote, before publication, on every
          update and afterwards. It never makes policy. People change the rules,
          the rules apply to everyone, and every decision can be appealed. Only
          emergencies and legal process are handled by people, in a small,
          logged lane. <Link href={localePath("/community-policy/")}>How the AI applies the rules</Link>
        </p>
        <Unfold id="moderation-detail" summary="Six things moderation is built to do">
        <ul>
          <li>Fixed checks run before anyone reviews, and catch things like contact details.</li>
          <li>Volunteers review every problem in private before it is public, and the poster accepts or declines each suggestion.</li>
          <li>Every decision names the rule applied, points at the part it is about, and says what would make it acceptable.</li>
          <li>Anyone can appeal a moderation decision. The appeal is re-checked independently, by a different model or prompt variant, so the same check never grades itself.</li>
          <li>Discussion is solution-only, with targeted waits between contributions, so it stays thoughtful instead of reactive.</li>
          <li>The AI publishing check <Planned /> follows the community written rules and is switched on only after evaluation.</li>
        </ul>
        </Unfold>
      </Section>

      <Section id="replies" title="Replies: make each one count">
        <p><Planned /> You can reply to a problem 4 times a day. That is on purpose: make each reply count.</p>
        <Unfold id="replies-detail" summary="What counts, and why">
        <ul>
          <li>Any reply you send on one problem counts, whatever kind it is, including replies on its stages.</li>
          <li>Drafts and edits do not count, and neither do appeals or answers to a volunteer.</li>
          <li>The 4 are counted over a rolling 24 hours, separately for each problem.</li>
          <li>The aim is fewer, better replies instead of a stream.</li>
        </ul>
        <p className="small muted">The number is a community policy value, so it can change. Source: <DocRef path="docs/spec/05-lifecycle-participation.md" />.</p>
        </Unfold>
      </Section>

      <Section id="privacy" title="Privacy stance">
        <p>Your email stays private, a problem never names anyone, and this site collects nothing about you.</p>
        <Unfold id="privacy-detail" summary="What we protect, and the numbers still open">
        <ul>
          <li>You get a generated public name. Your email is encrypted and never shown.</li>
          <li>Problems must not identify anyone. A personal experience is welcome only as evidence of a wider condition.</li>
          <li>Rejected and withdrawn drafts are deleted on a date shown to you.</li>
          <li>This gallery collects nothing: no forms, no cookies, no analytics.</li>
        </ul>
        <p className="small muted">
          Exact numbers (deletion windows, waiting times, ages) are defaults,
          and several are <Link href={localePath("/open-questions/")}>open questions</Link>.
        </p>
        </Unfold>
      </Section>
    </>
  );
}
