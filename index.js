/* INDICATE — index.js — Immersive Club Room Scene */

import * as THREE from 'three';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// ── RENDERER ──────────────────────────────────────────────────────────────────

const canvas   = document.getElementById('scene-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping        = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.88;
renderer.shadowMap.enabled  = true;
renderer.shadowMap.type     = THREE.PCFSoftShadowMap;

// ── SCENE / CAMERA ────────────────────────────────────────────────────────────

const scene = new THREE.Scene();
scene.fog   = new THREE.FogExp2(0x000000, 0.095);

const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.set(0, 1.65, 5.2);
camera.lookAt(0, 1.0, 0);

// ── POST-PROCESSING ───────────────────────────────────────────────────────────

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.75, 0.55, 0.10
);
composer.addPass(bloomPass);

// ── MATERIALS ─────────────────────────────────────────────────────────────────

const darkMetal  = () => new THREE.MeshStandardMaterial({ color: 0x0e0e0e, roughness: 0.32, metalness: 0.88 });
const chrome     = () => new THREE.MeshStandardMaterial({ color: 0x252525, roughness: 0.10, metalness: 0.99 });
const vinyl      = () => new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.85, metalness: 0.03 });
const faderMat   = () => new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.28, metalness: 0.72 });
const trussMatFn = () => new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.55, metalness: 0.82 });
const wallMat    = () => new THREE.MeshStandardMaterial({ color: 0x060606, roughness: 0.97, metalness: 0.03 });

function emissive(hex, intensity) {
  return new THREE.MeshStandardMaterial({
    color: hex, emissive: new THREE.Color(hex), emissiveIntensity: intensity,
  });
}

// ── LIGHTING ──────────────────────────────────────────────────────────────────

scene.add(new THREE.AmbientLight(0x020202, 1));

// Primary red ceiling spot — over DJ area
const spotMain = new THREE.SpotLight(0xff0800, 150, 16, Math.PI / 7.5, 0.38);
spotMain.position.set(-2.2, 6.2, -0.8);
spotMain.castShadow = true;
spotMain.shadow.mapSize.set(1024, 1024);
scene.add(spotMain); scene.add(spotMain.target);
spotMain.target.position.set(0, 0, -2.8);

// Secondary red spot — right side
const spotRed2 = new THREE.SpotLight(0xff0300, 85, 14, Math.PI / 9.5, 0.42);
spotRed2.position.set(3.2, 5.8, -0.5);
scene.add(spotRed2); scene.add(spotRed2.target);
spotRed2.target.position.set(0.8, 0, -2.5);

// White backlight — behind DJ, creates silhouette
const backLight = new THREE.PointLight(0xffffff, 22, 5.5);
backLight.position.set(0, 2.6, -5.4);
scene.add(backLight);

// Floor-level red glow at back wall
const wallGlow = new THREE.PointLight(0xff0000, 32, 5.5);
wallGlow.position.set(0, 0.12, -5.2);
scene.add(wallGlow);

// Side glow accents
const glowL = new THREE.PointLight(0xff0000, 14, 7);
glowL.position.set(-6.5, 1.8, -2.5);
scene.add(glowL);
const glowR = new THREE.PointLight(0xff0000, 14, 7);
glowR.position.set(6.5, 1.8, -2.5);
scene.add(glowR);

// DJ mixer underglow
const glowMixer = new THREE.PointLight(0xff2200, 22, 4);
glowMixer.position.set(0, 0.55, -2.85);
scene.add(glowMixer);

// CDJ local glows
const glowCdjL = new THREE.PointLight(0xff3300, 9, 2.8);
glowCdjL.position.set(-1.1, 0.45, -3.0);
scene.add(glowCdjL);
const glowCdjR = new THREE.PointLight(0xff3300, 9, 2.8);
glowCdjR.position.set(1.1, 0.45, -3.0);
scene.add(glowCdjR);

// ── ROOM GEOMETRY ─────────────────────────────────────────────────────────────

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 16),
  new THREE.MeshStandardMaterial({ color: 0x030303, roughness: 0.99, metalness: 0.01 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.set(0, 0, -2);
floor.receiveShadow = true;
scene.add(floor);

// Back wall
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 7.5), wallMat());
backWall.position.set(0, 3.75, -5.8);
scene.add(backWall);

// Left wall
const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(15, 7.5), wallMat());
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-9, 3.75, -1.5);
scene.add(leftWall);

