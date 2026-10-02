import { localePath } from "@/lib/paths";
import type { Metadata } from "next";
import Link from "next/link";
import { DocRef, PageHead, Planned, Section } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import oq from "@/content/open-questions.json";
import "./open-questions.css";

export const metadata: Metadata = {
  title: "Open questions",
  description: "Decisions CAN has not made yet, each with a current default, why it matters and who can help.",
};

type Q = (typeof oq)[number];

// Themes are by id, so the synced JSON stays the single source. Any id not listed lands in the last group, so none is ever dropped.
const GROUPS: { id: string; title: string; blurb: string; ids: string[] }[] = [
  { id: "privacy", title: "Privacy and your data", blurb: "What is kept, for how long, and who can see it.",
    ids: ["account-deletion-retention", "archive-retention", "draft-ttl", "visibility-classes", "handle-scope", "handle-word-lists", "h3-resolution", "location-verification", "profile-multi-device", "guest-read-search-indexing", "edit-after-publication", "legal-data-requests", "age-default"] },
  { id: "matching", title: "What you know, and being shown problems", blurb: "How a person describes their skills and hears about problems they could help with.",
    ids: ["capability-taxonomy", "help-needed-tags", "match-notify-channel", "impacted-label-web", "impact-decision-weight", "native-device-testing", "promo-interest-channel"] },
  { id: "review", title: "Checking and moderating", blurb: "How volunteers and the AI check what people send in, and how that stays fair.",
    ids: ["review-quorum", "review-wait-statement", "reviewer-eligibility", "moderator-pool-size", "moderator-signin", "moderation-confidence-threshold", "dp-confidence-thresholds", "graduation-criteria", "label-task-panel", "lane-oversight", "bias-monitoring", "persona-realism-bias", "replay-diff-sample-size", "unsupported-language", "cross-language-reuse", "evidence-tier-plain-language", "emergency-routing"] },
  { id: "problems", title: "Problems, evidence and solving", blurb: "What counts as a public problem, what counts as proof, and how a choice is made.",
    ids: ["eligible-categories", "duplicate-handling", "trusted-sources", "solved-evidence-threshold", "decision-method", "stage-decision-method", "content-schema-design", "cooldown-lengths", "limits", "human-presence", "boundary-data", "news-ledger"] },
  { id: "rules", title: "Rules, law and who decides", blurb: "How the rules are made, changed and reviewed, and who holds the project's assets.",
    ids: ["legal-corpus-sourcing", "legal-layer-conflicts", "legal-policy-reviewers", "supranational-default", "amsterdam-overlay-review", "launch-jurisdiction-language", "rights-core-amendment", "policy-pr-rights", "policy-retroactivity", "ratification-method", "reremoderation-grace", "reresolution-feasibility", "founder-stewardship-sunset", "steward-entity-grants", "mera-disclosure", "contribution-license"] },
  { id: "running", title: "Running the project", blurb: "Names, hosting, security contacts and technical choices.", ids: [] },
];
const listed = new Set(GROUPS.flatMap((g) => g.ids.map((i) => `OQ-${i}`)));
const rest = oq.filter((q) => !listed.has(q.id));
const grouped = GROUPS.map((g) => ({
  ...g,
  items: [...g.ids.map((i) => oq.find((q) => q.id === `OQ-${i}`)).filter((q): q is Q => !!q), ...(g.id === "running" ? rest : [])],
}));

// Build fails if grouping ever drops or duplicates a question.
if (grouped.reduce((n, g) => n + g.items.length, 0) !== oq.length) throw new Error("open-questions grouping does not cover every question");

function Question({ q }: { q: Q }) {
  return (
    <li id={q.id}>
      <span className="id">{q.id}</span>
      <h3>{q.question}</h3>
      <dl>
        <div><dt>Why it matters</dt><dd>{q.why}</dd></div>
        <div><dt>Current default</dt><dd>{q.default}</dd></div>
        {q.roles.length > 0 && (
          <div><dt>Who can help</dt><dd>{q.roles.join(", ")}</dd></div>
        )}
        <div><dt>File in the repository</dt><dd><DocRef path={q.file} /></dd></div>
        <div><dt>Read it here</dt><dd><Link href={localePath(`/docs/open-questions/${q.id}/`)} aria-label={`Read the full question ${q.id}`}>Read the full question</Link></dd></div>
      </dl>
    </li>
  );
}

export default function Page() {
  return (
    <>
      <PageHead
        title="Open questions"
        lede={`${oq.length} things we have not settled. Each has a default so work can continue, and each is a place where your knowledge changes the project.`}
      />
      <Section id="why" title="Why we show what is undecided">
        <p>
          A project that hides its doubts asks you to trust it blindly. We would
          rather show you where we are unsure, so the people who know the
          subject can tell us what we are missing. You do not need to be a
          specialist in computers. A nurse, a cook, a clerk or a lawyer often
          sees the gap first.
        </p>
        <p className="small muted">
          Every question below sits in one of {grouped.length} groups. Open a
          group to read its questions. Nothing here is decided, and none of it
          is running yet <Planned />.
        </p>
      </Section>
      <Section id="list" title="How to help with one" wide>
        <p className="prose">
          Pick a question that matches what you know. Open its file, add
          evidence, options or trade-offs, and send a pull request. The
          maintainers record the outcome.
        </p>
        <div className="oq-groups">
          {grouped.filter((g) => g.items.length > 0).map((g) => (
            <Unfold key={g.id} id={`oq-${g.id}`} summary={<><strong>{g.title}</strong>, {g.items.length} questions. {g.blurb}</>}>
              <ul className="oq">
                {g.items.map((q) => <Question key={q.id} q={q} />)}
              </ul>
            </Unfold>
          ))}
        </div>
      </Section>
    </>
  );
}
