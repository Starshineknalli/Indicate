/* INDICATE — collective.js */

(function () {

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&';

  // ── WAVEFORM BACKGROUNDS ─────────────────────────────────────────────────
  document.querySelectorAll('.waveform-canvas').forEach((canvas, memberIdx) => {
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
      w = canvas.width  = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();

    // Different wave profiles per member
    const profiles = [
      { waves: 4, ampBase: 35, freq: 0.008, speed: 0.4  },
      { waves: 6, ampBase: 25, freq: 0.012, speed: 0.6  },
      { waves: 3, ampBase: 55, freq: 0.005, speed: 0.25 },
      { waves: 5, ampBase: 30, freq: 0.010, speed: 0.5  },
      { waves: 4, ampBase: 45, freq: 0.007, speed: 0.35 },
      { waves: 7, ampBase: 20, freq: 0.015, speed: 0.7  },
    ];

    const p = profiles[memberIdx % profiles.length];

    function draw(t) {
      ctx.clearRect(0, 0, w, h);

      for (let wv = 0; wv < p.waves; wv++) {
        const alpha = 0.04 + wv * 0.018;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(220, 0, 0, ${alpha})`;
        ctx.lineWidth   = 1;

        const amp    = p.ampBase + wv * 18;
        const offset = wv * 1.1;

        for (let x = 0; x <= w; x += 2) {
          const y = h / 2
            + Math.sin(x * p.freq + t * p.speed + offset) * amp
            + Math.sin(x * p.freq * 2.3 + t * p.speed * 0.7 + offset * 0.5) * (amp * 0.4);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Subtle horizontal grid lines
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.025)';
      ctx.lineWidth   = 1;
      for (let y = 0; y < h; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    let running = true;
    function loop(ts) {
      if (!running) return;
      draw(ts / 1000);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    window.addEventListener('resize', resize);
  });

  // ── NAME SCRAMBLE ON HOVER ────────────────────────────────────────────────
  document.querySelectorAll('.member-name').forEach(el => {
    const original = el.dataset.original || el.textContent;
    let timer = null;

    function scramble() {
      let step = 0;
      clearInterval(timer);
      timer = setInterval(() => {
        el.textContent = original.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          return step > i ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        step++;
        if (step > original.length) {
          el.textContent = original;
          clearInterval(timer);
        }
      }, 32);
    }

    el.closest('.member-screen').addEventListener('mouseenter', scramble);
    el.closest('.member-screen').addEventListener('mouseleave', () => {
      clearInterval(timer);
      el.textContent = original;
    });
  });

  // ── PROGRESS DOTS ─────────────────────────────────────────────────────────
  const progressEl = document.getElementById('collective-progress');
  const screens    = Array.from(document.getElementById('collective-scroll').children);

  screens.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      screens[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    progressEl.appendChild(dot);
  });

  const dots = progressEl.querySelectorAll('.progress-dot');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = screens.indexOf(entry.target);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    });
  }, { threshold: 0.5, root: document.body });

  screens.forEach(s => observer.observe(s));

  // ── BIG NUMBER PARALLAX ───────────────────────────────────────────────────
  document.body.addEventListener('scroll', () => {
    const st = document.body.scrollTop;
    document.querySelectorAll('.member-bg-num').forEach(el => {
      const section = el.closest('.member-screen');
      const offset  = (st - section.offsetTop) * 0.12;
      el.style.transform = `translateY(calc(-50% + ${offset}px))`;
    });
  });

})();
