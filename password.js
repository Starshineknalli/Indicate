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
        <svg viewBox="0 0 200 232" xmlns="http://www.w3.org/2000/svg" class="pw-logo-svg">
          <rect x="0" y="0" width="44" height="200" fill="#ffffff"/>
          <path d="M 52,0 L 118,0 C 178,0 196,44 196,100 C 196,156 178,200 118,200 L 52,200 Z
                   M 52,44 L 108,44 C 152,44 156,68 156,100 C 156,132 152,156 108,156 L 52,156 Z"
                fill="#ffffff" fill-rule="evenodd"/>
          <text x="92" y="226" font-family="Space Mono, monospace" font-size="12.5"
                letter-spacing="11" fill="rgba(255,255,255,0.88)" text-anchor="middle">INDICATE</text>
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
