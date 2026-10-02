import type { Metadata } from "next";
import Link from "next/link";
import { repoUrl } from "@/config/site";
import { Unfold } from "@/components/Unfold";
import { Pictogram, Plate } from "@/components/Pictogram";
import "./contribute.css";
import { DocRef, PageHead, Fictional, Planned, RepoLink, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Every profession can help. Plain roles first, then the three repositories, how to start in about an hour, and how decisions and AI-assisted work are handled.",
};

export default function Page() {
  return (
    <>
      <PageHead
        title="Help build CAN"
        lede="You do not need to write code. A nurse, a cook, a clerk, an electrician, a student, a lawyer or an engineer can each help with one small, owned piece, in about an hour."
      />

      <Section id="every-profession" title="Every profession can help" wide>
        <p className="prose">The first job is building the platform honestly. Work is cut into small, owned units so you can contribute in about an hour, with or without a paid AI tool. Pick the role closest to what you know and start with one small piece.</p>
        <Plate
          title="Who can help first"
          legend="Each figure is one person. The role is in the words beside it."
          caption={<><Fictional /> Nobody here is real. These are examples of the people CAN is built with.</>}
        >
          <ul className="who">
            <li><Pictogram name="nurse" ink="cobalt" size={44} title="" /><span><strong>Care and health workers</strong> check that wording is safe and kind.</span></li>
            <li><Pictogram name="cook" ink="cobalt" size={44} title="" /><span><strong>Cooks, drivers, tradespeople</strong> test whether a step makes sense in real life.</span></li>
            <li><Pictogram name="clerk" ink="cobalt" size={44} title="" /><span><strong>Office and public service staff</strong> fix unclear sentences and broken links.</span></li>
            <li><Pictogram name="electrician" ink="cobalt" size={44} title="" /><span><strong>Engineers and security people</strong> build and review one small piece.</span></li>
            <li><Pictogram name="student" ink="cobalt" size={44} title="" /><span><strong>Students, researchers, translators</strong> sharpen a question or translate a passage.</span></li>
          </ul>
        </Plate>
        <p className="prose">Lawyers and policy experts, designers, translators and hosting partners are welcome too. Open the detail for each role and a first small task.</p>
        <Unfold id="roles-detail" summary="Every role, and a first small task for each">
      <div id="roles"><h3>Who we need</h3>
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
      </div>

        </Unfold>
      </Section>

      <Section id="help-build" title="Help build it" wide>
        <p className="prose">Work is cut into small units, each sized at about an hour, with a clear way to check it. You can contribute by hand or with an assistant. Everything here is the plan for the first build. <Planned /></p>
        <p className="prose small">New here? Start with <DocRef path="docs/onboarding/README.md" />, then <DocRef path="docs/contributing/README.md" /> and <DocRef path="docs/contributing/good-first-units.md" />. Update and release habits are in <DocRef path="docs/policy/dependency-updates.md" /> and <DocRef path="docs/policy/releases.md" />.</p>
        <Unfold id="builders" summary="For builders: clone command, repositories, stack and how decisions are made">
      <div className="builder-block" id="start"><h3>Start in about an hour</h3>
        <ol className="steps">
          <li><div><h4>Clone everything</h4><p>The root repository holds the specification, plans and decisions. The three code repositories are submodules.</p><pre><code>git clone --recurse-submodules https://github.com/community-action-network-oss/community_action_network_oss.git</code></pre><p className="small"><RepoLink />. The code repositories: <a href={repoUrl("can_server")}>can_server</a>, <a href={repoUrl("can_app")}>can_app</a> and <a href={repoUrl("can_gallery")}>can_gallery</a>.</p></div></li>
          <li><div><h4>Read <DocRef path="CONTRIBUTING.md" /></h4><p>Setup, commit conventions and how to pick work. You need Node 24 or newer; Docker and Python 3 for the server work.</p></div></li>
          <li><div><h4>Pick a unit from <DocRef path="plans/" /></h4><p>Each unit is sized at about one hour, links to the spec it implements and names how it is checked. Open a pull request that references the unit id.</p></div></li>
          <li><div><h4>Or answer an open question</h4><p>Add evidence, options and trade-offs to a file in <DocRef path="docs/open-questions/" />. No code needed. <Link href="/open-questions/">Browse them here</Link>.</p></div></li>
        </ol>
      </div>

      <div className="builder-block" id="repos"><h3>Three repositories</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th scope="col">Repository</th><th scope="col">What it is</th><th scope="col">Stack</th></tr></thead>
            <tbody>
              <tr><td><code>can_server</code></td><td>The API, moderation checks, lifecycle and records.</td><td>NestJS, Postgres, Drizzle</td></tr>
              <tr><td><code>can_app</code></td><td>The app for web, iOS and Android. Verified on web first.</td><td>Expo, Expo Router</td></tr>
              <tr><td><code>can_gallery</code></td><td>This site, the public gallery: a read-only window into CAN. Static, no forms, no tracking.</td><td>Next.js static export, plain CSS</td></tr>
            </tbody>
          </table>
        </div>
        <p className="small muted">The root repository also holds <DocRef path="docs/" />, <DocRef path="plans/" /> and <DocRef path="DECISIONS.md" />.</p>
      </div>

      <div className="builder-block" id="decisions"><h3>How decisions are made</h3>
        <ul>
          <li><strong>DECISIONS.md</strong> is the log of settled choices. Settled means settled until a decision is reopened through a recorded process.</li>
          <li><strong>Architecture decision records</strong> explain technical choices and the alternatives that lost.</li>
          <li><strong>Open questions</strong> are the way to challenge a default or fill a gap. Each has a current default, so work is never blocked waiting for an answer.</li>
          <li>Maintainers confirm status. You propose by pull request; do not edit plan status yourself.</li>
        </ul>
      </div>


      <div className="builder-block" id="ai"><h3>AI-assisted contributions are welcome, with accountability</h3>
        <p>You can contribute by hand, with a paid assistant, with a low-cost hosted model or with a local one. No particular tool or budget is required.</p>
        <ul>
          <li>You remain accountable for every change: correctness, tests, security, privacy, licensing and accessibility.</li>
          <li>Be able to explain the change and answer review in your own words.</li>
          <li>Disclose AI assistance in the pull request: tool, and how it was used.</li>
          <li>Treat AI output as untrusted input. Review and test it before maintainers see it.</li>
          <li>Bulk, unsolicited or autonomous submissions may be closed without detailed review. Nothing merges itself.</li>
        </ul>
        <p className="small muted">The full policy is still being finalized; see <DocRef path="docs/spec/22-ai-contribution-policy.md" />.</p>
      </div>

        </Unfold>
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
