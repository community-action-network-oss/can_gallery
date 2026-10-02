/*
 * Mockup (small screen)
 *   [ Lawful everywhere ]        h1 + lede  (Planned, not legal advice)
 *   [L0][L1][L2][L3][L4][L5][L6] stacked list, all apply together
 *   Layers apply together, not first-match.
 *   Three outcomes, each: lead + Planned, Fictional example,
 *     [+ Show more] ... Source: docs/...
 *   What is being built (list, Planned)
 */
import type { Metadata } from "next";
import Link from "next/link";
import { localePath } from "@/lib/paths";
import { DocRef, Fictional, PageHead, Planned, Section } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import { BUILDING, LAYERS, OUTCOMES } from "@/content/legal-stack";
import "./lawful-everywhere.css";

export const metadata: Metadata = {
  title: "Lawful everywhere",
  description: "A plain explainer of the planned legal layer stack: every layer from human rights to the city applies together. Not legal advice.",
};

export default function Page() {
  return (
    <>
      <PageHead
        title="Lawful everywhere, layer by layer"
        lede="Planned: CAN is designed to ask for nothing illegal anywhere, by checking every layer of law together. This page explains the idea. It is not legal advice, and none of it is running yet."
      />

      <Section id="stack" title="Seven layers, all at once" wide>
        <ol className="stack-list" aria-label="The seven layers, from L0 to L6">
          {LAYERS.map((l) => (<li key={l.id}><strong>{l.id}</strong> {l.name}<span>{l.plain}</span></li>))}
        </ol>
        <p className="prose">Layers apply together, not first-match. A lower layer may restrict further but never relax a higher one. <Planned /></p>
        <Unfold id="stack-detail" summary="More detail and sources">
          <p>This list is also the text equivalent of the layer picture: the layers are read from L0 at the top to L6 at the bottom.</p>
          <p className="small muted">Source: <DocRef path="docs/design/ai/legal-stack.md" />, <DocRef path="docs/adr/0012-legal-layer-stack.md" />.</p>
        </Unfold>
      </Section>

      {OUTCOMES.map((o) => (
        <Section key={o.id} id={o.id} title={o.title}>
          <p>{o.lead} <Planned /></p>
          <p><Fictional /> {o.example}</p>
          <Unfold id={`${o.id}-detail`} summary="More detail and sources">
            {o.more.map((m) => (<p key={m}>{m}</p>))}
            <p className="small muted">Source: {o.docs.map((d, i) => (<span key={d}>{i > 0 && ", "}<DocRef path={d} /></span>))}</p>
          </Unfold>
        </Section>
      ))}

      <Section id="building" title="What is being built, and what is not">
        <ul>{BUILDING.map((b) => (<li key={b}>{b}</li>))}</ul>
        <p>Nothing here is legal advice. See <Link href={localePath("/community-policy/")}>community policy</Link> for how the AI applies rules.</p>
        <Unfold id="building-detail" summary="Sources">
          <p className="small muted">Source: <DocRef path="docs/design/ai/legal-stack.md" />, <DocRef path="docs/design/ai/decision-points.md" />, <DocRef path="can_policy/packs/jurisdictions/fiktiva-city/sources.md" />.</p>
        </Unfold>
      </Section>
    </>
  );
}
