import type { Metadata, Viewport } from "next";
import "./tokens.css";
import "./globals.css";
import "./theme.css";
import { htmlAttrs } from "@/lib/locale";
import { Footer, Header } from "@/components/Shell";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export const metadata: Metadata = {
  title: { default: "CAN: solve public problems, with evidence", template: "%s | CAN" },
  description:
    "An open source project to move a public problem from evidence to a lawful solution to a verified, tracked outcome. Concept and early scaffolding. Nothing here handles real problems yet.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E9EEF2" },
    { media: "(prefers-color-scheme: dark)", color: "#14181C" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html {...htmlAttrs()}>
      <body>
        <GluestackUIProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
        </GluestackUIProvider>
      </body>
    </html>
  );
}
