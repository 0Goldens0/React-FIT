// Function to create particles in the new services section
function createServiceParticles() {
    const container = document.querySelector('.services-particles'); // Target specific container
    if (!container) {
        console.warn("Service particles container '.services-particles' not found.");
        return;
    }

    // Clear container before adding new particles
    container.innerHTML = '';
    const particlesCount = 25; // Number of particles
    console.log(`Initializing ${particlesCount} service particles...`);

    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('service-particle'); // Use class from services.css

        // Random size
        const size = Math.random() * 8 + 3; // 3px to 11px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random opacity
        particle.style.opacity = (Math.random() * 0.2 + 0.05).toFixed(2); // 0.05 to 0.25

        // Random shape (using clip-path for hexagon)
        if (Math.random() > 0.6) {
            particle.style.borderRadius = '50%';
        } else {
            particle.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
        }

        // Random animation (using CSS animation 'float' defined elsewhere)
        const duration = 20 + Math.random() * 20; // 20s to 40s
        const delay = Math.random() * -20; // Start at different points in the animation cycle
        particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s alternate`; // Use alternate direction

        container.appendChild(particle);
    }
}


// Function to initialize 3D card effects and interactions
function init3DCards() {
    const serviceCards = document.querySelectorAll('.service-3d-card');
    const serviceSection = document.querySelector('.services-new'); // Section containing the cards
    const spotlight = serviceSection ? serviceSection.querySelector('.services-spotlight') : null;

    if (serviceCards.length === 0) {
        console.warn("No 3D service cards found with class '.service-3d-card'.");
        return;
    }

    console.log(`Initializing ${serviceCards.length} 3D service cards...`);

    // Create background particles for the section
    createServiceParticles();

    serviceCards.forEach(card => {
        const cardInner = card.querySelector('.service-card-inner');
        const cardShine = card.querySelector('.service-card-shine'); // Optional shine element
        const expandButton = card.querySelector('.service-expand');
        const closeButton = card.querySelector('.service-close');

        if (!cardInner) {
            console.warn("Card inner element not found for a 3D card:", card);
            return; // Skip this card if structure is wrong
        }

        // --- Flip Logic ---
        const flipCard = () => cardInner.classList.add('flipped');
        const unflipCard = () => cardInner.classList.remove('flipped');

        // Flip on Expand button click
        if (expandButton) {
            expandButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card mouseleave from triggering immediately
                flipCard();
            });
        }

        // Unflip on Close button click
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                unflipCard();
            });
        }

        // Optional: Flip on card click (if no buttons)
        // card.addEventListener('click', () => {
        //     cardInner.classList.toggle('flipped');
        // });

        // --- Mouse Move 3D Effect (Tilt) ---
        card.addEventListener('mousemove', (e) => {
            // Only apply tilt if the card is NOT flipped
            if (!cardInner.classList.contains('flipped')) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Calculate rotation angles (adjust multiplier for sensitivity)
                const rotateX = ((centerY - y) / centerY) * 8; // Max 8 degrees rotation X
                const rotateY = ((x - centerX) / centerX) * 8; // Max 8 degrees rotation Y

                // Apply perspective and rotation
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`; // Slight scale up

                // Apply shine effect if element exists
                if (cardShine) {
                    const percentX = (x / rect.width) * 100;
                    const percentY = (y / rect.height) * 100;
                    cardShine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;
                    cardShine.style.opacity = '1';
                }
            }
        });

        // --- Reset on Mouse Leave ---
        card.addEventListener('mouseleave', () => {
            // Reset tilt transform smoothly via CSS transition defined on .service-3d-card
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

            // Hide shine effect
            if (cardShine) {
                cardShine.style.opacity = '0';
            }

            // Optional: Automatically unflip card on mouse leave after a delay
            // setTimeout(() => {
            //     if (!card.matches(':hover')) { // Double check if mouse is still outside
            //         unflipCard();
            //     }
            // }, 500);
        });
    });

    // --- Spotlight Effect ---
    if (serviceSection && spotlight) {
        let animationFrameId = null;

        const updateSpotlight = (e) => {
            const rect = serviceSection.getBoundingClientRect();
            // Use pageX/pageY for coordinates relative to the document
            // Correct for scroll position and element offset
            const x = e.pageX - rect.left - window.scrollX;
            const y = e.pageY - rect.top - window.scrollY;

            // Update background using CSS variables for potentially better performance
            serviceSection.style.setProperty('--spotlight-x', `${x}px`);
            serviceSection.style.setProperty('--spotlight-y', `${y}px`);
            spotlight.style.background = `radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), rgba(255, 184, 0, 0.1) 0%, transparent 35%)`;

            animationFrameId = null; // Reset frame ID
        };

        serviceSection.addEventListener('mousemove', (e) => {
            // Throttle updates using requestAnimationFrame
            if (animationFrameId === null) {
                animationFrameId = requestAnimationFrame(() => updateSpotlight(e));
            }
        }, { passive: true });

        serviceSection.addEventListener('mouseleave', () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            spotlight.style.background = 'none'; // Hide spotlight
        });
        console.log("Service section spotlight effect initialized.");
    } else {
        console.warn("Service section or spotlight element not found for spotlight effect.");
    }

    console.log("3D Service Cards Initialized.");
}

