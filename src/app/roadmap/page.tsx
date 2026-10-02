import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { DocRef, PageHead, Section } from "@/components/ui";
import { Pictogram } from "@/components/Pictogram";
import { Unfold } from "@/components/Unfold";
import "./roadmap.css";

export const metadata: Metadata = pageMetadata("/roadmap/", "Roadmap", "The phases from concept page to controlled pilot and beyond, where CAN is today, and the decentralization track.");

const PHASES: { name: string; state: "Now" | "Next" | "Later"; text: string }[] = [
  { name: "Phase 0A: Public concept and contributor page", state: "Now", text: "This site: what CAN is, what does not exist yet, and how to help without handing over any personal data." },
  { name: "Phase 0B: Discovery and decisions", state: "Now", text: "Open questions, architecture decision records, scope and non-goals, threat model, and the choices that need a person with specific expertise." },
  { name: "Phase 1: Foundation", state: "Now", text: "Early scaffolding: three repositories, a server, an app shell, a contract between them, a local development setup and continuous checks." },
  { name: "Phases 2 to 4: The first working slice", state: "Next", text: "Safe problem intake, structured resolution, then implementation and verification. All on made up evidence with no real participants, invite-only for writing, public for reading, verified on web first." },
  { name: "Phase 5: Grounding and governance", state: "Later", text: "People help correct and improve moderation through masked review. Rule changes are versioned, tested and reversible." },
  { name: "Phase 6: Hardening and a controlled pilot", state: "Later", text: "Accessibility and security review, abuse testing, backup drills, then a pilot with a small real community. Needs legal review and emergency routing first." },
  { name: "Gate X: Open participation", state: "Later", text: "Unrestricted intake opens only when the pilot bar is met and the founder approves evidence that it is safe. A working interface is not enough." },
  { name: "Phase 7: Systemic accountability", state: "Later", text: "Linked problems, evidence ledgers, institution and responsibility maps, and tools for many people contributing at once. Only after the basic workflow is stable." },
  { name: "Phase 8: Election accountability", state: "Later", text: "Off by default. Considered only after legal review, a neutrality evaluation and independent oversight exist." },
];

const count = (s: string) => PHASES.filter((p) => p.state === s).length;

export default function Page() {
  return (
    <>
      <PageHead
        title="Roadmap"
        lede="Honest about order, not about dates. Each phase has to earn the next one. Today we are explaining, deciding and laying the foundation."
      />
      <Section id="phases" title="Phases in plain words" wide>
        <p className="prose">
          There are {PHASES.length} phases. {count("Now")} are under way, {count("Next")} is next and {count("Later")} come later. Each figure below is one phase, in order.
        </p>
        <ol className="phase-row" aria-label="The phases in order">
          {PHASES.map((p, i) => (
            <li key={p.name} className={p.state === "Now" ? "now" : undefined}>
              <Pictogram name="crossing" ink={p.state === "Now" ? "green" : p.state === "Next" ? "ochre" : "cobalt"} size={32} />
              <span className="small">{i + 1}. {p.state === "Now" ? "We are here" : p.state}</span>
            </li>
          ))}
        </ol>
        <Unfold id="phases-detail" summary="Every phase, what it covers and where each one stands">
          <ol className="phases">
            {PHASES.map((p) => (
              <li key={p.name} className={p.state === "Now" ? "now" : undefined}>
                <h3>
                  {p.name}
                  <span className={p.state === "Now" ? "chip chip-active" : "chip chip-withdrawn"}>
                    {p.state === "Now" ? "We are here" : p.state}
                  </span>
                </h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
          <p className="prose small muted">
            Source: <DocRef path="docs/spec/18-phases-gates.md" />. The
            indicative plan is about two months for phases 0A and 0B, then three
            months for the first slice, then a pilot. It is a planning default, not a promise.
          </p>
          </Unfold>
      </Section>
      <Section id="decentralization" title="Decentralization: a later, parallel track">
        <p>A later, separate group is exploring a way for independent nodes to share the same rules. The first build only leaves room for it.</p>
        <Unfold id="decentralization-detail" summary="What the track covers and what the first build leaves room for">
        <p>
          CAN starts as one centralized reference platform, because that is
          the fastest way to learn what works. A separate working group
          explores open protocols so that independent nodes could one day run
          the same constitution and exchange records.
        </p>
        <p>
          The first build only leaves room for it: portable identifiers, a
          record of which node a thing came from, a protocol version, and an
          append-only event history. Signing, export and federation come
          later and need their own decisions. See{" "}
          <DocRef path="docs/spec/13-decentralization-track.md" />.
        </p>
        </Unfold>
      </Section>
    </>
  );
}
