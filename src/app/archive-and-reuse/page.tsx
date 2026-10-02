/*
 * Mockup (small screen)
 *   [ The Archive and reuse ]   h1 + lede (Planned)
 *   What the Archive keeps (Planned)  list [+ Show more] Source
 *   How suggestions work (Planned)    list [+ Show more]
 *   The poster decides (Planned)      list
 *   Credit (Planned, open license question)
 *   Diagram: six boxes top to bottom with arrows
 *   Fictional example
 *   Honest limits
 */
import type { Metadata } from "next";
import Link from "@/components/A";
import { localePath } from "@/lib/paths";
import { DocRef, Fictional, PageHead, Planned, Section } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import { DECIDES, DIAGRAM_LABEL, DIAGRAM_STEPS, EXAMPLE, KEEPS, LIMITS, SUGGEST } from "@/content/archive-explainer";
import "./archive-and-reuse.css";

export const metadata: Metadata = {
  title: "The Archive and reuse",
  description: "A plain explainer of the planned public Archive of ended problems and how a new problem can start from what worked or failed elsewhere. Nothing here is built yet.",
};

const H = 46, GAP = 22;

export default function Page() {
  const total = DIAGRAM_STEPS.length * H + (DIAGRAM_STEPS.length - 1) * GAP + 4;
  return (
    <>
      <PageHead
        title="The Archive: solving common problems together"
        lede="Planned: every problem that ends, solved or not, goes into a public Archive with personal data removed, so a new problem can start from what worked or failed elsewhere. None of this is built yet."
      />

      <Section id="keeps" title="What the Archive keeps" wide>
        <p>The whole journey of an ended problem, with personal data removed. Failed paths are kept on purpose, because a path that failed is as useful as one that worked. <Planned /></p>
        <ul>{KEEPS.map((k) => (<li key={k}>{k}</li>))}</ul>
        <Unfold id="keeps-detail" summary="More detail and sources">
          <p>Every problem that reaches solved, closed, redirected or withdrawn after publication is archived, and so is a stuck problem, marked as unresolved. Problems that were rejected or never published stay private.</p>
          <p className="small muted">Source: <DocRef path="docs/spec/24-archive-reuse.md" />, <DocRef path="docs/adr/0017-archive-and-path-reuse.md" />.</p>
        </Unfold>
      </Section>

      <Section id="suggestions" title="How suggestions work">
        <p>While a poster prepares a problem, the AI looks for similar ended problems. <Planned /></p>
        <ul>{SUGGEST.map((s) => (<li key={s}>{s}</li>))}</ul>
        <Unfold id="suggestions-detail" summary="More detail and sources">
          <p>A suggestion that fails the legality check is shown as unusable, with the reason, and is never hidden. The search runs on the poster&apos;s own draft only.</p>
          <p className="small muted">Source: <DocRef path="docs/spec/24-archive-reuse.md" />, <DocRef path="docs/design/ai/archive-reuse.md" />.</p>
        </Unfold>
      </Section>

      <Section id="decides" title="The poster decides">
        <ul>{DECIDES.map((d) => (<li key={d}>{d}</li>))}</ul>
        <p><Planned /></p>
        <Unfold id="decides-detail" summary="Sources">
          <p>Strong Archive evidence can speed up a review, because reviewers see the similar paths. It never replaces the review.</p>
          <p className="small muted">Source: <DocRef path="docs/spec/24-archive-reuse.md" />, <DocRef path="docs/spec/constitution/ch04-resolution-lifecycle.md" />.</p>
        </Unfold>
      </Section>

      <Section id="credit" title="Credit is always kept">
        <p>Every suggestion and every stage plan drawn from one links back to its source case. <Planned /></p>
        <p>The default license is CC BY 4.0, and that is an open question you are invited to help answer: <DocRef path="docs/open-questions/OQ-contribution-license.md" />. See also <Link href={localePath("/open-questions/")}>all open questions</Link>.</p>
        <Unfold id="credit-detail" summary="Sources">
          <p className="small muted">Source: <DocRef path="docs/spec/24-archive-reuse.md" />, <DocRef path="docs/open-questions/OQ-contribution-license.md" />.</p>
        </Unfold>
      </Section>

      <Section id="diagram" title="The idea in one picture">
        <svg className="ar-diagram" viewBox={`0 0 320 ${total}`} role="img" aria-label={DIAGRAM_LABEL}>
          {DIAGRAM_STEPS.map((t, i) => {
            const y = 2 + i * (H + GAP);
            return (
              <g key={t}>
                <rect x="2" y={y} width="316" height={H} rx="4" />
                <text x="160" y={y + H / 2 + 5} textAnchor="middle">{t}</text>
                {i < DIAGRAM_STEPS.length - 1 && (
                  <>
                    <path d={`M160 ${y + H} V${y + H + GAP - 2}`} />
                    <path className="head" d={`M154 ${y + H + GAP - 8} L160 ${y + H + GAP} L166 ${y + H + GAP - 8}z`} />
                  </>
                )}
              </g>
            );
          })}
        </svg>
        <p><Planned /></p>
      </Section>

      <Section id="example" title="An example">
        <p><Fictional /> {EXAMPLE}</p>
      </Section>

      <Section id="limits" title="Honest limits">
        <ul>{LIMITS.map((l) => (<li key={l}>{l}</li>))}</ul>
        <p>Nothing here is legal advice, and CAN is not an emergency or government service. See also <Link href={localePath("/lawful-everywhere/")}>lawful everywhere</Link> and <Link href={localePath("/proof/")}>how CAN proves its rules</Link>.</p>
      </Section>
    </>
  );
}
