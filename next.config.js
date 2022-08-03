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
    domains: ["i.picsum.photos", "picsum.photos", "shopping-phinf.pstatic.net"],
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