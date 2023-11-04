/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
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
        protocol: 'https',
        hostname: 'd2n33bp2yovvw9.cloudfront.net',
        port: '',
        pathname: '/*',
      },
    ],
  },
  trailingSlash: true,
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
