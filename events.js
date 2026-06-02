/* INDICATE — events.js */

(function () {

  // ── EVENT DATA ────────────────────────────────────────────────────────────
  const EVENT_DATA = [
    // ── UPCOMING ──
    {
      num:    'THECUBE 3.0',
      name:   'THECUBE 3.0',
      date:   '07.11.2026',
      venue:  'DACHAUERSTR. 110C — MÜNCHEN',
      time:   '22:00 — 05:00',
      lineup: ['Gregor Gutmann', 'Landel B2B Chrissi Halt', 'Fabian.Knalli B2B Gyri', 'ARVOØ'],
      countdownDate: '2026-11-07T22:00:00',
      tickets: [{}],
      ticketUrl: '', // ← Ticket-Link hier eintragen
      mainPhoto: 'photos/cubetopia3-nr1.jpg',
      gallery: [
        'photos/cubetopia3-nr2.jpg',
        'photos/cubetopia3-nr3.jpg',
        'photos/cubetopia3-nr4.jpg',
        'photos/cubetopia3-nr5.jpg',
      ],
    },
    // ── PAST ──
    {
      isPast: true,
      num:    'THECUBE 2.0',
      name:   'THECUBE 2.0',
      date:   '09.05.2026',
      venue:  'MÜNCHEN',
      time:   '22:00 — OPEN END',
      lineup: ['ARTIST NAME', 'ARTIST NAME', 'ARTIST NAME'],
      mainPhoto: 'photos/cubetopia2-nr1.jpg',
      gallery: [
        'photos/cubetopia2-nr2.jpg',
        'photos/cubetopia2-nr3.jpg',
        'photos/cubetopia2-nr4.jpg',
        'photos/cubetopia2-nr5.jpg',
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
      mainPhoto: 'photos/cubetopia1-nr1.jpg',
      gallery: [
        'photos/cubetopia1-nr2.jpg',
        'photos/cubetopia1-nr3.jpg',
        'photos/cubetopia1-nr4.jpg',
        'photos/cubetopia1-nr5.jpg',
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

  function openEventDetail(eventIdx) {
    const ev = EVENT_DATA[eventIdx];
    if (!ev) return;

    // Close bar
    document.getElementById('edp-num').textContent = ev.num;
    const pastTag = document.getElementById('edp-past-tag');
    if (pastTag) pastTag.style.display = ev.isPast ? 'inline-block' : 'none';

    // Hero
    const nameParts = ev.name.split(' ');
    const solid   = nameParts.slice(0, -1).join(' ') || ev.name;
    const outline = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    document.getElementById('edp-hero-ghost').textContent = ev.name.replace(' ', '\n');
    document.getElementById('edp-hero-title').innerHTML   = `
      <span class="edp-hero-title-solid">${solid}</span>
      ${outline ? `<span class="edp-hero-title-outline">${outline}</span>` : ''}
    `;
    document.getElementById('edp-main-img').src           = ev.mainPhoto;
    document.getElementById('edp-hero-meta').innerHTML    = `
      <span class="edp-hero-meta-item">${ev.date}</span>
      <span class="edp-hero-meta-sep"></span>
      <span class="edp-hero-meta-item">${ev.venue}</span>
      <span class="edp-hero-meta-sep"></span>
      <span class="edp-hero-meta-item">${ev.time}</span>
    `;

    // Lineup rows — alternierende Ausrichtung, keine Zahlen
    document.getElementById('edp-lineup').innerHTML = ev.lineup.map((a, i) => `
      <div class="edp-lineup-row ${i % 2 === 0 ? 'edp-lineup-row--left' : 'edp-lineup-row--right'}">
        <span class="edp-lineup-name">${a}</span>
        <span class="edp-lineup-sweep"></span>
      </div>
    `).join('');

    // Photo mosaic
    document.getElementById('edp-gallery-grid').innerHTML = ev.gallery.map((src, i) =>
      `<div class="edp-mosaic-item"><img src="${src}" alt="Foto ${i + 1}" loading="lazy"></div>`
    ).join('');

    // Recap footer
    document.getElementById('edp-recap-badge').textContent = `EVENT ABGESCHLOSSEN — ${ev.date}`;

    // Open panel
    panel.classList.add('open');
    panel.scrollTop = 0;
    document.body.style.overflow = 'hidden';

    // Laser sweep (trigger after paint)
    const laser = document.getElementById('edp-hero-laser');
    laser.classList.remove('sweep');
    requestAnimationFrame(() => requestAnimationFrame(() => laser.classList.add('sweep')));

    // Stagger lineup rows after panel slides in
    const rows = panel.querySelectorAll('.edp-lineup-row');
    rows.forEach(r => r.classList.remove('visible'));
    rows.forEach((row, i) => setTimeout(() => row.classList.add('visible'), 420 + i * 160));

    // ESC to close
    const onKey = (e) => { if (e.key === 'Escape') closeEventDetail(); };
    document.addEventListener('keydown', onKey, { once: true });
  }

  function closeEventDetail() {
    panel.classList.remove('open');
    document.body.style.overflow = '';
  }

  btnClose.addEventListener('click', closeEventDetail);

  // Swipe-to-close für Detail-Panel (wie Bottom Sheet)
  let edpTouchStartY = 0;
  let edpDragging    = false;

  panel.addEventListener('touchstart', e => {
    if (panel.scrollTop > 0) return;
    edpTouchStartY = e.touches[0].clientY;
    edpDragging = false;
  }, { passive: true });

  panel.addEventListener('touchmove', e => {
    if (panel.scrollTop > 0) return;
    const dy = e.touches[0].clientY - edpTouchStartY;
    if (dy > 8) {
      edpDragging = true;
      panel.style.transition = 'none';
      panel.style.transform  = `translateY(${Math.max(0, dy)}px)`;
    }
  }, { passive: true });

  panel.addEventListener('touchend', e => {
    if (!edpDragging) return;
    const dy = e.changedTouches[0].clientY - edpTouchStartY;
    panel.style.transition = '';
    panel.style.transform  = '';
    if (dy > 90) closeEventDetail();
    edpDragging = false;
  }, { passive: true });

  // Click on event screen → bottom sheet (upcoming) or detail panel (past)
  document.querySelectorAll('.event-screen').forEach(screen => {
    screen.addEventListener('click', (e) => {
      if (e.target.closest('.evt-ticket-strip')) return;
      if (e.target.closest('.evt-mob-lineup-teaser')) return;
      const id  = parseInt(screen.dataset.eventId, 10);
      if (isNaN(id)) return;
      const ev  = EVENT_DATA[id];
      if (!ev) return;
      if (ev.isPast || screen.classList.contains('event-screen--past')) {
        openEventDetail(id);
      } else {
        openBottomSheet(id, 'tickets');
      }
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
          <span class="evt-mob-cd-num">${String(d).padStart(2,'0')}</span><span class="evt-mob-cd-lbl">T</span>
        </div>
        <div class="evt-mob-cd-unit">
          <span class="evt-mob-cd-num">${String(h).padStart(2,'0')}</span><span class="evt-mob-cd-lbl">H</span>
        </div>
        <div class="evt-mob-cd-unit">
          <span class="evt-mob-cd-num">${String(m).padStart(2,'0')}</span><span class="evt-mob-cd-lbl">M</span>
        </div>
        <div class="evt-mob-cd-unit">
          <span class="evt-mob-cd-num">${String(s).padStart(2,'0')}</span><span class="evt-mob-cd-lbl">S</span>
        </div>
      `;
    }
    update();
    return setInterval(update, 1000);
  }

  // ── BOTTOM SHEET ──────────────────────────────────────────────────────────
  const bottomSheet = document.getElementById('evt-bottom-sheet');
  const bsBackdrop  = bottomSheet.querySelector('.evt-bs-backdrop');
  const bsPanel     = bottomSheet.querySelector('.evt-bs-panel');
  let   bsCdInterval = null;
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

  // X-Button
  document.getElementById('evt-bs-close-btn')
    .addEventListener('click', closeBottomSheet);

  // Swipe down to close
  let bsTouchStartY = 0;
  let bsDragging    = false;

  bsPanel.addEventListener('touchstart', e => {
    if (bsPanel.scrollTop > 0) return;
    bsTouchStartY = e.touches[0].clientY;
    bsDragging = false;
  }, { passive: true });

  bsPanel.addEventListener('touchmove', e => {
    if (bsPanel.scrollTop > 0) return;
    const dy = e.touches[0].clientY - bsTouchStartY;
    if (dy > 8) {
      bsDragging = true;
      bsPanel.style.transition = 'none';
      bsPanel.style.transform  = `translateY(${Math.max(0, dy)}px)`;
    }
  }, { passive: true });

  bsPanel.addEventListener('touchend', e => {
    if (!bsDragging) return;
    const dy = e.changedTouches[0].clientY - bsTouchStartY;
    bsPanel.style.transition = '';
    bsPanel.style.transform  = '';
    if (dy > 100) closeBottomSheet();
    bsDragging = false;
  }, { passive: true });

  const PWYW_PRICES = [11, 13, 15, 18];
  let bsCurrentEventIdx = -1;
  let bsSelectedPrice   = null;
  let bsSelectedQty     = 1;

  function updateBsCta() {
    if (!bsSelectedPrice) return;
    const total  = bsSelectedPrice * bsSelectedQty;
    const suffix = bsSelectedQty > 1 ? ` — ${bsSelectedQty} TICKETS` : '';
    bsCtaEl.textContent = `ZUR KASSE · €${total}${suffix}`;
    bsCtaEl.className   = 'evt-bs-cta';
  }

  bsCtaEl.addEventListener('click', () => {
    if (bsCtaEl.classList.contains('soon-cta')) return;
    const ev = EVENT_DATA[bsCurrentEventIdx];
    if (!ev || !ev.ticketUrl) return;
    const url = `${ev.ticketUrl}?price=${bsSelectedPrice}&qty=${bsSelectedQty}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  function openBottomSheet(eventIdx, tab) {
    const ev = EVENT_DATA[eventIdx];
    if (!ev) return;

    bsCurrentEventIdx = eventIdx;
    bsSelectedPrice   = null;
    bsSelectedQty     = 1;

    bsNameEl.textContent  = ev.name;
    bsVenueEl.textContent = ev.venue;
    bsDateEl.textContent  = ev.date;
    bsTimeEl.textContent  = ev.time;

    // Countdown im Bottom Sheet
    const cdEl = document.getElementById('evt-bs-countdown');
    clearInterval(bsCdInterval);
    if (cdEl) {
      if (!ev.isPast && ev.countdownDate) {
        bsCdInterval = buildMobileCountdown(cdEl, ev.countdownDate);
      } else {
        cdEl.innerHTML = '';
      }
    }

    // Photos — first 3 from gallery
    const photosEl = document.getElementById('evt-bs-photos');
    if (photosEl) {
      const photos = (ev.gallery || []).slice(0, 3);
      photosEl.innerHTML = photos.map(src =>
        `<img src="${src}" class="evt-bs-photo" alt="" loading="lazy">`
      ).join('');
    }

    // Upcoming-Event → PWYW + Anzahl-Selektor
    if (!ev.isPast) {
      bsTicketsEl.innerHTML = `
        <div class="evt-bs-pwyw-intro">
          <span class="evt-bs-pwyw-title">PAY WHAT YOU WANT</span>
          <p class="evt-bs-pwyw-text">Zahle was du für richtig empfindest. Wer mehr zahlt, ermöglicht günstigere Tickets für andere.</p>
        </div>
        <div class="evt-bs-price-grid">
          ${PWYW_PRICES.map(p => `
            <button class="evt-bs-price-btn" data-price="${p}">
              <span class="evt-bs-price-num">${p}<span class="evt-bs-price-cur">€</span></span>
            </button>
          `).join('')}
        </div>
        <div class="evt-bs-qty-row">
          <span class="evt-bs-qty-label">ANZAHL</span>
          <div class="evt-bs-qty-ctrl">
            <button class="evt-bs-qty-btn" id="bs-qty-minus">−</button>
            <span class="evt-bs-qty-num" id="bs-qty-num">1</span>
            <button class="evt-bs-qty-btn" id="bs-qty-plus">+</button>
          </div>
        </div>
        <div class="evt-bs-price-incl">inkl. Bier oder Powerade</div>
      `;

      bsTicketsEl.querySelectorAll('.evt-bs-price-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          bsTicketsEl.querySelectorAll('.evt-bs-price-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          bsSelectedPrice = parseInt(btn.dataset.price, 10);
          updateBsCta();
        });
      });

      const qtyNumEl  = document.getElementById('bs-qty-num');
      const qtyMinus  = document.getElementById('bs-qty-minus');
      const qtyPlus   = document.getElementById('bs-qty-plus');

      function refreshQty() {
        qtyNumEl.textContent = bsSelectedQty;
        qtyMinus.disabled = bsSelectedQty <= 1;
        qtyPlus.disabled  = bsSelectedQty >= 10;
        updateBsCta();
      }

      qtyMinus.addEventListener('click', () => { if (bsSelectedQty > 1)  { bsSelectedQty--; refreshQty(); } });
      qtyPlus.addEventListener('click',  () => { if (bsSelectedQty < 10) { bsSelectedQty++; refreshQty(); } });

      bsCtaEl.className   = 'evt-bs-cta soon-cta';
      bsCtaEl.textContent = 'PREIS WÄHLEN';
    } else {
      bsTicketsEl.innerHTML = `
        <div class="evt-bs-no-tickets">
          <span>VERGANGENES EVENT</span>
        </div>`;
      bsCtaEl.className   = 'evt-bs-cta soon-cta';
      bsCtaEl.textContent = 'ABGESCHLOSSEN';
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
    clearInterval(bsCdInterval);
    bsCdInterval = null;
  }

  // ── INJECT MOBILE SLIDES ──────────────────────────────────────────────────
  function injectMobileSlides() {
    document.querySelectorAll('.event-screen').forEach(screen => {
      const idx  = parseInt(screen.dataset.eventId, 10);
      if (isNaN(idx)) return;
      const ev   = EVENT_DATA[idx];
      if (!ev) return;

      const parts    = ev.date.split('.');
      const dayMonth = parts[0] + '.' + parts[1];
      const year     = parts[2];
      const isSoon   = !ev.isPast && !!screen.querySelector('.event-ticket-btn.soon');
      const isPast   = ev.isPast || screen.classList.contains('event-screen--past');

      // Venue + time on one row
      const venueRow = `
        <div class="evt-mob-venue-row">
          <span class="evt-mob-venue">${ev.venue}</span>
          <span class="evt-mob-venue-sep">·</span>
          <span class="evt-mob-time">${ev.time}</span>
        </div>`;

      // Lineup teaser — first 2 artists
      const teaserArtists = ev.lineup.slice(0, 2);
      const teaserMore    = ev.lineup.length > 2
        ? `<span class="evt-mob-teaser-more">+${ev.lineup.length - 2} MORE</span>` : '';
      const lineupTeaser  = `
        <div class="evt-mob-lineup-teaser" data-lineup-idx="${idx}">
          ${teaserArtists.map((a, i) => `
            <div class="evt-mob-teaser-item">
              <span class="evt-mob-teaser-num">0${i + 1}</span>
              <span class="evt-mob-teaser-name">${a}</span>
            </div>`).join('')}
          ${teaserMore}
        </div>`;

      // Past badge
      const pastBadge = isPast
        ? `<span class="evt-mob-past-badge">ABGESCHLOSSEN</span>` : '';

      // Tap hint
      const tapHint = `
        <div class="evt-mob-tap-hint">
          <span class="evt-mob-tap-line"></span>
          <span class="evt-mob-tap-text">DETAILS</span>
          <span class="evt-mob-tap-line"></span>
        </div>`;

      const body = `
        <div class="evt-mob-body">
          <div class="evt-mob-date">${dayMonth}</div>
          <span class="evt-mob-year">${year}</span>
          <div class="evt-mob-divider"></div>
          <div class="evt-mob-name">${ev.name}</div>
          ${venueRow}
          ${pastBadge}
          ${lineupTeaser}
          ${tapHint}
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

      // Background countdown watermark (upcoming events only)
      if (!isPast && ev.countdownDate) {
        const bgCd = document.createElement('div');
        bgCd.className = 'evt-mob-bg-cd';
        bgCd.dataset.bgDate = ev.countdownDate;
        screen.appendChild(bgCd);
      }

      const slide = document.createElement('div');
      slide.className = 'evt-mobile-slide';
      slide.innerHTML = body + strip;
      screen.appendChild(slide);

      // Remove old elements from DOM
      screen.querySelector('.event-content')?.remove();
      screen.querySelector('.event-action-bar')?.remove();
      screen.querySelector('.event-bg-date')?.remove();
    });

    // Background countdown watermarks
    function updateBgCd(el) {
      const diff = new Date(el.dataset.bgDate) - Date.now();
      if (diff <= 0) { el.textContent = ''; return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      el.textContent = d > 0 ? String(d) : String(h).padStart(2, '0');
    }
    document.querySelectorAll('.evt-mob-bg-cd').forEach(el => {
      updateBgCd(el);
      setInterval(() => updateBgCd(el), 60000); // update every minute
    });

    // Lineup teaser clicks
    document.querySelectorAll('.evt-mob-lineup-teaser').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        openBottomSheet(parseInt(el.dataset.lineupIdx, 10), 'lineup');
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
