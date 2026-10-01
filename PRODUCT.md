# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Anyone with any expertise.** Nurses, hospitality workers, civil servants, trades people, teachers, students, lawyers, engineers. Everyone already knows something that some public problem needs. They arrive curious about a project that is not live yet. They should understand what CAN is, believe they belong in it, and want to wait for it, without feeling overwhelmed or underqualified.
- **People who live a problem.** They want a shared public condition fixed, not personal help.
- **Contributors building CAN.** Engineers, designers, policy and legal people, translators and researchers. They need to understand the vision well enough to build it the way it is meant to work.

## Product Purpose

CAN is an open-source platform where a public problem moves from evidence, to a lawful solution, to a verified and tracked outcome. When it ends, the whole journey goes into a public archive that other communities can start from. Success means problems are actually solved, and that each person works on the few problems they can genuinely move. One person, maybe five problems, solved properly.

## Positioning

- **People are matched to problems by what they say they can do.** At sign-up, CAN asks in a structured way what a person knows and can give, the languages they speak, the places they are connected to and what affects them. It then shows them only the problems where they can make a real difference.
- **The profile lives on the person's device.** The matching happens there too. The server never receives the profile, and nothing in it identifies the person.
- **There is no engagement algorithm.** CAN does not guess what keeps someone scrolling, and it ranks nothing by engagement.
- **The community writes the rules, and AI applies them to every post** with the reason shown. People can appeal any decision.

## Operating Context

- Today, CAN is a specification, a constitution and early scaffolding. Nothing handles real problems.
- `can_gallery` is the read-only public gallery and explainer site: a static Next.js export.
- `can_app` is the universal app; `can_server` is the API.
- The work is planned as a corpus of plan units (`plans/`), and decisions are recorded in `DECISIONS.md`.

## Capabilities and Constraints

- Status rules for every surface:
  - Never imply that CAN is live.
  - CAN is not an emergency, legal, medical, government or individual case service.
  - Anything not yet built is labelled Planned.
  - Examples are labelled fictional.
- Gallery limits for Phase 0A:
  - No forms, cookies or analytics.
  - No third-party requests, except the live document fetches from GitHub (D-70).
  - System fonts only, with no font downloads.
  - github.com is the only external link host.
  - No em or en dashes in rendered text.
- gluestack-ui is the component system (D-50). The gallery customises the component sources it generates.
- Personal data:
  - No personally identifiable information in profiles.
  - Participation is pseudonymous, with a generated public name.
  - Location is proven on the device without revealing where the person is (ADR 0016).
- Undecided, tracked in `docs/open-questions/`:
  - the capability taxonomy;
  - using a profile across several devices;
  - the channel for match notices;
  - who sets the "help needed" tags on a problem.

## Brand Commitments

- Tone: calm, warm, plain and honest. No hype.
- Short sentences, concrete verbs, and say what happens next.
- No stock crowds, clenched fists or megaphones.
- No streaks, badges, counts as status or infinite scroll.
- No red for ordinary states. Stuck and paused are normal and never read as blame.
- Every page should make sense to someone with no technical background.

## Evidence on Hand

- `manifesto.md`, `docs/spec/`, `docs/spec/constitution/`, `DECISIONS.md` and the open questions are all real, public material.
- The examples are fictional. One is the town of Alderbrook. The four seed problems name Amsterdam, use synthetic evidence and are always labelled that way.
- There are no users, testimonials, partners, metrics or deployments, and none may be invented.

## Product Principles

1. **Solved over touched.** Depth beats reach: a few problems, done properly.
2. **Come as you are.** Every kind of expertise counts, and nobody has to qualify to belong.
3. **Ask, never guess.** People say what they can do. Nothing is inferred from behaviour.
4. **Unfold, don't flood.** Show what matters now, and let detail open on request.
5. **Honest about state.** What is planned is labelled planned, and what is stuck is shown stuck.

## Accessibility & Inclusion

- WCAG 2.2 AA.
- Usable on old phones and slow connections.
- No horizontal scroll at 320 px.
- Respects reduced motion.
- Colour never carries meaning alone.
- Plain language a non-specialist can read. The site is built to be translated later, so it must support many scripts.
