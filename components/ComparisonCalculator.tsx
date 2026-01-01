
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

  const regionPrices: Record<RegionId, number> = { NE: 8990, SOUTH: 7990 };
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
    { id: 'RANGE1', label: '740+', score: "EXCELLENT" },
    { id: 'RANGE2', label: '700-739', score: "GREAT" },
    { id: 'RANGE3', label: '660-699', score: "GOOD" },
    { id: 'RANGE4', label: '620-659', score: "FAIR" },
    { id: 'RANGE5', label: '619-', score: "CHALLENGED" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-slate-100 bg-white">
        
        {/* LADO ESQUERDO */}
        <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between bg-slate-50/50">
          <div>
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">{t.problemTitle}</h2>
              <p className="text-[8px] font-black text-slate-400 tracking-[0.3em] uppercase mt-2">{t.problemSub}</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-4 px-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <Droplets className="text-blue-600" size={18} />
                  <span className="font-bold text-slate-800 text-sm">Água Potável</span>
                </div>
                <span className="font-black text-slate-900">${waterTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-4 px-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="text-emerald-600" size={18} />
                  <span className="font-bold text-slate-800 text-sm">Sabão & Higiene</span>
                </div>
                <span className="font-black text-slate-900">${cleaningTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-6 mt-8 text-center relative shadow-xl">
            <p className="text-[8px] text-slate-500 font-black mb-1 uppercase tracking-widest">{t.currentMonthly}</p>
            <div className="text-3xl md:text-5xl font-black text-white tracking-tighter">${monthlyTotalSpending.toFixed(2)}</div>
            <div className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">
              <AlertTriangle size={10} /> {t.waste}
            </div>
          </div>
        </div>

        {/* LADO DIREITO */}
        <div className={`p-6 md:p-10 flex flex-col relative ${isExpired ? 'bg-slate-900' : 'bg-slate-950 text-white'}`}>
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none">{t.solutionTitle}</h2>
            <p className="text-[8px] font-black tracking-[0.3em] uppercase mt-2 text-aqua-400">{t.solutionSub}</p>
          </div>

          <div className="mb-4">
            <FluidDropdown label={t.selectRegion} options={regionOptions} selectedId={selectedRegion} onSelect={(id) => setSelectedRegion(id as RegionId)} />
          </div>

          <div className="flex flex-col items-center mb-6">
              <div className="text-5xl md:text-7xl font-black text-white tracking-tighter flex items-start gap-1">
                  <span className="text-xl mt-3 opacity-30">$</span>{currentPlan.amount}
                  {currentPlan.id !== 'cash' && <span className="text-lg text-slate-600 mt-auto mb-4">/mo</span>}
              </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {plans.map((p) => (
              <button
                key={p.id} onClick={() => setSelectedPlan(p.id)}
                className={`py-3 rounded-xl border text-[10px] font-black uppercase transition-all ${
                  selectedPlan === p.id ? 'bg-white text-slate-950 border-white' : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="mb-6 overflow-hidden">
            <label className="block text-[7px] font-black text-slate-500 uppercase tracking-widest mb-2">SCORE DE CRÉDITO</label>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {creditOptions.map((opt) => (
                <button
                  key={opt.id} onClick={() => setSelectedCredit(opt.id as CreditRangeId)}
                  className={`flex flex-col min-w-[90px] p-3 rounded-xl border transition-all ${
                    selectedCredit === opt.id ? 'bg-aqua-500 border-aqua-400 text-white' : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  <span className="text-[8px] font-black opacity-70 mb-1">{opt.score}</span>
                  <span className="text-xs font-black">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={onOpenAnalyst} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-red-500 transition-all active:scale-95 shadow-xl">
            <span className="uppercase tracking-widest text-sm">{t.negotiate}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <UrgencyChart 
        waterMonthly={waterTotal} soapMonthly={cleaningTotal} 
        fixedMonthly={currentPlan.id === 'cash' ? (cashPrice / 12) : currentPlan.amount} 
        cashPrice={cashPrice} lang={lang} financingMonths={currentPlan.months || 0}
      />
    </div>
  );
};
