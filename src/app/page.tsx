import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProcessAnimation from '@/components/ProcessAnimation';
import Categories from '@/components/Categories';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import { getBestSellers, getFeaturedProducts } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const bestSellers = getBestSellers();
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  return (
    <>
      <Hero />

      {/* Categories Section */}
      <Categories />

      {/* Features Section */}
      <Features />

      {/* Our Process Section */}
      <ProcessAnimation />

      {/* Best Sellers Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--color-primary)] font-semibold tracking-wide uppercase text-sm">Popular Choices</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
              Our Best Sellers
            </h2>
            <p className="text-gray-500 mt-4 text-center mx-auto" style={{ maxWidth: '400px' }}>
              Discover our most loved products, trusted by thousands of customers worldwide.
            </p>
            <Link href="/products" className="btn-secondary mt-6 inline-block">
              View All Products
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding bg-[var(--color-muted)]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--color-primary)] font-medium">Handpicked For You</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Featured Products
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our experts&apos; selection of premium essential oils and aromatherapy products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary">
              Explore All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Certifications</h2>
            <p className="text-gray-500 mt-2">Trusted quality backed by international standards</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['cert-1.png', 'cert-2.png', 'cert-3.png', 'cert-4.png', 'cert-5.png'].map((cert, index) => (
              <div key={index} className="relative w-24 h-24 md:w-32 md:h-32 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={`/images/cert/${cert}`}
                  alt={`Certification ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">15+</div>
              <div className="text-gray-600 mt-2">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">500+</div>
              <div className="text-gray-600 mt-2">Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">50K+</div>
              <div className="text-gray-600 mt-2">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">120+</div>
              <div className="text-gray-600 mt-2">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[var(--color-primary)] font-medium">Quality Assurance</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Certified Pure & Premium Quality
              </h2>
              <p className="text-gray-600 mb-6">
                Every product we offer undergoes rigorous testing to ensure the highest standards
                of purity and potency. Our commitment to quality is backed by internationally
                recognized certifications.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {['ISO 9001:2015', 'GMP Certified', 'USDA Organic', 'Cruelty Free'].map((cert) => (
                  <div key={cert} className="flex items-center gap-3 p-4 bg-[var(--color-muted)] rounded-lg">
                    <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Testing Process</h3>
                <ul className="space-y-4">
                  {[
                    'GC/MS Analysis for purity verification',
                    'Certificate of Analysis (COA) for every batch',
                    'Heavy metal and pesticide screening',
                    'Microbial testing for safety',
                    'Organoleptic evaluation by experts',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-[var(--color-accent)] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-[var(--color-primary)]">
                        {index + 1}
                      </span>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--color-accent)] rounded-full opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
