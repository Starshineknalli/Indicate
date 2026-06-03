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
        <img class="pw-logo-svg" src="photos/INDC-LOGO.png" alt="INDC">
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
