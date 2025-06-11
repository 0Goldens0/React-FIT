// Data for brands
export const brands = {
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

// Data for products
export const brandProducts = {
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

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing brands section");
    
    // Disable debug
    const debugDiv = document.getElementById('carousel-debug');
    if (debugDiv) {
        debugDiv.style.display = 'none';
    }
    
    function debug(message) {
        console.log(message);
        // Don't update the debug div
    }
    
    // First fix any initial class assignments
    const cards = document.querySelectorAll('.brand-card');
    if (cards.length > 0) {
        debug(`Found ${cards.length} brand cards`);
        
        // Make sure exactly one card has active class
        let activeCards = document.querySelectorAll('.brand-card.active');
        if (activeCards.length === 0) {
            debug('No active card found - setting first card as active');
            cards[0].classList.add('active');
        } else if (activeCards.length > 1) {
            debug(`Found ${activeCards.length} active cards - fixing to one active`);
            for (let i = 1; i < activeCards.length; i++) {
                activeCards[i].classList.remove('active');
            }
        }
        
        // Ensure proper initial carousel state
        let activeIndex = 0;
        const totalCards = cards.length;
        
        cards.forEach((card, index) => {
            if (card.classList.contains('active')) {
                activeIndex = index;
            }
            
            // Remove all other positioning classes to start fresh
            card.classList.remove('prev', 'next', 'far-prev', 'far-next');
        });
        
        // Set up initial positions based on active index
        const prevIndex = (activeIndex - 1 + totalCards) % totalCards;
        const nextIndex = (activeIndex + 1) % totalCards;
        const farPrevIndex = (activeIndex - 2 + totalCards) % totalCards;
        const farNextIndex = (activeIndex + 2) % totalCards;
        
        cards[prevIndex].classList.add('prev');
        cards[nextIndex].classList.add('next');
        
        if (totalCards > 4) {
            cards[farPrevIndex].classList.add('far-prev');
            cards[farNextIndex].classList.add('far-next');
        }
        
        debug(`Initial state set: active=${activeIndex}, prev=${prevIndex}, next=${nextIndex}`);
    } else {
        debug('ERROR: No brand cards found!');
    }
    
    initBrands();
    initParticles();
    createProductSlider('fit'); // Initialize with default brand
});

