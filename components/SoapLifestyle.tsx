import React, { useState, useEffect } from 'react';
import { Leaf, DollarSign, Check } from 'lucide-react';

interface SoapLifestyleProps {
  onTotalChange: (total: number) => void;
}

export const SoapLifestyle: React.FC<SoapLifestyleProps> = ({ onTotalChange }) => {
  const [laundry, setLaundry] = useState<number>(0);
  const [kitchen, setKitchen] = useState<number>(0);
  const [bathroom, setBathroom] = useState<number>(0);
  
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
            <span className="text-sm font-bold tracking-widest uppercase">Parceria Exclusiva</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Pure Selects: <span className="text-emerald-600">Vida Orgânica</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Elimine produtos químicos agressivos da sua rotina. Nós fornecemos todo o sabão, shampoo e produtos de limpeza que sua casa precisa. 
            <span className="font-bold text-emerald-700"> 100% Orgânico, Hipoalergênico e Seguro para Pets/Crianças.</span>
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
                 <h3 className="font-bold text-xl text-slate-800">Seus Gastos Atuais</h3>
                 <p className="text-xs text-slate-500 uppercase tracking-wider">Quanto você deixa no mercado mensalmente?</p>
               </div>
            </div>

            <div className="space-y-8">
              {/* Laundry Input */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold text-slate-700 flex items-center gap-2">
                    Lavanderia <span className="text-xs font-normal text-slate-400">(Sabão roupa, Amaciante)</span>
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
                    Cozinha <span className="text-xs font-normal text-slate-400">(Pratos, Vidros, Multiuso, Dishwasher)</span>
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
                    Banheiro <span className="text-xs font-normal text-slate-400">(Shampoo, Condicionador, Corpo, Rosto)</span>
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
                <span className="text-slate-500 font-medium">Total Mensal Atual:</span>
                <span className="text-3xl font-black text-slate-800">${totalSpend}</span>
              </div>
            </div>
          </div>

          {/* Comparativo Visual */}
          <div className="space-y-6">
             <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-20"></div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">Realidade Aquafeel</h3>
                
                <div className="space-y-6 relative z-10">
                  {/* Bar Chart 1: Market */}
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-slate-300">
                      <span>Mercado Tradicional</span>
                      <span>${totalSpend}/mês</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 transition-all duration-500" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  {/* Bar Chart 2: Aquafeel Paid */}
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-slate-300">
                      <span>Aquafeel (Frete)</span>
                      <span>$16.25/mês</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 transition-all duration-500" 
                        style={{ width: totalSpend > 0 ? `${(16.25 / (totalSpend || 1)) * 100}%` : '5%' }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-amber-200/80 mt-2 leading-tight">
                        *Custo do frete ($390) dividido por 24 meses (durabilidade). Estamos falando de <strong>$16.25/mês</strong> para ter a melhor qualidade de sabão orgânico para sua casa, para seus filhos e para sua saúde.
                    </p>
                  </div>

                  {/* Bar Chart 3: Aquafeel Referral */}
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-emerald-300 font-bold">
                      <span>Aquafeel (Recomendação)</span>
                      <span>$0.00/mês</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden flex items-center">
                       <span className="ml-2 text-[10px] font-bold text-emerald-400 tracking-widest">GRÁTIS</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                   <p className="text-emerald-300 text-sm font-medium mb-2">Como funciona a reposição?</p>
                   <ul className="text-sm text-slate-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-emerald-500 mt-0.5" />
                        <span>O lote inicial dura aprox. 2 anos (família de 4-5 pessoas).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-emerald-500 mt-0.5" />
                        <span>Para repor: Recomende 1 família qualificada <strong>OU</strong> pague apenas o frete ($390).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={16} className="text-emerald-500 mt-0.5" />
                        <span>Garantia de 25 anos = Sabão por 25 anos.</span>
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
