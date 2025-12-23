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
  Sparkles
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface ComparisonCalculatorProps {
  onSelectPlan: (planId: string) => void;
  expirationDate: Date;
  cleaningTotal: number;
  lang: Language;
  whatsappMessage: string;
  isExpired?: boolean;
}

export const ComparisonCalculator: React.FC<ComparisonCalculatorProps> = ({ 
    onSelectPlan, 
    expirationDate, 
    cleaningTotal, 
    lang, 
    whatsappMessage,
    isExpired = false 
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('180x');
  const [waterDrinking, setWaterDrinking] = useState<number>(0);
  const [waterCooking, setWaterCooking] = useState<number>(0);
  const t = translations[lang].calculator;

  // Preços
  const cashPrice = 7790;
  
  const plans = [
    { id: '180x', label: `180 ${t.months}`, sub: '', amount: 111, icon: Calendar, isFull: false },
    { id: '120x', label: `120 ${t.months}`, sub: '', amount: 150, icon: Calendar, isFull: false }, 
    { id: '60x', label: `60 ${t.months}`, sub: '', amount: 185, icon: Calendar, isFull: false }, 
    { id: '4x', label: `4 ${t.months}`, sub: '', amount: 2197, icon: Calendar, isFull: false }, 
    { id: 'cash', label: t.cash, sub: isExpired ? '' : '$1.000 CASHBACK', amount: cashPrice, icon: DollarSign, isFull: true },
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];
  const monthlyTotal = waterDrinking + waterCooking + cleaningTotal;

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 relative z-20">
      <div className="grid md:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden ring-4 ring-slate-100 transition-all duration-500 hover:ring-aqua-100">
        
        {/* LEFT SIDE: THE PROBLEM */}
        <div className="bg-white p-6 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider z-10 animate-pulse">!</div>
          
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight font-sans">{t.problemTitle}</h2>
              <p className="text-sm font-bold text-slate-400 tracking-wider uppercase mt-1">{t.problemSub}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col py-3 border-b border-dashed border-gray-200 px-2 rounded-lg bg-slate-50 transition-colors hover:bg-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600 transition-transform group-hover:scale-110">
                    <Droplets size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-slate-700 block">{t.waterDrink}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-slate-400 font-bold">$</span>
                   <input 
                      type="number" 
                      placeholder="0"
                      className="w-full bg-white border border-slate-200 rounded p-2 text-right font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={waterDrinking || ''}
                      onChange={(e) => setWaterDrinking(parseFloat(e.target.value) || 0)}
                   />
                </div>
              </div>

              <div className="flex flex-col py-3 border-b border-dashed border-gray-200 px-2 rounded-lg bg-slate-50 transition-colors hover:bg-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-teal-100 p-2 rounded-lg text-teal-600 transition-transform group-hover:scale-110">
                    <Utensils size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-slate-700 block">{t.waterCook}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-slate-400 font-bold">$</span>
                   <input 
                      type="number" 
                      placeholder="0"
                      className="w-full bg-white border border-slate-200 rounded p-2 text-right font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                      value={waterCooking || ''}
                      onChange={(e) => setWaterCooking(parseFloat(e.target.value) || 0)}
                   />
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-dashed border-gray-200 px-2 rounded-lg bg-purple-50/50 transition-colors hover:bg-purple-50">
                <div className="flex items-center gap-3">
                   <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                    <ShoppingCart size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-700 block">{t.cleaning}</span>
                  </div>
                </div>
                <div className="text-right">
                    <span className="text-xl font-bold text-slate-800">${cleaningTotal}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 mt-6 text-center border border-slate-200 relative transition-all duration-300 hover:shadow-inner">
              <p className="text-sm text-slate-500 font-semibold mb-2 mt-2 uppercase tracking-widest">{t.currentMonthly}</p>
              <div className="text-5xl font-black text-slate-800 tracking-tighter transition-all duration-500">
                ${monthlyTotal}<span className="text-2xl text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-xs text-red-600 font-black mt-2 uppercase tracking-wider flex justify-center items-center gap-1 animate-bounce">
                <AlertTriangle size={12} />
                {t.waste}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
                <p className="text-slate-800 text-center font-bold text-sm md:text-base leading-tight italic">
                {t.warning}
                </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: THE SOLUTION (Aquafeel Christmas) */}
        <div className={`text-white p-6 md:p-10 flex flex-col relative overflow-hidden transition-all duration-700 ${isExpired ? 'bg-slate-900' : 'bg-[#020d1a]'}`}>
           
           <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-4 py-2 rounded-bl-xl uppercase tracking-widest z-10 shadow-lg shimmer">
             {isExpired ? t.offerExpired : 'CHRISTMAS EXCLUSIVE'}
           </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight font-sans animate-in fade-in duration-700">{t.solutionTitle}</h2>
              <p className={`text-xs font-bold tracking-widest uppercase mt-1 animate-in fade-in slide-in-from-top-2 duration-700 delay-200 ${isExpired ? 'text-red-400' : 'text-amber-400'}`}>{t.solutionSub}</p>
            </div>

            <div className="text-center mb-8 relative">
                <div className="flex flex-col items-center">
                    <div className={`text-7xl font-black text-white tracking-tighter flex items-start gap-1 transition-all duration-500 ${isExpired ? 'text-slate-600' : 'text-white'}`}>
                        <span className="text-3xl mt-2">$</span>
                        {currentPlan.amount}
                    </div>
                    {/* Cashback só aparece em destaque para o plano CASH */}
                    {!isExpired && selectedPlan === 'cash' && (
                        <div className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full font-black text-lg animate-float shadow-[0_0_30px_rgba(220,38,38,0.5)] border-2 border-white/20 flex items-center gap-2">
                           <Gift size={20} className="animate-pulse" /> $1.000 CASHBACK
                        </div>
                    )}
                </div>
            </div>

            {/* Plan Selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    onSelectPlan(plan.id);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-300 w-[48%] sm:w-[30%] md:w-auto md:flex-1 ${
                    selectedPlan === plan.id 
                      ? (isExpired 
                          ? 'bg-slate-700 border-slate-500 text-white' 
                          : 'bg-white text-aqua-950 border-white shadow-xl scale-105 relative z-10')
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-xs md:text-sm font-black whitespace-nowrap uppercase tracking-tighter">{plan.label}</span>
                </button>
              ))}
            </div>

            {/* Benefits List */}
            <div className={`rounded-2xl p-6 mb-8 border transition-all duration-500 ${isExpired ? 'bg-red-900/10 border-red-900/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex justify-between items-center text-white border-b border-white/5 pb-2 transition-colors hover:border-white/20">
                        <span className="flex items-center gap-2 font-medium"><CheckCircle2 size={16} className={isExpired ? 'text-slate-500' : 'text-emerald-400'}/> {t.benefits.tank}</span>
                        <span className="font-bold text-slate-400">{t.benefits.included}</span>
                    </div>
                    <div className="flex justify-between items-center text-white border-b border-white/5 pb-2 transition-colors hover:border-white/20">
                        <span className="flex items-center gap-2 font-medium"><CheckCircle2 size={16} className={isExpired ? 'text-slate-500' : 'text-emerald-400'}/> {t.benefits.ro}</span>
                        <span className="font-bold text-slate-400">{t.benefits.included}</span>
                    </div>
                    <div className="flex justify-between items-center text-white border-b border-white/5 pb-2 transition-colors hover:border-white/20">
                        <span className="flex items-center gap-2 font-medium"><CheckCircle2 size={16} className={isExpired ? 'text-slate-500' : 'text-emerald-400'}/> {t.benefits.downpayment}</span>
                        <span className="font-bold text-slate-400">{t.benefits.included}</span>
                    </div>
                    <div className="flex justify-between items-center text-white border-b border-white/5 pb-2 transition-colors hover:border-white/20">
                        <span className="flex items-center gap-2 font-medium"><CheckCircle2 size={16} className={isExpired ? 'text-slate-500' : 'text-emerald-400'}/> {t.benefits.taxes}</span>
                        <span className="font-bold text-slate-400">{t.benefits.included}</span>
                    </div>
                    <div className="flex justify-between items-center text-white border-b border-white/5 pb-2 transition-colors hover:border-white/20">
                        <span className="flex items-center gap-2 font-medium"><CheckCircle2 size={16} className={isExpired ? 'text-slate-500' : 'text-emerald-400'}/> {t.benefits.installation}</span>
                        <span className="font-bold text-slate-400">{t.benefits.included}</span>
                    </div>
                    
                    {isExpired ? (
                        <div className="flex justify-between items-center text-slate-400 border-b border-white/5 pb-2">
                            <span className="flex items-center gap-2 text-red-400 font-bold"><Ban size={16}/> {t.benefits.discountExpired}</span>
                            <span className="font-bold text-red-400 line-through">$0</span>
                        </div>
                    ) : (
                        <div className="flex flex-col border-b border-white/5 pb-2">
                            <div className="flex justify-between items-center">
                              <span className="flex items-center gap-2 text-red-400 font-black"><Sparkles size={16} className="animate-pulse" /> {t.benefits.discount}</span>
                              <span className="font-black text-red-400 text-lg">
                                {selectedPlan === 'cash' ? '+$1.000,00' : t.benefits.included}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 mt-1 italic leading-none">{t.disclaimer}</span>
                        </div>
                    )}

                    <div className="flex flex-col pt-1 bg-white/5 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/10">
                        <div className="flex justify-between items-center mb-1">
                          <span className="flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest"><Calendar size={14} className="text-amber-400"/> {t.benefits.payment}</span>
                        </div>
                        <span className="font-black text-amber-400 text-xs md:text-sm uppercase tracking-wide leading-relaxed">
                          {t.benefits.paymentDesc}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-4">
              <a 
                href={`https://wa.me/12407806473?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full font-black text-xl py-5 rounded-2xl shadow-2xl transform transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 cursor-pointer group ${
                    isExpired 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white ring-2 ring-white/20'
                }`}
              >
                <span>{isExpired ? t.negotiate : t.accept}</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={24} />
              </a>
              <p className={`text-center text-xs font-bold uppercase tracking-widest animate-pulse ${isExpired ? 'text-red-400' : 'text-amber-400'}`}>
                {isExpired ? t.offerExpired : t.offerValid}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};