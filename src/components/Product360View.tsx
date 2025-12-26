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
      setRotation((prev) => (prev + 0.4) % 360);
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

  // Calculate visibility of front/back/side labels
  const frontOpacity = Math.max(0, Math.cos(radians));
  const backOpacity = Math.max(0, -Math.cos(radians));
  const rightSideOpacity = Math.max(0, Math.sin(radians));
  const leftSideOpacity = Math.max(0, -Math.sin(radians));

  // Lighting
  const highlightX = 50 + Math.sin(radians) * 30;

  // Get first word of product name for vertical text
  const shortName = productName.split(' ')[0].toLowerCase();

  return (
    <div className="relative">
      {/* Instructions */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Drag to rotate 360°
        </span>
      </div>

      {/* 3D Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[400px] h-[550px] mx-auto cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: '1200px' }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-50 rounded-3xl" />

        {/* 3D Bottle */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <svg width="200" height="480" viewBox="0 0 200 480" className="drop-shadow-2xl">
            <defs>
              {/* Swirl pattern - marble effect */}
              <pattern id="swirl-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill={productColor}/>
                <path d="M0,50 Q25,30 50,50 T100,50" stroke={adjustColor(productColor, 40)} strokeWidth="8" fill="none" opacity="0.6">
                  <animate attributeName="d" values="M0,50 Q25,30 50,50 T100,50;M0,50 Q25,70 50,50 T100,50;M0,50 Q25,30 50,50 T100,50" dur="8s" repeatCount="indefinite"/>
                </path>
                <path d="M0,30 Q30,10 60,30 T100,30" stroke={adjustColor(productColor, 60)} strokeWidth="5" fill="none" opacity="0.5">
                  <animate attributeName="d" values="M0,30 Q30,10 60,30 T100,30;M0,30 Q30,50 60,30 T100,30;M0,30 Q30,10 60,30 T100,30" dur="6s" repeatCount="indefinite"/>
                </path>
                <path d="M0,70 Q20,90 50,70 T100,70" stroke={adjustColor(productColor, 80)} strokeWidth="6" fill="none" opacity="0.4">
                  <animate attributeName="d" values="M0,70 Q20,90 50,70 T100,70;M0,70 Q20,50 50,70 T100,70;M0,70 Q20,90 50,70 T100,70" dur="7s" repeatCount="indefinite"/>
                </path>
                <circle cx="20" cy="40" r="15" fill={adjustColor(productColor, 50)} opacity="0.3"/>
                <circle cx="70" cy="60" r="20" fill={adjustColor(productColor, 30)} opacity="0.4"/>
                <circle cx="85" cy="25" r="12" fill={adjustColor(productColor, 70)} opacity="0.3"/>
              </pattern>

              {/* Bottle body gradient with swirl */}
              <linearGradient id="bottle-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={adjustColor(productColor, -40)} />
                <stop offset={`${highlightX - 20}%`} stopColor={productColor} />
                <stop offset={`${highlightX}%`} stopColor={adjustColor(productColor, 30)} />
                <stop offset={`${highlightX + 20}%`} stopColor={productColor} />
                <stop offset="100%" stopColor={adjustColor(productColor, -40)} />
              </linearGradient>

              {/* Cap gradient */}
              <linearGradient id="cap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset={`${highlightX}%`} stopColor="#3a3a3a" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>

              {/* Label gradient */}
              <linearGradient id="label-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset={`${highlightX}%`} stopColor="#3d3d3d" />
                <stop offset="100%" stopColor="#2a2a2a" />
              </linearGradient>

              {/* Clip path for bottle shape */}
              <clipPath id="bottle-clip">
                <path d="M45,80
                         Q30,90 30,120
                         L30,380
                         Q30,440 100,440
                         Q170,440 170,380
                         L170,120
                         Q170,90 155,80
                         L155,55
                         Q155,45 140,45
                         L60,45
                         Q45,45 45,55
                         Z"/>
              </clipPath>

              {/* Shadow filter */}
              <filter id="shadow" x="-30%" y="-10%" width="160%" height="130%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.25"/>
              </filter>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="100" cy="465" rx="55" ry="12" fill="rgba(0,0,0,0.12)">
              <animate attributeName="rx" values="55;60;55" dur="4s" repeatCount="indefinite"/>
            </ellipse>

            {/* Main bottle group */}
            <g filter="url(#shadow)">

              {/* Bottle body with swirl pattern */}
              <g clipPath="url(#bottle-clip)">
                {/* Base color */}
                <rect x="30" y="45" width="140" height="400" fill="url(#bottle-grad)"/>

                {/* Swirl pattern overlay */}
                <rect x="30" y="45" width="140" height="400" fill="url(#swirl-pattern)" opacity="0.7"/>

                {/* Additional swirl waves */}
                <path d="M30,100 Q70,80 100,110 Q130,140 170,100" fill="none" stroke={adjustColor(productColor, 60)} strokeWidth="15" opacity="0.4">
                  <animate attributeName="d" values="M30,100 Q70,80 100,110 Q130,140 170,100;M30,120 Q70,100 100,130 Q130,160 170,120;M30,100 Q70,80 100,110 Q130,140 170,100" dur="5s" repeatCount="indefinite"/>
                </path>
                <path d="M30,180 Q60,150 100,180 Q140,210 170,170" fill="none" stroke={adjustColor(productColor, 70)} strokeWidth="12" opacity="0.3">
                  <animate attributeName="d" values="M30,180 Q60,150 100,180 Q140,210 170,170;M30,160 Q60,190 100,160 Q140,130 170,180;M30,180 Q60,150 100,180 Q140,210 170,170" dur="6s" repeatCount="indefinite"/>
                </path>
                <path d="M30,350 Q80,320 100,360 Q120,400 170,360" fill="none" stroke={adjustColor(productColor, 50)} strokeWidth="18" opacity="0.3">
                  <animate attributeName="d" values="M30,350 Q80,320 100,360 Q120,400 170,360;M30,370 Q80,400 100,350 Q120,300 170,350;M30,350 Q80,320 100,360 Q120,400 170,360" dur="7s" repeatCount="indefinite"/>
                </path>

                {/* Glossy highlight */}
                <path
                  d={`M${45 + Math.sin(radians) * 15},80
                      L${45 + Math.sin(radians) * 15},420`}
                  stroke="white"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity={0.25 + Math.cos(radians) * 0.15}
                />
              </g>

              {/* Bottle outline */}
              <path
                d="M45,80
                   Q30,90 30,120
                   L30,380
                   Q30,440 100,440
                   Q170,440 170,380
                   L170,120
                   Q170,90 155,80
                   L155,55
                   Q155,45 140,45
                   L60,45
                   Q45,45 45,55
                   Z"
                fill="none"
                stroke={adjustColor(productColor, -60)}
                strokeWidth="1"
                opacity="0.3"
              />

              {/* Neck */}
              <rect x="60" y="35" width="80" height="25" rx="3" fill="url(#bottle-grad)"/>
              <rect x="60" y="35" width="80" height="25" rx="3" fill="url(#swirl-pattern)" opacity="0.5"/>

              {/* Cap */}
              <ellipse cx="100" cy="35" rx="42" ry="10" fill="url(#cap-grad)"/>
              <rect x="58" y="5" width="84" height="32" rx="5" fill="url(#cap-grad)"/>
              <ellipse cx="100" cy="5" rx="42" ry="12" fill="#2a2a2a"/>

              {/* Cap highlight */}
              <ellipse
                cx={88 + Math.sin(radians) * 10}
                cy="5"
                rx="15"
                ry="6"
                fill="white"
                opacity={0.1 + Math.cos(radians) * 0.05}
              />
              <rect
                x={65 + Math.sin(radians) * 10}
                y="8"
                width="8"
                height="25"
                fill="white"
                opacity={0.08 + Math.cos(radians) * 0.04}
                rx="4"
              />

              {/* FRONT LABEL - visible when facing front */}
              <g opacity={frontOpacity} style={{ transition: 'opacity 0.15s' }}>
                {/* Main label background */}
                <rect x="38" y="230" width="124" height="120" rx="4" fill="url(#label-grad)"/>

                {/* Logo/Icon */}
                <circle cx="60" cy="255" r="10" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8"/>
                <path d="M56,255 Q60,248 64,255 Q60,262 56,255" fill="white" opacity="0.8"/>

                {/* Product Name */}
                <text x="50" y="290" fill="white" fontSize="16" fontWeight="300" fontFamily="Georgia, serif" fontStyle="italic">
                  {productName.split(' ').slice(0, -2).join(' ') || productName.split(' ')[0]}
                </text>
                <text x="50" y="308" fill="white" fontSize="14" fontWeight="300" fontFamily="Georgia, serif" fontStyle="italic">
                  Essential Oil
                </text>

                {/* Subtitle */}
                <text x="50" y="328" fill="#999" fontSize="8" fontFamily="system-ui">
                  {scientificName}
                </text>

                {/* Volume */}
                <text x="50" y="342" fill="#777" fontSize="7" fontFamily="system-ui">
                  {volume} | 100% Pure | Botanica Bliss
                </text>
              </g>

              {/* VERTICAL TEXT - Right side */}
              <g opacity={rightSideOpacity} style={{ transition: 'opacity 0.15s' }}>
                <text
                  x="155"
                  y="180"
                  fill="white"
                  fontSize="24"
                  fontWeight="bold"
                  fontFamily="system-ui"
                  transform="rotate(90, 155, 180)"
                  opacity="0.9"
                >
                  {shortName}
                </text>
              </g>

              {/* BACK LABEL - visible when facing back */}
              <g opacity={backOpacity} style={{ transition: 'opacity 0.15s' }}>
                <rect x="38" y="220" width="124" height="140" rx="4" fill="url(#label-grad)"/>

                {/* Back content */}
                <text x="100" y="245" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BOTANICA BLISS</text>

                <text x="50" y="265" fill="#ccc" fontSize="8">Ingredients:</text>
                <text x="50" y="278" fill="#999" fontSize="7">100% Pure {productName}</text>

                <text x="50" y="298" fill="#ccc" fontSize="8">How to Use:</text>
                <text x="50" y="311" fill="#999" fontSize="7">Add 2-3 drops to diffuser or</text>
                <text x="50" y="322" fill="#999" fontSize="7">dilute with carrier oil for</text>
                <text x="50" y="333" fill="#999" fontSize="7">topical application.</text>

                <line x1="50" y1="345" x2="150" y2="345" stroke="#555" strokeWidth="0.5"/>

                <text x="100" y="355" textAnchor="middle" fill="#777" fontSize="6">Made in India | botanicabliss.com</text>
              </g>

              {/* VERTICAL TEXT - Left side */}
              <g opacity={leftSideOpacity} style={{ transition: 'opacity 0.15s' }}>
                <text
                  x="45"
                  y="320"
                  fill="white"
                  fontSize="20"
                  fontWeight="300"
                  fontFamily="Georgia, serif"
                  transform="rotate(-90, 45, 320)"
                  opacity="0.8"
                  fontStyle="italic"
                >
                  pure & natural
                </text>
              </g>

            </g>
          </svg>
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
              autoRotate
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            aria-label={autoRotate ? 'Stop rotation' : 'Start rotation'}
          >
            {autoRotate ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          <span className="text-xs text-gray-400 font-mono bg-white/80 px-2 py-1 rounded">
            {Math.round(normalizedRotation)}°
          </span>
        </div>
      </div>

      {/* View indicators */}
      <div className="flex justify-center items-center gap-3 mt-4">
        {[
          { angle: 0, label: 'Front' },
          { angle: 90, label: 'Right' },
          { angle: 180, label: 'Back' },
          { angle: 270, label: 'Left' },
        ].map((view) => (
          <button
            key={view.angle}
            onClick={() => {
              setRotation(view.angle);
              setAutoRotate(false);
            }}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              Math.abs(normalizedRotation - view.angle) < 45 || Math.abs(normalizedRotation - view.angle) > 315
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
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
