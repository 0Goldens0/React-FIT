'use client'

import { useEffect, useMemo, useState, useRef, useCallback, memo, type TouchEvent } from 'react'
import { scrollController } from '../../utils/scrollController'
import { performanceOptimizer } from '../../utils/performanceOptimizer'
import { timelinePeriods, TimelinePeriod } from '../../data/timelinePeriods'

// Определяем скорость transition в зависимости от производительности
const getTransitionSpeed = () => performanceOptimizer.isLowEnd() ? '0.3s' : '0.5s'

const Timeline = memo(() => {
  const [currentItem, setCurrentItem] = useState<TimelinePeriod | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Отключаем автопрокрутку на слабых устройствах для экономии ресурсов
  const [isAutoPlay, setIsAutoPlay] = useState(!performanceOptimizer.isLowEnd())
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
  const touchStartRef = useRef<{ x: number; y: number; startPosition: number } | null>(null)
  const isDraggingRef = useRef<boolean>(false)
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }, [])

  const startAnimation = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    // ДИНАМИЧЕСКИ вычисляем размер карточки
    const firstItem = track.querySelector('.timeline-item:not(.clone)') as HTMLElement
    if (!firstItem) return
    
    const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight)
    const totalItems = timelinePeriods.length
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

  // Функция для перемещения ленты влево (назад) - ЯКОРНАЯ НАВИГАЦИЯ по карточкам
  const movePrev = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    // Останавливаем автопрокрутку при ручном управлении
    if (isAutoPlay) {
      setIsAutoPlay(false)
      stopAnimation()
    }

    // ДИНАМИЧЕСКИ вычисляем размер карточки из DOM
    const firstItem = track.querySelector('.timeline-item:not(.clone)') as HTMLElement
    if (!firstItem) return
    
    const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight)
    const totalItems = timelinePeriods.length
    const screenCenter = window.innerWidth / 2
    
    // Получаем padding-left трека
    const trackPaddingLeft = parseFloat(getComputedStyle(track).paddingLeft)
    
    // Находим текущую карточку - какая сейчас ближе всего к центру экрана
    // Центр экрана в координатах трека = positionRef.current + screenCenter
    const currentCenterInTrack = positionRef.current + screenCenter
    
    // Определяем индекс текущей карточки
    // Центр карточки N = trackPaddingLeft + N * itemWidth + itemWidth/2
    let currentCardIndex = Math.round((currentCenterInTrack - trackPaddingLeft - itemWidth / 2) / itemWidth)
    
    // Нормализуем индекс (на случай зацикливания)
    currentCardIndex = ((currentCardIndex % totalItems) + totalItems) % totalItems
    
    // ПРЕДЫДУЩАЯ карточка по индексу массива (хронологический порядок)
    let targetCardIndex = currentCardIndex - 1
    
    // Зацикливание
    if (targetCardIndex < 0) {
      targetCardIndex = totalItems - 1
    }
    
    // Вычисляем, где находится ЦЕНТР целевой карточки в координатах трека
    // Карточка N: начало = trackPaddingLeft + N * itemWidth
    // Центр = trackPaddingLeft + N * itemWidth + itemWidth/2
    const targetCardCenter = trackPaddingLeft + targetCardIndex * itemWidth + itemWidth / 2
    
    // Вычисляем новую позицию, чтобы центр карточки совпал с центром экрана
    // position = centerOfCard - screenCenter
    const newPosition = targetCardCenter - screenCenter
    
    positionRef.current = newPosition
    
    const transitionSpeed = getTransitionSpeed()
    track.style.transition = `transform ${transitionSpeed} cubic-bezier(0.4, 0, 0.2, 1)`
    track.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`
    
    // Убираем transition после завершения анимации
    const duration = performanceOptimizer.isLowEnd() ? 300 : 500
    setTimeout(() => {
      track.style.transition = ''
    }, duration)
    
    // Сбрасываем lastTimeRef для корректной работы при возобновлении
    lastTimeRef.current = 0
  }, [isAutoPlay, stopAnimation])

  // Функция для перемещения ленты вправо (вперед) - ЯКОРНАЯ НАВИГАЦИЯ по карточкам
  const moveNext = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    // Останавливаем автопрокрутку при ручном управлении
    if (isAutoPlay) {
      setIsAutoPlay(false)
      stopAnimation()
    }

    // ДИНАМИЧЕСКИ вычисляем размер карточки из DOM
    const firstItem = track.querySelector('.timeline-item:not(.clone)') as HTMLElement
    if (!firstItem) return
    
    const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight)
    const totalItems = timelinePeriods.length
    const screenCenter = window.innerWidth / 2
    
    // Получаем padding-left трека
    const trackPaddingLeft = parseFloat(getComputedStyle(track).paddingLeft)
    
    // Находим текущую карточку - какая сейчас ближе всего к центру экрана
    const currentCenterInTrack = positionRef.current + screenCenter
    
    // Определяем индекс текущей карточки
    // Центр карточки N = trackPaddingLeft + N * itemWidth + itemWidth/2
    let currentCardIndex = Math.round((currentCenterInTrack - trackPaddingLeft - itemWidth / 2) / itemWidth)
    
    // Нормализуем индекс
    currentCardIndex = ((currentCardIndex % totalItems) + totalItems) % totalItems
    
    // СЛЕДУЮЩАЯ карточка по индексу массива (хронологический порядок)
    const targetCardIndex = (currentCardIndex + 1) % totalItems
    
    // Вычисляем, где находится ЦЕНТР целевой карточки
    // Центр = trackPaddingLeft + N * itemWidth + itemWidth/2
    const targetCardCenter = trackPaddingLeft + targetCardIndex * itemWidth + itemWidth / 2
    
    // Вычисляем новую позицию, чтобы центр карточки совпал с центром экрана
    const newPosition = targetCardCenter - screenCenter
    
    positionRef.current = newPosition
    
    const transitionSpeed = getTransitionSpeed()
    track.style.transition = `transform ${transitionSpeed} cubic-bezier(0.4, 0, 0.2, 1)`
    track.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`
    
    // Убираем transition после завершения анимации
    const duration = performanceOptimizer.isLowEnd() ? 300 : 500
    setTimeout(() => {
      track.style.transition = ''
    }, duration)
    
    // Сбрасываем lastTimeRef для корректной работы при возобновлении
    lastTimeRef.current = 0
  }, [isAutoPlay, stopAnimation])

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
  const handleItemHover = useCallback((item: TimelinePeriod) => {
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

  // Touch-события для drag-перетаскивания
  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      startPosition: positionRef.current
    }
    isDraggingRef.current = false
    
    // ОСТАНАВЛИВАЕМ автопрокрутку полностью при касании
    setIsAutoPlay(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    isAnimationActiveRef.current = false
    
    // Убираем transition для плавного перетаскивания
    track.style.transition = ''
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) return
    
    const track = trackRef.current
    if (!track) return
    
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const deltaX = currentX - touchStartRef.current.x
    const deltaY = currentY - touchStartRef.current.y
    
    // Проверяем, что это горизонтальное движение
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isDraggingRef.current = true
      // Предотвращаем вертикальный скролл при горизонтальном движении
      e.preventDefault()
      
      // ДИНАМИЧЕСКИ вычисляем размер карточки
      const firstItem = track.querySelector('.timeline-item:not(.clone)') as HTMLElement
      if (!firstItem) return
      
      const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight)
      const totalItems = timelinePeriods.length
      const totalWidth = itemWidth * totalItems
      
      // Обновляем позицию в реальном времени (инвертируем deltaX, так как движение влево = прокрутка вправо)
      let newPosition = touchStartRef.current.startPosition - deltaX
      
      // Зацикливаем позицию
      if (newPosition < 0) {
        newPosition = totalWidth + (newPosition % totalWidth)
      } else if (newPosition >= totalWidth) {
        newPosition = newPosition % totalWidth
      }
      
      positionRef.current = newPosition
      track.style.transform = `translate3d(-${newPosition}px, 0, 0)`
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    
    if (!touchStartRef.current) {
      return
    }
    
    // НЕ выравниваем позицию - оставляем где пользователь остановился
    // Пользователь хочет свободного управления
    
    touchStartRef.current = null
    isDraggingRef.current = false
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
          if (!isTouchDevice && isAutoPlay && animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = null
          }
        }}
        onMouseLeave={() => {
          if (!isTouchDevice && isAutoPlay) {
          lastTimeRef.current = 0
          startAnimation()
          }
        }}
        {...(isTouchDevice ? {
          onTouchStart: handleTouchStart,
          onTouchMove: handleTouchMove,
          onTouchEnd: handleTouchEnd
        } : {})}
      >
        <div className="center-line"></div>
        <div className="timeline-track" ref={trackRef}>
          {[...timelinePeriods, ...timelinePeriods].map((item, index) => (
            <div 
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'top' : 'bottom'} ${index >= timelinePeriods.length ? 'clone' : ''}`}
              onMouseEnter={() => !isTouchDevice && handleItemHover(item)}
              onMouseLeave={() => !isTouchDevice && handleItemLeave()}
              onClick={() => isTouchDevice && (setCurrentItem(item), setIsModalOpen(true))}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-year">{item.years}</div>
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
                <div className="timeline-fullscreen-year">{currentItem.years}</div>
                <h2 className="timeline-fullscreen-title">{currentItem.title}</h2>
              </div>
              
              <div className="timeline-fullscreen-body">
                <div className="timeline-fullscreen-text">
                  <div className="timeline-fullscreen-description">
                    {currentItem.description}
                  </div>
                  
                  {currentItem.keyEvents && currentItem.keyEvents.length > 0 && (
                    <div className="timeline-key-events">
                      <h4>Ключевые события:</h4>
                      {currentItem.keyEvents.map((yearBlock, blockIndex) => (
                        <div key={blockIndex} className="timeline-year-block">
                          <h5 className="timeline-event-year">{yearBlock.year}</h5>
                          <ul>
                            {yearBlock.events.map((event, index) => (
                              <li key={index}>{event}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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