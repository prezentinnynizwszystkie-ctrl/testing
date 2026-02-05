import React, { memo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Sun, MapPin, Gift, ChevronLeft, ChevronRight, Mail, Phone, MessageCircle, Send, User, AlertCircle } from 'lucide-react';
import Skeleton from '../components/Skeleton';
import { optimizeImg } from '../App';
import { GoogleGenAI } from "@google/genai";

interface DashboardViewProps {
  heroParallax: any;
  menuSliderItems: any[];
  menuSliderIndex: number;
  prevMenuSlide: () => void;
  nextMenuSlide: () => void;
  setView: (view: any) => void;
  beautyPlanImageIndex: number;
  beautyPlanImages: string[];
  uvIndex: number | null;
  locationName: string;
  isLoadingUV: boolean;
  getUVStatus: (uv: number | null) => any;
  fetchUVData: (lat: number, lon: number) => void;
  setIsContactModalOpen: (open: boolean) => void;
  treatmentsList: any[];
  devicesList: any[];
}

const MenuTile = memo(({ item, setView }: { item: any, setView: (v: any) => void }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
    whileTap={{ scale: 0.98 }}
    className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full cursor-pointer transition-all"
    onClick={() => setView(item.id)}
  >
    <div className="aspect-[4/3] w-full overflow-hidden">
      <img src={optimizeImg(item.image)} alt={item.label} className="w-full h-full object-cover" />
    </div>
    <div className="p-8 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#5C4033]/5 rounded-xl">
          {React.createElement(item.icon, { className: "w-6 h-6 text-[#5C4033]" })}
        </div>
        <h3 className="text-2xl font-serif text-gray-800">{item.label}</h3>
      </div>
      <p className="text-gray-500 leading-relaxed mb-8 flex-1">{item.desc}</p>
      <button className="w-full py-4 bg-[#5C4033] text-white rounded-full font-medium shadow-lg hover:bg-[#4A3329] transition-all">
        Dowiedz się więcej
      </button>
    </div>
  </motion.div>
));

const MbstSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 mb-8 md:mb-16 relative group cursor-pointer"
  >
    <a href="https://www.terapiambst.pl" target="_blank" rel="noopener noreferrer" className="block relative w-full h-[400px] md:h-[500px]">
      <div className="absolute inset-0">
         <img
            src={optimizeImg("https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedBeauty/MBST/lezysobie.webp")}
            alt="Terapia MBST GalicaMed"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/20 md:to-transparent" />
      </div>

      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end md:justify-center items-start text-left">
        <div className="md:w-2/3 lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                    Nowość
                </span>
                <span className="px-3 py-1 border border-white/30 text-white/90 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
                    Medycyna Regeneracyjna
                </span>
            </div>

            <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight drop-shadow-xl">
                Terapia Rezonansem Magnetycznym MBST®
            </h3>

            <p className="text-gray-100 text-sm md:text-lg leading-relaxed mb-8 drop-shadow-md font-light max-w-xl">
                Odkryj innowacyjną metodę regeneracji stawów, kości i tkanki chrzęstnej.
                Bezoperacyjne leczenie zwyrodnień i urazów sportowych teraz dostępne w GalicaMed.
            </p>

            <button
                className="px-8 py-4 bg-white text-[#5C4033] rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-[#f0f0f0] transition-all flex items-center gap-3 group-hover:gap-4"
            >
                Dowiedz się więcej <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </div>
    </a>
  </motion.div>
);

