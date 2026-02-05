
import React, { useState, useEffect } from 'react';

const SB_URL = "https://pbyfajvltehsuugpayej.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieWZhanZsdGVoc3V1Z3BheWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NzIwMTAsImV4cCI6MjA4MjQ0ODAxMH0.Ne6DVfqwjira3GT--AIoFCrRop6KtrlbLqgF1eOX77U";

interface ClinicDetailPageProps {
  clinicName: string;
  onBack: () => void;
  onDoctorClick: (id: string) => void;
}

const ClinicDetailPage: React.FC<ClinicDetailPageProps> = ({ clinicName, onBack, onDoctorClick }) => {
  const [clinicData, setClinicData] = useState<any>(null);
  const [assignedDoctors, setAssignedDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cRes = await fetch(`${SB_URL}/rest/v1/GMPoroninPoradnieKomercyjne?NazwaPoradni=eq.${encodeURIComponent(clinicName)}&select=*`, {
          headers: { "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}` }
        });
        const cData = await cRes.json();
        
        if (Array.isArray(cData) && cData.length > 0) {
          const currentClinic = cData[0];
          setClinicData(currentClinic);

          const dRes = await fetch(`${SB_URL}/rest/v1/GMPoroninLekarze?poradnie=cs.{${currentClinic.Id}}&select=*`, {
            headers: { "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}` }
          });
          const dData = await dRes.json();
          if (Array.isArray(dData)) {
            setAssignedDoctors(dData);
          }
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clinicName]);

  const getCustomDescription = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('naczyniowa')) return "Specjalizujemy się w nowoczesnej diagnostyce i leczeniu schorzeń układu żylnego oraz tętniczego, wykorzystując małoinwazyjne metody zabiegowe. Naszym celem jest przywrócenie sprawności krążenia oraz zapewnienie pacjentom najwyższego komfortu i bezpieczeństwa na każdym etapie terapii.";
    if (lowerName.includes('ortopedia')) return "Zajmujemy się kompleksowym leczeniem urazów oraz schorzeń narządu ruchu, oferując opiekę od precyzyjnej diagnostyki po proces rekonwalescencji. Dzięki doświadczeniu naszych specjalistów pomagamy pacjentom odzyskać pełną sprawność i znacząco poprawić jakość codziennego życia.";
    if (lowerName.includes('kardiologia')) return "Zapewniamy pełen zakres diagnostyki i leczenia chorób układu sercowo-naczyniowego, kładąc szczególny nacisk na profilaktykę i wczesne wykrywanie zagrożeń. Nasza poradnia łączy wiedzę kliniczną z nowoczesnym zapleczem technologicznym, by skutecznie wspierać zdrowie Twojego serca.";
    if (lowerName.includes('urologia')) return "Oferujemy profesjonalną pomoc w zakresie schorzeń układu moczowego oraz męskich narządów płciowych, stawiając na dyskrecję i najwyższą skuteczność leczenia. Stosujemy zaawansowane metody diagnostyczne, aby szybko i trafnie reagować na indywidualne dolegliwości naszych pacjentów.";
    if (lowerName.includes('dermatologia')) return "Nasza poradnia zajmuje się leczeniem chorób skóry, włosów i paznokci, a także profilaktyką nowotworów poprzez regularne badania dermatoskopowe. Pomagamy odzyskać zdrowy wygląd i pewność siebie, stosując nowoczesne i indywidualnie dobrane terapie dermatologiczne.";
    if (lowerName.includes('dziecięca') || lowerName.includes('dzieci')) return "Otaczamy najmłodszych pacjentów troskliwą i profesjonalną opieką, dbając o ich prawidłowy rozwój oraz zdrowie od pierwszych dni życia. Przyjazna atmosfera oraz ogromne doświadczenie w pracy z dziećmi sprawiają, że każda wizyta przebiega w poczuciu pełnego bezpieczeństwa i spokoju.";
    if (lowerName.includes('chirurgia ogólna')) return "Świadczymy szeroki zakres usług z zakresu chirurgii ogólnej, obejmujący konsultacje specjalistyczne oraz drobne zabiegi realizowane w nowoczesnych warunkach. Skupiamy się na minimalizowaniu inwazyjności procedur, zapewniając pacjentom szybki powrót do zdrowia i codziennych aktywności.";
    if (lowerName.includes('plastyczna')) return "Łączymy precyzję medyczną z estetyką, oferując zabiegi korygujące i regeneracyjne dostosowane do indywidualnych potrzeb pacjenta. Nasz zespół dba o naturalne efekty oraz pełne wsparcie w procesie regeneracji, zapewniając komfort w kameralnej atmosferze centrum GalicaMed.";
    if (lowerName.includes('neurologia')) return "Zajmujemy się diagnostyką i leczeniem chorób układu nerwowego, oferując wsparcie pacjentom zmagającym się z bólami kręgosłupa, migrenami czy zaburzeniami neurologicznymi. Stawiamy na rzetelną ocenę kliniczną i nowoczesne metody terapeutyczne, by skutecznie poprawiać komfort życia naszych pacjentów.";
    if (lowerName.includes('ginekologia')) return "Zapewniamy kompleksową opiekę ginekologiczną, dbając o zdrowie kobiet na każdym etapie życia w atmosferze pełnego zaufania i intymności. Oferujemy profilaktykę, nowoczesną diagnostykę obrazową oraz profesjonalne prowadzenie pacjentek wymagających specjalistycznego leczenia.";
    
    return clinicData?.ShortText || "Zapewniamy kompleksową opiekę medyczną na najwyższym poziomie, łącząc doświadczenie naszych specjalistów z nowoczesnym zapleczem diagnostycznym. Naszym priorytetem jest zdrowie i komfort pacjenta, realizowane w profesjonalnej i przyjaznej atmosferze.";
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5A2B]"></div>
    </div>
  );

  if (!clinicData) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
      <h2 className="text-2xl font-serif mb-4">Nie znaleziono danych poradni</h2>
      <button onClick={onBack} className="text-[#8B5A2B] font-bold uppercase tracking-widest text-xs">Wróć do listy</button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col animate-fade-in">
      {/* Hero */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden shrink-0">
        <div className="absolute inset-0 z-0">
          <img 
            src={clinicData.HeroUrl || "https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/3.png"} 
            className="w-full h-full object-cover brightness-[0.4]"
            alt={clinicName}
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <button 
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white/60 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Wszystkie poradnie
          </button>
          <h1 className="text-3xl md:text-6xl font-serif mb-4 uppercase tracking-tight">
            {clinicName}
          </h1>
          <div className="w-16 h-px bg-[#C2A687] mx-auto opacity-50"></div>
        </div>
      </section>

      {/* Krótki opis poradni */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="w-12 h-0.5 bg-[#8B5A2B]/20 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl font-serif text-gray-700 leading-relaxed italic opacity-90">
            {getCustomDescription(clinicName)}
          </p>
          <div className="w-12 h-0.5 bg-[#8B5A2B]/20 mx-auto mt-8"></div>
        </div>
      </section>

      {/* ZESPÓŁ MEDYCZNY PORADNI */}
      {assignedDoctors.length > 0 && (
        <section className="py-12 border-b border-gray-50 bg-white">
          <div className="container mx-auto px-6 text-center">
            <span className="text-[9px] uppercase tracking-[0.4em] font-black text-gray-300 mb-8 block">Nasz zespół specjalistów</span>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {assignedDoctors.map((doc) => (
                <button 
                  key={doc.id}
                  onClick={() => onDoctorClick(doc.id)}
                  className="group flex flex-col items-center gap-3 focus:outline-none"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#8B5A2B] transition-all shadow-sm bg-gray-50">
                    <img 
                      src={doc.Photo || "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedPoronin/16.12.2025.png"} 
                      alt={doc.TytulImieNazwisko} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      style={{ 
                        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                      }}
                    />
                  </div>
                  <div className="text-center max-w-[120px]">
                    <p className="text-[10px] font-bold text-gray-800 group-hover:text-[#8B5A2B] transition-colors leading-tight uppercase tracking-tight">
                      {doc.TytulImieNazwisko}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nowy, profesjonalny cennik */}
      <section className="flex-grow py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h3 className="text-xs uppercase tracking-[0.3em] font-black text-[#8B5A2B] mb-4">Zakres i cennik</h3>
            <h2 className="text-3xl md:text-5xl font-serif">Dostępne usługi</h2>
          </div>
          
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm divide-y divide-gray-50">
            {Array.isArray(clinicData.ZabiegiPoradni) && clinicData.ZabiegiPoradni.length > 0 ? (
              clinicData.ZabiegiPoradni.map((proc: any, idx: number) => (
                <div 
                  key={idx} 
                  className="flex flex-col md:flex-row md:items-center justify-between p-8 md:px-12 md:py-10 hover:bg-gray-50/50 transition-colors group"
                >
                  <div className="flex-grow pr-8">
                    <h4 className="text-xl md:text-2xl font-serif text-gray-900 leading-snug group-hover:text-[#8B5A2B] transition-colors">{proc.nazwa}</h4>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <span className="text-2xl md:text-3xl font-serif text-[#8B5A2B] bg-[#8B5A2B]/5 px-8 py-3 rounded-2xl whitespace-nowrap inline-block">
                      {proc.cena}
                    </span>
                  </div>
                </div>
              ))
            ) : (
               <div className="py-20 text-center text-gray-400 font-light italic">
                 Aktualnie przygotowujemy szczegółowy zakres usług dla tej poradni.
               </div>
            )}
          </div>
          
          {/* Informacja dodatkowa */}
          <div className="mt-16 p-8 bg-[#f9f7f4] rounded-3xl flex items-center gap-6">
             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <i className="fa-solid fa-circle-info text-[#8B5A2B]"></i>
             </div>
             <p className="text-sm text-gray-500 font-light leading-relaxed">
               Podane ceny mają charakter informacyjny. Ostateczna wycena procedury medycznej następuje po konsultacji ze specjalistą. W celu rezerwacji terminu prosimy o kontakt z rejestracją.
             </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClinicDetailPage;
