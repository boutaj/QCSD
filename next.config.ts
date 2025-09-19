/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; img-src 'self' https: data:; media-src 'none'; script-src 'none'; sandbox;",
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
