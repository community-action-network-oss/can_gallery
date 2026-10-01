---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/where-you-fit/page.tsx","src/app/how-it-works/page.tsx","src/app/contribute/page.tsx","src/app/principles/page.tsx","src/app/open-questions/page.tsx","src/app/roadmap/page.tsx","src/app/docs/page.tsx"]
---

# Surface brief: can_gallery (all routes)

## Scope and mode
Every gallery route, led by the home page `/` and the new `/where-you-fit/`. Mode: Persuade. Code-led (no image generation).

## Audience, job, action
Anyone with any expertise (nurse, cook, clerk, electrician, student, lawyer, engineer) meeting CAN for the first time, on a phone, curious. Job: understand what CAN is and believe they belong in it, then wait for it. Action: open "Where you fit", or go deeper. Contributors read the same pages and must leave knowing the vision: a few problems, solved properly, matched on the person's own device.

## Constraints
System fonts only. gluestack components, generated once and customised to this world. No forms, cookies, analytics or third-party requests (except the live docs fetch). No dashes. Planned and Fictional labels. No red for ordinary states. No horizontal scroll at 320 px. Reduced motion respected. 130 KB gz JS per page. Gradual unfolding everywhere: nothing removed, detail opens on request with native details/summary.

## Direction contract
THESIS: Words divide, pictures unite. The gallery explains CAN as an Isotype picture language: counted flat pictograms that anyone reads without a glossary. It refuses the category default of hero, three icon steps and an FAQ.
OWN-WORLD: Chart plates on a cool grey-blue paper ground (#E9EEF2 light, #14181C dark) with near-black ink (#1A1A1A). Three flat pictogram inks only: cobalt #1F4FA3, ochre #C8902E, green #2F7D4F (lighter tints in dark mode). Hand-authored SVG figures on one 24-unit grid: people by trade, problems by symbol, states by symbol. Quantity is shown by repetition, never by scaling. Every section is a plate with a title, a one-line legend ("each figure is one person") and a caption. Heavy system sans, flush left, sentence case. Square corners (2px), solid fills, no shadows, no gradients. Status chips keep the shared hue families.
STORY: The visitor understands that whatever they know, some public problem needs it. They believe that CAN asks rather than guesses, keeps their profile on their own phone, and wants a few problems solved properly, and that it is not live yet. They then open "Where you fit".
FIRST VIEWPORT: The headline "Whatever you know, a public problem needs it." sits top left, at about 3rem on desktop. Below it, a full-width plate shows five people figures (nurse, cook, clerk, electrician, student), each joined by a thin ink rule down to one fictional problem symbol, labelled "Fictional example". Under the plate come one plain sentence on what CAN is, a status line ("Being built. Nothing is live yet.") and the primary action, a solid cobalt "See where you fit" button. On phones the plate stacks into person-to-problem pairs. Signature interaction: focusing or hovering a person lights its rule and problem and updates the caption. Without JS, every pair stays captioned. Motion: the figures count in one by one on first view, and are static under reduced motion.
FORM: Isotype public pictograms. Kind: IMPECCABLE'S PICK, rank 1 of 7 on the grounded list. Seed key 667a61fe.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable moment
"One person, five problems": a single figure with exactly five problem symbols beside it, counted, not scaled.

## Unresolved
The pictogram set has to be drawn: at least 8 trades and 6 problem symbols, plus state symbols.
