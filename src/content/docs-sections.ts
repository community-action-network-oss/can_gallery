export const SECTIONS = [
  { id: "manifesto", title: "Manifesto", blurb: "Why CAN exists and what it promises, in one readable essay." },
  { id: "constitution", title: "Constitution and rules", blurb: "The rules everyone must follow, including the maintainers and the AI, chapter by chapter." },
  { id: "decisions", title: "Decisions log", blurb: "Every binding decision the project has made, with the reason and how to reverse it." },
  { id: "open-questions", title: "Open questions", blurb: "What we have not decided yet, each with a default and a way for you to help." },
  { id: "spec", title: "How CAN works", blurb: "The full specification: how a public problem moves from evidence to a verified outcome." },
  { id: "design", title: "Design", blurb: "How the AI moderation, user flows, components and screens are meant to work." },
  { id: "adr", title: "Architecture decisions", blurb: "Short records of the big technical choices, and why we made them." },
  { id: "policy", title: "Community policies", blurb: "The policies communities will govern themselves with." },
] as const;
export type SectionId = (typeof SECTIONS)[number]["id"];
export const sectionTitle = (id: string) => SECTIONS.find((s) => s.id === id)?.title ?? "Documents";
