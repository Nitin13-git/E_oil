'use client';

import { useState, useRef, useEffect } from 'react';

interface Product360ViewProps {
  productName: string;
  productColor: string;
  scientificName?: string;
  volume?: string;
}

export default function Product360View({
  productName,
  productColor,
  scientificName = 'Botanical Extract',
  volume = '15ml',
}: Product360ViewProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate when not dragging
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setAutoRotate(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotation((prev) => (prev + deltaX * 0.5) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setAutoRotate(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    setRotation((prev) => (prev + deltaX * 0.5) % 360);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Calculate 3D transform values based on rotation
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const radians = (normalizedRotation * Math.PI) / 180;

  // Calculate lighting and visibility based on rotation
  const frontOpacity = Math.max(0, Math.cos(radians));
  const backOpacity = Math.max(0, -Math.cos(radians));
  const sideOpacity = Math.abs(Math.sin(radians));
  const isShowingBack = normalizedRotation > 90 && normalizedRotation < 270;

  // Highlight position based on rotation
  const highlightX = 50 + Math.sin(radians) * 30;

  return (
    <div className="relative">
      {/* Instructions */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-2 bg-[var(--primary)]/10 text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium">
          <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Drag to rotate 360°
        </span>
      </div>

      {/* 3D Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[400px] h-[500px] mx-auto cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: '1000px' }}
      >
        {/* Glow effect */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 transition-all duration-300"
          style={{ backgroundColor: productColor }}
        />

        {/* 3D Bottle */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <svg width="280" height="420" viewBox="0 0 280 420" className="drop-shadow-2xl">
            <defs>
              {/* Dynamic bottle gradient based on rotation */}
              <linearGradient id="bottle-body-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={`hsl(0, 0%, ${70 - sideOpacity * 20}%)`} />
                <stop offset={`${highlightX - 20}%`} stopColor={`hsl(0, 0%, ${85 - sideOpacity * 10}%)`} />
                <stop offset={`${highlightX}%`} stopColor="#ffffff" />
                <stop offset={`${highlightX + 20}%`} stopColor={`hsl(0, 0%, ${85 - sideOpacity * 10}%)`} />
                <stop offset="100%" stopColor={`hsl(0, 0%, ${70 - sideOpacity * 20}%)`} />
              </linearGradient>

              {/* Liquid gradient */}
              <linearGradient id="liquid-grad-360" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={productColor}>
                  <animate attributeName="stop-color" values={`${productColor};${adjustColor(productColor, 20)};${productColor}`} dur="3s" repeatCount="indefinite"/>
                </stop>
                <stop offset="100%" stopColor={adjustColor(productColor, -30)}>
                  <animate attributeName="stop-color" values={`${adjustColor(productColor, -30)};${adjustColor(productColor, -50)};${adjustColor(productColor, -30)}`} dur="3s" repeatCount="indefinite"/>
                </stop>
              </linearGradient>

              {/* Cap gradient */}
              <linearGradient id="cap-grad-360" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4a4a4a" />
                <stop offset="50%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#2a2a2a" />
              </linearGradient>

              {/* Reflection gradient */}
              <linearGradient id="reflection-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.4" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>

              {/* Shadow filter */}
              <filter id="bottle-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="10" stdDeviation="15" floodOpacity="0.3"/>
              </filter>
            </defs>

            {/* Shadow on ground */}
            <ellipse cx="140" cy="405" rx="60" ry="12" fill="rgba(0,0,0,0.2)">
              <animate attributeName="rx" values="60;65;60" dur="2s" repeatCount="indefinite"/>
            </ellipse>

            {/* Bottle body */}
            <g filter="url(#bottle-shadow)">
              {/* Main bottle shape */}
              <path
                d="M70,90 L70,320 Q70,370 110,370 L170,370 Q210,370 210,320 L210,90 Q210,70 180,70 L180,45 L100,45 L100,70 Q70,70 70,90"
                fill="url(#bottle-body-grad)"
                stroke="#b0b0b0"
                strokeWidth="1"
              />

              {/* Liquid inside */}
              <path
                d="M80,115 L80,310 Q80,355 115,355 L165,355 Q200,355 200,310 L200,115 Q140,100 80,115"
                fill="url(#liquid-grad-360)"
                opacity="0.9"
              >
                <animate
                  attributeName="d"
                  values="M80,115 L80,310 Q80,355 115,355 L165,355 Q200,355 200,310 L200,115 Q140,100 80,115;
                          M80,110 L80,310 Q80,355 115,355 L165,355 Q200,355 200,310 L200,120 Q140,105 80,110;
                          M80,115 L80,310 Q80,355 115,355 L165,355 Q200,355 200,310 L200,115 Q140,100 80,115"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Bubbles */}
              {[...Array(8)].map((_, i) => (
                <circle key={i} r={2 + (i % 3)} fill="white" opacity="0.5">
                  <animate
                    attributeName="cy"
                    values={`${320 - i * 20};${130};${320 - i * 20}`}
                    dur={`${2 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cx"
                    values={`${100 + i * 12};${105 + i * 12};${100 + i * 12}`}
                    dur={`${2 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0.8;0.5"
                    dur={`${2 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              {/* Glass highlight - moves with rotation */}
              <path
                d={`M${85 + Math.sin(radians) * 10},100
                    L${85 + Math.sin(radians) * 10},330
                    Q${90 + Math.sin(radians) * 10},220 ${85 + Math.sin(radians) * 10},100`}
                fill="white"
                opacity={0.3 + frontOpacity * 0.2}
              />

              {/* Secondary highlight on opposite side */}
              <path
                d={`M${195 - Math.sin(radians) * 10},100
                    L${195 - Math.sin(radians) * 10},330
                    Q${190 - Math.sin(radians) * 10},220 ${195 - Math.sin(radians) * 10},100`}
                fill="white"
                opacity={0.15 + backOpacity * 0.15}
              />

              {/* Neck */}
              <rect x="100" y="30" width="80" height="45" fill="url(#bottle-body-grad)" stroke="#b0b0b0" strokeWidth="1"/>

              {/* Neck highlight */}
              <rect x={105 + Math.sin(radians) * 5} y="30" width="10" height="45" fill="white" opacity="0.3"/>

              {/* Cap */}
              <rect x="95" y="5" width="90" height="30" rx="5" fill="url(#cap-grad-360)"/>
              <rect x="95" y="5" width="90" height="10" rx="5" fill="#555"/>

              {/* Cap highlight */}
              <rect x={100 + Math.sin(radians) * 8} y="5" width="15" height="30" rx="3" fill="white" opacity="0.15"/>
            </g>

            {/* Front Label - visible when facing front */}
            <g opacity={frontOpacity} style={{ transition: 'opacity 0.1s' }}>
              <rect x="85" y="160" width="110" height="130" rx="6" fill="white" stroke="#2d5a27" strokeWidth="2"/>
              <rect x="85" y="160" width="110" height="22" rx="6" fill="#2d5a27"/>
              <rect x="85" y="175" width="110" height="7" fill="#2d5a27"/>

              <text x="140" y="176" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="serif">
                BOTANICA BLISS
              </text>

              {/* Leaf decoration */}
              <g transform="translate(130, 205)">
                <path d="M10,0 Q18,8 14,20 Q10,30 6,20 Q2,8 10,0" fill={productColor} opacity="0.7">
                  <animateTransform attributeName="transform" type="rotate" values="0 10 15;10 10 15;0 10 15" dur="3s" repeatCount="indefinite"/>
                </path>
              </g>

              <text x="140" y="250" textAnchor="middle" fill="#1e3d1a" fontSize="11" fontWeight="bold" fontFamily="serif">
                {productName.split(' ').slice(0, -2).join(' ').toUpperCase() || productName.toUpperCase()}
              </text>
              <text x="140" y="264" textAnchor="middle" fill="#1e3d1a" fontSize="10" fontWeight="bold" fontFamily="serif">
                Essential Oil
              </text>
              <text x="140" y="278" textAnchor="middle" fill="#2d5a27" fontSize="7" fontStyle="italic">
                {scientificName}
              </text>

              <rect x="85" y="282" width="110" height="8" fill="#2d5a27"/>
              <text x="140" y="289" textAnchor="middle" fill="white" fontSize="6">{volume} | 100% Pure</text>
            </g>

            {/* Back Label - visible when facing back */}
            <g opacity={backOpacity} style={{ transition: 'opacity 0.1s' }}>
              <rect x="85" y="160" width="110" height="130" rx="6" fill="white" stroke="#2d5a27" strokeWidth="2"/>
              <rect x="85" y="160" width="110" height="22" rx="6" fill="#2d5a27"/>
              <rect x="85" y="175" width="110" height="7" fill="#2d5a27"/>

              <text x="140" y="176" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="serif">
                BOTANICA BLISS
              </text>

              <text x="140" y="200" textAnchor="middle" fill="#1e3d1a" fontSize="8" fontWeight="bold">Ingredients:</text>
              <text x="140" y="212" textAnchor="middle" fill="#666" fontSize="6">100% Pure {productName}</text>

              <text x="140" y="230" textAnchor="middle" fill="#1e3d1a" fontSize="8" fontWeight="bold">Directions:</text>
              <text x="140" y="242" textAnchor="middle" fill="#666" fontSize="6">Dilute with carrier oil</text>
              <text x="140" y="252" textAnchor="middle" fill="#666" fontSize="6">before topical use</text>

              <text x="140" y="270" textAnchor="middle" fill="#1e3d1a" fontSize="8" fontWeight="bold">Caution:</text>
              <text x="140" y="282" textAnchor="middle" fill="#666" fontSize="6">Keep out of reach of children</text>

              <rect x="95" y="286" width="90" height="1" fill="#ddd"/>
            </g>

            {/* Side info - visible when at side angles */}
            <g opacity={sideOpacity * 0.8} style={{ transition: 'opacity 0.1s' }}>
              <text
                x="140"
                y="380"
                textAnchor="middle"
                fill="#666"
                fontSize="8"
                transform={`rotate(${normalizedRotation > 180 ? -90 : 90}, 140, 380)`}
              >
                Made in India
              </text>
            </g>

            {/* Premium seal */}
            <g transform="translate(190, 145)" opacity={frontOpacity}>
              <circle cx="0" cy="0" r="18" fill="#d4a853">
                <animate attributeName="r" values="18;20;18" dur="2s" repeatCount="indefinite"/>
              </circle>
              <text x="0" y="-3" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PREMIUM</text>
              <text x="0" y="6" textAnchor="middle" fill="white" fontSize="6">QUALITY</text>
            </g>

            {/* Sparkle effects */}
            {[...Array(4)].map((_, i) => (
              <circle
                key={`sparkle-${i}`}
                cx={70 + i * 50}
                cy={80 + i * 40}
                r="2"
                fill="white"
              >
                <animate attributeName="opacity" values="0;1;0" dur={`${1 + i * 0.3}s`} repeatCount="indefinite"/>
                <animate attributeName="r" values="1;3;1" dur={`${1 + i * 0.3}s`} repeatCount="indefinite"/>
              </circle>
            ))}
          </svg>
        </div>

        {/* Rotation indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              autoRotate
                ? 'bg-[var(--primary)] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {autoRotate ? 'Auto Rotating' : 'Auto Rotate'}
          </button>
          <div className="text-sm text-gray-500">
            {Math.round(normalizedRotation)}°
          </div>
        </div>
      </div>

      {/* View angles quick select */}
      <div className="flex justify-center gap-2 mt-6">
        {[
          { angle: 0, label: 'Front' },
          { angle: 90, label: 'Side' },
          { angle: 180, label: 'Back' },
          { angle: 270, label: 'Side' },
        ].map((view) => (
          <button
            key={view.angle}
            onClick={() => {
              setRotation(view.angle);
              setAutoRotate(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              Math.abs(normalizedRotation - view.angle) < 20 || Math.abs(normalizedRotation - view.angle) > 340
                ? 'bg-[var(--primary)] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
  return color;
}
