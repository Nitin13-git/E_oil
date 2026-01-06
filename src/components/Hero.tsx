'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const banners = [
    '/images/hero-1.png',
    '/images/hero-2.png',
    '/images/hero-3.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gray-100">
      {/* Banner Carousel */}
      <div className="relative w-full">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`w-full transition-opacity duration-1000 ease-in-out ${index === currentIndex
              ? 'opacity-100 z-10 relative block'
              : 'opacity-0 z-0 absolute top-0 left-0 pointer-events-none'
              }`}
          >
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-[50vh] object-cover block"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {index === 0 && (
              <div className="absolute inset-0 flex items-center z-20">
                <div className="w-full pl-[10%] pr-8">
                  <div className={`text-white drop-shadow-2xl transition-all duration-1000 delay-500 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <h1 className="font-bold leading-tight mb-4 whitespace-nowrap" style={{ fontSize: '5.8vh' }}>
                      Bulk Essential Oils For Global Brands
                    </h1>
                    <p className="font-medium leading-relaxed whitespace-nowrap mb-8" style={{ fontSize: '1.8vh', opacity: 0.9 }}>
                      Indian supplier of lab-tested, export-ready essential oils for importers, manufacturers, and private-label brands.
                    </p>
                    <div className="transition-all duration-1000 delay-900">
                      <Link
                        href="/contact"
                        className="inline-block bg-[#fdfcf8] text-gray-800 font-bold px-8 py-3 rounded-sm shadow-lg hover:bg-white transition-colors duration-300 uppercase tracking-widest text-sm"
                        style={{ border: '1px solid rgba(0,0,0,0.05)' }}
                      >
                        Enquire Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Navigation Arrows - Rectangular boxes */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 w-10 h-32 flex items-center justify-center transition-all shadow-md"
          aria-label="Previous slide"
        >
          <svg
            className="w-8 h-8 opacity-60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 w-10 h-32 flex items-center justify-center transition-all shadow-md"
          aria-label="Next slide"
        >
          <svg
            className="w-8 h-8 opacity-60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
