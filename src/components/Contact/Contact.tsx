import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Send, User, Building, MapPin, MessageSquare, Sparkles } from 'lucide-react'
import './Contact.css'

interface FormErrors {
  name?: string
  email?: string
  company?: string
  message?: string
  privacy?: string
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '' // Скрытое поле для ботов
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false)
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)

  // Функция валидации отдельного поля
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Имя обязательно для заполнения'
        }
        if (value.trim().length < 2) {
          return 'Имя должно содержать минимум 2 символа'
        }
        if (value.trim().length > 50) {
          return 'Имя не может быть длиннее 50 символов'
        }
        if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value)) {
          return 'Имя может содержать только буквы, пробелы и дефисы'
        }
        break
      
      case 'email':
        if (!value.trim()) {
          return 'Email обязателен для заполнения'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return 'Введите корректный email адрес'
        }
        break
      
      case 'message':
        if (!value.trim()) {
          return 'Сообщение обязательно для заполнения'
        }
        if (value.trim().length < 10) {
          return 'Сообщение должно содержать минимум 10 символов'
        }
        if (value.trim().length > 1000) {
          return 'Сообщение не может быть длиннее 1000 символов'
        }
        break
      
      default:
        return undefined
    }
    return undefined
  }

  // Валидация всей формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    newErrors.name = validateField('name', formData.name)
    newErrors.email = validateField('email', formData.email)
    newErrors.message = validateField('message', formData.message)
    
    if (!isPrivacyAccepted) {
      newErrors.privacy = 'Необходимо согласие на обработку персональных данных'
    }
    
    setErrors(newErrors)
    
    // Возвращаем true если нет ошибок
    return !Object.values(newErrors).some(error => error !== undefined)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Валидация при изменении, если поле уже было "тронуто"
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    // Валидация при потере фокуса
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
    setFocusedField(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // ЗАЩИТА: Проверка времени между отправками (минимум 30 секунд)
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    const minDelay = 30000; // 30 секунд
    
    if (timeSinceLastSubmit < minDelay && lastSubmitTime > 0) {
      const remainingSeconds = Math.ceil((minDelay - timeSinceLastSubmit) / 1000);
      alert(`Пожалуйста, подождите ${remainingSeconds} секунд перед повторной отправкой.`);
      return;
    }
    
    // Отмечаем все поля как "тронутые"
    setTouched({
      name: true,
      email: true,
      message: true
    })
    
    // Валидация формы
    if (!validateForm()) {
      return // Останавливаем отправку если есть ошибки
    }
    
    // ЗАЩИТА: Проверка honeypot (если заполнено - это бот)
    if (formData.honeypot) {
      // Делаем вид что отправили
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 4000);
      }, 2000);
      return;
    }
    
    setIsSubmitting(true)
    
    try {
      // Отправка на backend API
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3070'
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message
          // honeypot НЕ отправляем
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка при отправке сообщения')
      }
      
      if (data.previewUrl) {
        // Открываем письмо в новой вкладке для теста
        window.open(data.previewUrl, '_blank')
      }
      
      // Сохраняем время отправки
      setLastSubmitTime(now)
    setIsSubmitted(true)
    
    // Сброс формы через 4 секунды
    setTimeout(() => {
        setFormData({ name: '', email: '', company: '', message: '', honeypot: '' })
      setIsSubmitted(false)
        setIsPrivacyAccepted(false)
        setErrors({})
        setTouched({})
    }, 4000)
      
    } catch (error) {
      alert('Не удалось отправить сообщение. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePrivacyPolicyClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // TODO: Открыть модальное окно с политикой конфиденциальности
  }

  const handlePersonalDataClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // TODO: Открыть модальное окно с согласием на обработку персональных данных
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Позвонить',
      content: '8 (800) 511-12-33',
      description: 'Звонок по России бесплатный',
      color: 'from-yellow-400 to-amber-400',
      delay: 0.1
    },
    {
      icon: Mail,
      title: 'Написать',
      content: 'info@instrument-fit.ru',
      description: 'Ответим в течение часа',
      color: 'from-yellow-500 to-orange-400',
      delay: 0.2
    },
    {
      icon: MapPin,
      title: 'Офис',
      content: 'Москва, Россия',
      description: 'Работаем по всей стране',
      color: 'from-amber-400 to-yellow-500',
      delay: 0.3
    }
  ]

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Заголовок секции */}
        <motion.div 
          className="contact-hero"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles size={16} />
            <span>Готовы к сотрудничеству</span>
          </motion.div>
          
          <h2 className="contact-hero-title">
            Связаться с нами —
            <span className="title-highlight"> просто</span>
          </h2>
          
          <p className="contact-hero-description">
            Обсудим партнерство, ответим на вопросы, поможем с выбором оборудования. 
            Мы всегда на связи!
          </p>
        </motion.div>

        {/* Основной контент - плашки слева, форма справа */}
        <div className="contact-main-content">
          {/* Методы связи */}
          <div className="contact-methods-sidebar">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className="contact-method-card"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: method.delay }}
                viewport={{ once: true }}
                whileHover={{ 
                  x: 10, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className={`method-icon-container bg-gradient-to-r ${method.color}`}>
                  <method.icon size={24} />
                </div>
                
                <div className="method-content">
                  <h3 className="method-title">{method.title}</h3>
                  <p className="method-main">{method.content}</p>
                  <p className="method-description">{method.description}</p>
                </div>
                
                <div className="method-hover-effect"></div>
              </motion.div>
            ))}
          </div>

          {/* Форма связи */}
          <motion.div 
            className="contact-form-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="form-container">
              <div className="form-header">
                <h3>Отправить сообщение</h3>
                <p>Заполните форму, и мы свяжемся с вами в ближайшее время</p>
              </div>
              
              {isSubmitted ? (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="success-icon"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: 2 }}
                  >
                    ✨
                  </motion.div>
                  <h4>Сообщение отправлено!</h4>
                  <p>Спасибо за ваш интерес. Мы свяжемся с вами в ближайшее время.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="modern-form">
                  <div className="form-row">
                    <div className={`floating-input-group ${errors.name && touched.name ? 'error' : ''}`}>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={handleBlur}
                        className={focusedField === 'name' || formData.name ? 'focused' : ''}
                      />
                      <label>
                        <User size={18} />
                        Ваше имя *
                      </label>
                      <div className="input-border"></div>
                      {errors.name && touched.name && (
                        <span className="error-message">{errors.name}</span>
                      )}
                    </div>

                    <div className={`floating-input-group ${errors.email && touched.email ? 'error' : ''}`}>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={handleBlur}
                        className={focusedField === 'email' || formData.email ? 'focused' : ''}
                      />
                      <label>
                        <Mail size={18} />
                        Email адрес *
                      </label>
                      <div className="input-border"></div>
                      {errors.email && touched.email && (
                        <span className="error-message">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Скрытое honeypot поле для защиты от ботов */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      opacity: 0,
                      pointerEvents: 'none'
                    }}
                    aria-hidden="true"
                  />

                  <div className="floating-input-group">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className={focusedField === 'company' || formData.company ? 'focused' : ''}
                    />
                    <label>
                      <Building size={18} />
                      Компания (необязательно)
                    </label>
                    <div className="input-border"></div>
                  </div>

                  <div className={`floating-input-group ${errors.message && touched.message ? 'error' : ''}`}>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={handleBlur}
                      rows={4}
                      className={focusedField === 'message' || formData.message ? 'focused' : ''}
                    />
                    <label>
                      <MessageSquare size={18} />
                      Ваше сообщение *
                    </label>
                    <div className="input-border"></div>
                    {errors.message && touched.message && (
                      <span className="error-message">{errors.message}</span>
                    )}
                  </div>

                  <div className={`privacy-consent ${errors.privacy ? 'error' : ''}`}>
                    <label className="privacy-checkbox-label">
                      <input
                        type="checkbox"
                        checked={isPrivacyAccepted}
                        onChange={(e) => {
                          setIsPrivacyAccepted(e.target.checked)
                          if (e.target.checked) {
                            setErrors(prev => ({ ...prev, privacy: undefined }))
                          }
                        }}
                        className="privacy-checkbox"
                      />
                      <span className="checkbox-custom"></span>
                      <span className="privacy-text">
                        Я ознакомлен с{'\u00A0'}
                        <button type="button" onClick={handlePrivacyPolicyClick} className="privacy-link">
                          «Политикой в{'\u00A0'}отношении обработки персональных данных»
                        </button>
                        {'\u00A0'}и предоставляю{'\u00A0'}
                        <button type="button" onClick={handlePersonalDataClick} className="privacy-link">
                          «Согласие на{'\u00A0'}обработку персональных данных»
                        </button>
                      </span>
                    </label>
                    {errors.privacy && (
                      <span className="error-message">{errors.privacy}</span>
                    )}
                  </div>

                  <motion.button 
                    type="submit" 
                    className="submit-modern-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: !isSubmitting ? 1.02 : 1 }}
                    whileTap={{ scale: !isSubmitting ? 0.98 : 1 }}
                  >
                    <span className="btn-content">
                      {isSubmitting ? (
                        <>
                          <motion.div 
                            className="btn-spinner"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Отправляем...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Отправить сообщение
                        </>
                      )}
                    </span>
                    <div className="btn-glow"></div>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact 