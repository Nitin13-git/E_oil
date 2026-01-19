'use client';

import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';

export default function CompareModal() {
  const { compareItems, isCompareOpen, setIsCompareOpen, removeFromCompare } = useCompare();
  const { addToCart } = useCart();

  if (!isCompareOpen) return null;

  const handleAddToCart = (product: typeof compareItems[0]) => {
    addToCart(product.id, 1);
  };

  const comparisonFields: { key: string; label: string; format?: (v: unknown) => string }[] = [
    { key: 'price', label: 'Price', format: (v) => `$${(v as number).toFixed(2)}` },
    { key: 'originalPrice', label: 'Original Price', format: (v) => v ? `$${(v as number).toFixed(2)}` : '-' },
    { key: 'size', label: 'Size', format: (v) => String(v || '-') },
    { key: 'rating', label: 'Rating', format: (v) => `${v} / 5` },
    { key: 'reviews', label: 'Reviews', format: (v) => (v as number).toLocaleString() },
    { key: 'origin', label: 'Origin', format: (v) => String(v || '-') },
    { key: 'extractionMethod', label: 'Extraction Method', format: (v) => String(v || '-') },
    { key: 'botanicalName', label: 'Botanical Name', format: (v) => String(v || '-') },
    { key: 'category', label: 'Category', format: (v) => String(v || '-').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) },
    { key: 'inStock', label: 'In Stock', format: (v) => v ? 'Yes' : 'No' },
    { key: 'isOrganic', label: 'Organic', format: (v) => v ? 'Yes' : 'No' },
  ];

  return (
    <div className="compare-modal-overlay" onClick={() => setIsCompareOpen(false)}>
      <div className="compare-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Compare Products</h2>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Product Headers */}
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left min-w-[150px] bg-gray-50 sticky left-0"></th>
                {compareItems.map((product) => (
                  <th key={product.id} className="p-4 text-center min-w-[220px]">
                    <div className="flex flex-col items-center">
                      {/* Product Visual */}
                      <div
                        className="w-16 h-20 rounded-lg flex flex-col items-center justify-center border-2 shadow-md mb-3"
                        style={{
                          backgroundColor: product.labelColor + '15',
                          borderColor: product.labelColor
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 right-0 h-4 rounded-t-md"
                          style={{ backgroundColor: product.labelColor }}
                        ></div>
                        <div className="text-center px-1 mt-2">
                          <p className="text-[7px] font-bold leading-tight text-gray-800">
                            {product.name.split(' ').slice(0, 2).join(' ')}
                          </p>
                        </div>
                        <div
                          className="absolute bottom-0 left-0 right-0 h-4 rounded-b-md"
                          style={{ backgroundColor: product.labelColor }}
                        ></div>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 italic mb-3">{product.botanicalName}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="btn-primary btn-sm text-xs"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="btn-secondary btn-sm text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Comparison Rows */}
            <tbody>
              {comparisonFields.map((field, index) => (
                <tr key={field.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 font-medium text-gray-700 text-sm sticky left-0 bg-inherit">
                    {field.label}
                  </td>
                  {compareItems.map((product) => {
                    const value = product[field.key as keyof typeof product];
                    const displayValue = field.format
                      ? field.format(value)
                      : String(value || '-');
                    return (
                      <td key={product.id} className="p-4 text-center text-sm text-gray-600">
                        {field.key === 'price' ? (
                          <span className="text-lg font-bold text-[var(--color-primary)]">
                            {displayValue}
                          </span>
                        ) : field.key === 'rating' ? (
                          <div className="flex items-center justify-center gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">({product.rating})</span>
                          </div>
                        ) : field.key === 'inStock' || field.key === 'isOrganic' ? (
                          <span className={`inline-flex items-center gap-1 ${value ? 'text-green-600' : 'text-gray-400'}`}>
                            {value ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            )}
                            {displayValue}
                          </span>
                        ) : (
                          displayValue
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Benefits Row */}
              <tr className="bg-gray-50">
                <td className="p-4 font-medium text-gray-700 text-sm sticky left-0 bg-gray-50">
                  Key Benefits
                </td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-4 text-sm text-gray-600">
                    <ul className="list-disc list-inside text-left space-y-1">
                      {product.benefits.slice(0, 4).map((benefit, i) => (
                        <li key={i} className="text-xs">{benefit}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Uses Row */}
              <tr className="bg-white">
                <td className="p-4 font-medium text-gray-700 text-sm sticky left-0 bg-white">
                  Common Uses
                </td>
                {compareItems.map((product) => (
                  <td key={product.id} className="p-4 text-sm text-gray-600">
                    <ul className="list-disc list-inside text-left space-y-1">
                      {product.uses.slice(0, 3).map((use, i) => (
                        <li key={i} className="text-xs">{use}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
