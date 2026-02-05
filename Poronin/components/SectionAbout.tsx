
import React from 'react';

const SectionAbout: React.FC = () => {
  return (
    <section id="o-nas" className="min-h-screen snap-start flex flex-col justify-center bg-white py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7">
            <span className="text-[#8B5A2B] uppercase tracking-[0.4em] font-bold text-xs mb-6 block">Poznaj nas bliżej</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight text-gray-900">
              GALICAMED<br/>
              <span className="text-[#8B5A2B] italic">— Tatrzańskie Centrum Medyczne</span>
            </h2>
            <div className="prose prose-xl text-gray-600 leading-relaxed font-light">
              <p className="mb-6">
                GalicaMed – Tatrzańskie Centrum Medyczne to nowoczesna placówka świadcząca kompleksowe usługi z zakresu wielu specjalizacji. Poza poradniami lekarskimi, które mamy w planie stale rozwijać, oferujemy Państwu możliwość poddania się zabiegom realizowanym na doskonale wyposażonej sali zabiegowej.
              </p>
              <p className="mb-6">
                Nasi specjaliści realizują procedury z zakresu chirurgii plastycznej, naczyniowej, urologii dziecięcej czy ortopedii. Mamy również ogromną przyjemność współpracować z <strong>Europejskim Centrum Chirurgii Ręki</strong> – jedynym takim ośrodkiem w kraju, skupionym wyłącznie na zabiegach w tej dziedzinie.
              </p>
              <p className="mb-8">
                Zapewniamy Państwu 24-godzinną, profesjonalną opiekę okołooperacyjną i dbamy o Wasz komfort. Poza usługami komercyjnymi, świadczymy również usługi w ramach kontraktu z Narodowym Funduszem Zdrowia (lekarz POZ, diabetolog). Stworzyliśmy zespół, składający się z empatycznych i oddanych drugiemu człowiekowi osób. Zapraszamy serdecznie!
              </p>
            </div>
            <div className="flex items-center gap-6 mt-12 p-8 bg-[#f9f7f4] rounded-3xl border-l-4 border-[#8B5A2B]">
              <i className="fa-solid fa-quote-left text-4xl text-[#8B5A2B]/20"></i>
              <p className="font-serif italic text-xl text-gray-800 leading-snug">
                "Zależało nam na tym, abyście mieli pewność, że znajdujecie się pod troskliwą opieką."
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://idbvgxjvitowbysvpjlk.supabase.co/storage/v1/object/public/audiobooks/Private/7.png" 
                alt="GalicaMed Interior" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#8B5A2B] rounded-full -z-10 blur-3xl opacity-10"></div>
            <div className="absolute top-1/2 -right-8 w-16 h-1/2 bg-[#8B5A2B] rounded-full -z-10 opacity-20 transform -translate-y-1/2"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionAbout;
