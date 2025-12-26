'use client';

import { Product } from '@/data/products';

interface ProductLabelProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProductLabel({ product, size = 'md' }: ProductLabelProps) {
  const sizes = {
    sm: { width: 120, height: 200, fontSize: 8 },
    md: { width: 160, height: 280, fontSize: 10 },
    lg: { width: 220, height: 380, fontSize: 12 },
  };

  const { width, height, fontSize } = sizes[size];
  const labelColor = product.labelColor || '#2d5a27';
  const accentColor = product.accentColor || '#1e3d1a';

  // Generate unique pattern based on product name
  const hash = product.name.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
  const patternType = Math.abs(hash) % 4;

  const bottleWidth = width * 0.7;
  const bottleHeight = height * 0.85;
  const neckWidth = bottleWidth * 0.35;
  const neckHeight = height * 0.12;
  const capHeight = height * 0.08;

  const renderBubbles = () => {
    return [...Array(5)].map((_, i) => (
      <circle
        key={`bubble-${i}`}
        cx={width/2 + (i - 2) * 8}
        cy={height * 0.5 + i * 15}
        r={2 + i % 3}
        fill="white"
        opacity={0.3}
      >
        <animate
          attributeName="cy"
          values={`${height * 0.5 + i * 15};${height * 0.35};${height * 0.5 + i * 15}`}
          dur={`${2 + i * 0.5}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.6;0.3"
          dur={`${2 + i * 0.5}s`}
          repeatCount="indefinite"
        />
      </circle>
    ));
  };

  const renderFloatingParticles = () => {
    return [...Array(8)].map((_, i) => (
      <circle
        key={`particle-${i}`}
        r={1 + i % 2}
        fill={accentColor}
        opacity={0.4}
      >
        <animateMotion
          dur={`${3 + i}s`}
          repeatCount="indefinite"
          path={`M${-20 + i * 5},${height * 0.3} Q${width/2},${height * 0.1} ${width + 20 - i * 5},${height * 0.3}`}
        />
      </circle>
    ));
  };

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div
        className="absolute inset-0 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${labelColor}40 0%, transparent 70%)` }}
      />

      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
        style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.25))' }}
      >
        <defs>
          {/* 3D Bottle gradient */}
          <linearGradient id={`bottle-grad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8e8e8" />
            <stop offset="20%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f5f5f5" />
            <stop offset="80%" stopColor="#e0e0e0" />
            <stop offset="100%" stopColor="#c8c8c8" />
          </linearGradient>

          {/* Liquid gradient */}
          <linearGradient id={`liquid-grad-${product.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={labelColor}>
              <animate attributeName="stop-color" values={`${labelColor};${accentColor};${labelColor}`} dur="4s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stopColor={accentColor}>
              <animate attributeName="stop-color" values={`${accentColor};${labelColor};${accentColor}`} dur="4s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>

          {/* Glass reflection gradient */}
          <linearGradient id={`glass-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.2" />
          </linearGradient>

          {/* Cap gradient */}
          <linearGradient id={`cap-grad-${product.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a4a4a" />
            <stop offset="50%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>

          {/* Label gradient */}
          <linearGradient id={`label-grad-${product.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fffef8" />
            <stop offset="100%" stopColor="#f5f0e6" />
          </linearGradient>

          {/* Shadow filter */}
          <filter id={`shadow-${product.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Floating particles */}
        {renderFloatingParticles()}

        {/* Bottle shadow */}
        <ellipse
          cx={width/2}
          cy={height - 10}
          rx={bottleWidth * 0.4}
          ry={8}
          fill="rgba(0,0,0,0.2)"
        >
          <animate attributeName="rx" values={`${bottleWidth * 0.4};${bottleWidth * 0.45};${bottleWidth * 0.4}`} dur="3s" repeatCount="indefinite"/>
        </ellipse>

        {/* Main bottle body - 3D effect */}
        <g filter={`url(#shadow-${product.id})`}>
          {/* Bottle back */}
          <path
            d={`
              M${width/2 - bottleWidth/2},${height * 0.25}
              L${width/2 - bottleWidth/2},${height * 0.85}
              Q${width/2 - bottleWidth/2},${height * 0.92} ${width/2 - bottleWidth/4},${height * 0.92}
              L${width/2 + bottleWidth/4},${height * 0.92}
              Q${width/2 + bottleWidth/2},${height * 0.92} ${width/2 + bottleWidth/2},${height * 0.85}
              L${width/2 + bottleWidth/2},${height * 0.25}
              Q${width/2 + bottleWidth/2},${height * 0.2} ${width/2 + neckWidth/2},${height * 0.2}
              L${width/2 + neckWidth/2},${height * 0.1}
              L${width/2 - neckWidth/2},${height * 0.1}
              L${width/2 - neckWidth/2},${height * 0.2}
              Q${width/2 - bottleWidth/2},${height * 0.2} ${width/2 - bottleWidth/2},${height * 0.25}
            `}
            fill={`url(#bottle-grad-${product.id})`}
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Liquid inside */}
          <path
            d={`
              M${width/2 - bottleWidth/2 + 5},${height * 0.35}
              L${width/2 - bottleWidth/2 + 5},${height * 0.82}
              Q${width/2 - bottleWidth/2 + 5},${height * 0.88} ${width/2 - bottleWidth/4 + 5},${height * 0.88}
              L${width/2 + bottleWidth/4 - 5},${height * 0.88}
              Q${width/2 + bottleWidth/2 - 5},${height * 0.88} ${width/2 + bottleWidth/2 - 5},${height * 0.82}
              L${width/2 + bottleWidth/2 - 5},${height * 0.35}
              Q${width/2},${height * 0.32} ${width/2 - bottleWidth/2 + 5},${height * 0.35}
            `}
            fill={`url(#liquid-grad-${product.id})`}
            opacity="0.9"
          >
            {/* Liquid wave animation */}
            <animate
              attributeName="d"
              values={`
                M${width/2 - bottleWidth/2 + 5},${height * 0.35}
                L${width/2 - bottleWidth/2 + 5},${height * 0.82}
                Q${width/2 - bottleWidth/2 + 5},${height * 0.88} ${width/2 - bottleWidth/4 + 5},${height * 0.88}
                L${width/2 + bottleWidth/4 - 5},${height * 0.88}
                Q${width/2 + bottleWidth/2 - 5},${height * 0.88} ${width/2 + bottleWidth/2 - 5},${height * 0.82}
                L${width/2 + bottleWidth/2 - 5},${height * 0.35}
                Q${width/2},${height * 0.32} ${width/2 - bottleWidth/2 + 5},${height * 0.35};
                M${width/2 - bottleWidth/2 + 5},${height * 0.33}
                L${width/2 - bottleWidth/2 + 5},${height * 0.82}
                Q${width/2 - bottleWidth/2 + 5},${height * 0.88} ${width/2 - bottleWidth/4 + 5},${height * 0.88}
                L${width/2 + bottleWidth/4 - 5},${height * 0.88}
                Q${width/2 + bottleWidth/2 - 5},${height * 0.88} ${width/2 + bottleWidth/2 - 5},${height * 0.82}
                L${width/2 + bottleWidth/2 - 5},${height * 0.37}
                Q${width/2},${height * 0.34} ${width/2 - bottleWidth/2 + 5},${height * 0.33};
                M${width/2 - bottleWidth/2 + 5},${height * 0.35}
                L${width/2 - bottleWidth/2 + 5},${height * 0.82}
                Q${width/2 - bottleWidth/2 + 5},${height * 0.88} ${width/2 - bottleWidth/4 + 5},${height * 0.88}
                L${width/2 + bottleWidth/4 - 5},${height * 0.88}
                Q${width/2 + bottleWidth/2 - 5},${height * 0.88} ${width/2 + bottleWidth/2 - 5},${height * 0.82}
                L${width/2 + bottleWidth/2 - 5},${height * 0.35}
                Q${width/2},${height * 0.32} ${width/2 - bottleWidth/2 + 5},${height * 0.35}
              `}
              dur="3s"
              repeatCount="indefinite"
            />
          </path>

          {/* Bubbles in liquid */}
          {renderBubbles()}

          {/* Glass highlight */}
          <path
            d={`
              M${width/2 - bottleWidth/2 + 8},${height * 0.28}
              L${width/2 - bottleWidth/2 + 8},${height * 0.75}
              Q${width/2 - bottleWidth/2 + 15},${height * 0.5} ${width/2 - bottleWidth/2 + 8},${height * 0.28}
            `}
            fill="white"
            opacity="0.4"
          />

          {/* Neck */}
          <rect
            x={width/2 - neckWidth/2}
            y={height * 0.08}
            width={neckWidth}
            height={neckHeight}
            fill={`url(#bottle-grad-${product.id})`}
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Cap */}
          <rect
            x={width/2 - neckWidth/2 - 3}
            y={height * 0.02}
            width={neckWidth + 6}
            height={capHeight}
            rx="4"
            fill={`url(#cap-grad-${product.id})`}
          />
          <rect
            x={width/2 - neckWidth/2 - 3}
            y={height * 0.02}
            width={neckWidth + 6}
            height={capHeight * 0.3}
            rx="4"
            fill="#5a5a5a"
          />
        </g>

        {/* Product Label on bottle */}
        <g>
          <rect
            x={width/2 - bottleWidth/2 + 8}
            y={height * 0.42}
            width={bottleWidth - 16}
            height={height * 0.35}
            rx="6"
            fill={`url(#label-grad-${product.id})`}
            stroke={labelColor}
            strokeWidth="2"
          />

          {/* Label top band */}
          <rect
            x={width/2 - bottleWidth/2 + 8}
            y={height * 0.42}
            width={bottleWidth - 16}
            height={height * 0.05}
            rx="6"
            fill={labelColor}
          />
          <rect
            x={width/2 - bottleWidth/2 + 8}
            y={height * 0.45}
            width={bottleWidth - 16}
            height={height * 0.02}
            fill={labelColor}
          />

          {/* Brand name */}
          <text
            x={width / 2}
            y={height * 0.46}
            textAnchor="middle"
            fill="white"
            fontSize={fontSize - 1}
            fontWeight="bold"
            fontFamily="serif"
          >
            BOTANICA BLISS
          </text>

          {/* Decorative leaf icon */}
          <g transform={`translate(${width/2 - 10}, ${height * 0.52})`}>
            <path
              d="M10,0 Q15,5 12,12 Q10,18 8,12 Q5,5 10,0"
              fill={labelColor}
              opacity="0.3"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 10 10;5 10 10;0 10 10"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* Product name */}
          <text
            x={width / 2}
            y={height * 0.62}
            textAnchor="middle"
            fill={accentColor}
            fontSize={fontSize}
            fontWeight="bold"
            fontFamily="serif"
          >
            {product.name.split(' ').slice(0, 2).join(' ')}
          </text>
          <text
            x={width / 2}
            y={height * 0.67}
            textAnchor="middle"
            fill={accentColor}
            fontSize={fontSize}
            fontWeight="bold"
            fontFamily="serif"
          >
            {product.name.split(' ').slice(2).join(' ')}
          </text>

          {/* Botanical name */}
          <text
            x={width / 2}
            y={height * 0.72}
            textAnchor="middle"
            fill={labelColor}
            fontSize={fontSize - 2}
            fontStyle="italic"
            opacity="0.8"
          >
            {product.botanicalName.length > 20 ? product.botanicalName.slice(0, 18) + '...' : product.botanicalName}
          </text>

          {/* Label bottom band */}
          <rect
            x={width/2 - bottleWidth/2 + 8}
            y={height * 0.74}
            width={bottleWidth - 16}
            height={height * 0.03}
            rx="3"
            fill={labelColor}
          />

          {/* Size */}
          <text
            x={width / 2}
            y={height * 0.76}
            textAnchor="middle"
            fill="white"
            fontSize={fontSize - 2}
            fontWeight="500"
          >
            {product.size} | 100% Pure
          </text>
        </g>

        {/* Quality seal */}
        <g transform={`translate(${width - 30}, ${height * 0.38})`}>
          <circle cx="0" cy="0" r="14" fill={accentColor}>
            <animate attributeName="r" values="14;15;14" dur="2s" repeatCount="indefinite"/>
          </circle>
          <text x="0" y="-2" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">PREMIUM</text>
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="5">QUALITY</text>
        </g>

        {/* Sparkle effects */}
        {[...Array(3)].map((_, i) => (
          <g key={`sparkle-${i}`}>
            <circle
              cx={width * 0.3 + i * width * 0.2}
              cy={height * 0.15 + i * 10}
              r="2"
              fill="white"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${1.5 + i * 0.5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="1;3;1"
                dur={`${1.5 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
