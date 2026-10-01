// Public lifecycle labels and explanations. Mirrors docs/spec/01a-lifecycle.md
// and docs/spec/01b-stages.md (lifecycle v2, D-72), plus the archive step (D-76). Wording
// here is a copy; the spec is the single owner. Update it when the public
// labels change there.
export type Tone =
  | "pending" | "active" | "paused" | "stuck" | "withdrawn"
  | "solved" | "closed" | "redirected" | "interim";

export type Stage = { label: string; tone: Tone; says: string };
// Who helps in a step: one short line each. Role is always named in text.
export type Roles = { poster: string; community: string; ai: string };
export type PathStep = Stage & { vis?: string; roles: Roles };

export const ROLE_LABELS: { key: keyof Roles; label: string }[] = [
  { key: "poster", label: "Poster" },
  { key: "community", label: "Community" },
  { key: "ai", label: "AI" },
];

export const PATH: PathStep[] = [
  { label: "Prepare", tone: "pending", vis: "Private", says: "The poster lays out the facts, trusted sources that show the problem is real, what \u201csolved\u201d will mean, and optionally the stages.",
    roles: { poster: "Lays out facts, trusted sources, what solved means and any optional stages.", community: "Not involved yet. Nothing is public.", ai: "Suggests paths from the archive of similar solved problems as the poster types." } },
  { label: "Volunteer review", tone: "interim", vis: "Still private", says: "Volunteers check it and suggest improvements to everything, from facts to stages to the finish line.",
    roles: { poster: "Accepts or declines each suggestion.", community: "Volunteers suggest improvements.", ai: "Flags gaps." } },
  { label: "Published", tone: "active", says: "The problem goes public with a stage plan.",
    roles: { poster: "Edits the drafted stage plan.", community: "Can now read it and take part.", ai: "Checks it against the community\u2019s rules and publishes. Drafts a stage plan from matching archive paths." } },
  { label: "Stages", tone: "active", says: "Each stage runs five sub steps, shown below. A stage finishes only when its evidence meets its finish line.",
    roles: { poster: "Guides each stage.", community: "Adds options, work and evidence.", ai: "Checks law, sources and evidence." } },
  { label: "Solved", tone: "solved", says: "Every stage is done and the final finish line is met.",
    roles: { poster: "Shares the final evidence.", community: "Can check it and appeal.", ai: "Checks it against the final finish line." } },
  { label: "Archive", tone: "closed", says: "The whole journey, including what failed, becomes a path others can start from, adapted to their own laws and means.",
    roles: { poster: "Their journey helps the next poster.", community: "Anyone can browse it and start from it, with credit.", ai: "Removes personal data, keeps what failed, and adapts paths to local law and means." } },
];

// Step 4, expanded: five sub steps inside each stage.
export type SubStep = { key: string; label: string; says: string; roles: Roles };
export const SUBSTEPS: SubStep[] = [
  { key: "a", label: "Options", says: "Ways to reach the stage\u2019s finish line are put on the table.",
    roles: { poster: "Adds options.", community: "Anyone adds options.", ai: "Offers archive paths, checked for local law and fit." } },
  { key: "b", label: "Choice", says: "One option is chosen by the stage\u2019s decision method.",
    roles: { poster: "Chooses by default, after community input.", community: "Gives input before the choice.", ai: "Checks the choice is lawful and recorded." } },
  { key: "c", label: "Work", says: "The steps of the chosen option are done.",
    roles: { poster: "Does steps and keeps the plan current.", community: "Volunteers take on steps.", ai: "Tracks blockers." } },
  { key: "d", label: "Evidence", says: "Proof that the work happened and worked is posted.",
    roles: { poster: "Posts evidence.", community: "Anyone can post evidence.", ai: "Checks that sources are trusted." } },
  { key: "e", label: "Done?", says: "The evidence is judged against the stage\u2019s finish line.",
    roles: { poster: "Asks for the check when the evidence is in.", community: "Anyone can appeal the result.", ai: "Checks the evidence against the finish line." } },
];

export const STAGES_NOTES: string[] = [
  "When a stage is done, the stages after it unlock. Stages can run one after another or side by side.",
  "Anyone can prepare later stages early, so work is ready when they start.",
  "Guests from anywhere can help and are labelled as guests. People in the affected area can filter to impacted voices only.",
];

// The stage plan as a small graph: columns run left to right, stages in a column run side by side.
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
