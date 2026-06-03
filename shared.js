/* INDICATE — shared.js */

(function () {
  // ── PAGE TRANSITION ────────────────────────────────────────────
  const overlay = document.querySelector('.page-transition');
  if (overlay) {
    window.addEventListener('load', () => {
      requestAnimationFrame(() => overlay.classList.add('out'));
    });
  }

  // ── INJECT NAV OVERLAY ─────────────────────────────────────────
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  navOverlay.id = 'nav-overlay';
  navOverlay.innerHTML = `
    <nav class="nav-overlay-main">
      <a href="index.html"      data-transition>STARTSEITE</a>
      <a href="events.html"     data-transition>EVENTS</a>
      <a href="collective.html" data-transition>KOLLEKTIV</a>
    </nav>
    <div class="nav-overlay-divider"></div>
    <nav class="nav-overlay-legal">
      <a href="datenschutz.html" data-transition>DATENSCHUTZ</a>
      <a href="impressum.html"   data-transition>IMPRESSUM</a>
    </nav>
    <div class="nav-overlay-footer">MÜNCHEN &nbsp;×&nbsp; SINCE 2025</div>
  `;
  document.body.appendChild(navOverlay);

  // ── HAMBURGER TOGGLE ──────────────────────────────────────────
  const burger = document.querySelector('.nav-burger');
  if (burger) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      navOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // ── PAGE TRANSITION ON OVERLAY LINKS ─────────────────────────
  function setupTransitionLinks(scope) {
    scope.querySelectorAll('a[data-transition]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        e.preventDefault();
        // Close overlay first
        if (burger) { burger.classList.remove('open'); }
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
        if (overlay) {
          overlay.classList.remove('out');
          overlay.classList.add('in');
          setTimeout(() => { window.location.href = href; }, 480);
        } else {
          window.location.href = href;
        }
      });
    });
  }

  // Wire up both page links and overlay links
  setupTransitionLinks(document);

  // ── ACTIVE PAGE MARK ─────────────────────────────────────────
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-overlay-main a').forEach(a => {
    if (a.getAttribute('href') === path) a.style.color = 'rgba(255,255,255,0.55)';
  });
})();
