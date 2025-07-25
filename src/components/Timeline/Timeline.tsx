import { useEffect, useState, useRef, useCallback } from 'react'
import './Timeline.css'

interface TimelineData {
  year: string
  title: string
  description: string
  fullDescription: string
  keyEvents: string[]
  facts: Array<{
    number: string
    text: string
  }>
  keyPeople?: string[]
  achievements?: string[]
  image?: string
}

const timelineData: TimelineData[] = [
  {
    year: "1996",
    title: "Основание компании",
    description: "Компания Finch Industrial Tools основана тремя учредителями: А.М. Кадисом, А.Е. Власовым и С.В. Моховиком.",
    fullDescription: "Компания Finch Industrial Tools была основана тремя учредителями: А.М. Кадисом, А.Е. Власовым и С.В. Моховиком. Начальный ассортимент формировался из столярно-слесарных инструментов нескольких голландских торговых марок.",
    keyEvents: [
      "Основание компании тремя учредителями",
      "Формирование начального ассортимента из голландских торговых марок",
      "Старт со столярно-слесарных инструментов"
    ],
    keyPeople: ["А.М. Кадис", "А.Е. Власов", "С.В. Моховик"],
    facts: [
      { number: "3", text: "Основателя компании" },
      { number: "100+", text: "Первых позиций" },
      { number: "1", text: "Офис в СПб" }
    ]
  },
  {
    year: "1999",
    title: "Выход на рынок строительного инструмента",
    description: "Приход первых менеджеров по продажам в Санкт-Петербурге. Начало продаж товаров из Голландии (Veto) и Польши (Toya).",
    fullDescription: "Полноценный заход на рынок строительного инструмента начался в 1999 году с приходом первых менеджеров по продажам в Санкт-Петербурге. Компания начинала продажи с товаров из Голландии (Veto) и Польши (Toya), далее начались поставки из Китая.",
    keyEvents: [
      "Приход первых менеджеров по продажам в СПб",
      "Начало продаж товаров Veto (Голландия) и Toya (Польша)",
      "Первые крупные сетевые клиенты: ГК Метизы, Домовой, Агроторг",
      "Работа с городскими сетями: 'Мастеровой' (Пари, МаркетТорг, Атолл, Олви)"
    ],
    achievements: [
      "Первые крупные оптовые покупатели: СанРикс, Балтопотторг, Южный Двор",
      "Розничные покупатели: Гелиос, Сатурн, Макси-Инструмент"
    ],
    facts: [
      { number: "2", text: "Новых бренда" },
      { number: "10+", text: "Первых клиентов" },
      { number: "5", text: "Менеджеров" }
    ]
  },
  {
    year: "2002",
    title: "Регистрация торговой марки FIT в Канаде",
    description: "Международная регистрация бренда стала необходимостью в условиях конкуренции с зарубежными брендами.",
    fullDescription: "В то время успешный бренд обязательно должен был быть зарубежным. Конкуренты уже имели в своих портфелях зарубежные, в основном немецкие бренды, так что зарубежная регистрация была не преимуществом, а необходимостью с учетом конъюнктуры рынка.",
    keyEvents: [
      "Регистрация торговой марки FIT в Канаде",
      "Формирование стартового ассортимента FIT",
      "Включение товарных групп 'Ручной инструмент' и 'Крепеж'"
    ],
    achievements: [
      "Стартовый ассортимент FIT: несколько сотен позиций",
      "Категории: молотки, отвертки, ножовки, ШГИ, крепеж"
    ],
    facts: [
      { number: "1", text: "Торговая марка" },
      { number: "500+", text: "Позиций FIT" },
      { number: "100%", text: "Канадская регистрация" }
    ]
  },
  {
    year: "2003",
    title: "Открытие филиальных структур",
    description: "Открытие распределительных центров в Санкт-Петербурге, Москве и Краснодаре для оптимизации логистики.",
    fullDescription: "В 2003 году появился торговый знак FIT в продаже. Были открыты филиальные структуры в Санкт-Петербурге, Москве и Краснодаре с распределительными центрами для улучшения логистических решений.",
    keyEvents: [
      "Появление торговой марки FIT в продаже",
      "Открытие филиалов в СПб, Москве и Краснодаре",
      "Создание распределительных центров",
      "Внедрение логистических решений"
    ],
    facts: [
      { number: "3", text: "Города присутствия" },
      { number: "1000+", text: "Позиций в продаже" },
      { number: "3", text: "Распред. центра" }
    ]
  },
  {
    year: "2006",
    title: "Расширение филиальной сети",
    description: "Открытие новых филиалов в Екатеринбурге, Казани, Воронеже и Пятигорске. Значительный рост продаж.",
    fullDescription: "Расширение на города-миллионники: Екатеринбург, Казань, Воронеж, Пятигорск. Выбор городов определялся наличием клиентов и необходимостью улучшения сервиса - от быстрой доставки до персонального местного менеджера.",
    keyEvents: [
      "Открытие филиалов в 4 новых городах-миллионниках",
      "Улучшение качества сервиса для существующих клиентов",
      "Назначение персональных местных менеджеров",
      "Организация быстрой доставки в регионах"
    ],
    achievements: [
      "Рост продаж в 3-4 раза в первые годы после открытия филиалов",
      "Переход к 'качеству бизнеса' вместо 'количества'"
    ],
    facts: [
      { number: "4", text: "Новых филиала" },
      { number: "7", text: "Городов присутствия" },
      { number: "400%", text: "Рост продаж" }
    ]
  },
  {
    year: "2007",
    title: "Запуск торговой марки КУРС",
    description: "Создание российского бренда с русским названием для среднего ценового сегмента.",
    fullDescription: "Концепция торговой марки КУРС: российский бренд с русским названием, по доступной цене, с наличием основных товарных групп в ассортименте и идеальным балансом цены и качества. Позиционирование отличалось от FIT более узким ассортиментом и доступными ценами.",
    keyEvents: [
      "Разработка концепции российского бренда КУРС",
      "Позиционирование по доступной цене",
      "Формирование ассортимента из наиболее ходовых позиций",
      "Ориентация на потребность в 'русских' товарах"
    ],
    achievements: [
      "Идеальный баланс цены и качества",
      "Более узкий, но востребованный ассортимент",
      "Удовлетворение потребности в доступных ценах"
    ],
    facts: [
      { number: "1", text: "Новый бренд" },
      { number: "200+", text: "Позиций КУРС" },
      { number: "30%", text: "Ниже цены FIT" }
    ]
  },
  {
    year: "2009",
    title: "Создание торговых марок CUTOP и FDW",
    description: "Расширение портфеля брендов. Развитие интернет-продаж и работы с розничными сетями.",
    fullDescription: "После кризиса 2008 года было принято решение перезагружаться и создавать новые торговые марки CUTOP и FDW. Именно в этот период начался серьезный толчок к открытию филиальных продаж из-за конкуренции с компаниями, имевшими региональные склады.",
    keyEvents: [
      "Создание торговых марок CUTOP и FDW",
      "Перезагрузка после кризиса 2008 года",
      "Начало серьезного развития филиальных продаж",
      "Конкурентная борьба с региональными игроками"
    ],
    achievements: [
      "Расширение портфеля брендов",
      "Адаптация к посткризисным условиям",
      "Укрепление позиций в регионах"
    ],
    facts: [
      { number: "2", text: "Новых бренда" },
      { number: "5", text: "Торговых марок" },
      { number: "12", text: "Регионов работы" }
    ]
  },
  {
    year: "2015",
    title: "Ассортимент 2000 SKU",
    description: "Товарная матрица компании превысила две тысячи позиций. Диверсификация ассортимента.",
    fullDescription: "Ассортимент разрастался с добавлением новых товарных групп (малярный инструмент, измерительный инструмент). Наибольший рост показала оснастка для электроинструмента. Стратегии расширения: диверсификация по товарным группам и увеличение ширины наиболее востребованных категорий.",
    keyEvents: [
      "Достижение 2000 SKU в товарной матрице",
      "Добавление малярного и измерительного инструмента",
      "Диверсификация ассортимента по товарным группам",
      "Расширение наиболее востребованных категорий"
    ],
    achievements: [
      "Наибольший рост оснастки для электроинструмента",
      "Успешная диверсификация товарных групп"
    ],
    facts: [
      { number: "2000", text: "SKU в матрице" },
      { number: "8", text: "Категорий товаров" },
      { number: "200%", text: "Рост оснастки" }
    ]
  },
  {
    year: "2016",
    title: "Портфель специализированных брендов",
    description: "Введение торговых марок MOS, Хват, Master Color и Max Pro для специализированных ниш.",
    fullDescription: "Диверсификация бизнеса компании привела к созданию специализированных брендов. Процесс разработки: постановка задач → определение товарного наполнения → разработка названия и стилистики → подбор поставщиков → запуск продаж.",
    keyEvents: [
      "Введение торговых марок MOS, Хват, Master Color, Max Pro",
      "Диверсификация бизнеса компании",
      "Создание специализированных брендов для конкретных задач",
      "Отработка процесса разработки и запуска новых брендов"
    ],
    achievements: [
      "МОС - инструмент ценовой борьбы (товар первой цены)",
      "ХВАТ - специализация на крепеже",
      "Master Color - комплексное предложение для профессионалов МШИ",
      "Max Pro - качественный эргономичный электроинструмент"
    ],
    facts: [
      { number: "4", text: "Новых бренда" },
      { number: "9", text: "Торговых марок" },
      { number: "4", text: "Рыночные ниши" }
    ]
  },
  {
    year: "2017",
    title: "Расширение до 8000 SKU",
    description: "Значительное расширение товарной матрицы. Внедрение технологий автоматизации управления запасами.",
    fullDescription: "Диверсификация товарных групп, мониторинг ассортимента конкурентов и рынка в целом, реагирование на потребности рынка и запросы клиентов. Управление обширной товарной матрицей с использованием современных технологий автоматизации процессов управления товарными запасами.",
    keyEvents: [
      "Расширение ассортимента до 8000 SKU",
      "Диверсификация товарных групп",
      "Мониторинг конкурентов и рынка",
      "Внедрение автоматизации управления запасами"
    ],
    achievements: [
      "Эффективное управление обширной товарной матрицей",
      "Быстрое реагирование на потребности рынка"
    ],
    facts: [
      { number: "8000", text: "SKU в каталоге" },
      { number: "15", text: "Товарных групп" },
      { number: "100%", text: "Автоматизация" }
    ]
  },
  {
    year: "2019",
    title: "WMS и автоматизация склада",
    description: "Внедрение автоматизированной системы управления складом (WMS). Технологические решения для повышения эффективности.",
    fullDescription: "Внедрение автоматизированной системы управления складом (WMS) значительно повысило эффективность работы компании. Технологические решения позволили оптимизировать процессы складской логистики и управления запасами.",
    keyEvents: [
      "Внедрение системы управления складом (WMS)",
      "Автоматизация складских процессов",
      "Повышение эффективности логистики",
      "Оптимизация управления запасами"
    ],
    achievements: [
      "Значительное повышение эффективности работы",
      "Улучшение качества складской логистики"
    ],
    facts: [
      { number: "1", text: "WMS система" },
      { number: "50%", text: "Рост эффективности" },
      { number: "24/7", text: "Автоматизация" }
    ]
  },
  {
    year: "2020",
    title: "Логистический центр СПб и маркетплейсы",
    description: "Открытие нового распределительного центра. Серьезный заход на маркетплейсы в карантинный период.",
    fullDescription: "Открытие нового регионального логистического центра в Санкт-Петербурге с инновационными технологиями, что изменило скорость доставки. Серьезный заход на маркетплейсы в карантинный 2020 году стал качественным и количественным скачком в продажах и комплексной визуализации продуктов.",
    keyEvents: [
      "Открытие нового логистического центра в СПб",
      "Внедрение инновационных технологий в логистике",
      "Серьезный заход на маркетплейсы",
      "Качественный скачок в онлайн-продажах"
    ],
    achievements: [
      "Значительное улучшение скорости доставки",
      "Полная перестройка понимания рынка",
      "Комплексная визуализация всех продуктов"
    ],
    facts: [
      { number: "1", text: "Новый РЦ" },
      { number: "10+", text: "Маркетплейсов" },
      { number: "500%", text: "Рост онлайн" }
    ]
  },
  {
    year: "2021",
    title: "14000 уникальных покупателей",
    description: "Достижение впечатляющего показателя клиентской базы. Разработка программ лояльности и эффективных каналов привлечения.",
    fullDescription: "Компания достигла показателя в 14000 уникальных покупателей благодаря эффективным программам лояльности и каналам привлечения новых клиентов. Особое внимание уделялось удержанию существующих клиентов.",
    keyEvents: [
      "Достижение 14000 уникальных покупателей",
      "Разработка программ лояльности",
      "Оптимизация каналов привлечения клиентов",
      "Фокус на удержании существующих клиентов"
    ],
    facts: [
      { number: "14000", text: "Уникальных клиентов" },
      { number: "5", text: "Программ лояльности" },
      { number: "85%", text: "Удержание клиентов" }
    ]
  },
  {
    year: "2022",
    title: "Федеральный распределительный центр Москва",
    description: "Открытие федерального распределительного центра в Москве с современными технологиями.",
    fullDescription: "Открытие федерального распределительного центра в Москве кардинально изменило логистическую систему компании. Внедрение современных технологий позволило значительно улучшить качество обслуживания клиентов по всей стране.",
    keyEvents: [
      "Открытие федерального РЦ в Москве",
      "Кардинальные изменения в логистической системе",
      "Внедрение современных технологий",
      "Улучшение обслуживания по всей стране"
    ],
    achievements: [
      "Выход в Белоруссию (2022 год)",
      "Укрепление позиций на федеральном уровне"
    ],
    facts: [
      { number: "1", text: "Федеральный РЦ" },
      { number: "100%", text: "Покрытие РФ" },
      { number: "2", text: "Страны СНГ" }
    ]
  },
  {
    year: "2023",
    title: "Ассортимент 12000 SKU",
    description: "Товарная матрица компании достигла 12000 позиций. \"Живой\" ассортимент с постоянным обновлением.",
    fullDescription: "Товарная матрица компании достигла 12000 позиций. \"Живой\" ассортимент с постоянным обновлением - одни позиции \"отмирают\", другие добавляются. Этот процесс непрерывен. Наибольший рост по-прежнему показывает оснастка для электроинструмента.",
    keyEvents: [
      "Достижение 12000 SKU в товарной матрице",
      "Концепция 'живого' ассортимента",
      "Непрерывное обновление товарной линейки",
      "Постоянный мониторинг эффективности позиций"
    ],
    achievements: [
      "Наибольший рост оснастки для электроинструмента",
      "Эффективное управление широким ассортиментом"
    ],
    facts: [
      { number: "12000", text: "SKU в каталоге" },
      { number: "20", text: "Регионов России" },
      { number: "300%", text: "Рост за 5 лет" }
    ]
  },
  {
    year: "2024",
    title: "Второй офис в Москве",
    description: "Открытие второго офиса в Москве для улучшения сервиса. Новый склад с инновационными решениями.",
    fullDescription: "Открытие второго подразделения продаж в Москве закрывает несколько важных задач. Местонахождение первого офиса смещало внимание на более приближенные районы, а южная часть Москвы и области была недооценена. Цель - одинаково классный сервис для всех клиентов.",
    keyEvents: [
      "Открытие второго офиса продаж в Москве",
      "Улучшение покрытия южной части Москвы и области",
      "Выравнивание качества сервиса по всем районам",
      "Внедрение инновационных решений на новом складе"
    ],
    achievements: [
      "Одинаково высокий уровень сервиса для всех клиентов",
      "Полное покрытие Московского региона"
    ],
    facts: [
      { number: "2", text: "Офиса в Москве" },
      { number: "100%", text: "Покрытие региона" },
      { number: "1", text: "Новый склад" }
    ]
  },
  {
    year: "2025",
    title: "Стратегические планы и международная экспансия",
    description: "Ключевые направления: качество работы, клиентский сервис, освоение зарубежных рынков, внедрение ИИ.",
    fullDescription: "Ключевых направлений развития несколько: качество работы, клиентский сервис, скорость и удобство. Компания начинает подходить к освоению зарубежных рынков - от мощной работы над брендом до автоматизации процессов с применением ИИ. Планы по расширению в новые регионы России (Донецк, Луганск).",
    keyEvents: [
      "Фокус на качество работы и клиентский сервис",
      "Подготовка к освоению зарубежных рынков",
      "Мощная работа над развитием брендов",
      "Внедрение ИИ в автоматизацию процессов",
      "Планы расширения в новые регионы России"
    ],
    achievements: [
      "Уже есть клиенты в Луганске и Донецке",
      "Казахстан с 2013-2014 годов",
      "Белоруссия с 2022 года"
    ],
    facts: [
      { number: "5+", text: "Новых рынков" },
      { number: "100%", text: "ИИ автоматизация" },
      { number: "∞", text: "Возможности роста" }
    ]
  }
]

