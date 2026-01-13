import Link from 'next/link'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div>
      <Header />

      <main className={styles.wrap}>
        <div className={styles.bg} aria-hidden="true">
          <div className={styles.grid} />
          <div className={styles.stars} />
        </div>

        <div className="container">
          <div className={styles.content}>
            <section className={styles.card} aria-labelledby="not-found-title">
              <div className={styles.kicker}>404 · Страница не найдена</div>
              <h1 id="not-found-title" className={styles.title}>
                Тут что‑то сломалось — мы уже чиним
              </h1>
              <p className={styles.subtitle}>
                Похоже, вы перешли по ссылке на страницу, которой нет или она была перемещена.
                Вернитесь на главную или откройте контакты — поможем найти нужное.
              </p>

              <div className={styles.actions}>
                <Link href="/" className="btn btn-primary btn-lg">
                  На главную
                </Link>
                <Link href="/contacts" className="btn btn-outline btn-lg">
                  Контакты
                </Link>
              </div>

              <div className={styles.hint}>
                Если уверены, что ссылка должна работать — напишите нам, мы поправим маршрут.
              </div>
            </section>

            <aside className={styles.art} aria-label="Иллюстрация: техно-ремонт таблички 404">
              <svg
                className={styles.svg}
                viewBox="0 0 640 520"
                role="img"
                aria-label="Неоновая табличка 404 и анимированные шестерёнки"
              >
                <defs>
                  <linearGradient id="nfGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#FFB800" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#FFD700" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="nfMetal" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#E8EEF5" />
                    <stop offset="0.5" stopColor="#AAB6C4" />
                    <stop offset="1" stopColor="#F7FAFF" />
                  </linearGradient>
                  <filter id="nfShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#000" floodOpacity="0.55" />
                  </filter>
                </defs>

                {/* floor */}
                <path
                  d="M40 455 C 170 410, 470 410, 600 455 L600 500 L40 500 Z"
                  fill="rgba(255,255,255,0.04)"
                />

                {/* sign board */}
                <g filter="url(#nfShadow)" className={styles.pulse}>
                  <rect x="130" y="110" width="380" height="210" rx="18" fill="rgba(15,15,17,0.92)" />
                  <rect x="130" y="110" width="380" height="210" rx="18" fill="url(#nfGlow)" opacity="0.12" />
                  <rect x="130" y="110" width="380" height="210" rx="18" fill="none" stroke="url(#nfGlow)" strokeWidth="3" />
                  <text
                    x="320"
                    y="245"
                    textAnchor="middle"
                    fontSize="120"
                    fontWeight="900"
                    fill="url(#nfGlow)"
                    fontFamily="Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial"
                    letterSpacing="10"
                  >
                    404
                  </text>
                  <text
                    x="320"
                    y="285"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill="rgba(255,255,255,0.7)"
                    fontFamily="Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial"
                    letterSpacing="1"
                  >
                    РЕМОНТ ИДЁТ
                  </text>
                </g>

                {/* bolts */}
                <g opacity="0.9">
                  {[
                    [160, 138],
                    [480, 138],
                    [160, 294],
                    [480, 294],
                  ].map(([x, y]) => (
                    <g key={`${x}-${y}`}>
                      <circle cx={x} cy={y} r="8" fill="rgba(255,255,255,0.12)" />
                      <circle cx={x} cy={y} r="4" fill="rgba(255,184,0,0.55)" />
                    </g>
                  ))}
                </g>

                {/* gears */}
                <g opacity="0.95">
                  {/* gear helper: simple cog made from circles + notches */}
                  <g transform="translate(180 360)" className={styles.spinSlow}>
                    <circle cx="0" cy="0" r="46" fill="rgba(255,255,255,0.06)" stroke="rgba(255,184,0,0.25)" strokeWidth="2" />
                    <circle cx="0" cy="0" r="18" fill="rgba(15,15,17,0.7)" stroke="rgba(255,184,0,0.35)" strokeWidth="2" />
                    {Array.from({ length: 8 }).map((_, i) => (
                      <rect
                        key={i}
                        x={-4}
                        y={-58}
                        width={8}
                        height={14}
                        rx={3}
                        fill="rgba(255,184,0,0.5)"
                        transform={`rotate(${i * 45})`}
                      />
                    ))}
                  </g>

                  <g transform="translate(470 380)" className={styles.spinFast}>
                    <circle cx="0" cy="0" r="34" fill="rgba(255,255,255,0.05)" stroke="rgba(255,184,0,0.22)" strokeWidth="2" />
                    <circle cx="0" cy="0" r="14" fill="rgba(15,15,17,0.7)" stroke="rgba(255,184,0,0.35)" strokeWidth="2" />
                    {Array.from({ length: 10 }).map((_, i) => (
                      <rect
                        key={i}
                        x={-3}
                        y={-44}
                        width={6}
                        height={12}
                        rx={3}
                        fill="rgba(255,184,0,0.45)"
                        transform={`rotate(${i * 36})`}
                      />
                    ))}
                  </g>
                </g>

                {/* subtle sparks near the board corner */}
                <g opacity="0.85">
                  <path d="M492 132 l10 18 l-20 -6 l20 26 l-12 -2" stroke="url(#nfGlow)" strokeWidth="3" fill="none" />
                  <path d="M508 124 l7 16 l-18 -6 l20 22" stroke="url(#nfGlow)" strokeWidth="3" fill="none" />
                </g>
              </svg>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

