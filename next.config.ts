import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "192.168.200.37"],
  turbopack: {},
};

export default nextConfig;
