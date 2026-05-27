/* INDICATE — index.js — Three.js DJ Booth Scene */

import * as THREE from 'three';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// ── RENDERER ─────────────────────────────────────────────────────────────────

const canvas   = document.getElementById('scene-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping        = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled  = true;
renderer.shadowMap.type     = THREE.PCFSoftShadowMap;

// ── SCENE / CAMERA ────────────────────────────────────────────────────────────

const scene  = new THREE.Scene();
scene.fog    = new THREE.FogExp2(0x000000, 0.12);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.set(0, 2.2, 4.4);
camera.lookAt(0, 0.15, 0);

// ── POST-PROCESSING ───────────────────────────────────────────────────────────

const composer   = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass  = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.9,   // strength
  0.65,  // radius
  0.12   // threshold — only emissive parts bloom
);
composer.addPass(bloomPass);

// ── MATERIALS ─────────────────────────────────────────────────────────────────

const MAT = {
  darkMetal:  new THREE.MeshStandardMaterial({ color: 0x0f0f0f, roughness: 0.35, metalness: 0.85 }),
  chrome:     new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.15, metalness: 0.98 }),
  vinyl:      new THREE.MeshStandardMaterial({ color: 0x060606, roughness: 0.8,  metalness: 0.05 }),
  screenRed:  new THREE.MeshStandardMaterial({ color: 0xff1500, emissive: new THREE.Color(0xff1500), emissiveIntensity: 4 }),
  screenDim:  new THREE.MeshStandardMaterial({ color: 0x441100, emissive: new THREE.Color(0x441100), emissiveIntensity: 2 }),
  btnRed:     new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: new THREE.Color(0xff0000), emissiveIntensity: 3 }),
  btnWhite:   new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: new THREE.Color(0xffffff), emissiveIntensity: 1.5 }),
  fader:      new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.3, metalness: 0.7 }),
  floor:      new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9, metalness: 0.1 }),
  table:      new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.5, metalness: 0.6 }),
};

// ── LIGHTS ───────────────────────────────────────────────────────────────────

scene.add(new THREE.AmbientLight(0x050505, 1));

// Main red spot — upper left
const spotRed = new THREE.SpotLight(0xff1100, 120, 12, Math.PI / 8, 0.4);
spotRed.position.set(-3, 6, 2);
spotRed.castShadow = true;
spotRed.shadow.mapSize.set(1024, 1024);
scene.add(spotRed);
scene.add(spotRed.target);
spotRed.target.position.set(-0.5, 0, 0);

// White fill — upper right
const spotWhite = new THREE.SpotLight(0xffffff, 40, 10, Math.PI / 7, 0.5);
spotWhite.position.set(3.5, 5.5, 1.5);
scene.add(spotWhite);
scene.add(spotWhite.target);
spotWhite.target.position.set(0.5, 0, 0);

// Glow under mixer
const glowMixer = new THREE.PointLight(0xff2200, 18, 3.5);
glowMixer.position.set(0, 0.6, 0.2);
scene.add(glowMixer);

// Subtle glow on CDJs
const glowL = new THREE.PointLight(0xff3300, 8, 2.5);
glowL.position.set(-1.1, 0.45, 0);
scene.add(glowL);

const glowR = new THREE.PointLight(0xff3300, 8, 2.5);
glowR.position.set(1.1, 0.45, 0);
scene.add(glowR);

// ── TABLE ────────────────────────────────────────────────────────────────────

const table = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.06, 1.2), MAT.table);
table.position.set(0, -0.03, 0.05);
table.receiveShadow = true;
scene.add(table);

// Table side panels
const tableFront = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.5, 0.04), MAT.darkMetal);
tableFront.position.set(0, -0.28, 0.67);
scene.add(tableFront);

const tableBack = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.5, 0.04), MAT.darkMetal);
tableBack.position.set(0, -0.28, -0.57);
scene.add(tableBack);

