
import React, { useRef, useState, useEffect, useMemo } from 'react';

const SB_URL = "https://pbyfajvltehsuugpayej.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieWZhanZsdGVoc3V1Z3BheWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NzIwMTAsImV4cCI6MjA4MjQ0ODAxMH0.Ne6DVfqwjira3GT--AIoFCrRop6KtrlbLqgF1eOX77U";

interface ClinicData {
  Id: string;
  NazwaPoradni: string;
  KategoriaPoradni: string;
  ShortText: string;
  HeroUrl: string;
  ZabiegiPoradni: any;
}

interface SpecialistClinicsPageProps {
  onClinicClick?: (name: string) => void;
}

const SpecialistClinicsPage: React.FC<SpecialistClinicsPageProps> = ({ onClinicClick }) => {
  const [clinics, setClinics] = useState<ClinicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const sliderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SB_URL}/rest/v1/GMPoroninPoradnieKomercyjne?select=*`, {
          headers: {
            "apikey": SB_KEY,
            "Authorization": `Bearer ${SB_KEY}`
          }
        });
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setClinics(data);
        } else {
          console.error("Supabase Error or invalid table structure:", data);
          setClinics([]);
        }
      } catch (error) {
        console.error("Network Error:", error);
        setClinics([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredClinics = useMemo(() => {
    if (!Array.isArray(clinics)) return [];
    return clinics.filter(c => c.NazwaPoradni && c.NazwaPoradni.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [clinics, searchQuery]);

  const groupedClinics = useMemo(() => {
    const groups: { [key: string]: ClinicData[] } = {};
    filteredClinics.forEach(clinic => {
      const cat = clinic.KategoriaPoradni || "Inne";
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(clinic);
    });
    return groups;
  }, [filteredClinics]);

  const scroll = (category: string, direction: 'left' | 'right') => {
    const ref = sliderRefs.current[category];
    if (ref) {
      const { scrollLeft, clientWidth } = ref;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5A2B]"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section - Scenterowano napis poprzez pt-12 na mobile i usunięcie mb-6 */}
      <section className="relative aspect-video md:h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/3.png" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Clinics Hero"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white pt-12 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-serif tracking-tight uppercase mb-0">
            Poradnie Specjalistyczne <br/><span className="italic text-[#C2A687]">Komercyjne</span>
          </h1>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-12 bg-white sticky top-16 md:top-20 z-40 shadow-sm border-b border-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="relative group">
            <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B5A2B] transition-colors"></i>
            <input 
              type="text" 
              placeholder="Wyszukaj poradnię..."
              className="w-full bg-gray-50 rounded-full py-6 pl-16 pr-8 focus:outline-none border border-transparent focus:border-[#8B5A2B]/30 focus:bg-white transition-all text-lg shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Grid Layout na Desktopie, Slider na Mobile */}
      {Object.keys(groupedClinics).length > 0 ? (
        Object.keys(groupedClinics).map((category) => (
          <section key={category} className="py-12 bg-[#fcfcfc] overflow-hidden border-b border-gray-100 last:border-0">
            <div className="container mx-auto px-6 md:px-12">
              <div className="flex flex-col items-center text-center mb-6 gap-4">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-serif leading-tight uppercase">{category}</h2>
                </div>
                {/* Wyśrodkowana nawigacja ze strzałkami */}
                <div className="flex gap-4">
                  <button onClick={() => scroll(category, 'left')} className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-[#8B5A2B] hover:text-white transition-all shadow-sm">
                    <i className="fa-solid fa-arrow-left text-sm"></i>
                  </button>
                  <button onClick={() => scroll(category, 'right')} className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center bg-white hover:bg-[#8B5A2B] hover:text-white transition-all shadow-sm">
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                  </button>
                </div>
              </div>
              
              <div 
                ref={el => { sliderRefs.current[category] = el; }}
                className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-4 snap-x snap-mandatory hide-scrollbar no-scrollbar sm:overflow-visible"
              >
                {groupedClinics[category].map((clinic) => (
                  <div 
                    key={clinic.Id}
                    className="min-w-[280px] sm:min-w-0 snap-center group cursor-pointer"
                    onClick={() => onClinicClick?.(clinic.NazwaPoradni)}
                  >
                    <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl h-full flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={clinic.HeroUrl || "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/3.png"} 
                          alt={clinic.NazwaPoradni} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>
                      <div className="p-8 flex flex-col items-center text-center flex-grow justify-between">
                        <div>
                          <h4 className="text-xl font-serif text-gray-900 group-hover:text-[#8B5A2B] transition-colors">{clinic.NazwaPoradni}</h4>
                          <p className="text-gray-400 text-xs mt-2 font-light line-clamp-2">{clinic.ShortText}</p>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                          <span>Zobacz ofertę</span>
                          <i className="fa-solid fa-arrow-right-long text-[#8B5A2B]"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        <div className="py-24 text-center">
          <p className="text-gray-400 italic">Nie znaleziono poradni lub tabela w Supabase jest pusta.</p>
        </div>
      )}
    </div>
  );
};

export default SpecialistClinicsPage;
