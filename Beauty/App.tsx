import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, Users, Cpu, Library, Calendar, CheckCircle, Phone, Globe, MapPin, Tag, Mail, User, Activity, ChevronLeft
} from 'lucide-react';

import { INITIAL_DATA } from './constants';
import { BeautyPlannerData } from './types';
import { supabase } from './lib/supabase';
import { GoogleGenAI } from "@google/genai";
import Skeleton from './components/Skeleton';

// Lazy Loading Views for better performance
const DashboardView = lazy(() => import('./views/DashboardView'));
const TeamView = lazy(() => import('./views/TeamView'));
const DevicesView = lazy(() => import('./views/DevicesView'));
const TreatmentsView = lazy(() => import('./views/TreatmentsView'));
const TreatmentDetailView = lazy(() => import('./views/TreatmentDetailView'));
const BlogView = lazy(() => import('./views/BlogView'));
const PlannerAuthView = lazy(() => import('./views/PlannerAuthView'));
const PlannerView = lazy(() => import('./views/PlannerView'));
const PricelistView = lazy(() => import('./views/PricelistView'));

type ViewType = 'splash' | 'menu' | 'planner' | 'planner-auth' | 'about' | 'team' | 'devices' | 'treatments' | 'treatment-detail' | 'blog' | 'pricelist';

const BOOKSY_URL = 'https://booksy.com/pl-pl/dl/show-business/267624?utm_medium=c2c_referral';
const SHOW_COMPARISON_FEATURE = false;

// Helper for Supabase image optimization
export const optimizeImg = (url: string, width = 800) => {
  if (url && url.includes('supabase.co')) {
    return `${url}?width=${width}&quality=80`;
  }
  return url;
};

interface BeautyAppProps {
    onBack: () => void;
}

