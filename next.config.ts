import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'cdn.shopify.com'
            },
            {
              protocol: 'http',
              hostname: '34.10.120.17'
            },
          ],
    }
};

export default nextConfig;
