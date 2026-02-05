
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, ArrowLeft, ChevronLeft } from 'lucide-react';
import Header from '../components/Header';
import PlannerSection from '../components/PlannerSection';
import { BeautyPlannerData } from '../types';

interface PlannerViewProps {
  data: BeautyPlannerData;
  setView: (view: any) => void;
  setIsContactModalOpen: (open: boolean) => void;
}

const PlannerView: React.FC<PlannerViewProps> = ({ data, setView, setIsContactModalOpen }) => {
  return (
    <div className="pb-20 pt-24">
      <div className="max-w-screen-xl mx-auto px-6 mb-4">
        <button 
          onClick={() => setView('menu')}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition-all text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Wstecz
        </button>
      </div>

      <Header cosmetologistName={data.cosmetologistName} />
      
      <div className="px-6 mb-12 md:max-w-screen-xl md:mx-auto">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Pacjentka</p>
            <h3 className="text-lg font-medium text-gray-800">{data.clientName}</h3>
          </div>
          <div className="bg-gray-50 p-3 rounded-2xl"><Sparkles className="w-5 h-5 text-[#5C4033]" /></div>
        </div>
      </div>

      <main className="space-y-4 px-0 md:max-w-screen-xl md:mx-auto">
        {data.sections.map((section) => (
          <PlannerSection 
            key={section.id} 
            section={section} 
            isEditing={false}
            onUpdateField={() => {}}
          />
        ))}

        <div className="px-6 py-12 md:max-w-4xl md:mx-auto">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white p-8 rounded-[30px] shadow-xl flex flex-col items-center gap-3 relative overflow-hidden group"
          >
            <MessageCircle className="w-8 h-8 mb-2" />
            <span className="text-xl md:text-3xl font-serif tracking-wide">SKONTAKTUJ SIĘ ZE MNĄ</span>
            <span className="text-xs uppercase tracking-widest opacity-80">Bezpośrednia wiadomość do kosmetologa</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default PlannerView;
