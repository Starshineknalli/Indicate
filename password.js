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
        <canvas id="pw-logo-canvas" class="pw-logo-svg"></canvas>
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

  // ── Password logo canvas animation ────────────────────────
  (function () {
    const cv = overlay.querySelector('#pw-logo-canvas');
    if (!cv) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const L = 360;
    cv.width = L * dpr; cv.height = L * dpr;
    const ctx = cv.getContext('2d');
    ctx.scale(dpr, dpr);

    const CX = L/2, CY = L/2;
    const R  = 80;
    const TS = 114;
    const CARD = [-Math.PI/2, 0, Math.PI/2, Math.PI];
    const DIAG = [-Math.PI*3/4, -Math.PI/4, Math.PI/4, Math.PI*3/4];

    const GS = 96;
    const glowStamp = document.createElement('canvas');
    glowStamp.width = glowStamp.height = GS;
    const gctx = glowStamp.getContext('2d');
    const gg = gctx.createRadialGradient(GS/2,GS/2,0, GS/2,GS/2,GS/2);
    gg.addColorStop(0,'rgba(255,255,255,1)'); gg.addColorStop(1,'rgba(255,255,255,0)');
    gctx.fillStyle=gg; gctx.fillRect(0,0,GS,GS);

    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = L; logoCanvas.height = L;
    const lctx = logoCanvas.getContext('2d');
    const img = new Image();
    img.src = 'photos/INDC-LOGO.png';

    const parts = Array.from({length: 15}, (_, i) => ({
      a:   (i/15)*Math.PI*2,
      spd: (0.003 + Math.random()*0.007) * (Math.random()<0.18?-1:1),
      r:   R + (Math.random()-0.5)*10,
      al:  0.2 + Math.random()*0.55,
      sz:  0.4 + Math.random()*1.2,
      tr:  [],
    }));

    let bolt=null, boltTimer=(Math.random()*150)|0;
    const BINT=220;

    function mkBolt(x1,y1,x2,y2,rd,d) {
      if(!d) return [[x1,y1],[x2,y2]];
      const mx=(x1+x2)/2+(Math.random()-.5)*rd, my=(y1+y2)/2+(Math.random()-.5)*rd;
      return [...mkBolt(x1,y1,mx,my,rd*.55,d-1), ...mkBolt(mx,my,x2,y2,rd*.55,d-1).slice(1)];
    }
    function glow(x,y,r,a) { ctx.globalAlpha=a; ctx.drawImage(glowStamp,x-r,y-r,r*2,r*2); }
    function drawFlare(x,y,size,t,ph) {
      const p=.62+Math.sin(t*1.3+ph)*.35, s=size*p;
      ctx.strokeStyle='white'; ctx.lineWidth=1.3;
      [0,Math.PI/2,Math.PI,Math.PI*3/2].forEach(a => {
        ctx.globalAlpha=.6*p;
        ctx.beginPath(); ctx.moveTo(x,y);
        ctx.lineTo(x+Math.cos(a)*s*4.8, y+Math.sin(a)*s*4.8);
        ctx.stroke();
      });
      glow(x,y,s*2.8,.22); glow(x,y,s*1.1,.9);
      ctx.globalAlpha=1;
    }
    function drawCenter(t) {
      const p=.85+Math.sin(t*1.08)*.14;
      glow(CX,CY,52*p,.55); glow(CX,CY,28*p,.8); glow(CX,CY,10*p,1);
      ctx.globalAlpha=1;
    }
    function drawBolt(b,al) {
      ctx.save(); ctx.globalAlpha=al; ctx.globalCompositeOperation='lighter';
      ctx.lineWidth=5; ctx.strokeStyle='rgba(120,190,255,.14)';
      ctx.beginPath(); b.path.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.stroke();
      ctx.lineWidth=1.1; ctx.strokeStyle='rgba(255,255,255,.95)';
      ctx.beginPath(); b.path.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y)); ctx.stroke();
      ctx.restore();
    }

    let t=0;
    function frame() {
      if (!overlay.isConnected) return;
      ctx.clearRect(0,0,L,L);
      ctx.globalAlpha=1;
      ctx.drawImage(logoCanvas,0,0,L,L);

      ctx.globalCompositeOperation='lighter';
      drawCenter(t);
      CARD.forEach((a,i) => { const x=CX+Math.cos(a)*R,y=CY+Math.sin(a)*R; drawFlare(x,y,11,t,i*Math.PI/2); });
      DIAG.forEach((a,i) => { const x=CX+Math.cos(a)*TS,y=CY+Math.sin(a)*TS; drawFlare(x,y,9,t,i*Math.PI/4+0.8); });
      ctx.globalCompositeOperation='source-over';
      ctx.globalAlpha=1;

      parts.forEach(p => {
        p.a+=p.spd;
        const x=CX+Math.cos(p.a)*p.r, y=CY+Math.sin(p.a)*p.r;
        p.tr.unshift({x,y}); if(p.tr.length>3) p.tr.pop();
        p.tr.forEach((pt,i) => {
          ctx.beginPath(); ctx.arc(pt.x,pt.y,p.sz*(1-i*.3),0,Math.PI*2);
          ctx.fillStyle=`rgba(255,255,255,${p.al*(1-i/3)*.5})`; ctx.fill();
        });
      });

      boltTimer++;
      if (!bolt && boltTimer>=BINT) {
        const i1=Math.random()*4|0; let i2;
        do{i2=Math.random()*4|0}while(i2===i1);
        bolt={path:mkBolt(CX+Math.cos(CARD[i1])*R,CY+Math.sin(CARD[i1])*R,
                          CX+Math.cos(CARD[i2])*R,CY+Math.sin(CARD[i2])*R,40,4),life:0,max:30};
        boltTimer=0;
      }
      if(bolt){
        bolt.life++; const pr=bolt.life/bolt.max;
        drawBolt(bolt, pr<.18?pr/.18:1-(pr-.18)/.82);
        if(bolt.life>=bolt.max) bolt=null;
      }
      t+=0.016;
      requestAnimationFrame(frame);
    }
    function startPwLoop() {
      lctx.drawImage(img,0,0,L,L);
      const id=lctx.getImageData(0,0,L,L); const d=id.data;
      for(let i=0;i<d.length;i+=4){ d[i+3]=Math.max(d[i],d[i+1],d[i+2]); }
      lctx.putImageData(id,0,0);
      frame();
    }
    img.onload=startPwLoop;
    if(img.complete && img.naturalWidth>0) startPwLoop();
  })();

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
