/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "*",
        protocol: "http",
      },

      {
        hostname: "*",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
