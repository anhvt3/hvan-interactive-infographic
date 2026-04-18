document.addEventListener('DOMContentLoaded', () => {

    // --- 1. HERO ANIMATIONS ---
    setTimeout(() => {
        const heroTexts = document.querySelectorAll('#hero .animate-text');
        heroTexts.forEach(text => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
            text.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        });
    }, 100);

    // --- 2. SCROLLAMA INTIALIZATION ---
    // Instantiate the scrollama
    const scrollerHistory = scrollama();
    const scrollerDaklak = scrollama();

    // Variables for History visual
    const historyFigure = document.querySelector('#history-graphic');
    const dateDisplay = document.querySelector('.date-display');

    // History Setup
    scrollerHistory
        .setup({
            step: '#scrolly-history article .step',
            offset: 0.5, // trigger at 50% of screen height
            debug: false
        })
        .onStepEnter((response) => {
            // response = { element, direction, index }
            
            // Remove active class from all steps
            const allSteps = document.querySelectorAll('#scrolly-history article .step');
            allSteps.forEach(el => el.classList.remove('is-active'));
            
            // Add active class to current step
            response.element.classList.add('is-active');
            
            // Update Graphic based on step dataset
            const dateStr = response.element.getAttribute('data-date');
            const bgColor = response.element.getAttribute('data-color');
            
            // Update DOM
            dateDisplay.innerText = dateStr;
            historyFigure.style.backgroundColor = bgColor;
            
            // simple visual effect
            dateDisplay.style.transform = 'scale(1.1)';
            setTimeout(() => {
                dateDisplay.style.transform = 'scale(1)';
            }, 300);
        });

    // Variables for DakLak visual
    const daklakImage = document.querySelector('#daklak-visual-img');
    const daklakOverlay = document.querySelector('.daklak-overlay-filter');

    // Daklak Setup
    scrollerDaklak
        .setup({
            step: '#scrolly-daklak article .step',
            offset: 0.7,
            debug: false
        })
        .onStepEnter((response) => {
            const allSteps = document.querySelectorAll('#scrolly-daklak article .step');
            allSteps.forEach(el => el.classList.remove('is-active'));
            response.element.classList.add('is-active');

            const stepIndex = response.element.getAttribute('data-step');
            
            if(stepIndex === 'dl-1') {
                daklakImage.style.transform = 'scale(1)';
                daklakOverlay.style.background = 'linear-gradient(to right, rgba(0,0,0,0.9) 30%, rgba(200,16,46,0.3) 100%)';
            } else if(stepIndex === 'dl-2') {
                daklakImage.style.transform = 'scale(1.1)';
                daklakOverlay.style.background = 'linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(200,16,46,0.4) 100%)';
            } else if(stepIndex === 'dl-3') {
                daklakImage.style.transform = 'scale(1.2)';
                daklakImage.style.filter = 'sepia(0) hue-rotate(0deg) contrast(1.1)';
                daklakOverlay.style.background = 'linear-gradient(to right, rgba(0,0,0,0.8) 50%, rgba(200,16,46,0.1) 100%)';
            } else if(stepIndex === 'dl-4') {
                daklakImage.style.transform = 'scale(1.05)';
                daklakOverlay.style.background = 'linear-gradient(to right, rgba(0,0,0,0.95) 20%, rgba(200,16,46,0.3) 100%)';
            }
        });

    // Resize observer to update scrollama on window resize
    window.addEventListener('resize', () => {
        scrollerHistory.resize();
        scrollerDaklak.resize();
    });

    // --- 3. OTHER ANIMATIONS ---
    // Intersection Observer for generic fade-up elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Parallax effect for visuals
    const parallaxImages = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        parallaxImages.forEach(img => {
            const speed = img.getAttribute('data-speed');
            img.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
});
