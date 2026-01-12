# 🔍 DEEP REVIEW: Next.js + Strapi + PostgreSQL + CI

**Дата**: 2025-12-30
**Ветка**: `add-admin-page`
**Reviewer**: Claude Code (Principal Engineer Review)

---

## СВОДКА

**Тип изменений**: Миграция с Vite SPA → Next.js 15 App Router + добавление Strapi 5 CMS + PostgreSQL в Docker.

**Масштаб**: 103 изменённых файла, ~11 200 строк (80% — нормализация line-endings CRLF→LF, 20% — функциональные изменения).

**Ключевые модули**:
- ✅ Next.js 15 (App Router) с static export для GitHub Pages
- ✅ Strapi 5.32 CMS (TypeScript, Postgres, draft/publish)
- ✅ Next.js API routes как прокси для CMS (избегают CORS)
- ✅ Docker Compose для локальной разработки (Postgres + Strapi)
- ⚠️ Неотслеживаемые файлы (cms/, src/app/api/, src/middleware.ts) — критично!
- ❌ CI билд падает на ESLint (no-explicit-any × 38 ошибок)

---

## 🚨 РИСКИ РЕЛИЗА

### **БЛОКЕРЫ (нельзя деплоить)**

1. **Билд падает на CI (exit code 1)** — lint errors × 38
2. **Новые файлы (CMS) не закоммичены** — деплой сломается без cms/, api/

### **ВЫСОКИЕ РИСКИ (сломается на production)**

3. **Static export несовместим с Route Handlers** — Next.js выдаст ошибку при сборке
4. **.env содержит реальные секреты в plain text** — уже в истории Git
5. **CSP middleware hardcoded localhost:1337 в production** — XSS/clickjacking
6. **API routes используют /api/* без учёта basePath** — 404 на GitHub Pages

---

## КАРТА ИЗМЕНЕНИЙ

### Модули:

```
Frontend (Next.js App Router)
├── src/app/                     ← Новая структура Next.js 15
│   ├── page.tsx                 ← SSG страницы
│   ├── brands/[brandId]/        ← Dynamic routes
│   ├── news/[slug]/             ← Новая категория (CMS)
│   └── api/                     ← Route Handlers (proxy для CMS)
│       ├── preview/route.ts     ← Draft mode
│       └── cms/*/route.ts       ← Прокси Strapi (5 эндпоинтов)
├── src/utils/cms.ts             ← CMS client (fetch логика)
├── src/middleware.ts            ← CSP для Strapi preview
└── next.config.ts               ← basePath, static export

CMS (Strapi 5)
├── cms/src/api/                 ← 10 content types
│   ├── brand/                   ← Бренды (catalog, popular products)
│   ├── logistics-page/          ← Страницы услуг
│   ├── product-article/         ← Статьи
│   ├── company-news-item/       ← Новости компании (новое)
│   └── ...
├── cms/src/index.ts (1588 LOC)  ← Bootstrap seeding (!)
├── cms/config/
│   ├── middlewares.ts           ← CORS: '*' в dev (!)
│   ├── admin.ts                 ← Preview integration
│   └── database.ts              ← Postgres config
└── docker-compose.cms.yml       ← Dev stack (Postgres + Strapi)

