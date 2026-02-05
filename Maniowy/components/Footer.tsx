
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="kontakt" className="bg-[#1e1410] text-stone-400 py-24 border-t border-stone-800 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">
          <div className="md:col-span-2">
            <div className="flex flex-col mb-8">
              <span className="text-3xl font-black tracking-tighter text-white leading-none">
                Galica<span className="text-[#8d6e63] font-bold">+</span>Med
              </span>
              <span className="text-xs font-bold text-[#8d6e63] tracking-[0.3em] uppercase leading-none mt-2">
                Maniowy
              </span>
            </div>
            <p className="text-lg max-w-sm font-medium text-stone-300 mb-8 italic opacity-70">
              "Zawsze blisko Ciebie..."
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#5d4037] transition-colors cursor-pointer">
                <span className="text-white text-xs font-bold">f</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#5d4037] transition-colors cursor-pointer">
                <span className="text-white text-xs font-bold">ig</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-white font-black uppercase text-xs tracking-widest mb-6 border-b border-[#3e2723] pb-2 text-left">Lokalizacja</h5>
            <p className="text-sm leading-relaxed mb-6 font-medium text-left">
              Ul. Gorczańska 6<br />
              34-436 Maniowy
            </p>
            <h5 className="text-white font-black uppercase text-xs tracking-widest mb-4 text-left">Email</h5>
            <div className="text-left">
              <a href="mailto:rejestracja@galicamedmaniowy.pl" className="text-sm hover:text-[#8d6e63] transition-colors font-bold break-all">
                rejestracja@galicamedmaniowy.pl
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-black uppercase text-xs tracking-widest mb-6 border-b border-[#3e2723] pb-2 text-left">Kontakt telefoniczny</h5>
            <div className="text-left">
              <a href="tel:+48182750088" className="text-2xl font-black text-white hover:text-[#8d6e63] transition-colors">
                +48 18 275 00 88
              </a>
            </div>
            <div className="mt-8 text-left">
              <h5 className="text-white font-black uppercase text-[10px] tracking-widest mb-2 opacity-50">Godziny pracy</h5>
              <p className="text-xs">Zapraszamy do kontaktu w godzinach pracy placówki.</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">
          <p>© 2025 Galica Med Maniowy. Professional Healthcare Services.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Polityka prywatności</a>
            <a href="#" className="hover:text-white transition-colors">RODO</a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8d6e63]/5 rounded-full blur-[100px] pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
