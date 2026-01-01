import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Droplets, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  MapPin,
  Award
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';
import { FluidDropdown } from './ui/fluid-dropdown';
import { Component as UrgencyChart } from './ui/real-time-analytics';

interface ComparisonCalculatorProps {
  onSelectPlan: (planId: string) => void;
  expirationDate: Date;
  cleaningTotal: number;
  waterTotal: number;
  lang: Language;
  onOpenAnalyst: () => void;
  isExpired?: boolean;
}

type RegionId = 'NE' | 'SOUTH';
type CreditRangeId = 'RANGE1' | 'RANGE2' | 'RANGE3' | 'RANGE4' | 'RANGE5';

export const ComparisonCalculator: React.FC<ComparisonCalculatorProps> = ({ 
    onSelectPlan, 
    expirationDate, 
    cleaningTotal, 
    waterTotal,
    lang, 
    onOpenAnalyst,
    isExpired = false 
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('180x');
  const [selectedRegion, setSelectedRegion] = useState<RegionId>('NE');
  const [selectedCredit, setSelectedCredit] = useState<CreditRangeId>('RANGE1');
  
  const t = translations[lang].calculator;

  // Preços atualizados conforme solicitação:
  // NJ, PA, DE -> $8,990
  // MD, VA, DC, NC -> $7,990
  const regionPrices: Record<RegionId, number> = {
    NE: 8990,
    SOUTH: 7990
  };

  const factors: Record<CreditRangeId, { '180x': number; '120x': number; '60x': number }> = {
    RANGE1: { '180x': 1.14, '120x': 1.38, '60x': 2.17 },
    RANGE2: { '180x': 1.24, '120x': 1.47, '60x': 2.25 },
    RANGE3: { '180x': 1.37, '120x': 1.59, '60x': 2.39 },
    RANGE4: { '180x': 1.55, '120x': 1.74, '60x': 2.61 },
    RANGE5: { '180x': 1.62, '120x': 1.80, '60x': 2.70 }
  };

  const cashPrice = regionPrices[selectedRegion];
  const creditFactors = factors[selectedCredit];

  const calculateMonthly = (factor: number) => Math.round((cashPrice * factor) / 100);

  const plans = [
    { id: '180x', label: `180 ${t.months}`, amount: calculateMonthly(creditFactors['180x']), months: 180 },
    { id: '120x', label: `120 ${t.months}`, amount: calculateMonthly(creditFactors['120x']), months: 120 }, 
    { id: '60x', label: `60 ${t.months}`, amount: calculateMonthly(creditFactors['60x']), months: 60 }, 
    { id: 'cash', label: t.cash, amount: cashPrice, isFull: true, months: 0 },
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];
  const monthlyTotalSpending = waterTotal + cleaningTotal;

  const regionOptions = [
    { id: 'NE', label: 'NJ, PA, DE ($8.9k)', icon: MapPin },
    { id: 'SOUTH', label: 'MD, VA, DC, NC ($7.9k)', icon: MapPin }
  ];

  const creditOptions = [
    { id: 'RANGE1', label: t.creditRanges.excellent.split(' ')[1], score: "740+" },
    { id: 'RANGE2', label: t.creditRanges.great.split(' ')[1], score: "700-739" },
    { id: 'RANGE3', label: t.creditRanges.good.split(' ')[1], score: "660-699" },
    { id: 'RANGE4', label: t.creditRanges.fair.split(' ')[1], score: "620-659" },
    { id: 'RANGE5', label: t.creditRanges.challenged.split(' ')[1], score: "619-" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-slate-100 bg-white">
        
        {/* LADO ESQUERDO: DINHEIRO INVISÍVEL */}
        <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between">
          <div>
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">{t.problemTitle}</h2>
              <p className="text-[8px] font-black text-slate-400 tracking-[0.3em] uppercase mt-2">{t.problemSub}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-4 px-6 rounded-2xl bg-slate-50 border border-slate-100 group transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-xl text-white shadow-xl shadow-blue-600/10">
                    <Droplets size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm leading-none">{t.waterDrink}</span>
                    <span className="text-[7px] text-slate-400 font-black uppercase tracking-widest mt-1 block">Consumo Mensal</span>
                  </div>
                </div>
                <span className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">${waterTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-4 px-6 rounded-2xl bg-slate-50 border border-slate-100 group transition-all">
                <div className="flex items-center gap-4">
                   <div className="bg-emerald-600 p-3 rounded-xl text-white shadow-xl shadow-emerald-600/10">
                    <ShoppingCart size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm leading-none">{t.cleaning}</span>
                    <span className="text-[7px] text-slate-400 font-black uppercase tracking-widest mt-1 block">Produtos Casa</span>
                  </div>
                </div>
                <span className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">${cleaningTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-[2rem] p-6 mt-8 text-center relative shadow-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent"></div>
            <div className="relative z-10">
              <p className="text-[8px] text-slate-500 font-black mb-1 uppercase tracking-[0.4em]">{t.currentMonthly}</p>
              <div className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                ${monthlyTotalSpending.toFixed(2)}<span className="text-sm text-slate-600 font-medium ml-1">/mo</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white px-5 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] shadow-lg animate-pulse">
                <AlertTriangle size={10} />
                {t.waste}
              </div>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: SIMULADOR AQUAFEEL */}
        <div className={`p-6 md:p-10 flex flex-col relative overflow-hidden transition-all duration-700 ${isExpired ? 'bg-slate-900' : 'bg-slate-950 text-white'}`}>
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-black px-6 py-2 rounded-bl-xl uppercase tracking-widest z-10 shadow-xl">
             {isExpired ? t.offerExpired : 'VIP PROPOSAL'}
          </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">{t.solutionTitle}</h2>
              <p className={`text-[8px] font-black tracking-[0.3em] uppercase mt-2 ${isExpired ? 'text-red-400' : 'text-aqua-400'}`}>{t.solutionSub}</p>
            </div>

            <div className="mb-4">
              <FluidDropdown 
                label={t.selectRegion}
                options={regionOptions}
                selectedId={selectedRegion}
                onSelect={(id) => setSelectedRegion(id as RegionId)}
                className="text-xs"
              />
            </div>

            <div className="flex flex-col items-center mb-6">
                <div className="text-5xl md:text-6xl font-black text-white tracking-tighter flex items-start gap-1">
                    <span className="text-xl mt-3 opacity-30 font-light">$</span>
                    {currentPlan.amount}
                    {currentPlan.id !== 'cash' && <span className="text-lg text-slate-600 mt-auto mb-4 font-medium tracking-normal">/mo</span>}
                </div>
                {!isExpired && (
                    <div className="mt-4 bg-white/5 text-white px-5 py-1.5 rounded-full font-black text-[10px] shadow-xl border border-white/10 flex items-center gap-2">
                       <Sparkles size={12} className="text-aqua-400" /> {t.benefits.discount}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all duration-300 ${
                    selectedPlan === plan.id 
                      ? 'bg-white text-slate-950 border-white shadow-lg scale-[1.03] z-10'
                      : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                  }`}
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.1em]">{plan.label.split(' ')[0]}</span>
                  <span className="text-[6px] font-bold uppercase tracking-widest opacity-60 mt-0.5">{plan.label.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-[7px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2 ml-1">{t.selectCredit}</label>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar snap-x">
                {creditOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedCredit(opt.id as CreditRangeId)}
                    className={`snap-center flex flex-col min-w-[85px] md:min-w-[95px] p-2 rounded-xl border transition-all duration-300 ${
                      selectedCredit === opt.id 
                        ? 'bg-aqua-500 border-aqua-400 text-white shadow-md' 
                        : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                    }`}
                  >
                    <Award size={12} className={`mb-1 ${selectedCredit === opt.id ? 'text-white' : 'text-slate-700'}`} />
                    <span className="text-[7px] font-black uppercase tracking-tighter leading-none mb-0.5 opacity-70">{opt.label}</span>
                    <span className={`text-[10px] font-black ${selectedCredit === opt.id ? 'text-white' : 'text-slate-300'}`}>{opt.score}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              <button 
                onClick={onOpenAnalyst}
                className={`w-full font-black text-sm md:text-base py-3.5 md:py-4 rounded-xl transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group ${
                    isExpired ? 'bg-slate-700 text-white shadow-none' : 'bg-red-600 text-white border-b-4 border-red-800 shadow-xl'
                }`}
              >
                <span className="tracking-tight uppercase">{t.negotiate}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GRÁFICO DE PROJEÇÃO DE 10 ANOS COM SIMULADOR DE JUROS */}
      <UrgencyChart 
        waterMonthly={waterTotal} 
        soapMonthly={cleaningTotal} 
        fixedMonthly={currentPlan.id === 'cash' ? (cashPrice / 12) : currentPlan.amount} 
        cashPrice={cashPrice} 
        lang={lang}
        financingMonths={currentPlan.months || 0}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};