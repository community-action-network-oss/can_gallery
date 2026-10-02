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

export const MAIN_NAV = [
  { href: "/", label: "What is CAN" },
  { href: "/how-it-works/", label: "How it works" },
  { href: "/where-you-fit/", label: "Where you fit" },
  { href: "/contribute/", label: "Help build it" },
] as const;

export const DEEPER_NAV = [
  { href: "/docs/", label: "Read everything" },
  { href: "/open-questions/", label: "Open questions" },
  { href: "/how-decisions-are-made/", label: "How decisions are made" },
  { href: "/community-policy/", label: "Community policy" },
  { href: "/lawful-everywhere/", label: "Lawful everywhere" },
  { href: "/archive-and-reuse/", label: "The Archive and reuse" },
  { href: "/re-resolution/", label: "When rules improve" },
  { href: "/proof/", label: "How CAN proves its rules" },
  { href: "/whats-new/", label: "What is new" },
  { href: "/roadmap/", label: "Roadmap" },
  { href: "/principles/", label: "Principles" },
] as const;
