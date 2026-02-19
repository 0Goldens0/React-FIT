/**
 * Скрипт для принудительного пересоздания видео Rutube
 * Запуск: node scripts/reseed-rutube-videos.js
 */

const rutubeVideosData = [
  {
    title: 'Видео о компании FIT',
    videoUrl: 'https://rutube.ru/video/049daf06b017173c81f192486542c13e/',
    description: 'Обзор компании и наших технологий',
    order: 0,
    showOnHomePage: true,
    showOnMarketingPage: true,
  },
  {
    title: 'Наши технологии',
    videoUrl: 'https://rutube.ru/video/9765127d4030614d190d3dd19ad931ed/',
    description: 'Производственные процессы и инновации',
    order: 1,
    showOnHomePage: true,
    showOnMarketingPage: true,
  },
];

async function reseedRutubeVideos() {
  console.log('🔄 Starting Rutube videos reseed...');

  const strapiInstance = require('../src/index.js');

  // Получаем экземпляр Strapi
  const appContext = await strapi.load();
  const app = await strapi(appContext).start();

  try {
    console.log('🧹 Removing all existing Rutube videos...');

    // Удаляем все существующие видео
    const existingVideos = await strapi.entityService.findMany(
      'api::rutube-video.rutube-video',
      {
        publicationState: 'preview',
      }
    );

    if (existingVideos && existingVideos.length > 0) {
      for (const video of existingVideos) {
        await strapi.entityService.delete('api::rutube-video.rutube-video', video.id);
        console.log(`   ✓ Deleted: ${video.title || video.id}`);
      }
    } else {
      console.log('   No existing videos found');
    }

    console.log('🌱 Creating new Rutube videos...');

    // Создаем новые видео
    for (const videoData of rutubeVideosData) {
      const created = await strapi.entityService.create('api::rutube-video.rutube-video', {
        data: {
          ...videoData,
          publishedAt: new Date(),
        },
      });
      console.log(`   ✓ Created: ${created.title} (ID: ${created.id})`);
    }

    console.log('✅ Rutube videos reseeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error reseeding Rutube videos:', error);
    process.exit(1);
  }
}

reseedRutubeVideos();
