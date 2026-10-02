export const SEED_LABEL = "Seed problem, synthetic evidence";

// framing: the D-56 text in DECISIONS.md. full: the longer sentence in docs/design/flows/seed-bootstrap.md (seeds 1 and 2 only).
export const SEEDS: { n: number; framing: string; full?: string; plan: string; when: string }[] = [
  {
    n: 1,
    framing: "Amsterdam explosions and violence",
    full: "Amsterdam residents face recurring explosions and violent incidents that may reduce actual and perceived public safety.",
    plan: "Two parallel stages feed the design stage, then a pilot and a measurement.",
    when: "First",
  },
  {
    n: 2,
    framing: "Amsterdam city-centre cleanliness",
    full: "Amsterdam city centre remains dirty despite substantial government cleaning activity and expenditure.",
    plan: "A baseline, two parallel stages, a pilot and a result.",
    when: "First",
  },
  { n: 3, framing: "continuous AI capability risk", plan: "Not planned yet.", when: "Waits for the problem graph" },
  { n: 4, framing: "climate change", plan: "Not planned yet.", when: "Waits for the problem graph" },
];

export const PERSONAS = [
  "A persona is a computer program playing a role. It is never a real person, and no real person is copied or named.",
  "Personas play submitters, contributors, proposers, appellants and adversaries.",
  "They use the same public interface a real participant would, never a back door.",
];

export const ATTACKS = [
  "Instructions hidden inside a draft, hoping the checker obeys them.",
  "Attempts to name or locate private people.",
  "Floods of near identical posts and coordinated pile ons.",
  "Hateful or threatening wording, including disguised spellings.",
  "Misuse of the structured forms.",
  "Legal claims smuggled into a long, convincing paragraph.",
  "A persona that reuses the Archive for a new problem in another town, and an attacker that plants instructions in a draft to check that Archive text stays plain data.",
];

export const GRADUATION = [
  "Seeds 1 and 2 each complete their stage plan, or end honestly stuck or redirected with the record complete.",
  "No private detail leaks into any public page, notice or log during attack runs.",
  "Attempts to plant instructions in text achieve nothing.",
  "Harmful content is caught reliably, and good contributions are rarely stopped by mistake.",
  "Appeals work end to end, and every failure leaves the system closed rather than open.",
  "Rollout and rollback are exercised, cost stays within a cap, and the founder ratifies the exact versions that were run.",
];
