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
    enabled: true,
    config: {
      allowedOrigins: env('CLIENT_URL', 'http://localhost:3000'),
      async handler(uid, { documentId, locale, status }) {
        // Strapi exposes a global `strapi` at runtime.
        // We keep the typing lax so this file can compile in TS mode.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const s: any = (globalThis as any).strapi

        const clientUrl = env('CLIENT_URL', 'http://localhost:3000')
        const previewSecret = env('PREVIEW_SECRET', 'dev-preview-secret-change-me')

        const document = await s.documents(uid).findOne({ documentId, locale })

        const slug = (document && (document.slug || document?.attributes?.slug)) || ''

        const getPreviewPathname = (): string | null => {
          switch (uid) {
            case 'api::brand.brand': {
              // Brand pages are routed by `brandId` in the frontend: /brands/[brandId]/
              const brandId =
                (document && ((document as any).brandId || (document as any)?.attributes?.brandId)) || slug || ''
              return brandId ? `/brands/${brandId}/` : '/brands/'
            }
            case 'api::home-page.home-page':
              return '/'
            case 'api::product-article.product-article':
              return slug ? `/articles/${slug}` : '/articles'
            case 'api::company-news-item.company-news-item':
              return slug ? `/news/${slug}` : '/news'
            case 'api::faq.faq':
              return '/faq'
            case 'api::logistics-page.logistics-page':
              return '/services/logistics'
            case 'api::honest-sign-page.honest-sign-page':
              return '/services/honest-sign'
            case 'api::marketing-activity-page.marketing-activity-page':
              return '/marketing-activity/'
            case 'api::branch-contact.branch-contact':
              return '/geography'
            default:
              return null
          }
        }

        const pathname = getPreviewPathname()
        if (!pathname) return null

        const qs = new URLSearchParams({ status: status || 'draft', preview: '1' })
        // For single types, include documentId so the frontend can pin preview to the correct document.
        if (
          uid === 'api::logistics-page.logistics-page' ||
          uid === 'api::honest-sign-page.honest-sign-page' ||
          uid === 'api::marketing-activity-page.marketing-activity-page'
        ) {
          qs.set('documentId', String(documentId))
        }
        const urlWithStatus = `${pathname}?${qs.toString()}`
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
