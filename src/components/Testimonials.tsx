'use client';

import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Aromatherapist',
    image: null,
    content: 'The quality of EssenceOils products is exceptional. As a professional aromatherapist, I rely on pure, high-quality oils for my practice. Their lavender and eucalyptus oils are my absolute favorites.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Wellness Coach',
    image: null,
    content: 'I have been using EssenceOils for my wellness center for over 2 years. The consistency in quality and the wide range of products they offer is unmatched. Highly recommended!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Spa Owner',
    image: null,
    content: 'Our spa clients love the essential oils we use from EssenceOils. The purity is noticeable, and the customer service team is always helpful and responsive.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Home User',
    image: null,
    content: 'Started my aromatherapy journey with EssenceOils starter kit. The quality exceeded my expectations. My home has never smelled better, and I feel more relaxed than ever.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-padding bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-[var(--accent)] font-medium">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            What Our Customers Say
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the power of pure essential oils.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
              &ldquo;{testimonials[activeIndex].content}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--primary)] font-bold text-xl">
                {testimonials[activeIndex].name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-lg">{testimonials[activeIndex].name}</div>
                <div className="text-white/70">{testimonials[activeIndex].role}</div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-[var(--accent)] w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
