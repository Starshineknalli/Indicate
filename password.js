/* INDICATE — password.js
   Site-wide password protection. Include via <script src="password.js">
   at end of <body> on every page. Pair with the inline <head> veil snippet.
*/
(function () {
  const AUTH_KEY  = 'indicate_auth';
  const PASSWORD  = 'INDC';

  function removeVeil() {
    document.documentElement.classList.remove('pw-lock');
  }

  if (sessionStorage.getItem(AUTH_KEY)) {
    removeVeil();
    return;
  }

  removeVeil();

  const overlay = document.createElement('div');
  overlay.id = 'pw-overlay';
  overlay.innerHTML = `
    <div class="pw-inner">

      <div class="pw-logo">
        <svg viewBox="-120 -120 240 240" xmlns="http://www.w3.org/2000/svg" class="pw-logo-svg">
          <defs>
            <filter id="pw-gl" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="pw-gl2" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="pw-th" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" seed="7" result="n"/>
              <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            <style>
              @keyframes pw-fl  { 0%,100%{opacity:.5} 50%{opacity:1} }
              @keyframes pw-rot { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
              .pw-ring-g { animation: pw-rot 30s linear infinite; transform-origin: 0px 0px; }
              .pw-f1 { animation: pw-fl 2.8s ease-in-out 0.00s infinite; }
              .pw-f2 { animation: pw-fl 2.8s ease-in-out 0.70s infinite; }
              .pw-f3 { animation: pw-fl 2.8s ease-in-out 1.40s infinite; }
              .pw-f4 { animation: pw-fl 2.8s ease-in-out 2.10s infinite; }
            </style>
          </defs>

          <!-- Rotating thorny ring -->
          <g class="pw-ring-g">
            <circle cx="0" cy="0" r="70" fill="none" stroke="white" stroke-width="1.2"
                    filter="url(#pw-th)" opacity="0.82"/>
            <circle cx="0" cy="0" r="73" fill="none" stroke="white" stroke-width="0.5"
                    filter="url(#pw-th)" opacity="0.3"/>
          </g>

          <!-- 4-pointed star blades -->
          <!-- N/S vertical -->
          <path d="M0,-112 C4.5,-58 4.5,0 0,0 C-4.5,0 -4.5,-58 0,-112Z"
                fill="white" filter="url(#pw-gl)"/>
          <path d="M0,-112 C1.5,-70 1.5,0 0,0 C-1.5,0 -1.5,-70 0,-112Z"
                fill="white" filter="url(#pw-gl2)" opacity="0.9"/>
          <path d="M0,112 C4.5,58 4.5,0 0,0 C-4.5,0 -4.5,58 0,112Z"
                fill="white" filter="url(#pw-gl)"/>
          <path d="M0,112 C1.5,70 1.5,0 0,0 C-1.5,0 -1.5,70 0,112Z"
                fill="white" filter="url(#pw-gl2)" opacity="0.9"/>
          <!-- E/W horizontal -->
          <path d="M112,0 C58,4.5 0,4.5 0,0 C0,-4.5 58,-4.5 112,0Z"
                fill="white" filter="url(#pw-gl)"/>
          <path d="M112,0 C70,1.5 0,1.5 0,0 C0,-1.5 70,-1.5 112,0Z"
                fill="white" filter="url(#pw-gl2)" opacity="0.9"/>
          <path d="M-112,0 C-58,4.5 0,4.5 0,0 C0,-4.5 -58,-4.5 -112,0Z"
                fill="white" filter="url(#pw-gl)"/>
          <path d="M-112,0 C-70,1.5 0,1.5 0,0 C0,-1.5 -70,-1.5 -112,0Z"
                fill="white" filter="url(#pw-gl2)" opacity="0.9"/>

          <!-- Diagonal short rays -->
          <path d="M78,-78 C38,-30 0,0 0,0 C0,0 30,-38 78,-78Z"
                fill="white" filter="url(#pw-gl)" opacity="0.55"/>
          <path d="M78,78 C38,30 0,0 0,0 C0,0 30,38 78,78Z"
                fill="white" filter="url(#pw-gl)" opacity="0.55"/>
          <path d="M-78,78 C-38,30 0,0 0,0 C0,0 -30,38 -78,78Z"
                fill="white" filter="url(#pw-gl)" opacity="0.55"/>
          <path d="M-78,-78 C-38,-30 0,0 0,0 C0,0 -30,-38 -78,-78Z"
                fill="white" filter="url(#pw-gl)" opacity="0.55"/>

          <!-- Cardinal flares at ring -->
          <circle class="pw-f1" cx="0"   cy="-70" r="8"  fill="white" filter="url(#pw-gl2)"/>
          <circle class="pw-f2" cx="70"  cy="0"   r="8"  fill="white" filter="url(#pw-gl2)"/>
          <circle class="pw-f3" cx="0"   cy="70"  r="8"  fill="white" filter="url(#pw-gl2)"/>
          <circle class="pw-f4" cx="-70" cy="0"   r="8"  fill="white" filter="url(#pw-gl2)"/>

          <!-- Diagonal corner flares -->
          <circle class="pw-f2" cx="78"  cy="-78" r="5" fill="white" filter="url(#pw-gl)" opacity="0.7"/>
          <circle class="pw-f4" cx="78"  cy="78"  r="5" fill="white" filter="url(#pw-gl)" opacity="0.7"/>
          <circle class="pw-f1" cx="-78" cy="78"  r="5" fill="white" filter="url(#pw-gl)" opacity="0.7"/>
          <circle class="pw-f3" cx="-78" cy="-78" r="5" fill="white" filter="url(#pw-gl)" opacity="0.7"/>

          <!-- Letters -->
          <text x="0"    y="-90" text-anchor="middle" dominant-baseline="middle"
                font-family="Georgia,serif" font-size="19" font-weight="bold"
                fill="white" filter="url(#pw-gl)">I</text>
          <text x="90"   y="1"   text-anchor="start"  dominant-baseline="middle"
                font-family="Georgia,serif" font-size="19" font-weight="bold"
                fill="white" filter="url(#pw-gl)">N</text>
          <text x="0"    y="100" text-anchor="middle" dominant-baseline="middle"
                font-family="Georgia,serif" font-size="19" font-weight="bold"
                fill="white" filter="url(#pw-gl)">D</text>
          <text x="-90"  y="1"   text-anchor="end"    dominant-baseline="middle"
                font-family="Georgia,serif" font-size="19" font-weight="bold"
                fill="white" filter="url(#pw-gl)">C</text>
        </svg>
      </div>

      <div class="pw-brand">
        <h1 class="pw-brand-name">INDICATE</h1>
        <span class="pw-brand-sub">TECHNO KOLLEKTIV · MÜNCHEN</span>
      </div>

      <div class="pw-divider">
        <span class="pw-div-line"></span>
        <span class="pw-div-text">PRIVATE ACCESS</span>
        <span class="pw-div-line"></span>
      </div>

      <div class="pw-form">
        <input id="pw-input"
               type="password"
               autocomplete="off"
               autocorrect="off"
               spellcheck="false"
               placeholder="· · · ·"
               maxlength="20"
        />
        <button id="pw-submit">ZUGANG</button>
      </div>
      <p class="pw-error" id="pw-error">UNGÜLTIGER ZUGANGSCODE</p>

      <p class="pw-tagline">LAUNCHING 2026 &nbsp;·&nbsp; MÜNCHEN</p>

    </div>

    <div class="pw-legal">
      <a href="impressum.html">IMPRESSUM</a>
      <span class="pw-legal-sep"></span>
      <a href="datenschutz.html">DATENSCHUTZ</a>
    </div>
  `;
  document.body.appendChild(overlay);

  const input  = overlay.querySelector('#pw-input');
  const submit = overlay.querySelector('#pw-submit');
  const errEl  = overlay.querySelector('#pw-error');

  setTimeout(() => input.focus(), 150);

  function shakeForm() {
    const form = overlay.querySelector('.pw-form');
    form.classList.remove('pw-shake');
    void form.offsetWidth;
    form.classList.add('pw-shake');
    errEl.classList.add('pw-error--visible');
    input.value = '';
    input.focus();
  }

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
