/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Image optimization: allow Next.js to perform built-in image
  // optimization and serve modern formats where supported.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // atau lebih spesifik misalnya '/dso07is8k/**'
      },]
  },
  reactStrictMode: true,
}

export default nextConfig
