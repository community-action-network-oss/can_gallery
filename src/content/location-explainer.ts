export const WHY = [
  "Readers should know whether a message comes from people the problem affects.",
  "The label belongs to one message, not to a person.",
  "Guest content is always labelled and is never hidden unless a reader chooses Impacted only.",
];

export const HOW = [
  "The check runs on your device, against the affected area.",
  "Your exact location is never sent or saved.",
  "Only the result, the area version and the kind of check are stored.",
];

export const CANNOT = [
  "On the web the check is self-asserted, so the label reads Reported impacted. Nobody claims it proves where you were.",
  "A determined person can fake a location.",
  "The label has no effect on whether a message is accepted or how it is judged.",
];

export const FAILS = [
  "Your message still goes through, labelled guest, with a neutral reason.",
  "You can check again later.",
  "Nothing is held against your account.",
];

export const NEXT =
  "A zero-knowledge proof would let the server learn even less. It would be adopted only if it passes measured limits: about 3 seconds on a mid-range phone, a small proof and a clean external privacy review. Until then it is not built.";

export const NEVER = [
  "Coordinates.",
  "Grid cells.",
  "Location derived from your network address.",
  "A trail of places.",
];

export const DIAGRAM_LABEL =
  "Four steps in order: your device compares your position with the affected area; only the answer, inside or not, leaves your device; the server stores a label of impacted or guest with the area version and the kind of check; no one learns where you are.";

export const DIAGRAM_STEPS = [
  "Your device checks the area",
  "Only the answer leaves",
  "A label is stored: impacted or guest",
  "No one learns where you are",
];

export const EXAMPLE_ROWS = [
  ["A resident inside the affected area", "Reported impacted"],
  ["A visitor from another city who shares a useful idea", "Guest"],
  ["A commuter who says no to the location prompt", "Guest, with the reason: no permission given"],
];

export const EXAMPLE_NOTE =
  "All three messages are accepted and read in the same way. Only the label differs, and a reader may choose Impacted only to focus on the first.";
