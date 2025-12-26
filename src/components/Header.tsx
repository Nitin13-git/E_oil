'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/data/products';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <span className="text-white text-xl">🌿</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--primary)]">EssenceOils</h1>
              <p className="text-xs text-gray-500">Pure & Natural</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium">
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link href="/products" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium flex items-center gap-1">
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[220px] mt-1">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/about" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/products" className="btn-primary">
              Shop Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium">
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors pl-4"
                >
                  {category.icon} {category.name}
                </Link>
              ))}
              <Link href="/about" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[var(--primary)] transition-colors font-medium">
                Contact
              </Link>
              <Link href="/products" className="btn-primary text-center mt-2">
                Shop Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
