// 🔍 ПРОСТАЯ ДИАГНОСТИКА - скопируйте и вставьте в консоль
// F12 → Console → наберите "allow pasting" → вставьте этот код

console.log('🔍 ДИАГНОСТИКА АДАПТИВНОСТИ');
console.log('Экран:', window.innerWidth + 'x' + window.innerHeight);

// Проверка всех секций
const sections = [
    { name: 'Hero', selector: '.hero-wrapper' },
    { name: 'About', selector: '.about .content-grid' },
    { name: 'Services', selector: '.services-grid-3d' },
    { name: 'Timeline', selector: '.timeline-section .container' },
    { name: 'Contact', selector: '.form-container' },
    { name: 'Map', selector: '.russia-map-container' },
    { name: 'Stats', selector: '.stats-grid' },
    { name: 'Footer', selector: '.footer-content' }
];

sections.forEach(s => {
    const el = document.querySelector(s.selector);
    if (el) {
        const styles = window.getComputedStyle(el);
        const maxW = styles.maxWidth;
        const actualW = el.offsetWidth;
        const status = (maxW === 'none' || parseFloat(maxW) === 0 || actualW > parseFloat(maxW)) ? '❌' : '✅';
        console.log(`${status} ${s.name}: max=${maxW}, actual=${actualW}px`);
    } else {
        console.log(`⚠️ ${s.name}: не найден`);
    }
});

// Детальная проверка Services
const grid = document.querySelector('.services-grid-3d');
if (grid) {
    const st = window.getComputedStyle(grid);
    console.log('\n💼 SERVICES детально:');
    console.log('   Max-width:', st.maxWidth);
    console.log('   Actual:', grid.offsetWidth + 'px');
    const cards = grid.querySelectorAll('.service-3d-card');
    if (cards.length > 0) {
        console.log('   Карточка:', cards[0].offsetWidth + 'px');
    }
}

console.log('\n✅ Готово!');

