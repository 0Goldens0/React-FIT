// Initialize map markers and interactions
function initMap() {
    const mapMarkers = document.querySelectorAll('.map-marker');
    const mapContainer = document.querySelector('.russia-map-container'); // Target the SVG container

    if (!mapContainer) {
        console.warn("Map container '.russia-map-container' not found.");
        return; // Exit if map container doesn't exist
    }

    if (mapMarkers.length === 0) {
        console.warn("No map markers found with class '.map-marker'.");
        // Don't necessarily exit, map might load dynamically later
    } else {
         console.log(`Initializing ${mapMarkers.length} map markers...`);
    }


    // Function to handle marker appearance animation
    const animateMarkersIn = () => {
        const markers = document.querySelectorAll('.map-marker'); // Re-select in case they were added dynamically
        markers.forEach((marker, index) => {
            // Ensure initial state for animation
            marker.style.opacity = '0';
            marker.style.transform = 'translate(-50%, -50%) scale(0.5)';
            marker.style.transition = 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Add ease-out and bounce

            // Staggered appearance animation
            setTimeout(() => {
                marker.style.opacity = '1';
                marker.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 500 + (index * 80)); // Start after 500ms, stagger by 80ms
        });
    };

    // Function to setup marker interactions
    const setupMarkerInteractions = () => {
        const markers = document.querySelectorAll('.map-marker');
        markers.forEach(marker => {
            const city = marker.getAttribute('data-city');
            let label = marker.querySelector('.marker-label');

            // Create label if it doesn't exist and city data is present
            if (!label && city) {
                label = document.createElement('div');
                label.className = 'marker-label';
                label.textContent = city;
                marker.appendChild(label);
            }

            // Click Handler (Placeholder)
            marker.addEventListener('click', function() {
                const city = this.getAttribute('data-city') || 'Неизвестный город';
                const type = this.classList.contains('distribution') ? 'Дистрибуция' :
                             this.classList.contains('service') ? 'Сервисный центр' :
                             this.classList.contains('office') ? 'Офис' : 'Точка';

                console.log(`Map Marker Clicked: Город: ${city} (Тип: ${type})`);

                // Example: Highlight clicked marker (optional)
                markers.forEach(m => m.classList.remove('active-marker')); // Remove active class from others
                this.classList.add('active-marker'); // Add active class to clicked

                // You could open a modal or sidebar with more info here
                // alert(`Информация о точке: ${city} (${type})`);
            });

            // Hover effects are handled by CSS (.map-marker:hover .marker-label)
        });
    };

    // --- Initialization Logic ---

    // 1. Animate existing markers
    animateMarkersIn();

    // 2. Setup interactions for existing markers
    setupMarkerInteractions();

    // Checkbox filtering
    const toggleDistribution = document.getElementById('toggle-distribution');
    const toggleService = document.getElementById('toggle-service');
    const toggleOffice = document.getElementById('toggle-office');

    function updateVisibility() {
        document.querySelectorAll('.map-marker.distribution').forEach(m => {
            m.style.display = toggleDistribution.checked ? 'block' : 'none';
        });
        document.querySelectorAll('.map-marker.service').forEach(m => {
            m.style.display = toggleService.checked ? 'block' : 'none';
        });
        document.querySelectorAll('.map-marker.office').forEach(m => {
            m.style.display = toggleOffice.checked ? 'block' : 'none';
        });
    }

    if (toggleDistribution) toggleDistribution.addEventListener('change', updateVisibility);
    if (toggleService) toggleService.addEventListener('change', updateVisibility);
    if (toggleOffice) toggleOffice.addEventListener('change', updateVisibility);

    updateVisibility();

    // Optional: If markers are added dynamically later (e.g., after SVG loads),
    // you might need a MutationObserver or a callback to re-run
    // animateMarkersIn() and setupMarkerInteractions() on the new markers.

    // Example for handling SVG load (if using <object>):
    const mapObject = mapContainer.querySelector('object.russia-map');
    if (mapObject) {
        mapObject.addEventListener('load', () => {
            console.log("SVG Map loaded via <object>.");
            // Potentially re-run initialization if markers are inside the SVG
            // const svgDoc = mapObject.contentDocument;
            // if (svgDoc) {
            //     const internalMarkers = svgDoc.querySelectorAll('.map-marker'); // Query inside SVG
            //     // ... setup interactions for internalMarkers ...
            // }
        });
    }

    console.log("Map initialization complete.");
}

// Удаляю экспорт в конце файла и заменяю на вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});