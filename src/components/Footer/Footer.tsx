import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">FIT</h3>
            <p className="footer-text">
              Профессиональные инструменты с 1996 года. 
              Качество, надежность и инновации.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Контакты</h4>
            <p className="footer-text">info@fit-tools.com</p>
            <p className="footer-text">+7 (495) 123-45-67</p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">География</h4>
            <p className="footer-text">15+ стран присутствия</p>
            <p className="footer-text">1000+ клиентов</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 FIT. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 