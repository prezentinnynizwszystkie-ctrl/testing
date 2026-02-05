import React, { useState, useEffect } from 'react';

interface NavbarProps {
  scrolled: boolean;
  onBack: () => void;
  onLogoClick?: () => void;
  onPricingClick?: () => void;
  onInfusionClick?: () => void;
  onClinicsClick?: () => void;
  onSurgicalClick?: () => void;
  onDoctorsClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, onBack, onLogoClick, onPricingClick, onInfusionClick, onClinicsClick, onSurgicalClick, onDoctorsClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleNavClick = (fn?: () => void) => {
    if (fn) fn();
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'O Nas', action: onLogoClick, id: '01' },
    { label: 'Poradnie', action: onClinicsClick, id: '02' },
    { label: 'Zabiegi Chirurgiczne', action: onSurgicalClick, id: '03' },
    { label: 'Specjaliści', action: onDoctorsClick, id: '04' },
    { label: 'Terapie Infuzyjne', action: onInfusionClick, id: '05' },
    { label: 'Cennik', action: onPricingClick, id: '06' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled || isMobileMenuOpen ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative z-[110]">
        
        {/* Left Side: Back Button & Logo */}
        <div className="flex items-center gap-4">
            <button 
                onClick={onBack}
                className={`flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold transition-colors bg-transparent border-none cursor-pointer group ${scrolled || isMobileMenuOpen ? 'text-gray-400 hover:text-[#8B5A2B]' : 'text-white/70 hover:text-white'}`}
                title="Powrót do wyboru placówki"
            >
                <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                <span className="hidden sm:inline">Placówki</span>
            </button>

            <button 
            onClick={() => handleNavClick(onLogoClick)} 
            className="h-8 md:h-10 block group transition-transform hover:scale-105 cursor-pointer outline-none border-none bg-transparent relative"
            >
            <img 
                src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedPoronin/LogoOgolne.png" 
                alt="GalicaMed Logo" 
                className={`h-full w-auto object-contain transition-all duration-300 ${!scrolled && !isMobileMenuOpen ? 'brightness-0 invert' : ''}`} 
            />
            </button>
        </div>
        
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleNavClick(item.action)} 
              className={`text-[10px] uppercase tracking-[0.2em] font-bold hover:text-[#8B5A2B] transition-colors bg-transparent border-none cursor-pointer ${scrolled ? 'text-gray-600' : 'text-white'}`}
            >
              {item.label}
            </button>
          ))}
          <a href="#kontakt" className="bg-[#8B5A2B] text-white px-8 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#6D4521] transition-all shadow-lg">Kontakt</a>
        </div>

        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center focus:outline-none bg-transparent border-none cursor-pointer"
          aria-label="Menu"
        >
          <div className="relative w-6 h-4 flex flex-col justify-between">
            <span className={`block h-[2px] w-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px] bg-gray-900' : scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
            <span className={`block h-[2px] w-full transition-all duration-200 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
            <span className={`block h-[2px] w-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px] bg-gray-900' : scrolled ? 'bg-gray-900' : 'bg-white'}`}></span>
          </div>
        </button>
      </div>

      <div className={`fixed inset-0 bg-white z-[105] transition-all duration-500 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12">
          <div className="flex flex-col gap-1">
            <button 
                onClick={onBack}
                className="group py-4 flex items-center gap-4 border-b border-gray-100 text-[#8B5A2B]"
            >
                <i className="fa-solid fa-arrow-left"></i>
                <span className="text-xl font-serif tracking-[0.05em] uppercase">Wybór placówki</span>
            </button>
            {navItems.map((item, index) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.action)} 
                className={`group py-4 flex items-center justify-between border-b border-gray-100 transition-all duration-700 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] font-bold text-[#8B5A2B] tracking-widest opacity-40 font-mono italic">{item.id}</span>
                  <span className="text-xl font-serif text-gray-900 tracking-[0.05em] uppercase">{item.label}</span>
                </div>
                <i className="fa-solid fa-arrow-right-long text-[#8B5A2B] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0"></i>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;