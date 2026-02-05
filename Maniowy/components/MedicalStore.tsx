
import React from 'react';

const products = [
  "Ortezy", "Stabilizatory", "Kołnierze ortopedyczne", "Kule i laski", 
  "Wózki inwalidzkie", "Balkoniki i chodziki", "Produkty przeciwodleżynowe", 
  "Pieluchy i podkłady", "Kosmetyki pielęgnacyjne", "Rajstopy kompresyjne", 
  "Wkładki ortopedyczne"
];

const MedicalStore: React.FC = () => {
  return (
    <section id="sklep" className="py-24 bg-[#faf9f6]">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-stone-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#eaddca]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="relative z-10">
            <div className="max-w-2xl mb-12 text-left">
              <h2 className="text-3xl md:text-5xl font-black text-[#3e2723] mb-6">Sklep Medyczny</h2>
              <p className="text-stone-500 text-lg leading-relaxed font-medium">
                Dostęp do profesjonalnego sprzętu medycznego oraz artykułów higienicznych wspierających proces rekonwalescencji.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p, idx) => (
                <div key={idx} className="flex items-center gap-4 px-6 py-5 bg-[#fdf9f3] rounded-2xl border border-[#eaddca] group hover:bg-[#5d4037] hover:text-white hover:border-[#5d4037] hover:-translate-y-1 transition-all cursor-default">
                  <div className="w-2 h-2 rounded-full bg-[#8d6e63] group-hover:bg-white"></div>
                  <span className="font-bold text-sm tracking-tight">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalStore;
