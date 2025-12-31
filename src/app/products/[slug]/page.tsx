import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, getProductBySlug, getProductsByCategory, getCategoryBySlug } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductPageClient from '@/components/ProductPageClient';

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

  // Generate default features and benefits if not provided
  const featuresAndBenefits = product.featuresAndBenefits || product.benefits.map((benefit, index) => ({
    title: benefit.split(' ').slice(0, 3).join(' '),
    description: benefit
  }));

  // Generate default directions if not provided
  const directionsAndUsage = product.directionsAndUsage || product.uses.map((use) => ({
    title: use.split(' ').slice(0, 2).join(' '),
    description: use
  }));

  // Generate default rating breakdown if not provided
  const ratingBreakdown = product.ratingBreakdown || [
    { stars: 5, percentage: Math.round(product.rating * 20), count: Math.round(product.reviews * 0.8) },
    { stars: 4, percentage: Math.round((5 - product.rating) * 15), count: Math.round(product.reviews * 0.15) },
    { stars: 3, percentage: 3, count: Math.round(product.reviews * 0.03) },
    { stars: 2, percentage: 1, count: Math.round(product.reviews * 0.01) },
    { stars: 1, percentage: 1, count: Math.round(product.reviews * 0.01) }
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-4">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900 underline">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-600 hover:text-gray-900 underline">
              Oils
            </Link>
            <span className="text-gray-400">/</span>
            {category && (
              <>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="text-gray-600 hover:text-gray-900 underline"
                >
                  {category.name}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - 3 Column Layout */}
      <section className="py-8 lg:py-12">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Product Image */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Middle Column - Product Info */}
            <div className="lg:col-span-4">
              <h1 className="font-serif text-3xl lg:text-4xl text-gray-900 mb-4 italic">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  ({product.rating})
                </span>
                <a href="#reviews" className="text-gray-600 hover:text-gray-900 underline">
                  {product.reviews} Reviews
                </a>
                <span className="text-gray-400">|</span>
                <a href="#reviews" className="text-gray-600 hover:text-gray-900 underline">
                  AI Summary
                </a>
              </div>

              {/* Short Description */}
              <p className="text-gray-700 leading-relaxed">
                {product.shortDescription || product.description.slice(0, 200)}
              </p>
            </div>

            {/* Right Column - Price Box */}
            <div className="lg:col-span-4">
              <ProductPageClient product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Jump-to Navigation */}
      <div className="sticky top-16 z-40 bg-gray-100 border-y border-gray-200 py-3">
        <div className="container">
          <div className="flex items-center gap-2 text-sm overflow-x-auto">
            <span className="text-gray-500 whitespace-nowrap">Jump to:</span>
            <a href="#product-details" className="text-gray-700 hover:text-gray-900 underline whitespace-nowrap">
              Product Details
            </a>
            <a href="#botanical-info" className="text-gray-700 hover:text-gray-900 underline whitespace-nowrap">
              Botanical Info
            </a>
            <a href="#usage" className="text-gray-700 hover:text-gray-900 underline whitespace-nowrap">
              Usage Guide
            </a>
            <a href="#reviews" className="text-gray-700 hover:text-gray-900 underline whitespace-nowrap">
              Reviews
            </a>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <section id="product-details" className="py-12 bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="font-serif text-3xl lg:text-4xl text-gray-900 mb-10 italic">
            Product Details
          </h2>

          {/* Features and Benefits */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-6">
              Features and Benefits
            </h3>
            <div className="space-y-6">
              {featuresAndBenefits.map((item, index) => (
                <div key={index}>
                  <span className="font-semibold text-gray-900">{item.title}:</span>{' '}
                  <span className="text-gray-700">{item.description}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-amber-400 border-t-2 mb-12" />

          {/* Directions & Suggested Usage */}
          <div className="mb-12" id="usage">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-6">
              Directions & Suggested Usage
            </h3>
            <ul className="space-y-4">
              {directionsAndUsage.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <div>
                    <span className="font-semibold text-gray-900">{item.title}:</span>{' '}
                    <span className="text-gray-700">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Botanical Information Section */}
      <section id="botanical-info" className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                  Botanical Name:
                </h3>
                <p className="text-gray-700 italic">{product.botanicalName}</p>
              </div>

              {product.plantPart && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Plant Part:
                  </h3>
                  <p className="text-gray-700">{product.plantPart}</p>
                </div>
              )}

              {product.extractionMethod && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Extraction Method:
                  </h3>
                  <p className="text-gray-700">{product.extractionMethod}</p>
                </div>
              )}

              {product.origin && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Origin:
                  </h3>
                  <p className="text-gray-700">{product.origin}</p>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {product.mainConstituents && product.mainConstituents.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Main Constituents:
                  </h3>
                  <ul className="text-gray-700">
                    {product.mainConstituents.map((constituent, index) => (
                      <li key={index}>{constituent}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.solubility && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Solubility:
                  </h3>
                  <p className="text-gray-700">{product.solubility}</p>
                </div>
              )}

              {product.blendsWellWith && product.blendsWellWith.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Blends Well With:
                  </h3>
                  <p className="text-gray-700">{product.blendsWellWith.join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Cautions */}
          {product.cautions && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-700">
                <span className="font-semibold">Cautions:</span> {product.cautions}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-4xl">
          <hr className="border-amber-400 border-t-2 mb-10" />
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-6">
            Description
          </h3>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>{product.description}</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-12 bg-white">
        <div className="container max-w-4xl">
          <hr className="border-amber-400 border-t-2 mb-10" />
          <h2 className="font-serif text-3xl lg:text-4xl text-gray-900 mb-10 italic">
            Customer Reviews
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Rating Snapshot */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Rating Snapshot</h3>
              <p className="text-sm text-gray-500 mb-4">Select a row below to filter reviews</p>
              <div className="space-y-2">
                {ratingBreakdown.map((rating) => (
                  <button
                    key={rating.stars}
                    className="flex items-center gap-2 w-full group hover:bg-gray-50 p-1 -ml-1 rounded transition-colors"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < rating.stars ? 'text-amber-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="h-full bg-gray-400"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-10">{rating.percentage}%</span>
                    <span className="text-sm text-gray-500">({rating.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Overall Rating */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Overall Rating</h3>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-bold text-gray-900">{product.rating}</span>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{product.reviews} Reviews</p>
                </div>
              </div>

              {/* Review Summary */}
              {product.reviewSummary && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Review Summary</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {product.reviewSummary}
                  </p>
                </div>
              )}
            </div>

            {/* Review this Product */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Review this Product</h3>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-gray-400 hover:text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
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
