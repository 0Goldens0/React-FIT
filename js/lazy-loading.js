// ========== LAZY LOADING SYSTEM ========== //

class LazyLoader {
    constructor() {
        this.observers = new Map();
        this.loadedSections = new Set();
        this.init();
    }

    init() {
        // Инициализируем ленивую загрузку изображений
        this.initLazyImages();
        
        // Инициализируем ленивую загрузку секций
        this.initLazySections();
        
        // Инициализируем preloading для критических ресурсов
        this.initPreloading();
        
        console.log('🚀 Lazy Loading System initialized');
    }

    // ========== ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ ========== //
    initLazyImages() {
        // Используем встроенную ленивую загрузку браузера где возможно
        const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Браузер поддерживает встроенную ленивую загрузку
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.loading = 'lazy';
            });
        } else {
            // Fallback для старых браузеров
            this.createImageObserver();
        }
    }

    createImageObserver() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('lazy-loaded');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px' // Загружаем за 50px до появления
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        this.observers.set('images', imageObserver);
    }

    // ========== ЛЕНИВАЯ ЗАГРУЗКА СЕКЦИЙ ========== //
    initLazySections() {
        const sectionConfigs = [
            {
                selector: '#hero',
                callback: () => this.loadHeroSection(),
                rootMargin: '0px'
            },
            {
                selector: '#about',
                callback: () => this.loadAboutSection(),
                rootMargin: '100px 0px'
            },
            {
                selector: '#timeline',
                callback: () => this.loadTimelineSection(),
                rootMargin: '150px 0px'
            },
            {
                selector: '#brands',
                callback: () => this.loadBrandsSection(),
                rootMargin: '200px 0px'
            },
            {
                selector: '#services',
                callback: () => this.loadServicesSection(),
                rootMargin: '250px 0px'
            },
            {
                selector: '#map',
                callback: () => this.loadMapSection(),
                rootMargin: '200px 0px'
            },
            {
                selector: '#partners',
                callback: () => this.loadPartnersSection(),
                rootMargin: '150px 0px'
            }
        ];

        sectionConfigs.forEach(config => {
            this.createSectionObserver(config);
        });
    }

    createSectionObserver({ selector, callback, rootMargin }) {
        const section = document.querySelector(selector);
        if (!section) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.loadedSections.has(selector)) {
                    this.loadedSections.add(selector);
                    // Небольшая задержка для плавности
                    setTimeout(() => {
                        callback();
                        console.log(`📦 Loaded section: ${selector}`);
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: rootMargin,
            threshold: 0.1
        });

        observer.observe(section);
        this.observers.set(selector, observer);
    }

    // ========== ЗАГРУЗЧИКИ СЕКЦИЙ ========== //
    
    loadHeroSection() {
        // Инициализируем частицы hero только при необходимости
        if (typeof createHeroParticles === 'function') {
            createHeroParticles();
        }
        
        // Запускаем анимации hero
        const heroElements = document.querySelectorAll('#hero .animate');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }

    loadAboutSection() {
        // Создаем частицы для about секции
        if (typeof createAboutParticles === 'function') {
            createAboutParticles();
        }
        
        // Инициализируем интерактивность about
        if (typeof initAboutInteractions === 'function') {
            initAboutInteractions();
        }

        // Анимация появления элементов
        const aboutElements = document.querySelectorAll('#about .animate');
        aboutElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 150);
        });
    }

    loadTimelineSection() {
        // Инициализируем timeline только когда нужно
        if (typeof initTimelineAnimation === 'function') {
            initTimelineAnimation();
        }
        
        if (typeof initTimelineFullscreen === 'function') {
            initTimelineFullscreen();
        }

        // Добавляем lazy-animate класс и анимируем элементы timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            // Добавляем специальный класс для ленивой анимации
            item.classList.add('lazy-animate');
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 200);
        });
    }

    loadBrandsSection() {
        // Инициализируем brand journey
        if (typeof initBrandJourney === 'function') {
            setTimeout(() => {
                initBrandJourney();
            }, 200);
        }

        // Загружаем изображения брендов
        this.loadBrandImages();
    }

    loadServicesSection() {
        // Инициализируем 3D эффекты для services
        if (typeof initTilt === 'function') {
            setTimeout(() => {
                initTilt();
            }, 300);
        }

        // Создаем частицы для services
        this.createServicesParticles();
    }

    loadMapSection() {
        // Инициализируем карту
        if (typeof initMap === 'function') {
            setTimeout(() => {
                initMap();
            }, 400);
        }
    }

    loadPartnersSection() {
        // Инициализируем карусель партнеров
        if (typeof initPartnerCarousel === 'function') {
            initPartnerCarousel();
        }
    }

    // ========== ДОПОЛНИТЕЛЬНЫЕ МЕТОДЫ ========== //

    loadBrandImages() {
        const brandImages = document.querySelectorAll('.brand-logo-journey img, .journey-brand-products img');
        brandImages.forEach(img => {
            if (img.dataset.src && !img.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }

    createServicesParticles() {
        const servicesSection = document.querySelector('#services');
        if (!servicesSection || servicesSection.querySelector('.services-particles').children.length > 0) return;

        const particlesContainer = servicesSection.querySelector('.services-particles');
        if (!particlesContainer) return;

        // Создаем частицы только если они еще не созданы
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (3 + Math.random() * 2) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // ========== PRELOADING ========== //
    initPreloading() {
        // Preload критических шрифтов
        this.preloadFonts();
        
        // Preload hero изображения
        this.preloadCriticalImages();
        
        // Prefetch следующих секций
        this.prefetchNextSections();
    }

    preloadFonts() {
        const fonts = [
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap',
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap'
        ];

        fonts.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = fontUrl;
            document.head.appendChild(link);
        });
    }

    preloadCriticalImages() {
        const criticalImages = [
            'img/c98be543-3cca-4e81-b5be-98b263057ff3.png', // Hero image
            'logo/brands/FIT_logo.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    prefetchNextSections() {
        // Prefetch ресурсов следующих секций при scroll
        let prefetched = false;
        
        const prefetchHandler = () => {
            if (!prefetched && window.scrollY > 300) {
                prefetched = true;
                
                // Prefetch изображений брендов
                const brandImages = [
                    'logo/brands/kurs.png',
                    'logo/brands/mos.png',
                    'logo/brands/xbat.png'
                ];

                brandImages.forEach(src => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = src;
                    document.head.appendChild(link);
                });

                window.removeEventListener('scroll', prefetchHandler);
            }
        };

        window.addEventListener('scroll', prefetchHandler, { passive: true });
    }

    // ========== УТИЛИТЫ ========== //
    
    // Метод для принудительной загрузки секции
    forceLoadSection(selector) {
        if (this.loadedSections.has(selector)) return;
        
        const config = this.getSectionConfig(selector);
        if (config) {
            this.loadedSections.add(selector);
            config.callback();
        }
    }

    getSectionConfig(selector) {
        const configs = {
            '#hero': { callback: () => this.loadHeroSection() },
            '#about': { callback: () => this.loadAboutSection() },
            '#timeline': { callback: () => this.loadTimelineSection() },
            '#brands': { callback: () => this.loadBrandsSection() },
            '#services': { callback: () => this.loadServicesSection() },
            '#map': { callback: () => this.loadMapSection() },
            '#partners': { callback: () => this.loadPartnersSection() }
        };
        
        return configs[selector];
    }

    // Очистка observers при необходимости
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        this.loadedSections.clear();
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ========== //

// Глобальная переменная для доступа к lazy loader
let lazyLoader;

// Инициализируем когда DOM готов
document.addEventListener('DOMContentLoaded', () => {
    // Небольшая задержка для стабильности
    setTimeout(() => {
        lazyLoader = new LazyLoader();
    }, 100);
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LazyLoader;
} 