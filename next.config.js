/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/i2',
                destination: '/static-html/index.html',
            },
        ]
    }
}

module.exports = nextConfig