const App: React.FC<BeautyAppProps> = ({ onBack }) => {
  // Beauty Planner Data State - starts with INITIAL_DATA but can be overwritten by Supabase fetch
  const [beautyPlanData, setBeautyPlanData] = useState<BeautyPlannerData>(INITIAL_DATA);
  
  // Changed initial view from 'splash' to 'menu'
  const [view, setView] = useState<ViewType>('menu');
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [menuSliderIndex, setMenuSliderIndex] = useState(0);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  
  const [staffList, setStaffList] = useState<any[]>([]);
  const [devicesList, setDevicesList] = useState<any[]>([]);
  const [treatmentsList, setTreatmentsList] = useState<any[]>([]);
  const [blogPostsList, setBlogPostsList] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [locationName, setLocationName] = useState<string>('Bukowina Tatrzańska');
  const [isLoadingUV, setIsLoadingUV] = useState(false);

  const [selectedToCompare, setSelectedToCompare] = useState<any[]>([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);

  // New Navbar State for Scroll Effect
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fix: Added missing currentSelectedTreatment derivation for the detail view
  const currentSelectedTreatment = treatmentsList.find(t => String(t.id) === String(selectedTreatmentId));

  // Fix: Added missing toggleToCompare function for selection logic
  const toggleToCompare = (item: any) => {
    setSelectedToCompare((prev) => {
      const isSelected = prev.find((i) => i.id === item.id);
      if (isSelected) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 800], [0, 150]);
  
  const beautyPlanImages = [
    optimizeImg("https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/MainApp/GM/beautyplanhero2.webp"),
    optimizeImg("https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/MainApp/GM/BeautyPlanHero.webp")
  ];

  const menuSliderItems = [
    { id: 'team', label: 'Nasz zespół', desc: 'O Twój wygląd i bezpieczeństwo dbają wykwalifikowani specjaliści...', image: optimizeImg('https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/MainApp/GM/HeroPhotos/ZespolHero.webp'), icon: Users },
    { id: 'devices', label: 'Nasze urządzenia', desc: 'Pracujemy wyłącznie na certyfikowanym sprzęcie High-Tech...', image: optimizeImg('https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/MainApp/GM/HeroPhotos/UrzadzeniaHero.webp'), icon: Cpu },
    { id: 'treatments', label: 'Zabiegi', desc: 'Szeroki wachlarz procedur pielęgnacyjnych...', image: optimizeImg('https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/MainApp/GM/HeroPhotos/ZabiegiHero.webp'), icon: Sparkles },
    { id: 'blog', label: 'Blog GalicaMed', desc: 'Zainspiruj się wiedzą o innowacjach...', image: optimizeImg('https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/MainApp/GM/HeroPhotos/bloghero.webp'), icon: Library },
  ];

  // Removed Splash Screen Timer useEffect

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const fetchSortedData = async (table: string) => {
          const { data, error } = await supabase.from(table).select('*');
          if (error) throw error;
          
          return data.sort((a, b) => {
            const valA = a.sort_order ?? a.SortOrder ?? a.sortOrder ?? 9999;
            const valB = b.sort_order ?? b.SortOrder ?? b.sortOrder ?? 9999;
            return valA - valB;
          });
        };

        const [staffSorted, devicesSorted, treatmentsSorted, blogRes] = await Promise.all([
          fetchSortedData('GMBZespol'),
          fetchSortedData('GMBUrzadzenia'),
          fetchSortedData('GMBZabiegi'),
          supabase.from('GMBBlog').select('*')
        ]);

        if (staffSorted) {
          const mappedStaff = staffSorted.map(s => ({ 
            id: s.Id, 
            name: s.Name, 
            role: s.Title,
            shortText: s.ShortText,
            ...s.Text, 
            image: optimizeImg(s.Photo)
          }));
          setStaffList(mappedStaff);
        }

        if (devicesSorted) {
          setDevicesList(devicesSorted.map(d => ({ 
            id: d.Id, 
            name: d.Nazwa, 
            shortDesc: d.TextShort, 
            ...d.TextLong, 
            image: optimizeImg(d.Photo || d.image || d.TextLong?.image) 
          })));
        }

        if (treatmentsSorted) {
          setTreatmentsList(treatmentsSorted.map(t => ({ 
            id: t.Id, 
            name: t.Nazwa, 
            shortDesc: t.TextShort, 
            details: t.TextLong, 
            image: optimizeImg(t.Photo || t.image || t.TextLong?.image), 
            videoUrl: t.VideoUrl, 
            pricelist: t.Cennik 
          })));
        }

        if (blogRes.data) {
          setBlogPostsList(blogRes.data.map(p => ({ 
            id: p.Id, 
            title: p.Title, 
            image: optimizeImg(p.Photo), 
            excerpt: p.Excerpt, 
            content: p.Text?.content, 
            category: p.category || 'Edukacja', 
            readTime: p.readTime || '5 min' 
          })));
        }
      } catch (err) {
        console.error("Critical Fetch Error:", err);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Bukowina Tatrzańska na sztywno
    if (view === 'menu' && uvIndex === null) {
      fetchUVData(49.3361, 20.0981);
    }
  }, [view]);

  const fetchUVData = async (lat: number, lon: number) => {
    setIsLoadingUV(true);
    try {
      // @ts-ignore
      const apiKey = import.meta.env.VITE_API_KEY || process.env.API_KEY;
      if (!apiKey) throw new Error("No API Key");

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `What is the current UV index for ${lat}, ${lon}? JSON format: {"uv": number, "city": "Bukowina Tatrzańska"}.`,
        config: { tools: [{ googleSearch: {} }] }
      });
      const parsed = JSON.parse(response.text.replace(/```json|```/g, '').trim());
      setUvIndex(parsed.uv);
      setLocationName("Bukowina Tatrzańska");
    } catch {
      setUvIndex(4);
    } finally {
      setIsLoadingUV(false);
    }
  };

  const getUVStatus = (uv: number | null) => {
    if (uv === null) return null;
    if (uv <= 2) return { level: 'Niski', header: 'Niski indeks UV.', color: 'bg-green-500', textColor: 'text-green-700', icon: MapPin };
    if (uv <= 5) return { level: 'Umiarkowany', header: 'Umiarkowane słońce.', color: 'bg-yellow-500', textColor: 'text-yellow-700', icon: MapPin };
    return { level: 'Wysoki', header: 'Wysokie promieniowanie!', color: 'bg-orange-500', textColor: 'text-orange-700', icon: MapPin };
  };

  const menuItems = [
    { id: 'menu', label: 'Główna', icon: Globe },
    { id: 'pricelist', label: 'Cennik', icon: Tag },
    { id: 'team', label: 'Zespół', icon: Users },
    { id: 'devices', label: 'Urządzenia', icon: Cpu },
    { id: 'treatments', label: 'Zabiegi', icon: Sparkles },
    { id: 'mbst', label: 'MBST', icon: Activity, href: 'https://www.terapiambst.pl' },
    { id: 'blog', label: 'Blog', icon: Library },
    { id: 'planner-auth', label: 'Planer', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] relative overflow-x-hidden">
      
      {/* REWRITTEN NAVBAR TO MATCH PORONIN STYLE */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled || isSideMenuOpen ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}>
          <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center relative z-[110]">
            
            {/* Left: Back Button & Logo */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className={`flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold transition-colors bg-transparent border-none cursor-pointer group ${scrolled || isSideMenuOpen ? 'text-gray-400 hover:text-[#D4AF37]' : 'text-white/70 hover:text-white'}`}
                    title="Powrót do wyboru placówki"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Placówki</span>
                </button>

                <button 
                    onClick={() => setView('menu')}
                    className="h-8 md:h-10 block group transition-transform hover:scale-105 cursor-pointer outline-none border-none bg-transparent relative"
                >
                    <img 
                        src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedPoronin/LogoOgolne.png" 
                        alt="GalicaMed Logo" 
                        className={`h-full w-auto object-contain transition-all duration-300 ${!scrolled && !isSideMenuOpen ? 'brightness-0 invert' : ''}`} 
                    />
                </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {menuItems.slice(0, 5).map((item) => { // Displaying key items
                if (item.href) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer ${scrolled ? 'text-gray-600 hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id as ViewType)}
                    className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer ${scrolled ? 'text-gray-600 hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={BOOKSY_URL} target="_blank" rel="noopener noreferrer"
                className="bg-[#D4AF37] text-white px-8 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#b5952f] transition-all shadow-lg"
              >
                Rezerwacja
              </motion.a>
            </nav>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} 
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center focus:outline-none bg-transparent border-none cursor-pointer"
            >
               <div className="relative w-6 h-4 flex flex-col justify-between">
                <span className={`block h-[2px] w-full transition-all duration-300 ease-in-out ${isSideMenuOpen ? 'rotate-45 translate-y-[7px] bg-gray-900' : scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
                <span className={`block h-[2px] w-full transition-all duration-200 ease-in-out ${isSideMenuOpen ? 'opacity-0' : scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
                <span className={`block h-[2px] w-full transition-all duration-300 ease-in-out ${isSideMenuOpen ? '-rotate-45 -translate-y-[7px] bg-gray-900' : scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
              </div>
            </button>
          </div>
        </nav>

      <main className="relative z-10">
        <Suspense fallback={<div className="pt-32 flex justify-center"><Skeleton className="w-20 h-20 rounded-full" /></div>}>
          {view === 'menu' && (
            <DashboardView 
              heroParallax={heroParallax} 
              menuSliderItems={menuSliderItems} 
              menuSliderIndex={menuSliderIndex}
              prevMenuSlide={() => setMenuSliderIndex((prev) => (prev - 1 + menuSliderItems.length) % menuSliderItems.length)}
              nextMenuSlide={() => setMenuSliderIndex((prev) => (prev + 1) % menuSliderItems.length)}
              setView={setView}
              beautyPlanImageIndex={0}
              beautyPlanImages={beautyPlanImages}
              uvIndex={uvIndex}
              locationName={locationName}
              isLoadingUV={isLoadingUV}
              getUVStatus={getUVStatus}
              fetchUVData={fetchUVData}
              setIsContactModalOpen={setIsContactModalOpen}
              treatmentsList={treatmentsList}
              devicesList={devicesList}
            />
          )}
          {view === 'team' && <TeamView staffList={staffList} setIsContactModalOpen={setIsContactModalOpen} setView={setView} />}
          {view === 'devices' && <DevicesView devicesList={devicesList} selectedToCompare={selectedToCompare} toggleToCompare={toggleToCompare} setView={setView} showComparison={SHOW_COMPARISON_FEATURE} />}
          {view === 'treatments' && (
            <TreatmentsView 
              treatmentsList={treatmentsList} 
              selectedToCompare={selectedToCompare} 
              toggleToCompare={toggleToCompare} 
              BOOKSY_URL={BOOKSY_URL} 
              setView={setView} 
              onSelectTreatment={(id) => {
                setSelectedTreatmentId(id);
                setView('treatment-detail');
              }}
              showComparison={SHOW_COMPARISON_FEATURE}
              isLoading={isLoadingData}
            />
          )}
          {view === 'treatment-detail' && currentSelectedTreatment && (
            <TreatmentDetailView 
              treatment={currentSelectedTreatment} 
              onBack={() => setView('treatments')} 
              BOOKSY_URL={BOOKSY_URL} 
            />
          )}
          {view === 'blog' && <BlogView posts={blogPostsList} setView={setView} isLoading={isLoadingData} />}
          {view === 'planner-auth' && (
            <PlannerAuthView 
              setView={setView} 
              onAuthSuccess={(data) => {
                setBeautyPlanData(data); // Update global state with fetched plan
                setView('planner');
              }} 
            />
          )}
          {view === 'planner' && <PlannerView data={beautyPlanData} setView={setView} setIsContactModalOpen={setIsContactModalOpen} />}
          {view === 'pricelist' && <PricelistView treatments={treatmentsList} setView={setView} />}
        </Suspense>
      </main>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isSideMenuOpen && (
          <div className={`fixed inset-0 bg-white z-[105] transition-all duration-500 ease-in-out md:hidden flex flex-col ${isSideMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12">
              <div className="flex flex-col gap-1">
                <button 
                    onClick={onBack}
                    className="group py-4 flex items-center gap-4 border-b border-gray-100 text-[#D4AF37]"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-xl font-serif tracking-[0.05em] uppercase">Wybór placówki</span>
                </button>
                {menuItems.map((item, index) => (
                  item.href ? (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group py-4 flex items-center justify-between border-b border-gray-100 transition-all duration-700`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-baseline gap-4">
                        <item.icon className="w-5 h-5 text-[#D4AF37]" />
                        <span className="text-xl font-serif text-gray-900 tracking-[0.05em] uppercase">{item.label}</span>
                      </div>
                    </a>
                  ) : (
                    <button 
                      key={item.id}
                      onClick={() => { setView(item.id as ViewType); setIsSideMenuOpen(false); }}
                      className={`group py-4 flex items-center justify-between border-b border-gray-100 transition-all duration-700`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-baseline gap-4">
                        <item.icon className="w-5 h-5 text-[#D4AF37]" />
                        <span className="text-xl font-serif text-gray-900 tracking-[0.05em] uppercase">{item.label}</span>
                      </div>
                    </button>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isContactModalOpen && (
          <ContactModal isSent={isMessageSent} onClose={() => { setIsContactModalOpen(false); setIsMessageSent(false); }} onSend={() => setIsMessageSent(true)} message={contactMessage} setMessage={setContactMessage} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const ContactModal = ({ isSent, onClose, onSend, message, setMessage }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6">
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} className="bg-white w-full max-w-lg rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl">
      {!isSent ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-serif text-gray-800 mb-6">Wyślij wiadomość</h2>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="W czym możemy pomóc?" className="w-full h-40 bg-gray-50 border border-gray-100 rounded-[24px] p-6 mb-8 resize-none focus:outline-none focus:border-[#D4AF37]" />
          <button onClick={onSend} className="w-full py-5 bg-[#5C4033] text-white rounded-full font-medium shadow-xl hover:bg-[#4A3329] transition-all">Wyślij wiadomość</button>
        </div>
      ) : (
        <div className="text-center py-10 flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
          <h2 className="text-xl font-serif text-gray-800">Wiadomość wysłana!</h2>
          <p className="text-gray-500 mt-2">Nasz kosmetolog odpowie najszybciej jak to możliwe.</p>
        </div>
      )}
      <button onClick={onClose} className="mt-4 text-gray-400 w-full text-center hover:text-gray-600 py-2">Zamknij</button>
    </motion.div>
  </motion.div>
);

const Footer = () => {
  return (
    <footer className="mt-12 bg-white border-t border-gray-100 overflow-hidden">
      <div className="md:max-w-screen-xl md:mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Brand Info */}
          <div className="space-y-8 text-center lg:text-left">
            <img src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/MainApp/GM/BEAUTY%20LOGO%20GALICAMED.png" className="h-20 mx-auto lg:mx-0 opacity-90" />
            <div className="space-y-4">
              <h4 className="font-serif text-2xl text-gray-800">GalicaMed – Zawsze blisko Ciebie</h4>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-medium leading-relaxed">Poronin | Bukowina Tatrzańska | Nowy Targ | Maniowy</p>
            </div>
            <p className="text-[11px] text-gray-300 tracking-[0.3em] uppercase pt-8">GalicaMed Beauty Planner &copy; 2024</p>
          </div>

          {/* Right Side: Contact Tile */}
          <div className="bg-[#5C4033]/5 rounded-[40px] p-8 md:p-12 border border-[#5C4033]/10">
            <div className="mb-8 text-center lg:text-left">
              <h3 className="text-2xl font-serif text-gray-800 mb-2">Skontaktuj się z nami</h3>
              <p className="text-gray-500 text-sm">Jesteśmy do Twojej dyspozycji.</p>
            </div>

            <div className="flex flex-col gap-4">
              <a href="tel:+48502221562" className="flex items-center gap-6 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#D4AF37]/30 transition-all group">
                <div className="p-4 bg-[#5C4033] text-white rounded-full group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Zadzwoń do nas</span>
                  <span className="text-xl font-serif text-gray-800 group-hover:text-[#D4AF37] transition-colors">+48 502 221 562</span>
                </div>
              </a>

              <a href="mailto:recepcja@galicamedbeauty.pl" className="flex items-center gap-6 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#D4AF37]/30 transition-all group">
                <div className="p-4 bg-[#5C4033] text-white rounded-full group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Napisz wiadomość</span>
                  <span className="text-xl font-serif text-gray-800 group-hover:text-[#D4AF37] transition-colors">recepcja@galicamedbeauty.pl</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;