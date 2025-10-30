// Скрипт для проверки адаптивности всех секций
// Запустите этот код в консоли браузера (F12 → Console)

console.log('🔍 Проверка адаптивности сайта...\n');
console.log('📐 Разрешение экрана:', window.innerWidth, 'x', window.innerHeight);
console.log('📏 Device Pixel Ratio:', window.devicePixelRatio);
console.log('🔍 Масштаб браузера:', Math.round(window.devicePixelRatio * 100) + '%\n');

// Проверка Hero секции
const heroWrapper = document.querySelector('.hero-wrapper');
if (heroWrapper) {
    const styles = window.getComputedStyle(heroWrapper);
    console.log('🏠 HERO секция:');
    console.log('   Max-width:', styles.maxWidth);
    console.log('   Actual width:', heroWrapper.offsetWidth + 'px');
    console.log('   Margin:', styles.margin);
    console.log('   Padding:', styles.padding);
}

// Проверка About секции
const aboutGrid = document.querySelector('.about .content-grid');
if (aboutGrid) {
    const styles = window.getComputedStyle(aboutGrid);
    console.log('\n👤 ABOUT секция:');
    console.log('   Max-width:', styles.maxWidth);
    console.log('   Actual width:', aboutGrid.offsetWidth + 'px');
    console.log('   Margin:', styles.margin);
    console.log('   Padding:', styles.padding);
}

// Проверка Services секции (основная проблема)
const servicesGrid = document.querySelector('.services-grid-3d');
if (servicesGrid) {
    const styles = window.getComputedStyle(servicesGrid);
    console.log('\n💼 SERVICES секция (критично!):');
    console.log('   Max-width:', styles.maxWidth);
    console.log('   Actual width:', servicesGrid.offsetWidth + 'px');
    console.log('   Margin:', styles.margin);
    console.log('   Gap:', styles.gap);
    console.log('   Grid columns:', styles.gridTemplateColumns);
    
    // Проверка карточек
    const cards = servicesGrid.querySelectorAll('.service-3d-card');
    if (cards.length > 0) {
        console.log('   Количество карточек:', cards.length);
        const firstCard = cards[0];
        console.log('   Ширина первой карточки:', firstCard.offsetWidth + 'px');
    }
}

// Проверка Timeline секции
const timelineContainer = document.querySelector('.timeline-section .container');
if (timelineContainer) {
    const styles = window.getComputedStyle(timelineContainer);
    console.log('\n📅 TIMELINE секция:');
    console.log('   Max-width:', styles.maxWidth);
    console.log('   Actual width:', timelineContainer.offsetWidth + 'px');
    console.log('   Margin:', styles.margin);
    console.log('   Padding:', styles.padding);
}

// Проверка Contact секции
const formContainer = document.querySelector('.form-container');
if (formContainer) {
    const styles = window.getComputedStyle(formContainer);
    console.log('\n📧 CONTACT секция:');
    console.log('   Max-width:', styles.maxWidth);
    console.log('   Actual width:', formContainer.offsetWidth + 'px');
    console.log('   Margin:', styles.margin);
}

// Проверка Map секции
const mapContainer = document.querySelector('.russia-map-container');
if (mapContainer) {
    const styles = window.getComputedStyle(mapContainer);
    console.log('\n🗺️ MAP секция:');
    console.log('   Max-width:', styles.maxWidth);
    console.log('   Actual width:', mapContainer.offsetWidth + 'px');
    console.log('   Margin:', styles.margin);
}

// Проверка Stats секции
const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    const styles = window.getComputedStyle(statsGrid);
    console.log('\n📊 STATS секция:');
    console.log('   Max-width:', styles.maxWidth);
    console.log('   Actual width:', statsGrid.offsetWidth + 'px');
    console.log('   Margin:', styles.margin);
    console.log('   Padding:', styles.padding);
}

// Проверка Footer секции
const footerContent = document.querySelector('.footer-content');
if (footerContent) {
    const styles = window.getComputedStyle(footerContent);
    console.log('\n🦶 FOOTER секция:');
    console.log('   Max-width:', styles.maxWidth);
    console.log('   Actual width:', footerContent.offsetWidth + 'px');
    console.log('   Margin:', styles.margin);
    console.log('   Padding:', styles.padding);
}

console.log('\n✅ Проверка завершена!');
console.log('⚠️  Если Actual width > Max-width, значит есть проблема!');

