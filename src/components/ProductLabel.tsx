'use client';

import { Product } from '@/data/products';

interface ProductLabelProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProductLabel({ product, size = 'md' }: ProductLabelProps) {
  const sizes = {
    sm: { width: 150, height: 200, fontSize: 10 },
    md: { width: 200, height: 280, fontSize: 12 },
    lg: { width: 280, height: 380, fontSize: 14 },
  };

  const { width, height, fontSize } = sizes[size];
  const labelColor = product.labelColor || '#2d5a27';
  const accentColor = product.accentColor || '#1e3d1a';

  // Generate unique pattern based on product name
  const patternId = `pattern-${product.id}`;
  const gradientId = `gradient-${product.id}`;
  const hash = product.name.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
  const patternType = Math.abs(hash) % 4;

  const renderPattern = () => {
    switch (patternType) {
      case 0: // Leaves pattern
        return (
          <g opacity="0.1">
            {[...Array(6)].map((_, i) => (
              <path
                key={i}
                d={`M${20 + i * 30},${80 + (i % 2) * 20} Q${35 + i * 30},${60 + (i % 2) * 20} ${40 + i * 30},${80 + (i % 2) * 20}`}
                fill="none"
                stroke={accentColor}
                strokeWidth="2"
              />
            ))}
          </g>
        );
      case 1: // Dots pattern
        return (
          <g opacity="0.1">
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={20 + (i % 5) * 40}
                cy={60 + Math.floor(i / 5) * 30}
                r="3"
                fill={accentColor}
              />
            ))}
          </g>
        );
      case 2: // Waves pattern
        return (
          <g opacity="0.1">
            {[...Array(4)].map((_, i) => (
              <path
                key={i}
                d={`M0,${70 + i * 25} Q${width/4},${55 + i * 25} ${width/2},${70 + i * 25} T${width},${70 + i * 25}`}
                fill="none"
                stroke={accentColor}
                strokeWidth="1.5"
              />
            ))}
          </g>
        );
      default: // Botanical pattern
        return (
          <g opacity="0.08">
            <circle cx={width/2} cy={height/2} r={width/3} fill="none" stroke={accentColor} strokeWidth="1" />
            <circle cx={width/2} cy={height/2} r={width/4} fill="none" stroke={accentColor} strokeWidth="1" />
            <circle cx={width/2} cy={height/2} r={width/6} fill="none" stroke={accentColor} strokeWidth="1" />
          </g>
        );
    }
  };

  return (
    <div className="relative animate-float">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="drop-shadow-xl"
      >
        <defs>
          {/* Background gradient */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fefefe" />
            <stop offset="50%" stopColor="#f8f6f0" />
            <stop offset="100%" stopColor="#f0ebe0" />
          </linearGradient>

          {/* Decorative pattern */}
          <pattern id={patternId} patternUnits="userSpaceOnUse" width="20" height="20">
            <circle cx="10" cy="10" r="1" fill={labelColor} opacity="0.1" />
          </pattern>
        </defs>

        {/* Main bottle/label shape */}
        <rect
          x="10"
          y="10"
          width={width - 20}
          height={height - 20}
          rx="12"
          fill={`url(#${gradientId})`}
          stroke={labelColor}
          strokeWidth="3"
        />

        {/* Top decorative band */}
        <rect
          x="10"
          y="10"
          width={width - 20}
          height="35"
          rx="12"
          fill={labelColor}
        />
        <rect
          x="10"
          y="30"
          width={width - 20}
          height="15"
          fill={labelColor}
        />

        {/* Bottom decorative band */}
        <rect
          x="10"
          y={height - 45}
          width={width - 20}
          height="35"
          rx="12"
          fill={labelColor}
        />
        <rect
          x="10"
          y={height - 45}
          width={width - 20}
          height="15"
          fill={labelColor}
        />

        {/* Decorative pattern */}
        {renderPattern()}

        {/* Brand name */}
        <text
          x={width / 2}
          y="30"
          textAnchor="middle"
          fill="white"
          fontSize={fontSize}
          fontWeight="bold"
          fontFamily="serif"
        >
          ESSENCEOILS
        </text>

        {/* Decorative line */}
        <line
          x1="30"
          y1="55"
          x2={width - 30}
          y2="55"
          stroke={labelColor}
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Product icon/illustration */}
        <g transform={`translate(${width/2 - 25}, ${height/2 - 60})`}>
          <ellipse cx="25" cy="30" rx="20" ry="25" fill={labelColor} opacity="0.15" />
          <path
            d="M25,5 Q35,15 30,30 Q25,45 20,30 Q15,15 25,5"
            fill={labelColor}
            opacity="0.3"
          />
          <path
            d="M15,35 Q10,45 15,50 M35,35 Q40,45 35,50"
            fill="none"
            stroke={labelColor}
            strokeWidth="1.5"
            opacity="0.4"
          />
        </g>

        {/* Product name */}
        <text
          x={width / 2}
          y={height / 2 + 20}
          textAnchor="middle"
          fill={accentColor}
          fontSize={fontSize + 2}
          fontWeight="bold"
          fontFamily="serif"
        >
          {product.name.split(' ').slice(0, -2).join(' ')}
        </text>
        <text
          x={width / 2}
          y={height / 2 + 38}
          textAnchor="middle"
          fill={accentColor}
          fontSize={fontSize + 2}
          fontWeight="bold"
          fontFamily="serif"
        >
          {product.name.split(' ').slice(-2).join(' ')}
        </text>

        {/* Botanical name */}
        <text
          x={width / 2}
          y={height / 2 + 58}
          textAnchor="middle"
          fill={labelColor}
          fontSize={fontSize - 2}
          fontStyle="italic"
          opacity="0.8"
        >
          {product.botanicalName}
        </text>

        {/* Size */}
        <text
          x={width / 2}
          y={height / 2 + 78}
          textAnchor="middle"
          fill={accentColor}
          fontSize={fontSize - 1}
          fontWeight="500"
        >
          {product.size}
        </text>

        {/* Decorative line bottom */}
        <line
          x1="30"
          y1={height - 55}
          x2={width - 30}
          y2={height - 55}
          stroke={labelColor}
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Bottom text */}
        <text
          x={width / 2}
          y={height - 25}
          textAnchor="middle"
          fill="white"
          fontSize={fontSize - 2}
          fontWeight="500"
        >
          100% Pure & Natural
        </text>

        {/* Quality seal */}
        <circle
          cx={width - 35}
          cy={height - 70}
          r="18"
          fill={accentColor}
          opacity="0.9"
        />
        <text
          x={width - 35}
          y={height - 73}
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="bold"
        >
          PREMIUM
        </text>
        <text
          x={width - 35}
          y={height - 64}
          textAnchor="middle"
          fill="white"
          fontSize="6"
        >
          QUALITY
        </text>
      </svg>

      {/* Glass reflection effect */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
          borderRadius: '12px',
        }}
      />
    </div>
  );
}
