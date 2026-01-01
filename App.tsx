import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { ComparisonCalculator } from './components/ComparisonCalculator';
import { InfoSection } from './components/InfoSection';
import { ContaminantTruths } from './components/ContaminantTruths';
import { WaterMalefices } from './components/WaterMalefices';
import { WaterConsumptionLogic } from './components/WaterConsumptionLogic';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { WhiteGloveService } from './components/WhiteGloveService';
import { SoapLifestyle } from './components/SoapLifestyle';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AnalystModal } from './components/AnalystModal';
import AquaFeelLogo from './components/AquaFeelLogo';
import { Phone, Lock, ChevronRight, LogOut, Globe, Clock, AlertTriangle } from 'lucide-react';
import { Language, translations } from './utils/i18n';

function App() {
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [cleaningTotal, setCleaningTotal] = useState<number>(0);
  const [waterTotal, setWaterTotal] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const [clientData, setClientData] = useState<{name: string, spouse: string, lang: Language} | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnalystModalOpen, setIsAnalystModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  
  const EXPIRATION_HOURS = 120;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storedStartDate = localStorage.getItem('proposalFirstAccess');
    let startDate: Date;

    if (storedStartDate) {
      const parsedDate = new Date(parseInt(storedStartDate));
      const now = new Date();
      const diffInDays = (now.getTime() - parsedDate.getTime()) / (1000 * 60 * 60 * 24);
      startDate = diffInDays > 15 ? new Date() : parsedDate;
    } else {
      startDate = new Date();
    }
    
    localStorage.setItem('proposalFirstAccess', startDate.getTime().toString());
    const expDate = new Date(startDate.getTime() + (EXPIRATION_HOURS * 60 * 60 * 1000));
    setExpirationDate(expDate);

    const urlName = params.get('n') || params.get('name');
    const urlSpouse = params.get('s') || params.get('spouse');
    const urlLang = params.get('l') || params.get('lang');

    if (urlName) {
      const selectedLang: Language = (urlLang === 'en' || urlLang === 'es' || urlLang === 'pt') ? (urlLang as Language) : 'pt';
      const data = { name: urlName, spouse: urlSpouse || '', lang: selectedLang };
      setClientData(data);
      localStorage.setItem('proposalClientData', JSON.stringify(data));
    } else {
      const storedClient = localStorage.getItem('proposalClientData');
      if (storedClient) {
        try {
          const parsed = JSON.parse(storedClient);
          if (parsed && parsed.name) setClientData(parsed);
        } catch (e) {
          localStorage.removeItem('proposalClientData');
        }
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!expirationDate) return;
    const updateTimer = () => {
      const now = new Date();
      const difference = expirationDate.getTime() - now.getTime();
      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsExpired(false);
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60))),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expirationDate]);

  if (!isLoaded || !expirationDate) return null;
  if (!clientData) return <WelcomeScreen onComplete={(n, s, l) => setClientData({name: n, spouse: s, lang: l})} />;

  const { lang, name, spouse } = clientData;
  const t = translations[lang || 'pt'];
  const displayName = spouse ? `${name} & ${spouse}` : name;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-aqua-200 selection:text-aqua-900 pb-20 md:pb-0">
      <nav className="bg-white px-4 md:px-8 shadow-sm flex justify-between items-center sticky top-0 z-50 border-b border-slate-100 h-16 md:h-24">
        <AquaFeelLogo width="160px" className="md:w-[220px]" />
        <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-4 text-xs md:text-sm font-bold text-slate-600">
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <Lock size={14} /> {lang === 'pt' ? 'Ambiente Seguro' : 'Secure'}
                </div>
                <div className="bg-slate-900 text-white px-3 py-1 rounded-full shadow-lg">
                    VIP #{name.substring(0,1).toUpperCase()}-992
                </div>
            </div>
            <button onClick={() => { setClientData(null); localStorage.removeItem('proposalClientData'); }} className="flex items-center gap-1.5 md:gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-colors">
                <Globe size={18} className="text-aqua-600 w-4 h-4 md:w-5 md:h-5"/>
                <span className="text-[10px] md:text-xs font-bold uppercase hidden sm:inline">{lang === 'pt' ? 'Sair' : 'Exit'}</span>
                <LogOut size={16} className="sm:hidden w-4 h-4" />
            </button>
        </div>
      </nav>

      <HeroSection clientName={name} spouseName={spouse} lang={lang} />
      <InfoSection lang={lang} />
      <ContaminantTruths lang={lang} />
      <WaterMalefices lang={lang} />
      <WaterConsumptionLogic lang={lang} onWaterTotalChange={setWaterTotal} />
      <SoapLifestyle onTotalChange={setCleaningTotal} lang={lang} />
      <WhiteGloveService clientName={name} spouseName={spouse} lang={lang} />

      {/* Seção de Oferta VIP */}
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
             <p className="text-sm md:text-base text-slate-500 mt-2 px-4">{t.calculator.proposalSub}</p>
        </div>
        <ComparisonCalculator 
          onSelectPlan={() => {}} 
          expirationDate={expirationDate} 
          cleaningTotal={cleaningTotal} 
          waterTotal={waterTotal}
          lang={lang} 
          onOpenAnalyst={() => setIsAnalystModalOpen(true)} 
          isExpired={isExpired} 
        />
      </div>

      <Testimonials lang={lang} />
      <FAQ spouseName={spouse || name} lang={lang} />
      
      <div className="bg-slate-50 py-8 px-4 text-center mb-32 md:mb-0">
        <p className="text-[9px] md:text-[10px] text-slate-500 font-medium max-w-4xl mx-auto leading-relaxed">{t.footer.soapDisclaimer}</p>
      </div>

      <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-white/10">
        <div className={`py-4 px-4 md:px-8 border-b border-white/5 transition-colors duration-500 ${isExpired ? 'bg-red-950/80 animate-pulse' : 'bg-aqua-950/40'}`}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`${isExpired ? 'text-red-500' : 'text-amber-400'} animate-float`}>
                <Clock size={20} />
              </div>
              <div className="text-center md:text-left">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 block mb-0.5">
                  {isExpired ? t.urgency.expiredTitle : t.urgency.expires}
                </span>
                {!isExpired && (
                  <span className="text-sm md:text-base font-black font-mono text-white">
                    {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
               <button 
                 onClick={() => setIsAnalystModalOpen(true)}
                 className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl ${isExpired ? 'bg-white text-red-600' : 'bg-red-600 text-white hover:bg-red-500'}`}
               >
                 <Phone size={16} />
                 {isExpired ? t.urgency.expiredButton : t.footer.button}
                 <ChevronRight size={14} className="hidden md:block" />
               </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <AquaFeelLogo width="220px" variant="white" className="opacity-80" />
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
               <Lock size={12} className="text-emerald-500" />
               {lang === 'pt' ? 'Conexão Segura 256-bit' : 'Secure 256-bit Connection'}
            </div>
          </div>
          <div className="text-slate-600 text-[10px] md:text-xs uppercase tracking-widest font-semibold leading-relaxed">
            {t.footer.rights}
          </div>
        </div>
      </footer>

      <AnalystModal isOpen={isAnalystModalOpen} onClose={() => setIsAnalystModalOpen(false)} lang={lang} clientName={name} />
    </div>
  );
}

export default App;