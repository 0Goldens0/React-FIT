import ArticleDetailPage from '../../../screens/ArticleDetailPage'
import { articles } from '../../../data/articles'
import { extractMediaUrl, fetchCmsArticleBySlug } from '../../../utils/cms'
import type { Metadata } from 'next'

const isGh = process.env.GITHUB_ACTIONS === 'true'

export async function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  // For GitHub Pages static export we don't rely on external CMS.
  const local = articles.find((a) => a.id === id)
  if (isGh) {
    return {
      title: local ? `${local.title} — FIT` : 'Статья — FIT',
      description: local?.description || undefined,
    }
  }

  try {
    const cms = await fetchCmsArticleBySlug(id)
    const title = cms?.seoTitle || cms?.title || local?.title || 'Статья'
    const description = cms?.seoDescription || cms?.excerpt || local?.description || undefined
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
      title: local ? `${local.title} — FIT` : 'Статья — FIT',
      description: local?.description || undefined,
    }
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ArticleDetailPage id={id} />
}

