/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a production build run alongside `next dev` (which owns .next) without clobbering it.
  distDir: process.env.NEXT_DIST_DIR || '.next',
}
module.exports = nextConfig
