'use client'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const ArticlesPage = () => {
  return (
    <div className="info-page">
      <Header />
      <main className="info-content">
        <div className="info-header">
          <h1>Товарные статьи</h1>
          <p>Полезная информация о нашей продукции</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ArticlesPage

