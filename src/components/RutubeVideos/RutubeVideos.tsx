'use client'

import { useEffect, useState, useMemo } from 'react'
import { fetchCmsRutubeVideos, type CmsRutubeVideo } from '../../utils/cms'
import './RutubeVideos.css'

type RutubeVideosProps = {
  location?: 'home' | 'marketing'
}

const RutubeVideos = ({ location }: RutubeVideosProps) => {
  const [cmsVideos, setCmsVideos] = useState<CmsRutubeVideo[]>([])
  const [, setIsLoading] = useState(true)
  const [cmsLoaded, setCmsLoaded] = useState(false)

  // Fallback видео на случай, если CMS не отдает данные
  const fallbackVideos = useMemo(() => [
    {
      id: 1,
      videoId: 'https://vk.com/video_ext.php?oid=-74008963&id=456239391&hd=3',
      videoUrl: 'https://vk.com/video-74008963_456239391',
      title: 'Видео о компании FIT',
      description: null,
      order: 0,
      showOnHomePage: true,
      showOnMarketingPage: true,
    },
    {
      id: 2,
      videoId: 'https://vk.com/video_ext.php?oid=-74008963&id=456239392&hd=3',
      videoUrl: 'https://vk.com/video-74008963_456239392',
      title: 'Наши технологии',
      description: null,
      order: 1,
      showOnHomePage: true,
      showOnMarketingPage: true,
    }
  ], [])

  // Определяем какие видео показывать
  const videos = useMemo(() => {
    const source = cmsLoaded && cmsVideos.length > 0 ? cmsVideos : fallbackVideos
    return source.map(v => ({
      id: v.videoId,
      title: v.title
    }))
  }, [cmsLoaded, cmsVideos, fallbackVideos])

  useEffect(() => {
    // Загружаем видео из CMS
    const loadVideos = async () => {
      try {
        const data = await fetchCmsRutubeVideos(location)
        setCmsVideos(Array.isArray(data) ? data : [])
        setCmsLoaded(true)
      } catch (error) {
        console.error('Failed to load Rutube videos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadVideos()
  }, [location])

  useEffect(() => {
    // Создаем частицы для фона
    createVideoParticles()
  }, [])

  const createVideoParticles = () => {
    const container = document.querySelector('.videos-particles')
    if (!container) return

    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div')
      particle.className = 'video-particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.width = Math.random() * 6 + 2 + 'px'
      particle.style.height = particle.style.width
      particle.style.animationDelay = Math.random() * 10 + 's'
      particle.style.animationDuration = Math.random() * 10 + 10 + 's'
      container.appendChild(particle)
    }
  }

  return (
    <section id="videos" className="rutube-videos-section">
      {/* Фоновые эффекты */}
      <div className="videos-bg-gradient"></div>
      <div className="videos-particles"></div>

      {/* 3D элементы фона */}
      <div className="videos-3d-elements">
        <div className="video-hex-3d video-hex-1"></div>
        <div className="video-hex-3d video-hex-2"></div>
        <div className="video-hex-3d video-hex-3"></div>
      </div>

      <div className="container">
        <div className="videos-header animate fadeInUp">
          <h2 className="videos-title">Видео о компании</h2>
          <p className="videos-subtitle">
            Узнайте больше о наших технологиях и производстве
          </p>
        </div>

        <div className="videos-grid">
          {videos.map((video, idx) => {
            const delay = idx + 1
            const delayClass = `delay-${delay}`

            return (
              <div key={video.id} className={`video-card animate fadeInUp ${delayClass}`}>
                <div className="video-card-inner">
                  <div className="video-wrapper">
                    <iframe
                      src={video.id}
                      frameBorder="0"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                      allowFullScreen
                      title={video.title}
                    />
                  </div>
                  <div className="video-shine"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Плавающие фоновые формы */}
      <div className="videos-floating-shapes">
        <div className="float-shape shape1"></div>
        <div className="float-shape shape2"></div>
      </div>
    </section>
  )
}

export default RutubeVideos
