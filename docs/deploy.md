# Deploying the gallery

The gallery is a static site. This page is the whole checklist; no host, domain or region is chosen yet. Nothing here has been deployed. The first real deploy is founder-gated (06-u11, 06-u14).

## Build

```
npm ci
SITE_URL=<final public origin> npm run build     # writes out/
npm run check:deploy -- --release                # fails if any page still points at localhost
```

- Output folder: `out/`. Upload its contents to the root of the host, unchanged.
- Without `SITE_URL` the build uses `http://localhost:3000` for social-preview URLs. That is fine for checks and wrong for a real deploy.
- No build needs a secret. There is no server code, form, cookie or analytics.

## What the host must provide

- **404 page:** serve `404.html` with status 404 for unknown paths.
- **Trailing slashes:** pages are folders (`/how-it-works/index.html`), because the site is built with `trailingSlash: true` (ADR 0003). The host should serve `/how-it-works/` and may redirect `/how-it-works` to it.
- **Security headers:** every response carries the headers in `deploy/headers.txt`. The file explains how to convert them for each host type. The CSP allows inline scripts because the static export writes them; see the note in the file.
- **HTTPS** with automatic redirect from HTTP.
- **Cache:** files under `/_next/static/` are fingerprinted and may be cached for a year; HTML should be revalidated.
- **Document reader:** `/docs/*` pages fetch documents from GitHub in the visitor's browser (D-67, D-68). The CSP `connect-src` lists the two GitHub hosts and nothing else.

## Host types compared

None is chosen. All three serve `out/` unchanged, so leaving is a re-upload.

| | Object storage with CDN | Static site host | Repository pages |
|---|---|---|---|
| Visitor IPs | Seen by the CDN | Seen by the host | Seen by the platform |
| Logs | You control retention, often off by default | Vendor defaults, check retention | Not available to us |
| Cost to the project | Pay per use, small; needs a payment account | Often a free tier; terms can change | Free |
| Custom headers (CSP, noindex) | Yes | Usually via a headers file | Usually no |
| Ease of leaving | Easy | Easy | Easy, but the URL changes |

The platform is non-monetary (`docs/spec/20-participation-nonmonetary.md`), so a free tier or low flat cost is preferred, and a paid account must not make the project depend on one vendor. Repository pages cannot set the required headers, which weighs against it.

## Open questions

- **OQ-domain:** no domain or brand yet. Do not buy one or hard-code one. When answered, set `SITE_URL` and the host's domain; no source change is needed.
- **OQ-hosting-region:** hosting provider and region are open. Pick one with an EU region if visitor IPs are logged, then record the answer in the register.

## Search engines

Stay out of search results until the founder decides. `deploy/headers.txt` sends `X-Robots-Tag: noindex, nofollow`. To open the site, delete that line, redeploy and mention it in the decision log.

## Rollback

Every deploy is a build of one commit. To roll back, check out the previous good commit, rebuild with the same `SITE_URL`, run `npm run verify`, and upload `out/` over the live files. Keep the last known good `out/` when the host allows versions.

## Before the first deploy

1. `npm run verify` passes on the commit being shipped.
2. `SITE_URL=<origin> npm run build && npm run check:deploy -- --release` passes.
3. Headers are set and a test request shows them (`curl -I`).
4. `/`, a deep page, `/docs/` and a missing path (expect the 404 page) all load.
5. The JS budget review (`docs/performance-budget.md`) is settled by the founder.
