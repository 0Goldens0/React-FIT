# 🚀 Гайд по деплою на GitHub Pages

## Быстрая настройка

### 1. Обновите конфигурацию репозитория

Замените `USERNAME` и `REPOSITORY_NAME` на ваши данные в следующих файлах:

**📄 package.json:**
```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME"
```

**📄 vite.config.ts:**
```typescript
config.base = '/YOUR_REPOSITORY_NAME/'
```

### 2. Настройте GitHub Pages

1. Перейдите в **Settings** → **Pages** вашего репозитория
2. В секции **Source** выберите **"GitHub Actions"**

### 3. Запушьте изменения

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 4. Готово! 🎉

Ваш сайт будет доступен по адресу:
`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

## Альтернативный способ (ручной деплой)

```bash
# Установить зависимости (если еще не установлены)
npm install

# Собрать и развернуть
npm run deploy
```

## Пример настройки

Если ваш GitHub username `john-doe` и репозиторий называется `fit-website`, то:

- В `package.json`: `"homepage": "https://john-doe.github.io/fit-website"`
- В `vite.config.ts`: `config.base = '/fit-website/'`
- Сайт будет доступен: `https://john-doe.github.io/fit-website/`

## Важные моменты

- ✅ Убедитесь что main ветка защищена и вы пушите в неё
- ✅ GitHub Actions включены в настройках репозитория
- ✅ У вас есть права на запись в репозиторий
- ✅ Первый деплой может занять 5-10 минут

## Проверка деплоя

1. Перейдите в **Actions** в вашем репозитории
2. Найдите workflow **"Deploy to GitHub Pages"**
3. Убедитесь что он завершился успешно ✅

Если есть ошибки ❌, проверьте логи в Actions для диагностики. 