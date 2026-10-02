import type { ReactNode } from "react";

/**
 * Public Pictograms (D-80, Direction contract): flat figures on one 24-unit grid, one ink each, solid fills.
 * Few shapes per figure (icon budget: 6 or fewer). Paper-coloured shapes are cut-outs in the figure.
 * Decorative by default (aria-hidden); pass `title` to make a figure meaningful.
 */
const HEAD = <circle cx="12" cy="6.5" r="3.5" />;
const BODY = <path d="M5 24v-7a7 7 0 0 1 14 0v7z" />;
const person = (extra: ReactNode) => (
  <>
    {HEAD}
    {BODY}
    {extra}
  </>
);

const FIGURES = {
  nurse: person(
    <>
      <path d="M8.5 4.5h7V2h-7z" />
      <path className="cut" d="M11 14h2v2h2v2h-2v2h-2v-2H9v-2h2z" />
    </>,
  ),
  cook: person(
    <>
      <path d="M8 4V3a2 2 0 0 1 1.5-2A2.5 2.5 0 0 1 12 0a2.5 2.5 0 0 1 2.5 1A2 2 0 0 1 16 3v1z" />
      <path className="cut" d="M10 15h4v1.5h-4zM10 18h4v1.5h-4z" />
    </>,
  ),
  clerk: person(<path className="cut" d="M9 14.5h6V21H9zM12 12.5l1.5 2h-3z" />),
  electrician: person(
    <>
      <path d="M7.5 6.500a4.5 4.5 0 0 1 9 0z" />
      <path className="cut" d="M13 14l-3.500 4H12l-1 4 4-4.5h-2.5z" />
    </>,
  ),
  student: person(
    <>
      <path d="M12 0.5l9 3-9 3-9-3z" />
      <path className="cut" d="M9 14h6v6H9z" />
    </>,
  ),
  crossing: <path d="M2 4h4v16H2zM7 4h4v16H7zM12 4h4v16h-4zM17 4h5v16h-5z" />,
  bus: (
    <>
      <path d="M3 3h18v15H3z" />
      <path className="cut" d="M5 5.5h6v5H5zM13 5.5h6v5h-6zM5 13h2v2H5zM17 13h2v2h-2z" />
      <path d="M5 18h3v3H5zM16 18h3v3h-3z" />
    </>
  ),
  clinic: (
    <>
      <path d="M3 3h18v18H3z" />
      <path className="cut" d="M10.5 6h3v4.5H18v3h-4.5V18h-3v-4.5H6v-3h4.5z" />
    </>
  ),
  school: (
    <>
      <path d="M12 2l10 6v2H2V8z" />
      <path d="M4 11.5h3V19H4zM10.5 11.5h3V19h-3zM17 11.5h3V19h-3z" />
      <path d="M2 20.5h20V23H2z" />
    </>
  ),
  water: <path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z" />,
} satisfies Record<string, ReactNode>;

export type PictogramName = keyof typeof FIGURES;
export type Ink = "cobalt" | "ochre" | "green";

export function Pictogram({ name, ink = "cobalt", title, size = 48 }: { name: PictogramName; ink?: Ink; title?: string; size?: number }) {
  return (
    <svg
      className={`pict pict-${ink}`}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {FIGURES[name]}
    </svg>
  );
}

/** A chart plate: title, one-line legend, the figures, then a caption. */
export function Plate({ title, legend, caption, children }: { title: string; legend: string; caption?: ReactNode; children: ReactNode }) {
  return (
    <figure className="plate">
      <p className="plate-title">{title}</p>
      <p className="plate-legend">{legend}</p>
      <div className="plate-body">{children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
