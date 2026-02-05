
import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, ChevronLeft, Search } from 'lucide-react';
import { optimizeImg } from '../App';

interface Device {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  tech: string;
  safety: string;
  image: string;
}

const DeviceCard = memo(({ device, setSelectedDevice, showComparison, toggleToCompare, isSelected }: any) => (
  <motion.div 
    whileHover={{ y: -5 }} 
    className={`bg-white rounded-[40px] overflow-hidden shadow-sm border transition-all ${isSelected ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-lg' : 'border-gray-100'}`}
  >
    <div className="aspect-[16/9] w-full overflow-hidden relative">
      <img src={optimizeImg(device.image)} alt={device.name} className="w-full h-full object-cover" />
      {showComparison && (
        <button onClick={(e) => { e.stopPropagation(); toggleToCompare(device); }} className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${isSelected ? 'bg-[#D4AF37] text-white' : 'bg-white/80 text-gray-400 hover:text-[#D4AF37]'}`}>
          <Scale className="w-5 h-5" />
        </button>
      )}
    </div>
    <div className="p-8 flex flex-col flex-1">
      <h3 className="text-xl font-serif text-gray-800 mb-4 leading-tight">{device.name}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">{device.shortDesc}</p>
      <button onClick={() => setSelectedDevice(device)} className="w-full py-4 bg-[#5C4033] text-white rounded-full font-medium shadow-lg hover:bg-[#4A3329] transition-all">Dowiedz się więcej</button>
    </div>
  </motion.div>
));

const DevicesView: React.FC<any> = ({ devicesList, selectedToCompare, toggleToCompare, setView, showComparison = true }) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDevices = devicesList.filter((d: any) => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pt-24 md:max-w-screen-xl md:mx-auto md:px-12">
      <div className="mb-8">
        <button onClick={() => setView('menu')} className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-gray-100 rounded-full text-gray-500 text-xs font-bold uppercase tracking-widest shadow-sm">
          <ChevronLeft className="w-4 h-4" /> Wstecz
        </button>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-serif text-gray-800 mb-2">Nasze urządzenia</h1>
        <div className="max-w-xl mx-auto mb-12 relative mt-6">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none"><Search className="w-5 h-5 text-gray-400" /></div>
          <input type="text" placeholder="Szukaj urządzenia..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-gray-700" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pb-20">
        {filteredDevices.map((device: any) => (
          <DeviceCard 
            key={device.id} 
            device={device} 
            isSelected={!!selectedToCompare.find((i: any) => i.id === device.id)}
            setSelectedDevice={setSelectedDevice}
            showComparison={showComparison}
            toggleToCompare={toggleToCompare}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedDevice && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6">
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="bg-white w-full max-w-lg h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-[40px] overflow-hidden relative shadow-2xl flex flex-col">
              <button onClick={() => setSelectedDevice(null)} className="absolute top-6 right-6 z-[160] p-2 bg-white/80 rounded-full"><X className="w-6 h-6" /></button>
              <div className="overflow-y-auto flex-1 no-scrollbar">
                <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden"><img src={optimizeImg(selectedDevice.image)} alt={selectedDevice.name} className="w-full h-full object-cover" /></div>
                <div className="p-8 sm:p-10">
                  <h2 className="text-3xl font-serif text-gray-800 mb-8">{selectedDevice.name}</h2>
                  <div className="space-y-8">
                    <section><h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-3 border-b border-gray-100 pb-2">Opis</h4><p className="text-gray-600 leading-relaxed text-sm">{selectedDevice.fullDesc}</p></section>
                    <section><h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-3 border-b border-gray-100 pb-2">Technologia</h4><p className="text-gray-600 leading-relaxed text-sm">{selectedDevice.tech}</p></section>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DevicesView;
