// Functions for the contact section
function initContactSection() {
    console.log("Initializing Contact Section...");

    // --- Scroll Animation Trigger ---
    const contactSection = document.querySelector('.contact-section');
    let animationTriggered = false; // Flag to trigger only once

    function handleScrollAnimations() {
        if (!contactSection || animationTriggered) return;

        const rect = contactSection.getBoundingClientRect();
        const isInViewport = rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0;

        if (isInViewport) {
            contactSection.classList.add('in-viewport'); // Add class to section itself

            // Animate elements within the section
            const animatedElements = contactSection.querySelectorAll('.animate');
            animatedElements.forEach((element, index) => {
                // Add a small delay based on index for staggered effect
                element.style.transitionDelay = `${index * 0.1}s`;
                element.classList.add('show');
            });

            animationTriggered = true; // Prevent re-triggering
            // Optional: remove listener if only needed once
            // window.removeEventListener('scroll', handleScrollAnimations);
            console.log("Contact section animations triggered.");
        }
    }

    // Initial check on load
    handleScrollAnimations();
    // Add scroll listener
    window.addEventListener('scroll', handleScrollAnimations, { passive: true });


    // --- Form Submission Handling ---
    const contactForm = document.querySelector('.contact-form-new .form-hexagon'); // Target the new form structure
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Contact form submitted (simulation).");

            // Get form data (using IDs assumed from old form structure)
            const nameInput = contactForm.querySelector('#name');
            const companyInput = contactForm.querySelector('#company');
            const cityInput = contactForm.querySelector('#city');
            const phoneInput = contactForm.querySelector('#phone');
            const messageInput = contactForm.querySelector('#message');

            // Basic validation example (add more robust validation)
            if (!nameInput || !phoneInput || !messageInput || !nameInput.value || !phoneInput.value || !messageInput.value) {
                 alert('Пожалуйста, заполните обязательные поля: Имя, Телефон, Сообщение.');
                 return;
            }

            const formData = {
                name: nameInput ? nameInput.value : '',
                company: companyInput ? companyInput.value : '',
                city: cityInput ? cityInput.value : '',
                phone: phoneInput ? phoneInput.value : '',
                message: messageInput ? messageInput.value : ''
            };

            // Simulate sending data
            console.log("Form Data:", formData);

            // --- Feedback to User ---
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            if (submitBtn) {
                const originalButtonContent = submitBtn.innerHTML; // Store original content

                // Disable button and show success state
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-pulse">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>ЗАЯВКА ОТПРАВЛЕНА</span>
                `;
                submitBtn.style.backgroundColor = '#4CAF50'; // Green background for success
                submitBtn.style.cursor = 'not-allowed';

                // Reset form fields
                contactForm.reset();
                // Trigger blur on inputs to reset focus effect if needed
                contactForm.querySelectorAll('.form-control').forEach(input => input.blur());


                // Reset button after a delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalButtonContent;
                    submitBtn.style.backgroundColor = ''; // Reset background
                    submitBtn.style.cursor = 'pointer';
                }, 4000); // Reset after 4 seconds
            }
        });
    } else {
        console.warn("Contact form element not found.");
    }


    // --- Input Field Focus/Blur Effects ---
    const formInputs = document.querySelectorAll('.contact-form-new .form-control');
    formInputs.forEach(input => {
        const focusEffect = input.nextElementSibling; // Assuming effect element is the next sibling

        if (focusEffect && focusEffect.classList.contains('form-focus-effect')) {
            input.addEventListener('focus', function() {
                // Animate the focus effect line
                focusEffect.style.width = '100%';
                focusEffect.style.left = '0';
            });

            input.addEventListener('blur', function() {
                // Reset the focus effect line only if the input is empty
                if (!this.value) {
                    focusEffect.style.width = '0';
                    focusEffect.style.left = '50%';
                }
            });
        } else {
             // console.warn("Focus effect element not found for input:", input);
        }
    });

    console.log("Contact Section Initialized.");
}

// Удаляю экспорт в конце файла и заменяю на вызов функции при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initContactSection();
});