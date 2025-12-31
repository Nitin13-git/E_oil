'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/products';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo.png"
              alt="Vedanta Oils - Pure & Natural Essential Oils"
              width={180}
              height={60}
              className="h-14 w-auto group-hover:scale-105 transition-transform duration-300"
              priority
            />
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

          {/* Right Side - Cart & Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-[var(--color-primary)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link href="/admin" className="text-sm text-[var(--color-primary)] hover:underline">
                    Admin
                  </Link>
                )}
                <Link href="/profile" className="text-gray-700 hover:text-[var(--color-primary)] font-medium">
                  {user.name}
                </Link>
                <button onClick={logout} className="text-gray-500 hover:text-red-500 text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-[var(--color-primary)] font-medium">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
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
              <Link href="/" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="text-gray-600 hover:text-[var(--color-primary)] transition-colors pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.icon} {category.name}
                </Link>
              ))}
              <Link href="/about" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              {user ? (
                <>
                  <Link href="/cart" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </Link>
                  <Link href="/profile" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                    My Profile
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="text-[var(--color-primary)] font-medium" onClick={() => setIsMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-left text-red-500 font-medium">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" className="btn-primary text-center mt-2" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
