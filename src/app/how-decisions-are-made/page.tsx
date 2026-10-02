import type { Metadata } from "next";
import Link from "next/link";
import { localePath } from "@/lib/paths";
import { docUrl } from "@/config/site";
import { PageHead, Section, Planned, DocRef } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import log from "@/content/decisions.json";
import "./decisions.css";

export const metadata: Metadata = {
  title: "How decisions are made",
  description: "Which kind of decision needs which kind of process, how an open question becomes a decision, and the public list of decisions so far.",
};

const KINDS: [string, string][] = [
  ["A small bug fix", "A maintainer reviews it."],
  ["A choice that is easy to undo", "An engineering decision, or a short proposal."],
  ["A major new feature", "A public request for comments first."],
  ["A change to how data is shared between systems", "A versioned proposal that others can read and test."],
  ["A change to protected rights or the constitution", "The constitutional amendment process."],
  ["A security problem", "Private, coordinated disclosure and a fix before details are public."],
  ["An experiment", "A time limited trial with success and rollback criteria written down first."],
  ["A rule used to review content", "An approved, versioned policy pack with the review evidence attached."],
];

const AI_RULES = [
  "A person stays accountable for every change they submit, and can explain it in their own words.",
  "AI help is disclosed, with the tool and how it was used. Private prompts are not required.",
  "AI output counts as untrusted until the person has read and tested it.",
  "Bulk, unattended or machine made submissions may be closed without a detailed review.",
  "AI review is advisory. It never replaces a required human approval, and nothing merges itself.",
  "Passing the automated checks is necessary but not enough: people still check intent and risk.",
];

export default function Page() {
  const shown = log.decisions;
  return (
    <>
      <PageHead
        title="How decisions are made"
        lede="Bigger decisions get more open processes. Anyone can read what has been decided, and anyone can ask a question that might become a decision."
      />
      <Section id="kinds" title="Which decision, which process" wide>
        <p className="prose">Not every choice needs the same care. A typo fix and a change to people&apos;s rights should not go through the same door. <Planned /></p>
        <ul className="dec-rows">
          {KINDS.map(([k, v]) => (
            <li key={k}><span className="k">{k}</span><span>{v}</span></li>
          ))}
        </ul>
        <Unfold id="kinds-detail" summary="Where this table comes from">
          <p>It is a plain-words version of the decision process in <DocRef path="docs/spec/21-open-source-governance.md" />. Anything not settled goes to the open questions, which are public work in their own right.</p>
        </Unfold>
      </Section>

      <Section id="flow" title="From a question to a decision">
        <ol className="dec-steps">
          <li><strong>A question is written down.</strong> It says why it matters and what the project does for now.</li>
          <li><strong>People discuss it in the open.</strong> Anyone with a view or some knowledge can add to it.</li>
          <li><strong>It is decided</strong> by the process for that kind of decision: the founder for now, shared with maintainers over time.</li>
          <li><strong>The decision is logged</strong> with its reason, and how to reverse it.</li>
        </ol>
        <p>See the <Link href={localePath("/open-questions/")}>open questions</Link> and pick one you know something about.</p>
      </Section>

      <Section id="founder" title="The founder&apos;s role, for now">
        <p>At the start the founder holds responsibility for scope, safety and release direction. That role is meant to be temporary, with limits and an end date still to be agreed. Reasons for big decisions are written down in public where that is safe. <Planned>Planned: shared with maintainers</Planned></p>
        <Unfold id="founder-detail" summary="What happens after the founder">
          <p>Reliable contributors are meant to take on owned areas, then a group of independent maintainers approves releases, and later an independent body may take over. None of that exists yet. The numbers for the end date are an open question: <DocRef path="docs/open-questions/OQ-founder-stewardship-sunset.md" />.</p>
        </Unfold>
      </Section>

      <Section id="ai" title="Work made with AI help">
        <p>AI tools are welcome as helpers, because they can make taking part easier. The person submitting remains responsible. These are the rules for now, until a full policy is adopted.</p>
        <ul>{AI_RULES.map((r) => <li key={r}>{r}</li>)}</ul>
        <Unfold id="ai-detail" summary="The full policy and the work still to do">
          <p>Read <DocRef path="docs/spec/22-ai-contribution-policy.md" /> for the principles, the list of policy work still open, and how risky areas such as sign-in and moderation need extra review. <Planned /></p>
        </Unfold>
      </Section>

      <Section id="record" title="The public record" wide>
        <p className="prose">Every decision so far is logged in the repository. Below are {shown.length} of the {log.total} headlines, as written. Reasons and reversal notes stay in the log itself. Some entries are left out because they are build progress notes, not decisions.</p>
        <Unfold id="headlines" summary={`${shown.length} decision headlines`}>
          <ul className="dec-rows">
            {shown.map((d) => (
              <li key={d.id}>
                <span className="k">{d.id}</span>
                <span>
                  {d.headline}
                  {d.adr.length > 0 && (
                    <span className="adr-links"> (ADR {d.adr.map((n, i) => {
                      const a = log.adrs.find((x) => x.n === n);
                      return <span key={n}>{i > 0 && ", "}{a ? <a href={docUrl(a.path)}>{n}</a> : n}</span>;
                    })})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p><a href={docUrl(log.source)}>Read the full log on GitHub</a></p>
        </Unfold>
        <Unfold id="adrs" summary={`${log.adrs.length} architecture decision records`}>
          <p>Architecture decision records are the longer, lasting write ups of the technical choices, each with context and how to reverse it.</p>
          <ul className="dec-rows">
            {log.adrs.map((a) => (
              <li key={a.n}>
                <span className="k"><a href={docUrl(a.path)}>ADR {a.n}</a></span>
                <span>{a.title}. <span className="adr-links">{a.status}</span></span>
              </li>
            ))}
          </ul>
          <p><a href={docUrl(log.adrIndex)}>Open the index on GitHub</a></p>
        </Unfold>
      </Section>
    </>
  );
}
