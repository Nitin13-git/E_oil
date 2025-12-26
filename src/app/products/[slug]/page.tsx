import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, getProductBySlug, getProductsByCategory, getCategoryBySlug } from '@/data/products';
import ProductLabel from '@/components/ProductLabel';
import ProductCard from '@/components/ProductCard';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[var(--muted)] py-4">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[var(--primary)]">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-[var(--primary)]">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            {category && (
              <>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="text-gray-500 hover:text-[var(--primary)]"
                >
                  {category.name}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image/Label */}
            <div className="flex justify-center items-center bg-gradient-to-b from-[var(--muted)] to-white rounded-2xl p-12">
              <ProductLabel product={product} size="lg" />
            </div>

            {/* Product Info */}
            <div>
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.bestSeller && (
                  <span className="bg-[var(--accent)] text-white text-sm font-bold px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
                {product.featured && (
                  <span className="bg-[var(--primary)] text-white text-sm font-bold px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
                {product.inStock ? (
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-500 italic mb-4">
                {product.botanicalName}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-[var(--primary)]">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-500 ml-2">/ {product.size}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Add to Cart */}
              <AddToCartButton productName={product.name} />

              {/* Product Meta */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 w-24">Category:</span>
                  <Link
                    href={`/products?category=${product.category}`}
                    className="text-[var(--primary)] hover:underline"
                  >
                    {category?.name}
                  </Link>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 w-24">Size:</span>
                  <span className="text-gray-900">{product.size}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 w-24">Ingredients:</span>
                  <span className="text-gray-900">{product.ingredients}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits & Uses */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* Benefits */}
            <div className="bg-[var(--muted)] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Benefits
              </h2>
              <ul className="space-y-4">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[var(--primary)]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Uses */}
            <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
                How to Use
              </h2>
              <ul className="space-y-4">
                {product.uses.map((use, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[var(--accent)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold text-[var(--primary)]">
                      {index + 1}
                    </span>
                    <span className="text-white/90">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-[var(--muted)]">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
