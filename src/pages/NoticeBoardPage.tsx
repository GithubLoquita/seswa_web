import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Bell, Calendar, ChevronRight, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { Notice } from '../types';
import { orderBy } from 'firebase/firestore';

const NoticeItem: React.FC<{ notice: any }> = ({ notice }) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const content = language === 'en' ? notice.contentEn : notice.contentOl;
  const isLongContent = content.length > 200;
  const displayContent = isExpanded ? content : (isLongContent ? content.substring(0, 200) + '...' : content);

  return (
    <div className="bg-white border border-gov-border rounded-lg p-6 shadow-sm hover:border-gov-blue transition-all group">
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
      <p className="text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap">
        {displayContent}
      </p>
      {isLongContent && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gov-blue font-bold text-sm uppercase flex items-center gap-1 hover:underline"
        >
          {isExpanded ? 'Show Less' : 'Read More'} 
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      )}
      {!isLongContent && notice.link && (
        <a href={notice.link} target="_blank" rel="noopener noreferrer" className="text-gov-blue font-bold text-sm uppercase flex items-center gap-1 hover:underline">
          External Link <ChevronRight size={16} />
        </a>
      )}
    </div>
  );
};

const NoticeBoardPage: React.FC = () => {
  const { t } = useLanguage();
  const { data: notices, loading, error } = useFirestore<Notice>('notices');

  const hardcodedNotice = { 
    id: 'gb-2025', 
    titleEn: 'GENERAL BODY FOR THE SESSION 2025 – 2026', 
    titleOl: '᱒᱐᱒᱕ – ᱒᱐᱒᱖ ᱥᱮᱥᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱡᱮᱱᱮᱨᱟᱞ ᱵᱚᱰᱤ', 
    date: '2025-11-09', 
    isImportant: true, 
    contentEn: 'All Members are hereby informed that according to our last meeting held on 9th November for the purpose of the new GB member formation was successfully conducted. The new GB members have been elected for the session 2025-2026.', 
    contentOl: 'ᱡᱚᱛᱚ ᱥᱚᱦᱮᱫ ᱠᱚ ᱵᱟᱰᱟᱭ ᱚᱪᱚ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱡᱮ ᱙ ᱱᱚᱵᱷᱮᱢᱵᱚᱨ ᱦᱤᱞᱚᱜ ᱦᱩᱭ ᱟᱠᱟᱱ ᱟᱵᱚᱣᱟᱜ ᱢᱩᱪᱟᱹᱫ ᱜᱟᱞᱢᱟᱨᱟᱣ ᱞᱮᱠᱟᱛᱮ ᱱᱟᱣᱟ ᱡᱤ.ᱵᱤ. ᱥᱚᱦᱮᱫ ᱵᱮᱱᱟᱣ ᱠᱟᱹᱢᱤ ᱱᱟᱯᱟᱭ ᱛᱮ ᱥᱟᱹᱛ ᱟᱠᱟᱱᱟ ᱾ ᱒᱐᱒᱕-᱒᱐᱒᱖ ᱥᱮᱥᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱱᱟᱣᱟ ᱡᱤ.ᱵᱤ. ᱥᱚᱦᱮᱫ ᱠᱚ ᱵᱟᱪᱷᱚᱱ ᱟᱠᱟᱱᱟ ᱾' 
  };

  const allNotices = [hardcodedNotice, ...notices].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">{t('notice_board')}</h2>
          <div className="flex-grow h-1 bg-gov-border"></div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">Error loading notices: {error}</p>
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-gov-blue" /></div>
          ) : allNotices.length > 0 ? (
            allNotices.map((notice) => (
              <NoticeItem key={notice.id} notice={notice} />
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
