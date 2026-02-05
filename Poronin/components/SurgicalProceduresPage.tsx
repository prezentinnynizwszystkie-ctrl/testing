
import React, { useRef, useState, useEffect, useMemo } from 'react';

const SB_URL = "https://pbyfajvltehsuugpayej.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieWZhanZsdGVoc3V1Z3BheWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NzIwMTAsImV4cCI6MjA4MjQ0ODAxMH0.Ne6DVfqwjira3GT--AIoFCrRop6KtrlbLqgF1eOX77U";

interface Category {
  Id: string;
  KategoriaZabiegu: string;
  ShortText: string;
  HeroPhoto: string;
}

interface Procedure {
  Id: string;
  NazwaZabiegu: string;
  Podkategoria: string;
  CenaZabiegu: string;
  Lekarze: string;
}

const SurgicalProceduresPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSubcategories, setOpenSubcategories] = useState<{ [key: string]: boolean }>({});
  
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const catRes = await fetch(`${SB_URL}/rest/v1/GMPoroninKategorieZabiegow?select=*&order=Id.asc`, {
          headers: { "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}` }
        });
        const catData = await catRes.json();
        
        const docRes = await fetch(`${SB_URL}/rest/v1/GMPLekarze?select=*`, {
          headers: { "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}` }
        });
        const docData = await docRes.json();

        if (Array.isArray(catData)) setCategories(catData);
        if (Array.isArray(docData)) setDoctorsList(docData);
      } catch (error) {
        console.error("Fetch Categories Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProcedures = async () => {
      if (!selectedCategory) return;
      try {
        const res = await fetch(`${SB_URL}/rest/v1/GMPoroninZabiegiChirurgiczne?KategoriaZabiegu=eq.${encodeURIComponent(selectedCategory.KategoriaZabiegu)}&select=*`, {
          headers: { "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setProcedures(data);
          setOpenSubcategories({});
        }
      } catch (error) {
        console.error("Fetch Procedures Error:", error);
      }
    };
    fetchProcedures();
  }, [selectedCategory]);

  const toggleSubcategory = (sub: string) => {
    setOpenSubcategories(prev => ({ ...prev, [sub]: !prev[sub] }));
  };

  const groupedProcedures = useMemo(() => {
    const groups: { [key: string]: Procedure[] } = {};
    procedures.forEach(p => {
      const sub = p.Podkategoria || "default";
      if (!groups[sub]) groups[sub] = [];
      groups[sub].push(p);
    });
    return groups;
  }, [procedures]);

  const getDoctorData = (id: string) => {
    return doctorsList.find(d => d.id === id.trim());
  };

  const handleBack = () => {
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5A2B]"></div>
    </div>
  );

  // Widok szczegółowy kategorii (zamiast popupu)
  if (selectedCategory) {
    return (
      <div className="animate-fade-in bg-white min-h-screen flex flex-col">
        <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden shrink-0">
          <div className="absolute inset-0 z-0">
            <img src={selectedCategory.HeroPhoto} className="w-full h-full object-cover brightness-[0.4]" alt={selectedCategory.KategoriaZabiegu} />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center text-white">
            <button 
              onClick={handleBack}
              className="mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white/70 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-arrow-left"></i>
              Powrót do kategorii
            </button>
            <h1 className="text-3xl md:text-6xl font-serif uppercase tracking-tight">{selectedCategory.KategoriaZabiegu}</h1>
          </div>
        </section>

        <section className="flex-grow py-12 md:py-24 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 border-b border-gray-100 pb-4 mb-8">Dostępne zabiegi i procedury</h3>
              
              {Object.keys(groupedProcedures).map((subKey) => {
                const isDefault = subKey === "default";
                const subProcs = groupedProcedures[subKey];
                const isExpanded = openSubcategories[subKey] || isDefault;

                return (
                  <div key={subKey} className={`${!isDefault ? 'border border-gray-100 rounded-[2rem] overflow-hidden mb-6' : ''}`}>
                    {!isDefault && (
                      <button 
                        onClick={() => toggleSubcategory(subKey)}
                        className="w-full p-8 flex items-center justify-between bg-gray-50/50 hover:bg-gray-100 transition-colors text-left"
                      >
                        <span className="text-xs uppercase tracking-[0.1em] font-black text-gray-900">{subKey}</span>
                        <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#8B5A2B]' : ''}`}></i>
                      </button>
                    )}
                    
                    <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className={`${!isDefault ? 'px-8 pb-4' : ''}`}>
                        {subProcs.map((proc) => (
                          <div key={proc.Id} className="flex flex-col py-8 border-b border-gray-50 last:border-0 gap-4">
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                              <p className="text-xl font-bold text-gray-800 leading-tight">{proc.NazwaZabiegu}</p>
                              <span className="text-xl font-serif text-[#8B5A2B] whitespace-nowrap">{proc.CenaZabiegu || "Wycena ind."}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {proc.Lekarze && proc.Lekarze.split(',').map((lekId, idx) => {
                                const doc = getDoctorData(lekId);
                                if (!doc) return null;
                                return (
                                  <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                    <div className="w-5 h-5 rounded-full overflow-hidden">
                                      <img src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedPoronin/16.12.2025.png" alt={doc.ImieNazwiskoTytul} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">{doc.ImieNazwiskoTytul}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Widok listy kategorii
  return (
    <div className="animate-fade-in bg-white">
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/9.png" className="w-full h-full object-cover brightness-[0.4]" alt="Hero" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-7xl font-serif mb-6 uppercase">Zabiegi <span className="italic text-[#d4af37]">Chirurgiczne</span></h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light opacity-90">Precyzja i bezpieczeństwo w tatrzańskim otoczeniu.</p>
        </div>
      </section>

      <section className="py-24 bg-[#fcfcfc]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="text-[#8B5A2B] uppercase tracking-[0.4em] font-bold text-xs mb-4 block">Specjalizacje</span>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight uppercase">Wybierz kategorię zabiegów</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div 
                key={cat.Id} 
                onClick={() => setSelectedCategory(cat)} 
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-lg transition-all hover:-translate-y-3 h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={cat.HeroPhoto} alt={cat.KategoriaZabiegu} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="text-2xl font-serif text-gray-900 mb-3 uppercase group-hover:text-[#8B5A2B] transition-colors">{cat.KategoriaZabiegu}</h4>
                      <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-light">{cat.ShortText}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-black text-[#8B5A2B]">Szczegóły zabiegów <i className="fa-solid fa-arrow-right-long ml-2"></i></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SurgicalProceduresPage;
