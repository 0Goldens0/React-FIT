import BrandPage from '../../../screens/BrandPage'

// Allow new brands from CMS (and Strapi preview URLs) to resolve without rebuilding the frontend.
// NOTE: dynamicParams is not compatible with "output: export", so we disable it for GitHub Pages.
// For GitHub Pages static export, only the brands in generateStaticParams will work.
export const dynamicParams = process.env.GITHUB_ACTIONS !== 'true'

export async function generateStaticParams() {
  // Keep in sync with BrandPage brandData keys
  return ['fit', 'cutop', 'mos', 'mastercolor', 'kypc', 'xbat'].map((brandId) => ({ brandId }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params
  return <BrandPage brandId={brandId} />
}


