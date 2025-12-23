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
    <div className="fixed inset-0 z-[100] min-h-screen bg-[#020d1a] flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aqua-600/10 rounded-full blur-[120px] animate-soft-pulse pointer-events-none"></div>

      <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative z-10 my-auto animate-in fade-in zoom-in-95 duration-700">
        
        {step === 'lang' ? (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-10 flex flex-col items-center">
              <div className="bg-aqua-600/20 p-5 rounded-3xl mb-4 border border-aqua-500/30 shadow-2xl transition-transform hover:scale-110 duration-500">
                <Droplets size={64} className="text-aqua-400 animate-float" fill="currentColor" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">AQUAFEEL</h2>
              <p className="text-sm font-bold text-aqua-400 tracking-[0.4em] uppercase mt-1">Solutions PA</p>
            </div>
            
            <p className="text-slate-400 text-sm mb-8 font-medium tracking-wide">
              Select your language • Selecione seu idioma • Seleccione su idioma
            </p>

            <div className="grid gap-3">
              {[
                { id: 'en' as Language, label: 'English', sub: 'United States', flag: 'us' },
                { id: 'es' as Language, label: 'Español', sub: 'España / Latino', flag: 'es' },
                { id: 'pt' as Language, label: 'Português', sub: 'Brasil / Portugal', flag: 'br' }
              ].map((item, index) => (
                <button 
                  key={item.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleLangSelect(item.id)} 
                  className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl transition-all duration-300 group w-full text-left animate-in fade-in slide-in-from-right-4 fill-mode-both"
                >
                  <div className="relative overflow-hidden w-12 h-8 rounded shadow-md shrink-0">
                    <img src={`https://flagcdn.com/w160/${item.flag}.png`} alt={item.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg group-hover:text-aqua-400 transition-colors">{item.label}</div>
                    <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{item.sub}</div>
                  </div>
                  <ChevronRight className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700 relative" onKeyDown={handleKeyDown}>
            <button onClick={() => setStep('lang')} className="absolute -top-2 left-0 text-slate-500 hover:text-white transition-all text-[10px] uppercase font-bold tracking-[0.2em] flex items-center gap-1 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              {t.backButton}
            </button>

            <div className="text-center mb-8 pt-6">
               <div className="mb-6 flex flex-col items-center">
                <div className="bg-aqua-600/20 p-3 rounded-2xl mb-2 border border-aqua-500/30 shadow-xl transition-transform hover:rotate-6 duration-300">
                    <Droplets size={32} className="text-aqua-400" fill="currentColor" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">AQUAFEEL</h2>
                <p className="text-[10px] font-bold text-aqua-400 tracking-[0.4em] uppercase mt-1">Solutions PA</p>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                 <Lock size={16} className="text-emerald-500 animate-pulse" />
                 <h1 className="text-lg font-serif font-bold text-white tracking-wide">{t.restricted}</h1>
              </div>
              <p className="text-slate-400 text-xs md:text-sm font-medium">{t.identify}</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">{t.yourName}</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all shadow-inner" 
                  placeholder={t.placeholderName} 
                  autoFocus 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">{t.spouseName}</label>
                <input 
                  type="text" 
                  value={spouse} 
                  onChange={(e) => setSpouse(e.target.value)} 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder-slate-600 focus:ring-2 focus:ring-aqua-500 focus:border-aqua-500 outline-none transition-all shadow-inner" 
                  placeholder={t.placeholderSpouse} 
                />
              </div>
              {error && (
                <div className="text-red-400 text-xs text-center font-bold bg-red-400/10 py-3 rounded-xl border border-red-400/20 animate-in shake duration-500">
                  {error}
                </div>
              )}
              <button 
                onClick={handleSubmit} 
                className="w-full bg-gradient-to-r from-aqua-600 to-blue-700 hover:from-aqua-500 hover:to-blue-600 text-white font-black py-4.5 rounded-2xl shadow-[0_10px_30px_rgba(2,132,199,0.3)] flex items-center justify-center gap-3 group transition-all duration-300 hover:-translate-y-1 active:scale-95 shimmer"
              >
                <span className="uppercase tracking-[0.1em]">{t.accessButton}</span>
                <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
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