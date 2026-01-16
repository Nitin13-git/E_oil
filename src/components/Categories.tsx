'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/products';

// Hook to get responsive visible items count
function useVisibleItems() {
  const [visibleItems, setVisibleItems] = useState(7);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 480) {
          setVisibleItems(2);
        } else if (window.innerWidth < 640) {
          setVisibleItems(3);
        } else if (window.innerWidth < 768) {
          setVisibleItems(4);
        } else if (window.innerWidth < 1024) {
          setVisibleItems(5);
        } else {
          setVisibleItems(7);
        }
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  return visibleItems;
}

export default function Categories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const totalItems = categories.length;
  const visibleItems = 7; // Display 7 categories at once

  // We clone items for seamless loop
  const displayCategories = [...categories, ...categories.slice(0, visibleItems)];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= totalItems ? prev : prev + 1));
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalItems);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(totalItems - 1);
      }, 10);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, totalItems]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Handle seamless wrap-around
  useEffect(() => {
    if (currentIndex >= totalItems) {
      // If we reached the clone set (or overshot), wait for transition then snap back to 0
      // We use a timeout to let the slide animation finish showing the clones
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700); // match duration-700
      return () => clearTimeout(timer);
    }

    if (!isTransitioning && currentIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalItems, isTransitioning]);

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="w-full">
        <div className="text-center mb-12 px-4">
          <span className="text-sm uppercase tracking-widest text-[var(--color-primary)] font-bold">Browse By Category</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2 tracking-tight">Explore Our Collections</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-center">Discover our most loved products, trusted by thousands of customers worldwide.</p>
        </div>

        <div
          className="relative w-full group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-800 hover:bg-[var(--color-primary)] hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex border border-gray-100"
            aria-label="Previous Category"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-800 hover:bg-[var(--color-primary)] hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex border border-gray-100"
            aria-label="Next Category"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Slider Container */}
          <div className="relative overflow-hidden px-2">
            <div
              className={`flex flex-nowrap ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
              style={{
                transform: `translateX(-${currentIndex * (100 / displayCategories.length)}%)`,
                width: `${(displayCategories.length / visibleItems) * 100}%`
              }}
            >
              {displayCategories.map((category, index) => (
                <div
                  key={`${category.id}-${index}`}
                  className="px-2"
                  style={{ width: `${100 / displayCategories.length}%` }}
                >
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="relative w-full aspect-square mb-3 group-hover:scale-110 transition-transform duration-500 ease-out">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 h-10 flex items-center justify-center uppercase tracking-tight">
                      {category.name}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
