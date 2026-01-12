'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { CmsBlocks } from '../components/CmsBlocks/CmsBlocks'
import { extractMediaUrl, fetchCmsCompanyNewsBySlug } from '../utils/cms'
import './NewsDetailPage.css'

export default function NewsDetailPage({ slug }: { slug: string }) {
  const [item, setItem] = useState<{
    title: string
    slug: string
    excerpt?: string
    date?: string
    coverUrl?: string
    content?: unknown | null
  } | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchCmsCompanyNewsBySlug(slug)
      .then((res) => {
        if (!res) return
        const coverUrl = extractMediaUrl((res as any).coverImage)
        if (!cancelled) {
          setItem({
            title: res.title,
            slug: res.slug,
            excerpt: res.excerpt || undefined,
            date: res.publishedDate || undefined,
            coverUrl,
            content: res.content || null,
          })
        }
      })
      .catch(() => {
        // keep empty
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <div className="news-detail-page">
      <Header />
      <main className="news-detail-content">
        <Link href="/news" className="news-back-link">
          ← Назад к новостям
        </Link>

        {!item ? (
          <div className="news-detail-card">
            <div className="news-detail-hero">
              <h1 className="news-detail-title">Новость не найдена</h1>
              <p className="news-detail-excerpt">Проверьте ссылку или вернитесь к списку новостей.</p>
            </div>
          </div>
        ) : (
          <article className="news-detail-card">
            <header className="news-detail-hero">
              <h1 className="news-detail-title">{item.title}</h1>
              {item.date ? (
                <div className="news-detail-date">
                  {new Date(item.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              ) : null}
              {item.excerpt ? <p className="news-detail-excerpt">{item.excerpt}</p> : null}
            </header>

            {item.coverUrl ? (
              <div className="news-detail-cover-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="news-detail-cover" src={item.coverUrl} alt={item.title} />
              </div>
            ) : null}

            {item.content ? (
              <div className="news-detail-body">
                <CmsBlocks content={item.content} />
              </div>
            ) : (
              <div className="news-detail-body">
                <p>Контент новости пока не заполнен.</p>
              </div>
            )}
          </article>
        )}
      </main>
      <Footer />
    </div>
  )
}


