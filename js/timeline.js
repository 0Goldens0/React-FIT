// Data for timeline items (used in fullscreen view)
const timelineData = {
    '1996': {
        year: '1996',
        title: 'Основание компании',
        subtitle: 'Начало истории',
        description: 'Компания Finch Industrial Tools основана тремя учредителями: А.М. Кадисом, А.Е. Власовым и С.В. Моховиком. Начальный ассортимент формировался из столярно-слесарных инструментов нескольких голландских торговых марок. Первые шаги в мире профессионального инструмента с прицелом на качество и надежность.',
        image: './img/history/1996.jpg',
        facts: [
            { number: '3', text: 'Основателя компании' },
            { number: '100+', text: 'Наименований в ассортименте' },
            { number: '1', text: 'Первый офис в СПб' },
            { number: '5', text: 'Сотрудников в команде' }
        ]
    },
    '1999': {
        year: '1999',
        title: 'Выход на рынок строительного инструмента',
        subtitle: 'Первые успехи',
        description: 'Приход первых менеджеров по продажам в Санкт-Петербурге стал настоящим стартом полноценного захода на рынок. Началось сотрудничество с голландскими (Veto) и польскими (Toya) брендами. Первые крупные клиенты: ГК Метизы (ООО Терскол), Домовой (УК Старт), Агроторг (Пятерочка), сеть "Мастеровой".',
        image: './img/history/1999.jpg',
        facts: [
            { number: '2', text: 'Европейских бренда' },
            { number: '10+', text: 'Первых клиентов' },
            { number: '15', text: 'Сотрудников' },
            { number: '500+', text: 'Позиций товаров' }
        ]
    },
    '2002': {
        year: '2002',
        title: 'Регистрация торговой марки FIT в Канаде',
        subtitle: 'Международное признание',
        description: 'Международная регистрация бренда FIT в Канаде стала необходимостью в условиях жесткой конкуренции с зарубежными брендами. В то время успешный бренд обязательно должен был быть зарубежным. Стартовый ассортимент FIT включал несколько сотен позиций ручного инструмента (молотки, отвертки, ножовки, ШГИ) и крепежа.',
        image: './img/history/2002.jpg',
        facts: [
            { number: '1', text: 'Международная регистрация' },
            { number: '300+', text: 'Позиций под брендом FIT' },
            { number: '4', text: 'Товарные группы' },
            { number: '25', text: 'Сотрудников' }
        ]
    },
    '2003': {
        year: '2003',
        title: 'Появление торговой марки FIT',
        subtitle: 'Собственный бренд',
        description: 'В продаже появились первые инструменты под брендом FIT. Началось сотрудничество с китайскими производителями. Открытие филиальных структур в Санкт-Петербурге, Москве и Краснодаре для оптимизации логистики и улучшения сервиса для клиентов.',
        image: './img/history/2003.jpg',
        facts: [
            { number: '3', text: 'Филиальные структуры' },
            { number: '500+', text: 'SKU под брендом FIT' },
            { number: '2', text: 'Страны поставщиков' },
            { number: '40', text: 'Сотрудников' }
        ]
    },
    '2006': {
        year: '2006',
        title: 'Расширение филиальной сети',
        subtitle: 'Региональное развитие',
        description: 'Открытие новых филиалов в городах-миллионниках: Екатеринбург, Казань, Воронеж, Пятигорск. Выбор городов основывался на наличии клиентов и понимании необходимости улучшения сервиса. Рост продаж в 3-4 раза в первые годы после открытия региональных офисов с упором на качество бизнеса.',
        image: './img/history/2006.jpg',
        facts: [
            { number: '4', text: 'Новых города' },
            { number: 'X4', text: 'Рост продаж' },
            { number: '100+', text: 'Новых сотрудников' },
            { number: '1000+', text: 'Активных клиентов' }
        ]
    },
    '2007': {
        year: '2007',
        title: 'Запуск торговой марки КУРС',
        subtitle: 'Российский бренд',
        description: 'Создание российского бренда с русским названием для среднего ценового сегмента. Концепция КУРС: идеальный баланс цены и качества, только наиболее ходовые позиции, более узкий ассортимент, но более доступные цены. Бренд удовлетворил потребность рынка в "русских" товарах.',
        image: './img/history/2007.jpg',
        facts: [
            { number: '1', text: 'Российский бренд КУРС' },
            { number: '200+', text: 'Ходовых позиций' },
            { number: '100%', text: 'Русское название' },
            { number: '30%', text: 'Снижение цен' }
        ]
    },
    '2009': {
        year: '2009',
        title: 'Развитие региональных филиалов',
        subtitle: 'Послекризисная перезагрузка',
        description: 'После кризиса 2008 года принято решение о перезагрузке и активном открытии складов в регионах. Причина: конкуренция с "Мир Инструмента" и "Мастернет", которые имели региональные склады с огромным временным преимуществом. Создание торговых марок CUTOP и FDW для специализированных сегментов.',
        image: './img/history/2009.jpg',
        facts: [
            { number: '2008', text: 'Год кризиса' },
            { number: '2', text: 'Новых бренда' },
            { number: '5+', text: 'Региональных складов' },
            { number: '50%', text: 'Ускорение доставки' }
        ]
    },
    '2012': {
        year: '2012',
        title: 'Запуск первого интернет-сайта',
        subtitle: 'Цифровое развитие',
        description: 'Запуск сайта fit-zakaz для приема заказов от клиентов стал важным шагом в цифровизации бизнес-процессов. Начало развития электронных продаж и современных технологий обслуживания клиентов. Создание основы для будущего развития интернет-торговли.',
        image: './img/history/2012.jpg',
        facts: [
            { number: '1', text: 'Первый сайт fit-zakaz' },
            { number: '24/7', text: 'Круглосуточный прием заказов' },
            { number: '100%', text: 'Автоматизация заказов' },
            { number: '2000+', text: 'SKU в ассортименте' }
        ]
    },
    '2013': {
        year: '2013',
        title: 'Выход на рынок Казахстана',
        subtitle: 'Международная экспансия',
        description: 'Открытие представительства в Казахстане стало первым шагом в международной экспансии компании на рынки стран СНГ. Успешное освоение нового географического рынка продемонстрировало готовность компании к международному развитию.',
        image: './img/history/2013.jpg',
        facts: [
            { number: '1', text: 'Страна СНГ' },
            { number: '2013', text: 'Год выхода в Казахстан' },
            { number: '100+', text: 'Новых клиентов' },
            { number: '5000+', text: 'SKU для экспорта' }
        ]
    },
    '2014': {
        year: '2014',
        title: 'Сайт-визитка компании',
        subtitle: 'Представительство в интернете',
        description: 'Запуск сайта instrument-fit.ru - полноценной визитной карточки для ознакомления с ассортиментом, историей компании и позиционированием на рынке. Сайт стал важным инструментом для презентации компании партнерам и клиентам.',
        image: './img/history/2014.jpg',
        facts: [
            { number: '1', text: 'Сайт-визитка' },
            { number: '100%', text: 'Ассортимент онлайн' },
            { number: '1000+', text: 'Посетителей в день' },
            { number: '8000+', text: 'SKU в каталоге' }
        ]
    },
    '2015': {
        year: '2015',
        title: 'Ассортимент 2000 SKU',
        subtitle: 'Диверсификация продуктов',
        description: 'Товарная матрица компании превысила две тысячи позиций. Диверсификация ассортимента включила добавление малярного и измерительного инструмента. Наибольший рост показала оснастка для электроинструмента. Стратегии расширения: диверсификация по товарным группам и увеличение ширины востребованных категорий.',
        image: './img/history/2015.jpg',
        facts: [
            { number: '2000', text: 'SKU в ассортименте' },
            { number: '8', text: 'Товарных групп' },
            { number: '50%', text: 'Рост оснастки' },
            { number: '10000+', text: 'Активных клиентов' }
        ]
    },
    '2016': {
        year: '2016',
        title: 'Новые торговые марки',
        subtitle: 'Специализированные бренды',
        description: 'Запуск специализированных брендов в рамках диверсификации бизнеса: MOS (товар первой цены для ценовой борьбы), ХВАТ (крепеж), Master Color (комплексное предложение МШИ для профессионалов), Max Pro (качественный эргономичный электроинструмент). Понимание необходимости специализированных брендов для конкретных задач.',
        image: './img/history/2016.jpg',
        facts: [
            { number: '4', text: 'Новых бренда' },
            { number: '100%', text: 'Розничные продажи' },
            { number: '3000+', text: 'Новых позиций' },
            { number: '5', text: 'Этапов разработки брендов' }
        ]
    },
    '2017': {
        year: '2017',
        title: 'Ассортимент 8000 SKU',
        subtitle: 'Технологическое управление',
        description: 'Расширение товарной матрицы до 8000 позиций благодаря мониторингу ассортимента конкурентов, реагированию на потребности рынка и запросы клиентов. Использование современных технологий автоматизации процессов управления товарными запасами для эффективной работы с такой обширной матрицей.',
        image: './img/history/2017.jpg',
        facts: [
            { number: '8000', text: 'SKU в матрице' },
            { number: '100%', text: 'Автоматизация запасов' },
            { number: '15', text: 'Товарных категорий' },
            { number: '15000+', text: 'Активных клиентов' }
        ]
    },
    '2019': {
        year: '2019',
        title: 'Внедрение WMS и модернизация сайта',
        subtitle: 'Технологический прорыв',
        description: 'Запуск автоматизированной системы управления складом (WMS) кардинально повысил эффективность работы. Модернизация сайта на прогрессивной системе - запуск fit24.ru, который используется по сей день. Создание приложения для планшетов для удобства заказов клиентов.',
        image: './img/history/2019.jpg',
        facts: [
            { number: '1', text: 'Система WMS' },
            { number: '100%', text: 'Автоматизация склада' },
            { number: '1', text: 'Новый сайт fit24.ru' },
            { number: '1', text: 'Мобильное приложение' }
        ]
    },
    '2020': {
        year: '2020',
        title: 'Логистический центр СПб и маркетплейсы',
        subtitle: 'Адаптация к новым реалиям',
        description: 'Открытие нового распределительного центра в Санкт-Петербурге значительно улучшило логистику. Серьезный заход на маркетплейсы в карантинный период стал качественным и количественным скачком как в продажах, так и в визуализации всех продуктов. Полная перестройка понимания рынка.',
        image: './img/history/2020.jpg',
        facts: [
            { number: '1', text: 'Центр в СПб' },
            { number: '2020', text: 'Карантинный год' },
            { number: '5+', text: 'Маркетплейсов' },
            { number: '200%', text: 'Рост онлайн-продаж' }
        ]
    },
    '2021': {
        year: '2021',
        title: '14000 уникальных покупателей',
        subtitle: 'Рекордные показатели',
        description: 'Количество активных клиентов превысило 14000 уникальных покупателей. Это стало возможным благодаря развитию программ лояльности и внедрению эффективных каналов привлечения новых клиентов. Результат многолетней работы над качеством сервиса и продукции.',
        image: './img/history/2021.jpg',
        facts: [
            { number: '14000', text: 'Уникальных покупателей' },
            { number: '100%', text: 'Программы лояльности' },
            { number: '10+', text: 'Каналов привлечения' },
            { number: '12000', text: 'SKU в ассортименте' }
        ]
    },
    '2022': {
        year: '2022',
        title: 'Федеральный центр в Москве',
        subtitle: 'Логистическое усиление',
        description: 'Запуск федерального распределительного центра в Москве кардинально усилил логистическую систему компании. Внедрение современных технологий в новом центре. Открытие представительства в Беларуси как продолжение международной экспансии в страны СНГ.',
        image: './img/history/2022.jpg',
        facts: [
            { number: '1', text: 'Федеральный центр' },
            { number: '25000', text: 'м² площади' },
            { number: '1', text: 'Представительство в Беларуси' },
            { number: '20000+', text: 'Активных клиентов' }
        ]
    },
    '2023': {
        year: '2023',
        title: 'Ассортимент 12000 SKU',
        subtitle: 'Живой ассортимент',
        description: 'Товарная матрица компании достигла 12000 позиций. Концепция "живого" ассортимента с постоянным обновлением - одни позиции "отмирают", другие добавляются в непрерывном процессе. Наибольший рост по-прежнему показывает оснастка для электроинструмента.',
        image: './img/history/2023.jpg',
        facts: [
            { number: '12000', text: 'SKU в матрице' },
            { number: '100%', text: 'Живое обновление' },
            { number: '40%', text: 'Доля оснастки' },
            { number: '25000+', text: 'Активных клиентов' }
        ]
    },
    '2024': {
        year: '2024',
        title: 'Второй офис в Москве',
        subtitle: 'Равномерное покрытие',
        description: 'Открытие второго офиса продаж в Москве для улучшения обслуживания южной части города и области закрывает важную задачу равномерного сервиса. Запуск нового склада с инновационными решениями. Обеспечение одинаково классного сервиса и уровня обслуживания для всех клиентов.',
        image: './img/history/2024.jpg',
        facts: [
            { number: '2', text: 'Офиса в Москве' },
            { number: '100%', text: 'Покрытие Москвы' },
            { number: '1', text: 'Новый склад' },
            { number: '30000+', text: 'м² складов' }
        ]
    },
    '2025': {
        year: '2025',
        title: 'Стратегические планы',
        subtitle: 'Будущее компании',
        description: 'Ключевые направления развития: качество работы, клиентский сервис, скорость и удобство во всех их пониманиях. Подготовка к освоению зарубежных рынков с мощной работой над брендом. Автоматизация процессов с применением ИИ. Расширение в новые регионы России: Донецк, Луганск и другие перспективные территории.',
        image: './img/history/2025.jpg',
        facts: [
            { number: '100%', text: 'Качество сервиса' },
            { number: '5+', text: 'Зарубежных рынков' },
            { number: '1', text: 'ИИ в процессах' },
            { number: '10+', text: 'Новых регионов' }
        ]
    }
};


