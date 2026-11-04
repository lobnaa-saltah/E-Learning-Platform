import React, { useState } from 'react';

export const UqtGraduateConstellation = React.forwardRef(({ isAssembled }, ref) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] aspect-[560/436] select-none flex items-center justify-center"
    >
      {/* Gentle ambient halo behind the constellation */}
      <div className="absolute inset-0 -inset-x-8 -inset-y-6 bg-gradient-to-tr from-brand-secondary/20 via-[#4A3B8C]/15 to-brand-gold/10 rounded-full blur-[70px] pointer-events-none" />

      {/* High-definition constellation image with subtle smooth crossfade */}
      <img
        src="/uqt_graduate_logo.png"
        alt="شعار معهد أم القرى متوجاً بقبعة التخرج"
        onLoad={() => setImageLoaded(true)}
        className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-1000 ${
          imageLoaded && isAssembled ? 'opacity-90' : 'opacity-0'
        }`}
      />
    </div>
  );
});

UqtGraduateConstellation.displayName = 'UqtGraduateConstellation';
