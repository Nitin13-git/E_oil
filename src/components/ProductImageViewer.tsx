'use client';

import { useState } from 'react';
import ProductLabel from './ProductLabel';
import Product360View from './Product360View';
import type { Product } from '@/data/products';

interface ProductImageViewerProps {
  product: Product;
}

// Color mapping for products
const productColors: Record<string, string> = {
  'lavender': '#9b59b6',
  'peppermint': '#27ae60',
  'eucalyptus': '#2ecc71',
  'tea-tree': '#1abc9c',
  'lemon': '#f1c40f',
  'orange': '#e67e22',
  'frankincense': '#d4a853',
  'rosemary': '#2d5a27',
  'ylang': '#e91e63',
  'chamomile': '#f39c12',
  'bergamot': '#8bc34a',
  'clary': '#9c27b0',
  'jojoba': '#cddc39',
  'coconut': '#fff3e0',
  'sweet-almond': '#ffe082',
  'argan': '#ff9800',
};

export default function ProductImageViewer({ product }: ProductImageViewerProps) {
  const [viewMode, setViewMode] = useState<'static' | '360'>('360');

  // Get color based on product name
  const getProductColor = () => {
    const name = product.name.toLowerCase();
    for (const [key, color] of Object.entries(productColors)) {
      if (name.includes(key)) return color;
    }
    return '#22c55e'; // Default green
  };

  return (
    <div className="relative">
      {/* View Mode Toggle */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setViewMode('360')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === '360'
              ? 'bg-[var(--primary)] text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          360° View
        </button>
        <button
          onClick={() => setViewMode('static')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === 'static'
              ? 'bg-[var(--primary)] text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Static View
        </button>
      </div>

      {/* Content */}
      <div className="bg-gradient-to-b from-[var(--muted)] to-white rounded-2xl p-6 md:p-12 min-h-[550px] flex items-center justify-center">
        {viewMode === '360' ? (
          <Product360View
            productName={product.name}
            productColor={getProductColor()}
            scientificName={product.botanicalName}
            volume={product.size}
          />
        ) : (
          <div className="animate-fadeIn">
            <ProductLabel product={product} size="lg" />
          </div>
        )}
      </div>

      {/* Feature badges */}
      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          100% Pure
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
          Ethically Sourced
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Lab Tested
        </div>
      </div>
    </div>
  );
}
