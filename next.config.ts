import type { NextConfig } from "next";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: IMAGE_URL,
      },
    ],
  },
};

export default nextConfig;
