
import React, { useState } from 'react';
import GlassCinema from './components/GlassCinema';
import WebModal from './components/WebModal';
import { motion, AnimatePresence } from 'framer-motion';

// Import Sub-Apps
import PoroninApp from './Poronin/App';
import ManiowyApp from './Maniowy/App';
import BeautyApp from './Beauty/App';
import PulsApp from './Puls/App';

type AppView = 'gateway' | 'poronin' | 'maniowy' | 'beauty' | 'puls';

const App: React.FC = () => {
  const [currentApp, setCurrentApp] = useState<AppView>('gateway');
  const [modalState, setModalState] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: ''
  });

  const handleOpenModal = (url: string, title: string) => {
    setModalState({ isOpen: true, url, title });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleNavigate = (app: string) => {
    if (app === 'poronin' || app === 'maniowy' || app === 'beauty' || app === 'puls') {
        setCurrentApp(app as AppView);
        // Scroll to top when switching apps
        window.scrollTo(0, 0);
    }
  };

  const handleBackToGateway = () => {
      setCurrentApp('gateway');
      window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-800 font-sans selection:bg-gold-500 selection:text-white overflow-hidden">
      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col relative"
      >
        
        <AnimatePresence mode="wait">
            {currentApp === 'gateway' && (
                <motion.div
                    key="gateway"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    {/* Passed onOpenModal to GlassCinema */}
                    <GlassCinema 
                        onNavigate={handleNavigate} 
                        onOpenModal={handleOpenModal}
                    />
                    
                    {/* Footer Link (Subtle, floating) */}
                    <div className="absolute bottom-4 left-0 right-0 z-30 text-center pointer-events-none">
                        <p className="text-[9px] text-white/30 uppercase tracking-widest">&copy; {new Date().getFullYear()} GalicaMed</p>
                    </div>
                </motion.div>
            )}

            {currentApp === 'poronin' && (
                <motion.div 
                    key="poronin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    <PoroninApp onBack={handleBackToGateway} />
                </motion.div>
            )}

            {currentApp === 'maniowy' && (
                <motion.div 
                    key="maniowy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    <ManiowyApp onBack={handleBackToGateway} />
                </motion.div>
            )}

            {currentApp === 'beauty' && (
                <motion.div 
                    key="beauty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    <BeautyApp onBack={handleBackToGateway} />
                </motion.div>
            )}

            {currentApp === 'puls' && (
                <motion.div 
                    key="puls"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    <PulsApp onBack={handleBackToGateway} />
                </motion.div>
            )}
        </AnimatePresence>

      </motion.div>

      {/* Modal for External Sites */}
      <WebModal 
        isOpen={modalState.isOpen} 
        onClose={handleCloseModal} 
        url={modalState.url} 
        title={modalState.title}
      />
    </div>
  );
};

export default App;
