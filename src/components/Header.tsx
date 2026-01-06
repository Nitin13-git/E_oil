'use client';

/**
 * Header Component
 *
 * A clean, professional e-commerce header with 3 sections:
 * 1. Announcement Bar - Promotional messages
 * 2. Main Header - Logo, Search, User Actions
 * 3. Navigation Bar - Home, Products, About, Contact
 *
 * Uses plain CSS with Flexbox layout
 */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import './Header.css';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const pathname = usePathname();

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Check if nav link is active
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header>
      {/* ============================================
          SECTION 2: Main Header
          Height: 72px
          Layout: Logo | Search Bar | User Actions
          ============================================ */}
      <div className="main-header">
        <div className="header-container main-header-inner">

          {/* Logo - Left aligned with brand name and tagline */}
          <Link href="/" className="header-logo">
            <Image
              src="/images/logo.png"
              alt="Vedanta Oils"
              width={70}
              height={70}
              priority
              style={{ height: '70px', width: 'auto' }}
            />
            <div className="logo-text">
              <span className="brand-name">Vedanta Oils</span>
              <span className="brand-tagline">India's Soil to World's Senses</span>
            </div>
          </Link>

          {/* Search Bar - Centered, max width 540px */}
          <div className="header-search">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                className="search-input"
                placeholder="Search by keyword, brand or SKU"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button" aria-label="Search">
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* User Actions - Right aligned */}
          <div className="header-actions">

            {/* Sign In / Profile */}
            {user ? (
              <Link href="/profile" className="action-item">
                <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="action-label">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link href="/login" className="action-item">
                <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="action-label">Sign in</span>
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="action-item">
              <div className="cart-wrapper">
                <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="cart-count">{cartCount}</span>
              </div>
            </Link>

            {/* Admin Link (if admin) */}
            {isAdmin && (
              <Link href="/admin" className="action-item">
                <span className="action-label">Admin</span>
              </Link>
            )}

            {/* Logout (if logged in) */}
            {user && (
              <button onClick={logout} className="action-item">
                <span className="action-label">Logout</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================
          SECTION 3: Navigation Bar
          Height: 48px
          Center-aligned: Home | Products | About | Contact
          ============================================ */}
      <nav className="nav-bar">
        <div className="header-container nav-bar-inner">
          <ul className="nav-list">
            <li>
              <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ============================================
          MOBILE MENU
          Shown on smaller screens
          ============================================ */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="header-container">
          {/* Mobile Search */}
          <div className="mobile-search">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                className="search-input"
                placeholder="Search by keyword, brand or SKU"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button" aria-label="Search">
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Mobile Navigation */}
          <ul className="mobile-nav-list">
            <li>
              <Link href="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link href="/profile" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                    My Profile
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link href="/admin" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                      Admin
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="mobile-nav-link"
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li>
                <Link href="/login" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
