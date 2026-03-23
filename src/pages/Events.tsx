import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Users, Image as ImageIcon } from 'lucide-react';

const Events: React.FC = () => {
  const { t, language } = useLanguage();

  const events = [
    {
      id: '1',
      titleEn: 'Annual Picnic',
      titleOl: 'ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱯᱤᱠᱱᱤᱠ',
      month: 'January',
      descriptionEn: 'A grand gathering of Santal engineering students from across West Bengal to celebrate unity and culture in a natural setting.',
      descriptionOl: 'ᱥᱟᱱᱛᱟᱲ ᱤᱱᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ᱢᱤᱫ ᱢᱟᱨᱟᱝ ᱡᱟᱣᱨᱟ, ᱡᱟᱦᱟᱸ ᱨᱮ ᱡᱩᱢᱤᱫᱽ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱨᱮᱱᱟᱜ ᱨᱟᱹᱥᱠᱟᱹ ᱢᱟᱱᱟᱣ ᱦᱩᱭᱩᱜᱼᱟ ᱾',
      image: 'https://res.cloudinary.com/doq1ara3j/image/upload/v1774260308/WhatsApp_Image_2025-07-01_at_21.13.22_24f9b261_yuem3t.jpg',
      highlightsEn: ['Cultural Performances', 'Traditional Food', 'Networking Sessions'],
      highlightsOl: ['ᱞᱟᱠᱪᱟᱨ ᱮᱱᱮᱡ ᱥᱮᱨᱮᱧ', 'ᱟᱹᱨᱤᱪᱟᱹᱞᱤ ᱡᱚᱢᱟᱜ', 'ᱱᱮᱴᱣᱟᱨᱠᱤᱝ ᱥᱮᱥᱚᱱ'],
    },
    {
      id: '2',
      titleEn: 'Freshers Welcome',
      titleOl: 'ᱱᱟᱣᱟ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱟᱛᱟᱝ ᱫᱟᱨᱟᱢ',
      month: 'October',
      descriptionEn: 'Welcoming the new batch of engineering students into our community, providing them with guidance and a sense of belonging.',
      descriptionOl: 'ᱱᱟᱣᱟ ᱤᱱᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱟᱵᱚᱣᱟᱜ ᱜᱟᱶᱛᱟ ᱨᱮ ᱟᱛᱟᱝ ᱫᱟᱨᱟᱢ, ᱩᱱᱠᱩ ᱫᱤᱥᱟᱹ ᱟᱨ ᱟᱯᱱᱟᱨ ᱢᱚᱱᱮ ᱮᱢ ᱾',
      image: 'https://res.cloudinary.com/doq1ara3j/image/upload/v1774260303/DSC00313_hny7hp.jpg',
      highlightsEn: ['Orientation Program', 'Senior-Junior Interaction', 'Talent Showcase'],
      highlightsOl: ['ᱳᱨᱤᱭᱮᱱᱴᱮᱥᱚᱱ ᱯᱨᱳᱜᱽᱨᱟᱢ', 'ᱥᱤᱱᱤᱭᱚᱨ-ᱡᱩᱱᱤᱭᱚᱨ ᱨᱚᱯᱚᱲ', 'ᱦᱩᱱᱟᱹᱨ ᱩᱫᱩᱜ'],
    }
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">{t('events')}</h2>
          <div className="flex-grow h-1 bg-gov-border"></div>
        </div>

        <div className="space-y-12">
          {events.map((event) => (
            <div key={event.id} className="bg-white border border-gov-border rounded-lg overflow-hidden shadow-sm flex flex-col lg:flex-row">
              <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.titleEn} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:w-1/2 p-8 space-y-4">
                <div className="flex items-center gap-2 text-gov-accent font-bold uppercase tracking-widest text-sm">
                  <Calendar size={16} /> {event.month}
                </div>
                <h3 className="text-2xl font-bold text-gov-blue uppercase">
                  {language === 'en' ? event.titleEn : event.titleOl}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'en' ? event.descriptionEn : event.descriptionOl}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-bold text-gov-blue text-sm uppercase tracking-wider">Highlights:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(language === 'en' ? event.highlightsEn : event.highlightsOl).map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gov-accent rounded-full"></div>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex gap-4">
                  <button className="bg-gov-blue text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-gov-accent hover:text-gov-blue transition-colors flex items-center gap-2">
                    <ImageIcon size={16} /> View Gallery
                  </button>
                  <button className="border border-gov-blue text-gov-blue px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-gov-blue hover:text-white transition-colors">
                    Archive
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Year-wise Archive Placeholder */}
      <section className="bg-gov-light p-8 rounded border border-gov-border">
        <h3 className="text-xl font-bold text-gov-blue uppercase mb-6 text-center">Event Archive</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
            <button key={year} className="bg-white border border-gov-border px-6 py-2 rounded font-bold text-gov-blue hover:bg-gov-blue hover:text-white transition-all shadow-sm">
              {year}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
