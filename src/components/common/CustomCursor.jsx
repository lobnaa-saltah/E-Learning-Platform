import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const head = headRef.current;
    if (!container || !canvas || !head) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    document.documentElement.classList.add('has-custom-cursor');

    const primaryColor = '#EFB144';
    const accentColor = '#FFA51A';

    let dpr = 1;
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const trail = [];
    const targetPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const currentPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let hasMoved = false;
    let isHovering = false;
    let animId = 0;

    const checkInteractive = (target) => {
      if (!target || !(target instanceof Element)) return false;
      if (target.tagName === 'CANVAS' || target.closest('canvas')) return false;
      const match = target.closest(
        'button, a, input, select, textarea, label, summary, [role="button"], [role="tab"], [role="link"], .cursor-pointer, [data-interactive="true"], [onclick]'
      );
      if (match) return true;
      if (target.style && target.style.cursor === 'pointer') return true;
      return false;
    };

    const updateHoverState = (target) => {
      const nextHover = checkInteractive(target);
      if (nextHover !== isHovering) {
        isHovering = nextHover;
        container.dataset.hover = nextHover ? 'true' : 'false';
        document.documentElement.dataset.cursorHover = nextHover ? 'true' : 'false';
        trail.length = 0;
        if (nextHover) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          head.style.opacity = '0';
        } else {
          currentPos.x = targetPos.x;
          currentPos.y = targetPos.y;
          head.style.transform = `translate3d(${currentPos.x}px, ${currentPos.y}px, 0)`;
          head.style.opacity = '1';
        }
      }
    };

    const onMove = (e) => {
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        currentPos.x = targetPos.x;
        currentPos.y = targetPos.y;
        trail.length = 0;
      }
      container.dataset.visible = 'true';
      document.documentElement.dataset.cursorActive = 'true';
      updateHoverState(e.target);
    };

    const onOver = (e) => {
      updateHoverState(e.target);
    };

    const onOut = (e) => {
      if (!e.relatedTarget) {
        updateHoverState(null);
      }
    };

    const onLeave = () => {
      container.dataset.visible = 'false';
      document.documentElement.dataset.cursorActive = 'false';
      document.documentElement.dataset.cursorHover = 'false';
      isHovering = false;
      container.dataset.hover = 'false';
      trail.length = 0;
    };

    const onEnter = () => {
      container.dataset.visible = 'true';
      document.documentElement.dataset.cursorActive = 'true';
    };

    const render = (time) => {
      animId = requestAnimationFrame(render);

      if (isHovering) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        head.style.opacity = '0';
        return;
      }

      head.style.opacity = '1';

      currentPos.x += (targetPos.x - currentPos.x) * 0.28;
      currentPos.y += (targetPos.y - currentPos.y) * 0.28;

      head.style.transform = `translate3d(${currentPos.x}px, ${currentPos.y}px, 0)`;

      const lastPoint = trail[trail.length - 1];
      if (
        hasMoved &&
        (!lastPoint ||
          Math.hypot(currentPos.x - lastPoint.x, currentPos.y - lastPoint.y) >= 1.0)
      ) {
        trail.push({ x: currentPos.x, y: currentPos.y, t: time });
      }

      while (trail.length && time - trail[0].t > 750) {
        trail.shift();
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (trail.length < 3) return;

      const len = trail.length;
      const leftBoundary = [];
      const rightBoundary = [];

      let prevNx = 0;
      let prevNy = 1;

      for (let i = 0; i < len; i++) {
        const curr = trail[i];
        const prev = trail[Math.max(0, i - 1)];
        const next = trail[Math.min(len - 1, i + 1)];

        let dirX = next.x - prev.x;
        let dirY = next.y - prev.y;
        const dist = Math.hypot(dirX, dirY) || 1;
        dirX /= dist;
        dirY /= dist;

        let nx = -dirY;
        let ny = dirX;

        if (i === 0) {
          prevNx = nx;
          prevNy = ny;
        } else {
          const dot = nx * prevNx + ny * prevNy;
          if (dot < 0) {
            nx = -nx;
            ny = -ny;
          }
          nx = prevNx * 0.4 + nx * 0.6;
          ny = prevNy * 0.4 + ny * 0.6;
          const nlen = Math.hypot(nx, ny) || 1;
          nx /= nlen;
          ny /= nlen;
          prevNx = nx;
          prevNy = ny;
        }

        const ageRatio = Math.min(1, Math.max(0, 1 - (time - curr.t) / 750));
        const halfWidth = 0.5 + 4.8 * Math.pow(ageRatio, 0.65);

        leftBoundary.push({
          x: curr.x + nx * halfWidth,
          y: curr.y + ny * halfWidth,
        });
        rightBoundary.push({
          x: curr.x - nx * halfWidth,
          y: curr.y - ny * halfWidth,
        });
      }

      const tailPt = trail[0];
      const headPt = trail[len - 1];

      let gx1 = tailPt.x;
      let gy1 = tailPt.y;
      let gx2 = headPt.x;
      let gy2 = headPt.y;

      if (Math.hypot(gx2 - gx1, gy2 - gy1) < 8) {
        gx1 = gx2 - prevNy * 25;
        gy1 = gy2 + prevNx * 25;
      }

      const gradient = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
      gradient.addColorStop(0, 'rgba(239, 177, 68, 0)');
      gradient.addColorStop(0.2, 'rgba(239, 177, 68, 0.2)');
      gradient.addColorStop(0.55, 'rgba(255, 165, 26, 0.65)');
      gradient.addColorStop(0.85, 'rgba(242, 187, 83, 0.95)');
      gradient.addColorStop(1, primaryColor);

      ctx.beginPath();
      ctx.moveTo(leftBoundary[0].x, leftBoundary[0].y);

      for (let i = 1; i < len; i++) {
        const mx = (leftBoundary[i - 1].x + leftBoundary[i].x) / 2;
        const my = (leftBoundary[i - 1].y + leftBoundary[i].y) / 2;
        ctx.quadraticCurveTo(leftBoundary[i - 1].x, leftBoundary[i - 1].y, mx, my);
      }
      ctx.lineTo(leftBoundary[len - 1].x, leftBoundary[len - 1].y);
      ctx.lineTo(rightBoundary[len - 1].x, rightBoundary[len - 1].y);

      for (let i = len - 1; i > 0; i--) {
        const mx = (rightBoundary[i].x + rightBoundary[i - 1].x) / 2;
        const my = (rightBoundary[i].y + rightBoundary[i - 1].y) / 2;
        ctx.quadraticCurveTo(rightBoundary[i].x, rightBoundary[i].y, mx, my);
      }
      ctx.lineTo(rightBoundary[0].x, rightBoundary[0].y);
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('mouseout', onOut, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('has-custom-cursor');
      delete document.documentElement.dataset.cursorActive;
      delete document.documentElement.dataset.cursorHover;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="custom-cursor-container"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="custom-cursor-canvas"
      />
      <div
        ref={headRef}
        className="custom-cursor-head"
      />
    </div>
  );
};