// Initialize timeline scrolling, dragging, and controls
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineTrack = document.querySelector('.timeline-track');
    const timelinePrev = document.getElementById('timelinePrev');
    const timelineNext = document.getElementById('timelineNext');
    const timelineAutoToggle = document.getElementById('timelineAutoToggle');

    if (!timelineContainer || !timelineTrack) {
        console.warn("Основные элементы таймлайна не найдены. Инициализация прервана.");
        return;
    }
    
    // Проверка наличия кнопок управления
    if (!timelinePrev || !timelineNext || !timelineAutoToggle) {
        console.warn("Кнопки управления таймлайном не найдены. Некоторые функции могут не работать.");
    }
    
    console.log("Инициализация таймлайна...");

    let originalItems = Array.from(timelineTrack.querySelectorAll('.timeline-item:not(.clone)'));
    let itemCount = originalItems.length;
    
    if (itemCount === 0) {
        console.error("Не найдены элементы таймлайна. Таймлайн не будет работать.");
        return;
    }
    
    console.log(`Найдено ${itemCount} элементов таймлайна.`);
    
    let itemWidth = 450; // Default width including margin (350 + 100)
    let clonesCount = 0; // Number of clones needed on each side
    
    // --- State Variables ---
    let scrollPosition = 0;
    let isAutoScrolling = false; // Manage auto-scroll state
    let animationSpeed = 5; // Пикселей за кадр - максимальная скорость движения ленты
    let animationFrameId = null;
    let isDragging = false;
    let startX;
    let currentTranslate;
    
    // Function to calculate item width dynamically (more robust)
    function calculateItemWidth() {
        if (originalItems.length > 0) {
            const firstItem = originalItems[0];
            const style = window.getComputedStyle(firstItem);
            const width = firstItem.offsetWidth;
            const marginRight = parseFloat(style.marginRight) || 0; // Добавляем проверку на NaN
            itemWidth = width + marginRight;
            console.log(`Рассчитанная ширина элемента таймлайна (с учетом margin): ${itemWidth}px`);
        } else {
             console.warn("Оригинальные элементы таймлайна не найдены для расчета ширины.");
        }
    }

    // Function to setup clones for infinite scroll effect
    function setupInfiniteScroll() {
        // Clear existing dynamically added clones
        timelineTrack.querySelectorAll('.clone.dynamic').forEach(clone => clone.remove());

        originalItems = Array.from(timelineTrack.querySelectorAll('.timeline-item:not(.clone)')); // Re-fetch originals
        itemCount = originalItems.length;

        if (itemCount === 0) return; // Exit if no items

        calculateItemWidth(); // Calculate width based on actual items

        // Determine how many clones are needed based on container width
        const containerWidth = timelineContainer.offsetWidth;
        clonesCount = Math.ceil(containerWidth / itemWidth) * 2; // Добавляем больше клонов для плавного движения

        // Clone items for the end
        for (let i = 0; i < clonesCount && i < itemCount; i++) {
            const clone = originalItems[i % itemCount].cloneNode(true);
            clone.classList.add('clone', 'dynamic', 'clone-end');
            timelineTrack.appendChild(clone);
        }

        // Clone items for the beginning
        for (let i = 0; i < clonesCount && i < itemCount; i++) {
            const clone = originalItems[(itemCount - 1 - i) % itemCount].cloneNode(true);
            clone.classList.add('clone', 'dynamic', 'clone-start');
            timelineTrack.insertBefore(clone, timelineTrack.firstChild);
        }

        // Set initial position to show the start of original items
        scrollPosition = -(clonesCount * itemWidth);
        timelineTrack.style.transition = 'none'; // No transition for initial setup
        timelineTrack.style.transform = `translateX(${scrollPosition}px)`;
        void timelineTrack.offsetWidth; // Force reflow
        
        console.log("Клоны таймлайна настроены для бесконечной прокрутки");
    }
    
    // --- Continuous Animation with requestAnimationFrame ---
    function animate() {
        // Двигаем таймлайн на небольшое расстояние в каждом кадре
        scrollPosition -= animationSpeed;
        timelineTrack.style.transform = `translateX(${scrollPosition}px)`;
        
        // Проверяем, не нужно ли переместиться в начало
        checkWrapAround();
        
        // Продолжаем анимацию, если она активна
        if (isAutoScrolling) {
            animationFrameId = requestAnimationFrame(animate);
        }
    }
    
    // --- Auto Scroll ---
    function startAutoScroll(force = false) {
        if (isAutoScrolling && !force) return;
        
        // Останавливаем предыдущую анимацию, если она была
        stopAutoScroll(true);
        
        isAutoScrolling = true;
        
        if (timelineAutoToggle) {
            timelineAutoToggle.classList.remove('paused');
            timelineAutoToggle.textContent = '⏸'; // Unicode pause symbol instead of FontAwesome
        }

        // Запускаем постоянную плавную анимацию
        animationFrameId = requestAnimationFrame(animate);
        
        console.log("Запущена плавная прокрутка таймлайна");
    }

    function stopAutoScroll(suppressUI = false) {
        if (!isAutoScrolling) return;
        
        isAutoScrolling = false;
        
        // Отменяем текущий анимационный фрейм
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        
        if (!suppressUI && timelineAutoToggle) {
            timelineAutoToggle.classList.add('paused');
            timelineAutoToggle.textContent = '▶'; // Unicode play symbol instead of FontAwesome
            console.log("Плавная прокрутка таймлайна остановлена");
        }
    }

    // Обработчик кнопки автопрокрутки
    if (timelineAutoToggle) {
        timelineAutoToggle.textContent = '⏸'; // By default show pause symbol
        
        timelineAutoToggle.addEventListener('click', () => {
            if (isAutoScrolling) {
                stopAutoScroll();
            } else {
                startAutoScroll();
            }
        });
    }

    // --- Manual Navigation ---
    function moveTimeline(direction, isAuto = false) { // direction: -1 for next, 1 for prev
        if (direction !== -1 && direction !== 1) {
            console.error(`Неверное направление для движения таймлайна: ${direction}`);
            return;
        }
        
        // На клик по кнопке останавливаем автопрокрутку, но не при автоматическом движении
        if (!isDragging && !isAuto) {
            stopAutoScroll();
        }

        // Перемещаемся на один элемент
        scrollPosition += direction * itemWidth;
        
        if (!isAuto) {
            console.log(`Ручное движение таймлайна: ${direction > 0 ? 'назад' : 'вперед'}, новая позиция: ${scrollPosition}px`);
        }

        // Плавная анимация при ручном перемещении
        timelineTrack.style.transition = 'transform 0.5s ease-out';
        timelineTrack.style.transform = `translateX(${scrollPosition}px)`;

        // Check boundaries for infinite loop reset
        checkWrapAround();
    }

    // Обработчики кнопок вперед/назад
    if (timelinePrev) {
        timelinePrev.addEventListener('click', () => moveTimeline(1));
    }
    
    if (timelineNext) {
        timelineNext.addEventListener('click', () => moveTimeline(-1));
    }

    // --- Wrap Around Logic ---
    function checkWrapAround() {
        const totalOriginalWidth = itemCount * itemWidth;
        const minTranslate = -((itemCount + clonesCount) * itemWidth); // Position after the last original item
        const maxTranslate = -(clonesCount * itemWidth); // Position of the first original item
        
        // Если мы прокрутили элемент целиком за пределы видимости, сбрасываем позицию
        if (scrollPosition < minTranslate) {
            // Перенос на начало (к первым элементам)
            scrollPosition += totalOriginalWidth;
            timelineTrack.style.transition = 'none';
            timelineTrack.style.transform = `translateX(${scrollPosition}px)`;
            void timelineTrack.offsetWidth; // Force reflow
        } else if (scrollPosition > maxTranslate) {
            // Перенос в конец (к последним элементам)
            scrollPosition -= totalOriginalWidth;
            timelineTrack.style.transition = 'none';
            timelineTrack.style.transform = `translateX(${scrollPosition}px)`;
            void timelineTrack.offsetWidth; // Force reflow
        }
    }

    // --- Dragging / Swiping ---
    function dragStart(e) {
        stopAutoScroll();
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        currentTranslate = scrollPosition;
        timelineTrack.style.transition = 'none'; // Disable transition during drag
        timelineContainer.style.cursor = 'grabbing';
    }

    function dragMove(e) {
        if (!isDragging) return;
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        
        if (Math.abs(diff) > 5) { // Only prevent default if we're actually dragging
            e.preventDefault(); // Prevent page scroll on touch devices
        }
        
        scrollPosition = currentTranslate + diff;
        timelineTrack.style.transform = `translateX(${scrollPosition}px)`;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        timelineContainer.style.cursor = 'grab';
        
        // При завершении перетаскивания проверяем границы
        checkWrapAround();
        
        // Перезапускаем автопрокрутку через 2 секунды после завершения ручного скролла
        setTimeout(() => {
            if (!isDragging) {
                startAutoScroll();
            }
        }, 2000);
    }

    // Mouse Events
    timelineContainer.addEventListener('mousedown', dragStart);
    timelineContainer.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd); // Listen on document to catch mouseup outside container
    timelineContainer.addEventListener('mouseleave', dragEnd); // Also end drag if mouse leaves container

    // Touch Events
    timelineContainer.addEventListener('touchstart', dragStart, { passive: false });
    timelineContainer.addEventListener('touchmove', dragMove, { passive: false });
    timelineContainer.addEventListener('touchend', dragEnd);
    timelineContainer.addEventListener('touchcancel', dragEnd);

    // --- Speed Control ---
    function adjustSpeed(multiplier) {
        // Ограничиваем диапазон скорости
        const newSpeed = animationSpeed * multiplier;
        if (newSpeed >= 0.1 && newSpeed <= 5) {
            animationSpeed = newSpeed;
            console.log(`Скорость таймлайна изменена: ${animationSpeed.toFixed(2)} px/frame`);
        }
    }
    
    // Увеличение/уменьшение скорости с клавиатуры (опционально)
    document.addEventListener('keydown', (e) => {
        // Проверяем, что фокус на таймлайне или рядом
        const isTimelineActive = timelineContainer.contains(document.activeElement) || 
                               timelineContainer === document.activeElement ||
                               document.activeElement === document.body;
                               
        if (isTimelineActive) {
            if (e.key === '+' || e.key === '=') {
                adjustSpeed(1.2); // Увеличение скорости на 20%
            } else if (e.key === '-' || e.key === '_') {
                adjustSpeed(0.8); // Уменьшение скорости на 20%
            }
        }
    });

    // --- Initialization ---
    // Setup clones
    setupInfiniteScroll();

    // Start smooth auto-scrolling immediately
    setTimeout(() => {
        startAutoScroll(true);
    }, 500);

    // При потере фокуса страницей останавливаем автопрокрутку, при возврате - возобновляем
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoScroll(true);
        } else {
            startAutoScroll(true);
        }
    });

    // Recalculate and setup clones on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const wasAutoScrolling = isAutoScrolling;
            stopAutoScroll(true); // Stop scrolling during resize without UI update
            setupInfiniteScroll(); // Re-setup clones and position
            // Restart auto-scroll after a delay if it was previously enabled
            if (wasAutoScrolling) {
                setTimeout(() => startAutoScroll(true), 300);
            }
        }, 200); // Debounce resize
    });
    
    console.log("Таймлайн полностью инициализирован с плавной прокруткой");
}


