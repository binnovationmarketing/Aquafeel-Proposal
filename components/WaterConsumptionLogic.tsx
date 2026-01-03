
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
  Ticket,
  Tv,
  Scale
} from 'lucide-react';
import { Language, translations } from '../utils/i18n';
import { FluidDropdown } from './ui/fluid-dropdown';

interface WaterConsumptionLogicProps {
  lang: Language;
  onWaterTotalChange: (total: number) => void;
}

export const WaterConsumptionLogic: React.FC<WaterConsumptionLogicProps> = ({ lang, onWaterTotalChange }) => {
  // Lógica de BEBER
  const [drinkPackPrice, setDrinkPackPrice] = useState<number>(6);
  const [drinkPackQty, setDrinkPackQty] = useState<number>(0);
  const [drinkGallonPrice, setDrinkGallonPrice] = useState<number>(3);
  const [drinkGallonQty, setDrinkGallonQty] = useState<number>(0);

  // Lógica de COZINHAR / LAVAR
  const [cookPackPrice, setCookPackPrice] = useState<number>(6);
  const [cookPackQty, setCookPackQty] = useState<number>(0);
  const [cookGallonPrice, setCookGallonPrice] = useState<number>(3);
  const [cookGallonQty, setCookGallonQty] = useState<number>(0);
  
  const t = translations[lang].logic;

  // Garantir exclusividade: Se mexer no Pack, zera Gallon e vice-versa (BEBER)
  const handleDrinkPackChange = (qty: number) => {
    setDrinkPackQty(qty);
    if (qty > 0) setDrinkGallonQty(0);
  };
  const handleDrinkGallonChange = (qty: number) => {
    setDrinkGallonQty(qty);
    if (qty > 0) setDrinkPackQty(0);
  };

  // Garantir exclusividade (COZINHAR)
  const handleCookPackChange = (qty: number) => {
    setCookPackQty(qty);
    if (qty > 0) setCookGallonQty(0);
  };
  const handleCookGallonChange = (qty: number) => {
    setCookGallonQty(qty);
    if (qty > 0) setCookPackQty(0);
  };

  const drinkingMonthly = (drinkPackPrice * drinkPackQty * 4) + (drinkGallonPrice * drinkGallonQty * 30);
  const cookingMonthly = (cookPackPrice * cookPackQty * 4) + (cookGallonPrice * cookGallonQty * 30);
  const finalWaterMonthly = drinkingMonthly + cookingMonthly;

  useEffect(() => {
    onWaterTotalChange(finalWaterMonthly);
  }, [finalWaterMonthly, onWaterTotalChange]);

  const dailyCost = finalWaterMonthly / 30;

  return (
    <section id="logic" className="py-16 md:py-24 bg-white px-4 overflow-hidden">
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

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          
          {/* CALCULADORA DE ÁGUA - BEBER */}
          <div className="bg-slate-50 rounded-[2.5rem] p-6 md:p-10 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-8">
               <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg"><Droplets size={22} /></div>
               <h3 className="font-black text-xl text-slate-900 uppercase tracking-tighter">{t.drinking}</h3>
            </div>

            <div className="space-y-10 flex-1">
              {/* Opção Pack */}
              <div className="space-y-4 p-4 bg-white rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-600 tracking-widest">
                     <Package size={14} className="text-blue-500" /> {t.buyPack}
                   </div>
                   <span className="text-xs font-bold text-slate-400">($2 - $10)</span>
                </div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.priceLabel}</label>
                  <span className="font-black text-blue-600 text-lg">${drinkPackPrice}</span>
                </div>
                <input type="range" min="2" max="10" step="1" value={drinkPackPrice} onChange={(e) => setDrinkPackPrice(Number(e.target.value))} className="w-full h-2 bg-blue-50 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                
                <div className="flex justify-between items-end mt-4">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.qtyWeekly}</label>
                  <span className="font-black text-blue-600 text-lg">{drinkPackQty}</span>
                </div>
                <input type="range" min="0" max="10" step="1" value={drinkPackQty} onChange={(e) => handleDrinkPackChange(Number(e.target.value))} className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              {/* Opção Galão */}
              <div className="space-y-4 p-4 bg-white rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-600 tracking-widest">
                     <Droplets size={14} className="text-blue-500" /> {t.buyGallon}
                   </div>
                   <span className="text-xs font-bold text-slate-400">($1 - $5)</span>
                </div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.priceLabel}</label>
                  <span className="font-black text-blue-600 text-lg">${drinkGallonPrice}</span>
                </div>
                <input type="range" min="1" max="5" step="1" value={drinkGallonPrice} onChange={(e) => setDrinkGallonPrice(Number(e.target.value))} className="w-full h-2 bg-blue-50 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                
                <div className="flex justify-between items-end mt-4">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.qtyDaily}</label>
                  <span className="font-black text-blue-600 text-lg">{drinkGallonQty}</span>
                </div>
                <input type="range" min="0" max="10" step="1" value={drinkGallonQty} onChange={(e) => handleDrinkGallonChange(Number(e.target.value))} className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Subtotal Bebida</span>
                  <div className="text-3xl font-black text-slate-900 tracking-tighter">${drinkingMonthly.toFixed(2)}</div>
               </div>
            </div>
          </div>

          {/* CALCULADORA DE ÁGUA - COZINHAR / LAVAR */}
          <div className="bg-slate-50 rounded-[2.5rem] p-6 md:p-10 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-8">
               <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg"><Utensils size={22} /></div>
               <h3 className="font-black text-xl text-slate-900 uppercase tracking-tighter">{t.cooking}</h3>
            </div>

            <div className="space-y-10 flex-1">
               {/* Opção Pack Cozinha */}
               <div className="space-y-4 p-4 bg-white rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-600 tracking-widest">
                     <Package size={14} className="text-emerald-500" /> {t.buyPack}
                   </div>
                   <span className="text-xs font-bold text-slate-400">($2 - $10)</span>
                </div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.priceLabel}</label>
                  <span className="font-black text-emerald-600 text-lg">${cookPackPrice}</span>
                </div>
                <input type="range" min="2" max="10" step="1" value={cookPackPrice} onChange={(e) => setCookPackPrice(Number(e.target.value))} className="w-full h-2 bg-emerald-50 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                
                <div className="flex justify-between items-end mt-4">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.qtyWeekly}</label>
                  <span className="font-black text-emerald-600 text-lg">{cookPackQty}</span>
                </div>
                <input type="range" min="0" max="10" step="1" value={cookPackQty} onChange={(e) => handleCookPackChange(Number(e.target.value))} className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </div>

              {/* Opção Galão Cozinha */}
              <div className="space-y-4 p-4 bg-white rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-600 tracking-widest">
                     <Droplets size={14} className="text-emerald-500" /> {t.buyGallon}
                   </div>
                   <span className="text-xs font-bold text-slate-400">($1 - $5)</span>
                </div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.priceLabel}</label>
                  <span className="font-black text-emerald-600 text-lg">${cookGallonPrice}</span>
                </div>
                <input type="range" min="1" max="5" step="1" value={cookGallonPrice} onChange={(e) => setCookGallonPrice(Number(e.target.value))} className="w-full h-2 bg-emerald-50 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                
                <div className="flex justify-between items-end mt-4">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.qtyDaily}</label>
                  <span className="font-black text-emerald-600 text-lg">{cookGallonQty}</span>
                </div>
                <input type="range" min="0" max="10" step="1" value={cookGallonQty} onChange={(e) => handleCookGallonChange(Number(e.target.value))} className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block mb-1">Subtotal Cozinha</span>
                  <div className="text-3xl font-black text-slate-900 tracking-tighter">${cookingMonthly.toFixed(2)}</div>
               </div>
            </div>
          </div>
        </div>

        {/* BANNER DE RESULTADOS FINAL */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="md:col-span-2 bg-slate-950 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-50"></div>
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                 <div className="text-center md:text-left flex-1">
                    <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">{t.totalMonthly}</span>
                    <div className="text-6xl md:text-7xl font-black text-white tracking-tighter transition-transform group-hover:scale-105 duration-500">${finalWaterMonthly.toFixed(2)}</div>
                 </div>
                 <div className="w-px h-16 bg-white/10 hidden md:block"></div>
                 <div className="text-center md:text-right">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{t.wasteForLife}</p>
                    <p className="text-2xl font-black text-red-500 tracking-tight uppercase">A Troco de Nada</p>
                    <p className="text-[9px] text-slate-600 uppercase tracking-widest font-bold mt-1">Investimento sem retorno de saúde</p>
                 </div>
              </div>
           </div>

           <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center group">
              <div className="absolute -top-10 -right-10 opacity-10"><Activity size={120} /></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-80">{t.dailyInvestment}:</span>
              <div className="text-5xl font-black tracking-tighter mb-2">${dailyCost.toFixed(2)}</div>
              <p className="text-[10px] font-bold uppercase tracking-widest leading-tight opacity-90 max-w-[150px]">
                 Saúde Real para sua Família
              </p>
           </div>
        </div>

        {/* RODAPÉ COMPARATIVO */}
        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2.5 rounded-xl text-red-600"><TrendingDown size={20} /></div>
              <p className="text-[10px] md:text-xs font-black text-slate-700 uppercase tracking-widest leading-relaxed">
                 O desperdício invisível financia sua saúde. <br className="hidden md:block"/>
                 <span className="text-red-600">Não gaste o que você pode investir no seu futuro.</span>
              </p>
           </div>
           <div className="flex-1 h-px bg-slate-200 hidden md:block"></div>
           <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" size={18} />
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Purificação Molecular Certificada</span>
           </div>
        </div>
      </div>
    </section>
  );
};
