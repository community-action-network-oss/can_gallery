/*
 * Mockup (small screen)
 *   [ AI-executed community policy ]  h1 + lede
 *   [ Rules > AI run > Explanation > Appeal > Rule change ]  flow, labelled list
 *   People write the rules          Planned
 *     lead sentence
 *     [+ Show more]  ...  Source: docs/design/ai/...
 *   ... six sections ... then "twelve decision points" unfold
 */
import type { Metadata } from "next";
import Link from "@/components/A";
import { localePath } from "@/lib/paths";
import { DocRef, PageHead, Planned, Section } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import { DECISION_POINTS, FLOW, SECTIONS } from "@/content/policy-explainer";
import "./community-policy.css";

export const metadata: Metadata = {
  title: "Community policy",
  description: "People write the rules, an AI applies them and explains each decision, and appeals stay easy. A plain-words explainer of the planned design.",
};

export default function Page() {
  return (
    <>
      <PageHead
        title="People write the rules, the AI applies them"
        lede="Planned: the community writes and ratifies the rules in public. An AI then applies them the same way every time, says which rule it used, and answers to appeal. None of this is running yet."
      />

      <Section id="flow" title="The loop, in five steps" wide>
        <ol className="flow" aria-label="The loop: rules, AI run, explanation, appeal, rule change">
          {FLOW.map((f) => (<li key={f.label}><strong>{f.label}</strong>{f.plain}</li>))}
        </ol>
        <p className="prose">Appeals feed back into the rules, so the loop closes. See <Link href={localePath("/how-it-works/")}>how it works</Link> for the stages of a problem.</p>
      </Section>

      {SECTIONS.map((s) => (
        <Section key={s.id} id={s.id} title={s.title}>
          <p>{s.lead} <Planned /></p>
          <Unfold id={`${s.id}-detail`} summary="More detail and sources">
            {s.more.map((m) => (<p key={m}>{m}</p>))}
            <p className="small muted">Source: {s.docs.map((d, i) => (<span key={d}>{i > 0 && ", "}<DocRef path={d} /></span>))}</p>
          </Unfold>
        </Section>
      ))}

      <Section id="points" title="What the AI is asked">
        <p>Each question below is a decision point with written examples and an evaluation set. <Planned /></p>
        <Unfold id="points-detail" summary="The twelve decision points">
          <ul className="dp">{DECISION_POINTS.map((d) => (<li key={d}>{d}</li>))}</ul>
          <p className="small muted">Source: <DocRef path="docs/design/ai/decision-points.md" />.</p>
        </Unfold>
      </Section>
    </>
  );
}
