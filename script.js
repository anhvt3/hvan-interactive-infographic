// ================================================
// HỒ SƠ MẬT — Interactive Engine
// ================================================

const progressBar = document.getElementById('progress-bar');

// Progress Bar (rAF throttled)
let scrollTicking = false;
function onScrollUpdate() {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollPx / winHeightPx) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';
    scrollTicking = false;
}
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(onScrollUpdate);
        scrollTicking = true;
    }
}, { passive: true });

// ================================================
// Case Card reveal (Doc 01 timeline)
// ================================================
const caseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.case-card').forEach(c => caseObserver.observe(c));

// ================================================
// Chapter Indicator
// ================================================
const chapterIndicator = document.getElementById('chapter-indicator');
const ciNum = document.getElementById('ci-num');
const ciTitle = document.getElementById('ci-title');

const chapterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const n = entry.target.dataset.chapterNum;
            const t = entry.target.dataset.chapterTitle;
            if (ciNum) ciNum.textContent = n;
            if (ciTitle) ciTitle.textContent = t;
            if (chapterIndicator) chapterIndicator.classList.add('visible');
        }
    });
}, { threshold: 0.25 });
document.querySelectorAll('.chapter').forEach(ch => chapterObs.observe(ch));

window.addEventListener('scroll', () => {
    if (chapterIndicator && window.scrollY < window.innerHeight * 0.7) {
        chapterIndicator.classList.remove('visible');
    }
}, { passive: true });

// ================================================
// Redacted text reveal on scroll-in
// ================================================
const redactObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('revealed'), 400);
            redactObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.8 });
document.querySelectorAll('.redact').forEach(el => redactObs.observe(el));

// ================================================
// Stat counter (count up)
// ================================================
const statObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const duration = 2000;
            const start = performance.now();
            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                el.textContent = String(Math.floor(eased * target)).padStart(2, '0');
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            statObs.unobserve(el);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => statObs.observe(el));

// ================================================
// Kinetic quote — set word delay index, trigger on visible
// ================================================
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
    }, { threshold: 0.25 });
    qObs.observe(quote);
});

// ================================================
// Scrollama for intel-step (Doc 02)
// ================================================
function initScrollama() {
    if (typeof scrollama === 'undefined') return;
    const scroller = scrollama();
    scroller
        .setup({ step: '.intel-step', offset: 0.7 })
        .onStepEnter(response => {
            document.querySelectorAll('.intel-step').forEach(el => el.classList.remove('is-active'));
            response.element.classList.add('is-active');
        });
    window.addEventListener('resize', scroller.resize);
}

// ================================================
// Set HUD date to today (Vietnamese format)
// ================================================
const hudDate = document.getElementById('hud-date');
if (hudDate) {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    hudDate.textContent = `${dd} · ${mm} · ${yyyy}`;
}

// ================================================
// Init
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollama();
});
