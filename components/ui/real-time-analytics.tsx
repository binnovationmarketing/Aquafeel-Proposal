
import React, { useState, useMemo, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
// Added DollarSign to the imports from lucide-react
import { Activity, Calendar, Zap, TrendingUp, Info, MousePointer2, DollarSign } from 'lucide-react';

interface ProjectionData {
  month: number;
  year: number;
  realityAcc: number;
  aquafeelAcc: number;
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
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [simMonths, setSimMonths] = useState<number>(financingMonths || 60);
  const [hoveredPoint, setHoveredPoint] = useState<ProjectionData | null>(null);

  const t: any = {
    pt: {
      title: "PROJEÇÃO DE PATRIMÔNIO (10 ANOS)",
      subtitle: "Estilo Mercado de Capitais: Compare o desperdício acumulado vs seu novo ativo",
      reality: "Desperdício Acumulado (Realidade)",
      aquafeel: "Investimento Aquafeel",
      savings: "Zona de Lucro / Patrimônio",
      cutoff: "Data de Quitação",
      totalWaste: "Total Perdido em 10 Anos",
      totalInvest: "Investimento Total",
      netProfit: "Patrimônio Gerado",
      yAxis: "Capital ($)",
      xAxis: "Tempo (Anos)",
      simLabel: "Simular Quitação em:",
      months: "meses"
    },
    en: {
      title: "ASSET PROJECTION (10 YEARS)",
      subtitle: "Stock Market Style: Compare accumulated waste vs your new asset",
      reality: "Accumulated Waste (Reality)",
      aquafeel: "Aquafeel Investment",
      savings: "Profit / Asset Zone",
      cutoff: "Payoff Date",
      totalWaste: "Total Lost in 10 Years",
      totalInvest: "Total Investment",
      netProfit: "Net Equity Generated",
      yAxis: "Capital ($)",
      xAxis: "Time (Years)",
      simLabel: "Simulate Payoff in:",
      months: "months"
    }
  }[lang === "pt" ? "pt" : "en"];

  // Lógica de projeção 120 meses
  const projection = useMemo(() => {
    const data: ProjectionData[] = [];
    const inflation = 0.07 / 12; // Inflação mensal
    let realityAcc = 0;
    let aquafeelAcc = 0;

    // Se financiamento simulado for zero (à vista), o investimento acontece no mês 1
    const monthlyPayment = simMonths > 0 ? (fixedMonthly * financingMonths) / simMonths : 0;

    for (let m = 1; m <= 120; m++) {
      const year = Math.ceil(m / 12);
      // Gasto de realidade com inflação composta
      const currentRealityMonthly = (waterMonthly + soapMonthly) * Math.pow(1 + inflation, m);
      realityAcc += currentRealityMonthly;

      // Investimento Aquafeel
      if (simMonths === 0 && m === 1) {
        aquafeelAcc = cashPrice;
      } else if (m <= simMonths) {
        aquafeelAcc += monthlyPayment;
      }

      data.push({
        month: m,
        year,
        realityAcc,
        aquafeelAcc,
        isPaidOff: m > simMonths
      });
    }
    return data;
  }, [waterMonthly, soapMonthly, fixedMonthly, financingMonths, cashPrice, simMonths]);

  const maxVal = projection[119].realityAcc;
  const chartWidth = 1000;
  const chartHeight = 500;

  // Gerador de pontos para SVG Path
  const getPath = (key: 'realityAcc' | 'aquafeelAcc') => {
    return projection.map((d, i) => {
      const x = (i / 119) * chartWidth;
      const y = chartHeight - (d[key] / maxVal) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#010810] text-zinc-100 overflow-hidden rounded-[2.5rem] md:rounded-[4rem] flex flex-col items-center border border-white/5 py-10 md:py-20 mt-10 shadow-2xl">
      
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <header className="relative z-10 text-center mb-12 px-6">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-4 border border-blue-500/20 shadow-lg">
          <Activity size={14} className="animate-pulse" /> {lang === 'pt' ? 'MERCADO FINANCEIRO' : 'MARKET ANALYTICS'}
        </div>
        <h1 className="text-3xl md:text-6xl font-black tracking-tighter mb-4 text-white uppercase leading-none drop-shadow-2xl">
          {t.title}
        </h1>
        <p className="text-zinc-500 text-sm md:text-lg font-medium opacity-80 max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </header>

      {/* CONTROLADOR INTERATIVO */}
      <div className="relative z-20 w-full max-w-4xl px-6 mb-12">
        <div className="bg-white/5 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl ring-1 ring-white/10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                  {t.simLabel}
                </span>
                <span className="text-3xl font-black text-white bg-blue-600 px-4 py-1 rounded-xl shadow-lg">
                  {simMonths} {t.months}
                </span>
              </div>
              <input 
                type="range" min="12" max="180" step="12"
                value={simMonths} 
                onChange={(e) => setSimMonths(Number(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500 ring-4 ring-blue-500/10"
              />
              <div className="flex justify-between mt-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                <span>1 ANO</span>
                <span>5 ANOS</span>
                <span>10 ANOS</span>
                <span>15 ANOS</span>
              </div>
            </div>
            
            <div className="hidden lg:flex flex-col gap-4">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-0.5 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.reality}</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-blue-500/40 border-l-2 border-blue-500"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.aquafeel}</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-emerald-500/20 border-l-2 border-emerald-500"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{t.savings}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRÁFICO SVG - ESTILO BOLSA */}
      <div className="relative z-10 w-full max-w-6xl px-4 md:px-10 h-[350px] md:h-[600px]">
        <div className="absolute left-10 md:left-14 top-0 bottom-10 flex flex-col justify-between text-[10px] font-black text-zinc-700 pointer-events-none z-20">
          <span>${Math.round(maxVal).toLocaleString()}</span>
          <span>${Math.round(maxVal * 0.75).toLocaleString()}</span>
          <span>${Math.round(maxVal * 0.5).toLocaleString()}</span>
          <span>${Math.round(maxVal * 0.25).toLocaleString()}</span>
          <span>$0</span>
        </div>

        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid Lines */}
          <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="white" strokeOpacity="0.05" />
          <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="white" strokeOpacity="0.05" />
          <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="white" strokeOpacity="0.05" />
          <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="white" strokeOpacity="0.05" />

          {/* Áreas de preenchimento */}
          <defs>
            <linearGradient id="gradReality" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradAqua" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradEmerald" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Área Aquafeel (Base) */}
          <path 
            d={`${getPath('aquafeelAcc')} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`} 
            fill="url(#gradAqua)" 
          />

          {/* Área de Lucro (Diferença entre Reality e Aquafeel após quitação) */}
          <path 
            d={`${getPath('realityAcc')} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`} 
            fill="url(#gradReality)" 
          />

          {/* Linha de Tendência Realidade (VERMELHA - ALTA VISIBILIDADE) */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            d={getPath('realityAcc')}
            fill="none"
            stroke="#dc2626"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Linha de Investimento Aquafeel (AZUL/ESMERALDA) */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            d={getPath('aquafeelAcc')}
            fill="none"
            stroke={simMonths > 0 ? "#3b82f6" : "#10b981"}
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Marcador de Quitação (Data de Corte) */}
          {simMonths > 0 && simMonths <= 120 && (
            <g transform={`translate(${(simMonths / 120) * chartWidth}, 0)`}>
              <line y1="0" y2={chartHeight} stroke="white" strokeWidth="2" strokeDasharray="8,8" strokeOpacity="0.5" />
              <circle cx="0" cy={chartHeight - (projection[simMonths-1].aquafeelAcc / maxVal) * chartHeight} r="6" fill="white" filter="url(#glow)" />
              <foreignObject x="-50" y="-40" width="100" height="30">
                <div className="bg-white text-black text-[9px] font-black uppercase py-1 px-2 rounded-lg text-center shadow-2xl">
                   {t.cutoff}
                </div>
              </foreignObject>
            </g>
          )}

          {/* Interatividade - Invisible Overlay para Hover */}
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

        {/* Eixo X - Anos */}
        <div className="absolute left-10 md:left-14 right-0 bottom-0 flex justify-between px-2 pt-4 border-t border-white/10">
           {[1,2,3,4,5,6,7,8,9,10].map(y => (
             <span key={y} className="text-[10px] font-black text-zinc-600">{y}Y</span>
           ))}
        </div>
      </div>

      {/* CARDS DE PERFORMANCE FINANCEIRA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 md:px-10 mt-16">
         <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex flex-col items-center text-center group hover:bg-red-600/5 transition-all">
            <div className="bg-red-600/20 p-4 rounded-2xl text-red-500 mb-4 group-hover:scale-110 transition-transform">
               <TrendingUp size={24} />
            </div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{t.totalWaste}</span>
            <div className="text-3xl font-black text-white">${Math.round(maxVal).toLocaleString()}</div>
            <p className="text-[10px] text-zinc-500 mt-3 font-medium">Capital perdido sem retorno em compras de supermercado.</p>
         </div>

         <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex flex-col items-center text-center group hover:bg-blue-600/5 transition-all">
            <div className="bg-blue-600/20 p-4 rounded-2xl text-blue-400 mb-4 group-hover:scale-110 transition-transform">
               <DollarSign size={24} />
            </div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{t.totalInvest}</span>
            <div className="text-3xl font-black text-white">${Math.round(projection[119].aquafeelAcc).toLocaleString()}</div>
            <p className="text-[10px] text-zinc-500 mt-3 font-medium">Investimento total para aquisição do ativo Aquafeel.</p>
         </div>

         <div className="bg-emerald-500/10 p-8 rounded-[2.5rem] border border-emerald-500/20 flex flex-col items-center text-center group hover:bg-emerald-500/20 transition-all">
            <div className="bg-emerald-600/20 p-4 rounded-2xl text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
               <Zap size={24} />
            </div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{t.netProfit}</span>
            <div className="text-3xl font-black text-emerald-400">
               ${Math.round(maxVal - projection[119].aquafeelAcc).toLocaleString()}
            </div>
            <p className="text-[10px] text-zinc-500 mt-3 font-medium">Dinheiro que volta ao seu bolso nos próximos 10 anos.</p>
         </div>
      </div>

      {/* TOOLTIP DINÂMICO (STOCK STYLE) */}
      <AnimatePresence>
        {hoveredPoint && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] bg-zinc-900/95 backdrop-blur-3xl border border-white/20 p-8 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] min-w-[320px] ring-1 ring-white/10"
          >
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Ponto de Análise</span>
                  <span className="text-xl font-black text-white">Ano {hoveredPoint.year} - Mês {hoveredPoint.month}</span>
               </div>
               <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${hoveredPoint.isPaidOff ? 'bg-emerald-500 text-black' : 'bg-blue-600 text-white'}`}>
                  {hoveredPoint.isPaidOff ? 'Ativo Quitado' : 'Em Pagamento'}
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-red-600/10 p-4 rounded-2xl border border-red-600/20">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Desperdício Acumulado</span>
                <span className="text-lg font-black text-red-500">${Math.round(hoveredPoint.realityAcc).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-600/10 p-4 rounded-2xl border border-blue-600/20">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Patrimônio Aquafeel</span>
                <span className="text-lg font-black text-blue-400">${Math.round(hoveredPoint.aquafeelAcc).toLocaleString()}</span>
              </div>
              
              {hoveredPoint.isPaidOff && (
                <div className="flex justify-between items-center bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 animate-pulse">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Economia Líquida</span>
                  <span className="text-lg font-black text-emerald-400">${Math.round(hoveredPoint.realityAcc - hoveredPoint.aquafeelAcc).toLocaleString()}</span>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
               <MousePointer2 size={12} /> Arraste o gráfico para analisar
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          border: 4px solid white;
          transition: transform 0.2s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
