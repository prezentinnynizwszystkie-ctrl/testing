
import React from 'react';

const SectionHotel: React.FC = () => {
  return (
    <section id="harnas" className="min-h-screen snap-start flex flex-col justify-center relative overflow-hidden py-24 parallax" style={{ backgroundImage: 'url("https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedPoronin/Heros/harnastlo.webp")' }}>
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-10">
            <span className="inline-block px-4 py-1 border border-white/30 rounded-full text-[10px] uppercase tracking-[0.4em] text-white/80">
              Kompleksowa Opieka
            </span>
            <h2 className="text-4xl md:text-7xl font-serif leading-tight">
              REKONWALESCENCJA <br/>
              W HOTELU <span className="italic text-[#C2A687]">HARNAŚ</span>
            </h2>
            <div className="w-32 h-px bg-[#C2A687]/50"></div>
            
            <div className="space-y-6 max-w-xl">
              <p className="text-xl md:text-2xl font-light opacity-90 leading-relaxed text-[#C2A687]">
                W GalicaMed proces leczenia rozumiemy wielowymiarowo, dlatego nasza opieka nie kończy się w momencie opuszczenia sali zabiegowej.
              </p>
              <p className="text-base md:text-lg font-light opacity-80 leading-relaxed">
                W ramach kompleksowej opieki medycznej, Pacjentom poddającym się procedurom chirurgicznym zapewniamy profesjonalne warunki do rekonwalescencji w <strong className="text-white">Hotelu Harnaś***</strong> w Bukowinie Tatrzańskiej. To rozwiązanie gwarantuje spokój, prywatność oraz najwyższy standard wypoczynku, które są kluczowe dla prawidłowego przebiegu procesu regeneracji organizmu po zabiegu.
              </p>
              <p className="text-base md:text-lg font-light opacity-80 leading-relaxed">
                Dzięki lokalizacji w bezpośrednim sąsiedztwie tatrzańskiej przyrody, stworzyliśmy przestrzeń sprzyjającą wyciszeniu i szybkiemu powrotowi do pełni sił. Naszym priorytetem jest zapewnienie Pacjentom poczucia bezpieczeństwa i komfortu na każdym etapie terapii – od diagnozy, przez zabieg, aż po wypoczynek pooperacyjny.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 border border-white/20 translate-x-6 translate-y-6 rounded-[3rem] transition-transform group-hover:translate-x-4 group-hover:translate-y-4"></div>
            <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedPoronin/Heros/harnas.webp" 
                alt="Hotel Harnaś" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10">
                <p className="text-xs uppercase tracking-[0.5em] font-bold">Bukowina Tatrzańska</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionHotel;