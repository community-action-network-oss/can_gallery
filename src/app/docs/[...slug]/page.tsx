import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LiveDoc } from "@/components/LiveDoc";
import { manifest } from "@/lib/manifest";

export const dynamicParams = false;
export const generateStaticParams = () => manifest().map((e) => ({ slug: e.slug.split("/") }));

const find = async (params: Promise<{ slug: string[] }>) => {
  const slug = (await params).slug.join("/");
  return manifest().find((e) => e.slug === slug);
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const e = await find(params);
  return { title: e?.title ?? "Document", description: "A public CAN document, read live from GitHub." };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const e = await find(params);
  if (!e) notFound();
  return <LiveDoc path={e.path} fallbackTitle={e.title} section={e.section} />;
}
