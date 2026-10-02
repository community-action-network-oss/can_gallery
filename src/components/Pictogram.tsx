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
  manager: person(
    <>
      <path d="M7.500 5.500h9V3.500h-9zM6 5h12v1.500H6z" />
      <path className="cut" d="M9.500 14.500a2 2 0 1 1 3.900.5H16v1.500h-1v1.500h-1.500V16.500h-.5a2 2 0 0 1-3.500-2z" />
    </>,
  ),
  teacher: person(<path className="cut" d="M7.500 14h4v6h-4zM12.500 14h4v6h-4z" />),
  driver: person(
    <>
      <path d="M7.500 4.500a4.500 4.500 0 0 1 9 0z" />
      <path className="cut" d="M12 13.500a3.500 3.500 0 1 1 0 7 3.500 3.500 0 0 1 0-7zm0 1.500a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </>,
  ),
  noticed: (
    <>
      <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
      <path className="cut" d="M10.800 6.500h2.400l-.5 7h-1.400zM10.800 15.500h2.400v2.400h-2.400z" />
    </>
  ),
  shaped: (
    <>
      <path d="M2 3h20v14H14l-5 4v-4H2z" />
      <path className="cut" d="M5.500 7h13v1.800h-13zM5.500 11h8v1.800h-8z" />
    </>
  ),
  fixed: (
    <>
      <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
      <path className="cut" d="M6.500 12.300l1.800-1.800 2.500 2.500 5-5 1.800 1.800-6.800 6.800z" />
    </>
  ),
  kept: (
    <>
      <path d="M2 4h20v5H2z" />
      <path d="M3.500 10.500h17V21h-17z" />
      <path className="cut" d="M9 13h6v2.200H9z" />
    </>
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
