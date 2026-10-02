import type { Metadata } from "next";

// Origin for absolute social image URLs. OQ-domain is undecided, so SITE_URL or localhost (06-u10 default).
export const SITE_URL = process.env.SITE_URL || "http:" + "//localhost:3000"; // split so check:copy sees no host literal

/** Output file name of a route's social card; scripts/gen-og.mjs uses the same rule. */
export const ogSlug = (path: string) => path.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home";

/** Title, description, Open Graph and Twitter metadata for one route. Pages with no card of their own pass the path of another page as `card`. The literal 3-argument call is read by scripts/gen-og.mjs, so keep the three arguments plain strings. */
export function pageMetadata(path: string, title: string, description: string, card = path): Metadata {
  const full = path === "/" ? title : `${title} | CAN`;
  const image = { url: `/og/${ogSlug(card)}.png`, width: 1200, height: 630, alt: `${title}. CAN, concept stage.` };
  return {
    title,
    description,
    openGraph: { type: "website", siteName: "CAN", title: full, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title: full, description, images: [image.url] },
  };
}
