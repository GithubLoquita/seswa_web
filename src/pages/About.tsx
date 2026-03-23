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
            {t('about_p1')}
          </p>
          
          <p>
            {t('about_p2')}
          </p>
          
          <div className="bg-gov-light p-8 border-l-4 border-gov-blue rounded shadow-sm italic">
            {t('about_quote')}
          </div>
          
          <p>
            {t('about_p3')}
          </p>
          
          <p>
            {t('about_p4')}
          </p>
          
          <p>
            {t('about_p5')}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gov-border p-8 rounded shadow-sm">
          <h3 className="text-xl font-bold text-gov-blue uppercase mb-4 border-b border-gov-border pb-2">{t('vision')}</h3>
          <p className="text-gray-600">{t('vision_desc')}</p>
        </div>
        <div className="bg-white border border-gov-border p-8 rounded shadow-sm">
          <h3 className="text-xl font-bold text-gov-blue uppercase mb-4 border-b border-gov-border pb-2">{t('mission')}</h3>
          <p className="text-gray-600">{t('mission_desc')}</p>
        </div>
      </section>
    </div>
  );
};

export default About;
