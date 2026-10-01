import type { Metadata } from "next";
import { LiveView } from "@/components/LiveView";

export const metadata: Metadata = { title: "Document", description: "A public CAN document, read live from GitHub.", robots: { index: false } };

export default function Page() {
  return <LiveView />;
}
