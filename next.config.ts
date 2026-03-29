import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configuration options here */
  images: {
    // Ye domains allow karna zaroori hai taake external images load ho sakein
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
};

export default nextConfig;