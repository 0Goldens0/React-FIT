// Data for brands (Moved from js/brands.js)
const brands = {
    fit: {
        logo: "./logo/brands/FIT_logo.png",
        title: "FIT",
        year: "2003",
        color: "#004f59",
        colorDark: "#003840",
        categories: [
            "Ручной инструмент",
            "Электроинструмент",
            "Садовый инструмент",
            "Расходные материалы"
        ],
        description: "Появление торговой марки в 2003 году дало мощный импульс развитию компании и обеспечило устойчивый рост продаж. Это якорный бренд компании, в ассортименте представлены продукты различных товарных категорий ручного и электроинструмента. На рынке бренд FIT завоевал себе отличную репутацию и достиг высокой степени узнаваемости.",
        secondDescription: "FIT – это оптимальное сочетание качества и цены. Мы создаем инструменты, которые помогают профессионалам и домашним мастерам решать широкий спектр задач."
    },
    kypc: {
        logo: "./logo/brands/kurs.png",
        title: "КУРС",
        year: "2007",
        color: "#b60618",
        colorDark: "#8c0412",
        categories: [
            "Ручной инструмент",
            "Электроинструмент",
            "Расходные материалы"
        ],
        description: "Разработан для занятия ниши среднего ценового сегмента. Широкий ассортимент товара характеризуется идеальным балансом цены и качества. Эти товары ориентированы на бытовое использование, в рамках которого гарантируют своим обладателям стабильное качество и высокий ресурс.",
        secondDescription: "Выбор правильного курса — важная задача. Наш «Курс» — правильный и сбалансированный выбор!"
    },
    mos: {
        logo: "./logo/brands/mos.png",
        title: "MOS",
        year: "2017",
        color: "#18b7eb",
        colorDark: "#1295c0",
        categories: [
            "Бюджетный инструмент",
            "Расходные материалы начального уровня"
        ],
        description: "Бренд закрывает потребности бизнеса в удовлетворении спроса на продукцию в низком ценовом сегменте рынка, при этом сохраняя достойный уровень качества и полную работоспособность изделий.",
        secondDescription: "MOS - доступный инструмент для решения базовых задач. Ориентирован на пользователей, которым важна экономичность и функциональность."
    },
    xbat: {
        logo: "./logo/brands/xbat.png",
        title: "ХВАТ",
        year: "2017",
        color: "#333333",
        colorDark: "#222222",
        categories: [
            "Обжимные хомуты",
            "Специализированный крепеж"
        ],
        description: "Бренд с говорящим названием! В ассортименте 6 видов обжимных хомутов самых востребованных размеров. Узкая специализация бренда гарантирует высокое качество товаров.",
        secondDescription: "ХВАТ - специализированный бренд, который фокусируется на узком сегменте рынка и предлагает лучшие решения в своей категории."
    },
    greatflex: {
        logo: "./logo/brands/greatflex.png",
        title: "GREATFLEX",
        year: "2015",
        color: "#00A651",
        colorDark: "#008542",
        categories: [
            "Шланги и системы полива",
            "Садовые принадлежности",
            "Соединительная арматура"
        ],
        description: "GREATFLEX – это инновационные решения для вашего сада. Наши шланги и системы полива сочетают в себе высокое качество, долговечность и удобство использования. Каждый продукт проходит тщательное тестирование перед выпуском на рынок.",
        secondDescription: "Мы стремимся сделать садоводство и огородничество простым и эффективным, предлагая проверенные временем решения по разумной цене."
    },
    cutop: {
        logo: "./logo/brands/cutop.png",
        title: "CUTOP",
        year: "2015",
        color: "#2e418e",
        colorDark: "#243272",
        categories: [
            "Профессиональная оснастка",
            "Промышленная оснастка",
            "Отрезные и шлифовальные диски"
        ],
        description: "Продукция бренда — профессиональная и промышленная оснастка для электроинструментов. Команда разработчиков уделяет внимание каждому товару столько времени, сколько необходимо для того, чтобы продукт был лучшим на рынке как по цене, так и по качеству.",
        secondDescription: "Внимание к инновациям гарантирует постоянное появление новой продукции, соответствующей всем современным требованиям к качеству профессиональной оснастки."
    },
    mastercolor: {
        logo: "./logo/brands/master_color.png",
        title: "Master Color",
        year: "2017",
        color: "#005e85",
        colorDark: "#004b6a",
        categories: [
            "Малярные кисти",
            "Валики",
            "Шпатели",
            "Штукатурный инструмент"
        ],
        description: "Бренд товарной категории «малярно-штукатурный инструмент». Предлагает готовые решение для отдела МШИ за счет уникальной концепции продаж для магазинов розничной торговли любых форматов. Товары бренда Master Color позволяют увеличить прибыль магазина в сегменте МШИ.",
        secondDescription: "Master Color - это яркие краски вашего ремонта. Мы создаем инструменты, которые помогают добиться идеального результата при проведении малярных и штукатурных работ."
    }
};

