// ========== PERFORMANCE CONFIGURATION ========== //

// Глобальные настройки производительности
window.PERFORMANCE_CONFIG = {
    // Настройки ленивой загрузки
    lazy: {
        imageLoadDistance: '50px',  // Расстояние до загрузки изображений
        sectionLoadDistance: {
            hero: '0px',
            about: '100px',
            timeline: '150px',
            brands: '200px',
            services: '250px',
            map: '200px',
            partners: '150px'
        },
        particleDelayStep: 50,      // Задержка между созданием частиц (мс)
        maxParticles: {
            desktop: 15,
            mobile: 8
        }
    },
    
    // Настройки анимаций
    animations: {
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        defaultDuration: 600,       // Базовая длительность анимаций (мс)
        staggerDelay: 100,          // Задержка между элементами (мс)
        parallaxSensitivity: 0.5,   // Чувствительность параллакса
        enableComplexAnimations: true
    },
    
    // Настройки производительности
    performance: {
        debounceDelay: 16,          // Задержка для debounce (мс)
        throttleDelay: 16,          // Задержка для throttle (мс)
        maxConcurrentAnimations: 3, // Максимум одновременных анимаций
        enableGPUAcceleration: true,
        preloadCriticalImages: true,
        lazyLoadNonCritical: true
    },
    
    // Настройки для разных устройств
    device: {
        isMobile: window.innerWidth <= 768,
        isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
        isDesktop: window.innerWidth > 1024,
        hasHighDPI: window.devicePixelRatio > 1,
        supportsWebP: false, // Будет определено позже
        connectionSpeed: 'unknown'
    }
};

// Определяем тип соединения
if ('connection' in navigator) {
    const connection = navigator.connection;
    PERFORMANCE_CONFIG.device.connectionSpeed = connection.effectiveType || 'unknown';
    
    // Адаптируем настройки под скорость соединения
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        PERFORMANCE_CONFIG.lazy.maxParticles.desktop = 5;
        PERFORMANCE_CONFIG.lazy.maxParticles.mobile = 3;
        PERFORMANCE_CONFIG.animations.enableComplexAnimations = false;
        PERFORMANCE_CONFIG.performance.lazyLoadNonCritical = true;
    }
}

// Определяем поддержку WebP
function checkWebPSupport() {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
        PERFORMANCE_CONFIG.device.supportsWebP = (webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

checkWebPSupport();

// Утилиты для производительности
window.PerformanceUtils = {
    // Debounce функция
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle функция
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Проверка видимости элемента
    isInViewport: function(element, rootMargin = '0px') {
        const rect = element.getBoundingClientRect();
        const margin = parseInt(rootMargin);
        return (
            rect.top < (window.innerHeight + margin) &&
            rect.bottom > -margin &&
            rect.left < (window.innerWidth + margin) &&
            rect.right > -margin
        );
    },
    
    // Оптимизированный requestAnimationFrame
    rafQueue: [],
    rafId: null,
    
    requestFrame: function(callback) {
        this.rafQueue.push(callback);
        if (!this.rafId) {
            this.rafId = requestAnimationFrame(() => {
                const queue = this.rafQueue.slice();
                this.rafQueue = [];
                this.rafId = null;
                queue.forEach(cb => cb());
            });
        }
    },
    
    // Проверка поддержки Intersection Observer
    supportsIntersectionObserver: function() {
        return 'IntersectionObserver' in window;
    },
    
    // Применение GPU ускорения
    enableGPUAcceleration: function(element) {
        if (PERFORMANCE_CONFIG.performance.enableGPUAcceleration) {
            element.style.transform = element.style.transform || 'translateZ(0)';
            element.style.backfaceVisibility = 'hidden';
            element.style.perspective = '1000px';
        }
    },
    
    // Отключение анимаций для пользователей с ограниченными возможностями
    respectReducedMotion: function() {
        if (PERFORMANCE_CONFIG.animations.reducedMotion) {
            document.documentElement.classList.add('reduced-motion');
            return true;
        }
        return false;
    },
    
    // Адаптивная загрузка ресурсов
    shouldLoadResource: function(resourceType) {
        const config = PERFORMANCE_CONFIG;
        
        switch (resourceType) {
            case 'particles':
                return !(config.device.isMobile && config.device.connectionSpeed.includes('2g'));
            case 'complexAnimations':
                return config.animations.enableComplexAnimations && !config.animations.reducedMotion;
            case 'parallax':
                return !config.device.isMobile && config.animations.enableComplexAnimations;
            default:
                return true;
        }
    },
    
    // Мониторинг производительности
    performanceMonitor: {
        frameCount: 0,
        lastTime: performance.now(),
        
        start: function() {
            const monitor = () => {
                this.frameCount++;
                const currentTime = performance.now();
                
                if (currentTime - this.lastTime >= 1000) {
                    const fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
                    
                    // Если FPS падает ниже 30, отключаем сложные эффекты
                    if (fps < 30) {
                        PERFORMANCE_CONFIG.animations.enableComplexAnimations = false;
                        console.warn('⚠️ Low FPS detected, disabling complex animations');
                    }
                    
                    this.frameCount = 0;
                    this.lastTime = currentTime;
                }
                
                requestAnimationFrame(monitor);
            };
            
            requestAnimationFrame(monitor);
        }
    }
};

// Автоматически применяем настройки производительности
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем и применяем настройки для ограниченной анимации
    PerformanceUtils.respectReducedMotion();
    
    // Запускаем мониторинг производительности в dev режиме
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        PerformanceUtils.performanceMonitor.start();
    }
    
    // Оптимизируем изображения для устройств с высоким DPI
    if (PERFORMANCE_CONFIG.device.hasHighDPI) {
        console.log('📱 High DPI device detected, optimizing image loading');
    }
    
    console.log('⚡ Performance configuration loaded:', PERFORMANCE_CONFIG);
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PERFORMANCE_CONFIG, PerformanceUtils };
} 