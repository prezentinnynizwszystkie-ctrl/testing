
import React, { useRef, useState, useEffect, useMemo } from 'react';

const SB_URL = "https://pbyfajvltehsuugpayej.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieWZhanZsdGVoc3V1Z3BheWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NzIwMTAsImV4cCI6MjA4MjQ0ODAxMH0.Ne6DVfqwjira3GT--AIoFCrRop6KtrlbLqgF1eOX77U";

interface Doctor {
  id: string;
  TytulImieNazwisko: string;
  Photo: string;
  Specjalizacja: string;
  Opis: string;
}

interface DoctorsPageProps {
  onDoctorClick: (id: string) => void;
}

const DoctorsPage: React.FC<DoctorsPageProps> = ({ onDoctorClick }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const sliderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${SB_URL}/rest/v1/GMPoroninLekarze?select=*&order=TytulImieNazwisko.asc`, {
          headers: { "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) setDoctors(data);
      } catch (error) {
        console.error("Fetch Doctors Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Filtrowanie i grupowanie
  const filteredGroupedDoctors = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    // 1. Filtrujemy lekarzy pasujących do zapytania (nazwisko LUB specjalizacja)
    const filteredDocs = doctors.filter(doc => 
      doc.TytulImieNazwisko.toLowerCase().includes(query) || 
      doc.Specjalizacja.toLowerCase().includes(query)
    );

    // 2. Grupujemy przefiltrowanych lekarzy według specjalizacji (obsługa wielu specjalizacji po przecinku)
    const groups: { [key: string]: Doctor[] } = {};
    filteredDocs.forEach(doc => {
      const specs = doc.Specjalizacja.split(',').map(s => s.trim());
      specs.forEach(spec => {
        if (!spec) return;
        const normalizedSpec = spec.charAt(0).toUpperCase() + spec.slice(1);
        
        // Jeśli szukamy konkretnej specjalizacji, pokazujemy tylko tę grupę, która do niej pasuje? 
        // Nie, lepiej pokazać lekarza we wszystkich jego grupach, jeśli pasuje do wyszukiwania.
        if (!groups[normalizedSpec]) groups[normalizedSpec] = [];
        groups[normalizedSpec].push(doc);
      });
    });

    return groups;
  }, [doctors, searchQuery]);

  const toggleGroup = (groupName: string) => {
    setActiveGroup(activeGroup === groupName ? null : groupName);
  };

  const scroll = (group: string, direction: 'left' | 'right') => {
    const ref = sliderRefs.current[group];
    if (ref) {
      const { scrollLeft, clientWidth } = ref;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.5 : scrollLeft + clientWidth * 0.5;
      ref.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5A2B]"></div>
    </div>
  );

  return (
    <div className="animate-fade-in bg-white min-h-screen">
      {/* Subtelny Hero */}
      <section className="relative h-[25vh] w-full flex items-center justify-center overflow-hidden border-b border-gray-50">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/lekarz.png" 
            className="w-full h-full object-cover brightness-[0.95] opacity-20 grayscale"
            alt="Doctors Hero"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="text-[9px] uppercase tracking-[0.6em] font-black text-[#8B5A2B] mb-2 block">Zespół Medyczny</span>
          <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-tighter text-gray-900">
            Nasi <span className="italic text-[#d4af37]">Specjaliści</span>
          </h1>
        </div>
      </section>

      {/* Wyszukiwarka */}
      <section className="py-8 bg-white sticky top-16 md:top-20 z-40 shadow-sm border-b border-gray-50">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="relative group">
            <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B5A2B] transition-colors"></i>
            <input 
              type="text" 
              placeholder="Szukaj po nazwisku lub specjalizacji..."
              className="w-full bg-gray-50 rounded-full py-5 pl-14 pr-12 focus:outline-none border border-transparent focus:border-[#8B5A2B]/30 focus:bg-white transition-all text-sm md:text-base shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Lista Specjalizacji (Kompaktowy Akordeon) */}
      <section className="py-8 md:py-12 min-h-[40vh]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="divide-y divide-gray-100">
            {Object.keys(filteredGroupedDoctors).length > 0 ? (
              Object.keys(filteredGroupedDoctors).map((groupName) => {
                const isOpen = activeGroup === groupName || (searchQuery.length > 2); // Automatycznie rozwiń przy wyszukiwaniu
                const count = filteredGroupedDoctors[groupName].length;
                const isLongName = groupName.length > 25;

                return (
                  <div key={groupName} className="group/item">
                    {/* Nagłówek sekcji */}
                    <button 
                      onClick={() => toggleGroup(groupName)}
                      className="w-full py-4 md:py-5 flex items-center group transition-all relative"
                    >
                      <div className="flex-grow text-center flex flex-col items-center">
                         <h2 className={`font-serif uppercase tracking-tight transition-all duration-500 max-w-[85%] mx-auto ${
                            isOpen ? 'text-[#8B5A2B]' : 'text-gray-800'
                         } ${
                            isLongName 
                              ? 'text-base md:text-xl leading-[1.1]' 
                              : 'text-lg md:text-2xl leading-tight'
                         }`}>
                          {groupName}
                        </h2>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400 mt-1 font-bold">
                          Ilość specjalistów: {count}
                        </span>
                      </div>
                      
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                        <i className={`fa-solid fa-plus text-[10px] transition-transform duration-500 ${isOpen ? 'rotate-45 text-[#8B5A2B]' : 'text-gray-300'}`}></i>
                      </div>
                    </button>

                    {/* Zawartość (Slider) */}
                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[700px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                      <div className="flex justify-end gap-2 mb-4 pr-2">
                          <button onClick={() => scroll(groupName, 'left')} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-[#8B5A2B] hover:text-white text-gray-400 transition-all active:scale-90">
                            <i className="fa-solid fa-chevron-left text-[10px]"></i>
                          </button>
                          <button onClick={() => scroll(groupName, 'right')} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-[#8B5A2B] hover:text-white text-gray-400 transition-all active:scale-90">
                            <i className="fa-solid fa-chevron-right text-[10px]"></i>
                          </button>
                      </div>

                      <div 
                        // Fix: Ensure ref callback returns void instead of assigned element to resolve TS assignment error
                        ref={el => { sliderRefs.current[groupName] = el; }}
                        className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory hide-scrollbar no-scrollbar scroll-smooth pt-2"
                      >
                        {filteredGroupedDoctors[groupName].map((doc, idx) => (
                          <div 
                            key={`${groupName}-${doc.id}-${idx}`} 
                            className="w-[220px] shrink-0 snap-center group/card cursor-pointer"
                            onClick={() => onDoctorClick(doc.id)}
                          >
                            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-md border border-gray-50 flex flex-col h-full">
                              <div className="relative h-36 md:h-44 overflow-hidden bg-gray-50/30 shrink-0">
                                <img 
                                  src={doc.Photo || "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedPoronin/16.12.2025.png"} 
                                  alt={doc.TytulImieNazwisko} 
                                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover/card:scale-110" 
                                  style={{ 
                                    maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                                  }}
                                />
                              </div>

                              <div className="p-4 pt-2 flex flex-col flex-grow text-center">
                                <h4 className="text-[13px] font-bold text-gray-900 mb-1 leading-tight tracking-tight">{doc.TytulImieNazwisko}</h4>
                                <p className="text-[#8B5A2B] text-[7px] uppercase tracking-[0.1em] font-black min-h-[24px] flex items-center justify-center leading-tight opacity-70 whitespace-normal">
                                  {doc.Specjalizacja}
                                </p>
                                
                                <div className="mt-auto pt-3 border-t border-gray-50/50">
                                  <span className="inline-flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] font-bold text-gray-300 group-hover/card:text-[#8B5A2B] transition-colors">
                                    Profil
                                    <i className="fa-solid fa-arrow-right-long opacity-0 group-hover/card:opacity-100 transition-all -translate-x-1 group-hover/card:translate-x-0"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center">
                <i className="fa-solid fa-user-slash text-4xl text-gray-200 mb-4 block"></i>
                <p className="text-gray-400 italic">Nie znaleziono specjalisty pasującego do Twojego zapytania.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info bar na dole */}
      <section className="py-12 border-t border-gray-50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-light italic">Nasza kadra to zespół ekspertów z wieloletnim doświadczeniem klinicznym</p>
        </div>
      </section>
    </div>
  );
};

export default DoctorsPage;
