// ================================================
// INTERACTIVE SCROLLYTELLING ENGINE
// Timeline checkpoint animations + Progress bar
// ================================================

const progressBar = document.getElementById('progress-bar');
const timeline = document.getElementById('timeline');

// --- Progress Bar + Timeline fill (rAF throttled) ---
let scrollTicking = false;
function onScrollUpdate() {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollPx / winHeightPx) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';

    if (timeline) {
        const timelineTop = timeline.offsetTop;
        const timelineHeight = timeline.offsetHeight;
        const scrollRelative = scrollPx - timelineTop + window.innerHeight * 0.6;
        const progress = Math.max(0, Math.min(100, (scrollRelative / timelineHeight) * 100));
        timeline.style.setProperty('--timeline-progress', progress + '%');
    }
    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(onScrollUpdate);
        scrollTicking = true;
    }
}, { passive: true });

// --- Timeline Checkpoint Observer ---
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
});

timelineItems.forEach(item => timelineObserver.observe(item));

// --- Scrollama for Dak Lak Glass Cards ---
const scroller = scrollama();

function initScrollama() {
    scroller
        .setup({
            step: '.glass-card',
            offset: 0.6,
            debug: false
        })
        .onStepEnter(response => {
            document.querySelectorAll('.glass-card').forEach(el => el.classList.remove('is-active'));
            response.element.classList.add('is-active');
        });

    window.addEventListener('resize', scroller.resize);
}

// --- Responsibility Cards Reveal ---
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.old-paper-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// --- Quote Block Reveal ---
const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.quote-block').forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(40px)';
    block.style.transition = 'opacity 1s ease, transform 1s ease';
    quoteObserver.observe(block);
});

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
    initScrollama();
});
