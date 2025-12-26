'use client';

import { useState, useRef, useEffect } from 'react';

interface Product360ViewProps {
  productName: string;
  productColor: string;
  scientificName?: string;
  volume?: string;
}

export default function Product360View({
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

  // Calculate lighting based on rotation
  const highlightX = 50 + Math.sin(radians) * 30;
  const shadowX = 50 - Math.sin(radians) * 20;

  return (
    <div className="relative">
      {/* Instructions */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Drag to rotate
        </span>
      </div>

      {/* 3D Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[400px] h-[520px] mx-auto cursor-grab active:cursor-grabbing select-none bg-gradient-to-b from-gray-50 to-white rounded-3xl"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: '1200px' }}
      >
        {/* Subtle colored glow from the oil */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-10"
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
          <svg width="180" height="420" viewBox="0 0 180 420" className="drop-shadow-lg">
            <defs>
              {/* Matte white bottle gradient - realistic 3D effect */}
              <linearGradient id="bottle-white" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e8e8e8" />
                <stop offset={`${shadowX - 15}%`} stopColor="#f0f0f0" />
                <stop offset={`${highlightX - 10}%`} stopColor="#f8f8f8" />
                <stop offset={`${highlightX}%`} stopColor="#ffffff" />
                <stop offset={`${highlightX + 10}%`} stopColor="#f8f8f8" />
                <stop offset={`${100 - shadowX + 15}%`} stopColor="#f0f0f0" />
                <stop offset="100%" stopColor="#e0e0e0" />
              </linearGradient>

              {/* Black cap gradient */}
              <linearGradient id="cap-black" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset={`${highlightX - 15}%`} stopColor="#2a2a2a" />
                <stop offset={`${highlightX}%`} stopColor="#3a3a3a" />
                <stop offset={`${highlightX + 15}%`} stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>

              {/* Cap top gradient */}
              <radialGradient id="cap-top" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#3a3a3a" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </radialGradient>

              {/* Soft shadow */}
              <filter id="bottle-shadow" x="-30%" y="-10%" width="160%" height="130%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
              </filter>

              {/* Inner shadow for depth */}
              <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
                <feOffset in="blur" dx="2" dy="2" result="offsetBlur"/>
                <feComposite in="SourceGraphic" in2="offsetBlur" operator="over"/>
              </filter>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="90" cy="405" rx="50" ry="10" fill="rgba(0,0,0,0.08)">
              <animate attributeName="rx" values="50;55;50" dur="4s" repeatCount="indefinite"/>
            </ellipse>

            {/* Main bottle */}
            <g filter="url(#bottle-shadow)">

              {/* Bottle body - rounded rectangle shape like Minimalist */}
              <path
                d="M40,95
                   L40,340
                   Q40,390 90,390
                   Q140,390 140,340
                   L140,95
                   Q140,75 120,70
                   L120,55
                   L60,55
                   L60,70
                   Q40,75 40,95"
                fill="url(#bottle-white)"
              />

              {/* Left edge shadow */}
              <path
                d="M40,95 L40,340 Q40,390 90,390"
                fill="none"
                stroke="#d5d5d5"
                strokeWidth="1"
                opacity={0.5 + Math.sin(radians) * 0.3}
              />

              {/* Right edge highlight */}
              <path
                d="M140,95 L140,340 Q140,390 90,390"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity={0.3 - Math.sin(radians) * 0.2}
              />

              {/* Main highlight streak */}
              <path
                d={`M${55 + Math.sin(radians) * 15},100
                    L${55 + Math.sin(radians) * 15},350
                    Q${60 + Math.sin(radians) * 15},380 ${70 + Math.sin(radians) * 10},385`}
                fill="none"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                opacity={0.4 + Math.cos(radians) * 0.2}
              />

              {/* Secondary subtle highlight */}
              <path
                d={`M${70 + Math.sin(radians) * 12},105
                    L${70 + Math.sin(radians) * 12},345`}
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                opacity={0.2 + Math.cos(radians) * 0.1}
              />

              {/* Opposite side subtle shadow */}
              <path
                d={`M${125 - Math.sin(radians) * 10},100
                    L${125 - Math.sin(radians) * 10},350`}
                fill="none"
                stroke="#d0d0d0"
                strokeWidth="4"
                strokeLinecap="round"
                opacity={0.3 + Math.sin(radians) * 0.2}
              />

              {/* Neck */}
              <rect x="60" y="45" width="60" height="30" fill="url(#bottle-white)"/>

              {/* Neck highlight */}
              <rect
                x={65 + Math.sin(radians) * 5}
                y="45"
                width="6"
                height="30"
                fill="white"
                opacity={0.3 + Math.cos(radians) * 0.15}
                rx="3"
              />

              {/* Black dome cap */}
              <ellipse cx="90" cy="45" rx="35" ry="8" fill="url(#cap-black)"/>

              {/* Cap cylinder */}
              <rect x="55" y="15" width="70" height="32" rx="3" fill="url(#cap-black)"/>

              {/* Cap top dome */}
              <ellipse cx="90" cy="15" rx="35" ry="12" fill="url(#cap-top)"/>

              {/* Cap highlight */}
              <ellipse
                cx={80 + Math.sin(radians) * 8}
                cy="12"
                rx="12"
                ry="5"
                fill="white"
                opacity={0.12 + Math.cos(radians) * 0.06}
              />

              {/* Cap side highlight */}
              <rect
                x={60 + Math.sin(radians) * 8}
                y="15"
                width="5"
                height="30"
                fill="white"
                opacity={0.08 + Math.cos(radians) * 0.04}
                rx="2"
              />

              {/* Subtle ring at cap base */}
              <ellipse cx="90" cy="47" rx="32" ry="6" fill="none" stroke="#c0c0c0" strokeWidth="0.5" opacity="0.5"/>

            </g>

            {/* Very subtle reflection on ground */}
            <ellipse
              cx="90"
              cy="395"
              rx="40"
              ry="5"
              fill="white"
              opacity="0.03"
            />
          </svg>
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              autoRotate
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
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
        </div>
      </div>

      {/* Minimal dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {[0, 90, 180, 270].map((angle) => (
          <button
            key={angle}
            onClick={() => {
              setRotation(angle);
              setAutoRotate(false);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              Math.abs(normalizedRotation - angle) < 45 || Math.abs(normalizedRotation - angle) > 315
                ? 'bg-black'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`View from ${angle} degrees`}
          />
        ))}
      </div>
    </div>
  );
}
