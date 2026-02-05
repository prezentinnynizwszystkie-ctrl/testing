
import React, { useRef } from 'react';

const clinics = [
  { 
    name: "Ortopedyczna dzieci i dorosłych", 
    desc: "Zajmuje się diagnostyką i leczeniem schorzeń narządu ruchu u pacjentów w każdym wieku.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    name: "Kardiologiczna", 
    desc: "Oferuje konsultacje i badania serca oraz układu krążenia.",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    name: "Dermatologiczna", 
    desc: "Diagnozuje i leczy choroby skóry, włosów i paznokci.",
    img: "https://images.unsplash.com/photo-1581594632702-fbdc51b2763b?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    name: "Ginekologiczno-Położnicza", 
    desc: "Zapewnia opiekę zdrowotną kobiet na różnych etapach życia.",
    img: "https://images.unsplash.com/photo-1626431945532-601e353841ee?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    name: "Chirurgii ogólnej i naczyniowej", 
    desc: "Przeprowadza konsultacje oraz zabiegi w zakresie chirurgii i naczyń krwionośnych.",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    name: "Medycyny Estetycznej", 
    desc: "Oferuje zabiegi poprawiające wygląd i komfort skóry.",
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc206e?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    name: "Dietetyczna", 
    desc: "Wspiera w doborze odpowiedniego planu żywieniowego i profilaktyce chorób.",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    name: "Pulmonologiczna i Alergologiczna", 
    desc: "Zajmuje się diagnostyką i leczeniem alergii oraz chorób płuc u dzieci i dorosłych.",
    img: "https://images.unsplash.com/photo-1584362946521-4e19510e14e1?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    name: "Laryngologiczna", 
    desc: "Diagnozuje i leczy choroby uszu, nosa, gardła i krtani dzieci i dorosłych.",
    img: "https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?q=80&w=1000&auto=format&fit=crop" 
  },
];

const SpecialistClinics: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="poradnie" className="py-24 bg-[#fdfaf6] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#3e2723] mb-6">Poradnie <span className="text-[#8d6e63]">Specjalistyczne</span></h2>
            <p className="text-stone-500 font-medium text-sm md:text-base">Zakres konsultacji medycznych świadczonych w naszej placówce.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Rehabilitacja", "Stomatologia", "Pracownia USG/RTG"].map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-[#fdf9f3] rounded-full text-[10px] font-bold text-[#5d4037] border border-[#eaddca] uppercase tracking-wider">{tag}</span>
            ))}
          </div>
        </div>

        <div className="relative group/slider">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6"
          >
            {clinics.map((clinic, idx) => (
              <div key={idx} className="min-w-[85%] md:min-w-0 bg-white rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-[#5d4037]/5 hover:-translate-y-2 transition-all duration-500 snap-center group overflow-hidden">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={clinic.img} alt={clinic.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                </div>
                <div className="p-8 pt-2">
                  <div className="w-10 h-10 bg-[#fdf9f3] rounded-xl flex items-center justify-center text-[#5d4037] font-bold mb-6 group-hover:bg-[#5d4037] group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-extrabold text-[#3e2723] mb-4">{clinic.name}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{clinic.desc}</p>
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
              {[...Array(clinics.length)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === 0 ? 'bg-[#5d4037] w-4' : 'bg-[#eaddca]'}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialistClinics;
