import path from 'node:path'

import type { NextConfig } from 'next'

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
// Static export should only be enabled for GitHub Pages builds (CI),
// otherwise it breaks Next.js Route Handlers in local dev (e.g. /api/preview).
const isStaticExport =
  isGithubActions ||
  process.env.NEXT_EXPORT === 'true' ||
  process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'React-FIT'
const basePath = isStaticExport ? `/${repoName}` : ''

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // GitHub Pages requires a static export
  output: isStaticExport ? 'export' : undefined,
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
  webpack: (config, { dev }) => {
    // In local dev, Strapi (./cms) and its uploads change a lot (docker volumes, installs),
    // which can cause Next dev server to constantly invalidate/recompile and make navigation feel laggy.
    if (dev) {
      const extraIgnored = [
        '**/cms/**',
        '**/cms/**/node_modules/**',
        '**/cms/**/.cache/**',
        '**/cms/**/.tmp/**',
        '**/cms/**/build/**',
        '**/cms/**/public/uploads/**',
      ]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existing = (config.watchOptions && (config.watchOptions as any).ignored) ?? []
      const existingArr = Array.isArray(existing) ? existing : [existing]
      // Webpack schema in Next dev expects ignored globs as non-empty strings.
      const existingStrings = existingArr.filter((x) => typeof x === 'string' && x.trim().length > 0) as string[]
      config.watchOptions = {
        ...(config.watchOptions || {}),
        ignored: [...existingStrings, ...extraIgnored],
      }
    }
    return config
  },
}

export default nextConfig


