// Nav: transparent → scrolled, hide on scroll down, reveal on scroll up
const nav = document.getElementById('main-nav');
if (nav) {
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateNav = () => {
    const currentY = window.scrollY;

    nav.classList.toggle('scrolled', currentY > 60);

    if (currentY > 120) {
      const goingDown = currentY > lastScrollY;
      nav.classList.toggle('nav-hidden', goingDown);
      if (goingDown && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
      }
    } else {
      nav.classList.remove('nav-hidden');
    }

    lastScrollY = currentY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  updateNav();
}

// Hamburger toggle
document.querySelector('.nav-hamburger')?.addEventListener('click', () => {
  nav?.classList.remove('nav-hidden');
  nav?.classList.toggle('nav-open');
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav?.classList.remove('nav-open'));
});

// Close mobile nav on outside click
document.addEventListener('click', e => {
  if (nav?.classList.contains('nav-open') && !nav.contains(e.target)) {
    nav.classList.remove('nav-open');
  }
});

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 74, behavior: 'smooth' });
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));
