'use client';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <svg
        viewBox="0 0 120 120"
        className="h-28 w-28 logo-icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="50%" stopColor="#2E7D32" />
            <stop offset="100%" stopColor="#1B5E20" />
          </linearGradient>

          <linearGradient id="leafGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#66BB6A" />
            <stop offset="100%" stopColor="#43A047" />
          </linearGradient>

          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4FC3F7" />
            <stop offset="50%" stopColor="#29B6F6" />
            <stop offset="100%" stopColor="#0288D1" />
          </linearGradient>

          <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD54F" />
            <stop offset="30%" stopColor="#FFCA28" />
            <stop offset="70%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FF8F00" />
          </linearGradient>

          <linearGradient id="dropHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFECB3" />
            <stop offset="100%" stopColor="#FFD54F" />
          </linearGradient>

          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Background circle - light */}
        <circle cx="60" cy="55" r="45" fill="#f0fdf4" className="animate-pulse-slow" />

        {/* Water/Wave element */}
        <path
          d="M85 30 Q105 50 90 75 Q80 90 65 85 Q75 70 80 55 Q85 40 85 30"
          fill="url(#waterGradient)"
          className="animate-wave"
        />

        {/* Large leaf - back */}
        <path
          d="M25 70 Q15 45 35 25 Q45 35 50 50 Q45 65 35 75 Q30 75 25 70"
          fill="url(#leafGradient)"
          className="animate-leaf-sway"
        />

        {/* Medium leaf */}
        <path
          d="M30 60 Q25 40 45 30 Q50 40 52 52 Q48 60 40 65 Q35 63 30 60"
          fill="url(#leafGradient2)"
          className="animate-leaf-sway-delayed"
        />

        {/* Small leaf accent */}
        <path
          d="M38 55 Q38 42 50 38 Q52 45 52 52 Q48 56 42 57 Q40 56 38 55"
          fill="#81C784"
          className="animate-leaf-sway"
        />

        {/* Leaf veins */}
        <path
          d="M30 65 Q38 50 42 35"
          fill="none"
          stroke="#1B5E20"
          strokeWidth="0.5"
          opacity="0.5"
        />

        {/* Oil Drop */}
        <g filter="url(#dropShadow)" className="animate-drop-float">
          {/* Main drop shape */}
          <path
            d="M60 25 Q60 25 60 25 Q75 50 75 65 Q75 82 60 82 Q45 82 45 65 Q45 50 60 25"
            fill="url(#dropGradient)"
          />
          {/* Drop highlight */}
          <ellipse
            cx="54"
            cy="55"
            rx="6"
            ry="10"
            fill="url(#dropHighlight)"
            opacity="0.6"
          />
          {/* Small highlight */}
          <circle cx="52" cy="48" r="3" fill="#FFECB3" opacity="0.8" />
        </g>

        {/* Sparkles */}
        <g className="animate-sparkle">
          <path d="M48 18 L50 22 L52 18 L50 14 Z" fill="#FFD54F" />
          <circle cx="50" cy="18" r="1" fill="#FFF9C4" />
        </g>
        <g className="animate-sparkle-delayed">
          <path d="M72 25 L73 28 L74 25 L73 22 Z" fill="#FFD54F" transform="scale(0.7)" />
        </g>
        <g className="animate-sparkle" style={{ animationDelay: '1s' }}>
          <circle cx="42" cy="25" r="1.5" fill="#FFD54F" />
        </g>

        {/* Small decorative dots */}
        <circle cx="32" cy="32" r="1" fill="#A5D6A7" className="animate-sparkle-delayed" />
        <circle cx="28" cy="45" r="0.8" fill="#A5D6A7" className="animate-sparkle" />
      </svg>

      {/* Text */}
      <div className="flex flex-col">
        <span className="logo-text-vedanta text-4xl font-bold italic text-[#2d5a27]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          Vedanta
        </span>
        <div className="flex items-center gap-1">
          <span className="logo-leaf-left text-[#6B8E23] text-sm">&#10087;</span>
          <span className="logo-text-oils text-lg font-semibold tracking-[0.25em] text-[#b8860b]" style={{ fontFamily: 'Georgia, serif' }}>
            OIL
          </span>
          <span className="logo-leaf-right text-[#6B8E23] text-sm">&#10087;</span>
        </div>
      </div>
    </div>
  );
}
