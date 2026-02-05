
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { CINEMA_CARDS_DATA, TILES_DATA } from '../constants';

interface GlassCinemaProps {
  onNavigate: (app: string) => void;
  onOpenModal: (url: string, title: string) => void;
}

// Internal component to handle individual background loading state
const BackgroundMedia = ({ location, isExiting }: { location: any, isExiting: boolean }) => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    return (
        <div className="relative w-full h-full">
            {/* 1. Static Image Fallback (Always visible initially, stays if video fails) */}
            <img 
                src={location.image} 
                alt={location.title} 
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 2. Video Layer (Fades in only when ready) */}
            {location.videoUrl && (
                <video
                    src={location.videoUrl}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    autoPlay
                    muted
                    loop
                    playsInline // Critical for iOS
                    onLoadedData={() => setIsVideoLoaded(true)}
                />
            )}
            
            {/* 3. Gradient Overlays (Shared) */}
            <div className={`absolute inset-0 bg-gradient-to-r ${location.color.replace('from-', 'from-black/80 via-black/40 ')} to-transparent`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
        </div>
    );
};

const GlassCinema: React.FC<GlassCinemaProps> = ({ onNavigate, onOpenModal }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Auto-rotate every 8 seconds if user doesn't interact
  useEffect(() => {
    if (isExiting) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CINEMA_CARDS_DATA.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isExiting]);

  const handleSelect = (index: number) => {
    if (isExiting) return;
    setActiveIndex(index);
  };

  const handleEnterClick = (id: string) => {
    setIsExiting(true);
    setTimeout(() => {
        onNavigate(id);
    }, 1000);
  };

  const activeLocation = CINEMA_CARDS_DATA[activeIndex];

  // Animation variants for BACKGROUND
  const bgFadeVariants: Variants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.8 } }
  };

  // Animation for CONTENT (Simple crossfade)
  const contentFadeVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const uiExitVariants: Variants = {
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: "easeInOut" } }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      
      {/* 1. BACKGROUND LAYER (Image + Video) */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeLocation.id}
          variants={bgFadeVariants}
          initial="initial"
          animate={isExiting ? { scale: 1.5, filter: "blur(2px)" } : "animate"}
          transition={isExiting ? { duration: 1.5, ease: "easeInOut" } : {}}
          exit="exit"
          className="absolute inset-0 z-0"
        >
            <BackgroundMedia location={activeLocation} isExiting={isExiting} />
        </motion.div>
      </AnimatePresence>

      {/* GLOBAL LOGO (Fixed at TOP RIGHT) */}
      <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="absolute top-6 right-6 md:top-8 md:right-12 z-50 pointer-events-none"
      >
          <img 
              src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/5.png" 
              alt="GalicaMed" 
              className="h-6 md:h-8 w-auto object-contain brightness-0 invert drop-shadow-md"
          />
      </motion.div>

      {/* 2. MAIN CONTENT LAYER */}
      <div className="relative z-20 h-full flex flex-col md:flex-row">
        
        {/* LEFT SIDE: Brand & Global Info */}
        <motion.div 
            variants={uiExitVariants}
            animate={isExiting ? "exit" : "animate"}
            className="w-full md:w-4/12 h-full flex flex-col justify-between p-8 md:p-12 lg:p-16 pt-24 md:pt-24 relative"
        >
            {/* 1. STATIC TAG */}
            <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-bold text-gold-400 whitespace-nowrap">
                    Jesteśmy zawsze blisko Ciebie...
                </span>
                <div className="h-[1px] w-12 bg-white/20" />
            </div>

            {/* FEATURED SERVICES STRIP */}
            <div className="relative z-20 md:mb-12">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-4 font-bold">Wyróżnione Terapie</p>
                <div className="flex flex-wrap gap-3">
                    {TILES_DATA.map((tile) => (
                        <motion.button
                            key={tile.id}
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onOpenModal(tile.targetUrl, tile.title)}
                            className="group/chip px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-3 transition-all hover:border-gold-500/50 hover:shadow-lg"
                        >
                            <div className="flex flex-col text-left">
                                <span className="text-xs font-bold text-white/90 group-hover/chip:text-gold-300 transition-colors">{tile.title}</span>
                                <span className="text-[8px] text-white/50 uppercase tracking-wider">{tile.subtitle}</span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-white/30 group-hover/chip:text-white transition-colors" />
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>

        {/* RIGHT SIDE: Active Card Details + Slider */}
        <motion.div 
            variants={uiExitVariants}
            animate={isExiting ? "exit" : "animate"}
            className="w-full md:w-8/12 h-full flex flex-col justify-end pb-8 md:pb-16 px-4 md:px-12 relative"
        >
            
            {/* 1. SLIDER (Top Right in this column) - Significantly larger sizes */}
            <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory md:overflow-visible items-end h-auto w-full md:justify-center mb-8">
                {CINEMA_CARDS_DATA.map((location, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <motion.div
                            key={location.id}
                            layoutId={`card-${location.id}`}
                            onClick={() => handleSelect(index)}
                            className={`
                                relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[20px] md:rounded-[30px] border border-white/20 shadow-xl transition-all duration-500 snap-center
                                ${isActive 
                                    ? 'w-[160px] h-[220px] md:w-[240px] md:h-[320px] xl:w-[300px] xl:h-[400px] border-gold-500/50 ring-2 ring-gold-500/30 grayscale-0 z-10' 
                                    : 'w-[100px] h-[140px] md:w-[150px] md:h-[200px] xl:w-[180px] xl:h-[250px] opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
                                }
                            `}
                        >
                            {/* Card Image */}
                            <img 
                                src={location.tileImage || location.image} 
                                alt={location.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                            
                            {/* Card Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6 transition-opacity ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                                <p className={`text-[9px] uppercase tracking-widest font-bold mb-1 ${isActive ? 'text-gold-400' : 'text-white/60'}`}>
                                    {String(index + 1).padStart(2, '0')}
                                </p>
                                <h4 className={`font-serif leading-none truncate ${isActive ? 'text-sm md:text-lg lg:text-xl text-white' : 'text-[10px] md:text-xs text-white/80'}`}>
                                    {location.title.replace('GalicaMed ', '')}
                                </h4>
                            </div>

                            {/* Active Indicator */}
                            {isActive && (
                                <motion.div 
                                    layoutId="active-line"
                                    className="absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-gold-500"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* 2. DESCRIPTION BOX (Bottom Right in this column) */}
            <div className="w-full relative z-30">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeLocation.id}
                        variants={contentFadeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row gap-8 lg:gap-12 items-start md:items-center">
                            
                            {/* Logo & Title Section */}
                            <div className="md:w-1/3 flex flex-col items-start border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8 lg:pr-12">
                                <img 
                                    src={activeLocation.logo} 
                                    alt={activeLocation.title}
                                    className={`h-12 md:h-16 lg:h-20 w-auto object-contain mb-4 ${activeLocation.id === 'beauty' ? '' : 'brightness-0 invert'} drop-shadow-lg`}
                                />
                                <p className="text-xs text-gold-400 font-bold uppercase tracking-widest mt-1">{activeLocation.subtitle}</p>
                            </div>

                            {/* Description & Action Section */}
                            <div className="md:w-2/3 flex flex-col gap-6 lg:gap-8">
                                <p className="text-sm md:text-base lg:text-lg text-gray-200 font-light leading-relaxed line-clamp-3 md:line-clamp-none">
                                    {activeLocation.description}
                                </p>
                                
                                <div>
                                    <button 
                                        onClick={() => handleEnterClick(activeLocation.id)}
                                        className="group relative px-8 py-3 md:px-10 md:py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs md:text-sm overflow-hidden flex items-center gap-3 transition-all hover:pr-12 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                    >
                                        <span className="relative z-10">Wejdź do placówki</span>
                                        <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                                        <div className="absolute inset-0 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="hidden md:flex items-center gap-2 absolute bottom-8 left-12 opacity-50">
                {CINEMA_CARDS_DATA.map((_, idx) => (
                    <div 
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-500 ${idx === activeIndex ? 'w-8 bg-gold-500' : 'w-2 bg-white/20'}`}
                    />
                ))}
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default GlassCinema;
