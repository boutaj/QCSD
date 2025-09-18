/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  eslint: {
    // Don't block production builds on ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't block production builds on TS errors
    ignoreBuildErrors: true,
  },
};
module.exports = nextConfig;
