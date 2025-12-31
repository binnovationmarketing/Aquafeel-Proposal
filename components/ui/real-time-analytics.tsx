"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { TrendingUp, AlertCircle, Zap, Target, DollarSign, ArrowRight } from "lucide-react"

interface DataPoint {
  month: number
  cumulativeWater: number
  cumulativeSoap: number
  cumulativeTotal: number
  cumulativeAquafeel: number
}

interface ComponentProps {
  waterMonthly: number
  soapMonthly: number
  fixedMonthly: number
  cashPrice: number
  lang: string
}

export function Component({ waterMonthly, soapMonthly, fixedMonthly, cashPrice, lang }: ComponentProps) {
  const [data, setData] = useState<DataPoint[]>([])
  const [drawProgress, setDrawProgress] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [breakEvenMonth, setBreakEvenMonth] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const width = 1000
  const height = 500
  const padding = { top: 60, right: 150, bottom: 60, left: 80 }
  const totalMonths = 180 // 15 years

  useEffect(() => {
    const points: DataPoint[] = []
    let sumWater = 0
    let sumSoap = 0
    let sumAquafeel = 0
    let foundBreakEven = false

    const annualInflation = 0.07
    const monthlyInflation = Math.pow(1 + annualInflation, 1/12) - 1

    for (let m = 0; m <= totalMonths; m++) {
      const inflationFactor = Math.pow(1 + annualInflation, Math.floor(m / 12))
      const currentWater = waterMonthly * inflationFactor
      const currentSoap = soapMonthly * inflationFactor
      
      sumWater += currentWater
      sumSoap += currentSoap
      sumAquafeel += fixedMonthly

      points.push({
        month: m,
        cumulativeWater: sumWater,
        cumulativeSoap: sumSoap,
        cumulativeTotal: sumWater + sumSoap,
        cumulativeAquafeel: Math.min(sumAquafeel, cashPrice * 1.8) // Simplified financing ceiling
      })

      if (!foundBreakEven && (sumWater + sumSoap) >= cashPrice) {
        setBreakEvenMonth(m)
        foundBreakEven = true
      }
    }
    setData(points)

    let start: number | null = null
    const duration = 3000
    const animate = (time: number) => {
      if (!start) start = time
      const progress = Math.min((time - start) / duration, 1)
      setDrawProgress(progress)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [waterMonthly, soapMonthly, fixedMonthly, cashPrice])

  const maxCumulative = data.length > 0 ? data[totalMonths].cumulativeTotal : 100000
  const maxVal = maxCumulative * 1.1

  const getX = (month: number) => padding.left + (month / totalMonths) * (width - padding.left - padding.right)
  const getY = (value: number) => height - padding.bottom - (value / maxVal) * (height - padding.top - padding.bottom)

  const getLinePath = (key: keyof DataPoint) => {
    if (data.length < 2) return ""
    const visiblePoints = Math.ceil(data.length * drawProgress)
    return data
      .slice(0, visiblePoints)
      .map((point, i) => {
        const x = getX(point.month)
        const y = getY(point[key] as number)
        return `${i === 0 ? "M" : "L"} ${x},${y}`
      })
      .join(" ")
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * width
    const month = Math.round(((x - padding.left) / (width - padding.left - padding.right)) * totalMonths)
    if (month >= 0 && month <= totalMonths) {
      setHoveredIndex(month)
    }
  }

  const translations = {
    pt: { 
      title: "PROJEÇÃO DE IMPACTO 15 ANOS", 
      sub: "Cálculo Real com Inflação de 7% ao ano", 
      water: "Água Engarrafada", 
      soap: "Sabão e Limpeza", 
      total: "Gasto Tradicional", 
      aqua: "Investimento Aquafeel",
      breakEven: "PONTO DE RECUPERAÇÃO",
      breakEvenSub: "Neste mês você já teria pago o sistema completo apenas com o desperdício.",
      insight: "O dinheiro que você joga fora hoje paga o seu patrimônio amanhã.",
      payoff: "Liquidação antecipada disponível a qualquer momento."
    },
    en: { 
      title: "15-YEAR IMPACT PROJECTION", 
      sub: "Real Calculation with 7% Annual Inflation", 
      water: "Bottled Water", 
      soap: "Soap & Cleaning", 
      total: "Traditional Spend", 
      aqua: "Aquafeel Investment",
      breakEven: "RECOVERY POINT",
      breakEvenSub: "By this month, your waste would have paid for the entire system.",
      insight: "The money you waste today pays for your asset tomorrow.",
      payoff: "Early payoff available at any time."
    },
    es: { 
      title: "PROYECCIÓN DE IMPACTO 15 AÑOS", 
      sub: "Cálculo Real con Inflación del 7% anual", 
      water: "Agua Embotellada", 
      soap: "Jabón y Limpieza", 
      total: "Gasto Tradicional", 
      aqua: "Inversión Aquafeel",
      breakEven: "PUNTO DE RECUPERACIÓN",
      breakEvenSub: "En este mes ya habrías pagado el sistema completo solo con el desperdicio.",
      insight: "El dinero que tiras hoy paga tu patrimonio mañana.",
      payoff: "Liquidación anticipada disponible en cualquier momento."
    }
  }[lang] || { title: "PROJEÇÃO DE IMPACTO 15 ANOS", sub: "Inflação 7% aa" }

  return (
    <div className="w-full bg-slate-950 py-12 px-4 rounded-[3rem] border border-white/10 mt-16 shadow-[0_20px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <TrendingUp className="text-red-500" size={36} />
              {translations.title}
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mt-2">{translations.sub}</p>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-3xl flex items-center gap-4 backdrop-blur-md">
             <div className="p-2 bg-emerald-500/20 rounded-xl">
               <Zap className="text-emerald-400" size={24} />
             </div>
             <div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Total Desperdiçado (15 anos)</p>
               <p className="text-2xl font-black text-white leading-none">${Math.round(data[totalMonths]?.cumulativeTotal || 0).toLocaleString()}</p>
             </div>
          </div>
        </div>

        <div className="relative bg-black/40 rounded-[2.5rem] p-6 md:p-10 border border-white/5 overflow-hidden shadow-inner">
          <svg
            ref={svgRef}
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredIndex(null)}
            className="cursor-crosshair"
          >
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((percent) => {
              const val = (percent / 100) * maxVal
              return (
                <g key={percent}>
                  <line
                    x1={padding.left}
                    y1={getY(val)}
                    x2={width - padding.right}
                    y2={getY(val)}
                    stroke="#ffffff10"
                    strokeDasharray="4 4"
                  />
                  <text x={padding.left - 15} y={getY(val)} fill="#444" fontSize="10" textAnchor="end" dominantBaseline="middle" className="font-bold">
                    ${Math.round(val/1000)}k
                  </text>
                </g>
              )
            })}

            {/* Time Markers */}
            {[0, 60, 120, 180].map((m) => (
              <text key={m} x={getX(m)} y={height - 20} fill="#444" fontSize="10" textAnchor="middle" className="font-bold">
                {m/12} Anos
              </text>
            ))}

            {/* Break-Even Line (Cut Line) */}
            {breakEvenMonth && (
              <g>
                <line 
                  x1={getX(breakEvenMonth)} y1={padding.top} 
                  x2={getX(breakEvenMonth)} y2={height - padding.bottom} 
                  stroke="#fbbf24" strokeWidth="2" strokeDasharray="8 4" opacity="0.6"
                />
                <circle cx={getX(breakEvenMonth)} cy={getY(cashPrice)} r="6" fill="#fbbf24" />
                <text 
                  x={getX(breakEvenMonth)} y={padding.top - 10} 
                  fill="#fbbf24" fontSize="12" fontWeight="black" textAnchor="middle" className="uppercase tracking-widest"
                >
                  {translations.breakEven}
                </text>
              </g>
            )}

            {/* Cash Price Baseline */}
            <line 
               x1={padding.left} y1={getY(cashPrice)} 
               x2={width - padding.right} y2={getY(cashPrice)} 
               stroke="#ffffff20" strokeWidth="1" strokeDasharray="4 4" 
            />

            {/* Lines */}
            <path d={getLinePath('cumulativeWater')} fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
            <path d={getLinePath('cumulativeSoap')} fill="none" stroke="#10b981" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
            <path d={getLinePath('cumulativeTotal')} fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            <path d={getLinePath('cumulativeAquafeel')} fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

            {/* Labels at end */}
            {drawProgress === 1 && (
              <g>
                 <text x={getX(totalMonths) + 10} y={getY(data[totalMonths].cumulativeTotal)} fill="#ef4444" fontSize="14" fontWeight="black" dominantBaseline="middle">
                   {translations.total}
                 </text>
                 <text x={getX(totalMonths) + 10} y={getY(data[totalMonths].cumulativeAquafeel)} fill="#ffffff" fontSize="14" fontWeight="black" dominantBaseline="middle">
                   Aquafeel
                 </text>
              </g>
            )}

            {/* Tooltip Cursor */}
            {hoveredIndex !== null && (
              <g>
                <line x1={getX(hoveredIndex)} y1={padding.top} x2={getX(hoveredIndex)} y2={height - padding.bottom} stroke="#ffffff40" />
                <circle cx={getX(hoveredIndex)} cy={getY(data[hoveredIndex].cumulativeTotal)} r="6" fill="#ef4444" stroke="#000" strokeWidth="2" />
              </g>
            )}
          </svg>

          {/* Dynamic Tooltip UI Overlay */}
          {hoveredIndex !== null && (
            <div className="absolute top-10 right-10 bg-slate-900/90 border border-white/20 p-6 rounded-3xl backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 min-w-[240px]">
              <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-3">Mês {hoveredIndex} ({Math.floor(hoveredIndex/12)} anos)</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs font-bold">{translations.water}</span>
                  <span className="text-white font-black">${Math.round(data[hoveredIndex].cumulativeWater).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs font-bold">{translations.soap}</span>
                  <span className="text-white font-black">${Math.round(data[hoveredIndex].cumulativeSoap).toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="text-red-500 text-sm font-black uppercase">PERDA TOTAL</span>
                  <span className="text-red-500 text-xl font-black">${Math.round(data[hoveredIndex].cumulativeTotal).toLocaleString()}</span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-aqua-400 text-sm font-black uppercase">AQUAFEEL</span>
                  <span className="text-aqua-400 text-xl font-black">${Math.round(data[hoveredIndex].cumulativeAquafeel).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Impact Message & Footer */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
           <div className="bg-red-600/10 border border-red-500/20 p-8 rounded-[2.5rem] flex items-center gap-6">
              <div className="bg-red-600 p-4 rounded-2xl shadow-xl shadow-red-600/30">
                 <Target className="text-white" size={32} />
              </div>
              <div>
                <h4 className="text-white font-black text-xl mb-1 uppercase tracking-tight">{translations.breakEven}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{translations.breakEvenSub}</p>
                <div className="mt-3 inline-block px-4 py-1 bg-red-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                  Mês {breakEvenMonth}
                </div>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-aqua-500/20 rounded-xl text-aqua-400">
                   <DollarSign size={20} />
                 </div>
                 <p className="text-white font-bold">{translations.payoff}</p>
              </div>
              <p className="text-slate-400 text-sm italic">
                "{translations.insight}"
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
