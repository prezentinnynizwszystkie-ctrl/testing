
import React from 'react';

const Infusions: React.FC = () => {
  return (
    <section id="infuzje" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Subsection 1: Beauty */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-slate-50 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" className="w-8 h-8">
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 7v5l3 3" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Zabiegi Kosmetologiczne</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Zadbaj o piękno i zdrowie swojej skóry. Zapraszamy na profesjonalne zabiegi kosmetologiczne oraz masaże.
              </p>
              <div className="h-48 w-full bg-slate-100 rounded-[2rem] overflow-hidden">
                 <img src="https://picsum.photos/seed/beauty/800/400" alt="Beauty" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
              </div>
            </div>
          </div>

          {/* Subsection 2: Infusions */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-green-50 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-[#2e7d32] rounded-2xl flex items-center justify-center mb-8">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-8 h-8">
                  <path d="M7 21l.5 -4.5c.3 -2.7 2.6 -4.8 5.3 -4.8h.4c2.7 0 5 2.1 5.3 4.8l.5 4.5" /><path d="M12 11.7v-2.7" /><path d="M12 9a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Terapie Infuzyjne (Wlewy Dożylne)</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Terapie infuzyjne to witaminy, minerały i antyoksydanty podane bezpośrednio do Twojego krwiobiegu. To najszybsza droga do uzupełnienia niedoborów i wzmocnienia organizmu.
              </p>
              
              <div className="space-y-6">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Dlaczego warto?</h4>
                <div className="space-y-4">
                  {[
                    { title: "100% Przyswajalności", desc: "Omijamy układ pokarmowy – składniki trafiają tam, gdzie są potrzebne." },
                    { title: "Natychmiastowe Działanie", desc: "Szybkie osiągnięcie stężenia leczniczego." },
                    { title: "Bezpieczeństwo", desc: "Indywidualnie dobrana dawka pod stałą kontrolą medyczną." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1 w-5 h-5 bg-[#2e7d32] rounded-full flex items-center justify-center shrink-0">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                         </svg>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Infusions;
