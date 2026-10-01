# can_gallery

The public gallery of the Community Action Network (CAN). Like the public gallery in a parliament or court, it is an observation area: anyone can see what is going on inside CAN (plans, decisions, open questions, progress) and learn what CAN is. It is read-only; visitors cannot act here. It is also the Phase 0A public concept page and founding-contributor explainer. Next.js static export, plain CSS, no forms, no cookies, no analytics, no third-party requests. Developer-first; nothing here handles real problems.

## Run

```
npm install
npm run dev        # http://localhost:3000
```

Node 24 or newer.

## Verify

```
npm run verify
```

Runs: `sync:check` (fails if synced content would change), `lint`, `typecheck`, `build` (writes `out/`), and `check:out` (no `<form`, no analytics, no external hosts except github.com, no em or en dashes in rendered HTML, all six routes present).

## Routes

`/`, `/how-it-works/`, `/contribute/`, `/open-questions/`, `/roadmap/`, `/principles/`.

## Content sync

`npm run sync:content` copies `../docs/design/ux/tokens.json` to `src/content/tokens.json`, generates `src/app/tokens.css` (CSS variables with a `prefers-color-scheme` block), and compiles `../docs/open-questions/OQ-*.md` headers into `src/content/open-questions.json`. Outputs are committed so the repo builds standalone. Never edit them by hand; change the source in `docs/` and re-run. The lifecycle labels in `src/content/stages.ts` are a copy of `docs/spec/01-slice-1-brief.md`; update them when that table changes.

## Repository link

`src/config/site.ts` holds `REPO_URL`, the GitHub superproject (`https://github.com/community-action-network-oss/community_action_network_oss`). Doc references and repository links derive from it. `check:out` allows exactly one external host, `github.com`, and only as an `<a href>` over https.

## Rules

- No em or en dashes in copy. Examples are labelled "Fictional example". No real jurisdiction is named.
- Anything not built is labelled "Planned". Never imply the platform is live.
- No call to action without an owned channel: the repository and the open questions are the channel.
- No colour outside the tokens. System fonts only.

Contribution process: see [../CONTRIBUTING.md](../CONTRIBUTING.md).
