import React, { useEffect, useRef } from 'react';

export const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Check accessibility & device type
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    // On touch devices or reduced motion, render a subtle static ambient glow
    if (isTouchDevice || prefersReducedMotion) {
      glow.style.opacity = '0.7';
      glow.style.transform = 'translate3d(50vw, 32vh, 0) translate3d(-50%, -50%, 0)';
      return;
    }

    let animationFrameId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let wobblePhase = 0;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        glow.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      glow.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      glow.style.opacity = '1';
    };

    // Smooth physics loop with spring-like easing & organic breathing
    const animate = () => {
      const easing = 0.08;
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      wobblePhase += 0.024;
      const breathingScale = 1.0 + Math.sin(wobblePhase) * 0.06;
      const wobbleX = Math.cos(wobblePhase * 0.8) * 5;
      const wobbleY = Math.sin(wobblePhase * 0.7) * 5;

      glow.style.transform = `translate3d(${currentX + wobbleX}px, ${currentY + wobbleY}px, 0) translate3d(-50%, -50%, 0) scale(${breathingScale})`;

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 
        Soft Pink Radial Cursor Glow matching the reference image:
        Core: #FF4F87 (luminous glowing pink)
        Mid: #E94B82 / #C2185B (ambient pink)
        Outer: #5A0C2E (soft crimson)
        Edge: Fades into #10060D
      */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 w-[580px] h-[580px] sm:w-[720px] sm:h-[720px] rounded-full blur-[100px] sm:blur-[130px] opacity-0 transition-opacity duration-700 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 79, 135, 0.28) 0%, rgba(233, 75, 130, 0.20) 30%, rgba(194, 24, 91, 0.12) 52%, rgba(90, 12, 46, 0.08) 68%, rgba(16, 6, 13, 0) 80%)',
        }}
      />
    </div>
  );
};

export default CursorGlow;