// Initialize timeline fullscreen modal functionality
function initTimelineFullscreen() {
    const timelineTrackEl = document.querySelector('.timeline-track');
    const fullscreenView = document.querySelector('.timeline-fullscreen');
    const closeBtn = fullscreenView ? fullscreenView.querySelector('.timeline-fullscreen-close') : null;
    const fullscreenContent = fullscreenView ? fullscreenView.querySelector('.timeline-fullscreen-content') : null;
    const imgEl = fullscreenView ? fullscreenView.querySelector('.timeline-fullscreen-image img') : null;
    const yearEl = fullscreenView ? fullscreenView.querySelector('.timeline-fullscreen-year') : null;
    const titleEl = fullscreenView ? fullscreenView.querySelector('.timeline-fullscreen-title') : null;
    const descEl = fullscreenView ? fullscreenView.querySelector('.timeline-fullscreen-description') : null;
    const factsContainer = fullscreenView ? fullscreenView.querySelector('.timeline-fullscreen-facts') : null;
    
    // Добавляем навигационные кнопки
    const prevBtn = fullscreenView ? fullscreenView.querySelector('.timeline-fullscreen-nav-btn.prev') : null;
    const nextBtn = fullscreenView ? fullscreenView.querySelector('.timeline-fullscreen-nav-btn.next') : null;

    if (!fullscreenView || !closeBtn || !fullscreenContent || !imgEl || !yearEl || !titleEl || !descEl || !factsContainer) {
        console.warn("Timeline fullscreen elements not found. Fullscreen functionality disabled.");
        return;
    }
    console.log("Initializing Timeline Fullscreen Modal...");

    let hoverTimeout;
    const hoverDelay = 250; // Delay in ms before opening on hover
    let currentYearIndex = 0; // Текущий индекс события
    
    // Массив всех годов в хронологическом порядке
    const years = Object.keys(timelineData).sort((a, b) => parseInt(a) - parseInt(b));
    console.log("Available timeline years:", years);

    // Function to update modal content
    function updateFullscreenContent(yearKey) {
        const data = timelineData[yearKey];
        if (!data) {
            console.error(`Data not found for timeline year: ${yearKey}`);
            return; // Don't update if data is missing
        }

        // Добавляем анимацию переключения
        fullscreenContent.classList.add('switching');
        
        setTimeout(() => {
            imgEl.src = data.image || './img/history/placeholder.jpg'; // Use placeholder if image missing
            imgEl.alt = data.title || data.year; // Add alt text
            yearEl.textContent = data.year;
            titleEl.textContent = data.title;
            
            // Обновляем subtitle если элемент существует
            const subtitleEl = fullscreenView.querySelector('.timeline-fullscreen-subtitle');
            if (subtitleEl && data.subtitle) {
                subtitleEl.textContent = data.subtitle;
            }
            
            descEl.textContent = data.description;

            // Update facts
            factsContainer.innerHTML = ''; // Clear previous facts
            if (data.facts && data.facts.length > 0) {
                data.facts.forEach((fact, index) => {
                    const factEl = document.createElement('div');
                    factEl.className = 'timeline-fact animate fadeInUp'; 
                    factEl.style.setProperty('--delay', `${index * 0.1}s`); // Задержка анимации
                    factEl.innerHTML = `
                        <div class="timeline-fact-number">${fact.number}</div>
                        <div class="timeline-fact-text">${fact.text}</div>
                    `;
                    factsContainer.appendChild(factEl);
                });
            } else {
                factsContainer.innerHTML = '<p>Дополнительные факты отсутствуют.</p>';
            }
            
            // Обновляем текущий индекс
            currentYearIndex = years.indexOf(yearKey);
            
            // Обновляем состояние кнопок навигации
            updateNavigationButtons();
            
            // Убираем анимацию переключения
            fullscreenContent.classList.remove('switching');
        }, 150);
    }

    // Функция обновления состояния навигационных кнопок
    function updateNavigationButtons() {
        if (prevBtn && nextBtn) {
            // Полностью скрываем кнопки если они не нужны
            if (currentYearIndex > 0) {
                prevBtn.style.display = 'flex';
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'auto';
            } else {
                prevBtn.style.display = 'none';
            }
            
            if (currentYearIndex < years.length - 1) {
                nextBtn.style.display = 'flex';
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
            } else {
                nextBtn.style.display = 'none';
            }
        }
    }

    // Функция переключения на предыдущее событие
    function showPreviousEvent() {
        if (currentYearIndex > 0) {
            const prevYear = years[currentYearIndex - 1];
            updateFullscreenContent(prevYear);
        }
    }

    // Функция переключения на следующее событие
    function showNextEvent() {
        if (currentYearIndex < years.length - 1) {
            const nextYear = years[currentYearIndex + 1];
            updateFullscreenContent(nextYear);
        }
    }

    // Function to open the modal
    function openFullscreen(yearKey) {
        updateFullscreenContent(yearKey);
        fullscreenView.classList.add('active');
        
        // Инициализируем состояние кнопок навигации
        setTimeout(() => {
            updateNavigationButtons();
        }, 100);
        
        // Add class to trigger content animation after modal transition
        setTimeout(() => {
            fullscreenContent.classList.remove('switching'); // Ensure switching class is removed
        }, 50); // Small delay after modal becomes active
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    }

    // Function to close the modal
    function closeFullscreen() {
        fullscreenView.classList.remove('active');
        fullscreenContent.classList.add('switching'); // Add class for exit animation
        document.body.style.overflow = ''; // Restore body scroll
    }

    // Event delegation to handle dynamically cloned items
    if (timelineTrackEl) {
        timelineTrackEl.addEventListener('mouseenter', (e) => {
            const item = e.target.closest('.timeline-item');
            if (!item) return;
            const year = item.querySelector('.timeline-year')?.textContent;
            if (!year) return;
            hoverTimeout = setTimeout(() => openFullscreen(year), hoverDelay);
        }, true);

        timelineTrackEl.addEventListener('mouseleave', (e) => {
            const item = e.target.closest('.timeline-item');
            if (item) clearTimeout(hoverTimeout);
        }, true);

        timelineTrackEl.addEventListener('click', (e) => {
            const item = e.target.closest('.timeline-item');
            if (!item) return;
            const year = item.querySelector('.timeline-year')?.textContent;
            if (year) {
                clearTimeout(hoverTimeout);
                openFullscreen(year);
            }
        });
    }

    // Close button listener
    closeBtn.addEventListener('click', closeFullscreen);
    
    // Навигационные кнопки
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPreviousEvent();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextEvent();
        });
    }

    // Close on clicking background overlay
    fullscreenView.addEventListener('click', (e) => {
        if (e.target === fullscreenView) { // Check if click is directly on the overlay
            closeFullscreen();
        }
    });

    // Close on Escape key и навигация стрелками клавиатуры
    document.addEventListener('keydown', (e) => {
        if (fullscreenView.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeFullscreen();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    showPreviousEvent();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    showNextEvent();
                    break;
            }
        }
    });

    // --- Parallax/Glow effect inside modal ---
    if (fullscreenContent) {
        fullscreenContent.addEventListener('mousemove', (e) => {
            const rect = fullscreenContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            // Parallax effect on image (adjust multiplier for intensity)
            if (imgEl) {
                imgEl.style.transform = `scale(1.05) translate(${deltaX * 10}px, ${deltaY * 10}px)`;
            }

            // Update glow position (using CSS variables defined in timeline.css)
            fullscreenContent.style.setProperty('--glow-x', `${x}px`);
            fullscreenContent.style.setProperty('--glow-y', `${y}px`);
        });

        fullscreenContent.addEventListener('mouseleave', () => {
            // Reset image transform
            if (imgEl) {
                imgEl.style.transform = 'scale(1)';
            }
            // Optionally reset glow position or let CSS handle fade out
        });
    }
}

// Удаляю экспорт в конце файла и заменяю на вызов функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initTimeline();
    initTimelineFullscreen();
});