'use client'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const PrivacyPage = () => {
  return (
    <div className="info-page">
      <Header />
      <main className="info-content">
        <div className="info-header">
          <h1>Политика конфиденциальности</h1>
          <p>Правила обработки персональных данных</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PrivacyPage

