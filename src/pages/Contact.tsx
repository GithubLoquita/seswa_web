import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">{t('contact')}</h2>
          <div className="flex-grow h-1 bg-gov-border"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{t('contact_intro')}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-gov-light rounded border border-gov-border hover:border-gov-blue transition-colors group">
                <div className="bg-gov-blue text-white p-3 rounded-full group-hover:bg-gov-accent group-hover:text-gov-blue transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gov-blue uppercase tracking-wider">{t('address_label')}</h4>
                  <p className="text-gray-600">{t('address_text')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gov-light rounded border border-gov-border hover:border-gov-blue transition-colors group">
                <div className="bg-gov-blue text-white p-3 rounded-full group-hover:bg-gov-accent group-hover:text-gov-blue transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gov-blue uppercase tracking-wider">{t('email_label')}</h4>
                  <p className="text-gray-600">seswa@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-gov-border rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gov-blue uppercase mb-6 border-b border-gov-border pb-2">{t('send_message')}</h3>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                <CheckCircle size={64} className="text-green-500" />
                <h4 className="text-xl font-bold text-gov-blue">{t('msg_success')}</h4>
                <p className="text-gray-600">{t('msg_thanks')}</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-gov-blue font-bold hover:underline uppercase text-sm"
                >
                  {t('send_another')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gov-blue">{t('full_name')}</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full border border-gov-border rounded px-4 py-2 focus:outline-none focus:border-gov-blue transition-colors"
                      placeholder={t('placeholder_name')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gov-blue">{t('email_address')}</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full border border-gov-border rounded px-4 py-2 focus:outline-none focus:border-gov-blue transition-colors"
                      placeholder={t('placeholder_email')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gov-blue">{t('subject')}</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full border border-gov-border rounded px-4 py-2 focus:outline-none focus:border-gov-blue transition-colors"
                    placeholder={t('placeholder_subject')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gov-blue">{t('message')}</label>
                  <textarea 
                    required 
                    rows={5}
                    className="w-full border border-gov-border rounded px-4 py-2 focus:outline-none focus:border-gov-blue transition-colors resize-none"
                    placeholder={t('placeholder_message')}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gov-blue text-white py-3 rounded font-bold uppercase tracking-widest hover:bg-gov-accent hover:text-gov-blue transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} /> {t('send_btn')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 bg-gov-light rounded border border-gov-border overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-2 p-4 text-center">
          <MapPin size={48} />
          <p className="font-bold uppercase tracking-wider">Interactive Map Placeholder</p>
          <p className="text-xs">{t('address_text')}</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
