'use client';

import Link from 'next/link';
import { Product } from '@/data/products';
import ProductLabel from './ProductLabel';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer">
        {/* Product Image/Label */}
        <div className="relative bg-gradient-to-b from-[var(--muted)] to-white p-6 flex items-center justify-center min-h-[300px]">
          <ProductLabel product={product} size="md" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.bestSeller && (
              <span className="bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                Best Seller
              </span>
            )}
            {product.featured && !product.bestSeller && (
              <span className="bg-[var(--primary)] text-white text-xs font-bold px-3 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Stock indicator */}
          {!product.inStock && (
            <div className="absolute top-4 right-4">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="stars flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-[var(--primary)] transition-colors">
            {product.name}
          </h3>

          {/* Botanical name */}
          <p className="text-sm text-gray-500 italic mb-3">
            {product.botanicalName}
          </p>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-[var(--primary)]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                / {product.size}
              </span>
            </div>
            <button
              className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors"
              onClick={(e) => {
                e.preventDefault();
                alert('Added to cart!');
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
