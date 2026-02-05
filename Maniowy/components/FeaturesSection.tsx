
import React from 'react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="funkcje" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
             <div className="mb-8 flex items-center space-x-3 bg-slate-50 py-2 pl-2 pr-5 rounded-full w-fit">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                <span className="text-[11px] font-bold text-slate-900 tracking-tight uppercase">Tarcza Twojego Zdrowia</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.1]">Innowacyjna Strategia <br /> <span className="text-green-600">Profilaktyki</span></h2>
             <p className="text-slate-500 text-lg mb-12 leading-relaxed">
                Galica Med skupia się wyłącznie na pacjencie, oferując krótkie terminy oczekiwania i zaawansowane zarządzanie dokumentacją medyczną. Specjalizujemy się w nowoczesnej fizjoterapii i diagnostyce obrazowej.
             </p>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center group hover:bg-green-600 transition-all duration-500">
                   <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                      ⚠️
                   </div>
                   <p className="text-xs font-bold text-slate-900 group-hover:text-white transition-colors">Wczesne <br /> Ostrzeganie</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center group hover:bg-green-600 transition-all duration-500">
                   <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:-rotate-12 transition-transform">
                      🛡️
                   </div>
                   <p className="text-xs font-bold text-slate-900 group-hover:text-white transition-colors">Obsługa <br /> Kompleksowa</p>
                </div>
             </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute -inset-10 bg-green-100 rounded-full blur-[100px] opacity-20"></div>
             <div className="relative grid grid-cols-2 gap-6">
                <div className="mt-12 space-y-6">
                   <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                         💧
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Terapia Infuzyjna</h4>
                      <p className="text-[11px] text-slate-400">Wlewy witaminowe dobierane pod krew.</p>
                   </div>
                   <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl flex flex-col items-center text-center text-white">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                         👟
                      </div>
                      <h4 className="font-bold mb-2">Fizjoterapia</h4>
                      <p className="text-[11px] opacity-60">Powrót do sprawności po kontuzjach.</p>
                   </div>
                </div>
                <div className="space-y-6">
                   <div className="bg-green-600 p-8 rounded-[2.5rem] shadow-xl flex flex-col items-center text-center text-white">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                         🏪
                      </div>
                      <h4 className="font-bold mb-2">Sklep Medyczny</h4>
                      <p className="text-[11px] opacity-80">Najlepszy sprzęt na miejscu.</p>
                   </div>
                   <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 flex flex-col items-center text-center">
                      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                         🧪
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Punkt Pobrań</h4>
                      <h4 className="font-bold text-slate-900 mb-2">Badania Krwi</h4>
                      <p className="text-[11px] text-slate-400">Szybka diagnoza Twojego stanu.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
