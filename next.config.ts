import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" }
    ]
  },
  experimental: {
    optimizePackageImports: ["zod"],
    cpus: 2
  }
};

export default nextConfig;
