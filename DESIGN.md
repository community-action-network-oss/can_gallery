---
name: CAN Gallery
description: A public explainer drawn as Isotype chart plates: flat pictograms on cool paper, counted by repetition, never scaled.
colors:
  paper: "#E9EEF2"
  plate: "#F4F7F9"
  paper-deep: "#DDE4EA"
  ink: "#1A1A1A"
  ink-muted: "#3F4A52"
  rule: "#BFC9D1"
  control-edge: "#5F6B74"
  cobalt: "#1F4FA3"
  ochre: "#A87413"
  green: "#2F7D4F"
  on-cobalt: "#FFFFFF"
typography:
  display:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', sans-serif"
    fontSize: "clamp(2rem, 3.2vw + 1rem, 3rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw + 0.9rem, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.15
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
rounded:
  square: "2px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-solid:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
    rounded: "{rounded.square}"
    height: "44px"
    padding: "0 20px"
  button-solid-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.cobalt}"
    rounded: "{rounded.square}"
    height: "44px"
    padding: "0 20px"
  plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "24px"
  brand-mark:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
    rounded: "{rounded.square}"
    height: "40px"
---

# Design System: CAN Gallery

## Overview

**Creative North Star: "The Chart Plate"**

Words divide, pictures unite. The gallery explains CAN as an Isotype picture language: each section is a plate with a title, a one-line legend and a caption, set on cool grey-blue paper in near-black ink. Figures are hand-authored SVG on one 24-unit grid (people by trade, problems by symbol, states by symbol) in one of three flat inks. Quantity is shown by repetition: one person with five problems is five symbols, never one big symbol.

The voice is calm, plain and unhurried. Type is the heavy system sans, flush left, sentence case. Surfaces are solid and square: 2px corners, solid fills, no shadows, no gradients. Detail is never removed; it opens on request through native details and summary.

**Key Characteristics:**
- Paper, ink and three pictogram inks only; status chips keep the shared status hue families.
- Counted, not scaled: repetition carries quantity.
- Square 2px corners and 2px ink rules; borders do the work shadows would.
- System fonts only, no downloads.
- Light first, dark by system preference, with lighter pictogram inks in dark.

## Colors

A cool grey-blue paper, near-black ink and three flat inks that never mix within one figure.

