/** A founding stage role page. Same fields, same order on every page (Gate X template). */
export type RoleLink = { label: string; internal?: string; doc?: string };

export type Role = {
  slug: string;
  name: string;
  /** One plain sentence, shown first and on the index. */
  summary: string;
  stage: "founding";
  urgency?: "most-urgent-now";
  doNow: string[];
  prerequisites: string[];
  time: string[];
  privacyAndConflict: string[];
  prohibited: string[];
  /** Tasks are read from catalog.json: by area, by unit id, or both. Neither means none is open. */
  tasks: { areas?: string[]; ids?: string[]; note?: string };
  review: string[];
  decisions: string[];
  links: RoleLink[];
  pictogram: "electrician" | "clerk" | "nurse" | "manager";
};

export const URGENT_SENTENCE = "Most urgent today: the platform is being built.";
export const NO_AUTHORITY = "A role page does not grant authority merely by allowing self-selection.";
export const FOUNDING_RULES = [
  "Work uses fictional or public material only. No real personal data goes anywhere, ever.",
  "AI tools are allowed and must be disclosed in the pull request. No paid tool is required.",
  "Nothing here is live. The platform is being built and handles no real problems yet.",
];