const Timeline = () => {
  const [currentItem, setCurrentItem] = useState<TimelineData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  const startAnimation = () => {
    const track = trackRef.current
    if (!track) return

    const itemWidth = 450 // 350px width + 100px margin
    const totalItems = timelineData.length
    const totalWidth = itemWidth * totalItems
    const speed = 300 // пикселей в секунду

    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = currentTime
      
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime
      
      positionRef.current = (positionRef.current + (deltaTime * speed / 1000)) % totalWidth
      
      track.style.transform = `translateX(-${positionRef.current}px)`
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    startAnimation()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Защита от непроизвольного наведения с задержкой
  const handleItemHover = useCallback((item: TimelineData) => {
    // Очищаем таймер закрытия если он есть
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }

    // Очищаем предыдущий таймер наведения
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    // Устанавливаем задержку перед открытием (300ms)
    hoverTimeoutRef.current = setTimeout(() => {
      setCurrentItem(item)
      setIsModalOpen(true)
    }, 300)
  }, [])

  // Защита от непроизвольного закрытия с задержкой
  const handleItemLeave = useCallback(() => {
    // Очищаем таймер открытия если он есть
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }

    // Устанавливаем задержку перед закрытием (500ms)
    leaveTimeoutRef.current = setTimeout(() => {
      setIsModalOpen(false)
      setTimeout(() => setCurrentItem(null), 300)
    }, 500)
  }, [])

  // Обработка наведения на модальное окно (предотвращает закрытие)
  const handleModalHover = useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
  }, [])

  // Обработка ухода с модального окна
  const handleModalLeave = useCallback(() => {
    leaveTimeoutRef.current = setTimeout(() => {
      setIsModalOpen(false)
      setTimeout(() => setCurrentItem(null), 300)
    }, 300)
  }, [])

  const closeModal = useCallback(() => {
    // Очищаем все таймеры
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }

    setIsModalOpen(false)
    setTimeout(() => setCurrentItem(null), 300)
  }, [])

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="timeline-section" id="timeline">
      <div className="timeline-bg"></div>
      <div className="container">
        <div className="section-title">
          <h2>НАША ИСТОРИЯ</h2>
          <p>С момента основания в 1996 году компания FIT прошла долгий путь развития, постоянно совершенствуя продукцию и расширяя географию своего присутствия.</p>
        </div>
      </div>
      
      <div 
        className="timeline-container"
        onMouseEnter={() => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = null
          }
        }}
        onMouseLeave={() => {
          lastTimeRef.current = 0
          startAnimation()
        }}
      >
        <div className="center-line"></div>
        <div className="timeline-track" ref={trackRef}>
          {[...timelineData, ...timelineData].map((item, index) => (
            <div 
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'top' : 'bottom'} ${index >= timelineData.length ? 'clone' : ''}`}
              onMouseEnter={() => handleItemHover(item)}
              onMouseLeave={handleItemLeave}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <h3 className="timeline-heading">{item.title}</h3>
                <p className="timeline-text">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="timeline-controls">
          <button className="timeline-control prev">◀</button>
          <button className="timeline-control auto">⏸</button>
          <button className="timeline-control next">▶</button>
        </div>
      </div>

      {/* Полноэкранное модальное окно */}
      <div 
        className={`timeline-fullscreen ${isModalOpen ? 'active' : ''}`}
        onMouseEnter={handleModalHover}
        onMouseLeave={handleModalLeave}
      >
        <div className="timeline-fullscreen-content" onClick={(e) => e.stopPropagation()}>
          {currentItem && (
            <div className="timeline-fullscreen-inner">
              <div className="timeline-fullscreen-header">
                <div className="timeline-fullscreen-year">{currentItem.year}</div>
                <h2 className="timeline-fullscreen-title">{currentItem.title}</h2>
              </div>
              
              <div className="timeline-fullscreen-body">
                <div className="timeline-fullscreen-text">
                  <div className="timeline-fullscreen-description">
                    {currentItem.fullDescription}
                  </div>
                  
                  {currentItem.keyEvents && currentItem.keyEvents.length > 0 && (
                    <div className="timeline-key-events">
                      <h4>Ключевые события:</h4>
                      <ul>
                        {currentItem.keyEvents.map((event, index) => (
                          <li key={index}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentItem.keyPeople && currentItem.keyPeople.length > 0 && (
                    <div className="timeline-key-people">
                      <h4>Ключевые лица:</h4>
                      <div className="people-list">
                        {currentItem.keyPeople.map((person, index) => (
                          <span key={index} className="person-tag">{person}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentItem.achievements && currentItem.achievements.length > 0 && (
                    <div className="timeline-achievements">
                      <h4>Достижения:</h4>
                      <ul>
                        {currentItem.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {currentItem.image && (
                  <div className="timeline-fullscreen-image">
                    <img src={currentItem.image} alt={currentItem.title} />
                  </div>
                )}
              </div>
              
              <div className="timeline-fullscreen-facts">
                {currentItem.facts.map((fact, index) => (
                  <div key={index} className="timeline-fact">
                    <div className="timeline-fact-number">{fact.number}</div>
                    <div className="timeline-fact-text">{fact.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button className="timeline-fullscreen-close" onClick={closeModal}></button>
        </div>
      </div>
    </section>
  )
}

export default Timeline 