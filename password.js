/* INDICATE — password.js
   Site-wide password protection. Include via <script src="password.js">
   at end of <body> on every page. Pair with the inline <head> veil snippet.
*/
(function () {
  const AUTH_KEY  = 'indicate_auth';
  const PASSWORD  = 'INDC';

  // Remove the veil (body visibility:hidden set by inline head snippet)
  function removeVeil() {
    document.documentElement.classList.remove('pw-lock');
  }

  // Already authenticated → just remove veil and stop
  if (sessionStorage.getItem(AUTH_KEY)) {
    removeVeil();
    return;
  }

  // ── BUILD OVERLAY ────────────────────────────────────────────────────────

  removeVeil(); // overlay will cover content instead of veil

  const overlay = document.createElement('div');
  overlay.id = 'pw-overlay';
  overlay.innerHTML = `
    <div class="pw-inner">
      <div class="pw-logo">
        <svg viewBox="-110 -110 220 220" xmlns="http://www.w3.org/2000/svg" class="pw-logo-svg">
          <defs>
            <filter id="pw-gl" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="pw-th" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="7" result="n"/>
              <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            <style>
              @keyframes pw-fl { 0%,100%{opacity:.6} 50%{opacity:1} }
              .pw-f1{animation:pw-fl 2.5s ease-in-out infinite}
              .pw-f2{animation:pw-fl 2.5s ease-in-out 0.62s infinite}
              .pw-f3{animation:pw-fl 2.5s ease-in-out 1.24s infinite}
              .pw-f4{animation:pw-fl 2.5s ease-in-out 1.86s infinite}
            </style>
          </defs>
          <g>
            <circle cx="0" cy="0" r="65" fill="none" stroke="white" stroke-width="1.5" filter="url(#pw-th)" opacity="0.88"/>
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="32s" repeatCount="indefinite"/>
          </g>
          <path d="M0,-105 C4,-55 4,0 0,0 C-4,0 -4,-55 0,-105Z" fill="white" filter="url(#pw-gl)"/>
          <path d="M0,105 C4,55 4,0 0,0 C-4,0 -4,55 0,105Z" fill="white" filter="url(#pw-gl)"/>
          <path d="M105,0 C55,4 0,4 0,0 C0,-4 55,-4 105,0Z" fill="white" filter="url(#pw-gl)"/>
          <path d="M-105,0 C-55,4 0,4 0,0 C0,-4 -55,-4 -105,0Z" fill="white" filter="url(#pw-gl)"/>
          <circle class="pw-f1" cx="0" cy="-65" r="7" fill="white" filter="url(#pw-gl)"/>
          <circle class="pw-f2" cx="65" cy="0" r="7" fill="white" filter="url(#pw-gl)"/>
          <circle class="pw-f3" cx="0" cy="65" r="7" fill="white" filter="url(#pw-gl)"/>
          <circle class="pw-f4" cx="-65" cy="0" r="7" fill="white" filter="url(#pw-gl)"/>
          <text x="0" y="-80" text-anchor="middle" dominant-baseline="middle" font-family="Georgia,serif" font-size="18" fill="white" filter="url(#pw-gl)">I</text>
          <text x="82" y="1" text-anchor="start" dominant-baseline="middle" font-family="Georgia,serif" font-size="18" fill="white" filter="url(#pw-gl)">N</text>
          <text x="0" y="90" text-anchor="middle" dominant-baseline="middle" font-family="Georgia,serif" font-size="18" fill="white" filter="url(#pw-gl)">D</text>
          <text x="-82" y="1" text-anchor="end" dominant-baseline="middle" font-family="Georgia,serif" font-size="18" fill="white" filter="url(#pw-gl)">C</text>
        </svg>
      </div>
      <div class="pw-rule"></div>
      <p class="pw-hint">ZUGANG ERFORDERLICH</p>
      <div class="pw-form">
        <input id="pw-input"
               type="password"
               autocomplete="off"
               autocorrect="off"
               spellcheck="false"
               placeholder="· · · ·"
               maxlength="20"
        />
        <button id="pw-submit">ENTER</button>
      </div>
      <p class="pw-error" id="pw-error">FALSCHES PASSWORT</p>
    </div>
    <div class="pw-legal">
      <a href="impressum.html">IMPRESSUM</a>
      <span class="pw-legal-sep"></span>
      <a href="datenschutz.html">DATENSCHUTZ</a>
    </div>
  `;
  document.body.appendChild(overlay);

  const input   = overlay.querySelector('#pw-input');
  const submit  = overlay.querySelector('#pw-submit');
  const errEl   = overlay.querySelector('#pw-error');

  // Auto-focus
  setTimeout(() => input.focus(), 100);

  // ── SHAKE ANIMATION ───────────────────────────────────────────────────────
  function shakeForm() {
    const form = overlay.querySelector('.pw-form');
    form.classList.remove('pw-shake');
    void form.offsetWidth; // reflow
    form.classList.add('pw-shake');
    errEl.classList.add('pw-error--visible');
    input.value = '';
    input.focus();
  }

  // ── AUTH CHECK ────────────────────────────────────────────────────────────
  function tryAuth() {
    const val = input.value.trim().toUpperCase();
    if (val === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1');
      overlay.classList.add('pw-exit');
      setTimeout(() => overlay.remove(), 600);
    } else {
      shakeForm();
    }
  }

  submit.addEventListener('click', tryAuth);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') tryAuth();
    if (errEl.classList.contains('pw-error--visible')) {
      errEl.classList.remove('pw-error--visible');
    }
  });

})();
