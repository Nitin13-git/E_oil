'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[#0f2910] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="white" />
              <path d="M30,10 Q40,20 35,30 Q30,40 25,30 Q20,20 30,10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16">
          {/* Content */}
          <div className="animate-fadeInUp">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Premium Quality Essential Oils
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover the Power of
              <span className="block text-[var(--accent)]">Pure Nature</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-lg">
              Experience the finest collection of 100% pure essential oils, carrier oils,
              and aromatherapy products. Sourced from the world&apos;s best botanical gardens.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary bg-white text-[var(--primary)] hover:bg-[var(--accent)] hover:text-white">
                Shop Collection
              </Link>
              <Link href="/about" className="btn-secondary border-white text-white hover:bg-white hover:text-[var(--primary)]">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-[var(--accent)]">500+</div>
                <div className="text-sm text-white/70">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--accent)]">50K+</div>
                <div className="text-sm text-white/70">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--accent)]">100%</div>
                <div className="text-sm text-white/70">Pure & Natural</div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative flex justify-center items-center">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--accent)] rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full opacity-10" />

              {/* Main bottle illustration */}
              <svg width="350" height="450" viewBox="0 0 350 450" className="animate-float drop-shadow-2xl">
                <defs>
                  <linearGradient id="bottle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f0fdf4" />
                    <stop offset="50%" stopColor="#dcfce7" />
                    <stop offset="100%" stopColor="#bbf7d0" />
                  </linearGradient>
                  <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>

                {/* Bottle shadow */}
                <ellipse cx="175" cy="430" rx="80" ry="15" fill="rgba(0,0,0,0.2)" />

                {/* Bottle body */}
                <path
                  d="M100,120 L100,350 Q100,400 150,400 L200,400 Q250,400 250,350 L250,120 Q250,100 225,100 L125,100 Q100,100 100,120"
                  fill="url(#bottle-gradient)"
                  stroke="#2d5a27"
                  strokeWidth="3"
                />

                {/* Liquid inside */}
                <path
                  d="M110,180 L110,340 Q110,380 150,380 L200,380 Q240,380 240,340 L240,180 Q175,200 110,180"
                  fill="url(#liquid-gradient)"
                  opacity="0.8"
                />

                {/* Bottle neck */}
                <rect x="145" y="50" width="60" height="50" rx="5" fill="#2d5a27" />

                {/* Cap */}
                <rect x="140" y="20" width="70" height="35" rx="8" fill="#1e3d1a" />

                {/* Label */}
                <rect x="120" y="200" width="110" height="140" rx="8" fill="white" stroke="#2d5a27" strokeWidth="2" />

                {/* Label content */}
                <text x="175" y="235" textAnchor="middle" fill="#2d5a27" fontSize="12" fontWeight="bold">ESSENCEOILS</text>
                <line x1="135" y1="250" x2="215" y2="250" stroke="#2d5a27" strokeWidth="1" opacity="0.3" />

                {/* Leaf icon on label */}
                <path
                  d="M175,265 Q185,275 180,290 Q175,305 170,290 Q165,275 175,265"
                  fill="#22c55e"
                />

                <text x="175" y="315" textAnchor="middle" fill="#1e3d1a" fontSize="11" fontWeight="bold">LAVENDER</text>
                <text x="175" y="330" textAnchor="middle" fill="#2d5a27" fontSize="8" fontStyle="italic">Pure Essential Oil</text>

                {/* Highlight */}
                <path
                  d="M115,150 Q120,250 115,340"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  opacity="0.4"
                  strokeLinecap="round"
                />

                {/* Floating leaves */}
                <g className="animate-float" style={{ animationDelay: '0.5s' }}>
                  <path d="M280,150 Q300,140 310,160 Q300,180 280,170 Q270,160 280,150" fill="#22c55e" opacity="0.6" />
                </g>
                <g className="animate-float" style={{ animationDelay: '1s' }}>
                  <path d="M60,200 Q80,190 90,210 Q80,230 60,220 Q50,210 60,200" fill="#22c55e" opacity="0.5" />
                </g>
                <g className="animate-float" style={{ animationDelay: '1.5s' }}>
                  <path d="M300,280 Q320,270 330,290 Q320,310 300,300 Q290,290 300,280" fill="#4ade80" opacity="0.4" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
