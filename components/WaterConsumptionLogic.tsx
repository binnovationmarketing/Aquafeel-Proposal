import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Utensils, 
  Activity, 
  Heart, 
  ShieldCheck,
  Package,
  TrendingDown,
  DollarSign,
  AlertCircle,
  Coffee,
  Fuel,
  IceCream,
  Gamepad,
  Ticket,
  Tv
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';
import { FluidDropdown } from './ui/fluid-dropdown';

interface WaterConsumptionLogicProps {
  lang: Language;
  onWaterTotalChange: (total: number) => void;
}

export const WaterConsumptionLogic: React.FC<WaterConsumptionLogicProps> = ({ lang, onWaterTotalChange }) => {
  const [buyType, setBuyType] = useState<'gallon' | 'pack'>('pack');
  const [packPrice, setPackPrice] = useState<number>(6);
  const [packQty, setPackQty] = useState<number>(2);
  const [gallonPrice, setGallonPrice] = useState<number>(2.5);
  const [gallonQty, setGallonQty] = useState<number>(2);
  const [includeCooking, setIncludeCooking] = useState<boolean>(true);
  const [cookingManualValue, setCookingManualValue] = useState<number>(30);
  
  const t = translations[lang].logic;

  const buyTypeOptions = [
    { id: 'pack', label: t.buyPack, icon: Package },
    { id: 'gallon', label: t.buyGallon, icon: Droplets }
  ];

  const drinkingMonthly = buyType === 'pack' 
    ? (packPrice * packQty * 4) 
    : (gallonPrice * gallonQty * 30);

  const finalWaterMonthly = includeCooking ? drinkingMonthly * 2 : drinkingMonthly + cookingManualValue;

  useEffect(() => {
    onWaterTotalChange(finalWaterMonthly);
  }, [finalWaterMonthly, onWaterTotalChange]);

  const dailyCost = finalWaterMonthly / 30;

  const popularExpenses = [
    { name: t.expenses.gas, daily: 10, icon: <Fuel size={14}/> },
    { name: t.expenses.coffee, daily: 5, icon: <Coffee size={14}/> },
    { name: t.expenses.breakfast, daily: 12, icon: <Utensils size={14}/> },
    { name: t.expenses.donuts, daily: 6, icon: <IceCream size={14}/> },
    { name: t.expenses.streaming, daily: 1.5, icon: <Tv size={14}/> },
    { name: t.expenses.lottery, daily: 5, icon: <Ticket size={14}/> },
  ];

  return (
    <section className="py-16 md:py-24 bg-white px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 border border-blue-200">
            <Activity size={14} />
            <span>{t.title}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 mb-6 max-w-4xl mx-auto leading-tight tracking-tighter">
            {t.question}
          </h2>
          <p className="text-sm md:text-xl text-slate-500 max-w-3xl mx-auto italic font-medium leading-relaxed">"{t.intro}"</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* CALCULADORA DE ÁGUA */}
          <div className="bg-slate-50 rounded-[2.5rem] p-6 md:p-12 border border-slate-200 shadow-inner">
            <div className="space-y-8">
              <FluidDropdown label={t.howYouBuy} options={buyTypeOptions} selectedId={buyType} onSelect={(id) => setBuyType(id as 'pack' | 'gallon')} />
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.priceLabel}</label>
                  <span className="font-black text-blue-600 text-lg">${buyType === 'pack' ? packPrice.toFixed(2) : gallonPrice.toFixed(2)}</span>
                </div>
                <input type="range" min="0" max="10" step="0.25" value={buyType === 'pack' ? packPrice : gallonPrice} onChange={(e) => buyType === 'pack' ? setPackPrice(Number(e.target.value)) : setGallonPrice(Number(e.target.value))} className="w-full h-2 bg-blue-200/50 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{buyType === 'pack' ? t.qtyWeekly : t.qtyDaily}</label>
                  <span className="font-black text-blue-600 text-lg">{buyType === 'pack' ? packQty : gallonQty} un</span>
                </div>
                <input type="range" min="0" max="10" step="1" value={buyType === 'pack' ? packQty : gallonQty} onChange={(e) => buyType === 'pack' ? setPackQty(Number(e.target.value)) : setGallonQty(Number(e.target.value))} className="w-full h-2 bg-blue-200/50 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div className="pt-2">
                <button onClick={() => setIncludeCooking(!includeCooking)} className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${includeCooking ? 'bg-white border-blue-500 shadow-xl' : 'bg-transparent border-slate-200 opacity-60'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${includeCooking ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200 text-slate-400'}`}><Utensils size={20} /></div>
                    <div className="text-left">
                      <p className={`text-sm font-black ${includeCooking ? 'text-slate-900' : 'text-slate-500'}`}>{t.includeCooking}</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">{t.cooking}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${includeCooking ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>{includeCooking && <ShieldCheck size={14} className="text-white" />}</div>
                </button>
              </div>

              <div className="pt-4">
                <div className="bg-slate-900 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden text-center group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-50"></div>
                  <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">{t.totalMonthly}</span>
                  <div className="text-5xl md:text-6xl font-black text-white tracking-tighter transition-transform group-hover:scale-110 duration-500">${finalWaterMonthly.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ONDE GASTAMOS HOJE (REVISADO) */}
          <div className="bg-white border border-slate-100 p-6 md:p-12 rounded-[2.5rem] shadow-2xl h-full flex flex-col justify-between">
            <div className="mb-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3 justify-center md:justify-start tracking-tighter">
                <TrendingDown className="text-red-600 shrink-0" size={28} />
                {t.ridiculousTitle}
              </h3>
              <p className="text-slate-500 text-sm md:text-base font-medium mt-3 leading-relaxed">{t.ridiculousBody}</p>
            </div>
            
            <div className="space-y-3 flex-1">
              {popularExpenses.map((exp, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg text-slate-400 group-hover:text-red-600 transition-colors shadow-sm">{exp.icon}</div>
                    <span className="text-sm md:text-base font-bold text-slate-700">{exp.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs md:text-sm font-black text-slate-900">${exp.daily} <span className="text-[9px] text-slate-400 uppercase">/dia</span></div>
                    <div className="text-[10px] md:text-xs font-black text-red-500 uppercase tracking-wider">${exp.daily * 30 * 12} <span className="text-[8px] opacity-60">/ano</span></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-4">
               <AlertCircle size={24} className="text-red-600 shrink-0 animate-pulse" />
               <p className="text-[10px] md:text-xs font-black text-red-900 uppercase tracking-widest leading-relaxed italic">
                 "Pequenos vazamentos financeiros afundam grandes navios. Sua saúde não pode ser um custo, deve ser um investimento."
               </p>
            </div>
          </div>
        </div>

        {/* DECISÃO PELA VIDA (BANNER REFINADO) */}
        <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mt-12 group">
           <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-1000"><Heart size={200} fill="white" /></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
             <div className="max-w-2xl">
               <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md"><Activity size={24} className="text-white" /></div>
                  <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Decisão pela Vida</h4>
               </div>
               <p className="text-blue-50 text-sm md:text-lg leading-relaxed font-bold italic opacity-90">
                 Investir o desperdício de hoje para garantir <span className="text-amber-300">ÁGUA MOLECULAR</span> para sua família é o maior ato de inteligência financeira atual.
               </p>
             </div>
             <div className="shrink-0 w-full md:w-auto">
                <div className="bg-white text-blue-700 p-8 rounded-[2rem] font-black shadow-2xl flex flex-col items-center justify-center transition-all hover:scale-105 border-4 border-blue-500/20">
                  <span className="text-[10px] md:text-xs text-blue-500 uppercase tracking-[0.3em] mb-2 font-black leading-none opacity-60 text-center">Investimento Diário:</span>
                  <div className="flex items-center gap-2">
                      <DollarSign size={28} className="text-blue-500" />
                      <span className="text-4xl md:text-5xl text-red-600 tracking-tighter">${dailyCost.toFixed(2)}</span>
                  </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};