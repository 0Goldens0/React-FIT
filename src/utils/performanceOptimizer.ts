/**
 * Система оптимизации производительности для слабого железа
 * Определяет возможности устройства и отключает тяжелые эффекты при необходимости
 */

export class PerformanceOptimizer {
  private isLowEndDevice: boolean = false;
  private fps: number = 60;
  private isInitialized: boolean = false;

  constructor() {
    this.detectDeviceCapabilities();
    this.showLoadingScreen();
  }

  /**
   * Показываем экран загрузки на слабых устройствах
   */
  private showLoadingScreen(): void {
    if (this.isLowEndDevice) {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.style.display = 'flex';
      }
    }
  }

  /**
   * Скрываем экран загрузки
   */
  public hideLoadingScreen(): void {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      
      // Удаляем из DOM через 500ms (после анимации)
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }
  }

  /**
   * Определение возможностей устройства
   */
  private detectDeviceCapabilities(): void {
    // Проверяем количество логических процессоров
    const cores = navigator.hardwareConcurrency || 2;
    
    // Проверяем память устройства (если доступно)
    const memory = (navigator as any).deviceMemory || 4;
    
    // Проверяем user agent для старых устройств
    const userAgent = navigator.userAgent.toLowerCase();
    const isMac = /mac/.test(userAgent);
    const isOldMac = /mac os x 10_[0-9]/.test(userAgent); // MacOS 10.x
    
    // РЕАЛЬНАЯ проверка железа - только аппаратные характеристики:
    // - Меньше 4 ядер (реально слабое железо)
    // - Меньше 4GB RAM (реально мало памяти)
    // - Старый Mac (MacOS 10.x - это действительно старое железо)
    this.isLowEndDevice = 
      cores < 4 || 
      memory < 4 || 
      isOldMac;
    
    console.log('🔍 Device Detection:', {
      cores,
      memory: memory + 'GB',
      isMac,
      isOldMac,
      isLowEndDevice: this.isLowEndDevice
    });
    
    // Запускаем реальный тест производительности после загрузки
    if (!this.isLowEndDevice) {
      this.performRealPerformanceTest();
    }
  }

  /**
   * Реальный тест производительности - рендерим тяжелые элементы и замеряем FPS
   */
  private performRealPerformanceTest(): void {
    setTimeout(() => {
      console.log('🧪 Running performance test...');
      
      const startTime = performance.now();
      let frameCount = 0;
      const testDuration = 1000; // 1 секунда теста
      
      const testAnimation = (currentTime: number) => {
        frameCount++;
        
        const elapsed = currentTime - startTime;
        
        if (elapsed < testDuration) {
          requestAnimationFrame(testAnimation);
        } else {
          const fps = Math.round((frameCount / elapsed) * 1000);
          
          console.log('📊 Performance test result:', {
            fps,
            frames: frameCount,
            duration: Math.round(elapsed) + 'ms'
          });
          
          // Если FPS < 30, включаем режим оптимизации (30 FPS - это половина от 60, реально слабое устройство)
          if (fps < 25) {
            console.warn('⚠️ Low FPS detected (' + fps + '), enabling optimizations...');
            this.isLowEndDevice = true;
            this.applyOptimizations();
            
            // Показываем экран загрузки если он еще не показан
            this.showLoadingScreen();
            
            // Показываем badge
            this.showOptimizationBadge();
          } else {
            console.log('✨ Performance is good (' + fps + ' FPS)');
            
            // Если производительность хорошая, скрываем экран загрузки
            this.hideLoadingScreen();
          }
        }
      };
      
      requestAnimationFrame(testAnimation);
    }, 2000); // Ждем 2 секунды после загрузки
  }

  /**
   * Измерение FPS для определения производительности
   */
  public measureFPS(callback: (fps: number) => void): void {
    let lastTime = performance.now();
    let frames = 0;
    let totalFPS = 0;
    let measurements = 0;
    const maxMeasurements = 10; // Замеряем 10 раз

    const measureFrame = () => {
      const currentTime = performance.now();
      frames++;

      if (currentTime >= lastTime + 1000) {
        const currentFPS = Math.round((frames * 1000) / (currentTime - lastTime));
        totalFPS += currentFPS;
        measurements++;
        
        frames = 0;
        lastTime = currentTime;

        if (measurements >= maxMeasurements) {
          const avgFPS = Math.round(totalFPS / measurements);
          this.fps = avgFPS;
          
          // Если FPS < 30, точно слабое железо
          if (avgFPS < 30) {
            this.isLowEndDevice = true;
          }
          
          callback(avgFPS);
          return;
        }
      }

      requestAnimationFrame(measureFrame);
    };

    requestAnimationFrame(measureFrame);
  }

  /**
   * Применение оптимизаций для слабого железа
   */
  public applyOptimizations(): void {
    if (this.isInitialized) return;
    
    if (this.isLowEndDevice) {
      console.log('⚡ Applying performance optimizations for low-end device');
      document.documentElement.classList.add('low-end-device');
      
      // Отключаем тяжелые анимации
      this.disableHeavyAnimations();
      
      // Диагностика стрелок навигации
      setTimeout(() => {
        const arrows = document.querySelectorAll('.section-nav-arrow');
        console.log(`🎯 Found ${arrows.length} navigation arrows`);
        arrows.forEach((arrow, index) => {
          const styles = window.getComputedStyle(arrow);
          console.log(`Arrow ${index}:`, {
            display: styles.display,
            opacity: styles.opacity,
            visibility: styles.visibility,
            position: styles.position,
            zIndex: styles.zIndex,
            top: styles.top,
            bottom: styles.bottom,
            left: styles.left,
            right: styles.right,
          });
        });
      }, 1000);
      
      // Уменьшаем количество частиц
      this.reduceParticles();
      
      // Упрощаем эффекты
      this.simplifyEffects();
      
      // Показываем индикатор режима оптимизации
      this.showOptimizationBadge();
    } else {
      console.log('✨ Full performance mode enabled');
    }
    
    this.isInitialized = true;
  }

  /**
   * Показ индикатора режима оптимизации
   */
  private showOptimizationBadge(): void {
    // Показываем badge ТОЛЬКО на слабых устройствах
    if (!this.isLowEndDevice) {
      return;
    }
    
    // Проверяем, не существует ли уже badge
    if (document.getElementById('performance-badge')) {
      return;
    }
    
    // Создаем badge
    const badge = document.createElement('div');
    badge.id = 'performance-badge';
    badge.innerHTML = '⚡ Режим оптимизации';
    badge.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(255, 193, 7, 0.95);
      color: #000;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: opacity 0.3s ease;
      font-family: system-ui, -apple-system, sans-serif;
    `;
    
    // Скрываем badge через 5 секунд
    setTimeout(() => {
      badge.style.opacity = '0';
      setTimeout(() => badge.remove(), 300);
    }, 5000);
    
    // Клик на badge показывает информацию
    badge.addEventListener('click', () => {
      alert(`⚡ Режим оптимизации включен\n\nОтключены тяжелые эффекты для повышения производительности:\n• Blur эффекты\n• Анимации частиц\n• 3D трансформации\n• Автопрокрутка Timeline\n• Градиентные фоны\n\nСайт работает быстрее на слабом железе!`);
    });
    
    document.body.appendChild(badge);
  }

  /**
   * Отключение тяжелых анимаций
   */
  private disableHeavyAnimations(): void {
    // Добавляем CSS класс для отключения анимаций
    const style = document.createElement('style');
    style.id = 'performance-optimizations';
    style.textContent = `
      /* АГРЕССИВНОЕ ОТКЛЮЧЕНИЕ ВСЕХ ТЯЖЕЛЫХ ЭФФЕКТОВ */
      
      /* !!! ВАЖНО: Стрелки навигации ВСЕГДА ВИДНЫ !!! */
      .low-end-device .section-nav-arrow {
        display: flex !important;
        opacity: 1 !important;
        visibility: visible !important;
        z-index: 10000 !important;
      }
      
      /* Навигационные точки должны быть ниже стрелок */
      .low-end-device .navigation-dots {
        z-index: 50 !important;
      }
      
      /* Отключаем ВСЕ blur эффекты (ТОЛЬКО декоративные элементы) */
      .low-end-device .lava-blobs,
      .low-end-device .hero-background,
      .low-end-device .services-spotlight,
      .low-end-device .about .particles,
      .low-end-device .services-new::before,
      .low-end-device .hero::before,
      .low-end-device .hero::after {
        display: none !important;
        opacity: 0 !important;
      }
      
      /* Упрощаем 6-ти гранник, но НЕ удаляем */
      .low-end-device .holographic-container,
      .low-end-device .hexagon-3d {
        filter: none !important;
        -webkit-filter: none !important;
      }
      
      .low-end-device .holographic-container::before,
      .low-end-device .holographic-container::after,
      .low-end-device .hexagon-3d::before,
      .low-end-device .hexagon-3d::after {
        display: none !important;
      }
      
      /* Отключаем ВСЕ частицы и декоративные элементы */
      .low-end-device .particle,
      .low-end-device .hexagon-particle,
      .low-end-device .service-particle {
        display: none !important;
      }
      
      /* Упрощаем 3D эффект карточек - быстрый переворот без тяжелых эффектов */
      .low-end-device .service-3d-card {
        perspective: 1000px !important;
      }
      
      .low-end-device .service-card-inner {
        transform-style: preserve-3d !important;
        transition: transform 0.3s ease !important;
      }
      
      .low-end-device .service-3d-card:hover .service-card-inner {
        transform: rotateY(180deg) !important;
      }
      
      /* Обратная сторона карточки остается видимой */
      .low-end-device .service-card-back {
        display: flex !important;
        backface-visibility: hidden !important;
        -webkit-backface-visibility: hidden !important;
      }
      
      .low-end-device .service-card-front {
        backface-visibility: hidden !important;
        -webkit-backface-visibility: hidden !important;
      }
      
      /* Иконка должна правильно вести себя при перевороте */
      .low-end-device .service-card-front .service-icon,
      .low-end-device .service-card-front .service-title,
      .low-end-device .service-card-front .service-description {
        backface-visibility: hidden !important;
        -webkit-backface-visibility: hidden !important;
      }
      
      /* Отключаем анимации для декоративных элементов */
      .low-end-device .particle,
      .low-end-device .hexagon-particle,
      .low-end-device .service-particle,
      .low-end-device .lava-blob {
        animation: none !important;
        will-change: auto !important;
      }
      
      /* Маркизу оставляем, но замедляем */
      .low-end-device .marquee-container {
        animation-duration: 80s !important;
        will-change: auto !important;
      }
      
      /* Убираем will-change для декоративных элементов */
      .low-end-device .particle,
      .low-end-device .hexagon-particle,
      .low-end-device .service-particle,
      .low-end-device .lava-blob {
        will-change: auto !important;
      }
      
      /* Важные элементы должны быть видны */
      .low-end-device .hero-stats,
      .low-end-device .stats-grid,
      .low-end-device .stat-item,
      .low-end-device .service-3d-card,
      .low-end-device .service-card-front,
      .low-end-device .services-grid-3d {
        display: flex !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      
      /* УБИРАЕМ изображение из Hero на слабых устройствах */
      .low-end-device .hero-image,
      .low-end-device .hero-img {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
      
      /* Hero контент на всю ширину без изображения */
      .low-end-device .hero-wrapper {
        grid-template-columns: 1fr !important;
        max-width: 800px !important;
      }
      
      .low-end-device .hero-content {
        max-width: 100% !important;
        text-align: center !important;
      }
      
      /* Кнопки по центру */
      .low-end-device .hero-buttons {
        justify-content: center !important;
      }
      
      .low-end-device .stats-grid {
        display: grid !important;
      }
      
      .low-end-device .services-grid-3d {
        display: grid !important;
      }
      
      /* Отключаем анимации статистики */
      .low-end-device .stat-item,
      .low-end-device .stat-number,
      .low-end-device .stat-label {
        animation: none !important;
        transform: none !important;
      }
      
      /* УБИРАЕМ шестигранник из About на слабых устройствах */
      .low-end-device .holographic-container,
      .low-end-device .hexagon-3d,
      .low-end-device .hexagon-content,
      .low-end-device .logo-container,
      .low-end-device .energy-ring,
      .low-end-device .image-section {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
      
      /* About контент на всю ширину без шестигранника */
      .low-end-device .about .content-grid {
        grid-template-columns: 1fr !important;
        max-width: 900px !important;
        margin: 0 auto !important;
      }
      
      .low-end-device .about .text-section {
        max-width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }
      
      /* Кнопка в About по центру */
      .low-end-device .about .cta-button {
        margin: 0 auto !important;
      }
      
      /* Отключаем анимацию заголовков в About */
      .low-end-device .section-title h2,
      .low-end-device .section-subtitle {
        animation: none !important;
      }
      
      /* Отключаем backdrop-filter для тяжелых элементов (БЕЗ стрелок навигации!) */
      .low-end-device .stat-item,
      .low-end-device .timeline-card,
      .low-end-device .timeline-control,
      .low-end-device .service-card-front,
      .low-end-device .service-card-back {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background: rgba(26, 26, 26, 0.95) !important;
      }
      
      /* Отключаем shadows для декоративных элементов */
      .low-end-device .lava-blobs,
      .low-end-device .hero-background,
      .low-end-device .particle,
      .low-end-device .hexagon-particle {
        box-shadow: none !important;
        text-shadow: none !important;
        filter: none !important;
        -webkit-filter: none !important;
      }
      
      /* Упрощаем shadows для карточек и UI элементов */
      .low-end-device .service-3d-card,
      .low-end-device .timeline-card,
      .low-end-device .stat-item {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      }
      
      /* Упрощаем Timeline - отключаем автопрокрутку */
      .low-end-device .timeline-track {
        animation: none !important;
      }
      
      /* Упрощаем карточки в Timeline */
      .low-end-device .timeline-card {
        background: rgba(26, 26, 26, 0.9) !important;
      }
      
      /* Убеждаемся что кнопки управления работают */
      .low-end-device .timeline-control {
        pointer-events: auto !important;
        cursor: pointer !important;
      }
      
      /* Упрощаем Brands секцию - ОЧЕНЬ БЫСТРОЕ переключение (0.2s linear) */
      .low-end-device .brand-journey-container {
        transition: transform 0.2s linear !important;
        will-change: transform !important;
        backface-visibility: hidden !important;
        -webkit-backface-visibility: hidden !important;
        perspective: 1000px !important;
      }
      
      /* Убедимся, что transform работает */
      .low-end-device #brands {
        overflow: hidden !important;
      }
      
      /* Изоляция рендеринга для каждой секции бренда */
      .low-end-device .brand-section {
        backface-visibility: hidden !important;
      }
      
      /* Отключаем pointer events для невидимых секций */
      .low-end-device .brand-section:not(.active) {
        pointer-events: none !important;
      }
      
      /* Убеждаемся что стрелки навигации в Brands видны и работают */
      .low-end-device .section-nav-arrow {
        display: flex !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        z-index: 10000 !important; /* Максимальный z-index */
        position: fixed !important;
        background: linear-gradient(135deg, rgba(255, 184, 0, 0.2), rgba(255, 184, 0, 0.3)) !important;
        border: 2px solid rgba(255, 184, 0, 0.6) !important;
        border-radius: 50% !important;
        color: #FFB800 !important;
        cursor: pointer !important;
        align-items: center !important;
        justify-content: center !important;
        width: 50px !important;
        height: 50px !important;
        animation: none !important; /* Отключаем fadeInArrow анимацию */
        transform: translateX(-50%) !important; /* Сразу ставим нужный transform */
        box-shadow: 0 4px 15px rgba(255, 184, 0, 0.4) !important; /* Добавляем тень для видимости */
        backdrop-filter: blur(5px) !important; /* Добавляем легкий blur для контраста */
        -webkit-backdrop-filter: blur(5px) !important;
      }
      
      /* Явные позиции и размеры для стрелок на 1399px */
      @media (max-width: 1399px) {
        .low-end-device .section-nav-arrow {
          width: 38px !important;
          height: 38px !important;
        }
        
        .low-end-device .section-nav-arrow svg {
          width: 20px !important;
          height: 20px !important;
        }
        
        .low-end-device .section-nav-arrow.arrow-up {
          top: 90px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
        
        .low-end-device .section-nav-arrow.arrow-down {
          bottom: 15px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
      }
      
      /* Явные позиции для стрелок вверх/вниз на широких экранах */
      @media (min-width: 1400px) {
        .low-end-device .section-nav-arrow.arrow-up {
          top: 100px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
        
        .low-end-device .section-nav-arrow.arrow-down {
          bottom: 90px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
      }
      
      /* Явные позиции для стрелок влево/вправо (мобильные) */
      .low-end-device .section-nav-arrow.arrow-left {
        left: 20px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        animation: none !important;
      }
      
      .low-end-device .section-nav-arrow.arrow-right {
        right: 20px !important;
        left: auto !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        animation: none !important;
      }
      
      /* Убеждаемся что SVG стрелок видны */
      .low-end-device .section-nav-arrow svg {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
        width: 24px !important;
        height: 24px !important;
        color: #FFB800 !important;
        stroke: currentColor !important;
        fill: none !important;
      }
      
      /* Отключаем все анимации в Brands кроме прокрутки */
      .low-end-device .brand-card,
      .low-end-device .product-card,
      .low-end-device .journey-product-card,
      .low-end-device .brand-logo,
      .low-end-device .brand-description {
        animation: none !important;
        transition: none !important;
      }
      
      /* Упрощаем графику в брендах */
      .low-end-device .brand-section {
        background: #0a0a0a !important;
      }
      
      .low-end-device .journey-product-card {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
      }
      
      /* Отключаем сложные ::before и ::after в брендах */
      .low-end-device .brand-section::before,
      .low-end-device .brand-section::after {
        display: none !important;
      }
      
      /* НЕ трогаем transform для критичных элементов - они управляются через inline стили JavaScript! */
      /* .brand-journey-container и .timeline-track используют inline стили для позиционирования */
      
      /* Упрощаем text-rendering для производительности */
      .low-end-device * {
        text-rendering: optimizeSpeed !important;
        -webkit-font-smoothing: antialiased !important;
      }
      
      /* Отключаем анимации в Contact секции */
      .low-end-device .contact-form input,
      .low-end-device .contact-form textarea,
      .low-end-device .contact-form button,
      .low-end-device .contact-form label,
      .low-end-device .contact-info,
      .low-end-device .contact-card,
      .low-end-device .privacy-consent,
      .low-end-device .checkbox-custom,
      .low-end-device .error-message {
        animation: none !important;
        transition: none !important;
      }
      
      /* Упрощаем декоративные элементы в Contact */
      .low-end-device .input-field::before,
      .low-end-device .input-field::after,
      .low-end-device .submit-button::before,
      .low-end-device .submit-button::after,
      .low-end-device .contact-card::before,
      .low-end-device .contact-card::after {
        display: none !important;
      }
      
      /* Упрощаем backdrop-filter только в Contact */
      .low-end-device .contact-card,
      .low-end-device .input-field {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background: rgba(26, 26, 26, 0.95) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Уменьшение количества частиц
   */
  private reduceParticles(): void {
    // Удаляем большую часть декоративных элементов
    setTimeout(() => {
      const particles = document.querySelectorAll('.particle, .hexagon-particle, .service-particle');
      particles.forEach((particle, index) => {
        // Оставляем только каждую 3-ю частицу
        if (index % 3 !== 0) {
          (particle as HTMLElement).style.display = 'none';
        }
      });
    }, 500);
  }

  /**
   * Упрощение эффектов
   */
  private simplifyEffects(): void {
    // Отключаем will-change для экономии памяти
    document.documentElement.style.setProperty('--will-change', 'auto');
  }

  /**
   * Проверка, является ли устройство слабым
   */
  public isLowEnd(): boolean {
    return this.isLowEndDevice;
  }

  /**
   * Получить текущий FPS
   */
  public getFPS(): number {
    return this.fps;
  }

  /**
   * Принудительно включить режим слабого устройства (для тестирования)
   */
  public forceLowEndMode(): void {
    console.log('🔧 Forcing low-end device mode...');
    this.isLowEndDevice = true;
    this.applyOptimizations();
    console.log('✅ Low-end mode activated. Reload page to see full effect.');
  }

  /**
   * Отключить режим слабого устройства (для тестирования)
   */
  public forceHighEndMode(): void {
    console.log('🔧 Forcing high-end device mode...');
    this.isLowEndDevice = false;
    document.documentElement.classList.remove('low-end-device');
    const style = document.getElementById('performance-optimizations');
    if (style) {
      style.remove();
    }
    console.log('✅ High-end mode activated. Reload page to see full effect.');
  }
}

// Экспортируем singleton
export const performanceOptimizer = new PerformanceOptimizer();

// Делаем доступным в консоли для тестирования
if (typeof window !== 'undefined') {
  (window as any).performanceOptimizer = performanceOptimizer;
  console.log('💡 Tip: Use window.performanceOptimizer.forceLowEndMode() to test optimizations');
}

