
import React, { useState, useMemo } from 'react';

interface PricingItem {
  name: string;
  price: string;
}

interface PricingCategory {
  title: string;
  items: PricingItem[];
}

const PricingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);

  const pricingData: PricingCategory[] = [
    {
      title: "RTG",
      items: [
        { name: "Opis RTG", price: "30,00 zł" },
        { name: "Opis RTG CITO", price: "60,00 zł" },
        { name: "RTG w trzech projekcjach", price: "100,00 zł" },
        { name: "RTG barku AP", price: "50,00 zł" },
        { name: "RTG barku osiowe", price: "50,00 zł" },
        { name: "RTG czaszki AP", price: "50,00 zł" },
        { name: "RTG czaszki AP i BOK", price: "80,00 zł" },
        { name: "RTG czaszki celowane Schuller, Stenvers", price: "50,00 zł" },
        { name: "RTG czynnościowe kręgosłupa szyjnego BOK – 1 projekcja", price: "50,00 zł" },
        { name: "RTG czynnościowe kręgosłupa szyjnego BOK – 2 projekcja", price: "80,00 zł" },
        { name: "RTG jamy brzusznej", price: "50,00 zł" }
      ]
    },
    {
      title: "Densytometria",
      items: [
        { name: "Densytometria części L1-L4 kręgosłupa", price: "100,00 zł" },
        { name: "Densytometria kości udowej", price: "100,00 zł" },
        { name: "Densytometria kręgosłupa i kości udowej", price: "150,00 zł" },
        { name: "Densytometria obu kości udowych", price: "150,00 zł" },
        { name: "Densytometria przedramienia", price: "120,00 zł" }
      ]
    },
    {
      title: "Chirurgia plastyczna",
      items: [
        { name: "Konsultacja chirurga plastyka", price: "300 zł" },
        { name: "Laserowa korekcja powiek górnych (dr Kustra)", price: "4500 zł" },
        { name: "Laserowa korekcja powiek dolnych (dr Kustra)", price: "5500 zł" },
        { name: "Laserowa korekcja powiek górnych i dolnych (dr Kustra)", price: "10000 zł" },
        { name: "Lifting księżycowy dolnej części twarzy i szyi (dr Kustra)", price: "16000 zł" },
        { name: "Plastyka powiek górnych metodą chirurgiczną", price: "4500–5000 zł" },
        { name: "Plastyka powiek dolnych metodą chirurgiczną", price: "5500–6000 zł" },
        { name: "Plastyka powiek dolnych + górnych metodą chirurgiczną", price: "10000–11000 zł" },
        { name: "Usunięcie znamiona skórnego / badanie Hist-Pat", price: "600–1000 zł" },
        { name: "Osteotomia bródki", price: "10000–12000 zł" },
        { name: "Wtórna plastyka powiek metodą chirurgiczną", price: "6000–7000 zł" },
        { name: "Przeszczep tkanki tłuszczowej", price: "3000–7000 zł" },
        { name: "Lifting brwi (Brownlift)", price: "6000–9000 zł" }
      ]
    },
    {
      title: "Dermatologia",
      items: [
        { name: "Konsultacja dermatologiczna", price: "280 zł" },
        { name: "Konsultacja dermatologiczna wieloproblemowa", price: "300 zł" },
        { name: "Konsultacja dermatologiczna z dermatoskopią jednej zmiany", price: "300 zł" },
        { name: "Konsultacja z dermatoskopią całego ciała", price: "400 zł" },
        { name: "Konsultacja dermatologiczna z pobraniem wycinka skóry", price: "400 zł" },
        { name: "Mrożenie brodawek krioterapia", price: "300 – 400 zł" },
        { name: "Mrożenie powtórne", price: "120 zł" }
      ]
    }
  ];

  const filteredData = useMemo(() => {
    if (!searchQuery) return pricingData;
    return pricingData.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  }, [searchQuery]);

  const toggleCategory = (index: number) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  };

  return (
    <div className="animate-fade-in bg-[#fcfcfc] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/8.png" 
            className="w-full h-full object-cover brightness-[0.3]"
            alt="Pricing Hero"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <span className="inline-block px-4 py-1 border border-white/30 rounded-full text-[10px] uppercase tracking-[0.4em] mb-6">
            Transparentność i Jakość
          </span>
          <h1 className="text-4xl md:text-6xl font-serif mb-4 tracking-tight uppercase">
            Cennik Usług <span className="italic text-[#C2A687]">Medycznych</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg font-light opacity-80">
            Zapewniamy pełną przejrzystość kosztów. Wszystkie zabiegi realizowane są przez wykwalifikowaną kadrę z użyciem nowoczesnego sprzętu.
          </p>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="sticky top-16 md:top-20 z-40 bg-white shadow-sm border-b border-gray-50 py-6">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="relative group mb-4">
            <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B5A2B] transition-colors"></i>
            <input 
              type="text" 
              placeholder="Wyszukaj usługę lub zabieg..."
              className="w-full bg-gray-50 rounded-full py-4 pl-16 pr-8 focus:outline-none border border-transparent focus:border-[#8B5A2B]/30 focus:bg-white transition-all text-base shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content - Accordion */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-6">
            {filteredData.length > 0 ? (
              filteredData.map((category, catIdx) => {
                const isOpen = openCategoryIndex === catIdx;
                return (
                  <div key={catIdx} className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggleCategory(catIdx)}
                      className="w-full p-8 md:p-10 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-6">
                        <span className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#8B5A2B] text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                        </span>
                        <h2 className="text-2xl md:text-3xl font-serif text-gray-900">{category.title}</h2>
                      </div>
                      <i className={`fa-solid fa-chevron-down transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#8B5A2B]' : 'text-gray-300'}`}></i>
                    </button>
                    
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                      <div className="px-8 md:px-10 divide-y divide-gray-50 border-t border-gray-50">
                        {category.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="py-6 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                            <div className="flex-grow">
                              <p className="text-lg text-gray-800 font-medium group-hover:text-[#8B5A2B] transition-colors">{item.name}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xl font-serif text-[#8B5A2B] whitespace-nowrap bg-[#8B5A2B]/5 px-6 py-2 rounded-full">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20">
                <i className="fa-solid fa-circle-question text-5xl text-gray-200 mb-6 block"></i>
                <p className="text-xl text-gray-400 font-light italic">Nie znaleziono usług spełniających kryteria wyszukiwania.</p>
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="mt-6 text-[#8B5A2B] font-bold uppercase tracking-widest text-xs hover:underline"
                >
                  Pokaż pełny cennik
                </button>
              </div>
            )}
          </div>

          {/* Note Section - Updated Background to #3d3834 */}
          <div className="mt-24 p-10 bg-[#3d3834] rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <h3 className="text-2xl font-serif">Ważne informacje</h3>
              <p className="text-white/60 font-light leading-relaxed text-sm">
                Podane ceny mają charakter orientacyjny i nie stanowią oferty handlowej w rozumieniu Art.66 par.1 Kodeksu Cywilnego. 
                Ostateczny koszt zabiegu jest ustalany podczas konsultacji z lekarzem specjalistą. 
              </p>
            </div>
            <div className="shrink-0">
               <a href="tel:+48182001010" className="bg-[#8B5A2B] text-white px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#6D4521] transition-all shadow-lg inline-block">
                 Zadzwoń: +48 18 200 10 10
               </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