// Floor
const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), MAT.floor);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.53;
floor.receiveShadow = true;
scene.add(floor);

// ── CDJ BUILDER ──────────────────────────────────────────────────────────────

function buildCDJ(xPos) {
  const g = new THREE.Group();

  // ── Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.1, 0.88), MAT.darkMetal.clone());
  body.castShadow = true;
  g.add(body);

  // ── Platter ring (static base)
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.41, 0.025, 72), MAT.chrome.clone());
  ring.position.y = 0.062;
  g.add(ring);

  // ── Platter (spins)
  const platter = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.03, 72), MAT.chrome.clone());
  platter.position.y = 0.08;
  g.add(platter);

  // ── Vinyl record
  const vinyl = new THREE.Mesh(new THREE.CylinderGeometry(0.335, 0.335, 0.008, 72), MAT.vinyl.clone());
  vinyl.position.y = 0.099;
  g.add(vinyl);

  // Vinyl grooves: concentric thin rings
  for (let r = 0.1; r < 0.32; r += 0.022) {
    const groove = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.001, 4, 72),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    groove.rotation.x = Math.PI / 2;
    groove.position.y = 0.104;
    g.add(groove);
  }

  // ── Record label (red glowing center disc)
  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.065, 0.009, 32),
    new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: new THREE.Color(0xff1100), emissiveIntensity: 3 })
  );
  label.position.y = 0.105;
  g.add(label);

  // ── Screen (emissive red)
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.004, 0.16), MAT.screenRed.clone());
  screen.position.set(-0.24 * Math.sign(xPos === 0 ? -1 : xPos), 0.052, -0.27);
  g.add(screen);

  // ── Screen frame
  const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.006, 0.19),
    new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3, metalness: 0.9 }));
  screenFrame.position.set(-0.24 * Math.sign(xPos === 0 ? -1 : xPos), 0.051, -0.27);
  g.add(screenFrame);

  // ── Play button (red)
  const playBtn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.027, 0.027, 0.012, 20),
    MAT.btnRed.clone()
  );
  playBtn.position.set(-0.03, 0.056, 0.28);
  g.add(playBtn);

  // ── Cue button (white)
  const cueBtn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.012, 20),
    MAT.btnWhite.clone()
  );
  cueBtn.position.set(0.05, 0.056, 0.28);
  g.add(cueBtn);

  // ── Pitch strip
  const pitchBg = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.004, 0.38),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 }));
  pitchBg.position.set(xPos > 0 ? -0.37 : 0.37, 0.052, 0.02);
  g.add(pitchBg);

  const pitchHandle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.014, 0.038), MAT.fader.clone());
  pitchHandle.position.set(xPos > 0 ? -0.37 : 0.37, 0.059, 0.0);
  g.add(pitchHandle);

  // ── Jog-wheel outer markers (small dots around platter edge)
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const dot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.007, 0.007, 0.005, 8),
      new THREE.MeshStandardMaterial({ color: 0x444444 })
    );
    dot.position.set(Math.cos(angle) * 0.39, 0.083, Math.sin(angle) * 0.39);
    g.add(dot);
  }

  // ── Small buttons grid (track search, loop etc.)
  const btnColors = [0x333333, 0x222222, 0x333333, 0x222222, 0x333333, 0x444444];
  btnColors.forEach((col, i) => {
    const bx = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.008, 0.04),
      new THREE.MeshStandardMaterial({ color: col, roughness: 0.5 }));
    bx.position.set(-0.24 * Math.sign(xPos === 0 ? -1 : xPos) + (i % 3 - 1) * 0.058, 0.054,
      -0.07 + Math.floor(i / 3) * 0.07);
    g.add(bx);
  });

  g.position.set(xPos, 0, 0);
  g.castShadow = true;

  scene.add(g);
  return { group: g, platter, vinyl, label };
}

// ── MIXER BUILDER ─────────────────────────────────────────────────────────────