// Right wall
const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(15, 7.5), wallMat());
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.set(9, 3.75, -1.5);
scene.add(rightWall);

// Ceiling
const ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 16),
  new THREE.MeshStandardMaterial({ color: 0x020202, roughness: 0.99 })
);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.set(0, 6.4, -2);
scene.add(ceiling);

// Back wall LED strip (base)
const ledBase = new THREE.Mesh(
  new THREE.BoxGeometry(18, 0.045, 0.045),
  emissive(0xff0000, 6)
);
ledBase.position.set(0, 0.025, -5.65);
scene.add(ledBase);

// Back wall LED strip (mid accent)
const ledMid = new THREE.Mesh(
  new THREE.BoxGeometry(18, 0.028, 0.028),
  emissive(0x550000, 2.5)
);
ledMid.position.set(0, 1.4, -5.65);
scene.add(ledMid);

// Floor edge strip (front)
const ledFloor = new THREE.Mesh(
  new THREE.BoxGeometry(18, 0.025, 0.025),
  emissive(0xff0000, 3)
);
ledFloor.position.set(0, 0.01, 4.5);
scene.add(ledFloor);

// ── CEILING TRUSS ─────────────────────────────────────────────────────────────

function buildTruss(zPos) {
  const g = new THREE.Group();
  const bar = new THREE.Mesh(new THREE.BoxGeometry(16, 0.09, 0.09), trussMatFn());
  g.add(bar);
  for (let x = -7.5; x <= 7.5; x += 1.2) {
    const v = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.35, 0.035), trussMatFn());
    v.position.set(x, -0.2, 0);
    g.add(v);
  }
  const barLow = new THREE.Mesh(new THREE.BoxGeometry(16, 0.05, 0.05), trussMatFn());
  barLow.position.y = -0.35;
  g.add(barLow);
  g.position.set(0, 6.1, zPos);
  scene.add(g);
}

buildTruss(-0.8);
buildTruss(-3.2);

// ── PAR CANS ──────────────────────────────────────────────────────────────────

const parCans = [];

function buildParCan(xPos, zPos, col, txPos, tzPos, baseIntensity) {
  const g = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.115, 0.135, 0.28, 14),
    new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.92, roughness: 0.28 })
  );
  g.add(body);

  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.022, 16),
    emissive(col, 3.5)
  );
  lens.position.y = -0.15;
  g.add(lens);

  const hanger = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.28, 6),
    trussMatFn()
  );
  hanger.position.y = 0.26;
  g.add(hanger);

  g.rotation.z = Math.PI;
  g.position.set(xPos, 5.82, zPos);
  scene.add(g);

  const spot = new THREE.SpotLight(col, baseIntensity, 13, Math.PI / 8.5, 0.44);
  spot.position.set(xPos, 5.75, zPos);
  scene.add(spot); scene.add(spot.target);
  spot.target.position.set(txPos, 0, tzPos);
  spot.target.updateMatrixWorld();

  parCans.push({ spot, lens: lens.material, base: baseIntensity });
}

// Front truss
buildParCan(-6,   -0.8, 0xff0000, -4.5, -2.5, 55);
buildParCan(-2.8, -0.8, 0xff0900, -1.5, -2.5, 48);
buildParCan( 0,   -0.8, 0xff0000,  0,   -2.5, 65);
buildParCan( 2.8, -0.8, 0xff0900,  1.5, -2.5, 48);
buildParCan( 6,   -0.8, 0xff0000,  4.5, -2.5, 55);

// Back truss — over DJ
buildParCan(-3.2, -3.2, 0xffffff, -1.5, -3.0, 38);
buildParCan( 0,   -3.2, 0xff0000,  0,   -3.0, 60);
buildParCan( 3.2, -3.2, 0xffffff,  1.5, -3.0, 38);

// ── SPEAKER CABINETS ──────────────────────────────────────────────────────────

const speakerLeds = [];

