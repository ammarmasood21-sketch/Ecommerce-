/* ==========================================================================
   AMMAR'S SHOPPING - THREE.JS INTERACTIVE 3D ENGINE
   ========================================================================== */

let scene, camera, renderer;
let productGroup;
let activeModelMesh = null;
let particleSystem;
let dynamicPointLight;
let ambientLight, dirLight;

// Track mouse movement for rotation and parallax
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: 0.1, y: -0.4 };
let currentRotation = { x: 0.1, y: -0.4 };

// Dynamic theme color maps for 3D lights and particles
const themeColors = {
  gold: 0xe5c07b,
  ruby: 0xe06c75,
  sapphire: 0x61afef,
  emerald: 0x98c379,
  shirt: 0xabb2bf,
  pants: 0xd19a66,
  ladies_dress: 0xe06c75,
  ladies_daily: 0xc678dd,
  perfume: 0xe5c07b,
  watch: 0x61afef,
  joggers: 0x98c379
};

document.addEventListener('DOMContentLoaded', () => {
  initThreeEngine();
  build3DModel('perfume'); // Default product
  animateThree();
});

/* ==========================================================================
   THREEJS CORE INITIALIZATION
   ========================================================================== */
function initThreeEngine() {
  const container = document.getElementById('canvas-3d-wrapper');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // 1. Create Scene & Camera
  scene = new THREE.Scene();
  // Add dark fog for premium depth
  scene.fog = new THREE.FogExp2(0x08080a, 0.05);

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0.5, 6);

  // 2. WebGL Renderer settings
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  container.appendChild(renderer.domElement);

  // 3. Object Group
  productGroup = new THREE.Group();
  scene.add(productGroup);

  // 4. Lights Setup
  // Ambient fill
  ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambientLight);

  // Main directional light (sun key light)
  dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(5, 8, 5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.bias = -0.001;
  scene.add(dirLight);

  // Soft backlight (rim light)
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
  rimLight.position.set(-5, 3, -5);
  scene.add(rimLight);

  // Dynamic Colored Point Light (Glow effect behind model)
  dynamicPointLight = new THREE.PointLight(themeColors.perfume, 3.5, 8);
  dynamicPointLight.position.set(0, 0.5, -1.5);
  scene.add(dynamicPointLight);

  // 5. Particle Dust Field
  createParticleDust();

  // 6. User drag interactions
  const canvasElement = renderer.domElement;
  
  canvasElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  canvasElement.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    targetRotation.y += deltaX * 0.007;
    targetRotation.x += deltaY * 0.007;

    // Limit vertical rotation to avoid flipping upside down
    targetRotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotation.x));

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  // Touch support for mobile
  canvasElement.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });

  canvasElement.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    targetRotation.y += deltaX * 0.008;
    targetRotation.x += deltaY * 0.008;
    
    targetRotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotation.x));

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  });

  // Handle Resize
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  const container = document.getElementById('canvas-3d-wrapper');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

/* ==========================================================================
   PARTICLE DUST FIELD CREATOR
   ========================================================================== */
function createParticleDust() {
  const particleCount = 200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Random coordinates inside a bounding box
    positions[i] = (Math.random() - 0.5) * 8;     // X
    positions[i + 1] = (Math.random() - 0.5) * 6; // Y
    positions[i + 2] = (Math.random() - 0.5) * 6; // Z
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Glowing circle material for points
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.04,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);
}

/* ==========================================================================
   PROCEDURAL 3D PRODUCTS GENERATOR
   ========================================================================== */
