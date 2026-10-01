// The ONLY place that says where live documents come from (D-67, D-68, D-70).
// To move to a same-domain proxy later: change the two origins, set THIRD_PARTY to false,
// and the privacy note (docs page and footer) disappears. Pages never hard-code these.
export const ORG = "community-action-network-oss";
export const MAIN_REPO = "community_action_network_oss";
export const POLICY_REPO = "can_policy";
export const DOCS_ORIGIN = "https://raw.githubusercontent.com"; // raw files: <origin>/<org>/<repo>/main/<path>
export const TREE_ORIGIN = "https://api.github.com/repos"; // listings: <origin>/<org>/<repo>/git/trees/main?recursive=1
export const THIRD_PARTY = true;
export const PRIVACY_URL = "https://github.com/site/privacy";
export const PRIVACY_NOTE =
  "Documents are read live from GitHub, so GitHub can see your IP address when you open one. This site itself sets no cookies and runs no analytics.";

/** Repo and path inside that repo for a public path of the superproject layout. */
export function repoOf(path) {
  return path.startsWith("can_policy/")
    ? { repo: POLICY_REPO, inner: path.slice("can_policy/".length) }
    : { repo: MAIN_REPO, inner: path };
}
export const rawUrl = (path) => {
  const { repo, inner } = repoOf(path);
  return `${DOCS_ORIGIN}/${ORG}/${repo}/main/${inner}`;
};
export const treeUrl = (repo) => `${TREE_ORIGIN}/${ORG}/${repo}/git/trees/main?recursive=1`;
