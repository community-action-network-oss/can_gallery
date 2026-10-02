import { localePath } from "@/lib/paths";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink, Chip, Fictional, Planned, RepoLink } from "@/components/ui";
import { PathRail } from "@/components/Path";
import { Pictogram, Plate, type PictogramName, type Ink } from "@/components/Pictogram";
import { Unfold } from "@/components/Unfold";
import { PITCH_TWO } from "@/content/pitch";
import oq from "@/content/open-questions.json";

const TEASER = ["OQ-hosting-region", "OQ-decision-method", "OQ-launch-jurisdiction-language"];

const PAIRS: { who: string; person: PictogramName; problem: PictogramName; says: string }[] = [
  { who: "A nurse", person: "nurse", problem: "clinic", says: "knows why a clinic waiting list is so hard to see into." },
  { who: "A cook", person: "cook", problem: "water", says: "knows that a drinking fountain has been dry for months." },
  { who: "A clerk", person: "clerk", problem: "bus", says: "knows which bus route skips a whole housing estate." },
  { who: "An electrician", person: "electrician", problem: "crossing", says: "knows how to fix a crossing signal that stays dark at night." },
  { who: "A student", person: "student", problem: "school", says: "knows that a school has no step free way in." },
];

const FIVE: { name: PictogramName; label: string }[] = [
  { name: "clinic", label: "a clinic" },
  { name: "bus", label: "a bus route" },
  { name: "crossing", label: "a crossing" },
  { name: "school", label: "a school" },
  { name: "water", label: "a water supply" },
];

const STEPS: { id: string; title: string; text: string; from: number; to: number; fig: PictogramName; ink: Ink }[] = [
  { id: "s1", title: "Someone notices a problem", text: "A shared public problem is written down with evidence, and nothing that identifies anyone.", from: 0, to: 1, fig: "noticed", ink: "ochre" },
  { id: "s2", title: "People who know help shape it", text: "Volunteers suggest improvements. The person who wrote it accepts or declines each one.", from: 1, to: 2, fig: "shaped", ink: "cobalt" },
  { id: "s3", title: "It gets fixed, step by step, with proof", text: "The work runs in stages. Each stage ends with evidence anyone can check.", from: 2, to: 5, fig: "fixed", ink: "green" },
  { id: "s4", title: "The fix is kept for others", text: "The whole journey, including what failed, is saved so the next town can start from it.", from: 5, to: 6, fig: "kept", ink: "cobalt" },
];

