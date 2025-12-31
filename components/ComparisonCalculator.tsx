import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  Gift, 
  Calendar, 
  DollarSign,
  ArrowRight,
  Utensils,
  Ban,
  Sparkles,
  MapPin,
  TrendingDown,
  ChevronDown,
  LayoutList
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface ComparisonCalculatorProps {
  onSelectPlan: (planId: string) => void;
  expirationDate: Date;
  cleaningTotal: number;
  waterTotal: number;
  lang: Language;
  onOpenAnalyst: () => void;
  isExpired?: boolean;
}

type RegionId = 'NE' | 'DMV_CAROLINAS';
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
  const [showCreditDropdown, setShowCreditDropdown] = useState(false);
  
  const t = translations[lang].calculator;

  // Regional Cash Prices
  const regionPrices: Record<RegionId, number> = {
    NE: 8990,
    DMV_CAROLINAS: 7990
  };

  // Aqua Finance Payment Factors (%)
  const factors: Record<CreditRangeId, { '180x': number; '120x': number; '60x': number; '144x'?: number }> = {
    RANGE1: { '180x': 1.14, '120x': 1.38, '60x': 2.17 },
    RANGE2: { '180x': 1.24, '120x': 1.47, '60x': 2.25 },
    RANGE3: { '180x': 1.37, '120x': 1.59, '60x': 2.39, '144x': 1.47 },
    RANGE4: { '180x': 1.55, '120x': 1.74, '60x': 2.61, '144x': 1.64 },
    RANGE5: { '180x': 1.62, '120x': 1.80, '60x': 2.70, '144x': 1.70 }
  };

  const cashPrice = regionPrices[selectedRegion];
  const creditFactors = factors[selectedCredit];

  const calculateMonthly = (factor: number) => Math.round((cashPrice * factor) / 100);

  const plans = [
    { id: '180x', label: `180 ${t.months}`, amount: calculateMonthly(creditFactors['180x']), icon: Calendar },
    { id: '120x', label: `120 ${t.months}`, amount: calculateMonthly(creditFactors['120x']), icon: Calendar }, 
    { id: '60x', label: `60 ${t.months}`, amount: calculateMonthly(creditFactors['60x']), icon: Calendar }, 
    { id: 'cash', label: t.cash, amount: cashPrice, icon: DollarSign, isFull: true },
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];
  const monthlyTotalSpending = waterTotal + cleaningTotal;

  const creditLabels: Record<CreditRangeId, string> = {
    RANGE1: t.creditRanges.excellent,
    RANGE2: t.creditRanges.great,
    RANGE3: t.creditRanges.good,
    RANGE4: t.creditRanges.fair,
    RANGE5: t.creditRanges.challenged
  };

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 relative z-20">
      <div className="grid md:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden ring-4 ring-slate-100 transition-all duration-500 hover:ring-aqua-100">
        
        {/* LEFT SIDE: THE PROBLEM */}
        <div className="bg-white p-6 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight font-sans">{t.problemTitle}</h2>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mt-1">{t.problemSub}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-6 border-b border-slate-100 px-6 rounded-2xl bg-blue-50/20">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-2.5 rounded-xl text-white">
                    <Droplets size={24} />
                  </div>
                  <div>
                    <span className="font-black text-slate-800 block text-lg">{t.waterDrink}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Gasto Mensual</span>
                  </div>
                </div>
                <span className="text-3xl font-black text-slate-900">${waterTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-6 border-b border-slate-100 px-6 rounded-2xl bg-emerald-50/20">
                <div className="flex items-center gap-4">
                   <div className="bg-emerald-600 p-2.5 rounded-xl text-white">
                    <ShoppingCart size={24} />
                  </div>
                  <div>
                    <span className="font-black text-slate-800 block text-lg">{t.cleaning}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Gasto Mensual</span>
                  </div>
                </div>
                <span className="text-3xl font-black text-slate-900">${cleaningTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 mt-12 text-center relative shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-50"></div>
              <p className="text-[10px] text-slate-400 font-black mb-1 uppercase tracking-[0.3em] relative z-10">{t.currentMonthly}</p>
              <div className="text-6xl font-black text-white tracking-tighter relative z-10">
                ${monthlyTotalSpending.toFixed(2)}<span className="text-2xl text-slate-500 font-medium ml-1">/mês</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest relative z-10 animate-bounce">
                <AlertTriangle size={12} />
                {t.waste}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-slate-500 font-bold text-sm leading-tight italic">
                {t.warning}
                </p>
          </div>
        </div>

        {/* RIGHT SIDE: SOLUTION */}
        <div className={`text-white p-6 md:p-10 flex flex-col relative overflow-hidden transition-all duration-700 ${isExpired ? 'bg-slate-900' : 'bg-[#020d1a]'}`}>
           
           <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-4 py-2 rounded-bl-xl uppercase tracking-widest z-10 shadow-lg">
             {isExpired ? t.offerExpired : 'VIP EXCLUSIVE'}
           </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight font-sans">{t.solutionTitle}</h2>
              <p className={`text-[10px] font-black tracking-[0.2em] uppercase mt-1 ${isExpired ? 'text-red-400' : 'text-amber-400'}`}>{t.solutionSub}</p>
            </div>

            {/* Region Selector */}
            <div className="mb-8 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedRegion('NE')}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center ${
                    selectedRegion === 'NE'
                      ? 'bg-white text-slate-950 border-white shadow-xl scale-105'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <MapPin size={16} className="mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-widest">PA, NJ, DE</span>
                </button>
                <button
                  onClick={() => setSelectedRegion('DMV_CAROLINAS')}
                  className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center ${
                    selectedRegion === 'DMV_CAROLINAS'
                      ? 'bg-red-600 text-white border-red-500 shadow-xl scale-105'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <MapPin size={16} className="mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-widest">MD, VA, DC, NC, SC</span>
                </button>
              </div>
            </div>

            <div className="text-center mb-8">
                <div className="flex flex-col items-center">
                    <div className="text-7xl md:text-8xl font-black text-white tracking-tighter flex items-start gap-1">
                        <span className="text-3xl md:text-4xl mt-3">$</span>
                        {currentPlan.amount}
                        {currentPlan.id !== 'cash' && <span className="text-2xl md:text-3xl text-slate-500 mt-auto mb-3">/mês</span>}
                    </div>
                    {!isExpired && (
                        <div className="mt-4 bg-red-600 text-white px-8 py-2.5 rounded-full font-black text-xl shadow-2xl border-2 border-white/20 flex items-center gap-3 animate-pulse">
                           <Sparkles size={20} /> {t.benefits.discount}
                        </div>
                    )}
                </div>
            </div>

            {/* Plan Selector */}
            <div className="grid grid-cols-2 gap-2 mb-10">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`flex items-center justify-center py-4 px-2 rounded-xl border transition-all duration-300 ${
                    selectedPlan === plan.id 
                      ? 'bg-white text-slate-900 border-white shadow-xl scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                  }`}
                >
                  <span className="text-[11px] font-black uppercase tracking-widest">{plan.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-auto space-y-6">
              
              {/* Payment Info */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <Calendar size={20} className="text-amber-500" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block leading-none mb-1">{t.benefits.payment}</span>
                    <span className="font-black text-white text-xs uppercase tracking-tight">{t.benefits.paymentDesc}</span>
                  </div>
                </div>
              </div>

              {/* TRANSLUCENT CREDIT BUTTON */}
              <div className="relative">
                <button 
                  onClick={() => setShowCreditDropdown(!showCreditDropdown)}
                  className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 py-3 px-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all text-slate-400 hover:text-white"
                >
                  <span className="flex items-center gap-2"><LayoutList size={14} className="text-aqua-400" /> {t.selectCredit}: {creditLabels[selectedCredit]}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${showCreditDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showCreditDropdown && (
                  <div className="absolute bottom-full mb-3 left-0 w-full bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                    {(['RANGE1', 'RANGE2', 'RANGE3', 'RANGE4', 'RANGE5'] as CreditRangeId[]).map((range) => (
                      <button 
                        key={range}
                        onClick={() => {
                          setSelectedCredit(range);
                          setShowCreditDropdown(false);
                        }}
                        className={`w-full text-left px-5 py-4 text-[10px] font-bold border-b border-white/5 last:border-0 hover:bg-white/10 transition-colors ${selectedCredit === range ? 'text-aqua-400 bg-white/10' : 'text-slate-400'}`}
                      >
                        {creditLabels[range]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button 
                onClick={onOpenAnalyst}
                className={`w-full font-black text-2xl py-6 rounded-[2rem] shadow-[0_20px_50px_rgba(220,38,38,0.4)] transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 group ${
                    isExpired ? 'bg-slate-700 text-white' : 'bg-gradient-to-r from-red-600 to-red-500 text-white border-b-4 border-red-800'
                }`}
              >
                <span>{isExpired ? t.negotiate : t.accept}</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={28} />
              </button>
              <p className="text-center text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] italic">{t.disclaimer}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};