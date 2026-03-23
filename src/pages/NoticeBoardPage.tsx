import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Bell, Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { Notice } from '../types';
import { orderBy } from 'firebase/firestore';

const NoticeBoardPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: notices, loading } = useFirestore<Notice>('notices', [orderBy('date', 'desc')]);

  const officialNotices = [
    { 
      id: 'gb-2025', 
      titleEn: 'GENERAL BODY FOR THE SESSION 2025 – 2026', 
      titleOl: '᱒᱐᱒᱕ – ᱒᱐᱒᱖ ᱥᱮᱥᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱡᱮᱱᱮᱨᱟᱞ ᱵᱚᱰᱤ', 
      date: '2025-11-09', 
      isImportant: true, 
      contentEn: 'All Members are hereby informed that according to our last meeting held on 9th November for the purpose of the new GB member formation was successfully conducted. The new GB members have been elected for the session 2025-2026.', 
      contentOl: 'ᱡᱚᱛᱚ ᱥᱚᱦᱮᱫ ᱠᱚ ᱵᱟᱰᱟᱭ ᱚᱪᱚ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱡᱮ ᱙ ᱱᱚᱵᱷᱮᱢᱵᱚᱨ ᱦᱤᱞᱚᱜ ᱦᱩᱭ ᱟᱠᱟᱱ ᱟᱵᱚᱣᱟᱜ ᱢᱩᱪᱟᱹᱫ ᱜᱟᱞᱢᱟᱨᱟᱣ ᱞᱮᱠᱟᱛᱮ ᱱᱟᱣᱟ ᱡᱤ.ᱵᱤ. ᱥᱚᱦᱮᱫ ᱵᱮᱱᱟᱣ ᱠᱟᱹᱢᱤ ᱱᱟᱯᱟᱭ ᱛᱮ ᱥᱟᱹᱛ ᱟᱠᱟᱱᱟ ᱾ ᱒᱐᱒᱕-᱒᱐᱒᱖ ᱥᱮᱥᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱱᱟᱣᱟ ᱡᱤ.ᱵᱤ. ᱥᱚᱦᱮᱫ ᱠᱚ ᱵᱟᱪᱷᱚᱱ ᱟᱠᱟᱱᱟ ᱾' 
    },
    ...notices
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">{t('notice_board')}</h2>
          <div className="flex-grow h-1 bg-gov-border"></div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-gov-blue" /></div>
          ) : officialNotices.length > 0 ? (
            officialNotices.map((notice) => (
              <div key={notice.id} className="bg-white border border-gov-border rounded-lg p-6 shadow-sm hover:border-gov-blue transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gov-blue text-white p-2 rounded-full group-hover:bg-gov-accent group-hover:text-gov-blue transition-colors">
                      <Bell size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-gov-blue uppercase">
                      {language === 'en' ? notice.titleEn : notice.titleOl}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <Calendar size={14} /> {notice.date}
                    {notice.isImportant && (
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded animate-pulse">Important</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {language === 'en' ? notice.contentEn : notice.contentOl}
                </p>
                {notice.link ? (
                  <a href={notice.link} target="_blank" rel="noopener noreferrer" className="text-gov-blue font-bold text-sm uppercase flex items-center gap-1 hover:underline">
                    Read More <ChevronRight size={16} />
                  </a>
                ) : (
                  <button className="text-gov-blue font-bold text-sm uppercase flex items-center gap-1 hover:underline">
                    Read More <ChevronRight size={16} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-12">No notices found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default NoticeBoardPage;
