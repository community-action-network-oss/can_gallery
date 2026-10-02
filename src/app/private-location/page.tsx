/*
 * Mockup (small screen)
 *   [ Checking where you are, privately ]   h1 + lede (Planned)
 *   Why a label (Planned)        list
 *   How it works (Planned)       list [+ Show more] Source
 *   What it cannot do            list
 *   If the check fails or you say no
 *   The next step (Planned)
 *   What we never store          list
 *   Diagram: four boxes top to bottom with arrows
 *   Fictional example: resident, visitor, commuter
 */
import type { Metadata } from "next";
import Link from "next/link";
import { localePath } from "@/lib/paths";
import { DocRef, Fictional, PageHead, Planned, Section } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import { CANNOT, DIAGRAM_LABEL, DIAGRAM_STEPS, EXAMPLE_NOTE, EXAMPLE_ROWS, FAILS, HOW, NEVER, NEXT, WHY } from "@/content/location-explainer";
import "./private-location.css";

export const metadata: Metadata = {
  title: "The private location check",
  description: "A plain explainer of the planned private location check: how a message could be labelled impacted or guest without anyone learning where a person is. Nothing here is built yet.",
};

const H = 46, GAP = 22;

export default function Page() {
  const total = DIAGRAM_STEPS.length * H + (DIAGRAM_STEPS.length - 1) * GAP + 4;
  return (
    <>
      <PageHead
        title="Checking where you are, without telling anyone"
        lede="Planned: when you share a message about a problem, CAN could label it impacted or guest. No one learns where you are. Only the label is kept. None of this is built yet."
      />

      <Section id="why" title="Why a label" wide>
        <ul>{WHY.map((w) => (<li key={w}>{w}</li>))}</ul>
        <p><Planned /></p>
        <Unfold id="why-detail" summary="More detail and sources">
          <p>The Impacted only filter is off by default and only changes what a reader sees. Nothing is deleted or changed.</p>
          <p className="small muted">Source: <DocRef path="docs/spec/constitution/rules-legal-sim.md" />, <DocRef path="docs/design/location/attestation.md" />.</p>
        </Unfold>
      </Section>

      <Section id="how" title="How it works in the first version">
        <ul>{HOW.map((h) => (<li key={h}>{h}</li>))}</ul>
        <p><Planned /></p>
        <Unfold id="how-detail" summary="More detail and sources">
          <p>The device compares its position with the affected area, which is public and belongs to the problem. It sends back only a yes or no answer, tied to a short-lived request so it cannot be replayed. The answer is checked and the details are discarded.</p>
          <p className="small muted">Source: <DocRef path="docs/design/location/attestation.md" />, <DocRef path="docs/adr/0016-private-location-attestation.md" />.</p>
        </Unfold>
      </Section>

      <Section id="limits" title="What it cannot do">
        <ul>{CANNOT.map((c) => (<li key={c}>{c}</li>))}</ul>
        <p>Because of this, the page makes no claim that a location is proven. <Planned /></p>
        <Unfold id="limits-detail" summary="Sources and an open question">
          <p>Whether the web label should read Reported impacted is an open question you are invited to help answer: <DocRef path="docs/open-questions/OQ-impacted-label-web.md" />. See also <Link href={localePath("/open-questions/")}>all open questions</Link>.</p>
        </Unfold>
      </Section>

      <Section id="fails" title="If the check fails or you say no">
        <ul>{FAILS.map((f) => (<li key={f}>{f}</li>))}</ul>
        <p><Planned /></p>
        <Unfold id="fails-detail" summary="Sources">
          <p>If anything about the check looks doubtful, only that one message is shown as guest. Your account is not restricted and the reason is never an accusation.</p>
          <p className="small muted">Source: <DocRef path="docs/spec/constitution/rules-legal-sim.md" />.</p>
        </Unfold>
      </Section>

      <Section id="next" title="The next step, honestly">
        <p>{NEXT} <Planned /></p>
        <Unfold id="next-detail" summary="Sources">
          <p className="small muted">Source: <DocRef path="docs/design/location/attestation.md" />, <DocRef path="docs/adr/0016-private-location-attestation.md" />.</p>
        </Unfold>
      </Section>

      <Section id="never" title="What we never store">
        <ul>{NEVER.map((n) => (<li key={n}>{n}</li>))}</ul>
        <Unfold id="never-detail" summary="Sources">
          <p className="small muted">Source: <DocRef path="docs/spec/constitution/rules-legal-sim.md" />, <DocRef path="docs/design/location/attestation.md" />.</p>
        </Unfold>
      </Section>

      <Section id="diagram" title="The idea in one picture">
        <svg className="pl-diagram" viewBox={`0 0 320 ${total}`} role="img" aria-label={DIAGRAM_LABEL}>
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
        <p><Fictional /> Three people each send a message about the same made-up problem.</p>
        <ul>{EXAMPLE_ROWS.map(([who, label]) => (<li key={who}>{who}: {label}.</li>))}</ul>
        <p>{EXAMPLE_NOTE}</p>
        <p>Nothing here is legal advice, and CAN is not an emergency or government service. See also <Link href={localePath("/lawful-everywhere/")}>lawful everywhere</Link>.</p>
      </Section>
    </>
  );
}
