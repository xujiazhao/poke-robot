/* ========================================
   Poke Robot — Landing Page Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // -- Nav scroll effect --
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // -- Mobile nav toggle --
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
  });

  // Close mobile nav on link click
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMobile.classList.remove('active');
    });
  });

  // -- Scroll reveal animations --
  const revealElements = document.querySelectorAll(
    '.value-card, .role-card, .section-header, .event-content, ' +
    '.video-placeholder, .manifesto-quote, .contact-info, .contact-form-wrapper, ' +
    '.join-text'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));

  // -- Language toggle --
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', toggleLang);
  });

  // -- Contact form (demo) --
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const sentText = translations[currentLang]['form.sent'];
    const submitText = translations[currentLang]['form.submit'];
    btn.textContent = sentText;
    btn.style.background = '#4ade80';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = submitText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
});
