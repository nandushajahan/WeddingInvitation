import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EnchantedNatureCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 2. Lighting - Golden Sunbeam & Forest Emerald
    const ambientLight = new THREE.AmbientLight(0x153823, 2.5);
    scene.add(ambientLight);

    const sunbeamLight = new THREE.DirectionalLight(0xf5d68b, 3);
    sunbeamLight.position.set(15, 20, 10);
    scene.add(sunbeamLight);

    const warmPointLight = new THREE.PointLight(0xf2b880, 2.5, 40);
    warmPointLight.position.set(-10, -5, 5);
    scene.add(warmPointLight);

    // 3. Floating 3D Flower Petals (Custom Petal Mesh Group)
    const petalGroup = new THREE.Group();
    scene.add(petalGroup);

    const petalGeo = new THREE.PlaneGeometry(0.35, 0.5, 8, 8);
    // Curve geometry slightly for organic petal shape
    const pos = petalGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = Math.sin(pos.getX(i) * Math.PI) * 0.1;
      pos.setZ(i, z);
    }
    petalGeo.computeVertexNormals();

    const petalMatIvory = new THREE.MeshStandardMaterial({
      color: 0xfaf6ee,
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });

    const petalMatGold = new THREE.MeshStandardMaterial({
      color: 0xf5d68b,
      roughness: 0.3,
      metalness: 0.3,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });

    const petalCount = width < 768 ? 45 : 90;
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      const mesh = new THREE.Mesh(
        petalGeo,
        Math.random() > 0.5 ? petalMatIvory : petalMatGold
      );
      mesh.position.set(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 15
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const speedY = -(0.015 + Math.random() * 0.02);
      const speedX = (Math.random() - 0.5) * 0.01;
      const rotSpeed = (Math.random() - 0.5) * 0.03;

      petals.push({ mesh, speedY, speedX, rotSpeed, initialX: mesh.position.x });
      petalGroup.add(mesh);
    }

    // 4. Golden Pollen Dust Particles
    const pollenCount = width < 768 ? 400 : 800;
    const pollenGeo = new THREE.BufferGeometry();
    const pollenPositions = new Float32Array(pollenCount * 3);

    for (let i = 0; i < pollenCount; i++) {
      pollenPositions[i * 3] = (Math.random() - 0.5) * 30;
      pollenPositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pollenPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    pollenGeo.setAttribute('position', new THREE.BufferAttribute(pollenPositions, 3));

    const pollenMat = new THREE.PointsMaterial({
      color: 0xe5c158,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const pollenPoints = new THREE.Points(pollenGeo, pollenMat);
    scene.add(pollenPoints);

    // 5. Parallax Gliding Birds Silhouettes
    const birdGroup = new THREE.Group();
    scene.add(birdGroup);

    const birdShape = new THREE.Shape();
    birdShape.moveTo(0, 0);
    birdShape.quadraticCurveTo(0.2, 0.15, 0.4, 0);
    birdShape.quadraticCurveTo(0.2, 0.05, 0, -0.05);
    birdShape.quadraticCurveTo(-0.2, 0.05, -0.4, 0);
    birdShape.quadraticCurveTo(-0.2, 0.15, 0, 0);

    const birdGeo = new THREE.ShapeGeometry(birdShape);
    const birdMat = new THREE.MeshBasicMaterial({
      color: 0xa3b18a,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });

    const birds = [];
    for (let i = 0; i < 5; i++) {
      const bird = new THREE.Mesh(birdGeo, birdMat);
      bird.position.set(-15 + i * 4, 6 + (i % 2) * 1.5, -8 - i);
      bird.scale.setScalar(0.7);
      birds.push({ mesh: bird, speed: 0.02 + Math.random() * 0.015 });
      birdGroup.add(bird);
    }

    // 6. Scroll & Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = window.scrollY;

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with performance.now()
    let animationFrameId;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = (currentTime - startTime) * 0.001;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Animate floating petals with wind sway
      petals.forEach((p) => {
        p.mesh.position.y += p.speedY;
        p.mesh.position.x = p.initialX + Math.sin(elapsedTime * 1.5 + p.initialX) * 0.8;
        p.mesh.rotation.x += p.rotSpeed;
        p.mesh.rotation.y += p.rotSpeed;

        // Wrap petals back to top
        if (p.mesh.position.y < -13) {
          p.mesh.position.y = 13;
          p.mesh.position.x = (Math.random() - 0.5) * 28;
          p.initialX = p.mesh.position.x;
        }
      });

      // Animate pollen particles gently floating up
      const posArr = pollenPoints.geometry.attributes.position.array;
      for (let i = 0; i < pollenCount; i++) {
        posArr[i * 3 + 1] += 0.005;
        if (posArr[i * 3 + 1] > 13) posArr[i * 3 + 1] = -13;
      }
      pollenPoints.geometry.attributes.position.needsUpdate = true;

      // Animate flying birds gliding across
      birds.forEach((b) => {
        b.mesh.position.x += b.speed;
        b.mesh.position.y += Math.sin(elapsedTime * 2 + b.mesh.position.x) * 0.005;
        if (b.mesh.position.x > 18) b.mesh.position.x = -18;
      });

      // Parallax camera move
      camera.position.x = mouse.x * 1.2;
      camera.position.y = mouse.y * 1.2 - scrollY * 0.0015;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 'var(--z-canvas)',
        pointerEvents: 'none',
      }}
    />
  );
}
