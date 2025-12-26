'use client';

import { useState } from 'react';

interface AddToCartButtonProps {
  productName: string;
}

export default function AddToCartButton({ productName }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${productName} to cart!`);
  };

  return (
    <div className="flex gap-4 mb-8">
      <div className="flex items-center border border-gray-300 rounded-lg">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-3 hover:bg-gray-100 transition-colors"
        >
          -
        </button>
        <span className="px-4 py-3 font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-3 hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>
      <button
        className="btn-primary flex-1"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
