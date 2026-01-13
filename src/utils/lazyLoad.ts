/**
 * Ленивая загрузка изображений для оптимизации производительности
 */

export class LazyLoader {
  private observer: IntersectionObserver | null = null;
  private images: Set<HTMLImageElement> = new Set();

  constructor() {
    this.initObserver();
  }

  /**
   * Инициализация IntersectionObserver
   */
  private initObserver(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              this.loadImage(img);
            }
          });
        },
        {
          rootMargin: '500px', // Начинаем загрузку за 500px до появления (было 50px)
          threshold: 0.01,
        }
      );
    }
  }

  /**
   * Загрузка изображения
   */
  private loadImage(img: HTMLImageElement): void {
    const src = img.dataset.src;
    if (!src) return;

    img.src = src;
    img.removeAttribute('data-src');
    
    img.onload = () => {
      img.classList.add('loaded');
    };

    if (this.observer) {
      this.observer.unobserve(img);
    }
    
    this.images.delete(img);
  }

  /**
   * Наблюдение за изображением
   */
  public observe(img: HTMLImageElement): void {
    if (!this.observer) {
      // Fallback для старых браузеров - загружаем сразу
      this.loadImage(img);
      return;
    }

    this.images.add(img);
    this.observer.observe(img);
  }

  /**
   * Автоматическое наблюдение за всеми изображениями с data-src
   */
  public observeAll(): void {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => {
      this.observe(img as HTMLImageElement);
    });
  }

  /**
   * Очистка
   */
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.images.clear();
  }
}

// Экспортируем singleton
export const lazyLoader = new LazyLoader();

// Автоматически наблюдаем за изображениями после загрузки DOM
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    lazyLoader.observeAll();
    
    // Переобсервим после изменений DOM (например, при смене слайдов)
    const observeNewImages = () => {
      setTimeout(() => lazyLoader.observeAll(), 100);
    };
    
    // Слушаем кастомные события от компонентов
    window.addEventListener('imagesLoaded', observeNewImages);
  });
}

