export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dev-admin-jwt-secret-change-me'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'dev-api-token-salt-change-me'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'dev-transfer-token-salt-change-me'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY', 'dev-encryption-key-change-me'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: env.bool('PREVIEW_ENABLED', true),
    config: {
      allowedOrigins: env('CLIENT_URL', 'http://localhost:3000'),
      async handler(uid, { documentId, locale, status }) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const s = (globalThis as any).strapi
        const clientUrl = env('CLIENT_URL', 'http://localhost:3000')
        const previewSecret = env('PREVIEW_SECRET', 'dev-preview-secret-change-me')

        const document = await s.documents(uid).findOne({ documentId, locale })
        const slug = (document && (document.slug || document?.attributes?.slug)) || ''

        const routeMap = {
          'api::brand.brand': () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const brandId =
              (document && ((document as any).brandId || (document as any)?.attributes?.brandId)) || slug || ''
            return brandId ? `/brands/${brandId}/` : '/brands/'
          },
          'api::home-page.home-page': () => '/',
          'api::product-article.product-article': () => (slug ? `/articles/${slug}` : '/articles'),
          'api::company-news-item.company-news-item': () => (slug ? `/news/${slug}` : '/news'),
          'api::faq.faq': () => '/faq',
          'api::logistics-page.logistics-page': () => '/services/logistics',
          'api::honest-sign-page.honest-sign-page': () => '/services/honest-sign',
          'api::marketing-activity-page.marketing-activity-page': () => '/marketing-activity/',
          'api::branch-contact.branch-contact': () => '/geography',
          'api::rutube-video.rutube-video': () => {
            // Определяем на какую страницу отправить для просмотра видео
            if (document?.showOnHomePage) return '/#videos'
            if (document?.showOnMarketingPage) return '/marketing-activity#videos'
            return '/'
          },
        }

        const getPath = routeMap[uid]
        if (!getPath) return null

        const pathname = getPath()
        if (!pathname) return null

        const qs = new URLSearchParams({ status: status || 'draft', preview: '1' })
        if (
          uid === 'api::logistics-page.logistics-page' ||
          uid === 'api::honest-sign-page.honest-sign-page' ||
          uid === 'api::marketing-activity-page.marketing-activity-page'
        ) {
          qs.set('documentId', String(documentId))
        }

        // IMPORTANT: if the route contains a hash (`#...`), query params MUST come before the hash,
        // otherwise they end up inside the fragment and the frontend won't see `status/preview`.
        const [pathOnly, hash] = String(pathname).split('#')
        const urlWithStatus = `${pathOnly}?${qs.toString()}${hash ? `#${hash}` : ''}`

        const urlSearchParams = new URLSearchParams({
          url: urlWithStatus,
          secret: previewSecret,
          status: status || 'draft',
        })

        return `${clientUrl}/api/preview?${urlSearchParams.toString()}`
      },
    },
  },
});
