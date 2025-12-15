'use client'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const CertificatesPage = () => {
  return (
    <div className="info-page">
      <Header />
      <main className="info-content">
        <div className="info-header">
          <h1>Сертификаты</h1>
          <p>Документы, подтверждающие качество нашей продукции</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CertificatesPage

