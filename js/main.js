// --- Nav: transparent → scrolled on scroll ---
const nav = document.getElementById('main-nav');
if (nav) {
  const checkScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

// --- Hamburger toggle ---
document.querySelector('.nav-hamburger')?.addEventListener('click', () => {
  nav?.classList.toggle('nav-open');
});

// --- Close mobile nav when a link is clicked ---
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav?.classList.remove('nav-open'));
});

// --- Smooth scroll for in-page anchors ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 74, behavior: 'smooth' });
  });
});

// --- Scroll reveal ---
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));
