import { REPO_URL, docUrl } from "@/config/site";

export type Task = {
  id: string; title: string; repo: string; area: string; est_hours: number; tags: string[];
  needs: string[]; spec: string[]; objective: string; acceptance: string[]; path: string;
};

const hours = (h: number) => `about ${h} hour${h === 1 ? "" : "s"} of focused work; yours may differ`;

/** One generated unit card. Server component, native details, no client JS. */
export function TaskCard({ t }: { t: Task }) {
  return (
    <article className="task" id={t.id}>
      <h3>{t.title}</h3>
      <p>{t.objective}</p>
      <p className="task-meta">{hours(t.est_hours)}. Where: {t.repo === "." ? "the main repository" : t.repo}. Unit {t.id}.</p>
      <details className="unfold">
        <summary>
          <span className="unfold-sentence">Context, how to claim it, review and expected outcome</span>
          <span className="unfold-label unfold-more">Show more</span>
          <span className="unfold-label unfold-less">Show less</span>
        </summary>
        <div className="unfold-body">
          <h4>Expected outcome</h4>
          <ul>{t.acceptance.map((a) => <li key={a}>{a}</li>)}</ul>
          <h4>Context to read first</h4>
          <ul>
            <li><a href={docUrl(t.path)}>The unit file</a></li>
            {t.spec.map((s) => <li key={s}><a href={docUrl(s)}>{s}</a></li>)}
          </ul>
          {t.needs.length > 0 && <p>Needs: {t.needs.join(", ")}.</p>}
          <h4>How to claim it</h4>
          <p>Check the unit status on GitHub first, then <a href={`${REPO_URL}/issues`}>open an issue</a> that cites {t.id}. Owner: you, once a maintainer confirms the claim.</p>
          <h4>Review</h4>
          <p>Review: a maintainer reads every change. Say in the pull request whether AI helped, as the AI contribution policy asks.</p>
        </div>
      </details>
    </article>
  );
}
