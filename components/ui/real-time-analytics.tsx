import React, { useState, useMemo, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Activity, Calendar, Zap, TrendingUp, DollarSign, MousePointer2 } from 'lucide-react';

interface ProjectionData {
  month: number;
  year: number;
  realityAcc: number;
  aquafeelAcc: number;
  profitAcc: number;
  isPaidOff: boolean;
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
  const [simMonths, setSimMonths] = useState<number>(financingMonths || 60);
  const [hoveredPoint, setHoveredPoint] = useState<ProjectionData | null>(null);

  const t: any = {
    pt: {
      title: "PROJEÇÃO DE PATRIMÔNIO E LUCRO",
      subtitle: "Linha verde segmentada mostra o lucro real que volta para o seu bolso",
      reality: "Gasto Acumulado (Realidade)",
      aquafeel: "Investimento Aquafeel",
      profit: "Lucro / Economia Real",
      cutoff: "Quitação",
      netEquity: "Patrimônio Gerado",
      yAxis: "Capital ($)",
      xAxis: "Tempo (Anos)",
      simLabel: "Simular prazo:",
      months: "meses"
    },
    en: {
      title: "ASSET & PROFIT PROJECTION",
      subtitle: "Green dashed line shows the real profit returning to your pocket",
      reality: "Accumulated Waste (Reality)",
      aquafeel: "Aquafeel Investment",
      profit: "Real Profit / Savings",
      cutoff: "Payoff",
      netEquity: "Net Equity Generated",
      yAxis: "Capital ($)",
      xAxis: "Time (Years)",
      simLabel: "Simulate term:",
      months: "months"
    }
  }[lang === "pt" ? "pt" : "en"];

  const projection = useMemo(() => {
    const data: ProjectionData[] = [];
    const inflation = 0.07 / 12; 
    let realityAcc = 0;
    let aquafeelAcc = 0;

    const monthlyPayment = simMonths > 0 ? (fixedMonthly * financingMonths) / simMonths : 0;

    for (let m = 1; m <= 120; m++) {
      const year = Math.ceil(m / 12);
      const currentRealityMonthly = (waterMonthly + soapMonthly) * Math.pow(1 + inflation, m);
      realityAcc += currentRealityMonthly;

      if (simMonths === 0 && m === 1) {
        aquafeelAcc = cashPrice;
      } else if (m <= simMonths) {
        aquafeelAcc += monthlyPayment;
      }

      // Lucro = O que ele gastaria - o que ele investiu
      const profitAcc = realityAcc - aquafeelAcc;

      data.push({
        month: m,
        year,
        realityAcc,
        aquafeelAcc,
        profitAcc,
        isPaidOff: m > simMonths
      });
    }
    return data;
  }, [waterMonthly, soapMonthly, fixedMonthly, financingMonths, cashPrice, simMonths]);

  const maxVal = Math.max(projection[119].realityAcc, projection[119].profitAcc);
  const chartWidth = 1000;
  const chartHeight = 500;

