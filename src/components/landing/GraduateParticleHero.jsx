import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, LogIn, UserPlus } from 'lucide-react';
import { UqtGraduateConstellation } from './UqtGraduateConstellation';
import { pointsData } from './uqtGraduatePoints';

const SUBTITLE_PHRASES = [
  'انطلاقة ريادية تجمع بين تقنيات الذكاء الأكاديمي',
  'القاعات الافتراضية التفاعلية',
  'ومحاكاة التخرج المعتمدة لتأهيلك نحو التميز المهني وسوق العمل',
];

const TypewriterSubtitle = ({ isReady }) => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    const fullText = SUBTITLE_PHRASES[phraseIdx];
    let timer;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        const nextChar = fullText[currentText.length];
        const delay = nextChar === ' ' ? 45 : 32;
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, delay);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2600);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 16);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % SUBTITLE_PHRASES.length);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIdx, isReady]);

  return (
    <div className="mt-2 sm:mt-3 lg:mt-5 min-h-[2.5rem] lg:min-h-[3.2rem] flex items-center justify-center lg:justify-start text-center lg:text-right select-none">
      <p className="text-sm sm:text-base lg:text-xl xl:text-[22px] font-medium text-slate-200/95 leading-relaxed drop-shadow-sm inline-flex items-center">
        <span>{currentText || '\u00A0'}</span>
        <span className="inline-block w-[2.5px] sm:w-[3px] h-[1.2em] bg-brand-gold mr-2 align-middle rounded-full animate-pulse shadow-[0_0_10px_#EFB144]" />
      </p>
    </div>
  );
};

