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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-[2in]">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-80 h-80 mb-6 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain drop-shadow-md mix-blend-multiply"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[var(--color-primary)] transition-colors whitespace-nowrap">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
