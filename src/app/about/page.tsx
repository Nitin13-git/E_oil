import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

export default function AboutPage() {
  const team = [
    {
      name: 'Soham Katiyar',
      role: 'Co-Founder & CEO',
      bio: 'Visionary entrepreneur passionate about bringing pure, natural wellness products to everyone.',
    },
    {
      name: 'Nitin Kushwaha',
      role: 'Co-Founder & CTO',
      bio: 'Tech innovator combining traditional aromatherapy wisdom with modern e-commerce excellence.',
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Head of Quality',
      bio: 'Ayurvedic specialist ensuring our products meet the highest purity standards.',
    },
    {
      name: 'Rahul Verma',
      role: 'Operations Lead',
      bio: 'Supply chain expert dedicated to ethical sourcing and sustainable practices.',
    },
  ];

  const milestones = [
    { year: '2022', event: 'Botanica Bliss founded by Soham Katiyar & Nitin Kushwaha' },
    { year: '2023', event: 'Launched first product line with 50+ essential oils' },
    { year: '2024', event: 'Expanded to serve customers across India' },
    { year: '2024', event: 'Achieved quality certifications for all products' },
    { year: '2025', event: 'Launched sustainable packaging initiative' },
    { year: '2025', event: 'Growing community of 10,000+ happy customers' },
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
            Our Story
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Dedicated to bringing you the purest essential oils from nature&apos;s finest botanicals,
            crafted with expertise and delivered with care.
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
                Pure Nature, Pure Wellness
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At EssenceOils, we believe that nature holds the key to holistic wellness.
                Our mission is to make the purest, most potent essential oils accessible to
                everyone, while respecting the environment and supporting sustainable farming
                communities around the world.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every drop of our essential oils is carefully extracted using time-honored
                techniques, ensuring that the therapeutic properties of each plant are
                preserved in their most natural form.
              </p>
              <div className="flex gap-4">
                <Link href="/products" className="btn-primary">
                  Explore Products
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
                    { number: '15+', label: 'Years of Excellence' },
                    { number: '500+', label: 'Premium Products' },
                    { number: '120+', label: 'Countries Served' },
                    { number: '50K+', label: 'Happy Customers' },
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

      {/* Values Section */}
      <section className="section-padding bg-[var(--muted)]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--primary)] font-medium">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌱',
                title: 'Purity',
                description: 'We never compromise on quality. Every product is 100% pure, with no synthetic additives or fillers.',
              },
              {
                icon: '🌍',
                title: 'Sustainability',
                description: 'From sustainable sourcing to eco-friendly packaging, we minimize our environmental footprint.',
              },
              {
                icon: '🤝',
                title: 'Integrity',
                description: 'We maintain complete transparency in our sourcing, testing, and manufacturing processes.',
              },
              {
                icon: '💚',
                title: 'Wellness',
                description: 'We are dedicated to promoting holistic health and well-being through the power of aromatherapy.',
              },
              {
                icon: '🔬',
                title: 'Quality',
                description: 'Rigorous testing and quality control ensure every batch meets our exacting standards.',
              },
              {
                icon: '❤️',
                title: 'Community',
                description: 'We support farming communities and share knowledge to help others on their wellness journey.',
              },
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm card-hover">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--primary)] font-medium">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Milestones Along the Way
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

      {/* Team Section */}
      <section className="section-padding bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[var(--accent)] font-medium">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              The People Behind EssenceOils
            </h2>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              Our passionate team of experts brings together decades of experience in
              aromatherapy, botanical science, and sustainable business practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--accent)] mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-[var(--primary)]">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-[var(--accent)] text-sm mb-2">{member.role}</p>
                <p className="text-white/70 text-sm">{member.bio}</p>
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
            {['ISO 9001:2015', 'GMP Certified', 'USDA Organic', 'Cruelty Free', 'Fair Trade'].map((cert, index) => (
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
