// Public status labels and explanations, from docs/spec/01-slice-1-brief.md
// (lifecycle table, public label and plain explanation columns). Wording here
// is a copy; the brief is the single owner.
export type Tone =
  | "pending" | "active" | "paused" | "stuck" | "withdrawn"
  | "solved" | "closed" | "redirected" | "interim";

export type Stage = { label: string; tone: Tone; says: string };

export const JOURNEY: Stage[] = [
  { label: "Awaiting volunteer review", tone: "pending", says: "A volunteer checks it. Nothing is public yet." },
  { label: "Open: gathering facts", tone: "active", says: "Published. Anyone can ask questions and add evidence." },
  { label: "Open: developing solutions", tone: "active", says: "Enough is known to start proposing fixes." },
  { label: "In progress", tone: "active", says: "A solution was chosen and the reason is on record. Work is tracked." },
  { label: "Checking the result", tone: "interim", says: "Work is done. People check whether it fixed the problem." },
  { label: "Solved", tone: "solved", says: "A volunteer confirmed the result matches the goal, using the evidence shown." },
];

export const SIDE_STATES: Stage[] = [
  { label: "Changes requested", tone: "interim", says: "A volunteer asked for changes before this can be published. Each note sits next to the part it is about." },
  { label: "Open: choosing a solution", tone: "active", says: "Proposals are ready to compare." },
  { label: "Paused", tone: "paused", says: "On hold, with the reason and the condition for resuming." },
  { label: "Stuck", tone: "stuck", says: "Documented work hit a blocker. The blocker and the next route are shown." },
  { label: "Redirected", tone: "redirected", says: "Better handled elsewhere. The route is shown." },
  { label: "Closed", tone: "closed", says: "Closed, with the reason given." },
  { label: "Not accepted", tone: "withdrawn", says: "Not accepted, for the reasons given, with a way to appeal." },
  { label: "Withdrawn", tone: "withdrawn", says: "Withdrawn by the person who raised it." },
];
