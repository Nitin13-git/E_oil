'use client';

import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'rising-demand-essential-oils',
    title: 'The Rising Demand for Essential Oils: A Global Wellness Revolution',
    excerpt: 'Discover why essential oils have become one of the fastest-growing segments in the wellness industry, with market projections reaching unprecedented heights.',
    content: `The global essential oils market has experienced remarkable growth over the past decade, transforming from a niche segment into a mainstream wellness phenomenon. According to recent industry reports, the market is projected to reach $27.49 billion by 2028, growing at a compound annual growth rate (CAGR) of 8.6%.

Several key factors are driving this unprecedented demand:

**1. Growing Health Consciousness**
Consumers worldwide are increasingly seeking natural alternatives to synthetic products. Essential oils offer a plant-based solution for various wellness needs, from stress relief to immune support. The COVID-19 pandemic further accelerated this trend, as people became more focused on holistic health approaches.

**2. Aromatherapy Integration**
Aromatherapy has moved from spa treatments to everyday life. Diffusers have become common household items, and essential oils are now integral to home wellness routines. This shift has made essential oils accessible to a broader audience.

**3. Clean Beauty Movement**
The cosmetics and personal care industry has embraced essential oils as key ingredients. Consumers are demanding products with natural, recognizable ingredients, and essential oils fit perfectly into this clean beauty narrative.

**4. Sustainable and Ethical Sourcing**
Modern consumers care about where their products come from. Leading essential oil producers are responding with transparent supply chains, sustainable farming practices, and fair trade partnerships with growers worldwide.

**Regional Growth Patterns**
While North America and Europe remain the largest markets, Asia-Pacific is showing the fastest growth rate. Countries like India, China, and Japan have rich traditions of using plant-based remedies, making them fertile ground for essential oil adoption.

**The Future Outlook**
As research continues to validate the benefits of essential oils and new applications emerge, the industry shows no signs of slowing down. From pharmaceutical applications to food and beverage flavoring, essential oils are finding their way into diverse sectors, ensuring sustained demand for years to come.`,
    image: '/images/blog/rising-demand.svg',
    author: 'Dr. Sarah Mitchell',
    date: 'January 5, 2026',
    readTime: '6 min read',
    category: 'Industry Insights'
  },
  {
    id: 2,
    slug: 'art-of-essential-oil-creation',
    title: 'The Art and Science of Essential Oil Creation: From Plant to Bottle',
    excerpt: 'Journey through the fascinating process of extracting pure essential oils, from harvesting aromatic plants to the final bottling of these precious liquids.',
    content: `Creating high-quality essential oils is both an art and a science, requiring expertise in botany, chemistry, and traditional craftsmanship. Understanding this process helps appreciate why pure essential oils are so valuable and effective.

**The Journey Begins: Plant Selection and Harvesting**

The quality of an essential oil starts long before extraction. Factors that influence the final product include:

- **Plant Species**: Different species of the same plant family can produce vastly different oils
- **Growing Conditions**: Soil quality, climate, and altitude all affect oil composition
- **Harvest Timing**: Plants must be harvested at their peak aromatic potential
- **Part Used**: Oils can come from flowers, leaves, bark, roots, or seeds

**Steam Distillation: The Gold Standard**

The most common extraction method is steam distillation, used for about 93% of all essential oils. Here's how it works:

1. **Loading**: Plant material is placed in a still (distillation chamber)
2. **Steam Injection**: Steam passes through the plant material
3. **Vaporization**: Heat causes the aromatic compounds to vaporize
4. **Condensation**: Vapor travels through a cooling system and condenses
5. **Separation**: Oil naturally separates from the water (hydrosol)
6. **Collection**: Pure essential oil is carefully collected

**Cold Press Extraction**

Citrus oils like lemon, orange, and bergamot are extracted through cold pressing. This mechanical method involves:

- Puncturing the oil glands in the fruit peel
- Collecting the released oils
- Centrifuging to separate oil from juice

**Solvent Extraction for Delicate Flowers**

Some flowers, like jasmine and rose, are too delicate for steam distillation. These require solvent extraction:

1. Flowers are placed in a solvent (usually hexane)
2. Aromatic compounds dissolve into the solvent
3. Solvent is removed, leaving a concentrated "concrete"
4. Further processing with alcohol produces the final "absolute"

**Quality Control and Testing**

Reputable producers test their oils using:

- **Gas Chromatography-Mass Spectrometry (GC-MS)**: Identifies chemical compounds
- **Optical Rotation Testing**: Verifies authenticity
- **Refractive Index**: Checks purity
- **Organoleptic Testing**: Expert evaluation of aroma

**From Our Distillery to Your Home**

At E-Oil, we oversee every step of this journey. Our relationships with farmers, our state-of-the-art distillation facilities, and our rigorous testing protocols ensure that every bottle contains pure, potent essential oil worthy of your trust.`,
    image: '/images/blog/oil-extraction.svg',
    author: 'Michael Chen',
    date: 'December 28, 2025',
    readTime: '8 min read',
    category: 'Education'
  },
  {
    id: 3,
    slug: 'essential-oils-wellness-benefits',
    title: 'Unlocking Natural Wellness: The Therapeutic Benefits of Essential Oils',
    excerpt: 'Explore the science-backed benefits of essential oils for physical and emotional well-being, and learn how to incorporate them into your daily wellness routine.',
    content: `Essential oils have been used for thousands of years across cultures for their therapeutic properties. Modern science is now validating what ancient healers knew intuitively—these concentrated plant extracts offer genuine benefits for body and mind.

**Understanding How Essential Oils Work**

Essential oils interact with our bodies through two primary pathways:

1. **Olfactory System**: When inhaled, aromatic molecules travel to the brain's limbic system, affecting emotions, memory, and hormones
2. **Dermal Absorption**: When applied topically (properly diluted), oil compounds can penetrate the skin and enter the bloodstream

**Key Wellness Benefits**

**Stress Relief and Relaxation**
Lavender, chamomile, and ylang-ylang have been extensively studied for their calming effects. Research shows they can:
- Reduce cortisol levels
- Lower heart rate and blood pressure
- Improve sleep quality
- Ease anxiety symptoms

**Energy and Mental Clarity**
Peppermint, rosemary, and citrus oils are natural energizers:
- Enhance alertness and concentration
- Combat mental fatigue
- Improve memory retention
- Boost mood and motivation

**Immune System Support**
Oils like tea tree, eucalyptus, and oregano possess antimicrobial properties:
- Support the body's natural defenses
- Purify the air
- Promote respiratory health
- Aid in seasonal wellness

**Skin and Beauty**
Many essential oils offer skin benefits:
- Tea tree for blemish control
- Frankincense for anti-aging
- Rosehip for hydration
- Lavender for healing

**Pain and Inflammation**
Certain oils help manage discomfort:
- Peppermint for headaches
- Eucalyptus for muscle aches
- Ginger for inflammation
- Wintergreen for joint support

**Safe and Effective Usage**

To enjoy essential oils safely:

- **Dilute Properly**: Always mix with a carrier oil for topical use
- **Patch Test**: Check for sensitivity before full application
- **Quality Matters**: Use only pure, therapeutic-grade oils
- **Consult Experts**: Seek guidance for specific health concerns
- **Start Slowly**: Begin with small amounts and observe effects

**Incorporating Oils into Daily Life**

- **Morning**: Energizing diffuser blend with citrus and peppermint
- **Workday**: Rosemary roller for focus
- **Evening**: Lavender bath for relaxation
- **Bedtime**: Chamomile pillow spray for better sleep

**The Science Continues**

Research into essential oils is expanding rapidly. Studies are exploring their potential in pain management, cognitive function, antimicrobial applications, and even cancer supportive care. While not a replacement for medical treatment, essential oils offer a valuable complementary approach to holistic wellness.

Embrace the power of nature and discover how essential oils can enhance your journey to optimal health and well-being.`,
    image: '/images/blog/wellness-benefits.svg',
    author: 'Dr. Emily Roberts',
    date: 'December 15, 2025',
    readTime: '7 min read',
    category: 'Wellness'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Essential Oil Insights
            </h1>
            <p className="text-lg text-gray-600">
              Discover the latest trends, research, and tips in the world of essential oils and natural wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Featured Story</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
                    {blogPosts[0].category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span>{blogPosts[0].author}</span>
                    <span className="mx-2">•</span>
                    <span>{blogPosts[0].date}</span>
                    <span className="mx-2">•</span>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <button
                    onClick={() => {
                      const element = document.getElementById(`post-${blogPosts[0].id}`);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Read Full Story
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">
              Read Our Stories
            </h2>
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                id={`post-${post.id}`}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  index < blogPosts.length - 1 ? 'mb-12' : ''
                }`}
              >
                <div className="relative h-64 md:h-80">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                      {post.title}
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-6 pb-6 border-b">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-amber-800 font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{post.author}</p>
                      <p>{post.date} • {post.readTime}</p>
                    </div>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    {post.content.split('\n\n').map((paragraph, pIndex) => {
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h4 key={pIndex} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                            {paragraph.replace(/\*\*/g, '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('- ')) {
                        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                        return (
                          <ul key={pIndex} className="list-disc list-inside text-gray-700 space-y-1 my-4">
                            {items.map((item, iIndex) => (
                              <li key={iIndex}>{item.replace('- ', '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (paragraph.match(/^\d\./)) {
                        const items = paragraph.split('\n').filter(line => line.match(/^\d\./));
                        return (
                          <ol key={pIndex} className="list-decimal list-inside text-gray-700 space-y-1 my-4">
                            {items.map((item, iIndex) => (
                              <li key={iIndex}>{item.replace(/^\d\.\s/, '')}</li>
                            ))}
                          </ol>
                        );
                      }
                      // Handle inline bold text
                      const parts = paragraph.split(/(\*\*[^*]+\*\*)/);
                      return (
                        <p key={pIndex} className="text-gray-700 leading-relaxed mb-4">
                          {parts.map((part, partIndex) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={partIndex} className="font-semibold text-gray-900">
                                  {part.replace(/\*\*/g, '')}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-amber-100 mb-8">
              Subscribe to our newsletter for the latest articles, tips, and exclusive offers on essential oils.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
