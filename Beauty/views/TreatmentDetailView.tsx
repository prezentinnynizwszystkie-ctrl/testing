
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface Treatment {
  id: string;
  name: string;
  shortDesc: string;
  details?: Record<string, string>;
  image: string;
  videoUrl?: string;
}

interface TreatmentDetailViewProps {
  treatment: Treatment;
  onBack: () => void;
  BOOKSY_URL: string;
}

/**
 * DEFINICJA SZTYWNEJ KOLEJNOŚCI
 * Sekcje wyświetlą się dokładnie w tej kolejności, niezależnie od tego jak przyjdą z bazy.
 */
const SECTION_ORDER = [
  // 1. Definicje i główne opisy
  "whatIsIt",
  "O zabiegu",
  "Na czym polega zabieg?",
  "Na czym polega zabieg",
  "Na czym polega zabieg infuzji tlenowej?",
  "Na czym polega zabieg Dr Platon?",
  "Alma Harmony XL PRO z głowicą Dye-VL",
  "Czym jest głowica Dye-VL?",
  "Laserowa epilacja EpilMe",
  "Co to jest zabieg Aquasure?",
  "Terapia blizn metodą mikropunktury",
  "Na czym polega terapia blizn",
  "Usuwanie makijażu permanentnego metodą mikropunktury",
  "Gen Factor – opis ogólny i zastosowanie",
  "Na czym polega zabieg falą uderzeniową STORZ D-Actor?",
  "Creme Bar – odbudowa bariery skóry",
  "O marce Dr.esthé",
  "Terapia rezonansem magnetycznym MBST® – jak działa?",
  "Manicure – zadbane paznokcie i piękne dłonie",
  "Profesjonalny pedicure",
  "Profesjonalne zabiegi stylizacji brwi i rzęs",
  "Masaże – odprężenie i zdrowie",

  // 2. Jak działa / Technologie
  "Jak działa Alma Harmony XL PRO z głowicą Dye-VL?",
  "Jak działa laser EpilMe?",
  "Jak działa mikronakluwanie na bliznę ?",
  "Znaczenie bariery naskórkowej",
  "Preparaty i bezpieczeństwo",
  "Od diagnostyki do terapii",

  // 3. Cel i Grupa docelowa
  "forWhom",
  "Dla kogo przeznaczony jest zabieg?",
  "Dla kogo przeznaczony jest zabieg",
  "Dla kogo jest zabieg Aquasure?",
  "Dla kogo przeznaczona jest terapia blizn",
  "Dla kogo przeznaczony jest zabieg?",
  "Dla kogo jest pedicure podologiczny?",
  "Wskazania",
  "Wskazania do zabiegów z użyciem Dye-VL",
  "Wskazania do zabiegu",
  "Wskazania do terapii MBST®",

  // 4. Procedura i konkretne terapie
  "course",
  "Przebieg zabiegu",
  "Przebieg",
  "Jak wygląda przebieg zabiegu?",
  "Liczba zabiegów",
  "Częstotliwość",
  "Przygotowanie do zabiegu",
  "Oferta zabiegowa i pielęgnacja domowa",
  "Zabieg Dr. Spi-Cure – na czym polega?",
  "Rodzaje manicure w naszym gabinecie",
  "Pedicure podologiczny – zdrowe stopy i komfort chodzenia",
  "Usługi obejmują",
  "Rodzaje masaży",
  "Gen Factor terapia trądziku",
  "Gen Factor zabieg z kwasem Huminowym",
  "Gen Factor zabieg z kwasem Nikotynowym",
  "Gen Factor zabieg z kwasem Rozmarynowym",
  "Gen Factor zabieg z kwasem Glikolowym",
  "Gen Factor zabieg z kwasem Azelainowym",
  "Gen Factor zabieg z kwasem Pirogronowym",
  "Gen Factor w połączeniu z innymi zabiegami",

  // 5. Efekty
  "effects",
  "Efekty zabiegu infuzji tlenowej",
  "Efekty zabiegu",
  "Efekty zabiegu Dr Platon – zimna plazma",
  "Efekty terapii z Dye-VL",
  "Efekty epilacji laserowej EpilMe",
  "Jakie efekty daje Aquasure?",
  "Efekty terapii blizn",
  "Efekty i wskazania do zabiegu",
  "Efekty",

  // 6. Zalecenia i Podsumowania
  "contraindications",
  "Przeciwwskazania",
  "aftercare",
  "Zalecenia po zabiegu",
  "Zalecenia pozabiegowe",
  "Pielęgnacja domowa po manicure",
  "Odczucia i rekonwalescencja",
  "Zalety Alma Harmony XL PRO z Dye-VL",
  "Najważniejsze zalety epilacji EpilMe",
  "Dlaczego warto wybrać Aquasure?",
  "Zalety terapii blizn",
  "Zalety regularnego manicure",
  "Zalety masaży",
  "Czy terapia MBST® może zastąpić operację?",
  "Zalety terapii MBST®",
  "Terapia MBST® – bezpieczne leczenie układu ruchu",
  "Stosowanie zasad korneoterapii",
  "Rola korneoterapii w gabinecie",
  "Schemat pielęgnacji Creme Bar",
  "Personalizowane kremy Creme Bar – unikalna terapia „szyta na miarę”",
  "Inne rodzaje pedicure",
  "summary",
  "Podsumowanie"
];

