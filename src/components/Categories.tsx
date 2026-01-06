import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/products';

export default function Categories() {
  return (
    <section className="py-6 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-gray-500 font-medium">Browse By Category</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Explore Our Collections</h2>
          <p className="text-gray-500 mt-3">Discover our most loved products, trusted by thousands of customers worldwide.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-52 h-52 md:w-64 md:h-64 mb-4 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[var(--color-primary)] transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
