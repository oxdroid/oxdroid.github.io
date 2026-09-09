/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Dev-only: allow the React/HMR chunks to load when previewing via 127.0.0.1
  // (Next 16 blocks cross-origin dev resources by default). No effect on the
  // static production export.
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
