// 🔍 ДЕТАЛЬНАЯ ДИАГНОСТИКА адаптивности
// Запустите в консоли браузера (F12 → Console)

console.log('═══════════════════════════════════════════════════════');
console.log('🔍 ДЕТАЛЬНАЯ ДИАГНОСТИКА АДАПТИВНОСТИ');
console.log('═══════════════════════════════════════════════════════\n');

// 1. Информация о экране
console.log('📐 ИНФОРМАЦИЯ О ЭКРАНЕ:');
console.log('   Разрешение viewport:', window.innerWidth, 'x', window.innerHeight);
console.log('   Разрешение экрана:', screen.width, 'x', screen.height);
console.log('   Device Pixel Ratio:', window.devicePixelRatio);
console.log('   Масштаб браузера:', Math.round(window.devicePixelRatio * 100) + '%');
console.log('   User Agent:', navigator.userAgent);
console.log('');

// 2. Проверка базовых стилей
console.log('🎨 БАЗОВЫЕ СТИЛИ:');
const html = document.documentElement;
const htmlStyles = window.getComputedStyle(html);
console.log('   HTML font-size:', htmlStyles.fontSize);
console.log('   HTML font-size должен быть: 16px');
if (htmlStyles.fontSize !== '16px') {
    console.warn('   ⚠️ ПРОБЛЕМА: font-size не 16px!');
}
console.log('');

// 3. ДЕТАЛЬНАЯ ПРОВЕРКА SERVICES (основная проблема)
console.log('💼 SERVICES СЕКЦИЯ (КРИТИЧНО!):');
const servicesSection = document.querySelector('.services-new');
const servicesGrid = document.querySelector('.services-grid-3d');

if (servicesGrid) {
    const styles = window.getComputedStyle(servicesGrid);
    const parentStyles = servicesSection ? window.getComputedStyle(servicesSection) : null;
    
    console.log('   ✅ Элемент найден');
    console.log('   Max-width (computed):', styles.maxWidth);
    console.log('   Max-width (inline):', servicesGrid.style.maxWidth || '(не установлен)');
    console.log('   Width (computed):', styles.width);
    console.log('   Actual width:', servicesGrid.offsetWidth + 'px');
    console.log('   Margin:', styles.margin);
    console.log('   Margin-left:', styles.marginLeft);
    console.log('   Margin-right:', styles.marginRight);
    console.log('   Padding:', styles.padding);
    console.log('   Gap:', styles.gap);
    console.log('   Grid columns:', styles.gridTemplateColumns);
    console.log('   Display:', styles.display);
    
    // Проверка родителя
    if (parentStyles) {
        console.log('   └─ Родитель (.services-new):');
        console.log('      Width:', parentStyles.width);
        console.log('      Max-width:', parentStyles.maxWidth);
        console.log('      Padding:', parentStyles.padding);
    }
    
    // Проверка всех карточек
    const cards = servicesGrid.querySelectorAll('.service-3d-card');
    console.log('   └─ Карточки:');
    console.log('      Количество:', cards.length);
    if (cards.length > 0) {
        cards.forEach((card, index) => {
            const cardStyles = window.getComputedStyle(card);
            console.log(`      Карточка ${index + 1}:`);
            console.log(`         Width: ${card.offsetWidth}px`);
            console.log(`         Computed width: ${cardStyles.width}`);
            console.log(`         Flex-basis: ${cardStyles.flexBasis}`);
            console.log(`         Flex-grow: ${cardStyles.flexGrow}`);
            console.log(`         Min-width: ${cardStyles.minWidth}`);
        });
    }
    
    // Проверка медиа-запросов
    console.log('   └─ Проверка медиа-запросов:');
    const mediaQueries = window.matchMedia('(max-width: 1600px)');
    console.log('      (max-width: 1600px):', mediaQueries.matches ? '✅ Активен' : '❌ Не активен');
    const mq1399 = window.matchMedia('(max-width: 1399px)');
    console.log('      (max-width: 1399px):', mq1399.matches ? '✅ Активен' : '❌ Не активен');
    const mq1200 = window.matchMedia('(max-width: 1200px)');
    console.log('      (max-width: 1200px):', mq1200.matches ? '✅ Активен' : '❌ Не активен');
    
    // Проблемы?
    const maxWidth = parseFloat(styles.maxWidth);
    const actualWidth = servicesGrid.offsetWidth;
    
    if (isNaN(maxWidth) || maxWidth === 0) {
        console.error('   ❌ КРИТИЧЕСКАЯ ПРОБЛЕМА: max-width не установлен!');
    } else if (actualWidth > maxWidth) {
        console.error(`   ❌ ПРОБЛЕМА: actual width (${actualWidth}px) > max-width (${maxWidth}px)`);
    } else {
        console.log('   ✅ Всё в порядке: actual width <= max-width');
    }
} else {
    console.error('   ❌ Элемент .services-grid-3d не найден!');
}
console.log('');

