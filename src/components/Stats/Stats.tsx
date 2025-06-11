import { useEffect, useRef } from 'react'
import './Stats.css'

const Stats = () => {
  const statsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number')
            counters.forEach((counter) => {
              animateCounter(counter as HTMLElement)
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateCounter = (element: HTMLElement) => {
    const target = parseInt(element.getAttribute('data-count') || '0')
    const duration = 2000
    const start = 0
    const startTime = performance.now()

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (target - start) * easeOutQuart)
      
      element.textContent = current.toString()
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target.toString()
      }
    }

    requestAnimationFrame(updateCounter)
  }

  return (
    <section className="stats" id="stats" ref={statsRef}>
      <div className="stats-bg"></div>
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item animate fadeInUp delay-1">
            <div className="stat-number" data-count="12000">0</div>
            <div className="stat-label">позиций в каталоге</div>
          </div>
          <div className="stat-item animate fadeInUp delay-2">
            <div className="stat-number" data-count="10">0</div>
            <div className="stat-label">филиалов по всей России</div>
          </div>
          <div className="stat-item animate fadeInUp delay-3">
            <div className="stat-number" data-count="1000">0</div>
            <div className="stat-label">сотрудников в штате</div>
          </div>
          <div className="stat-item animate fadeInUp delay-4">
            <div className="stat-number" data-count="40">0</div>
            <div className="stat-label">единиц собственного транспорта</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats 