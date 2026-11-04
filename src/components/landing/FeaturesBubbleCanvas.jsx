import React, { useEffect, useRef } from 'react';

export const FeaturesBubbleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    let isCancelled = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const bubbleCount = 70;
    const bubbles = [];

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        radius: 1.4 + Math.random() * 5.6,
        baseAlpha: 0.25 + Math.random() * 0.65,
        speedY: 0.14 + Math.random() * 0.32,
        swaySpeed: 0.001 + Math.random() * 0.002,
        swayAmp: 0.35 + Math.random() * 0.85,
        phase: Math.random() * Math.PI * 2,
        isGlowing: Math.random() > 0.35,
      });
    }

    const render = (currentTime) => {
      if (isCancelled) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speedY;
        b.x += Math.sin(currentTime * b.swaySpeed + b.phase) * b.swayAmp;

        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }
        if (b.x < -20) b.x = width + 20;
        if (b.x > width + 20) b.x = -20;

        const pulse = 0.85 + Math.sin(currentTime * 0.002 + b.phase) * 0.15;
        const alpha = Math.min(1.0, b.baseAlpha * pulse);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 177, 68, ${alpha})`;
        if (b.isGlowing) {
          ctx.shadowColor = 'rgba(239, 177, 68, 0.75)';
          ctx.shadowBlur = b.radius * 2.2;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
