'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { articles } from '../data/articles'
import { extractMediaUrl, fetchCmsArticles } from '../utils/cms'
import { formatArticleCategory } from '../utils/articleCategories'
import './ArticlesPage.css'

const ArticlesPage = () => {
  const [cmsItems, setCmsItems] = useState<
    Array<{
      id: number
      title: string
      slug: string
      category: string
      date: string
      description: string
      coverUrl?: string
    }>
  >([])

  useEffect(() => {
    let cancelled = false
    fetchCmsArticles()
      .then((res) => {
        const items = res
          .map((a) => ({
            id: a.id,
            title: a.title,
            slug: a.slug,
            category: a.category || 'other',
            date: a.publishedDate || '',
            description: a.excerpt || '',
            coverUrl: extractMediaUrl((a as any).coverImage),
          }))
          .filter((a) => a.slug)
        if (!cancelled) setCmsItems(items)
      })
      .catch(() => {
        // keep fallback to local articles
      })
    return () => {
      cancelled = true
    }
  }, [])

  const items = useMemo(() => {
    if (cmsItems.length > 0) return cmsItems
    return articles.map((a) => ({
      id: 0,
      title: a.title,
      slug: a.id,
      category: a.category,
      date: a.date,
      description: a.description,
      coverUrl: a.image,
    }))
  }, [cmsItems])

  return (
    <div className="articles-page">
      <Header />
      <main className="articles-content">
        <div className="articles-hero">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Товарные статьи
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Полезная информация о нашей продукции и технологиях
          </motion.p>
        </div>

        <div className="articles-grid">
          {items.map((article, index) => (
            <motion.article
              key={article.slug}
              className="article-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Link href={`/articles/${article.slug}`}>
                {article.coverUrl ? (
                  <div className="article-card-image-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.coverUrl}
                      alt={article.title}
                      className="article-card-image"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                <div className="article-card-content">
                  <div className="article-meta">
                    <span className="article-category">{formatArticleCategory(article.category)}</span>
                    {article.date ? (
                      <span className="article-date">
                        {new Date(article.date).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-description">{article.description}</p>

                  <div className="article-read-more">
                    Читать статью
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ArticlesPage

