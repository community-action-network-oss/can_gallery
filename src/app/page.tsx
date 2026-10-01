import Link from "next/link";
import { ButtonLink, Chip, Fictional, Planned, RepoLink, Section } from "@/components/ui";
import { PathRail } from "@/components/Path";
import oq from "@/content/open-questions.json";

const TEASER = ["OQ-hosting-region", "OQ-decision-method", "OQ-launch-jurisdiction-language"];

export default function Home() {
  const teaser = TEASER.map((id) => oq.find((q) => q.id === id)).filter((q) => q !== undefined);
  return (
    <>
      <section className="hero" aria-labelledby="hero-h">
        <div className="wrap">
          <h1 id="hero-h">
            <span className="frustration">Complaints, petitions and endless threads rarely fix anything.</span>
            <span className="answer">Let’s build what does.</span>
          </h1>
          <p className="lede">
            CAN is an open source platform where a public problem moves from
            evidence, to a lawful solution, to a verified and tracked outcome.
            Every step in the open. Every decision on record.
          </p>
          <div className="cta-row">
            <ButtonLink href="/contribute/">Help build it</ButtonLink>
            <ul className="cta-links">
              <li><RepoLink /></li>
              <li><Link href="/open-questions/">Read the open questions</Link></li>
            </ul>
          </div>
          <p className="status-note">
            <strong>Where things stand</strong>
            This is a concept with early scaffolding. Nothing here handles real
            problems yet. CAN is not an emergency, legal, medical, government
            or individual case service. If someone is in danger, contact your
            local emergency number.
          </p>

          <div className="journey">
            <p className="journey-title" id="journey-t">
              The path every public problem will follow <Planned />
            </p>
            <PathRail labelledBy="journey-t" />
            <p className="journey-foot">
              This is the planned design, not a live product. Along the way a
              problem can also be paused, stuck, redirected or closed, always
              with the reason shown. See{" "}
              <Link href="/how-it-works/">how it works</Link>.
            </p>
          </div>
        </div>
      </section>

      <Section id="why" title="Most public channels end with a post. CAN is built to end with a result." wide>
        <dl className="contrast">
          <div><dt>A complaint board</dt><dd>Ends when someone replies, or does not.</dd></div>
          <div><dt>A petition</dt><dd>Ends with a number that nobody has to act on.</dd></div>
          <div><dt>A social thread</dt><dd>Ends in heat, then silence, and the same problem returns.</dd></div>
          <div className="can-row"><dt>CAN</dt><dd>Ends with a record: what was decided, why, what was done, and whether it worked.</dd></div>
        </dl>
        <p className="prose">
          The unit of work is a shared public condition, such as a failing
          service, a recurring hazard or a gap in a process. A personal story
          can be evidence of one, but CAN never takes individual cases.
        </p>
      </Section>

      <Section id="how" title="How a problem moves from evidence to outcome" wide>
        <ol className="steps">
          <li><div><h3>Prepare it</h3><p>The poster describes the public problem, the evidence from trusted sources, and what solved will mean. Nothing identifying anyone.</p></div></li>
          <li><div><h3>Volunteers review it</h3><p>Volunteers suggest improvements. The poster accepts or declines each one. Still private.</p></div></li>
          <li><div><h3>Publish it</h3><p>AI checks it against the rules the community wrote, then publishes it.</p></div></li>
          <li><div><h3>Work through the stages</h3><p>In each stage people offer options, a choice is made, the work is done and evidence is posted. Solution-focused only.</p></div></li>
          <li><div><h3>Prove it is solved</h3><p>A problem is solved only when every stage is done and the evidence meets the final finish line.</p></div></li>
          <li><div><h3>Archive the journey</h3><p>The whole journey, including what failed, becomes a path others can start from, adapted to their own laws and means.</p></div></li>
        </ol>
        <p className="prose">
          Publishing is planned to use an AI check against community written
          rules, after volunteer review. People can appeal every decision.
        </p>
        <p><ButtonLink href="/how-it-works/" variant="quiet">The full lifecycle</ButtonLink></p>
      </Section>

      <Section id="different" title="What makes it different" wide>
        <div className="cols">
          <ul className="rows">
            <li><strong>Solution-only discussion</strong><span className="d">Contributions must clarify, evidence or improve a lawful fix. Waits between posts are by design.</span></li>
            <li><strong>A public record of every decision</strong><span className="d">Reasons, rules applied and ways to appeal are always visible.</span></li>
            <li><strong>Stuck is an honest state</strong><span className="d">When documented work hits a blocker, the blocker and the next route are shown. No blame, no red.</span></li>
            <li><strong>Pseudonymous by design</strong><span className="d">A generated public name. Email is encrypted and never shown.</span></li>
          </ul>
          <ul className="rows">
            <li><strong>Law-aware moderation <Planned /></strong><span className="d">Rules that follow the affected place, written with qualified local reviewers.</span></li>
            <li><strong>Participation by connection <Planned /></strong><span className="d">People with a material connection to the problem lead the thread; experts and visitors contribute without steering it.</span></li>
            <li><strong>An archive of solved paths <Planned /></strong><span className="d">A finished problem, with what failed, becomes a path the next community can start from, adapted to its own laws.</span></li>
            <li><strong>Community-improved AI <Planned /></strong><span className="d">People help label and correct moderation gaps through masked, randomized review.</span></li>
          </ul>
        </div>
      </Section>

      <Section id="principles" title="Principles we are holding ourselves to" wide>
        <ul className="rows">
          <li><strong>Open source, open process.</strong> <span className="d">Specification, decisions and open questions are public.</span></li>
          <li><strong>Public problems, never individual cases.</strong> <span className="d">No advice, therapy, legal service or personal case management.</span></li>
          <li><strong>Progress you can check.</strong> <span className="d">Every claim of “solved” points to evidence.</span></li>
          <li><strong>People answer for decisions.</strong> <span className="d">AI may assist later. It never decides alone.</span></li>
          <li><strong>Improvable by design, not perfect by assumption.</strong> <span className="d">The platform fixes itself with the same process it offers everyone.</span></li>
        </ul>
        <p><Link href="/principles/">Read the principles and what we will never do</Link></p>
      </Section>

      <Section id="example" title="A worked example" wide>
        <div className="example">
          <Fictional />
          <h3>The dark crossing on the school route</h3>
          <p className="muted">
            The town of Alderbrook, its roads and everyone in this story are
            invented, to show the shape of the process.
          </p>
          <ul className="timeline">
            <li><Chip tone="pending">Prepare</Chip><span>A resident lays out that the signal at a school crossing stays dark after dusk, with dated photos, two repair tickets that were never answered, and what solved means: a working signal at night, checked twice. They plan two stages. No names.</span></li>
            <li><Chip tone="interim">Volunteer review</Chip><span>Volunteers suggest splitting the plan into a repair stage and an inspection stage, and sharpening the finish line. The poster accepts two suggestions and declines one, with a reason.</span></li>
            <li><Chip tone="active">Published</Chip><span>The AI check passes it against the community rules and it goes public.</span></li>
            <li><Chip tone="active">Stages</Chip><span>The repair stage runs first: options, a choice, the work, then a dated night photo as evidence. The inspection schedule was prepared in the meantime and starts once the repair is done.</span></li>
            <li><Chip tone="solved">Solved</Chip><span>Both stages are done and the evidence meets the final finish line. </span></li>
            <li><Chip tone="closed">Archive</Chip><span>The whole journey, including the repair that failed once, becomes a path the next town can start from, adapted to its own rules.</span></li>
          </ul>
        </div>
      </Section>

      <Section id="contribute" title="One hour. One problem. One step." wide>
        <p className="prose">
          You will not fix a public problem in an hour, and we do not claim
          you can. You can move one responsible step forward and stop there.
          Right now the problem to move is building CAN itself.
        </p>
        <ul className="rows">
          <li>Review one open question and add evidence or options.</li>
          <li>Pick up one plan unit sized for about an hour.</li>
          <li>Check one accessibility flow, or translate one approved passage.</li>
          <li>Improve one test, one doc, or one unclear sentence.</li>
        </ul>
        <p className="cta-row">
          <ButtonLink href="/contribute/">See where help is needed</ButtonLink>
          <RepoLink />
        </p>
      </Section>

      <Section id="questions" title="Questions we have not answered yet" wide>
        <p className="prose">
          We would rather show what is undecided than pretend. Each open
          question has a current default, why it matters and who can help
          answer it. A few examples, from {oq.length} so far:
        </p>
        <ul className="oq">
          {teaser.map((q) => (
            <li key={q.id}>
              <span className="id">{q.id}</span>
              <h3>{q.question}</h3>
              <p className="muted">{q.why}</p>
            </li>
          ))}
        </ul>
        <p><Link href="/open-questions/">See all open questions</Link></p>
      </Section>
    </>
  );
}
