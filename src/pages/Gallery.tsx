import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Image as ImageIcon, Filter, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFirestore } from '../hooks/useFirestore';
import { GalleryImage } from '../types';

const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<'All' | 'Events' | 'Awards' | 'Community Activities'>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data: images, loading } = useFirestore<GalleryImage>('gallery');

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gov-blue uppercase tracking-wider">{t('gallery')}</h2>
            <div className="hidden md:block w-24 h-1 bg-gov-border"></div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Events', 'Awards', 'Community Activities'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all border ${
                  filter === cat 
                    ? 'bg-gov-blue text-white border-gov-blue shadow-md' 
                    : 'bg-white text-gov-blue border-gov-border hover:border-gov-blue'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-gov-blue" /></div>
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded border border-gov-border bg-gov-light cursor-pointer shadow-sm hover:shadow-md"
                  onClick={() => setSelectedImage(img.url)}
                >
                  <img 
                    src={img.url} 
                    alt={img.captionEn} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gov-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <span className="text-gov-accent text-[10px] font-bold uppercase tracking-widest">{img.category}</span>
                    <h4 className="text-white font-bold text-sm uppercase mt-1">
                      {language === 'en' ? img.captionEn : img.captionOl}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-center text-gray-400 py-12">No images found in this category.</p>
        )}
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gov-dark/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-4 right-4 text-white hover:text-gov-accent transition-colors">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage} 
              className="max-w-full max-h-full object-contain rounded shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
