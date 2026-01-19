'use client';

import { useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Claire Bellefeuille',
    date: 'January 09, 2026',
    title: 'Great products, good service and delivery.',
    content: 'Great products, good service and delivery.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ruth',
    date: 'January 08, 2026',
    title: 'Smooth Transaction',
    content: 'Transaction was smooth..order placed online and ready in less than 2 days, easy pick up from the counter',
    rating: 5,
  },
  {
    id: 3,
    name: "Audra's life Styles",
    date: 'January 08, 2026',
    title: 'Great Quality',
    content: "Great Quality. I'm moving my business sourcing from the USA to this company and I'm very impressed. The oil quality is excellent... everything was wrapped with incredible care.",
    rating: 5,
  },
  {
    id: 4,
    name: 'M.',
    date: 'January 08, 2026',
    title: 'Positive Experience',
    content: 'Always a positive experience of shopping at Vedanta Oils. Good quality, affordable oils, quick and reliable service. Highly recommended!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Carolynne Mason',
    date: 'January 08, 2026',
    title: 'Quick Delivery',
    content: "Vedanta Oils offers quick delivery, organic products and good prices. I don't use any other essential oils.",
    rating: 5,
  },
  {
    id: 6,
    name: 'Sarah Mitchell',
    date: 'January 07, 2026',
    title: 'Exceptional Quality',
    content: 'The quality of Vedanta Oils products is exceptional. As a professional aromatherapist, I rely on pure, high-quality oils for my practice.',
    rating: 5,
  },
  {
    id: 7,
    name: 'Paula B.',
    date: 'January 07, 2026',
    title: 'Great service and products',
    content: 'Great service and products. I have been ordering from this company for a while now and I am always satisfied.',
    rating: 5,
  },
  {
    id: 8,
    name: 'Nadia C.',
    date: 'January 06, 2026',
    title: 'Love ordering on the website',
    content: 'Love ordering on the website very easy. The products are great and the delivery is always on time.',
    rating: 5,
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Width of card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="w-full px-12 relative">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 px-2 text-center">Company Reviews</h2>

        <div className="relative group">
          {/* Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-600 transition-colors focus:outline-none"
            aria-label="Previous reviews"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-[220px] w-[220px] bg-[#F9F9F9] border border-gray-100 rounded-[4px] p-5 flex flex-col items-start text-left snap-start shrink-0 h-[224px] hover:shadow-sm transition-shadow"
              >
                {/* Header: Name and Date */}
                <div className="mb-2 w-full">
                  <h3 className="font-bold text-gray-900 text-[14px]">{testimonial.name}</h3>
                  <p className="text-gray-400 text-[11px] mt-0.5">{testimonial.date}</p>
                </div>

                {/* Stars */}
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-orange-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Content */}
                <div className="w-full">
                  <h4 className="font-bold text-gray-900 text-[13px] mb-1 line-clamp-2 leading-tight">{testimonial.title}</h4>
                  <p className="text-gray-600 text-[13px] leading-relaxed line-clamp-5">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-600 transition-colors focus:outline-none"
            aria-label="Next reviews"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
