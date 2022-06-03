/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  externals: {
    FileReader: "FileReader",
  },

  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
}

module.exports = nextConfig
