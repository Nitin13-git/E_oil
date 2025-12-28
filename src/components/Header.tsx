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
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.5.7 2.8 1.8 3.7-.5.3-.8.8-.8 1.3 0 .9.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.5-.3-1-.8-1.3 1.1-.9 1.8-2.2 1.8-3.7C12.5 4 10.5 2 12 2zm-3 9c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2H9zm3 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">Vedanta Oils</h1>
              <p className="text-xs text-gray-500">Pure & Natural Essential Oils</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium">
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link href="/products" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium flex items-center gap-1">
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
                      className="block px-4 py-2 text-gray-700 hover:bg-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/about" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium">
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
              <Link href="/" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium">
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="text-gray-600 hover:text-[var(--color-primary)] transition-colors pl-4"
                >
                  {category.icon} {category.name}
                </Link>
              ))}
              <Link href="/about" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium">
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
