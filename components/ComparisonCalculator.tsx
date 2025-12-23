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
  Ban
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
  const cashPrice = isExpired ? 8790 : 7790;
  const subText = isExpired ? '' : '$1.000 OFF';

  // Adicionado isFull: false para todos os planos padrão para satisfazer o TypeScript
  const plans = [
    { id: '180x', label: `180 ${t.months}`, sub: '', amount: 111, icon: Calendar, isFull: false },
    { id: '120x', label: `120 ${t.months}`, sub: '', amount: 150, icon: Calendar, isFull: false }, 
    { id: '60x', label: `60 ${t.months}`, sub: '', amount: 185, icon: Calendar, isFull: false }, 
    { id: '4x', label: `4 ${t.months}`, sub: '', amount: 2197, icon: Calendar, isFull: false }, 
    { id: 'cash', label: t.cash, sub: subText, amount: cashPrice, icon: DollarSign, isFull: true },
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[0];
  const monthlyTotal = waterDrinking + waterCooking + cleaningTotal;

  // Formata a data para exibir
  const dateString = expirationDate.toLocaleDateString(lang === 'en' ? 'en-US' : (lang === 'es' ? 'es-ES' : 'pt-BR'), {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 relative z-20">
      <div className="grid md:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden ring-4 ring-slate-100">
        
        {/* LEFT SIDE: THE PROBLEM (Dinheiro no Lixo) */}
        <div className="bg-white p-6 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider z-10">!</div>
          
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">{t.problemTitle}</h2>
              <p className="text-sm font-bold text-slate-400 tracking-wider uppercase mt-1">{t.problemSub}</p>
            </div>

            <div className="space-y-4">
              {/* Input: Water Drinking */}
              <div className="flex flex-col py-3 border-b border-dashed border-gray-200 px-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
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
                      className="w-full bg-white border border-slate-200 rounded p-2 text-right font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={waterDrinking || ''}
                      onChange={(e) => setWaterDrinking(parseFloat(e.target.value) || 0)}
                   />
                </div>
              </div>

              {/* Input: Water Cooking */}
              <div className="flex flex-col py-3 border-b border-dashed border-gray-200 px-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-teal-100 p-2 rounded-lg text-teal-600">
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
                      className="w-full bg-white border border-slate-200 rounded p-2 text-right font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 outline-none"
                      value={waterCooking || ''}
                      onChange={(e) => setWaterCooking(parseFloat(e.target.value) || 0)}
                   />
                </div>
              </div>

              {/* Read-Only: Cleaning Products */}
              <div className="flex justify-between items-center py-4 border-b border-dashed border-gray-200 px-2 rounded-lg bg-purple-50/50">
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
                    {cleaningTotal === 0 && (
                        <p className="text-[9px] text-red-500 font-bold max-w-[100px]">{t.fillChart}</p>
                    )}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 mt-6 text-center border border-slate-200 relative">
              <p className="text-sm text-slate-500 font-semibold mb-2 mt-2">{t.currentMonthly}</p>
              <div className="text-5xl font-black text-slate-800 tracking-tighter">
                ${monthlyTotal}<span className="text-2xl text-slate-400 font-medium">/mo</span>
              </div>
              <p className="text-xs text-red-600 font-black mt-2 uppercase tracking-wider flex justify-center items-center gap-1">
                <AlertTriangle size={12} />
                {t.waste}
              </p>
            </div>
          </div>

          {/* Warning Message High Visibility */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
                <p className="text-slate-800 text-center font-bold text-sm md:text-base leading-tight">
                {t.warning}
                </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: THE SOLUTION (Aquafeel VIP) */}
        <div className={`text-white p-6 md:p-10 flex flex-col relative overflow-hidden transition-colors duration-500 ${isExpired ? 'bg-slate-900' : 'bg-[#0f172a]'}`}>
           {/* Background decorative shine */}
           {!isExpired && (
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
           )}
           <div className={`absolute top-0 right-0 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider z-10 ${isExpired ? 'bg-red-600 text-white' : 'bg-emerald-500 text-white'}`}>
             {isExpired ? t.offerExpired : 'VIP'}
           </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">{t.solutionTitle}</h2>
              <p className={`text-xs font-bold tracking-widest uppercase mt-1 ${isExpired ? 'text-red-400' : 'text-emerald-400'}`}>{t.solutionSub}</p>
            </div>

            <div className="text-center mb-8 relative">
              {currentPlan.isFull ? (
                  <div className="flex flex-col items-center">
                    {!isExpired && <span className="text-slate-400 line-through text-lg font-bold mb-1">$8,790</span>}
                    <div className={`text-6xl font-black text-white tracking-tighter ${isExpired ? 'text-white' : 'text-emerald-400'}`}>
                        ${currentPlan.amount.toLocaleString()}
                    </div>
                  </div>
              ) : (
                <>
                <div className="text-7xl font-black text-white tracking-tighter flex justify-center items-start gap-1">
                    <span className="text-3xl mt-2">$</span>
                    {currentPlan.amount}
                </div>
                {monthlyTotal > 0 && (
                    <p className={`text-lg font-medium mt-1 ${isExpired ? 'text-slate-400' : 'text-emerald-400'}`}>
                    {t.difference}: <span className={`text-white px-2 rounded ${isExpired ? 'bg-slate-700' : 'bg-emerald-600'}`}>${Math.abs(monthlyTotal - currentPlan.amount)}</span>
                    </p>
                )}
                </>
              )}
            </div>

            {/* Plan Selector - Responsive Flex Wrap */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    onSelectPlan(plan.id);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-200 w-[48%] sm:w-[30%] md:w-auto md:flex-1 ${
                    selectedPlan === plan.id 
                      ? (isExpired 
                          ? 'bg-slate-700 border-slate-500 text-white' 
                          : 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/50 scale-105 relative z-10')
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="text-xs md:text-sm font-bold whitespace-nowrap">{plan.label}</span>
                </button>
              ))}
            </div>

            {/* Benefits List - Focado no que a Aline Ganha */}
            <div className={`rounded-xl p-5 mb-8 border ${isExpired ? 'bg-red-900/10 border-red-900/30' : 'bg-slate-800/50 border-slate-700'}`}>
                <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between items-center text-white border-b border-slate-700/50 pb-2">
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className={isExpired ? 'text-slate-500' : 'text-emerald-400'}/> {t.benefits.tank}</span>
                        <span className="font-bold">{t.benefits.included}</span>
                    </div>
                    <div className="flex justify-between items-center text-white border-b border-slate-700/50 pb-2">
                        <span className="flex items-center gap-2"><CheckCircle2 size={16} className={isExpired ? 'text-slate-500' : 'text-emerald-400'}/> {t.benefits.ro}</span>
                        <span className="font-bold">{t.benefits.included}</span>
                    </div>
                    
                    {/* Linha do Desconto Dinâmica */}
                    {isExpired ? (
                        <div className="flex justify-between items-center text-slate-400 border-b border-slate-700/50 pb-2">
                            <span className="flex items-center gap-2 text-red-400 font-bold"><Ban size={16}/> {t.benefits.discountExpired}</span>
                            <span className="font-bold text-red-400 line-through">-$1.000,00</span>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center text-white border-b border-slate-700/50 pb-2">
                            <span className="flex items-center gap-2 text-amber-400 font-bold"><Gift size={16}/> {t.benefits.discount}</span>
                            <span className="font-bold text-amber-400">-$1.000,00</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center text-white pt-1 bg-amber-500/10 p-2 rounded">
                        <span className="flex items-center gap-2 text-white font-bold"><Calendar size={16}/> {t.benefits.payment}</span>
                        <span className="font-black text-amber-400 text-lg uppercase">MAR 2026</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-4">
              <a 
                href={`https://wa.me/12407806473?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full font-black text-lg py-4 rounded-xl shadow-lg transform transition-all hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer group ${
                    isExpired 
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/40' 
                    : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-900/40'
                }`}
              >
                <span>{isExpired ? t.negotiate : t.accept}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
              </a>
              <p className={`text-center text-[10px] ${isExpired ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                {isExpired ? t.offerExpired : `${t.offerValid} ${dateString}`}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};