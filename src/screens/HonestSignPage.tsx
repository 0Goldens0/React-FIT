'use client'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const HonestSignPage = () => {
  return (
    <div className="info-page">
      <Header />
      <main className="info-content">
        <div className="info-header">
          <h1>Честный знак</h1>
          <p>Маркировка продукции и работа с системой «Честный ЗНАК»</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HonestSignPage

