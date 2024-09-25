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
    if (!dev && !isServer) {
      // Exclude test files and any __tests__ directories
      config.module.rules.push({
        test: /\/__tests__\//,
        use: "ignore-loader",
      });
    }
    return config;
  },
};

export default nextConfig;