window.rebuild3DModel = function(productKey) {
  // Clear previous mesh
  if (activeModelMesh) {
    productGroup.remove(activeModelMesh);
    activeModelMesh = null;
  }

  // Create sub-group
  const model = new THREE.Group();
  
  // Standard premium materials
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37, metalness: 0.95, roughness: 0.1, envMapIntensity: 1.5
  });
  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xcccccc, metalness: 0.95, roughness: 0.05, envMapIntensity: 1.5
  });
  const blackSteelMaterial = new THREE.MeshStandardMaterial({
    color: 0x222225, metalness: 0.8, roughness: 0.2
  });
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, transparent: true, opacity: 0.35, roughness: 0.05, 
    metalness: 0.1, transmission: 0.9, ior: 1.52, thickness: 1.2
  });
  
  const activeColor = themeColors[productKey] || 0xffffff;

  switch(productKey) {
    case 'perfume':
      // 1. Perfume Liquid Core
      const liquidGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.4, 32);
      const liquidMat = new THREE.MeshStandardMaterial({
        color: activeColor, roughness: 0.1, metalness: 0.3
      });
      const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
      liquidMesh.position.y = 0.1;
      model.add(liquidMesh);

      // 2. Glass Outer Cylinder
      const glassGeo = new THREE.CylinderGeometry(0.58, 0.58, 1.5, 32);
      const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
      glassMesh.position.y = 0.1;
      model.add(glassMesh);

      // 3. Golden Cap and Neck
      const neckGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.2, 16);
      const neck = new THREE.Mesh(neckGeo, goldMaterial);
      neck.position.y = 0.95;
      model.add(neck);

      const capGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16);
      const cap = new THREE.Mesh(capGeo, goldMaterial);
      cap.position.y = 1.2;
      model.add(cap);

      // 4. Front Label Card
      const labelGeo = new THREE.PlaneGeometry(0.55, 0.6);
      const labelMat = new THREE.MeshStandardMaterial({
        color: 0x111113, roughness: 0.7, metalness: 0.1, side: THREE.DoubleSide
      });
      const label = new THREE.Mesh(labelGeo, labelMat);
      label.position.set(0, 0.1, 0.59);
      
      // Mini golden border on label
      const borderGeo = new THREE.BoxGeometry(0.57, 0.62, 0.01);
      const border = new THREE.Mesh(borderGeo, goldMaterial);
      border.position.set(0, 0.1, 0.585);
      model.add(border);
      model.add(label);
      
      model.position.y = -0.3;
      break;

    case 'watch':
      // 1. Metal Case
      const caseGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.18, 32);
      // rotate so face looks forward
      caseGeo.rotateX(Math.PI / 2);
      const watchCase = new THREE.Mesh(caseGeo, chromeMaterial);
      model.add(watchCase);

      // Bezel ring
      const bezelGeo = new THREE.TorusGeometry(0.79, 0.05, 12, 48);
      const bezel = new THREE.Mesh(bezelGeo, goldMaterial);
      bezel.position.z = 0.09;
      model.add(bezel);

      // 2. Black Inner Dial
      const dialGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.02, 32);
      dialGeo.rotateX(Math.PI / 2);
      const dialMat = new THREE.MeshStandardMaterial({ color: 0x18181c, roughness: 0.6, metalness: 0.1 });
      const dial = new THREE.Mesh(dialGeo, dialMat);
      dial.position.z = 0.08;
      model.add(dial);

      // 3. Watch crown knob
      const crownGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12);
      crownGeo.rotateZ(Math.PI / 2);
      const crown = new THREE.Mesh(crownGeo, goldMaterial);
      crown.position.set(0.86, 0, 0);
      model.add(crown);

      // 4. Straps (Lug extensions + strap mesh)
      const leatherMat = new THREE.MeshStandardMaterial({ color: 0x2c1e15, roughness: 0.85, metalness: 0 });
      
      const strapTopGeo = new THREE.BoxGeometry(0.48, 1.2, 0.07);
      const strapTop = new THREE.Mesh(strapTopGeo, leatherMat);
      strapTop.position.set(0, 1.1, -0.05);
      model.add(strapTop);

      const strapBottomGeo = new THREE.BoxGeometry(0.48, 1.2, 0.07);
      const strapBottom = new THREE.Mesh(strapBottomGeo, leatherMat);
      strapBottom.position.set(0, -1.1, -0.05);
      model.add(strapBottom);

      // 5. Watch hands (animated in loop)
      const hourHandGeo = new THREE.BoxGeometry(0.04, 0.35, 0.01);
      const hourHand = new THREE.Mesh(hourHandGeo, goldMaterial);
      hourHand.geometry.translate(0, 0.175, 0); // Offset origin to tick from center
      hourHand.position.z = 0.095;
      hourHand.name = "hourHand";
      model.add(hourHand);

      const minHandGeo = new THREE.BoxGeometry(0.03, 0.52, 0.01);
      const minHand = new THREE.Mesh(minHandGeo, goldMaterial);
      minHand.geometry.translate(0, 0.26, 0);
      minHand.position.z = 0.1;
      minHand.name = "minHand";
      model.add(minHand);

      const secHandGeo = new THREE.BoxGeometry(0.01, 0.56, 0.01);
      const secHandMat = new THREE.MeshBasicMaterial({ color: activeColor });
      const secHand = new THREE.Mesh(secHandGeo, secHandMat);
      secHand.geometry.translate(0, 0.28, 0);
      secHand.position.z = 0.105;
      secHand.name = "secHand";
      model.add(secHand);

      break;

    case 'joggers':
      // 1. Futuristic Display Podium base
      const standBaseGeo = new THREE.CylinderGeometry(1.0, 1.1, 0.15, 32);
      const standBase = new THREE.Mesh(standBaseGeo, blackSteelMaterial);
      standBase.position.y = -0.9;
      model.add(standBase);

      const standTorusGeo = new THREE.TorusGeometry(0.98, 0.04, 8, 32);
      standTorusGeo.rotateX(Math.PI / 2);
      const standTorusMat = new THREE.MeshBasicMaterial({ color: activeColor });
      const standRing = new THREE.Mesh(standTorusGeo, standTorusMat);
      standRing.position.y = -0.82;
      model.add(standRing);

      // 2. High-Top Nike Sneaker shape modeled procedurally
      const shoeGroup = new THREE.Group();
      shoeGroup.position.set(0, -0.2, 0);
      shoeGroup.rotation.set(0.1, Math.PI / 6, -0.15); // angle it elegantly

      // Sole
      const soleGeo = new THREE.BoxGeometry(1.6, 0.18, 0.55);
      const soleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
      const sole = new THREE.Mesh(soleGeo, soleMat);
      sole.position.y = -0.5;
      shoeGroup.add(sole);

      // Air Bubble window in sole
      const bubbleWindowGeo = new THREE.BoxGeometry(0.4, 0.1, 0.57);
      const bubbleMat = new THREE.MeshStandardMaterial({ color: activeColor, emissive: activeColor, emissiveIntensity: 0.5 });
      const bubbleWindow = new THREE.Mesh(bubbleWindowGeo, bubbleMat);
      bubbleWindow.position.set(-0.3, -0.5, 0);
      shoeGroup.add(bubbleWindow);

      // Shoe body main mesh
      const shoeBodyGeo = new THREE.BoxGeometry(1.4, 0.5, 0.5);
      const shoeBodyMat = new THREE.MeshStandardMaterial({ color: 0x111112, roughness: 0.8 });
      const shoeBody = new THREE.Mesh(shoeBodyGeo, shoeBodyMat);
      shoeBody.position.set(-0.05, -0.2, 0);
      shoeGroup.add(shoeBody);

      // Ankle section (high-top rise)
      const ankleGeo = new THREE.CylinderGeometry(0.24, 0.25, 0.7, 16);
      const ankleMat = new THREE.MeshStandardMaterial({ color: 0x1e1e24, roughness: 0.7 });
      const ankle = new THREE.Mesh(ankleGeo, ankleMat);
      ankle.position.set(-0.35, 0.25, 0);
      ankle.rotation.z = -Math.PI / 8;
      shoeGroup.add(ankle);

      // Toe cap (slanted box)
      const toeGeo = new THREE.BoxGeometry(0.45, 0.25, 0.48);
      const toeMat = new THREE.MeshStandardMaterial({ color: activeColor, roughness: 0.6 });
      const toe = new THREE.Mesh(toeGeo, toeMat);
      toe.position.set(0.65, -0.36, 0);
      shoeGroup.add(toe);

      // Nike Swoosh logo curve
      const logoRingGeo = new THREE.TorusGeometry(0.3, 0.05, 8, 24, Math.PI / 1.5);
      const logoRingMat = new THREE.MeshStandardMaterial({ color: activeColor, roughness: 0.3, metalness: 0.2 });
      const swoosh1 = new THREE.Mesh(logoRingGeo, logoRingMat);
      swoosh1.position.set(0, -0.15, 0.26);
      swoosh1.rotation.set(0, 0, Math.PI / 4);
      shoeGroup.add(swoosh1);
      
      const swoosh2 = new THREE.Mesh(logoRingGeo, logoRingMat);
      swoosh2.position.set(0, -0.15, -0.26);
      swoosh2.rotation.set(0, 0, Math.PI / 4);
      shoeGroup.add(swoosh2);

      model.add(shoeGroup);
      break;

    case 'shirt':
      // 1. Golden boutique Hanger
      const hangerGroup = new THREE.Group();
      
      const hangerTopGeo = new THREE.TorusGeometry(0.12, 0.02, 8, 24, Math.PI);
      const hangerTop = new THREE.Mesh(hangerTopGeo, goldMaterial);
      hangerTop.position.set(0, 1.15, 0);
      hangerGroup.add(hangerTop);

      const hangerBarGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.5, 8);
      hangerBarGeo.rotateZ(Math.PI / 2);
      const hangerBar = new THREE.Mesh(hangerBarGeo, goldMaterial);
      hangerBar.position.y = 1.0;
      hangerGroup.add(hangerBar);

      // Slanting hanger shoulder arms
      const armGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.9, 8);
      armGeo.rotateZ(Math.PI / 5);
      const armLeft = new THREE.Mesh(armGeo, goldMaterial);
      armLeft.position.set(-0.4, 0.72, 0);
      hangerGroup.add(armLeft);

      const armRight = new THREE.Mesh(armGeo, goldMaterial);
      armRight.position.set(0.4, 0.72, 0);
      armRight.rotation.z = -Math.PI / 5;
      hangerGroup.add(armRight);
      model.add(hangerGroup);

      // 2. Folded / Draped Premium Shirt
      const shirtBodyGeo = new THREE.BoxGeometry(1.2, 1.4, 0.28);
      const shirtMat = new THREE.MeshStandardMaterial({
        color: activeColor, roughness: 0.85, metalness: 0
      });
      const shirtBody = new THREE.Mesh(shirtBodyGeo, shirtMat);
      shirtBody.position.y = 0.15;
      model.add(shirtBody);

      // Collar sleeves wrapping hanger
      const collarLGeo = new THREE.BoxGeometry(0.35, 0.12, 0.1);
      const collarL = new THREE.Mesh(collarLGeo, shirtMat);
      collarL.position.set(-0.2, 0.8, 0.13);
      collarL.rotation.z = Math.PI / 6;
      model.add(collarL);

      const collarR = new THREE.Mesh(collarLGeo, shirtMat);
      collarR.position.set(0.2, 0.8, 0.13);
      collarR.rotation.z = -Math.PI / 6;
      model.add(collarR);

      // Shirt Pocket
      const pocketGeo = new THREE.BoxGeometry(0.3, 0.35, 0.02);
      const pocket = new THREE.Mesh(pocketGeo, shirtMat);
      pocket.position.set(0.3, 0.2, 0.15);
      model.add(pocket);
      
      model.position.y = -0.4;
      break;

    case 'pants':
      // 1. Pedestal and post display stand
      const baseGeo = new THREE.CylinderGeometry(0.8, 0.9, 0.08, 24);
      const stand = new THREE.Mesh(baseGeo, chromeMaterial);
      stand.position.y = -1.1;
      model.add(stand);

      const postGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8);
      const post = new THREE.Mesh(postGeo, chromeMaterial);
      post.position.set(-0.6, -0.4, 0);
      model.add(post);

      const crossbarGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 8);
      crossbarGeo.rotateZ(Math.PI / 2);
      const crossbar = new THREE.Mesh(crossbarGeo, chromeMaterial);
      crossbar.position.set(0, 0.3, 0);
      model.add(crossbar);

      // 2. Woven fabric Chinos folded over the bar
      const legGeo = new THREE.BoxGeometry(0.85, 1.1, 0.25);
      const pantsMat = new THREE.MeshStandardMaterial({
        color: activeColor, roughness: 0.9, metalness: 0
      });
      const leg1 = new THREE.Mesh(legGeo, pantsMat);
      leg1.position.set(0.1, -0.22, 0.02);
      leg1.rotation.x = 0.05;
      model.add(leg1);

      // Folded overlay fabric draping in back
      const foldGeo = new THREE.BoxGeometry(0.85, 0.45, 0.25);
      const leg2 = new THREE.Mesh(foldGeo, pantsMat);
      leg2.position.set(0.1, 0.1, -0.15);
      model.add(leg2);

      // Leather pocket details/stitching label
      const patchGeo = new THREE.BoxGeometry(0.24, 0.12, 0.01);
      const patchMat = new THREE.MeshStandardMaterial({ color: 0x6e4726, roughness: 0.8 });
      const patch = new THREE.Mesh(patchGeo, patchMat);
      patch.position.set(0.3, -0.1, 0.15);
      model.add(patch);

      break;

    case 'ladies_dress':
      // 1. Mannequin iron stand base
      const manBaseGeo = new THREE.CylinderGeometry(0.65, 0.7, 0.08, 24);
      const manBase = new THREE.Mesh(manBaseGeo, blackSteelMaterial);
      manBase.position.y = -1.25;
      model.add(manBase);

      const manPostGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.0, 8);
      const manPost = new THREE.Mesh(manPostGeo, goldMaterial);
      manPost.position.y = -0.35;
      model.add(manPost);

      // 2. Hourglass Torso mesh
      const torsoGroup = new THREE.Group();
      
      const bustGeo = new THREE.CylinderGeometry(0.32, 0.25, 0.6, 16);
      const torsoMat = new THREE.MeshStandardMaterial({ color: 0xdddddf, roughness: 0.4 });
      const bust = new THREE.Mesh(bustGeo, torsoMat);
      bust.position.y = 0.7;
      torsoGroup.add(bust);

      const hipsGeo = new THREE.CylinderGeometry(0.18, 0.35, 0.6, 16);
      const hips = new THREE.Mesh(hipsGeo, torsoMat);
      hips.position.y = 0.2;
      torsoGroup.add(hips);
      
      model.add(torsoGroup);

      // 3. Ethereal silk/satin flowing gown overlay
      const dressMat = new THREE.MeshStandardMaterial({
        color: activeColor, roughness: 0.15, metalness: 0.1, envMapIntensity: 1.2
      });
      
      // Wrap top
      const dressTopGeo = new THREE.CylinderGeometry(0.34, 0.22, 0.58, 16);
      const dressTop = new THREE.Mesh(dressTopGeo, dressMat);
      dressTop.position.y = 0.68;
      model.add(dressTop);

      // Flowing skirt bottom
      const skirtGeo = new THREE.CylinderGeometry(0.2, 0.95, 1.4, 24, 1, true); // Open bottom cylinder
      const skirt = new THREE.Mesh(skirtGeo, dressMat);
      skirt.position.y = -0.3;
      model.add(skirt);

      // Waist metallic gold belt
      const beltGeo = new THREE.TorusGeometry(0.2, 0.024, 8, 24);
      beltGeo.rotateX(Math.PI / 2);
      const belt = new THREE.Mesh(beltGeo, goldMaterial);
      belt.position.y = 0.4;
      model.add(belt);

      model.position.y = 0.15;
      break;

    case 'ladies_daily':
      // Skincare cosmetic bottle set on a marble slab
      // 1. White Marble Slab base
      const slabGeo = new THREE.BoxGeometry(1.8, 0.08, 1.2);
      const slabMat = new THREE.MeshStandardMaterial({ color: 0xeaeae2, roughness: 0.1 });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.y = -0.7;
      model.add(slab);

      // 2. Large Dropper Bottle (skincare serum)
      const serumGroup = new THREE.Group();
      serumGroup.position.set(-0.35, -0.2, 0.1);

      // Liquid inner core
      const innerSerumGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.75, 16);
      const innerSerumMat = new THREE.MeshStandardMaterial({ color: activeColor, roughness: 0.1, metalness: 0.2 });
      const innerSerum = new THREE.Mesh(innerSerumGeo, innerSerumMat);
      serumGroup.add(innerSerum);

      // Glass body
      const outerSerumGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.8, 16);
      const outerSerum = new THREE.Mesh(outerSerumGeo, glassMaterial);
      serumGroup.add(outerSerum);

      // White dropper bulb & gold lid ring
      const lidGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16);
      const lid = new THREE.Mesh(lidGeo, goldMaterial);
      lid.position.y = 0.45;
      serumGroup.add(lid);

      const bulbGeo = new THREE.CylinderGeometry(0.1, 0.14, 0.22, 12);
      const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.y = 0.6;
      serumGroup.add(bulb);
      model.add(serumGroup);

      // 3. Small Hydration Gel Jar
      const jarGroup = new THREE.Group();
      jarGroup.position.set(0.42, -0.4, -0.1);

      // Frost glass base
      const jarGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.45, 16);
      const jar = new THREE.Mesh(jarGeo, glassMaterial);
      jarGroup.add(jar);

      // Cream inner fill
      const creamGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.35, 16);
      const creamMat = new THREE.MeshStandardMaterial({ color: activeColor, roughness: 0.8 });
      const cream = new THREE.Mesh(creamGeo, creamMat);
      jarGroup.add(cream);

      // Gold lid
      const jarLidGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.1, 16);
      const jarLid = new THREE.Mesh(jarLidGeo, goldMaterial);
      jarLid.position.y = 0.25;
      jarGroup.add(jarLid);
      
      model.add(jarGroup);
      break;

    default:
      break;
  }

  // Set Shadows
  model.traverse(node => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  activeModelMesh = model;
  productGroup.add(activeModelMesh);

  // Position product group centrally
  productGroup.position.set(0, 0, 0);
  
  // Set glow backlight color matches active product
  dynamicPointLight.color.setHex(activeColor);
}

