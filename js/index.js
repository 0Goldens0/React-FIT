// Основная инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM полностью загружен, основная инициализация...");

    // Инициализация базовых функций
    initBackToTop();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    
    // Инициализация новых функций для блока "О нас"
    createAboutParticles();
    initAboutInteractions();

    // Примечание: функции из других файлов уже вызываются в своих файлах
    // Здесь остались только функции, определенные непосредственно в этом файле

    // Отметка о готовности страницы (для работы CSS-анимаций)
    setTimeout(() => {
        document.body.classList.add('page-loaded');
        console.log("Страница полностью загружена.");
    }, 300);
});

// Функция инициализации кнопки "Наверх"
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Функция инициализации мобильного меню
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.overlay');
    
    if (navToggle && mainNav && overlay) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        overlay.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
}

// Функция инициализации формы
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Здесь будет логика отправки формы
                console.log('Отправка формы:', data);
                alert('Спасибо! Ваша заявка отправлена.');
                form.reset();
            } catch (error) {
                console.error('Ошибка отправки формы:', error);
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
            }
        });
    }
}

// Функция инициализации плавной прокрутки
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Не обрабатываем пустые ссылки
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                // Закрываем мобильное меню при переходе по ссылке
                const mobileNav = document.querySelector('.main-nav');
                const overlay = document.querySelector('.overlay');
                const navToggle = document.querySelector('.nav-toggle');
                
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    overlay.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
                
                // Плавная прокрутка к элементу
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}