'use client'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const TermsPage = () => {
  return (
    <div className="info-page">
      <Header />
      <main className="info-content">
        <div className="info-header">
          <h1>Условия использования</h1>
          <p>Правила и условия работы с сайтом</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default TermsPage