function buildMixer() {
  const g = new THREE.Group();

  // Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.14, 0.68), MAT.darkMetal.clone());
  body.castShadow = true;
  g.add(body);

  // Channel strips (3 channels)
  [-0.12, 0, 0.12].forEach((xOff, ch) => {
    // Channel label strip
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.004, 0.22),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 }));
    strip.position.set(xOff, 0.072, 0.03);
    g.add(strip);

    // Channel fader handle
    const faderHandle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.018, 0.036), MAT.fader.clone());
    faderHandle.position.set(xOff, 0.083, 0.03 + (ch - 1) * 0.04);
    g.add(faderHandle);

    // EQ knobs (3: hi / mid / lo)
    for (let eq = 0; eq < 3; eq++) {
      const knob = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.022, 16),
        new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.4, metalness: 0.85 })
      );
      knob.position.set(xOff, 0.083, -0.22 + eq * 0.085);
      g.add(knob);

      // Knob indicator dot
      const dot = new THREE.Mesh(
        new THREE.BoxGeometry(0.004, 0.003, 0.012),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: new THREE.Color(0xffffff), emissiveIntensity: 1 })
      );
      dot.position.set(xOff, 0.094, -0.22 + eq * 0.085 - 0.019);
      g.add(dot);
    }

    // VU meter (glowing bar per channel)
    const vu = new THREE.Mesh(
      new THREE.BoxGeometry(0.022, 0.12, 0.008),
      new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: new THREE.Color(0xff2200), emissiveIntensity: 2.5 })
    );
    vu.position.set(xOff, 0.13, -0.32);
    g.add(vu);
  });

  // Crossfader strip
  const xStrip = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.004, 0.018),
    new THREE.MeshStandardMaterial({ color: 0x111111 }));
  xStrip.position.set(0, 0.072, 0.29);
  g.add(xStrip);

  const xHandle = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.018, 0.03), MAT.fader.clone());
  xHandle.position.set(-0.07, 0.083, 0.29);
  g.add(xHandle);

  // Master volume knob (big, top center)
  const masterKnob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.028, 0.028, 0.028, 20),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: new THREE.Color(0xffffff), emissiveIntensity: 0.8 })
  );
  masterKnob.position.set(0, 0.085, -0.28);
  g.add(masterKnob);

  // Headphone volume knob
  const hpKnob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.022, 20),
    new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: new THREE.Color(0xff0000), emissiveIntensity: 2 })
  );
  hpKnob.position.set(0.16, 0.083, 0.26);
  g.add(hpKnob);

  scene.add(g);
  return g;
}

// ── BUILD THE SETUP ───────────────────────────────────────────────────────────

const leftCDJ  = buildCDJ(-1.14);
const rightCDJ = buildCDJ( 1.14);
const mixer    = buildMixer();

// VU meter refs for pulsing
const vuMeters = [];
mixer.children.forEach(c => {
  if (c.material && c.material.emissive && c.material.emissive.r > 0.5) {
    vuMeters.push(c);
  }
});

// ── SMOKE PARTICLES ───────────────────────────────────────────────────────────

const PARTICLE_COUNT = 500;
const positions      = new Float32Array(PARTICLE_COUNT * 3);
const sizes          = new Float32Array(PARTICLE_COUNT);
const opacities      = new Float32Array(PARTICLE_COUNT);

function randParticle(i) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 3.2;
  positions[i * 3 + 1] = Math.random() * 2.5;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 0.9;
  sizes[i]    = 4 + Math.random() * 14;
  opacities[i] = 0.05 + Math.random() * 0.25;
}

for (let i = 0; i < PARTICLE_COUNT; i++) randParticle(i);

const smokeGeo = new THREE.BufferGeometry();
smokeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
smokeGeo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

const smokeMat = new THREE.PointsMaterial({
  color: 0x553322,
  size: 0.06,
  transparent: true,
  opacity: 0.18,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true,
});

