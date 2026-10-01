import Link from "next/link";
import { NAV, SITE_NAME, SITE_SHORT, docUrl } from "@/config/site";
import { RepoLink } from "./ui";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link className="brand" href="/" aria-label={`${SITE_NAME}, home`}>
          <span className="brand-mark" aria-hidden="true">{SITE_SHORT}</span>
          <span className="brand-name">{SITE_NAME}</span>
        </Link>
        <nav aria-label="Main">
          <ul className="nav">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="status-strip">
        <span className="wrap">
          Concept and early scaffolding. Nothing here handles real problems yet.
        </span>
      </p>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-title">{SITE_NAME}</p>
          <p>
            An open source project to move public problems from evidence to a
            lawful solution to a verified outcome. Concept and early
            scaffolding: it is not yet an emergency, legal, medical,
            government or individual case service. If someone is in danger,
            contact your local emergency number.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-links">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-repo">
          <p className="footer-title">Repository</p>
          <p>
            <RepoLink />. The code, specification and open questions are
            public work in progress on GitHub.
          </p>
          <p>
            MIT licensed: anyone may use, copy and adapt it.{" "}
            <a href={docUrl("LICENSE")}>Read the license</a>.
          </p>
          <p>
            This site has no forms, no cookies, no analytics and no
            third-party requests. CAN is a non-monetary project.
          </p>
        </div>
      </div>
    </footer>
  );
}
