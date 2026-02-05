
import React, { useState, useEffect } from 'react';

const SB_URL = "https://pbyfajvltehsuugpayej.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieWZhanZsdGVoc3V1Z3BheWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NzIwMTAsImV4cCI6MjA4MjQ0ODAxMH0.Ne6DVfqwjira3GT--AIoFCrRop6KtrlbLqgF1eOX77U";

interface DoctorDetailPageProps {
  doctorId: string;
  onBack: () => void;
}

const DoctorDetailPage: React.FC<DoctorDetailPageProps> = ({ doctorId, onBack }) => {
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`${SB_URL}/rest/v1/GMPoroninLekarze?id=eq.${doctorId}&select=*`, {
          headers: { "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}` }
        });
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setDoctor(data[0]);
      } catch (error) {
        console.error("Fetch Doctor Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [doctorId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5A2B]"></div>
    </div>
  );

  if (!doctor) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <h2 className="text-2xl font-serif mb-4">Nie znaleziono profilu lekarza</h2>
      <button onClick={onBack} className="text-[#8B5A2B] font-bold uppercase tracking-widest text-xs">Wróć do listy</button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen animate-fade-in flex flex-col">
      {/* Premium Hero Section - Using precise background color for seamless photo integration */}
      <section className="relative min-h-screen md:h-[85vh] md:min-h-[700px] w-full flex items-center overflow-hidden shrink-0 bg-[#3d3834]">
        {/* Abstract background decorations for depth */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-[#8B5A2B] rounded-full blur-[150px] opacity-[0.15]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#C2A687] rounded-full blur-[120px] opacity-[0.08]"></div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center relative z-10 pt-24 md:pt-0">
          
          {/* Mobile Back Button */}
          <div className="w-full md:hidden mb-8 flex justify-center">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-[#C2A687] transition-all bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10"
            >
              <i className="fa-solid fa-arrow-left text-[8px]"></i>
              Powrót
            </button>
          </div>

          {/* Doctor Portrait - Container also matches background to prevent visible photo edges */}
          <div className="w-full md:w-1/2 h-[45vh] md:h-full flex items-end justify-center md:justify-end order-1 md:order-2 relative mb-12 md:mb-0 bg-[#3d3834]">
            <div className="h-full w-full flex items-end justify-center md:justify-end relative">
               <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-48 h-48 bg-[#C2A687] rounded-full blur-[100px] opacity-15"></div>
               
               <img 
                src={doctor.Photo || "https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedPoronin/16.12.2025.png"} 
                className="h-full w-auto max-h-[95%] object-contain object-bottom drop-shadow-[0_20px_80px_rgba(0,0,0,0.5)] transition-transform duration-1000"
                alt={doctor.TytulImieNazwisko}
                style={{
                  maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                  backgroundColor: '#3d3834' // Forces any transparency in image boundaries to match
                }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 pb-16 md:pb-0">
            <button 
              onClick={onBack}
              className="hidden md:inline-flex mb-10 items-center gap-3 text-[9px] uppercase tracking-[0.4em] font-black text-white/40 hover:text-[#C2A687] transition-all bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10"
            >
              <i className="fa-solid fa-arrow-left text-[8px]"></i>
              Powrót
            </button>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif uppercase tracking-tighter text-white mb-8 leading-[1.1] md:leading-[1.1] max-w-xl">
              {doctor.TytulImieNazwisko}
            </h1>
            
            <div className="w-16 h-0.5 bg-[#C2A687] mb-10 mx-auto md:mx-0"></div>
            
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#C2A687] block">Główna Specjalizacja</span>
              <span className="text-sm md:text-lg lg:text-xl font-light text-white/80 tracking-wide block uppercase border-l-0 md:border-l-2 border-white/10 md:pl-6 leading-relaxed">
                {doctor.Specjalizacja}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-white flex-grow">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Biography */}
            <div className="lg:col-span-8">
              <div className="space-y-12">
                <div>
                  <div className="flex items-center gap-4 mb-10">
                    <span className="text-gray-300 uppercase tracking-[0.5em] font-black text-[10px]">Profil Specjalisty</span>
                    <div className="flex-grow h-px bg-gray-100"></div>
                  </div>
                  <div className="prose prose-xl text-gray-700 font-light leading-relaxed max-w-none">
                    {doctor.Opis ? doctor.Opis.split('\n').map((para: string, i: number) => (
                      <p key={i} className="mb-8">{para}</p>
                    )) : (
                      <p className="italic text-gray-400">Opis w trakcie aktualizacji...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                {/* Appointment Card */}
                <div className="bg-[#322f2c] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5A2B] rounded-full blur-[60px] opacity-20 transition-transform group-hover:scale-150 duration-700"></div>
                  
                  <h3 className="text-xl font-serif mb-8 relative z-10">Rezerwacja wizyty</h3>
                  
                  <div className="space-y-6 relative z-10">
                    <div>
                      <p className="text-[8px] uppercase text-white/40 tracking-[0.2em] font-black mb-1">Infolinia medyczna</p>
                      <p className="text-2xl font-bold tracking-tight text-[#C2A687]">+48 18 200 10 10</p>
                    </div>
                    
                    <div className="w-full h-px bg-white/10"></div>
                    
                    <p className="text-[11px] text-white/50 font-light leading-relaxed">
                      W celu umówienia konsultacji prosimy o kontakt telefoniczny z rejestracją centrum medycznego GalicaMed.
                    </p>
                    
                    <a 
                      href="tel:+48182001010" 
                      className="block w-full bg-[#8B5A2B] text-white py-4 rounded-2xl text-[9px] uppercase tracking-[0.3em] font-black text-center hover:bg-[#a6713d] transition-all shadow-lg active:scale-95"
                    >
                      Zadzwoń do rejestracji
                    </a>
                  </div>
                </div>

                {/* Social/Share */}
                <div className="p-8 border border-gray-100 rounded-[2.5rem] text-center bg-[#fcfcfc]">
                   <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-black mb-6">Udostępnij specjalistę</p>
                   <div className="flex justify-center gap-3">
                      <button className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#8B5A2B] hover:text-white hover:border-[#8B5A2B] transition-all">
                        <i className="fa-brands fa-facebook-f text-sm"></i>
                      </button>
                      <button className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#8B5A2B] hover:text-white hover:border-[#8B5A2B] transition-all">
                        <i className="fa-brands fa-linkedin-in text-sm"></i>
                      </button>
                      <button className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#8B5A2B] hover:text-white hover:border-[#8B5A2B] transition-all">
                        <i className="fa-solid fa-link text-sm"></i>
                      </button>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorDetailPage;
