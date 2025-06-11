import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Map.css'

interface RegionData {
  id: string
  name: string
  center: { x: number; y: number }
  color?: string
}

const Map = () => {
  const [showLabels, setShowLabels] = useState(false)
  const [showCenters, setShowCenters] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  // Основные регионы присутствия FIT
  const regions: RegionData[] = [
    { id: 'moscow', name: 'Москва', center: { x: 430, y: 340 }, color: '#FFB800' },
    { id: 'spb', name: 'Санкт-Петербург', center: { x: 410, y: 240 }, color: '#FFB800' },
    { id: 'novosibirsk', name: 'Новосибирск', center: { x: 650, y: 380 }, color: '#FF6B6B' },
    { id: 'ekaterinburg', name: 'Екатеринбург', center: { x: 550, y: 320 }, color: '#FF6B6B' },
    { id: 'krasnoyarsk', name: 'Красноярск', center: { x: 700, y: 350 }, color: '#4ECDC4' },
    { id: 'irkutsk', name: 'Иркутск', center: { x: 750, y: 380 }, color: '#4ECDC4' },
    { id: 'khabarovsk', name: 'Хабаровск', center: { x: 900, y: 420 }, color: '#95E1D3' },
    { id: 'vladivostok', name: 'Владивосток', center: { x: 920, y: 480 }, color: '#95E1D3' },
    { id: 'kazan', name: 'Казань', center: { x: 500, y: 340 }, color: '#FFA726' },
    { id: 'ufa', name: 'Уфа', center: { x: 530, y: 370 }, color: '#FFA726' },
    { id: 'samara', name: 'Самара', center: { x: 480, y: 360 }, color: '#AB47BC' },
    { id: 'rostov', name: 'Ростов-на-Дону', center: { x: 430, y: 420 }, color: '#AB47BC' },
    { id: 'krasnodar', name: 'Краснодар', center: { x: 410, y: 440 }, color: '#26C6DA' },
    { id: 'volgograd', name: 'Волгоград', center: { x: 450, y: 400 }, color: '#26C6DA' },
    { id: 'chelyabinsk', name: 'Челябинск', center: { x: 550, y: 350 }, color: '#66BB6A' }
  ]

  const regionInfo = {
    moscow: { 
      title: 'Москва', 
      description: 'Головной офис FIT. Основной центр дистрибуции инструментов.',
      established: '1996',
      offices: '3'
    },
    spb: { 
      title: 'Санкт-Петербург', 
      description: 'Северо-Западный региональный центр. Обслуживание Ленинградской области.',
      established: '2003',
      offices: '2'
    },
    novosibirsk: { 
      title: 'Новосибирск', 
      description: 'Сибирский региональный центр. Крупнейший склад в Сибири.',
      established: '2006',
      offices: '1'
    },
    ekaterinburg: { 
      title: 'Екатеринбург', 
      description: 'Уральский региональный центр. Обслуживание Урала и Приуралья.',
      established: '2006',
      offices: '1'
    },
    krasnoyarsk: { 
      title: 'Красноярск', 
      description: 'Центральносибирский филиал. Обслуживание Красноярского края.',
      established: '2008',
      offices: '1'
    },
    irkutsk: { 
      title: 'Иркутск', 
      description: 'Восточносибирский филиал. Обслуживание Иркутской области.',
      established: '2010',
      offices: '1'
    },
    khabarovsk: { 
      title: 'Хабаровск', 
      description: 'Дальневосточный региональный центр. Обслуживание ДФО.',
      established: '2012',
      offices: '1'
    },
    vladivostok: { 
      title: 'Владивосток', 
      description: 'Приморский филиал. Ключевая точка для работы с Азией.',
      established: '2014',
      offices: '1'
    },
    kazan: { 
      title: 'Казань', 
      description: 'Республика Татарстан. Обслуживание Поволжья.',
      established: '2007',
      offices: '1'
    },
    ufa: { 
      title: 'Уфа', 
      description: 'Республика Башкортостан. Развитый промышленный регион.',
      established: '2009',
      offices: '1'
    },
    samara: { 
      title: 'Самара', 
      description: 'Самарская область. Автомобильная промышленность.',
      established: '2008',
      offices: '1'
    },
    rostov: { 
      title: 'Ростов-на-Дону', 
      description: 'Южный федеральный округ. Обслуживание юга России.',
      established: '2011',
      offices: '1'
    },
    krasnodar: { 
      title: 'Краснодар', 
      description: 'Краснодарский край. Развивающийся южный регион.',
      established: '2013',
      offices: '1'
    },
    volgograd: { 
      title: 'Волгоград', 
      description: 'Волгоградская область. Промышленный центр.',
      established: '2010',
      offices: '1'
    },
    chelyabinsk: { 
      title: 'Челябинск', 
      description: 'Челябинская область. Металлургический центр Урала.',
      established: '2007',
      offices: '1'
    }
  }

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(selectedRegion === regionId ? null : regionId)
  }

  const handleRegionHover = (regionId: string | null) => {
    setHoveredRegion(regionId)
  }

  return (
    <section id="map" className="map-section">
      <div className="map-bg-elements">
        <div className="map-particle map-particle-1"></div>
        <div className="map-particle map-particle-2"></div>
        <div className="map-particle map-particle-3"></div>
      </div>
      
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            География <span className="title-accent">присутствия</span>
          </h2>
          <p className="section-description">
            FIT представлен в ключевых промышленных центрах России от Калининграда до Владивостока
          </p>
        </motion.div>

        <motion.div 
          className="map-controls"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button 
            className={`map-control-btn ${showLabels ? 'active' : ''}`}
            onClick={() => setShowLabels(!showLabels)}
          >
            {showLabels ? 'Скрыть названия' : 'Показать названия'}
          </button>
          <button 
            className={`map-control-btn ${showCenters ? 'active' : ''}`}
            onClick={() => setShowCenters(!showCenters)}
          >
            {showCenters ? 'Скрыть точки' : 'Показать точки'}
          </button>
        </motion.div>

        <motion.div 
          className="map-container-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="russia-map-container">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 1000 600" 
              preserveAspectRatio="xMidYMid meet" 
              className="russia-map-svg"
            >
              {/* Фон карты */}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(15, 15, 17, 0.9)" />
                  <stop offset="100%" stopColor="rgba(31, 31, 34, 0.9)" />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              
              <rect width="1000" height="600" fill="url(#mapGradient)" />
              
              {/* Контур России (упрощенный) */}
              <path 
                d="M50,200 L150,180 L250,160 L350,170 L450,160 L550,150 L650,140 L750,130 L850,150 L920,180 L950,220 L980,280 L950,350 L920,420 L880,480 L820,520 L750,540 L650,530 L550,520 L450,510 L350,500 L250,480 L150,460 L80,420 L60,380 L50,320 Z"
                fill="rgba(31, 31, 34, 0.6)"
                stroke="rgba(255, 184, 0, 0.3)"
                strokeWidth="2"
                className="russia-outline"
              />
              
              {/* Регионы (точки) */}
              {showCenters && regions.map((region) => (
                <g key={region.id}>
                  <circle
                    cx={region.center.x}
                    cy={region.center.y}
                    r={selectedRegion === region.id ? 8 : hoveredRegion === region.id ? 6 : 4}
                    fill={region.color || '#FF6B6B'}
                    stroke="#FFB800"
                    strokeWidth={selectedRegion === region.id ? 3 : 2}
                    className="region-point"
                    style={{ 
                      filter: 'url(#glow)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => handleRegionClick(region.id)}
                    onMouseEnter={() => handleRegionHover(region.id)}
                    onMouseLeave={() => handleRegionHover(null)}
                  />
                  
                  {/* Анимированные кольца для активного региона */}
                  {selectedRegion === region.id && (
                    <>
                      <circle
                        cx={region.center.x}
                        cy={region.center.y}
                        r="12"
                        fill="none"
                        stroke={region.color || '#FF6B6B'}
                        strokeWidth="2"
                        opacity="0.6"
                        className="pulse-ring"
                      />
                      <circle
                        cx={region.center.x}
                        cy={region.center.y}
                        r="16"
                        fill="none"
                        stroke={region.color || '#FF6B6B'}
                        strokeWidth="1"
                        opacity="0.4"
                        className="pulse-ring pulse-ring-delay"
                      />
                    </>
                  )}
                </g>
              ))}
              
              {/* Подписи регионов */}
              {showLabels && regions.map((region) => (
                <text
                  key={`label-${region.id}`}
                  x={region.center.x}
                  y={region.center.y - 15}
                  textAnchor="middle"
                  fill="#FFB800"
                  fontSize="12"
                  fontWeight="600"
                  className="region-label"
                  style={{ 
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
                    pointerEvents: 'none'
                  }}
                >
                  {region.name}
                </text>
              ))}
              
              {/* Линии соединения (для главных офисов) */}
              <g className="connection-lines" opacity="0.3">
                <line x1="430" y1="340" x2="410" y2="240" stroke="#FFB800" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="430" y1="340" x2="650" y2="380" stroke="#FFB800" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="430" y1="340" x2="550" y2="320" stroke="#FFB800" strokeWidth="1" strokeDasharray="5,5" />
              </g>
            </svg>
            
            {/* Информационная панель */}
            {selectedRegion && regionInfo[selectedRegion as keyof typeof regionInfo] && (
              <motion.div 
                className="region-info-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="region-info-header">
                  <h3>{regionInfo[selectedRegion as keyof typeof regionInfo].title}</h3>
                  <button 
                    className="close-info"
                    onClick={() => setSelectedRegion(null)}
                  >
                    ×
                  </button>
                </div>
                <div className="region-info-content">
                  <p>{regionInfo[selectedRegion as keyof typeof regionInfo].description}</p>
                  <div className="region-stats">
                    <div className="stat">
                      <span className="stat-label">Год открытия:</span>
                      <span className="stat-value">{regionInfo[selectedRegion as keyof typeof regionInfo].established}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Офисов:</span>
                      <span className="stat-value">{regionInfo[selectedRegion as keyof typeof regionInfo].offices}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="map-legend"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3>Легенда</h3>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#FFB800' }}></div>
              <span>Головные офисы</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#FF6B6B' }}></div>
              <span>Региональные центры</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#4ECDC4' }}></div>
              <span>Филиалы Сибири</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#95E1D3' }}></div>
              <span>Дальний Восток</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Map 