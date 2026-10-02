# Phase 0A content audit

Audited against the current pages (home in three layers, where-you-fit, how-it-works, principles, contribute, open-questions, roadmap, docs, shell) on 2026-10-02, with the Unfold content included because it stays in the HTML. Criteria and bullets come from `docs/spec/18-phases-gates.md`. Claim ids refer to `docs/claims.md`. No browser was available, so accessibility, performance and layout items are judged from code and `check:out` only.

## Acceptance criteria

| # | Criterion | Status | Evidence | Follow-up |
|---|---|---|---|---|
| A1 | The public can understand mission, scope, stage, safeguards, ways to help | met | Home lede and three layers; shell strip (C-001); principles page (C-049 to C-054); contribute page | none |
| A2 | No language implies the platform handles real problems | met | C-001, C-006, C-007; every unbuilt thing carries Planned or Fictional; `check:copy` bans liveness phrases; the false "developers wanted" and "one fictional place" lines were fixed (C-005, C-033, C-065) | none |
| A3 | Every call to contribute maps to a maintained task, owner, review process, outcome | partly | Contribute links units in `plans/`, good-first-units and onboarding; role tasks (accessibility, translation, legal) have no named catalog entry or owner | 06-u03, 06-u04, 06-u05 |
| A4 | Accessibility, privacy, security, analytics, localization, performance, non-tracking | partly | No forms, cookies or analytics (C-004, `check:out`); skip link and one h1 per page in code; English only; JS budget and screen reader pass unmeasured | 06-u02, 06-u08, 06-u09 |
| A5 | Every profession welcome; engineers most urgent, lawyers and policy experts needed for `can_policy` | partly | Every profession is welcome (contribute lede, role list). The site does not say engineers are most urgent and does not mention `can_policy` or policy packs as a place for lawyers | 06-u04, 06-u05, 06-u17 |
| A6 | Contributors reach repository and setup without a paid AI tool | met | Contribute "with or without a paid AI tool", clone command, C-056, AI section | none |

## Phase 0A list

| Bullet | Status | Evidence | Follow-up |
|---|---|---|---|
| Public and structural problems addressed | met | Home pictograms and worked example (fictional); scope line C-019 | none |
| Why protest, complaint, petition, social channels are not enough | met | Home Unfold "Most public channels end with a post" (complaint board, petition, social thread) | none |
| Complete problem-to-verified-outcome vision | met | Home journey, how-it-works lifecycle (C-010 to C-012, C-021, C-031) | none |
| Constitutional principles and explicit non-goals | met | Principles: never list, precedence, eleven chapters (C-048 to C-054) | none |
| Centralized platform and later decentralization | met | Roadmap decentralization section (C-068) | none |
| Current stage and what does not exist | met | Shell strip, home status line, footer, "Where things stand" (C-001, C-006) | none |
| One hour, one problem, one step, no overpromise | met | Home Unfold "One hour. One problem. One step." says it will not fix a problem in an hour | none |
| Call for founding roles (engineers, designers, security and privacy, researchers, legal and policy, accessibility, translators, docs, infrastructure) | met | Contribute roles Unfold lists all eight kinds | none |
| Concrete bounded tasks, not "build everything" | partly | Role first tasks and one-hour units are named; no catalog page of live tasks | 06-u03 |
| How decisions, AI-assisted work and review are handled | met | Contribute builders Unfold: decisions, AI list, pull request review (C-058, C-061) | none |
| Links to charter, spec, roadmap, governance, code of conduct, security policy, repo, open questions | partly | Spec and decisions via /docs/, roadmap, repo and open questions linked. Code of conduct and security policy links were missing and are now added on contribute. No dedicated charter or governance link | 06-u06 |
| Get involved without personal data; interest channel is an open question | met | Repository plus open questions; no form (C-004); `OQ-promo-interest-channel` exists | 06-u11 |
| Transparent not-a-service statement | met | Shell strip, home (C-002, C-007), footer: emergency, legal, medical, government, individual case | none |

## Lifecycle v2, archive and location claims (W13)

- Stage plan and volunteer review (01a, 01b): present on home, how-it-works and `stages.ts`, sourced in C-010, C-011, C-032, C-035, C-044, C-045.
- Archive (24): public, personal data stripped, credit always are on the site (C-012, C-046, C-047). Never automatic is not stated on the site and is not claimed. The CC BY 4.0 default is not mentioned at all; it stays an open question (`OQ-contribution-license`), which the contribute and open-questions pages already link.
- Private location check (`docs/design/location/attestation.md`): the gallery makes no claim about coordinates, self-asserted location on web, or a zero-knowledge proof. The only location copy is "Only broad areas, and only if you choose." (C-030). Nothing to register or remove; a dedicated explainer is plan 06-u24.

## Fixes made to copy

1. Page description in `src/app/layout.tsx` said "developers wanted": contradicts the anyone-with-any-expertise audience. Replaced with the status line (C-005).
2. how-it-works and roadmap said the first build uses "one fictional place": D-56 supersedes that with synthetic evidence and an Amsterdam overlay. Now "made up evidence and no real participants" (C-033, C-034, C-065, C-066).
3. how-it-works said that with two or more moderators the appeal reviewer differs from the first decider. The appeal design uses an independent re-run by a different model or prompt variant instead, and no source has the moderator rule. Reworded (C-038, C-039).
4. how-it-works listed "secrets and obviously unsafe links" as deterministic checks, with no source for that list. Softened (C-040, C-041).
5. contribute said Docker and Python 3 were for server work; CONTRIBUTING.md does not say that. Fixed (C-056, C-057).
6. docs said "you always see the current text" though a failed fetch shows an unreachable notice. Dropped "always" (C-069, C-070).
7. roadmap called the indicative timing "a hypothesis"; the spec calls it a planning default. Reworded (C-067).
8. contribute gained links to the code of conduct and security policy.

No claim was removed for lack of any source.
