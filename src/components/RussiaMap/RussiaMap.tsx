import React, { useState, useEffect, useRef } from 'react';
import './RussiaMap.css';

interface RegionalCenter {
  id: string;
  name: string;
  x: number;
  y: number;
  region: string;
}

// Координаты региональных центров взяты из оригинального SVG файла
const regionalCenters: RegionalCenter[] = [
  { id: "moskva", name: "Москва", x: 130, y: 259, region: "RU-MOW" },
  { id: "spb", name: "Санкт-Петербург", x: 136, y: 182, region: "RU-SPE" },
  { id: "arkhangelsk", name: "Архангельск", x: 240, y: 150, region: "RU-ARK" },
  { id: "kaliningrad", name: "Калининград", x: 37, y: 175, region: "RU-KGD" },
  { id: "pskov", name: "Псков", x: 114, y: 198, region: "RU-PSK" },
  { id: "velikiy_novgorod", name: "Великий Новгород", x: 127, y: 199, region: "RU-NGR" },
  { id: "murmansk", name: "Мурманск", x: 175, y: 79, region: "RU-MUR" },
  { id: "syktyvkar", name: "Сыктывкар", x: 268, y: 183, region: "RU-KO" },
  { id: "naryan_mar", name: "Нарьян-Мар", x: 278, y: 116, region: "RU-NEN" },
  { id: "salekhard", name: "Салехард", x: 335, y: 128, region: "RU-YAN" },
  { id: "khanty_mansiysk", name: "Ханты-Мансийск", x: 343, y: 178, region: "RU-KHM" },
  { id: "ekaterinburg", name: "Екатеринбург", x: 304, y: 296, region: "RU-SVE" },
  { id: "perm", name: "Пермь", x: 284, y: 264, region: "RU-PER" },
  { id: "izhevsk", name: "Ижевск", x: 253, y: 290, region: "RU-UD" },
  { id: "yoshkar_ola", name: "Йошкар-Ола", x: 214, y: 290, region: "RU-ME" },
  { id: "cheboksary", name: "Чебоксары", x: 208, y: 295, region: "RU-CU" },
  { id: "kazan", name: "Казань", x: 225, y: 256, region: "RU-TA" },
  { id: "nizhniy_novgorod", name: "Нижний Новгород", x: 166, y: 307, region: "RU-NIZ" },
  { id: "kirov", name: "Киров", x: 223, y: 261, region: "RU-KIR" },
  { id: "kostroma", name: "Кострома", x: 167, y: 263, region: "RU-KOS" },
  { id: "yaroslavl", name: "Ярославль", x: 152, y: 254, region: "RU-YAR" },
  { id: "ivanovo", name: "Иваново", x: 161, y: 275, region: "RU-IVA" },
  { id: "vladimir", name: "Владимир", x: 155, y: 285, region: "RU-VLA" },
  { id: "ryazan", name: "Рязань", x: 154, y: 312, region: "RU-RYA" },
  { id: "tula", name: "Тула", x: 142, y: 306, region: "RU-TUL" },
  { id: "kaluga", name: "Калуга", x: 138, y: 289, region: "RU-KLU" },
  { id: "bryansk", name: "Брянск", x: 119, y: 304, region: "RU-BRY" },
  { id: "orel", name: "Орёл", x: 139, y: 327, region: "RU-ORL" },
  { id: "kursk", name: "Курск", x: 137, y: 346, region: "RU-KRS" },
  { id: "belgorod", name: "Белгород", x: 137, y: 367, region: "RU-BEL" },
  { id: "voronezh", name: "Воронеж", x: 155, y: 346, region: "RU-VOR" },
  { id: "lipetsk", name: "Липецк", x: 155, y: 329, region: "RU-LIP" },
  { id: "tambov", name: "Тамбов", x: 169, y: 336, region: "RU-TAM" },
  { id: "penza", name: "Пенза", x: 194, y: 336, region: "RU-PNZ" },
  { id: "saransk", name: "Саранск", x: 185, y: 318, region: "RU-MO" },
  { id: "ulyanovsk", name: "Ульяновск", x: 218, y: 318, region: "RU-ULY" },
  { id: "samara", name: "Самара", x: 227, y: 336, region: "RU-SAM" },
  { id: "saratov", name: "Саратов", x: 212, y: 364, region: "RU-SAR" },
  { id: "volgograd", name: "Волгоград", x: 202, y: 405, region: "RU-VGG" },
  { id: "astrakhan", name: "Астрахань", x: 219, y: 438, region: "RU-AST" },
  { id: "elista", name: "Элиста", x: 190, y: 430, region: "RU-KL" },
  { id: "rostov_na_donu", name: "Ростов-на-Дону", x: 158, y: 411, region: "RU-ROS" },
  { id: "krasnodar", name: "Краснодар", x: 158, y: 445, region: "RU-KDA" },
  { id: "maykop", name: "Майкоп", x: 168, y: 453, region: "RU-AD" },
  { id: "cherkessk", name: "Черкесск", x: 185, y: 464, region: "RU-KC" },
  { id: "stavropol", name: "Ставрополь", x: 187, y: 449, region: "RU-STA" },
  { id: "pyatigorsk", name: "Пятигорск", x: 192, y: 460, region: "RU-KB" },
  { id: "vladikavkaz", name: "Владикавказ", x: 203, y: 469, region: "RU-SE" },
  { id: "nazran", name: "Назрань", x: 216, y: 469, region: "RU-IN" },
  { id: "grozny", name: "Грозный", x: 223, y: 467, region: "RU-CE" },
  { id: "makhachkala", name: "Махачкала", x: 251, y: 462, region: "RU-DA" },
  { id: "orenburg", name: "Оренбург", x: 258, y: 364, region: "RU-ORE" },
  { id: "ufa", name: "Уфа", x: 260, y: 313, region: "RU-BA" },
  { id: "chelyabinsk", name: "Челябинск", x: 256, y: 352, region: "RU-CHE" },
  { id: "kurgan", name: "Курган", x: 306, y: 378, region: "RU-KGN" },
  { id: "tyumen", name: "Тюмень", x: 328, y: 281, region: "RU-TYU" },
  { id: "omsk", name: "Омск", x: 377, y: 336, region: "RU-OMS" },
  { id: "novosibirsk", name: "Новосибирск", x: 377, y: 393, region: "RU-NVS" },
  { id: "tomsk", name: "Томск", x: 394, y: 301, region: "RU-TOM" },
  { id: "kemerovo", name: "Кемерово", x: 401, y: 387, region: "RU-KEM" },
  { id: "novokuznetsk", name: "Новокузнецк", x: 409, y: 406, region: "RU-ALT" },
  { id: "barnaul", name: "Барнаул", x: 393, y: 424, region: "RU-ALT" },
  { id: "gorno_altaysk", name: "Горно-Алтайск", x: 409, y: 444, region: "RU-AL" },
  { id: "abakan", name: "Абакан", x: 429, y: 391, region: "RU-KK" },
  { id: "kyzyl", name: "Кызыл", x: 474, y: 378, region: "RU-TY" },
  { id: "krasnoyarsk", name: "Красноярск", x: 433, y: 299, region: "RU-KYA" },
  { id: "irkutsk", name: "Иркутск", x: 492, y: 349, region: "RU-IRK" },
  { id: "ulan_ude", name: "Улан-Удэ", x: 541, y: 364, region: "RU-BU" },
  { id: "chita", name: "Чита", x: 577, y: 362, region: "RU-ZAB" },
  { id: "blagoveshchensk", name: "Благовещенск", x: 653, y: 380, region: "RU-AMU" },
  { id: "birobidzhan", name: "Биробиджан", x: 692, y: 430, region: "RU-YEV" },
  { id: "khabarovsk", name: "Хабаровск", x: 698, y: 403, region: "RU-KHA" },
  { id: "vladivostok", name: "Владивосток", x: 726, y: 459, region: "RU-PRI" },
  { id: "yuzhno_sakhalinsk", name: "Южно-Сахалинск", x: 788, y: 425, region: "RU-SAK" },
  { id: "anadyr", name: "Анадырь", x: 873, y: 145, region: "RU-CHU" },
  { id: "magadan", name: "Магадан", x: 799, y: 200, region: "RU-MAG" },
  { id: "petropavlovsk_kamchatsky", name: "Петропавловск-Камчатский", x: 848, y: 328, region: "RU-KAM" },
  { id: "yakutsk", name: "Якутск", x: 665, y: 195, region: "RU-SA" },
  { id: "smolensk", name: "Смоленск", x: 124, y: 263, region: "RU-SMO" },
  { id: "tver", name: "Тверь", x: 142, y: 233, region: "RU-TVE" },
  { id: "vologda", name: "Вологда", x: 166, y: 207, region: "RU-VLG" },
  { id: "petrozavodsk", name: "Петрозаводск", x: 155, y: 157, region: "RU-KR" }
];

const RussiaMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showCenters, setShowCenters] = useState<boolean>(true);
  const [svgContent, setSvgContent] = useState<string>('');
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Загружаем SVG файл
    fetch('/img/svg.svg')
      .then(response => response.text())
      .then(data => {
        setSvgContent(data);
      })
      .catch(error => {
        console.error('Ошибка загрузки SVG:', error);
      });
  }, []);

  useEffect(() => {
    if (svgContent && svgRef.current) {
      // Добавляем интерактивность к SVG элементам
      const paths = svgRef.current.querySelectorAll('path[data-code]');
      
      paths.forEach(path => {
        const regionCode = path.getAttribute('data-code');
        const regionTitle = path.getAttribute('data-title');
        
        if (regionCode) {
          // Обновляем стили на основе состояния
          const pathEl = path as SVGPathElement;
          if (selectedRegion === regionCode) {
            pathEl.style.fill = '#FFB800';
            pathEl.style.strokeWidth = '2';
          } else if (hoveredRegion === regionCode) {
            pathEl.style.fill = '#2D2D30';
            pathEl.style.strokeWidth = '1.5';
          } else {
            pathEl.style.fill = '#1F1F23';
            pathEl.style.strokeWidth = '0.7';
          }

          // Добавляем обработчики событий
          const handleClick = () => {
            setSelectedRegion(regionCode === selectedRegion ? null : regionCode);
          };

          const handleMouseEnter = () => {
            setHoveredRegion(regionCode);
          };

          const handleMouseLeave = () => {
            setHoveredRegion(null);
          };

          path.addEventListener('click', handleClick);
          path.addEventListener('mouseenter', handleMouseEnter);
          path.addEventListener('mouseleave', handleMouseLeave);

          // Cleanup
          return () => {
            path.removeEventListener('click', handleClick);
            path.removeEventListener('mouseenter', handleMouseEnter);
            path.removeEventListener('mouseleave', handleMouseLeave);
          };
        }
      });
    }
  }, [svgContent, selectedRegion, hoveredRegion]);

  const handleCenterClick = (center: RegionalCenter) => {
    setSelectedRegion(center.region === selectedRegion ? null : center.region);
  };

  const getRegionName = (code: string): string => {
    const center = regionalCenters.find(c => c.region === code);
    return center ? center.name : code;
  };

  return (
    <div className="russia-map-container">
      <div className="map-header">
        <h2>Интерактивная карта России</h2>
        <p>85 регионов с региональными центрами</p>
      </div>

      <div className="map-controls">
        <button 
          className={`control-btn ${showLabels ? 'active' : ''}`}
          onClick={() => setShowLabels(!showLabels)}
        >
          {showLabels ? '🏷️ Скрыть названия' : '🏷️ Показать названия'}
        </button>
        <button 
          className={`control-btn ${showCenters ? 'active' : ''}`}
          onClick={() => setShowCenters(!showCenters)}
        >
          {showCenters ? '📍 Скрыть центры' : '📍 Показать центры'}
        </button>
      </div>

      <div className="map-wrapper">
        <div 
          ref={svgRef}
          className="svg-container"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
        
        {showCenters && svgContent && (
          <div className="centers-overlay">
            {regionalCenters.map(center => (
              <div
                key={center.id}
                className={`regional-center ${selectedRegion === center.region ? 'selected' : ''}`}
                style={{
                  left: `${(center.x / 1000) * 100}%`,
                  top: `${(center.y / 600) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleCenterClick(center)}
                title={center.name}
              >
                <div className="center-dot" />
                {showLabels && (
                  <div className="center-label">
                    {center.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedRegion && (
          <div className="region-info">
            <h3>Выбранный регион:</h3>
            <p>{getRegionName(selectedRegion)}</p>
            <p>Код региона: {selectedRegion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RussiaMap; 