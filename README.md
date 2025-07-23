# FIT Website - React Version

Современная React версия корпоративного сайта FIT - ведущего поставщика профессиональных инструментов.

## 🚀 Live Demo

🌐 **[Посмотреть сайт](https://USERNAME.github.io/REPOSITORY_NAME/)**

## Особенности

- 🎨 Современный дизайн с анимациями
- 📱 Полностью адаптивная верстка
- ⚡ Построен на React + TypeScript + Vite
- 🎬 Плавные анимации с Framer Motion
- 📖 Детальная история компании в интерактивном Timeline
- 🌍 Информация о международном присутствии
- 🗺️ Интерактивная карта России с 85 регионами

## Технологии

- React 18
- TypeScript
- Vite
- Framer Motion
- Lucide React (иконки)
- CSS3 с современными возможностями

## Установка

```bash
npm install
```

## Запуск в разработке

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Сборка для продакшена

```bash
npm run build
```

## 🚢 Деплой на GitHub Pages

### Автоматический деплой (рекомендуется)

1. **Настройте GitHub Pages в репозитории:**
   - Перейдите в Settings → Pages
   - Source: выберите "GitHub Actions"

2. **Обновите конфигурацию:**
   ```bash
   # Замените USERNAME и REPOSITORY_NAME в файлах:
   # - package.json (поле homepage)
   # - vite.config.ts (base URL)
   ```

3. **Push изменения в main ветку:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

4. **Сайт автоматически развернется** по адресу: `https://USERNAME.github.io/REPOSITORY_NAME/`

### Ручной деплой

```bash
# Установить зависимости
npm install

# Собрать проект
npm run build

# Развернуть на GitHub Pages
npm run deploy
```

### Что нужно изменить перед деплоем

1. **В `package.json`:**
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME"
   ```

2. **В `vite.config.ts`:**
   ```typescript
   config.base = '/YOUR_REPOSITORY_NAME/'
   ```

## Структура проекта

```
src/
├── components/
│   ├── Header/          # Навигация
│   ├── Hero/           # Главный баннер
│   ├── Timeline/       # История компании
│   ├── Services/       # Услуги
│   ├── Map/           # География присутствия
│   ├── RussiaMap/     # Интерактивная карта России
│   └── Footer/        # Подвал
├── pages/
│   └── HomePage.tsx   # Главная страница
├── App.tsx           # Главный компонент
└── main.tsx         # Точка входа

```

## Ключевые компоненты

### Timeline
Интерактивная временная шкала с полной историей компании с 1996 года:
- Автопрокрутка с возможностью управления
- Полноэкранные модальные окна с детальной информацией
- Анимации и плавные переходы
- Адаптивный дизайн

### RussiaMap
Интерактивная карта России с региональными центрами:
- 85 регионов с детальной информацией
- Интерактивные маркеры и подписи
- Возможность скрытия/показа элементов
- Отзывчивый дизайн

### Hero Section
Главный баннер с:
- Анимированной типографикой
- Ключевыми метриками компании
- Призывом к действию

### Header
Фиксированная навигация с:
- Плавной прокруткой к секциям
- Мобильным меню
- Эффектами при скролле

## 🛠️ Настройка CI/CD

Проект настроен для автоматического деплоя через GitHub Actions:

- **Файл:** `.github/workflows/deploy.yml`
- **Триггер:** Push в main ветку
- **Действие:** Автоматическая сборка и деплой на GitHub Pages

## 🤝 Участие в разработке

1. Fork проекта
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Distributed under the MIT License. See `LICENSE` for more information. 