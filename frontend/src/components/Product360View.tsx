'use client';

import { useState, useRef, useEffect } from 'react';

interface Product360ViewProps {
  productName: string;
  productColor: string;
  scientificName?: string;
  volume?: string;
  category?: string;
}

// Bottle type based on category
type BottleType = 'dropper' | 'flask' | 'spray' | 'luxury' | 'herbal' | 'ayurvedic';

function getBottleType(category?: string): BottleType {
  switch (category) {
    case 'essential-oils':
      return 'dropper';
    case 'carrier-oils':
      return 'flask';
    case 'floral-waters':
      return 'spray';
    case 'absolute-oils':
      return 'luxury';
    case 'herbal-extracts':
      return 'herbal';
    case 'ayurvedic-products':
      return 'ayurvedic';
    default:
      return 'dropper';
  }
}

export default function Product360View({
  productName,
  productColor,
  scientificName = 'Botanical Extract',
  volume = '15ml',
  category,
}: Product360ViewProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const bottleType = getBottleType(category);

  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.4) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

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

  const handleMouseUp = () => setIsDragging(false);

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

  const handleTouchEnd = () => setIsDragging(false);

  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const radians = (normalizedRotation * Math.PI) / 180;
  const frontOpacity = Math.max(0, Math.cos(radians));
  const backOpacity = Math.max(0, -Math.cos(radians));
  const rightSideOpacity = Math.max(0, Math.sin(radians));
  const leftSideOpacity = Math.max(0, -Math.sin(radians));
  const highlightX = 50 + Math.sin(radians) * 30;

  const shortName = productName.split(' ')[0].toLowerCase();

  return (
    <div className="relative">
      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 px-4 py-2 rounded-full text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Drag to rotate 360°
        </span>
      </div>

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
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-50 rounded-3xl" />

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {bottleType === 'dropper' && (
            <DropperBottle
              productName={productName}
              productColor={productColor}
              scientificName={scientificName}
              volume={volume}
              highlightX={highlightX}
              radians={radians}
              frontOpacity={frontOpacity}
              backOpacity={backOpacity}
              rightSideOpacity={rightSideOpacity}
              leftSideOpacity={leftSideOpacity}
              shortName={shortName}
            />
          )}
          {bottleType === 'flask' && (
            <FlaskBottle
              productName={productName}
              productColor={productColor}
              scientificName={scientificName}
              volume={volume}
              highlightX={highlightX}
              radians={radians}
              frontOpacity={frontOpacity}
              backOpacity={backOpacity}
              shortName={shortName}
            />
          )}
          {bottleType === 'spray' && (
            <SprayBottle
              productName={productName}
              productColor={productColor}
              scientificName={scientificName}
              volume={volume}
              highlightX={highlightX}
              radians={radians}
              frontOpacity={frontOpacity}
              backOpacity={backOpacity}
              shortName={shortName}
            />
          )}
          {bottleType === 'luxury' && (
            <LuxuryBottle
              productName={productName}
              productColor={productColor}
              scientificName={scientificName}
              volume={volume}
              highlightX={highlightX}
              radians={radians}
              frontOpacity={frontOpacity}
              backOpacity={backOpacity}
              shortName={shortName}
            />
          )}
          {bottleType === 'herbal' && (
            <HerbalBottle
              productName={productName}
              productColor={productColor}
              scientificName={scientificName}
              volume={volume}
              highlightX={highlightX}
              radians={radians}
              frontOpacity={frontOpacity}
              backOpacity={backOpacity}
              rightSideOpacity={rightSideOpacity}
              shortName={shortName}
            />
          )}
          {bottleType === 'ayurvedic' && (
            <AyurvedicBottle
              productName={productName}
              productColor={productColor}
              scientificName={scientificName}
              volume={volume}
              highlightX={highlightX}
              radians={radians}
              frontOpacity={frontOpacity}
              backOpacity={backOpacity}
              shortName={shortName}
            />
          )}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
              autoRotate ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
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

      <div className="flex justify-center items-center gap-3 mt-4">
        {['Front', 'Right', 'Back', 'Left'].map((label, i) => (
          <button
            key={label}
            onClick={() => { setRotation(i * 90); setAutoRotate(false); }}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              Math.abs(normalizedRotation - i * 90) < 45 || Math.abs(normalizedRotation - i * 90) > 315
                ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ DROPPER BOTTLE (Essential Oils) ============
function DropperBottle({ productName, productColor, scientificName, volume, highlightX, radians, frontOpacity, backOpacity, rightSideOpacity, leftSideOpacity, shortName }: any) {
  return (
    <svg width="180" height="450" viewBox="0 0 180 450" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="amber-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5c3d1e" />
          <stop offset={`${highlightX}%`} stopColor="#8b5a2b" />
          <stop offset="100%" stopColor="#3d2914" />
        </linearGradient>
        <linearGradient id="liquid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={productColor} />
          <stop offset="100%" stopColor={adjustColor(productColor, -40)} />
        </linearGradient>
        <linearGradient id="cap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset={`${highlightX}%`} stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="label-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5f5f0" />
          <stop offset={`${highlightX}%`} stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8e8e0" />
        </linearGradient>
      </defs>

      <ellipse cx="90" cy="435" rx="45" ry="10" fill="rgba(0,0,0,0.1)" />

      <g>
        {/* Bottle body */}
        <path d="M50,90 L50,350 Q50,400 90,400 Q130,400 130,350 L130,90 Q130,70 110,65 L110,45 L70,45 L70,65 Q50,70 50,90" fill="url(#amber-grad)" />

        {/* Liquid inside */}
        <path d="M58,100 L58,340 Q58,385 90,385 Q122,385 122,340 L122,100 Q90,90 58,100" fill="url(#liquid-grad)" opacity="0.8">
          <animate attributeName="d" values="M58,100 L58,340 Q58,385 90,385 Q122,385 122,340 L122,100 Q90,90 58,100;M58,95 L58,340 Q58,385 90,385 Q122,385 122,340 L122,105 Q90,95 58,95;M58,100 L58,340 Q58,385 90,385 Q122,385 122,340 L122,100 Q90,90 58,100" dur="3s" repeatCount="indefinite" />
        </path>

        {/* Bubbles */}
        {[...Array(4)].map((_, i) => (
          <circle key={i} r={2 + i % 2} fill="white" opacity="0.4">
            <animate attributeName="cy" values={`${320 - i * 40};${120};${320 - i * 40}`} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="cx" values={`${70 + i * 15};${72 + i * 15};${70 + i * 15}`} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Glass highlight */}
        <path d={`M${60 + Math.sin(radians) * 8},95 L${60 + Math.sin(radians) * 8},370`} stroke="white" strokeWidth="6" opacity={0.2 + Math.cos(radians) * 0.1} strokeLinecap="round" />

        {/* Neck */}
        <rect x="70" y="35" width="40" height="35" fill="url(#amber-grad)" />

        {/* Rubber dropper bulb */}
        <ellipse cx="90" cy="22" rx="18" ry="20" fill="url(#cap-grad)" />
        <ellipse cx="90" cy="20" rx="14" ry="15" fill="#0f0f0f" />
        <ellipse cx={85 + Math.sin(radians) * 4} cy="16" rx="5" ry="6" fill="white" opacity="0.08" />

        {/* Metal collar */}
        <rect x="72" y="32" width="36" height="8" fill="#2a2a2a" />

        {/* FRONT LABEL */}
        <g opacity={frontOpacity}>
          <rect x="55" y="180" width="70" height="100" rx="3" fill="url(#label-grad)" />
          <text x="90" y="200" textAnchor="middle" fill="#2d5a27" fontSize="8" fontWeight="bold">BOTANICA BLISS</text>
          <line x1="65" y1="208" x2="115" y2="208" stroke="#2d5a27" strokeWidth="0.5" />
          <text x="90" y="230" textAnchor="middle" fill="#1a1a1a" fontSize="11" fontWeight="bold" fontFamily="Georgia, serif">
            {productName.split(' ').slice(0, -2).join(' ') || productName.split(' ')[0]}
          </text>
          <text x="90" y="245" textAnchor="middle" fill="#1a1a1a" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">Essential Oil</text>
          <text x="90" y="260" textAnchor="middle" fill="#666" fontSize="6" fontStyle="italic">{scientificName}</text>
          <rect x="55" y="268" width="70" height="12" fill="#2d5a27" />
          <text x="90" y="277" textAnchor="middle" fill="white" fontSize="7">{volume} | 100% Pure</text>
        </g>

        {/* BACK LABEL */}
        <g opacity={backOpacity}>
          <rect x="55" y="175" width="70" height="110" rx="3" fill="url(#label-grad)" />
          <text x="90" y="192" textAnchor="middle" fill="#2d5a27" fontSize="7" fontWeight="bold">BOTANICA BLISS</text>
          <text x="62" y="210" fill="#333" fontSize="6" fontWeight="bold">Ingredients:</text>
          <text x="62" y="220" fill="#666" fontSize="5">100% Pure {shortName} oil</text>
          <text x="62" y="235" fill="#333" fontSize="6" fontWeight="bold">Directions:</text>
          <text x="62" y="245" fill="#666" fontSize="5">Dilute with carrier oil.</text>
          <text x="62" y="255" fill="#666" fontSize="5">Patch test recommended.</text>
          <text x="90" y="275" textAnchor="middle" fill="#999" fontSize="5">Made in India</text>
        </g>

        {/* SIDE TEXT */}
        <g opacity={rightSideOpacity}>
          <text x="125" y="160" fill="#d4a853" fontSize="16" fontWeight="bold" transform="rotate(90, 125, 160)" opacity="0.8">{shortName}</text>
        </g>
        <g opacity={leftSideOpacity}>
          <text x="55" y="280" fill="#2d5a27" fontSize="12" fontStyle="italic" transform="rotate(-90, 55, 280)" opacity="0.7">pure</text>
        </g>
      </g>
    </svg>
  );
}

// ============ FLASK BOTTLE (Carrier Oils) ============
function FlaskBottle({ productName, productColor, scientificName, volume, highlightX, radians, frontOpacity, backOpacity, shortName }: any) {
  return (
    <svg width="200" height="450" viewBox="0 0 200 450" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="flask-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4e4d4" />
          <stop offset={`${highlightX}%`} stopColor="#f0f8f0" />
          <stop offset="100%" stopColor="#c4d4c4" />
        </linearGradient>
        <linearGradient id="flask-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={adjustColor(productColor, 30)} />
          <stop offset="100%" stopColor={productColor} />
        </linearGradient>
        <linearGradient id="cork-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b7355" />
          <stop offset={`${highlightX}%`} stopColor="#a0896a" />
          <stop offset="100%" stopColor="#6b5344" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="435" rx="50" ry="10" fill="rgba(0,0,0,0.1)" />

      <g>
        {/* Flask body - wide bottom, narrow neck */}
        <path d="M40,180 Q25,200 25,280 L25,350 Q25,410 100,410 Q175,410 175,350 L175,280 Q175,200 160,180 L160,100 Q160,80 140,75 L140,50 L60,50 L60,75 Q40,80 40,100 Z" fill="url(#flask-glass)" />

        {/* Liquid inside */}
        <path d="M35,200 Q30,220 30,280 L30,340 Q30,395 100,395 Q170,395 170,340 L170,280 Q170,220 165,200 Q100,180 35,200" fill="url(#flask-liquid)" opacity="0.85">
          <animate attributeName="d" values="M35,200 Q30,220 30,280 L30,340 Q30,395 100,395 Q170,395 170,340 L170,280 Q170,220 165,200 Q100,180 35,200;M35,195 Q30,220 30,280 L30,340 Q30,395 100,395 Q170,395 170,340 L170,280 Q170,220 165,205 Q100,185 35,195;M35,200 Q30,220 30,280 L30,340 Q30,395 100,395 Q170,395 170,340 L170,280 Q170,220 165,200 Q100,180 35,200" dur="4s" repeatCount="indefinite" />
        </path>

        {/* Glass highlights */}
        <path d={`M${45 + Math.sin(radians) * 10},190 Q${40 + Math.sin(radians) * 10},300 ${50 + Math.sin(radians) * 8},380`} stroke="white" strokeWidth="8" opacity={0.25 + Math.cos(radians) * 0.1} fill="none" strokeLinecap="round" />

        {/* Narrow neck */}
        <rect x="75" y="40" width="50" height="40" rx="3" fill="url(#flask-glass)" />

        {/* Cork stopper */}
        <ellipse cx="100" cy="40" rx="28" ry="8" fill="url(#cork-grad)" />
        <rect x="72" y="10" width="56" height="32" rx="4" fill="url(#cork-grad)" />
        <ellipse cx="100" cy="10" rx="28" ry="10" fill="#9a8060" />
        {/* Cork texture lines */}
        <line x1="80" y1="15" x2="80" y2="38" stroke="#7a6040" strokeWidth="1" opacity="0.5" />
        <line x1="90" y1="12" x2="90" y2="40" stroke="#7a6040" strokeWidth="1" opacity="0.4" />
        <line x1="100" y1="10" x2="100" y2="40" stroke="#7a6040" strokeWidth="1" opacity="0.5" />
        <line x1="110" y1="12" x2="110" y2="40" stroke="#7a6040" strokeWidth="1" opacity="0.4" />
        <line x1="120" y1="15" x2="120" y2="38" stroke="#7a6040" strokeWidth="1" opacity="0.5" />

        {/* Decorative herbs around bottle */}
        <g opacity="0.6">
          <path d="M20,350 Q15,340 25,330 Q20,320 30,315" stroke="#228b22" strokeWidth="2" fill="none" />
          <ellipse cx="25" cy="330" rx="8" ry="4" fill="#32cd32" transform="rotate(-30, 25, 330)" />
          <ellipse cx="28" cy="318" rx="6" ry="3" fill="#228b22" transform="rotate(-20, 28, 318)" />
        </g>
        <g opacity="0.5">
          <path d="M175,360 Q185,350 178,340" stroke="#228b22" strokeWidth="2" fill="none" />
          <ellipse cx="180" cy="345" rx="7" ry="3" fill="#32cd32" transform="rotate(25, 180, 345)" />
        </g>

        {/* FRONT LABEL - rustic style */}
        <g opacity={frontOpacity}>
          <rect x="45" y="240" width="110" height="90" rx="4" fill="#faf8f0" stroke="#c4a060" strokeWidth="1" />
          <text x="100" y="260" textAnchor="middle" fill="#5a4a30" fontSize="8" fontWeight="bold" letterSpacing="2">BOTANICA BLISS</text>
          <text x="100" y="290" textAnchor="middle" fill="#3a3020" fontSize="14" fontWeight="bold" fontFamily="Georgia, serif">
            {productName.split(' ').slice(0, -2).join(' ') || shortName}
          </text>
          <text x="100" y="305" textAnchor="middle" fill="#3a3020" fontSize="10" fontFamily="Georgia, serif">Carrier Oil</text>
          <text x="100" y="318" textAnchor="middle" fill="#888" fontSize="6" fontStyle="italic">{scientificName}</text>
          <text x="100" y="328" textAnchor="middle" fill="#666" fontSize="7">Cold Pressed | {volume}</text>
        </g>

        {/* BACK */}
        <g opacity={backOpacity}>
          <rect x="45" y="235" width="110" height="100" rx="4" fill="#faf8f0" stroke="#c4a060" strokeWidth="1" />
          <text x="100" y="255" textAnchor="middle" fill="#5a4a30" fontSize="7" fontWeight="bold">CARRIER OIL</text>
          <text x="55" y="275" fill="#555" fontSize="6">For massage and skin care.</text>
          <text x="55" y="288" fill="#555" fontSize="6">Can be used as base oil</text>
          <text x="55" y="301" fill="#555" fontSize="6">to dilute essential oils.</text>
          <text x="55" y="320" fill="#888" fontSize="5">Store in cool, dark place.</text>
          <text x="100" y="332" textAnchor="middle" fill="#999" fontSize="5">Made in India</text>
        </g>
      </g>
    </svg>
  );
}

// ============ SPRAY BOTTLE (Floral Waters) ============
function SprayBottle({ productName, productColor, scientificName, volume, highlightX, radians, frontOpacity, backOpacity, shortName }: any) {
  return (
    <svg width="180" height="450" viewBox="0 0 180 450" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="spray-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8f4fc" />
          <stop offset={`${highlightX}%`} stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d0e8f8" />
        </linearGradient>
        <linearGradient id="spray-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={adjustColor(productColor, 40)} stopOpacity="0.6" />
          <stop offset="100%" stopColor={productColor} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="spray-cap" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c0c0c0" />
          <stop offset={`${highlightX}%`} stopColor="#e8e8e8" />
          <stop offset="100%" stopColor="#a0a0a0" />
        </linearGradient>
      </defs>

      <ellipse cx="90" cy="435" rx="40" ry="8" fill="rgba(0,0,0,0.08)" />

      <g>
        {/* Tall spray bottle body */}
        <path d="M50,100 L50,360 Q50,400 90,400 Q130,400 130,360 L130,100 Q130,80 110,75 L110,60 L70,60 L70,75 Q50,80 50,100" fill="url(#spray-glass)" />

        {/* Liquid */}
        <path d="M56,110 L56,350 Q56,388 90,388 Q124,388 124,350 L124,110 Q90,100 56,110" fill="url(#spray-liquid)">
          <animate attributeName="d" values="M56,110 L56,350 Q56,388 90,388 Q124,388 124,350 L124,110 Q90,100 56,110;M56,105 L56,350 Q56,388 90,388 Q124,388 124,350 L124,115 Q90,105 56,105;M56,110 L56,350 Q56,388 90,388 Q124,388 124,350 L124,110 Q90,100 56,110" dur="3s" repeatCount="indefinite" />
        </path>

        {/* Glass highlight */}
        <path d={`M${60 + Math.sin(radians) * 6},105 L${60 + Math.sin(radians) * 6},370`} stroke="white" strokeWidth="5" opacity={0.3 + Math.cos(radians) * 0.15} strokeLinecap="round" />

        {/* Spray mechanism */}
        <rect x="75" y="50" width="30" height="20" rx="2" fill="url(#spray-cap)" />
        <rect x="70" y="25" width="40" height="28" rx="3" fill="url(#spray-cap)" />

        {/* Spray nozzle */}
        <rect x="110" y="32" width="25" height="8" rx="2" fill="#888" />
        <ellipse cx="135" cy="36" rx="4" ry="4" fill="#666" />

        {/* Spray mist animation */}
        <g opacity="0.4">
          <circle cx="145" cy="36" r="2" fill={productColor}>
            <animate attributeName="cx" values="145;165;145" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="148" cy="32" r="1.5" fill={productColor}>
            <animate attributeName="cx" values="148;162;148" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="148" cy="40" r="1.5" fill={productColor}>
            <animate attributeName="cx" values="148;160;148" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* FRONT LABEL */}
        <g opacity={frontOpacity}>
          <rect x="55" y="160" width="70" height="120" rx="4" fill="white" stroke={productColor} strokeWidth="1" />
          <rect x="55" y="160" width="70" height="25" fill={productColor} />
          <text x="90" y="177" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">FLORAL WATER</text>

          {/* Flower decoration */}
          <circle cx="90" cy="210" r="15" fill="none" stroke={productColor} strokeWidth="1" opacity="0.3" />
          <circle cx="90" cy="210" r="8" fill={productColor} opacity="0.2" />

          <text x="90" y="245" textAnchor="middle" fill="#333" fontSize="12" fontWeight="bold" fontFamily="Georgia, serif">
            {shortName}
          </text>
          <text x="90" y="258" textAnchor="middle" fill="#666" fontSize="7" fontStyle="italic">{scientificName}</text>
          <text x="90" y="275" textAnchor="middle" fill="#999" fontSize="6">{volume} | Hydrosol</text>
        </g>

        {/* BACK */}
        <g opacity={backOpacity}>
          <rect x="55" y="160" width="70" height="120" rx="4" fill="white" stroke={productColor} strokeWidth="1" />
          <text x="90" y="180" textAnchor="middle" fill={productColor} fontSize="7" fontWeight="bold">BOTANICA BLISS</text>
          <text x="62" y="200" fill="#555" fontSize="6">Steam distilled floral</text>
          <text x="62" y="212" fill="#555" fontSize="6">water for face & body.</text>
          <text x="62" y="230" fill="#555" fontSize="6">Spray on face for</text>
          <text x="62" y="242" fill="#555" fontSize="6">instant freshness.</text>
          <text x="62" y="260" fill="#888" fontSize="5">No preservatives</text>
          <text x="90" y="275" textAnchor="middle" fill="#999" fontSize="5">Made in India</text>
        </g>
      </g>
    </svg>
  );
}

// ============ LUXURY BOTTLE (Absolute Oils) ============
function LuxuryBottle({ productName, productColor, scientificName, volume, highlightX, radians, frontOpacity, backOpacity, shortName }: any) {
  return (
    <svg width="180" height="450" viewBox="0 0 180 450" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="luxury-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset={`${highlightX}%`} stopColor="#2d2d4a" />
          <stop offset="100%" stopColor="#16162a" />
        </linearGradient>
        <linearGradient id="gold-accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b8860b" />
          <stop offset={`${highlightX}%`} stopColor="#ffd700" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        <linearGradient id="luxury-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={adjustColor(productColor, 20)} />
          <stop offset="100%" stopColor={adjustColor(productColor, -30)} />
        </linearGradient>
      </defs>

      <ellipse cx="90" cy="420" rx="35" ry="8" fill="rgba(0,0,0,0.1)" />

      <g>
        {/* Elegant square bottle with rounded edges */}
        <path d="M45,80 L45,340 Q45,380 90,380 Q135,380 135,340 L135,80 Q135,60 115,55 L115,40 L65,40 L65,55 Q45,60 45,80" fill="url(#luxury-glass)" />

        {/* Liquid */}
        <path d="M52,90 L52,330 Q52,365 90,365 Q128,365 128,330 L128,90 Q90,80 52,90" fill="url(#luxury-liquid)" opacity="0.9" />

        {/* Glass highlight */}
        <path d={`M${55 + Math.sin(radians) * 5},85 L${55 + Math.sin(radians) * 5},350`} stroke="white" strokeWidth="3" opacity={0.15 + Math.cos(radians) * 0.08} strokeLinecap="round" />

        {/* Gold decorative band */}
        <rect x="45" y="150" width="90" height="3" fill="url(#gold-accent)" />
        <rect x="45" y="290" width="90" height="3" fill="url(#gold-accent)" />

        {/* Neck with gold ring */}
        <rect x="70" y="30" width="40" height="30" fill="url(#luxury-glass)" />
        <rect x="68" y="55" width="44" height="6" fill="url(#gold-accent)" />

        {/* Luxury cap */}
        <rect x="65" y="5" width="50" height="28" rx="3" fill="url(#gold-accent)" />
        <rect x="70" y="8" width="40" height="22" rx="2" fill="url(#luxury-glass)" />
        <rect x="75" y="12" width="30" height="3" fill="url(#gold-accent)" opacity="0.5" />

        {/* FRONT */}
        <g opacity={frontOpacity}>
          <rect x="52" y="165" width="76" height="115" fill="transparent" />
          <text x="90" y="185" textAnchor="middle" fill="url(#gold-accent)" fontSize="7" fontWeight="bold" letterSpacing="3">BOTANICA BLISS</text>
          <text x="90" y="220" textAnchor="middle" fill="#d4af37" fontSize="16" fontWeight="300" fontFamily="Georgia, serif" fontStyle="italic">
            {shortName}
          </text>
          <text x="90" y="238" textAnchor="middle" fill="#888" fontSize="8" fontFamily="Georgia, serif">Absolute</text>
          <line x1="70" y1="250" x2="110" y2="250" stroke="#d4af37" strokeWidth="0.5" />
          <text x="90" y="265" textAnchor="middle" fill="#666" fontSize="6" fontStyle="italic">{scientificName}</text>
          <text x="90" y="280" textAnchor="middle" fill="#555" fontSize="6">{volume} | Luxury Grade</text>
        </g>

        {/* BACK */}
        <g opacity={backOpacity}>
          <text x="90" y="180" textAnchor="middle" fill="#d4af37" fontSize="6" letterSpacing="2">ABSOLUTE OIL</text>
          <text x="90" y="200" textAnchor="middle" fill="#888" fontSize="6">Solvent extracted from</text>
          <text x="90" y="212" textAnchor="middle" fill="#888" fontSize="6">delicate flower petals.</text>
          <text x="90" y="230" textAnchor="middle" fill="#888" fontSize="6">Highly concentrated.</text>
          <text x="90" y="242" textAnchor="middle" fill="#888" fontSize="6">Use sparingly.</text>
          <text x="90" y="270" textAnchor="middle" fill="#666" fontSize="5">Made in India</text>
        </g>
      </g>
    </svg>
  );
}

// ============ HERBAL BOTTLE (Herbal Extracts) ============
function HerbalBottle({ productName, productColor, scientificName, volume, highlightX, radians, frontOpacity, backOpacity, rightSideOpacity, shortName }: any) {
  return (
    <svg width="200" height="450" viewBox="0 0 200 450" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="herbal-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2d4a2d" />
          <stop offset={`${highlightX}%`} stopColor="#4a6b4a" />
          <stop offset="100%" stopColor="#1e3a1e" />
        </linearGradient>
        <linearGradient id="herbal-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={adjustColor(productColor, 20)} />
          <stop offset="100%" stopColor={productColor} />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="430" rx="45" ry="10" fill="rgba(0,0,0,0.1)" />

      <g>
        {/* Wide herbal bottle */}
        <path d="M40,100 L40,340 Q40,400 100,400 Q160,400 160,340 L160,100 Q160,70 130,65 L130,45 L70,45 L70,65 Q40,70 40,100" fill="url(#herbal-glass)" />

        {/* Liquid */}
        <path d="M48,110 L48,330 Q48,385 100,385 Q152,385 152,330 L152,110 Q100,95 48,110" fill="url(#herbal-liquid)" opacity="0.85" />

        {/* Floating herb particles */}
        {[...Array(6)].map((_, i) => (
          <g key={i}>
            <ellipse cx={60 + i * 15} cy={200 + (i % 3) * 50} rx="3" ry="1.5" fill="#228b22" opacity="0.6" transform={`rotate(${i * 30}, ${60 + i * 15}, ${200 + (i % 3) * 50})`}>
              <animate attributeName="cy" values={`${200 + (i % 3) * 50};${180 + (i % 3) * 50};${200 + (i % 3) * 50}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            </ellipse>
          </g>
        ))}

        {/* Glass highlight */}
        <path d={`M${52 + Math.sin(radians) * 8},105 L${52 + Math.sin(radians) * 8},370`} stroke="white" strokeWidth="6" opacity={0.2 + Math.cos(radians) * 0.1} strokeLinecap="round" />

        {/* Neck */}
        <rect x="75" y="35" width="50" height="35" rx="3" fill="url(#herbal-glass)" />

        {/* Wooden/natural cap */}
        <rect x="70" y="10" width="60" height="28" rx="5" fill="#5c4033" />
        <rect x="73" y="13" width="54" height="22" rx="4" fill="#8b7355" />
        <line x1="80" y1="15" x2="80" y2="33" stroke="#6b5344" strokeWidth="2" opacity="0.5" />
        <line x1="95" y1="13" x2="95" y2="35" stroke="#6b5344" strokeWidth="2" opacity="0.4" />
        <line x1="110" y1="15" x2="110" y2="33" stroke="#6b5344" strokeWidth="2" opacity="0.5" />
        <line x1="120" y1="15" x2="120" y2="33" stroke="#6b5344" strokeWidth="2" opacity="0.5" />

        {/* Leaf decorations */}
        <g opacity="0.7">
          <path d="M25,300 Q20,280 35,270 M35,270 Q25,260 40,250" stroke="#228b22" strokeWidth="2" fill="none" />
          <ellipse cx="35" cy="270" rx="10" ry="5" fill="#32cd32" transform="rotate(-45, 35, 270)" />
          <ellipse cx="40" cy="255" rx="8" ry="4" fill="#228b22" transform="rotate(-30, 40, 255)" />
        </g>
        <g opacity="0.6">
          <path d="M170,320 Q180,300 168,290" stroke="#228b22" strokeWidth="2" fill="none" />
          <ellipse cx="170" cy="300" rx="9" ry="4" fill="#32cd32" transform="rotate(40, 170, 300)" />
        </g>

        {/* FRONT LABEL - natural/kraft style */}
        <g opacity={frontOpacity}>
          <rect x="50" y="180" width="100" height="110" rx="5" fill="#f4efe4" stroke="#8b7355" strokeWidth="2" />
          <rect x="50" y="180" width="100" height="25" fill="#2d5a27" />
          <text x="100" y="197" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">HERBAL EXTRACT</text>

          {/* Herb illustration */}
          <g transform="translate(100, 230)">
            <path d="M0,-15 Q5,-10 3,0 Q0,10 -3,0 Q-5,-10 0,-15" fill="#228b22" opacity="0.6" />
            <path d="M-8,-8 Q-3,-5 0,0" stroke="#228b22" strokeWidth="1.5" fill="none" />
            <path d="M8,-8 Q3,-5 0,0" stroke="#228b22" strokeWidth="1.5" fill="none" />
          </g>

          <text x="100" y="260" textAnchor="middle" fill="#2d4a2d" fontSize="13" fontWeight="bold" fontFamily="Georgia, serif">
            {shortName}
          </text>
          <text x="100" y="275" textAnchor="middle" fill="#666" fontSize="7" fontStyle="italic">{scientificName}</text>
          <text x="100" y="288" textAnchor="middle" fill="#888" fontSize="6">{volume} | Natural Extract</text>
        </g>

        {/* BACK */}
        <g opacity={backOpacity}>
          <rect x="50" y="180" width="100" height="110" rx="5" fill="#f4efe4" stroke="#8b7355" strokeWidth="2" />
          <text x="100" y="200" textAnchor="middle" fill="#2d5a27" fontSize="7" fontWeight="bold">BOTANICA BLISS</text>
          <text x="60" y="220" fill="#555" fontSize="6">Concentrated herbal</text>
          <text x="60" y="232" fill="#555" fontSize="6">extract for wellness.</text>
          <text x="60" y="250" fill="#555" fontSize="6">Add to skincare or</text>
          <text x="60" y="262" fill="#555" fontSize="6">aromatherapy blends.</text>
          <text x="100" y="285" textAnchor="middle" fill="#999" fontSize="5">Made in India</text>
        </g>

        {/* SIDE */}
        <g opacity={rightSideOpacity}>
          <text x="155" y="180" fill="#2d5a27" fontSize="14" fontWeight="bold" transform="rotate(90, 155, 180)" opacity="0.7">herbal</text>
        </g>
      </g>
    </svg>
  );
}

// ============ AYURVEDIC BOTTLE (Ayurvedic Products) ============
function AyurvedicBottle({ productName, productColor, scientificName, volume, highlightX, radians, frontOpacity, backOpacity, shortName }: any) {
  return (
    <svg width="200" height="450" viewBox="0 0 200 450" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="copper-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b4513" />
          <stop offset={`${highlightX - 20}%`} stopColor="#cd7f32" />
          <stop offset={`${highlightX}%`} stopColor="#daa520" />
          <stop offset={`${highlightX + 20}%`} stopColor="#cd7f32" />
          <stop offset="100%" stopColor="#8b4513" />
        </linearGradient>
        <linearGradient id="ayur-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={adjustColor(productColor, 30)} />
          <stop offset="100%" stopColor={productColor} />
        </linearGradient>
        <pattern id="mandala-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#daa520" strokeWidth="0.5" opacity="0.3" />
          <circle cx="20" cy="20" r="12" fill="none" stroke="#daa520" strokeWidth="0.5" opacity="0.3" />
          <circle cx="20" cy="20" r="6" fill="none" stroke="#daa520" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>

      <ellipse cx="100" cy="425" rx="50" ry="10" fill="rgba(0,0,0,0.12)" />

      <g>
        {/* Traditional pot-shaped bottle */}
        <path d="M50,120 Q30,150 30,220 L30,320 Q30,390 100,390 Q170,390 170,320 L170,220 Q170,150 150,120 Q150,90 130,85 L130,60 Q130,50 115,50 L85,50 Q70,50 70,60 L70,85 Q50,90 50,120" fill="url(#copper-grad)" />

        {/* Decorative mandala pattern overlay */}
        <path d="M50,120 Q30,150 30,220 L30,320 Q30,390 100,390 Q170,390 170,320 L170,220 Q170,150 150,120 Q150,90 130,85 L130,60 Q130,50 115,50 L85,50 Q70,50 70,60 L70,85 Q50,90 50,120" fill="url(#mandala-pattern)" opacity="0.4" />

        {/* Liquid visible through opening */}
        <ellipse cx="100" cy="85" rx="25" ry="8" fill="url(#ayur-liquid)" opacity="0.8" />

        {/* Metallic highlights */}
        <path d={`M${55 + Math.sin(radians) * 10},130 Q${45 + Math.sin(radians) * 10},250 ${55 + Math.sin(radians) * 8},360`} stroke="#ffd700" strokeWidth="4" opacity={0.2 + Math.cos(radians) * 0.1} fill="none" strokeLinecap="round" />

        {/* Decorative bands */}
        <ellipse cx="100" cy="150" rx="60" ry="8" fill="none" stroke="#daa520" strokeWidth="3" />
        <ellipse cx="100" cy="320" rx="55" ry="8" fill="none" stroke="#daa520" strokeWidth="3" />

        {/* Neck */}
        <rect x="78" y="45" width="44" height="45" rx="5" fill="url(#copper-grad)" />

        {/* Ornate cap */}
        <ellipse cx="100" cy="45" rx="25" ry="8" fill="#daa520" />
        <ellipse cx="100" cy="25" rx="20" ry="20" fill="url(#copper-grad)" />
        <ellipse cx="100" cy="25" rx="15" ry="15" fill="#8b4513" />
        <circle cx="100" cy="25" r="8" fill="#daa520" />
        {/* Om symbol representation */}
        <text x="100" y="30" textAnchor="middle" fill="#8b4513" fontSize="10" fontWeight="bold">ॐ</text>

        {/* Decorative elements */}
        <g opacity="0.6">
          <circle cx="35" cy="250" r="5" fill="#daa520" />
          <circle cx="165" cy="250" r="5" fill="#daa520" />
        </g>

        {/* FRONT */}
        <g opacity={frontOpacity}>
          <rect x="55" y="180" width="90" height="100" rx="5" fill="#fdf5e6" stroke="#daa520" strokeWidth="2" />
          <rect x="55" y="180" width="90" height="20" fill="#8b4513" />
          <text x="100" y="194" textAnchor="middle" fill="#ffd700" fontSize="7" fontWeight="bold">आयुर्वेद</text>

          {/* Lotus decoration */}
          <g transform="translate(100, 225)">
            <ellipse cx="0" cy="0" rx="12" ry="6" fill="#ff69b4" opacity="0.3" />
            <path d="M0,-10 Q3,-5 0,0 Q-3,-5 0,-10" fill="#ff69b4" opacity="0.5" />
            <path d="M-8,-5 Q-4,-3 0,0" stroke="#ff69b4" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M8,-5 Q4,-3 0,0" stroke="#ff69b4" strokeWidth="2" fill="none" opacity="0.5" />
          </g>

          <text x="100" y="252" textAnchor="middle" fill="#8b4513" fontSize="12" fontWeight="bold" fontFamily="Georgia, serif">
            {shortName}
          </text>
          <text x="100" y="266" textAnchor="middle" fill="#666" fontSize="7" fontStyle="italic">{scientificName}</text>
          <text x="100" y="278" textAnchor="middle" fill="#888" fontSize="6">{volume} | Traditional Formula</text>
        </g>

        {/* BACK */}
        <g opacity={backOpacity}>
          <rect x="55" y="180" width="90" height="100" rx="5" fill="#fdf5e6" stroke="#daa520" strokeWidth="2" />
          <text x="100" y="198" textAnchor="middle" fill="#8b4513" fontSize="7" fontWeight="bold">BOTANICA BLISS</text>
          <text x="100" y="212" textAnchor="middle" fill="#8b4513" fontSize="6">Ayurvedic Product</text>
          <text x="65" y="230" fill="#555" fontSize="6">Traditional formula based</text>
          <text x="65" y="242" fill="#555" fontSize="6">on ancient Ayurvedic</text>
          <text x="65" y="254" fill="#555" fontSize="6">wisdom for wellness.</text>
          <text x="100" y="275" textAnchor="middle" fill="#999" fontSize="5">Made in India</text>
        </g>
      </g>
    </svg>
  );
}

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