// 4. Проверка всех секций
console.log('📋 ПРОВЕРКА ВСЕХ СЕКЦИЙ:');
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

sections.forEach(section => {
    const element = document.querySelector(section.selector);
    if (element) {
        const styles = window.getComputedStyle(element);
        const maxWidth = styles.maxWidth;
        const actualWidth = element.offsetWidth;
        
        console.log(`   ${section.name}:`);
        console.log(`      Max-width: ${maxWidth}`);
        console.log(`      Actual width: ${actualWidth}px`);
        console.log(`      Margin: ${styles.margin}`);
        
        if (maxWidth === 'none' || parseFloat(maxWidth) === 0) {
            console.error(`      ❌ ПРОБЛЕМА: max-width не установлен!`);
        } else {
            const maxW = parseFloat(maxWidth);
            if (actualWidth > maxW) {
                console.error(`      ❌ ПРОБЛЕМА: превышает max-width на ${actualWidth - maxW}px`);
            } else {
                console.log(`      ✅ OK`);
            }
        }
    } else {
        console.warn(`   ${section.name}: элемент не найден (${section.selector})`);
    }
});
console.log('');

// 5. Проверка конфликтов стилей
console.log('🔍 ПРОВЕРКА КОНФЛИКТОВ СТИЛЕЙ:');
if (servicesGrid) {
    // Проверяем все CSS правила для этого элемента
    const rules = [];
    for (let sheet of document.styleSheets) {
        try {
            for (let rule of sheet.cssRules || sheet.rules || []) {
                if (rule.selectorText && servicesGrid.matches(rule.selectorText)) {
                    rules.push({
                        selector: rule.selectorText,
                        maxWidth: rule.style.maxWidth || 'не установлен',
                        source: sheet.href || 'inline'
                    });
                }
            }
        } catch (e) {
            // Игнорируем ошибки CORS
        }
    }
    
    console.log('   Правила для .services-grid-3d:');
    rules.forEach((rule, index) => {
        console.log(`   ${index + 1}. ${rule.selector}`);
        console.log(`      Max-width: ${rule.maxWidth}`);
        console.log(`      Источник: ${rule.source}`);
    });
}
console.log('');

// 6. Итоговая рекомендация
console.log('═══════════════════════════════════════════════════════');
console.log('📊 ИТОГОВАЯ ДИАГНОСТИКА:');
console.log('═══════════════════════════════════════════════════════');

if (servicesGrid) {
    const styles = window.getComputedStyle(servicesGrid);
    const maxWidth = parseFloat(styles.maxWidth);
    const actualWidth = servicesGrid.offsetWidth;
    
    if (isNaN(maxWidth) || maxWidth === 0) {
        console.error('❌ ПРОБЛЕМА: max-width не применяется!');
        console.log('   Решение: Проверьте CSS файлы, возможно стили переопределяются');
    } else if (actualWidth > maxWidth) {
        console.error(`❌ ПРОБЛЕМА: Контент растягивается!`);
        console.log(`   Max-width: ${maxWidth}px`);
        console.log(`   Actual width: ${actualWidth}px`);
        console.log(`   Превышение: ${actualWidth - maxWidth}px`);
        console.log('   Решение: Проверьте родительские элементы или добавьте !important');
    } else {
        console.log('✅ Всё выглядит правильно!');
        console.log(`   Max-width: ${maxWidth}px`);
        console.log(`   Actual width: ${actualWidth}px`);
    }
}

console.log('\n💡 Совет: Если проблема остаётся, сделайте скриншот консоли и отправьте разработчику');

