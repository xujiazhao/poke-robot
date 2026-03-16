/* ========================================
   Poke Robotics — Landing Page Scripts
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
    nav.classList.toggle('menu-open');
    document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMobile.classList.remove('active');
      nav.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });

  // -- Scroll reveal animations --
  const revealElements = document.querySelectorAll(
    '.value-card, .role-card, .section-header, .event-content, ' +
    '.video-placeholder, .manifesto-quote, .contact-info, .contact-form-wrapper, ' +
    '.join-text'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  // Add staggered delay for cards in the same group
  document.querySelectorAll('.values-grid, .join-roles').forEach(group => {
    group.querySelectorAll('.value-card, .role-card').forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.12}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Clear stagger delay after animation so hover transitions work normally
          const delay = parseFloat(entry.target.style.transitionDelay) || 0;
          setTimeout(() => {
            entry.target.style.transitionDelay = '';
          }, (delay + 0.8) * 1000);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));

  // -- Language dropdown --
  document.querySelectorAll('.lang-dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.lang-dropdown-btn');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close other dropdowns
      document.querySelectorAll('.lang-dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown.classList.toggle('open');
    });

    dropdown.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.dataset.lang;
        setLang(lang);
        document.querySelectorAll('.lang-dropdown').forEach(d => d.classList.remove('open'));
      });
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-dropdown').forEach(d => d.classList.remove('open'));
  });

  // -- Manifesto parallax --
  const manifestoBg = document.querySelector('.manifesto-bg-img');
  if (manifestoBg) {
    const manifesto = document.querySelector('.manifesto');
    window.addEventListener('scroll', () => {
      const rect = manifesto.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowH) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        const offset = (progress - 0.5) * 160;
        manifestoBg.style.transform = `translateY(${offset}px)`;
      }
    }, { passive: true });
  }

  // -- Video modal --
  const videoBtn = document.getElementById('videoBtn');
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');
  const videoOverlay = videoModal.querySelector('.video-modal-overlay');

  videoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeVideoModal = () => {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  videoModalClose.addEventListener('click', closeVideoModal);
  videoOverlay.addEventListener('click', closeVideoModal);

  // -- Contact modal --
  const contactModal = document.getElementById('contactModal');
  const contactModalClose = document.getElementById('contactModalClose');
  const contactOverlay = contactModal.querySelector('.contact-modal-overlay');

  document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeContactModal = () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  contactModalClose.addEventListener('click', closeContactModal);
  contactOverlay.addEventListener('click', closeContactModal);

  // Handle contact form submission via mailto
  const contactModalForm = document.getElementById('contactModalForm');
  contactModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(document.getElementById('contactSubject').value);
    const phone = document.getElementById('contactPhone').value;
    const body = document.getElementById('contactBody').value;
    const fullBody = encodeURIComponent(body + (phone ? `\n\nPhone: ${phone}` : ''));
    window.location.href = `mailto:hello@pokerobot.com?subject=${subject}&body=${fullBody}`;
    closeContactModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (videoModal.classList.contains('active')) closeVideoModal();
      if (contactModal.classList.contains('active')) closeContactModal();
    }
  });
});
