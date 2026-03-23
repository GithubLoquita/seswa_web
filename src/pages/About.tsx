import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">{t('about')}</h2>
          <div className="flex-grow h-1 bg-gov-border"></div>
        </div>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p>
            The Santal Engineering Students' Welfare Association (W.B.), commonly known as SESWA, is a premier non-profit organization dedicated to the upliftment and welfare of Santal engineering students across West Bengal. Established in 2003, the association has been a beacon of hope, unity, and cultural pride for over two decades.
          </p>
          
          <p>
            Our journey began with a small group of visionary engineering students who recognized the unique challenges faced by tribal students in technical education. They envisioned a platform where students could support each other academically, financially, and emotionally while staying rooted in their rich Santal heritage.
          </p>
          
          <div className="bg-gov-light p-8 border-l-4 border-gov-blue rounded shadow-sm italic">
            "To empower Santal engineering students through unity, academic excellence, and cultural preservation, ensuring they become leaders who contribute meaningfully to society while honoring their roots."
          </div>
          
          <p>
            Over the years, SESWA has grown into a robust network connecting students from various engineering colleges, universities, and professional institutes. We organize annual events like the Annual Picnic and Freshers Welcome, which serve as vital platforms for networking, mentorship, and cultural expression.
          </p>
          
          <p>
            Beyond social gatherings, SESWA is deeply committed to academic success. We recognize and reward top performers in prestigious entrance exams like WBJEE, IITJEE, and AIEEE, inspiring the next generation to aim higher. Our members actively participate in community service, awareness programs, and advocacy for tribal rights in education.
          </p>
          
          <p>
            As we move forward, SESWA continues to adapt to the changing landscape of engineering education while remaining steadfast in its core values. We invite all Santal engineering students and well-wishers to join us in our mission to build a stronger, more empowered community.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gov-border p-8 rounded shadow-sm">
          <h3 className="text-xl font-bold text-gov-blue uppercase mb-4 border-b border-gov-border pb-2">Our Vision</h3>
          <p className="text-gray-600">To be the leading welfare association that transforms the lives of Santal engineering students, fostering a community of excellence, integrity, and cultural pride.</p>
        </div>
        <div className="bg-white border border-gov-border p-8 rounded shadow-sm">
          <h3 className="text-xl font-bold text-gov-blue uppercase mb-4 border-b border-gov-border pb-2">Our Mission</h3>
          <p className="text-gray-600">To provide a supportive environment for academic growth, financial assistance, and cultural preservation, empowering our members to excel in their professional and personal lives.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
