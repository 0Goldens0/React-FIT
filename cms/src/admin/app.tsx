export default {
  config: {
    // Admin panel UI languages: make it RU-only to avoid any English in the UI
    locales: ['ru'],
    // Extend/override translations to ensure all custom content labels are Russian.
    // NOTE: keys are the original strings used by the admin UI.
    translations: {
      ru: {
        // Content types (sidebar / headers)
        'Product Article': 'Товарные статьи',
        'Company News': 'Новости компании',
        FAQ: 'Частые вопросы',
        'Honest Sign Page': 'Честный знак',
        'Logistics Page': 'Логистика',
        'Partner Logo': 'Логотип партнёра',

        // Field labels (Content Manager)
        title: 'Заголовок',
        slug: 'Слаг',
        excerpt: 'Анонс',
        content: 'Контент',
        category: 'Категория',
        order: 'Порядок',
        question: 'Вопрос',
        answer: 'Ответ',
        subtitle: 'Подзаголовок',
        heroImage: 'Изображение (hero)',
        coverImage: 'Обложка',
        gallery: 'Галерея',
        publishedDate: 'Дата публикации',

        // Logistics page fields (structured)
        heroBadge: 'Бейдж (Hero)',
        heroTitle: 'Заголовок (Hero)',
        heroTitleHighlight: 'Подсветка заголовка (Hero)',
        heroSubtitle: 'Подзаголовок (Hero)',
        heroStats: 'Цифры (Hero)',

        warehouseSectionTitle: 'Заголовок блока “Складская сеть”',
        warehouseSectionContent: 'Текст блока “Складская сеть”',
        warehouseSectionImage: 'Картинка блока “Складская сеть”',

        distributionBadgeNew: 'Бейдж NEW',
        distributionBadgeText: 'Текст бейджа (флагманский проект)',
        distributionTitle: 'Заголовок “Распределительный центр”',
        distributionTitleHighlight: 'Подсветка заголовка “Белый Раст”',
        distributionDescription: 'Описание блока “Белый Раст”',
        distributionSpecs: 'Характеристики (Белый Раст)',
        distributionFeatures: 'Теги/фичи (Белый Раст)',
        distributionImage: 'Картинка (Белый Раст)',

        wmsCards: 'Карточки (WMS/проекты)',

        speedTitle: 'Заголовок блока “Скорость”',
        speedDescription: 'Описание блока “Скорость”',
        warehouses: 'Склады (карточки)',

        ctaTitle: 'Заголовок CTA',
        ctaText: 'Текст CTA',
        ctaButtonText: 'Текст кнопки CTA',
        ctaButtonUrl: 'Ссылка кнопки CTA',

        // SEO fields
        seoTitle: 'SEO заголовок',
        seoDescription: 'SEO описание',
        seoKeywords: 'SEO ключевые слова',
        ogImage: 'OG изображение',
        canonicalUrl: 'Canonical URL',

        // Component fields
        value: 'Значение',
        label: 'Подпись',
        variant: 'Вариант оформления',
        text: 'Текст',
        icon: 'Иконка (emoji)',
        iconVariant: 'Цвет иконки',
        city: 'Город',
        address: 'Адрес',
        status: 'Статус',
        image: 'Картинка',

        // Enum values (keep DB values in EN, but show RU in UI)
        tools: 'Инструменты',
        logistics: 'Логистика',
        company: 'Компания',
        other: 'Другое',
        general: 'Общее',
        'honest-sign': 'Честный знак',
        products: 'Продукция',
        highlight: 'Выделенный (зелёный)',
        highlightAlt: 'Выделенный (жёлтый)',
        default: 'Обычный',
        green: 'Зелёный',
        yellow: 'Жёлтый',
      },
    },
  },
  bootstrap() {
    // Force Russian UI for editors: Strapi stores the chosen locale in browser storage.
    // If the user previously picked English, Strapi will keep using it.
    try {
      if (typeof window === 'undefined') return
      const desired = 'ru'

      // Prevent infinite reload loops
      const guardKey = 'fit_admin_force_ru_done'
      if (sessionStorage.getItem(guardKey) === '1') return

      const keys = [
        'strapi-admin-language',
        'strapiAdminLanguage',
        'strapi-admin-locale',
        'strapiAdminLocale',
      ]

      const current =
        keys.map((k) => window.localStorage.getItem(k)).find((v) => typeof v === 'string' && v.length > 0) || null

      if (current !== desired) {
        keys.forEach((k) => window.localStorage.setItem(k, desired))
        sessionStorage.setItem(guardKey, '1')
        window.location.reload()
      }
    } catch {
      // no-op
    }
  },
};


