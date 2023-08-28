const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'openai-labs-public-images-prod.azureedge.net',
      //   port: '',
      // },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'file.jerrysu.net',
        port: '',
      },
    ],
  },
  webpack: (config) => {
    config.module = {
        ...config.module,
        rules: [
            ...config.module.rules,
            { test: /\.md$/, use: 'raw-loader' }
        ],
    }
    return config
  }
}

module.exports = nextConfig
