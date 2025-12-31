/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Image optimization: allow Next.js to perform built-in image
  // optimization and serve modern formats where supported.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
}

export default nextConfig
