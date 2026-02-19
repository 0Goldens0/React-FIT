/**
 * Seed данных для видео VK
 * Добавляет начальные видео, которые уже используются на сайте
 */

export const rutubeVideosData = [
  {
    title: 'Видео о компании FIT',
    videoUrl: 'https://vk.com/video-74008963_456239392',
    description: 'Обзор компании и наших технологий',
    order: 0,
    showOnHomePage: true,
    showOnMarketingPage: true,
  },
  {
    title: 'Наши технологии',
    videoUrl: 'https://vk.com/video-74008963_456239391',
    description: 'Производственные процессы и инновации',
    order: 1,
    showOnHomePage: true,
    showOnMarketingPage: true,
  },
];

export async function seedRutubeVideos(strapi: any) {
  try {
    const uid = 'api::rutube-video.rutube-video'

    console.log('🔍 Checking existing Rutube videos...')

    // Strapi v5: use Documents API to see all statuses
    const existingVideos = await strapi.documents(uid).findMany({ status: 'all' })

    // IMPORTANT: do NOT overwrite user edits.
    // Seed only when there are no entries at all (fresh DB).
    if (Array.isArray(existingVideos) && existingVideos.length > 0) {
      console.log(`   ✓ Found ${existingVideos.length} Rutube videos. Seeding skipped.`)
    } else {
      console.log('🌱 Seeding Rutube videos (initial data)...')
      for (const videoData of rutubeVideosData) {
        const created = await strapi.documents(uid).create({
          data: { ...videoData, publishedAt: new Date() },
          status: 'published',
        })
        console.log(`   ✓ Created: ${created?.title || 'Rutube video'}`)
      }
      console.log('✅ Rutube videos seeded successfully!')
    }

    // Ensure public role can read rutube videos (frontend uses public Content API).
    try {
      const publicRole = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } })
      if (publicRole) {
        for (const action of ['find', 'findOne']) {
          const permission = `${uid}.${action}`
          const exists = await strapi.db
            .query('plugin::users-permissions.permission')
            .findOne({ where: { role: publicRole.id, action: permission } })
          if (!exists) {
            await strapi.db
              .query('plugin::users-permissions.permission')
              .create({ data: { role: publicRole.id, action: permission } })
          }
        }
      }
    } catch (e) {
      // silent: permissions may be managed manually in admin
    }
  } catch (error) {
    console.error('❌ Error seeding Rutube videos:', error);
    console.error('Error details:', error);
    throw error;
  }
}
