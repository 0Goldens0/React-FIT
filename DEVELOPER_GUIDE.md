# Руководство разработчика - Кроссбраузерность

## 🚀 Быстрый старт

Проект уже настроен для кроссбраузерной поддержки. Просто пишите современный CSS, остальное сделает Autoprefixer автоматически.

## ✨ Что делается автоматически

### Вендорные префиксы
```css
/* Вы пишете: */
.element {
  display: flex;
  transform: translateY(-10px);
}

/* Autoprefixer добавляет: */
.element {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-transform: translateY(-10px);
  -ms-transform: translateY(-10px);
  transform: translateY(-10px);
}
```

## 📝 Best Practices

### 1. Используйте современные CSS функции
```css
/* ✅ Хорошо - используйте clamp() */
font-size: clamp(1rem, 2vw, 1.5rem);

/* ❌ Плохо - фиксированные размеры */
font-size: 16px;
```

### 2. Flexbox и Grid
```css
/* ✅ Хорошо */
.container {
  display: flex;
  gap: 20px; /* Autoprefixer добавит fallback */
}

/* ⚠️ Внимание: gap не работает в Safari < 14.1 */
/* Альтернатива для старых браузеров: */
.container > * + * {
  margin-left: 20px; /* Fallback */
}
```

### 3. Transform для анимаций
```css
/* ✅ Хорошо - GPU ускорение */
.animated {
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

/* ❌ Плохо - медленно */
.animated {
  position: relative;
  left: 10px;
  top: 10px;
}
```

### 4. CSS переменные с fallback
```css
/* ✅ Хорошо */
.element {
  color: #FFB800; /* Fallback */
  color: var(--primary);
}

/* ❌ Плохо - не работает в IE11 */
.element {
  color: var(--primary);
}
```

## 🎨 Градиенты текста

```css
/* Правильный способ с fallback */
.title {
  color: var(--primary); /* Fallback */
  background: linear-gradient(135deg, var(--primary), #FFD700);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 📐 Адаптивность

### Используйте мобильный подход (Mobile First)
```css
/* ✅ Хорошо */
.element {
  font-size: 14px; /* Для мобильных */
}

@media (min-width: 768px) {
  .element {
    font-size: 16px; /* Для планшетов */
  }
}

@media (min-width: 1200px) {
  .element {
    font-size: 18px; /* Для десктопа */
  }
}
```

### Используйте clamp() для плавной адаптации
```css
/* ✅ Отлично - один размер для всех экранов */
.element {
  font-size: clamp(14px, 2vw, 18px);
  padding: clamp(10px, 2vh, 20px);
}
```

## 🖼️ Изображения

### SVG для логотипов и иконок
```jsx
// ✅ Хорошо
<img src="logo.svg" alt="Logo" />

// ❌ Плохо для масштабирования
<img src="logo.png" alt="Logo" />
```

### Адаптивные изображения
```css
/* ✅ Хорошо */
img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  -ms-interpolation-mode: bicubic; /* IE fallback */
}
```

## 🔄 Анимации

### Используйте transform вместо position
```css
/* ✅ Хорошо - 60 FPS */
@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

/* ❌ Плохо - медленно, вызывает reflow */
@keyframes slide {
  from { left: 0; }
  to { left: 100px; }
}
```

### Оптимизация для GPU
```css
.animated {
  transform: translateZ(0); /* Force GPU */
  backface-visibility: hidden;
  will-change: transform; /* Только для активных анимаций */
}
```

## 🌐 Тестирование

### Локальное тестирование
```bash
# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр сборки
npm run preview
```

### Проверка браузеров
```bash
# Показать список поддерживаемых браузеров
npx browserslist

# Обновить browserslist базу
npx browserslist@latest --update-db
```

## 🐛 Распространенные проблемы

### Flexbox gap не работает
```css
/* Проблема: Safari < 14.1 */
.container {
  display: flex;
  gap: 20px;
}

/* Решение: добавьте margin fallback */
.container > * + * {
  margin-left: 20px;
}
```

### backdrop-filter не поддерживается
```css
/* Проблема: Firefox без флага */
.modal {
  backdrop-filter: blur(10px);
}

/* Решение: добавьте fallback */
.modal {
  background: rgba(0, 0, 0, 0.8); /* Fallback */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
```

### CSS переменные в IE11
```css
/* Проблема: IE11 не поддерживает */
.element {
  color: var(--primary);
}

/* Решение: всегда добавляйте fallback */
.element {
  color: #FFB800; /* Fallback */
  color: var(--primary);
}
```

## 📦 Полезные инструменты

### Can I Use
Проверьте поддержку CSS/JS функций: [caniuse.com](https://caniuse.com)

### BrowserStack
Тестирование на реальных устройствах: [browserstack.com](https://browserstack.com)

### Chrome DevTools
- Device Mode для мобильных
- Network throttling для медленных соединений
- Coverage для неиспользуемого CSS

### Firefox DevTools
- Responsive Design Mode
- CSS Grid Inspector
- Performance Monitor

## 🔧 Настройка

### Изменить список браузеров
Отредактируйте `.browserslistrc`:
```
# Добавить поддержку старых браузеров
>0.5%
last 2 versions

# Или минимальную поддержку
>1%
not dead
```

### Отключить Autoprefixer для файла
```css
/* autoprefixer: off */
.no-prefix {
  display: flex;
}
/* autoprefixer: on */
```

## 📚 Дополнительные ресурсы

- [MDN Web Docs](https://developer.mozilla.org) - документация по CSS
- [CSS Tricks](https://css-tricks.com) - статьи и гайды
- [Web.dev](https://web.dev) - гайды по производительности
- [Autoprefixer Online](https://autoprefixer.github.io) - тестирование префиксов

---

## ⚡ Чеклист перед коммитом

- [ ] Проверил в Chrome
- [ ] Проверил в Firefox
- [ ] Проверил на мобильном (или DevTools)
- [ ] Нет ошибок в консоли
- [ ] CSS валидный
- [ ] Lighthouse score > 90
- [ ] Нет accessibility ошибок
- [ ] Код прошел линтер

---

**Вопросы?** Проверьте `CROSS_BROWSER_SUPPORT.md` для подробной информации.