function buildSpeaker(xPos) {
  const g   = new THREE.Group();
  const dir = xPos < 0 ? 1 : -1;

  // Main cabinet
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(0.88, 2.2, 0.74),
    new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.93, metalness: 0.07 })
  );
  cab.castShadow = true;
  g.add(cab);

  // Top sub-cabinet (tweeter box)
  const topCab = new THREE.Mesh(
    new THREE.BoxGeometry(0.88, 0.82, 0.72),
    new THREE.MeshStandardMaterial({ color: 0x070707, roughness: 0.94 })
  );
  topCab.position.y = 1.51;
  g.add(topCab);

  // Woofer × 2
  [0.32, -0.48].forEach(yOff => {
    const ring = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.058, 32),
      new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.92 })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, yOff, 0.375 * dir);
    g.add(ring);

    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.30, 0.07, 32),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.98 })
    );
    cone.rotation.x = Math.PI / 2;
    cone.position.set(0, yOff, 0.38 * dir);
    g.add(cone);
  });

  // Midrange
  const mid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.112, 0.112, 0.042, 16),
    new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.88 })
  );
  mid.rotation.x = -Math.PI / 2;
  mid.position.set(0, 1.5, 0.375 * dir);
  g.add(mid);

  // Tweeter horn
  const horn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.088, 0.032, 0.13, 16),
    new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.9 })
  );
  horn.rotation.x = -Math.PI / 2;
  horn.position.set(0, 1.72, 0.382 * dir);
  g.add(horn);

  // Bass port
  const port = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.082, 0.042),
    new THREE.MeshStandardMaterial({ color: 0x020202 })
  );
  port.position.set(0, -0.96, 0.38 * dir);
  g.add(port);

  // Grill lines
  for (let y = -0.96; y <= 0.96; y += 0.11) {
    const rod = new THREE.Mesh(
      new THREE.BoxGeometry(0.82, 0.01, 0.016),
      new THREE.MeshStandardMaterial({ color: 0x0d0d0d })
    );
    rod.position.set(0, y, 0.406 * dir);
    g.add(rod);
  }

  // Red LED bottom
  const led = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.038, 0.022),
    emissive(0xff0000, 5)
  );
  led.position.set(0, -1.12, 0.38 * dir);
  g.add(led);
  speakerLeds.push(led.material);

  // Speaker point light
  const spLight = new THREE.PointLight(0xff0000, 10, 3.5);
  spLight.position.set(0, -1.12, 0.5 * dir);
  g.add(spLight);

  g.position.set(xPos, 1.1, -4.4);
  scene.add(g);
  return g;
}

buildSpeaker(-4.4);
buildSpeaker( 4.4);

// ── DJ TABLE ──────────────────────────────────────────────────────────────────

const djTableTop = new THREE.Mesh(
  new THREE.BoxGeometry(3.8, 0.06, 1.2),
  new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.5, metalness: 0.6 })
);
djTableTop.position.set(0, -0.03, -3.0);
djTableTop.receiveShadow = true;
scene.add(djTableTop);

const tableFace = new THREE.Mesh(
  new THREE.BoxGeometry(3.8, 0.52, 0.04),
  darkMetal()
);
tableFace.position.set(0, -0.29, -2.38);
scene.add(tableFace);

const tableBack2 = tableFace.clone();
tableBack2.position.set(0, -0.29, -3.62);
scene.add(tableBack2);

[-1.82, 1.82].forEach(xOff => {
  const leg = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.88, 0.08), darkMetal()
  );
  leg.position.set(xOff, -0.47, -3.0);
  scene.add(leg);
});

// ── CDJ BUILDER ───────────────────────────────────────────────────────────────

function buildCDJ(xPos) {
  const g = new THREE.Group();

  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.1, 0.88), darkMetal()));

  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.41, 0.025, 64), chrome());
  ring.position.y = 0.062; g.add(ring);

  const platter = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.03, 64), chrome());
  platter.position.y = 0.08; g.add(platter);

  const vinylMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.335, 0.335, 0.008, 64), vinyl());
  vinylMesh.position.y = 0.099; g.add(vinylMesh);

  for (let r = 0.1; r < 0.32; r += 0.022) {
    const groove = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.001, 4, 64),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    groove.rotation.x = Math.PI / 2;
    groove.position.y = 0.104;
    g.add(groove);
  }

  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.065, 0.009, 32),
    emissive(0xff1100, 3)
  );
  label.position.y = 0.105; g.add(label);

  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(0.27, 0.004, 0.16),
    emissive(0xff1500, 4.5)
  );
  screen.position.set(-0.24 * Math.sign(xPos || -1), 0.052, -0.27);
  g.add(screen);

  const playBtn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.027, 0.027, 0.012, 20),
    emissive(0xff0000, 3)
  );
  playBtn.position.set(-0.03, 0.056, 0.28); g.add(playBtn);

  const cueBtn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.012, 20),
    emissive(0xffffff, 1.5)
  );
  cueBtn.position.set(0.06, 0.056, 0.28); g.add(cueBtn);

  const pitchBg = new THREE.Mesh(
    new THREE.BoxGeometry(0.018, 0.004, 0.38),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
  );
  pitchBg.position.set(xPos > 0 ? -0.37 : 0.37, 0.052, 0.02); g.add(pitchBg);

  const pitchH = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.014, 0.038), faderMat()
  );
  pitchH.position.set(xPos > 0 ? -0.37 : 0.37, 0.059, 0.0); g.add(pitchH);

  g.position.set(xPos, 0, -3.0);
  g.castShadow = true;
  scene.add(g);
  return { platter, vinyl: vinylMesh, label };
}

