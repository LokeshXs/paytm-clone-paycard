/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:"images.pexels.com"
      }
    ]
  }
};