// Mapowanie tylko technicznych kluczy na ładne polskie nagłówki (jeśli występują)
const SECTION_LABELS: Record<string, string> = {
  "whatIsIt": "O zabiegu",
  "forWhom": "Dla kogo?",
  "indications": "Wskazania",
  "course": "Przebieg zabiegu",
  "effects": "Efekty",
  "contraindications": "Przeciwwskazania",
  "aftercare": "Zalecenia po zabiegu",
  "frequency": "Częstotliwość",
  "summary": "Podsumowanie"
};

const TreatmentDetailView: React.FC<TreatmentDetailViewProps> = ({ treatment, onBack, BOOKSY_URL }) => {
  const details = treatment.details || {};
  const presentKeys = Object.keys(details);
  
  // Sortowanie kluczy na podstawie priorytetów z SECTION_ORDER
  const finalKeysToRender = presentKeys
    .filter(key => !['image', 'photo', 'videoUrl', 'video_url', 'Photo', 'Photo2', 'image2'].includes(key))
    .sort((a, b) => {
      const indexA = SECTION_ORDER.indexOf(a);
      const indexB = SECTION_ORDER.indexOf(b);
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });

  const [expandedSection, setExpandedSection] = useState<string | null>(finalKeysToRender[0] || null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 pt-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="mb-8">
          <motion.button 
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition-all text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Wróć do listy zabiegów
          </motion.button>
        </div>

        <div className="mb-12 md:max-w-5xl md:mx-auto">
          <motion.div layoutId={`card-${treatment.id}`} className="relative w-full aspect-video rounded-[40px] overflow-hidden shadow-2xl bg-gray-100">
            {treatment.videoUrl ? (
              <video src={treatment.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <motion.img layoutId={`image-${treatment.id}`} src={treatment.image} alt={treatment.name} className="w-full h-full object-cover" />
            )}
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl md:text-6xl font-serif text-gray-800 mb-4 tracking-tight">
            {treatment.name}
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-400 italic font-handwritten text-xl md:text-3xl mb-12">
            Pielęgnacja na najwyższym poziomie
          </motion.p>

          <div className="space-y-4">
            {finalKeysToRender.map((key, idx) => {
              const value = details[key];
              if (typeof value !== 'string') return null;
              const isExpanded = expandedSection === key;
              // Wyświetlamy zmapowaną nazwę (np. whatIsIt -> O zabiegu) lub oryginalną jeśli jest już po polsku
              const displayLabel = SECTION_LABELS[key] || key;

              return (
                <motion.section 
                  key={key} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="bg-white rounded-[32px] border border-gray-50 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button onClick={() => setExpandedSection(isExpanded ? null : key)} className="w-full text-left px-8 py-6 flex items-center justify-between group focus:outline-none">
                    <h4 className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${isExpanded ? 'text-[#D4AF37]' : 'text-gray-600 group-hover:text-gray-900'}`}>
                      {displayLabel}
                    </h4>
                    <div className={`p-2 rounded-full transition-all duration-300 ${isExpanded ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-gray-50 text-gray-400'}`}>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}>
                        <div className="px-8 pb-8 pt-2">
                          <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line border-t border-gray-50 pt-6">
                            {value}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.section>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col items-center gap-6">
            <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className="w-full max-sm px-6 py-5 bg-[#5C4033] text-white rounded-full font-bold text-center flex items-center justify-center gap-3 shadow-xl shadow-[#5C4033]/20 transition-all uppercase text-xs tracking-widest">
              <Calendar className="w-5 h-5" /> Zarezerwuj termin
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TreatmentDetailView;
