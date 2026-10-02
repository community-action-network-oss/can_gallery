import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/A";
import { localePath } from "@/lib/paths";
import { Pictogram } from "@/components/Pictogram";
import { PageHead, Section, Planned } from "@/components/ui";
import { ROLES } from "@/content/roles/data";
import { FOUNDING_RULES, NO_AUTHORITY, URGENT_SENTENCE } from "@/content/roles/types";
import "./roles.css";

export const metadata: Metadata = pageMetadata("/contribute/roles/", "Roles", "Founding roles for people who want to help build CAN: what you can do now, what to know first, and how your work is reviewed.");

export default function Page() {
  return (
    <>
      <PageHead title="Roles" lede="Pick the role closest to what you know. Every role page has the same fields in the same order." />
      <Section id="founding" title="Founding roles" wide>
        <p className="prose">{URGENT_SENTENCE} <Planned /></p>
        <ul className="rows">
          {ROLES.map((r) => (
            <li key={r.slug} className="role-row">
              <Pictogram name={r.pictogram} ink="cobalt" size={44} title="" />
              <span>
                <strong><Link href={localePath(`/contribute/roles/${r.slug}/`)}>{r.name}</Link></strong>
                <span className="d">{r.summary}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="prose small">{NO_AUTHORITY}</p>
        <ul className="prose small">{FOUNDING_RULES.map((t) => <li key={t}>{t}</li>)}</ul>
        <p className="prose small">Not on the list? The <Link href={localePath("/contribute/")}>contribute page</Link> has more ways in, and the <Link href={localePath("/where-you-fit/")}>where you fit page</Link> is for anyone with any expertise.</p>
      </Section>
    </>
  );
}
