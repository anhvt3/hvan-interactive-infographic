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
            offset: 0.75,
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

// --- Chapter Indicator Tracking ---
const chapterIndicator = document.getElementById('chapter-indicator');
const ciNum = document.getElementById('ci-num');
const ciTitle = document.getElementById('ci-title');
const chapters = document.querySelectorAll('.chapter');

const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const num = entry.target.dataset.chapterNum;
            const title = entry.target.dataset.chapterTitle;
            if (ciNum) ciNum.textContent = num;
            if (ciTitle) ciTitle.textContent = title;
            if (chapterIndicator) chapterIndicator.classList.add('visible');
        }
    });
}, { threshold: 0.25 });
chapters.forEach(ch => chapterObserver.observe(ch));

// Hide indicator at the very top (hero)
window.addEventListener('scroll', () => {
    if (chapterIndicator) {
        if (window.scrollY < window.innerHeight * 0.8) {
            chapterIndicator.classList.remove('visible');
        }
    }
}, { passive: true });

// --- Reveal Mask for Section Titles ---
const maskObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            maskObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.reveal-mask').forEach(el => maskObserver.observe(el));

// --- Stat Counter Animation ---
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const duration = 1800;
            const start = performance.now();
            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                const value = Math.floor(eased * target);
                el.textContent = String(value).padStart(2, '0');
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

// --- Kinetic Quote: set per-word delay index, trigger on visible ---
document.querySelectorAll('.kinetic-quote').forEach(quote => {
    const words = quote.querySelectorAll('.word');
    words.forEach((w, i) => w.style.setProperty('--i', i));
    const qObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                quote.classList.add('playing');
                qObs.unobserve(quote);
            }
        });
    }, { threshold: 0.3 });
    qObs.observe(quote);
});

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
    initScrollama();
});
