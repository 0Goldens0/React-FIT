// ========== ABOUT SECTION - ЛЕНИВАЯ ИНИЦИАЛИЗАЦИЯ ========== //

// Функция для создания частиц about секции
function createAboutParticles() {
    const particlesContainer = document.getElementById('about-particles');
    if (!particlesContainer || particlesContainer.children.length > 0) return;

    // Создаем частицы только когда секция видна
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Случайные позиции и задержки
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            particlesContainer.appendChild(particle);
        }, i * 50); // Поэтапное создание для плавности
    }
    
    console.log('✨ About particles created');
}

// Функция для инициализации интерактивности about секции
function initAboutInteractions() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    // Интерактивность с 3D элементами
    const hexagon3D = aboutSection.querySelector('.hexagon-3d');
    const ctaButton = aboutSection.querySelector('.cta-button');
    
    if (hexagon3D) {
        // Параллакс для 3D гексагона при движении мыши
        aboutSection.addEventListener('mousemove', (e) => {
            const rect = aboutSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Плавное вращение в зависимости от позиции мыши
            const rotationX = y * 10;
            const rotationY = x * 10;
            
            hexagon3D.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        });

        // Возврат в исходное положение при уходе мыши
        aboutSection.addEventListener('mouseleave', () => {
            hexagon3D.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // Hover эффекты для CTA кнопки
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            // Усиливаем свечение логотипа при hover на кнопку
            const fitLetters = aboutSection.querySelectorAll('.fit-letter');
            fitLetters.forEach(letter => {
                letter.style.filter = 'drop-shadow(0 0 40px rgba(255, 165, 0, 1))';
            });
        });

        ctaButton.addEventListener('mouseleave', () => {
            const fitLetters = aboutSection.querySelectorAll('.fit-letter');
            fitLetters.forEach(letter => {
                letter.style.filter = 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))';
            });
        });
    }

    // Анимация счетчиков статистики (если есть)
    animateStats();
    
    console.log('🎮 About interactions initialized');
}

// Функция анимации статистики
function animateStats() {
    const statNumbers = document.querySelectorAll('.about .stat-number[data-count]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50; // 50 шагов анимации
        const duration = 2000; // 2 секунды
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Форматирование чисел
            if (target >= 1000) {
                stat.textContent = Math.floor(current).toLocaleString();
            } else {
                stat.textContent = Math.floor(current);
            }
        }, stepTime);
    });
}

// Функция для проверки видимости about секции
function isAboutSectionVisible() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return false;
    
    const rect = aboutSection.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

// Экспорт функций для использования в lazy loader
if (typeof window !== 'undefined') {
    window.createAboutParticles = createAboutParticles;
    window.initAboutInteractions = initAboutInteractions;
}

// Backup инициализация если ленивая загрузка не работает
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем через 3 секунды, инициализирована ли секция
    setTimeout(() => {
        if (isAboutSectionVisible() && !document.getElementById('about-particles').children.length) {
            console.log('🔄 Fallback: initializing About section');
            createAboutParticles();
            initAboutInteractions();
        }
    }, 3000);
}); 