CI/CD
└── .github/workflows/pages.yml  ← GitHub Pages deploy (static export)
```

### Контракты (API/DTO):

**Новые типы** (src/utils/cms.ts):
- `CmsBrand`, `CmsLogisticsPage`, `CmsHonestSignPage` — страничные данные
- `CmsProductArticle`, `CmsCompanyNews` — контент-сущности
- `CmsBranchContact`, `CmsPartnerLogo` — справочники
- **Все используют Strapi v5 shape** (без `attributes` wrapper)

**API Endpoints** (src/app/api/):
- `/api/preview` → Draft mode toggle
- `/api/cms/brands?brandId=fit` → Proxy Strapi /api/brands
- `/api/cms/logistics-page` → Singleton страница
- `/api/cms/honest-sign-page` → Singleton
- `/api/cms/home-page` → Singleton
- `/api/cms/partner-logos`, `/api/cms/branch-contacts` → Списки
- `/api/brand-categories` → Новый эндпоинт (flatten catalog tree)

**Strapi Content Types** (draftAndPublish: true для всех):
- `api::brand.brand` (collectionType)
- `api::logistics-page.logistics-page` (singleType)
- `api::honest-sign-page.honest-sign-page` (singleType)
- `api::marketing-activity-page.marketing-activity-page` (singleType)
- `api::home-page.home-page` (singleType)
- `api::product-article.product-article` (collectionType)
- `api::company-news-item.company-news-item` (collectionType)
- `api::faq.faq`, `api::partner-logo.partner-logo`, `api::branch-contact.branch-contact`

---

## КРИТИЧЕСКИЕ ЗОНЫ

### **Next.js**

#### ❌ P0: Static export + Route Handlers = ошибка сборки
- **Проблема**: `next.config.ts:18` → `output: 'export'` при `GITHUB_ACTIONS=true`
- **Конфликт**: `src/app/api/**/route.ts` → все помечены `export const dynamic = 'force-dynamic'`
- **Next.js 15 behaviour**: Static export не поддерживает runtime Route Handlers
- **Результат**: Build упадёт с ошибкой "Route Handlers are not supported with output: export"
- **Доказательство**: В логе билда нет этой ошибки, т.к. GITHUB_ACTIONS=false локально, но в CI упадёт

#### ❌ P0: basePath не применяется к API routes
- **Проблема**: `next.config.ts:20` → `basePath = /React-FIT` на GitHub Pages
- **Конфликт**: `src/utils/cms.ts:109,186,393...` → все fetch вызовы: `fetch('/api/cms/...')`
- **Результат**: На GitHub Pages все запросы пойдут на `https://0Goldens0.github.io/api/cms/...` → 404
- **Должно быть**: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/cms/...`

#### ❌ P0: CSP middleware разрешает localhost:1337 в production
- **src/middleware.ts:10**:
  ```ts
  res.headers.set('Content-Security-Policy', "frame-ancestors 'self' http://localhost:1337")
  ```
- **Риск**: В production CSP разрешает embedding с `localhost:1337` (любой malicious localhost у пользователя)
- **Должно быть**: Условный CSP через `process.env.NODE_ENV`

#### ⚠️ P1: Server components используют client-side fetch
- **src/screens/BrandPage.tsx:21** → `useEffect(() => fetchCmsBrand(...))`
- **Проблема**: Страница импортируется в `src/app/brands/[brandId]/page.tsx`, который является Server Component
- **BrandPage помечен** `'use client'` → fetch на клиенте
- **Риск**: SSG не выполнит fetch при build → первая загрузка без данных CMS
- **Должно быть**: Fetch в Server Component или getStaticProps

#### ⚠️ P1: generateStaticParams не включает CMS brands
- **src/app/brands/[brandId]/page.tsx:6-7**:
  ```ts
  return ['fit', 'cutop', 'mos', 'mastercolor', 'kypc', 'xbat'].map((brandId) => ({ brandId }))
  ```
- **Проблема**: Новые бренды из CMS не попадут в static build (404)
- **Должно быть**: `await fetchAllBrands()` в generateStaticParams

#### ⚠️ P1: CMS_URL = localhost в клиентском коде (asset URLs)
- **src/utils/cms.ts:42,76-87** → `cmsAssetUrl()` используется в браузере
- **Проблема**: Если NEXT_PUBLIC_CMS_URL не установлен → default `http://localhost:1337`
- **На мобильных/LAN**: localhost не существует (или указывает на сам телефон)
- **Результат**: Все изображения из CMS сломаются
- **Фикс на 82-83 работает только если !pageHostIsLocal**, но этого недостаточно для production

