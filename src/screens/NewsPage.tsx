'use client'

import { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { extractMediaUrl, fetchCmsCompanyNews } from '../utils/cms'
import Link from 'next/link'
import './NewsPage.css'

const NewsPage = () => {
  const [items, setItems] = useState<
    Array<{
      id: number
      title: string
      slug: string
      excerpt?: string
      date?: string
      coverUrl?: string
    }>
  >([])

  useEffect(() => {
    let cancelled = false
    fetchCmsCompanyNews()
      .then((res) => {
        const mapped = res.map((n) => ({
          id: n.id,
          title: n.title,
          slug: n.slug,
          excerpt: n.excerpt || undefined,
          date: n.publishedDate || undefined,
          coverUrl: extractMediaUrl(n.coverImage),
        }))
        if (!cancelled) setItems(mapped)
      })
      .catch(() => {
        // keep empty list for now
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="info-page">
      <Header />
      <main className="info-content">
        <div className="info-header">
          <h1>Новости компании</h1>
          <p>Актуальные новости и события FIT</p>
        </div>

        {items.length > 0 ? (
          <div className="news-list">
            {items.map((n) => (
              <article key={n.id} className="news-card">
                <Link href={`/news/${n.slug}`} className="news-card-link">
                  {n.coverUrl ? (
                    <div className="news-card-image-container">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="news-card-image" src={n.coverUrl} alt={n.title} loading="lazy" />
                    </div>
                  ) : null}

                  <div className="news-card-content">
                    <h3 className="news-card-title">{n.title}</h3>
                    {n.excerpt ? <p className="news-card-excerpt">{n.excerpt}</p> : null}
                    <div className="news-card-meta">
                      {n.date ? (
                        <div className="news-card-date">
                          {new Date(n.date).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                      ) : (
                        <div className="news-card-date"> </div>
                      )}
                      <span className="news-card-action">
                        Читать новость <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="news-empty">Пока нет опубликованных новостей.</div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default NewsPage

