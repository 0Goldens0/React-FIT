// Initialize mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.main-nav .nav-link'); // Select links inside the nav

    if (menuToggle && mainNav && overlay) {
        console.log("Initializing mobile menu...");

        const toggleMenu = () => {
            const isActive = menuToggle.classList.contains('active');
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.classList.toggle('no-scroll', !isActive);
            // Accessibility: Update aria-expanded attribute
            menuToggle.setAttribute('aria-expanded', !isActive);
            mainNav.setAttribute('aria-hidden', isActive);
        };

        // Toggle menu on hamburger click
        menuToggle.addEventListener('click', toggleMenu);

        // Close menu on overlay click
        overlay.addEventListener('click', () => {
            if (menuToggle.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Close menu when a navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Only close if the menu is actually active (on mobile view)
                if (menuToggle.classList.contains('active')) {
                    // Add a small delay to allow scroll to start before closing
                    setTimeout(toggleMenu, 100);
                }
                // Smooth scroll is handled by initSmoothScroll in common.js
            });
        });

        // Close menu on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
                toggleMenu();
            }
        });

    } else {
        console.warn("Mobile menu elements (.nav-toggle, .main-nav, .overlay) not found. Mobile menu not initialized.");
    }
}

// Add a CSS class to body to prevent scrolling when menu is open
// Add this to your base.css or responsive.css
/*
body.no-scroll {
    overflow: hidden;
}
*/

// Удаляю экспорт в конце файла и заменяю на вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});