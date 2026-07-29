import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Hyper-Realistic 3D Persistent Wedding Rings Component
 * 
 * Features:
 * - Photo-accurate custom gold rings for NANDU and SRAVYA
 * - Environment lighting tuned to warm cream linen background (#FBF8F3)
 * - 3D stardust particles & dynamic lens flares
 * - Fluid scroll choreography & interlocking union climax
 */
export default function PersistentRings3D({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(scrollProgress);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const flare1Ref = useRef(null);
  const flare2Ref = useRef(null);
  const particleSystemRef = useRef(null);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();

    const isMobile = window.innerWidth < 768;
    const fov = isMobile ? 55 : 45;
    const camera = new THREE.PerspectiveCamera(
      fov,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // 3. WARM LINEN ENVIRONMENT REFLECTION MAP
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envCanvas = document.createElement('canvas');
    envCanvas.width = 512;
    envCanvas.height = 256;
    const ctx = envCanvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.25, '#FBF8F3');
    grad.addColorStop(0.55, '#F5EFE6');
    grad.addColorStop(0.8, '#D4AF37');
    grad.addColorStop(1, '#FBF8F3');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    scene.environment = envMap;

    // 4. LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4db, 3.8);
    keyLight.position.set(6, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4af37, 1.5);
    fillLight.position.set(-6, -4, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf5d68b, 2.8);
    rimLight.position.set(0, 6, -6);
    scene.add(rimLight);

    // 5. HELPER: DYNAMIC TEXTURE FOR ENGRAVED NAME BARS
    const createEngravedTexture = (nameText) => {
      const textCanvas = document.createElement('canvas');
      textCanvas.width = 512;
      textCanvas.height = 128;
      const tCtx = textCanvas.getContext('2d');

      const goldGrad = tCtx.createLinearGradient(0, 0, 512, 0);
      goldGrad.addColorStop(0, '#E5C158');
      goldGrad.addColorStop(0.5, '#FFF0C2');
      goldGrad.addColorStop(1, '#D4AF37');
      tCtx.fillStyle = goldGrad;
      tCtx.fillRect(0, 0, 512, 128);

      tCtx.font = '900 48px "Plus Jakarta Sans", "Inter", sans-serif';
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';

      tCtx.fillStyle = '#2A1F0D';
      tCtx.fillText(nameText, 256, 64);

      const texture = new THREE.CanvasTexture(textCanvas);
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    const nanduTexture = createEngravedTexture('N A N D U');
    const sravyaTexture = createEngravedTexture('S R A V Y A');

    // 6. ANAMORPHIC LENS GLARE TEXTURE
    const createLensGlareTexture = () => {
      const flareCanvas = document.createElement('canvas');
      flareCanvas.width = 256;
      flareCanvas.height = 256;
      const fCtx = flareCanvas.getContext('2d');

      const grad = fCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.15, 'rgba(245, 214, 139, 0.85)');
      grad.addColorStop(0.4, 'rgba(212, 175, 55, 0.3)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      fCtx.fillStyle = grad;
      fCtx.fillRect(0, 0, 256, 256);

      const streakGrad = fCtx.createLinearGradient(0, 128, 256, 128);
      streakGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      streakGrad.addColorStop(0.5, 'rgba(255, 245, 215, 0.9)');
      streakGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      fCtx.fillStyle = streakGrad;
      fCtx.fillRect(0, 124, 256, 8);

      return new THREE.CanvasTexture(flareCanvas);
    };

    const flareTexture = createLensGlareTexture();
    const flareMaterial = new THREE.SpriteMaterial({
      map: flareTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0,
    });

    // 7. GOLD MATERIALS
    const polishedGoldMat = new THREE.MeshPhysicalMaterial({
      color: 0xD4AF37,
      metalness: 0.98,
      roughness: 0.08,
      envMapIntensity: 4.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
    });


    const nanduBarMat = new THREE.MeshPhysicalMaterial({
      map: nanduTexture,
      metalness: 0.90,
      roughness: 0.12,
      envMapIntensity: 4.0,
      clearcoat: 0.8,
    });

    const sravyaBarMat = new THREE.MeshPhysicalMaterial({
      map: sravyaTexture,
      metalness: 0.90,
      roughness: 0.12,
      envMapIntensity: 4.0,
      clearcoat: 0.8,
    });

    // 8. BUILD RING 1: NANDU'S NAME BAR RING
    const ring1Group = new THREE.Group();
    const bandGeo1 = new THREE.TorusGeometry(1.1, 0.16, 32, 80);
    const bandMesh1 = new THREE.Mesh(bandGeo1, polishedGoldMat);
    ring1Group.add(bandMesh1);

    const barGeo1 = new THREE.BoxGeometry(1.05, 0.22, 0.22);
    const barMesh1 = new THREE.Mesh(barGeo1, [
      polishedGoldMat, polishedGoldMat, nanduBarMat,
      polishedGoldMat, polishedGoldMat, polishedGoldMat,
    ]);
    barMesh1.position.set(0, 1.15, 0);
    ring1Group.add(barMesh1);

    const flare1 = new THREE.Sprite(flareMaterial.clone());
    flare1.scale.set(1.4, 1.4, 1);
    flare1.position.set(0, 1.25, 0.1);
    ring1Group.add(flare1);
    flare1Ref.current = flare1;

    scene.add(ring1Group);
    ring1Ref.current = ring1Group;

    // 9. BUILD RING 2: SRAVYA'S NAME BAR RING
    const ring2Group = new THREE.Group();
    const bandGeo2 = new THREE.TorusGeometry(0.98, 0.15, 32, 80);
    const bandMesh2 = new THREE.Mesh(bandGeo2, polishedGoldMat);
    ring2Group.add(bandMesh2);

    const barGeo2 = new THREE.BoxGeometry(1.0, 0.20, 0.20);
    const barMesh2 = new THREE.Mesh(barGeo2, [
      polishedGoldMat, polishedGoldMat, sravyaBarMat,
      polishedGoldMat, polishedGoldMat, polishedGoldMat,
    ]);
    barMesh2.position.set(0, 1.03, 0);
    ring2Group.add(barMesh2);

    const flare2 = new THREE.Sprite(flareMaterial.clone());
    flare2.scale.set(1.3, 1.3, 1);
    flare2.position.set(0, 1.12, 0.1);
    ring2Group.add(flare2);
    flare2Ref.current = flare2;

    scene.add(ring2Group);
    ring2Ref.current = ring2Group;

    // 9.5 PIXELATED HEART TEXTURE FOR FLOATING PARTICLES
    const createPixelHeartTexture = () => {
      const heartCanvas = document.createElement('canvas');
      heartCanvas.width = 32;
      heartCanvas.height = 32;
      const hCtx = heartCanvas.getContext('2d');
      hCtx.clearRect(0, 0, 32, 32);
      hCtx.fillStyle = '#D4AF37';

      // Pixel art heart coordinate map (9 wide x 7 high)
      const pixelMap = [
        [1, 0], [2, 0], [6, 0], [7, 0],
        [0, 1], [1, 1], [2, 1], [3, 1], [5, 1], [6, 1], [7, 1], [8, 1],
        [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2],
        [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
        [2, 4], [3, 4], [4, 4], [5, 4], [6, 4],
        [3, 5], [4, 5], [5, 5],
        [4, 6]
      ];

      const scale = 3;
      const offsetX = 1.1;
      const offsetY = 2;

      pixelMap.forEach(([px, py]) => {
        hCtx.fillRect(Math.floor((px + offsetX) * scale), Math.floor((py + offsetY) * scale), scale, scale);
      });

      const texture = new THREE.CanvasTexture(heartCanvas);
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      return texture;
    };

    const heartTexture = createPixelHeartTexture();

    // 10. 3D STARDUST HEART PARTICLES (With random per-heart opacities)
    const particleCount = isMobile ? 60 : 105;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 14;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Random opacity for each heart (ranging from soft 0.25 to bright 0.95)
      const randomOpacity = 0.25 + Math.random() * 0.70;
      particleColors[i * 3] = randomOpacity;
      particleColors[i * 3 + 1] = randomOpacity;
      particleColors[i * 3 + 2] = randomOpacity;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      map: heartTexture,
      vertexColors: true,
      size: isMobile ? 0.35 : 0.45,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // 11. ANIMATION LOOP & SCROLL CHOREOGRAPHY
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const progress = Math.min(Math.max(scrollRef.current, 0), 1);

      if (ring1Ref.current && ring2Ref.current) {
        const ring1 = ring1Ref.current;
        const ring2 = ring2Ref.current;

        const swayY = Math.sin(elapsedTime * 1.5) * 0.12;
        const swayX = Math.cos(elapsedTime * 1.2) * 0.08;

        if (progress < 0.25) {
          const p = progress / 0.25;

          const r1X = THREE.MathUtils.lerp(-1.5, -1.0, p) + swayX;
          const r1Y = THREE.MathUtils.lerp(0.7, 0.35, p) + swayY;
          ring1.position.set(r1X, r1Y, 0);
          ring1.rotation.set(0.7 + Math.sin(elapsedTime * 0.5) * 0.1, 0.5 + p * 0.8, 0.2);

          const r2X = THREE.MathUtils.lerp(1.5, 1.0, p) - swayX;
          const r2Y = THREE.MathUtils.lerp(0.35, 0.0, p) - swayY;
          ring2.position.set(r2X, r2Y, 0.3);
          ring2.rotation.set(-0.6 - Math.cos(elapsedTime * 0.5) * 0.1, -0.4 + p * 1.0, -0.3);

        } else if (progress < 0.70) {
          const p = (progress - 0.25) / 0.45;
          const angle = p * Math.PI * 4 + elapsedTime * 0.7;
          const orbitRadius = THREE.MathUtils.lerp(1.3, 0.75, p);

          ring1.position.x = -Math.cos(angle) * orbitRadius + swayX;
          ring1.position.y = Math.sin(angle * 0.8) * 0.8 + swayY;
          ring1.position.z = Math.sin(angle) * 1.1;
          ring1.rotation.x = angle * 0.6;
          ring1.rotation.y = angle * 0.8 + 0.4;
          ring1.rotation.z = Math.sin(elapsedTime) * 0.4;

          ring2.position.x = Math.cos(angle) * orbitRadius - swayX;
          ring2.position.y = -Math.sin(angle * 0.8) * 0.8 - swayY;
          ring2.position.z = -Math.sin(angle * 1.1);
          ring2.rotation.x = -angle * 0.7;
          ring2.rotation.y = -angle * 1.0 - 0.4;
          ring2.rotation.z = -Math.cos(elapsedTime) * 0.4;

        } else {
          const p = (progress - 0.70) / 0.30;
          const easeP = Math.pow(p, 2);

          const lock1X = THREE.MathUtils.lerp(-0.7, -0.32, easeP);
          const lock1Y = THREE.MathUtils.lerp(0.2, 0.0, easeP) + swayY * (1 - easeP);
          const lock1Z = THREE.MathUtils.lerp(0.4, 0.0, easeP);

          ring1.position.set(lock1X, lock1Y, lock1Z);
          ring1.rotation.x = THREE.MathUtils.lerp(ring1.rotation.x, 0.55, 0.1);
          ring1.rotation.y = THREE.MathUtils.lerp(ring1.rotation.y, 0.85, 0.1);
          ring1.rotation.z = THREE.MathUtils.lerp(ring1.rotation.z, 0.25, 0.1);

          const lock2X = THREE.MathUtils.lerp(0.7, 0.32, easeP);
          const lock2Y = THREE.MathUtils.lerp(-0.2, 0.0, easeP) - swayY * (1 - easeP);
          const lock2Z = THREE.MathUtils.lerp(-0.4, 0.0, easeP);

          ring2.position.set(lock2X, lock2Y, lock2Z);
          ring2.rotation.x = THREE.MathUtils.lerp(ring2.rotation.x, -0.65, 0.1);
          ring2.rotation.y = THREE.MathUtils.lerp(ring2.rotation.y, -0.75, 0.1);
          ring2.rotation.z = THREE.MathUtils.lerp(ring2.rotation.z, -0.35, 0.1);
        }

        // Lens Flares
        if (flare1Ref.current && flare2Ref.current) {
          const flarePulse1 = Math.max(0, Math.sin(elapsedTime * 2.5 + ring1.rotation.y) * 0.95);
          const flarePulse2 = Math.max(0, Math.cos(elapsedTime * 2.8 + ring2.rotation.y) * 0.95);

          flare1Ref.current.material.opacity = flarePulse1;
          flare2Ref.current.material.opacity = flarePulse2;

          flare1Ref.current.scale.setScalar(1.2 + flarePulse1 * 0.8);
          flare2Ref.current.scale.setScalar(1.1 + flarePulse2 * 0.8);
        }
      }

      // Orbit Stardust Particles (Slow, dreamy floating motion)
      if (particleSystemRef.current) {
        const pPositions = particleSystemRef.current.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          pPositions[i * 3 + 1] += Math.sin(elapsedTime * 0.4 + i) * 0.0008;
          pPositions[i * 3] += Math.cos(elapsedTime * 0.4 + i) * 0.0005;
        }
        particleSystemRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // ── SCROLL-DRIVEN LIGHTING ADAPTATION ──
      // Smooth bell-curve "darkness factor": 0 in light zones, 1 at deepest dark (progress ≈ 0.5)
      const darkCenter = 0.5;
      const darkWidth = 0.18; // controls how wide the dark zone is
      const rawDark = Math.exp(-Math.pow((progress - darkCenter) / darkWidth, 2));
      const darkFactor = Math.max(0, Math.min(rawDark, 1));

      // Ambient: warm cream in light → deep emerald-tinted in dark
      const ambR = THREE.MathUtils.lerp(1.0, 0.15, darkFactor);
      const ambG = THREE.MathUtils.lerp(0.97, 0.25, darkFactor);
      const ambB = THREE.MathUtils.lerp(0.93, 0.18, darkFactor);
      ambientLight.color.setRGB(ambR, ambG, ambB);
      ambientLight.intensity = THREE.MathUtils.lerp(2.0, 0.6, darkFactor);

      // Key light: bright warm → dimmer, more gold
      keyLight.intensity = THREE.MathUtils.lerp(3.8, 2.0, darkFactor);

      // Fill light: subtle gold → stronger to catch ring edges in dark
      fillLight.intensity = THREE.MathUtils.lerp(1.5, 3.5, darkFactor);

      // Rim light: moderately bright → intense halo for dark backgrounds
      rimLight.intensity = THREE.MathUtils.lerp(2.8, 6.0, darkFactor);

      // Tone mapping exposure: brighter rings pop more in dark
      renderer.toneMappingExposure = THREE.MathUtils.lerp(1.4, 2.2, darkFactor);

      // Heart Particles: per-particle vertex opacities preserved
      particleMat.opacity = 1.0;

      // ── MATERIAL ADAPTATION: kill white env reflections in dark zone ──
      // Reduce envMap intensity so rings reflect less of the white environment map
      polishedGoldMat.envMapIntensity = THREE.MathUtils.lerp(4.5, 0.8, darkFactor);
      polishedGoldMat.clearcoat = THREE.MathUtils.lerp(1.0, 0.2, darkFactor);
      polishedGoldMat.clearcoatRoughness = THREE.MathUtils.lerp(0.04, 0.4, darkFactor);
      polishedGoldMat.roughness = THREE.MathUtils.lerp(0.08, 0.22, darkFactor);

      nanduBarMat.envMapIntensity = THREE.MathUtils.lerp(4.0, 0.6, darkFactor);
      nanduBarMat.clearcoat = THREE.MathUtils.lerp(0.8, 0.15, darkFactor);

      sravyaBarMat.envMapIntensity = THREE.MathUtils.lerp(4.0, 0.6, darkFactor);
      sravyaBarMat.clearcoat = THREE.MathUtils.lerp(0.8, 0.15, darkFactor);


      // Dim lens flares in dark zone (white additive glow looks wrong on dark bg)
      if (flare1Ref.current && flare2Ref.current) {
        const flareScale = THREE.MathUtils.lerp(1.0, 0.25, darkFactor);
        flare1Ref.current.material.opacity *= flareScale;
        flare2Ref.current.material.opacity *= flareScale;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const mobile = width < 768;

      camera.aspect = width / height;
      camera.fov = mobile ? 55 : 45;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      pmremGenerator.dispose();
      envTexture.dispose();
      heartTexture.dispose();
      nanduTexture.dispose();
      sravyaTexture.dispose();
      flareTexture.dispose();
      flareMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 'var(--z-canvas, 10)',
      }}
      aria-hidden="true"
    />
  );
}
