import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Celestial3DCanvas({ isInteractive = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0a1128, 2.5);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xf5d68b, 4, 50);
    goldPointLight.position.set(10, 10, 10);
    scene.add(goldPointLight);

    const cyanPointLight = new THREE.PointLight(0x2dd4bf, 3, 50);
    cyanPointLight.position.set(-10, -10, -5);
    scene.add(cyanPointLight);

    // 3. 3D Concentric Celestial Golden Rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x3d2b05,
    });

    // Outer Ring
    const outerGeo = new THREE.TorusGeometry(6, 0.08, 16, 100);
    const outerRing = new THREE.Mesh(outerGeo, ringMaterial);
    ringGroup.add(outerRing);

    // Inner Ring (tilted)
    const innerGeo = new THREE.TorusGeometry(4.2, 0.06, 16, 100);
    const innerRing = new THREE.Mesh(innerGeo, ringMaterial);
    innerRing.rotation.x = Math.PI / 4;
    ringGroup.add(innerRing);

    // 4. 3D Stardust Galaxy Particles
    const particleCount = window.innerWidth < 768 ? 600 : 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorIvory = new THREE.Color(0xfaf7f2);
    const colorGold = new THREE.Color(0xf5d68b);
    const colorCyan = new THREE.Color(0x2dd4bf);

    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixVal = Math.random();
      const pColor = mixVal > 0.6 ? colorGold : mixVal > 0.3 ? colorIvory : colorCyan;
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const starParticles = new THREE.Points(geometry, pMaterial);
    scene.add(starParticles);

    // 5. Scroll & Mouse Tracking
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

    // 6. Animation Loop with performance.now()
    let animationFrameId;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = (currentTime - startTime) * 0.001;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate 3D rings continuous + scroll reaction
      ringGroup.rotation.x = elapsedTime * 0.1 + scrollY * 0.001 + mouse.y * 0.2;
      ringGroup.rotation.y = elapsedTime * 0.15 + scrollY * 0.0015 + mouse.x * 0.2;

      // Rotate 3D star particles slowly
      starParticles.rotation.y = elapsedTime * 0.03 + scrollY * 0.0005;

      // Parallax camera move
      camera.position.x = mouse.x * 1.5;
      camera.position.y = mouse.y * 1.5 - scrollY * 0.002;

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
