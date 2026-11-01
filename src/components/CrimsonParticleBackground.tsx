import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  isLargeNode: boolean;
  isSpeck: boolean;
}

export const CrimsonParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse parallax tracking
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    // Accessibility check
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Responsive density: 34 on mobile, 54 on tablet, 82 on desktop
    const getParticleCount = (w: number) => {
      if (w < 640) return 34;
      if (w < 1024) return 54;
      return 82;
    };

    // Connection distance limit
    const getMaxDistance = (w: number) => {
      if (w < 640) return 90;
      if (w < 1024) return 110;
      return 130;
    };

    const initParticles = () => {
      const count = getParticleCount(width);
      particles = [];

      for (let i = 0; i < count; i++) {
        const speed = prefersReducedMotion ? 0 : Math.random() * 0.28 + 0.15;
        const angle = Math.random() * Math.PI * 2;
        const rand = Math.random();

        const isLargeNode = rand < 0.24; // 24% medium/large glowing nodes with halo
        const isSpeck = !isLargeNode && rand > 0.72; // 28% tiny floating specks

        let radius = 2.4;
        let baseAlpha = 0.75;

        if (isLargeNode) {
          radius = Math.random() * 1.5 + 4.2; // 4.2 - 5.7px
          baseAlpha = Math.random() * 0.15 + 0.82; // 82% - 97% center opacity
        } else if (isSpeck) {
          radius = Math.random() * 0.6 + 1.2; // 1.2 - 1.8px
          baseAlpha = Math.random() * 0.2 + 0.55; // 55% - 75%
        } else {
          radius = Math.random() * 0.9 + 2.3; // 2.3 - 3.2px
          baseAlpha = Math.random() * 0.18 + 0.68; // 68% - 86%
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          baseAlpha,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          isLargeNode,
          isSpeck,
        });
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const normX = e.clientX / width - 0.5;
      const normY = e.clientY / height - 0.5;
      targetParallaxX = normX * 18;
      targetParallaxY = normY * 18;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth parallax damping
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.04;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.04;

      // 1. Draw rich deep burgundy-to-black gradient base
      // Base color: #10060D, Dark burgundy: #260817, Crimson glow: #5A0C2E
      ctx.fillStyle = '#10060D';
      ctx.fillRect(0, 0, width, height);

      // Gradient 1: Upper-center deep burgundy & soft crimson glow
      const gradCenter = ctx.createRadialGradient(
        width * 0.48 + currentParallaxX * 0.4,
        height * 0.28 + currentParallaxY * 0.4,
        30,
        width * 0.48,
        height * 0.28,
        width * 0.65
      );
      gradCenter.addColorStop(0, 'rgba(90, 12, 46, 0.48)'); // #5A0C2E
      gradCenter.addColorStop(0.45, 'rgba(38, 8, 23, 0.38)'); // #260817
      gradCenter.addColorStop(1, 'rgba(16, 6, 13, 0)');
      ctx.fillStyle = gradCenter;
      ctx.fillRect(0, 0, width, height);

      // Gradient 2: Right-hand atmospheric crimson illumination
      const gradRight = ctx.createRadialGradient(
        width * 0.85 - currentParallaxX * 0.5,
        height * 0.55 - currentParallaxY * 0.5,
        40,
        width * 0.85,
        height * 0.55,
        width * 0.55
      );
      gradRight.addColorStop(0, 'rgba(90, 12, 46, 0.36)'); // #5A0C2E
      gradRight.addColorStop(0.5, 'rgba(38, 8, 23, 0.24)');
      gradRight.addColorStop(1, 'rgba(16, 6, 13, 0)');
      ctx.fillStyle = gradRight;
      ctx.fillRect(0, 0, width, height);

      // Gradient 3: Lower-left subtle dark burgundy depth
      const gradLowerLeft = ctx.createRadialGradient(
        width * 0.15 + currentParallaxX * 0.3,
        height * 0.82 + currentParallaxY * 0.3,
        20,
        width * 0.15,
        height * 0.82,
        width * 0.5
      );
      gradLowerLeft.addColorStop(0, 'rgba(45, 9, 28, 0.32)');
      gradLowerLeft.addColorStop(1, 'rgba(16, 6, 13, 0)');
      ctx.fillStyle = gradLowerLeft;
      ctx.fillRect(0, 0, width, height);

      const maxDist = getMaxDistance(width);
      const maxDistSq = maxDist * maxDist;

      // 2. Update particle positions and wrap around edges
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        if (!prefersReducedMotion) {
          p1.x += p1.vx * (delta * 60);
          p1.y += p1.vy * (delta * 60);
          p1.pulsePhase += p1.pulseSpeed;

          // Seamless edge wrapping with margin
          if (p1.x < -10) p1.x = width + 10;
          if (p1.x > width + 10) p1.x = -10;
          if (p1.y < -10) p1.y = height + 10;
          if (p1.y > height + 10) p1.y = -10;
        }
      }

      // 3. Draw clearly visible pink connecting lines (#E94B82)
      // Requested opacity: 20–45%
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const posX1 = p1.x + currentParallaxX;
        const posY1 = p1.y + currentParallaxY;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            // Linear falloff scaled between 0.20 and 0.45 opacity
            const lineAlpha = 0.20 + (1 - dist / maxDist) * 0.25;

            ctx.beginPath();
            // Luminous pink network line #E94B82
            ctx.strokeStyle = `rgba(233, 75, 130, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.1;
            ctx.moveTo(posX1, posY1);
            ctx.lineTo(p2.x + currentParallaxX, p2.y + currentParallaxY);
            ctx.stroke();
          }
        }
      }

      // 4. Draw glowing pink particles (#FF4F87) & large node halos
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const posX = p.x + currentParallaxX;
        const posY = p.y + currentParallaxY;

        const pulse = Math.sin(p.pulsePhase);
        // Particle center opacity: 60–90% as requested
        const centerAlpha = Math.max(0.60, Math.min(0.92, p.baseAlpha + pulse * 0.12));
        const currentRadius = Math.max(1.0, p.radius + pulse * 0.35);

        // A. Subtle pink concentric halo for large nodes
        if (p.isLargeNode) {
          const haloRadius = currentRadius * 2.4;
          const haloAlpha = 0.22 + pulse * 0.08;

          const haloGrad = ctx.createRadialGradient(
            posX,
            posY,
            currentRadius * 0.8,
            posX,
            posY,
            haloRadius
          );
          haloGrad.addColorStop(0, `rgba(255, 79, 135, ${haloAlpha})`);
          haloGrad.addColorStop(0.65, `rgba(233, 75, 130, ${haloAlpha * 0.5})`);
          haloGrad.addColorStop(1, 'rgba(233, 75, 130, 0)');

          ctx.beginPath();
          ctx.arc(posX, posY, haloRadius, 0, Math.PI * 2);
          ctx.fillStyle = haloGrad;
          ctx.fill();
        }

        // B. Glowing pink core (#FF4F87: rgb 255, 79, 135)
        ctx.beginPath();
        ctx.arc(posX, posY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 79, 135, ${centerAlpha.toFixed(3)})`;
        ctx.fill();

        // C. Bright specular center for prominent large nodes
        if (p.isLargeNode) {
          ctx.beginPath();
          ctx.arc(posX, posY, currentRadius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 235, 243, ${Math.min(1.0, centerAlpha + 0.1)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

export default CrimsonParticleBackground;
