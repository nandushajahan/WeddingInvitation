import React, { useRef, useEffect } from 'react';

export default function StarryCanvas({ isInteractive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse / Touch tracking for subtle cosmic parallax
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    if (isInteractive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    // Adaptive particle count for mobile vs desktop performance
    const isMobile = width < 768;
    const particleCount = isMobile ? 90 : 180;
    const goldDustCount = isMobile ? 25 : 50;

    // Create star particles
    const stars = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      alpha: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.3 ? '#FAF7F2' : '#F5D68B',
    }));

    // Create floating warm gold cosmic dust / pollen particles
    const goldDust = Array.from({ length: goldDustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1.2,
      alpha: Math.random() * 0.6 + 0.2,
      speedY: -Math.random() * 0.3 - 0.1, // Float upward gently
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.2,
      pulse: Math.random() * Math.PI,
    }));

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeHandler);

    // Animation Loop
    const render = () => {
      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      const offsetX = (mouse.x - width / 2) * 0.03;
      const offsetY = (mouse.y - height / 2) * 0.03;

      ctx.clearRect(0, 0, width, height);

      // Deep celestial radial background gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2 + offsetX * 0.5,
        height / 3 + offsetY * 0.5,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0C1836');
      bgGrad.addColorStop(0.5, '#081026');
      bgGrad.addColorStop(1, '#040814');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed * star.direction;
        if (star.alpha >= 1 || star.alpha <= 0.1) {
          star.direction *= -1;
        }

        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around screen bounds
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fillStyle = star.color;

        // Parallax offset based on size (depth)
        const starX = star.x + offsetX * (star.size * 0.8);
        const starY = star.y + offsetY * (star.size * 0.8);

        ctx.beginPath();
        ctx.arc(starX, starY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle star glow for larger stars
        if (star.size > 1.4) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(245, 214, 139, 0.6)';
        }
        ctx.restore();
      });

      // Render Floating Gold Dust
      goldDust.forEach((dust) => {
        dust.y += dust.speedY;
        dust.x += Math.sin(dust.pulse) * 0.25;
        dust.pulse += 0.02;

        if (dust.y < -10) {
          dust.y = height + 10;
          dust.x = Math.random() * width;
        }

        const dustX = dust.x + offsetX * 1.5;
        const dustY = dust.y + offsetY * 1.5;

        ctx.save();
        ctx.globalAlpha = dust.alpha * (0.6 + 0.4 * Math.sin(dust.pulse));
        const glowGrad = ctx.createRadialGradient(
          dustX, dustY, 0,
          dustX, dustY, dust.radius * 3
        );
        glowGrad.addColorStop(0, '#F7DF9B');
        glowGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.4)');
        glowGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(dustX, dustY, dust.radius * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (isInteractive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInteractive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 'var(--z-canvas)',
        pointerEvents: isInteractive ? 'auto' : 'none',
      }}
    />
  );
}