// ── MIXER BUILDER ─────────────────────────────────────────────────────────────

function buildMixer() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.14, 0.68), darkMetal()));

  [-0.12, 0, 0.12].forEach((xOff, ch) => {
    const faderH = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.018, 0.036), faderMat()
    );
    faderH.position.set(xOff, 0.083, 0.03 + (ch - 1) * 0.04);
    g.add(faderH);

    for (let eq = 0; eq < 3; eq++) {
      const knob = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.022, 14),
        new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.4, metalness: 0.85 })
      );
      knob.position.set(xOff, 0.083, -0.22 + eq * 0.085);
      g.add(knob);
    }

    const vu = new THREE.Mesh(
      new THREE.BoxGeometry(0.022, 0.12, 0.008),
      emissive(0xff2200, 2.5)
    );
    vu.position.set(xOff, 0.13, -0.32);
    g.add(vu);
  });

  const xH = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.018, 0.03), faderMat());
  xH.position.set(-0.07, 0.083, 0.29); g.add(xH);

  const masterKnob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.028, 0.028, 0.028, 20),
    emissive(0xffffff, 0.9)
  );
  masterKnob.position.set(0, 0.085, -0.28); g.add(masterKnob);

  g.position.set(0, 0, -3.0);
  scene.add(g);
  return g;
}

// ── BUILD SETUP ───────────────────────────────────────────────────────────────

const leftCDJ  = buildCDJ(-1.14);
const rightCDJ = buildCDJ( 1.14);
const mixer    = buildMixer();

const vuMeters = [];
mixer.children.forEach(c => {
  if (c.material?.emissive?.r > 0.5) vuMeters.push(c);
});

// ── SMOKE PARTICLES ───────────────────────────────────────────────────────────

const PARTICLE_COUNT = 1100;
const positions = new Float32Array(PARTICLE_COUNT * 3);
const pSizes    = new Float32Array(PARTICLE_COUNT);

function randParticle(i) {
  positions[i * 3]     = (Math.random() - 0.5) * 12;
  positions[i * 3 + 1] = Math.random() * 6.5;
  positions[i * 3 + 2] = -5.5 + Math.random() * 10;
  pSizes[i]            = 5 + Math.random() * 18;
}
for (let i = 0; i < PARTICLE_COUNT; i++) randParticle(i);

const smokeGeo = new THREE.BufferGeometry();
smokeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
scene.add(new THREE.Points(smokeGeo, new THREE.PointsMaterial({
  color: 0x441100, size: 0.09, transparent: true, opacity: 0.20,
  depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
})));

// ── PARALLAX ──────────────────────────────────────────────────────────────────

let mouseX = 0, mouseY = 0, camTX = 0, camTY = 0;

window.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', e => {
    if (e.gamma != null) mouseX = Math.max(-1, Math.min(1, e.gamma / 25));
    if (e.beta  != null) mouseY = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
  });
}

// ── RESIZE ────────────────────────────────────────────────────────────────────

window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloomPass.resolution.set(w, h);
});

// ── RARE GLITCH (subtle, professional) ────────────────────────────────────────

let glitchActive = false;

function triggerGlitch() {
  if (glitchActive) return;
  glitchActive = true;
  canvas.style.transform = `translate(${(Math.random()-0.5)*5}px,${(Math.random()-0.5)*2}px)`;
  canvas.style.filter    = `contrast(1.4) brightness(1.2) hue-rotate(${Math.random()*12}deg)`;
  setTimeout(() => {
    canvas.style.transform = '';
    canvas.style.filter    = '';
    glitchActive = false;
  }, 55 + Math.random() * 70);
  setTimeout(triggerGlitch, 14000 + Math.random() * 20000);
}
setTimeout(triggerGlitch, 10000);

