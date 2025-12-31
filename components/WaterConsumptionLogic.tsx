import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Utensils, 
  Activity, 
  Heart, 
  ShieldCheck,
  Package,
  Zap,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  DollarSign
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface WaterConsumptionLogicProps {
  lang: Language;
  onWaterTotalChange: (total: number) => void;
}

export const WaterConsumptionLogic: React.FC<WaterConsumptionLogicProps> = ({ lang, onWaterTotalChange }) => {
  const [buyType, setBuyType] = useState<'gallon' | 'pack'>('pack');
  const [pricePerUnit, setPricePerUnit] = useState<number>(buyType === 'pack' ? 6 : 2.5);
  const [qtyPerPeriod, setQtyPerPeriod] = useState<number>(2);
  const [includeCooking, setIncludeCooking] = useState<boolean>(true);
  const [cookingManualValue, setCookingManualValue] = useState<number>(30);
  
  const t = translations[lang].logic;

  // Logic calculation
  // Pack: monthly = price * qty * 4 weeks
  // Gallon: monthly = price * qty(daily) * 30 days
  const drinkingMonthly = buyType === 'pack' 
    ? (pricePerUnit * qtyPerPeriod * 4) 
    : (pricePerUnit * qtyPerPeriod * 30);

  const finalWaterMonthly = includeCooking ? drinkingMonthly * 2 : drinkingMonthly + cookingManualValue;

  useEffect(() => {
    onWaterTotalChange(finalWaterMonthly);
  }, [finalWaterMonthly, onWaterTotalChange]);

  const dailyCost = finalWaterMonthly / 30;

  const popularExpenses = [
    { name: t.expenses.gas, daily: 10 },
    { name: t.expenses.coffee, daily: 5 },
    { name: t.expenses.breakfast, daily: 12 },
    { name: t.expenses.vape, daily: 8 },
    { name: t.expenses.lottery, daily: 5 },
    { name: t.expenses.donuts, daily: 6 },
    { name: t.expenses.water, daily: 4 },
    { name: t.expenses.juice, daily: 4 },
    { name: t.expenses.streaming, daily: 1 },
    { name: t.expenses.parking, daily: 5 },
  ];

  return (
    <section className="py-20 bg-white px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-200">
            <Activity size={14} />
            <span>{t.title}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            {t.question}
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto italic">
            "{t.intro}"
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* INTERACTIVE INPUTS */}
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-200 shadow-inner">
            <div className="space-y-8">
              
              {/* Selector Pack vs Gallon */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{t.howYouBuy}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => {
                      setBuyType('pack');
                      setPricePerUnit(6);
                    }}
                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${buyType === 'pack' ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105' : 'bg-white text-slate-500 border-slate-200'}`}
                  >
                    <Package size={20} />
                    <span className="font-bold">{t.buyPack}</span>
                  </button>
                  <button 
                    onClick={() => {
                      setBuyType('gallon');
                      setPricePerUnit(2.5);
                    }}
                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${buyType === 'gallon' ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105' : 'bg-white text-slate-500 border-slate-200'}`}
                  >
                    <Droplets size={20} />
                    <span className="font-bold">{t.buyGallon}</span>
                  </button>
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.priceLabel}</label>
                  <span className="font-black text-blue-600">${pricePerUnit.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min="0.5" max="15" step="0.25"
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(Number(e.target.value))}
                  className="w-full h-3 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Quantity Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {buyType === 'pack' ? t.qtyWeekly : t.qtyDaily}
                  </label>
                  <span className="font-black text-blue-600">{qtyPerPeriod} {buyType === 'pack' ? 'cases' : 'gal'}</span>
                </div>
                <input 
                  type="range" min="1" max="15" step="1"
                  value={qtyPerPeriod}
                  onChange={(e) => setQtyPerPeriod(Number(e.target.value))}
                  className="w-full h-3 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Toggle Cooking */}
              <div className="space-y-4">
                <button 
                  onClick={() => setIncludeCooking(!includeCooking)}
                  className={`w-full flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${includeCooking ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-100 opacity-60'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${includeCooking ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Utensils size={24} />
                    </div>
                    <div className="text-left">
                      <p className={`font-bold ${includeCooking ? 'text-emerald-900' : 'text-slate-500'}`}>{t.includeCooking}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-widest">{t.cooking}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${includeCooking ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                     {includeCooking && <ShieldCheck size={14} className="text-white" />}
                  </div>
                </button>

                {!includeCooking && (
                   <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-4">{t.cookingManual}</label>
                     <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input 
                          type="number" 
                          value={cookingManualValue}
                          onChange={(e) => setCookingManualValue(Number(e.target.value))}
                          className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-6 font-black text-slate-800 text-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                     </div>
                   </div>
                )}
              </div>

              <div className="pt-8 border-t border-slate-200">
                <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Droplets size={120} className="text-blue-400" />
                  </div>
                  <span className="text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-2 block">{t.totalMonthly}</span>
                  <div className="text-5xl font-black text-white tracking-tighter">
                    ${finalWaterMonthly.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIDICULOUS PRICES DYNAMIC TABLE */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-xl">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                  <TrendingDown className="text-red-500" />
                  {t.ridiculousTitle}
                </h3>
                <p className="text-slate-400 text-sm mt-1">{t.ridiculousBody}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Item</th>
                      <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">30 Dias</th>
                      <th className="py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">12 Meses</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {popularExpenses.map((exp, idx) => (
                      <tr key={idx} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                        <td className="py-3 pr-4">
                          <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{exp.name}</span>
                          <p className="text-[10px] text-slate-400">${exp.daily}/dia</p>
                        </td>
                        <td className="py-3 text-center">
                          <span className="text-sm font-black text-slate-800">${exp.daily * 30}</span>
                        </td>
                        <td className="py-3 text-right">
                          <span className="text-sm font-black text-red-500">${exp.daily * 30 * 12}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-20 transform translate-x-4 -translate-y-4">
                 <Heart size={140} fill="white" />
               </div>
               <div className="relative z-10">
                 <h4 className="text-xl font-black uppercase tracking-tight mb-2">Decisão pela Vida</h4>
                 <p className="text-blue-100 text-sm leading-relaxed mb-6">
                   Gastar em pequenas coisas triviais é comum. Investir o mesmo valor para garantir que NADA de ruim entre na sua família é INTELIGENTE.
                 </p>
                 <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full font-bold text-xs">
                   Investimento Diário: <span className="text-amber-300">${dailyCost.toFixed(2)}</span>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};