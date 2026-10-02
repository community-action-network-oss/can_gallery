import type { CSSProperties } from "react";
import { Chip } from "@/components/ui";
import { PATH, ROLE_LABELS, STAGES_NOTES, STAGE_GRAPH, STAGE_GRAPH_TEXT, SUBSTEPS, type Roles } from "@/content/stages";

// Role is named in text on every line, so colour is never the only signal.
export function RoleList({ roles }: { roles: Roles }) {
  return (
    <ul className="roles">
      {ROLE_LABELS.map(({ key, label }) => (
        <li key={key} className={`role role-${key}`}>
          <span className="role-chip">{label}</span>
          <span className="role-line">{roles[key]}</span>
        </li>
      ))}
    </ul>
  );
}

export function StageGraph() {
  return (
    <>
      <div className="stage-graph" aria-hidden="true">
        {STAGE_GRAPH.map((col, c) => (
          <div className="sg-col" key={c}>
            {col.map((n) => <span className="sg-node" key={n}>{n}</span>)}
          </div>
        ))}
      </div>
      <p className="sr-only">{STAGE_GRAPH_TEXT}</p>
    </>
  );
}

export function StagePanel({ id = "stages-h" }: { id?: string }) {
  return (
    <div className="stage-panel" role="group" aria-labelledby={id}>
      <p className="panel-title" id={id}>Inside each stage, five sub steps</p>
      <ol className="substeps">
        {SUBSTEPS.map((s) => (
          <li key={s.key}>
            <p className="sub-head"><span className="sub-key" aria-hidden="true">{s.key}</span><strong>{s.label}</strong></p>
            <p className="sub-says">{s.says}</p>
            <RoleList roles={s.roles} />
          </li>
        ))}
      </ol>
      <div className="panel-foot">
        <StageGraph />
        <ul className="panel-notes">{STAGES_NOTES.map((n) => <li key={n}>{n}</li>)}</ul>
      </div>
    </div>
  );
}

/** The whole rail, or only steps `from` to `to` (exclusive); numbering keeps its place in the full path. */
export function PathRail({ labelledBy, from = 0, to = PATH.length }: { labelledBy: string; from?: number; to?: number }) {
  return (
    <ol className="rail" aria-labelledby={labelledBy} style={{ counterReset: `step ${from}` }}>
      {PATH.slice(from, to).map((s, i) => (
        <li key={s.label} style={{ "--i": i } as CSSProperties}>
          <div className="rail-head">
            <Chip tone={s.tone}>{s.label}</Chip>
            {s.vis && <span className="vis">{s.vis}</span>}
          </div>
          <span className="says">{s.says}</span>
          {s.label === "Stages" ? <StagePanel /> : <RoleList roles={s.roles} />}
        </li>
      ))}
    </ol>
  );
}
