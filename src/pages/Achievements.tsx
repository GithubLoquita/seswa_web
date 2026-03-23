import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Trophy, Star, Medal, Loader2 } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { Achievement } from '../types';
import { orderBy } from 'firebase/firestore';

const Achievements: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: achievements, loading } = useFirestore<Achievement>('achievements', [orderBy('year', 'desc'), orderBy('rank', 'asc')]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-500" size={24} />;
      case 2: return <Medal className="text-gray-400" size={24} />;
      case 3: return <Medal className="text-amber-600" size={24} />;
      default: return <Star className="text-gov-blue" size={24} />;
    }
  };

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">{t('achievements')}</h2>
          <div className="flex-grow h-1 bg-gov-border"></div>
        </div>

        <div className="bg-white border border-gov-border rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gov-blue text-white uppercase text-sm tracking-wider">
                  <th className="px-6 py-4 font-bold">Rank</th>
                  <th className="px-6 py-4 font-bold">Student Name</th>
                  <th className="px-6 py-4 font-bold">Exam</th>
                  <th className="px-6 py-4 font-bold">Year</th>
                  <th className="px-6 py-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-border">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Loader2 className="animate-spin text-gov-blue mx-auto" />
                    </td>
                  </tr>
                ) : achievements.length > 0 ? (
                  achievements.map((ach) => (
                    <tr key={ach.id} className="hover:bg-gov-light transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 font-bold text-gov-blue">
                          {getRankIcon(ach.rank)}
                          <span>#{ach.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gov-dark">
                        {language === 'en' ? ach.nameEn : ach.nameOl}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gov-blue/10 text-gov-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {ach.exam}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gov-dark font-medium">{ach.year}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {language === 'en' ? ach.descriptionEn : ach.descriptionOl}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      No achievements recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recognition Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gov-blue text-white p-8 rounded-lg shadow-md text-center space-y-4">
          <Trophy size={48} className="mx-auto text-gov-accent" />
          <h3 className="text-2xl font-bold uppercase">WBJEE Awards</h3>
          <p className="text-sm text-gray-300">Recognizing the bright minds who excel in the West Bengal Joint Entrance Examination.</p>
        </div>
        <div className="bg-gov-blue text-white p-8 rounded-lg shadow-md text-center space-y-4">
          <Star size={48} className="mx-auto text-gov-accent" />
          <h3 className="text-2xl font-bold uppercase">IITJEE Awards</h3>
          <p className="text-sm text-gray-300">Honoring students who clear the most prestigious engineering entrance exam in India.</p>
        </div>
        <div className="bg-gov-blue text-white p-8 rounded-lg shadow-md text-center space-y-4">
          <Award size={48} className="mx-auto text-gov-accent" />
          <h3 className="text-2xl font-bold uppercase">AIEEE Awards</h3>
          <p className="text-sm text-gray-300">Celebrating success in the All India Engineering Entrance Examination.</p>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
