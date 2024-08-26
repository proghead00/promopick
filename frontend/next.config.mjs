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

  reactStrictMode: false, // else, it renders twice in dev mode and count via socket would be increased once more
};

export default nextConfig;
