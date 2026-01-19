'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCompare } from '@/context/CompareContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCompare, removeFromCompare, isInCompare, compareItems, maxCompareItems } = useCompare();
  const inCompare = isInCompare(product.id);

  const handleCompareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.checked) {
      addToCompare(product);
    } else {
      removeFromCompare(product.id);
    }
  };

  return (
    <div className="product-card">
      {/* Compare Checkbox */}
      <div className="compare-checkbox" onClick={(e) => e.stopPropagation()}>
        <label className="compare-label">
          <input
            type="checkbox"
            checked={inCompare}
            onChange={handleCompareChange}
            disabled={!inCompare && compareItems.length >= maxCompareItems}
          />
          <span>COMPARE</span>
        </label>
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="product-image-link">
        <div className="product-image-container">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="product-info">
        <Link href={`/products/${product.slug}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="rating-text">({product.rating}) {product.reviews} Reviews</span>
        </div>

        {/* Price */}
        <div className="product-price">
          <span className="price-from">from</span>
          <span className="price-amount">${product.price.toFixed(2)}</span>
        </div>

        {/* Divider */}
        <div className="product-divider"></div>

        {/* Stock Status */}
        <p className="stock-info">
          {product.inStock ? 'Contact customer service for lead times' : 'Currently out of stock'}
        </p>

        {/* Action Button */}
        <Link href={`/products/${product.slug}`} className="choose-options-btn">
          CHOOSE OPTIONS
        </Link>
      </div>
    </div>
  );
}
