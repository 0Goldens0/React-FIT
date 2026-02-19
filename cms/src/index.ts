import { seedRutubeVideos } from './seed/rutubeVideos';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi } */) {
    // Minimal registration - do nothing
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    console.log('[Bootstrap] Running bootstrap...');

    // Seed Rutube videos if they don't exist
    try {
      await seedRutubeVideos(strapi);
    } catch (error) {
      console.error('[Bootstrap] Failed to seed Rutube videos:', error);
    }

    console.log('[Bootstrap] Bootstrap completed');
  },
};
