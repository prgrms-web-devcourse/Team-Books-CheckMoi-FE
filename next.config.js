/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: [
      "shopping-phinf.pstatic.net",
      "s3.ap-northeast-2.amazonaws.com",
      "via.placeholder.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/naver",
        destination: "https://openapi.naver.com/v1/search/book.json",
      },
      {
        source: "/api",
        destination: `${process.env.NEXT_PUBLIC_API_END_POINT}`,
      },
    ];
  },
};

module.exports = nextConfig;