// Data for products (Moved from js/brands.js)
const brandProducts = {
    fit: [
        { name: "Дрель-Шуруповерт аккумуляторная", article: "79905", image: "./img/fit/79905.png", price: "3 828.00 ₽", category: "Электроинструмент", description: "Дрель-шуруповерт аккумуляторная FIT IT предназначена для закручивания, выкручивания шурупов и винтов; сверления отверстий в древесине, металле, пластмассе.  Дрель оснащена такими функциями, как светодиодная подсветка рабочей зоны, регулировка крутящего момента, регулировка частоты вращения, блокировка шпинделя, электрический тормоз двигателя, электрический реверс. Двухскоростной планетарный редуктор дает возможность работы при повышенном или пониженном скоростном режиме. Быстрозажимной патрон дает возможность производить смену оснастки без применения дополнительных инструментов. Поставляется без АКБ и зарядного устройства. В комплект поставки входят инструмент и бита (PH2-SL5.5). " },
        { name: "Перфоратор монтажный аккумуляторный", article: "79910", image: "./img/fit/79910.png", price: "11 880.00 ₽", category: "Электроинструмент", description: "Перфоратор монтажный аккумуляторный FIT HQ оснащен бесщеточным двигателем, в связи с чем отличается большей производительностью, безопасностью и экологичностью. Поставляется без АКБ и зарядного устройства. Три режима работы (сверление / сверление с ударом / долбление) способствуют выполнению широкого спектра операций. Регулировка поворота сменного инструмента позволяет менять положение плоского зубила при проведении долбежных работ.  Электрический реверс позволяет эффективно применять инструмент при монтаже и демонтаже конструкций и извлекать сменный сверлильный инструмент из обрабатываемого материала. Горизонтальное расположение двигателя обеспечивает легкость и комфорт при выполнении длительных монтажных работ.  Регулировка частоты вращения дает возможность контроля за скоростью при выполнении работ. Светодиодная подсветка рабочей зоны повышает эффективность работы в местах с недостаточной видимостью. " },
        { name: "Шлифмашина угловая аккумуляторная", article: "79912", image: "./img/fit/79912.png", price: "6 220.00 ₽", category: "Электроинструмент", description: "Угловая шлифовальная машина аккумуляторная FIT HQ  предназначена для сухой резки, шлифовки, чистки металлических, цементных, гранитных или мраморных поверхностей, очистки металлоконструкций от коррозии и зачистки сварных швов с помощью зачистных или отрезных кругов. Оснащена бесщеточным двигателем. Плавный пуск предотвращает рывок двигателя при включении инструмента. Защита от перегрузки и перегрева способствует продлению срока службы инструмента. Регулировка оборотов позволяет плавно менять скорость вращения двигателя в зависимости от характера работы. Блокировка включения предотвращает непреднамеренный запуск инструмента. Блокировка шпинделя облегчает замену сменного инструмента. Дополнительная двухпозиционная рукоятка повышает комфорт при работе как левой, так и правой рукой. Компактный размер позволяет производить работу в труднодоступных местах. " },
        { name: "Пила дисковая циркулярная", article: "79920", image: "./img/fit/79920.png", price: "7 425.00 ₽", category: "Электроинструмент", description: "Пила циркулярная аккумуляторная FIT IT предназначена для раскроя пиломатериалов, выпиливания пазов, фальцев. Регулируемая опорная плита позволяет выполнять пропилы разной глубины под различными углами. Функция блокировки шпинделя облегчает замену дисков. Подпружиненный защитный кожух предотвращает возможный травматизм и обеспечивает защиту диска от повреждений. Блокировка включения обеспечивает защиту от непреднамеренного пуска инструмента. Наличие упорной линейки облегчает параллельный рез. Возможность подключения пылесоса способствует сохранению чистоты рабочей зоны. Резиновые вставки предотвращают проскальзывание инструмента во время работы и обеспечивают надежный хват. " }
    ],
    kypc: [
        { name: "Тачка строительная КУРС", article: "77607", image: "./img/kurs/77607.png", price: "3 590 ₽", category: "Садовый инструмент", description: "Тачка строительная КУРС РОС предназначена для перевозки строительных материалов и других грузов при проведении строительных и садовых работ. Конструкция с одним колесом обеспечивает маневренность тачки. Легко фиксируется в горизонтальном положении за счет изгибов рамы, что предотвращает высыпание материала во время загрузки. Цинковое покрытие кузова и окраска рамы предотвращают коррозию." },
        { name: "Кисть ОПТИМА", article: "00811", image: "./img/kurs/00811.png", price: "2 790 ₽", category: "Отделочный инструмент ", description: "Кисть ОПТИМА с натуральной светлой щетиной и удобной деревянной ручкой подходит для нанесения всех типов лакокрасочных материалов." },
        { name: "Гвоздодер с изолированной ручкоЙ КУРС", article: "46913", image: "./img/kurs/46913.png", price: "4 190 ₽", category: "Столярный инструмент", description: "Гвоздодер с круглым сечением КУРС предназначен для извлечения гвоздей из досок при демонтаже различных конструкций. Инструмент выполнен из качественной инструментальной стали, что обеспечивает его износостойкость и долговечность. Круглое сечение профиля способствует равномерному распределению напряжения и обеспечивает прочность инструмента. Гвоздодер удобно держать в руках, компактный размер позволяет работать в труднодоступным местах." },
        { name: "Киянка резиновая КУРС", article: "45390", image: "./img/kurs/45390.png", price: "3 290 ₽", category: "Столярный инструмент", description: "Киянки с черным резиновым бойком КУРС предназначена для проведения плиточных, кровельных и других монтажных работ. Инструмент позволяет наносить удары без риска разрушения деталей. Резиновый боек цилиндрической формы надежно прикреплен к рукоятке. Рукоятка выполнена из дерева и обладает защитой от рассыхания. Киянка хорошо гасит вибрацию, долговечна и комфортна в использовании." }
    ],
    mos: [
        { name: "КИСТЬ ФЛЕЙЦЕВАЯ MOS", article: "00701", image: "./img/mos/00701.png", price: "1 990 ₽", category: "Отделочный инструмент", description: "Кисть флейцевая серии БАЗИС с натуральной светлой щетиной предназначена для работ со всеми видами лакокрасочных материалов. Щетина отличается высокой впитываемостью и наполняемостью краской. Деревянная ручка эргономичной формы удобно лежит в руке. Отверстие в рукоятке дает возможность хранить и сушить кисть в подвешенном положении." },
        { name: "РУЛЕТКА MOS ", article: "16983", image: "./img/mos/16983.png", price: "499 ₽", category: "Измерительный инструмент", description: "Стандарт. Предназначена для выполнения замеров и нанесения разметки. Двойной стопор. Материал: стальная лента, корпус из ударопрочного ABS-пластика. Упаковка: пластиковый подвес." },
        { name: "ДИСК ОТРЕЗНОЙ АЛМАЗНЫЙ MOS", article: "37201", image: "./img/mos/37201.png", price: "690 ₽", category: "Абразивно-шлифовальный инструмент", description: "Диск отрезной алмазный MOS предназначен для высокоточного и эффективного реза твердых материалов, таких как бетон, кирпич, камень и керамика. Обеспечивает чистый и ровный рез, обладает длительным сроком службы и устойчивостью к износу. Подходит для использования с различными углошлифовальными машинами." },
        { name: "КЛЮЧ РАЗВОДНОЙ MOS", article: "70091", image: "./img/mos/70091.png", price: "890 ₽", category: "Сантехнический инструмент", description: "Ключ разводной. Полированные губки с размерной шкалой. Изготовлен из штампованной термообработанной инструментальной стали с хромированным покрытием. Упаковка: пластиковый подвес." }
    ],
    xbat: [
        { name: "РЕМЕНЬ БАГАЖНЫЙ ХВАТ", article: "77-253", image: "./img/xbat/77-253.png", price: "149 ₽", category: "Инструмент автомобильный", description: "Ремни багажные используются для крепления и фиксации грузов при автомобильных и контейнерных перевозках. Синтетическая лента надежно удерживает груз, а прочные стальные крюки и храповый механизм обеспечивают быструю установку и натяжение. Не предназначены для подъема грузов. Изготовлены из полиэстера, устойчивого к температурам от -40 до +100 °C." },
        { name: "НАБОР КРЕПЕЖА УНИВЕРСАЛЬНЫЙ ХВАТ", article: "20000", image: "./img/xbat/20000.png", price: "189 ₽", category: "Крепеж и крепежный инструмент", description: "Набор крепежа в двухстороннем органайзере 7 (175x106x46 мм): шурупы желтопассированные универсальные 3x16 мм - 20 шт, 4x16 мм - 20 шт, 4x30 мм - 10 шт, 4x40 мм - 10 шт, 5x60 мм - 10 шт; саморезы черные по гипсокартону к дереву 3.5x19 мм - 50 шт, 3.5x25 мм - 50 шт, 3.5x35 мм - 40 шт; саморезы для листовых пластин остроконечные 4.2x13 мм - 25 шт, 4.2x16 мм - 20 шт; дюбели универсальные с бортиком 6x42 мм - 8 шт, 8x52 мм - 5 шт, Driva 12x32 мм - 10 шт; органайзер двухсторонний - 1 шт"},
        { name: "АНКЕРНЫЙ БОЛТ С ПОЛНЫМ КРЮКОМ ХВАТ", article: "26654", image: "./img/xbat/26654.png", price: "590 ₽", category: "Крепёж", description: "Анкер с кольцом. Применяется для крепления тяжеловесных конструкций к полнотелому бетону, строительному камню, полнотелому кирпичу, а также к тонким бетонным перегородкам. Изготовлен из стали с оцинкованной и пассивированной поверхностью." },
        { name: "ГЕНЕРАТОР ДИЗЕЛЬНЫЙ ХВАТ", article: "KM7500DE", image: "./img/xbat/KM7500DE.png", price: "249 ₽", category: "Генератор", description: "Дизельный генератор 6500/6000 Вт, объем двигателя 499 см³, бак 13,5 л, время работы 6 ч, вес 118 кг, поставляется в коробке. Оснащен автоматической регулировкой напряжения (AVR), четырехтактным дизельным двигателем с непосредственным впрыском, электростартером и прочной стальной рамой." }
    ],
    greatflex: [
        { name: "ДИСКИ АЛМАЗНЫЕ GREATFLEX light", article: "55-771", image: "./img/gf/55-771.png", price: "1 290 ₽", category: "Абразивно-шлифовальный инструмент", description: "Диск отрезной сегментный. Универсальный, подходит для сухой и влажной резки бетона, кирпича, гранита и камня. Посадочный диаметр 22,2 мм, высота алмазных сегментов 7 мм. Материал: инструментальная сталь, алмазный порошок. Упаковка: картонный конверт." },
        { name: "ДИСКИ АЛМАЗНЫЕ GREATFLEX light", article: "55-776", image: "./img/gf/55-776.png", price: "590 ₽", category: "Абразивно-шлифовальный инструмент", description: "Диск отрезной комбинированный турбо. Универсальный, для сухой и влажной резки бетона, кирпича, гранита и камня. Усиленная конструкция. Посадочный диаметр 22,2 мм, высота алмазных сегментов 7 мм. Материал: инструментальная сталь, алмазный порошок. Упаковка: картонный конверт." },
        { name: "ПРОФЕССИОНАЛЬНЫЙ ШЛИФОВАЛЬНЫЙ АЛМАЗНЫЙ ДИСК «СЕГМЕНТИРОВАННЫЙ ТУРБО»", article: "55-781", image: "./img/gf/55-781.png", price: "290 ₽", category: "Абразивно-шлифовальный инструмент", description: "Диск шлифовальный. Предназначен для работы по бетону, камню и кирпичу. Обеспечивает высокую производительность и стабильную балансировку. Сегментированная кромка турбо усиливает охлаждение и отвод отработанного материала, предотвращая перегрев. Материал: инструментальная сталь, технические алмазы. Упаковка: картонный конверт." },
        { name: "КРУГ НАЖДАЧНЫЙ ЛЕПЕСТКОВЫЙ GREATFLEX light", article: "71-837", image: "./img/gf/71-837.png", price: "1 490 ₽", category: "Абразивно-шлифовальный инструмент", description: "Лепестковый круг для УШМ с посадочным диаметром 22,23 мм. Содержит 72 лепестка (25×15 мм) с углом наклона 10°, что увеличивает площадь контакта с обрабатываемой поверхностью. Применяется для обработки металла, дерева, пластика. Материал: инструментальная сталь, тканевая основа, абразив." }
    ],
    cutop: [
        { name: "ШУРУПОВЕРТ CUTOP e-profi", article: "01-884", image: "./img/cutop/01-884.png", price: "190 ₽", category: "Электроинструмент", description: "Аккумуляторный шуруповерт CUTOP E-PROFI предназначен для завинчивания крепежа и сверления отверстий в древесине, металле и пластмассе. Оснащен бесщеточным двигателем для высокой производительности и долговечности. Развивает крутящий момент до 52 Н·м, работает на двух скоростях (0–500 / 0–1800 об/мин), имеет функцию сверления, регулировку крутящего момента и частоты вращения. Для удобства предусмотрены светодиодная подсветка, индикатор заряда, быстрозажимной патрон (13 мм), электрический тормоз, реверс, резиновые вставки и металлическая клипса на ремень. В комплект входят инструмент и Li-Ion аккумулятор 20 В, 2,0 А·ч. Поставляется в коробке." },
        { name: "РОФЕССИОНАЛЬНЫЙ ОТРЕЗНОЙ АЛМАЗНЫЙ ДИСК CUTOP", article: "73-419", image: "./img/cutop/73-419-02 (2).png", price: "210 ₽", category: "Абразивно-шлифовальный инструмент", description: "Промышленный алмазный диск Cutop profi предназначен для сухой и влажной резки бетона, железобетона, плитки, кирпича, камня и других абразивных материалов. Применяется в швонарезчиках и бензорезах. Широкий алмазный слой обеспечивает высокую скорость реза и длительный срок службы. Сегментированная кромка высотой 10 мм выполнена из прочных технических алмазов, приваренных методом пайки. Дополнительное крепежное отверстие повышает надежность фиксации и предотвращает проскальзывание. Материал: инструментальная сталь, алмазный порошок. Упаковка: картонная коробка. Диаметр диска — 350 мм, посадка — 25,4 мм, толщина сегмента — 3,2 мм, высота — 10 мм, количество сегментов — 23." },
        { name: "КОРЩЕТКИ РУЧНЫЕ CUTOP profi", article: "82-547", image: "./img/cutop/82-547.png", price: "990 ₽", category: "Абразивно-шлифовальный инструмент", description: "Щетки ручные Cutop profi предназначены для зачистки металлических и деревянных поверхностей, удаления ржавчины, лакокрасочных покрытий и других загрязнений. Оснащены удобной ручкой из ударопрочного пластика для надежного хвата. Щетина из стальной проволоки диаметром 0,3 мм." },
        { name: "НАБОР БИТ В ПЛАСТИКОВОМ БОКСЕ CUTOP profi", article: "83-869", image: "./img/cutop/83-869.png", price: "1 590 ₽", category: "Слесарный инструмент", description: "Биты Cutop изготовлены из высококачественной тайваньской стали марки S2. Ребра формируются методом холодной штамповки по точной спецификации, шлицы проходят термическую закалку при температуре до 870 °C. Обеспечивают твердость до 60 HRC и увеличенный срок службы. Технология производства Cutop гарантирует высокую точность. Набор подходит для сборки и монтажа мебели, бытовой техники и других точных работ." }
    ],
    mastercolor: [
        { name: "КИСТЬ ФЛЕЙЦЕВАЯ Master Color 25 мм", article: "30-0011", image: "./img/mc/30-0011.png", price: "250 ₽", category: "Отделочный инструмент", description: "Светлая натуральная щетина. 55% топс. Деревянная лакированная ручка.  Дополнительная фиксация обжима на заклепки." },
        { name: "РОЛИК Master Color 180мм", article: "30-0844", image: "./img/mc/30-0844.png", price: "390 ₽", category: "Отделочный инструмент", description: "Малярный валик с ворсом средней длины для нанесения водоэмульсионных красок. Равномерное нанесение без брызг и подтеков." },
        { name: "МАЛЯРНАЯ ЛЕНТА Master Color", article: "30-6412", image: "./img/mc/30-6412.png", price: "290 ₽", category: "Отделочный инструмент", description: "Профессиональная малярная лента из рисовой бумаги Washi для наружных работ. Обеспечивает четкие и ровные границы при окрашивании. Обладает высокой адгезией, термостойкостью до 100 °C и УФ-стойкостью до 30 дней. Оснащена высококачественным акриловым клеем на водной основе. Эластичная основа и специальная формула клея позволяют легко и без следов удалять ленту после использования на улице." },
        { name: "ПРОФЕССИОНАЛЬНАЯ РАБОЧАЯ ОДЕЖДА Master Color", article: "30-8042", image: "./img/mc/30-8042.png", price: "990 ₽", category: "Отделочный инструмент", description: "Комбинезон рабочий Master Color белого цвета сшит из высококачественного материала, усиленного в местах, подверженных быстрому износу. Имеет: эластичный пояс для удобного подгона размера, 7 многофункциональных карманов и карманы для коленных защитных вставок, в т.ч. из ткани Оксфорд 300D. Защита от разрыва и истирания. Гарантией качества является наличие европейского сертификата, а также соответствие изделия требованиям стандарта EN ISO 13688:2013. Состав материала: полиэстер 65%, хлопок 35%." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const journeyContainer = document.getElementById('journeyContainer');
    const sections = document.querySelectorAll('.brand-section');
    const navDotsContainer = document.getElementById('navDots');
    const brandsSectionElement = document.getElementById('brands');

    let currentSectionIndex = 0;
    const totalSections = sections.length;
    let isWheeling = false;
    let isJourneyActiveForScroll = false;
    let isSnapAnimating = false;
    let ignoreNextIntersection = false; // Простой флаг для игнорирования следующего события пересечения

    // Глобальные переменные для состояния слайдера активного бренда
    let currentProductSlideIndexes = {}; // { brandId: index }

    if (!journeyContainer || !sections.length || !brandsSectionElement) {
        console.error("Brand Journey elements not found!");
        return;
    }

    // Создаем навигационные точки
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.index = index;
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            navigateToSection(index);
        });
        if (navDotsContainer) navDotsContainer.appendChild(dot);
    });
    const dots = navDotsContainer ? document.querySelectorAll('#navDots .dot') : [];
    
    // Initial state - hide nav dots
    if (navDotsContainer) {
        navDotsContainer.style.opacity = "0";
        navDotsContainer.style.pointerEvents = "none";
    }

    function updateActiveElements() {
        sections.forEach((section, index) => {
            const isActive = index === currentSectionIndex;
            section.classList.toggle('active', isActive);
            // Показываем/скрываем товары только для активной/неактивной секции
            const productsContainer = section.querySelector('.journey-brand-products');
            if (productsContainer) {
                productsContainer.classList.toggle('active', isActive);
            }
        });
        if (dots.length) {
            dots.forEach(dot => {
                dot.classList.toggle('active', parseInt(dot.dataset.index) === currentSectionIndex);
            });
        }
    }

    function displayJourneyBrandProducts(brandId, activeSectionElement) {
        const productsContainerEl = activeSectionElement.querySelector('.journey-brand-products');
        if (!productsContainerEl) {
            console.warn(`Products container .journey-brand-products not found in section for ${brandId}`);
            return;
        }

        const brandData = brands[brandId];
        const productsData = brandProducts[brandId];

        if (!brandData) {
            console.warn(`Brand data not found for ${brandId}`);
            productsContainerEl.innerHTML = '<p class="no-products-message">Информация о бренде не найдена.</p>';
            return;
        }

        let productsHTML = `<h3 class="journey-brand-products-title">Популярные товары ${brandData.title}</h3>`;

        if (!productsData || productsData.length === 0) {
            productsHTML += '<p class="no-products-message">Товары для этого бренда скоро появятся.</p>';
            productsContainerEl.innerHTML = productsHTML;
            return;
        }

        // Инициализируем индекс слайда для этого бренда, если его еще нет
        if (currentProductSlideIndexes[brandId] === undefined) {
            currentProductSlideIndexes[brandId] = 0;
        }
        
        const cardWidthPercent = 30; // Ширина одной карточки в процентах от вьюпорта (примерно 3 карточки)
        const cardMarginPercent = 1.5; // Отступ между карточками в процентах

        productsHTML += `
            <div class="product-slider-controls-container">
                <button class="product-slider-arrow prev" data-brand-id="${brandId}" aria-label="Предыдущий товар">&lt;</button>
                <div class="product-slider-viewport" data-brand-id="${brandId}">
                    <div class="journey-brand-products-scrollable-track" data-brand-id="${brandId}" style="transform: translateX(0%);">
                        ${productsData.map(product => {
                            const formattedPrice = product.price.replace(/\s/g, '').replace(/₽/, '');
                            const brandColor = brandData.color || '#333333';
                            return `
                                <div class="journey-product-card product-card-slider-item" 
                                     style="flex: 0 0 ${cardWidthPercent}%; margin-left: ${cardMarginPercent}%; margin-right: ${cardMarginPercent}%;"
                                     data-category="${product.category}">
                                    <div class="product-card-inner">
                                        <div class="journey-product-card-image-container">
                                            <img src="${product.image}" alt="${product.name}">
                                        </div>
                                        <div class="product-info-container">
                                            <span class="product-category">${product.category}</span>
                                            <h4 class="product-name">${product.name}</h4>
                                            <span class="product-article">Артикул: ${product.article}</span>
                                            <div class="product-price">${formattedPrice}</div>
                                            <button class="product-detail-btn" style="background-color: ${brandColor};">Подробнее</button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <button class="product-slider-arrow next" data-brand-id="${brandId}" aria-label="Следующий товар">&gt;</button>
            </div>
        `;
        productsContainerEl.innerHTML = productsHTML;
        
        // После добавления HTML, устанавливаем начальную позицию слайдера и добавляем обработчики
        updateProductSliderPosition(brandId);
        setupProductSliderControls(brandId, productsData.length);
    }

    function setupProductSliderControls(brandId, totalSlides) {
        const prevButton = document.querySelector(`.product-slider-arrow.prev[data-brand-id="${brandId}"]`);
        const nextButton = document.querySelector(`.product-slider-arrow.next[data-brand-id="${brandId}"]`);
        
        const cardsPerView = Math.floor(100 / (30 + 2 * 1.5)); // Примерный расчет, как в cardWidthPercent + cardMarginPercent

        if (prevButton) {
            prevButton.onclick = () => {
                if (currentProductSlideIndexes[brandId] > 0) {
                    currentProductSlideIndexes[brandId]--;
                    updateProductSliderPosition(brandId);
                }
            };
        }
        if (nextButton) {
            nextButton.onclick = () => {
                // Логика для определения максимального индекса, чтобы не прокручивать пустые слайды
                // Это упрощенный вариант, который может не показывать последнюю карточку целиком, если их не кратно cardsPerView
                const maxIndex = Math.max(0, totalSlides - cardsPerView); 
                if (currentProductSlideIndexes[brandId] < maxIndex) {
                    currentProductSlideIndexes[brandId]++;
                    updateProductSliderPosition(brandId);
                }
            };
        }
        updateSliderArrowVisibility(brandId, totalSlides);
    }

    function updateProductSliderPosition(brandId) {
        const track = document.querySelector(`.journey-brand-products-scrollable-track[data-brand-id="${brandId}"]`);
        if (track) {
            // Сдвигаем на ширину одной карточки (cardWidthPercent + 2*cardMarginPercent)
            const slideOffset = 30 + 2 * 1.5; // Синхронизировать с cardWidthPercent и cardMarginPercent
            track.style.transform = `translateX(-${currentProductSlideIndexes[brandId] * slideOffset}%)`;
        }
        updateSliderArrowVisibility(brandId, brandProducts[brandId] ? brandProducts[brandId].length : 0);
    }

    function updateSliderArrowVisibility(brandId, totalSlides) {
        const prevButton = document.querySelector(`.product-slider-arrow.prev[data-brand-id="${brandId}"]`);
        const nextButton = document.querySelector(`.product-slider-arrow.next[data-brand-id="${brandId}"]`);
        const cardsPerView = Math.floor(100 / (30 + 2 * 1.5));


        if (!prevButton || !nextButton) return;

        prevButton.disabled = currentProductSlideIndexes[brandId] === 0;
        
        const maxIndex = Math.max(0, totalSlides - cardsPerView);
        nextButton.disabled = currentProductSlideIndexes[brandId] >= maxIndex || totalSlides <= cardsPerView;

        prevButton.style.opacity = prevButton.disabled ? "0.5" : "1";
        nextButton.style.opacity = nextButton.disabled ? "0.5" : "1";
    }

    function navigateToSection(index) {
        if (index < 0 || index >= totalSections || isSnapAnimating) return;
        
        // Clear products from the previously active section before transition
        if (sections[currentSectionIndex]) {
            const oldProductsTrack = sections[currentSectionIndex].querySelector('.journey-brand-products-scrollable-track');
            const oldProductsTitle = sections[currentSectionIndex].querySelector('.journey-brand-products-title');
            if (oldProductsTrack) oldProductsTrack.innerHTML = '';
            if (oldProductsTitle) oldProductsTitle.textContent = '';
        }

        currentSectionIndex = index;
        journeyContainer.style.transform = `translateX(-${currentSectionIndex * 100}vw)`;
        updateActiveElements();

        const activeSection = sections[currentSectionIndex];
        const brandId = activeSection.id;
        // Display products for the new active section after a short delay for transition
        setTimeout(() => {
            displayJourneyBrandProducts(brandId, activeSection);
        }, 400); // Delay should be less than journey transition (0.8s)
    }
    
    // Инициализация первой секции
    navigateToSection(0);

    // Function to toggle navigation dots visibility
    function updateNavDotsVisibility(isVisible) {
        if (!navDotsContainer) return;
        
        if (isVisible) {
            navDotsContainer.style.opacity = "1";
            navDotsContainer.style.pointerEvents = "auto";
        } else {
            navDotsContainer.style.opacity = "0";
            navDotsContainer.style.pointerEvents = "none";
        }
    }

    // Создаем observer, но не запускаем его сразу
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio > 0.7) {
                    if (!isJourneyActiveForScroll && !isSnapAnimating) {
                        brandsSectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        isSnapAnimating = true;
                        setTimeout(() => {
                            isJourneyActiveForScroll = true;
                            document.body.style.overflowY = 'hidden';
                            updateNavDotsVisibility(true);
                            navigateToSection(currentSectionIndex);
                            isSnapAnimating = false;
                        }, 700);
                    }
                }
            } else {
                if (document.body.style.overflowY === 'hidden') {
                    document.body.style.overflowY = 'auto';
                }
                if (isJourneyActiveForScroll) {
                    isJourneyActiveForScroll = false;
                }
                updateNavDotsVisibility(false);
            }
        });
    }, {
        threshold: [0, 0.3, 0.7, 1.0]
    });

    // Функции для управления observer
    function enableBrandObserver() {
        observer.observe(brandsSectionElement);
    }
    
    function disableBrandObserver() {
        observer.disconnect();
    }
    
    // Запускаем наблюдение после загрузки страницы
    enableBrandObserver();

    // Обработчик для ВСЕХ якорных ссылок и навигационных элементов
    document.addEventListener('click', function(event) {
        // Находим ближайший элемент-ссылку
        let targetLink = event.target.closest('a[href^="#"]');
        
        if (targetLink) {
            const href = targetLink.getAttribute('href');
            
            // Если ссылка не ведет на секцию брендов
            if (href !== '#brands') {
                // 1. Отключаем observer
                disableBrandObserver();
                
                // 2. Деактивируем режим брендов, если он активен
                if (isJourneyActiveForScroll) {
                    isJourneyActiveForScroll = false;
                    document.body.style.overflowY = 'auto';
                    updateNavDotsVisibility(false);
                }
                
                // 3. Через некоторое время снова включаем observer
                setTimeout(() => {
                    enableBrandObserver();
                }, 1500); // Достаточно времени для завершения перехода
            }
        }
    });

    // Wheel Navigation - обработка скролла колесиком мыши
    window.addEventListener('wheel', (event) => {
        if (!isJourneyActiveForScroll && !isSnapAnimating) {
            return;
        }
        
        if (isSnapAnimating && !isJourneyActiveForScroll) {
            event.preventDefault();
            return;
        }

        if (isJourneyActiveForScroll) {
            event.preventDefault();
        }
        
        if (isWheeling) return;

        const delta = event.deltaY;

        if (delta > 0) { // Скролл вниз
            if (currentSectionIndex < totalSections - 1) {
                isWheeling = true;
                navigateToSection(currentSectionIndex + 1);
                setTimeout(() => { isWheeling = false; }, 850);
            } else if (isJourneyActiveForScroll) {
                isJourneyActiveForScroll = false;
                updateNavDotsVisibility(false);

                const sectionsArray = Array.from(document.querySelectorAll('body > section'));
                const currentIndexInPage = sectionsArray.indexOf(brandsSectionElement);
                
                if (currentIndexInPage !== -1 && currentIndexInPage < sectionsArray.length - 1) {
                    const nextSection = sectionsArray[currentIndexInPage + 1];
                    isSnapAnimating = true;
                    
                    // Отключаем observer перед переходом
                    disableBrandObserver();
                    
                    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    setTimeout(() => { 
                        isSnapAnimating = false; 
                        document.body.style.overflowY = 'auto';
                        
                        // Включаем observer снова после перехода
                        setTimeout(() => {
                            enableBrandObserver();
                        }, 500);
                    }, 1000); 
                } else {
                    document.body.style.overflowY = 'auto';
                }
            }
        } else { // Скролл вверх
            if (currentSectionIndex > 0) {
                isWheeling = true;
                navigateToSection(currentSectionIndex - 1);
                setTimeout(() => { isWheeling = false; }, 850);
            } else if (isJourneyActiveForScroll) {
                isJourneyActiveForScroll = false;
                updateNavDotsVisibility(false);

                const sectionsArray = Array.from(document.querySelectorAll('body > section'));
                const currentIndexInPage = sectionsArray.indexOf(brandsSectionElement);

                if (currentIndexInPage > 0) {
                    const prevSection = sectionsArray[currentIndexInPage - 1];
                    isSnapAnimating = true;
                    
                    // Отключаем observer перед переходом
                    disableBrandObserver();
                    
                    prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    setTimeout(() => { 
                        isSnapAnimating = false; 
                        document.body.style.overflowY = 'auto';
                        
                        // Включаем observer снова после перехода
                        setTimeout(() => {
                            enableBrandObserver();
                        }, 500);
                    }, 1000);
                } else {
                    document.body.style.overflowY = 'auto';
                }
            }
        }
    }, { passive: false });

    // Клавиатурная навигация
    window.addEventListener('keydown', (event) => {
        if (!isJourneyActiveForScroll) return;
        
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            if (currentSectionIndex < totalSections - 1) {
                navigateToSection(currentSectionIndex + 1);
            }
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            if (currentSectionIndex > 0) {
                navigateToSection(currentSectionIndex - 1);
            }
        }
    });

    // Touch navigation для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Минимальное расстояние для свайпа

    journeyContainer.addEventListener('touchstart', (event) => {
        if (!isJourneyActiveForScroll) return;
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    journeyContainer.addEventListener('touchmove', (event) => {
        if (!isJourneyActiveForScroll) return;
        // Если активно скроллим journey, блокируем вертикальный скролл страницы при горизонтальном свайпе
        const currentX = event.changedTouches[0].screenX;
        if (Math.abs(currentX - touchStartX) > 10) { // Если горизонтальное движение значительное
            event.preventDefault();
        }
    }, { passive: false });

    journeyContainer.addEventListener('touchend', (event) => {
        if (!isJourneyActiveForScroll) return;
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) < swipeThreshold) return; 

        if (swipeDistance < 0) { // Свайп влево (следующий)
            if (currentSectionIndex < totalSections - 1) {
                navigateToSection(currentSectionIndex + 1);
            }
        } else { // Свайп вправо (предыдущий)
            if (currentSectionIndex > 0) {
                navigateToSection(currentSectionIndex - 1);
            }
        }
    }

    // Также перехватываем события прокрутки, которые могут быть вызваны другими скриптами
    let lastScrollTime = 0;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        // Если скорость прокрутки высокая (меньше 100мс между событиями),
        // это может быть программная прокрутка
        if (now - lastScrollTime < 100) {
            isProgrammaticScroll = true;
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                isProgrammaticScroll = false;
            }, 1000); // Возвращаем нормальный режим через 1 секунду
        }
        lastScrollTime = now;
    }, { passive: true });
});

// Функция для инициализации brand journey из lazy loader
function initBrandJourney() {
    console.log('🎨 Initializing Brand Journey from Lazy Loader...');
    
    // Проверяем, что элементы существуют
    const journeyContainer = document.getElementById('journeyContainer');
    const sections = document.querySelectorAll('.brand-section');
    const brandsSectionElement = document.getElementById('brands');

    if (!journeyContainer || !sections.length || !brandsSectionElement) {
        console.error("Brand Journey elements not found!");
        return;
    }

    console.log('✅ Brand Journey initialized successfully via lazy loading');
}

// Экспорт для использования в lazy loader
if (typeof window !== 'undefined') {
    window.initBrandJourney = initBrandJourney;
} 