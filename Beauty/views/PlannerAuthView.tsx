
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BeautyPlannerData } from '../types';

interface PlannerAuthViewProps {
  setView: (view: any) => void;
  onAuthSuccess: (data: BeautyPlannerData) => void;
}

const PlannerAuthView: React.FC<PlannerAuthViewProps> = ({ setView, onAuthSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!password.trim()) return;

    setLoading(true);
    setError(false);

    try {
      // Bezpieczne wywołanie funkcji RPC - hasło jest wysyłane do serwera
      // Serwer sprawdza bazę danych i zwraca plan tylko jeśli hasło pasuje
      // Frontend nie ma dostępu do tabeli bezpośrednio
      const { data, error: rpcError } = await supabase.rpc('get_beauty_plan', {
        code_input: password.trim()
      });

      if (rpcError) {
        throw rpcError;
      }

      if (data) {
        // Sukces - dane przyszły z bazy
        onAuthSuccess(data as BeautyPlannerData);
      } else {
        // Brak danych = błędne hasło
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 pt-32 text-center flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-[#5C4033]/5 p-6 rounded-full mb-8"><Lock className="w-10 h-10 text-[#5C4033]" /></div>
      <h1 className="text-3xl font-serif text-gray-800 mb-6">Witaj w Planerze</h1>
      <p className="text-gray-600 leading-relaxed mb-10 max-w-sm">Wpisz swój unikalny kod dostępu, aby zobaczyć spersonalizowany plan terapii.</p>

      <div className="w-full max-w-xs space-y-4">
        <motion.div animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}>
          <input 
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
            placeholder="Kod dostępu"
            className={`w-full bg-white border ${error ? 'border-red-400 bg-red-50' : 'border-gray-100'} px-6 py-4 rounded-full text-center shadow-sm focus:border-[#D4AF37] focus:outline-none transition-all`}
          />
        </motion.div>
        
        {error && (
          <p className="text-xs text-red-500 font-medium flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" /> Nieprawidłowy kod
          </p>
        )}

        <button 
          onClick={handleAuth} 
          disabled={loading}
          className="w-full py-4 bg-[#5C4033] text-white rounded-full font-medium shadow-lg hover:bg-[#4A3329] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Wejdź do planera"}
        </button>
        
        <button onClick={() => setView('menu')} className="flex items-center gap-2 mx-auto pt-8 text-gray-400 hover:text-gray-600 transition-colors text-xs font-bold uppercase tracking-widest"><ArrowLeft className="w-4 h-4" /> Wróć do menu</button>
      </div>
    </motion.div>
  );
};

export default PlannerAuthView;
