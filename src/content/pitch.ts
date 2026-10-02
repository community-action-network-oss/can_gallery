/** The contributor pitch (D-60): one typed list, read by /contribute/, the home page and check:pitch. */
export type PitchLink = { kind: "oq" | "unit" | "role"; id: string };
export type Urgency = "most-urgent-now" | "needed-now" | "welcome";
export type PitchItem = { profession: string; urgency: Urgency; ask: string; why: string; links: PitchLink[] };

/** Two sentences, shown on the home page and at the top of /contribute/. */
export const PITCH_TWO =
  "Every profession can help. Most urgent today are engineers, designers and other technical people, because the platform is being built, and needed now are lawyers, activists, policy and rights experts, who help write the rules.";

/** Honest status for technical people: hardening comes before new features. */
export const HARDENING_NOTE =
  "CAN is a side project built so far mostly with AI coding assistants, to reach a working first version quickly, and some of the code is not at its best yet. If you can see the potential, the most useful help now is making what exists solid: tests, structure, security, speed and readability, before new features.";

export const PITCH: PitchItem[] = [
  { profession: "Engineers and maintainers", urgency: "most-urgent-now",
    ask: "Harden the existing code first, then take one small plan unit: one endpoint, one screen, one test.",
    why: "The platform is being built, and sturdy foundations matter more than speed.",
    links: [{ kind: "role", id: "engineers" }, { kind: "unit", id: "09-u56" }, { kind: "unit", id: "09-u67" }, { kind: "unit", id: "10-u55" }, { kind: "unit", id: "10-u57" }] },
  { profession: "Designers", urgency: "most-urgent-now",
    ask: "Draw a wireframe for the reopened status panel, so a person can see why a problem was reopened.",
    why: "The screen is planned but no one has drawn how it should feel to someone reading it.",
    links: [{ kind: "role", id: "designers" }, { kind: "unit", id: "09-u65" }] },
  { profession: "Other technical people: data, security, DevOps, accessibility", urgency: "most-urgent-now",
    ask: "Review one boundary: threat-model it, test it with a keyboard or screen reader, or tighten how it is built and run.",
    why: "Privacy and access are promises the code has to keep, not only the words.",
    links: [{ kind: "role", id: "security-privacy" }, { kind: "role", id: "accessibility" }] },
  { profession: "Lawyers", urgency: "needed-now",
    ask: "Review the legal corpora and topic indexes, and say how conflicting readings of a rule should be handled.",
    why: "Rules that follow the affected place need qualified local review.",
    links: [{ kind: "oq", id: "OQ-legal-corpus-sourcing" }, { kind: "oq", id: "OQ-legal-policy-reviewers" }, { kind: "oq", id: "OQ-legal-layer-conflicts" }, { kind: "unit", id: "10-u51" }, { kind: "unit", id: "10-u52" }, { kind: "role", id: "legal-policy" }] },
  { profession: "Policy experts", urgency: "needed-now",
    ask: "Draft rules and policy packs in the policy repository, and test whether a changed rule can be safely re-checked.",
    why: "The packs are what the AI check will follow, so they must be written by people.",
    links: [{ kind: "oq", id: "OQ-policy-pr-rights" }, { kind: "oq", id: "OQ-reresolution-feasibility" }, { kind: "role", id: "legal-policy" }] },
  { profession: "Rights experts", urgency: "needed-now",
    ask: "Say which higher rules should win when layers of law disagree, and what a sensible default is above national law.",
    why: "Rights come first, and the order has to be argued in public.",
    links: [{ kind: "oq", id: "OQ-legal-layer-conflicts" }, { kind: "oq", id: "OQ-supranational-default" }] },
  { profession: "Activists and organisers", urgency: "needed-now",
    ask: "Propose rules and examples from lived cases, using public or invented material only, and read the contributor path.",
    why: "People who have seen a problem stay stuck know where a rule fails.",
    links: [{ kind: "oq", id: "OQ-amsterdam-overlay-review" }, { kind: "unit", id: "08-u15" }] },
  { profession: "Translators", urgency: "welcome",
    ask: "Translate one approved passage, or check a right-to-left layout.",
    why: "A public problem should be readable by the people it affects.",
    links: [{ kind: "role", id: "translators" }] },
  { profession: "Researchers", urgency: "welcome",
    ask: "Sharpen one open question with sources.",
    why: "Defaults are only as good as the evidence behind them.",
    links: [{ kind: "role", id: "researchers" }] },
  { profession: "Writers and educators", urgency: "welcome",
    ask: "Fix one unclear sentence or one missing setup step, or turn a page into a plain lesson.",
    why: "If a newcomer cannot follow it, it is not finished.",
    links: [{ kind: "role", id: "documentation" }] },
  { profession: "Everyone else", urgency: "welcome",
    ask: "Read a page the way you would read it cold, and tell us where you got lost.",
    why: "What you know about your own work is the point of this project.",
    links: [{ kind: "role", id: "documentation" }] },
];
