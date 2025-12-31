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
  const [containerWidth, setContainerWidth] = useState(1000)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const width = 1000
  const height = 500
  const isMobile = containerWidth < 768
  const padding = { 
    top: 60, 
    right: isMobile ? 80 : 150, 
    bottom: 60, 
    left: isMobile ? 60 : 80 
  }
  const totalMonths = 180 // 15 years

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const points: DataPoint[] = []
    let sumWater = 0
    let sumSoap = 0
    let sumAquafeel = 0
    let foundBreakEven = false

    const annualInflation = 0.07

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
        cumulativeAquafeel: Math.min(sumAquafeel, cashPrice * 1.8)
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

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const x = ((clientX - rect.left) / rect.width) * width
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
      breakEvenSub: "Neste mês o desperdício teria pago o sistema.",
      insight: "O desperdício de hoje paga seu patrimônio amanhã.",
      payoff: "Liquidação antecipada disponível."
    },
    en: { 
      title: "15-YEAR IMPACT PROJECTION", 
      sub: "Real Calculation with 7% Annual Inflation", 
      water: "Bottled Water", 
      soap: "Soap & Cleaning", 
      total: "Traditional Spend", 
      aqua: "Aquafeel Investment",
      breakEven: "RECOVERY POINT",
      breakEvenSub: "Waste would have paid for the system by this month.",
      insight: "Today's waste pays for your asset tomorrow.",
      payoff: "Early payoff available."
    },
    es: { 
      title: "PROYECCIÓN DE IMPACTO 15 AÑOS", 
      sub: "Cálculo Real con Inflación del 7% anual", 
      water: "Agua Embotellada", 
      soap: "Jabón y Limpieza", 
      total: "Gasto Tradicional", 
      aqua: "Inversión Aquafeel",
      breakEven: "PUNTO DE RECUPERACIÓN",
      breakEvenSub: "El desperdicio habría pagado el sistema.",
      insight: "El dinero que tiras hoy paga tu patrimonio.",
      payoff: "Liquidación anticipada disponible."
    }
  }[lang] || { title: "PROJEÇÃO DE IMPACTO 15 ANOS", sub: "Inflação 7% aa" }

  return (
    <div ref={containerRef} className="w-full bg-slate-950 py-12 px-4 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 mt-16 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
          <div>
            <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter flex items-center gap-3 leading-none">
              <TrendingUp className="text-red-500 shrink-0" size={isMobile ? 24 : 36} />
              {translations.title}
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-sm mt-2">{translations.sub}</p>
          </div>
          <div className="bg-white/5 border border-white/10 px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-3xl flex items-center gap-4 backdrop-blur-md w-full md:w-auto">
             <div className="p-2 bg-emerald-500/20 rounded-xl">
               <Zap className="text-emerald-400" size={20} />
             </div>
             <div>
               <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Total Desperdiçado</p>
               <p className="text-xl md:text-2xl font-black text-white leading-none">${Math.round(data[totalMonths]?.cumulativeTotal || 0).toLocaleString()}</p>
             </div>
          </div>
        </div>

        <div className="relative bg-black/40 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-10 border border-white/5 overflow-visible">
          <svg
            ref={svgRef}
            width="100%"
            height="auto"
            viewBox={`0 0 ${width} ${height}`}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchEnd={() => setHoveredIndex(null)}
            className="cursor-crosshair block overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            {[0, 25, 50, 75, 100].map((percent) => {
              const val = (percent / 100) * maxVal
              return (
                <g key={percent}>
                  <line x1={padding.left} y1={getY(val)} x2={width - padding.right} y2={getY(val)} stroke="#ffffff10" strokeDasharray="4 4" />
                  <text x={padding.left - 10} y={getY(val)} fill="#666" fontSize={isMobile ? "12" : "10"} textAnchor="end" dominantBaseline="middle" fontWeight="bold">
                    ${Math.round(val/1000)}k
                  </text>
                </g>
              )
            })}

            {[0, 60, 120, 180].map((m) => (
              <text key={m} x={getX(m)} y={height - 20} fill="#666" fontSize={isMobile ? "12" : "10"} textAnchor="middle" fontWeight="bold">
                {m/12} Anos
              </text>
            ))}

            {breakEvenMonth && (
              <g>
                <line x1={getX(breakEvenMonth)} y1={padding.top} x2={getX(breakEvenMonth)} y2={height - padding.bottom} stroke="#fbbf24" strokeWidth="2" strokeDasharray="8 4" opacity="0.6" />
                <circle cx={getX(breakEvenMonth)} cy={getY(cashPrice)} r="6" fill="#fbbf24" />
                <text x={getX(breakEvenMonth)} y={padding.top - 15} fill="#fbbf24" fontSize={isMobile ? "14" : "12"} fontWeight="900" textAnchor="middle" className="uppercase tracking-widest">
                  {translations.breakEven}
                </text>
              </g>
            )}

            <line x1={padding.left} y1={getY(cashPrice)} x2={width - padding.right} y2={getY(cashPrice)} stroke="#ffffff20" strokeWidth="1" strokeDasharray="4 4" />

            <path d={getLinePath('cumulativeWater')} fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.2" strokeDasharray="4 4" />
            <path d={getLinePath('cumulativeSoap')} fill="none" stroke="#10b981" strokeWidth="2" opacity="0.2" strokeDasharray="4 4" />
            <path d={getLinePath('cumulativeTotal')} fill="none" stroke="#ef4444" strokeWidth={isMobile ? "8" : "6"} strokeLinecap="round" className="drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            <path d={getLinePath('cumulativeAquafeel')} fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

            {drawProgress === 1 && (
              <g>
                 <text x={getX(totalMonths) + 10} y={getY(data[totalMonths].cumulativeTotal)} fill="#ef4444" fontSize={isMobile ? "16" : "14"} fontWeight="900" dominantBaseline="middle">
                   {translations.total}
                 </text>
                 <text x={getX(totalMonths) + 10} y={getY(data[totalMonths].cumulativeAquafeel)} fill="#ffffff" fontSize={isMobile ? "16" : "14"} fontWeight="900" dominantBaseline="middle">
                   Aquafeel
                 </text>
              </g>
            )}

            {hoveredIndex !== null && (
              <g>
                <line x1={getX(hoveredIndex)} y1={padding.top} x2={getX(hoveredIndex)} y2={height - padding.bottom} stroke="#ffffff40" strokeWidth="2" />
                <circle cx={getX(hoveredIndex)} cy={getY(data[hoveredIndex].cumulativeTotal)} r="8" fill="#ef4444" stroke="#000" strokeWidth="3" />
              </g>
            )}
          </svg>

          {hoveredIndex !== null && (
            <div className={`absolute ${isMobile ? 'top-[-20px] left-1/2 -translate-x-1/2 w-[90%]' : 'top-10 right-10 w-[260px]'} bg-slate-900/95 border border-white/20 p-5 rounded-3xl backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-50`}>
              <p className="text-slate-500 font-black text-[9px] uppercase tracking-widest mb-3">Ano {Math.floor(hoveredIndex/12)}</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold">{translations.total}</span>
                  <span className="text-red-500 font-black">${Math.round(data[hoveredIndex].cumulativeTotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold">Aquafeel</span>
                  <span className="text-aqua-400 font-black">${Math.round(data[hoveredIndex].cumulativeAquafeel).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-4 md:gap-6">
           <div className="bg-red-600/10 border border-red-500/20 p-6 md:p-8 rounded-[2rem] flex items-center gap-4 md:gap-6">
              <div className="bg-red-600 p-3 md:p-4 rounded-2xl shadow-xl">
                 <Target className="text-white" size={isMobile ? 24 : 32} />
              </div>
              <div>
                <h4 className="text-white font-black text-base md:text-xl mb-1 uppercase tracking-tight leading-none">{translations.breakEven}</h4>
                <p className="text-slate-500 text-[10px] md:text-sm leading-tight">{translations.breakEvenSub}</p>
                <div className="mt-2 inline-block px-3 py-0.5 bg-red-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest">
                  Mês {breakEvenMonth}
                </div>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2 md:mb-3">
                 <div className="p-1.5 bg-aqua-500/20 rounded-lg text-aqua-400">
                   <DollarSign size={16} />
                 </div>
                 <p className="text-white font-bold text-xs md:text-base leading-none">{translations.payoff}</p>
              </div>
              <p className="text-slate-500 text-[11px] md:text-sm italic leading-tight">
                "{translations.insight}"
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}