export const GraduateParticleHero = ({ onEnterPortal, onOpenRegister }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const emblemBoxRef = useRef(null);
  const titleSpanRef = useRef(null);
  const animFrameRef = useRef(null);

  const [isAssembled, setIsAssembled] = useState(false);
  const [isUiReady, setIsUiReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let isCancelled = false;
    let startTime = null;

    // Timeline durations (milliseconds)
    const ASSEMBLE_DURATION = 2300;
    const STAR_FLY_START = 2350;
    const STAR_FLY_END = 2950;
    const TITLE_WRITE_START = 2950;
    const TITLE_WRITE_END = 4250;
    const STAR_BURST_END = 4450;
    const UI_READY_TIME = 4350;

    // Measure bounding boxes
    const getBounds = () => {
      if (!containerRef.current) return null;
      const cRect = containerRef.current.getBoundingClientRect();

      let emblem = null;
      if (emblemBoxRef.current) {
        const eRect = emblemBoxRef.current.getBoundingClientRect();
        emblem = {
          left: eRect.left - cRect.left,
          top: eRect.top - cRect.top,
          width: eRect.width || 460,
          height: eRect.height || 360,
        };
      }

      let title = null;
      if (titleSpanRef.current) {
        const tRect = titleSpanRef.current.getBoundingClientRect();
        title = {
          left: tRect.left - cRect.left,
          right: tRect.right - cRect.left,
          top: tRect.top - cRect.top,
          bottom: tRect.bottom - cRect.top,
          width: tRect.width || 300,
          height: tRect.height || 48,
          centerY: tRect.top - cRect.top + (tRect.height || 48) * 0.52,
        };
      }

      return { emblem, title };
    };

    let bounds = getBounds();

    // Key star glints (mortarboard apex & tassel tip, rendered as soft circular dots)
    const apexStars = [
      { x: 394, y: 18, size: 1.5, color: 'rgba(225, 215, 248, 0.95)' },  // Mortarboard apex
      { x: 112, y: 334, size: 1.4, color: 'rgba(205, 190, 235, 0.9)' },  // Tassel tip
    ];

    // Initialize 2,400 constellation particles
    const constellationParticles = pointsData.map((pt) => {
      // Spawn particles distributed across the entire hero section & surrounding background
      const spawnSeed = Math.random();
      let sx, sy;
      if (spawnSeed < 0.65) {
        // Broadly scattered across whole hero section
        sx = Math.random() * width;
        sy = Math.random() * height;
      } else if (spawnSeed < 0.85) {
        // Sweeping from right & top-right
        sx = width * 0.45 + Math.random() * (width * 0.6);
        sy = (Math.random() - 0.1) * height;
      } else {
        // Drifting from top & bottom edges
        sx = Math.random() * width;
        sy = Math.random() > 0.5 ? -30 - Math.random() * 80 : height + 30 + Math.random() * 80;
      }

      const emblem = bounds?.emblem || { left: 80, top: 120, width: 460, height: 360 };
      const tx = emblem.left + (pt.x / 560) * emblem.width;
      const ty = emblem.top + (pt.y / 436) * emblem.height;
      const scaleR = (emblem.width / 560);

      return {
        origX: pt.x,
        origY: pt.y,
        origR: pt.r,
        targetX: tx,
        targetY: ty,
        r: Math.max(0.65, pt.r * scaleR),
        startX: sx,
        startY: sy,
        baseAlpha: pt.alpha,
        type: pt.type,
        twinkle: pt.twinkle,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.002 + Math.random() * 0.0025,
        delay: Math.random() * 420,
        swirlAmp: (Math.random() - 0.5) * 55,
        angle: Math.random() * Math.PI * 2,
      };
    });

    // Update targets on resize
    const updateParticleTargets = () => {
      bounds = getBounds();
      if (!bounds?.emblem) return;
      const emblem = bounds.emblem;
      const scaleR = emblem.width / 560;

      for (let i = 0; i < constellationParticles.length; i++) {
        const p = constellationParticles[i];
        p.targetX = emblem.left + (p.origX / 560) * emblem.width;
        p.targetY = emblem.top + (p.origY / 436) * emblem.height;
        p.r = Math.max(0.65, p.origR * scaleR);
      }
    };

    // Ambient floating gold background stars
    const bubbleCount = 38;
    const bubbles = [];
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.1 + Math.random() * 2.8,
        baseAlpha: 0.2 + Math.random() * 0.5,
        speedY: 0.12 + Math.random() * 0.22,
        swaySpeed: 0.001 + Math.random() * 0.002,
        swayAmp: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        isGlowing: Math.random() > 0.4,
      });
    }

    // Shooting star state
    const starTrail = [];
    const starSparks = [];
    let emblemAssembledTriggered = false;
    let uiReadyTriggered = false;

    const loop = (currentTime) => {
      if (isCancelled) return;
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;

      ctx.clearRect(0, 0, width, height);

      // Re-verify bounds if needed during early frames
      if (elapsed < 300 && (!bounds?.emblem || !bounds?.title || bounds.title.width <= 10)) {
        bounds = getBounds();
        if (bounds?.emblem) updateParticleTargets();
      }

      // 1. Draw Ambient Floating Gold Particles
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
          ctx.shadowColor = 'rgba(239, 177, 68, 0.6)';
          ctx.shadowBlur = b.radius * 2.0;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fill();
        }
      }

      // 2. Draw Constellation Particles (Global Entrance Convergence)
      const globalProgress = Math.min(1.0, elapsed / ASSEMBLE_DURATION);

      if (globalProgress >= 0.98 && !emblemAssembledTriggered) {
        emblemAssembledTriggered = true;
        setIsAssembled(true);
      }

      for (let i = 0; i < constellationParticles.length; i++) {
        const p = constellationParticles[i];

        let curX, curY, alpha;

        if (elapsed < p.delay) {
          // Particle waiting to emerge
          curX = p.startX;
          curY = p.startY;
          alpha = 0;
        } else if (elapsed < ASSEMBLE_DURATION) {
          // In motion: cubic ease-out convergence with harmonic swirl
          const pDuration = ASSEMBLE_DURATION - p.delay;
          const t = Math.min(1.0, (elapsed - p.delay) / pDuration);
          const ease = 1 - Math.pow(1 - t, 3);
          const swirlFactor = Math.sin(t * Math.PI);

          curX = p.startX + (p.targetX - p.startX) * ease + Math.cos(p.angle) * p.swirlAmp * swirlFactor;
          curY = p.startY + (p.targetY - p.startY) * ease + Math.sin(p.angle) * p.swirlAmp * swirlFactor;

          const fadeIn = Math.min(1.0, t / 0.28);
          alpha = p.baseAlpha * fadeIn;
        } else {
          // Fully arrived at target
          curX = p.targetX;
          curY = p.targetY;
          alpha = p.baseAlpha;

          if (p.twinkle) {
            const pulse = Math.sin(currentTime * p.twinkleSpeed + p.phase);
            alpha = p.baseAlpha * (0.7 + 0.3 * pulse);
          }
        }

        if (alpha <= 0.01) continue;

        let fillStyle;
        if (p.type === 'orange') {
          fillStyle = `rgba(242, 160, 48, ${alpha})`;
        } else if (p.type === 'bright') {
          fillStyle = `rgba(215, 202, 238, ${alpha})`;
        } else {
          fillStyle = `rgba(175, 160, 215, ${alpha * 0.88})`;
        }

        ctx.beginPath();
        ctx.arc(curX, curY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;

        if (p.twinkle && globalProgress > 0.85) {
          ctx.shadowColor = p.type === 'orange' ? 'rgba(245, 160, 40, 0.75)' : 'rgba(160, 140, 220, 0.45)';
          ctx.shadowBlur = p.r * 2.2;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fill();
        }
      }

      // Key apex circular star dots
      if (globalProgress > 0.88 && bounds?.emblem) {
        const glintFade = Math.min(1.0, (globalProgress - 0.88) / 0.12);
        const emblem = bounds.emblem;
        for (let i = 0; i < apexStars.length; i++) {
          const star = apexStars[i];
          const sx = emblem.left + (star.x / 560) * emblem.width;
          const sy = emblem.top + (star.y / 436) * emblem.height;
          const pulse = 0.82 + 0.18 * Math.sin(currentTime * 0.0025 + i * 1.5);
          const currentRadius = star.size * (emblem.width / 560) * pulse;
          const currentAlpha = glintFade * (0.8 + 0.2 * pulse);

          ctx.save();
          ctx.beginPath();
          ctx.arc(sx, sy, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = star.color.replace(/[\d\.]+\)$/, `${currentAlpha})`);
          ctx.shadowColor = star.color;
          ctx.shadowBlur = currentRadius * 2.2;
          ctx.fill();
          ctx.restore();
        }
      }

      // 3. Shooting Star Writing Title Animation
      if (elapsed >= STAR_FLY_START && elapsed <= STAR_BURST_END && bounds?.emblem && bounds?.title) {
        const emblem = bounds.emblem;
        const title = bounds.title;

        // Origin: the vibrant orange slash tip of UQT
        const originX = emblem.left + (348 / 560) * emblem.width;
        const originY = emblem.top + (409 / 436) * emblem.height;

        // Target for flight: Right edge of title text (Arabic starts from right!)
        const titleStartX = title.right;
        const titleStartY = title.centerY;
        const titleEndX = title.left;

        let starX = originX;
        let starY = originY;
        let starAlpha = 1.0;
        let isWriting = false;

        if (elapsed < STAR_FLY_END) {
          // Flight across the hero section from Logo to Title Start
          const f = (elapsed - STAR_FLY_START) / (STAR_FLY_END - STAR_FLY_START);
          // Ease-in-out cubic
          const easeF = f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
          const arcHeight = Math.min(85, Math.max(30, Math.abs(titleStartX - originX) * 0.13));
          const arc = Math.sin(f * Math.PI) * arcHeight;

          starX = originX + (titleStartX - originX) * easeF;
          starY = originY + (titleStartY - originY) * easeF - arc;
        } else if (elapsed <= TITLE_WRITE_END) {
          // Writing across title from right to left
          isWriting = true;
          const w = (elapsed - TITLE_WRITE_START) / (TITLE_WRITE_END - TITLE_WRITE_START);
          const easeW = w; // uniform calligraphic stroke speed

          starX = titleStartX - easeW * (titleStartX - titleEndX);
          // Delicate calligraphic wave following handwriting cadence
          starY = titleStartY + Math.sin(easeW * Math.PI * 8) * 2.6;

          // Real-time CSS mask synchronization on title text
          if (titleSpanRef.current) {
            titleSpanRef.current.style.opacity = '1';
            const pct = Math.min(100, Math.max(0, easeW * 100));
            const maskVal = `linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${pct}%, rgba(0,0,0,0) ${Math.min(100, pct + 2.5)}%, rgba(0,0,0,0) 100%)`;
            titleSpanRef.current.style.webkitMaskImage = maskVal;
            titleSpanRef.current.style.maskImage = maskVal;
          }

          // Emit small sparks of stardust as letters are written
          if (Math.random() > 0.3) {
            starSparks.push({
              x: starX + (Math.random() - 0.5) * 4,
              y: starY + (Math.random() - 0.5) * 4,
              vx: (Math.random() - 0.3) * 0.8,
              vy: 0.3 + Math.random() * 0.8,
              size: 0.9 + Math.random() * 1.6,
              alpha: 0.95,
              decay: 0.035 + Math.random() * 0.02,
              color: Math.random() > 0.4 ? 'rgba(239, 177, 68, ALPHA)' : 'rgba(255, 255, 255, ALPHA)',
            });
          }
        } else {
          // Finished writing: soft flare & dissolve at end of title
          starX = titleEndX;
          starY = titleStartY;
          const dissolveProg = (elapsed - TITLE_WRITE_END) / (STAR_BURST_END - TITLE_WRITE_END);
          starAlpha = Math.max(0, 1 - dissolveProg);

          if (titleSpanRef.current) {
            titleSpanRef.current.style.webkitMaskImage = 'none';
            titleSpanRef.current.style.maskImage = 'none';
            titleSpanRef.current.style.opacity = '1';
          }

          // Gentle expanding starlight ring
          const burstRadius = 4 + dissolveProg * 24;
          ctx.save();
          ctx.beginPath();
          ctx.arc(starX, starY, burstRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(239, 177, 68, ${starAlpha * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }

        // Record trail
        starTrail.unshift({ x: starX, y: starY, alpha: starAlpha });
        if (starTrail.length > 16) starTrail.pop();

        // Render comet trail
        ctx.save();
        for (let i = 1; i < starTrail.length; i++) {
          const p1 = starTrail[i - 1];
          const p2 = starTrail[i];
          const ratio = 1 - i / starTrail.length;
          const trailAlpha = ratio * starAlpha * 0.75;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineWidth = 1 + ratio * 3.5;
          ctx.strokeStyle = `rgba(239, 177, 68, ${trailAlpha})`;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
        ctx.restore();

        // Render Star Head (Glowing celestial core)
        if (starAlpha > 0.05) {
          ctx.save();
          // Soft wide halo
          const aura = ctx.createRadialGradient(starX, starY, 0, starX, starY, 26);
          aura.addColorStop(0, `rgba(255, 255, 255, ${starAlpha * 0.95})`);
          aura.addColorStop(0.25, `rgba(239, 177, 68, ${starAlpha * 0.8})`);
          aura.addColorStop(0.65, `rgba(195, 160, 245, ${starAlpha * 0.3})`);
          aura.addColorStop(1, 'rgba(195, 160, 245, 0)');
          ctx.fillStyle = aura;
          ctx.beginPath();
          ctx.arc(starX, starY, 26, 0, Math.PI * 2);
          ctx.fill();

          // Brilliant core dot
          ctx.beginPath();
          ctx.arc(starX, starY, 3.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha})`;
          ctx.shadowColor = '#EFB144';
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.restore();
        }
      }

      // Update and render sparks
      for (let i = starSparks.length - 1; i >= 0; i--) {
        const sp = starSparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.035; // gentle gravity
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          starSparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color.replace('ALPHA', sp.alpha.toFixed(2));
        ctx.fill();
      }

      // 4. Trigger UI readiness for surrounding content
      if (elapsed >= UI_READY_TIME && !uiReadyTriggered) {
        uiReadyTriggered = true;
        setIsUiReady(true);
        if (titleSpanRef.current) {
          titleSpanRef.current.style.webkitMaskImage = 'none';
          titleSpanRef.current.style.maskImage = 'none';
          titleSpanRef.current.style.opacity = '1';
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      updateParticleTargets();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[560px] max-h-[820px] lg:h-auto lg:min-h-[96vh] xl:min-h-screen lg:max-h-none w-full overflow-hidden bg-gradient-to-b from-[#141033] via-brand-purpleDark to-[#1B174A] select-none flex flex-col items-center justify-start lg:flex-row lg:items-center lg:justify-start"
    >
      {/* Background stardust grid & radial purple glow on the left */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#EFB144_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-[72%] lg:top-[50%] left-1/2 lg:left-[28%] -translate-x-1/2 -translate-y-1/2 w-[420px] lg:w-[550px] h-[420px] lg:h-[550px] rounded-full bg-brand-secondary/15 blur-[120px] lg:blur-[140px] pointer-events-none" />

      {/* Global Master Canvas for Stardust Entrance & Shooting Star Writing Title */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Hero Content (Right: Text & Actions | Left: UQT Graduate Constellation) */}
      <div className="relative z-20 w-full max-w-5xl lg:max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pointer-events-none flex flex-col items-center justify-start pt-32 sm:pt-36 lg:pt-20 lg:pb-20 lg:flex-row lg:items-center lg:justify-between h-full lg:min-h-[95vh]">
        <div className="w-full lg:w-[56%] pointer-events-auto text-center lg:text-right">
          <div className="flex flex-col items-center lg:items-start transition-none">
            {/* Institute Badge (Slides down smoothly once title writing completes) */}
            <div
              className={`mb-2 sm:mb-2.5 inline-flex items-center gap-2 px-3.5 py-1 sm:py-1.5 rounded-lg bg-brand-gold/10 hover:bg-brand-gold/15 border border-brand-gold/30 hover:border-brand-gold/50 backdrop-blur-md text-[11px] sm:text-xs font-bold text-brand-gold tracking-wide shadow-[0_2px_12px_rgba(239,177,68,0.12)] transition-all duration-700 select-none ${
                isUiReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>منظومة التعليم والتدريب عن بعد | معهد أم القرى العالي</span>
            </div>

            {/* Main Title (Written live by the shooting star from the UQT logo) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-normal whitespace-nowrap select-none text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)] text-center lg:text-right">
              <span
                ref={titleSpanRef}
                className="relative inline-block transition-opacity duration-300"
                style={{ opacity: 0 }}
              >
                منصة التعليم عن بعد
              </span>
            </h1>

            {/* Subtitle with Typewriter effect (Begins once title writing completes) */}
            <div
              className={`transition-all duration-700 ${
                isUiReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <TypewriterSubtitle isReady={isUiReady} />
            </div>

            {/* Call to Action Buttons (Slide up smoothly once title writing completes) */}
            <div
              className={`mt-4 sm:mt-5 lg:mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 max-w-fit select-none transition-all duration-700 ${
                isUiReady
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <button
                type="button"
                onClick={onEnterPortal}
                className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-brand-gold via-[#F5C767] to-brand-secondary text-brand-purpleDark font-black text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(239,177,68,0.35)] hover:shadow-[0_6px_25px_rgba(239,177,68,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <LogIn className="w-4 h-4 text-brand-purpleDark transition-transform group-hover:-translate-x-0.5 duration-300" />
                <span>تسجيل الدخول</span>
              </button>

              <button
                type="button"
                onClick={onOpenRegister}
                className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-brand-gold/50 text-white font-black text-xs sm:text-sm tracking-wide backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(239,177,68,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-brand-gold transition-transform group-hover:scale-110 duration-300" />
                <span>تسجيل دخول جديد</span>
              </button>
            </div>
          </div>
        </div>

        {/* Left Side: UQT Graduate Constellation (Logo wearing graduation cap) */}
        <div className="w-full lg:w-[44%] pointer-events-none flex items-center justify-center min-h-[300px] lg:min-h-[460px] mt-6 lg:mt-0">
          <UqtGraduateConstellation ref={emblemBoxRef} isAssembled={isAssembled} />
        </div>
      </div>
    </section>
  );
};
