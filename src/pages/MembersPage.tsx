import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, Mail, Phone, Loader2 } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { Member } from '../types';
import { orderBy } from 'firebase/firestore';

const MembersPage: React.FC = () => {
  const { t, language } = useLanguage();
  
  const gbMembers = [
    { postEn: 'PRESIDENT', postOl: 'ᱯᱟᱨᱥᱮᱛ', nameEn: 'Shakespear Kisku', nameOl: 'ᱥᱮᱠᱥᱯᱤᱭᱚᱨ ᱠᱤᱥᱠᱩ', institution: 'KGEC', contact: '8509909822' },
    { postEn: 'VICE-PRESIDENT', postOl: 'ᱩᱯᱚ-ᱯᱟᱨᱥᱮᱛ', nameEn: 'Sandip Hembram', nameOl: 'ᱥᱟᱱᱫᱤᱯ ᱦᱮᱢᱵᱽᱨᱚᱢ', institution: 'MAKAUT', contact: '9832382762' },
    { postEn: 'VICE-PRESIDENT (LADIES)', postOl: 'ᱩᱯᱚ-ᱯᱟᱨᱥᱮᱛ (ᱠᱩᱲᱤ)', nameEn: 'Jharna Murmu', nameOl: 'ᱡᱷᱟᱨᱱᱟ ᱢᱩᱨᱢᱩ', institution: 'JGEC', contact: '8509014910' },
    { postEn: 'GENERAL SECRETARY', postOl: 'ᱥᱩᱛᱨᱮᱛ', nameEn: 'Srijan Soren', nameOl: 'ᱥᱨᱤᱡᱚᱱ ᱥᱚᱨᱮᱱ', institution: 'IIEST', contact: '9382091267' },
    { postEn: 'ASSISTANT GENERAL SECRETARY', postOl: 'ᱜᱚᱲᱚ-ᱥᱩᱛᱨᱮᱛ', nameEn: 'Mulukchand Hansda', nameOl: 'ᱢᱩᱞᱩᱠᱪᱟᱸᱫᱽ ᱦᱟᱸᱥᱫᱟ', institution: 'NIT DGP', contact: '8509141843' },
    { postEn: 'ASSISTANT GENERAL SECRETARY (LADIES)', postOl: 'ᱜᱚᱲᱚ-ᱥᱩᱛᱨᱮᱛ (ᱠᱩᱲᱤ)', nameEn: 'Madhabi Soren', nameOl: 'ᱢᱟᱫᱷᱚᱵᱤ ᱥᱚᱨᱮᱱ', institution: 'GCETT-B', contact: '7811886116' },
    { postEn: 'TREASURER', postOl: 'ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚᱭᱤᱡ', nameEn: 'Anjali Hembram', nameOl: 'ᱟᱧᱡᱚᱞᱤ ᱦᱮᱢᱵᱽᱨᱚᱢ', institution: 'KGEC', contact: '7586853459' },
    { postEn: 'ASSISTANT TREASURER', postOl: 'ᱜᱚᱲᱚ-ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚᱭᱤᱡ', nameEn: 'Serma Tudu', nameOl: 'ᱥᱮᱨᱢᱟ ᱴᱩᱰᱩ', institution: 'GCECT', contact: '7602239788' },
    { postEn: 'CULTURAL SECRETARY', postOl: 'ᱞᱟᱠᱪᱟᱨ ᱥᱩᱛᱨᱮᱛ', nameEn: 'Jayanta Hansda', nameOl: 'ᱡᱚᱭᱚᱱᱛᱚ ᱦᱟᱸᱥᱫᱟ', institution: 'RKMGEC', contact: '8597918964' },
    { postEn: 'ASSISTANT CULTURAL SECRETARY', postOl: 'ᱜᱚᱲᱚ-ᱞᱟᱠᱪᱟᱨ ᱥᱩᱛᱨᱮᱛ', nameEn: 'Mahadev Tudu', nameOl: 'ᱢᱚᱦᱟᱫᱮᱵᱽ ᱴᱩᱰᱩ', institution: 'JGEC', contact: '8670874153' },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">{t('general_body')}</h2>
          <div className="flex-grow h-1 bg-gov-border"></div>
        </div>

        <div className="bg-white border border-gov-border rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gov-blue text-white uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 font-bold border-r border-white/10">{t('post')}</th>
                  <th className="px-6 py-4 font-bold border-r border-white/10">{t('name')}</th>
                  <th className="px-6 py-4 font-bold border-r border-white/10">{t('institution')}</th>
                  <th className="px-6 py-4 font-bold">{t('contact_no')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-border">
                {gbMembers.map((member, index) => (
                  <tr key={index} className="hover:bg-gov-light transition-colors">
                    <td className="px-6 py-4 font-bold text-gov-blue text-sm uppercase">
                      {language === 'en' ? member.postEn : member.postOl}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gov-dark">
                      {language === 'en' ? member.nameEn : member.nameOl}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {member.institution}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gov-blue">
                      {member.contact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gov-light p-6 rounded border border-gov-border text-sm text-gray-700 leading-relaxed">
          <p className="font-bold text-gov-blue mb-2 uppercase tracking-wider">{t('official_announcement')}</p>
          <p>
            {t('announcement_text')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default MembersPage;