### Primary
- **Plate Cobalt** (#1F4FA3): the one action color. Solid button, brand mark, links, focus ring, step numerals, the "now" phase border. Dark mode lifts it to #7FA3E6.

### Secondary
- **Survey Ochre** (#A87413): pictogram ink for problem and state figures, and the lit rule on a hovered pair. The build uses #A87413 (not the contract's #C8902E) so it holds contrast as ink on paper. Dark mode #E0B25A.

### Tertiary
- **Field Green** (#2F7D4F): pictogram ink for outcomes and solved states. Dark mode #6FBF8D.

### Neutral
- **Chart Paper** (#E9EEF2): page ground; dark #14181C. Also the cut-out fill inside figures.
- **Plate Stock** (#F4F7F9): plate and panel surface; dark #1B2126.
- **Paper Shade** (#DDE4EA): code, footer, tinted sections; dark #222A31.
- **Near-Black Ink** (#1A1A1A): text and plate borders; dark #E9EEF2.
- **Muted Ink** (#3F4A52): legends, captions, secondary text; dark #B2BDC5.
- **Hairline** (#BFC9D1): dividers and quiet borders; dark #38434C.
- **Control Edge** (#5F6B74): borders of interactive controls; dark #8A97A1.

### Named Rules
**The Three Inks Rule.** Figures use cobalt, ochre or green, one per figure, solid. No fourth hue, no tints in light mode.

**The Status Hue Rule.** Chips take their colors only from the shared status families (pending, active, paused, stuck, solved and the rest). Stuck and paused are ordinary states and are never red.

## Typography

**Display Font:** system-ui stack (system-ui, -apple-system, Segoe UI, Roboto, Noto Sans)
**Body Font:** same stack
**Label/Mono Font:** ui-monospace, SF Mono, Menlo (code and ids only)

**Character:** One heavy sans doing everything. Weight, not a second family, separates headline from body.

### Hierarchy
- **Display** (800, clamp(2rem, 3.2vw + 1rem, 3rem), 1.08): home headline, max 24ch.
- **Headline** (700, clamp(1.5rem, 2.4vw + 0.9rem, 2.25rem), 1.15): section titles, max 24ch. Page heads run 750 up to 3.25rem.
- **Title** (800, 1.125rem): plate titles; step titles 1.25rem.
- **Body** (400, 1rem, 1.55): running text, measure about 42.5rem; documents 1.0625rem at 1.65.
- **Label** (600 to 700, 0.8125 to 0.875rem): legends, captions, chips, "Show more" links.

### Named Rules
**The Flush Left Rule.** Everything aligns left, sentence case; headings use balanced wrapping and tight negative tracking.

## Layout

One centered column, max 72rem, 1rem side padding. Reading text caps near 42.5rem. Spacing is a 4px-based scale (4, 8, 12, 16, 24, 32, 48, 64) from the shared tokens; sections use clamp(2.5rem, 6vw, 4.5rem) block padding separated by hairlines. Interactive targets are at least 44px. The home plate shows five person-to-problem pairs in five columns from 48rem and stacks into pairs on phones. No horizontal scroll at 320px. Tables scroll inside their own wrapper.

## Elevation & Depth

Flat. Depth comes from solid fills, a 2px ink border on plates and the open "Go deeper" list, and 1px hairlines elsewhere. No shadows, no gradients, no blur.

### Named Rules
**The Flat Plate Rule.** A surface is separated by border or tone, never by shadow.

## Shapes

Square with a hair of softening: every radius token resolves to 2px, including the pill token. Pictograms are flat solid silhouettes on a 24-unit grid, with paper-colored cut-outs for interior detail and at most six shapes per figure. Rules between people and problems are 2px lines.

## Components

### Buttons
- **Shape:** square (2px), 44px minimum height, 20px side padding, 2px border, semibold.
- **Primary (solid):** cobalt fill, white text. Hover inverts to ink fill with paper text.
- **Quiet:** transparent, cobalt border and text, hover tints to the background scale.
- **Focus:** 2px cobalt outline, 2px offset.

### Chips and tags
- Pill token renders square (2px). Colored by status family, label always carries the meaning. Planned uses the paused family; Fictional is a tag beside a label.

### Plate
- 2px ink border, plate stock fill, 24px padding, 2px corners. Title (800), legend line, figures, then a caption under a hairline.

### Navigation
- Brand mark is a 40px cobalt square with white initials. Inline nav with a native details "Go deeper" menu (2px ink border list). Targets 44px; tighter padding under 40rem.

### Unfold
- Native details. Summary row with a sentence and a visible underlined "Show more / Show less" label in link color. No JS.

### Pair (signature)
- Person figure, a 2px rule, a problem figure, caption. Hover or focus lights the rule in ochre, borders the pair in ink and dims the others to 45% opacity. Figures count in one by one on first view (480ms, staggered 140ms); static under reduced motion.

## Do's and Don'ts

### Do:
- **Do** draw new figures on the 24-unit grid, one ink, solid, six shapes or fewer, with paper cut-outs.
- **Do** show quantity by repeating a figure.
- **Do** give each new section a plate title, legend and caption.
- **Do** keep controls at 44px and honor reduced motion.
- **Do** label unbuilt things Planned and examples Fictional.

### Don't:
- **Don't** scale a figure to mean "more".
- **Don't** add shadows, gradients or radii above 2px.
- **Don't** use red for ordinary states.
- **Don't** add a font download or a fourth pictogram ink.
- **Don't** use em or en dashes in rendered text.