// Инициализация новой карусели брендов
function initBrands() {
    console.log("Инициализация новой версии блока брендов...");
    
    // Get debug function in disabled mode
    const debugDiv = document.getElementById('carousel-debug');
    if (debugDiv) {
        debugDiv.style.display = 'none';
    }
    
    function debug(message) {
        console.log(message);
        // Debug messages only in console, not in UI
    }
    
    const carouselContainer = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.brand-card');
    const dots = document.querySelectorAll('.carousel-dot');
    const btnNext = document.querySelector('.carousel-btn.next');
    const btnPrev = document.querySelector('.carousel-btn.prev');
    
    if (!carouselContainer || !cards.length) {
        debug("ОШИБКА: Не найдены элементы карусели брендов");
        return;
    }

    debug(`Карусель инициализирована: ${cards.length} карточек, ${dots?.length || 0} точек`);
    
    // Найдем активный индекс
    let activeIndex = 0;
    cards.forEach((card, index) => {
        if (card.classList.contains('active')) {
            activeIndex = index;
            debug(`Активная карточка: ${index}`);
        }
    });
    
    const totalCards = cards.length;
    
    // Обновляем карусель с учетом активного индекса
    function updateCarousel(withAnimation = true) {
        debug(`Обновление карусели, активный индекс: ${activeIndex}`);
        
        // Reset all card styles first
        cards.forEach(card => {
            card.style.transform = '';
            card.style.opacity = '0';
            card.style.zIndex = '0';
            card.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
        });
        
        // Calculate all positions
        const positions = {
            active: activeIndex,
            next: (activeIndex + 1) % totalCards,
            prev: (activeIndex - 1 + totalCards) % totalCards,
            farNext: (activeIndex + 2) % totalCards,
            farPrev: (activeIndex - 2 + totalCards) % totalCards
        };
        
        debug(`Позиции: active=${positions.active}, prev=${positions.prev}, next=${positions.next}`);
        
        // Apply classes and styles
        cards.forEach((card, index) => {
            if (index === positions.active) {
                card.classList.add('active');
                card.style.opacity = '1';
                card.style.zIndex = '5';
                
                // Find current brand ID
                Object.keys(brands).forEach(key => {
                    if (card.classList.contains('brand-' + key)) {
                        createProductSlider(key);
                        debug(`Активный бренд: ${key}`);
                    }
                });
            } 
            else if (index === positions.next) {
                card.classList.add('next');
                card.style.opacity = '0.8';
                card.style.zIndex = '4';
            } 
            else if (index === positions.prev) {
                card.classList.add('prev');
                card.style.opacity = '0.8';
                card.style.zIndex = '4';
            } 
            else if (index === positions.farNext) {
                card.classList.add('far-next');
                card.style.opacity = '0.6';
                card.style.zIndex = '3';
            } 
            else if (index === positions.farPrev) {
                card.classList.add('far-prev');
                card.style.opacity = '0.6';
                card.style.zIndex = '3';
            }
        });
        
        // Update navigation dots
        if (dots && dots.length) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }
    }
    
    // Обработчики событий для кнопок навигации
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            debug("Клик: Следующая карточка");
            activeIndex = (activeIndex + 1) % totalCards;
            updateCarousel();
        });
    }
    
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            debug("Клик: Предыдущая карточка");
            activeIndex = (activeIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        });
    }
    
    // Обработчики для точек навигации
    if (dots && dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                debug(`Клик: Точка ${index}`);
                activeIndex = index;
                updateCarousel();
            });
        });
    }
    
    // Автоматическое переключение карусели - отключим для отладки
    /*
    let autoRotateInterval = setInterval(() => {
        activeIndex = (activeIndex + 1) % totalCards;
        updateCarousel();
    }, 5000);
    
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoRotateInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            autoRotateInterval = setInterval(() => {
                activeIndex = (activeIndex + 1) % totalCards;
                updateCarousel();
            }, 5000);
        });
    }
    */
    
    // Инициализация
    updateCarousel(false); // Инициализируем без анимации
}

// Создаем слайдер продуктов для бренда
function createProductSlider(brandId) {
    const brand = brands[brandId];
    const products = brandProducts[brandId];
    const sliderContainer = document.querySelector('.product-slider-container');
    const sliderTitle = document.querySelector('.product-slider-title');
    const sliderTrack = document.querySelector('.product-slider-track');

    if (!sliderContainer || !brand || !products || !products.length || !sliderTrack) {
        console.warn(`Контейнер слайдера, данные бренда или продукты для ${brandId} не найдены!`);
        return;
    }

    // Обновляем заголовок слайдера
    if (sliderTitle) {
        sliderTitle.textContent = `Популярные товары ${brand.title}`;
    }
    
    // Обновляем содержимое слайдера
    sliderTrack.innerHTML = products.map(product => `
                        <div class="product-card-3d" data-category="${product.category}">
                            <div class="product-card-inner">
                                <div class="product-image-container">
                                    <img src="${product.image}" alt="${product.name}" class="product-image">
                                    <div class="product-image-overlay" style="background: linear-gradient(45deg, ${brand.color}33, transparent)"></div>
            </div>
                                <div class="product-info-container">
                <div class="product-category">${product.category}</div>
                <h4 class="product-name">${product.name}</h4>
                <div class="product-article">Артикул: ${product.article}</div>
                                    <div class="product-price" style="color: ${brand.color}">${product.price}</div>
                                </div>
                                <button class="product-detail-btn" style="background-color: ${brand.color}">
                                    Подробнее
                                </button>
                            </div>
                        </div>
    `).join('');
        
        // Инициализируем функциональность слайдера
    initProductSlider(brandId);
        
        // Добавляем эффекты при наведении на карточки продуктов
        const productCards = document.querySelectorAll('.product-card-3d');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.querySelector('.product-card-inner').style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.querySelector('.product-card-inner').style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
            });
        });
}