// ── FILM GRAIN ────────────────────────────────────────────────────────────────

const grainEl = document.getElementById('grain-canvas');
if (grainEl) {
  const gCtx = grainEl.getContext('2d');
  grainEl.width = 320; grainEl.height = 220;
  let lastGrain = 0;
  (function grain(ts) {
    requestAnimationFrame(grain);
    if (ts - lastGrain < 50) return;
    lastGrain = ts;
    const img = gCtx.createImageData(320, 220);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255 | 0;
      img.data[i] = img.data[i+1] = img.data[i+2] = v;
      img.data[i+3] = 255;
    }
    gCtx.putImageData(img, 0, 0);
  })(0);
}

// ── ANIMATION LOOP ────────────────────────────────────────────────────────────

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t     = clock.getElapsedTime();
  const beat  = (Math.sin(t * 13.6) + 1) / 2;
  const beat2 = (Math.sin(t * 13.6 + 1.5) + 1) / 2;

  // Platter spin
  leftCDJ.platter.rotation.y  += 0.009;
  leftCDJ.vinyl.rotation.y    += 0.009;
  leftCDJ.label.rotation.y    += 0.009;
  rightCDJ.platter.rotation.y += 0.009;
  rightCDJ.vinyl.rotation.y   += 0.009;
  rightCDJ.label.rotation.y   += 0.009;

  // VU meters
  vuMeters.forEach((m, i) => {
    if (m.material) m.material.emissiveIntensity = 0.8 + (i%2===0 ? beat : beat2) * 3.8;
  });

  // Par cans
  parCans.forEach((pc, i) => {
    const b = i % 2 === 0 ? beat : beat2;
    pc.spot.intensity = pc.base * (0.6 + b * 0.5);
    pc.lens.emissiveIntensity = 2.5 + b * 2.5;
  });

  // Speaker LEDs
  speakerLeds.forEach((m, i) => {
    m.emissiveIntensity = 3 + (i === 0 ? beat : beat2) * 6;
  });

  // Main lights
  wallGlow.intensity  = 25 + beat  * 22;
  glowMixer.intensity = 18 + beat  * 16;
  glowCdjL.intensity  =  6 + beat  *  8;
  glowCdjR.intensity  =  6 + beat2 *  8;
  glowL.intensity     = 10 + beat  *  8;
  glowR.intensity     = 10 + beat2 *  8;

  // Slow spotlight sweep
  spotMain.position.x = -2.2 + Math.sin(t * 0.11) * 1.8;
  spotMain.intensity  = 130 + beat * 65;
  spotRed2.intensity  =  75 + beat2 * 35;

  // Bloom breathes
  bloomPass.strength = 1.55 + beat * 0.55;

  // LED strips breathe
  ledBase.material.emissiveIntensity = 4.5 + beat * 3;
  ledFloor.material.emissiveIntensity = 1.5 + beat2 * 2.5;

  // Smoke drift
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3 + 1] += 0.0013 + Math.random() * 0.0008;
    positions[i * 3]     += (Math.random() - 0.5) * 0.001;
    if (positions[i * 3 + 1] > 6.8) randParticle(i);
  }
  smokeGeo.attributes.position.needsUpdate = true;

  // Camera
  camTX += (mouseX * 0.16 - camTX) * 0.032;
  camTY += (-mouseY * 0.10 - camTY) * 0.032;
  camera.position.x = camTX;
  camera.position.y = 1.65 + camTY + Math.sin(t * 0.16) * 0.016;
  camera.lookAt(camTX * 0.22, 0.98, 0);

  composer.render();
}

animate();

// ── GSAP INTRO ────────────────────────────────────────────────────────────────

window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;

  gsap.to('.hero-sub',         { opacity: 1, y: 0, duration: 1.0, delay: 1.3,  ease: 'power3.out' });
  gsap.to('.hero-cta',         { opacity: 1, y: 0, duration: 0.8, delay: 1.65, ease: 'power3.out' });
  gsap.to('.hero-scroll-hint', { opacity: 1,        duration: 1.0, delay: 2.2,  ease: 'power2.out' });

  setTimeout(() => {
    document.querySelectorAll('.corner').forEach(c => c.classList.add('visible'));
    const tw = document.querySelector('.ticker-wrap');
    if (tw) tw.classList.add('visible');
  }, 2800);
});
