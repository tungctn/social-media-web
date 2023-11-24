/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.alias["@/assets"] = path.join(__dirname, "public/assets");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "d2n33bp2yovvw9.cloudfront.net",
        port: "",
        pathname: "/*",
      },
    ],
    // domains: ["d2n33bp2yovvw9.cloudfront.net"],
    unoptimized: true,
  },
  trailingSlash: true,
  // output: "export",

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*` // Proxy to Backend
      }
    ]
  }
};

module.exports = nextConfig;