// Swatch selection updates lighting colors
window.updateThreeLights = function(colorName) {
  const hex = themeColors[colorName];
  if (!hex) return;
  dynamicPointLight.color.setHex(hex);
};

/* ==========================================================================
   ANIMATION & GAME LOOP
   ========================================================================== */
function animateThree() {
  requestAnimationFrame(animateThree);

  const time = performance.now() * 0.001;

  // 1. Smooth rotation lerp based on mouse drag targets
  if (!isDragging) {
    // Gentle floating auto rotation
    targetRotation.y += 0.003;
    targetRotation.x = 0.1 + Math.sin(time * 0.5) * 0.06; // subtle vertical oscillation
  }

  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;
  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;

  productGroup.rotation.y = currentRotation.y;
  productGroup.rotation.x = currentRotation.x;

  // Subtle floating vertical motion on productGroup
  productGroup.position.y = Math.sin(time * 1.5) * 0.08;

  // 2. Watch hand ticks (if watch is selected)
  if (activeModelMesh) {
    const hrHand = activeModelMesh.getObjectByName("hourHand");
    const mnHand = activeModelMesh.getObjectByName("minHand");
    const scHand = activeModelMesh.getObjectByName("secHand");
    
    if (scHand) {
      // Simulate ticking watch based on actual time
      const date = new Date();
      const s = date.getSeconds() + date.getMilliseconds() / 1000;
      const m = date.getMinutes() + s / 60;
      const h = date.getHours() + m / 60;

      scHand.rotation.z = -s * (Math.PI / 30);
      mnHand.rotation.z = -m * (Math.PI / 30);
      hrHand.rotation.z = -h * (Math.PI / 6);
    }
  }

  // 3. Floating particle dust rotation
  if (particleSystem) {
    particleSystem.rotation.y = time * 0.015;
    particleSystem.rotation.x = time * 0.008;
    
    // Animate pointlights intensity softly
    dynamicPointLight.intensity = 3.5 + Math.sin(time * 2.0) * 0.6;
  }

  // Render Scene
  renderer.render(scene, camera);
}
