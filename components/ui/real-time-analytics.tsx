'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ChevronRight,
  TrendingDown,
  Droplets,
  ShoppingCart,
  History,
  Target,
  Zap,
  Clock,
  DollarSign,
  Award,
  ArrowRight,
  Sparkles,
  BarChart3,
  Cpu,
  Layers
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type TabId = 'durability' | 'costs' | 'projection';

interface ComparisonMetric {
  label: string;
  aquaValue: number; // 0-100 for bar scale
  compValue: number; // 0-100 for bar scale
  aquaLabel: string; // Display text
  compLabel: string; // Display text
}

interface TabContent {
  id: TabId;
  label: string;
  title: string;
  description: string;
  cta: string;
  colors: {
    gradient: string;
    glow: string;
    ring: string;
  };
  metrics: ComparisonMetric[];
}

interface SpatialAnchorProps {
  waterMonthly: number;
  soapMonthly: number;
  fixedMonthly: number;
  cashPrice: number;
  lang: string;
  financingMonths: number;
}

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: {
    initial: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(20px)',
      y: 20,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 25 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(20px)',
      transition: { duration: 0.3 },
    },
  },
};

// =========================================
// 3. MAIN COMPONENT
// =========================================

export function Component({
  waterMonthly,
  soapMonthly,
  fixedMonthly,
  cashPrice,
  lang,
  financingMonths
}: SpatialAnchorProps) {
  const [activeTab, setActiveTab] = useState<TabId>('durability');
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const t = {
    pt: {
      title: "Comparativo Aquafeel x Realidade",
      durability: "Durabilidade",
      costs: "Custos",
      projection: "Projeção 10 Anos",
      cta: "ASSUMIR CONTROLE AGORA",
      market: "Concorrência",
      aqua: "Aquafeel",
      year: "Ano",
      savings: "Economia Real",
      waste: "Gasto Acumulado"
    },
    en: {
      title: "Aquafeel vs Reality Comparison",
      durability: "Durability",
      costs: "Costs",
      projection: "10-Year Projection",
      cta: "TAKE CONTROL NOW",
      market: "Competitors",
      aqua: "Aquafeel",
      year: "Year",
      savings: "Real Savings",
      waste: "Accumulated Waste"
    }
  }[lang === 'pt' ? 'pt' : 'en'];

  const DATA: Record<TabId, TabContent> = {
    durability: {
      id: 'durability',
      label: t.durability,
      title: 'Resiliência Espacial',
      description: lang === 'pt' 
        ? 'O sistema Aquafeel é o âncora que estabiliza sua casa. Enquanto o mercado entrega produtos descartáveis, nossa engenharia molecular garante décadas de pureza inabalável.'
        : 'The Aquafeel system is the anchor that stabilizes your home. While the market delivers disposable products, our molecular engineering ensures decades of unwavering purity.',
      cta: 'PROTEJA SEU PATRIMÔNIO POR 25 ANOS',
      colors: {
        gradient: 'from-blue-600 to-indigo-950',
        glow: 'bg-blue-500',
        ring: 'border-blue-500/20',
      },
      metrics: [
        { label: lang === 'pt' ? 'Vida Útil' : 'Total Lifespan', aquaValue: 100, compValue: 28, aquaLabel: '25 Anos', compLabel: '3-7 Anos' },
        { label: lang === 'pt' ? 'Remineralização' : 'Remineralization', aquaValue: 100, compValue: 40, aquaLabel: '10 Anos', compLabel: '3-6 Anos' },
        { label: lang === 'pt' ? 'Filtros RO' : 'RO Filters', aquaValue: 100, compValue: 10, aquaLabel: '5 Anos', compLabel: '6-12 Meses' },
      ]
    },
    costs: {
      id: 'costs',
      label: t.costs,
      title: 'Eficiência Financeira',
      description: lang === 'pt'
        ? 'Eliminamos a obsolescência programada. A manutenção do Aquafeel é pensada para ser invisível no seu orçamento, destruindo os custos abusivos das empresas tradicionais.'
        : 'We eliminate planned obsolescence. Aquafeel maintenance is designed to be invisible in your budget, destroying the abusive costs of traditional companies.',
      cta: 'REDUZA CUSTOS OPERACIONAIS EM 70%',
      colors: {
        gradient: 'from-aqua-600 to-blue-900',
        glow: 'bg-aqua-400',
        ring: 'border-aqua-400/20',
      },
      metrics: [
        { label: lang === 'pt' ? 'Manutenção (Custo)' : 'Maintenance Cost', aquaValue: 100, compValue: 65, aquaLabel: '$790', compLabel: '$1.2k' },
        { label: lang === 'pt' ? 'Taxa Relocação' : 'Relocation Fee', aquaValue: 100, compValue: 49, aquaLabel: '$390', compLabel: '$790' },
        { label: lang === 'pt' ? 'Kit Filtros (Set)' : 'Filter Kit (Set)', aquaValue: 100, compValue: 20, aquaLabel: '$200', compLabel: '$600+' },
      ]
    },
    projection: {
      id: 'projection',
      label: t.projection,
      title: 'Visão Futurista',
      description: lang === 'pt'
        ? 'Sua liberdade financeira começa com a sincronização do seu consumo. Veja como o investimento Aquafeel se transforma em lucro puro após apenas 60 meses.'
        : 'Your financial freedom starts with synchronized consumption. See how the Aquafeel investment transforms into pure profit after just 60 months.',
      cta: 'ATIVAR LUCRO PATRIMONIAL AGORA',
      colors: {
        gradient: 'from-emerald-600 to-teal-950',
        glow: 'bg-emerald-500',
        ring: 'border-emerald-500/20',
      },
      metrics: [] // Handled by specialized chart component below
    }
  };

  const current = DATA[activeTab];

  // Logic for the 10-year chart
  const projectionData = useMemo(() => {
    const years = Array.from({ length: 10 }, (_, i) => i + 1);
    const inflation = 0.07;
    let waterAcc = 0;
    let soapAcc = 0;
    let aquafeelAcc = 0;

    return years.map(y => {
      const yearInf = Math.pow(1 + inflation, y - 1);
      const currentYearWater = (waterMonthly * 12) * yearInf;
      const currentYearSoap = (soapMonthly * 12) * yearInf;
      waterAcc += currentYearWater;
      soapAcc += currentYearSoap;

      // Aquafeel finishes in 60 months (5 years)
      if (y <= 5) {
        aquafeelAcc += (fixedMonthly * 12);
      }

      return {
        year: y,
        water: waterAcc,
        soap: soapAcc,
        aquafeel: aquafeelAcc,
        totalReality: waterAcc + soapAcc
      };
    });
  }, [waterMonthly, soapMonthly, fixedMonthly]);

  return (
    <div className="relative w-full min-h-[900px] bg-[#020d1a] text-zinc-100 overflow-hidden rounded-[4rem] md:rounded-[6rem] flex flex-col items-center justify-center border border-white/5 py-16 md:py-32">
      
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: `radial-gradient(circle at 50% 50%, ${activeTab === 'durability' ? 'rgba(59, 130, 246, 0.08)' : activeTab === 'costs' ? 'rgba(14, 165, 233, 0.08)' : 'rgba(16, 185, 129, 0.08)'}, transparent 65%)`,
          }}
          className="absolute inset-0"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <main className="relative z-10 w-full px-6 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 max-w-7xl mx-auto">
        
        {/* LADO VISUAL: AQUAFEEL SYSTEM IMAGE */}
        <div className="relative shrink-0 order-2 md:order-1">
          {/* Tech Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className={`absolute inset-[-20%] rounded-full border border-dashed border-white/10 ${current.colors.ring}`}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-10%] rounded-full border border-white/5"
          />

          <div className="relative h-72 w-72 md:h-[550px] md:w-[550px] rounded-full border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] flex items-center justify-center bg-black/40 backdrop-blur-2xl overflow-hidden group">
            {/* Pulsing Glow Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${current.colors.gradient} opacity-20 blur-3xl animate-pulse`}></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                variants={ANIMATIONS.image}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative z-10 w-full h-full flex items-center justify-center p-12 md:p-16"
              >
                <img
                  src="https://raw.githubusercontent.com/ai-studio-assets/aquafeel/main/system.png"
                  alt="Aquafeel System"
                  className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,1)]"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Float HUD Labels */}
            <div className="absolute top-1/4 right-10 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl animate-float">
                <div className="flex items-center gap-2 text-blue-400 font-black text-[8px] tracking-widest uppercase">
                    <Cpu size={12} /> Sync Active
                </div>
            </div>
          </div>
        </div>

        {/* LADO CONTEÚDO: INFO + DASHBOARD */}
        <motion.div
          key={activeTab}
          variants={ANIMATIONS.container}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl flex flex-col order-1 md:order-2"
        >
          <div className="mb-8">
            <motion.h2 variants={ANIMATIONS.item} className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-blue-500 mb-3 flex items-center gap-2">
              <Sparkles size={14} /> {lang === 'pt' ? 'PROTOCOL DE ELITE' : 'ELITE PROTOCOL'}
            </motion.h2>
            <motion.h1 variants={ANIMATIONS.item} className="text-4xl md:text-7xl font-black tracking-tighter mb-4 text-white leading-[0.9] uppercase">
              {t.title}
            </motion.h1>
            <motion.p variants={ANIMATIONS.item} className="text-zinc-500 text-sm md:text-lg leading-relaxed font-medium">
              {current.description}
            </motion.p>
          </div>

          {/* DASHBOARD / METRICS AREA */}
          <motion.div variants={ANIMATIONS.item} className="w-full bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            
            {activeTab === 'projection' ? (
              /* GRÁFICO DE 10 ANOS */
              <div className="space-y-8 relative z-10">
                <div className="flex items-end justify-between h-48 md:h-64 gap-2 px-1">
                  {projectionData.map((d) => (
                    <div 
                      key={d.year}
                      onMouseEnter={() => setHoveredYear(d.year)}
                      onMouseLeave={() => setHoveredYear(null)}
                      className="flex-1 flex flex-col justify-end gap-1 group/bar cursor-pointer"
                    >
                      {/* Bar Content */}
                      <div className="relative w-full h-full flex flex-col justify-end items-center">
                         {/* Reality Bar (Waste) */}
                         <div 
                           className="w-full bg-red-600/20 rounded-t-sm transition-all duration-500 group-hover/bar:bg-red-600/40"
                           style={{ height: `${(d.totalReality / projectionData[9].totalReality) * 100}%` }}
                         ></div>
                         {/* Aquafeel Bar (Fixed) */}
                         <div 
                           className={`absolute bottom-0 w-1/2 rounded-t-sm transition-all duration-500 ${d.year <= 5 ? 'bg-blue-500' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}
                           style={{ height: `${(d.aquafeel / projectionData[9].totalReality) * 100}%` }}
                         ></div>
                      </div>
                      <span className={`text-[8px] font-black text-center transition-colors ${hoveredYear === d.year ? 'text-white' : 'text-zinc-600'}`}>
                        {d.year}y
                      </span>
                    </div>
                  ))}
                </div>

                {/* Legend & Hover Info */}
                <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Aquafeel Payoff (60m)
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                       <div className="w-2 h-2 bg-red-600 rounded-full"></div> {t.waste}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Lifetime Profit
                    </div>
                  </div>
                  {hoveredYear && (
                    <div className="text-right animate-in fade-in slide-in-from-right-4">
                       <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Ano {hoveredYear}</div>
                       <div className="text-sm font-black text-white">$ {Math.round(projectionData[hoveredYear-1].totalReality).toLocaleString()} Perda</div>
                       <div className="text-xs font-black text-emerald-400 uppercase tracking-tighter">Savings Active</div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* MÉTRICAS DE DURABILIDADE E CUSTOS */
              <div className="space-y-10 relative z-10">
                {current.metrics.map((metric, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-white/5 border border-white/5 text-blue-500`}>
                           {idx === 0 ? <History size={16}/> : idx === 1 ? <Layers size={16}/> : <Target size={16}/>}
                        </div>
                        <span className="text-[11px] md:text-xs font-black uppercase tracking-widest text-zinc-300">{metric.label}</span>
                      </div>
                      <div className="flex gap-4">
                         <span className="text-[11px] font-black text-blue-400 uppercase">{t.aqua}: {metric.aquaLabel}</span>
                         <span className="text-[11px] font-black text-red-500 uppercase">{t.market}: {metric.compLabel}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.aquaValue}%` }}
                          transition={{ duration: 1.5, delay: 0.4 + idx * 0.1 }}
                          className="absolute inset-0 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                        />
                      </div>
                      <div className="relative h-1 w-full bg-black/40 rounded-full overflow-hidden opacity-30">
                         <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.compValue}%` }}
                          transition={{ duration: 1.5, delay: 0.6 + idx * 0.1 }}
                          className="absolute inset-0 bg-red-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA SECTION INSIDE SHOWCASE */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="text-center md:text-left">
                  <div className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">Status de Rede:</div>
                  <div className="text-white font-black text-lg tracking-tight uppercase">Sincronia Total (AF-99)</div>
               </div>
               <button className="w-full md:w-auto bg-white text-black hover:bg-zinc-200 font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] group">
                  <span className="text-xs uppercase tracking-widest leading-none">{current.cta}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
               </button>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* FOOTER TABS SWITCHER */}
      <div className="fixed bottom-10 inset-x-0 flex justify-center z-[100] pointer-events-none px-4">
        <motion.div layout className="pointer-events-auto flex items-center gap-1.5 p-2 rounded-full bg-zinc-950/80 backdrop-blur-3xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
          {(Object.values(DATA) as TabContent[]).map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileTap={{ scale: 0.94 }}
              className="relative w-32 md:w-44 h-12 md:h-16 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black uppercase tracking-widest focus:outline-none overflow-hidden"
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-surface"
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent shadow-inner border border-white/10"
                  transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-500 ${activeTab === tab.id ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.span
                  layoutId="tab-glow"
                  className="absolute -bottom-1.5 h-1.5 w-10 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)]"
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
