import ArticleDetailPage from '../../../screens/ArticleDetailPage'
import { articles } from '../../../data/articles'

export const dynamicParams = false

export async function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ArticleDetailPage id={id} />
}

