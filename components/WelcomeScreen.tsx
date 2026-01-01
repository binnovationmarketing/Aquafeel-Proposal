
import React, { useState } from 'react';
import { Lock, ChevronRight, ShieldCheck, ArrowLeft, Loader2, Mail, MapPin } from 'lucide-react';
import AquaFeelLogo from './AquaFeelLogo';
import { Language, translations } from '../utils/i18n';

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

  const handleLangSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    setStep('form');
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !zip.trim()) {
      setError(t.error);
      return;
    }

    if (email.trim() && !validateEmail(email)) {
      setError(t.errorEmail);
      return;
    }

    setIsLoading(true);
    setError('');
    
    // --- INTEGRAÇÃO GOOGLE SHEETS ---
    // Substitua a URL abaixo pela URL do seu Google Apps Script (Implantado como Web App)
    const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/SEU_ID_DO_SCRIPT/exec'; 

    try {
      const payload = {
        name: name.trim(),
        spouse: spouse.trim(),
        email: email.trim(),
        zip: zip.trim(),
        lang,
        date: new Date().toLocaleString(),
        userAgent: navigator.userAgent
      };

      // Envia os dados para o Sheets (em modo no-cors para evitar bloqueios simples de pre-flight)
      await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Simula um pequeno delay para feedback visual
      await new Promise(r => setTimeout(r, 800));
      onComplete(name.trim(), spouse.trim(), lang, email.trim(), zip.trim());
    } catch (err) {
      // Se falhar a integração, permitimos o acesso para não travar o cliente, mas logamos o erro
      console.warn('Sheet integration failed, proceeding anyway...', err);
      onComplete(name.trim(), spouse.trim(), lang, email.trim(), zip.trim());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] min-h-screen bg-[#020d1a] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10 my-auto">
        
        {step === 'lang' ? (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="mb-10 flex justify-center">
              <AquaFeelLogo width="260px" variant="white" />
            </div>
            <p className="text-slate-400 text-xs mb-8 font-black uppercase tracking-[0.2em]">Select Language • Selecione o Idioma</p>
            <div className="grid gap-3">
              {[
                { id: 'en' as Language, label: 'English', flag: 'us' },
                { id: 'es' as Language, label: 'Español', flag: 'es' },
                { id: 'pt' as Language, label: 'Português', flag: 'br' }
              ].map((item) => (
                <button key={item.id} onClick={() => handleLangSelect(item.id)} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all group w-full text-left">
                  <img src={`https://flagcdn.com/w80/${item.flag}.png`} alt={item.label} className="w-8 h-5 object-cover rounded shadow-sm" />
                  <span className="font-bold text-white text-lg flex-1">{item.label}</span>
                  <ChevronRight className="text-slate-600 group-hover:text-white transition-all" size={20} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <button onClick={() => setStep('lang')} className="mb-6 text-slate-500 hover:text-white transition-all text-[10px] uppercase font-black flex items-center gap-1 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              {t.backButton}
            </button>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                 <Lock size={16} className="text-emerald-500" />
                 <h1 className="text-lg font-black text-white uppercase tracking-tighter">{t.restricted}</h1>
              </div>
              <p className="text-slate-400 text-xs font-medium">{t.identify}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.yourName}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-aqua-500 outline-none text-sm" placeholder={t.placeholderName} />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.spouseName}</label>
                <input type="text" value={spouse} onChange={(e) => setSpouse(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-aqua-500 outline-none text-sm" placeholder={t.placeholderSpouse} />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.email} (OPCIONAL)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-aqua-500 outline-none text-sm" placeholder={t.placeholderEmail} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.zipCode}</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} maxLength={10} className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-aqua-500 outline-none text-sm" placeholder={t.placeholderZip} />
                </div>
              </div>

              {error && <div className="text-red-400 text-[10px] text-center font-black bg-red-400/10 py-2 rounded-xl border border-red-400/20">{error}</div>}

              <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-aqua-600 hover:bg-aqua-500 text-white font-black py-4 rounded-xl shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50">
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><span className="uppercase tracking-widest">{t.accessButton}</span><ChevronRight size={18} /></>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
