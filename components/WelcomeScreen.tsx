
import React, { useState } from 'react';
import { Lock, ChevronRight, ArrowLeft, Loader2, Mail, MapPin, User } from 'lucide-react';
import AquaFeelLogo from './AquaFeelLogo';
import { Language, translations } from '../utils/i18n';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: (clientName: string, spouseName: string, lang: Language, email: string, zip: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'lang' | 'form'>('lang');
  const [lang, setLang] = useState<Language>('pt');
  const [name, setName] = useState('');
  const [spouse, setSpouse] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[lang].welcome;

  // FUNÇÃO DE SINCRONIZAÇÃO COM GOOGLE DRIVE (BINNOVATIONMARKETING)
  const syncLeadToDrive = async (data: any) => {
    try {
      // Endpoint simulado que apontaria para um Google Apps Script da Binnovation
      const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz_placeholder/exec'; 
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() })
      });
    } catch (e) {
      console.warn('Lead sync offline, proceeding...', e);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !zip.trim()) {
      setError(t.error);
      return;
    }

    setIsLoading(true);
    setError('');

    const leadData = { name: name.trim(), spouse, lang, email, zip };

    try {
      // 1. Armazenar Lead (Simulação de integração Google Drive)
      await syncLeadToDrive(leadData);
      
      // 2. Delay para efeito visual de descriptografia segura
      await new Promise(r => setTimeout(r, 1200));
      
      onComplete(name.trim(), spouse.trim(), lang, email.trim(), zip.trim());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] min-h-screen bg-[#020d1a] flex flex-col items-center justify-start p-4 overflow-y-auto pt-6 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)] pointer-events-none fixed"></div>

      <div className="mb-6 md:mb-10 shrink-0 z-20">
        <AquaFeelLogo width="220px" variant="white" className="drop-shadow-[0_0_20px_rgba(0,174,239,0.3)]" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative z-10"
        >
          {step === 'lang' ? (
            <div className="text-center">
              <h2 className="text-white font-black text-lg md:text-xl uppercase tracking-tighter mb-6">
                {lang === 'pt' ? 'DESCRIPTOGRAFAR ACESSO' : 'DECRYPT ACCESS'}
              </h2>
              <div className="grid gap-3">
                {[
                  { id: 'en' as Language, label: 'English', flag: 'us' },
                  { id: 'es' as Language, label: 'Español', flag: 'es' },
                  { id: 'pt' as Language, label: 'Português', flag: 'br' }
                ].map((item) => (
                  <button key={item.id} onClick={() => { setLang(item.id); setStep('form'); }} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all group w-full text-left">
                    <img src={`https://flagcdn.com/w80/${item.flag}.png`} alt="" className="w-8 h-5 object-cover rounded" />
                    <span className="font-bold text-white text-base flex-1">{item.label}</span>
                    <ChevronRight className="text-slate-600" size={18} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <button onClick={() => setStep('lang')} className="mb-4 text-slate-500 hover:text-white transition-all text-[9px] uppercase font-black flex items-center gap-1 group">
                <ArrowLeft size={12} /> {t.backButton}
              </button>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                   <Lock size={14} className="text-emerald-500" />
                   <h1 className="text-base font-black text-white uppercase">{t.restricted}</h1>
                </div>
                <p className="text-slate-400 text-[10px] font-medium tracking-wide">{t.identify}</p>
              </div>

              <div className="space-y-4">
                {[
                  { val: name, set: setName, icon: User, label: t.placeholderName },
                  { val: spouse, set: setSpouse, icon: User, label: t.placeholderSpouse },
                  { val: email, set: setEmail, icon: Mail, label: t.placeholderEmail, type: 'email' },
                  { val: zip, set: setZip, icon: MapPin, label: t.placeholderZip }
                ].map((f, i) => (
                  <div key={i} className="relative">
                    <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                    <input 
                      type={f.type || 'text'} value={f.val} onChange={(e) => f.set(e.target.value)} 
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:ring-2 focus:ring-aqua-500 outline-none text-sm transition-all" 
                      placeholder={f.label} 
                    />
                  </div>
                ))}

                {error && <div className="text-red-400 text-[10px] text-center font-black bg-red-400/10 py-2 rounded-lg border border-red-400/20">{error}</div>}

                <button 
                  onClick={handleSubmit} disabled={isLoading} 
                  className="w-full bg-aqua-600 hover:bg-aqua-500 text-white font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span className="uppercase tracking-widest text-xs">{t.accessButton}</span>}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
