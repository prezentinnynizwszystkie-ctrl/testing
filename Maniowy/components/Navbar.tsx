import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onBack: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBack }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Poradnie', href: '#poradnie', id: '01' },
    { label: 'Fizjoterapia', href: '#fizjoterapia', id: '02' },
    { label: 'Sklep', href: '#sklep', id: '03' },
    { label: 'Beauty & Infuzje', href: '#uslugi', id: '04' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled || isMobileMenuOpen ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative z-[110]">
        
        {/* Left: Back Button & Logo */}
        <div className="flex items-center gap-4">
            <button 
                onClick={onBack}
                className={`flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold transition-colors bg-transparent border-none cursor-pointer group ${scrolled || isMobileMenuOpen ? 'text-gray-400 hover:text-[#5d4037]' : 'text-white/70 hover:text-white'}`}
                title="Powrót do wyboru placówki"
            >
                {/* Simple chevron/arrow using SVG since FontAwesome might not be loaded in Maniowy context directly or using same library version */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Placówki</span>
            </button>

            <a href="#" className="h-8 md:h-10 block group transition-transform hover:scale-105">
                <img 
                    src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedPoronin/LogoOgolne.png" 
                    alt="GalicaMed Logo" 
                    className={`h-full w-auto object-contain transition-all duration-300 ${!scrolled && !isMobileMenuOpen ? 'brightness-0 invert' : ''}`} 
                />
            </a>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={item.href}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold hover:text-[#5d4037] transition-colors ${scrolled ? 'text-gray-600' : 'text-white'}`}
            >
              {item.label}
            </a>
          ))}
          <a href="tel:+48182750088" className="bg-[#5d4037] text-white px-8 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#3e2723] transition-all shadow-lg">
            Rejestracja
          </a>
        </div>

        {/* Mobile Hamburger */}
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

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[105] transition-all duration-500 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12">
          <div className="flex flex-col gap-1">
            <button 
                onClick={onBack}
                className="group py-4 flex items-center gap-4 border-b border-gray-100 text-[#5d4037]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-xl font-serif tracking-[0.05em] uppercase">Wybór placówki</span>
            </button>
            {navItems.map((item, index) => (
              <a 
                key={item.id}
                href={item.href}
                onClick={handleNavClick} 
                className={`group py-4 flex items-center justify-between border-b border-gray-100 transition-all duration-700 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] font-bold text-[#5d4037] tracking-widest opacity-40 font-mono italic">{item.id}</span>
                  <span className="text-xl font-serif text-gray-900 tracking-[0.05em] uppercase">{item.label}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5d4037] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;