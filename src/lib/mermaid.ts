// Turns <pre class="mermaid"> blocks into diagrams. Loaded lazily and only when a page has one.
export async function drawDiagrams(root: HTMLElement): Promise<void> {
  const blocks = Array.from(root.querySelectorAll<HTMLElement>("pre.mermaid"));
  if (!blocks.length) return;
  const { default: mermaid } = await import("mermaid");
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: dark ? "dark" : "default", fontFamily: "inherit" });
  let n = 0;
  for (const pre of blocks) {
    const source = pre.textContent ?? "";
    try {
      const { svg } = await mermaid.render(`mmd-${Date.now()}-${n++}`, source);
      const fig = document.createElement("figure");
      fig.className = "diagram";
      const box = document.createElement("div");
      box.className = "diagram-svg";
      box.setAttribute("role", "img");
      box.setAttribute("aria-label", "Diagram. The source is under the figure.");
      box.innerHTML = svg; // mermaid sanitises its own output in strict mode
      const det = document.createElement("details");
      const sum = document.createElement("summary");
      sum.textContent = "Diagram source";
      det.append(sum, pre.cloneNode(true));
      (det.querySelector("pre") as HTMLElement).className = "";
      fig.append(box, det);
      pre.replaceWith(fig);
    } catch {
      pre.classList.add("mermaid-failed"); // keep the source block visible
    }
  }
  document.querySelectorAll('body > [id^="dmmd-"]').forEach((e) => e.remove());
}
