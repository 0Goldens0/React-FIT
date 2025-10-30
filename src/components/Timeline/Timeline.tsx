import { useEffect, useState, useRef, useCallback, memo } from 'react'
import { scrollController } from '../../utils/scrollController'
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
    description: "Компания Finch Industrial Tools основана тремя учредителями: А. М. Кадисом и А. Е. Власовым",
    fullDescription: "Компания Finch Industrial Tools была основана тремя учредителями: А. М. Кадисом и А. Е. Власовым Начальный ассортимент формировался из столярно-слесарных инструментов нескольких голландских торговых марок.",
    keyEvents: [
      "Основание компании тремя учредителями",
      "Формирование начального ассортимента из голландских торговых марок",
      "Старт со столярно-слесарных инструментов"
    ],
    keyPeople: ["А.М. Кадис", "А.Е. Власов"],
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
    fullDescription: "Расширение на города-миллионники: Екатеринбург, Казань, Воронеж, Пятигорск. Выбор городов определялся наличием клиентов и необходимостью улучшения сервиса — от быстрой доставки до персонального местного менеджера.",
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
    fullDescription: "Ассортимент разрастался с добавлением новых товарных групп (малярный инструмент, измерительный инструмент). Наибольший рост показала доля оснастки для электроинструмента. Стратегии расширения: диверсификация по товарным группам и увеличение ширины наиболее востребованных категорий.",
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
      "МОС — инструмент ценовой борьбы (товар первой цены)",
      "ХВАТ — специализация на крепеже",
      "Master Color — комплексное предложение для профессионалов МШИ",
      "Max Pro — качественный эргономичный электроинструмент"
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
      "Выход на рынок Белоруссии",
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
    fullDescription: "Ключевых направлений развития несколько: качество работы, клиентский сервис, скорость и удобство. Компания начинает подходить к освоению зарубежных рынков — от стратегической работы с брендами до автоматизации процессов с применением ИИ. Планы по расширению в новые регионы России.",
    keyEvents: [
      "Фокус на качество работы и клиентский сервис",
      "Подготовка к освоению зарубежных рынков",
      "Мощная работа над развитием брендов",
      "Внедрение ИИ в автоматизацию процессов",
      "Планы расширения в новые регионы России"
    ],
    achievements: [
      "Выход на рынки новых регионов России",
      "Новый офис и склад в Краснодаре",
      "Объединение региональных филиалов Ростов-на-Дону и Краснодар с единым офисом в городе Краснодар"

    ],
    facts: [
      { number: "5+", text: "Новых рынков" },
      { number: "100%", text: "ИИ автоматизация" },
      { number: "∞", text: "Возможности роста" }
    ]
  }
]

