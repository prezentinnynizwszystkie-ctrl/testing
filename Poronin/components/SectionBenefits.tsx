
import React from 'react';

const SectionBenefits: React.FC = () => {
  return (
    <section className="min-h-screen snap-start flex flex-col justify-center py-24 bg-[#f9f9f9] relative overflow-hidden">
      {/* Decorative Image background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none hidden lg:block">
        <img 
          src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/9.png" 
          className="w-full h-full object-cover" 
          alt="Atmosphere Background" 
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="glass p-10 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl text-[#8B5A2B]">
              <i className="fa-solid fa-droplet"></i>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif mb-8 border-b border-gray-200 pb-4">DLACZEGO DOŻYLNIE?</h3>
            <ul className="space-y-4 md:space-y-6">
              {[
                { title: "Szybkie przyswojenie", text: "Błyskawiczne wchłanianie składników bezpośrednio do krwiobiegu." },
                { title: "Pominięcie układu pokarmowego", text: "Brak strat w procesach trawiennych i brak podrażnień żołądka." },
                { title: "Indywidualne dawkowanie", text: "Możliwość precyzyjnego dobrania stężenia pod potrzeby pacjenta." },
                { title: "Kontrola lekarska", text: "Bezpieczeństwo i stały nadzór medyczny podczas trwania sesji." }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#8B5A2B] mt-2.5"></div>
                  <div>
                    <span className="font-bold text-gray-800 block text-sm md:text-base">{item.title}</span>
                    <span className="text-gray-600 text-xs md:text-sm leading-relaxed">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-12">
            <div className="glass p-10 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 bg-white/40">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl text-[#8B5A2B]">
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif mb-8 border-b border-gray-200 pb-4">KWALIFIKACJA I NADZÓR</h3>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-6 md:mb-8 leading-relaxed text-base md:text-lg italic">
                  "Terapie infuzyjne realizowane są w placówkach GalicaMed, we współpracy z lekarzem prowadzącym kwalifikację i podanie."
                </p>
                <div className="p-6 bg-[#8B5A2B]/5 rounded-xl border border-[#8B5A2B]/20">
                  <p className="text-gray-600 text-xs md:text-sm">
                    Każda terapia poprzedzona jest wywiadem medycznym oraz badaniami, co gwarantuje najwyższy standard opieki i minimalizuje ryzyko skutków ubocznych.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                    <i className="fa-solid fa-shield-halved text-[#8B5A2B]"></i>
                 </div>
                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">Certyfikowane Standardy Medyczne</span>
              </div>
            </div>

            {/* Mobile image element - hidden on lg, visible on md/sm */}
            <div className="lg:hidden rounded-[2rem] overflow-hidden shadow-xl aspect-video hidden md:block">
               <img 
                src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/9.png" 
                className="w-full h-full object-cover" 
                alt="Clinic Atmosphere" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionBenefits;
