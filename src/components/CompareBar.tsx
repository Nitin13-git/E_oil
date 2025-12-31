'use client';

import { useCompare } from '@/context/CompareContext';

export default function CompareBar() {
  const { compareItems, removeFromCompare, clearCompare, setIsCompareOpen, maxCompareItems } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <div className={`compare-bar ${compareItems.length > 0 ? 'active' : ''}`}>
      <div className="container">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left: Selected items */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">
              Compare ({compareItems.length}/{maxCompareItems}):
            </span>
            <div className="flex items-center gap-3">
              {compareItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2"
                >
                  <div
                    className="w-8 h-10 rounded flex items-center justify-center border"
                    style={{
                      backgroundColor: item.labelColor + '20',
                      borderColor: item.labelColor
                    }}
                  >
                    <span className="text-[6px] font-bold text-center leading-tight">
                      {item.name.split(' ')[0]}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-800 max-w-[100px] truncate">
                    {item.name}
                  </span>
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsCompareOpen(true)}
              disabled={compareItems.length < 2}
              className={`btn-primary btn-sm ${compareItems.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Compare Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
