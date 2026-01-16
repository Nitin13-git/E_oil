'use client';

import { useState } from 'react';
import Image from 'next/image';

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
    author: 'Soham',
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
    author: 'Nitin',
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
    author: 'Soham',
    date: 'December 15, 2025',
    readTime: '7 min read',
    category: 'Wellness'
  }
];

// Component to render content with markdown-like formatting
function RenderContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none">
      {content.split('\n\n').map((paragraph, pIndex) => {
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
  );
}

// Blog Card Component
function BlogCard({ post, isExpanded, onToggle }: { post: BlogPost; isExpanded: boolean; onToggle: () => void }) {
  return (
    <article
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? 'col-span-full' : ''
      }`}
    >
      {/* Card Header - Always visible */}
      <div
        className={`cursor-pointer ${isExpanded ? '' : 'hover:shadow-xl transition-shadow'}`}
        onClick={onToggle}
      >
        <div className={`relative ${isExpanded ? 'h-72 md:h-96' : 'h-48 md:h-56'} transition-all duration-500`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-medium mb-2">
              {post.category}
            </span>
            <h3 className={`font-serif font-bold text-white ${isExpanded ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'} transition-all duration-300`}>
              {post.title}
            </h3>
          </div>
          {/* Expand/Collapse indicator */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <svg
              className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Preview info - Always visible */}
        <div className="p-6">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-amber-800 font-bold text-xs">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="font-medium text-gray-700">{post.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{post.date}</span>
              <span className="text-amber-600">{post.readTime}</span>
            </div>
          </div>

          {!isExpanded && (
            <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
          )}

          {!isExpanded && (
            <div className="mt-4 flex items-center text-amber-600 font-medium">
              <span>Read more</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-8 border-t border-gray-100">
          <div className="pt-6">
            <RenderContent content={post.content} />
          </div>

          {/* Close button */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Collapse Article
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  const handleToggle = (postId: number) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
      // Scroll to the post after a small delay to allow expansion animation
      setTimeout(() => {
        const element = document.getElementById(`post-${postId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

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
            <p className="text-sm text-gray-500 mt-4">
              Click on any article to expand and read the full story
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`grid gap-8 transition-all duration-500 ${
              expandedPostId ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  id={`post-${post.id}`}
                  className={`${expandedPostId && expandedPostId !== post.id ? 'hidden' : ''}`}
                >
                  <BlogCard
                    post={post}
                    isExpanded={expandedPostId === post.id}
                    onToggle={() => handleToggle(post.id)}
                  />
                </div>
              ))}
            </div>

            {/* Show "Back to all articles" when one is expanded */}
            {expandedPostId && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setExpandedPostId(null)}
                  className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  View All Articles
                </button>
              </div>
            )}
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
