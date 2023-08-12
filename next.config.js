/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openai-labs-public-images-prod.azureedge.net',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
