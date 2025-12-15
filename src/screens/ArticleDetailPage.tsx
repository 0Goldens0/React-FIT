'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { articles } from '../data/articles'
import './ArticleDetailPage.css'

interface ArticleDetailPageProps {
  id: string
}

const ArticleDetailPage = ({ id }: ArticleDetailPageProps) => {
  const router = useRouter()
  const article = articles.find(a => a.id === id)

  if (!article) {
    return (
      <div className="article-not-found">
        <Header />
        <main className="not-found-content">
          <h1>Статья не найдена</h1>
          <button onClick={() => router.push('/articles')} className="back-button">
            Вернуться к статьям
          </button>
        </main>
        <Footer />
      </div>
    )
  }

  // Парсинг markdown-подобного контента в HTML
  const parseContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Заголовки
        if (line.startsWith('# ')) {
          return `<h1 key="${index}">${line.slice(2)}</h1>`
        }
        if (line.startsWith('## ')) {
          return `<h2 key="${index}">${line.slice(3)}</h2>`
        }
        if (line.startsWith('### ')) {
          return `<h3 key="${index}">${line.slice(4)}</h3>`
        }
        // Списки
        if (line.startsWith('- **')) {
          const text = line.slice(4).replace('**', '</strong>').replace('**', '<strong>')
          return `<li key="${index}"><strong>${text}</li>`
        }
        if (line.startsWith('- ')) {
          return `<li key="${index}">${line.slice(2)}</li>`
        }
        // Жирный текст
        if (line.includes('**')) {
          const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          return `<p key="${index}">${formatted}</p>`
        }
        // Разделитель
        if (line === '---') {
          return `<hr key="${index}" />`
        }
        // Обычный текст
        if (line.trim()) {
          return `<p key="${index}">${line}</p>`
        }
        return ''
      })
      .join('')
  }

  // Находим похожие статьи (той же категории, кроме текущей)
  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3)

  return (
    <div className="article-detail-page">
      <Header />
      
      {/* Градиентный фон */}
      <div className="article-bg-gradient" />
      
      <main className="article-detail-content">
        <div className="article-detail-container">
          <motion.button
            className="back-link"
            onClick={() => router.push('/articles')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ x: -4 }}
          >
            <ArrowLeft size={20} />
            Назад к статьям
          </motion.button>

          <motion.article
            className="article-detail"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <header className="article-header">
              <div className="article-meta-info">
                <span className="article-category-badge">
                  <Tag size={16} />
                  {article.category}
                </span>
                <span className="article-date-badge">
                  <Calendar size={16} />
                  {new Date(article.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <h1 className="article-main-title">{article.title}</h1>
              
              {article.description && (
                <p className="article-lead">{article.description}</p>
              )}
            </header>

            <div 
              className="article-body"
              dangerouslySetInnerHTML={{ __html: parseContent(article.content) }}
            />
          </motion.article>

          {/* Блок похожих статей */}
          {relatedArticles.length > 0 && (
            <motion.section
              className="related-articles-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="related-articles-title">Похожие статьи</h2>
              <div className="related-articles-grid">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id}
                    className="related-article-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                    onClick={() => router.push(`/articles/${relatedArticle.id}`)}
                  >
                    <span className="related-category">{relatedArticle.category}</span>
                    <h3 className="related-title">{relatedArticle.title}</h3>
                    <p className="related-description">{relatedArticle.description}</p>
                    <div className="related-read-more">
                      Читать далее
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ArticleDetailPage

