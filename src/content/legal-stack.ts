export const LAYERS: { id: string; name: string; plain: string }[] = [
  { id: "L0", name: "CAN platform rules", plain: "The rules the community writes for CAN itself." },
  { id: "L1", name: "UN human rights", plain: "UDHR, ICCPR and ICESCR, a floor under everything else." },
  { id: "L2", name: "Supranational law, where binding", plain: "For the Netherlands: the EU Charter, EU law and the ECHR." },
  { id: "L3", name: "National constitution", plain: "The founding law of the country." },
  { id: "L4", name: "National law", plain: "Statutes passed for the whole country." },
  { id: "L5", name: "Regional law", plain: "Rules of a province or region, only where it has competence." },
  { id: "L6", name: "City rules", plain: "Local bylaws of the city." },
];

export const OUTCOMES = [
  {
    id: "topic",
    title: "The topic itself is forbidden where you are",
    example: "A made-up city bans publishing any list of street vendor names. A problem about that list is not published in that city.",
    lead: "A topic forbidden by local law is not published in that place, and the refusal is logged with its legal basis.",
    more: [
      "The person gets a plain explanation that names the layer, the article and the version of the law text, and can appeal. The same topic may be lawful somewhere else, so the decision is made per place, never for everyone.",
      "A topic ban needs an article that really forbids the topic, checked by a lawyer. The AI may not guess one. When it is unsure, the problem is held, not refused.",
    ],
    docs: ["docs/design/ai/legal-stack.md"],
  },
  {
    id: "solution",
    title: "The problem is lawful but the only fix is not",
    example: "A made-up neighbourhood wants a bridge, and the only plan on the table breaks a national building law. The problem is published and marked stuck.",
    lead: "A lawful problem whose only solution is illegal is published and marked stuck, legally blocked.",
    more: [
      "The stuck record names the blocking rule, its source and version, the actions that are blocked and when to look again. Lawful alternatives and the next route are shown. This is an honest record of what could not be done yet.",
      "Before a plan can go ahead, a recorded legal check is required, and if law blocks it the problem is marked stuck.",
    ],
    docs: ["docs/design/ai/legal-stack.md", "docs/spec/constitution/rules.md"],
  },
  {
    id: "conflict",
    title: "The layers disagree on how to read a rule",
    example: "A made-up national law seems to limit speech that a human rights text protects.",
    lead: "When layers disagree on how to read a rule, the decision is held with a note.",
    more: [
      "The held decision becomes a policy question for the community. It is an open question today, with a working default.",
    ],
    docs: ["docs/open-questions/OQ-legal-layer-conflicts.md", "docs/open-questions/OQ-supranational-default.md"],
  },
];

export const BUILDING = [
  "The laws would be kept in the policy repository as versioned corpora, each with its official source.",
  "Every refusal cites the layer, the article and the corpus version.",
  "Two decision points handle this. They classify and route, and never give individual legal advice.",
  "Fiktiva City is an invented test jurisdiction, used to try the idea.",
  "Amsterdam is the first planned jurisdiction overlay.",
  "The legal corpus format is not built yet.",
  "No pack has been ratified.",
];
