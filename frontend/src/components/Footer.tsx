import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#e8e4dc] text-gray-700">
      {/* Main Footer */}
      <div className="container py-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-5 text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/profile" className="hover:text-[#b45309] transition-colors">My Account</Link></li>
              <li><Link href="/products" className="hover:text-[#b45309] transition-colors">All Products</Link></li>
              <li><Link href="/about" className="hover:text-[#b45309] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#b45309] transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-[#b45309] transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-5 text-gray-900">Help</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="hover:text-[#b45309] transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#b45309] transition-colors">Customer Service</Link></li>
              <li><Link href="/contact" className="hover:text-[#b45309] transition-colors">Sales Department</Link></li>
              <li><Link href="/contact" className="hover:text-[#b45309] transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-[#b45309] transition-colors">Help Code</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-5 text-gray-900">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-[#b45309] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#b45309] transition-colors">Orders, Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-[#b45309] transition-colors">International Orders</Link></li>
              <li><Link href="/about" className="hover:text-[#b45309] transition-colors">Certificates & Documents</Link></li>
            </ul>
          </div>

          {/* Our Standards */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-5 text-gray-900">Our Standards</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-[#b45309] transition-colors">Purity & Quality</Link></li>
              <li><Link href="/about" className="hover:text-[#b45309] transition-colors">Fair Trade</Link></li>
              <li><Link href="/about" className="hover:text-[#b45309] transition-colors">ECOCERT/COSMOS</Link></li>
              <li><Link href="/about" className="hover:text-[#b45309] transition-colors">Clean Standard</Link></li>
              <li><Link href="/about" className="hover:text-[#b45309] transition-colors">RSPO</Link></li>
              <li><Link href="/about" className="hover:text-[#b45309] transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 sm:col-span-2">
            <h4 className="font-serif text-lg font-semibold mb-5 text-gray-900">Subscribe to our newsletter</h4>
            <p className="text-gray-600 mb-4">Get the latest updates on new products and upcoming sales.</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-6 md:mb-10">
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-1 px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-[#b45309] min-w-0"
              />
              <button className="px-6 py-3 bg-[#b45309] text-white font-semibold hover:bg-[#9a4408] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-8 justify-end" style={{ marginTop: '40px' }}>
              <a href="https://www.instagram.com/vedanta_oils?igsh=Z3E3aTdiaTRlNXQx&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://www.facebook.com/share/1ARbkTFScG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/vedanta-oils-4b62323a5" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-400 bg-[#d9d5cc]">
        <div className="container py-4 md:py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full md:w-auto">
              {/* Circular Logo */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-md flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Vedanta Oils"
                  width={48}
                  height={48}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>
              <div className="flex flex-col items-center sm:items-start md:flex-row md:items-center gap-2 md:gap-6 text-center sm:text-left">
                <p className="text-gray-700 text-xs sm:text-sm">
                  Copyright &copy; Vedanta Oils {new Date().getFullYear()}, all rights reserved
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm">
                  <Link href="#" className="text-gray-600 hover:text-gray-900 underline">Reviews</Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 underline">Privacy Policy</Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 underline">Terms & Conditions</Link>
                </div>
              </div>
            </div>
            {/* Payment Icons */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#1a1f71]">VISA</span>
              <svg className="h-8" viewBox="0 0 40 24" fill="none"><circle cx="15" cy="12" r="10" fill="#eb001b" /><circle cx="25" cy="12" r="10" fill="#f79e1b" /><path d="M20 18.5a10 10 0 010-13" fill="#ff5f00" /></svg>
              <span className="text-xl font-bold text-[#006fcf]">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
