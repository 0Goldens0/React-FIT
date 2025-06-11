// Главная функция инициализации всех анимаций
function initAllAnimations() {
    console.log('Инициализация всех анимаций...');
    
    // Проверяем наличие GSAP
    if (typeof gsap === 'undefined') {
        console.warn('GSAP не загружен, некоторые анимации не будут работать.');
    } else {
        // Создание анимированных блобов для фона
        createHeroBlobs();
    }
    
    // Инициализация анимации элементов при скролле
    initScrollAnimations();
    
    // Инициализация частиц
    initParticles();
    
    // Добавляем класс, показывающий что страница загружена
    document.body.classList.add('loaded');
}

// Создание анимированных блобов для секции hero
function createHeroBlobs() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Проверяем, есть ли уже созданный контейнер для блобов
    let blobsContainer = hero.querySelector('.lava-blobs');
    if (!blobsContainer) {
        blobsContainer = document.createElement('div');
        blobsContainer.className = 'lava-blobs';
        hero.appendChild(blobsContainer);
    }

    // Создаем 3 аморфные фигуры
    const createBlob = (size) => {
        const blob = document.createElement('div');
        blob.className = 'lava-blob';
        Object.assign(blob.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            borderRadius: '50%',
            position: 'absolute',
            backgroundColor: 'rgba(255, 184, 0, 0.5)',
            filter: 'blur(50px)',
            transform: 'translate(-50%, -50%)',
            zIndex: '0'
        });
        blobsContainer.appendChild(blob);
        return blob;
    };

    // Простая анимация без MotionPath плагина
    const animateBlob = (blob) => {
        const duration = 8 + Math.random() * 4;
        
        try {
            // Анимация перемещения
            gsap.to(blob, {
                x: () => Math.random() * 200 - 100,
                y: () => Math.random() * 200 - 100,
                duration: duration,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
            
            // Анимация размера
            gsap.to(blob, {
                scale: () => 0.8 + Math.random() * 0.4,
                duration: duration * 0.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            
            // Анимация формы через borderRadius
            gsap.to(blob, {
                borderRadius: () => `${40 + Math.random() * 60}%`,
                duration: duration * 0.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        } catch (e) {
            console.error('Ошибка в анимации блобов:', e);
        }
    };

    // Создаем и анимируем blob-объекты
    [150, 250, 180].forEach((size) => {
        const blob = createBlob(size);
        animateBlob(blob);
    });

    // Плавное изменение opacity
    try {
        gsap.to(".lava-blob", {
            duration: 5,
            opacity: () => 0.4 + Math.random() * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    } catch (e) {
        console.error('Ошибка в анимации opacity:', e);
    }
}

// Анимация частиц в hero секции
function initParticles() {
    const particlesContainer = document.getElementById('hero-particles');
    
    if (particlesContainer && particlesContainer.children.length === 0) {
        console.log('Инициализация частиц...');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particlesContainer.appendChild(particle);
        }
    }
}

// Инициализация анимаций при скролле
function initScrollAnimations() {
    console.log('Инициализация анимаций скролла...');
    
    // Анимация появления элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate:not(.visible)');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };
    
    // Добавляем обработчик прокрутки только если его еще нет
    if (!window._scrollAnimationInitialized) {
        window.addEventListener('scroll', animateOnScroll);
        window._scrollAnimationInitialized = true;
    }
    
    // Запускаем анимацию на видимых элементах при загрузке
    animateOnScroll();
}

// Инициализация счётчиков
function initStatsCounter() {
    console.log('Инициализация счётчиков статистики...');
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    if (statNumbers.length === 0) {
        console.warn('Не найдены элементы счётчика статистики');
        return;
    }
    
    // Функция для анимации одного счётчика
    function animateCounter(el) {
        if (el.classList.contains('counted')) return;
        
        const targetValue = parseInt(el.getAttribute('data-count').replace(/\s/g, ''));
        if (isNaN(targetValue)) {
            console.warn('Неверное значение data-count:', el.getAttribute('data-count'));
            return;
        }
        
        // Начальное значение
        let startValue = 0;
        let currentValue = startValue;
        const duration = 2000; // 2 секунды
        const stepTime = 20; // время между шагами в мс
        const steps = duration / stepTime;
        const increment = targetValue / steps;
        
        // Отмечаем как обработанный
        el.classList.add('counted');
        
        // Запускаем интервал
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                el.textContent = targetValue.toLocaleString('ru-RU');
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(currentValue).toLocaleString('ru-RU');
            }
        }, stepTime);
    }
    
    // Функция проверки видимости секции статистики
    function checkStats() {
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
            statNumbers.forEach(animateCounter);
            window.removeEventListener('scroll', checkStats);
        }
    }
    
    // Устанавливаем начальное значение счётчиков
    statNumbers.forEach(stat => {
        if (!stat.classList.contains('counted')) {
            stat.textContent = '0';
        }
    });
    
    // Проверяем сразу и при прокрутке
    checkStats();
    window.addEventListener('scroll', checkStats);
}

// Запускаем инициализацию при загрузке страницы (только один раз)
document.addEventListener('DOMContentLoaded', function() {
    initAllAnimations();
    initStatsCounter();
}); 