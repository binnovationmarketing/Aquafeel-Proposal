
import React, { useState, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, TrendingUp, DollarSign, Info } from 'lucide-react';

interface ProjectionData {
  month: number;
  realityAcc: number;
  aquafeelAcc: number;
  profitAcc: number;
}

interface SpatialAnchorProps {
  waterMonthly: number;
  soapMonthly: number;
  fixedMonthly: number;
  cashPrice: number;
  lang: string;
  financingMonths: number;
}

export function Component({
  waterMonthly,
  soapMonthly,
  fixedMonthly,
  cashPrice,
  lang,
  financingMonths
}: SpatialAnchorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  
  // Prazo simulado via Slider
  const [simMonths, setSimMonths] = useState<number>(financingMonths || 120);

  const t: any = {
    pt: {
      title: "PATRIMÔNIO EM 10 ANOS",
      simLabel: "Simular Prazo:",
      reality: "Gasto Mercado",
      aquafeel: "Investimento",
      profit: "Lucro Real",
      firstPayment: "Carência: 90 dias",
      savings: "Economia Total:",
      waste: "Desperdício Estimado:"
    },
    en: {
      title: "10-YEAR ASSET GROWTH",
      simLabel: "Simulate Term:",
      reality: "Market Spend",
      aquafeel: "Investment",
      profit: "Real Profit",
      firstPayment: "90-Day Grace",
      savings: "Total Savings:",
      waste: "Estimated Waste:"
    }
  }[lang === "pt" ? "pt" : "en"];

  // MOTOR MATEMÁTICO - ENGINE SÊNIOR
  const projection = useMemo(() => {
    const data: ProjectionData[] = [];
    const annualInflation = 0.07;
    const monthlyInfRate = Math.pow(1 + annualInflation, 1/12) - 1;
    
    let realityAcc = 0;
    let aquafeelAcc = 0;

    // Cálculo da Parcela Baseada no Valor Presente e Prazo
    // Se simMonths for 0, é pagamento à vista no mês 4
    const totalFinanced = fixedMonthly * (financingMonths || 1);
    const monthlyPayment = simMonths > 0 ? totalFinanced / simMonths : 0;

    for (let m = 1; m <= 120; m++) {
      // 1. Cálculo da Realidade com Inflação Composta
      const currentMarketCost = (waterMonthly + soapMonthly) * Math.pow(1 + monthlyInfRate, m);
      realityAcc += currentMarketCost;

      // 2. Cálculo Aquafeel com Carência (Pagamento inicia no Mês 4)
      if (simMonths === 0) {
        if (m === 4) aquafeelAcc = cashPrice;
      } else {
        if (m >= 4 && m < (simMonths + 4)) {
          aquafeelAcc += monthlyPayment;
        }
      }

      data.push({
        month: m,
        realityAcc,
        aquafeelAcc,
        profitAcc: realityAcc - aquafeelAcc
      });
    }
    return data;
  }, [waterMonthly, soapMonthly, fixedMonthly, financingMonths, cashPrice, simMonths]);

  const lastPoint = projection[projection.length - 1];
  const maxVal = Math.max(lastPoint.realityAcc, lastPoint.aquafeelAcc);
  
  const chartWidth = 1000;
  const chartHeight = 500;

  const getPath = (key: 'realityAcc' | 'aquafeelAcc' | 'profitAcc') => {
    return projection.map((d, i) => {
      const x = (i / (projection.length - 1)) * chartWidth;
      const y = chartHeight - (d[key] / maxVal) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#010810] text-zinc-100 overflow-hidden rounded-[2rem] md:rounded-[4rem] flex flex-col items-center border border-white/5 py-8 md:py-16 mt-6 shadow-2xl">
      <header className="relative z-10 text-center mb-8 px-4">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border border-blue-500/20">
          <Activity size={12} /> {lang === 'pt' ? 'PROJEÇÃO DE ATIVOS' : 'ASSET PROJECTION'}
        </div>
        <h2 className="text-2xl md:text-5xl font-black tracking-tighter text-white uppercase">{t.title}</h2>
      </header>

      {/* CONTROLES RESPONSIVOS */}
      <div className="relative z-20 w-full max-w-4xl px-4 md:px-8 mb-8">
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{t.simLabel}</span>
              <span className="text-xl font-black text-blue-400 font-mono">{simMonths} {lang === 'pt' ? 'meses' : 'months'}</span>
            </div>
            <input 
              type="range" min="0" max="180" step="12" value={simMonths} 
              onChange={(e) => setSimMonths(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            
            {/* Legenda Dinâmica Mobile */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-end border-t border-white/5 pt-4">
               <div className="flex items-center gap-2 text-[9px] font-black uppercase text-red-500">
                 <div className="w-3 h-3 rounded-full bg-red-600"></div> {t.reality}
               </div>
               <div className="flex items-center gap-2 text-[9px] font-black uppercase text-blue-400">
                 <div className="w-3 h-3 rounded-full bg-blue-500"></div> {t.aquafeel}
               </div>
               <div className="flex items-center gap-2 text-[9px] font-black uppercase text-emerald-500">
                 <div className="w-3 h-0.5 border-t border-dashed border-emerald-500"></div> {t.profit}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DO GRÁFICO RESPONSIVA */}
      <div className="relative z-10 w-full max-w-6xl px-4 md:px-10 aspect-[16/10] md:aspect-[21/9]">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="realityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Eixo Y - Linhas de Fundo */}
          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
            <line key={i} x1="0" y1={chartHeight * p} x2={chartWidth} y2={chartHeight * p} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
          ))}

          <path d={`${getPath('realityAcc')} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`} fill="url(#realityGrad)" />
          
          <motion.path 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
            d={getPath('realityAcc')} fill="none" stroke="#dc2626" strokeWidth="2" strokeOpacity="0.3" 
          />
          <motion.path 
            key={`aq-${simMonths}`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            d={getPath('aquafeelAcc')} fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round"
          />
          <motion.path 
            key={`pr-${simMonths}`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            d={getPath('profitAcc')} fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="10,6" 
          />
        </svg>

        {/* Labels Eixo X */}
        <div className="flex justify-between mt-4 text-[8px] md:text-[10px] font-black text-zinc-600 uppercase tracking-widest">
           <span>Ano 1</span>
           <span className="hidden md:block">Ano 5</span>
           <span>Ano 10</span>
        </div>
      </div>

      {/* RESUMO DE IMPACTO RESPONSIVO */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-6xl px-4">
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-center">
          <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block mb-1">{t.waste}</span>
          <div className="text-xl md:text-3xl font-black text-red-500 font-mono tracking-tighter">${Math.round(lastPoint.realityAcc).toLocaleString()}</div>
        </div>
        <div className="bg-blue-600/10 p-5 rounded-2xl border border-blue-500/30 text-center">
          <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-1">Custo Aquafeel</span>
          <div className="text-xl md:text-3xl font-black text-white font-mono tracking-tighter">${Math.round(lastPoint.aquafeelAcc).toLocaleString()}</div>
        </div>
        <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/30 text-center">
          <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block mb-1">{t.savings}</span>
          <div className="text-2xl md:text-4xl font-black text-emerald-400 font-mono tracking-tighter animate-pulse">${Math.round(lastPoint.profitAcc).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
