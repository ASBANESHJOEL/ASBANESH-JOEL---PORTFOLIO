/**
 * ASBANESH JOEL D — PORTFOLIO INTERACTIONS
 * Minimalist, high performance, robust navigation & transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-reveal');
  
  // Elements
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const certModal = document.getElementById('certModal');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalBody = document.getElementById('certModalBody');
  const certModalClose = document.getElementById('certModalClose');
  const certButtons = document.querySelectorAll('.cert-view-btn');

  /* ==========================================
     1. SCROLL & HEADER STATE
     ========================================== */
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ==========================================
     2. SCROLLSPY (ACTIVE NAV INDICATOR)
     ========================================== */
  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => scrollSpyObserver.observe(section));

  /* ==========================================
     3. MOBILE DRAWER NAVIGATION
     ========================================== */
  const toggleMobileMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    mobileDrawer.classList.toggle('open', isOpen);
    mobileOverlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', isOpen.toString());
      const lines = menuToggle.querySelectorAll('.hamburger-line');
      if (isOpen) {
        lines[0].style.transform = 'translateY(7px) rotate(45deg)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
      }
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleMobileMenu());
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  /* ==========================================
     4. BACK TO TOP
     ========================================== */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  /* ==========================================
     5. FADE-IN REVEAL ANIMATIONS
     ========================================== */
  const revealElements = document.querySelectorAll('.fade-in-up');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ==========================================
     6. CERTIFICATE VIEWER MODAL
     ========================================== */
  const openCertModal = (name, previewUrl, pdfUrl) => {
    if (!certModal) return;
    certModalTitle.textContent = name;
    certModalBody.innerHTML = '';

    // Create container
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.gap = '1.25rem';
    container.style.width = '100%';

    // Preview Image
    if (previewUrl) {
      const img = document.createElement('img');
      img.src = previewUrl;
      img.alt = name;
      img.className = 'cert-modal-img';
      img.onerror = () => {
        img.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.style.textAlign = 'center';
        fallback.style.padding = '3rem 1.5rem';
        fallback.innerHTML = `
          <p style="color: #8E95A5; margin-bottom: 0.75rem; font-size: 0.95rem;">Certificate preview file not found.</p>
          <code style="font-family: var(--font-mono); font-size: 0.75rem; color: #E2E8F0; background: rgba(255,255,255,0.06); padding: 0.4rem 0.8rem; border-radius: 4px; display: inline-block;">Expected: ${previewUrl}</code>
        `;
        container.insertBefore(fallback, container.firstChild);
      };
      container.appendChild(img);
    }

    // Action button to open full original file
    if (pdfUrl) {
      const openBtn = document.createElement('a');
      openBtn.href = pdfUrl;
      openBtn.target = '_blank';
      openBtn.rel = 'noopener noreferrer';
      openBtn.className = 'btn-primary';
      openBtn.style.fontSize = '0.8125rem';
      openBtn.style.padding = '0.65rem 1.25rem';
      openBtn.innerHTML = `
        <span>OPEN FULL DOCUMENT</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      `;
      container.appendChild(openBtn);
    }

    certModalBody.appendChild(container);
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCertModal = () => {
    if (!certModal) return;
    certModal.classList.remove('active');
    document.body.style.overflow = '';
    certModalBody.innerHTML = '';
  };

  certButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certName = btn.getAttribute('data-cert-name');
      const certPreview = btn.getAttribute('data-cert-preview');
      const certUrl = btn.getAttribute('data-cert-url');
      openCertModal(certName, certPreview, certUrl);
    });
  });

  if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeCertModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCertModal();
      toggleMobileMenu(false);
    }
  });
});
