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
  Sparkles,
  MapPin,
  ChevronDown,
  LayoutList,
  ShieldCheck,
  Gem,
  CreditCard,
  Microscope,
  Skull,
  Award
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';
import { FluidDropdown } from './ui/fluid-dropdown';

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
  
  const t = translations[lang].calculator;
  const th = translations[lang].hero;

  const regionPrices: Record<RegionId, number> = {
    NE: 8990,
    DMV_CAROLINAS: 7990
  };

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
    { id: '180x', label: `180 ${t.months}`, amount: calculateMonthly(creditFactors['180x']) },
    { id: '120x', label: `120 ${t.months}`, amount: calculateMonthly(creditFactors['120x']) }, 
    { id: '60x', label: `60 ${t.months}`, amount: calculateMonthly(creditFactors['60x']) }, 
    { id: 'cash', label: t.cash, amount: cashPrice, isFull: true },
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];
  const monthlyTotalSpending = waterTotal + cleaningTotal;

  const regionOptions = [
    { id: 'NE', label: 'PA, NJ, DE', icon: MapPin },
    { id: 'DMV_CAROLINAS', label: 'MD, VA, DC', icon: MapPin }
  ];

  const creditOptions = [
    { id: 'RANGE1', label: t.creditRanges.excellent, icon: Award },
    { id: 'RANGE2', label: t.creditRanges.great, icon: Award },
    { id: 'RANGE3', label: t.creditRanges.good, icon: Award },
    { id: 'RANGE4', label: t.creditRanges.fair, icon: Award },
    { id: 'RANGE5', label: t.creditRanges.challenged, icon: Award }
  ];

  const aquaBenefits = [
    { icon: <Gift size={12} />, text: th.cashbackValue },
    { icon: <ShieldCheck size={12} />, text: th.warrantyTitle },
    { icon: <Gem size={12} />, text: th.installSub },
    { icon: <Sparkles size={12} />, text: th.soapSub },
    { icon: <Calendar size={12} />, text: th.paymentSub },
    { icon: <CreditCard size={12} />, text: th.penaltySub },
    { icon: <Microscope size={12} />, text: th.analysisSub }
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden ring-4 ring-slate-100 transition-all duration-500 hover:ring-aqua-100">
        
        <div className="bg-white p-4 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tight font-sans">{t.problemTitle}</h2>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">{t.problemSub}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-4 border-b border-slate-100 px-4 rounded-xl bg-blue-50/20">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <Droplets size={18} />
                  </div>
                  <div>
                    <span className="font-black text-slate-800 block text-base leading-none">{t.waterDrink}</span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Gasto Mensual</span>
                  </div>
                </div>
                <span className="text-xl md:text-2xl font-black text-slate-900">${waterTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-slate-100 px-4 rounded-xl bg-emerald-50/20">
                <div className="flex items-center gap-3">
                   <div className="bg-emerald-600 p-2 rounded-lg text-white">
                    <ShoppingCart size={18} />
                  </div>
                  <div>
                    <span className="font-black text-slate-800 block text-base leading-none">{t.cleaning}</span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Gasto Mensual</span>
                  </div>
                </div>
                <span className="text-xl md:text-2xl font-black text-slate-900">${cleaningTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 mt-8 text-center relative shadow-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-50"></div>
              <p className="text-[9px] text-slate-400 font-black mb-1 uppercase tracking-[0.3em] relative z-10">{t.currentMonthly}</p>
              <div className="text-4xl md:text-5xl font-black text-white tracking-tighter relative z-10">
                ${monthlyTotalSpending.toFixed(2)}<span className="text-lg text-slate-500 font-medium ml-1">/mês</span>
              </div>
              <div className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest relative z-10 animate-pulse">
                <AlertTriangle size={10} />
                {t.waste}
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-[10px] text-slate-400 font-bold leading-relaxed px-4">
                {t.warning}
              </p>
            </div>
          </div>
        </div>

        <div className={`text-white p-6 md:p-8 flex flex-col relative overflow-hidden transition-all duration-700 ${isExpired ? 'bg-slate-900' : 'bg-[#020d1a]'}`}>
           
           <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest z-10 shadow-lg">
             {isExpired ? t.offerExpired : 'VIP ACCESS'}
           </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-sans">{t.solutionTitle}</h2>
              <p className={`text-[9px] font-black tracking-[0.2em] uppercase mt-1 ${isExpired ? 'text-red-400' : 'text-aqua-400'}`}>{t.solutionSub}</p>
            </div>

            <div className="mb-4">
              <FluidDropdown 
                label={t.selectRegion}
                options={regionOptions}
                selectedId={selectedRegion}
                onSelect={(id) => setSelectedRegion(id as RegionId)}
              />
            </div>

            <div className="text-center mb-6">
                <div className="flex flex-col items-center">
                    <div className="text-5xl md:text-6xl font-black text-white tracking-tighter flex items-start gap-1">
                        <span className="text-2xl mt-2">$</span>
                        {currentPlan.amount}
                        {currentPlan.id !== 'cash' && <span className="text-xl text-slate-500 mt-auto mb-2">/mês</span>}
                    </div>
                    {!isExpired && (
                        <div className="mt-3 bg-red-600 text-white px-5 py-1.5 rounded-full font-black text-sm md:text-base shadow-xl border border-white/20 flex items-center gap-2 animate-pulse">
                           <Sparkles size={14} /> {t.benefits.discount}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`flex items-center justify-center py-3 px-2 rounded-xl border transition-all duration-300 ${
                    selectedPlan === plan.id 
                      ? 'bg-white text-slate-900 border-white shadow-lg scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                  }`}
                >
                  <span className="text-[9px] font-black uppercase tracking-widest">{plan.label}</span>
                </button>
              ))}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-1.5 bg-white/5 p-3 rounded-xl border border-white/10">
               {aquaBenefits.map((b, idx) => (
                 <div key={idx} className="flex items-center gap-2 text-[9px] font-bold text-slate-300 uppercase tracking-tight">
                    <div className="bg-aqua-500/20 p-1 rounded text-aqua-400">
                      {b.icon}
                    </div>
                    {b.text}
                 </div>
               ))}
            </div>

            <div className="mt-auto space-y-4">
              <FluidDropdown 
                label={t.selectCredit}
                options={creditOptions}
                selectedId={selectedCredit}
                onSelect={(id) => setSelectedCredit(id as CreditRangeId)}
              />

              <button 
                onClick={onOpenAnalyst}
                className={`w-full font-black text-lg md:text-xl py-4 md:py-5 rounded-2xl shadow-xl transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group ${
                    isExpired ? 'bg-slate-700 text-white shadow-none' : 'bg-gradient-to-r from-red-600 to-red-500 text-white border-b-4 border-red-800 shimmer'
                }`}
              >
                <span className="tracking-wide">{t.negotiate}</span>
                <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={24} />
              </button>
              <p className="text-center text-[8px] text-slate-500 font-bold uppercase tracking-[0.2em] italic">{t.disclaimer}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};