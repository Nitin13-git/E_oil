import Link from 'next/link';

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


  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/hero-about.png"
          alt="About Us Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content */}
        <div className="container relative z-20 h-full flex items-center justify-center">
          <div className="max-w-3xl mx-auto text-center text-gray-900">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
              About Vedanta Oils
            </h1>
            <p className="text-xl text-gray-700 text-center font-medium">
              Dedicated to bringing you 100% pure, GC/MS tested essential oils sourced from the finest botanicals worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[var(--color-primary)] font-medium">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                A New Standard for Botanical Integrity
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Vedanta Oils was born out of a single, modern frustration: the difficulty of finding 100% pure, traceable essential oils in a market filled with "blends" and synthetic shortcuts.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                As a boutique, newly-established distillery and sourcing partner, we don't aim to be the biggest—we aim to be the most transparent. Because we are starting fresh, we have built our entire process around today’s strictest international standards from day one.
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
              <div className="bg-[var(--color-muted)] rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '43+', label: 'Premium Products' },
                    { number: '100%', label: 'Pure & Natural' },
                    { number: 'GC/MS', label: 'Tested Quality' },
                    { number: '10K+', label: 'Happy Customers' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-3xl font-bold text-[var(--color-primary)]">{stat.number}</div>
                      <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--color-accent)] rounded-full opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--color-primary)] font-medium">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              From Flora to Fluid
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { step: '01', title: 'Ethical Harvesting', desc: 'We partner with heritage farms to gather botanicals at their peak potency.', img: '/images/process/process-1.png' },
              { step: '02', title: 'Artisanal Distillation', desc: 'Low-heat steam distillation preserves the complex aromatic profile of every plant.', img: '/images/process/process-2.png' },
              { step: '03', title: 'Scientific Integrity', desc: 'Every batch is GC/MS verified to ensure 100% purity and zero synthetic additives.', img: '/images/process/process-3.png' },
              { step: '04', title: 'Sun-Safe Protection', desc: 'Sealed in apothecary-grade amber glass to lock in therapeutic frequency.', img: '/images/process/process-4.png' },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto mb-8">
                  <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full translate-x-3 translate-y-3 opacity-20 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-[var(--color-muted)]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--color-primary)] font-medium">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              The Vedanta Oil Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm card-hover">
                <div className="text-4xl mb-4 text-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Quality Commitment */}
      <section className="section-padding bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--color-accent)] font-medium">Quality Commitment</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Our Testing Standards
            </h2>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              Every batch of Vedanta Oil essential oils undergoes comprehensive testing
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
                <div className="w-12 h-12 bg-[var(--color-accent)] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <span className="text-[var(--color-primary)] font-medium">Certifications</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Quality You Can Trust
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {['GMP Certified', 'ISO 9001:2015', '100% Natural', 'Cruelty Free', 'Eco-Friendly'].map((cert, index) => (
              <div key={index} className="flex items-center gap-3 bg-[var(--color-muted)] px-6 py-4 rounded-full">
                <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
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

      {/* Company Founders Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[var(--color-primary)] font-medium">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Company Founders
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The visionaries behind Vedanta Oil, dedicated to integrity and the pursuit of botanical Excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: 'Founders Name',
                role: 'Co-Founder & CEO',
                img: '/images/founder-1.png',
                bio: 'Passionate about sustainable sourcing and the therapeutic potential of pure essential oils.'
              },
              {
                name: 'Founders Name',
                role: 'Co-Founder & COO',
                img: '/images/founder-2.png',
                bio: 'Ensuring every drop meets our rigorous quality standards through artisanal distillation and testing.'
              },
            ].map((founder, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6">
                  <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full translate-x-2 translate-y-2 opacity-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={founder.img}
                      alt={founder.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{founder.name}</h3>
                <p className="text-[var(--color-primary)] font-medium mb-4">{founder.role}</p>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[var(--color-muted)]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--color-primary)] font-medium">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Are your essential oils 100% pure?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! All Vedanta Oil essential oils are 100% pure, therapeutic-grade oils with no synthetic additives, fillers, or carrier oils. Each batch is GC/MS tested and we provide Certificate of Analysis for transparency.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What does GC/MS tested mean?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                GC/MS (Gas Chromatography-Mass Spectrometry) is the gold standard for testing essential oil purity. It identifies and quantifies each chemical component in the oil to verify authenticity and detect any adulterants.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Do you offer wholesale or bulk pricing?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! We offer competitive wholesale pricing for aromatherapists, spa owners, retailers, and businesses. Contact us with your requirements and we will provide customized pricing.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                How should I store essential oils?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Store essential oils in a cool, dark place away from direct sunlight. Keep bottles tightly closed when not in use. Most essential oils have a shelf life of 1-3 years when stored properly.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What is your shipping policy?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We ship across India. Orders are dispatched within 1-2 business days. Standard shipping takes 4-7 business days. We use secure packaging to ensure your oils arrive in perfect condition.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Do you offer returns or refunds?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We offer a satisfaction guarantee. If you receive a damaged product or are not satisfied with the quality, please contact us within 7 days of delivery and we will resolve the issue.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