scene.add(new THREE.Points(smokeGeo, smokeMat));

// ── MOUSE PARALLAX ────────────────────────────────────────────────────────────

let mouseX = 0, mouseY = 0;
let camTargetX = 0, camTargetY = 0;

window.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ── RESIZE ────────────────────────────────────────────────────────────────────

window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
  bloomPass.resolution.set(w, h);
});

// ── GLITCH TRIGGER ────────────────────────────────────────────────────────────

let glitchActive = false;

function triggerGlitch() {
  if (glitchActive) return;
  glitchActive = true;

  const el = canvas;
  const startFilter = `contrast(3) brightness(2) hue-rotate(${Math.random()*30}deg)`;
  el.style.filter = startFilter;
  el.style.transform = `translate(${(Math.random()-0.5)*6}px, ${(Math.random()-0.5)*3}px)`;

  setTimeout(() => {
    el.style.filter = '';
    el.style.transform = '';
    glitchActive = false;
  }, 80 + Math.random() * 60);

  const next = 5000 + Math.random() * 12000;
  setTimeout(triggerGlitch, next);
}

setTimeout(triggerGlitch, 4000);

// ── ANIMATION LOOP ────────────────────────────────────────────────────────────

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t  = clock.getElapsedTime();

  // Platter spin
  leftCDJ.platter.rotation.y  += 0.009;
  leftCDJ.vinyl.rotation.y    += 0.009;
  leftCDJ.label.rotation.y    += 0.009;
  rightCDJ.platter.rotation.y += 0.009;
  rightCDJ.vinyl.rotation.y   += 0.009;
  rightCDJ.label.rotation.y   += 0.009;

  // VU meters pulse (simulate beat at ~130 BPM)
  const beat = (Math.sin(t * 13.6) + 1) / 2; // ~130 BPM
  const vu2  = (Math.sin(t * 13.6 + 1.5) + 1) / 2;
  vuMeters.forEach((m, i) => {
    if (m.material) {
      m.material.emissiveIntensity = 1.0 + (i % 2 === 0 ? beat : vu2) * 3.5;
    }
  });

  // Glow pulse
  glowMixer.intensity = 14 + beat * 10;
  glowL.intensity = 5 + beat * 6;
  glowR.intensity = 5 + vu2 * 6;

  // Spot light subtle movement
  spotRed.position.x = -3 + Math.sin(t * 0.25) * 0.5;

  // Smoke particles drift up
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3 + 1] += 0.0015 + Math.random() * 0.001;
    positions[i * 3 + 0] += (Math.random() - 0.5) * 0.001;

    if (positions[i * 3 + 1] > 3.5) randParticle(i);
  }
  smokeGeo.attributes.position.needsUpdate = true;

  // Camera parallax (smooth follow)
  camTargetX += (mouseX * 0.25 - camTargetX) * 0.04;
  camTargetY += (-mouseY * 0.15 - camTargetY) * 0.04;

  camera.position.x = camTargetX;
  camera.position.y = 2.2 + camTargetY + Math.sin(t * 0.2) * 0.04;
  camera.lookAt(0, 0.15, 0);

  composer.render();
}

animate();

// ── GSAP INTRO ANIMATION ─────────────────────────────────────────────────────

window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;

  // Logo animiert via CSS @keyframes (SVG-kompatibel, kein GSAP nötig)

  // ── Sub-Titel + CTAs ──────────────────────────────────────────────────────
  gsap.to('.hero-sub', {
    opacity: 1,
    y: 0,
    duration: 1.0,
    delay: 1.3,
    ease: 'power3.out',
  });

  gsap.to('.hero-cta', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 1.65,
    ease: 'power3.out',
  });

  gsap.to('.hero-bottom', {
    opacity: 1,
    duration: 1.0,
    delay: 2.0,
    ease: 'power2.out',
  });
});