export default function Home() {
  const teaser = TEASER.map((id) => oq.find((q) => q.id === id)).filter((q) => q !== undefined);
  return (
    <>
      <section className="hero" aria-labelledby="hero-h">
        <div className="wrap">
          <h1 id="hero-h">Whatever you know, a public problem needs it.</h1>
          <Plate
            title="Five people, five problems"
            legend="Each figure is one person or one problem."
            caption={<><Fictional /> None of this is real. Point at a person, or tab to one, to light its match.</>}
          >
            <ol className="pairs">
              {PAIRS.map((p, i) => (
                <li className="pair" key={p.person} tabIndex={0} style={{ "--i": i } as CSSProperties}>
                  <Pictogram name={p.person} ink="cobalt" size={56} />
                  <span className="pair-rule" aria-hidden="true" />
                  <Pictogram name={p.problem} ink="ochre" size={56} />
                  <p className="pair-cap"><strong>{p.who}</strong> {p.says}</p>
                </li>
              ))}
            </ol>
          </Plate>
          <div className="hero-foot">
          <div className="hero-copy">
          <p className="lede">
            CAN is a place where people with every kind of know-how help fix
            problems that affect a whole community.
          </p>
          <p className="status-line"><strong>Being built. Nothing is live yet.</strong> CAN is not an emergency service. If someone is in danger, call your local emergency number.</p>
          </div>
          <div className="cta-row">
            <ButtonLink href="#where-you-fit">See where you fit</ButtonLink>
          </div>
          </div>
        </div>
      </section>

      <section className="section" id="where-you-fit" aria-labelledby="where-you-fit-h">
        <div className="wrap">
          <h2 id="where-you-fit-h">One person, a few problems, solved properly <Planned /></h2>
          <div className="stack">
            <Plate
              title="One person, five problems"
              legend="Each problem symbol is one problem. Counted, not scaled."
              caption={<><Fictional /> A person shares what they know, and sees a handful of public problems they could move. Not a long list.</>}
            >
              <div className="one-five">
                <Pictogram name="nurse" ink="cobalt" size={120} />
                <span className="one-rule" aria-hidden="true" />
                <ul className="five">
                  {FIVE.map((f) => (
                    <li key={f.name}><Pictogram name={f.name} ink="ochre" size={80} /><span>{f.label}</span></li>
                  ))}
                </ul>
              </div>
            </Plate>
            <p className="prose">
              You tell CAN what you know and can give, in a short guided list.
              Your answers stay on your own phone, and the matching happens
              there too. Nothing guesses what will keep you scrolling, because
              there is no feed.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="journey" aria-labelledby="journey-t">
        <div className="wrap">
          <h2 id="journey-t">How a problem gets solved <Planned /></h2>
          <p className="journey-title">The path every public problem will follow</p>
          <ol className="plain-steps">
            {STEPS.map((st, i) => (
              <li key={st.id}>
                <Pictogram name={st.fig} ink={st.ink} size={40} />
                <h3 id={`${st.id}-h`}>{st.title}</h3>
                <p>{st.text}</p>
                <Unfold summary={`What happens at step ${i + 1}, in detail`}>
                  <PathRail labelledBy={`${st.id}-h`} from={st.from} to={st.to} />
                </Unfold>
              </li>
            ))}
          </ol>
          <p className="journey-foot">
            This is the planned design, not a live product. Along the way a
            problem can also be paused, stuck, redirected or closed, always
            with the reason shown. See{" "}
            <Link href={localePath("/how-it-works/")}>how it works</Link>.
          </p>
        </div>
      </section>

      <section className="section" id="deeper" aria-labelledby="deeper-h">
        <div className="wrap">
          <h2 id="deeper-h">Go deeper</h2>
          <div className="stack">
            <ul className="cta-links deeper-links">
              <li><Link href={localePath("/how-it-works/")}>How it works</Link></li>
              <li><Link href={localePath("/principles/")}>Principles</Link></li>
              <li><Link href={localePath("/contribute/")}>Help build it</Link></li>
              <li><Link href={localePath("/open-questions/")}>Read the open questions</Link></li>
              <li><RepoLink /></li>
            </ul>
            <div className="unfolds">
              <Unfold id="about" summary="What CAN is, and what it is not">
                <p>
                  CAN is an open source platform where a public problem moves from
                  evidence, to a lawful solution, to a verified and tracked outcome.
                  Every step in the open. Every decision on record.
                </p>
                <p className="status-note">
                  <strong>Where things stand</strong>
                  This is a concept with early scaffolding. Nothing here handles real
                  problems yet. CAN is not an emergency, legal, medical, government
                  or individual case service. If someone is in danger, contact your
                  local emergency number.
                </p>
              </Unfold>
              <Unfold id="why" summary="Most public channels end with a post. CAN is built to end with a result.">
                <p className="contrast-lead">
                  <span className="frustration">Complaints, petitions and endless threads rarely fix anything.</span>{" "}
                  <strong>Let’s build what does.</strong>
                </p>
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
              </Unfold>
              <Unfold id="how" summary="How a problem moves from evidence to outcome">
        <ol className="steps">
          <li><div><h3>Prepare it</h3><p>The poster describes the public problem, the evidence from trusted sources, and what solved will mean. Nothing identifying anyone.</p></div></li>
          <li><div><h3>Volunteers review it</h3><p>Volunteers suggest improvements. The poster accepts or declines each one. Still private.</p></div></li>
          <li><div><h3>Publish it</h3><p>AI checks it against the rules the community wrote, then publishes it.</p></div></li>
          <li><div><h3>Work through the stages</h3><p>In each stage people offer options, a choice is made, the work is done and evidence is posted. Solution-focused only.</p></div></li>
          <li><div><h3>Prove it is solved</h3><p>A problem is solved only when every stage is done and the evidence meets the final finish line.</p></div></li>
          <li><div><h3>Archive the journey</h3><p>The whole journey, including what failed, becomes a path others can start from, adapted to their own laws and means.</p></div></li>
        </ol>
        <p className="prose">
          Planned: after volunteer review, an AI applies rules the community
          wrote before publication, on every update and afterwards, and explains
          each decision. People can appeal every decision.
          {" "}<Link href={localePath("/community-policy/")}>How the AI applies the rules</Link>
        </p>
        <p><ButtonLink href={localePath("/how-it-works/")} variant="quiet">The full lifecycle</ButtonLink></p>
              </Unfold>
              <Unfold id="different" summary="What makes it different">
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
            <li><strong>Community-improved AI <Planned /></strong><span className="d">People help label and correct gaps in how the AI applies the rules, through masked, randomized review.</span></li>
          </ul>
        </div>
              </Unfold>
              <Unfold id="principles" summary="Principles we are holding ourselves to">
        <ul className="rows">
          <li><strong>Open source, open process.</strong> <span className="d">Specification, decisions and open questions are public.</span></li>
          <li><strong>Public problems, never individual cases.</strong> <span className="d">No advice, therapy, legal service or personal case management.</span></li>
          <li><strong>Progress you can check.</strong> <span className="d">Every claim of “solved” points to evidence.</span></li>
          <li><strong>The community writes the rules.</strong> <span className="d">An AI applies them and explains each decision <Planned />. It never makes policy, and appeals stay open to everyone.</span></li>
          <li><strong>Improvable by design, not perfect by assumption.</strong> <span className="d">The platform fixes itself with the same process it offers everyone.</span></li>
        </ul>
        <p><Link href={localePath("/principles/")}>Read the principles and what we will never do</Link></p>
              </Unfold>
              <Unfold id="example" summary="A worked example">
        <div className="example">
          <Fictional />
          <h3>The dark crossing on the school route</h3>
          <p className="muted">
            The town of Alderbrook, its roads and everyone in this story are
            invented, to show the shape of the process.
          </p>
          <ul className="timeline">
            <li><Chip tone="pending">Prepare</Chip><span>A resident lays out that the signal at a school crossing stays dark after dusk, with dated photos, two repair tickets that were never answered, and what solved means: a working signal at night, checked twice. They plan two stages. No names.</span></li>
            <li><Chip tone="transitional">Volunteer review</Chip><span>Volunteers suggest splitting the plan into a repair stage and an inspection stage, and sharpening the finish line. The poster accepts two suggestions and declines one, with a reason.</span></li>
            <li><Chip tone="active">Published</Chip><span>The AI check passes it against the community rules and it goes public.</span></li>
            <li><Chip tone="active">Stages</Chip><span>The repair stage runs first: options, a choice, the work, then a dated night photo as evidence. The inspection schedule was prepared in the meantime and starts once the repair is done.</span></li>
            <li><Chip tone="solved">Solved</Chip><span>Both stages are done and the evidence meets the final finish line. </span></li>
            <li><Chip tone="closed">Archive</Chip><span>The whole journey, including the repair that failed once, becomes a path the next town can start from, adapted to its own rules.</span></li>
          </ul>
        </div>
              </Unfold>
              <Unfold id="contribute" summary="One hour. One problem. One step.">
        <p className="prose">{PITCH_TWO}</p>
        <p className="prose">
          You will not fix a public problem in an hour, and we do not claim
          you can. You can move one responsible step forward and stop there.
        </p>
        <ul className="rows">
          <li>Review one open question and add evidence or options.</li>
          <li>Pick up one plan unit sized for about an hour.</li>
          <li>Check one accessibility flow, or translate one approved passage.</li>
          <li>Improve one test, one doc, or one unclear sentence.</li>
        </ul>
        <p className="cta-row">
          <ButtonLink href={localePath("/contribute/")}>See where help is needed</ButtonLink>
          <RepoLink />
        </p>
              </Unfold>
              <Unfold id="questions" summary="Questions we have not answered yet">
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
        <p><Link href={localePath("/open-questions/")}>See all open questions</Link></p>
              </Unfold>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
