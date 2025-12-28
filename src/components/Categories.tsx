import Link from 'next/link';
import { categories } from '@/data/products';

export default function Categories() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-[var(--color-primary)] font-medium">Browse By Category</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Explore Our Collections
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our comprehensive range of aromatherapy products, carefully curated for your wellness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-8 card-hover"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <span className="text-5xl mb-4 block">{category.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white/80 text-sm mb-4">{category.description}</p>
                <span className="inline-flex items-center text-[var(--color-accent)] font-medium group-hover:translate-x-2 transition-transform">
                  Explore
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
