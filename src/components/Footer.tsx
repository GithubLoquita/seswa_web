import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gov-dark text-white pt-12 pb-6 px-4 border-t-4 border-gov-accent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2 uppercase tracking-wider">
            {t('about')}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {t('hero_text')}
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-gov-accent transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gov-accent transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-gov-accent transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2 uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/aims" className="hover:text-white transition-colors">Aims & Objectives</Link></li>
            <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
            <li><Link to="/notices" className="hover:text-white transition-colors">Notice Board</Link></li>
            <li><Link to="/members" className="hover:text-white transition-colors">Governing Members</Link></li>
            <li><Link to="/achievements" className="hover:text-white transition-colors">Achievements</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2 uppercase tracking-wider">
            {t('contact')}
          </h3>
          <div className="space-y-4 text-sm text-gray-400">
            <p className="flex items-start gap-3">
              <MapPin size={18} className="text-gov-accent flex-shrink-0" />
              <span>Nityananda Nagar, D.S.Lane, Howrah, Kolkata, India, PIN: 711 109</span>
            </p>
            <p className="flex items-center gap-3">
              <Mail size={18} className="text-gov-accent flex-shrink-0" />
              <span>seswa@gmail.com</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
        <p>{t('copyright')}</p>
        <p className="mt-2">Designed and Maintained by SESWA IT Cell.</p>
      </div>
    </footer>
  );
};

export default Footer;
