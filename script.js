/* ============================================
   NAREN PORTFOLIO — JavaScript (Enhanced)
   ============================================ */

(function () {
  'use strict';

  // ---------- Theme Toggle ----------
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function initTheme() {
    const saved = localStorage.getItem('ag-theme');
    // Always default to dark; only respect an explicit saved preference
    html.setAttribute('data-theme', saved || 'dark');
  }

  initTheme();

  themeToggle && themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('ag-theme', next);
  });

  // ---------- Cursor Glow ----------
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.08;
    curY += (mouseY - curY) * 0.08;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor expand on interactive elements
  document.querySelectorAll('a, button, .skill-badge, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
  });

  // ---------- Sticky Nav ----------
  const nav = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ---------- Mobile Nav ----------
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks && navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---------- Active Nav Link ----------
  const sections = document.querySelectorAll('.section[id]');
  const navAnchors = navLinks ? navLinks.querySelectorAll('a') : [];

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${id}`) a.classList.add('active');
        });
      }
    });
  }, { passive: true });

  // ---------- Typing Animation ----------
  const typingTarget = document.querySelector('.hero-typed');
  if (typingTarget) {
    const words = ['Software Engineer', 'Full-Stack Developer', 'Cloud Architect', 'Problem Solver'];
    let wordIdx = 0, charIdx = 0, deleting = false;

    function type() {
      const word = words[wordIdx];
      if (!deleting) {
        typingTarget.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typingTarget.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    }
    type();
  }

  // ---------- Parallax Hero Orbs ----------
  const heroOrbs = document.querySelectorAll('.hero-orb');
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    heroOrbs.forEach((orb, i) => {
      const depth = (i + 1) * 0.4;
      orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

  // ---------- Canvas Particle Background ----------
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function getAccentColor() {
      return html.getAttribute('data-theme') === 'light'
        ? 'rgba(229, 85, 85, VAL)'
        : 'rgba(255, 107, 107, VAL)';
    }
    function getCyanColor() {
      return html.getAttribute('data-theme') === 'light'
        ? 'rgba(0, 168, 158, VAL)'
        : 'rgba(0, 212, 200, VAL)';
    }

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.5,
        color: Math.random() > 0.5 ? 'accent' : 'cyan',
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const colorFn = p.color === 'accent' ? getAccentColor : getCyanColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = colorFn().replace('VAL', p.opacity);
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const opacity = (1 - dist / 90) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,107,107,${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // ---------- 3D Card Tilt (desktop only) ----------
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (!isTouchDevice) {
    document.querySelectorAll('.project-card, .about-highlight-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ---------- Counter Animation ----------
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ---------- Staggered Reveal ----------
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Stagger children in grids
  document.querySelectorAll('.skills-grid, .projects-grid').forEach(grid => {
    grid.querySelectorAll(':scope > *').forEach((child, i) => {
      child.classList.add('reveal');
      child.style.transitionDelay = `${i * 80}ms`;
      revealObserver.observe(child);
    });
  });

  // ---------- Contact Form ----------
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Message Sent!';
    btn.style.background = '#00D4C8';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 2500);
  });

  // ---------- Smooth Scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---------- Scroll Progress Bar ----------
  const progress = document.getElementById('scrollProgress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      progress.style.width = (scrolled / max * 100) + '%';
    }, { passive: true });
  }

  // ---------- Skill Progress Bars ----------
  const skillBarObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach(fill => {
          const pct = fill.getAttribute('data-width');
          // Set the percentage label on the sibling name element
          const nameEl = fill.closest('.skill-bar-item').querySelector('.skill-bar-name');
          if (nameEl) nameEl.setAttribute('data-pct', pct + '%');
          requestAnimationFrame(() => {
            fill.style.width = pct + '%';
          });
        });
        skillBarObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-category').forEach(cat => skillBarObserver.observe(cat));

  // ---------- Back to Top Button ----------
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Testimonials Marquee Pause ----------
  const testimonialsTrack = document.getElementById('testimonialsTrack');
  if (testimonialsTrack) {
    testimonialsTrack.addEventListener('mouseenter', () => {
      testimonialsTrack.classList.add('paused');
    });
    testimonialsTrack.addEventListener('mouseleave', () => {
      testimonialsTrack.classList.remove('paused');
    });
  }

})();

