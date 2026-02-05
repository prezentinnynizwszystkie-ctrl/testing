
import React, { useRef } from 'react';

const therapies = [
  { title: "Fala uderzeniowa", desc: "Wykorzystywana przy leczeniu przewlekłych dolegliwości mięśni i stawów." },
  { title: "Masaż relaksacyjny", desc: "Odpręża, redukuje napięcie i wspiera regenerację." },
  { title: "Masaż leczniczy", desc: "Poprawia krążenie i wspomaga procesy gojenia." },
  { title: "Zabiegi indywidualne", desc: "Dostosowane do potrzeb i stanu zdrowia pacjenta." }
];

const Physiotherapy: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="fizjoterapia" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-black text-[#3e2723] mb-8 leading-tight">Fizjoterapia <br /> <span className="text-[#8d6e63]">i Rehabilitacja</span></h2>
            <p className="text-stone-500 text-lg mb-10 leading-relaxed font-medium">
              Oferujemy zakres zabiegów wspierających regenerację, łagodzenie bólu i poprawę sprawności ruchowej.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {therapies.slice(0, 2).map((t, idx) => (
                 <div key={idx} className="p-6 bg-[#fdf9f3] rounded-3xl border border-[#eaddca] hover:border-[#8d6e63] transition-colors group">
                    <h4 className="font-bold text-[#3e2723] mb-2 group-hover:text-[#5d4037]">{t.title}</h4>
                    <p className="text-xs text-stone-400">{t.desc}</p>
                 </div>
               ))}
            </div>
            
            <div className="mt-8 p-4 bg-[#fdf9f3] rounded-3xl flex items-center gap-4 border border-[#eaddca]">
               <div className="w-10 h-10 rounded-full bg-[#5d4037] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
               <p className="text-xs font-bold text-[#5d4037]">Możliwość doboru zabiegów pod potrzeby pacjenta.</p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full relative">
            <div className="absolute -inset-10 bg-[#eaddca]/20 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative z-10">
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory md:grid md:grid-cols-1 gap-6 pb-2"
              >
                 <div className="min-w-[85%] md:min-w-0 rounded-[2.5rem] overflow-hidden shadow-2xl h-80 snap-center border border-stone-100">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
                      alt="Rehabilitacja i fizjoterapia" 
                      className="w-full h-full object-cover"
                    />
                 </div>
                 {therapies.map((t, idx) => (
                   <div key={idx} className="min-w-[85%] md:min-w-0 p-8 bg-[#3e2723] rounded-[2.5rem] text-white flex items-start gap-6 snap-center group">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#3e2723] transition-all duration-300">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                         </svg>
                      </div>
                      <div>
                         <h4 className="font-bold text-xl mb-3">{t.title}</h4>
                         <p className="text-sm opacity-70 leading-relaxed">{t.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="flex md:hidden items-center justify-between mt-8">
                <div className="flex gap-2">
                  <button 
                    onClick={() => scroll('left')}
                    className="w-12 h-12 rounded-full border border-[#eaddca] bg-white flex items-center justify-center text-[#5d4037] shadow-sm hover:bg-[#fdf9f3] transition-colors active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => scroll('right')}
                    className="w-12 h-12 rounded-full border border-[#eaddca] bg-white flex items-center justify-center text-[#5d4037] shadow-sm hover:bg-[#fdf9f3] transition-colors active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="flex gap-1.5">
                  {[...Array(therapies.length + 1)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-[#5d4037] w-4' : 'bg-[#eaddca]'}`}></div>
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

export default Physiotherapy;
