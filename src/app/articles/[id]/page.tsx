import ArticleDetailPage from '../../../screens/ArticleDetailPage'

export default function Page({ params }: { params: { id: string } }) {
  return <ArticleDetailPage id={params.id} />
}

