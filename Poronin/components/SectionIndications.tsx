
import React from 'react';

const SectionIndications: React.FC = () => {
  const indications = [
    "przewlekłego zmęczenia lub osłabienia",
    "okresów rekonwalescencji po chorobie lub zabiegu",
    "zwiększonego stresu i wyczerpania",
    "niedoborów witamin i minerałów",
    "chorób przewlekłych wymagających wsparcia metabolicznego",
    "terapii onkologicznej – jako leczenie wspomagające"
  ];

  return (
    <section id="wskazania" className="min-h-screen snap-start flex flex-col justify-center relative py-20 parallax" style={{ backgroundImage: 'url("https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/8.png")' }}>
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight">KIEDY STOSOWANE?</h2>
          <p className="text-xl md:text-2xl font-light mb-16 opacity-80 max-w-2xl mx-auto leading-relaxed">
            Terapie infuzyjne stosowane są szczególnie w przypadku:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 text-left">
            {indications.map((item, index) => (
              <div key={index} className="flex items-start gap-5 group">
                <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#8B5A2B] group-hover:border-[#8B5A2B] transition-all duration-300">
                  <i className="fa-solid fa-check text-sm text-white"></i>
                </div>
                <p className="text-lg md:text-xl font-light opacity-90 group-hover:opacity-100 transition-opacity capitalize leading-tight">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionIndications;
