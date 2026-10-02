/*
 * Mockup (small screen)
 *   [ When the rules improve ]   h1 + lede (Planned)
 *   1 [ A rule or law changes ]  plain ordered list, four steps
 *   Four results   Keep / Annotate / Reopen / Hold   (Planned) [+ Show more]
 *   The visible notice  "Reopened under policy vX"  (Planned) [+ Show more]
 *   Feasibility (Planned, open question)  [+ Show more] Source: DocRef
 *   Fictional example x2
 */
import type { Metadata } from "next";
import Link from "next/link";
import { localePath } from "@/lib/paths";
import { DocRef, Fictional, PageHead, Planned, Section } from "@/components/ui";
import { Unfold } from "@/components/Unfold";
import { CRITERIA, EXAMPLES, NOTICE, RESULTS, STAGES, STEPS } from "@/content/re-resolution";
import "./re-resolution.css";

export const metadata: Metadata = {
  title: "When the rules improve",
  description: "A plain explainer of the planned re-examination of past cases when a rule or law changes. Nothing here is running yet.",
};

export default function Page() {
  return (
    <>
      <PageHead
        title="When the rules improve, past cases are re-examined"
        lede="Planned: when a rule or a law changes, earlier results it touches are looked at again, and a problem reopens only when the conclusion changes and reopening is feasible. None of this is running yet."
      />

      <Section id="steps" title="What happens, in order" wide>
        <ol className="rr-list" aria-label="The four steps">
          {STEPS.map((s) => (<li key={s.id}><strong>{s.name}</strong><span>{s.plain}</span></li>))}
        </ol>
        <p className="prose">A rule or law change reaching rollout starts a review of earlier solved, closed, redirected and stuck problems. <Planned /></p>
        <Unfold id="steps-detail" summary="More detail and sources">
          <p>The review replays the new rule over those earlier results and their decision records. It is a planned design; the app and server only hold early placeholders for it.</p>
          <p className="small muted">Source: <DocRef path="docs/design/flows/re-resolution.md" />, <DocRef path="docs/adr/0013-retroactive-re-resolution.md" />, <DocRef path="docs/spec/01a-lifecycle.md" />.</p>
        </Unfold>
      </Section>

      <Section id="results" title="Four possible results">
        <ul>{RESULTS.map((r) => (<li key={r.name}><strong>{r.name}.</strong> {r.plain}</li>))}</ul>
        <p><Planned /></p>
        <Unfold id="results-detail" summary="More detail and sources">
          <p>Only a reopen changes the state of a problem. Keep, annotate and hold change no state.</p>
          <p className="small muted">Source: <DocRef path="docs/spec/01a-lifecycle.md" />, <DocRef path="docs/adr/0013-retroactive-re-resolution.md" />.</p>
        </Unfold>
      </Section>

      <Section id="notice" title="Never silent, never deleted, always appealable">
        <ul>{NOTICE.map((n) => (<li key={n}>{n}</li>))}</ul>
        <p><Planned /></p>
        <Unfold id="notice-detail" summary="What is re-examined, and what returns to work">
          <ul>{STAGES.map((n) => (<li key={n}>{n}</li>))}</ul>
          <p className="small muted">Source: <DocRef path="docs/spec/constitution/rules.md" />, <DocRef path="docs/spec/01a-lifecycle.md" />, <DocRef path="docs/design/flows/re-resolution.md" />.</p>
        </Unfold>
      </Section>

      <Section id="feasibility" title="When is reopening feasible?">
        <p>The working default has four checks. They are an open question, and you are invited to help answer it. <Planned /></p>
        <ol>{CRITERIA.map((c) => (<li key={c}>{c}</li>))}</ol>
        <p>Open question: <DocRef path="docs/open-questions/OQ-reresolution-feasibility.md" />. See also <Link href={localePath("/open-questions/")}>all open questions</Link>.</p>
        <Unfold id="feasibility-detail" summary="Sources">
          <p className="small muted">Source: <DocRef path="docs/open-questions/OQ-reresolution-feasibility.md" />, <DocRef path="docs/open-questions/OQ-policy-retroactivity.md" />, <DocRef path="docs/adr/0013-retroactive-re-resolution.md" />.</p>
        </Unfold>
      </Section>

      {EXAMPLES.map((e) => (
        <Section key={e.id} id={e.id} title={e.title}>
          <p><Fictional /> {e.text}</p>
        </Section>
      ))}

      <Section id="more" title="Related">
        <p>See <Link href={localePath("/community-policy/")}>community policy</Link> and <Link href={localePath("/lawful-everywhere/")}>lawful everywhere</Link>. Nothing here is legal advice.</p>
      </Section>
    </>
  );
}
