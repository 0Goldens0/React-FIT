import path from 'node:path'

import type { NextConfig } from 'next'

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'React-FIT'
const basePath = isGithubActions ? `/${repoName}` : ''

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // GitHub Pages requires a static export
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    // next/image is not compatible with static export unless unoptimized
    unoptimized: true,
  },
  env: {
    // Used by getAssetPath() to prefix static assets on GitHub Pages
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Fixes workspace root inference when there are multiple lockfiles up the tree.
  outputFileTracingRoot: path.join(__dirname),
}

export default nextConfig


