/**
 * Система управления плавным скроллом на сайте
 * Поддерживает вертикальный и горизонтальный скролл с плавными переходами
 */

export interface ScrollSection {
  id: string;
  element: HTMLElement;
  type: 'vertical' | 'horizontal';
  index: number;
}

export class ScrollController {
  private sections: ScrollSection[] = [];
  private currentSectionIndex: number = 0;
  private isScrolling: boolean = false;
  private isHorizontallyScrolling: boolean = false; // Флаг для блокировки во время анимации слайдов
  private scrollTimeout: NodeJS.Timeout | null = null;
  private horizontalScrollProgress: number = 0;
  private horizontalScrollMax: number = 0;
  private lastScrollTime: number = 0;
  private scrollCooldown: number = 800; // Возвращаем исходную задержку
  private savedBrandsPosition: number = 0; // Сохраняем позицию брендов при выходе
  private hasLeftControlledArea: boolean = false; // Флаг: вышли ли за пределы контролируемых секций
  private touchStartY: number = 0; // Начальная позиция касания по Y
  private touchStartX: number = 0; // Начальная позиция касания по X
  private handleBrandScrollUpdate: ((e: Event) => void) | null = null; // Обработчик синхронизации с Brands
  private isEnabled: boolean = true; // Флаг активности контроллера
  private wheelThrottle: number = 0; // Throttle для wheel событий
  private wheelThrottleDelay: number = 50; // Задержка throttle в мс
  private isMacOS: boolean = false; // Флаг для macOS
  private deltaYThreshold: number = 10; // Порог для deltaY (игнорируем мелкие движения)
  private isMobileDevice: boolean = false; // Флаг мобильного устройства
  private resizeHandler: (() => void) | null = null; // Обработчик resize
  
  // Колбэки
  private onSectionChange?: (index: number, section: ScrollSection) => void;
  private onHorizontalProgress?: (progress: number, max: number) => void;

  constructor() {
    this.handleWheel = this.handleWheel.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.checkMobileDevice = this.checkMobileDevice.bind(this);
  }

  /**
   * Проверка, является ли устройство мобильным
   */
  private checkMobileDevice(): boolean {
    return window.innerWidth <= 992;
  }

