import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionAbout from './components/SectionAbout';
import SectionServices from './components/SectionServices';
import SectionHotel from './components/SectionHotel';
import SectionAtmosphere from './components/SectionAtmosphere';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SpecialistClinicsPage from './components/SpecialistClinicsPage';
import PricingPage from './components/PricingPage';
import InfusionTherapiesPage from './components/InfusionTherapiesPage';
import ClinicDetailPage from './components/ClinicDetailPage';
import SurgicalProceduresPage from './components/SurgicalProceduresPage';
import DoctorsPage from './components/DoctorsPage';
import DoctorDetailPage from './components/DoctorDetailPage';

type View = 'home' | 'specialist-clinics' | 'pricing' | 'infusion-therapies' | 'clinic-detail' | 'surgical-procedures' | 'doctors' | 'doctor-detail';

interface PoroninAppProps {
    onBack: () => void;
}

const App: React.FC<PoroninAppProps> = ({ onBack }) => {
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [returnToView, setReturnToView] = useState<View | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: View, params?: { clinicName?: string; doctorId?: string; comingFrom?: View }) => {
    if (view === 'doctor-detail' && currentView !== 'doctor-detail') {
      setReturnToView(currentView);
    }
    
    setCurrentView(view);
    if (params?.clinicName) setSelectedClinic(params.clinicName);
    if (params?.doctorId) setSelectedDoctorId(params.doctorId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDoctorBack = () => {
    if (returnToView) {
      setCurrentView(returnToView);
    } else {
      setCurrentView('doctors');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar 
        scrolled={scrolled} 
        onBack={onBack}
        onLogoClick={() => navigateTo('home')} 
        onPricingClick={() => navigateTo('pricing')}
        onInfusionClick={() => navigateTo('infusion-therapies')}
        onClinicsClick={() => navigateTo('specialist-clinics')}
        onSurgicalClick={() => navigateTo('surgical-procedures')}
        onDoctorsClick={() => navigateTo('doctors')}
      />
      <main>
        {currentView === 'home' && (
          <>
            <Hero />
            <SectionAbout />
            <SectionServices onServiceClick={(title) => {
              if (title === "Poradnie specjalistyczne") navigateTo('specialist-clinics');
              if (title === "Terapie infuzyjne") navigateTo('infusion-therapies');
              if (title === "Zabiegi chirurgiczne") navigateTo('surgical-procedures');
              if (title === "Specjaliści") navigateTo('doctors');
            }} />
            <SectionHotel />
            <SectionAtmosphere />
            <ContactForm />
          </>
        )}
        {currentView === 'specialist-clinics' && (
          <SpecialistClinicsPage onClinicClick={(name) => navigateTo('clinic-detail', { clinicName: name })} />
        )}
        {currentView === 'surgical-procedures' && (
          <SurgicalProceduresPage />
        )}
        {currentView === 'doctors' && (
          <DoctorsPage onDoctorClick={(id) => navigateTo('doctor-detail', { doctorId: id })} />
        )}
        {currentView === 'doctor-detail' && selectedDoctorId && (
          <DoctorDetailPage doctorId={selectedDoctorId} onBack={handleDoctorBack} />
        )}
        {currentView === 'pricing' && <PricingPage />}
        {currentView === 'infusion-therapies' && <InfusionTherapiesPage />}
        {currentView === 'clinic-detail' && selectedClinic && (
          <ClinicDetailPage 
            clinicName={selectedClinic} 
            onBack={() => navigateTo('specialist-clinics')} 
            onDoctorClick={(id) => navigateTo('doctor-detail', { doctorId: id })}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;