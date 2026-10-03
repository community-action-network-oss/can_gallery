# Performance budget

Fast and non-tracking are enforced, not hoped for. Numbers live in `scripts/budget.mjs`; this file gives the reasons. Checked by `npm run check:budget` (static, over `out/`) and `npm run perf` (Chromium via Playwright, offline). Both run in `npm run verify`. No hosted measurement service, no analytics.

| Item | Budget | Why |
| --- | --- | --- |
| HTML per page | 30 KB gzipped | A reader on a slow phone sees text first. |
| JavaScript per page | 135 KB gzipped | See below. Pending founder review. |
| CSS per page | 30 KB gzipped | One small theme, no framework CSS dump. |
| Each image | 100 KB | No hero photos; pictograms are inline SVG. |
| Fonts | none | System fonts only. |
| Third-party origins | zero | Reader privacy (D-67/D-68 only relax this, see below). |
| LCP | 2.5 s | Measured under slow 4G (1.6 Mbps, 150 ms) and 4x CPU throttle. |
| CLS | 0.1 | Same profile. |
| Console errors | none | Same profile. |

## JavaScript: 135 KB, pending founder review

The budget was 100 KB, raised to 130 KB by 06-u16 to account for gluestack-ui. It is now 135 KB for this reason only: the Next 16 and React 19 runtime is the measured floor.

Measured on 2026-10-03, gzipped, module scripts the browser fetches (a `nomodule` legacy polyfill file of 38.5 KB is in the HTML but is never fetched by a browser that runs modules, so it is not counted):

| | Before (all script tags) | After |
| --- | --- | --- |
| Plain pages (home, how-it-works, roadmap, ...) | 172.9 KB | 130.3 KB |
| `/docs/<slug>/` | 175.8 KB | 133.7 KB |
| `/docs/` | 180.3 KB | 132.5 KB |
| `/docs/view/` | 176.0 KB | 133.9 KB |

What the 130.3 KB is: React DOM about 70 KB, the Next client and app router about 47 KB, the Turbopack loader about 4 KB, router and error boundaries about 9 KB. The gallery's own code on a plain page is under 1 KB. The 135 KB number is the 130.3 KB floor plus under 5 KB for the live document client code (D-66 to D-70) that only docs pages load.

Cuts made: `next/link` replaced by a plain anchor (`src/components/A.tsx`, about 7 KB, full page loads, works without JS); `Unfold` and `DeeperMenu` are server components (the hash-opens-it script is one inline snippet in the layout); the 47 KB built document list is imported lazily by `LiveExtras` instead of shipping in `/docs/`. Tried and rejected: a modern `browserslist` (no change), a custom `global-error` (no change).

Remaining excess over the old 130 KB is the irreducible framework runtime. Reaching it would need dropping the Next app router, which is a founder decision. Do not relax further to pass a unit.

## HTML: known exceptions (open founder review item)

`check:budget` enforces 30 KB gzipped HTML on every page except two, listed in `HTML_EXCEPTIONS` in `scripts/budget.mjs` with a ceiling that may only go down:

| Page | HTML gzipped | Why |
| --- | --- | --- |
| `/contribute/tasks/` | about 212 KB | 328 generated task cards. Next embeds each page a second time as inline data for hydration, so the list counts twice. |
| `/docs/` | about 6.8 KB, no longer an exception | Now a short index of eight groups. Each group lists its documents on `/docs/section/<id>/`, the largest (open questions, policy) about 14.6 KB gzipped. Was 33.5 KB as one list of 360 documents. |
| `/open-questions/` | about 48 KB | Every open question with its detail. |

The budget number is not relaxed. Fixing these means splitting each list over several pages or loading it after the page, which changes what the pages are. The check fails if one of them drops under 30 KB so the entry is removed.

## Third-party origins

Allowed in HTML and CSS: `https://github.com/` as an anchor, and the W3C XML namespace string inside inline SVG (not a request). The live document fetches (`raw.githubusercontent.com`, `api.github.com`, repos `community_action_network_oss` and `can_policy`) exist only on `/docs/` pages in the built JS and are pinned by `check:out`. `perf` blocks every non-local request in the browser, fails on any attempt outside those two hosts on docs routes, and treats the failed fetch as the offline error state.

## Other checks in `check:budget`

No `<script src>` with a remote origin; every `img` has width, height and alt; no font files; no `document.cookie =` or `localStorage.setItem` in built JS.

## Measured, slow 4G profile (`npm run perf`)

LCP 1.4 to 1.8 s and CLS 0 to 0.045 on every sampled route (plain pages: CLS 0). The local server sends files uncompressed, so these numbers are a little pessimistic.
