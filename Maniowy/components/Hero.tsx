import React from 'react';

const Hero: React.FC = () => {
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    // Start fading out 1.5 seconds before end
    const fadePoint = video.duration - 1.5;
    
    if (video.currentTime >= fadePoint) {
      video.style.opacity = '0';
    } else {
      video.style.opacity = '1';
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background with Fade Logic */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          autoPlay
          muted
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          poster="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/HeroPhotos/HeroPhotoManiowy.webp"
        >
          <source src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/videos/HeroVideos/HeroVideoManiowyMp4.webm" type="video/webm" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 text-white">
        <div className="flex flex-col items-center">
          
          {/* Subtle Logo above pill - Updated Source */}
          <img 
            src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/2.png" 
            alt="Logo GalicaMed" 
            className="h-12 w-auto mb-8 brightness-0 invert opacity-90 animate-fade-in"
          />

          <span className="inline-block px-4 py-1 border border-white/30 rounded-full text-[10px] uppercase tracking-[0.4em] mb-8 animate-fade-in">
             GalicaMed Maniowy
          </span>

          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] max-w-5xl animate-fade-in-up delay-100 drop-shadow-lg">
            Centrum Medyczne <br /> <span className="text-[#eaddca]">i Rehabilitacja</span>
          </h1>
          
          <p className="text-gray-100 text-lg md:text-xl max-w-3xl mb-12 animate-fade-in-up delay-200 leading-relaxed font-medium drop-shadow-md">
            Placówka medyczna oferująca zakres konsultacji specjalistycznych, diagnostyki oraz zabiegów. Zapewniamy opiekę lekarzy specjalistów oraz warunki dostosowane do potrzeb pacjentów.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-300">
            <a href="tel:+48182750088" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +48 18 275 00 88
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;