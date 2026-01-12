export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Dev-friendly CORS so the Next frontend can fetch CMS data from another port/device.
      // NOTE: do not enable allow-all in production.
      origin: env.bool('CORS_ALLOW_ALL', true) ? '*' : env.array('CORS_ORIGINS', ['http://localhost:3000']),
      headers: '*',
      credentials: false,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
