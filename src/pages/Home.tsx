import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Bell, ArrowRight, User, Calendar, Award, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useFirestore } from '../hooks/useFirestore';
import { Notice, Member } from '../types';
import { orderBy, limit } from 'firebase/firestore';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: notices, loading: noticesLoading } = useFirestore<Notice>('notices');
  
  const hardcodedNotice = { 
    id: 'gb-2025', 
    titleEn: 'GENERAL BODY FOR THE SESSION 2025 – 2026', 
    titleOl: '᱒᱐᱒᱕ – ᱒᱐᱒᱖ ᱥᱮᱥᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱡᱮᱱᱮᱨᱟᱞ ᱵᱚᱰᱤ', 
    date: '2025-11-09', 
    isImportant: true, 
    contentEn: 'All Members are hereby informed that according to our last meeting held on 9th November for the purpose of the new GB member formation was successfully conducted. The new GB members have been elected for the session 2025-2026.', 
    contentOl: 'ᱡᱚᱛᱚ ᱥᱚᱦᱮᱫ ᱠᱚ ᱵᱟᱰᱟᱭ ᱚᱪᱚ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱡᱮ ᱙ ᱱᱚᱵᱷᱮᱢᱵᱚᱨ ᱦᱤᱞᱚᱜ ᱦᱩᱭ ᱟᱠᱟᱱ ᱟᱵᱚᱣᱟᱜ ᱢᱩᱪᱟᱹᱫ ᱜᱟᱞᱢᱟᱨᱟᱣ ᱞᱮᱠᱟᱛᱮ ᱱᱟᱣᱟ ᱡᱤ.ᱵᱤ. ᱥᱚᱦᱮᱫ ᱵᱮᱱᱟᱣ ᱠᱟᱹᱢᱤ ᱱᱟᱯᱟᱭ ᱛᱮ ᱥᱟᱹᱛ ᱟᱠᱟᱱᱟ ᱾ ᱒᱐᱒᱕-᱒᱐᱒᱖ ᱥᱮᱥᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱱᱟᱣᱟ ᱡᱤ.ᱵᱤ. ᱥᱚᱦᱮᱫ ᱠᱚ ᱵᱟᱪᱷᱚᱱ ᱟᱠᱟᱱᱟ ᱾' 
  };

  const displayNotices = [hardcodedNotice, ...notices]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const topMembers = [
    { id: '1', nameEn: 'Shakespear Kisku', nameOl: 'ᱥᱮᱠᱥᱯᱤᱭᱚᱨ ᱠᱤᱥᱠᱩ', designationEn: 'President', designationOl: 'ᱯᱟᱨᱥᱮᱛ', roleEn: 'KGEC', roleOl: 'ᱠᱮ.ᱡᱤ.ᱤ.ᱥᱤ.', photoUrl: 'https://res.cloudinary.com/doq1ara3j/image/upload/v1774261786/WhatsApp_Image_2026-03-23_at_3.59.25_PM_kcpgkv.jpg' },
    { id: '2', nameEn: 'Sandip Hembram', nameOl: 'ᱥᱟᱱᱫᱤᱯ ᱦᱮᱢᱵᱽᱨᱚᱢ', designationEn: 'Vice-President', designationOl: 'ᱩᱯᱚ-ᱯᱟᱨᱥᱮᱛ', roleEn: 'MAKAUT', roleOl: 'ᱢᱟᱠᱟᱣᱩᱴ', photoUrl: 'https://res.cloudinary.com/doq1ara3j/image/upload/v1774261488/WhatsApp_Image_2026-03-23_at_3.54.23_PM_jtwdgc.jpg' },
    { id: '3', nameEn: 'Jharna Murmu', nameOl: 'ᱡᱷᱟᱨᱱᱟ ᱢᱩᱨᱢᱩ', designationEn: 'Vice-President (Ladies)', designationOl: 'ᱩᱯᱚ-ᱯᱟᱨᱥᱮᱛ (ᱠᱩᱲᱤ)', roleEn: 'JGEC', roleOl: 'ᱡᱮ.ᱡᱤ.ᱤ.ᱥᱤ.', photoUrl: 'https://res.cloudinary.com/doq1ara3j/image/upload/v1774267159/WhatsApp_Image_2026-03-23_at_5.29.01_PM_fit1lo.jpg' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden border border-gov-border shadow-sm">
        <img 
          src="https://res.cloudinary.com/doq1ara3j/image/upload/v1774259597/DSC09892_ehkpgj.jpg" 
          alt="SESWA Banner" 
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gov-blue/90 to-transparent flex items-center px-8 md:px-16">
          <div className="max-w-2xl text-white">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-bold leading-tight"
            >
              {t('site_name')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg md:text-xl text-gray-200"
            >
              {t('hero_text')}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Link to="/about" className="bg-gov-accent text-gov-blue px-6 py-3 font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2 w-fit">
                {t('about')} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notice Board */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gov-blue text-white p-3 flex items-center gap-2 rounded-t border-b-4 border-gov-accent">
            <Bell size={20} />
            <h3 className="font-bold uppercase tracking-wider">{t('notice_board')}</h3>
          </div>
          <div className="border border-gov-border rounded-b bg-gov-light h-[400px] overflow-hidden p-4 relative">
            {noticesLoading ? (
              <div className="flex justify-center py-12"><Loader2 className="animate-spin text-gov-blue" /></div>
            ) : displayNotices.length > 0 ? (
              <div className="animate-vertical-marquee space-y-4">
                {/* Duplicate the list for seamless scrolling */}
                {[...displayNotices, ...displayNotices].map((notice, idx) => (
                  <div key={`${notice.id}-${idx}`} className="border-b border-gov-border pb-3 last:border-0">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] bg-gov-blue text-white px-2 py-0.5 rounded uppercase font-bold">
                        {notice.date}
                      </span>
                      {notice.isImportant && (
                        <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded uppercase font-bold animate-pulse">
                          New
                        </span>
                      )}
                    </div>
                    <Link 
                      to="/notices" 
                      className="mt-2 block text-sm font-semibold text-gov-blue hover:text-gov-accent transition-colors"
                    >
                      {language === 'en' ? notice.titleEn : notice.titleOl}
                    </Link>
                    <Link 
                      to="/notices" 
                      className="text-[10px] text-gov-blue font-bold uppercase hover:underline flex items-center gap-0.5 mt-1"
                    >
                      View Details <ArrowRight size={10} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 text-sm py-12">{t('no_notices')}</p>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gov-light p-2 border-t border-gov-border z-10">
              <Link to="/notices" className="block text-center text-gov-blue text-sm font-bold hover:underline">
                {t('view_all')}
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/events" className="group p-6 bg-white border border-gov-border rounded shadow-sm hover:border-gov-blue transition-all">
            <Calendar className="text-gov-blue mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h4 className="text-xl font-bold text-gov-blue mb-2 uppercase">{t('events')}</h4>
            <p className="text-sm text-gray-600">{t('events_desc')}</p>
          </Link>
          <Link to="/achievements" className="group p-6 bg-white border border-gov-border rounded shadow-sm hover:border-gov-blue transition-all">
            <Award className="text-gov-blue mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h4 className="text-xl font-bold text-gov-blue mb-2 uppercase">{t('achievements')}</h4>
            <p className="text-sm text-gray-600">{t('achievements_desc')}</p>
          </Link>
          <Link to="/aims" className="group p-6 bg-white border border-gov-border rounded shadow-sm hover:border-gov-blue transition-all">
            <Bell className="text-gov-blue mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h4 className="text-xl font-bold text-gov-blue mb-2 uppercase">{t('aims')}</h4>
            <p className="text-sm text-gray-600">{t('aims_desc')}</p>
          </Link>
          <Link to="/gallery" className="group p-6 bg-white border border-gov-border rounded shadow-sm hover:border-gov-blue transition-all">
            <User className="text-gov-blue mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h4 className="text-xl font-bold text-gov-blue mb-2 uppercase">{t('gallery')}</h4>
            <p className="text-sm text-gray-600">{t('gallery_desc')}</p>
          </Link>
        </div>
      </div>

      {/* Governing Members Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-bold text-gov-blue uppercase tracking-wider">{t('members')}</h3>
          <div className="flex-grow h-1 bg-gov-border"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topMembers.map((member) => (
            <div key={member.id} className="bg-white border border-gov-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gov-light flex items-center justify-center overflow-hidden">
                <img 
                  src={member.photoUrl} 
                  alt={member.nameEn} 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-lg font-bold text-gov-blue uppercase">{language === 'en' ? member.nameEn : member.nameOl}</h4>
                <p className="text-gov-accent font-semibold text-sm uppercase tracking-widest mt-1">
                  {language === 'en' ? member.designationEn : member.designationOl}
                </p>
                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                  {language === 'en' ? member.roleEn : member.roleOl}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/members" className="text-gov-blue font-bold hover:underline uppercase tracking-wider">
            {t('view_all_members')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
