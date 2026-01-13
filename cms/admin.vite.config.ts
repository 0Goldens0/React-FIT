import { mergeConfig } from 'vite';

export default (config) => {
  // Minimal config to avoid conflicts with production build
  return mergeConfig(config, {
    // Only apply watch settings in development mode
    ...(process.env.NODE_ENV === 'development' && {
      server: {
        watch: {
          usePolling: false,
          ignored: [
            '**/dist/**',
            '**/build/**',
            '**/types/**',
            '**/.strapi/**',
            '**/.cache/**',
            '**/node_modules/**',
            '**/public/uploads/**',
          ],
        },
      },
    }),
  });
};
