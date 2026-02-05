
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, ChevronDown, ChevronUp, Tag, ChevronLeft } from 'lucide-react';

interface PricelistItem {
  name: string;
  price: string;
}

interface PricelistCategory {
  category: string;
  items: PricelistItem[];
}

interface TreatmentWithPricelist {
  id: string;
  name: string;
  pricelist?: PricelistCategory[];
}

interface PricelistViewProps {
  treatments: TreatmentWithPricelist[];
  setView: (view: any) => void;
}

const PricelistView: React.FC<PricelistViewProps> = ({ treatments, setView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTreatment, setExpandedTreatment] = useState<string | null>(null);

  const treatmentsWithPrice = treatments.filter(t => t.pricelist && t.pricelist.length > 0);

  const filteredTreatments = treatmentsWithPrice.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.pricelist?.some(cat => cat.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-6 pt-24 pb-20 md:max-w-screen-xl md:mx-auto md:px-12"
    >
      {/* Nice Back Button at the Top */}
      <div className="mb-8">
        <button 
          onClick={() => setView('menu')}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 border border-gray-100 rounded-full text-gray-500 hover:text-gray-800 transition-all text-xs font-bold uppercase tracking-widest shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Wstecz
        </button>
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-serif text-gray-800 mb-4">Cennik Zabiegów</h1>
        <p className="text-gray-500 text-sm md:text-lg italic font-handwritten text-xl">Inwestycja w Twoje piękno</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-12 relative">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Szukaj zabiegu..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all text-gray-700"
        />
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {filteredTreatments.length > 0 ? (
          filteredTreatments.map((treatment) => (
            <div 
              key={treatment.id}
              className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md"
            >
              <button 
                onClick={() => setExpandedTreatment(expandedTreatment === treatment.id ? null : treatment.id)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#5C4033]/5 rounded-2xl group-hover:bg-[#5C4033]/10 transition-colors">
                    <Tag className="w-5 h-5 text-[#5C4033]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-serif text-gray-800">{treatment.name}</h3>
                </div>
                {expandedTreatment === treatment.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
              </button>

              <AnimatePresence>
                {expandedTreatment === treatment.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 space-y-8">
                      {treatment.pricelist?.map((cat, idx) => (
                        <div key={idx} className="space-y-4">
                          <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold border-b border-gray-50 pb-2">
                            {cat.category}
                          </h4>
                          <div className="space-y-3">
                            {cat.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex justify-between items-end group/item">
                                <span className="text-sm text-gray-600 group-hover/item:text-gray-900 transition-colors">{item.name}</span>
                                <div className="flex-1 border-b border-dotted border-gray-200 mx-4 mb-1" />
                                <span className="text-sm font-bold text-gray-800 whitespace-nowrap">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
            <p className="text-gray-400">Nie znaleziono zabiegów spełniających kryteria.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PricelistView;
