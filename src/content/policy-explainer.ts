export type PolicySection = {
  id: string;
  title: string;
  lead: string;
  more: string[];
  docs: string[];
};

export const FLOW: { label: string; plain: string }[] = [
  { label: "Rules", plain: "People write them" },
  { label: "AI run", plain: "Applies them" },
  { label: "Explanation", plain: "Names the rule" },
  { label: "Appeal", plain: "Checked again" },
  { label: "Rule change", plain: "People amend" },
];

export const DECISION_POINTS = [
  "Is the person eligible", "Is the problem framed well", "Is it a duplicate", "Is a contribution relevant",
  "Does it keep people private", "Is naming handled safely", "Is the tone constructive", "Is someone in crisis",
  "Is it lawful", "What does the legal layer say", "Is the decision record complete", "Is the evidence verified",
];

export const SECTIONS: PolicySection[] = [
  {
    id: "rules",
    title: "People write the rules",
    lead: "The rules for what may be published live in a public policy pack. Anyone can propose a change, and nobody judges a single post by hand.",
    more: [
      "A change arrives as a pull request. It is checked by an evaluation, replayed against past decisions to see what would have changed, ratified by people, then rolled out in stages.",
      "Today the policy repository holds a base pack and a constitution pack with protected rights rules, plus formats for problems, contributions, stages, appeals, policy proposals, review recommendations, the archive and decision records. All of it is draft. No pack has been ratified.",
      "There are twelve decision points so far, each with examples and an evaluation set, and an invented test place called Fiktiva City for trying rules out.",
    ],
    docs: ["docs/design/ai/README.md", "docs/design/ai/policy-pack.md", "docs/design/ai/amendment-loop.md", "docs/adr/0008-ai-executed-community-policy.md"],
  },
  {
    id: "applies",
    title: "The AI applies them",
    lead: "After volunteers have reviewed a problem, the AI checks it against the rules before it is published, and again on every edit and plan change.",
    more: [
      "At least one completed volunteer review is always required first. The AI is also asked again on the evidence each stage submits, and when the rules or the facts change.",
      "In plain words it asks: are the sources trusted, are the acceptance criteria measurable and lawful, is the stage plan well formed, did the evidence meet the criteria. The stages are on the page about how it works.",
      "If a check cannot finish, the problem is held back, never published. The AI advises and applies written rules. It does not decide alone, and its output is one part of a process that people wrote.",
    ],
    docs: ["docs/design/ai/triggers.md", "docs/design/ai/decision-points.md", "docs/design/ai/runtime.md"],
  },
  {
    id: "explained",
    title: "Every decision is explained",
    lead: "A decision names the rule that was applied, the version of the rules, and how to appeal it.",
    more: [
      "Where the law applies, it also names the legal layer. It points at the part of the post it is about and says what would make it acceptable.",
      "Nothing is removed silently. If a later rule change flips a result, the post says it was re-reviewed under the new version, with a reason and a way to appeal.",
    ],
    docs: ["docs/design/ai/README.md", "docs/design/ai/legal-stack.md"],
  },
  {
    id: "appeals",
    title: "Appeals are independent",
    lead: "Appealing stays easy. A second check, with a different model and prompt, looks again.",
    more: [
      "A disputed case then becomes an anonymous, context masked label task for people. Their answer can become a new example, and a proposal to change the rule. The appeal rights are protected rules that a policy change cannot weaken.",
      "Someone in crisis is shown fixed, static help text. The AI never acts as a counsellor.",
    ],
    docs: ["docs/design/ai/appeals.md", "docs/design/ai/safety-and-privacy.md"],
  },
  {
    id: "humans",
    title: "People step in for emergencies and legal process",
    lead: "A small, logged lane exists for emergencies and legal process. It is not a general moderation desk.",
    more: [
      "People do not override single posts by hand. The one exception is that lane, and its use is recorded and audited.",
      "This site is not an emergency, legal, medical or government service.",
    ],
    docs: ["docs/design/ai/appeals.md"],
  },
  {
    id: "structured",
    title: "Structured content everywhere",
    lead: "There is no free form posting. Each kind of post has a shape the community decided in advance.",
    more: [
      "The shape asks for facts, causes, affected people, scope, lawful options, uncertainty and assumptions. A check holds back wrong assumptions and gives hints.",
      "AI may help fill the shape in. The person posting always confirms it.",
      "The archive of ended problems is the other main goal. Its page is still to come.",
    ],
    docs: ["docs/design/ai/structured-content.md", "docs/adr/0010-structured-content-everywhere.md"],
  },
];
