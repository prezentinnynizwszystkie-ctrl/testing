
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PlannerField } from '../types';

interface DataCarouselProps {
  fields: PlannerField[];
  isEditing: boolean;
  onUpdate: (key: string, value: string) => void;
}

const DataCarousel: React.FC<DataCarouselProps> = ({ fields, isEditing, onUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 1 or 2 items depending on width (conceptually, we'll keep it simple for 1 large focus item on mobile)
  const totalSlides = fields.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentField = fields[currentIndex];

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="min-h-[160px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full px-12"
          >
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white shadow-sm transition-all duration-300">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#5C4033] font-semibold mb-2 block">
                {currentField.label}
              </span>
              
              {isEditing ? (
                <textarea
                  className="w-full bg-transparent border-b border-[#5C4033]/30 py-2 focus:border-[#5C4033] outline-none transition-all text-gray-700 font-light resize-none h-24"
                  value={currentField.value}
                  onChange={(e) => onUpdate(currentField.key, e.target.value)}
                />
              ) : (
                <p className="text-gray-700 text-lg font-light leading-snug">
                  {currentField.value || "Brak danych..."}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center pointer-events-auto hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center pointer-events-auto hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-1.5">
        {fields.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-[#5C4033]' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DataCarousel;
