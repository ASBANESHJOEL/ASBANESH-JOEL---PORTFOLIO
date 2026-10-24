/**
 * ASBANESH JOEL D — PORTFOLIO INTERACTIONS
 * Minimalist, high performance, robust navigation & transitions
 */

import * as Sentry from "@sentry/browser";

// Initialize Sentry error monitoring
Sentry.init({
  dsn: "https://1cbb1642eb4d011d2c4a766f466c19c1@o4511978138435584.ingest.de.sentry.io/4512029930094672",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below:
    // userInfo: false,
    // httpBodies: []
  },
});

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-reveal');
  
  // Elements
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
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
     0. TECHNOLOGIES 3D CAROUSEL
     ========================================== */
  const platformsCarousel = document.getElementById('platformsCarousel');
  const platformsViewport = document.getElementById('platformsCarouselViewport');
  const platformsTrack = document.getElementById('platformsCarouselTrack');
  const platformsPagination = document.getElementById('platformsCarouselPagination');

  if (platformsCarousel && platformsViewport && platformsTrack && platformsPagination) {
    const platformCards = Array.from(platformsTrack.querySelectorAll('.platform-card'));
    const previousButton = platformsCarousel.querySelector('[data-carousel-prev]');
    const nextButton = platformsCarousel.querySelector('[data-carousel-next]');
    let activePlatformIndex = 0;
    let pointerStartX = null;
    let pointerStartY = null;
    let pointerMoved = false;

    const renderPlatformCarousel = () => {
      const count = platformCards.length;
      if (!count) return;

      const viewportWidth = platformsViewport.clientWidth;
      const cardWidth = platformCards[0].getBoundingClientRect().width || Math.min(340, Math.max(260, viewportWidth * 0.27));
      const sideOffset = Math.min(cardWidth * 0.84 + 24, viewportWidth * 0.34);

      platformCards.forEach((card, index) => {
        // Only render the active card and its immediate neighbors. A 10-face
        // ring puts many rear cards through the same perspective cone, causing
        // the overlapping slivers seen in the preview. Three stable slots avoid that.
        let offset = (index - activePlatformIndex + count) % count;
        if (offset > count / 2) offset -= count;

        const visible = Math.abs(offset) <= 1;
        const isActive = offset === 0;
        const side = offset < 0 ? -1 : 1;
        const x = isActive ? 0 : side * sideOffset;
        const rotate = isActive ? 0 : side * -26;
        const scale = isActive ? 1 : 0.92;
        const depth = isActive ? 42 : -88;

        // Keep the center panel forward while the side panels turn away in 3D.
        // This restores the curved, cinematic stage without placing hidden cards in the same perspective cone.
        card.style.transform = `translateX(calc(-50% + ${x}px)) translateZ(${depth}px) rotateY(${rotate}deg) scale(${scale})`;
        card.style.opacity = visible ? '1' : '0';
        card.style.visibility = visible ? 'visible' : 'hidden';
        card.style.pointerEvents = visible ? 'auto' : 'none';
        card.style.zIndex = isActive ? '3' : '2';
        card.classList.toggle('is-active', isActive);
        card.setAttribute('aria-hidden', visible ? 'false' : 'true');
        card.setAttribute('aria-label', `${card.querySelector('.platform-name')?.textContent.trim() || 'Technology'}, ${index + 1} of ${count}`);
      });

      platformsTrack.style.transform = 'none';

      platformsPagination.querySelectorAll('.platforms-carousel-dot').forEach((dot, index) => {
        if (index === activePlatformIndex) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    };

    const advancePlatform = (direction) => {
      if (!platformCards.length) return;
      activePlatformIndex = (activePlatformIndex + direction + platformCards.length) % platformCards.length;
      renderPlatformCarousel();
    };

    const goToPlatform = (index) => {
      const count = platformCards.length;
      if (!count) return;
      const targetIndex = (index + count) % count;
      // Direct selections use the shortest route; next/previous controls use advancePlatform
      // so moving past the last card never snaps the ring back to its starting angle.
      const forward = (targetIndex - activePlatformIndex + count) % count;
      const direction = forward <= count / 2 ? forward : forward - count;
      advancePlatform(direction);
    };

    platformCards.forEach((card, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'platforms-carousel-dot';
      dot.setAttribute('aria-label', `Show ${card.querySelector('.platform-name')?.textContent.trim() || 'technology'}`);
      dot.addEventListener('click', () => goToPlatform(index));
      platformsPagination.appendChild(dot);

      card.addEventListener('click', () => {
        if (index !== activePlatformIndex) goToPlatform(index);
      });
    });

    previousButton?.addEventListener('click', () => advancePlatform(-1));
    nextButton?.addEventListener('click', () => advancePlatform(1));

    platformsViewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        advancePlatform(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        advancePlatform(1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        goToPlatform(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goToPlatform(platformCards.length - 1);
      }
    });

    platformsViewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerMoved = false;
    });

    platformsViewport.addEventListener('pointerup', (event) => {
      if (pointerStartX === null) return;
      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;
      if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15) {
        pointerMoved = true;
        advancePlatform(deltaX < 0 ? 1 : -1);
      }
      pointerStartX = null;
      pointerStartY = null;
    });

    platformsViewport.addEventListener('pointercancel', () => {
      pointerStartX = null;
      pointerStartY = null;
    });

    platformsViewport.addEventListener('click', (event) => {
      if (pointerMoved) {
        event.preventDefault();
        event.stopPropagation();
        pointerMoved = false;
      }
    }, true);

    window.addEventListener('resize', renderPlatformCarousel, { passive: true });
    renderPlatformCarousel();
  }


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
  const spyTargetIds = [
    'hero',
    'about',
    'skills',
    'work',
    'experience',
    'education',
    'achievements',
    'certifications',
    'platforms',
    'contact',
  ];
  const spyTargets = spyTargetIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let isProgrammaticScrolling = false;
  let scrollTimeout = null;

  const setActiveNavLink = (targetId) => {
    if (!targetId) return;
    const cleanId = targetId.startsWith('#') ? targetId.slice(1) : targetId;
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${cleanId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      if (isProgrammaticScrolling) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          setActiveNavLink(id);
        }
      });
    },
    {
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0,
    }
  );

  spyTargets.forEach((target) => scrollSpyObserver.observe(target));

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

  const smoothScrollToTarget = (targetId) => {
    if (!targetId || targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    isProgrammaticScrolling = true;
    clearTimeout(scrollTimeout);
    setActiveNavLink(targetId);

    const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 70;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });

    scrollTimeout = setTimeout(() => {
      isProgrammaticScrolling = false;
    }, 800);
  };

  mobileLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      toggleMobileMenu(false);
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        setTimeout(() => {
          smoothScrollToTarget(href);
        }, 60);
      }
    });
  });

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]:not(.mobile-nav-link)').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        smoothScrollToTarget(href);
      }
    });
  });

  // Handle window resize to reset mobile menu state
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileDrawer && mobileDrawer.classList.contains('open')) {
      toggleMobileMenu(false);
    }
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
  const mainContent = document.querySelector('main');

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
      img.alt = `${name} certificate preview`;
      img.loading = 'lazy';
      img.decoding = 'async';
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
    certModal.setAttribute('aria-hidden', 'false');
    if (mainContent) {
      mainContent.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = 'hidden';
    if (certModalClose) {
      certModalClose.focus();
    }
  };

  const closeCertModal = () => {
    if (!certModal) return;
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    if (mainContent) {
      mainContent.removeAttribute('aria-hidden');
    }
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
