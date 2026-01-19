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
              alt="Vedanta Oil"
              width={112}
              height={112}
              priority
              className="header-logo-img"
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

          {/* Contact & Social Section - Centered/Right */}
          <div className="header-contact-section">

            {/* Social Icons */}
            <div className="social-group">
              <a href="https://www.instagram.com/vedanta_oils?igsh=Z3E3aTdiaTRlNXQx&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://www.facebook.com/share/1ARbkTFScG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/vedanta-oils-4b62323a5/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>

            <div className="contact-divider"></div>

            {/* Phone */}
            <div className="contact-group">
              <div className="contact-icon-wrapper">
                <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-text">+91 7651974723</span>
                <span className="contact-text">+91 6307054744</span>
              </div>
            </div>

            <div className="contact-divider"></div>

            {/* Email */}
            <div className="contact-group">
              <div className="contact-icon-wrapper">
                <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-label">Send email</span>
                <span className="contact-text email-text">vedantaoils@gmail.com</span>
              </div>
            </div>

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
            <li>
              <Link href="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
                Blog
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
            <li>
              <Link href="/blog" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Blog
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
