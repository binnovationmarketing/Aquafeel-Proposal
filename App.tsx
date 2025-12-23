import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { ComparisonCalculator } from './components/ComparisonCalculator';
import { InfoSection } from './components/InfoSection';
import { UrgencyBanner } from './components/UrgencyBanner';
import { ContaminantTruths } from './components/ContaminantTruths';
import { WaterMalefices } from './components/WaterMalefices';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { WhiteGloveService } from './components/WhiteGloveService';
import { SoapLifestyle } from './components/SoapLifestyle';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Phone, Lock, ChevronRight, LogOut, Globe, Droplets } from 'lucide-react';
import { Language, translations } from './utils/i18n';

function App() {
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [cleaningTotal, setCleaningTotal] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const [clientData, setClientData] = useState<{name: string, spouse: string, lang: Language} | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const debugMode = params.get('mode');

    if (debugMode === 'reset') {
      localStorage.removeItem('proposalFirstAccess');
      localStorage.removeItem('proposalClientData');
      const newUrl = window.location.href.replace('&mode=reset', '').replace('?mode=reset', '');
      window.history.replaceState({}, document.title, newUrl);
    }
    
    if (debugMode === 'expired') {
       const threeDaysAgo = new Date();
       threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
       localStorage.setItem('proposalFirstAccess', threeDaysAgo.getTime().toString());
    }

    const storedStartDate = localStorage.getItem('proposalFirstAccess');
    let startDate: Date;
    if (storedStartDate) {
      startDate = new Date(parseInt(storedStartDate));
    } else {
      startDate = new Date();
      localStorage.setItem('proposalFirstAccess', startDate.getTime().toString());
    }
    const expDate = new Date(startDate.getTime() + (48 * 60 * 60 * 1000));
    setExpirationDate(expDate);

    const now = new Date();
    if (now > expDate) setIsExpired(true);

    const urlName = params.get('n') || params.get('name');
    const urlSpouse = params.get('s') || params.get('spouse');
    const urlLang = params.get('l') || params.get('lang');

    if (urlName) {
      const selectedLang: Language = (urlLang === 'en' || urlLang === 'es' || urlLang === 'pt') ? (urlLang as Language) : 'pt';
      const data = { name: urlName, spouse: urlSpouse || '', lang: selectedLang };
      setClientData(data);
      localStorage.setItem('proposalClientData', JSON.stringify(data));
      setIsLoaded(true);
      return;
    }

    const storedClient = localStorage.getItem('proposalClientData');
    if (storedClient) {
      try {
        const parsed = JSON.parse(storedClient);
        if (parsed && parsed.name) setClientData(parsed);
      } catch (e) {
        localStorage.removeItem('proposalClientData');
      }
    }
    setIsLoaded(true);
  }, []);

  const handleClientEntry = (name: string, spouse: string, lang: Language) => {
    const data = { name, spouse, lang };
    setClientData(data);
    localStorage.setItem('proposalClientData', JSON.stringify(data));
  };

  const handleLogout = () => {
    setClientData(null);
    localStorage.removeItem('proposalClientData');
    window.history.pushState({}, document.title, window.location.pathname);
  };

  useEffect(() => {
    if (!expirationDate) return;
    const interval = setInterval(() => {
        if (new Date() > expirationDate) setIsExpired(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [expirationDate]);

  if (!isLoaded || !expirationDate) return null;
  if (!clientData) return <WelcomeScreen onComplete={handleClientEntry} />;

  const { lang, name, spouse } = clientData;
  const t = translations[lang || 'pt'];
  const displayName = spouse ? `${name} & ${spouse}` : name;
  
  const whatsappMessage = encodeURIComponent(
    isExpired 
      ? `Olá Henrique, *${name}* aqui. Perdi o prazo de 48h mas tenho interesse.` 
      : `Olá Henrique, *${name}* aqui. Vi a proposta VIP e quero garantir minha condição.`
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-aqua-200 selection:text-aqua-900">
      <nav className="bg-white px-4 md:px-8 shadow-sm flex justify-between items-center sticky top-0 z-50 border-b border-slate-100 h-16 md:h-24">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-aqua-600 p-1.5 md:p-2 rounded-lg md:rounded-xl text-white shadow-lg shadow-aqua-500/20">
            <Droplets size={20} className="md:w-7 md:h-7" fill="currentColor" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg md:text-2xl font-black text-aqua-950 tracking-tighter uppercase">AQUAFEEL</span>
            <span className="text-[8px] md:text-xs font-bold text-aqua-600 tracking-[0.3em] md:tracking-[0.4em] uppercase ml-0.5">Solutions PA</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-4 text-xs md:text-sm font-bold text-slate-600">
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <Lock size={14} /> {lang === 'pt' ? 'Ambiente Seguro' : 'Secure'}
                </div>
                <div className="bg-slate-900 text-white px-3 py-1 rounded-full shadow-lg">
                    VIP #{name.substring(0,1).toUpperCase()}-992
                </div>
            </div>

            <button onClick={handleLogout} className="flex items-center gap-1.5 md:gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-colors">
                <Globe size={18} className="text-aqua-600 w-4 h-4 md:w-5 md:h-5"/>
                <span className="text-[10px] md:text-xs font-bold uppercase hidden sm:inline">
                    {lang === 'pt' ? 'Voltar' : 'Back'}
                </span>
                <LogOut size={16} className="sm:hidden w-4 h-4" />
            </button>
        </div>
      </nav>

      <HeroSection clientName={name} spouseName={spouse} lang={lang} />
      <InfoSection lang={lang} />
      <ContaminantTruths lang={lang} />
      <WaterMalefices lang={lang} />
      <SoapLifestyle onTotalChange={setCleaningTotal} lang={lang} />
      <WhiteGloveService clientName={name} spouseName={spouse} lang={lang} />

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
         <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 md:p-12 shadow-xl border border-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aqua-500 to-transparent opacity-50"></div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-3 md:mb-4">{t.package.title} {displayName}</h3>
            <p className="text-sm md:text-base text-slate-500 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">{t.package.desc}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
               <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm border border-slate-100"><div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-aqua-600 to-blue-800 mb-1 md:mb-2">25</div><div className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-slate-400">{t.package.soapYears}</div></div>
               <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm border border-slate-100"><div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-700 mb-1 md:mb-2">100%</div><div className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-slate-400">{t.package.guarantee}</div></div>
               <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm border border-slate-100"><div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-900 mb-1 md:mb-2">$0</div><div className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-slate-400">{t.package.cost}</div></div>
               <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm border border-slate-100"><div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-600 mb-1 md:mb-2">2026</div><div className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-slate-400">{t.package.payment}</div></div>
            </div>
         </div>
      </div>
      
      <div className="relative z-20 py-10 md:py-12 bg-slate-50 border-t border-slate-200">
        <div className="text-center mb-8 md:mb-10 px-4">
             <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">{lang === 'pt' ? 'Sua Proposta Exclusiva' : 'Your Exclusive Proposal'}</h2>
             <p className="text-sm md:text-base text-slate-500 mt-2 px-4">{lang === 'pt' ? 'Valores aplicados com desconto de comissão ($1.000 OFF).' : 'Values with commission discount ($1,000 OFF).'}</p>
        </div>
        <ComparisonCalculator onSelectPlan={()=>{}} expirationDate={expirationDate} cleaningTotal={cleaningTotal} lang={lang} whatsappMessage={whatsappMessage} isExpired={isExpired} />
      </div>

      <Testimonials lang={lang} />
      <FAQ spouseName={spouse || name} lang={lang} />
      <UrgencyBanner expirationDate={expirationDate} lang={lang} isExpired={isExpired} whatsappMessage={whatsappMessage} />

      <footer className="bg-slate-950 text-white py-12 md:py-16 border-t border-slate-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="bg-white/10 p-2.5 md:p-3 rounded-xl md:rounded-2xl border border-white/10 shadow-xl">
              <Droplets size={32} className="text-aqua-400 md:w-9 md:h-9" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase leading-none">AQUAFEEL</span>
              <span className="text-xs md:text-sm font-bold text-aqua-400 tracking-[0.3em] md:tracking-[0.4em] uppercase mt-1">Solutions PA</span>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
             <a href={`https://wa.me/12407806473?text=${whatsappMessage}`} target="_blank" className="bg-white text-slate-950 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-black flex items-center gap-3 md:gap-4 hover:bg-aqua-50 transition-all shadow-xl group text-sm md:text-base">
               <Phone size={18} className="text-aqua-600 w-4 h-4 md:w-5 md:h-5" />
               <span className="uppercase tracking-wide">{t.footer.button}</span>
               <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform w-4 h-4" />
             </a>
          </div>
        </div>
        <div className="text-center mt-12 md:mt-16 text-slate-600 text-[10px] md:text-xs uppercase tracking-widest font-semibold border-t border-white/5 pt-8 px-4 leading-relaxed">{t.footer.rights}</div>
      </footer>
    </div>
  );
}

export default App;