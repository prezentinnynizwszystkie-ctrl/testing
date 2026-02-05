
import React from 'react';

const SectionInfo: React.FC = () => {
  return (
    <section id="o-nas" className="min-h-screen snap-start flex flex-col justify-center bg-white relative overflow-hidden py-20">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#8B5A2B] uppercase tracking-[0.3em] font-semibold text-sm mb-4 block">Ekspertyza i Wellness</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
            CZYM SĄ TERAPIE INFUZYJNE
          </h2>
          <div className="prose prose-lg text-gray-600 leading-relaxed">
            <p className="mb-6">
              Terapie infuzyjne polegają na dożylnym podaniu wybranych substancji odżywczych – witamin, mikroelementów i związków o działaniu antyoksydacyjnym.
            </p>
            <p className="mb-6">
              Podanie bezpośrednio do krwiobiegu pozwala na szybkie osiągnięcie właściwego stężenia i może wspierać organizm w procesach regeneracji, odporności oraz uzupełnianiu niedoborów.
            </p>
          </div>
          <div className="flex gap-4 mt-10">
            <div className="w-12 h-px bg-[#8B5A2B] self-center"></div>
            <p className="font-serif italic text-lg text-gray-800">Innowacja w służbie zdrowia, zakorzeniona w tradycji troski.</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#f5f5dc] rounded-full -z-10 opacity-50"></div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/7.png" 
              className="rounded-2xl shadow-xl transform translate-y-8 aspect-[4/5] object-cover" 
              alt="Medical Atmosphere" 
            />
            <img 
              src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/3.png" 
              className="rounded-2xl shadow-xl aspect-[4/5] object-cover" 
              alt="Clinic View" 
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-[#8B5A2B] text-white p-8 rounded-2xl hidden md:block">
            <p className="text-3xl font-serif mb-2">100%</p>
            <p className="text-xs uppercase tracking-widest font-bold">Wsparcie Organizmu</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionInfo;
