
import React from 'react';

const Partners: React.FC = () => {
  return (
    <section className="py-20 border-b border-slate-100">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-12">Współpracujemy z najlepszymi</p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 grayscale opacity-40 hover:grayscale-0 transition-all">
          {['PZU', 'LUXMED', 'NFZ', 'ALLIANZ', 'ENEL-MED'].map((name) => (
            <div key={name} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white text-[10px] font-black">
                {name[0]}
              </div>
              <span className="font-black text-xl tracking-tighter">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