const VoucherSection = () => (
  <motion.div 
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 10 }}
    viewport={{ once: true }}
    className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 mb-8 md:mb-16 flex flex-col lg:flex-row items-stretch"
  >
    <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
      <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl">
          <Gift className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-gray-800 leading-tight">
          Podaruj wyjątkowy prezent – Voucher na zabieg
        </h3>
      </div>
      
      <div className="space-y-6 mb-12 text-center lg:text-left">
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          Szukasz idealnego prezentu dla bliskiej osoby? Podaruj niezapomniane doświadczenie relaksu i pielęgnacji w formie vouchera. To doskonały sposób, aby obdarować kogoś wyjątkowym momentem odprężenia, piękna i regeneracji.
        </p>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          Voucher może być wystawiony na wybrany zabieg z naszej oferty lub w formie kwotowej, dając pełną swobodę wyboru zabiegu i terminu realizacji. To elegancki i praktyczny prezent, który pozwala obdarowanej osobie zadbać o siebie w najbardziej komfortowy sposób.
        </p>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          Zakup vouchera jest prosty i szybki, a jego ważność umożliwia dopasowanie wizyty do własnych potrzeb. Podaruj chwilę relaksu i wyjątkową troskę – idealny prezent na każdą okazję!
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
        <a 
          href="tel:+48502221562" 
          className="flex items-center gap-3 px-8 py-4 bg-[#5C4033] text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#5C4033]/20 hover:bg-[#4A3329] transition-all"
        >
          <Phone className="w-4 h-4" /> +48 502 221 562
        </a>
        <a 
          href="mailto:recepcja@galicamedbeauty.pl" 
          className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-full font-bold text-xs uppercase tracking-widest hover:border-gray-400 transition-all shadow-sm"
        >
          <Mail className="w-4 h-4" /> Kontakt E-Mail
        </a>
      </div>
    </div>
    
    <div className="lg:w-2/5 min-h-[300px] relative overflow-hidden">
      <img 
        src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedBeauty/InneFoty/voucherhero1.webp" 
        alt="Voucher GalicaMed" 
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </motion.div>
);

