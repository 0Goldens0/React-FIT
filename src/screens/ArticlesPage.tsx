'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { articles } from '../data/articles'
import './ArticlesPage.css'

const ArticlesPage = () => {
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
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="article-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Link href={`/articles/${article.id}`}>
                <div className="article-card-content">
                  <div className="article-meta">
                    <span className="article-category">{article.category}</span>
                    <span className="article-date">
                      {new Date(article.date).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
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

