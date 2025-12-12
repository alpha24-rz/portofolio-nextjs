/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Image optimization: allow Next.js to perform built-in image
  // optimization and serve modern formats where supported.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  swcMinify: true,
}

export default nextConfig
