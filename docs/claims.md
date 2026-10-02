# Factual claims register (can_gallery)

Every factual sentence the gallery makes about what exists, what is planned, numbers, names or who decides has a row here. `npm run check:claims` fails if a source path is missing, an id repeats, or a supported or softened text no longer appears verbatim in `src/`. A removed row is the old text and must not appear in `src/`. Paths are in the superproject. Texts are short fragments that sit on one source line.

Status: supported (source says it), softened (reworded in the Phase 0A audit to match the source), removed (no source, deleted).

| id | page | text | source | status |
|---|---|---|---|---|
| C-001 | shell | Concept and early scaffolding. Nothing here handles real problems yet. | docs/spec/18-phases-gates.md | supported |
| C-002 | shell | government or individual case service. If someone is in danger | docs/spec/18-phases-gates.md | supported |
| C-003 | shell | MIT licensed: anyone may use, copy and adapt it. | DECISIONS.md | supported |
| C-004 | shell | This site has no forms, no cookies and no analytics. | docs/spec/18-phases-gates.md | supported |
| C-005 | layout | developers wanted | docs/spec/18-phases-gates.md | removed |
| C-006 | home | Being built. Nothing is live yet. | docs/spec/18-phases-gates.md | supported |
| C-007 | home | CAN is not an emergency service. If someone is in danger, call your local emergency number. | docs/spec/01-slice-1-brief.md | supported |
| C-008 | home | Your answers stay on your own phone, and the matching happens | docs/spec/26-capability-profile.md | supported |
| C-009 | home | there is no feed. | docs/spec/26-capability-profile.md | supported |
| C-010 | home | Volunteers suggest improvements. The person who wrote it accepts or declines each one. | docs/spec/01a-lifecycle.md | supported |
| C-011 | home | The work runs in stages. Each stage ends with evidence anyone can check. | docs/spec/01b-stages.md | supported |
| C-012 | home | The whole journey, including what failed, is saved so the next town can start from it. | docs/spec/24-archive-reuse.md | supported |
| C-013 | home | A shared public problem is written down with evidence, and nothing that identifies anyone. | docs/spec/03-scope.md | supported |
| C-014 | home | Waits between posts are by design. | docs/spec/01-slice-1-brief.md | supported |
| C-015 | home | A generated public name. Email is encrypted and never shown. | docs/spec/01-slice-1-brief.md | supported |
| C-016 | home | AI checks it against the rules the community wrote, then publishes it. | docs/spec/01a-lifecycle.md | supported |
| C-017 | home | People can appeal every decision. | docs/spec/constitution/ch05-ai-review-appeals.md | supported |
| C-018 | home | AI may assist later. It never decides alone. | docs/spec/constitution/ch05-ai-review-appeals.md | supported |
| C-019 | home | CAN never takes individual cases. | docs/spec/constitution/ch01-purpose-scope.md | supported |
| C-020 | home | The town of Alderbrook, its roads and everyone in this story are | docs/spec/18-phases-gates.md | supported |
| C-021 | home | A problem is solved only when every stage is done and the evidence meets the final finish line. | docs/spec/01a-lifecycle.md | supported |
| C-022 | home | Pick up one plan unit sized for about an hour. | docs/spec/18-phases-gates.md | supported |
| C-023 | where-you-fit | A short guided list. Every question can be skipped, and every answer can be changed later. | docs/spec/26-capability-profile.md | supported |
| C-024 | where-you-fit | Matching runs on your phone, against a public list that is the same for everyone. CAN receives nothing about you from it. | docs/spec/26-capability-profile.md | supported |
| C-025 | where-you-fit | Notices are opt in. They say only that new public problems exist | docs/spec/26-capability-profile.md | supported |
| C-026 | where-you-fit | You can see, change, export or delete everything, any time. | docs/spec/26-capability-profile.md | supported |
| C-027 | where-you-fit | If you lose your phone and made no backup, the profile is gone, on purpose. | docs/spec/26-capability-profile.md | supported |
| C-028 | where-you-fit | No name and no contact detail are stored in your profile. | docs/spec/26-capability-profile.md | supported |
| C-029 | where-you-fit | Taking part in a problem is public, like any contribution. Browsing and matching are not. | docs/spec/26-capability-profile.md | supported |
| C-030 | where-you-fit | Only broad areas, and only if you choose. | docs/spec/26-capability-profile.md | supported |
| C-031 | how-it-works | Every problem follows the same six steps, labelled Planned. | docs/spec/01a-lifecycle.md | supported |
| C-032 | how-it-works | stages can run one after another, side by side, or both | docs/spec/01b-stages.md | supported |
| C-033 | how-it-works | The first build uses one fictional place and fictional problems only. | docs/spec/01-slice-1-brief.md | removed |
| C-034 | how-it-works | The first build uses made up evidence and no real participants or personal data. | docs/spec/01-slice-1-brief.md | softened |
| C-035 | how-it-works | Volunteers review every problem in private before it is public, and the poster accepts or declines each suggestion. | docs/spec/01a-lifecycle.md | supported |
| C-036 | how-it-works | Rejected and withdrawn drafts are deleted on a date shown to you. | docs/spec/01a-lifecycle.md | supported |
| C-037 | how-it-works | You get a generated public name. Your email is encrypted and never shown. | docs/spec/01-slice-1-brief.md | supported |
| C-038 | how-it-works | When two or more moderators exist, the reviewer differs from the original decider | docs/design/flows/appeal.md | removed |
| C-039 | how-it-works | The appeal is re-checked independently, by a different model or prompt variant | docs/design/ai/appeals.md | softened |
| C-040 | how-it-works | Deterministic checks catch contact details, secrets and obviously unsafe links | docs/spec/01-slice-1-brief.md | removed |
| C-041 | how-it-works | Fixed checks run before anyone reviews, and catch things like contact details. | docs/spec/01-slice-1-brief.md | softened |
| C-042 | how-it-works | The AI publishing check <Planned /> follows the community written rules and is switched on only after evaluation. | docs/spec/06-moderation-geo-governance.md | supported |
| C-043 | how-it-works | Nobody is excluded in the first build. | docs/spec/01-slice-1-brief.md | supported |
| C-044 | stages | Guests from anywhere can help and are labelled as guests. | docs/spec/01-slice-1-brief.md | supported |
| C-045 | stages | Anyone can prepare later stages early, so work is ready when they start. | docs/spec/01b-stages.md | supported |
| C-046 | stages | Removes personal data, keeps what failed | docs/spec/24-archive-reuse.md | supported |
| C-047 | stages | Anyone can browse it and start from it, with credit. | docs/spec/24-archive-reuse.md | supported |
| C-048 | principles | Rights | docs/spec/constitution/README.md | supported |
| C-049 | principles | A lower item never overrides a higher one. | docs/spec/constitution/ch01-purpose-scope.md | supported |
| C-050 | principles | The constitution has eleven chapters | docs/spec/constitution/README.md | supported |
| C-051 | principles | Each article is tagged Decided, Position or Drafted | docs/spec/constitution/README.md | supported |
| C-052 | principles | CAN is non-monetary by design. | docs/spec/20-participation-nonmonetary.md | supported |
| C-053 | principles | Money buys no ranking, recommendation, moderation authority or governance weight. | docs/spec/constitution/ch01-purpose-scope.md | supported |
| C-054 | principles | Amendments, stewards and a founder role with an end date. | docs/spec/constitution/ch08-governance.md | supported |
| C-055 | contribute | Nobody is paid through the platform, nothing is for sale and | docs/spec/20-participation-nonmonetary.md | supported |
| C-056 | contribute | You need Node 24 or newer, Docker and Python 3. | CONTRIBUTING.md | softened |
| C-057 | contribute | Docker and Python 3 for the server work. | CONTRIBUTING.md | removed |
| C-058 | contribute | Maintainers confirm status. You propose by pull request; do not edit plan status yourself. | CONTRIBUTING.md | supported |
| C-059 | contribute | NestJS, Postgres, Drizzle | docs/spec/11-architecture.md | supported |
| C-060 | contribute | Next.js static export, plain CSS | docs/spec/11-architecture.md | supported |
| C-061 | contribute | Each has a current default, so work is never blocked waiting for an answer. | docs/spec/23-open-decisions.md | supported |
| C-062 | roadmap | Phase 6: Hardening and a controlled pilot | docs/spec/18-phases-gates.md | supported |
| C-063 | roadmap | Unrestricted intake opens only when the pilot bar is met and the founder approves evidence that it is safe. | docs/spec/18-phases-gates.md | supported |
| C-064 | roadmap | Off by default. Considered only after legal review, a neutrality evaluation and independent oversight exist. | docs/spec/constitution/ch11-elections.md | supported |
| C-065 | roadmap | All on fictional data, in one fictional place, invite-only | docs/spec/01-slice-1-brief.md | removed |
| C-066 | roadmap | All on made up evidence with no real participants, invite-only | docs/spec/01-slice-1-brief.md | softened |
| C-067 | roadmap | It is a planning default, not a promise. | docs/spec/18-phases-gates.md | softened |
| C-068 | roadmap | The first build only leaves room for it: portable identifiers, a | docs/spec/12-decentralization-ready.md | supported |
| C-069 | docs | Each page is fetched live, so you always see the current text. | docs/spec/18-phases-gates.md | removed |
| C-070 | docs | Each page is fetched live, so you see the current text. | docs/spec/18-phases-gates.md | softened |
| C-071 | contribute | CAN is a side project built so far mostly with AI coding assistants, to reach a working first version quickly | README.md | softened |
| C-072 | contribute | some of the code is not at its best yet. | CONTRIBUTING.md | softened |
| C-073 | contribute | making what exists solid: tests, structure, security, speed and readability, before new features. | CONTRIBUTING.md | softened |
| C-074 | how-decisions-are-made | "A maintainer reviews it." | docs/spec/21-open-source-governance.md | supported |
| C-075 | how-decisions-are-made | "An engineering decision, or a short proposal." | docs/spec/21-open-source-governance.md | supported |
| C-076 | how-decisions-are-made | "A public request for comments first." | docs/spec/21-open-source-governance.md | supported |
| C-077 | how-decisions-are-made | "A versioned proposal that others can read and test." | docs/spec/21-open-source-governance.md | supported |
| C-078 | how-decisions-are-made | "The constitutional amendment process." | docs/spec/21-open-source-governance.md | supported |
| C-079 | how-decisions-are-made | "Private, coordinated disclosure and a fix before details are public." | docs/spec/21-open-source-governance.md | supported |
| C-080 | how-decisions-are-made | "A time limited trial with success and rollback criteria written down first." | docs/spec/21-open-source-governance.md | supported |
| C-081 | how-decisions-are-made | "An approved, versioned policy pack with the review evidence attached." | docs/spec/21-open-source-governance.md | supported |
| C-082 | how-decisions-are-made | That role is meant to be temporary, with limits and an end date still to be agreed. | docs/spec/21-open-source-governance.md | supported |
| C-083 | how-decisions-are-made | AI review is advisory. It never replaces a required human approval, and nothing merges itself. | docs/spec/22-ai-contribution-policy.md | supported |
| C-084 | community-policy | At least one completed volunteer review is always required first. | docs/design/ai/archive-reuse.md | supported |
| C-085 | community-policy | If a check cannot finish, the problem is held back, never published. | docs/design/ai/README.md | supported |
| C-086 | community-policy | Nothing is removed silently. | docs/design/ai/README.md | supported |
| C-087 | community-policy | Someone in crisis is shown fixed, static help text. The AI never acts as a counsellor. | docs/design/ai/safety-and-privacy.md | supported |
| C-088 | community-policy | No pack has been ratified. | can_policy/packs/base/pack.yaml | supported |
