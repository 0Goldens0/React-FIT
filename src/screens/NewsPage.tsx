'use client'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const NewsPage = () => {
  return (
    <div className="info-page">
      <Header />
      <main className="info-content">
        <div className="info-header">
          <h1>Новости компании</h1>
          <p>Актуальные новости и события FIT</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default NewsPage

