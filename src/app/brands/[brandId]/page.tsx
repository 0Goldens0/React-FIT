import BrandPage from '../../../screens/BrandPage'

// NOTE: For GitHub Pages static export, only the brands listed in generateStaticParams will work.
// On production server with Next.js server, all dynamic brands from CMS work normally.
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


