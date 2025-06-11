// Function to create static particles in the hero section
function initHeroParticles() {
    const particlesContainer = document.getElementById('hero-particles'); // Target specific ID
    const particlesCount = 25; // Adjusted count

    if (particlesContainer) {
        // Clear container before adding new particles (optional, prevents duplicates on hot reload)
        particlesContainer.innerHTML = '';
        console.log(`Initializing ${particlesCount} hero particles...`);

        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle'); // Use the class defined in hero.css

            // Random size (adjust range as needed)
            const size = Math.random() * 8 + 2; // 2px to 10px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random position within the container
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`; // Start particles all over

            // Random animation duration and delay (using CSS animation 'float')
            const duration = 15 + Math.random() * 15; // 15s to 30s
            const delay = Math.random() * 15; // 0s to 15s delay
            // Apply animation directly via style - CSS animation 'float' should be defined in hero.css or animations.css
            particle.style.animation = `float ${duration}s linear ${delay}s infinite`;

            // Random initial opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1; // 0.1 to 0.6

            particlesContainer.appendChild(particle);
        }
    } else {
        console.warn("Hero particles container '#hero-particles' not found.");
    }
}


// Function to initialize GSAP blob animations for the hero section
function initHeroGSAP() {
    // Check if GSAP and MotionPathPlugin are loaded
    if (typeof gsap === 'undefined' || typeof MotionPathPlugin === 'undefined') {
        console.error("GSAP or MotionPathPlugin is not loaded. Hero blob animations cannot start.");
        return;
    }

    gsap.registerPlugin(MotionPathPlugin); // Register plugin

    const hero = document.querySelector('.hero');
    if (!hero) {
        console.error("Hero section element '.hero' not found.");
        return;
    }

    // Check if blobs container already exists, if not create it
    let blobsContainer = hero.querySelector('.lava-blobs');
    if (!blobsContainer) {
        blobsContainer = document.createElement('div');
        blobsContainer.className = 'lava-blobs';
        // Prepend to be behind other hero content if needed, or append
        hero.insertBefore(blobsContainer, hero.firstChild);
        console.log("Created .lava-blobs container.");
    } else {
        blobsContainer.innerHTML = ''; // Clear existing blobs if re-initializing
    }


    // Function to create a single blob element
    const createBlob = (size) => {
        const blob = document.createElement('div');
        blob.className = 'lava-blob';
        Object.assign(blob.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 80 + 10}%`, // Avoid edges initially
            top: `${Math.random() * 80 + 10}%`,
            position: 'absolute', // Ensure position is absolute
            borderRadius: `${40 + Math.random() * 20}%`, // Initial random shape
            opacity: 0 // Start invisible
        });
        blobsContainer.appendChild(blob);
        return blob;
    };

    // Function to animate a single blob
    const animateBlob = (blob) => {
        const duration = 15 + Math.random() * 10; // Longer duration (15-25s)
        const movementRangeX = window.innerWidth * 0.2; // Movement range based on viewport width
        const movementRangeY = window.innerHeight * 0.15; // Movement range based on viewport height

        // Random path points relative to current position
        const path = [
            { x: "+=0", y: "+=0" }, // Start at current position
            { x: `+=${(Math.random() - 0.5) * movementRangeX}`, y: `+=${(Math.random() - 0.5) * movementRangeY}` },
            { x: `+=${(Math.random() - 0.5) * movementRangeX}`, y: `+=${(Math.random() - 0.5) * movementRangeY}` },
            { x: "+=0", y: "+=0" } // Return to start (or close to it)
        ];

        // Movement Animation using MotionPath
        gsap.to(blob, {
            motionPath: {
                path: path,
                curviness: 1.5,
                autoRotate: false // Keep blob upright if desired
            },
            duration: duration,
            ease: "sine.inOut", // Smoother easing
            repeat: -1,
            yoyo: true // Move back and forth along the path
        });

        // Shape Morphing Animation (Radius)
        gsap.to(blob, {
            duration: duration * (0.6 + Math.random() * 0.3), // Slightly varying duration
            borderRadius: () => `${40 + Math.random() * 40}% / ${40 + Math.random() * 40}%`, // More complex radius changes
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });

         // Scale Animation
         gsap.to(blob, {
            duration: duration * (0.8 + Math.random() * 0.4),
            scale: () => 0.8 + Math.random() * 0.5, // Scale between 0.8 and 1.3
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });

        // Fade In Animation
        gsap.to(blob, {
            opacity: () => 0.3 + Math.random() * 0.4, // Fade in to random opacity (0.3-0.7)
            duration: 3 + Math.random() * 2, // Fade in duration (3-5s)
            ease: "power1.inOut"
        });
    };

    // Create and animate multiple blob objects
    const blobSizes = [180, 280, 220, 150]; // Different sizes
    blobSizes.forEach((size) => {
        const blob = createBlob(size);
        animateBlob(blob);
    });

    console.log("GSAP Hero blob animations initialized.");
}

// Удаляю экспорт в конце файла и заменяю на вызов функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initHeroParticles();
    
    // Проверяем, загружен ли GSAP и плагин MotionPath
    if (typeof gsap !== 'undefined') {
        // Проверка наличия MotionPath плагина
        if (typeof MotionPathPlugin === 'undefined') {
            console.log('GSAP MotionPathPlugin не загружен, используем упрощенную анимацию');
        } else {
            // Если есть и GSAP, и MotionPathPlugin
            initHeroGSAP();
        }
    }
});