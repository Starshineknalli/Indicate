/* INDICATE — events.js */

(function () {

  // ── EVENT DATA ────────────────────────────────────────────────────────────
  const EVENT_DATA = [
    // ── UPCOMING ──
    {
      num:    'EVENT 001',
      name:   'INDICATE 001',
      date:   '14.06.2026',
      venue:  'TRESOR — BERLIN',
      time:   '23:00 — OPEN END',
      lineup: ['ARTIST NAME', 'ARTIST NAME', 'ARTIST NAME'],
      countdownDate: '2026-06-14T23:00:00',
      tickets: [
        { name: 'EARLY ENTRY', sub: 'BIS 00:30',  price: 19 },
        { name: 'REGULAR',     sub: 'ALL NIGHT',  price: 29 },
        { name: 'BACKSTAGE',   sub: 'LIMITED',    price: 69 },
      ],
      mainPhoto: 'https://picsum.photos/seed/rave01main/1200/800',
      gallery: [
        'https://picsum.photos/seed/rave01g1/900/600',
        'https://picsum.photos/seed/rave01g2/600/450',
        'https://picsum.photos/seed/rave01g3/600/450',
        'https://picsum.photos/seed/rave01g4/600/450',
        'https://picsum.photos/seed/rave01g5/600/450',
      ],
    },
    {
      num:    'EVENT 002',
      name:   'INDICATE 002',
      date:   '28.06.2026',
      venue:  'BERGHAIN — BERLIN',
      time:   '00:00 — OPEN END',
      lineup: ['ARTIST NAME', 'ARTIST NAME', 'ARTIST NAME', 'ARTIST NAME'],
      countdownDate: '2026-06-28T00:00:00',
      tickets: [
        { name: 'EARLY ENTRY', sub: 'BIS 01:00',  price: 19 },
        { name: 'REGULAR',     sub: 'ALL NIGHT',  price: 29 },
        { name: 'BACKSTAGE',   sub: 'LIMITED',    price: 69 },
      ],
      mainPhoto: 'https://picsum.photos/seed/rave02main/1200/800',
      gallery: [
        'https://picsum.photos/seed/rave02g1/900/600',
        'https://picsum.photos/seed/rave02g2/600/450',
        'https://picsum.photos/seed/rave02g3/600/450',
        'https://picsum.photos/seed/rave02g4/600/450',
        'https://picsum.photos/seed/rave02g5/600/450',
      ],
    },
    {
      num:    'EVENT 003',
      name:   'INDICATE 003',
      date:   '19.07.2026',
      venue:  'OHM — BERLIN',
      time:   '22:00 — OPEN END',
      lineup: ['ARTIST NAME', 'ARTIST NAME'],
      countdownDate: '2026-07-19T22:00:00',
      mainPhoto: 'https://picsum.photos/seed/rave03main/1200/800',
      gallery: [
        'https://picsum.photos/seed/rave03g1/900/600',
        'https://picsum.photos/seed/rave03g2/600/450',
        'https://picsum.photos/seed/rave03g3/600/450',
        'https://picsum.photos/seed/rave03g4/600/450',
        'https://picsum.photos/seed/rave03g5/600/450',
      ],
    },
    {
      num:    'EVENT 004',
      name:   'INDICATE 004',
      date:   '09.08.2026',
      venue:  'TBA — BERLIN',
      time:   'TBA',
      lineup: ['TBA'],
      countdownDate: '2026-08-09T22:00:00',
      mainPhoto: 'https://picsum.photos/seed/rave04main/1200/800',
      gallery: [
        'https://picsum.photos/seed/rave04g1/900/600',
        'https://picsum.photos/seed/rave04g2/600/450',
        'https://picsum.photos/seed/rave04g3/600/450',
        'https://picsum.photos/seed/rave04g4/600/450',
        'https://picsum.photos/seed/rave04g5/600/450',
      ],
    },
    // ── PAST ──
    {
      isPast: true,
      num:    'EVENT —03',
      name:   'INDICATE —03',
      date:   '13.12.2025',
      venue:  'TRESOR — BERLIN',
      time:   '23:00 — OPEN END',
      lineup: ['ARTIST NAME', 'ARTIST NAME', 'ARTIST NAME'],
      mainPhoto: 'https://picsum.photos/seed/past01main/1200/800',
      gallery: [
        'https://picsum.photos/seed/past01g1/900/600',
        'https://picsum.photos/seed/past01g2/600/450',
        'https://picsum.photos/seed/past01g3/600/450',
        'https://picsum.photos/seed/past01g4/600/450',
        'https://picsum.photos/seed/past01g5/600/450',
      ],
    },
    {
      isPast: true,
      num:    'EVENT —02',
      name:   'INDICATE —02',
      date:   '08.11.2025',
      venue:  'BERGHAIN KANTINE — BERLIN',
      time:   '22:00 — OPEN END',
      lineup: ['ARTIST NAME', 'ARTIST NAME', 'ARTIST NAME', 'ARTIST NAME'],
      mainPhoto: 'https://picsum.photos/seed/past02main/1200/800',
      gallery: [
        'https://picsum.photos/seed/past02g1/900/600',
        'https://picsum.photos/seed/past02g2/600/450',
        'https://picsum.photos/seed/past02g3/600/450',
        'https://picsum.photos/seed/past02g4/600/450',
        'https://picsum.photos/seed/past02g5/600/450',
      ],
    },
    {
      isPast: true,
      num:    'EVENT —01',
      name:   'INDICATE —01',
      date:   '20.09.2025',
      venue:  'OHM — BERLIN',
      time:   '23:00 — OPEN END',
      lineup: ['ARTIST NAME', 'ARTIST NAME'],
      mainPhoto: 'https://picsum.photos/seed/past03main/1200/800',
      gallery: [
        'https://picsum.photos/seed/past03g1/900/600',
        'https://picsum.photos/seed/past03g2/600/450',
        'https://picsum.photos/seed/past03g3/600/450',
        'https://picsum.photos/seed/past03g4/600/450',
        'https://picsum.photos/seed/past03g5/600/450',
      ],
    },
    // ── THECUBE SERIES ──
    {
      isPast: true,
      num:    'THECUBE 2.0',
      name:   'THECUBE 2.0',
      date:   '09.05.2026',
      venue:  'MÜNCHEN',
      time:   '22:00 — OPEN END',
      lineup: ['ARTIST NAME', 'ARTIST NAME', 'ARTIST NAME'],
      mainPhoto: 'https://picsum.photos/seed/cube2main/1200/800',
      gallery: [
        'https://picsum.photos/seed/cube2g1/900/600',
        'https://picsum.photos/seed/cube2g2/600/450',
        'https://picsum.photos/seed/cube2g3/600/450',
        'https://picsum.photos/seed/cube2g4/600/450',
        'https://picsum.photos/seed/cube2g5/600/450',
      ],
    },
    {
      isPast: true,
      num:    'THECUBE 1.0',
      name:   'THECUBE 1.0',
      date:   '27.09.2025',
      venue:  'MÜNCHEN',
      time:   '22:00 — OPEN END',
      lineup: ['ARTIST NAME', 'ARTIST NAME'],
      mainPhoto: 'https://picsum.photos/seed/cube1main/1200/800',
      gallery: [
        'https://picsum.photos/seed/cube1g1/900/600',
        'https://picsum.photos/seed/cube1g2/600/450',
        'https://picsum.photos/seed/cube1g3/600/450',
        'https://picsum.photos/seed/cube1g4/600/450',
        'https://picsum.photos/seed/cube1g5/600/450',
      ],
    },
  ];

  // ── FILM GRAIN ────────────────────────────────────────────────────────────
  const noiseCanvas = document.getElementById('noise-canvas');
  const noiseCtx    = noiseCanvas.getContext('2d');
  noiseCanvas.width  = 360;
  noiseCanvas.height = 240;

  let lastNoise = 0;
  function renderNoise(ts) {
    requestAnimationFrame(renderNoise);
    if (ts - lastNoise < 40) return;
    lastNoise = ts;
    const img  = noiseCtx.createImageData(360, 240);
    const data = img.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255 | 0;
      data[i] = data[i+1] = data[i+2] = v;
      data[i+3] = 255;
    }
    noiseCtx.putImageData(img, 0, 0);
  }
  requestAnimationFrame(renderNoise);

  // ── COUNTDOWN HELPER ──────────────────────────────────────────────────────
  function buildCountdown(el, dateStr) {
    const target = new Date(dateStr).getTime();
    function update() {
      const diff = target - Date.now();
      if (diff <= 0) {
        el.innerHTML = '<span style="font-family:var(--font-head);font-size:1.2rem;letter-spacing:.25em;color:var(--grey)">EVENT PAST</span>';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000)  / 60000);
      const s = Math.floor((diff % 60000)    / 1000);
      el.innerHTML = `
        <div class="countdown-unit"><span class="countdown-num">${String(d).padStart(2,'0')}</span><span class="countdown-label">TAGE</span></div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit"><span class="countdown-num">${String(h).padStart(2,'0')}</span><span class="countdown-label">STD</span></div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit"><span class="countdown-num">${String(m).padStart(2,'0')}</span><span class="countdown-label">MIN</span></div>
        <span class="countdown-sep">:</span>
        <div class="countdown-unit"><span class="countdown-num">${String(s).padStart(2,'0')}</span><span class="countdown-label">SEK</span></div>
      `;
    }
    update();
    setInterval(update, 1000);
  }

  document.querySelectorAll('.event-countdown[data-date]').forEach(el => {
    buildCountdown(el, el.dataset.date);
  });

  // ── LASER LINES ───────────────────────────────────────────────────────────
  function animateLaser(lineEl) {
    const delay = 2000 + Math.random() * 5000;
    setTimeout(() => {
      lineEl.style.transition = 'none';
      lineEl.style.width = '0'; lineEl.style.left = '0'; lineEl.style.opacity = '1';
      requestAnimationFrame(() => {
        lineEl.style.transition = `width ${1.8 + Math.random()}s cubic-bezier(.2,0,.8,1)`;
        lineEl.style.width = '100%';
        setTimeout(() => {
          lineEl.style.transition = 'opacity .4s'; lineEl.style.opacity = '0';
          setTimeout(() => animateLaser(lineEl), 500);
        }, 2000 + Math.random() * 1500);
      });
    }, delay);
  }
  document.querySelectorAll('.laser-line').forEach(el => animateLaser(el));

  // ── PROGRESS DOTS ─────────────────────────────────────────────────────────
  const progressEl = document.getElementById('events-progress');
  const screens    = Array.from(document.getElementById('events-scroll').children);

  screens.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => screens[i].scrollIntoView({ behavior:'smooth', block:'start' }));
    progressEl.appendChild(dot);
  });
  const dots = progressEl.querySelectorAll('.progress-dot');

  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = screens.indexOf(entry.target);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    });
  }, { threshold: 0.5, root: document.body });
  screens.forEach(s => dotObserver.observe(s));

  // ── BIG DATE PARALLAX ─────────────────────────────────────────────────────
  document.body.addEventListener('scroll', () => {
    const st = document.body.scrollTop;
    document.querySelectorAll('.event-bg-date').forEach(el => {
      const section = el.closest('.event-screen');
      const offset  = (st - section.offsetTop) * 0.15;
      el.style.transform = `translateY(calc(-50% + ${offset}px))`;
    });
  });

  // ══════════════════════════════════════════════════════════
  //  EVENT DETAIL PANEL
  // ══════════════════════════════════════════════════════════

  const panel    = document.getElementById('event-detail-panel');
  const btnClose = document.getElementById('edp-close');
  let   detailTimer = null;

  function openEventDetail(eventIdx) {
    const ev = EVENT_DATA[eventIdx];
    if (!ev) return;

    // Past event badge
    const pastTag = document.getElementById('edp-past-tag');
    if (pastTag) pastTag.style.display = ev.isPast ? 'inline-block' : 'none';

    // Populate header
    document.getElementById('edp-num').textContent         = ev.num;
    document.getElementById('edp-event-num').textContent   = ev.num;
    document.getElementById('edp-event-title').textContent = ev.name;

    // Meta rows
    document.getElementById('edp-meta').innerHTML = `
      <div class="edp-meta-row">
        <span class="edp-meta-label">DATUM</span>
        <span class="edp-meta-value">${ev.date}</span>
      </div>
      <div class="edp-meta-row">
        <span class="edp-meta-label">ORT</span>
        <span class="edp-meta-value">${ev.venue}</span>
      </div>
      <div class="edp-meta-row">
        <span class="edp-meta-label">ZEIT</span>
        <span class="edp-meta-value">${ev.time}</span>
      </div>
    `;

    // Lineup
    document.getElementById('edp-lineup').innerHTML =
      ev.lineup.map(a => `<span class="edp-lineup-artist">${a}</span>`).join('');

    // Bottom section: countdown or past status
    const bottomEl = document.getElementById('edp-bottom');
    clearInterval(detailTimer);
    if (ev.isPast) {
      bottomEl.innerHTML = `
        <div class="edp-past-status">
          <span class="edp-past-status-label">ABGESCHLOSSEN</span>
          <span class="edp-past-status-date">${ev.date}</span>
        </div>
      `;
    } else {
      bottomEl.innerHTML = '<div id="edp-countdown" class="event-countdown"></div>';
      buildCountdown(document.getElementById('edp-countdown'), ev.countdownDate);
    }

    // Main photo
    document.getElementById('edp-main-img').src = ev.mainPhoto;

    // Gallery
    const grid = document.getElementById('edp-gallery-grid');
    grid.innerHTML = ev.gallery.map((src, i) =>
      `<img src="${src}" alt="Foto ${i+1}" loading="lazy">`
    ).join('');

    // Open panel
    panel.classList.add('open');
    panel.scrollTop = 0;
    document.body.style.overflow = 'hidden';

    // Close on ESC
    const onKey = (e) => { if (e.key === 'Escape') closeEventDetail(); };
    document.addEventListener('keydown', onKey, { once: true });
  }

  function closeEventDetail() {
    panel.classList.remove('open');
    document.body.style.overflow = '';
  }

  btnClose.addEventListener('click', closeEventDetail);

  // Click on event screen → open detail
  document.querySelectorAll('.event-screen').forEach(screen => {
    screen.addEventListener('click', (e) => {
      if (e.target.classList.contains('event-ticket-btn')) return;
      if (e.target.closest('.evt-ticket-strip') || e.target.closest('.evt-mob-lineup-hint')) return;
      const id = parseInt(screen.dataset.eventId, 10);
      if (!isNaN(id)) openEventDetail(id);
    });
  });

  // ── MOBILE COUNTDOWN ──────────────────────────────────────────────────────
  function buildMobileCountdown(el, dateStr) {
    const target = new Date(dateStr).getTime();
    function update() {
      const diff = target - Date.now();
      if (diff <= 0) { el.innerHTML = ''; return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000)  / 60000);
      const s = Math.floor((diff % 60000)    / 1000);
      el.innerHTML = `
        <div class="evt-mob-cd-unit">
          <span class="evt-mob-cd-num">${String(d).padStart(2,'0')}</span>
          <span class="evt-mob-cd-lbl">TAGE</span>
        </div>
        <span class="evt-mob-cd-sep">:</span>
        <div class="evt-mob-cd-unit">
          <span class="evt-mob-cd-num">${String(h).padStart(2,'0')}</span>
          <span class="evt-mob-cd-lbl">STD</span>
        </div>
        <span class="evt-mob-cd-sep">:</span>
        <div class="evt-mob-cd-unit">
          <span class="evt-mob-cd-num">${String(m).padStart(2,'0')}</span>
          <span class="evt-mob-cd-lbl">MIN</span>
        </div>
        <span class="evt-mob-cd-sep">:</span>
        <div class="evt-mob-cd-unit">
          <span class="evt-mob-cd-num">${String(s).padStart(2,'0')}</span>
          <span class="evt-mob-cd-lbl">SEK</span>
        </div>
      `;
    }
    update();
    setInterval(update, 1000);
  }

  // ── BOTTOM SHEET ──────────────────────────────────────────────────────────
  const bottomSheet = document.getElementById('evt-bottom-sheet');
  const bsBackdrop  = bottomSheet.querySelector('.evt-bs-backdrop');
  const bsPanel     = bottomSheet.querySelector('.evt-bs-panel');
  const bsNameEl    = document.getElementById('evt-bs-name');
  const bsVenueEl   = document.getElementById('evt-bs-venue');
  const bsDateEl    = document.getElementById('evt-bs-date');
  const bsTimeEl    = document.getElementById('evt-bs-time');
  const bsTicketsEl = document.getElementById('evt-bs-tickets');
  const bsLineupEl  = document.getElementById('evt-bs-lineup');
  const bsCtaEl     = document.getElementById('evt-bs-cta');
  const bsTabs      = bottomSheet.querySelectorAll('.evt-bs-tab');
  let   bsActiveTab = 'tickets';

  bsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      bsActiveTab = tab.dataset.tab;
      bsTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === bsActiveTab));
      bsTicketsEl.style.display = bsActiveTab === 'tickets' ? 'block' : 'none';
      bsLineupEl.style.display  = bsActiveTab === 'lineup'  ? 'block' : 'none';
    });
  });

  bsBackdrop.addEventListener('click', closeBottomSheet);

  function openBottomSheet(eventIdx, tab) {
    const ev = EVENT_DATA[eventIdx];
    if (!ev) return;

    bsNameEl.textContent  = ev.name;
    bsVenueEl.textContent = ev.venue;
    bsDateEl.textContent  = ev.date;
    bsTimeEl.textContent  = ev.time;

    if (ev.tickets && ev.tickets.length) {
      bsTicketsEl.innerHTML = ev.tickets.map(t => `
        <div class="evt-ticket-tier">
          <div class="evt-tier-info">
            <span class="evt-tier-name">${t.name}</span>
            <span class="evt-tier-sub">${t.sub}</span>
          </div>
          <div class="evt-tier-price">
            <span class="evt-tier-currency">€</span>${t.price}
          </div>
        </div>
      `).join('');
      bsCtaEl.className   = 'evt-bs-cta';
      bsCtaEl.textContent = 'ZUR KASSE';
    } else {
      bsTicketsEl.innerHTML = `
        <div class="evt-bs-no-tickets">
          <span>TICKETS IN KÜRZE</span>
        </div>`;
      bsCtaEl.className   = 'evt-bs-cta soon-cta';
      bsCtaEl.textContent = 'DEMNÄCHST VERFÜGBAR';
    }

    bsLineupEl.innerHTML = `
      <div class="evt-bs-lineup-list">
        ${ev.lineup.map((a, i) => `
          <div class="evt-bs-lineup-item">
            <span class="evt-bs-lineup-num">0${i + 1}</span>
            <span class="evt-bs-lineup-name">${a}</span>
            <span class="evt-bs-lineup-accent"></span>
          </div>
        `).join('')}
      </div>`;

    bsActiveTab = tab || 'tickets';
    bsTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === bsActiveTab));
    bsTicketsEl.style.display = bsActiveTab === 'tickets' ? 'block' : 'none';
    bsLineupEl.style.display  = bsActiveTab === 'lineup'  ? 'block' : 'none';

    bottomSheet.classList.add('open');
    bsPanel.scrollTop = 0;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => { if (e.key === 'Escape') closeBottomSheet(); };
    document.addEventListener('keydown', onKey, { once: true });
  }

  function closeBottomSheet() {
    bottomSheet.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── INJECT MOBILE SLIDES ──────────────────────────────────────────────────
  function injectMobileSlides() {
    document.querySelectorAll('.event-screen').forEach(screen => {
      const idx    = parseInt(screen.dataset.eventId, 10);
      if (isNaN(idx)) return;
      const ev     = EVENT_DATA[idx];
      if (!ev) return;

      const parts    = ev.date.split('.');
      const dayMonth = parts[0] + '.' + parts[1];
      const year     = parts[2];
      const isSoon   = !ev.isPast && !!screen.querySelector('.event-ticket-btn.soon');
      const isPast   = ev.isPast || screen.classList.contains('event-screen--past');

      // Top bar
      const topBar = `
        <div class="evt-mob-topbar">
          <img src="logo-mark.svg" class="evt-mob-logo-img" alt="INDICATE">
          <span class="evt-mob-evtnum">${ev.num}</span>
        </div>`;

      // Middle section
      let statusHtml = '';
      if (isPast) {
        statusHtml = `<span class="evt-mob-past-badge">ABGESCHLOSSEN</span>`;
      } else {
        statusHtml = `<div class="evt-mob-countdown" data-mob-cd="${ev.countdownDate}"></div>`;
      }
      const lineupHint = !isPast
        ? `<button class="evt-mob-lineup-hint" data-lineup-idx="${idx}">
             <span class="lh-dot"></span>LINEUP ANSEHEN
           </button>`
        : '';

      const body = `
        <div class="evt-mob-body">
          <div class="evt-mob-date">${dayMonth}</div>
          <span class="evt-mob-year">${year}</span>
          <div class="evt-mob-divider"></div>
          <div class="evt-mob-name">${ev.name}</div>
          <div class="evt-mob-venue">${ev.venue}</div>
          <div class="evt-mob-time">${ev.time}</div>
          ${statusHtml}
          ${lineupHint}
        </div>`;

      // Ticket strip
      let stripClass = 'evt-ticket-strip';
      let stripInner = '';
      if (isPast) {
        stripClass += ' evt-ticket-strip--past';
        stripInner  = `<span class="evt-ticket-strip-text">IMPRESSIONEN</span><span class="evt-ticket-strip-arrow">→</span>`;
      } else if (isSoon) {
        stripClass += ' evt-ticket-strip--soon';
        stripInner  = `<span class="evt-ticket-strip-text">DEMNÄCHST</span>`;
      } else {
        stripInner  = `<span class="evt-ticket-strip-text">TICKETS ZIEHEN</span><span class="evt-ticket-strip-arrow">↑</span>`;
      }
      const strip = `<div class="${stripClass}" data-strip-idx="${idx}">${stripInner}</div>`;

      const slide = document.createElement('div');
      slide.className = 'evt-mobile-slide';
      slide.innerHTML = topBar + body + strip;
      screen.appendChild(slide);
    });

    // Build mobile countdowns
    document.querySelectorAll('[data-mob-cd]').forEach(el => {
      buildMobileCountdown(el, el.dataset.mobCd);
    });

    // Lineup hint clicks
    document.querySelectorAll('.evt-mob-lineup-hint').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openBottomSheet(parseInt(btn.dataset.lineupIdx, 10), 'lineup');
      });
    });

    // Ticket strip clicks
    document.querySelectorAll('.evt-ticket-strip').forEach(strip => {
      const idx = parseInt(strip.dataset.stripIdx, 10);
      strip.addEventListener('click', e => {
        e.stopPropagation();
        if (strip.classList.contains('evt-ticket-strip--soon')) return;
        if (strip.classList.contains('evt-ticket-strip--past')) {
          if (!isNaN(idx)) openEventDetail(idx);
          return;
        }
        if (!isNaN(idx)) openBottomSheet(idx, 'tickets');
      });
    });
  }

  injectMobileSlides();

})();
