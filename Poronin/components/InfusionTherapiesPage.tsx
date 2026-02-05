
import React from 'react';
import SectionInfo from './SectionInfo';
import SectionIndications from './SectionIndications';
import SectionBenefits from './SectionBenefits';
import SectionSubstances from './SectionSubstances';

const InfusionTherapiesPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Small Hero Overlay for context */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/14.png" 
            className="w-full h-full object-cover brightness-[0.3]"
            alt="Infusions Hero"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <span className="inline-block px-4 py-1 border border-white/30 rounded-full text-[10px] uppercase tracking-[0.4em] mb-6">
            Witaminowa Regeneracja
          </span>
          <h1 className="text-4xl md:text-6xl font-serif mb-4 tracking-tight uppercase">
            Terapie <span className="italic text-[#d4af37]">Infuzyjne</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg font-light opacity-80">
            Dostarczamy kluczowe składniki odżywcze bezpośrednio do Twojego krwiobiegu, wspierając zdrowie na poziomie komórkowym.
          </p>
        </div>
      </section>

      <SectionInfo />
      <SectionIndications />
      <SectionBenefits />
      <SectionSubstances />
      
      {/* Call to Action at the bottom */}
      <section className="py-20 bg-[#f9f7f4]">
        <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-serif mb-6 text-gray-900">Gotowy na regenerację?</h3>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto font-light">
                Umów się na konsultację kwalifikacyjną, podczas której dobierzemy odpowiedni skład kroplówki do Twoich potrzeb.
            </p>
            <a href="#kontakt" className="bg-[#8B5A2B] text-white px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#6D4521] transition-all shadow-xl inline-block">
                Zarezerwuj termin
            </a>
        </div>
      </section>
    </div>
  );
};

export default InfusionTherapiesPage;
