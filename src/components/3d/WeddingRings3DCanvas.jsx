import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * World-Class 3D WebGL Wedding Rings Canvas Component
 * Built with Three.js for maximum 60fps performance on mobile & desktop.
 * 
 * Features:
 * - Two procedural 3D metallic gold wedding rings (Groom Band + Bride Solitaire Ring with Diamond gem)
 * - Dynamic scrollProgress prop (0.0 to 1.0) controlling a fluid 3D orbital dance sequence
 * - Final interlocking climax at scroll progress ~0.85 - 1.0 (rings interlock into infinite union)
 * - Floating 3D flower petals drifting in breeze
 * - Sparkling nature fireflies / golden pollen particles
 * - Procedural environment lighting map for hyper-realistic metallic gold reflections
 */
export default function WeddingRings3DCanvas({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(scrollProgress);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const gemRef = useRef(null);
  const flashLightRef = useRef(null);
  const petalsRef = useRef([]);

  // Keep ref up to date for animation loop
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    
    // Smooth dark emerald / deep botanical ambient fog
    scene.fog = new THREE.FogExp2(0x06140b, 0.04);

    // --- 2. CAMERA ---
    const isMobile = window.innerWidth < 768;
    const fov = isMobile ? 55 : 45;
    const camera = new THREE.PerspectiveCamera(
      fov,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    // --- 3. RENDERER ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- 4. PROCEDURAL ENVIRONMENT MAP FOR METALLIC GOLD REFLECTIONS ---
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // Create gradient canvas texture for env map
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 256;
    envCanvas.height = 128;
    const ctx = envCanvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, '#FFF3D1');
    grad.addColorStop(0.3, '#D4AF37');
    grad.addColorStop(0.7, '#153823');
    grad.addColorStop(1, '#06140B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 128);

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    scene.environment = envMap;

    // --- 5. LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0c2, 2.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x84a98c, 1.2);
    fillLight.position.set(-5, -4, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf5d68b, 2.0);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Flash light for interlocking climax
    const flashLight = new THREE.PointLight(0xfff7d4, 0, 15);
    flashLight.position.set(0, 0, 1);
    scene.add(flashLight);
    flashLightRef.current = flashLight;

    // --- 6. MATERIALS ---
    // Groom Gold Band Material
    const groomGoldMat = new THREE.MeshStandardMaterial({
      color: 0xE6B84A,
      metalness: 0.95,
      roughness: 0.12,
      envMapIntensity: 2.5,
    });

    // Bride Rose/Yellow Gold Material
    const brideGoldMat = new THREE.MeshStandardMaterial({
      color: 0xF5C767,
      metalness: 0.92,
      roughness: 0.15,
      envMapIntensity: 2.8,
    });

    // Solitaire Diamond Gem Material
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.02,
      transmission: 0.95,
      thickness: 0.5,
      ior: 2.4,
      reflectivity: 0.9,
      envMapIntensity: 3.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    // --- 7. GROOM RING (Ring 1) ---
    const ring1Group = new THREE.Group();
    const groomTorusGeo = new THREE.TorusGeometry(1.2, 0.24, 32, 80);
    const groomMesh = new THREE.Mesh(groomTorusGeo, groomGoldMat);
    ring1Group.add(groomMesh);

    // Inner rim detail
    const innerRimGeo = new THREE.TorusGeometry(1.02, 0.04, 16, 60);
    const innerRimMesh = new THREE.Mesh(innerRimGeo, groomGoldMat);
    ring1Group.add(innerRimMesh);

    scene.add(ring1Group);
    ring1Ref.current = ring1Group;

    // --- 8. BRIDE RING WITH GEM (Ring 2) ---
    const ring2Group = new THREE.Group();
    const brideTorusGeo = new THREE.TorusGeometry(1.0, 0.18, 32, 80);
    const brideMesh = new THREE.Mesh(brideTorusGeo, brideGoldMat);
    ring2Group.add(brideMesh);

    // Gem Mount / Crown
    const mountGeo = new THREE.CylinderGeometry(0.18, 0.1, 0.25, 8);
    const mountMesh = new THREE.Mesh(mountGeo, brideGoldMat);
    mountMesh.position.set(0, 1.08, 0);
    ring2Group.add(mountMesh);

    // Diamond Octahedron Gem
    const gemGeo = new THREE.OctahedronGeometry(0.28, 2);
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemMesh.position.set(0, 1.25, 0);
    gemMesh.scale.set(1, 1.3, 1);
    ring2Group.add(gemMesh);
    gemRef.current = gemMesh;

    scene.add(ring2Group);
    ring2Ref.current = ring2Group;

    // --- 9. FLOATING NATURE PETALS & POLLEN PARTICLES ---
    // Pollen Particles (Bees / Fireflies)
    const pollenCount = isMobile ? 120 : 250;
    const pollenGeo = new THREE.BufferGeometry();
    const pollenPositions = new Float32Array(pollenCount * 3);
    const pollenScales = new Float32Array(pollenCount);

    for (let i = 0; i < pollenCount; i++) {
      pollenPositions[i * 3] = (Math.random() - 0.5) * 16;
      pollenPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pollenPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      pollenScales[i] = Math.random() * 0.08 + 0.02;
    }

    pollenGeo.setAttribute('position', new THREE.BufferAttribute(pollenPositions, 3));

    const pollenMat = new THREE.PointsMaterial({
      color: 0xf5d68b,
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const pollenPoints = new THREE.Points(pollenGeo, pollenMat);
    scene.add(pollenPoints);

    // 3D Petal Meshes
    const petalGroup = new THREE.Group();
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.2, 0.3, 0.3, 0.6, 0, 1.0);
    petalShape.bezierCurveTo(-0.3, 0.6, -0.2, 0.3, 0, 0);

    const petalGeo = new THREE.ShapeGeometry(petalShape);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xF2B880,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
      roughness: 0.4,
    });

    const petalList = [];
    const petalCount = isMobile ? 25 : 50;

    for (let i = 0; i < petalCount; i++) {
      const petal = new THREE.Mesh(petalGeo, petalMat);
      const scale = Math.random() * 0.25 + 0.15;
      petal.scale.set(scale, scale, scale);
      petal.position.set(
        (Math.random() - 0.5) * 14,
        Math.random() * 12 - 4,
        (Math.random() - 0.5) * 10
      );
      petal.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const speedY = Math.random() * 0.015 + 0.005;
      const rotSpeed = (Math.random() - 0.5) * 0.02;

      petalGroup.add(petal);
      petalList.push({ mesh: petal, speedY, rotSpeed });
    }
    scene.add(petalGroup);
    petalsRef.current = petalList;

    // --- 10. ANIMATION & SCROLL CHOREOGRAPHY LOOP ---
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const progress = Math.min(Math.max(scrollRef.current, 0), 1);

      // --- CHOREOGRAPHED DANCE OF THE RINGS ---
      if (ring1Ref.current && ring2Ref.current) {
        const ring1 = ring1Ref.current;
        const ring2 = ring2Ref.current;

        // Base sway motion for organic fluid feel
        const swayY = Math.sin(elapsedTime * 1.5) * 0.15;
        const swayX = Math.cos(elapsedTime * 1.2) * 0.1;

        if (progress < 0.25) {
          // --- STAGE 1: SEPARATION & HERO ENTRANCE (0.0 -> 0.25) ---
          const p = progress / 0.25;

          // Ring 1 (Groom) on Left
          const target1X = THREE.MathUtils.lerp(-1.8, -1.2, p) + swayX;
          const target1Y = THREE.MathUtils.lerp(0.4, 0.2, p) + swayY;
          ring1.position.set(target1X, target1Y, 0);
          ring1.rotation.set(0.6 + elapsedTime * 0.5, 0.4 + p * 1.2, 0.3);

          // Ring 2 (Bride) on Right
          const target2X = THREE.MathUtils.lerp(1.8, 1.2, p) - swayX;
          const target2Y = THREE.MathUtils.lerp(-0.4, -0.2, p) - swayY;
          ring2.position.set(target2X, target2Y, 0.4);
          ring2.rotation.set(-0.5 - elapsedTime * 0.6, -0.3 + p * 1.5, -0.4);

        } else if (progress < 0.70) {
          // --- STAGE 2: FLUID 3D ORBITAL DANCE (0.25 -> 0.70) ---
          const p = (progress - 0.25) / 0.45;
          const angle = p * Math.PI * 4 + elapsedTime * 0.8;
          const orbitRadius = THREE.MathUtils.lerp(1.4, 0.8, p);

          // Ring 1 Orbit
          ring1.position.x = -Math.cos(angle) * orbitRadius + swayX;
          ring1.position.y = Math.sin(angle * 0.8) * 0.9 + swayY;
          ring1.position.z = Math.sin(angle) * 1.2;
          ring1.rotation.x = angle * 0.7;
          ring1.rotation.y = angle * 0.9;
          ring1.rotation.z = Math.sin(elapsedTime) * 0.5;

          // Ring 2 Orbit (Counter)
          ring2.position.x = Math.cos(angle) * orbitRadius - swayX;
          ring2.position.y = -Math.sin(angle * 0.8) * 0.9 - swayY;
          ring2.position.z = -Math.sin(angle) * 1.2;
          ring2.rotation.x = -angle * 0.8;
          ring2.rotation.y = -angle * 1.1;
          ring2.rotation.z = -Math.cos(elapsedTime) * 0.5;

        } else {
          // --- STAGE 3: INTERLOCKING UNION CLIMAX (0.70 -> 1.0) ---
          const p = (progress - 0.70) / 0.30;
          const easeP = Math.pow(p, 2); // Smooth acceleration into lock

          // Ring 1 locks into center left, tilted to pass through Ring 2
          const lock1X = THREE.MathUtils.lerp(-0.8, -0.35, easeP);
          const lock1Y = THREE.MathUtils.lerp(0.3, 0.0, easeP) + swayY * (1 - easeP);
          const lock1Z = THREE.MathUtils.lerp(0.5, 0.0, easeP);

          ring1.position.set(lock1X, lock1Y, lock1Z);
          ring1.rotation.x = THREE.MathUtils.lerp(ring1.rotation.x, 0.55, 0.1);
          ring1.rotation.y = THREE.MathUtils.lerp(ring1.rotation.y, 0.85, 0.1);
          ring1.rotation.z = THREE.MathUtils.lerp(ring1.rotation.z, 0.25, 0.1);

          // Ring 2 locks into center right, perpendicular angle interlocked!
          const lock2X = THREE.MathUtils.lerp(0.8, 0.35, easeP);
          const lock2Y = THREE.MathUtils.lerp(-0.3, 0.0, easeP) - swayY * (1 - easeP);
          const lock2Z = THREE.MathUtils.lerp(-0.5, 0.0, easeP);

          ring2.position.set(lock2X, lock2Y, lock2Z);
          ring2.rotation.x = THREE.MathUtils.lerp(ring2.rotation.x, -0.65, 0.1);
          ring2.rotation.y = THREE.MathUtils.lerp(ring2.rotation.y, -0.75, 0.1);
          ring2.rotation.z = THREE.MathUtils.lerp(ring2.rotation.z, -0.35, 0.1);

          // Interlocking Flash light effect at climax
          if (flashLightRef.current) {
            flashLightRef.current.intensity = Math.sin(p * Math.PI) * 4.5;
          }
        }
      }

      // Rotate gem for specular diamond sparkle
      if (gemRef.current) {
        gemRef.current.rotation.y += 0.015;
      }

      // Animate Pollen / Fireflies
      const positions = pollenGeo.attributes.position.array;
      for (let i = 0; i < pollenCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.003;
        positions[i * 3] += Math.cos(elapsedTime + i) * 0.002;
      }
      pollenGeo.attributes.position.needsUpdate = true;

      // Animate Falling Flower Petals
      petalsRef.current.forEach(({ mesh, speedY, rotSpeed }) => {
        mesh.position.y -= speedY;
        mesh.rotation.x += rotSpeed;
        mesh.rotation.y += rotSpeed * 1.5;

        // Reset when falling past bottom
        if (mesh.position.y < -6) {
          mesh.position.y = 8;
          mesh.position.x = (Math.random() - 0.5) * 14;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- 11. RESIZE HANDLER ---
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      pmremGenerator.dispose();
      envTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="wedding-rings-3d-canvas-wrap"
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
