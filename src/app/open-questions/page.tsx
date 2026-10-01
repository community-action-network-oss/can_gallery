import type { Metadata } from "next";
import Link from "next/link";
import { DocRef, PageHead, Section } from "@/components/ui";
import oq from "@/content/open-questions.json";

export const metadata: Metadata = {
  title: "Open questions",
  description: "Decisions CAN has not made yet, each with a current default, why it matters and who can help.",
};

export default function Page() {
  return (
    <>
      <PageHead
        title="Open questions"
        lede={`${oq.length} things we have not settled. Each has a default so work can continue, and each is a place where your knowledge changes the project.`}
      />
      <Section id="list" title="How to help with one" wide>
        <p className="prose">
          Pick a question that matches what you know. Open its file, add
          evidence, options or trade-offs, and send a pull request. The
          maintainers record the outcome.
        </p>
        <ul className="oq">
          {oq.map((q) => (
            <li key={q.id} id={q.id}>
              <span className="id">{q.id}</span>
              <h3>{q.question}</h3>
              <dl>
                <div><dt>Why it matters</dt><dd>{q.why}</dd></div>
                <div><dt>Current default</dt><dd>{q.default}</dd></div>
                {q.roles.length > 0 && (
                  <div><dt>Who can help</dt><dd>{q.roles.join(", ")}</dd></div>
                )}
                <div><dt>File in the repository</dt><dd><DocRef path={q.file} /></dd></div>
                <div><dt>Read it here</dt><dd><Link href={`/docs/open-questions/${q.id}/`}>Read the full question</Link></dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
