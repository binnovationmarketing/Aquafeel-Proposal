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
  const [isExpired, setIsExpired] = useState(false);
  
  // Estado para os nomes e idioma
  const [clientData, setClientData] = useState<{name: string, spouse: string, lang: Language} | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lógica de Inicialização
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const debugMode = params.get('mode');

    // --- MODO DE TESTE (CHEAT CODES) ---
    if (debugMode === 'reset') {
      localStorage.removeItem('proposalFirstAccess');
      localStorage.removeItem('proposalClientData');
      console.log("Memória limpa! Recarregando como novo usuário...");
      // Remove o parametro mode=reset da URL para não loopar e recarrega
      const newUrl = window.location.href.replace('&mode=reset', '').replace('?mode=reset', '');
      window.history.replaceState({}, document.title, newUrl);
    }
    
    if (debugMode === 'expired') {
       // Força uma data de 3 dias atrás
       const threeDaysAgo = new Date();
       threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
       localStorage.setItem('proposalFirstAccess', threeDaysAgo.getTime().toString());
       console.log("Modo Expirado Ativado!");
    }
    // -----------------------------------

    // 1. Recuperar Data
    const storedStartDate = localStorage.getItem('proposalFirstAccess');
    let startDate: Date;

    if (storedStartDate) {
      startDate = new Date(parseInt(storedStartDate));
    } else {
      startDate = new Date();
      localStorage.setItem('proposalFirstAccess', startDate.getTime().toString());
    }
    // Expira em 48h
    const expDate = new Date(startDate.getTime() + (48 * 60 * 60 * 1000));
    setExpirationDate(expDate);

    // Checar se já expirou
    const now = new Date();
    if (now > expDate) {
      setIsExpired(true);
    }

    // 2. Tentar Ler da URL (Link Mágico)
    // Exemplo: site.com/?n=Aline&s=Sinval&l=pt
    const urlName = params.get('n') || params.get('name'); // Aceita 'n' ou 'name'
    const urlSpouse = params.get('s') || params.get('spouse'); // Aceita 's' ou 'spouse'
    const urlLang = params.get('l') || params.get('lang'); // Aceita 'l' ou 'lang'

    if (urlName) {
      // Se tiver nome na URL, força o login
      const selectedLang: Language = (urlLang === 'en' || urlLang === 'es' || urlLang === 'pt') ? urlLang : 'pt';
      const data = { 
        name: urlName, 
        spouse: urlSpouse || '', 
        lang: selectedLang 
      };
      setClientData(data);
      localStorage.setItem('proposalClientData', JSON.stringify(data));
      setIsLoaded(true);
      return; // Sai da função para não ler o localStorage antigo
    }

    // 3. Recuperar Cliente do LocalStorage (se não veio da URL)
    const storedClient = localStorage.getItem('proposalClientData');
    if (storedClient) {
      try {
        const parsed = JSON.parse(storedClient);
        if (parsed && parsed.name) {
          setClientData(parsed);
        }
      } catch (e) {
        console.error("Dados corrompidos, resetando...", e);
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

  // Timer para checar expiração em tempo real
  useEffect(() => {
    if (!expirationDate) return;
    const interval = setInterval(() => {
        if (new Date() > expirationDate) {
            setIsExpired(true);
        }
    }, 1000);
    return () => clearInterval(interval);
  }, [expirationDate]);

  // Previne "flickering"
  if (!isLoaded || !expirationDate) return null;

  // Se não tem cliente, mostra WelcomeScreen
  if (!clientData) {
    return <WelcomeScreen onComplete={handleClientEntry} />;
  }

  const { lang, name, spouse } = clientData;
  const t = translations[lang || 'pt']; // Fallback seguro

  const displayName = spouse ? `${name} & ${spouse}` : name;
  
  // Mensagem personalizada e codificada para o WhatsApp
  const getMessage = (expired: boolean) => {
    const isPt = lang === 'pt';
    const isEn = lang === 'en';
    
    if (expired) {
        if (isEn) return `Hello Henrique, *${name}* here. I missed the 48h deadline but I'm really interested. Is there any exception possible?`;
        if (!isPt) return `Hola Henrique, soy *${name}*. Perdí el plazo de 48h pero estoy muy interesado. ¿Hay alguna excepción posible?`;
        return `Olá Henrique, *${name}* aqui. Perdi o prazo de 48h mas tenho muito interesse. Existe alguma exceção possível?`;
    }

    if (spouse) {
        if (isEn) return `Hello Henrique, *${name} and ${spouse}* here. We saw the VIP proposal and want to secure our spot.`;
        if (!isPt) return `Hola Henrique, aquí *${name} y ${spouse}*. Vimos la propuesta VIP y queremos asegurar nuestro lugar.`;
        return `Olá Henrique, *${name} e ${spouse}* aqui. Vimos a proposta VIP e queremos garantir nossa condição especial.`;
    } else {
        if (isEn) return `Hello Henrique, *${name}* here. I saw the VIP proposal and want to secure my spot.`;
        if (!isPt) return `Hola Henrique, aquí *${name}*. Vi la propuesta VIP y quiero asegurar mi lugar.`;
        return `Olá Henrique, *${name}* aqui. Vi a proposta VIP e quero garantir minha condição especial.`;
    }
  };
  
  const whatsappMessage = encodeURIComponent(getMessage(isExpired));

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
          whatsappMessage={whatsappMessage}
          isExpired={isExpired}
        />
      </div>

      <Testimonials lang={lang} />
      <FAQ spouseName={spouse || name} lang={lang} />
      <UrgencyBanner 
        expirationDate={expirationDate} 
        lang={lang} 
        isExpired={isExpired}
        whatsappMessage={whatsappMessage}
      />

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