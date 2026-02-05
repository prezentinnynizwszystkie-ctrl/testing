
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface PulsAppProps {
    onBack: () => void;
}

const App: React.FC<PulsAppProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-500 hover:text-blue-900 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
                Wróć do wyboru
            </button>
            <div className="flex items-center gap-2">
                <span className="text-xl font-serif font-bold text-blue-900">PULS</span>
                <span className="text-xs uppercase tracking-widest text-slate-400 border-l border-slate-300 pl-2">GalicaMed</span>
            </div>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="flex-grow flex flex-col items-center justify-center pt-20 px-6 text-center">
        <div className="max-w-3xl space-y-8 animate-fade-in-up">
            <div className="w-20 h-1 bg-blue-900 mx-auto rounded-full mb-8" />
            <h1 className="text-4xl md:text-7xl font-serif text-slate-900">
                Poradnia Puls <br />
                <span className="text-blue-900 italic">Nowy Targ</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
                Kompleksowa opieka specjalistyczna, medycyna pracy oraz badania kierowców. 
                Jesteśmy tu dla Twojego zdrowia w samym sercu Podhala.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-blue-900 mb-2">Medycyna Pracy</h3>
                    <p className="text-sm text-slate-500">Kompleksowe badania profilaktyczne dla pracowników.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-blue-900 mb-2">Badania Kierowców</h3>
                    <p className="text-sm text-slate-500">Szybka i sprawna diagnostyka dla kierowców wszystkich kategorii.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-blue-900 mb-2">Specjaliści</h3>
                    <p className="text-sm text-slate-500">Dostęp do lekarzy specjalistów bez długich kolejek.</p>
                </div>
            </div>

            <div className="pt-12">
                <a href="tel:+48182666666" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-900 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl">
                    Umów wizytę
                </a>
            </div>
        </div>
      </main>
      
      <footer className="py-8 text-center text-slate-400 text-xs uppercase tracking-widest border-t border-slate-200 mt-20">
        &copy; {new Date().getFullYear()} GalicaMed Puls Nowy Targ
      </footer>
    </div>
  );
};

export default App;
