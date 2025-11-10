// Конфигурация для prerendering (если потребуется)
// Установка: npm install --save-dev vite-plugin-prerender

/**
 * Этот файл нужен для генерации статических HTML-страниц
 * для лучшей индексации поисковиками (Яндекс, Google)
 * 
 * Чтобы активировать prerendering:
 * 1. Установите плагин: npm install --save-dev vite-plugin-prerender
 * 2. Раскомментируйте код в vite.config.ts
 * 3. Запустите: npm run build
 */

export default {
  // Список роутов для prerendering
  routes: [
    '/',           // Главная
    '/#about',     // О компании
    '/#brands',    // Бренды
    '/#services',  // Клиентский сервис
    '/#timeline',  // История
    '/#geography', // География
    '/#contact'    // Контакты
  ],
  
  // Опции рендеринга
  renderer: {
    // Ждем, пока все данные загрузятся
    renderAfterDocumentEvent: 'render-complete',
    
    // Удаляем скрипты после рендеринга (опционально)
    injectProperty: '__PRERENDER_INJECTED',
    inject: {
      prerendered: true
    }
  }
};

