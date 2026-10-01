import type { Metadata } from "next";
import Link from "next/link";
import { DocRef, PageHead, RepoLink, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Who CAN needs, the three repositories, how to start in about an hour, and how decisions and AI-assisted work are handled.",
};

export default function Page() {
  return (
    <>
      <PageHead
        title="Help build CAN"
        lede="The first job is building the platform honestly. Work is cut into small, owned units so you can contribute in about an hour, with or without a paid AI tool."
      />

      <Section id="start" title="Start in about an hour" wide>
        <ol className="steps">
          <li><div><h3>Clone everything</h3><p>The root repository holds the specification, plans and decisions. The three code repositories are submodules.</p><pre><code>git clone --recurse-submodules &lt;repository-url&gt;</code></pre><p className="small"><RepoLink />. Until the remote exists, there is nothing to clone publicly.</p></div></li>
          <li><div><h3>Read <DocRef path="CONTRIBUTING.md" /></h3><p>Setup, commit conventions and how to pick work. You need Node 24 or newer; Docker and Python 3 for the server work.</p></div></li>
          <li><div><h3>Pick a unit from <DocRef path="plans/" /></h3><p>Each unit is sized at about one hour, links to the spec it implements and names how it is checked. Open a pull request that references the unit id.</p></div></li>
          <li><div><h3>Or answer an open question</h3><p>Add evidence, options and trade-offs to a file in <DocRef path="docs/open-questions/" />. No code needed. <Link href="/open-questions/">Browse them here</Link>.</p></div></li>
        </ol>
      </Section>

      <Section id="roles" title="Who we need" wide>
        <ul className="rows">
          <li><strong>Engineers</strong><span className="d">Server, app and site units from the plans: one endpoint, one screen, one test.</span></li>
          <li><strong>Designers and accessibility reviewers</strong><span className="d">Check one flow with a keyboard or screen reader. Improve tokens and screens.</span></li>
          <li><strong>Security and privacy specialists</strong><span className="d">Threat-model one boundary. Review how email, drafts and moderation notes are handled.</span></li>
          <li><strong>Legal and policy experts</strong><span className="d">Help answer questions on data requests, emergency routing, policy reviewers and eligible categories.</span></li>
          <li><strong>Researchers</strong><span className="d">Deliberation, moderation, evaluation and civic participation: sharpen one open question with sources.</span></li>
          <li><strong>Translators</strong><span className="d">Translate one approved passage, or review right-to-left layouts.</span></li>
          <li><strong>Documentation contributors</strong><span className="d">Fix one unclear sentence, one broken link, one missing setup step.</span></li>
          <li><strong>Infrastructure partners</strong><span className="d">Hosting and email choices are open questions, with no deployment yet.</span></li>
        </ul>
      </Section>

      <Section id="repos" title="Three repositories" wide>
        <div className="table-wrap">
          <table>
            <thead><tr><th scope="col">Repository</th><th scope="col">What it is</th><th scope="col">Stack</th></tr></thead>
            <tbody>
              <tr><td><code>can_server</code></td><td>The API, moderation checks, lifecycle and records.</td><td>NestJS, Postgres, Drizzle</td></tr>
              <tr><td><code>can_app</code></td><td>The app for web, iOS and Android. Verified on web first.</td><td>Expo, Expo Router</td></tr>
              <tr><td><code>can_promo_site</code></td><td>This site. Static, no forms, no tracking.</td><td>Next.js static export, plain CSS</td></tr>
            </tbody>
          </table>
        </div>
        <p className="small muted">The root repository also holds <DocRef path="docs/" />, <DocRef path="plans/" /> and <DocRef path="DECISIONS.md" />.</p>
      </Section>

      <Section id="decisions" title="How decisions are made">
        <ul>
          <li><strong>DECISIONS.md</strong> is the log of settled choices. Settled means settled until a decision is reopened through a recorded process.</li>
          <li><strong>Architecture decision records</strong> explain technical choices and the alternatives that lost.</li>
          <li><strong>Open questions</strong> are the way to challenge a default or fill a gap. Each has a current default, so work is never blocked waiting for an answer.</li>
          <li>Maintainers confirm status. You propose by pull request; do not edit plan status yourself.</li>
        </ul>
      </Section>

      <Section id="ai" title="AI-assisted contributions are welcome, with accountability">
        <p>You can contribute by hand, with a paid assistant, with a low-cost hosted model or with a local one. No particular tool or budget is required.</p>
        <ul>
          <li>You remain accountable for every change: correctness, tests, security, privacy, licensing and accessibility.</li>
          <li>Be able to explain the change and answer review in your own words.</li>
          <li>Disclose AI assistance in the pull request: tool, and how it was used.</li>
          <li>Treat AI output as untrusted input. Review and test it before maintainers see it.</li>
          <li>Bulk, unsolicited or autonomous submissions may be closed without detailed review. Nothing merges itself.</li>
        </ul>
        <p className="small muted">The full policy is still being finalized; see <DocRef path="docs/spec/22-ai-contribution-policy.md" />.</p>
      </Section>

      <Section id="money" title="A non-monetary project">
        <p>
          Nobody is paid through the platform, nothing is for sale and
          contributions earn factual thanks, never governance weight, ranking
          influence or data access. Hosting, labor, translation and expertise
          can be given in kind.
        </p>
      </Section>
    </>
  );
}
