'use client';

import { useState } from 'react';
import { Product } from '@/data/products';

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const sizes = product.sizes || [{ size: product.size, price: product.price }];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${product.name} (${selectedSize.size}) to cart!`);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
      {/* Price */}
      <div className="text-3xl font-bold text-gray-900 mb-6">
        ${selectedSize.price.toFixed(2)}
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 mb-3">
          Size: <span className="text-gray-500">Required</span>
        </div>
        <div className="space-y-3">
          {sizes.map((size, index) => (
            <label
              key={index}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="size"
                  checked={selectedSize.size === size.size}
                  onChange={() => setSelectedSize(size)}
                  className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-500"
                />
                <span className="text-gray-700 group-hover:text-gray-900">
                  {size.size}
                </span>
              </div>
              <span className="font-semibold text-gray-900">
                ${size.price.toFixed(2)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      {product.inStock ? (
        <div className="text-green-600 font-medium mb-2">Available</div>
      ) : (
        <div className="text-red-600 font-medium mb-2">Out of Stock</div>
      )}

      {/* Processing Time */}
      {product.processingTime && (
        <div className="text-gray-700 mb-6">
          <span className="font-medium">Processing Time:</span> {product.processingTime}
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 mb-2">Quantity:</div>
        <div className="flex items-center w-24 border border-gray-300 rounded">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full text-center py-2 border-0 focus:ring-0"
            min="1"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className="w-full bg-gray-900 text-white py-4 px-6 font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
      >
        Add to Cart
      </button>

      {/* Add to Shopping List */}
      <button className="w-full text-center text-gray-700 underline hover:text-gray-900 text-sm font-medium">
        Add to Shopping List
      </button>
    </div>
  );
}
