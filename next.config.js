/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: "/naver",
        destination: "https://openapi.naver.com/v1/search/book.json",
      },
    ];
  },
};

module.exports = nextConfig;
