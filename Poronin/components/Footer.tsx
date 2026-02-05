
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 pt-24 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          
          <div className="lg:col-span-1 space-y-8">
            <div className="font-serif text-3xl tracking-tighter text-[#8B5A2B]">
              GALICA<span className="font-light">MED</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#8B5A2B] hover:text-white transition-all">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#8B5A2B] hover:text-white transition-all">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#8B5A2B] hover:text-white transition-all">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-900 mb-8">Nawigacja</h4>
              <ul className="space-y-4">
                <li><a href="#o-nas" className="text-gray-500 hover:text-[#8B5A2B] transition-colors text-sm font-light">O Centrum GalicaMed</a></li>
                <li><a href="#uslugi" className="text-gray-500 hover:text-[#8B5A2B] transition-colors text-sm font-light">Nasze Poradnie</a></li>
                <li><a href="#harnas" className="text-gray-500 hover:text-[#8B5A2B] transition-colors text-sm font-light">Rekonwalescencja Harnaś</a></li>
                <li><a href="#kontakt" className="text-gray-500 hover:text-[#8B5A2B] transition-colors text-sm font-light">Kontakt i Wizyty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-900 mb-8">Nasze Lokalizacje</h4>
              <ul className="space-y-6 text-sm font-light text-gray-500">
                <li className="flex gap-3">
                  <i className="fa-solid fa-location-dot text-[#8B5A2B] mt-1 shrink-0"></i>
                  <span>ul. Józefa Piłsudskiego 101, Poronin</span>
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-location-dot text-[#8B5A2B] mt-1 shrink-0"></i>
                  <span>ul. Wojska Polskiego 14, Nowy Targ</span>
                </li>
                <li className="flex gap-3">
                  <i className="fa-solid fa-location-dot text-[#8B5A2B] mt-1 shrink-0"></i>
                  <span>ul. Gorczańska 6, Maniowy</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
             <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-900 mb-8">Aktualności</h4>
             <p className="text-sm font-light text-gray-500 mb-6">Zapisz się do naszego newslettera, aby otrzymywać informacje o nowych specjalizacjach i programach profilaktycznych.</p>
             <div className="relative">
                <input type="email" placeholder="E-mail" className="w-full bg-gray-50 rounded-full py-4 px-6 focus:outline-none border border-transparent focus:border-[#8B5A2B] transition-all text-sm" />
                <button className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center hover:bg-[#6D4521] transition-all">
                  <i className="fa-solid fa-paper-plane text-xs"></i>
                </button>
             </div>
          </div>

        </div>

        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} GalicaMed. Tatrzańskie Centrum Medyczne.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-gray-400">
            <a href="#" className="hover:text-[#8B5A2B] transition-colors">Polityka Prywatności</a>
            <a href="#" className="hover:text-[#8B5A2B] transition-colors">Regulamin</a>
            <a href="#" className="hover:text-[#8B5A2B] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
