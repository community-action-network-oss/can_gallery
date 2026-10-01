// Public lifecycle labels and explanations. Mirrors docs/spec/01a-lifecycle.md
// (lifecycle v2, D-72), with the stage plan in 01b if it is split out. Wording
// here is a copy; the spec is the single owner. Update it when the public
// labels change there.
export type Tone =
  | "pending" | "active" | "paused" | "stuck" | "withdrawn"
  | "solved" | "closed" | "redirected" | "interim";

export type Stage = { label: string; tone: Tone; says: string };
export type PathStep = Stage & { vis?: string };

export const PATH: PathStep[] = [
  { label: "Prepare", tone: "pending", vis: "Private", says: "The poster lays out the facts, trusted sources that show the problem is real, and what \u201csolved\u201d will mean. They can also plan stages, each with its own finish line." },
  { label: "Volunteer review", tone: "interim", vis: "Still private", says: "Volunteers check it and suggest improvements to everything, from facts to stages to the finish line. The poster accepts or declines each suggestion." },
  { label: "Published", tone: "active", says: "AI checks it against the rules the community wrote, then publishes it." },
  { label: "Stages", tone: "active", says: "Stages run one after another, side by side, or both. In each stage people offer options, a choice is made, the work is done and evidence is posted. A stage finishes only when its evidence meets its finish line. Anyone can prepare work for later stages in the meantime." },
  { label: "Solved", tone: "solved", says: "When every stage is done and the evidence meets the final finish line." },
];

// Step 4 as a small graph: columns run left to right, stages in a column run side by side.
export const STAGE_GRAPH: string[][] = [["Stage A"], ["Stage B", "Stage C"], ["Stage D"]];
export const STAGE_GRAPH_TEXT =
  "Example: Stage A first. Then Stage B and Stage C at the same time. Stage D starts when both are done.";

export const SIDE_STATES: Stage[] = [
  { label: "Changes requested", tone: "interim", says: "The publishing check asked for changes. Hints sit next to the part they are about." },
  { label: "Paused", tone: "paused", says: "On hold, with the reason and the condition for resuming." },
  { label: "Stuck", tone: "stuck", says: "Documented work hit a blocker. The blocker and the next route are shown." },
  { label: "Redirected", tone: "redirected", says: "Better handled elsewhere. The route is shown." },
  { label: "Closed", tone: "closed", says: "Closed, with the reason given." },
  { label: "Not accepted", tone: "withdrawn", says: "Not accepted, for the reasons given, with a way to appeal." },
  { label: "Withdrawn", tone: "withdrawn", says: "Withdrawn by the person who raised it." },
];
