
import React from 'react';
import { motion } from 'framer-motion';
import { QUOTES } from '../constants';

interface HeaderProps {
  cosmetologistName: string;
}

const Header: React.FC<HeaderProps> = ({ cosmetologistName }) => {
  return (
    <header className="relative pt-8 pb-8 px-6 text-center">
      {/* Top Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-center"
      >
        <img 
          src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/MainApp/GM/BEAUTY%20LOGO%20GALICAMED.png" 
          alt="Beauty Galicamed Logo" 
          className="h-16 w-auto object-contain"
          loading="lazy"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-full max-w-[200px] h-[260px] mb-6 overflow-hidden rounded-t-[60px]">
          <img 
            src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/MainApp/GM/dom1.png" 
            alt={cosmetologistName}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          {/* Elegant blend into the background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9FAFB] via-transparent to-transparent pointer-events-none" />
        </div>

        <h1 className="text-xl font-medium tracking-wide text-gray-800 mb-2">
          {cosmetologistName}
        </h1>
        
        <div className="w-12 h-[1px] bg-[#5C4033]/40 mb-6" />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-serif italic text-lg text-gray-600 max-w-sm mx-auto leading-relaxed"
        >
          &ldquo;{QUOTES[0]}&rdquo;
        </motion.p>
      </motion.div>
    </header>
  );
};

export default Header;
