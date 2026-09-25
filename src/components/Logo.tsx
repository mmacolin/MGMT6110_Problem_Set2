import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Lens & Meridian Icon */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 hover:scale-105"
          aria-hidden="true"
        >
          <defs>
            {/* Country A Primary Gradient (Deep Cobalt to Royal Blue) */}
            <linearGradient id="lensGradA" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            {/* Country B Secondary Gradient (Deep Spruce to Teal) */}
            <linearGradient id="lensGradB" x1="44" y1="4" x2="4" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
            {/* Central Prism Flare */}
            <radialGradient id="lensCore" cx="24" cy="24" r="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Lens Housing / Ring */}
          <rect
            x="4"
            y="4"
            width="40"
            height="40"
            rx="12"
            fill="#0F172A"
            stroke="#1E293B"
            strokeWidth="1.5"
          />

          {/* Core glow */}
          <circle cx="24" cy="24" r="14" fill="url(#lensCore)" />

          {/* Dual Meridian Rings (Global comparison) */}
          <ellipse
            cx="24"
            cy="24"
            rx="13"
            ry="6.5"
            stroke="url(#lensGradA)"
            strokeWidth="2"
            transform="rotate(-25 24 24)"
            strokeLinecap="round"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="13"
            ry="6.5"
            stroke="url(#lensGradB)"
            strokeWidth="2"
            transform="rotate(35 24 24)"
            strokeLinecap="round"
          />

          {/* Precision Crosshair / Aperture Focal Center */}
          <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
          <circle cx="24" cy="24" r="1.75" fill="#0F172A" />

          {/* Lens focus tick marks */}
          <line x1="24" y1="8" x2="24" y2="11" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="37" x2="24" y2="40" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="24" x2="11" y2="24" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="37" y1="24" x2="40" y2="24" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className={`font-bold tracking-tight text-slate-900 ${textSize} leading-none flex items-center`}>
          <span>Country</span>
          <span className="text-blue-600 font-extrabold ml-0.5">Lens</span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-500 tracking-wide mt-1">
            Macroeconomic GDP Explorer
          </span>
        )}
      </div>
    </div>
  );
};
