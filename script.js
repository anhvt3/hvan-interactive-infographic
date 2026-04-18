// --- Interactive Scrollytelling Engine ---

// Elements
const progressBar = document.getElementById('progress-bar');
const historyGraphic = document.getElementById('history-graphic');
const dateDisplay = historyGraphic ? historyGraphic.querySelector('.date-display') : null;

// Update Progress Bar
window.addEventListener('scroll', () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
    if (progressBar) {
        progressBar.style.width = scrolled;
    }
});

// Initialize Scrollama
const scroller = scrollama();

function initScrollama() {
    // History Section Scroller
    scroller
        .setup({
            step: '.step',          // Target all step elements
            offset: 0.6,            // Trigger when step crosses 60% of viewport from top
            debug: false             // Set to true to see trigger line during dev
        })
        .onStepEnter(response => {
            // response = { element, direction, index }
            
            // 1. Add active class to current step (fades in, slides up)
            // First remove is-active from all steps
            document.querySelectorAll('.step').forEach(el => el.classList.remove('is-active'));
            // Then add to current
            response.element.classList.add('is-active');

            // 2. Handle History Sticky Graphic changes
            const parentSection = response.element.closest('section');
            if (parentSection && parentSection.id === 'scrolly-history') {
                const dateData = response.element.getAttribute('data-date');
                const colorData = response.element.getAttribute('data-color');
                
                if (dateDisplay && dateData) {
                    dateDisplay.textContent = dateData;
                }
                if (historyGraphic && colorData) {
                    historyGraphic.style.backgroundColor = colorData;
                }
            }

            // 3. Handle Dak Lak Section (if we had specific changes inside the sticky-bg)
            if (parentSection && parentSection.id === 'scrolly-daklak') {
                // Here we could change the background image based on step index 
                // e.g. document.getElementById('daklak-visual-img').src = 'new-image.png';
            }
        })
        .onStepExit(response => {
             // Optional: Handle what happens when a step leaves the viewport completely
             // response.element.classList.remove('is-active'); 
             // We keep it active while inside, or remove it. For 'E-Magazine' feel usually we let the next step take over.
        });

    // Handle Resize
    window.addEventListener('resize', scroller.resize);
}

// Ensure DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initScrollama();
    
    // Fallback animation trigger for elements that fade-up but aren't scrollama steps
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    document.querySelectorAll('.fade-up:not(header *)').forEach(el => {
        el.style.animationPlayState = 'paused'; // pause until scrolled into view
        observer.observe(el);
    });
});
