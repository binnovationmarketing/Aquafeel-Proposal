
import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { ComparisonCalculator } from './components/ComparisonCalculator';
import { InfoSection } from './components/InfoSection';
import { ContaminantTruths } from './components/ContaminantTruths';
import { WaterMalefices } from './components/WaterMalefices';
import { WaterConsumptionLogic } from './components/WaterConsumptionLogic';
import { SoapLifestyle } from './components/SoapLifestyle';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AnalystModal } from './components/AnalystModal';
import { Sidebar } from './components/Sidebar';
import { ManagerDashboard } from './components/ManagerDashboard';
import AquaFeelLogo from './components/AquaFeelLogo';
import { Phone, Lock, ChevronRight, Clock } from 'lucide-react';
import { Language, translations } from './utils/i18n';
import { ClientData } from './types';

function App() {
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [cleaningTotal, setCleaningTotal] = useState<number>(0);
  const [waterTotal, setWaterTotal] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnalystModalOpen, setIsAnalystModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [currentSection, setCurrentSection] = useState('hero');
  const [isManagerMode, setIsManagerMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const EXPIRATION_HOURS = 48;

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
    const urlEmail = params.get('e') || params.get('email');
    const urlZip = params.get('z') || params.get('zip');

    if (urlName) {
      const selectedLang: Language = (urlLang === 'en' || urlLang === 'es' || urlLang === 'pt') ? (urlLang as Language) : 'pt';
      const data: ClientData = { 
        name: urlName, 
        spouseName: urlSpouse || '', 
        lang: selectedLang,
        email: urlEmail || '',
        zipCode: urlZip || ''
      };
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'malefices', 'logic', 'soap', 'proposal', 'testimonials', 'faq'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < 300) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(id);
    }
  };

  if (isManagerMode) {
    return <ManagerDashboard onExit={() => setIsManagerMode(false)} />;
  }

  if (!isLoaded || !expirationDate) return null;
  if (!clientData) return (
    <WelcomeScreen 
      onComplete={(n, s, l, e, z) => {
        const data: ClientData = { name: n, spouseName: s, lang: l, email: e, zipCode: z };
        setClientData(data);
        localStorage.setItem('proposalClientData', JSON.stringify(data));
      }} 
    />
  );

  const { lang, name, spouseName, zipCode } = clientData;
  const t = translations[lang || 'pt'];
  const displayName = spouseName ? `${name} & ${spouseName}` : name;

  // Ajuste de margem principal baseado no estado da sidebar
  const mainMargin = isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-[260px]';

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-aqua-200 selection:text-aqua-900 pb-0 flex">
      
      <Sidebar 
        lang={lang} 
        clientName={name} 
        onNavigate={handleNavigate} 
        currentSection={currentSection}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onOpenManager={() => setIsManagerMode(true)}
        onLogout={() => { setClientData(null); localStorage.removeItem('proposalClientData'); }}
      />

      <main className={`flex-1 transition-all duration-300 w-full ${mainMargin}`}>
        
        <div id="hero"><HeroSection clientName={name} spouseName={spouseName} lang={lang} /></div>
        <InfoSection lang={lang} zipCode={zipCode} />
        <ContaminantTruths lang={lang} />
        <WaterMalefices lang={lang} />
        <div id="logic"><WaterConsumptionLogic lang={lang} onWaterTotalChange={setWaterTotal} /></div>
        <div id="soap"><SoapLifestyle onTotalChange={setCleaningTotal} lang={lang} /></div>

        <div id="proposal" className="max-w-5xl mx-auto px-4 py-12 md:py-16">
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
               <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">{lang === 'pt' ? 'Sua Proposta Exclusiva' : lang === 'en' ? 'Your Exclusive Proposal' : 'Su Propuesta Exclusiva'}</h2>
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

        <div id="testimonials"><Testimonials lang={lang} /></div>
        <div id="faq"><FAQ spouseName={spouseName || name} lang={lang} /></div>
        
        <div className="bg-slate-50 py-8 px-4 text-center">
          <p className="text-[9px] md:text-[10px] text-slate-500 font-medium max-w-4xl mx-auto leading-relaxed">{t.footer.soapDisclaimer}</p>
        </div>

        <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-white/10">
          <div className={`py-8 px-4 md:px-8 transition-colors duration-500 ${isExpired ? 'bg-red-950/80' : 'bg-aqua-950/40'}`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className={`${isExpired ? 'text-red-500' : 'text-amber-400'} animate-bounce`}>
                  <Clock size={32} />
                </div>
                <div className="text-center md:text-left">
                  <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-400 block mb-1">
                    {isExpired ? t.urgency.expiredTitle : t.urgency.expires}
                  </span>
                  {!isExpired && (
                    <span className="text-xl md:text-3xl font-black font-mono text-white">
                      {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
                    </span>
                  )}
                  <p className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-widest mt-2">{t.urgency.limit} {expirationDate.toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
                 <button 
                   onClick={() => setIsAnalystModalOpen(true)}
                   className={`w-full md:w-auto px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl ${isExpired ? 'bg-white text-red-600' : 'bg-red-600 text-white hover:bg-red-500'}`}
                 >
                   <Phone size={20} />
                   {isExpired ? t.urgency.expiredButton : t.footer.button}
                   <ChevronRight size={16} />
                 </button>
                 <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest">{t.urgency.commission}</p>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 flex flex-col items-center gap-6 text-center">
            <AquaFeelLogo width="220px" variant="white" className="opacity-80" />
            
            <div className="flex flex-col gap-2 items-center">
               <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                 <Lock size={12} className="text-emerald-500" />
                 {lang === 'pt' ? 'Conexão Segura 256-bit' : lang === 'en' ? 'Secure 256-bit Connection' : 'Conexión Segura 256-bit'}
               </div>
               <a href="mailto:binnovationmarketing@gmail.com" className="text-[10px] text-slate-600 hover:text-aqua-400 transition-colors uppercase tracking-widest font-bold">
                 binnovationmarketing@gmail.com
               </a>
            </div>

            <div className="w-full h-px bg-white/5 my-4"></div>

            <div className="text-slate-600 text-[10px] uppercase tracking-widest font-semibold leading-relaxed max-w-2xl">
              {t.footer.rights}
            </div>
          </div>
        </footer>
      </main>

      <AnalystModal isOpen={isAnalystModalOpen} onClose={() => setIsAnalystModalOpen(false)} lang={lang} clientName={name} />
    </div>
  );
}

export default App;
