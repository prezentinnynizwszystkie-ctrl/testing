
import React from 'react';

const InfusionsAndBeauty: React.FC = () => {
  return (
    <section id="uslugi" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Terapie Infuzyjne */}
          <div className="bg-[#fdf9f3] p-10 md:p-16 rounded-[3rem] border border-[#eaddca] relative group overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#eaddca]/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-[#3e2723] mb-8 uppercase tracking-tight">Terapie Infuzyjne <br /> <span className="text-[#8d6e63]">(Wlewy Dożylne)</span></h3>
              <p className="text-stone-600 leading-relaxed mb-10 font-medium text-sm md:text-base">
                Witaminy, minerały i antyoksydanty podane bezpośrednio do krwiobiegu. Metoda uzupełnienia niedoborów oraz wsparcia organizmu.
              </p>
              
              <div className="space-y-6 mb-12">
                {[
                  { t: "100% Przyswajalności", d: "Omijamy układ pokarmowy – składniki trafiają bezpośrednio do krwiobiegu." },
                  { t: "Natychmiastowe Działanie", d: "Szybkie osiągnięcie stężenia składników w organizmie." },
                  { t: "Bezpieczeństwo", d: "Dobór dawki pod stałą kontrolą personelu medycznego." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#5d4037] flex items-center justify-center shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-extrabold text-[#3e2723] text-sm mb-1">{item.t}</h5>
                      <p className="text-[11px] text-stone-500 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-xl border border-[#eaddca] bg-white/50">
               <img 
                src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/1.png" 
                alt="Terapia infuzyjna" 
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-[#3e2723]/5 pointer-events-none"></div>
            </div>
          </div>

          {/* Beauty */}
          <div className="bg-[#3e2723] p-10 md:p-16 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#8d6e63]/20 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-white/20">Galica Med Beauty</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-8 leading-tight uppercase tracking-tight">Zabiegi <br /> Kosmetologiczne</h3>
              <p className="text-stone-200/70 leading-relaxed mb-10 text-lg font-medium">
                Pielęgnacja skóry poprzez profesjonalne zabiegi kosmetologiczne oraz masaże.
              </p>
              
              <div className="h-64 w-full rounded-[2rem] overflow-hidden mb-10 border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop" 
                  alt="Zabiegi kosmetyczne" 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 flex items-center justify-center text-center">
                 <p className="font-bold text-xs uppercase tracking-widest">Pielęgnacja Skóry</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 flex items-center justify-center text-center">
                 <p className="font-bold text-xs uppercase tracking-widest">Masaże Twarzy</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfusionsAndBeauty;
