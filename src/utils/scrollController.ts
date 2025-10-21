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
  private scrollTimeout: NodeJS.Timeout | null = null;
  private horizontalScrollProgress: number = 0;
  private horizontalScrollMax: number = 0;
  private lastScrollTime: number = 0;
  private scrollCooldown: number = 800; // Увеличена задержка для снижения чувствительности
  private savedBrandsPosition: number = 0; // Сохраняем позицию брендов при выходе
  private hasLeftControlledArea: boolean = false; // Флаг: вышли ли за пределы контролируемых секций
  private touchStartY: number = 0; // Начальная позиция касания по Y
  private touchStartX: number = 0; // Начальная позиция касания по X
  private handleBrandScrollUpdate: ((e: Event) => void) | null = null; // Обработчик синхронизации с Brands
  private isEnabled: boolean = true; // Флаг активности контроллера
  
  // Колбэки
  private onSectionChange?: (index: number, section: ScrollSection) => void;
  private onHorizontalProgress?: (progress: number, max: number) => void;

  constructor() {
    this.handleWheel = this.handleWheel.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
  }

  /**
   * Инициализация контроллера
   */
  public init(sectionIds: string[]) {
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

    // Добавляем обработчики событий
    window.addEventListener('wheel', this.handleWheel, { passive: false });
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });

    // Слушаем события от Brands компонента (когда кликают на точки)
    this.handleBrandScrollUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      const newIndex = customEvent.detail.index;
      
      // Обновляем внутреннее состояние scrollController
      this.horizontalScrollProgress = newIndex;
      this.savedBrandsPosition = newIndex;
      
      console.log(`ScrollController синхронизирован с Brands: позиция ${newIndex}`);
    };
    window.addEventListener('brandScrollUpdate', this.handleBrandScrollUpdate);

    // Определяем текущую секцию при инициализации
    this.updateCurrentSection();
  }

  /**
   * Обработка обычного скролла для отслеживания текущей секции
   */
  private handleScroll() {
    // Проверяем, находимся ли мы в пределах контролируемых секций
    const lastSection = this.sections[this.sections.length - 1];
    if (lastSection && this.hasLeftControlledArea) {
      const rect = lastSection.element.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = rect.height;
      const viewportTop = window.scrollY;
      
      // Сбрасываем флаг только когда ВЕРХ viewport зашёл как минимум на половину высоты Timeline
      // Это предотвращает раннее включение контроллера, пока пользователь ещё в футере/ниже
      if (viewportTop <= sectionTop + sectionHeight / 2) {
        this.hasLeftControlledArea = false;
        document.documentElement.classList.remove('smooth-scroll');
        // Устанавливаем текущую секцию явно на Timeline (последнюю контролируемую)
        this.currentSectionIndex = this.sections.length - 1;
      }
    }
    
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
    
    const scrollDown = e.deltaY > 0;
    
    // Если мы на последней контролируемой секции (Timeline) и скроллим вниз
    // Устанавливаем флаг и разрешаем обычный браузерный скролл
    if (this.currentSectionIndex === this.sections.length - 1 && scrollDown) {
      this.hasLeftControlledArea = true;
      document.documentElement.classList.add('smooth-scroll');
      return;
    }
    
    // Если мы вышли за пределы контролируемой области, разрешаем обычный скролл
    // handleScroll() автоматически сбросит флаг, когда мы вернемся в Timeline
    if (this.hasLeftControlledArea) {
      return;
    }
    
    // Проверяем, активен ли ScrollController для текущей секции
    const currentSection = this.sections[this.currentSectionIndex];
    
    // Если мы за пределами контролируемых секций
    if (!currentSection || this.currentSectionIndex >= this.sections.length) {
      return;
    }

    e.preventDefault();

    // Проверка на cooldown для уменьшения чувствительности
    const now = Date.now();
    if (now - this.lastScrollTime < this.scrollCooldown) {
      return;
    }

    if (this.isScrolling) return;

    // Если текущая секция - горизонтальная (brands)
    if (currentSection.type === 'horizontal') {
      this.handleHorizontalScroll(scrollDown);
    } else {
      // Вертикальный скролл
      this.handleVerticalScroll(scrollDown);
    }
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

    // Получаем максимальное значение скролла от компонента Brands
    const brandsContainer = brandsSection.element.querySelector('.brand-journey-container') as HTMLElement;
    if (!brandsContainer) return;

    // Рассчитываем максимальный горизонтальный скролл (количество брендов)
    // У нас 7 брендов - fit, kypc, mos, xbat, greatflex, cutop, mastercolor
    const totalBrands = brandsContainer.children.length;
    this.horizontalScrollMax = totalBrands - 1;
    
    this.lastScrollTime = Date.now();

    if (scrollDown) {
      // Скролл вправо (вниз колесом)
      if (this.horizontalScrollProgress < this.horizontalScrollMax) {
        this.horizontalScrollProgress++;
        this.updateHorizontalScroll();
        
        if (this.onHorizontalProgress) {
          this.onHorizontalProgress(this.horizontalScrollProgress, this.horizontalScrollMax);
        }
      } else {
        // Достигли конца горизонтального скролла - сохраняем позицию и переходим к следующей секции
        this.savedBrandsPosition = this.horizontalScrollMax; // Сохраняем последнюю страницу
        this.handleVerticalScroll(true);
      }
    } else {
      // Скролл влево (вверх колесом)
      if (this.horizontalScrollProgress > 0) {
        this.horizontalScrollProgress--;
        this.updateHorizontalScroll();
        
        if (this.onHorizontalProgress) {
          this.onHorizontalProgress(this.horizontalScrollProgress, this.horizontalScrollMax);
        }
      } else {
        // Достигли начала горизонтального скролла - переходим к предыдущей секции
        this.savedBrandsPosition = 0; // Сохраняем первую страницу
        this.handleVerticalScroll(false);
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
   * Скролл к определенной секции
   */
  public scrollToSection(index: number, smooth: boolean = true) {
    if (index < 0 || index >= this.sections.length || this.isScrolling) return;

    const section = this.sections[index];
    if (!section) return;

    this.isScrolling = true;
    
    // Сбрасываем флаг, так как возвращаемся в контролируемую область
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


