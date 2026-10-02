export const STEPS: { id: string; name: string; plain: string }[] = [
  { id: "trigger", name: "A rule or law changes", plain: "A policy version or a legal corpus version reaches full rollout." },
  { id: "review", name: "Past results are reviewed", plain: "Only the results the change touches are replayed under the new rule." },
  { id: "result", name: "One of four results", plain: "Keep, annotate, reopen or hold." },
  { id: "notice", name: "A visible notice", plain: "If a problem reopens, it says so, with the rule that changed." },
];

export const RESULTS: { name: string; plain: string }[] = [
  { name: "Keep", plain: "The conclusion stands. A review is recorded and nothing changes in public." },
  { name: "Annotate", plain: "A visible note is added to the earlier result. The old decision stays as it was." },
  { name: "Reopen", plain: "The problem returns to active, only when the conclusion changes and reopening is feasible." },
  { name: "Hold", plain: "The case waits for a person to look, instead of being decided on low confidence." },
];

export const NOTICE = [
  "The notice reads Reopened under policy vX and names the rule that changed.",
  "The full history is kept and the old Archive record is never deleted.",
  "The decision can be appealed.",
  "Reopening is never silent.",
];

export const STAGES = [
  "What is re-examined is the Archive record of each ended problem and the resolved stages of active problems.",
  "A reopen returns the problem to active, and only the affected stages return to work.",
  "Their later stages wait again, and the old Archive record is kept.",
  "A new Archive record is added when the problem ends again.",
];

export const CRITERIA = [
  "The problem still exists.",
  "The jurisdiction is still enabled.",
  "The initiator or a steward can be notified.",
  "Reopening does not undo a lawful completed implementation without a new proposal.",
];

export const EXAMPLES = [
  { id: "reopen", title: "A solved problem reopens", text: "A made-up town fixed a flooded underpass under an evidence rule. A new version of the rule asks for a second kind of proof. The stage that supplied the proof returns to work, its later stages wait, and the poster is told which rule changed and how to appeal." },
  { id: "annotate", title: "An infeasible case is annotated instead", text: "A made-up town closed a problem and the work was lawfully finished and built. A rule change would reach a different conclusion, but reopening would undo the finished work. The earlier result gets a visible note with the reason, and nothing reopens." },
];
