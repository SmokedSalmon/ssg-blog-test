const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

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
  webpack: (config) => {
    config.plugins = [
        ...config.plugins,
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, '.next/public') },
            ],
          }),
    ]
    return config
  }
}

module.exports = nextConfig
