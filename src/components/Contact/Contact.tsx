import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, Send, User, Building, MapPin, MessageSquare, Sparkles } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Сброс формы через 4 секунды
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' })
      setIsSubmitted(false)
    }, 4000)
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
    <section id="contact" className="contact-section" ref={ref}>
      {/* Анимированный космический фон */}
      <div className="contact-cosmic-bg">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="cosmic-orb"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50]
            } : {}}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

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
                    <div className="floating-input-group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={focusedField === 'name' || formData.name ? 'focused' : ''}
                      />
                      <label>
                        <User size={18} />
                        Ваше имя
                      </label>
                      <div className="input-border"></div>
                    </div>

                    <div className="floating-input-group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={focusedField === 'email' || formData.email ? 'focused' : ''}
                      />
                      <label>
                        <Mail size={18} />
                        Email адрес
                      </label>
                      <div className="input-border"></div>
                    </div>
                  </div>

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

                  <div className="floating-input-group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      className={focusedField === 'message' || formData.message ? 'focused' : ''}
                    />
                    <label>
                      <MessageSquare size={18} />
                      Ваше сообщение
                    </label>
                    <div className="input-border"></div>
                  </div>

                  <motion.button 
                    type="submit" 
                    className="submit-modern-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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