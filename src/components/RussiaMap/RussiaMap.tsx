'use client'

import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react'

import { getAssetPath } from '../../utils/paths'
import { branchContactsByCityId, type BranchContact } from '../../data/branchContacts'
import { extractMediaUrl, fetchCmsBranchContacts, type CmsBranchContact } from '../../utils/cms'

interface RegionalCenter {
  id: string;
  name: string;
  x: number;
  y: number;
  region: string;
  isMainCenter?: boolean; // Основные региональные центры
}

function getInitials(name: string) {
  const parts = name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  const first = parts[0]?.[0] ?? ''
  const second = parts[1]?.[0] ?? ''
  const out = `${first}${second}`.toUpperCase()
  return out || 'FIT'
}

function sanitizeTel(phone: string) {
  // Keep digits and leading plus for tel:
  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned.startsWith('+') ? cleaned : `+${cleaned}`
}

// Координаты региональных центров взяты из оригинального SVG файла
const regionalCenters: RegionalCenter[] = [
  { id: "moskva", name: "Москва", x: 130, y: 259, region: "RU-MOW", isMainCenter: true },
  { id: "spb", name: "Санкт-Петербург", x: 136, y: 182, region: "RU-SPE", isMainCenter: true },
  { id: "arkhangelsk", name: "Архангельск", x: 220, y: 185, region: "RU-ARK", isMainCenter: true },
  { id: "kaliningrad", name: "Калининград", x: 37, y: 178, region: "RU-KGD" },
  { id: "pskov", name: "Псков", x: 100, y: 205, region: "RU-PSK" },
  { id: "velikiy_novgorod", name: "Великий Новгород", x: 127, y: 203, region: "RU-NGR" },
  { id: "murmansk", name: "Мурманск", x: 231, y: 110, region: "RU-MUR" },
  { id: "syktyvkar", name: "Сыктывкар", x: 250, y:255, region: "RU-KO" },
  { id: "naryan_mar", name: "Нарьян-Мар", x: 300, y: 190, region: "RU-NEN" },
  { id: "salekhard", name: "Салехард", x: 375, y: 250, region: "RU-YAN" },
  { id: "khanty_mansiysk", name: "Ханты-Мансийск", x: 343, y: 300, region: "RU-KHM" },
  { id: "ekaterinburg", name: "Екатеринбург", x: 280, y: 350, region: "RU-SVE", isMainCenter: true },
  { id: "perm", name: "Пермь", x: 260, y: 320, region: "RU-PER" },
  { id: "izhevsk", name: "Ижевск", x: 225, y: 320, region: "RU-UD" },
  { id: "yoshkar_ola", name: "Йошкар-Ола", x: 187, y: 295, region: "RU-ME" },
  { id: "cheboksary", name: "Чебоксары", x: 180, y: 310, region: "RU-CU" },
  { id: "kazan", name: "Казань", x: 200, y: 320, region: "RU-TA", isMainCenter: true },
  { id: "nizhniy_novgorod", name: "Нижний Новгород", x: 166, y: 295, region: "RU-NIZ", isMainCenter: true },
  { id: "kirov", name: "Киров", x: 223, y: 290, region: "RU-KIR" },
  { id: "kostroma", name: "Кострома", x: 168, y: 263, region: "RU-KOS" },
  { id: "yaroslavl", name: "Ярославль", x: 152, y: 253, region: "RU-YAR" },
  { id: "ivanovo", name: "Иваново", x: 161, y: 273, region: "RU-IVA" },
  { id: "vladimir", name: "Владимир", x: 150, y: 275, region: "RU-VLA" },
  { id: "ryazan", name: "Рязань", x: 131, y: 287, region: "RU-RYA" },
  { id: "tula", name: "Тула", x: 112, y: 280, region: "RU-TUL" },
  { id: "kaluga", name: "Калуга", x: 110, y: 265, region: "RU-KLU" },
  { id: "bryansk", name: "Брянск", x: 83, y: 272, region: "RU-BRY" },
  { id: "orel", name: "Орёл", x: 95, y: 285, region: "RU-ORL" },
  { id: "kursk", name: "Курск", x: 80, y: 290, region: "RU-KRS" },
  { id: "belgorod", name: "Белгород", x: 80, y: 305, region: "RU-BEL" },
  { id: "voronezh", name: "Воронеж", x: 100, y: 310, region: "RU-VOR", isMainCenter: true },
  { id: "lipetsk", name: "Липецк", x: 111, y: 300, region: "RU-LIP" },
  { id: "tambov", name: "Тамбов", x: 121, y: 311, region: "RU-TAM" },
  { id: "penza", name: "Пенза", x: 145, y: 320, region: "RU-PNZ" },
  { id: "saransk", name: "Саранск", x: 153, y: 311, region: "RU-MO" },
  { id: "ulyanovsk", name: "Ульяновск", x: 170, y: 327, region: "RU-ULY" },
  { id: "samara", name: "Самара", x: 180, y: 345, region: "RU-SAM" },
  { id: "saratov", name: "Саратов", x: 140, y: 350, region: "RU-SAR" },
  { id: "volgograd", name: "Волгоград", x: 113, y: 362, region: "RU-VGG" },
  { id: "astrakhan", name: "Астрахань", x: 113, y: 410, region: "RU-AST" },
  { id: "elista", name: "Элиста", x: 90, y: 389, region: "RU-KL" },
  { id: "rostov_na_donu", name: "Ростов-на-Дону", x: 65, y: 352, region: "RU-ROS", isMainCenter: true },
  { id: "krasnodar", name: "Краснодар", x: 46, y: 370, region: "RU-KDA", isMainCenter: true },
  { id: "maykop", name: "Майкоп", x: 46, y: 381, region: "RU-AD" },
  { id: "cherkessk", name: "Черкесск", x: 50, y: 395, region: "RU-KC" },
  { id: "stavropol", name: "Ставрополь", x: 65, y: 395, region: "RU-STA" },
  { id: "pyatigorsk", name: "Пятигорск", x: 60, y: 410, region: "RU-KB", isMainCenter: true },
  { id: "vladikavkaz", name: "Владикавказ", x: 65, y: 420, region: "RU-SE" },
  { id: "nazran", name: "Назрань", x: 70, y: 425, region: "RU-IN" },
  { id: "grozny", name: "Грозный", x: 75, y: 425, region: "RU-CE" },
  { id: "makhachkala", name: "Махачкала", x: 80, y: 445, region: "RU-DA" },
  { id: "orenburg", name: "Оренбург", x: 210, y: 395, region: "RU-ORE" },
  { id: "ufa", name: "Уфа", x: 230, y: 365, region: "RU-BA" },
  { id: "chelyabinsk", name: "Челябинск", x: 260, y: 378, region: "RU-CHE" },
  { id: "kurgan", name: "Курган", x: 286, y: 378, region: "RU-KGN" },
  { id: "tyumen", name: "Тюмень", x: 313, y: 375, region: "RU-TYU" },
  { id: "omsk", name: "Омск", x: 350, y: 420, region: "RU-OMS" },
  { id: "novosibirsk", name: "Новосибирск", x: 412, y: 435, region: "RU-NVS" },
  { id: "tomsk", name: "Томск", x: 433, y: 413, region: "RU-TOM" },
  { id: "kemerovo", name: "Кемерово", x: 440, y: 435, region: "RU-KEM" },
  { id: "novokuznetsk", name: "Новокузнецк", x: 445, y: 460, region: "RU-KEM" },
  { id: "barnaul", name: "Барнаул", x: 410, y: 460, region: "RU-ALT" },
  { id: "gorno_altaysk", name: "Горно-Алтайск", x: 420, y: 490, region: "RU-AL" },
  { id: "abakan", name: "Абакан", x: 465, y: 470, region: "RU-KK" },
  { id: "kyzyl", name: "Кызыл", x: 490, y: 495, region: "RU-TY" },
  { id: "krasnoyarsk", name: "Красноярск", x: 490, y: 400, region: "RU-KYA" },
  { id: "irkutsk", name: "Иркутск", x: 570, y: 480, region: "RU-IRK" },
  { id: "ulan_ude", name: "Улан-Удэ", x: 585, y: 500, region: "RU-BU" },
  { id: "chita", name: "Чита", x: 650, y: 490, region: "RU-ZAB" },
  { id: "blagoveshchensk", name: "Благовещенск", x: 750, y: 480, region: "RU-AMU" },
  { id: "birobidzhan", name: "Биробиджан", x: 800, y: 500, region: "RU-YEV" },
  { id: "khabarovsk", name: "Хабаровск", x: 830, y: 500, region: "RU-KHA" },
  { id: "vladivostok", name: "Владивосток", x: 810, y: 570, region: "RU-PRI" },
  { id: "yuzhno_sakhalinsk", name: "Южно-Сахалинск", x: 890, y: 490, region: "RU-SAK" },
  { id: "anadyr", name: "Анадырь", x: 960, y: 150, region: "RU-CHU" },
  { id: "magadan", name: "Магадан", x: 870, y: 310, region: "RU-MAG" },
  { id: "petropavlovsk_kamchatsky", name: "Петропавловск-Камчатский", x: 965, y: 360, region: "RU-KAM" },
  { id: "yakutsk", name: "Якутск", x: 700, y: 340, region: "RU-SA" },
  { id: "smolensk", name: "Смоленск", x: 95, y: 245, region: "RU-SMO" },
  { id: "tver", name: "Тверь", x: 130, y: 238, region: "RU-TVE" },
  { id: "vologda", name: "Вологда", x: 175, y: 240, region: "RU-VLG" },
  { id: "petrozavodsk", name: "Петрозаводск", x: 175, y: 185, region: "RU-KR" }
];

