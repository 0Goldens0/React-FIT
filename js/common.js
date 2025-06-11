// Initialize back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) { // Show after scrolling 300px
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true }); // Use passive listener for performance

        // Scroll smoothly to top on click
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        console.log("Back to top button initialized.");
    } else {
        console.warn("Back to top button element (#backToTop) not found.");
    }
}

// Initialize smooth scrolling for anchor links
function initSmoothScroll() {
    // Select all anchor links starting with '#' but not just '#'
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault(); // Prevent default jump

                // Calculate position, considering fixed header height (adjust 80 if needed)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Optional: Close mobile menu if open after clicking a link
                const menuToggle = document.querySelector('.nav-toggle');
                const mainNav = document.querySelector('.main-nav');
                const overlay = document.querySelector('.overlay');
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });
    console.log("Smooth scroll initialized for anchor links.");
}

// Initialize click handlers for partner logos
function initPartnerLogoClicks() {
    const partnerLogos = document.querySelectorAll('.partner-logo');

    if (partnerLogos.length > 0) {
        partnerLogos.forEach(logo => {
            logo.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default if it's a link
                // Get partner name from the alt attribute of the image inside the logo container
                const img = this.querySelector('img');
                const partnerName = img ? img.getAttribute('alt') : 'Неизвестный партнер';
                // Placeholder action - replace with actual navigation or modal
                alert(`Вы выбрали партнера: ${partnerName}\nВ будущем здесь будет переход на страницу партнера или отображение информации.`);
                console.log(`Partner logo clicked: ${partnerName}`);
            });
        });
        console.log("Partner logo click handlers initialized.");
    } else {
        console.warn("No partner logos found with class '.partner-logo'.");
    }
}


