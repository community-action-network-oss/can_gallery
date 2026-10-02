import type { NextConfig } from "next";
import { withGluestackUI } from "@gluestack/ui-next-adapter";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default withGluestackUI(nextConfig);
