
import React from 'react';
import { motion } from 'framer-motion';
import { PlannerSection as IPlannerSection } from '../types';
import DataCarousel from './DataCarousel';

interface PlannerSectionProps {
  section: IPlannerSection;
  isEditing: boolean;
  onUpdateField: (sectionId: number, fieldKey: string, newValue: string) => void;
}

const PlannerSection: React.FC<PlannerSectionProps> = ({ section, isEditing, onUpdateField }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-16 relative"
    >
      <div className="flex items-center mb-6 px-6">
        <div className="text-4xl font-serif text-gray-200 font-bold mr-4 select-none">
          {String(section.id).padStart(2, '0')}
        </div>
        <div className="flex-1">
          <h2 className="text-sm tracking-[0.25em] font-semibold text-gray-800 uppercase">
            {section.title}
          </h2>
          <div className="w-full h-[1px] bg-gradient-to-r from-gray-200 via-gray-300 to-transparent mt-1" />
        </div>
      </div>

      <div className="px-2">
         <DataCarousel 
           fields={section.fields} 
           isEditing={isEditing}
           onUpdate={(key, val) => onUpdateField(section.id, key, val)}
         />
      </div>
    </motion.section>
  );
};

export default PlannerSection;
