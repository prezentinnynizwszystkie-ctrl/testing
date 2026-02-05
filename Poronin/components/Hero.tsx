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
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden snap-start bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          autoPlay
          muted
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          poster="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/HeroPhotos/HeroPhotoPoronin.webp"
        >
          <source src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/videos/HeroVideos/HeroVideoPoroninMp4.webm" type="video/webm" />
        </video>
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center text-white">
        <div className="flex flex-col items-center">
            
            {/* Subtle Logo above pill - Updated Source */}
            <img 
                src="https://pbyfajvltehsuugpayej.supabase.co/storage/v1/object/public/GalicaMedWWW/website_elements/graphics/logos/PoroninLogo.png" 
                alt="Logo GalicaMed" 
                className="h-12 w-auto mb-8 brightness-0 invert opacity-90 animate-fade-in"
            />

            <span className="inline-block px-4 py-1 border border-white/30 rounded-full text-[10px] uppercase tracking-[0.4em] mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Tatrzańskie Centrum Medyczne
            </span>
            
            <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1] max-w-5xl animate-fade-in uppercase tracking-tight drop-shadow-lg" style={{ animationDelay: '0.3s' }}>
            Twoje Zdrowie i Bezpieczeństwo <br /> <span className="text-[#C2A687]">w Sercu Podhala</span>
            </h1>

            <p className="text-gray-100 text-lg md:text-xl max-w-3xl mb-12 animate-fade-in opacity-90 leading-relaxed font-medium drop-shadow-md" style={{ animationDelay: '0.7s' }}>
            Stworzyliśmy przestrzeń medyczną, by zapewnić mieszkańcom regionu poczucie bezpieczeństwa i bliski dostęp do specjalistycznej opieki. Oferujemy pełną diagnostykę oraz zabiegi chirurgiczne na miejscu, łącząc nowoczesne standardy leczenia z indywidualną troską o każdego pacjenta.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <a href="tel:+48182001010" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                <i className="fa-solid fa-phone"></i>
                +48 18 200 10 10
                </a>
            </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce cursor-pointer z-20">
        <i className="fa-solid fa-chevron-down text-2xl opacity-50"></i>
      </div>
    </section>
  );
};

export default Hero;