// Tilt.js Library Code (Included as requested, though ideally separate)
// --- START OF TILT.JS ---
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        // Ensure jQuery is loaded
        if (typeof jQuery === 'undefined') {
            console.error("Tilt.js requires jQuery. Please include jQuery before Tilt.js.");
            return;
        }
        factory(jQuery);
    }
}(function ($) {
    $.fn.tilt = function (options) {

        /**
         * RequestAnimationFrame
         */
        const requestTick = function() {
            if (this.ticking) return;
            // Use window.requestAnimationFrame for broader compatibility
            window.requestAnimationFrame(updateTransforms.bind(this));
            this.ticking = true;
        };

        /**
         * Bind mouse movement evens on instance
         */
        const bindEvents = function() {
            const _this = this;
            $(this).on('mousemove.tilt', mouseMove); // Add namespace
            $(this).on('mouseenter.tilt', mouseEnter);
            if (this.settings.reset) $(this).on('mouseleave.tilt', mouseLeave);
            if (this.settings.glare) $(window).on('resize.tilt', updateGlareSize.bind(_this));
        };

        /**
         * Set transition only on mouse leave and mouse enter so it doesn't influence mouse move transforms
         */
        const setTransition = function() {
            if (this.timeout !== undefined) clearTimeout(this.timeout);
            $(this).css({'transition': `${this.settings.speed}ms ${this.settings.easing}`});
            if(this.settings.glare && this.glareElement) this.glareElement.css({'transition': `opacity ${this.settings.speed}ms ${this.settings.easing}`});
            this.timeout = setTimeout(() => {
                $(this).css({'transition': ''});
                if(this.settings.glare && this.glareElement) this.glareElement.css({'transition': ''});
            }, this.settings.speed);
        };

        /**
         * When user mouse enters tilt element
         */
        const mouseEnter = function(event) {
            this.ticking = false;
            $(this).css({'will-change': 'transform'});
            setTransition.call(this);

            // Trigger change event
            $(this).trigger("tilt.mouseEnter");
        };

        /**
         * Return the x,y position of the mouse on the tilt element
         * @returns {{x: *, y: *}}
         */
        const getMousePositions = function(event) {
            if (typeof(event) === "undefined") {
                // Fallback if no event is passed (e.g., on reset)
                event = {
                    pageX: $(this).offset().left + $(this).outerWidth() / 2,
                    pageY: $(this).offset().top + $(this).outerHeight() / 2
                };
            }
            return {x: event.pageX, y: event.pageY};
        };

        /**
         * When user mouse moves over the tilt element
         */
        const mouseMove = function(event) {
            this.mousePositions = getMousePositions(event);
            requestTick.call(this);
        };

        /**
         * When user mouse leaves tilt element
         */
        const mouseLeave = function() {
            setTransition.call(this);
            this.reset = true;
            requestTick.call(this);

            // Trigger change event
            $(this).trigger("tilt.mouseLeave");
        };

        /**
         * Get tilt values
         *
         * @returns {{x: tilt value, y: tilt value}}
         */
        const getValues = function() {
            const width = $(this).outerWidth();
            const height = $(this).outerHeight();
            const left = $(this).offset().left;
            const top = $(this).offset().top;

            // Handle potential division by zero if width/height is 0
            const percentageX = width === 0 ? 0.5 : (this.mousePositions.x - left) / width;
            const percentageY = height === 0 ? 0.5 : (this.mousePositions.y - top) / height;

            // x or y position inside instance / width of instance = percentage of position inside instance * the max tilt value
            const tiltX = ((this.settings.maxTilt / 2) - (percentageX * this.settings.maxTilt)).toFixed(2);
            const tiltY = ((percentageY * this.settings.maxTilt) - (this.settings.maxTilt / 2)).toFixed(2);

            // angle
            const angle = Math.atan2(this.mousePositions.x - (left + width / 2), -(this.mousePositions.y - (top + height / 2))) * (180 / Math.PI);

            // Return x & y tilt values
            return {tiltX, tiltY, 'percentageX': percentageX * 100, 'percentageY': percentageY * 100, angle};
        };

        /**
         * Update tilt transforms on mousemove
         */
        const updateTransforms = function() {
            // Ensure mousePositions is defined
            if (!this.mousePositions && !this.reset) return;

            this.transforms = this.reset ? { tiltX: 0, tiltY: 0, angle: 0, percentageY: 0 } : getValues.call(this);

            if (this.reset) {
                this.reset = false;
                $(this).css('transform', `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`); // Reset scale too

                // Rotate glare if enabled
                if (this.settings.glare && this.glareElement){
                    this.glareElement.css('transform', `rotate(180deg) translate(-50%, -50%)`);
                    this.glareElement.css('opacity', `0`);
                }

            } else {
                $(this).css('transform', `perspective(${this.settings.perspective}px) rotateX(${this.settings.disableAxis === 'x' ? 0 : this.transforms.tiltY}deg) rotateY(${this.settings.disableAxis === 'y' ? 0 : this.transforms.tiltX}deg) scale3d(${this.settings.scale},${this.settings.scale},${this.settings.scale})`);

                // Rotate glare if enabled
                if (this.settings.glare && this.glareElement){
                    this.glareElement.css('transform', `rotate(${this.transforms.angle}deg) translate(-50%, -50%)`);
                    // Ensure percentageY is not NaN or undefined
                    const glareOpacity = (isNaN(this.transforms.percentageY) ? 0 : this.transforms.percentageY) * this.settings.maxGlare / 100;
                    this.glareElement.css('opacity', `${glareOpacity}`);
                }
            }

            // Trigger change event
            $(this).trigger("tiltChange", [this.transforms]); // Use a more specific event name

            this.ticking = false;
        };

        /**
         * Prepare elements
         */
        const prepareGlare = function () {
            const glarePrerender = this.settings.glarePrerender;

            // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
            if (!glarePrerender && $(this).find('.js-tilt-glare').length === 0) {
                // Create glare element only if it doesn't exist
                $(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>');
            }

            // Store glare selector if glare is enabled
            this.glareElementWrapper = $(this).find(".js-tilt-glare");
            this.glareElement = $(this).find(".js-tilt-glare-inner");

            // Remember? We assume all css is already set, so just return
            if (glarePrerender || !this.glareElement.length) return; // Exit if prerendered or element not found

            // Abstracted re-usable glare styles
            const stretch = {
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
            };

            // Style glare wrapper
            this.glareElementWrapper.css(stretch).css({
                'overflow': 'hidden',
                'pointer-events': 'none',
                'border-radius': $(this).css('border-radius') // Match parent border-radius
            });

            // Style glare element
            this.glareElement.css({
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                'background-image': `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
                'width': `${$(this).outerWidth()*2}px`, // Add px unit
                'height': `${$(this).outerWidth()*2}px`, // Add px unit
                'transform': 'rotate(180deg) translate(-50%, -50%)',
                'transform-origin': '0% 0%',
                'opacity': '0',
            });
        };

        /**
         * Update glare on resize
         */
        const updateGlareSize = function () {
            // Check if glareElement exists
            if (this.settings.glare && this.glareElement && this.glareElement.length) {
                this.glareElement.css({
                    'width': `${$(this).outerWidth()*2}px`, // Add px unit
                    'height': `${$(this).outerWidth()*2}px`, // Add px unit
                });
            }
        };

        /**
         * Public methods
         */
        // Use a namespace for methods to avoid conflicts
        $.fn.tilt.destroy = function() {
            $(this).each(function () {
                const $this = $(this);
                $this.find('.js-tilt-glare').remove();
                $this.css({'will-change': '', 'transform': ''});
                $this.off('.tilt'); // Remove namespaced events
                $this.removeData('settings'); // Remove stored settings
            });
        };

        $.fn.tilt.getValues = function() {
            const results = [];
            $(this).each(function () {
                this.mousePositions = getMousePositions.call(this);
                results.push(getValues.call(this));
            });
            return results;
        };

        $.fn.tilt.reset = function() {
            $(this).each(function () {
                this.mousePositions = getMousePositions.call(this);
                this.settings = $(this).data('settings');
                if (this.settings) { // Ensure settings exist
                    mouseLeave.call(this);
                    setTimeout(() => {
                        this.reset = false;
                    }, this.settings.speed); // Use speed for transition duration
                }
            });
        };

        /**
         * Loop every instance
         */
        return this.each(function () {
            // Check if already initialized
            if ($(this).data('tilt-initialized')) return;

            /**
             * Default settings merged with user settings
             * Can be set trough data attributes or as parameter.
             * @type {*}
             */
            // Use plain object for defaults to avoid modifying jQuery's internal data
            const defaults = {
                maxTilt: 20,
                perspective: 300,
                easing: 'cubic-bezier(.03,.98,.52,.99)',
                scale: 1,
                speed: 400,
                transition: true,
                disableAxis: null,
                axis: null, // Deprecated
                reset: true,
                glare: false,
                maxGlare: 1,
                glarePrerender: false // New option
            };

            // Read settings from data attributes
            const dataSettings = {};
            for (const key in defaults) {
                const dataAttr = `tilt-${key.toLowerCase()}`;
                if ($(this).is(`[data-${dataAttr}]`)) {
                    // Attempt to parse JSON-like values (numbers, booleans)
                    let value = $(this).data(dataAttr);
                    try {
                        value = JSON.parse(value.toString().toLowerCase());
                    } catch (e) {
                        // Keep as string if parsing fails
                    }
                     dataSettings[key] = value;
                }
            }


            this.settings = $.extend({}, defaults, dataSettings, options);


            // Add deprecation warning & set disableAxis to deprecated axis setting
            if(this.settings.axis !== null){
                console.warn('Tilt.js: the axis setting has been renamed to disableAxis. See https://github.com/gijsroge/tilt.js/pull/26 for more information');
                this.settings.disableAxis = this.settings.axis;
            }

            this.init = () => {
                // Store settings
                $(this).data('settings', this.settings);

                // Prepare element
                if(this.settings.glare) prepareGlare.call(this);

                // Bind events
                bindEvents.call(this);

                // Mark as initialized
                $(this).data('tilt-initialized', true);
            };

            // Init
            this.init();

        });
    };

    /**
     * Auto load based on data attribute
     * Ensure this runs after DOM is ready if jQuery is loaded async
     */
     // $(function() { // Wrap in jQuery's ready function
     //    $('[data-tilt]').tilt();
     // });
     // Auto-init is now handled by calling initTilt() in index.js

    // Return true if plugin loads successfully
    return true;
}));
// --- END OF TILT.JS ---


// Function to initialize Tilt.js on elements that require it
function initTilt() {
    // Check if jQuery is loaded
    if (typeof jQuery === 'undefined') {
        console.warn("jQuery not found. Tilt.js effects will not be applied.");
        return;
    }
    // Check if tilt plugin is loaded
    if (typeof $.fn.tilt !== 'function') {
         console.warn("Tilt.js plugin not found. Tilt effects will not be applied.");
         return;
    }

    // Select elements you want to apply the tilt effect to
    // Example: Apply to service cards or specific images
    const tiltElements = document.querySelectorAll('[data-tilt]'); // Use data-tilt attribute

    if (tiltElements.length > 0) {
        $(tiltElements).tilt({
            maxTilt: 15,        // Max tilt rotation (degrees)
            perspective: 1000,    // Transform perspective, the lower the more extreme the tilt gets.
            easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit
            scale: 1.02,      // 1.1 = 110% scale
            speed: 400,       // Speed of the enter/exit transition
            transition: true,      // Set a transition on enter/exit.
            disableAxis: null,      // What axis should be disabled. Can be X or Y.
            reset: true,      // If the tilt effect has to be reset on exit.
            glare: true,      // Enables glare effect
            maxGlare: 0.4       // From 0 - 1.
        });
        console.log(`Tilt.js initialized for ${tiltElements.length} elements.`);
    } else {
        console.log("No elements found with [data-tilt] attribute for Tilt.js initialization.");
    }
}

// Генерация анимированных частиц для блока "О нас"
function createAboutParticles() {
    const particlesContainer = document.getElementById('about-particles');
    if (!particlesContainer) return;
    
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные позиции и задержки
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Дополнительные интерактивные эффекты для CTA кнопки
function initAboutInteractions() {
    const ctaButton = document.querySelector('.about .cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            }, 150);
        });
    }
}

// Удаляю экспорт в конце файла и заменяю на вызов функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
    initSmoothScroll();
    initPartnerLogoClicks();
    
    // Проверяем, есть ли jQuery перед инициализацией Tilt
    if (typeof jQuery !== 'undefined') {
        initTilt();
    }
});