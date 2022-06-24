/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  externals: {
    FileReader: 'FileReader',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false }
    }
    return config
  },
}

module.exports = nextConfig
