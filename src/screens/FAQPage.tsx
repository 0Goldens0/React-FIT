'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { getAssetPath } from '../utils/paths'
import { CmsBlocks } from '../components/CmsBlocks/CmsBlocks'
import { fetchCmsFaqs } from '../utils/cms'

type FAQItem = {
  id: number
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'Как стать партнером FIT?',
    answer: 'Для того чтобы стать партнером FIT, свяжитесь с нами через форму на сайте или позвоните по телефону 8 (800) 555-35-35. Наши менеджеры расскажут о условиях партнерства и помогут с оформлением документов.'
  },
  {
    id: 2,
    question: 'Какие бренды вы представляете?',
    answer: 'Мы представляем 8 собственных брендов: FIT, КУРС, CUTOP, MaxPro, MOS, ХВАТ, Master Color и Грейтфлекс. Каждый бренд специализируется на определенной категории товаров для строительства и ремонта.'
  },
  {
    id: 3,
    question: 'Есть ли доставка в регионы?',
    answer: 'Да, мы осуществляем доставку по всей России благодаря развитой логистической инфраструктуре. Наша федеральная структура позволяет обеспечить быструю доставку в любой регион страны.'
  },
  {
    id: 4,
    question: 'Как получить каталог продукции?',
    answer: 'Каталог продукции доступен на двух наших сайтах: fit-emarket.ru для физических лиц и fit24.ru для юридических лиц. Там вы можете ознакомиться со всем ассортиментом и ценами.'
  },
  {
    id: 5,
    question: 'Предоставляете ли вы сертификаты на продукцию?',
    answer: 'Да, вся наша продукция сертифицирована и соответствует российским и международным стандартам качества. Сертификаты предоставляются по запросу.'
  },
  {
    id: 6,
    question: 'Какие условия для оптовых покупателей?',
    answer: 'Для оптовых покупателей действуют специальные условия и скидки в зависимости от объема закупок. Свяжитесь с нашим отделом продаж для получения индивидуального предложения.'
  },
  {
    id: 7,
    question: 'Как долго работает компания FIT?',
    answer: 'Компания FIT работает на рынке с 1996 года. За это время мы стали одним из ведущих B2B дистрибьюторов строительных инструментов и материалов в России.'
  },
  {
    id: 8,
    question: 'Есть ли у вас розничные магазины?',
    answer: 'Мы являемся B2B дистрибьютором и работаем с крупнейшими розничными сетями России. Нашу продукцию можно найти в магазинах наших партнеров по всей стране.'
  }
]

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [cmsFaq, setCmsFaq] = useState<Array<{ id: number; question: string; answer?: unknown | null }>>([])

  useEffect(() => {
    let cancelled = false
    fetchCmsFaqs()
      .then((res) => {
        const items = res.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer ?? null,
        }))
        if (!cancelled) setCmsFaq(items)
      })
      .catch(() => {
        // keep fallback
      })
    return () => {
      cancelled = true
    }
  }, [])

  const items = useMemo(() => {
    if (cmsFaq.length > 0) {
      const localByQuestion = new Map(faqData.map((f) => [f.question, f.answer] as const))
      return cmsFaq.map((f) => {
        const a = (f as any).answer
        const isEmptyBlocks = Array.isArray(a) && a.length === 0
        const isEmptyString = typeof a === 'string' && a.trim().length === 0
        const isMissing = a == null || isEmptyBlocks || isEmptyString
        return {
          ...f,
          answer: isMissing ? (localByQuestion.get(f.question) ?? 'Ответ скоро появится.') : a,
        }
      })
    }
    return faqData.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))
  }, [cmsFaq])

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="faq-page">
      <Header />
      
      <main className="faq-content">
        <div className="faq-container">
          <div className="faq-header">
            <h1 className="faq-title">Частые вопросы</h1>
            <p className="faq-subtitle">
              Ответы на самые популярные вопросы о работе с FIT
            </p>
          </div>

          <div className="faq-list">
            {items.map((item) => (
              <div
                key={item.id}
                className={`faq-item ${openItems.includes(item.id) ? 'open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`faq-icon ${openItems.includes(item.id) ? 'rotated' : ''}`}
                    size={24}
                  />
                </button>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">
                    {typeof (item as any).answer === 'string' ? (
                      (item as any).answer
                    ) : (
                      <CmsBlocks content={(item as any).answer} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-footer">
            <h3>Не нашли ответ на свой вопрос?</h3>
            <p>Свяжитесь с нами по телефону или через форму обратной связи</p>
            <div className="faq-contact-buttons">
              <a href="tel:88005553535" className="faq-button primary">
                8 (800) 555-35-35
              </a>
              <a href={getAssetPath('/contacts')} className="faq-button secondary">
                Связаться с нами
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default FAQPage