// Инициализация секции услуг
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing enhanced services section...');
    
    // Инициализация интерактивных карточек услуг
    initServiceCards();
    
    // Инициализация 3D эффектов для фоновых элементов
    init3DBackgroundElements();
    
    // Инициализация эффекта наведения для кнопок
    initButtonHoverEffects();
});

// Функция для обработки нажатий на карточки услуг и применения 3D поворота
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-3d-card');
    
    if (serviceCards.length === 0) {
        console.warn("No 3D service cards found with class '.service-3d-card'.");
        return;
    }
    
    console.log(`Found ${serviceCards.length} service cards.`);
    
    // Сохраняем таймеры для каждой карточки
    const flipTimers = new Map();
    
    serviceCards.forEach(card => {
        // Добавляем эффект свечения при движении мыши
        card.addEventListener('mousemove', function(e) {
            // Вычисляем координаты курсора относительно карточки
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x позиция внутри элемента
            const y = e.clientY - rect.top; // y позиция внутри элемента
            
            // Нормализуем координаты (0-100%)
            const xPercent = Math.round((x / rect.width) * 100);
            const yPercent = Math.round((y / rect.height) * 100);
            
            // Устанавливаем позицию свечения
            const shineElement = this.querySelector('.service-card-shine');
            if (shineElement) {
                shineElement.style.setProperty('--shine-x', `${xPercent}%`);
                shineElement.style.setProperty('--shine-y', `${yPercent}%`);
            }
            
            // Добавляем 3D наклон карточке при движении мыши (только если не перевёрнута)
            const cardInner = this.querySelector('.service-card-inner');
            if (cardInner && !cardInner.classList.contains('flipped')) {
                // Вычисляем угол наклона (максимум 10 градусов)
                const xTilt = (xPercent - 50) / 5; // от -10 до 10 градусов
                const yTilt = (yPercent - 50) / 5; // от -10 до 10 градусов
                
                // Применяем трансформацию к внутренней части карточки
                cardInner.style.transform = `perspective(1000px) rotateX(${-yTilt}deg) rotateY(${xTilt}deg)`;
            }
        });
        
        // При наведении на карточку добавляем эффект поворота
        card.addEventListener('mouseenter', function() {
            const cardInner = this.querySelector('.service-card-inner');
            if (cardInner) {
                // Очищаем предыдущий таймер, если он был
                if (flipTimers.has(this)) {
                    clearTimeout(flipTimers.get(this));
                }
                
                // Добавляем класс для переворота
                cardInner.classList.add('flipped');
                
                // Сразу обновляем стиль, чтобы карточка повернулась
                cardInner.style.transform = 'rotateY(180deg)';
                
                console.log('Карточка перевернута (вход мыши)');
            }
        });
        
        // При уходе мыши с карточки возвращаем в исходное положение
        card.addEventListener('mouseleave', function() {
            const cardInner = this.querySelector('.service-card-inner');
            if (cardInner) {
                // Убираем класс переворота
                cardInner.classList.remove('flipped');
                
                // Возвращаем в исходное положение
                cardInner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                
                // Создаем таймер для задержки перед следующим переворотом
                const timer = setTimeout(() => {
                    // Дополнительно убеждаемся, что карточка вернулась в исходное положение
                    cardInner.style.transform = '';
                    console.log('Карточка вернулась в исходное положение (выход мыши)');
                    
                    // Удаляем таймер из Map
                    flipTimers.delete(this);
                }, 500);
                
                // Сохраняем таймер в Map
                flipTimers.set(this, timer);
            }
        });
    });
}

// Инициализация 3D эффектов для фоновых элементов
function init3DBackgroundElements() {
    // Фоновые элементы, которые должны реагировать на движение мыши
    const bgElements = document.querySelectorAll('.hex-3d');
    const servicesSection = document.querySelector('.services');
    
    if (!servicesSection || bgElements.length === 0) {
        console.warn("Services section or background elements not found.");
        return;
    }
    
    // Обработчик движения мыши для параллакс-эффекта фоновых элементов
    servicesSection.addEventListener('mousemove', function(e) {
        const sectionRect = this.getBoundingClientRect();
        const sectionCenterX = sectionRect.width / 2;
        const sectionCenterY = sectionRect.height / 2;
        
        const mouseX = e.clientX - sectionRect.left;
        const mouseY = e.clientY - sectionRect.top;
        
        // Вычисляем отклонение от центра (от -1 до 1)
        const xOffset = (mouseX - sectionCenterX) / sectionCenterX;
        const yOffset = (mouseY - sectionCenterY) / sectionCenterY;
        
        // Применяем параллакс к каждому фоновому элементу
        bgElements.forEach((element, index) => {
            // Разная интенсивность для каждого элемента
            const intensity = 10 + (index * 5);
            const xTranslate = xOffset * intensity;
            const yTranslate = yOffset * intensity;
            
            // Применяем трансформацию
            element.style.transform = `rotateX(${45 - yOffset * 10}deg) rotateY(${-15 + xOffset * 10}deg) translate(${xTranslate}px, ${yTranslate}px)`;
        });
    });
}

// Инициализация эффектов наведения для кнопок
function initButtonHoverEffects() {
    const buttons = document.querySelectorAll('.services .btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(255, 184, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}