const Timeline = memo(() => {
  const [currentItem, setCurrentItem] = useState<TimelineData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(true) // Состояние автопроигрывания
  const wasAutoPlayActiveRef = useRef<boolean>(true) // Сохраняем состояние перед открытием модалки
  const isHoveringRef = useRef<boolean>(false) // Флаг наведения на карточку
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const isAnimationActiveRef = useRef<boolean>(true) // Флаг активности анимации
  const isModalOpenRef = useRef<boolean>(false) // Ref для isModalOpen для доступа в анимации
  const scrollPositionRef = useRef<number>(0) // Сохраняем позицию скролла при открытии модального окна

  const startAnimation = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const itemWidth = 450 // 350px width + 100px margin
    const totalItems = timelineData.length
    const totalWidth = itemWidth * totalItems
    const speed = 200 // пикселей в секунду

    const animate = (currentTime: number) => {
      // КРИТИЧЕСКИ ВАЖНО: проверяем оба флага
      if (!isAnimationActiveRef.current || isModalOpenRef.current) {
        return
      }
      
      if (lastTimeRef.current === 0) lastTimeRef.current = currentTime
      
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime
      
      positionRef.current = (positionRef.current + (deltaTime * speed / 1000)) % totalWidth
      
      // Используем translate3d для GPU-ускорения
      track.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`
      
      animationRef.current = requestAnimationFrame(animate)
    }

    isAnimationActiveRef.current = true // Устанавливаем флаг активности
    animationRef.current = requestAnimationFrame(animate)
  }, [])

  // Функция для остановки анимации
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    isAnimationActiveRef.current = false
  }, [])

  // Функция для переключения автопроигрывания
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(prev => {
      const newValue = !prev
      if (newValue) {
        lastTimeRef.current = 0
        startAnimation()
      } else {
        stopAnimation()
      }
      return newValue
    })
  }, [startAnimation, stopAnimation])

  // Функция для перемещения ленты влево (назад)
  const movePrev = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const itemWidth = 450
    positionRef.current = Math.max(0, positionRef.current - itemWidth)
    track.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`
  }, [])

  // Функция для перемещения ленты вправо (вперед)
  const moveNext = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const itemWidth = 450
    const totalItems = timelineData.length
    const totalWidth = itemWidth * totalItems
    
    positionRef.current = (positionRef.current + itemWidth) % totalWidth
    track.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`
  }, [])

  useEffect(() => {
    if (isAutoPlay) {
    startAnimation()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAutoPlay, startAnimation])

  // Управление модальным окном - остановка анимации и блокировка скролла
  useEffect(() => {
    const track = trackRef.current
    
    // КРИТИЧЕСКИ ВАЖНО: синхронизируем ref с state
    isModalOpenRef.current = isModalOpen
    
    if (isModalOpen) {
      // Останавливаем анимацию Timeline
      isAnimationActiveRef.current = false // Отключаем флаг анимации
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      
      // Добавляем CSS класс для паузы
      if (track) {
        track.style.willChange = 'auto'
      }
      
      // СОХРАНЯЕМ текущую позицию скролла в ref
      scrollPositionRef.current = window.scrollY
      
      // БЛОКИРУЕМ СКРОЛЛ СТРАНИЦЫ - надежный метод
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.width = '100%'
      
      // Отключаем scrollController
      scrollController.disable()
      
    } else {
      // Возвращаем will-change для анимации
      if (track) {
        track.style.willChange = 'transform'
      }
      
      // РАЗБЛОКИРУЕМ СКРОЛЛ СТРАНИЦЫ - ВАЖЕН ПОРЯДОК!
      // 1. Сначала убираем position: fixed и связанные стили
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      
      // 2. ЗАТЕМ восстанавливаем позицию скролла из ref
      window.scrollTo(0, scrollPositionRef.current)
      
      // Включаем scrollController обратно
      scrollController.enable()
      
      // НЕ запускаем анимацию здесь автоматически!
      // Анимация управляется через closeModal() с проверкой wasAutoPlayActiveRef
    }
    
    // Cleanup при размонтировании компонента
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      scrollController.enable()
      isAnimationActiveRef.current = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isModalOpen, startAnimation])

  // Защита от непроизвольного наведения с задержкой
  const handleItemHover = useCallback((item: TimelineData) => {
    // Устанавливаем флаг наведения
    isHoveringRef.current = true
    
    // Очищаем таймер закрытия если он есть
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }

    // Очищаем предыдущий таймер наведения
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    // Устанавливаем задержку перед открытием (700ms)
    hoverTimeoutRef.current = setTimeout(() => {
      // Проверяем, что курсор все еще на карточке
      if (!isHoveringRef.current) {
        return // Не открываем модалку, если курсор уже ушел
      }
      
      // Сохраняем текущее состояние автопрокрутки ПЕРЕД открытием модалки
      wasAutoPlayActiveRef.current = isAutoPlay
      
      setCurrentItem(item)
      setIsModalOpen(true)
      
      // Останавливаем автопрокрутку при открытии модалки
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }, 700)
  }, [isAutoPlay])

  // Обработчик ухода с карточки
  const handleItemLeave = useCallback(() => {
    // Сбрасываем флаг наведения
    isHoveringRef.current = false
    
    // Очищаем таймер открытия если он есть
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }, [])

  // Закрытие модального окна (убрали логику с onMouseLeave)
  // Модалка закрывается только по кнопке или клику вне области

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
    
    // Возобновляем автопрокрутку ТОЛЬКО если:
    // 1. Она была активна ДО открытия модалки (wasAutoPlayActiveRef.current)
    // 2. И она все еще активна СЕЙЧАС (isAutoPlay)
    if (wasAutoPlayActiveRef.current && isAutoPlay) {
      lastTimeRef.current = 0
      startAnimation()
    }
  }, [startAnimation, isAutoPlay])

  // Обработчик нажатия клавиши Escape для закрытия модалки
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isModalOpen, closeModal])

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
          if (isAutoPlay && animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = null
          }
        }}
        onMouseLeave={() => {
          if (isAutoPlay) {
          lastTimeRef.current = 0
          startAnimation()
          }
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
        </div>
        
        <div className="timeline-controls">
        <button 
          className="timeline-control prev" 
          onClick={movePrev}
          aria-label="Предыдущий период"
        >
          ◀
        </button>
        <button 
          className="timeline-control auto" 
          onClick={toggleAutoPlay}
          aria-label={isAutoPlay ? "Остановить" : "Запустить"}
        >
          {isAutoPlay ? '⏸' : '▶'}
        </button>
        <button 
          className="timeline-control next" 
          onClick={moveNext}
          aria-label="Следующий период"
        >
          ▶
        </button>
      </div>

      {/* Полноэкранное модальное окно */}
      <div 
        className={`timeline-fullscreen ${isModalOpen ? 'active' : ''}`}
        onClick={() => {
          if (isModalOpen) closeModal()
        }}
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
})

Timeline.displayName = 'Timeline'

export default Timeline 