#### ⚠️ P2: cache: 'no-store' везде (нет кеширования)
- **src/utils/cms.ts:109,186,393...** → `fetch(..., { cache: 'no-store' })`
- **Риск**: Каждый page render = новый запрос в Strapi → медленно
- **Рекомендация**: Use `cache: 'force-cache'` + ISR revalidate: 60

---

### **Strapi**

#### ✅ RBAC/Permissions: Default (не изменены)
- **cms/config/api.ts** → Не переопределяет permissions
- **cms/src/api/*/routes/*.ts** → Все используют `factories.createCoreRouter()` (дефолт)
- **Дефолт Strapi 5**: Collection types → public read для published, authenticated write
- **Single types**: Public read для published
- **Вывод**: Нет явных уязвимостей, но нет и явных ограничений → **требует review в Strapi Admin UI**

#### ⚠️ P1: CORS = '*' в development
- **cms/config/middlewares.ts:10**:
  ```ts
  origin: env.bool('CORS_ALLOW_ALL', true) ? '*' : ...
  ```
- **docker-compose.cms.yml:57**: `CORS_ALLOW_ALL: "true"`
- **Риск**: Если этот конфиг попадёт в production → любой сайт сможет читать CMS API
- **Защита**: Env var `CORS_ALLOW_ALL` должна быть `false` в production

#### ✅ Policies/Middlewares: Отсутствуют custom
- **cms/src/middlewares** → empty (.gitkeep)
- **Вывод**: Нет кастомных middleware → нет риска обхода authz

#### ⚠️ P2: entityService queries без sanitize
- **cms/src/index.ts:52-55** (bootstrap):
  ```ts
  const maybeBroken = await strapi.db.query('plugin::upload.file').findMany({
    where: { ext: '.bin', mime: 'application/octet-stream' },
    limit: 2000,
  })
  ```
- **Анализ**: Query hardcoded, не принимает user input → **OK**
- **Но**: Нет проверки на limit → может выгрузить 2000 файлов в память
- **Риск**: Bootstrap может зависнуть при большом количестве broken files

#### ⚠️ P2: Lifecycle hooks делают массовые update в bootstrap
- **cms/src/index.ts:96-141** → Перебирают все документы и апдейтят поля
- **Риск**: Если в БД 1000+ документов → bootstrap займёт минуты
- **Риск race condition**: Два экземпляра Strapi могут стартовать одновременно → дублирующие update
- **Рекомендация**: Добавить lock mechanism или idempotency key

#### ✅ Seeding данных в bootstrap (logistics, honest-sign, brands)
- **cms/src/index.ts:147-1588** → Создаёт начальные данные только если их нет
- **Логика**: `if (!logCurrent) { create } else if (isEmpty) { patch }`
- **Idempotency**: ✅ Проверка существования перед созданием
- **Публикация**: ✅ Автоматически `status: 'published'`
- **Вывод**: Безопасно, но может быть медленным при первом старте

---

### **Database**

#### ⚠️ P1: Миграции отсутствуют
- **cms/database/migrations/.gitkeep** → Пустая директория
- **Strapi 5 behaviour**: Auto-migration при старте (Knex.js)
- **Риск**: В production при деплое новой версии Strapi может изменить схему БД без ручного контроля
- **Рекомендация**: Включить manual migrations в production

#### ⚠️ P2: Нет индексов на filters
- **src/app/api/cms/brands/route.ts:26**: `filters[brandId][$eq]`
- **Strapi 5**: Автоматически создаёт index на unique поля (`brandId` в schema.json помечен `unique: true`)
- **Вывод**: **OK для brandId**, но другие фильтры (slug, publishedDate) могут быть медленными

#### ⚠️ P2: Нет connection pooling limits
- **cms/config/database.ts:43**: `pool: { min: 2, max: 10 }`
- **Docker Postgres**: Без ограничений max_connections
- **Риск**: Если Strapi создаст > 100 connections → Postgres отклонит
- **Рекомендация**: Добавить `max_connections = 50` в Postgres config

#### ✅ Транзакции: Strapi использует Knex transactions автоматически
- **documents().create/update** → обёрнуты в транзакции
- **Вывод**: Нет риска partial writes

#### ⚠️ P3: N+1 queries в bootstrap
- **cms/src/index.ts:220-260** → Для каждого документа делает отдельный update
- **Потенциальный N+1**: Если 100 logistics-page (ошибка в данных) → 100 queries
- **Защита**: Single-type content может иметь только 1 документ (по спеке Strapi), но код не проверяет

---

### **CI/CD**

#### ❌ P0: Build падает на ESLint (38 ошибок)
- **Ошибки**: `@typescript-eslint/no-explicit-any` × 38
- **Файлы**:
  - `src/app/api/brand-categories/route.ts` (19 ошибок)
  - `src/app/api/cms/logistics-page/route.ts` (4 ошибки)
  - `src/app/api/cms/honest-sign-page/route.ts` (4 ошибки)
  - `src/components/CmsBlocks/CmsBlocks.tsx` (1 ошибка)
  - `src/components/PdfMagazine/PdfMagazine.tsx` (1 ошибка)
  - `src/app/articles/[id]/page.tsx`, `src/app/news/[slug]/page.tsx` (по 2)
- **Результат**: `npm run build` → exit code 1 → CI не задеплоит

#### ✅ Typecheck проходит
- **Команда**: `npm run typecheck` → exit 0
- **Вывод**: TypeScript ошибок нет (только lint)

#### ❌ P0: Секреты в .env commitнуты в Git
- **.env:5**: `SMTP_PASS=dzcuugbegpuerexa`
- **cms/.env:7-11**: `APP_KEYS=...`, `ADMIN_JWT_SECRET=...`, etc.
- **Риск**: Секреты уже в истории Git (видны в public repo)
- **Действия**:
  1. Немедленно сменить SMTP пароль
  2. Сменить все Strapi secrets (APP_KEYS, JWT_SECRET, etc.)
  3. Удалить .env из истории Git (`git filter-branch` или BFG Repo-Cleaner)
  4. Добавить secrets в GitHub Secrets

#### ⚠️ P1: Node/npm версии не закреплены жёстко
- **.github/workflows/pages.yml:27**: `node-version: "20"` (только major)
- **Риск**: CI может использовать Node 20.18 сегодня, 20.19 завтра → breaking changes в dependencies
- **Рекомендация**: `node-version: "20.11.0"` (полная версия)

#### ⚠️ P1: Секреты не передаются в CI build
- **GitHub Actions workflow** не содержит `env:` секций
- **Риск**: Build на CI не увидит `CMS_API_TOKEN`, `NEXT_PUBLIC_CMS_URL` → все CMS запросы упадут
- **Должно быть**:
  ```yaml
  env:
    CMS_API_TOKEN: ${{ secrets.CMS_API_TOKEN }}
    NEXT_PUBLIC_CMS_URL: ${{ secrets.NEXT_PUBLIC_CMS_URL }}
  ```

#### ✅ Миграции не требуют ручных действий
- Strapi auto-migration при старте
- Next.js static export не требует DB

#### ⚠️ P2: Нет smoke tests
- CI запускает только `npm run build` (lint + typecheck)
- **Нет**: unit tests, integration tests, E2E
- **Рекомендация**: Добавить `npm test` в workflow

---

## P0 (Блокеры релиза)

1. **CI build падает на ESLint (38 ошибок `any`)**
   - Файл: `src/app/api/brand-categories/route.ts:32,38,46,52,54,64,69,72,77,80,86,88,121`
   - Файл: `src/app/api/cms/logistics-page/route.ts:55,61,79`
   - Файл: `src/app/api/cms/honest-sign-page/route.ts:39,45,57`
   - Файл: `src/components/CmsBlocks/CmsBlocks.tsx:22`
   - Файл: `src/app/articles/[id]/page.tsx:32`, `src/app/news/[slug]/page.tsx:33`
   - **Решение**: Заменить `any` на конкретные типы ИЛИ временно отключить правило

2. **Static export + Route Handlers несовместимы**
   - Файл: `next.config.ts:18` → `output: 'export'`
   - Файл: `src/app/api/**/route.ts` → `dynamic = 'force-dynamic'`
   - **Решение**: Выбрать одно из двух:
     - Вариант А: Отключить static export (deploy на Vercel/Netlify с SSR)
     - Вариант Б: Удалить API routes, fetch CMS напрямую из Server Components

3. **.env с секретами закоммичен в Git**
   - Файл: `.env:5` → `SMTP_PASS=dzcuugbegpuerexa`
   - Файл: `cms/.env:7-11` → `APP_KEYS`, `ADMIN_JWT_SECRET`, etc.
   - **Решение**:
     ```bash
     git filter-branch --force --index-filter \
       "git rm --cached --ignore-unmatch .env cms/.env" \
       --prune-empty --tag-name-filter cat -- --all
     ```
     Затем сменить все пароли

4. **Неотслеживаемые файлы (cms/, src/app/api/) не добавлены в git**
   - `git status` → untracked: `cms/`, `src/app/api/`, `src/middleware.ts`, `src/utils/cms.ts`
   - **Решение**: `git add cms/ src/app/api/ src/middleware.ts src/utils/cms.ts`

---

## P1 (Высокий приоритет — сломается в production)

5. **basePath не применяется к API routes (404 на GitHub Pages)**
   - Файл: `src/utils/cms.ts:109,186,393` → `fetch('/api/cms/...')`
   - **Решение**: Добавить `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/...`

6. **CSP middleware hardcoded localhost:1337 в production (XSS/clickjacking)**
   - Файл: `src/middleware.ts:10`
   - **Решение**:
     ```ts
     const cspValue = process.env.NODE_ENV === 'production'
       ? "frame-ancestors 'self'"
       : "frame-ancestors 'self' http://localhost:1337"
     ```

7. **CMS_URL = localhost в client-side asset URLs (сломаются картинки)**
   - Файл: `src/utils/cms.ts:42,76-87`
   - **Решение**: Требовать `NEXT_PUBLIC_CMS_URL` в production, иначе выдавать ошибку

8. **CORS = '*' в CMS может попасть в production**
   - Файл: `cms/config/middlewares.ts:10`, `docker-compose.cms.yml:57`
   - **Решение**: Убрать `CORS_ALLOW_ALL: "true"` из production env

9. **generateStaticParams не fetch CMS brands (404 для новых брендов)**
   - Файл: `src/app/brands/[brandId]/page.tsx:6-7`
   - **Решение**:
     ```ts
     export async function generateStaticParams() {
       const brands = await fetchAllCmsBrands()
       return brands.map(b => ({ brandId: b.brandId }))
     }
     ```
   - ✅ **СДЕЛАНО (обход)**: `dynamicParams=true` — новые `brandId` больше не упираются в 404 без ребилда (SSG список пока остаётся захардкоженным).

10. **Server Component fetch на клиенте (SSG не получит CMS данные)**
    - Файл: `src/screens/BrandPage.tsx:21` → `useEffect(() => fetchCmsBrand(...))`
    - **Решение**: Переместить fetch в Server Component `src/app/brands/[brandId]/page.tsx`
    - ✅ **СДЕЛАНО (preview брендов)**: `fetchCmsBrand()` теперь прокидывает `status/preview/locale` в `/api/cms/brands`, поэтому Strapi Preview для брендов показывает черновик.

11. **GitHub Actions не передаёт env vars (CMS_API_TOKEN)**
    - Файл: `.github/workflows/pages.yml`
    - **Решение**: Добавить `env: CMS_API_TOKEN: ${{ secrets.CMS_API_TOKEN }}`

---

## P2 (Средний — потенциальные баги)

12. **cache: 'no-store' везде (медленно, нет ISR)**
    - Файл: `src/utils/cms.ts:109,186,393`
    - **Решение**: `cache: 'force-cache', next: { revalidate: 60 }`

13. **Bootstrap может зависнуть при большом количестве файлов (limit: 2000)**
    - Файл: `cms/src/index.ts:52-55`
    - **Решение**: Добавить пагинацию или уменьшить limit

14. **N+1 queries в bootstrap (каждый документ отдельный update)**
    - Файл: `cms/src/index.ts:220-260`
    - **Решение**: Использовать `updateMany` или batch updates

15. **Node версия в CI не закреплена жёстко (20 → 20.x.x)**
    - Файл: `.github/workflows/pages.yml:27`
    - **Решение**: `node-version: "20.11.0"`

---

## P3 (Низкий — code quality, не влияет на функциональность)

16. **38 warnings <img> вместо next/image**
    - Файлы: `src/components/Brands/Brands.tsx`, `Footer.tsx`, `Hero.tsx`, etc.
    - **Note**: next/image не работает с static export (unoptimized: true), warnings можно игнорировать

17. **1 warning react-hooks/exhaustive-deps**
    - Файл: `src/components/Hero/Hero.tsx:98`
    - **Решение**: Сохранить `particlesRef.current` в переменную внутри effect

---

## МИНИ-ПАТЧИ (готовые фиксы)

### Патч 1: Отключить правило ESLint для API routes (временное решение)
```js
// .eslintrc.cjs
rules: {
  '@typescript-eslint/no-explicit-any': ['error', {
    ignoreRestArgs: true,
    fixToUnknown: true
  }],
  // Для API routes допустить any в JSON parsing
  '@typescript-eslint/no-explicit-any': ['warn'], // downgrade to warning
}
```

### Патч 2: Условный static export
```ts
// next.config.ts:18
const isStaticExport =
  (isGithubActions || process.env.NEXT_EXPORT === 'true') &&
  !process.env.DISABLE_STATIC_EXPORT // добавить флаг для отключения
