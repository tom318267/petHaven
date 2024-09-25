/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "placehold.co",
      "randomuser.me",
      "image.chewy.com",
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Exclude test files from the production build
    if (!dev && !isServer) {
      config.exclude = [...(config.exclude || []), /\/__tests__\/.+/];
    }
    return config;
  },
};

export default nextConfig;
