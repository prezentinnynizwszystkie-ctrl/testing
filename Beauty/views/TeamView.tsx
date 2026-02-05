
import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { optimizeImg } from '../App';

const MemberItem = memo(({ currentMember, setSelectedStaff, setIsContactModalOpen }: any) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-50 flex flex-col md:flex-row md:items-stretch"
  >
    <div className="aspect-[4/3] md:aspect-auto md:w-1/2 overflow-hidden relative">
      <img 
        src={optimizeImg(currentMember.image)} 
        alt={currentMember.name} 
        className="w-full h-full object-cover object-top" 
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/40 to-transparent" />
    </div>
    <div className="p-8 md:p-12 text-center md:text-left md:w-1/2 flex flex-col justify-center">
      <h3 className="text-2xl md:text-4xl font-serif text-gray-800 mb-1">{currentMember.name}</h3>
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-6">{currentMember.role}</p>
      
      {/* ShortText nad przyciskiem */}
      {currentMember.shortText && (
        <p className="text-gray-500 text-sm leading-relaxed mb-8 italic">
          {currentMember.shortText}
        </p>
      )}

      <div className="mt-4 space-y-4">
        <button onClick={() => setSelectedStaff(currentMember)} className="w-full py-5 bg-[#5C4033] text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-[#4A3329] transition-all">Więcej o mnie</button>
        <button onClick={() => setIsContactModalOpen(true)} className="w-full py-5 border border-gray-100 text-gray-400 hover:text-gray-800 rounded-full text-[10px] font-bold uppercase tracking-widest">Kontakt</button>
      </div>
    </div>
  </motion.div>
));

const TeamView: React.FC<any> = ({ staffList, setIsContactModalOpen, setView }) => {
  const [staffSliderIndex, setStaffSliderIndex] = useState(0);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const currentMember = staffList[staffSliderIndex];

  // Mapowanie kluczy technicznych na czytelne etykiety
  const staffLabels: Record<string, string> = {
    approach: "Podejście",
    specialization: "Specjalizacja",
    experience: "Doświadczenie",
    education: "Wykształcenie",
    about: "O mnie",
    bio: "O mnie"
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pt-24 pb-20 md:max-w-screen-xl md:mx-auto md:px-12">
      <div className="mb-8">
        <button onClick={() => setView('menu')} className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-gray-100 rounded-full text-gray-500 text-xs font-bold uppercase tracking-widest shadow-sm"><ChevronLeft className="w-4 h-4" /> Wstecz</button>
      </div>
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-serif text-gray-800 mb-2">Nasz zespół</h1>
        <p className="text-gray-400 italic font-handwritten text-xl">Poznaj ekspertki GalicaMed</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative mb-8">
          <AnimatePresence mode="wait">
            {currentMember && <MemberItem key={currentMember.id} currentMember={currentMember} setSelectedStaff={setSelectedStaff} setIsContactModalOpen={setIsContactModalOpen} />}
          </AnimatePresence>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:hidden pointer-events-none">
            <button onClick={() => setStaffSliderIndex((prev) => (prev - 1 + staffList.length) % staffList.length)} className="w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center pointer-events-auto"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
            <button onClick={() => setStaffSliderIndex((prev) => (prev + 1) % staffList.length)} className="w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center pointer-events-auto"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12 py-4">
          {staffList.map((member: any, idx: number) => (
            <button key={member.id} onClick={() => setStaffSliderIndex(idx)} className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${staffSliderIndex === idx ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-50 grayscale hover:opacity-100'}`}><img src={optimizeImg(member.image, 200)} alt={member.name} className="w-full h-full object-cover object-top" /></button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedStaff && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-6">
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="bg-white w-full max-w-lg h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-[40px] overflow-hidden relative shadow-2xl flex flex-col">
              <button onClick={() => setSelectedStaff(null)} className="absolute top-6 right-6 z-50 p-2 bg-white/80 rounded-full shadow-lg"><X className="w-6 h-6 text-gray-400" /></button>
              <div className="overflow-y-auto flex-1 no-scrollbar pt-12">
                <div className="w-full aspect-square overflow-hidden relative">
                  <img src={optimizeImg(selectedStaff.image)} alt={selectedStaff.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
                </div>
                <div className="p-8 sm:p-10 -mt-12 relative bg-white rounded-t-[40px]">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-gray-800 mb-1">{selectedStaff.name}</h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">{selectedStaff.role}</p>
                  </div>
                  
                  <div className="space-y-8">
                    {Object.entries(selectedStaff)
                      .filter(([key]) => !['id', 'name', 'role', 'image', 'shortText'].includes(key))
                      .map(([key, value]) => {
                        if (!value || typeof value !== 'string' || value.length < 2) return null;
                        return (
                          <div key={key} className="border-b border-gray-50 pb-6 last:border-0">
                            <h4 className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-3">
                              {staffLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                            </h4>
                            <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                              {value}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeamView;
