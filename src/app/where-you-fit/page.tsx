import { localePath } from "@/lib/paths";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Fictional, Planned, PageHead, Section } from "@/components/ui";
import { Pictogram, Plate, type PictogramName } from "@/components/Pictogram";
import { Unfold } from "@/components/Unfold";
import "./where-you-fit.css";

export const metadata: Metadata = {
  title: "Where you fit",
  description: "Anyone can tell CAN what they know. Nobody is underqualified. CAN plans to show each person only the few problems they can move.",
};

type Shown = { problem: PictogramName; what: string; why: string };
const PEOPLE: { who: string; person: PictogramName; shown: Shown[] }[] = [
  {
    who: "A nurse",
    person: "nurse",
    shown: [
      { problem: "clinic", what: "A clinic waiting list nobody can see into", why: "A skill: she knows how waiting lists work." },
      { problem: "school", what: "A school with no step free way in", why: "A place: it is on her street." },
    ],
  },
  {
    who: "A hotel night manager",
    person: "manager",
    shown: [
      { problem: "bus", what: "A night bus that stops too early", why: "A skill: he knows who travels at night." },
      { problem: "crossing", what: "A crossing that stays dark", why: "A place: he walks it to work." },
      { problem: "water", what: "A dry drinking fountain", why: "A skill: he runs a building, so he knows how to report a fault." },
    ],
  },
  {
    who: "A council clerk",
    person: "clerk",
    shown: [
      { problem: "bus", what: "A route that skips a housing estate", why: "A skill: she knows how routes get approved." },
      { problem: "water", what: "A supply that fails every summer", why: "A place: her family lives there." },
    ],
  },
  {
    who: "A retired electrician",
    person: "electrician",
    shown: [
      { problem: "crossing", what: "A crossing signal that stays dark", why: "A skill: he has fixed this kind of fault." },
      { problem: "school", what: "A school corridor with failing lights", why: "A skill and a place: it is his old neighbourhood." },
    ],
  },
  {
    who: "A student who speaks two languages",
    person: "student",
    shown: [
      { problem: "clinic", what: "Clinic notices only in one language", why: "A language: she reads both." },
      { problem: "bus", what: "Bus timetables that few can read", why: "A language, and she rides the bus daily." },
    ],
  },
];

const ASKS = [
  { q: "What you know", a: "Plain groups, like care, food, repair, teaching or transport. No job title, no employer." },
  { q: "What you can give", a: "A little time each month, and the kind of help: local knowledge, a skill, translation, a second pair of eyes." },
  { q: "Languages", a: "The ones you read and speak." },
  { q: "Places you are connected to", a: "Only broad areas, and only if you choose." },
  { q: "What affects you", a: "Topics from the same list the public problems use." },
  { q: "Causes you care about", a: "Topics you pick from that list." },
];

export default function Page() {
  return (
    <>
      <PageHead
        title="You do not need to be an expert in problems"
        lede="You already know something a public problem needs. Where you work, what you speak, where you live: any of it can be the missing piece."
      />

      <Section id="people" title="Five people, and what each might be shown" wide>
        <p><Planned /> <Fictional /> None of these people are real, and CAN does not show anything yet.</p>
        <Plate title="Come as you are" legend="Each figure is one person. Each small symbol is one problem." caption={<>Nobody is underqualified. A skill, a language or a place is enough.</>}>
          <ul className="fit-list">
            {PEOPLE.map((p) => (
              <li key={p.who}>
                <div className="fit-who"><Pictogram name={p.person} ink="cobalt" size={56} /><span>{p.who}</span></div>
                <ul className="fit-shown">
                  {p.shown.map((s) => (
                    <li key={s.what}>
                      <Pictogram name={s.problem} ink="ochre" size={40} />
                      <span><strong>{s.what}</strong>{s.why}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Plate>
      </Section>

      <Section id="ask" title="What CAN will ask you" wide>
        <p><Planned /> A short guided list. Every question can be skipped, and every answer can be changed later. This page only shows the list, there is nothing to fill in here.</p>
        <ol className="ask-list">
          {ASKS.map((a) => (
            <li key={a.q}><strong>{a.q}</strong><span>{a.a}</span></li>
          ))}
        </ol>
      </Section>

      <Section id="private" title="It stays on your phone">
        <p><Planned /> Your answers are kept on your own phone, and the matching happens there too. This site has no form and keeps nothing about you.</p>
        <p>Nothing guesses what keeps you scrolling. What you open, linger on or skip is never used. Only what you chose to say shapes what you are shown. There is no feed, and the list always ends.</p>
        <Unfold id="privacy-detail" summary="The privacy detail">
          <ul>
            <li>No name and no contact detail are stored in your profile.</li>
            <li>Matching runs on your phone, against a public list that is the same for everyone. CAN receives nothing about you from it.</li>
            <li>Notices are opt in. They say only that new public problems exist, and your phone decides whether one fits you. No match, no notice.</li>
            <li>You can see, change, export or delete everything, any time. If you lose your phone and made no backup, the profile is gone, on purpose.</li>
            <li>Taking part in a problem is public, like any contribution. Browsing and matching are not.</li>
          </ul>
          <p>The design is written down in <Link href={localePath("/docs/spec/26-capability-profile/")}>the capability profile document</Link>.</p>
        </Unfold>
      </Section>

      <Section id="few" title="A few problems, done properly">
        <p><Planned /> The aim is one person and a handful of problems they can really move, not an endless list. Right now the problem to move is building CAN itself.</p>
        <p className="cta-row"><ButtonLink href={localePath("/contribute/")}>Help build it</ButtonLink></p>
      </Section>
    </>
  );
}
