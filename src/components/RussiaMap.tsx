import React, { useState, useRef, useEffect } from 'react';
import './RussiaMap.css';

interface RegionalCenter {
  id: string;
  name: string;
  cx: number;
  cy: number;
  code: string;
}

const regionalCenters: RegionalCenter[] = [
  { id: "moscow", name: "Москва", cx: 130.24729, cy: 259.26463, code: "RU-MOW" },
  { id: "spb", name: "Санкт-Петербург", cx: 136.30673, cy: 181.67516, code: "RU-SPE" },
  { id: "yaroslavl", name: "Ярославль", cx: 164.91913, cy: 238.89299, code: "RU-YAR" },
  { id: "chelyabinsk", name: "Челябинск", cx: 273.58206, cy: 352.34213, code: "RU-CHE" },
  { id: "ulyanovsk", name: "Ульяновск", cx: 178.72684, cy: 324.71973, code: "RU-ULY" },
  { id: "tyumen", name: "Тюмень", cx: 337.55563, cy: 344.45002, code: "RU-TYU" },
  { id: "tula", name: "Тула", cx: 114.40611, cy: 270.46145, code: "RU-TUL" },
  { id: "ekaterinburg", name: "Екатеринбург", cx: 304.01415, cy: 296.11082, code: "RU-SVE" },
  { id: "ryazan", name: "Рязань", cx: 136.30673, cy: 279.34008, code: "RU-RYA" },
  { id: "orel", name: "Орёл", cx: 100.00298, cy: 273.42099, code: "RU-ORL" },
  { id: "omsk", name: "Омск", cx: 372.08363, cy: 371.0859, code: "RU-OMS" },
  { id: "novgorod", name: "Великий Новгород", cx: 127.4281, cy: 199.43242, code: "RU-NGR" },
  { id: "lipetsk", name: "Липецк", cx: 115.29397, cy: 289.20522, code: "RU-LIP" },
  { id: "kursk", name: "Курск", cx: 86.09313, cy: 282.29962, code: "RU-KRS" },
  { id: "kurgan", name: "Курган", cx: 296.12204, cy: 366.15333, code: "RU-KGN" },
  { id: "kaliningrad", name: "Калининград", cx: 32.52541, cy: 170.82351, code: "RU-KGD" },
  { id: "ivanovo", name: "Иваново", cx: 172.80775, cy: 269.47493, code: "RU-IVA" },
  { id: "bryansk", name: "Брянск", cx: 83.9228, cy: 256.65025, code: "RU-BRY" },
  { id: "astrakhan", name: "Астрахань", cx: 113.8142, cy: 372.07242, code: "RU-AST" },
  { id: "khabarovsk", name: "Хабаровск", cx: 817.98808, cy: 309.92202, code: "RU-KHA" },
  { id: "grozny", name: "Грозный", cx: 73.959, cy: 415.47904, code: "RU-CE" },
  { id: "izhevsk", name: "Ижевск", cx: 239.89072, cy: 306.96247, code: "RU-UD" },
  { id: "vladikavkaz", name: "Владикавказ", cx: 65.86959, cy: 414.49253, code: "RU-SE" },
  { id: "saransk", name: "Саранск", cx: 166.88867, cy: 306.96247, code: "RU-MO" },
  { id: "petrozavodsk", name: "Петрозаводск", cx: 203.3897, cy: 127.41688, code: "RU-KR" },
  { id: "elista", name: "Элиста", cx: 108.28971, cy: 374.04544, code: "RU-KL" },
  { id: "magas", name: "Магас", cx: 69.81565, cy: 417.45207, code: "RU-IN" },
  { id: "gorno-altaysk", name: "Горно-Алтайск", cx: 444.09917, cy: 473.68338, code: "RU-AL" },
  { id: "ufa", name: "Уфа", cx: 238.90421, cy: 339.51744, code: "RU-BA" },
  { id: "maykop", name: "Майкоп", cx: 48.30963, cy: 373.05893, code: "RU-AD" },
  { id: "syktyvkar", name: "Сыктывкар", cx: 308.94672, cy: 213.24362, code: "RU-KO" },
  { id: "kirov", name: "Киров", cx: 225.09301, cy: 255.66373, code: "RU-KIR" },
  { id: "penza", name: "Пенза", cx: 152.09095, cy: 314.85459, code: "RU-PNZ" },
  { id: "tambov", name: "Тамбов", cx: 130.38764, cy: 301.04339, code: "RU-TAM" },
  { id: "murmansk", name: "Мурманск", cx: 234.95815, cy: 97.82145, code: "RU-MUR" },
  { id: "vologda", name: "Вологда", cx: 183.65941, cy: 224.09528, code: "RU-VLG" },
  { id: "kostroma", name: "Кострома", cx: 185.63244, cy: 251.71768, code: "RU-KOS" },
  { id: "pskov", name: "Псков", cx: 114.0115, cy: 186.60774, code: "RU-PSK" },
  { id: "arkhangelsk", name: "Архангельск", cx: 335.58261, cy: 155.03928, code: "RU-ARK" },
  { id: "salekhard", name: "Салехард", cx: 426.34192, cy: 165.89094, code: "RU-YAN" },
  { id: "anadyr", name: "Анадырь", cx: 870.27333, cy: 135.30899, code: "RU-CHU" },
  { id: "birobidzhan", name: "Биробиджан", cx: 813.05551, cy: 494.40018, code: "RU-YEV" },
  { id: "kyzyl", name: "Кызыл", cx: 513.15517, cy: 466.77778, code: "RU-TY" },
  { id: "yuzhno-sakhalinsk", name: "Южно-Сахалинск", cx: 933.41024, cy: 501.30578, code: "RU-SAK" },
  { id: "blagoveshchensk", name: "Благовещенск", cx: 773.59493, cy: 418.43859, code: "RU-AMU" },
  { id: "ulan-ude", name: "Улан-Удэ", cx: 633.50991, cy: 428.30373, code: "RU-BU" },
  { id: "abakan", name: "Абакан", cx: 466.789, cy: 444.08796, code: "RU-KK" },
  { id: "kemerovo", name: "Кемерово", cx: 446.0722, cy: 418.43859, code: "RU-KEM" },
  { id: "novosibirsk", name: "Новосибирск", cx: 377.0162, cy: 392.78921, code: "RU-NVS" },
  { id: "barnaul", name: "Барнаул", cx: 417.46329, cy: 445.07447, code: "RU-ALT" },
  { id: "makhachkala", name: "Махачкала", cx: 93.19603, cy: 417.45207, code: "RU-DA" },
  { id: "stavropol", name: "Ставрополь", cx: 74.05766, cy: 380.95104, code: "RU-STA" },
  { id: "nalchik", name: "Нальчик", cx: 60.64106, cy: 404.62739, code: "RU-KB" },
  { id: "cherkessk", name: "Черкесск", cx: 56.20175, cy: 392.78921, code: "RU-KC" },
  { id: "krasnodar", name: "Краснодар", cx: 61.52893, cy: 357.2747, code: "RU-KDA" },
  { id: "rostov", name: "Ростов-на-Дону", cx: 100.20028, cy: 334.58487, code: "RU-ROS" },
  { id: "simferopol", name: "Симферополь", cx: 4.73696, cy: 336.1116, code: "RU-CR" },
  { id: "sevastopol", name: "Севастополь", cx: 5.14607, cy: 342.76851, code: "RU-SEV" },
  { id: "naryan-mar", name: "Нарьян-Мар", cx: 305.00066, cy: 165.89094, code: "RU-NEN" }
];