  const getPath = (key: 'realityAcc' | 'aquafeelAcc' | 'profitAcc') => {
    return projection.map((d, i) => {
      const x = (i / 119) * chartWidth;
      const y = chartHeight - (d[key] / maxVal) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#010810] text-zinc-100 overflow-hidden rounded-[2rem] md:rounded-[4rem] flex flex-col items-center border border-white/5 py-8 md:py-16 mt-6 shadow-2xl">
      
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <header className="relative z-10 text-center mb-8 px-6">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-3 border border-blue-500/20">
          <Activity size={12} /> {lang === 'pt' ? 'MERCADO DE CAPITAIS' : 'CAPITAL MARKETS'}
        </div>
        <h1 className="text-2xl md:text-5xl font-black tracking-tighter mb-2 text-white uppercase leading-none">
          {t.title}
        </h1>
        <p className="text-zinc-500 text-xs md:text-base font-medium opacity-80 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </header>

      {/* CONTROLES OTIMIZADOS */}
      <div className="relative z-20 w-full max-w-3xl px-6 mb-8">
        <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  {t.simLabel}
                </span>
                <span className="text-xl font-black text-blue-400">
                  {simMonths} <span className="text-[10px] opacity-60 uppercase">{t.months}</span>
                </span>
              </div>
              <input 
                type="range" min="12" max="180" step="12"
                value={simMonths} 
                onChange={(e) => setSimMonths(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between mt-3 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                <span>1Y</span>
                <span>5Y</span>
                <span>10Y</span>
                <span>15Y</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 md:flex md:flex-col gap-3 w-full md:w-auto">
               <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-red-600"></div>
                  <span className="text-[8px] font-black uppercase text-zinc-500">{t.reality}</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-blue-500"></div>
                  <span className="text-[8px] font-black uppercase text-zinc-500">{t.aquafeel}</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-emerald-500 border-t border-dashed border-emerald-300"></div>
                  <span className="text-[8px] font-black uppercase text-emerald-500">{t.profit}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRÁFICO RESPONSIVO */}
      <div className="relative z-10 w-full max-w-6xl px-4 md:px-10 aspect-[16/10] md:aspect-[21/10]">
        <div className="absolute left-10 md:left-14 top-0 bottom-8 flex flex-col justify-between text-[8px] md:text-[10px] font-black text-zinc-800 pointer-events-none z-20">
          <span>${Math.round(maxVal).toLocaleString()}</span>
          <span>${Math.round(maxVal * 0.5).toLocaleString()}</span>
          <span>$0</span>
        </div>

        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaReality" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="areaProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid Horizontais */}
          <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="white" strokeOpacity="0.05" />
          <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="white" strokeOpacity="0.05" />

          {/* Áreas */}
          <path d={`${getPath('realityAcc')} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`} fill="url(#areaReality)" />
          <path d={`${getPath('profitAcc')} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`} fill="url(#areaProfit)" />

          {/* Linha Realidade (VERMELHA) */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            d={getPath('realityAcc')}
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
            strokeOpacity="0.6"
          />

          {/* Linha Investimento (AZUL) */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            d={getPath('aquafeelAcc')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
          />

          {/* Linha de LUCRO (VERDE SEGMENTADA) */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
            d={getPath('profitAcc')}
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
            strokeDasharray="10,6"
          />

          {/* Marcador Quitação */}
          {simMonths > 0 && simMonths <= 120 && (
            <g transform={`translate(${(simMonths / 120) * chartWidth}, 0)`}>
              <line y1="0" y2={chartHeight} stroke="white" strokeWidth="1" strokeDasharray="4,4" strokeOpacity="0.3" />
              <circle cx="0" cy={chartHeight - (projection[simMonths-1].aquafeelAcc / maxVal) * chartHeight} r="4" fill="white" />
              <foreignObject x="-35" y="-30" width="70" height="20">
                <div className="bg-white text-black text-[8px] font-black uppercase py-0.5 rounded text-center shadow-lg">
                   {t.cutoff}
                </div>
              </foreignObject>
            </g>
          )}

          {/* Hover Overlay */}
          {projection.map((p, i) => (
            <rect
              key={i}
              x={(i / 119) * chartWidth - (chartWidth / 240)}
              y="0"
              width={chartWidth / 120}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="cursor-crosshair"
            />
          ))}
        </svg>

        {/* Eixo X */}
        <div className="absolute left-10 md:left-14 right-0 bottom-0 flex justify-between px-2 pt-2 border-t border-white/5">
           {[1,2,3,4,5,6,7,8,9,10].map(y => (
             <span key={y} className="text-[8px] md:text-[10px] font-black text-zinc-700">{y}Y</span>
           ))}
        </div>
      </div>

      {/* TOOLTIP BOLSA STYLE */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900/95 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl min-w-[280px]"
          >
            <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
               <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Ano {hoveredPoint.year} - Mês {hoveredPoint.month}</span>
               <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${hoveredPoint.isPaidOff ? 'bg-emerald-500 text-black' : 'bg-blue-600 text-white'}`}>
                  {hoveredPoint.isPaidOff ? 'Ativo 100%' : 'Pagando'}
               </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-red-500">
                <span className="text-[9px] font-black uppercase">Gasto s/ Sistema</span>
                <span className="text-sm font-black">${Math.round(hoveredPoint.realityAcc).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-blue-400">
                <span className="text-[9px] font-black uppercase">Investimento</span>
                <span className="text-sm font-black">${Math.round(hoveredPoint.aquafeelAcc).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400 pt-1 border-t border-white/5">
                <span className="text-[9px] font-black uppercase">LUCRO ACUMULADO</span>
                <span className="text-lg font-black">${Math.round(hoveredPoint.profitAcc).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
               <MousePointer2 size={10} /> {lang === 'pt' ? 'Analise o gráfico' : 'Analyze the chart'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
