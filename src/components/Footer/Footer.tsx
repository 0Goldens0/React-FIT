'use client'

import { getAssetPath } from '../../utils/paths'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <img src={getAssetPath("logo/fit-logo-clean.svg")} alt="FIT" className="footer-logo" />
            <p className="footer-text">
            Технологичный инструмент для профессионалов и домашних мастеров.
            </p>
            {/* Соцсети вынесены ниже в общий ряд */}
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
        
        <div className="footer-social footer-social-row">
          <div className="social-item">
            <a className="social-link" href="https://vk.com/fitinstrument" target="_blank" rel="noopener noreferrer" aria-label="VK">
              <img src={getAssetPath('socialmedia/vk.svg')} alt="VK" />
            </a>
            <div className="qr-popup">
              <img src={getAssetPath('socialmedia/qr/vk.svg')} alt="VK QR" />
            </div>
          </div>
          <div className="social-item">
            <a className="social-link" href="https://t.me/fit_instrument" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <img src={getAssetPath('socialmedia/telegram.svg')} alt="Telegram" />
            </a>
            <div className="qr-popup">
              <img src={getAssetPath('socialmedia/qr/tg.svg')} alt="Telegram QR" />
            </div>
          </div>
          <div className="social-item">
            <a className="social-link" href="https://zen.yandex.ru/id/622b0a7200613963284db98c" target="_blank" rel="noopener noreferrer" aria-label="Dzen">
              <img src={getAssetPath('socialmedia/dzen.svg')} alt="Dzen" />
            </a>
            <div className="qr-popup">
              <img src={getAssetPath('socialmedia/qr/dzen.svg')} alt="Dzen QR" />
            </div>
          </div>
          <div className="social-item">
            <a className="social-link" href="https://rutube.ru/channel/24203564/" target="_blank" rel="noopener noreferrer" aria-label="RuTube">
              <img src={getAssetPath('socialmedia/rutube.svg')} alt="RuTube" />
            </a>
            <div className="qr-popup">
              <img src={getAssetPath('socialmedia/qr/rutube.svg')} alt="RuTube QR" />
            </div>
          </div>
          <div className="social-item">
            <a className="social-link" href="https://www.youtube.com/@fit-8949/featured" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <img src={getAssetPath('socialmedia/youtube.svg')} alt="YouTube" />
            </a>
            <div className="qr-popup">
              <img src={getAssetPath('socialmedia/qr/youtube.svg')} alt="YouTube QR" />
            </div>
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