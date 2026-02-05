import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpecialistClinics from './components/SpecialistClinics';
import MedicalStore from './components/MedicalStore';
import Physiotherapy from './components/Physiotherapy';
import InfusionsAndBeauty from './components/InfusionsAndBeauty';
import Footer from './components/Footer';

interface ManiowyAppProps {
    onBack: () => void;
}

const App: React.FC<ManiowyAppProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-green-100 selection:text-green-900">
      <Navbar onBack={onBack} />
      <main className="flex-grow">
        <Hero />
        <SpecialistClinics />
        <Physiotherapy />
        <MedicalStore />
        <InfusionsAndBeauty />
      </main>
      <Footer />
    </div>
  );
};

export default App;