import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, Shield, Users, BookOpen, Heart, Globe, Award, Briefcase, GraduationCap, Scale, Zap, Landmark } from 'lucide-react';

const Aims: React.FC = () => {
  const { t, language } = useLanguage();

  const objectives = [
    { id: 1, icon: <Users size={24} />, titleEn: 'Unity and Brotherhood', titleOl: 'ᱢᱤᱫ ᱡᱩᱢᱤᱫᱽ ᱟᱨ ᱵᱚᱭᱦᱟ ᱥᱟᱹᱜᱟᱹᱭ', descEn: 'To foster a sense of unity and brotherhood among Santal engineering students.', descOl: 'ᱥᱟᱱᱛᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱢᱩᱫᱽ ᱨᱮ ᱢᱤᱫ ᱡᱩᱢᱤᱫᱽ ᱟᱨ ᱵᱚᱭᱦᱟ ᱥᱟᱹᱜᱟᱹᱭ ᱛᱮᱭᱟᱨ ᱾' },
    { id: 2, icon: <BookOpen size={24} />, titleEn: 'Academic Excellence', titleOl: 'ᱮᱠᱟᱰᱮᱢᱤᱠ ᱡᱤᱛᱠᱟᱹᱨ', descEn: 'To promote academic excellence through peer support and mentorship.', descOl: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱢᱩᱫᱽ ᱨᱮ ᱜᱚᱲᱚ ᱟᱨ ᱥᱮᱪᱮᱫ ᱛᱟᱞᱟᱛᱮ ᱮᱠᱟᱰᱮᱢᱤᱠ ᱡᱤᱛᱠᱟᱹᱨ ᱞᱟᱦᱟ ᱤᱫᱤ ᱾' },
    { id: 3, icon: <Landmark size={24} />, titleEn: 'Cultural Preservation', titleOl: 'ᱞᱟᱠᱪᱟᱨ ᱡᱚᱜᱟᱣ', descEn: 'To preserve and promote Santal culture, language, and heritage.', descOl: 'ᱥᱟᱱᱛᱟᱲ ᱞᱟᱠᱪᱟᱨ, ᱯᱟᱹᱨᱥᱤ, ᱟᱨ ᱦᱮᱨᱤᱴᱮᱡᱽ ᱡᱚᱜᱟᱣ ᱟᱨ ᱞᱟᱦᱟ ᱤᱫᱤ ᱾' },
    { id: 4, icon: <Heart size={24} />, titleEn: 'Welfare and Support', titleOl: 'ᱣᱮᱞᱯᱷᱮᱭᱟᱨ ᱟᱨ ᱜᱚᱲᱚ', descEn: 'To provide financial and emotional support to students in need.', descOl: 'ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱠᱟᱹᱣᱰᱤ ᱟᱨ ᱢᱚᱱᱮ ᱨᱮᱱᱟᱜ ᱜᱚᱲᱚ ᱮᱢ ᱾' },
    { id: 5, icon: <Award size={24} />, titleEn: 'Recognition of Talent', titleOl: 'ᱜᱩᱱ ᱨᱮᱱᱟᱜ ᱢᱟᱱᱚᱛ', descEn: 'To recognize and reward outstanding achievements in entrance exams.', descOl: 'ᱮᱱᱴᱨᱟᱱᱥ ᱵᱤᱱᱤᱰ ᱨᱮ ᱡᱤᱛᱠᱟᱹᱨ ᱟᱠᱟᱱ ᱠᱚ ᱢᱟᱱᱚᱛ ᱟᱨ ᱥᱤᱨᱯᱷᱟᱹ ᱮᱢ ᱾' },
    { id: 6, icon: <Briefcase size={24} />, titleEn: 'Career Guidance', titleOl: 'ᱠᱮᱨᱤᱭᱟᱨ ᱫᱤᱥᱟᱹ', descEn: 'To provide career guidance and networking opportunities.', descOl: 'ᱠᱮᱨᱤᱭᱟᱨ ᱞᱟᱹᱜᱤᱫ ᱫᱤᱥᱟᱹ ᱟᱨ ᱱᱮᱴᱣᱟᱨᱠᱤᱝ ᱨᱮᱱᱟᱜ ᱥᱩᱡᱳᱜᱽ ᱮᱢ ᱾' },
    { id: 7, icon: <GraduationCap size={24} />, titleEn: 'Higher Education Advocacy', titleOl: 'ᱪᱮᱛᱟᱱ ᱥᱮᱪᱮᱫ ᱞᱟᱹᱜᱤᱫ ᱠᱟᱹᱢᱤ', descEn: 'To advocate for tribal representation in higher technical education.', descOl: 'ᱪᱮᱛᱟᱱ ᱴᱮᱠᱱᱤᱠᱮᱞ ᱥᱮᱪᱮᱫ ᱨᱮ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱠᱚᱣᱟᱜ ᱴᱷᱟᱶ ᱞᱟᱹᱜᱤᱫ ᱠᱟᱹᱢᱤ ᱾' },
    { id: 8, icon: <Scale size={24} />, titleEn: 'Social Awareness', titleOl: 'ᱥᱟᱶᱛᱟ ᱟᱹᱨᱤ ᱪᱮᱛᱷᱟᱣ', descEn: 'To raise awareness about social issues affecting the Santal community.', descOl: 'ᱥᱟᱱᱛᱟᱲ ᱥᱟᱶᱛᱟ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ ᱵᱟᱵᱚᱛ ᱪᱮᱛᱷᱟᱣ ᱯᱟᱥᱱᱟᱣ ᱾' },
    { id: 9, icon: <Zap size={24} />, titleEn: 'Skill Development', titleOl: 'ᱦᱩᱱᱟᱹᱨ ᱞᱟᱦᱟᱱᱛᱤ', descEn: 'To organize workshops and seminars for skill enhancement.', descOl: 'ᱦᱩᱱᱟᱹᱨ ᱞᱟᱦᱟᱱᱛᱤ ᱞᱟᱹᱜᱤᱫ ᱣᱟᱨᱠᱥᱚᱯ ᱟᱨ ᱥᱮᱢᱤᱱᱟᱨ ᱥᱟᱯᱲᱟᱣ ᱾' },
    { id: 10, icon: <Globe size={24} />, titleEn: 'Global Networking', titleOl: 'ᱡᱮᱜᱮᱛ ᱡᱟᱠᱟᱛ ᱱᱮᱴᱣᱟᱨᱠᱤᱝ', descEn: 'To connect with Santal professionals globally for mentorship.', descOl: 'ᱡᱮᱜᱮᱛ ᱡᱟᱠᱟᱛ ᱥᱟᱱᱛᱟᱲ ᱯᱨᱳᱯᱷᱮᱥᱚᱱᱟᱞ ᱠᱚ ᱥᱟᱶ ᱥᱟᱹᱜᱟᱹᱭ ᱡᱚᱲᱟᱣ ᱾' },
    { id: 11, icon: <Shield size={24} />, titleEn: 'Legal Aid and Rights', titleOl: 'ᱟᱹᱭᱫᱟᱹᱨ ᱟᱨ ᱜᱚᱲᱚ', descEn: 'To protect the rights and interests of Santal engineering students.', descOl: 'ᱥᱟᱱᱛᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ᱟᱹᱭᱫᱟᱹᱨ ᱡᱚᱜᱟᱣ ᱾' },
    { id: 12, icon: <CheckCircle size={24} />, titleEn: 'Community Service', titleOl: 'ᱥᱟᱶᱛᱟ ᱥᱮᱣᱟ', descEn: 'To engage in community service and rural development projects.', descOl: 'ᱥᱟᱶᱛᱟ ᱥᱮᱣᱟ ᱟᱨ ᱟᱹᱛᱩ ᱫᱤᱥᱚᱢ ᱞᱟᱦᱟᱱᱛᱤ ᱠᱟᱹᱢᱤ ᱨᱮ ᱥᱮᱞᱮᱫ ᱾' },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">{t('aims')}</h2>
          <div className="flex-grow h-1 bg-gov-border"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj) => (
            <div key={obj.id} className="bg-white border border-gov-border p-6 rounded shadow-sm hover:border-gov-blue transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gov-light text-gov-blue p-3 rounded-full group-hover:bg-gov-blue group-hover:text-white transition-colors">
                  {obj.icon}
                </div>
                <span className="text-gov-accent font-bold text-xl">#{obj.id}</span>
              </div>
              <h3 className="text-lg font-bold text-gov-blue uppercase mb-2">
                {language === 'en' ? obj.titleEn : obj.titleOl}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'en' ? obj.descEn : obj.descOl}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Aims;
