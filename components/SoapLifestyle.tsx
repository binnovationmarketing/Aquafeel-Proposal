import React, { useState, useEffect } from 'react';
import { Leaf, DollarSign, Check } from 'lucide-react';
import { Language, translations } from '../utils/i18n';

interface SoapLifestyleProps {
  onTotalChange: (total: number) => void;
  lang: Language;
}

export const SoapLifestyle: React.FC<SoapLifestyleProps> = ({ onTotalChange, lang }) => {
  const [laundry, setLaundry] = useState<number>(0);
  const [kitchen, setKitchen] = useState<number>(0);
  const [bathroom, setBathroom] = useState<number>(0);
  
  const t = translations[lang].soap;
  const totalSpend = laundry + kitchen + bathroom;

  useEffect(() => {
    onTotalChange(totalSpend);
  }, [totalSpend, onTotalChange]);

  return (
    <section className="py-20 bg-emerald-900/5 px-4 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Pure Selects */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-4 py-1 rounded-full mb-6">
            <Leaf size={16} fill="currentColor" />
            <span className="text-sm font-bold tracking-widest uppercase">{t.partner}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Pure Selects: <span className="text-emerald-600">{t.title}</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle} 
            <span className="font-bold text-emerald-700"> {t.features}</span>
          </p>
          <div className="mt-4 text-sm font-semibold text-slate-500">
            Saiba mais em: <a href="https://pureselects.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">pureselects.com</a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Calculadora de Sabão */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
               <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                 <DollarSign size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-xl text-slate-800">{t.currentSpend}</h3>
                 <p className="text-xs text-slate-500 uppercase tracking-wider">{t.spendSub}</p>
               </div>
            </div>

            <div className="space-y-8">
              {/* Laundry Input */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-slate-700 flex items-center gap-2">
                    {t.laundry}
                  </label>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 rounded">${laundry}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  step="5"
                  value={laundry} 
                  onChange={(e) => setLaundry(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Kitchen Input */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-slate-700 flex items-center gap-2">
                    {t.kitchen}
                  </label>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 rounded">${kitchen}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  step="5"
                  value={kitchen} 
                  onChange={(e) => setKitchen(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Bathroom Input */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-slate-700 flex items-center gap-2">
                    {t.bathroom}
                  </label>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 rounded">${bathroom}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="300" 
                  step="5"
                  value={bathroom} 
                  onChange={(e) => setBathroom(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                <span className="text-slate-500 font-medium">{t.total}:</span>
                <span className="text-3xl font-black text-slate-800">${totalSpend}</span>
              </div>
            </div>
          </div>

          {/* Comparativo Visual */}
          <div className="space-y-6">
             <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-20"></div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">{t.reality}</h3>
                
                <div className="space-y-6 relative z-10">
                  {/* Bar Chart 1: Market */}
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-slate-300">
                      <span>{t.market}</span>
                      <span>${totalSpend}/mo</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 transition-all duration-500" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  {/* Bar Chart 2: Aquafeel Paid */}
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-slate-300">
                      <span>{t.freight}</span>
                      <span>$16.25/mo</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 transition-all duration-500" 
                        style={{ width: totalSpend > 0 ? `${(16.25 / (totalSpend || 1)) * 100}%` : '5%' }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-amber-200/80 mt-2 leading-tight">
                        {t.note}
                    </p>
                  </div>

                  {/* Bar Chart 3: Aquafeel Referral */}
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-emerald-300 font-bold">
                      <span>{t.referral}</span>
                      <span>$0.00/mo</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden flex items-center">
                       <span className="ml-2 text-[10px] font-bold text-emerald-400 tracking-widest">{t.free}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                   <p className="text-emerald-300 text-sm font-medium mb-2">{t.howTo}</p>
                   <ul className="text-sm text-slate-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-emerald-500 mt-0.5" />
                        <span>{t.howTo1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-emerald-500 mt-0.5" />
                        <span>{t.howTo2}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-emerald-500 mt-0.5" />
                        <span>{t.howTo3}</span>
                      </li>
                   </ul>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
