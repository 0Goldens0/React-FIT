import NewsDetailPage from '../../../screens/NewsDetailPage'
import { extractMediaUrl, fetchCmsCompanyNewsBySlug } from '../../../utils/cms'
import type { Metadata } from 'next'

// For GitHub Pages static export, we don't have CMS data at build time.
// Return empty array so no news detail pages are pre-rendered (they'll 404 without CMS).
export async function generateStaticParams() {
  return []
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <NewsDetailPage slug={slug} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  // For GitHub Pages static export we don't rely on external CMS.
  const isGh = process.env.GITHUB_ACTIONS === 'true'
  if (isGh) {
    return {
      title: 'Новости — FIT',
    }
  }

  try {
    const cms = await fetchCmsCompanyNewsBySlug(slug)
    const title = cms?.seoTitle || cms?.title || 'Новости'
    const description = cms?.seoDescription || cms?.excerpt || undefined
    const og = extractMediaUrl(cms?.ogImage) || extractMediaUrl(cms?.coverImage)
    const canonicalUrl = cms?.canonicalUrl || undefined

    return {
      title: `${title} — FIT`,
      description,
      alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
      openGraph: {
        title,
        description,
        images: og ? [{ url: og }] : undefined,
      },
    }
  } catch {
    return {
      title: 'Новости — FIT',
    }
  }
}