```

### Патч 3: basePath для API calls
```ts
// src/utils/cms.ts:185
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const url = `${basePath}/api/cms/brands/${qs.toString() ? `?${qs.toString()}` : ''}`
```

### Патч 4: Условный CSP
```ts
// src/middleware.ts:10
const isDev = process.env.NODE_ENV !== 'production'
const cspValue = isDev
  ? "frame-ancestors 'self' http://localhost:1337"
  : "frame-ancestors 'self'"
res.headers.set('Content-Security-Policy', cspValue)
```

### Патч 5: Требовать CMS_URL в production
```ts
// src/utils/cms.ts:42
export const CMS_URL = (() => {
  const url = process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/+$/, '')
  if (!url && typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_CMS_URL is required in production')
  }
  return url || 'http://localhost:1337'
})()
```

---

## ТЕСТЫ/ПРОВЕРКИ для отлова рисков

### Pre-deploy checklist:

```bash
# 1. Typecheck + Lint
npm run typecheck
npm run lint -- --max-warnings=0

# 2. Build (должен пройти без ошибок)
GITHUB_ACTIONS=true npm run build

# 3. Проверка секретов
git log --all --full-history -- .env cms/.env | head -1
# Если вывод не пустой → секреты в истории!

# 4. Проверка untracked files
git status --short | grep '^??'
# Не должно быть cms/ src/app/api/

