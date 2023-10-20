/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "http://localhost:8080/api/:slug*"
      }
    ]
  },

};

module.exports = nextConfig;
