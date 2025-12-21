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
import { Phone, Lock, ChevronRight } from 'lucide-react';

function App() {
  const [selectedPlan, setSelectedPlan] = useState<string>('180x');
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  
  // Estado para armazenar o gasto total de limpeza calculado no módulo SoapLifestyle
  const [cleaningTotal, setCleaningTotal] = useState<number>(0);

  // Lógica de Urgência Persistente
  useEffect(() => {
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
  }, []);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  if (!expirationDate) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-aqua-200 selection:text-aqua-900">
      <nav className="bg-white/90 backdrop-blur-md py-4 px-6 shadow-sm flex justify-between items-center sticky top-0 z-50 border-b border-slate-100 transition-all duration-300">
        <div className="font-black text-xl md:text-2xl tracking-tighter text-slate-900 flex items-center gap-1">
          AQUAFEEL <span className="text-aqua-500">SOLUTIONS</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs md:text-sm font-bold text-slate-600">
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <Lock size={14} /> Ambiente Seguro
          </div>
          <div className="bg-slate-900 text-white px-3 py-1 rounded-full shadow-lg shadow-slate-900/20">Proposta VIP #A-992</div>
        </div>
      </nav>

      <HeroSection />

      <InfoSection />

      <ContaminantTruths />
      
      {/* Novo Módulo de Sabão e Estilo de Vida */}
      <SoapLifestyle onTotalChange={setCleaningTotal} />
      
      {/* Instalação Rebrand (Antigo White Glove) */}
      <WhiteGloveService />

      <div className="max-w-5xl mx-auto px-4 py-16">
         <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-white ring-1 ring-slate-100 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aqua-500 to-transparent opacity-50"></div>
            
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">O Pacote Completo Aline & Sinval</h3>
            <p className="text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Como clientes de elite retornando à nossa família, removemos todas as barreiras. Esta configuração foi desenhada para a nova casa com tecnologia superior à anterior.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-aqua-600 to-blue-800 mb-2">25</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Anos de Sabão</div>
                  <div className="text-sm font-semibold text-slate-700 mt-1">Pure Selects (Grátis)</div>
               </div>
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-700 mb-2">100%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Garantia Total</div>
                  <div className="text-sm font-semibold text-slate-700 mt-1">Vitalícia no Sistema</div>
               </div>
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-900 mb-2">$0</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Custo Inicial</div>
                  <div className="text-sm font-semibold text-slate-700 mt-1">Sem Entrada / Taxas</div>
               </div>
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-600 mb-2">2026</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Pagamento</div>
                  <div className="text-sm font-semibold text-slate-700 mt-1">Primeira Cota em Março</div>
               </div>
            </div>
         </div>
      </div>
      
      <div className="relative z-20 py-12 bg-slate-50 border-t border-slate-200">
        <div className="text-center mb-10 px-4">
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                Sua Proposta Exclusiva
             </h2>
             <p className="text-slate-500 mt-2">Valores aplicados com desconto de comissão ($1.000 OFF).</p>
        </div>
        <ComparisonCalculator 
          onSelectPlan={handlePlanSelect} 
          expirationDate={expirationDate}
          cleaningTotal={cleaningTotal}
        />
      </div>

      <Testimonials />
      
      <FAQ />

      <UrgencyBanner expirationDate={expirationDate} />

      <footer className="bg-slate-950 text-white py-16 border-t border-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-2xl mb-3 tracking-tight">Aquafeel Solutions</h4>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Elevando o padrão de vida através da purificação de água. <br/>Tecnologia superior para famílias que não aceitam o básico.
            </p>
          </div>
          
          <div className="text-center md:text-right flex flex-col items-center md:items-end">
             <p className="text-sm text-slate-400 mb-4 font-medium">Falar diretamente com seu Consultor</p>
             <a 
               href="https://wa.me/12407806473?text=Ol%C3%A1%20Henrique%2C%20Aline%20aqui.%20Vi%20a%20proposta%20e%20quero%20garantir%20o%20pagamento%20para%202026."
               target="_blank"
               rel="noopener noreferrer"
               className="bg-white text-slate-950 pl-6 pr-2 py-2 rounded-full font-bold flex items-center justify-between gap-4 hover:bg-aqua-50 transition-all group shadow-lg shadow-white/10"
             >
               <span className="flex items-center gap-2">
                 <Phone size={18} className="text-aqua-600" />
                 Falar com Carlos Henrique
               </span>
               <span className="bg-slate-950 text-white p-2 rounded-full group-hover:bg-aqua-600 transition-colors">
                 <ChevronRight size={16} />
               </span>
             </a>
          </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-slate-900 text-slate-600 text-xs uppercase tracking-widest font-semibold">
          © 2024 Aquafeel Solutions • Proposta Confidencial
        </div>
      </footer>
    </div>
  );
}

export default App;
