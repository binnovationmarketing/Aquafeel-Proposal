import React, { useState } from 'react';
import { Lock, ChevronRight, ShieldCheck, ArrowLeft, Droplets } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface WelcomeScreenProps {
  onComplete: (clientName: string, spouseName: string, lang: Language) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'lang' | 'form'>('lang');
  const [lang, setLang] = useState<Language>('pt');
  const [name, setName] = useState('');
  const [spouse, setSpouse] = useState('');
  const [error, setError] = useState('');

  const t = translations[lang].welcome;

  const handleLangSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    setStep('form');
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError(t.error);
      return;
    }
    onComplete(name.trim(), spouse.trim(), lang);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="fixed inset-0 z-[100] min-h-screen bg-[#0B1120] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>

      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 my-auto">
        
        {step === 'lang' ? (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10 flex flex-col items-center">
              <div className="bg-aqua-600/20 p-5 rounded-3xl mb-4 border border-aqua-500/30 shadow-2xl">
                <Droplets size={64} className="text-aqua-400" fill="currentColor" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">AQUAFEEL</h2>
              <p className="text-sm font-bold text-aqua-400 tracking-[0.4em] uppercase mt-1">Solutions PA</p>
            </div>
            
            <p className="text-slate-400 text-sm mb-8 font-medium">
              Select your language • Selecione seu idioma • Seleccione su idioma
            </p>

            <div className="grid gap-4">
              <button onClick={() => handleLangSelect('en')} className="flex items-center gap-4 bg-slate-800/50 hover:bg-slate-700/80 border border-white/10 p-4 rounded-xl transition-all group w-full text-left">
                <img src="https://flagcdn.com/w160/us.png" alt="USA" className="w-12 h-8 object-cover rounded shadow-md" />
                <div className="text-left"><div className="font-bold text-white text-lg">English</div><div className="text-xs text-slate-400">United States</div></div>
                <ChevronRight className="ml-auto text-slate-500 group-hover:text-white" />
              </button>
              <button onClick={() => handleLangSelect('es')} className="flex items-center gap-4 bg-slate-800/50 hover:bg-slate-700/80 border border-white/10 p-4 rounded-xl transition-all group w-full text-left">
                <img src="https://flagcdn.com/w160/es.png" alt="ES" className="w-12 h-8 object-cover rounded shadow-md" />
                <div className="text-left"><div className="font-bold text-white text-lg">Español</div><div className="text-xs text-slate-400">España / Latino</div></div>
                <ChevronRight className="ml-auto text-slate-500 group-hover:text-white" />
              </button>
              <button onClick={() => handleLangSelect('pt')} className="flex items-center gap-4 bg-slate-800/50 hover:bg-slate-700/80 border border-white/10 p-4 rounded-xl transition-all group w-full text-left">
                <img src="https://flagcdn.com/w160/br.png" alt="BR" className="w-12 h-8 object-cover rounded shadow-md" />
                <div className="text-left"><div className="font-bold text-white text-lg">Português</div><div className="text-xs text-slate-400">Brasil / Portugal</div></div>
                <ChevronRight className="ml-auto text-slate-500 group-hover:text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 relative" onKeyDown={handleKeyDown}>
            <button onClick={() => setStep('lang')} className="absolute -top-2 left-0 text-slate-500 hover:text-white transition-colors text-xs uppercase font-bold tracking-wider flex items-center gap-1 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              {t.backButton}
            </button>

            <div className="text-center mb-8 pt-6">
               <div className="mb-6 flex flex-col items-center">
                <div className="bg-aqua-600/20 p-3 rounded-2xl mb-2 border border-aqua-500/30 shadow-xl">
                    <Droplets size={32} className="text-aqua-400" fill="currentColor" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">AQUAFEEL</h2>
                <p className="text-[10px] font-bold text-aqua-400 tracking-[0.4em] uppercase mt-1">Solutions PA</p>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                 <Lock size={16} className="text-emerald-500" />
                 <h1 className="text-lg font-serif font-bold text-white">{t.restricted}</h1>
              </div>
              <p className="text-slate-400 text-sm">{t.identify}</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">{t.yourName}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder={t.placeholderName} autoFocus />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">{t.spouseName}</label>
                <input type="text" value={spouse} onChange={(e) => setSpouse(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder={t.placeholderSpouse} />
              </div>
              {error && <div className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg border border-red-400/20">{error}</div>}
              <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 group transition-all hover:-translate-y-1">
                <span>{t.accessButton}</span>
                <ChevronRight size={20} className="group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>{t.secure}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};