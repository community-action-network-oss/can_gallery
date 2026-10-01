/**
 * Single place for links that depend on where the project is hosted.
 *
 * REPO_URL stays "#repository-coming-soon" until a remote exists. While it
 * starts with "#", every repository link renders the text
 * "Repository link coming soon" and points at the footer note. To go live, set
 * REPO_URL to the real https URL (no trailing slash); links to docs then
 * resolve to `${REPO_URL}/blob/main/<path>` automatically.
 */
export const REPO_URL = "#repository-coming-soon";
export const REPO_LINK_TEXT = "Repository link coming soon";
export const REPO_LIVE = REPO_URL.startsWith("http");

export const docUrl = (path: string): string | null =>
  REPO_LIVE ? `${REPO_URL}/blob/main/${path}` : null;

export const SITE_NAME = "Community Action Network";
export const SITE_SHORT = "CAN";

export const NAV = [
  { href: "/how-it-works/", label: "How it works" },
  { href: "/contribute/", label: "Contribute" },
  { href: "/open-questions/", label: "Open questions" },
  { href: "/roadmap/", label: "Roadmap" },
  { href: "/principles/", label: "Principles" },
] as const;
