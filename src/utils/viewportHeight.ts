/**
 * Утилита для корректной работы с высотой viewport
 * Решает проблему с некорректным расчётом vh при изменении высоты экрана
 */

/**
 * Устанавливает CSS-переменную --vh для корректного расчёта высоты viewport
 */
export function setViewportHeight(): void {
  // Получаем реальную высоту viewport
  const vh = window.innerHeight * 0.01;
  // Устанавливаем CSS-переменную
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/**
 * Инициализирует отслеживание изменений высоты viewport
 */
export function initViewportHeight(): void {
  // Устанавливаем начальное значение
  setViewportHeight();

  // Обновляем при изменении размера окна
  // Используем debounce для оптимизации производительности
  let resizeTimer: ReturnType<typeof setTimeout>;
  
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setViewportHeight();
    }, 100);
  });

  // Обновляем при изменении ориентации (для мобильных устройств)
  window.addEventListener('orientationchange', () => {
    // Даём время браузеру пересчитать размеры после поворота
    setTimeout(() => {
      setViewportHeight();
    }, 100);
  });

  // Обновляем при возврате на страницу (для iOS Safari)
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      setViewportHeight();
    }
  });
}

/**
 * Возвращает текущую высоту viewport в пикселях
 */
export function getViewportHeight(): number {
  return window.innerHeight;
}

/**
 * Возвращает текущую ширину viewport в пикселях
 */
export function getViewportWidth(): number {
  return window.innerWidth;
}

/**
 * Проверяет, является ли устройство мобильным
 */
export function isMobileDevice(): boolean {
  return window.innerWidth <= 768;
}

/**
 * Проверяет, является ли устройство планшетом
 */
export function isTabletDevice(): boolean {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
}

/**
 * Проверяет, является ли устройство десктопом
 */
export function isDesktopDevice(): boolean {
  return window.innerWidth > 1024;
}










