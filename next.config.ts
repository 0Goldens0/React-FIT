import path from 'node:path'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fixes workspace root inference when there are multiple lockfiles up the tree.
  outputFileTracingRoot: path.join(__dirname),
}

export default nextConfig


