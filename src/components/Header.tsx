import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Phone, Mail, LogIn, Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'home', path: '/' },
    { name: 'about', path: '/about' },
    { name: 'aims', path: '/aims' },
    { name: 'events', path: '/events' },
    { name: 'notice_board', path: '/notices' },
    { name: 'members', path: '/members' },
    { name: 'achievements', path: '/achievements' },
    { name: 'gallery', path: '/gallery' },
    { name: 'contact', path: '/contact' },
  ];

  return (
    <header className="w-full">
      {/* Top Strip */}
      <div className="bg-gov-blue text-white py-1 px-4 text-xs flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Mail size={12} /> seswa@gmail.com</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="hover:text-gov-accent flex items-center gap-1">
            <LogIn size={12} /> {t('login')}
          </Link>
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ol' : 'en')}
            className="flex items-center gap-1 hover:text-gov-accent font-medium"
          >
            <Globe size={12} /> {language === 'en' ? 'Ol Chiki' : 'English'}
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-4 px-4 border-b border-gov-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src="https://res.cloudinary.com/doq1ara3j/image/upload/v1774259612/images_2_-ClRCJwfd_mz8jlg.png" 
                alt="SESWA Logo" 
                className="w-16 h-16 object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-gov-blue uppercase tracking-tight">
              {t('site_name')}
            </h1>
            <p className={cn(
              "text-lg md:text-xl text-gov-dark mt-1",
              language === 'ol' ? "font-ol" : "font-sans"
            )}>
              {language === 'en' ? "ᱥᱟᱱᱛᱟᱲ ᱤᱱᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱥᱴᱩᱰᱮᱱᱴᱥ' ᱣᱮᱞᱯᱷᱮᱭᱟᱨ ᱮᱥᱳᱥᱤᱭᱮᱥᱚᱱ (W.B.)" : "Santal Engineering Students' Welfare Association (W.B.)"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-gov-blue text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex md:hidden justify-end py-2">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          <ul className={cn(
            "md:flex md:flex-row flex-col md:items-center py-0 md:py-0",
            isMenuOpen ? "flex" : "hidden"
          )}>
            {navItems.map((item) => (
              <li key={item.path} className="w-full md:w-auto">
                <Link
                  to={item.path}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-white/10",
                    location.pathname === item.path && "bg-gov-accent text-gov-blue font-bold",
                    language === 'ol' ? "font-ol" : "font-sans"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