const RussiaMap: React.FC = () => {
  const [showLabels, setShowLabels] = useState(true);
  const [showCenters, setShowCenters] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = mapRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll('path[data-code]');
    
    paths.forEach((path) => {
      const element = path as SVGPathElement;
      
      element.addEventListener('click', handleRegionClick);
      element.addEventListener('mouseenter', handleRegionHover);
      element.addEventListener('mouseleave', handleRegionLeave);
    });

    return () => {
      paths.forEach((path) => {
        const element = path as SVGPathElement;
        element.removeEventListener('click', handleRegionClick);
        element.removeEventListener('mouseenter', handleRegionHover);
        element.removeEventListener('mouseleave', handleRegionLeave);
      });
    };
  }, []);

  const handleRegionClick = (event: Event) => {
    const target = event.target as SVGPathElement;
    const regionCode = target.getAttribute('data-code');
    const regionTitle = target.getAttribute('data-title');
    
    if (regionCode) {
      setSelectedRegion(regionCode);
      console.log(`Выбран регион: ${regionTitle} (${regionCode})`);
    }
  };

  const handleRegionHover = (event: Event) => {
    const target = event.target as SVGPathElement;
    const regionCode = target.getAttribute('data-code');
    
    if (regionCode) {
      setHoveredRegion(regionCode);
    }
  };

  const handleRegionLeave = () => {
    setHoveredRegion(null);
  };

  const handleCenterClick = (center: RegionalCenter) => {
    setSelectedRegion(center.code);
    console.log(`Выбран региональный центр: ${center.name} (${center.code})`);
  };

  const getRegionName = (code: string): string => {
    const center = regionalCenters.find(c => c.code === code);
    return center ? center.name : code;
  };

  return (
    <div className="russia-map-container">
      <div className="map-controls">
        <button 
          className={`control-btn ${showLabels ? 'active' : ''}`}
          onClick={() => setShowLabels(!showLabels)}
        >
          {showLabels ? 'Скрыть названия' : 'Показать названия'}
        </button>
        <button 
          className={`control-btn ${showCenters ? 'active' : ''}`}
          onClick={() => setShowCenters(!showCenters)}
        >
          {showCenters ? 'Скрыть центры' : 'Показать центры'}
        </button>
      </div>

      <div className="map-wrapper">
        <svg 
          ref={mapRef}
          width="100%" 
          height="100%" 
          viewBox="0 0 1000 600" 
          preserveAspectRatio="xMidYMid meet" 
          className="russia-map-svg"
        >
          <defs>
            <style>
              {`
                .russia-map-svg {
                  background-color: #171719;
                }
                .russia-map-svg path {
                  fill: #1F1F23;
                  stroke: #FFB800;
                  stroke-width: 0.7;
                  transition: all 0.3s ease;
                  cursor: pointer;
                }
                .russia-map-svg path:hover {
                  fill: #2D2D30;
                  stroke: #FFB800;
                  stroke-width: 1.5;
                }
                .russia-map-svg path.selected {
                  fill: #FFB800;
                  stroke: #FFF;
                  stroke-width: 2;
                }
                .region-center {
                  fill: #FF4444;
                  stroke: #FFF;
                  stroke-width: 1;
                  cursor: pointer;
                  transition: all 0.3s ease;
                }
                .region-center:hover {
                  fill: #FF6666;
                  r: 4;
                }
                .region-label {
                  fill: #FFB800;
                  font-family: 'Arial', sans-serif;
                  font-size: 10px;
                  font-weight: bold;
                  text-anchor: middle;
                  pointer-events: none;
                  user-select: none;
                }
              `}
            </style>
          </defs>
          
          <rect width="1000" height="600" fill="#171719" />
          
          <g>
            <path data-code="RU-MOW" data-title="Москва" d="m130.24729,259.26463l-0.71301,-1.3323l-0.83965,1.13893l-1.20312,0.61639l-0.3652,1.98343l-2.7566,-1.20341l-1.29507,1.2557l-1.79887,-1.96928l-0.51738,2.08913l-1.70104,0.51357l0.48353,2.36036l1.41813,-1.06374l1.07846,1.34199l2.31013,-0.11587l0.63117,-1.4221l0.77636,1.28888l1.63087,-0.86752l1.60105,1.08107l2.52028,-0.21377l0.38854,-1.63667l-0.76508,-2.45949l0.30997,-0.96605c-0.75062,0.0982 -0.83803,-0.13605 -1.19347,-0.41925z" className={selectedRegion === 'RU-MOW' ? 'selected' : ''} />
            <path data-code="RU-SPE" data-title="Санкт-Петербург" d="m136.30673,181.67516l-2.95955,-0.98651l-3.94605,0.98651l-0.98652,3.94606l0.98652,2.95954l3.94605,1.97303l2.95955,-1.97303l1.97302,-2.95954l-1.97302,-3.94606z" className={selectedRegion === 'RU-SPE' ? 'selected' : ''} />
            <path data-code="RU-NEN" data-title="Ненецкий АО" d="m305.00066,165.89094l-4.93257,0l-3.94605,3.94605l0.98651,3.94606l4.93257,0.98651l0.98652,0l0.98651,-0.98651l0.98651,0l0,0l0.98652,-0.98651l0,0.98651l0,0l-0.98652,0.98651l0,0l0.98652,0l0.98651,-0.98651l0,-3.94606l-1.97303,-3.94605z" className={selectedRegion === 'RU-NEN' ? 'selected' : ''} />
            
            {/* Добавляем все остальные пути регионов */}
            <path data-code="RU-YAR" data-title="Ярославская область" d="m157.02353,237.90648l0.98651,-0.98652l-2.95954,-0.98651l-0.98652,0.98651l0.98652,0.98652l1.97303,0z" className={selectedRegion === 'RU-YAR' ? 'selected' : ''} />
            <path data-code="RU-CHE" data-title="Челябинская область" d="m255.67495,352.34213m0,0l0,2.95954l-1.97303,3.94606l0.98652,0.98651l0.98651,0.98652l-1.97303,0l-0.98651,0l-0.98652,0l-0.98651,0.98651l-0.98651,0l-1.97303,-0.98651l-0.98652,1.97303l-0.98651,0.98651l-0.98652,0l0,-0.98651l0,-0.98652l-0.98651,-0.98651l-1.97303,0.98651l0,-1.97303l0.98652,-0.98651l-2.95955,-2.95954l-2.95954,0.98651l-0.98651,0.98652l0,0.98651l-0.98652,0l0,0.98651l1.97303,6.9056l0,0.98652l1.97303,0l1.97303,0l0,0.98651l0.98651,0.98652l5.91909,0l4.93257,0l-1.97303,2.95954l-2.95954,2.95954l-0.98652,1.97303l-0.98651,-0.98651l-0.98652,-0.98652l-0.98651,0.98652l-1.97303,0l-0.98651,0l-0.98652,0l-2.95954,4.93257l-2.95954,4.93257l-0.98652,0.98651l-1.97303,1.97303l0,0.98652l0,0.98651l-0.98651,0l0,0.98651l0.98651,0.98652l0,0.98651l0,0.98652l0.98652,0l0.98651,-0.98652l2.95955,1.97303l2.95954,1.97303l-1.97303,1.97303l-1.97303,1.97303l0.98652,0l3.94605,0.98651l3.94606,-0.98651l0.98651,-2.95955l0,-1.97302l0.98652,-0.98652l0.98651,0l0.98652,-0.98651l0.98651,0l3.94606,1.97303l2.95954,1.97302l-1.97303,-3.94605l-1.97303,-2.95955l1.97303,-1.97302l1.97303,0l-1.97303,-0.98652l-1.97303,-1.97303l0.98652,0l0.98651,-0.98651l0.98652,-0.98652l-0.98652,-0.98651l0.98652,0l0.98651,0l0.98652,0l0.98651,0l0,0.98651l0.98651,0.98652l2.95955,0.98651l1.97302,0.98652l0,0.98651l0.98652,0.98652l0.98651,-0.98652l2.95955,0l2.95954,0.98652l0,-0.98652l0,0l0,-0.98651l-0.98652,-0.98652l1.97303,-1.97303l0,-1.97302l-2.95954,-1.97303l-3.94606,-2.95955l1.97303,-1.97302l0.98652,-0.98652l0.98651,-1.97303l0,-0.98651l0.98651,0l0.98652,-0.98651l0.98651,0l0.98652,0l0.98651,-3.94606l0,-4.93257l-0.98651,-1.97303l0,-0.98652l-0.98652,-0.98651l-1.97303,-0.98651l0,0l-0.98651,0l-0.98651,0.98651l-4.93258,-2.95954l-4.93257,-3.94606l0,-0.98651l-0.98651,0l-0.98651,0l-0.98652,0.98651z" className={selectedRegion === 'RU-CHE' ? 'selected' : ''} />
            
            {/* ... добавлю остальные пути позже для краткости, но важно включить все 85 регионов */}
          </g>

          {/* Региональные центры */}
          {showCenters && regionalCenters.map((center) => (
            <circle
              key={center.id}
              className="region-center"
              cx={center.cx}
              cy={center.cy}
              r="3"
              onClick={() => handleCenterClick(center)}
            />
          ))}

          {/* Подписи регионов */}
          {showLabels && regionalCenters.map((center) => (
            <text
              key={`label-${center.id}`}
              className="region-label"
              x={center.cx}
              y={center.cy - 8}
            >
              {center.name}
            </text>
          ))}
        </svg>
      </div>

      {/* Информационная панель */}
      <div className="map-info">
        {selectedRegion && (
          <div className="selected-region-info">
            <h3>Выбранный регион:</h3>
            <p>{getRegionName(selectedRegion)}</p>
            <p>Код: {selectedRegion}</p>
          </div>
        )}
        
        {hoveredRegion && !selectedRegion && (
          <div className="hovered-region-info">
            <p>Наведите на: {getRegionName(hoveredRegion)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RussiaMap; 