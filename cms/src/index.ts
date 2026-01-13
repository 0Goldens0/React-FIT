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
  async bootstrap(/* { strapi } */) {
    // Minimal bootstrap - do nothing
    console.log('[Bootstrap] Running minimal bootstrap for testing');
  },
};