const RussiaMap: React.FC = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const svgRef = useRef<HTMLDivElement>(null);
  const [activeCityId, setActiveCityId] = useState<string | null>(null)
  const [activePopupMode, setActivePopupMode] = useState<'region' | 'city' | null>(null)
  const closePopupTimeoutRef = useRef<number | null>(null)
  const lastRegionUnderCursorRef = useRef<string | null>(null)
  const [cmsContacts, setCmsContacts] = useState<CmsBranchContact[]>([])

  useEffect(() => {
    let cancelled = false
    fetchCmsBranchContacts()
      .then((items) => {
        if (!cancelled) setCmsContacts(items)
      })
      .catch(() => {
        // keep fallback
      })
    return () => {
      cancelled = true
    }
  }, [])

  const contactByCityId = useMemo<Record<string, BranchContact>>(() => {
    if (!cmsContacts || cmsContacts.length === 0) return branchContactsByCityId

    const map: Record<string, BranchContact> = {}
    for (const c of cmsContacts) {
      if (!c?.cityId) continue
      if (c.isActive === false) continue
      map[c.cityId] = {
        cityId: c.cityId,
        cityName: c.cityName,
        regionCode: c.regionCode,
        phone: c.phone,
        email: c.email,
        address: c.address,
        directorName: c.directorName,
        directorTitle: c.directorTitle,
        avatarUrl: extractMediaUrl((c as any).avatar),
      }
    }
    // If CMS is misconfigured and returned nothing, fallback to local map
    return Object.keys(map).length > 0 ? map : branchContactsByCityId
  }, [cmsContacts])

  const highlightedCenters = useMemo(() => {
    // Popups must be only for cities that have a YELLOW dot (main center) + contacts.
    return regionalCenters.filter((c) => c.isMainCenter && Boolean(contactByCityId[c.id]))
  }, [contactByCityId])

  const regionToHighlightedCityId = useMemo(() => {
    const map = new Map<string, string>()
    highlightedCenters.forEach((c) => {
      map.set(c.region, c.id)
    })
    return map
  }, [highlightedCenters])

  const clearCloseTimer = useCallback(() => {
    if (closePopupTimeoutRef.current) {
      window.clearTimeout(closePopupTimeoutRef.current)
      closePopupTimeoutRef.current = null
    }
  }, [])

  const closePopupImmediate = useCallback(() => {
    clearCloseTimer()
    setActiveCityId(null)
    setActivePopupMode(null)
  }, [clearCloseTimer])

  const openPopupForCity = useCallback(
    (cityId: string, mode: 'region' | 'city') => {
      clearCloseTimer()
      setActiveCityId(cityId)
      setActivePopupMode(mode)
    },
    [clearCloseTimer]
  )

  const scheduleClosePopup = useCallback((expectedCityId?: string) => {
    clearCloseTimer()
    closePopupTimeoutRef.current = window.setTimeout(() => {
      if (!expectedCityId) {
        setActiveCityId(null)
        setActivePopupMode(null)
        return
      }
      setActiveCityId((prev) => (prev === expectedCityId ? null : prev))
      setActivePopupMode((prev) => (activeCityId === expectedCityId ? null : prev))
    }, 120)
  }, [activeCityId, clearCloseTimer])

  const activeContact = useMemo<BranchContact | null>(() => {
    if (!activeCityId) return null
    return contactByCityId[activeCityId] || null
  }, [activeCityId, contactByCityId])

  useEffect(() => {
    // Загружаем SVG файл
    fetch(getAssetPath('img/svg.svg'))
      .then(response => response.text())
      .then(data => {
        // Удаляем все title элементы из SVG
        const cleanedData = data.replace(/<title>.*?<\/title>/gi, '');
        setSvgContent(cleanedData);
      })
      .catch(error => {
        console.error('Ошибка загрузки SVG:', error);
      });
  }, []);

  useEffect(() => {
    if (!svgContent || !svgRef.current) return

    // Remove all <title> nodes/attributes from injected SVG
    const allElements = svgRef.current.querySelectorAll('*')
    allElements.forEach((el) => {
      el.removeAttribute('title')
    })
    const titleElements = svgRef.current.querySelectorAll('title')
    titleElements.forEach((title) => title.remove())
  }, [svgContent])

  useEffect(() => {
    if (!svgContent || !svgRef.current) return
    const root = svgRef.current

    // Delegate hover detection to the container to avoid "stuck" hover when moving between adjacent paths.
    const handlePointerMove = (e: PointerEvent) => {
      const target = e.target as Element | null
      const pathEl = target?.closest?.('path[data-code]') as SVGPathElement | null
      const regionCode = pathEl?.getAttribute('data-code') || null

      if (regionCode === lastRegionUnderCursorRef.current) return
      lastRegionUnderCursorRef.current = regionCode

      setHoveredRegion(regionCode)

      if (!regionCode) {
        if (activePopupMode === 'region') closePopupImmediate()
        return
      }

      const cityIdForPopup = regionToHighlightedCityId.get(regionCode) || null
      if (cityIdForPopup) {
        openPopupForCity(cityIdForPopup, 'region')
      } else {
        // Hovered a region without a yellow-dot popup: close any region-popup immediately.
        if (activePopupMode === 'region') closePopupImmediate()
      }
    }

    const handlePointerLeave = () => {
      lastRegionUnderCursorRef.current = null
      setHoveredRegion(null)
      if (activePopupMode === 'region') closePopupImmediate()
    }

    root.addEventListener('pointermove', handlePointerMove)
    root.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      root.removeEventListener('pointermove', handlePointerMove)
      root.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [
    activePopupMode,
    closePopupImmediate,
    openPopupForCity,
    regionToHighlightedCityId,
    svgContent,
  ])

  useEffect(() => {
    if (!svgContent || !svgRef.current) return

    // Update region fills based on hover/selection (no re-binding handlers)
    const paths = Array.from(svgRef.current.querySelectorAll('path[data-code]'))
    for (const path of paths) {
      const regionCode = path.getAttribute('data-code')
      if (!regionCode) continue
      const pathEl = path as SVGPathElement
      if (hoveredRegion === regionCode) {
        pathEl.style.fill = '#2D2D30'
        pathEl.style.strokeWidth = '1.5'
      } else {
        pathEl.style.fill = '#1F1F23'
        pathEl.style.strokeWidth = '0.7'
      }
    }
  }, [hoveredRegion, svgContent])

  const handleCenterClick = (center: RegionalCenter) => {
    const hasContact = Boolean(center.isMainCenter && contactByCityId[center.id])
    if (!hasContact) return
    if (activeCityId === center.id && activePopupMode === 'city') {
      closePopupImmediate()
      return
    }
    openPopupForCity(center.id, 'city')
  };

  const activeCenter = useMemo(() => {
    if (!activeContact) return null
    return regionalCenters.find((c) => c.id === activeContact.cityId) || null
  }, [activeContact])

  return (
    <section className="russia-map-section" id="map">
      <div className="russia-map-container">
      <div className="map-header">
        <h2>Интерактивная карта России</h2>
        <p>85 регионов с региональными центрами</p>
      </div>

      <div
        className="map-wrapper"
        onMouseLeave={() => {
          setHoveredRegion(null)
          // Ensure region-hover highlight/popup never sticks when leaving the map.
          if (activePopupMode === 'region') closePopupImmediate()
        }}
      >
        <div 
          ref={svgRef}
          className="svg-container"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />

        {activeContact && activeCenter ? (() => {
          const percentX = (activeCenter.x / 1000) * 100
          const percentY = (activeCenter.y / 600) * 100
          let posClass = 'popup-top'
          if (percentX < 18) posClass = 'popup-right'
          else if (percentX > 82) posClass = 'popup-left'
          else if (percentY < 18) posClass = 'popup-bottom'

          const initials = getInitials(activeContact.directorName)
          const tel = sanitizeTel(activeContact.phone)

          return (
            <div
              className={`center-popupAnchor ${posClass}`}
              style={{ left: `${percentX}%`, top: `${percentY}%` }}
              data-popup-mode={activePopupMode || undefined}
              onMouseEnter={() => {
                // For region-hover popups we do NOT keep it open outside the region.
                if (activePopupMode === 'region') return
                openPopupForCity(activeContact.cityId, 'city')
              }}
              onMouseLeave={() => {
                if (activePopupMode === 'region') return
                scheduleClosePopup(activeContact.cityId)
              }}
              role="dialog"
              aria-label={`Контакты филиала: ${activeContact.cityName}`}
            >
              <div className="center-popup">
                <div className="center-popupHeader">
                  <div className="center-popupAvatar" aria-hidden="true">
                    {activeContact.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={activeContact.avatarUrl} alt="" className="center-popupAvatarImg" />
                    ) : (
                      <span className="center-popupAvatarText">{initials}</span>
                    )}
                  </div>
                  <div className="center-popupHeaderText">
                    <div className="center-popupCity">{activeContact.cityName}</div>
                    <div className="center-popupTitle">{activeContact.directorTitle}</div>
                    <div className="center-popupName">{activeContact.directorName}</div>
                  </div>
                </div>

                <div className="center-popupBody">
                  <a className="center-popupRow" href={`tel:${tel}`}>
                    <span className="center-popupRowLabel">Тел:</span>
                    <span className="center-popupRowValue">{activeContact.phone}</span>
                  </a>
                  <a className="center-popupRow" href={`mailto:${activeContact.email}`}>
                    <span className="center-popupRowLabel">Email:</span>
                    <span className="center-popupRowValue">{activeContact.email}</span>
                  </a>
                  <div className="center-popupRow center-popupRowStatic">
                    <span className="center-popupRowLabel">Адрес:</span>
                    <span className="center-popupRowValue">{activeContact.address}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })() : null}
        
        {svgContent && (
          <div className="centers-overlay">
            {regionalCenters.map(center => {
              const isCityHovered = hoveredCity === center.id;
              const isMainCenter = center.isMainCenter || false;
              const hasContact = Boolean(center.isMainCenter && contactByCityId[center.id])
              // For RED dots (non-main centers): show city label ONLY when hovering the dot,
              // never when hovering the whole region.
              // For YELLOW dots (main centers with contacts): popup is used instead of label.
              const shouldShowLabel = !hasContact && isCityHovered
              
              // Определяем позицию метки относительно краев
              const percentX = (center.x / 1000) * 100;
              const percentY = (center.y / 600) * 100;
              
              // Определяем класс для позиционирования
              let labelPositionClass = '';
              if (percentX < 15) {
                labelPositionClass = 'label-right';
              } else if (percentX > 85) {
                labelPositionClass = 'label-left';
              } else if (percentY < 15) {
                labelPositionClass = 'label-bottom';
              } else {
                labelPositionClass = 'label-top';
              }
              
              return (
              <div
                key={center.id}
                  className={`regional-center ${shouldShowLabel ? 'label-visible' : ''} ${isMainCenter ? 'main-center' : ''} ${hasContact ? 'has-contact' : ''}`}
                style={{
                    left: `${percentX}%`,
                    top: `${percentY}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: shouldShowLabel ? 101 : 100 /* Поднимаем активную метку наверх */
                }}
                onClick={() => handleCenterClick(center)}
                onMouseEnter={() => {
                  setHoveredCity(center.id)
                  if (hasContact) openPopupForCity(center.id, 'city')
                }}
                onMouseLeave={() => {
                  setHoveredCity(null)
                  if (hasContact && activePopupMode === 'city') scheduleClosePopup(center.id)
                }}
              >
                <div className="center-dot" />
                  {shouldShowLabel && (
                    <div className={`center-label ${labelPositionClass}`}>
                    {center.name}
                  </div>
                )}
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </section>
  );
};

export default RussiaMap; 