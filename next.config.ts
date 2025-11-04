import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "npr.brightspotcdn.com",
      },
    ]
  }
};

export default nextConfig;
