
import React, { useRef } from 'react';

interface Service {
  title: string;
  description: string;
  imageUrl: string;
}

interface SectionServicesProps {
  onServiceClick?: (title: string) => void;
}

const SectionServices: React.FC<SectionServicesProps> = ({ onServiceClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      title: "Poradnie specjalistyczne",
      description: "Konsultacje komercyjne z doświadczonymi lekarzami wielu dziedzin medycyny.",
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/3.png"
    },
    {
      title: "Zabiegi chirurgiczne",
      description: "Nowoczesna sala zabiegowa i procedury z zakresu chirurgii plastycznej i naczyniowej.",
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/9.png"
    },
    {
      title: "Badania diagnostyczne",
      description: "Kompleksowa diagnostyka obrazowa i laboratoryjna na najwyższym poziomie.",
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/7.png"
    },
    {
      title: "Specjaliści",
      description: "Zespół empatycznych i oddanych ekspertów gotowych nieść pomoc.",
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/lekarz.png"
    },
    {
      title: "Usługi w ramach NFZ",
      description: "Bezpłatna opieka w ramach kontraktu (lekarz POZ, poradnia diabetologiczna).",
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/1.png"
    },
    {
      title: "Terapie infuzyjne",
      description: "Indywidualnie dobrane wlewy witaminowe wspierające regenerację organizmu.",
      imageUrl: "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/wlewy/14.png"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="uslugi" className="min-h-screen snap-start flex flex-col justify-center py-24 bg-[#fcfcfc] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#8B5A2B] uppercase tracking-[0.4em] font-bold text-xs mb-4 block">Nasza oferta</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">ZAKRES OPIEKI MEDYCZNEJ</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#8B5A2B] hover:text-white transition-all shadow-sm">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#8B5A2B] hover:text-white transition-all shadow-sm">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar no-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="min-w-[320px] md:min-w-[420px] snap-center group cursor-pointer"
              onClick={() => onServiceClick?.(service.title)}
            >
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h4 className="text-2xl font-serif mb-4 text-gray-900">{service.title}</h4>
                  <p className="text-gray-500 font-light mb-8 line-clamp-2 flex-grow">{service.description}</p>
                  <button className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold text-[#8B5A2B] group/btn">
                    <span>Zobacz szczegóły</span>
                    <i className="fa-solid fa-chevron-right transition-transform group-hover/btn:translate-x-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionServices;