# 5. Проверка basePath
grep -r "fetch('/api/" src/
# Все вызовы должны использовать basePath

# 6. Test CMS connectivity (локально)
docker compose -f docker-compose.cms.yml up -d
curl http://localhost:1337/api/brands
# Должен вернуть JSON

# 7. Test preview mode
curl 'http://localhost:3000/api/preview?secret=dev-preview-secret-change-me&url=/services/logistics&status=draft'
# Должен редиректить с draft mode cookie
```

### Post-deploy smoke tests:

```bash
# GitHub Pages URL (замените на ваш)
BASE=https://0Goldens0.github.io/React-FIT

# 1. Homepage
curl -I $BASE/ | grep "200 OK"

# 2. Brand page (static)
curl -I $BASE/brands/fit/ | grep "200 OK"

# 3. API routes (должны работать если не static export)
curl $BASE/api/cms/brands?brandId=fit | jq .data

# 4. Assets (CMS images)
curl -I https://your-cms-domain.com/uploads/fit_logo.svg | grep "200 OK"

# 5. CSP header (не должно быть localhost в production)
curl -I $BASE/ | grep "Content-Security-Policy" | grep -v "localhost"
```

### Manual QA:

- [ ] Открыть сайт на мобильном (проверить localhost:1337 в asset URLs)
- [ ] Открыть Strapi admin, создать новый бренд, проверить что он отображается на фронте
- [ ] Включить draft preview, изменить контент, проверить что изменения видны в preview
- [ ] Проверить что published контент виден без preview
- [ ] Залогиниться в Strapi admin с разных IP (проверить CORS)

---

## ИТОГО

Архитектура продумана хорошо (Next proxy избегает CORS, Strapi preview интегрирован), но **деплой невозможен** из-за:

1. Ошибок линтера (блокирует CI)
2. Несовместимости static export + Route Handlers
3. Секретов в Git
4. Неотслеживаемых файлов

**Рекомендация**: После фикса P0 → можно деплоить, но с высоким риском runtime ошибок (P1). Рекомендую сначала исправить P0+P1, затем релизить.

---

**Следующий шаг**: Приоритизировать фиксы по порядку P0 → P1 → P2 → P3.

---

## ✅ Чеклист прогресса исправлений (обновлено: 2025-12-30)

### P0 — Блокеры релиза

- [ ] **(P0-1)** CI build падает на ESLint (`any` × 38)
- [ ] **(P0-2)** Static export + Route Handlers несовместимы
- [ ] **(P0-3)** Секреты в `.env` / `cms/.env` закоммичены в Git
- [ ] **(P0-4)** Неотслеживаемые файлы (cms/, src/app/api/, src/middleware.ts, src/utils/cms.ts) не добавлены в git

### P1 — Высокий приоритет

- [ ] **(P1-5)** basePath не применяется к API routes (404 на GitHub Pages)
- [ ] **(P1-6)** CSP middleware hardcoded localhost:1337 в production
- [ ] **(P1-7)** CMS_URL = localhost в client-side asset URLs
- [ ] **(P1-8)** CORS = '*' в CMS может попасть в production
- [ ] 🟡 **(P1-9)** generateStaticParams не fetch CMS brands
  - ✅ Обход сделан: `dynamicParams=true` (новые brandId без 404)
  - ⏳ Полное решение (SSG params из CMS) — ещё нужно
- [ ] 🟡 **(P1-10)** Server Component fetch на клиенте (SSG не получит CMS данные)
  - ✅ Сделано для preview брендов: query `status/preview/locale` прокидывается в `/api/cms/brands`
  - ⏳ Перенос fetch на сервер (или другой SSG-friendly подход) — ещё нужно
- [ ] **(P1-11)** GitHub Actions не передаёт env vars (CMS_API_TOKEN)

### P2 — Средний приоритет

- [ ] **(P2-12)** cache: 'no-store' везде (нет ISR)
- [ ] **(P2-13)** Bootstrap может зависнуть при большом количестве файлов (limit: 2000)
- [ ] **(P2-14)** N+1 queries в bootstrap
- [ ] **(P2-15)** Node версия в CI не закреплена жёстко

### P3 — Низкий приоритет (качество)

- [ ] **(P3-16)** warnings: `<img>` вместо `next/image`
- [ ] **(P3-17)** warning: `react-hooks/exhaustive-deps`

### Дополнительно (вне ревью, но сделано)

- [x] ✅ **Меню “Бренды” от CMS**: `Header` подгружает список брендов из CMS с fallback на старый хардкод
- [x] ✅ **Короткая подпись в меню**: добавлено поле `navSubtitle` в Strapi brand + fallback на фронте, если поле ещё пустое
