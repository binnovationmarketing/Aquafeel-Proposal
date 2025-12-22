import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { ComparisonCalculator } from './components/ComparisonCalculator';
import { InfoSection } from './components/InfoSection';
import { UrgencyBanner } from './components/UrgencyBanner';
import { ContaminantTruths } from './components/ContaminantTruths';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { WhiteGloveService } from './components/WhiteGloveService';
import { SoapLifestyle } from './components/SoapLifestyle';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Phone, Lock, ChevronRight } from 'lucide-react';
import { Language, translations } from './utils/i18n';

function App() {
  const [selectedPlan, setSelectedPlan] = useState<string>('180x');
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [cleaningTotal, setCleaningTotal] = useState<number>(0);
  
  // Estado para os nomes e idioma
  const [clientData, setClientData] = useState<{name: string, spouse: string, lang: Language} | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lógica de Inicialização (Data e Nomes)
  useEffect(() => {
    // 1. Recuperar Data - Usando chave limpa (sem versão _vX)
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

    // 2. Recuperar Nomes e Idioma - Usando chave limpa
    const storedClient = localStorage.getItem('proposalClientData');
    if (storedClient) {
      try {
        setClientData(JSON.parse(storedClient));
      } catch (e) {
        console.error("Erro ao ler dados do cliente", e);
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

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  // Previne "flickering" enquanto carrega do localStorage
  if (!isLoaded || !expirationDate) return null;

  // Se não temos dados do cliente, mostra tela de boas-vindas
  if (!clientData) {
    return <WelcomeScreen onComplete={handleClientEntry} />;
  }

  const { lang, name, spouse } = clientData;
  const t = translations[lang];

  // Helpers para exibição de nomes
  const displayName = spouse 
    ? `${name} & ${spouse}` 
    : name;
  
  const whatsappMessage = spouse 
    ? `Ol%C3%A1%20Henrique%2C%20${name}%20e%20${spouse}%20aqui.`
    : `Ol%C3%A1%20Henrique%2C%20${name}%20aqui.`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-aqua-200 selection:text-aqua-900">
      <nav className="bg-white/90 backdrop-blur-md py-4 px-6 shadow-sm flex justify-between items-center sticky top-0 z-50 border-b border-slate-100 transition-all duration-300">
        <div className="font-black text-xl md:text-2xl tracking-tighter text-slate-900 flex items-center gap-1">
          AQUAFEEL <span className="text-aqua-500">SOLUTIONS</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs md:text-sm font-bold text-slate-600">
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <Lock size={14} /> {lang === 'pt' ? 'Ambiente Seguro' : (lang === 'en' ? 'Secure Environment' : 'Ambiente Seguro')}
          </div>
          <div className="bg-slate-900 text-white px-3 py-1 rounded-full shadow-lg shadow-slate-900/20">
            VIP #{name.substring(0,1).toUpperCase()}-992
          </div>
        </div>
      </nav>

      <HeroSection clientName={name} spouseName={spouse} lang={lang} />

      <InfoSection lang={lang} />

      <ContaminantTruths lang={lang} />
      
      <SoapLifestyle onTotalChange={setCleaningTotal} lang={lang} />
      
      <WhiteGloveService clientName={name} spouseName={spouse} lang={lang} />

      <div className="max-w-5xl mx-auto px-4 py-16">
         <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aqua-500 to-transparent opacity-50"></div>
            
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">{t.package.title} {displayName}</h3>
            <p className="text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.package.desc}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-aqua-600 to-blue-800 mb-2">25</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.package.soapYears}</div>
                  <div className="text-sm font-semibold text-slate-700 mt-1">Pure Selects ({t.soap.free})</div>
               </div>
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-700 mb-2">100%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.package.guarantee}</div>
                  <div className="text-sm font-semibold text-slate-700 mt-1">{t.hero.warrantySub}</div>
               </div>
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-900 mb-2">$0</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.package.cost}</div>
                  <div className="text-sm font-semibold text-slate-700 mt-1">{t.hero.free}</div>
               </div>
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-600 mb-2">2026</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.package.payment}</div>
                  <div className="text-sm font-semibold text-slate-700 mt-1">{t.package.firstQuota}</div>
               </div>
            </div>
         </div>
      </div>
      
      <div className="relative z-20 py-12 bg-slate-50 border-t border-slate-200">
        <div className="text-center mb-10 px-4">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                {lang === 'pt' ? 'Sua Proposta Exclusiva' : (lang === 'en' ? 'Your Exclusive Proposal' : 'Su Propuesta Exclusiva')}
             </h2>
             <p className="text-slate-500 mt-2">
                {lang === 'pt' ? 'Valores aplicados com desconto de comissão ($1.000 OFF).' : (lang === 'en' ? 'Values applied with commission discount ($1,000 OFF).' : 'Valores aplicados con descuento de comisión ($1,000 OFF).')}
             </p>
        </div>
        <ComparisonCalculator 
          onSelectPlan={handlePlanSelect} 
          expirationDate={expirationDate}
          cleaningTotal={cleaningTotal}
          lang={lang}
        />
      </div>

      <Testimonials lang={lang} />
      
      <FAQ spouseName={spouse || name} lang={lang} />

      <UrgencyBanner expirationDate={expirationDate} lang={lang} />

      <footer className="bg-slate-950 text-white py-16 border-t border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-2xl mb-3 tracking-tight">Aquafeel Solutions</h4>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              {t.footer.slogan}
            </p>
          </div>
          
          <div className="text-center md:text-right flex flex-col items-center md:items-end">
             <p className="text-sm text-slate-400 mb-4 font-medium">{t.footer.talkTo}</p>
             <a 
               href={`https://wa.me/12407806473?text=${whatsappMessage}`}
               target="_blank"
               rel="noopener noreferrer"
               className="bg-white text-slate-950 pl-6 pr-2 py-2 rounded-full font-bold flex items-center justify-between gap-4 hover:bg-aqua-50 transition-all group shadow-lg shadow-white/10"
             >
               <span className="flex items-center gap-2">
                 <Phone size={18} className="text-aqua-600" />
                 {t.footer.button}
               </span>
               <span className="bg-slate-950 text-white p-2 rounded-full group-hover:bg-aqua-600 transition-colors">
                 <ChevronRight size={16} />
               </span>
             </a>
          </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-slate-900 text-slate-600 text-xs uppercase tracking-widest font-semibold">
          {t.footer.rights}
        </div>
      </footer>
    </div>
  );
}

export default App;