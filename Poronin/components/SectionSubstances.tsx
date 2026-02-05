
import React, { useRef } from 'react';

interface Substance {
  name: string;
  description: string;
  imageUrl: string;
}

const SectionSubstances: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const substances: Substance[] = [
    { 
      name: "Poalkoholowy detoks", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/1.png",
      description: "Mieszanka elektrolitów, glukozy, witamin i magnezu; może nawadniać, uzupełniać elektrolity, wspierać regenerację, oraz zmniejszać uczucie nudności i bólu głowy." 
    },
    { 
      name: "Kroplówka „Przy przeziębieniu”", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/2.png",
      description: "Składniki wspierające odporność; może zmniejszać stan zapalny, skracać czas trwania infekcji, podnosić poziom energii oraz łagodzić gorączkę i bóle mięśni." 
    },
    { 
      name: "Glutation", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/3.png",
      description: "Silny antyoksydant; może wspierać odporność, detoksykację organizmu, pracę wątroby i układ nerwowy; stosowany jako wsparcie u pacjentów onkologicznych oraz w chorobach neurodegeneracyjnych." 
    },
    { 
      name: "Koenzym Q10", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/4.png",
      description: "Bierze udział w produkcji energii komórkowej; może wspierać serce, układ nerwowy, witalność i naturalne procesy starzenia." 
    },
    { 
      name: "Witaminy z grupy B", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/5.png",
      description: "Mogą wspierać układ nerwowy, metabolizm, koncentrację, regenerację oraz kondycję włosów i skóry." 
    },
    { 
      name: "Witamina E", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/6.png",
      description: "Antyoksydant; może wspierać procesy gojenia, ochronę komórek i równowagę lipidową." 
    },
    { 
      name: "Witaminy A, D, E, K", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/7.png",
      description: "Suplementacja witamin rozpuszczalnych w tłuszczach; wsparcie układu odpornościowego i funkcji tkanek." 
    },
    { 
      name: "Kwas alfa-liponowy", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/8.png",
      description: "Silny antyoksydant; stosowany m.in. w neuropatiach, wsparciu metabolizmu i ochronie wątroby." 
    },
    { 
      name: "Cernevit", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/9.png",
      description: "Kompleks witamin stosowany jako wsparcie w osłabieniu, niedożywieniu oraz zaburzeniach wchłaniania." 
    },
    { 
      name: "Magnez", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/10.png",
      description: "Może wspierać układ nerwowy i mięśniowy, rytm serca oraz redukcję skurczów i napięć." 
    },
    { 
      name: "Aminokwasy i elektrolity", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/11.png",
      description: "Wspomagają regenerację, odbudowę tkanek oraz układ nerwowy i odpornościowy." 
    },
    { 
      name: "Kompleks neuroochronny", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/12.png",
      description: "Składniki wspierające równowagę układu nerwowego, sen i funkcje poznawcze." 
    },
    { 
      name: "Kurkuma (kurkumina)", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/13.png",
      description: "Związek o właściwościach przeciwzapalnych opisanych w literaturze medycznej." 
    },
    { 
      name: "Witamina C", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/14.png",
      description: "Stosowana w medycynie wspomagającej m.in. u pacjentów leczonych onkologicznie, przy infekcjach i przewlekłych procesach zapalnych." 
    },
    { 
      name: "Solcoseryl", 
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/15.png",
      description: "Bezbiałkowy dializat krwi cielęcej; wspiera procesy gojenia i regeneracji tkanek; może wspomagać krążenie obwodowe oraz odnowę mięśni i skóry." 
    }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.85; // Scroll by roughly one card width
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="substancje" className="min-h-screen snap-start flex flex-col justify-center py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#8B5A2B] uppercase tracking-[0.3em] font-semibold text-sm mb-4 block">Portfolio Terapii</span>
          <h2 className="text-3xl md:text-5xl font-serif">NAJCZĘŚCIEJ STOSOWANE SUBSTANCJE</h2>
          <div className="w-16 h-1 bg-[#8B5A2B] mx-auto mt-6"></div>
        </div>

        {/* 
          Mobile: flex with horizontal scroll 
          Desktop: grid 
        */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory hide-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-x-visible sm:pb-0 sm:gap-8"
        >
          {substances.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col flex-shrink-0 w-[85vw] snap-center sm:w-auto sm:snap-align-none"
            >
              {/* Image Header */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Content Part */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h4 className="text-lg md:text-xl font-bold mb-3 text-gray-900 leading-tight">
                  {item.name}
                </h4>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed flex-grow">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Navigation Bar */}
        <div className="flex justify-center mt-8 md:hidden">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleScroll('left')}
              className="w-12 h-12 rounded-full bg-white border border-[#8B5A2B]/20 flex items-center justify-center text-[#8B5A2B] shadow-lg active:scale-90 transition-transform"
              aria-label="Poprzedni"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button 
              onClick={() => handleScroll('right')}
              className="w-12 h-12 rounded-full bg-white border border-[#8B5A2B]/20 flex items-center justify-center text-[#8B5A2B] shadow-lg active:scale-90 transition-transform"
              aria-label="Następny"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSubstances;
