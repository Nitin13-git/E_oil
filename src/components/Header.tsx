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
              style={{ height: '112px', width: 'auto' }}

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
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
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
                <span className="contact-text">+91 (0) 8850098671</span>
                <span className="contact-text">+44 (0) 7308526721</span>
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
