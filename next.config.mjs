/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all HTTPS hostnames
      },
      {
        protocol: "http",
        hostname: "**", // Also allow HTTP if needed
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;