/* INDICATE — shared.js */
/* Page transitions + nav active state */

(function () {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  // Entrance: slide overlay out on page load
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      overlay.classList.add('out');
    });
  });

  // Intercept nav clicks for transition
  document.querySelectorAll('a[data-transition]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      e.preventDefault();
      overlay.classList.remove('out');
      overlay.classList.add('in');
      setTimeout(() => {
        window.location.href = href;
      }, 480);
    });
  });

  // Mark active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const linkFile = a.getAttribute('href').split('/').pop();
    if (linkFile === path) a.classList.add('active');
  });

  // Nav-Logo: auf index.html erst sichtbar nach dem Hero, sofort auf anderen Seiten
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    const heroSection = document.getElementById('section-hero');
    if (!heroSection) {
      // Nicht auf der Startseite — Logo immer sichtbar
      navLogo.classList.add('visible');
    } else {
      const onScroll = () => {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        navLogo.classList.toggle('visible', heroBottom < 80);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }
})();
