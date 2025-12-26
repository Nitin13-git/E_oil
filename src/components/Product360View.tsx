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

  // Calculate lighting based on rotation
  const highlightX = 50 + Math.sin(radians) * 35;
  const shadowIntensity = 0.15 + Math.abs(Math.sin(radians)) * 0.1;

  return (
    <div className="relative">
      {/* Instructions */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-2 bg-black/5 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Drag to rotate
        </span>
      </div>

      {/* 3D Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[400px] h-[520px] mx-auto cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: '1200px' }}
      >
        {/* Subtle ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-20 transition-all duration-500"
          style={{ backgroundColor: productColor }}
        />

        {/* 3D Bottle */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <svg width="200" height="440" viewBox="0 0 200 440" className="drop-shadow-xl">
            <defs>
              {/* Minimalist frosted glass gradient */}
              <linearGradient id="bottle-glass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset={`${highlightX - 25}%`} stopColor="#2a2a2a" />
                <stop offset={`${highlightX}%`} stopColor="#3a3a3a" />
                <stop offset={`${highlightX + 25}%`} stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>

              {/* Amber/brown glass option */}
              <linearGradient id="bottle-amber" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3d2914" />
                <stop offset={`${highlightX - 25}%`} stopColor="#5c3d1e" />
                <stop offset={`${highlightX}%`} stopColor="#7a5229" />
                <stop offset={`${highlightX + 25}%`} stopColor="#5c3d1e" />
                <stop offset="100%" stopColor="#3d2914" />
              </linearGradient>

              {/* Liquid gradient */}
              <linearGradient id="liquid-minimal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={productColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor={adjustColor(productColor, -40)} stopOpacity="0.95" />
              </linearGradient>

              {/* Matte black cap */}
              <linearGradient id="cap-matte" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0a0a0a" />
                <stop offset={`${highlightX}%`} stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>

              {/* Dropper gradient */}
              <linearGradient id="dropper-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="50%" stopColor="#2d2d2d" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>

              {/* Glass reflection */}
              <linearGradient id="glass-reflect" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.15" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>

              {/* Soft shadow filter */}
              <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity={shadowIntensity}/>
              </filter>

              {/* Inner glow for liquid */}
              <filter id="liquid-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="100" cy="425" rx="45" ry="8" fill="rgba(0,0,0,0.15)">
              <animate attributeName="rx" values="45;48;45" dur="3s" repeatCount="indefinite"/>
            </ellipse>

            {/* Main bottle group */}
            <g filter="url(#soft-shadow)">

              {/* Bottle body - elegant dropper bottle shape */}
              <path
                d="M55,120
                   L55,340
                   Q55,380 75,395
                   L125,395
                   Q145,380 145,340
                   L145,120
                   Q145,100 130,95
                   L130,70
                   Q130,60 120,60
                   L80,60
                   Q70,60 70,70
                   L70,95
                   Q55,100 55,120"
                fill="url(#bottle-amber)"
              />

              {/* Liquid inside */}
              <path
                d="M62,135
                   L62,335
                   Q62,370 80,382
                   L120,382
                   Q138,370 138,335
                   L138,135
                   Q100,125 62,135"
                fill="url(#liquid-minimal)"
                filter="url(#liquid-glow)"
              >
                <animate
                  attributeName="d"
                  values="M62,135 L62,335 Q62,370 80,382 L120,382 Q138,370 138,335 L138,135 Q100,125 62,135;
                          M62,130 L62,335 Q62,370 80,382 L120,382 Q138,370 138,335 L138,140 Q100,130 62,130;
                          M62,135 L62,335 Q62,370 80,382 L120,382 Q138,370 138,335 L138,135 Q100,125 62,135"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Subtle bubbles */}
              {[...Array(5)].map((_, i) => (
                <circle
                  key={i}
                  r={1.5 + (i % 2)}
                  fill="white"
                  opacity="0.3"
                >
                  <animate
                    attributeName="cy"
                    values={`${350 - i * 30};${160};${350 - i * 30}`}
                    dur={`${3 + i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cx"
                    values={`${80 + i * 10};${82 + i * 10};${80 + i * 10}`}
                    dur={`${3 + i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0.5;0.3"
                    dur={`${3 + i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              {/* Glass highlight - primary */}
              <path
                d={`M${67 + Math.sin(radians) * 8},130
                    Q${67 + Math.sin(radians) * 8},250 ${67 + Math.sin(radians) * 8},370`}
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                opacity={0.12 + Math.cos(radians) * 0.08}
                fill="none"
              />

              {/* Glass highlight - secondary edge */}
              <path
                d={`M${133 - Math.sin(radians) * 8},130
                    Q${133 - Math.sin(radians) * 8},250 ${133 - Math.sin(radians) * 8},370`}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity={0.06 + Math.cos(radians + Math.PI) * 0.04}
                fill="none"
              />

              {/* Neck */}
              <rect x="70" y="55" width="60" height="45" rx="2" fill="url(#bottle-amber)"/>

              {/* Neck highlight */}
              <rect
                x={75 + Math.sin(radians) * 5}
                y="55"
                width="4"
                height="45"
                fill="white"
                opacity="0.08"
                rx="2"
              />

              {/* Rubber dropper bulb */}
              <ellipse cx="100" cy="28" rx="22" ry="25" fill="url(#cap-matte)"/>
              <ellipse cx="100" cy="25" rx="18" ry="20" fill="#0f0f0f"/>

              {/* Bulb highlight */}
              <ellipse
                cx={95 + Math.sin(radians) * 5}
                cy="20"
                rx="6"
                ry="8"
                fill="white"
                opacity="0.08"
              />

              {/* Metal collar */}
              <rect x="72" y="48" width="56" height="12" rx="2" fill="#2a2a2a"/>
              <rect x="72" y="48" width="56" height="4" rx="2" fill="#3a3a3a"/>

              {/* Collar highlight */}
              <rect
                x={78 + Math.sin(radians) * 8}
                y="48"
                width="8"
                height="12"
                fill="white"
                opacity="0.1"
                rx="1"
              />

              {/* Glass dropper tube (visible inside neck) */}
              <rect x="95" y="60" width="10" height="35" fill="rgba(255,255,255,0.1)" rx="2"/>
            </g>

            {/* Minimalist product name - very subtle */}
            <g opacity="0.7" style={{ transition: 'opacity 0.3s' }}>
              <text
                x="100"
                y="260"
                textAnchor="middle"
                fill="#d4c4a8"
                fontSize="8"
                fontWeight="300"
                fontFamily="system-ui, -apple-system, sans-serif"
                letterSpacing="3"
                style={{ textTransform: 'uppercase' }}
              >
                {productName.split(' ')[0].toUpperCase()}
              </text>
            </g>

            {/* Subtle reflection on surface */}
            <ellipse
              cx="100"
              cy="395"
              rx="35"
              ry="3"
              fill="white"
              opacity="0.05"
            />
          </svg>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all tracking-wide ${
              autoRotate
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {autoRotate ? 'ROTATING' : 'AUTO ROTATE'}
          </button>
          <div className="text-xs text-gray-400 font-mono">
            {Math.round(normalizedRotation)}°
          </div>
        </div>
      </div>

      {/* Minimal view selector */}
      <div className="flex justify-center gap-1 mt-6">
        {[0, 90, 180, 270].map((angle) => (
          <button
            key={angle}
            onClick={() => {
              setRotation(angle);
              setAutoRotate(false);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              Math.abs(normalizedRotation - angle) < 30 || Math.abs(normalizedRotation - angle) > 330
                ? 'bg-black scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Rotate to ${angle} degrees`}
          />
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