// Инициализируем функциональность слайдера продуктов
function initProductSlider(brandId) {
    const sliderTrack = document.querySelector('.product-slider-track');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    if (!sliderTrack || !prevBtn || !nextBtn) {
        console.warn("Элементы слайдера не найдены.");
        return;
    }
    
    // Удаляем классы брендов со слайдера
    const productSlider = document.querySelector('.product-slider');
    if (productSlider) {
        Object.keys(brands).forEach(key => {
            productSlider.classList.remove(key);
        });
        productSlider.classList.add(brandId);
    }
    
    let position = 0;
    const productCards = document.querySelectorAll('.product-card-3d');
    
    if (productCards.length === 0) {
        console.warn("Нет карточек продуктов.");
        return;
    }
    
    const cardWidth = productCards[0].offsetWidth + 20; // Ширина карточки + отступ
    const containerWidth = sliderTrack.parentElement.offsetWidth;
    const visibleCards = Math.floor(containerWidth / cardWidth);
    const maxPosition = Math.max(0, (productCards.length - visibleCards) * cardWidth);
    
    // Обновляем позицию слайдера
    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${position}px)`;
        
        // Обновляем состояние кнопок
        prevBtn.disabled = position <= 0;
        nextBtn.disabled = position >= maxPosition;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
    
    // Переход к предыдущему слайду
    prevBtn.addEventListener('click', () => {
        position = Math.max(0, position - cardWidth);
        updateSliderPosition();
    });
    
    // Переход к следующему слайду
    nextBtn.addEventListener('click', () => {
        position = Math.min(maxPosition, position + cardWidth);
        updateSliderPosition();
    });
    
    // Начальное обновление позиции
    position = 0; // Сбрасываем позицию при смене бренда
    updateSliderPosition();
    
    // Добавляем автоматическое прокручивание
    let autoplayInterval;
    
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            if (position >= maxPosition) {
                position = 0;
            } else {
                position += cardWidth;
            }
            updateSliderPosition();
        }, 5000); // Меняем слайд каждые 5 секунд
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Запускаем автопрокрутку
    startAutoplay();
    
    // Останавливаем автопрокрутку при наведении
    sliderTrack.addEventListener('mouseenter', stopAutoplay);
    sliderTrack.addEventListener('mouseleave', startAutoplay);
}

// Инициализация частиц для фона
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Устанавливаем размер холста равным размеру окна
    function resizeCanvas() {
        const brandsSection = document.querySelector('.brands');
        if (brandsSection) {
            const rect = brandsSection.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        } else {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    
    resizeCanvas();
    
    const particles = [];
    const particleCount = 80; // Увеличенное количество частиц
    const colors = ['#004f59', '#00acc1', '#FFB800', '#b60618', '#2e418e'];
    
    for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1;
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: size,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocity: {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5
            },
            opacity: Math.random() * 0.5 + 0.3 // Случайная непрозрачность
        });
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Движение частиц
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            
            // Обработка выхода за границы холста
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Отрисовка частицы
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
            ctx.fill();
            
            // Соединение с ближайшими частицами
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = 0.15 * (1 - distance / 100); // Более выраженная прозрачность линий
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 96, 100, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    animate();
}

// Функции-заглушки для обратной совместимости с прежним кодом
function initEnhancedBrandSelector() {
    console.log("Функция сохранена для обратной совместимости");
}

function updateBrandContent() {
    console.log("Функция сохранена для обратной совместимости");
}

function initBrandCarousel() {
    console.log("Функция сохранена для обратной совместимости");
}