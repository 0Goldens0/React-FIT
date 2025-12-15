import BrandPage from '../../../screens/BrandPage'

export const dynamicParams = false

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


