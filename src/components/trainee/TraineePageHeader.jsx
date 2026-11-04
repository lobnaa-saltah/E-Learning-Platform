import React from 'react';
import { Sparkles } from 'lucide-react';

export const TraineePageHeader = ({
  badge,
  title,
  subtitle,
  children,
  icon: Icon = Sparkles,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-brand-purpleDark text-white p-6 sm:p-8 shadow-elevated border border-white/10">
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 95%)',
        }}
      >
        <defs>
          <pattern id="page-separated-squares" width="56" height="56" patternUnits="userSpaceOnUse">
            <rect x="4" y="4" width="48" height="48" rx="8" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#page-separated-squares)" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-35">
        <div className="w-[280px] h-[280px] rounded-full border border-white/20" />
        <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-white/20" />
        <div className="absolute w-[620px] h-[620px] rounded-full border border-brand-gold/30" />
        <div className="absolute w-[820px] h-[820px] rounded-full border border-white/10" />
        <div className="absolute w-[1020px] h-[1020px] rounded-full border border-brand-gold/20" />
      </div>

      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-3xl border border-white/10 rotate-12 pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-3xl border border-brand-gold/15 -rotate-12 pointer-events-none" />

      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#433B8B]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-4">
        <div className="space-y-2 max-w-2xl mx-auto flex flex-col items-center">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-bold shadow-xs">
              <Icon className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>
          )}
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {children && (
          <div className="w-full flex items-center justify-center pt-1">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
