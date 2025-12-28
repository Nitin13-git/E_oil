import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

export default function AboutPage() {
  const values = [
    {
      icon: '🌿',
      title: 'Purity First',
      description: 'We never compromise on quality. Every product is 100% pure, with no synthetic additives, fillers, or adulterants.',
    },
    {
      icon: '🔬',
      title: 'GC/MS Tested',
      description: 'Every batch undergoes rigorous Gas Chromatography-Mass Spectrometry testing to verify purity and composition.',
    },
    {
      icon: '🌍',
      title: 'Ethically Sourced',
      description: 'We partner with sustainable farms worldwide to source the finest botanicals while supporting local communities.',
    },
    {
      icon: '💚',
      title: 'Therapeutic Grade',
      description: 'Our oils meet therapeutic standards, ensuring maximum potency and effectiveness for aromatherapy use.',
    },
    {
      icon: '📋',
      title: 'Full Transparency',
      description: 'We provide Certificate of Analysis (COA) for all products so you know exactly what you are getting.',
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'We ship across India with secure packaging to ensure your essential oils arrive in perfect condition.',
    },
  ];

  const milestones = [
    { year: '2020', event: 'Vedanta Oils founded with a mission to bring pure essential oils to India' },
    { year: '2021', event: 'Launched first product line with 25+ therapeutic-grade essential oils' },
    { year: '2022', event: 'Established partnerships with sustainable farms across multiple continents' },
    { year: '2023', event: 'Achieved GMP certification and expanded product range to 50+ oils' },
    { year: '2024', event: 'Reached 10,000+ happy customers and launched eco-friendly packaging' },
    { year: '2025', event: 'Introduced premium blends and expanded to serve customers across South Asia' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-pattern)" />
          </svg>
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About Vedanta Oils
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Dedicated to bringing you 100% pure, GC/MS tested essential oils
            sourced from the finest botanicals worldwide.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[var(--primary)] font-medium">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Pure Essential Oils for Natural Wellness
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Vedanta Oils, we believe that nature provides the purest solutions for wellness.
                Our mission is to make authentic, therapeutic-grade essential oils accessible to
                everyone in India and beyond, while maintaining the highest standards of quality
                and purity.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every bottle of Vedanta Oils contains 100% pure essential oil, steam-distilled or
                cold-pressed using traditional methods that preserve the natural therapeutic
                properties of each plant. We never use synthetic fragrances, fillers, or carrier
                oils in our pure essential oils.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our commitment to quality means every batch is GC/MS tested to verify its
                chemical composition and purity. We provide full transparency with Certificate
                of Analysis available for all our products.
              </p>
              <div className="flex gap-4">
                <Link href="/products" className="btn-primary">
                  Shop Essential Oils
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[var(--muted)] rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '43+', label: 'Premium Products' },
                    { number: '100%', label: 'Pure & Natural' },
                    { number: 'GC/MS', label: 'Tested Quality' },
                    { number: '10K+', label: 'Happy Customers' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-3xl font-bold text-[var(--primary)]">{stat.number}</div>
                      <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--accent)] rounded-full opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-[var(--muted)]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--primary)] font-medium">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              The Vedanta Oils Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm card-hover">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--primary)] font-medium">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              From Plant to Bottle
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sourcing', desc: 'We source botanicals from sustainable farms known for producing the finest quality plants.' },
              { step: '02', title: 'Extraction', desc: 'Using steam distillation or cold pressing to extract pure essential oils without chemicals.' },
              { step: '03', title: 'Testing', desc: 'Every batch undergoes GC/MS testing to verify purity, potency, and chemical composition.' },
              { step: '04', title: 'Bottling', desc: 'Oils are carefully bottled in dark amber glass to protect from light degradation.' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-[var(--muted)]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--primary)] font-medium">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Building Trust, One Drop at a Time
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[var(--primary)]/20 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="text-lg font-semibold text-[var(--primary)]">{milestone.year}</div>
                  <p className="text-gray-600 mt-1">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="section-padding bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--accent)] font-medium">Quality Commitment</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Our Testing Standards
            </h2>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              Every batch of Vedanta Oils essential oils undergoes comprehensive testing
              to ensure you receive only the purest, highest-quality products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'GC/MS Testing', desc: 'Gas Chromatography-Mass Spectrometry analysis for chemical composition verification' },
              { title: 'Purity Analysis', desc: 'Testing to ensure no synthetic additives, fillers, or adulterants' },
              { title: 'Microbial Testing', desc: 'Safety testing for bacteria, yeast, and mold contamination' },
              { title: 'Heavy Metal Testing', desc: 'Screening for harmful heavy metals to ensure product safety' },
            ].map((test, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{test.title}</h3>
                <p className="text-white/70 text-sm">{test.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--primary)] font-medium">Certifications</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Quality You Can Trust
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {['GMP Certified', 'ISO 9001:2015', '100% Natural', 'Cruelty Free', 'Eco-Friendly'].map((cert, index) => (
              <div key={index} className="flex items-center gap-3 bg-[var(--muted)] px-6 py-4 rounded-full">
                <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
