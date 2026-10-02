# Accessibility report

Run: `npm run a11y` (needs `npm run build` first; offline; Chromium via Playwright). About 50 seconds, so it is part of `verify`.

## What it checks

Every route found in `out/` (docs pages sampled, 8 of them), in light and dark colour schemes:

- axe-core with tags wcag2a, wcag2aa, wcag21aa, wcag22aa (includes colour contrast); any violation fails.
- One h1, `lang` set, first Tab is a working skip link.
- Visible focus: the real Tab order is walked (up to 150 stops) and every stop must match `:focus-visible` and show an outline or shadow.
- No horizontal scroll at 320 px and at 640 px (200 percent zoom of a 1280 window).
- No looping animation under `prefers-reduced-motion`.
- The same link text never points to two different places.
- Nothing leaves localhost (external requests are aborted).

## Findings and fixes

- Focus: the first version of the check called `el.focus()` from script and read the style at once, while the outline transition was still at width 0, so about 800 links looked unfocused. A real keyboard Tab run shows a 2 px solid outline on all of them (global `:focus-visible` rule in `globals.css`). The check now walks the real Tab order with transitions off, which is stricter, not looser.
- Dark mode contrast: link text (`primary-600`, 4.08:1 on the footer surface) now uses `primary-500` in dark; same for the quiet button.
- Same link text, different targets: added `aria-label`s that start with the visible text on docs list links (adds the path), docs jump links, the task "unit file" link, the open question "Read the full question" link, and the principles "How it works" link.

## Open manual checks

- Screen reader pass on two routes (for example `/` and `/proof/`).
- Real-device pinch zoom.
