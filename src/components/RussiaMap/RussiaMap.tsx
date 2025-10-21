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
  { id: "arkhangelsk", name: "Архангельск", x: 220, y: 185, region: "RU-ARK" },
  { id: "kaliningrad", name: "Калининград", x: 37, y: 178, region: "RU-KGD" },
  { id: "pskov", name: "Псков", x: 100, y: 205, region: "RU-PSK" },
  { id: "velikiy_novgorod", name: "Великий Новгород", x: 127, y: 203, region: "RU-NGR" },
  { id: "murmansk", name: "Мурманск", x: 231, y: 110, region: "RU-MUR" },
  { id: "syktyvkar", name: "Сыктывкар", x: 250, y:255, region: "RU-KO" },
  { id: "naryan_mar", name: "Нарьян-Мар", x: 300, y: 190, region: "RU-NEN" },
  { id: "salekhard", name: "Салехард", x: 375, y: 250, region: "RU-YAN" },
  { id: "khanty_mansiysk", name: "Ханты-Мансийск", x: 343, y: 300, region: "RU-KHM" },
  { id: "ekaterinburg", name: "Екатеринбург", x: 280, y: 350, region: "RU-SVE" },
  { id: "perm", name: "Пермь", x: 260, y: 320, region: "RU-PER" },
  { id: "izhevsk", name: "Ижевск", x: 225, y: 320, region: "RU-UD" },
  { id: "yoshkar_ola", name: "Йошкар-Ола", x: 187, y: 295, region: "RU-ME" },
  { id: "cheboksary", name: "Чебоксары", x: 180, y: 310, region: "RU-CU" },
  { id: "kazan", name: "Казань", x: 200, y: 320, region: "RU-TA" },
  { id: "nizhniy_novgorod", name: "Нижний Новгород", x: 166, y: 295, region: "RU-NIZ" },
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
  { id: "voronezh", name: "Воронеж", x: 100, y: 310, region: "RU-VOR" },
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
  { id: "rostov_na_donu", name: "Ростов-на-Дону", x: 65, y: 352, region: "RU-ROS" },
  { id: "krasnodar", name: "Краснодар", x: 46, y: 370, region: "RU-KDA" },
  { id: "maykop", name: "Майкоп", x: 46, y: 381, region: "RU-AD" },
  { id: "cherkessk", name: "Черкесск", x: 50, y: 395, region: "RU-KC" },
  { id: "stavropol", name: "Ставрополь", x: 65, y: 395, region: "RU-STA" },
  { id: "pyatigorsk", name: "Пятигорск", x: 60, y: 410, region: "RU-KB" },
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
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Загружаем SVG файл
    fetch(`${import.meta.env.BASE_URL}img/svg.svg`)
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
    if (svgContent && svgRef.current) {
      // Удаляем все title элементы и атрибуты из SVG
      const allElements = svgRef.current.querySelectorAll('*');
      allElements.forEach(el => {
        el.removeAttribute('title');
      });
      
      // Удаляем все <title> элементы
      const titleElements = svgRef.current.querySelectorAll('title');
      titleElements.forEach(title => title.remove());
      
      // Добавляем интерактивность к SVG элементам
      const paths = svgRef.current.querySelectorAll('path[data-code]');
      
      paths.forEach(path => {
        const regionCode = path.getAttribute('data-code');
        
        if (regionCode) {
          // Находим город для этого региона
          const center = regionalCenters.find(c => c.region === regionCode);
          
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
            if (center) {
              setSelectedRegion(regionCode === selectedRegion ? null : regionCode);
              setSelectedCity(selectedCity === center.id ? null : center.id);
            }
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
  }, [svgContent, selectedRegion, hoveredRegion, selectedCity]);

  const handleCenterClick = (center: RegionalCenter) => {
    setSelectedRegion(center.region === selectedRegion ? null : center.region);
    setSelectedCity(selectedCity === center.id ? null : center.id);
  };

  return (
    <div className="russia-map-container" id="map">
      <div className="map-header">
        <h2>Интерактивная карта России</h2>
        <p>85 регионов с региональными центрами</p>
      </div>

      <div className="map-wrapper">
        <div 
          ref={svgRef}
          className="svg-container"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
        
        {svgContent && (
          <div className="centers-overlay">
            {regionalCenters.map(center => {
              const isHovered = hoveredRegion === center.region;
              const isSelected = selectedCity === center.id;
              const shouldShowLabel = isHovered || isSelected;
              
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
                  className={`regional-center ${selectedRegion === center.region ? 'selected' : ''}`}
                  style={{
                    left: `${percentX}%`,
                    top: `${percentY}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleCenterClick(center)}
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
  );
};

export default RussiaMap; 