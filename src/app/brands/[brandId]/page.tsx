import BrandPage from '../../../screens/BrandPage'

export default async function Page({
  params,
}: {
  params: Promise<{ brandId: string }>
}) {
  const { brandId } = await params
  return <BrandPage brandId={brandId} />
}