  /**
   * Инициализация контроллера
   */
  public init(sectionIds: string[]) {
    // Проверяем, мобильное ли устройство
    this.isMobileDevice = this.checkMobileDevice();
    
    // Определяем macOS
    this.isMacOS = /Mac|iPod|iPhone|iPad/.test(navigator.platform) || 
                   /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
    
    // Настраиваем параметры для macOS
    if (this.isMacOS) {
      this.scrollCooldown = 1000; // Увеличиваем cooldown для macOS
      this.deltaYThreshold = 30; // Увеличиваем порог для фильтрации мелких движений
      this.wheelThrottleDelay = 100; // Увеличиваем throttle
    }
    
    // Регистрируем все секции
    this.sections = sectionIds
      .map((id, index) => {
        const element = document.getElementById(id);
        if (!element) return null;
        
        return {
          id,
          element,
          type: id === 'brands' ? 'horizontal' : 'vertical',
          index
        } as ScrollSection;
      })
      .filter((section): section is ScrollSection => section !== null);

    // На мобильных устройствах используем нативный скролл
    if (this.isMobileDevice) {
      console.log('ScrollController: мобильное устройство, кастомный скролл отключен');
      this.isEnabled = false;
      
      // Добавляем только resize обработчик для переключения при изменении размера
      this.resizeHandler = () => {
        const wasMobile = this.isMobileDevice;
        this.isMobileDevice = this.checkMobileDevice();
        
        if (wasMobile && !this.isMobileDevice) {
          // Переключились с мобильного на десктоп
          console.log('ScrollController: переключение на десктоп режим');
          this.enableScrollControl();
        } else if (!wasMobile && this.isMobileDevice) {
          // Переключились с десктопа на мобильный
          console.log('ScrollController: переключение на мобильный режим');
          this.disableScrollControl();
        }
      };
      window.addEventListener('resize', this.resizeHandler);
      return;
    }

    // На десктопе добавляем обработчики событий
    window.addEventListener('wheel', this.handleWheel, { passive: false });
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });

    // Слушаем события от Brands компонента (когда кликают на точки)
    this.handleBrandScrollUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      const newIndex = customEvent.detail.index;
      
      // КРИТИЧНО: Игнорируем синхронизацию, если идет активный скролл
      // Это предотвращает race condition
      if (this.isHorizontallyScrolling) {
        return;
      }
      
      // Обновляем внутреннее состояние scrollController
      this.horizontalScrollProgress = newIndex;
      this.savedBrandsPosition = newIndex;
      
      console.log(`ScrollController синхронизирован с Brands: позиция ${newIndex}`);
    };
    window.addEventListener('brandScrollUpdate', this.handleBrandScrollUpdate);

    // Добавляем resize обработчик для переключения режимов
    this.resizeHandler = () => {
      const wasMobile = this.isMobileDevice;
      this.isMobileDevice = this.checkMobileDevice();
      
      if (wasMobile && !this.isMobileDevice) {
        // Переключились с мобильного на десктоп
        console.log('ScrollController: переключение на десктоп режим');
        this.enableScrollControl();
      } else if (!wasMobile && this.isMobileDevice) {
        // Переключились с десктопа на мобильный
        console.log('ScrollController: переключение на мобильный режим');
        this.disableScrollControl();
      }
    };
    window.addEventListener('resize', this.resizeHandler);

    // Определяем текущую секцию при инициализации
    this.updateCurrentSection();
  }

  /**
   * Включение контроля скролла (для десктопа)
   */
  private enableScrollControl() {
    if (this.isEnabled) return;
    
    this.isEnabled = true;
    window.addEventListener('wheel', this.handleWheel, { passive: false });
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    
    if (this.handleBrandScrollUpdate) {
      window.addEventListener('brandScrollUpdate', this.handleBrandScrollUpdate);
    }
  }

  /**
   * Отключение контроля скролла (для мобильных)
   */
  private disableScrollControl() {
    if (!this.isEnabled) return;
    
    this.isEnabled = false;
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('scroll', this.handleScroll);
    
    if (this.handleBrandScrollUpdate) {
      window.removeEventListener('brandScrollUpdate', this.handleBrandScrollUpdate);
    }
  }

  /**
   * Обработка обычного скролла для отслеживания текущей секции
   */
  private handleScroll() {
    // Просто обновляем текущую секцию для правильной подсветки в навигации
    // НЕ включаем контроллер автоматически при обычном скролле
    this.updateCurrentSection();
  }

  /**
   * Очистка контроллера
   */
  public destroy() {
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('scroll', this.handleScroll);
    
    if (this.handleBrandScrollUpdate) {
      window.removeEventListener('brandScrollUpdate', this.handleBrandScrollUpdate);
    }
    
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    // Очищаем класс плавного скролла
    document.documentElement.classList.remove('smooth-scroll');
  }

  /**
   * Установка колбэка для изменения секции
   */
  public onSectionChangeCallback(callback: (index: number, section: ScrollSection) => void) {
    this.onSectionChange = callback;
  }

  /**
   * Установка колбэка для прогресса горизонтального скролла
   */
  public onHorizontalProgressCallback(callback: (progress: number, max: number) => void) {
    this.onHorizontalProgress = callback;
  }

  /**
   * Отключить ScrollController (например, при открытии модального окна)
   */
  public disable() {
    this.isEnabled = false;
  }

  /**
   * Включить ScrollController
   */
  public enable() {
    this.isEnabled = true;
  }

  /**
   * Обработка колеса мыши
   */
  private handleWheel(e: WheelEvent) {
    // Если контроллер отключен, не обрабатываем события
    if (!this.isEnabled) {
      return;
    }
    
    // КРИТИЧНО: Блокировка ДОЛЖНА быть ПЕРВОЙ проверкой
    // Это предотвращает накопление событий при резком скролле
    if (this.isScrolling || this.isHorizontallyScrolling) {
      e.preventDefault();
      return;
    }
    
    // Throttle для wheel событий - оптимизация производительности
    const now = Date.now();
    if (now - this.wheelThrottle < this.wheelThrottleDelay) {
      return;
    }
    this.wheelThrottle = now;

    // Фильтрация мелких движений (особенно важно для macOS тачпада)
    if (Math.abs(e.deltaY) < this.deltaYThreshold) {
      return; // Игнорируем слишком мелкие движения
    }

    const scrollDown = e.deltaY > 0;
    
    // Если контроллер выключен, проверяем, находимся ли мы в пределах Timeline
    if (this.hasLeftControlledArea) {
      const lastSection = this.sections[this.sections.length - 1]; // Timeline
      if (lastSection) {
        const rect = lastSection.element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Проверяем, находится ли Timeline в видимой области
        const timelineVisible = rect.top < viewportHeight && rect.bottom > 0;
        const timelineVisibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const timelineVisibilityRatio = timelineVisibleHeight / viewportHeight;
        
        // Если Timeline занимает 50%+ экрана, включаем контроллер обратно
        if (timelineVisible && timelineVisibilityRatio >= 0.5) {
          this.hasLeftControlledArea = false;
          document.documentElement.classList.remove('smooth-scroll');
          this.currentSectionIndex = this.sections.length - 1;
          // НЕ возвращаемся из функции — продолжаем обработку скролла
        } else {
          // Все еще вне Timeline, пропускаем событие
          return;
        }
      } else {
        return;
      }
    }
    
    // Если мы на последней контролируемой секции (Timeline) и скроллим вниз
    // Устанавливаем флаг и разрешаем обычный браузерный скролл
    if (this.currentSectionIndex === this.sections.length - 1 && scrollDown) {
      this.hasLeftControlledArea = true;
      document.documentElement.classList.add('smooth-scroll');
      return;
    }
    
    // Проверяем, активен ли ScrollController для текущей секции
    const currentSection = this.sections[this.currentSectionIndex];
    
    // Если мы за пределами контролируемых секций
    if (!currentSection || this.currentSectionIndex >= this.sections.length) {
      return;
    }

    e.preventDefault();

    // Проверка на cooldown для уменьшения чувствительности (используем now из throttle)
    if (now - this.lastScrollTime < this.scrollCooldown) {
      return;
    }

    if (this.isScrolling) return;

    // Если текущая секция - горизонтальная (brands)
    if (currentSection.type === 'horizontal') {
      this.handleBrandsScroll(scrollDown);
      return;
    }
    
    // Вертикальный скролл для всех остальных секций
    this.handleVerticalScroll(scrollDown);
  }

  /**
   * Обработка скролла в секции брендов (горизонтальный слайдер)
   * ПРАВИЛА:
   * 1. На слайде 0 скролл вверх -> выход к предыдущей секции
   * 2. На слайде 6 (последний) скролл вниз -> выход к следующей секции
   * 3. ВО ВСЕХ ОСТАЛЬНЫХ СЛУЧАЯХ -> только переключение слайдов, выход ЗАПРЕЩЕН
   */
  private handleBrandsScroll(scrollDown: boolean) {
    // Получаем количество слайдов (7 брендов = индексы 0-6)
    const totalSlides = 7;
    const currentSlide = this.horizontalScrollProgress;
    
    // Правило 1: На первом слайде (0) скролл вверх -> выход вверх
    if (currentSlide === 0 && !scrollDown) {
      this.handleVerticalScroll(false);
      return;
    }
    
    // Правило 2: На последнем слайде (6) скролл вниз -> выход вниз
    if (currentSlide === (totalSlides - 1) && scrollDown) {
      this.handleVerticalScroll(true);
      return;
    }
    
    // Правило 3: Все остальные случаи -> ТОЛЬКО переключение слайдов
    // Блокируем любые дальнейшие события на время анимации
    this.isHorizontallyScrolling = true;
    this.lastScrollTime = Date.now();
    
    setTimeout(() => {
      this.isHorizontallyScrolling = false;
    }, 1000);
    
    // Переключаем слайд
    if (scrollDown && currentSlide < (totalSlides - 1)) {
      this.horizontalScrollProgress++;
      this.updateHorizontalScroll();
      
      if (this.onHorizontalProgress) {
        this.onHorizontalProgress(this.horizontalScrollProgress, totalSlides - 1);
      }
    } else if (!scrollDown && currentSlide > 0) {
      this.horizontalScrollProgress--;
      this.updateHorizontalScroll();
      
      if (this.onHorizontalProgress) {
        this.onHorizontalProgress(this.horizontalScrollProgress, totalSlides - 1);
      }
    }
  }

  /**
   * Публичные методы для блокировки/разблокировки скролла извне (например, из Brands.tsx)
   */
  public lockHorizontalScroll() {
    this.isHorizontallyScrolling = true;
  }

  public unlockHorizontalScroll() {
    this.isHorizontallyScrolling = false;
  }

  /**
   * Обработка вертикального скролла
   */
  private handleVerticalScroll(scrollDown: boolean) {
    this.lastScrollTime = Date.now();
    
    if (scrollDown) {
      // Скролл вниз
      if (this.currentSectionIndex < this.sections.length - 1) {
        this.scrollToSection(this.currentSectionIndex + 1);
      } else {
        // Достигли последней контролируемой секции - разрешаем обычный скролл
        // Больше не блокируем
        return;
      }
    } else {
      // Скролл вверх
      const currentSection = this.sections[this.currentSectionIndex];
      if (currentSection) {
        // Проверяем, находимся ли мы в центре текущей секции
        const rect = currentSection.element.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionCenter = sectionTop + rect.height / 2;
        const viewportCenter = window.scrollY + window.innerHeight / 2;
        
        // Если мы не в центре текущей секции (отклонение больше 100px)
        // сначала возвращаемся к центру текущей секции
        if (Math.abs(viewportCenter - sectionCenter) > 100) {
          this.scrollToSection(this.currentSectionIndex);
        } else if (this.currentSectionIndex > 0) {
          // Если мы в центре, переходим к предыдущей секции
          this.scrollToSection(this.currentSectionIndex - 1);
        }
      } else if (this.currentSectionIndex > 0) {
        this.scrollToSection(this.currentSectionIndex - 1);
      }
    }
  }

  /**
   * Обработка горизонтального скролла (для секции Brands)
   */
  private handleHorizontalScroll(scrollDown: boolean) {
    const brandsSection = this.sections[this.currentSectionIndex];
    if (!brandsSection || brandsSection.type !== 'horizontal') return;

    // Блокировка установлена в handleWheel, здесь только переключаем слайд

    if (scrollDown) {
      // Скролл вправо (вниз колесом)
      if (this.horizontalScrollProgress < this.horizontalScrollMax) {
        this.horizontalScrollProgress++;
        this.updateHorizontalScroll();
        
        if (this.onHorizontalProgress) {
          this.onHorizontalProgress(this.horizontalScrollProgress, this.horizontalScrollMax);
        }
      } 
    } else {
      // Скролл влево (вверх колесом)
      if (this.horizontalScrollProgress > 0) {
        this.horizontalScrollProgress--;
        this.updateHorizontalScroll();
        
        if (this.onHorizontalProgress) {
          this.onHorizontalProgress(this.horizontalScrollProgress, this.horizontalScrollMax);
        }
      }
    }
  }

  /**
   * Обновление позиции горизонтального скролла
   */
  private updateHorizontalScroll() {
    // Триггерим событие для компонента Brands
    const event = new CustomEvent('brandScrollUpdate', {
      detail: { index: this.horizontalScrollProgress }
    });
    window.dispatchEvent(event);
  }

  /**
   * Обработка клавиш клавиатуры
   */
  private handleKeyDown(e: KeyboardEvent) {
    // Если контроллер отключен, не обрабатываем события
    if (!this.isEnabled) {
      return;
    }
    
    if (this.isScrolling) return;

    const currentSection = this.sections[this.currentSectionIndex];
    if (!currentSection) return;

    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        if (currentSection.type === 'horizontal') {
          this.handleHorizontalScroll(true);
        } else {
          this.handleVerticalScroll(true);
        }
        break;
      
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        if (currentSection.type === 'horizontal') {
          this.handleHorizontalScroll(false);
        } else {
          this.handleVerticalScroll(false);
        }
        break;
      
      case 'ArrowRight':
        if (currentSection.type === 'horizontal') {
          e.preventDefault();
          this.handleHorizontalScroll(true);
        }
        break;
      
      case 'ArrowLeft':
        if (currentSection.type === 'horizontal') {
          e.preventDefault();
          this.handleHorizontalScroll(false);
        }
        break;
      
      case 'Home':
        e.preventDefault();
        this.scrollToSection(0);
        break;
      
      case 'End':
        e.preventDefault();
        this.scrollToSection(this.sections.length - 1);
        break;
    }
  }

  /**
   * Обработка начала касания для touch устройств
   */
  private handleTouchStart(e: TouchEvent) {
    // Если контроллер отключен, не обрабатываем события
    if (!this.isEnabled) {
      return;
    }
    
    this.touchStartY = e.touches[0].clientY;
    this.touchStartX = e.touches[0].clientX;
  }

  private handleTouchMove(e: TouchEvent) {
    // Если контроллер отключен, не обрабатываем события
    if (!this.isEnabled) {
      return;
    }
    
    // Проверяем, вышли ли мы за пределы контролируемых секций
    if (this.hasLeftControlledArea) {
      return; // Позволяем нативный скролл
    }
    
    if (this.isScrolling) {
      e.preventDefault();
      return;
    }

    const touchEndY = e.touches[0].clientY;
    const touchEndX = e.touches[0].clientX;
    const diffY = this.touchStartY - touchEndY;
    const diffX = this.touchStartX - touchEndX;

    const currentSection = this.sections[this.currentSectionIndex];
    if (!currentSection) return;

    // Увеличиваем порог чувствительности для мобильных (более строгое определение намерения)
    const swipeThreshold = 60;

    // Определяем направление свайпа
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > swipeThreshold) {
      // Вертикальный свайп
      e.preventDefault();
      if (currentSection.type === 'horizontal') {
        this.handleHorizontalScroll(diffY > 0);
      } else {
        this.handleVerticalScroll(diffY > 0);
      }
      this.touchStartY = touchEndY;
    } else if (currentSection.type === 'horizontal' && Math.abs(diffX) > swipeThreshold) {
      // Горизонтальный свайп для горизонтальной секции
      e.preventDefault();
      this.handleHorizontalScroll(diffX > 0);
      this.touchStartX = touchEndX;
    }
  }

  /**
   * Плавная анимация скролла с использованием кривой cubic-bezier
   * Аналогично тому, как работает слайдер брендов
   */
  private animateScroll(targetPosition: number, duration: number = 800) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    // Cubic bezier easing function (0.65, 0, 0.35, 1) - как в слайдере брендов
    // Это улучшенная версия для более точного соответствия CSS cubic-bezier
    const easeOutQuart = (t: number): number => {
      // Приближение для cubic-bezier(0.65, 0, 0.35, 1)
      // Создает плавное ускорение в начале и замедление в конце
      return 1 - Math.pow(1 - t, 4);
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Применяем easing
      const easedProgress = easeOutQuart(progress);
      
      // Вычисляем текущую позицию
      const currentPosition = startPosition + distance * easedProgress;
      
      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        // Анимация завершена
        this.isScrolling = false;
        
        // Если переходим К горизонтальной секции (brands)
        const section = this.sections[this.currentSectionIndex];
        if (section && section.type === 'horizontal') {
          // Восстанавливаем сохраненную позицию
          this.horizontalScrollProgress = this.savedBrandsPosition;
          this.updateHorizontalScroll();
          
          if (this.onHorizontalProgress) {
            this.onHorizontalProgress(this.horizontalScrollProgress, this.horizontalScrollMax);
          }
        }
      }
    };

    requestAnimationFrame(animation);
  }

  /**
   * Принудительный выход из контролируемой области
   * Используется при навигации к секциям ниже Timeline
   */
  public leaveControlledArea() {
    this.hasLeftControlledArea = true;
    document.documentElement.classList.add('smooth-scroll');
  }

  /**
   * Скролл к определенной секции
   */
  public scrollToSection(index: number, smooth: boolean = true) {
    if (index < 0 || index >= this.sections.length || this.isScrolling) return;

    const section = this.sections[index];
    if (!section) return;

    this.isScrolling = true;
    
    // При навигации к контролируемой секции всегда возвращаем контроль
    if (this.hasLeftControlledArea) {
      document.documentElement.classList.remove('smooth-scroll');
    }
    this.hasLeftControlledArea = false;
    
    // Проверяем, выходим ли мы из горизонтальной секции
    const currentSection = this.sections[this.currentSectionIndex];
    
    // Если выходим из брендов, сохраняем текущую позицию
    if (currentSection && currentSection.type === 'horizontal' && section.type !== 'horizontal') {
      this.savedBrandsPosition = this.horizontalScrollProgress;
    }
    
    this.currentSectionIndex = index;

    // Вызываем колбэк
    if (this.onSectionChange) {
      this.onSectionChange(index, section);
    }

    let targetPosition: number;

    // Если переходим к Hero (первая секция), скроллим до самого верха страницы
    if (section.id === 'home') {
      targetPosition = 0;
    } else {
      // Для контролируемых секций используем точное позиционирование
      const rect = section.element.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      
      // Проверяем, является ли секция полноэкранной (100vh)
      const isFullscreen = rect.height >= window.innerHeight * 0.95;
      
      if (isFullscreen) {
        // Для полноэкранных секций - к началу
        targetPosition = absoluteTop;
      } else {
        // Для неполноэкранных секций - центрирование
        const offset = (window.innerHeight - rect.height) / 2;
        targetPosition = absoluteTop - offset;
      }
    }

    if (smooth) {
      // Используем плавную анимацию с той же кривой, что в слайдере брендов
      this.animateScroll(targetPosition, 800);
    } else {
      // Мгновенный переход
      window.scrollTo(0, targetPosition);
      this.isScrolling = false;
      
      // Если переходим К горизонтальной секции (brands)
      if (section.type === 'horizontal') {
        this.horizontalScrollProgress = this.savedBrandsPosition;
        this.updateHorizontalScroll();
        
        if (this.onHorizontalProgress) {
          this.onHorizontalProgress(this.horizontalScrollProgress, this.horizontalScrollMax);
        }
      }
    }
  }

  /**
   * Обновление текущей секции на основе позиции скролла
   */
  private updateCurrentSection() {
    // Если мы вышли из контролируемой области, НЕ обновляем индекс
    if (this.hasLeftControlledArea) {
      return;
    }
    
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      const rect = section.element.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        this.currentSectionIndex = i;
        break;
      }
    }
  }

  /**
   * Получение текущей секции
   */
  public getCurrentSection(): ScrollSection | null {
    return this.sections[this.currentSectionIndex] || null;
  }

  /**
   * Получение индекса текущей секции
   */
  public getCurrentSectionIndex(): number {
    return this.currentSectionIndex;
  }
}

export const scrollController = new ScrollController();


