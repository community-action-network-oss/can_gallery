/**
 * Single place for links that depend on where the project is hosted.
 * REPO_URL is the superproject on GitHub (no trailing slash). Docs resolve to
 * `${REPO_URL}/blob/main/<path>` (`tree` for directories). The other three
 * repositories live in the same organisation. github.com is the only external
 * host the output check allows.
 */
export const REPO_URL = "https://github.com/community-action-network-oss/community_action_network_oss";
export const ORG_URL = "https://github.com/community-action-network-oss";

export const repoUrl = (name: "can_server" | "can_app" | "can_gallery"): string => `${ORG_URL}/${name}`;

export const docUrl = (path: string): string => {
  const policy = path.startsWith("can_policy/") || path === "can_policy";
  const base = policy ? `${ORG_URL}/can_policy` : REPO_URL;
  const inner = policy ? path.replace(/^can_policy\/?/, "") : path;
  return `${base}/${path.endsWith("/") ? "tree" : "blob"}/main/${inner.replace(/\/$/, "")}`.replace(/\/main\/$/, "");
};

export const SITE_NAME = "Community Action Network";
export const SITE_SHORT = "CAN";

export const NAV = [
  { href: "/how-it-works/", label: "How it works" },
  { href: "/contribute/", label: "Contribute" },
  { href: "/docs/", label: "Read everything" },
  { href: "/open-questions/", label: "Open questions" },
  { href: "/roadmap/", label: "Roadmap" },
  { href: "/principles/", label: "Principles" },
] as const;
