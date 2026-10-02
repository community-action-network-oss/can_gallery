/*
 * Mockup (small screen)
 *   [ How CAN proves its rules ]   h1 + lede (Planned, nothing has been run)
 *   1 [ Personas are programs ]    plain ordered list, three steps
 *   What they attack (Planned)     [+ Show more] Source: DocRef
 *   Before the public joins (Planned, defaults to be ratified)  [+ Show more]
 *   Results (Planned, none yet)    [+ Show more]
 *   Four seed cards  "Seed problem, synthetic evidence" + stage plan (Planned)
 */
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/A";
import { localePath } from "@/lib/paths";
import { DocRef, PageHead, Planned, Section } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import { ATTACKS, GRADUATION, PERSONAS, SEEDS, SEED_LABEL } from "@/content/seeds";
import "./proof.css";

export const metadata: Metadata = pageMetadata("/proof/", "How CAN proves its rules", "A plain explainer of the planned persona simulation and the four seed problems. No simulation has been run and there are no results yet.");

export default function Page() {
  return (
    <>
      <PageHead
        title="How CAN plans to prove its rules before anyone real takes part"
        lede="Planned: computer personas play every role against the real pipeline and try to break it. No simulation has been run, and there are no results to show yet."
      />

      <Section id="personas" title="What personas are" wide>
        <ol className="proof-list" aria-label="About personas">
          {PERSONAS.map((p) => (<li key={p}>{p}</li>))}
        </ol>
        <p><Planned /></p>
        <Unfold id="personas-detail" summary="More detail and sources">
          <p>Early scaffolding exists for running these simulations, but it refuses to run until the server has a simulation mode, and that is not built.</p>
          <p className="small muted">Source: <DocRef path="docs/design/ai/simulation.md" />, <DocRef path="docs/adr/0011-persona-simulation-proof.md" />.</p>
        </Unfold>
      </Section>

      <Section id="attacks" title="What they try to break">
        <ul>{ATTACKS.map((a) => (<li key={a}>{a}</li>))}</ul>
        <p><Planned /></p>
        <Unfold id="attacks-detail" summary="Sources">
          <p>Every miss would become a labelled example that feeds the amendment loop, so the policy improves through the normal community process.</p>
          <p className="small muted">Source: <DocRef path="docs/design/ai/simulation.md" />.</p>
        </Unfold>
      </Section>

      <Section id="graduation" title="Before public participation opens">
        <p>These are defaults to be ratified by the community, not settled rules. <Planned /></p>
        <ol>{GRADUATION.map((g) => (<li key={g}>{g}</li>))}</ol>
        <Unfold id="graduation-detail" summary="How runs are made and who approves them">
          <p>Automated checks use a fake model, so they test the machinery and never the quality of a real model. Runs with real models are approved by the founder first.</p>
          <p className="small muted">Source: <DocRef path="docs/design/ai/simulation.md" />, <DocRef path="docs/adr/0011-persona-simulation-proof.md" />.</p>
        </Unfold>
      </Section>

      <Section id="results" title="Results">
        <p>There are no results yet. When real runs happen, the reports will be published here. <Planned /></p>
        <p>Until then, nothing on this site says the rules have been tested.</p>
      </Section>

      <Section id="seeds" title="The four seed problems">
        <p>The framings are real public topics. The evidence is synthetic, and no individual is named. The first build is Amsterdam, with synthetic evidence only. Seeds 1 and 2 come first, and seeds 3 and 4 wait for the problem graph. <Planned /></p>
        <div className="proof-cards">
          {SEEDS.map((s) => (
            <article key={s.n} className="proof-card" id={`seed-${s.n}`}>
              <p className="proof-label">{SEED_LABEL}</p>
              <p><strong>Seed {s.n}: {s.framing}</strong> <Planned /></p>
              {s.full && <p>{s.full}</p>}
              <p>Stage plan: {s.plan}</p>
              <p className="small muted">{s.when}.</p>
            </article>
          ))}
        </div>
        <Unfold id="seeds-detail" summary="Archive records and sources">
          <p>Every finished seed run would leave a labelled simulation record in the Archive that new problems can learn from. These records start the Archive cold, are shown with the seed label and are never mixed into outcome statistics.</p>
          <p className="small muted">Source: <DocRef path="docs/design/flows/seed-bootstrap.md" />, <DocRef path="docs/design/ai/simulation.md" />.</p>
        </Unfold>
      </Section>

      <Section id="more" title="Related">
        <p>See <Link href={localePath("/community-policy/")}>community policy</Link> and <Link href={localePath("/re-resolution/")}>when rules improve</Link>.</p>
      </Section>
    </>
  );
}
