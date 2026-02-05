
import React from 'react';

const SectionAtmosphere: React.FC = () => {
  return (
    <section className="min-h-screen snap-start flex flex-col justify-center py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-5xl">
        <span className="text-[#8B5A2B] uppercase tracking-[0.4em] font-bold text-xs mb-8 block">Nasze wartości</span>
        <h2 className="text-4xl md:text-7xl font-serif mb-12 leading-tight">RODZINNA ATMOSFERA, <br/><span className="italic">PROFESJONALNA TROSKA</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-[#f9f7f4] rounded-3xl flex items-center justify-center mx-auto transition-transform hover:rotate-12 duration-300">
              <i className="fa-solid fa-handshake-angle text-3xl text-[#8B5A2B]"></i>
            </div>
            <h4 className="text-xl font-serif">Empatia</h4>
            <p className="text-gray-500 font-light leading-relaxed">
              Stworzyliśmy zespół empatycznych i oddanych drugiemu człowiekowi osób, nie tylko na poziomie zawodowym.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="w-20 h-20 bg-[#f9f7f4] rounded-3xl flex items-center justify-center mx-auto transition-transform hover:rotate-12 duration-300">
              <i className="fa-solid fa-house-medical text-3xl text-[#8B5A2B]"></i>
            </div>
            <h4 className="text-xl font-serif">Blisko Ciebie</h4>
            <p className="text-gray-500 font-light leading-relaxed">
              Jesteśmy obecni w sercu regionu, dbając o dostępność i najwyższy standard usług dla lokalnej społeczności.
            </p>
          </div>

          <div className="space-y-6">
            <div className="w-20 h-20 bg-[#f9f7f4] rounded-3xl flex items-center justify-center mx-auto transition-transform hover:rotate-12 duration-300">
              <i className="fa-solid fa-shield-heart text-3xl text-[#8B5A2B]"></i>
            </div>
            <h4 className="text-xl font-serif">Bezpieczeństwo</h4>
            <p className="text-gray-500 font-light leading-relaxed">
              Zależało nam na tym, abyście mieli pewność, że znajdujecie się pod troskliwą i bezpieczną opieką.
            </p>
          </div>
        </div>

        <div className="mt-24 p-12 bg-[#8B5A2B] rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
          <div className="text-left max-w-xl">
            <h3 className="text-3xl font-serif mb-4">Jesteśmy tu dla Ciebie</h3>
            <p className="font-light opacity-80 text-lg">Skontaktuj się z nami i dowiedz się więcej o dostępnych terminach oraz zabiegach.</p>
          </div>
          <a href="tel:+48182001010" className="bg-white text-[#8B5A2B] px-12 py-5 rounded-full text-sm uppercase tracking-widest font-bold hover:scale-105 transition-transform shadow-xl whitespace-nowrap">
            +48 18 200 10 10
          </a>
        </div>
      </div>
    </section>
  );
};

export default SectionAtmosphere;
