
import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <section id="kontakt" className="min-h-screen snap-start flex flex-col justify-center py-24 bg-[#f3f4f6]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Lighter warm brown instead of almost black */}
          <div className="p-12 md:p-20 bg-[#3d3834] text-white space-y-12">
            <div>
              <span className="text-[#8B5A2B] uppercase tracking-[0.4em] font-bold text-xs mb-4 block">Zostańmy w kontakcie</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">NAPISZ DO NAS</h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-envelope text-[#8B5A2B]"></i>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">E-mail</p>
                  <p className="text-xl font-light">kontakt@galicamed.pl</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-phone text-[#8B5A2B]"></i>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Infolinia</p>
                  <p className="text-xl font-light">+48 18 200 10 10</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-clock text-[#8B5A2B]"></i>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Godziny otwarcia</p>
                  <p className="text-xl font-light">Pn - Pt: 8:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12 md:p-20">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Imię i Nazwisko</label>
                  <input type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-[#8B5A2B] transition-colors bg-transparent" placeholder="Jan Kowalski" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">E-mail</label>
                  <input type="email" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-[#8B5A2B] transition-colors bg-transparent" placeholder="twoj@email.pl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Temat zapytania</label>
                <select className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-[#8B5A2B] transition-colors bg-transparent">
                  <option>Konsultacja lekarska</option>
                  <option>Zabieg chirurgiczny</option>
                  <option>Terapie infuzyjne</option>
                  <option>Inne</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Wiadomość</label>
                <textarea rows={4} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-[#8B5A2B] transition-colors bg-transparent resize-none" placeholder="W czym możemy pomóc?"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#8B5A2B] text-white py-5 rounded-full text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#6D4521] transition-all shadow-xl">
                Wyślij wiadomość
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
