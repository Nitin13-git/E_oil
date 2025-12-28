'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[#0f2910] text-white overflow-hidden min-h-[700px]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="white">
                <animate attributeName="r" values="2;3;2" dur="3s" repeatCount="indefinite"/>
              </circle>
              <path d="M30,10 Q40,20 35,30 Q30,40 25,30 Q20,20 30,10" fill="none" stroke="white" strokeWidth="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite"/>
              </path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${4 + (i % 4) * 2}px`,
              height: `${4 + (i % 4) * 2}px`,
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animation: `float ${3 + i % 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[650px] py-16">
          {/* Content */}
          <div className="animate-fadeInUp">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-ping"></span>
              Premium Quality Essential Oils
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Pure & Natural
              <span className="block bg-gradient-to-r from-[var(--color-accent)] to-yellow-300 bg-clip-text text-transparent">
                Essential Oils
              </span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
              Discover our collection of 100% pure, therapeutic-grade essential oils.
              Every batch is <strong>GC/MS tested</strong> for guaranteed purity and natural goodness.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="group relative inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-xl">
                <span className="relative z-10">Shop Collection</span>
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[var(--color-primary)] transition-all hover:scale-105">
                Our Story
              </Link>
            </div>

            {/* Stats with animation */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              {[
                { number: '100+', label: 'Products' },
                { number: '10K+', label: 'Happy Customers' },
                { number: '100%', label: 'Pure & Natural' },
              ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <div className="text-3xl font-bold text-[var(--color-accent)] group-hover:scale-110 transition-transform">{stat.number}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Animated Bottle */}
          <div className="relative flex justify-center items-center">
            {/* Glow effect */}
            <div className="absolute w-80 h-80 bg-[var(--color-accent)] rounded-full blur-3xl opacity-20 animate-pulse" />

            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-48 h-48 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute -bottom-5 -left-5 w-32 h-32 border-2 border-[var(--color-accent)]/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

            {/* Main 3D bottle illustration */}
            <svg width="320" height="450" viewBox="0 0 320 450" className="drop-shadow-2xl relative z-10">
              <defs>
                {/* 3D Bottle gradient */}
                <linearGradient id="hero-bottle-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d0d0d0" />
                  <stop offset="15%" stopColor="#f5f5f5" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="85%" stopColor="#e8e8e8" />
                  <stop offset="100%" stopColor="#c0c0c0" />
                </linearGradient>

                {/* Animated liquid gradient */}
                <linearGradient id="hero-liquid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80">
                    <animate attributeName="stop-color" values="#4ade80;#22c55e;#4ade80" dur="3s" repeatCount="indefinite"/>
                  </stop>
                  <stop offset="100%" stopColor="#166534">
                    <animate attributeName="stop-color" values="#166534;#14532d;#166534" dur="3s" repeatCount="indefinite"/>
                  </stop>
                </linearGradient>

                {/* Cap gradient */}
                <linearGradient id="hero-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4a4a4a" />
                  <stop offset="50%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#2a2a2a" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Shadow */}
              <ellipse cx="160" cy="440" rx="70" ry="10" fill="rgba(0,0,0,0.3)">
                <animate attributeName="rx" values="70;75;70" dur="3s" repeatCount="indefinite"/>
              </ellipse>

              {/* Bottle body */}
              <g filter="url(#hero-glow)">
                <path
                  d="M80,100 L80,350 Q80,400 120,400 L200,400 Q240,400 240,350 L240,100 Q240,80 200,80 L200,50 L120,50 L120,80 Q80,80 80,100"
                  fill="url(#hero-bottle-grad)"
                  stroke="#b0b0b0"
                  strokeWidth="1"
                >
                  <animate attributeName="d"
                    values="M80,100 L80,350 Q80,400 120,400 L200,400 Q240,400 240,350 L240,100 Q240,80 200,80 L200,50 L120,50 L120,80 Q80,80 80,100;
                            M82,100 L82,350 Q82,400 120,400 L200,400 Q238,400 238,350 L238,100 Q238,80 200,80 L200,50 L120,50 L120,80 Q82,80 82,100;
                            M80,100 L80,350 Q80,400 120,400 L200,400 Q240,400 240,350 L240,100 Q240,80 200,80 L200,50 L120,50 L120,80 Q80,80 80,100"
                    dur="4s" repeatCount="indefinite"/>
                </path>

                {/* Liquid with wave animation */}
                <path
                  d="M90,130 L90,340 Q90,380 125,380 L195,380 Q230,380 230,340 L230,130 Q160,115 90,130"
                  fill="url(#hero-liquid-grad)"
                  opacity="0.9"
                >
                  <animate attributeName="d"
                    values="M90,130 L90,340 Q90,380 125,380 L195,380 Q230,380 230,340 L230,130 Q160,115 90,130;
                            M90,125 L90,340 Q90,380 125,380 L195,380 Q230,380 230,340 L230,135 Q160,120 90,125;
                            M90,130 L90,340 Q90,380 125,380 L195,380 Q230,380 230,340 L230,130 Q160,115 90,130"
                    dur="2s" repeatCount="indefinite"/>
                </path>

                {/* Rising bubbles */}
                {[...Array(6)].map((_, i) => (
                  <circle key={i} r={3 + i % 3} fill="white" opacity="0.4">
                    <animate attributeName="cy" values={`${350 - i * 20};${150};${350 - i * 20}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite"/>
                    <animate attributeName="cx" values={`${120 + i * 15};${125 + i * 15};${120 + i * 15}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite"/>
                  </circle>
                ))}

                {/* Glass highlight */}
                <path d="M95,120 L95,360 Q100,240 95,120" fill="white" opacity="0.4"/>

                {/* Neck */}
                <rect x="120" y="35" width="80" height="50" fill="url(#hero-bottle-grad)" stroke="#b0b0b0" strokeWidth="1"/>

                {/* Cap */}
                <rect x="115" y="10" width="90" height="30" rx="5" fill="url(#hero-cap-grad)"/>
                <rect x="115" y="10" width="90" height="10" rx="5" fill="#555"/>
              </g>

              {/* Label */}
              <g>
                <rect x="95" y="180" width="130" height="140" rx="8" fill="white" stroke="#2d5a27" strokeWidth="2"/>
                <rect x="95" y="180" width="130" height="25" rx="8" fill="#2d5a27"/>
                <rect x="95" y="195" width="130" height="10" fill="#2d5a27"/>

                <text x="160" y="197" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="serif">VEDANTA OILS</text>

                {/* Animated leaf */}
                <g transform="translate(150, 230)">
                  <path d="M10,0 Q18,8 14,20 Q10,30 6,20 Q2,8 10,0" fill="#22c55e" opacity="0.6">
                    <animateTransform attributeName="transform" type="rotate" values="0 10 15;10 10 15;0 10 15" dur="3s" repeatCount="indefinite"/>
                  </path>
                </g>

                <text x="160" y="270" textAnchor="middle" fill="#1e3d1a" fontSize="13" fontWeight="bold" fontFamily="serif">LAVENDER</text>
                <text x="160" y="286" textAnchor="middle" fill="#1e3d1a" fontSize="13" fontWeight="bold" fontFamily="serif">Essential Oil</text>
                <text x="160" y="302" textAnchor="middle" fill="#2d5a27" fontSize="9" fontStyle="italic">Lavandula angustifolia</text>

                <rect x="95" y="308" width="130" height="12" rx="4" fill="#2d5a27"/>
                <text x="160" y="317" textAnchor="middle" fill="white" fontSize="8">15ml | 100% Pure</text>
              </g>

              {/* Premium seal */}
              <g transform="translate(220, 170)">
                <circle cx="0" cy="0" r="20" fill="#d4a853">
                  <animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite"/>
                </circle>
                <text x="0" y="-3" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PREMIUM</text>
                <text x="0" y="7" textAnchor="middle" fill="white" fontSize="7">QUALITY</text>
              </g>

              {/* Sparkles */}
              {[...Array(5)].map((_, i) => (
                <g key={`sparkle-${i}`}>
                  <circle cx={60 + i * 50} cy={50 + i * 30} r="3" fill="white">
                    <animate attributeName="opacity" values="0;1;0" dur={`${1 + i * 0.3}s`} repeatCount="indefinite"/>
                    <animate attributeName="r" values="2;4;2" dur={`${1 + i * 0.3}s`} repeatCount="indefinite"/>
                  </circle>
                </g>
              ))}
            </svg>

            {/* Floating leaves */}
            <div className="absolute top-10 right-10 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>🌿</div>
            <div className="absolute bottom-20 left-5 text-3xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>🍃</div>
            <div className="absolute top-1/2 right-0 text-2xl animate-bounce" style={{ animationDuration: '2s', animationDelay: '1s' }}>✨</div>
          </div>
        </div>
      </div>

      {/* Animated wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" fill="white">
            <animate attributeName="d"
              values="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z;
                      M0,80 C240,20 480,100 720,40 C960,80 1200,20 1440,80 L1440,120 L0,120 Z;
                      M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
              dur="8s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
    </section>
  );
}
