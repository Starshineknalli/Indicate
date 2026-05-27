/* INDICATE — script.js */

document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL REVEAL ──────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.05}s`;
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-item').forEach(el => {
    revealObserver.observe(el);
  });

  // ── ACTIVE NAV LINK ────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => sectionObserver.observe(s));

  // ── GLITCH BURST ───────────────────────────────────────────
  const heroTitle = document.querySelector('.hero .glitch');

  function glitchBurst() {
    if (!heroTitle) return;
    heroTitle.dataset.glitching = '1';
    setTimeout(() => delete heroTitle.dataset.glitching, 200);
    setTimeout(glitchBurst, 4000 + Math.random() * 9000);
  }

  setTimeout(glitchBurst, 3000);

  // ── MEMBER NAME SCRAMBLE ON HOVER ─────────────────────────
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  document.querySelectorAll('.member-row').forEach(row => {
    const nameEl = row.querySelector('.member-name');
    if (!nameEl) return;
    const original = nameEl.textContent;
    let timer = null;

    row.addEventListener('mouseenter', () => {
      let step = 0;
      clearInterval(timer);
      timer = setInterval(() => {
        nameEl.textContent = original
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            return step > i ? ch : chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        step++;
        if (step > original.length) {
          nameEl.textContent = original;
          clearInterval(timer);
        }
      }, 35);
    });

    row.addEventListener('mouseleave', () => {
      clearInterval(timer);
      nameEl.textContent = original;
    });
  });

  // ── SMOOTH SCROLL ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});

// inject glitch-burst style
const s = document.createElement('style');
s.textContent = `
  .glitch[data-glitching]::before {
    opacity: 1 !important;
    transform: translate(-6px, -2px) !important;
    animation: none !important;
    clip-path: polygon(0 10%, 100% 10%, 100% 45%, 0 45%) !important;
  }
`;
document.head.appendChild(s);
