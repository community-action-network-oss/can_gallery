import { DEEPER_NAV, MAIN_NAV, SITE_NAME, SITE_SHORT, docUrl } from "@/config/site";
import { PRIVACY_URL, THIRD_PARTY } from "@/config/docs-origin.mjs";
import { Box } from "./ui/box";
import { Divider } from "./ui/divider/index.web";
import { Link } from "./ui/link/index.web";
import { Text } from "./ui/text";
import { DeeperMenu } from "./DeeperMenu";
import { RepoLink } from "./ui";

// The shell is built from the customised gluestack web variants (D-80). All of them are server
// components, so the shell adds no client JavaScript beyond the small 'Go deeper' menu.

const WRAP = "w-full max-w-6xl mx-auto px-4";

export function Header() {
  return (
    <header className="site-header">
      <Box className={`${WRAP} flex-row flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3`}>
        <Link href="/" quiet className="brand font-bold no-underline px-0 gap-3" aria-label={`${SITE_NAME}, home`}>
          <span className="brand-mark" aria-hidden="true">{SITE_SHORT}</span>
          <span>{SITE_NAME}</span>
        </Link>
        <nav aria-label="Main">
          <ul className="nav">
            {MAIN_NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} quiet>{n.label}</Link>
              </li>
            ))}
            <li>
              <DeeperMenu label="Go deeper">
                <ul className="deeper-list">
                  {DEEPER_NAV.map((n) => (
                    <li key={n.href}>
                      <Link href={n.href} quiet>{n.label}</Link>
                    </li>
                  ))}
                </ul>
              </DeeperMenu>
            </li>
          </ul>
        </nav>
      </Box>
      <Divider />
      <Box className="bg-background-50 py-2">
        <Text size="sm" className={`${WRAP} block status-strip text-typography-700`}>
          Concept and early scaffolding. Nothing here handles real problems yet.
        </Text>
      </Box>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Box className={`${WRAP} grid gap-8 md:grid-cols-[1.4fr_0.8fr_1.2fr]`}>
        <Box>
          <p className="footer-title">{SITE_NAME}</p>
          <p>
            An open source project to move public problems from evidence to a
            lawful solution to a verified outcome. Concept and early
            scaffolding: it is not yet an emergency, legal, medical,
            government or individual case service. If someone is in danger,
            contact your local emergency number.
          </p>
        </Box>
        <nav aria-label="Footer">
          <p className="footer-title">Explore</p>
          <ul className="footer-links">
            {[...MAIN_NAV.slice(1), ...DEEPER_NAV].map((n) => (
              <li key={n.href}>
                <Link href={n.href} quiet>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Box className="footer-repo">
          <p className="footer-title">Repository</p>
          <p>
            <RepoLink />. The code, specification and open questions are
            public work in progress on GitHub.
          </p>
          <p>
            MIT licensed: anyone may use, copy and adapt it.{" "}
            <Link href={docUrl("LICENSE")}>Read the license</Link>.
          </p>
          <p>
            This site has no forms, no cookies and no analytics.
            {THIRD_PARTY
              ? " Only the Read everything pages ask GitHub for the current text of a document, so GitHub can see your IP address then."
              : " It makes no third-party requests."}{" "}
            {THIRD_PARTY && <Link href={PRIVACY_URL}>GitHub privacy statement</Link>}
            {THIRD_PARTY && ". "}
            CAN is a non-monetary project.
          </p>
        </Box>
      </Box>
    </footer>
  );
}