const BeautyAssistant = ({ treatments, devices }: { treatments: any[], devices: any[] }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // @ts-ignore
      const apiKey = import.meta.env.VITE_API_KEY || process.env.API_KEY;
      
      if (!apiKey) {
        console.error("Missing API Key");
        throw new Error("Missing API Key");
      }

      const ai = new GoogleGenAI({ apiKey });
      const context = `
        Jesteś ekspertem-asystentem AI o imieniu Ania w prestiżowym salonie GalicaMed Beauty. 
        TWOJA WIEDZA:
        - Zabiegi dostępne w salonie: ${treatments.map(t => t.name).join(', ')}.
        - Urządzenia High-Tech, którymi dysponujemy: ${devices.map(d => d.name).join(', ')}.

        ZASADY ODPOWIEDZI (BARDZO WAŻNE DLA FORMATOWANIA):
        0. KAŻDĄ ODPOWIEDŹ ZAWSZE ZACZYNAJ OD DOKŁADNIE TYCH DWÓCH AKAPITÓW (oddzielonych pustą linią):
           "Cześć! Z tej strony Twoja wirtualna asystentka GalicaMed Beauty! Mam na imię Ania i miło mi będzie pomóc Ci w wyborze odpowiedniego zabiegu. 

           Pamiętaj, że jestem sztuczną inteligencją i finalne decyzje odnośnie procesu terapii podejmie kosmetolog na spotkaniu konsultacyjnym."

        1. STOSUJ PRZEJRZYSTY PODZIAŁ NA AKAPITY. Używaj podwójnej nowej linii (Enter dwa razy) między każdą logiczną częścią wypowiedzi (powitanie, disclaimer, analiza problemu, propozycja zabiegu, zaproszenie na konsultację).
        2. NIE UŻYWAJ ŻADNEGO FORMATOWANIA MARKDOWN (żadnych gwiazdek, hasztagów, myślników).
        3. Odpowiadaj profesjonalnie, empatycznie i w eleganckim stylu GalicaMed.
        4. Na końcu zapytaj: "Czy chcesz umówić się na profesjonalną konsultację?" i podaj dane kontaktowe, gdzie KAŻDY ELEMENT JEST W OSOBNEJ LINII:
           Rezerwacja online: https://booksy.com/pl-pl/dl/show-business/267624
           Telefon: +48 502 221 562
           E-mail: recepcja@galicamedbeauty.pl
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `${context}\n\nKlientka pisze: ${userMsg}`,
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'Przepraszam, nie mogłem przetworzyć zapytania.' }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Wystąpił błąd połączenia. Proszę sprawdzić konfigurację lub skontaktować się z nami telefonicznie.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="beauty-assistant" className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 mb-8 md:mb-16">
      <div className="flex flex-col lg:flex-row items-stretch min-h-[500px]">
        {/* Lewa część: Informacyjna */}
        <div className="lg:w-1/2 p-8 md:p-12 bg-gradient-to-br from-[#5C4033]/5 via-transparent to-transparent border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className="relative">
                <div className="p-1 bg-[#D4AF37]/20 rounded-full">
                  <img 
                    src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedBeauty/FotoStaff/avatarai.webp" 
                    alt="AI Assistant Ania" 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shadow-sm border border-white"
                  />
                </div>
                <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-[10px] font-bold text-[#5C4033] tracking-widest uppercase">Ania</span>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-gray-800 leading-tight">Twój Wirtualny Konsultant Galicamed</h3>
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mt-1">Sztuczna Inteligencja Beauty</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Nie wiesz, który zabieg będzie dla Ciebie najlepszy? Skorzystaj z pomocy naszego inteligentnego asystenta. Opisz krótko swój problem, typ skóry lub efekt, jaki chcesz osiągnąć, a nasza sztuczna inteligencja przeanalizuje ofertę kliniki i zaproponuje rozwiązania dopasowane do Twoich potrzeb.
            </p>
            
            <div className="space-y-6">
              <div className="bg-amber-50/50 border border-amber-100/50 p-5 rounded-2xl flex gap-3 items-start">
                <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600 shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed italic">
                  Pamiętaj, że rekomendacje asystenta AI to wstępna wskazówka, a nie diagnoza medyczna. Ostateczny plan terapii i bezpieczeństwo zabiegu zawsze potwierdza nasz wykwalifikowany kosmetolog podczas osobistej konsultacji.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-serif text-gray-800 mb-4">Chcesz umówić się na zabieg? Czekamy na Ciebie!</h4>
                <div className="flex flex-col gap-3">
                  <a href="tel:+48502221562" className="flex items-center gap-3 text-xs text-gray-600 hover:text-[#D4AF37] transition-colors group">
                    <div className="p-2 bg-[#D4AF37]/10 rounded-full group-hover:bg-[#D4AF37]/20 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                    <span className="font-medium">+48 502 221 562</span>
                  </a>
                  <a href="mailto:recepcja@galicamedbeauty.pl" className="flex items-center gap-3 text-xs text-gray-600 hover:text-[#D4AF37] transition-colors group">
                    <div className="p-2 bg-[#D4AF37]/10 rounded-full group-hover:bg-[#D4AF37]/20 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                    <span className="font-medium">recepcja@galicamedbeauty.pl</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prawa część: Czat */}
        <div className="lg:w-1/2 p-6 md:p-10 flex flex-col bg-gray-50/30">
          <div ref={scrollRef} className="flex-1 h-[320px] lg:h-[400px] overflow-y-auto mb-5 pr-2 space-y-4 no-scrollbar">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40 px-6">
                <MessageCircle className="w-12 h-12 mb-4 text-[#5C4033]" />
                <p className="text-xs text-gray-500 italic">Opisz mi swoje potrzeby (np. mam cerę suchą i naczynkową), a ja dopasuję zabieg z naszej oferty.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                  m.role === 'user' 
                  ? 'bg-[#5C4033] text-white rounded-tr-none' 
                  : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1.5 shadow-sm">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Zadaj pytanie asystentowi..."
              className="w-full pl-6 pr-14 py-4 md:py-5 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-sm shadow-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-[#5C4033] text-white rounded-full flex items-center justify-center hover:bg-[#4A3329] disabled:opacity-50 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardView: React.FC<DashboardViewProps> = ({
  heroParallax, menuSliderItems, menuSliderIndex, prevMenuSlide, nextMenuSlide, 
  setView, beautyPlanImageIndex, beautyPlanImages, uvIndex, locationName, 
  isLoadingUV, getUVStatus, fetchUVData, setIsContactModalOpen, treatmentsList, devicesList
}) => {
  const uvStatus = getUVStatus(uvIndex);
  const desktopTiles = menuSliderItems.filter(item => ['team', 'treatments', 'devices'].includes(item.id));

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const fadePoint = video.duration - 1.5;
    if (video.currentTime >= fadePoint) {
      video.style.opacity = '0';
    } else {
      video.style.opacity = '1';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-6">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden mb-8 bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 bg-black">
          <video
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            autoPlay
            muted
            loop
            playsInline
            onTimeUpdate={handleTimeUpdate}
            poster="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/HeroPhotos/HeroPhotoBeauty.webp"
          >
            <source src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/videos/HeroVideos/HeroVideoBeautyMp4.webm" type="video/webm" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 text-white">
            
            {/* Subtle Logo above pill - Updated source, REMOVED invert class as requested */}
            <img 
                src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/BeautyLogoWhite.png" 
                alt="Logo GalicaMed Beauty" 
                className="h-12 w-auto mb-8 opacity-90 animate-fade-in"
            />

            <span className="inline-block px-4 py-1 border border-white/30 rounded-full text-[10px] uppercase tracking-[0.4em] mb-8 animate-fade-in">
                GalicaMed Beauty
            </span>

            <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] max-w-5xl animate-fade-in-up delay-100 drop-shadow-lg">
                Medical Wellness <br /> <span className="text-[#D4AF37]">i Kosmetologia</span>
            </h1>
            
            <p className="text-gray-100 text-sm md:text-lg max-w-4xl mb-12 animate-fade-in-up delay-200 leading-relaxed font-medium drop-shadow-md">
                Odkryj przestrzeń Medical Wellness, gdzie profesjonalizm łączy się z atmosferą pełnego zaopiekowania. Jako część podmiotu leczniczego, pracujemy w oparciu o standardy medyczne, dbając o Twoje bezpieczeństwo oraz zapewniając dostęp do specjalistycznej wiedzy. Wykorzystujemy nowe technologie i innowacyjne metody, by wspierać Twoje zdrowie i urodę – tuż obok domu.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-300">
                <a href="tel:+48502221562" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                <Phone className="w-5 h-5" />
                +48 502 221 562
                </a>
            </div>
        </div>
      </div>

      <div className="px-6 md:max-w-screen-xl md:mx-auto md:px-12">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20 px-2 md:max-w-4xl md:mx-auto">
          <p className="text-gray-600 leading-relaxed italic font-serif text-lg md:text-2xl">
            W GalicaMed Beauty, łączymy wieloletnie doświadczenie i ekspercką wiedzę z najnowszymi technologiami...
          </p>
          <div className="w-12 h-[1px] bg-[#5C4033]/20 mx-auto mt-6 md:mt-10 md:w-24" />
        </motion.div>

        <div className="relative mb-6 md:mb-12">
          <div className="hidden md:grid grid-cols-3 gap-8 mb-20">
            {desktopTiles.map((item) => (
              <MenuTile key={item.id} item={item} setView={setView} />
            ))}
          </div>
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div key={menuSliderIndex} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <div className="h-48 w-full overflow-hidden">
                  <img src={optimizeImg(menuSliderItems[menuSliderIndex]?.image)} alt={menuSliderItems[menuSliderIndex]?.label} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#5C4033]/5 rounded-xl">
                      {React.createElement(menuSliderItems[menuSliderIndex]?.icon, { className: "w-5 h-5 text-[#5C4033]" })}
                    </div>
                    <h3 className="text-xl font-serif text-gray-800">{menuSliderItems[menuSliderIndex]?.label}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{menuSliderItems[menuSliderIndex]?.desc}</p>
                  <button onClick={() => setView(menuSliderItems[menuSliderIndex]?.id)} className="flex items-center gap-2 text-[#5C4033] font-bold text-xs uppercase tracking-widest border-b border-[#5C4033]/20 pb-1 hover:border-[#5C4033] transition-all w-fit">
                    Dowiedz się więcej <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex md:hidden justify-center items-center gap-6 mb-10">
          <button onClick={prevMenuSlide} className="p-3 rounded-full bg-white border border-gray-100 shadow-sm text-gray-400"><ChevronLeft className="w-6 h-6" /></button>
          <div className="flex gap-1.5">
            {menuSliderItems.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === menuSliderIndex ? 'w-8 bg-[#5C4033]' : 'w-2 bg-gray-200'}`} />
            ))}
          </div>
          <button onClick={nextMenuSlide} className="p-3 rounded-full bg-white border border-gray-100 shadow-sm text-gray-400"><ChevronRight className="w-6 h-6" /></button>
        </div>

        {/* MBST SECTION */}
        <MbstSection />

        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }} viewport={{ once: true }} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 mb-8 md:mb-16 md:flex md:flex-row md:items-stretch transition-shadow cursor-pointer" onClick={() => setView('planner-auth')}>
          <div className="h-64 w-full overflow-hidden relative md:h-auto md:w-1/2">
            <img src={optimizeImg(beautyPlanImages[0])} className="w-full h-full object-cover absolute inset-0" alt="Beauty Plan" />
          </div>
          <div className="p-8 md:p-16 md:w-1/2 md:flex md:flex-col md:justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-sm uppercase tracking-widest font-bold text-gray-800">Twój Personalny Beauty Plan</h3>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 italic">Ponieważ stawiamy na najwyższy profesjonalizm...</p>
            <button className="w-full md:w-fit md:px-12 py-4 border border-[#5C4033] text-[#5C4033] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#5C4033] hover:text-white transition-all">Zobacz swój Beauty Plan</button>
          </div>
        </motion.div>

        {/* 1. SEKCJA VOUCHER */}
        <VoucherSection />

        {/* 2. ASYSTENT AI */}
        <BeautyAssistant treatments={treatmentsList} devices={devicesList} />

        {/* 3. MONITOR UV */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 mb-12 p-8 md:p-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2"><div className="p-2 bg-[#5C4033]/5 rounded-xl"><Sun className="w-5 h-5 text-[#5C4033]" /></div><h3 className="text-sm md:text-xl uppercase tracking-widest font-bold text-gray-800">Monitor UV</h3></div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full"><MapPin className="w-3 h-3 text-gray-400" /><span className="text-[10px] md:text-sm text-gray-500">{locationName}</span></div>
          </div>
          {isLoadingUV ? <div className="animate-pulse flex gap-6"><Skeleton className="w-20 h-20 rounded-3xl" /><Skeleton className="h-8 w-1/2 mt-6" /></div> : uvStatus && (
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <div className={`w-20 h-20 md:w-32 md:h-32 rounded-3xl ${uvStatus.color} flex flex-col items-center justify-center text-white shadow-lg`}><span className="text-2xl md:text-5xl font-bold leading-none">{uvIndex}</span><span className="text-[8px] uppercase tracking-widest mt-1 opacity-80">Indeks UV</span></div>
              <div className="text-center md:text-left"><h4 className={`text-lg md:text-3xl font-serif ${uvStatus.textColor} leading-tight mb-2`}>{uvStatus.header}</h4><div className={`inline-block px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${uvStatus.color} text-white`}>Poziom: {uvStatus.level}</div></div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardView;